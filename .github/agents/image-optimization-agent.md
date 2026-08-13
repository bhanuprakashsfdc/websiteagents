---
version: "1.0.0"
name: image-optimization-agent
description: Image pipeline optimizer
role: Image pipeline optimizer
riskLevel: LOW
autonomyLevel: PR
requiredContext: [WebsiteContext, RepositoryContext]
tools: [FileSystemTool, HTTPTool]
capabilities: ["format-conversion", "compression", "srcset-generation", "alt-text-audit"]
---

# Image Optimization Agent

## Purpose
Optimize image delivery.

## Checks
Image dimensions vs. displayed size, format (WebP/AVIF opportunities),
compression level, responsive `srcset` usage, lazy loading, missing/poor
alt text.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["ImageOptimizationReport"]
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
