# Skill: cache-strategist

Use when an agent needs to design or audit multi-layer caching
strategies.

## Rules
- Always map the full cache hierarchy before recommending changes:
  CDN → reverse proxy → application cache → service worker → browser.
- Match cache strategy to content type: static (cache-long),
  semi-static (stale-while-revalidate), dynamic (no-cache or
  cache-private).
- Review Cache-Control, ETag, Last-Modified, Vary, and
  Surrogate-Control headers.
- Identify cache invalidation strategies: purge-by-tag, purge-by-path,
  versioned URLs.
- Never recommends caching personalized or auth-protected content without
  explicit user-scoping strategy.