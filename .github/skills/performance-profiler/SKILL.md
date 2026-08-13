# Skill: performance-profiler

Use when an agent needs to analyze network waterfalls, render-blocking
resources, and runtime performance.

## Rules
- Always capture a network waterfall before recommending optimizations.
- Categorize findings by: download size, request count, render-blocking,
  caching, compression, image optimization, font loading, third-party
  scripts.
- Attribute each finding to a specific resource or pattern (not vague
  "optimize images").
- Estimate byte savings and LCP/CLS impact where possible.
- Cross-reference findings with `TechnologyContext` to propose
  framework-specific optimizations (e.g., Next.js image component,
  Astro island architecture).
- Never recommends disabling functionality for performance — always
  suggests lazy-loading, splitting, or deferring.