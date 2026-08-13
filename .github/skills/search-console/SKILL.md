# Skill: search-console

Use when an agent needs to integrate with Google Search Console.

## Rules
- Always verify the property is explicitly authorized in config before
  accessing GSC data.
- Respect GSC API quotas — batch requests, cache results, avoid
  redundant pulls in the same session.
- Normalize all date ranges to the agent's configured lookback window.
- Map GSC metric definitions accurately: impressions ≠ clicks, average
  position is a rough estimate, CTR can be inflated by branded queries.
- Flag manual actions and security issues immediately as HIGH priority —
  these require urgent human review.
- Never expose GSC API keys, OAuth tokens, or refresh tokens in reports,
  logs, or PRs.