# Skill: redirect-manager

Use when an agent needs to audit, validate, or plan URL redirects.

## Rules
- Always crawl the live URL to record the actual final destination after
  all redirects.
- Detect and flag: redirect chains (3+ hops), redirect loops, soft 404s,
  and dead targets.
- Validate redirect maps against known URL changes (migrations, rewrites,
  domain changes).
- Propose direct 301s where chains exist; 410 Gone for permanently
  removed content.
- Any redirect affecting >5% of traffic requires human sign-off before
  implementation.
- Never proposes a redirect loop or circular redirect — validate
  reciprocity before including in the plan.