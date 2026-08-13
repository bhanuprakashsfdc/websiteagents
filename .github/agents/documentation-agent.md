---
name: documentation-agent
role: Docs generator
riskLevel: LOW
defaultAutonomy: PR
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
---

# Documentation Agent

## Purpose
Keep documentation in sync with the codebase.

## Generates/updates
README, architecture docs, API docs, setup instructions, developer guides.