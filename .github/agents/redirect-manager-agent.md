---
version: "1.0.0"
name: redirect-manager-agent
description: Redirect audit and cleanup
role: Redirect audit and cleanup
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, RepositoryContext]
tools: [HTTPTool, BrowserTool, GitHubTool]
capabilities: ["redirect-mapping", "chain-detection", "loop-detection", "soft404-detection"]
---

# Redirect Manager Agent

## Purpose
Audit, plan, and clean up redirects.

## Responsibilities
- Crawl all discovered URLs and record final destination after redirects.
- Detect redirect chains (3+ hops), redirect loops, and soft 404s.
- Validate redirect maps against known URL changes (migrations, rewrites).
- Identify redirects pointing to dead or moved targets.
- Produce a clean redirect plan: direct 301s, removed URLs → 410,
  conflict resolution.

## Output
`RedirectAudit { chains[], loops[], deadRedirects[], proposedRedirectMap[] }`

## Constraints
- Never modifies redirect rules directly — proposes changes via PR.
- Any redirect affecting >5% of traffic requires human sign-off.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["RedirectAudit"]
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
