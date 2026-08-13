---
mode: agent
agents: [code-review-agent, qa-agent, pr-agent]
---

# Prompt: Create a PR for a Completed Change

1. Confirm QA Agent returned `PASS` with evidence attached.
2. Run Code Review Agent against the diff; block on any HIGH risk finding.
3. PR Agent opens the PR with: Summary, Problem, Solution, Files changed,
   Tests, Risk, Screenshots (if applicable), Expected impact.
4. Tag for human approval if the change touches anything flagged HIGH risk
   by the Safety Policy in `.github/instructions/safety-policy.md`.