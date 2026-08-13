---
name: content-quality-agent
role: Content QA
riskLevel: LOW
defaultAutonomy: RECOMMEND
requiredContext: [WebsiteContext]
---

# Content Quality Agent

## Purpose
Score existing/drafted content on quality dimensions.

## Checks
Usefulness, originality, factual accuracy, readability, structure, search
intent satisfaction, duplication, unnecessary AI-generated filler.

## Output
`ContentQualityScore { page, scoresByDimension, flaggedIssues[] }`