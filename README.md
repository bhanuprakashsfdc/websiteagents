# Website Agent Factory

CLI to generate a complete website brief and orchestrate 50+ AI agents to build, test, deploy, and grow a website from scratch.

## Install

```bash
npm install -g website-agent-factory
```

Or use directly:

```bash
npx website-factory init
```

## Quick Start

```bash
# 1. Initialize a new brief interactively
website-factory init

# 2. Validate your brief
website-factory validate

# 3. Generate the full AI prompt
website-factory build
```

## Commands

| Command | Description |
|---------|-------------|
| `website-factory init` | Create a new website brief interactively |
| `website-factory validate` | Validate an existing brief |
| `website-factory build` | Generate `FULL_PROMPT.md` from brief |
| `website-factory templates` | List available templates |

## Templates

Choose from pre-built templates:

- **SaaS** — Software as a Service with subscription pricing
- **Ecommerce** — Online store with product catalog and checkout
- **Blog** — Content-driven site with articles and resources
- **Portfolio** — Personal or agency portfolio showcase
- **Lead-gen** — Service business with lead capture focus
- **Marketplace** — Two-sided marketplace with buyers and sellers

## How It Works

1. **Fill the brief** — Run `website-factory init` and answer questions, or edit `website-brief.json` directly
2. **Validate** — Run `website-factory validate` to check for missing fields
3. **Build** — Run `website-factory build` to generate `FULL_PROMPT.md`
4. **Execute** — Paste `FULL_PROMPT.md` into your AI agent and say: "Execute this prompt"

The generated prompt orchestrates 50+ specialized agents across 10 phases:

1. Discovery & Understanding
2. Strategy & Planning
3. Design & Content
4. Technical Implementation
5. Quality Gates
6. Deployment
7. Search Engine Setup
8. Growth & Optimization
9. Continuous Improvement Loop

## Project Structure

```
website-agent-factory/
├── bin/
│   └── cli.js                 # CLI entry point
├── lib/
│   ├── brief.js               # Brief validation, load, save
│   ├── templates.js           # Pre-built website templates
│   └── prompt-builder.js      # Generates FULL_PROMPT.md
├── templates/                 # Template files (optional)
├── website-brief.json         # Your filled brief
└── FULL_PROMPT.md            # Generated prompt for AI agent
```

## Editing the Brief Manually

You can also edit `website-brief.json` directly:

```json
{
  "website": {
    "name": "My Website",
    "url": "https://example.com",
    "repo": "https://github.com/me/my-site"
  },
  "business": {
    "model": "SaaS",
    "industry": "Developer Tools",
    "targetAudience": "Freelance developers",
    "valueProposition": "Ship sites 10x faster with AI",
    "differentiators": ["Zero-config setup", "Built-in SEO"]
  },
  "goals": {
    "primary": "1000 signups/month",
    "secondary": ["5% conversion rate", "90+ Lighthouse score"],
    "timeline": "3 months to MVP"
  },
  "content": {
    "pages": [
      { "name": "Home", "purpose": "Hero, value prop, CTA" },
      { "name": "Pricing", "purpose": "Plans, FAQ, CTA" }
    ],
    "existingContent": "No — generate from scratch",
    "brandGuidelines": "Modern, minimal, blue/white"
  },
  "technical": {
    "preferredStack": "Next.js + Tailwind + Vercel",
    "cms": "",
    "hosting": "Vercel",
    "database": "Supabase",
    "integrations": ["Stripe", "Posthog", "Resend", "Sentry"],
    "constraints": "WCAG AA, Lighthouse 90+"
  },
  "seo": {
    "targetKeywords": ["ai website builder", "nextjs seo"],
    "competitors": ["competitor1.com", "competitor2.com"],
    "regions": "US, UK, EU",
    "languages": "en"
  },
  "compliance": {
    "regulations": "GDPR",
    "dataCollected": "email, payment info, usage analytics",
    "cookieConsent": "Yes"
  },
  "growth": {
    "acquisitionChannels": ["Organic SEO", "Content Marketing", "Paid Ads"],
    "monetization": "Freemium subscription",
    "emailProvider": "Resend",
    "analytics": "Posthog"
  }
}
```

## License

MIT
