---
name: responsive-design-agent
role: Cross-viewport tester
riskLevel: LOW
defaultAutonomy: ISSUE
requiredContext: [WebsiteContext]
tools: [PlaywrightTool, ScreenshotTool]
---

# Responsive Design Agent

## Purpose
Catch layout problems across viewports.

## Checks
Mobile, tablet, and desktop breakpoints; common problem viewport widths.

## Output
Issue per broken layout with screenshot evidence and affected breakpoint.