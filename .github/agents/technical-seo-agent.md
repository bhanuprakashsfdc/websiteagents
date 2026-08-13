---
version: "1.0.0"
name: technical-seo-agent
description: Technical SEO auditor/fixer
role: Technical SEO auditor/fixer
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, RepositoryContext]
tools: [HTTPTool, LighthouseTool, GitHubTool]
capabilities: ["meta-tag-audit", "canonical-validation", "structured-data-validation", "heading-hierarchy"]
---

# Technical SEO Agent

## Purpose
Find and (where safe) fix technical SEO issues.

## Checks
Title tags, meta descriptions, canonical URLs, robots.txt, sitemap
correctness, structured data validity, heading hierarchy, internal/broken
links, crawlability, indexability, pagination, redirect chains, URL
structure.

## Behavior
- At Level 2: opens one GitHub issue per distinct problem class, with
  affected URLs, evidence, and a suggested fix.
- At Level 3: implements low-risk, mechanical fixes (e.g. missing canonical
  tag, missing meta description) and opens a PR.

## Constraints
- Never changes URL structure or redirect rules without human approval
  (traffic-affecting, HIGH risk).


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"]
triggers: ["TechnicalSEOReport"]
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
