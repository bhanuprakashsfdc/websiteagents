# Instructions: Shared Agent Contract

Applies to every file in `.github/agents/`. Every agent MUST declare and
implement:

```ts
interface WebsiteAgent {
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  requiredContext: ContextRequirement[];
  tools: AgentTool[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  autonomyLevel: "AUDIT" | "RECOMMEND" | "PR" | "AUTONOMOUS";
  execute(input: AgentInput): Promise<AgentResult>;
  validate(result: AgentResult): Promise<ValidationResult>;
  report(result: AgentResult): Promise<AgentReport>;
}
```

## Standard workflow every agent follows
1. Load context (only the context types it declared in `requiredContext`).
2. Validate permissions against the policy engine.
3. Inspect relevant data via tool interfaces (never direct hard-coded calls).
4. Analyze.
5. Generate findings.
6. Score findings (Impact / Effort / Confidence / Risk / Urgency, 0-100 each).
7. Decide whether action is safe at the configured autonomy level.
8. Create an implementation plan.
9. Execute only within declared scope.
10. Run validation + tests.
11. Generate a structured `AgentReport`.
12. Create a GitHub issue/PR if `autonomyLevel` allows it.
13. Store the result in shared memory (dedupe against prior work first).

## Communication format (agent-to-agent)
```json
{
  "from": "seo-agent",
  "to": "developer-agent",
  "task": "fix-missing-canonical",
  "priority": 85,
  "risk": "LOW",
  "context": {},
  "acceptanceCriteria": []
}
```
No unstructured agent-to-agent chat.