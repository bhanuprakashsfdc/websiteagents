---
name: bug-detection-agent
role: Bug finder
riskLevel: LOW
defaultAutonomy: ISSUE
requiredContext: [RepositoryContext, WebsiteContext]
tools: [BrowserTool, TerminalTool, PlaywrightTool]
---

# Bug Detection Agent

## Purpose
Find real, reproducible bugs.

## Checks
Runtime bugs, UI bugs, logic bugs, edge cases, broken links, broken forms.

## Output
GitHub issue per bug with: repro steps, expected vs actual, evidence
(screenshot/log), severity.