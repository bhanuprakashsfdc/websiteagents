---
mode: agent
agents: [event-tracking-agent, bi-agent, compliance-agent]
---

# Prompt: Event Tracking and Data Layer Audit

Given a website URL and repository:
1. Run Event Tracking Agent to audit analytics implementations and data
   layer hygiene.
2. Run BI Agent to validate KPI definitions and data quality.
3. Run Compliance Agent to verify tracking respects privacy regulations.
4. Output an `EventTrackingAuditReport` with platform coverage, data
   layer issues, missing events, taxonomy recommendations, and privacy
   compliance status.

Do not implement changes in this prompt — audit and plan only.