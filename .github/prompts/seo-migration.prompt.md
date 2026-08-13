---
mode: agent
agents: [technical-seo-agent, infrastructure-agent, release-agent]
---

# Prompt: SEO Migration Safety Check

Given a domain change, HTTP→HTTPS migration, or URL structure change:
1. Run Technical SEO Agent to audit current indexation, canonical state,
   redirect map, and sitemap.
2. Run Infrastructure Agent to validate redirect rules, server config, and
   CDN invalidation.
3. Produce a `MigrationSafetyPlan` with pre-migration checklist,
   redirect map validation, indexation preservation steps, and rollback
  criteria.
4. Flag any step as HIGH risk requiring human approval.

No changes are implemented in this prompt — planning and validation only.