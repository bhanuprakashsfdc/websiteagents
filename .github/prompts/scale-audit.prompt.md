---
mode: agent
agents: [cdn-agent, caching-agent, performance-agent, infrastructure-agent]
---

# Prompt: Scale Readiness Audit

Given a website URL and repository targeting 1M+ daily users:
1. Run CDN Agent to audit CDN configuration and cache hit ratios.
2. Run Caching Agent to review multi-layer caching strategy.
3. Run Performance Agent for load testing and bottleneck identification.
4. Run Infrastructure Agent for server, container, and deployment
   readiness.
5. Run Database Agent for query performance and scaling bottlenecks.
6. Run Queue Agent for async processing and background job capacity.
7. Output a `ScaleReadinessReport` with bottleneck ranking, capacity
   estimates, and prioritized scaling actions.

Do not implement changes in this prompt — audit and plan only.