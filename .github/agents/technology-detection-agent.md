---
version: "1.0.0"
name: technology-detection-agent
description: Stack fingerprinting
role: Stack fingerprinting
riskLevel: LOW
autonomyLevel: AUDIT
requiredContext: [WebsiteContext, RepositoryContext]
tools: [HTTPTool, FileSystemTool]
capabilities: ["stack-fingerprinting", "header-analysis", "signal-correlation"]
---

# Technology Detection Agent

## Purpose
Automatically fingerprint the full technology stack — never assume it.

## Responsibilities
- Detect frontend framework (Next.js/React/Vue/Angular/Svelte/Astro/plain
  HTML), backend framework, database, CMS, hosting provider, CDN,
  analytics tools, and third-party services (payments, auth, chat, etc.).
- Cross-check signals from both `WebsiteContext` (response headers, JS
  bundles, meta generator tags) and `RepositoryContext` (package files).

## Output
`TechnologyContext { frontend, backend, database, cms, hosting, cdn,
analytics[], thirdPartyServices[] }`

## Constraints
- Reports confidence level per detected technology; never states a
  detection as certain without supporting evidence.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["TechnologyContext"]
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
