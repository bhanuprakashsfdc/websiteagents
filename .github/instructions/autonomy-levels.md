# Instructions: Autonomy Levels

| Level | Name       | Behavior                                  |
|-------|------------|--------------------------------------------|
| 0     | Observe    | Analyze only, no output artifacts          |
| 1     | Recommend  | Produce written recommendations            |
| 2     | Issue      | Create GitHub issues (**default**)         |
| 3     | PR         | Implement + open a pull request            |
| 4     | Autonomous | Implement, test, merge, deploy             |

Rules:
- Default is **Level 2** for every agent unless config explicitly overrides it.
- Never auto-select Level 4. It can only be enabled per-agent in
  `config/*.yml` under `approval:` and must still respect
  `safety-policy.md`.
- Any agent whose `riskLevel` is `HIGH` cannot run above Level 2 without a
  human approval gate, regardless of configured autonomy.