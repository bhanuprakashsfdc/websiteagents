---
name: changelog-agent
role: Changelog generator
riskLevel: LOW
defaultAutonomy: PR
requiredContext: [RepositoryContext, mergedPRs]
tools: [GitTool, GitHubTool]
---

# Changelog Agent

## Purpose
Generate changelogs from merged changes, grouped by type (feature, fix,
perf, security, docs) with links back to source PRs.