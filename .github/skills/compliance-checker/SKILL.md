# Skill: compliance-checker

Use when an agent needs to audit privacy, cookie consent, or regulatory
compliance.

## Rules
- Always determine applicable regulations from `BusinessContext`
  (target region, industry, data types collected) before checking.
- Audit cookie consent: presence, granularity, reject-all accessibility,
  consent logging, pre-checked state, consent duration.
- Audit privacy policy: existence, data retention, third-party processor
  disclosures, user rights statements.
- Flag every gap with the specific regulation clause it relates to.
- Never modifies consent implementations directly — recommendations only.
- Default all findings to HIGH risk until human review confirms scope and
  applicability.
- Reference: `.github/instructions/safety-policy.md`.