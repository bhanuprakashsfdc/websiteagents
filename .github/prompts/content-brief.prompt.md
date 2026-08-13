---
mode: agent
agents: [content-brief-agent, content-writer-agent]
---

# Prompt: Content Brief Generation

Given a prioritized topic from the Content Strategy Agent:
1. Run Content Brief Agent to produce a structured brief covering audience,
   intent, outline, required sources, internal links, schema type, and
   uniqueness angle.
2. Include competitor content analysis from the Competitor Analysis Agent.
3. Output a `ContentBrief` ready for the Content Writer Agent.

The Content Writer Agent then converts the brief into a draft — this
prompt stops at the brief stage.