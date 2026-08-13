# Skill: keyword-research

Use when an agent needs to discover, cluster, and prioritize search
keywords.

## Rules
- Always anchor keyword discovery to the business model and existing
  content in `WebsiteContext` and `BusinessContext`.
- Cluster by intent before scoring: informational, navigational,
  commercial, transactional.
- Score each cluster on: relevance, estimated difficulty, search intent
  match, and conversion alignment.
- Never fabricate search volume data — use proxy signals or mark as
  estimated.
- Always produce a gap map: existing pages vs. keyword coverage.
- Pass results to Content Strategy Agent and Content Brief Agent — do not
  skip straight to content creation.