---
mode: agent
agents: [competitor-analysis-agent, opportunity-agent]
---

# Prompt: Competitor Analysis

Given a website URL and business context:
1. Identify direct and organic-search competitors.
2. Run Competitor Analysis Agent to benchmark content depth, topical
   coverage, performance, UX, and conversion signals.
3. Normalize findings into a `CompetitiveGapMap`.
4. Pass gaps to the Opportunity Agent for scoring and prioritization.

Do not implement changes in this prompt — analysis only.