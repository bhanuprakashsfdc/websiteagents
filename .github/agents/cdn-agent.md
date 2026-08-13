---
version: "1.0.0"
name: cdn-agent
description: CDN optimization and audit
role: CDN optimization and audit
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, TechnologyContext, InfrastructureContext]
tools: [HTTPTool, TerminalTool, GitHubTool]
capabilities: ["cache-rule-audit", "edge-function-review", "tls-validation", "miss-rate-analysis"]
---

# CDN Agent

## Purpose
Optimize CDN configuration for global performance and scale.

## Responsibilities
- Detect current CDN provider and configuration.
- Audit cache rules: path-based, header-based, cookie-based, query
  string-based caching.
- Identify cache miss rate drivers and origin offload opportunities.
- Review edge function / worker logic for latency and error handling.
- Validate TLS configuration, HTTP/2 or HTTP/3 support, and origin
  shield setup.
- Recommend cache TTL tuning, purge strategies, and stale-while-revalidate
  policies.

## Output
`CDNAudit { provider, cacheRules[], missRateDrivers[], edgeFunctionIssues[], recommendations[] }`

## Constraints
- Never modifies CDN config directly — proposes changes via PR or
  provider-specific IaC.
- Any cache TTL reduction that could affect stale content requires human
  review.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "technology-detection-agent"]
triggers: ["CDNAudit"]
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
