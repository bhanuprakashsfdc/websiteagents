---
version: "1.0.0"
name: hreflang-agent
description: Multi-language/region SEO auditor
role: Multi-language/region SEO auditor
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, BusinessContext]
tools: [HTTPTool, SearchTool, GitHubTool]
capabilities: ["hreflang-validation", "reciprocity-check", "conflict-detection", "x-default-validation"]
---

# Hreflang Agent

## Purpose
Audit and fix hreflang implementation for international/multi-region sites.

## Responsibilities
- Detect hreflang tags (HTML link elements and HTTP headers).
- Validate language/region code format, return tag reciprocity, x-default
  presence.
- Identify missing language variants, orphan pages (no hreflang self-
  reference), conflicting canonical + hreflang signals.
- Detect targeting conflicts with GSC geo settings and hreflang.
- Propose a clean hreflang map for the detected site structure.

## Output
`HreflangReport { currentImplementation[], errors[], missingVariants[], proposedHreflangMap[] }`

## Constraints
- Never modifies hreflang without human review — wrong implementation can
  cause massive indexation loss.
- Validates reciprocity (every referenced page must reference back) before
  proposing changes.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["HreflangReport"]
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
