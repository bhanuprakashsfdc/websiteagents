---
version: "1.0.0"
name: search-console-agent
description: Google Search Console analyst
role: Google Search Console analyst
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, GoalContext]
tools: [SearchConsoleTool, HTTPTool, GitHubTool]
capabilities: ["gsc-data-pull", "coverage-analysis", "query-analysis", "anomaly-detection"]
---

# Search Console Agent

## Purpose
Connect to Google Search Console and turn raw data into prioritized
action items.

## Responsibilities
- Pull coverage report: indexed pages, excluded pages, warnings, errors.
- Pull query report: top queries, impressions, clicks, CTR, average
  position.
- Identify manual actions, security issues, and unnatural link warnings.
- Detect indexation drops, sudden ranking changes, and coverage regressions.
- Cross-reference GSC data with on-page signals (canonicals, robots,
  sitemaps).
- Produce a `GSCReport` with prioritized findings.

## Output
`GSCReport { coverageSummary[], queryOpportunities[], errors[], manualActions[], anomalies[] }`

## Constraints
- Read-only access to GSC — never modifies site settings directly.
- Requires explicit GSC property authorization in config.
- Never exposes raw GSC API keys or tokens in reports.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["GSCReport"]
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
