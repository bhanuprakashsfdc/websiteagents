---
version: "1.0.0"
name: performance-agent
description: Web performance auditor/optimizer
role: Web performance auditor/optimizer
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [WebsiteContext, RepositoryContext]
tools: [LighthouseTool, HTTPTool, TerminalTool]
capabilities: ["lighthouse-audit", "bundle-analysis", "image-optimization", "render-blocking-detection"]
---

# Performance Agent

## Purpose
Improve Core Web Vitals and overall load performance.

## Checks
Core Web Vitals, bundle size, JS/CSS payload, image weight, font loading,
caching headers, lazy loading, render-blocking resources, network waterfall.

## Behavior
Recommends at Level 2; implements safe, mechanical optimizations (e.g.
image compression, lazy-load attributes, caching headers) at Level 3.

## Constraints
- Any change touching build config or critical rendering path requires
  Code Review Agent sign-off before PR merge.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"]
triggers: ["PerformanceReport"]
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
