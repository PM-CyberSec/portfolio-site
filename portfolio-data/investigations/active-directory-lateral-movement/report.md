# Active Directory Lateral Movement Investigation

## Executive Summary

Mapped lateral movement paths through an AD environment using common techniques like Pass-the-Hash and Kerberoasting, then developed detection rules for each technique.

## Investigation Objective

Identify and document lateral movement techniques in a lab AD environment to build detection coverage.

## Environment

- Windows Server 2019
- Active Directory Domain Services
- Wireshark for traffic capture
- BloodHound for attack path visualization

## Investigation Approach

1. Established baseline AD environment with standard user and admin accounts
2. Used BloodHound to enumerate AD objects and identify attack paths
3. Executed Kerberoasting attacks and captured TGS request patterns
4. Performed Pass-the-Hash attacks and analyzed NTLM authentication logs
5. Documented detection opportunities for each technique

## Key Findings

### Kerberoasting (T1558)
- SPN accounts with weak passwords are vulnerable to offline cracking
- TGS requests generate identifiable patterns in DC event logs
- Detection: Monitor for unusual volumes of TGS-4624 events from single sources

### Pass-the-Hash (T1550.002)
- NTLM authentication anomalies appear in DC logs when hashes are replayed
- Lateral movement via SMB creates detectable network patterns
- Detection: Correlate NTLM logon events with source/destination anomalies

### Privilege Escalation Paths
- BloodHound graph analysis reveals shortest paths to Domain Admin
- Common paths: User → SPN → Kerberoast → cracked hash → admin

## MITRE ATT&CK Mapping

| Technique | ID | Description |
|---|---|---|
| Pass the Hash | T1550.002 | Use captured NTLM hashes for authentication |
| Kerberoasting | T1558 | Request TGS tickets for offline cracking |
| Remote Services | T1021.002 | Lateral movement via SMB/WinRM |

## Tools Used

- **BloodHound**: AD enumeration and attack path visualization
- **Wireshark**: Network traffic capture and analysis
- **Impacket**: Kerberoasting and Pass-the-Hash execution
- **Rubeus**: Kerberos interaction and ticket manipulation

## Outcome

Built AD security monitoring checklist covering:
- Detection rules for lateral movement indicators
- Log sources to monitor for each technique
- Alert thresholds for abnormal authentication patterns
- Recommended SIEM queries for Wazuh/Splunk
