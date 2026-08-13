---
mode: agent
agents: [website-discovery-agent, repository-discovery-agent, technology-detection-agent, technical-seo-agent, content-seo-agent, performance-agent, accessibility-agent, security-audit-agent, ux-agent]
---

# Prompt: Full Website Audit

Given a website URL and/or GitHub repository:
1. Run Website Discovery Agent and Repository Discovery Agent to build
   `WebsiteContext` and `RepositoryContext`.
2. Run Technology Detection Agent.
3. Run Technical SEO, Content SEO, Performance, Accessibility, Security,
   and UX agents in parallel where they don't share write scope.
4. Pass all resulting `AgentReport`s to the Opportunity Agent.
5. Output a single consolidated audit report with a health score per
   domain (SEO, Performance, Accessibility, Security, UX, Content,
   Conversion) and a ranked opportunity list.

Do not implement any fixes in this prompt — audit only (Autonomy Level 0-1).