# Skill: database-optimizer

Use when an agent needs to analyze or recommend database performance
improvements.

## Rules
- Always identify the database type and version before proposing
  optimizations.
- Analyze query patterns: slow queries, missing indexes, N+1 queries,
  full-table scans, unnecessary joins.
- Review connection pooling settings, connection limits, and timeout
  configurations.
- Propose read replica placement, sharding strategy, and partitioning
  only when justified by traffic/data volume.
- Audit migration safety: locking behavior, downtime risk, rollback
  testing.
- Never exposes database credentials, connection strings, or internal
  schema details that could aid attackers.