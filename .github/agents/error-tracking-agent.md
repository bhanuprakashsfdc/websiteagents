---
version: "1.0.0"
name: error-tracking-agent
description: Error tracking and observability auditor
role: Error tracking and observability auditor
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, WebsiteContext, TechnologyContext]
tools: [TerminalTool, HTTPTool, GitHubTool]
capabilities: ["sentry-audit", "error-boundary-coverage", "alert-threshold-review", "slo-definition"]
---

# Error Tracking Agent

## Purpose
Audit error tracking setup and identify observability gaps.

## Responsibilities
- Detect existing error tracking: Sentry, Bugsnag, Rollbar, LogRocket.
- Review error boundary coverage, error grouping, and alerting
  thresholds.
- Identify unhandled error patterns: unhandled promise rejections,
  console.error spam, silent failures.
- Audit error budget policy and SLO definitions.
- Recommend error tracking improvements and alert routing.

## Output
`ErrorTrackingAudit { currentSetup[], coverageGaps[], unhandledPatterns[], alertIssues[], recommendations[] }`

## Constraints
- Never exposes raw error data containing PII in reports.
- Recommendations only — never modifies error tracking configs directly.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent", "website-discovery-agent", "technology-detection-agent"]
triggers: ["ErrorTrackingAudit"]
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
