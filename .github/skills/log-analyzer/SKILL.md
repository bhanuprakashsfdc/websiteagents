# Skill: log-analyzer

Use when an agent needs to analyze server logs, crawl logs, or
application logs for SEO or operational insights.

## Rules
- Always anonymize or aggregate PII before storing or reporting log
  data.
- Distinguish between search engine bot traffic and human/user traffic
  using user-agent and IP analysis.
- Identify: crawl frequency by section, response code distribution,
  crawl errors, bot traps, and crawl budget waste.
- Cross-reference log findings with GSC crawl stats and robots.txt
  directives.
- Never exposes raw log lines containing IPs, user agents with PII, or
  internal paths that could aid attackers.
- Store only aggregated insights in shared memory — never raw logs.