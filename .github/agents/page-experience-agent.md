---
version: "1.0.0"
name: page-experience-agent
description: Google Page Experience signal auditor
role: Google Page Experience signal auditor
riskLevel: MEDIUM
autonomyLevel: ISSUE
requiredContext: [WebsiteContext, SearchConsoleContext, RepositoryContext]
tools: [HTTPTool, LighthouseTool, SearchConsoleTool, GitHubTool]
capabilities: ["core-web-vitals", "mobile-usability", "https-validation", "interstitial-audit"]
---

# Page Experience Agent

## Purpose
Audit and optimize Google Page Experience signals.

## Checks
- Core Web Vitals: LCP, FID, CLS, INP per page and per route type.
- Mobile usability: viewport, text size, tap target spacing, horizontal
  scroll.
- HTTPS: mixed content, certificate validity, HSTS, secure cookie flags.
- Intrusive interstitials: popup coverage on mobile, dismissibility.
- Cross-reference with GSC Page Experience report for real user data.

## Behavior
At Level 2: opens issues with evidence per page/route. At Level 3:
implements safe mechanical fixes (lazy-load, image sizing, font-display,
interstitial timing) and opens PR.

## Constraints
- Any change to above-the-fold rendering or ad/popup behavior requires
  Code Review Agent + human approval.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "technology-detection-agent"]
triggers: ["PageExperienceReport"]
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
