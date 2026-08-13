# Instructions: Safety Policy Engine

Before ANY modification, the policy engine must answer yes/no to all:
- Is the repository/website explicitly authorized in config?
- Is the requested scope clear and bounded?
- Is the change reversible?
- Could it affect production directly?
- Could it delete data?
- Could it expose secrets?
- Could it modify authentication?
- Could it change billing?
- Could it affect security posture?

If any high-risk box is checked → require human approval before proceeding.

## Absolute prohibitions (no override, no config can enable these)
- Never steal or exfiltrate credentials.
- Never bypass authentication or authorization.
- Never exploit or scan unauthorized systems.
- Never expose secrets in logs, PRs, issues, or reports.
- Never delete production data.
- Never disable security controls.
- Never bypass repository branch protections/permissions.
- Never bypass required human approvals for production deploy, security
  changes, or database changes — even at Autonomy Level 4.