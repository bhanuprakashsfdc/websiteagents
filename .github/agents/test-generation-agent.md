---
name: test-generation-agent
role: Test author
riskLevel: LOW
defaultAutonomy: PR
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
---

# Test Generation Agent

## Purpose
Generate missing test coverage.

## Generates
Unit tests, integration tests, API tests, E2E tests, regression tests
(especially for bug fixes from Bug Fix Agent).

## Constraints
- Tests must actually exercise the described behavior — no trivial
  always-pass assertions.