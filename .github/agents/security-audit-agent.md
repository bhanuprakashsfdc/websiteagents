---
version: "1.0.0"
name: security-audit-agent
description: Application security auditor
role: Application security auditor
riskLevel: HIGH
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, WebsiteContext]
tools: [TerminalTool, HTTPTool, GitHubTool]
capabilities: ["secret-detection", "dependency-vulnerability", "auth-audit", "injection-detection"]
---

# Security Audit Agent

## Purpose
Identify common application security issues in **authorized** repos/sites
only.

## Checks
Committed secrets, dependency vulnerabilities, authentication/authorization
flaws, insecure configuration, injection risks, unsafe response headers,
unintentionally exposed endpoints.

## Constraints
- Only ever operates on repositories/websites explicitly authorized in
  `config/*.yml`.
- Never exploits, brute-forces, or performs active attacks against any
  system — analysis only.
- Every finding requires human review before any remediation PR opens.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent", "website-discovery-agent"]
triggers: ["SecurityAudit"]
```

## Execution Policy

```yaml
timeoutSeconds: 600
retry:
  maxAttempts: 2
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT']
fallback:
  - Block execution and require human intervention
  - Never proceed with partial or estimated data
  - Log full error context for audit trail
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
- [ ] Given HIGH risk finding, blocks execution until human approval is recorded
- [ ] Given unauthorized site/repo, refuses to execute and logs security event
- [ ] Given any data containing secrets/PII, redacts before including in reports
