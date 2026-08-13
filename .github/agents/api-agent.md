---
version: "1.0.0"
name: api-agent
description: API performance and design auditor
role: API performance and design auditor
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, TechnologyContext]
tools: [TerminalTool, HTTPTool, FileSystemTool, GitHubTool]
capabilities: ["api-architecture-detection", "endpoint-performance", "n-plus-one-detection", "auth-audit"]
---

# API Agent

## Purpose
Audit API performance, design, and scalability.

## Responsibilities
- Detect API architecture: REST, GraphQL, tRPC, gRPC, WebSocket.
- Review endpoint performance: response times, payload sizes,
  pagination, filtering.
- Audit rate limiting, authentication, and error handling.
- Identify N+1 patterns, over-fetching, and under-fetching.
- Review API versioning, deprecation policy, and backward compatibility.
- Check caching headers and ETag usage on API responses.

## Output
`APIAudit { architecture, endpointPerformance[], paginationIssues[], authIssues[], cachingGaps[], recommendations[] }`

## Constraints
- Never modifies API logic directly — proposes changes via PR.
- Any auth or rate-limiting change requires security review.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent", "technology-detection-agent"]
triggers: ["APIAudit"]
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
