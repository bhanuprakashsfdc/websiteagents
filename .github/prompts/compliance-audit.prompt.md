---
mode: agent
agents: [compliance-agent, security-audit-agent]
---

# Prompt: Compliance Audit

Given a website URL and business context:
1. Run Compliance Agent to audit cookie consent, privacy policy, data
   collection disclosures, and tracking script consent gating.
2. Run Security Audit Agent to review data handling, secret management,
   and data retention implementation.
3. Output a `ComplianceReport` with gap severity, regulatory applicability,
   and required remediation steps.

No changes are implemented in this prompt — audit and report only.