---
mode: agent
agents: [retention-agent, analytics-agent, growth-agent, experiment-agent]
---

# Prompt: Retention Audit

Given a website URL and analytics data:
1. Run Retention Agent to analyze retention curves and churn segments.
2. Run Analytics Agent for engagement and drop-off signals.
3. Run Growth Agent to identify retention opportunity gaps.
4. Run Experiment Agent to design retention experiments.
5. Output a `RetentionAuditReport` with retention curves, churn
   segments, drop-off triggers, and prioritized retention tactics.

Do not implement changes in this prompt — audit and plan only.