---
title: "SOC Lab Env"
description: "Designing a realistic security operatioblog/soc-lab-envns environment while keeping attack simulations isolated, observable, and manageable."
date: 1-10-2026
category: SOC
tags: ["Virtual", "Lab Environment", "Network Management"]
readingTime: 15
---
# Building a Segmented SOC Lab: Designing a Safe Environment for Detection, Investigation and Attack Simulation

> Designing a realistic security operations environment while keeping attack simulations isolated, observable, and manageable.

Setting up a couple of VMs isn't the same as building a lab environment.

A useful security lab needs more than operating systems and security tools. It needs an architecture that determines how systems communicate, where security boundaries exist, how experiments are isolated, how the environment can be restored, and how the entire setup can be reproduced.

For this lab, I wanted to build an environment where I could simulate attacks, collect telemetry, investigate incidents, and experiment with security infrastructure without turning the lab itself into a risk to the host or the surrounding network.

At the same time, the lab had to operate within relatively limited compute and storage resources.

> **The lab was designed around constrained compute and storage resources, so services were consolidated where practical while security boundaries were maintained through network segmentation.**

---

## 1. Lab Requirements

The first step was identifying what the environment actually needed to support.

### Operating Systems and Virtual Machines

- Kali Linux — attack simulation and security analysis
    
- Windows 10 — endpoint monitoring and attack target
    
- Windows Server — Active Directory, DNS and Windows infrastructure
    
- Metasploitable2 — intentionally vulnerable target
    
- Ubuntu — SOC infrastructure, networking and management

### Security Infrastructure

- Wazuh
    
- Wazuh agents
    
- Suricata
    
- Velociraptor
    
- Wireshark
    
- GNS3
    
- FortiOS 7.6
    
- Additional security tooling as required by individual experiments

### Endpoint Telemetry

- Sysmon
    
- Process Monitor
    
- Windows Event Logs
    
- Wazuh Agent

The goal was not to install every available security product.

Instead, each component needed to serve a purpose within the larger environment:

```text
Attack
   ↓
Target
   ↓
Telemetry
   ↓
Detection
   ↓
Investigation
   ↓
Response
```

---

# 2. Defining the Security Requirements

Before designing the network, I defined several requirements for the environment.

### Isolation

Attack simulations should not accidentally reach my physical/home network.

### Controlled Communication

Some experiments require Kali to communicate with Windows systems, while others require complete network separation.

### Observability

Traffic and endpoint activity should remain visible to the security monitoring infrastructure.

### Reproducibility

I should be able to recreate a topology instead of manually rebuilding it every time.

### Recoverability

Experiments should be reversible through VM snapshots and controlled restoration.

### Resource Efficiency

The architecture needs to work with the available CPU, RAM and storage instead of assuming enterprise infrastructure.

These requirements led to the main architectural question:

> **How can the same physical/virtual infrastructure support multiple security-testing topologies without rebuilding the entire environment?**

---

# 3. Designing the Network Architecture

There are two common situations I expect to encounter while using the lab.

### Scenario A — Isolated Networks

For some experiments, systems should not be able to communicate with one another.

For example:

```isolated_network
	                Ubuntu Host
	                    │
	         ┌──────────┼──────────┐
	         │          │          │
      br-endpoints   br-server   br-attack
	         │          │          │
	       Win10     WinServer    Kali
```

Each bridge represents a separate Layer-2 network.

This is useful when testing potentially disruptive activity or when I want to ensure that an experiment cannot cross into another part of the lab.

### Scenario B — Interconnected Networks

Other experiments require communication between systems.

For example:

```interconnected_network
                         Firewall / Router
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
          SOC Network       Server Network     Attack Network
              │                 │                 │
            Wazuh          Windows Server        Kali
                                │
                              Win10
```

In this design, communication between different networks is controlled by the firewall/router rather than by simply connecting every VM to the same bridge.

This distinction is important:

> **A bridge provides Layer-2 connectivity. A router/firewall provides Layer-3 communication between different networks and allows security policy to be applied between them.**

---

# 4. Why I Didn't Want a Single Fixed Topology

A single permanent topology would work for one type of experiment, but it would become restrictive as the lab grows.

For example:

```text
Experiment 1
Kali ── Win10
```

might require direct communication.

Another experiment might require:

```text
Kali     X     Win10
          \
           X
            Wazuh
```

where the attack environment is intentionally isolated from the monitoring infrastructure.

Another experiment might require:

