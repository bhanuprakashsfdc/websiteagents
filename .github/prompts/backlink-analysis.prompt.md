---
mode: agent
agents: [backlink-agent, competitor-analysis-agent, opportunity-agent]
---

# Prompt: Backlink Analysis

Given a website URL and business context:
1. Run Backlink Agent to analyze the existing backlink profile: top
   domains, anchor distribution, toxic links, velocity.
2. Run Competitor Analysis Agent to identify backlink gaps vs. identified
   competitors.
3. Identify unlinked brand mentions and outreach opportunities.
4. Normalize findings into a `BacklinkGapMap` and pass to the Opportunity
   Agent for scoring and prioritization.

Do not implement outreach or removal in this prompt — analysis only.