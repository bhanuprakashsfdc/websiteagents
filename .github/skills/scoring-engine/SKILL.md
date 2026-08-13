# Skill: scoring-engine

Use when any agent needs to score a finding or opportunity.

## Scoring dimensions (0-100 each)
Impact, Effort, Confidence, Risk, Urgency.

## Priority formula (default, override via config)
`priority = (impact * confidence * urgency) / max(effort, 1) - riskPenalty(risk)`

## Rules
- Never assign a score without a stated one-line justification.
- Confidence must reflect actual evidence quality, not agent certainty of
  tone.