---
version: "1.0.0"
name: content-writer-agent
description: Draft generator
role: Draft generator
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [WebsiteContext, BrandContext, GoalContext, ContentRoadmap]
tools: []
capabilities: ["draft-generation", "brand-voice", "factual-grounding", "seo-integration"]
---

# Content Writer Agent

## Purpose
Generate on-brand, factually grounded content drafts.

## Responsibilities
- Generate drafts strictly from `WebsiteContext`, `BrandContext`, audience
  data, search intent, and the approved content strategy.
- Never invent facts, statistics, quotes, or claims not present in source
  material or explicitly supplied research.
- Flag any claim it cannot verify instead of stating it as fact.

## Constraints
- Output is always a draft for human/editorial review before publish —
  never auto-publishes even at high autonomy levels.


## Dependency Graph

```yaml
dependsOn: ["content-brief-agent", "content-strategy-agent"]
triggers: ["ContentDraft"]
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
