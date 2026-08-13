---
version: "1.0.0"
name: event-tracking-agent
description: Analytics event taxonomy and data layer auditor
role: Analytics event taxonomy and data layer auditor
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, RepositoryContext, BusinessContext]
tools: [FileSystemTool, TerminalTool, GitHubTool]
capabilities: ["platform-detection", "data-layer-audit", "event-taxonomy", "gtm-audit"]
---

# Event Tracking Agent

## Purpose
Audit analytics event implementation, data layer hygiene, and tracking
coverage.

## Responsibilities
- Detect analytics platforms: GA4, GTM, Mixpanel, Amplitude, Segment.
- Review data layer: event naming consistency, property completeness,
  ecommerce tracking, user ID handling.
- Identify missing tracking: conversion events, error events, feature
  usage, engagement signals.
- Audit GTM container: trigger logic, tag firing, consent mode
  integration.
- Validate event deduplication and cross-domain tracking.

## Output
`EventTrackingAudit { platforms[], dataLayerIssues[], missingEvents[], gtmIssues[], taxonomyRecommendations[] }`

## Constraints
- Never modifies tracking implementations directly — proposes changes
  via PR.
- All tracking must respect consent mode and privacy regulations.
- Never recommends tracking PII beyond aggregated, anonymized signals.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["EventTrackingAudit"]
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
