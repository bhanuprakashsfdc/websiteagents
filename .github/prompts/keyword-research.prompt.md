---
mode: agent
agents: [keyword-research-agent, content-strategy-agent]
---

# Prompt: Keyword Research & Strategy

Given a website URL and/or GitHub repository:
1. Run Website Discovery Agent to understand current content coverage.
2. Run Keyword Research Agent to discover and cluster target keywords.
3. Cross-reference keyword clusters with existing page coverage to identify
   content gaps.
4. Output a `KeywordRoadmap` with prioritized clusters, gap map, and
   recommended publishing targets.

Do not implement content changes in this prompt — strategy only.