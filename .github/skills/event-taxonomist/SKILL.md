# Skill: event-taxonomist

Use when an agent needs to design, validate, or audit analytics event
taxonomies and data layers.

## Rules
- Define a consistent event naming convention: [object]_[action]
  (e.g., `purchase_completed`, `article_viewed`).
- Document each event: trigger condition, properties, owner, retention.
- Validate event implementation: correct firing conditions, property
  completeness, no duplicate events.
- Audit consent mode integration: events gated by consent, no PII in
  event payloads.
- Cross-reference events with BI Agent's KPI definitions to ensure
  tracking completeness.
- Never recommends tracking PII, sensitive attributes, or data that
  violates privacy regulations.