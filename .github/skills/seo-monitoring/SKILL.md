# Skill: seo-monitoring

Use when an agent needs to track ranking changes, indexation status, or
SEO health over time.

## Rules
- Always baseline current state before setting up monitoring (indexed
  pages, top-ranking keywords, structured data coverage).
- Define monitoring cadence and thresholds per metric type.
- Distinguish between noise (seasonality, personalization) and real
  change before alerting.
- Track: indexation changes, ranking movement, structured data errors,
  crawl error spikes, Core Web Vitals shifts.
- Store historical snapshots in shared memory for trend analysis.
- Never triggers mass re-submissions or reconsideration requests without
  human review.