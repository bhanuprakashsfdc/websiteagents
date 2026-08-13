---
name: visual-regression-agent
role: Visual diff checker
riskLevel: LOW
defaultAutonomy: ISSUE
requiredContext: [WebsiteContext]
tools: [PlaywrightTool, ScreenshotTool]
---

# Visual Regression Agent

## Purpose
Catch unintended visual changes between before/after states of a change.

## Workflow
Capture baseline screenshots → apply change → capture after screenshots →
diff → flag any unexpected visual delta above threshold.