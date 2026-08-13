---
mode: agent
agents: [performance-agent, code-analysis-agent]
---

# Prompt: Performance Budget Enforcement

Given a website URL and repository:
1. Define or load performance budgets: LCP, FID, CLS, TBT, total JS/CSS
   weight, image weight, font weight.
2. Run Performance Agent to measure current metrics against budgets per
   route/page type.
3. Run Code Analysis Agent to identify build/config changes needed to
   enforce budgets.
4. Output a `PerformanceBudgetReport` with violations, root causes, and
   recommended fixes.

Do not implement fixes in this prompt — audit and plan only.