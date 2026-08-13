---
mode: agent
agents: [indexation-agent, search-console-agent, sitemap-agent, robots-txt-agent]
---

# Prompt: Indexation Audit

Given a website URL, GSC property, and repository:
1. Run Search Console Agent to pull coverage data.
2. Run Indexation Agent to cross-reference GSC with on-page signals.
3. Run Sitemap Agent to validate sitemap inclusion/exclusion logic.
4. Run Robots.txt Agent to check crawl directive conflicts.
5. Output an `IndexationAuditReport` with: should-be-indexed but aren't,
   should-not-be-indexed but are, canonical conflicts, and prioritized
   remediation steps.

Do not implement fixes in this prompt — audit and plan only.