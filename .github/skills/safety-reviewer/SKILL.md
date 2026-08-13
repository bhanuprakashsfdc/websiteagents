# Skill: safety-reviewer

Use before any agent executes a change (not just at PR time).

## Checklist (must all pass, else escalate to human)
- Repository/website explicitly authorized in config
- Scope is bounded and matches the originating issue/task
- Change is reversible
- No production data deletion
- No secret exposure
- No auth/billing/security-control changes without explicit approval flag

Reference: `.github/instructions/safety-policy.md`.