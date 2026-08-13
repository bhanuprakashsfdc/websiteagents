# Skill: schema-markup

Use when an agent needs to generate, validate, or recommend structured
data / schema.org markup.

## Rules
- Always detect existing schema first via `WebsiteContext` and
  `RepositoryContext` before proposing additions.
- Match schema type to page purpose: Product, Service, LocalBusiness,
  Organization, FAQPage, BreadcrumbList, Article, HowTo, etc.
- Validate JSON-LD syntax and required properties for each type.
- Flag missing recommended properties (not just required) as improvement
  opportunities.
- Never recommends schema that misrepresents page content — accuracy
  over richness.
- Output machine-readable JSON-LD plus a plain-language explanation of
  what each property does.