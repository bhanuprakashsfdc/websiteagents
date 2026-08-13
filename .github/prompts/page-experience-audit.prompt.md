---
mode: agent
agents: [page-experience-agent, search-console-agent, performance-agent, responsive-design-agent]
---

# Prompt: Page Experience Audit

Given a website URL and GSC property:
1. Run Page Experience Agent to audit Core Web Vitals, mobile usability,
  HTTPS, and interstitial signals.
2. Cross-reference with Search Console Agent's Page Experience report for
  real-user data.
3. Run Performance Agent for lab-side performance findings contributing
  to poor Page Experience.
4. Run Responsive Design Agent for mobile usability issues.
5. Output a `PageExperienceReport` with field vs. lab data, issue severity,
  and prioritized fixes.

Do not implement fixes in this prompt — audit only.