# PowerShell Defense Evasion Investigation

## Executive Summary

Investigated how threat actors use PowerShell obfuscation and AMSI bypass to evade detection, then developed detection strategies using Sysmon and Event Viewer.

## Investigation Objective

Map common PowerShell evasion techniques to MITRE ATT&CK and develop detection rules.

## Environment

- Windows 10
- Sysmon for enhanced logging
- Windows Event Viewer
- PowerShell 5.1+

## Investigation Approach

1. Documented common PowerShell evasion techniques from MITRE ATT&CK
2. Executed obfuscation methods in controlled lab environment
3. Analyzed resulting logs from Sysmon and Windows Event Viewer
4. Identified reliable detection sources for each technique
5. Developed detection rules and Sysmon configuration

## Key Findings

### AMSI Bypass (T1562.001)
- AMSI bypass attempts modify Windows Defender settings
- These modifications leave detectable event traces
- Detection: Monitor for AMSI-related registry changes and defender status modifications

### Obfuscated Commands (T1059.001)
- Script block logging (Event ID 4104) captures deobfuscated command content
- This is the most reliable source for detecting obfuscated PowerShell
- Encoded commands show predictable entropy patterns in base64 strings

### Detection Recommendations

1. Enable PowerShell Script Block Logging (Event ID 4104)
2. Enable PowerShell Module Logging (Event ID 4103)
3. Deploy Sysmon with PowerShell-focused configuration
4. Monitor for encoded command patterns with high entropy

## MITRE ATT&CK Mapping

| Technique | ID | Description |
|---|---|---|
| PowerShell | T1059.001 | Command and scripting interpreter |
| Impair Defenses | T1562.001 | Disable or modify tools |

## Outcome

Created detection playbook including:
- Sysmon configuration for PowerShell monitoring
- Detection queries for Wazuh/Splunk
- Alert thresholds for suspicious PowerShell activity
- Documentation of each evasion technique and its detection method
