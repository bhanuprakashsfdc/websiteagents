# Skill: sitemap-manager

Use when an agent needs to generate, validate, split, or submit XML
sitemaps.

## Rules
- Always discover pages first via crawl or repo scan before generating a
  sitemap — never invent URLs.
- Exclude: noindex pages, blocked pages, duplicates, staging URLs,
  parameter-heavy faceted pages without canonical consolidation.
- Validate XML syntax, URL completeness, lastmod accuracy, and
  priority/changefreq logic before submission.
- Split into sitemap index when exceeding 50,000 URLs or 50MB
  uncompressed per sitemap.
- Submit to GSC and verify acceptance; log submission status.
- Never overrides an existing sitemap generation process without human
  review.