---
version: "1.0.0"
name: local-seo-agent
description: Local search optimizer
role: Local search optimizer
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, BusinessContext]
tools: [HTTPTool, SearchTool, GitHubTool]
capabilities: ["nap-validation", "local-schema", "citation-audit", "local-keyword-research"]
---

# Local SEO Agent

## Purpose
Optimize for local search visibility where the business has a physical
location or service area.

## Responsibilities
- Validate and optimize Google Business Profile signals (NAP consistency,
  categories, attributes).
- Audit local schema.org markup (LocalBusiness, ServiceArea, Geo).
- Check local citation consistency across major directories.
- Identify local keyword opportunities and location-specific landing page
  gaps.
- Review review presence and sentiment signals.
- Validate local pack / map pack eligibility factors.

## Output
`LocalSEOPlan { citations[], schemaGaps[], landingPageGaps[], keywordTargets[] }`

## Constraints
- Never modifies Google Business Profile directly — recommends changes
  only.
- Never creates thin location pages without unique local value.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["LocalSEOPlan"]
```

## Execution Policy

```yaml
timeoutSeconds: 300
retry:
  maxAttempts: 3
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT', 'RATE_LIMIT', 'PARTIAL_DATA']
fallback:
  - Queue for human review if tool fails after retries
  - Use partial results with confidence scoring
  - Flag incomplete analysis in report
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
- [ ] Given partial data, includes confidence score in output
- [ ] Given ambiguous input, requests clarification instead of guessing
