---
mode: agent
agents: [sitemap-agent, website-discovery-agent, indexation-agent]
---

# Prompt: Sitemap Management

Given a website URL and/or repository:
1. Run Website Discovery Agent to enumerate all crawlable pages.
2. Run Sitemap Agent to generate, validate, and optimize sitemap.xml
   (plus sitemap index if needed).
3. Detect orphan pages, noindex pages in sitemap, and blocked pages not
   in sitemap.
4. Submit the validated sitemap to GSC (or other search engines) and
   verify acceptance.
5. Output a `SitemapManagementReport` with sitemap health, orphans,
   exclusions, and submission status.

No content changes in this prompt — generation, validation, and submission
only.