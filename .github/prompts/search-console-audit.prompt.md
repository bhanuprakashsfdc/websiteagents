---
mode: agent
agents: [search-console-agent, indexation-agent, technical-seo-agent]
---

# Prompt: Search Console Audit

Given a website URL and authorized GSC property:
1. Run Search Console Agent to pull coverage, query, and manual action
   data.
2. Run Indexation Agent to cross-reference GSC coverage with on-page
   signals.
3. Run Technical SEO Agent for on-page issues contributing to
   indexation/ranking problems.
4. Output a `GSCAuditReport` with coverage summary, query opportunities,
   errors, manual actions, anomalies, and prioritized fixes.

Do not implement fixes in this prompt — analysis only.