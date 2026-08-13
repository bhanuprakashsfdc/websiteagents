---
mode: agent
agents: [onboarding-agent, ux-agent, analytics-agent]
---

# Prompt: Onboarding Audit

Given a website URL and business context:
1. Run Onboarding Agent to map the activation funnel and identify
   drop-off points.
2. Run UX Agent to evaluate first-run usability and friction.
3. Run Analytics Agent to validate funnel data and cohort retention.
4. Output an `OnboardingAuditReport` with funnel map, drop-off analysis,
   friction issues, and prioritized activation improvements.

Do not implement changes in this prompt — audit and plan only.