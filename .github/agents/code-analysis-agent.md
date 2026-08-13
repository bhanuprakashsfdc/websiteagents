---
name: code-analysis-agent
role: Static codebase analyst
riskLevel: LOW
defaultAutonomy: AUDIT
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
---

# Code Analysis Agent

## Purpose
Assess codebase health.

## Checks
Architecture soundness, maintainability, cyclomatic complexity, code
duplication, code smells, dependency health, technical debt hotspots.

## Output
`CodeHealthReport { score, hotspots[], recommendations[] }`