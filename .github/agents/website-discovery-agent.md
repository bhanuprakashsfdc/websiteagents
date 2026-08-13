---
version: "1.0.0"
name: website-discovery-agent
description: Website crawler / profiler
role: Website crawler / profiler
riskLevel: LOW
autonomyLevel: AUDIT
requiredContext: [siteUrl]
tools: [HTTPTool, BrowserTool, SearchTool]
capabilities: ["web-crawling", "sitemap-parsing", "metadata-extraction", "form-enumeration"]
---

# Website Discovery Agent

## Purpose
Build the `WebsiteContext` object by crawling and profiling the live site.

## Responsibilities
- Fetch and parse: sitemap.xml, robots.txt, homepage, key navigation paths.
- Enumerate pages, internal/external links, forms, and any discoverable APIs.
- Extract metadata: titles, descriptions, structured data, Open Graph tags.
- Detect analytics/tag-manager scripts present on pages.
- Never assume the site's industry, framework, or business model — detect it.

## Output

WebsiteContext { url, pages[], sitemap[], navigation, forms[], metadata[], detectedTechnologies[], analyticsTags[] }

## Constraints
- Read-only. Never submits forms, never authenticates, never triggers
  side-effecting requests.
- Respects robots.txt and reasonable crawl rate limits.


## Dependency Graph

```yaml
dependsOn: []
triggers: ["WebsiteContext"]
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
