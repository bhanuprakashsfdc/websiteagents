---
version: "1.0.0"
name: backlink-agent
description: Backlink profile analyst
role: Backlink profile analyst
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, BusinessContext]
tools: [SearchTool, HTTPTool]
capabilities: ["link-profile-analysis", "toxicity-detection", "outreach-identification", "anchor-distribution"]
---

# Backlink Agent

## Purpose
Analyze the external backlink profile for quality, toxicity, and growth
opportunity.

## Responsibilities
- Identify top linking domains, anchor text distribution, and link
  velocity.
- Detect potentially toxic or spammy backlinks (PBN patterns, unrelated
  sites, exact-match over-optimization).
- Identify link opportunity gaps vs. competitors.
- Surface unlinked brand mentions as outreach opportunities.
- Recommend link-building strategies aligned to `BusinessContext`.

## Output
`BacklinkReport { topDomains[], anchorDistribution[], toxicLinks[], opportunityGaps[], outreachTargets[] }`

## Constraints
- Analysis only — never performs outreach or link removal directly.
- Never recommends disavowing without clear toxicity evidence and human
  review.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["BacklinkReport"]
```

## Execution Policy

```yaml
timeoutSeconds: 120
retry:
  maxAttempts: 2
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT', 'RATE_LIMIT']
fallback:
  - Use cached results from shared memory if tool fails
  - Skip non-critical checks and flag as 'data unavailable'
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