```text
Kali
 │
 ▼
Firewall
 │
 ├── Windows 10
 ├── Windows Server
 └── Wazuh
```

Rather than maintaining three completely different physical environments, I wanted to make the network topology itself configurable.

---

# 5. Evaluating the Networking Options

There are several ways to create and manage Linux bridges.

## `ip` commands

A bridge can be created directly:

```bash
sudo ip link add br-test type bridge
sudo ip link set br-test up
```

This is useful for quickly testing an idea.

However, these commands primarily manipulate the current runtime state. They don't by themselves provide the persistent configuration and profile-based management I wanted for the lab.

For experimentation this is useful.

For the final lab architecture, it isn't enough.

---

## NetworkManager / `nmcli`

NetworkManager provides persistent connection profiles and can manage Linux bridges.

For example:

```bash
sudo nmcli connection add \
    type bridge \
    ifname br-servers \
    con-name br-servers
```

This is much more suitable for a persistent environment.

However, manually executing a collection of `nmcli` commands every time I want a different topology would eventually become repetitive.

That led to the next idea.

---

# 6. Treating the Lab Topology as Configuration

Instead of hard-coding one network architecture, I wanted to describe the desired architecture as configuration.

The concept is:

```text
                 Lab Configuration
                       │
                     YAML
                       │
                       ▼
                Lab Manager Script
                       │
             ┌─────────┴─────────┐
             │                   │
           nmcli              libvirt
             │                   │
             ▼                   ▼
      NetworkManager        VM networking
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
                Working Lab
```

The important distinction is that YAML is **not something NetworkManager natively interprets**.

Instead, the YAML describes the desired lab state.

A management script reads that configuration and translates it into actions for NetworkManager and libvirt.

For example, a simplified topology could eventually be represented as:

```yaml
lab: isolated

networks:
  servers:
    bridge: br-servers
    subnet: 10.10.20.0/24

  endpoints:
    bridge: br-endpoints
    subnet: 10.10.30.0/24

  attack:
    bridge: br-attack
    subnet: 10.10.40.0/24

vms:
  winserver:
    networks:
      - servers

  win10:
    networks:
      - endpoints

  kali:
    networks:
      - attack
```

A different profile could describe a routed SOC topology.

The goal is eventually to make changing the environment a configuration change rather than a manual reconstruction.

---

# 7. Validating the Network Before Automating It

Before introducing automation, I wanted to verify that the underlying networking actually behaved as expected.

This is an important principle:

> **Automate a working architecture, not an untested architecture.**

I therefore started by creating the bridges manually.

For a temporary test:

```bash
sudo ip link add br-test type bridge
sudo ip link set br-test up
```

Or using NetworkManager:

```bash
sudo nmcli connection add \
    type bridge \
    ifname br-test \
    con-name br-test
```

I then repeated this for the networks required by the experiment.

At this stage, the objective wasn't automation.

The objective was answering:

- Can the bridge be created?
    
- Can a VM attach to it?
    
- Can two VMs communicate when they share the bridge?
    
- Are isolated bridges actually isolated?
    
- What happens when the VMs are rebooted?
    
- Does the bridge survive a host reboot?
    
- Does the VM reconnect to the correct bridge?
    
- Can traffic accidentally reach the physical network?
    

Only after those questions were answered did automation become useful.

---

# 8. Connecting the Virtual Machines

Creating a bridge isn't enough. The VM's virtual network interface also has to connect to it.

In my case, the environment uses QEMU/KVM with virt-manager.

The VM network interface can be configured through the virt-manager interface:

_[virt-manager-NIC.png]_

The important relationship is:

```text
Windows 10
    │
    │ virtual NIC
    ▼
  vnet0
    │
    ▼
br-endpoints
    │
    ▼
10.10.30.0/24
```

The virtual NIC is connected to the Linux bridge, while the operating system inside the VM receives its own IP configuration.

---

# 9. Configuring the VM Through libvirt

The same configuration can also be inspected or modified through libvirt.

For example:

```bash
virsh edit win10
```

Inside the VM definition, the interface can use a Linux bridge:

```xml
<interface type='bridge'>
    <mac address='52:54:00:xx:xx:xx'/>
    <source bridge='br-endpoints'/>
    <model type='virtio'/>
</interface>
```

The important part is:

```xml
<source bridge='br-endpoints'/>
```

This tells libvirt to connect the VM's virtual interface to the Linux bridge named `br-endpoints`.

This creates the chain:

