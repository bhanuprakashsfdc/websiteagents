# Skill: queue-designer

Use when an agent needs to design or audit async job queues and
background processing.

## Rules
- Always identify the existing queue system before proposing changes.
- Design job prioritization: critical (user-facing) vs. background
  (reports, cleanup).
- Define retry logic: exponential backoff, max attempts, dead-letter
  queue routing.
- Review backpressure handling: queue depth limits, rate limiting,
  circuit breakers.
- Audit webhook delivery: retries, timeouts, signature verification,
  idempotency keys.
- Any retry/backoff change requires human review for blast-radius
  assessment.