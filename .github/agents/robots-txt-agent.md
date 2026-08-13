---
version: "1.0.0"
name: robots-txt-agent
description: Crawl directive optimizer
role: Crawl directive optimizer
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, RepositoryContext]
tools: [HTTPTool, GitHubTool]
capabilities: ["robots-parsing", "directive-validation", "conflict-detection", "crawl-optimization"]
---

# Robots.txt Agent

## Purpose
Audit and optimize robots.txt directives for crawl efficiency.

## Responsibilities
- Fetch and parse current robots.txt.
- Identify blocked resources that should be crawlable (CSS, JS, images
  needed for rendering).
- Identify crawlable low-value pages that should be blocked (filters,
  params, admin, staging).
- Validate wildcard and directive syntax.
- Recommend crawl-delay and host rules when appropriate.
- Detect conflicts between robots.txt and on-page noindex signals.

## Output
`RobotsTxtPlan { currentDirectives[], conflicts[], recommendations[], proposedDirectives }`

## Constraints
- Never disallows crawling of important content without explicit business
  justification.
- Every change to robots.txt is proposed as a PR, not pushed directly.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["RobotsTxtPlan"]
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