```text
VM
 │
 ▼
Virtual NIC
 │
 ▼
vnetX
 │
 ▼
br-endpoints
 │
 ▼
Virtual Layer-2 network
```

I can therefore change which network a VM participates in without rebuilding the VM itself.

---

# 10. Assigning IP Addresses

The bridge and the VM are separate networking objects.

For example:

```text
Bridge:
br-endpoints
10.10.30.1/24

Windows 10:
10.10.30.10/24
```

The bridge address is not the Windows machine's address.

The bridge can have an IP when the host needs to participate in that network, while the VM has its own IP.

For a routed architecture, the gateway could instead be provided by a dedicated firewall/router:

```text
Windows 10
10.10.30.10/24
       │
       ▼
10.10.30.1
Firewall
       │
       ▼
Other networks
```

This allows the firewall to enforce communication policies between security zones.

---

# 11. Security Validation

After creating the topology, I don't want to assume that segmentation works simply because the diagram looks correct.

I validate it.

For example:

### Expected allowed traffic

```text
Kali → Windows 10
```

### Expected blocked traffic

```text
Kali → Management network
```

### Expected monitoring traffic

```text
Windows 10 → Wazuh
Windows Server → Wazuh
```

I can test these boundaries using:

```bash
ping
ip route
ip neigh
nc
nmap
tcpdump
Wireshark
```

and verify the results from both sides of the connection.

For a security lab, a successful test is not simply:

> "The machines can communicate."

It is:

> **"The machines can communicate exactly where the architecture says they should—and cannot communicate where they should not."**

---

# 12. Making the Environment Recoverable

Network isolation solves one problem, but experiments can still modify or break the operating systems.

Snapshots provide another layer of control.

The intended workflow becomes:

```text
              Clean VM
                 │
                 ▼
             Snapshot
                 │
                 ▼
          Attack / Experiment
                 │
        ┌────────┴────────┐
        │                 │
     Observe           Investigate
        │                 │
        └────────┬────────┘
                 ▼
          Document results
                 │
                 ▼
          Restore snapshot
                 │
                 ▼
              Clean VM
```

This allows the same environment to be reused for multiple experiments while maintaining a known-good starting point.

---

# 13. Resource Constraints

The lab is also intentionally built under constrained resources.

Current available resources include:

|VM|RAM|Approx. Free Storage|Main Purpose|
|---|--:|--:|---|
|Ubuntu|8 GB|25 GB|SOC infrastructure / networking|
|Windows 10|4 GB|7 GB|Endpoint / Sysmon / Wazuh Agent|
|Windows Server|4 GB|23 GB|AD / DNS / Windows infrastructure|
|Kali|8 GB|20 GB|Attack simulation / analysis|

These limitations influence architectural decisions.

For example, I don't need every security platform to run continuously.

Some components can be enabled only when an experiment requires them, while endpoint systems can remain lightweight and forward telemetry to centralized infrastructure.

The objective is therefore not to recreate an enterprise SOC's hardware footprint.

It is to recreate the **security interactions and operational workflows** that make the environment useful.

---

# 14. Current Architecture

The resulting environment is designed around several layers:

```text
                    SOC LAB
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    MANAGEMENT       SECURITY       LAB / ATTACK
        │              │              │
      Ubuntu         Wazuh           Kali
        │          Suricata           │
        │         Velociraptor        │
        │             │               │
        └─────────────┼───────────────┘
	                  │
              Controlled Network
                      │
             ┌────────┴────────┐
             │                 │
        Windows Server      Windows 10
          AD / DNS            Endpoint
```

The important property isn't the number of tools.

It is the ability to control how these components interact.

---

# 15. What Comes Next

With the networking foundation established, the next layer is telemetry.

The next stage is to connect:

```text
Windows 10
   │
   ├── Sysmon
   ├── Windows Event Logs
   └── Wazuh Agent
            │
            ▼
          Wazuh
            │
            ▼
       SOC Analyst
```

Then introduce network visibility:

```text
Kali ───────► Windows
                │
                │
          Network Telemetry
                │
          ┌─────┴─────┐
          │           │
       Suricata      Zeek
          │           │
          └─────┬─────┘
                ▼
           Investigation
```

From there, the environment can evolve toward detection engineering, threat hunting, DFIR, automation and eventually SOAR.

The lab therefore isn't being built as a collection of independent tools.

It is being built as a **controlled security ecosystem**, where each layer produces telemetry or capabilities that can be used by another layer.

> **The architecture is the foundation. The tools are the components. The experiments are the validation.**