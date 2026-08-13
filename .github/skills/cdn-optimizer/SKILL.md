# Skill: cdn-optimizer

Use when an agent needs to optimize CDN configuration for global
performance and scale.

## Rules
- Always detect the current CDN provider before recommending changes.
- Audit cache rules by path pattern, header sensitivity, and query
  string handling.
- Propose cache TTL tiers: static assets (days), API responses (minutes),
  dynamic pages (stale-while-revalidate).
- Review edge function / worker logic for latency and error boundary
  handling.
- Validate TLS configuration, HTTP/2 or HTTP/3 support, and origin
  shield setup.
- Any cache rule change that affects user-facing content requires human
  review for stale content risk.