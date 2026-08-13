---
mode: agent
agents: [ceo-strategy-agent, project-manager-agent, opportunity-agent, website-discovery-agent, repository-discovery-agent, technology-detection-agent, keyword-research-agent, competitor-analysis-agent, content-strategy-agent, content-brief-agent, content-writer-agent, ux-agent, design-system-agent, conversion-optimization-agent, accessibility-agent, feature-development-agent, performance-agent, image-optimization-agent, test-generation-agent, qa-agent, code-review-agent, pr-agent, release-agent, documentation-agent, search-console-agent, sitemap-agent, analytics-agent, growth-agent, experiment-agent, onboarding-agent, retention-agent, event-tracking-agent, bi-agent, monitoring-agent, security-audit-agent, compliance-agent, i18n-agent, payment-agent, social-proof-agent, support-agent, personalization-agent, web-push-agent, api-agent, error-tracking-agent, database-agent, queue-agent, cdn-agent, caching-agent, infrastructure-agent, indexation-agent, backlink-agent, schema-markup-agent, hreflang-agent, page-experience-agent, crawl-budget-agent, robots-txt-agent, redirect-manager-agent, technical-seo-agent, content-seo-agent, internal-linking-agent, programmatic-seo-agent, ai-search-visibility-agent, local-seo-agent, ecommerce-agent, responsive-design-agent, visual-regression-agent, refactoring-agent, dependency-agent, documentation-agent, changelog-agent, rollback-agent, code-analysis-agent, bug-detection-agent, bug-fix-agent]
---

# Prompt: Create a Website from Brief

You are the Website Agent Factory. Given a completed `WebsiteBrief` inside
the `<environment_details>` block below, execute the full build lifecycle:
Discover → Strategy → Design → Build → Test → Deploy → Measure → Grow.

<environment_details>
  <summary>Website Brief — replace this block with your actual website data</summary>

  # Paste your completed website-brief.js output here
  # Run: node website-brief.js
  # Then paste the printed brief below this line

  website:
    name: "{{Your Website Name}}"
    url: "{{https://yourdomain.com}}"
    repo: "{{https://github.com/your-org/your-repo}}"

  business:
    model: "{{SaaS / Ecommerce / Content / Lead-gen / Marketplace / Other}}"
    industry: "{{e.g. Fintech, Health, Education, DevTools}}"
    targetAudience: "{{e.g. freelance developers, small business owners, students}}"
    valueProposition: "{{One sentence: what problem do you solve and for whom?}}"
    differentiators:
      - "{{What makes you different from competitors}}"
      - "{{Second differentiator}}"

  goals:
    primary: "{{e.g. 1000 signups/month, $50k MRR, 100k organic visits/month}}"
    secondary:
      - "{{e.g. 5% conversion rate}}"
      - "{{e.g. <2s LCP}}"
    timeline: "{{e.g. 3 months to MVP, 6 months to scale}}"

  content:
    pages:
      - name: "Home"
        purpose: "Hero, value prop, primary CTA, social proof"
      - name: "About"
        purpose: "Founder story, mission, team"
      - name: "Product/Service"
        purpose: "Features, pricing, use cases"
      - name: "Blog/Resources"
        purpose: "Topical content, SEO, thought leadership"
      - name: "Contact"
        purpose: "Form, location, support links"
      - name: "{{Additional page}}"
        purpose: "{{Purpose}}"
    existingContent: "{{Yes — I have drafts / No — generate from scratch / Partial — some pages exist}}"
    brandGuidelines: "{{Link to brand doc or describe: colors, typography, tone, voice}}"

  technical:
    preferredStack: "{{e.g. Next.js + Tailwind + Vercel, or leave blank for recommendation}}"
    cms: "{{e.g. Contentful, Sanity, Ghost, or leave blank}}"
    hosting: "{{e.g. Vercel, AWS, Cloudflare Pages}}"
    database: "{{e.g. PostgreSQL, Supabase, Firebase}}"
    integrations:
      - "{{e.g. Stripe}}"
      - "{{e.g. Posthog}}"
      - "{{e.g. Resend}}"
      - "{{e.g. Sentry}}"
    constraints: "{{e.g. must be accessible WCAG AA, must pass Lighthouse 90+, must support 10k concurrent users}}"

  seo:
    targetKeywords:
      - "{{primary keyword cluster 1}}"
      - "{{primary keyword cluster 2}}"
    competitors:
      - "{{competitor1.com}}"
      - "{{competitor2.com}}"
    regions: "{{e.g. US, UK, EU, or single market}}"
    languages: "{{e.g. en only, en + es, en + fr + ar}}"

  compliance:
    regulations: "{{e.g. GDPR, CCPA, HIPAA, PCI}}"
    dataCollected: "{{e.g. email, payment info, usage analytics}}"
    cookieConsent: "{{Yes / No / Required by regulation}}"

  growth:
    acquisitionChannels:
      - "{{e.g. Organic SEO, Content Marketing, Paid Ads, Email, Referral}}"
    monetization: "{{Subscription / One-time / Freemium / Ads / Marketplace commission}}"
    emailProvider: "{{e.g. Resend, Mailgun, SendGrid, ConvertKit}}"
    analytics: "{{e.g. GA4, Mixpanel, Posthog, Plausible}}"
</environment_details>

## Step 1: Validate the Brief

Before any build work begins, the CEO Strategy Agent reviews the brief inside
`<environment_details>` and validates:

- All required fields are filled (no `{{...}}` placeholders remain).
- Business model and goals are internally consistent.
- Technical constraints are realistic for the stated timeline and traffic
  goals.
- Compliance requirements are identified and flagged.

If validation fails, STOP and return the gaps to the user. Do not proceed
with an incomplete brief.

## Step 2: Discovery and Understanding

Run these agents in parallel where possible:

1. **Website Discovery Agent** — if an existing site/repo URL is provided,
   crawl and profile it. If greenfield, note "no existing site" and skip.
2. **Repository Discovery Agent** — scan the repo for existing code,
   conventions, dependencies, CI/CD.
3. **Technology Detection Agent** — fingerprint stack from repo + any
   existing live site.
4. **Competitor Analysis Agent** — benchmark against listed competitors
   across content, UX, performance, SEO.
5. **Keyword Research Agent** — discover and cluster target keywords from
   the brief's `seo.targetKeywords` and `business.industry`.

Outputs: `WebsiteContext`, `RepositoryContext`, `TechnologyContext`,
`CompetitiveGapMap`, `KeywordRoadmap`.

## Step 3: Strategy and Planning

6. **CEO Strategy Agent** — review all discovery outputs, produce a ranked
   `WorkPlan` for this build cycle (cap: top 10 items unless brief
   overrides).
7. **Project Manager Agent** — convert the `WorkPlan` into trackable units
   with dependencies mapped.
8. **Content Strategy Agent** — produce `ContentRoadmap` from keyword
   clusters, competitor gaps, and the brief's `content.pages`.
9. **Content Brief Agent** — generate structured briefs for each planned
   page.
10. **Opportunity Agent** — surface cross-domain opportunities (SEO, UX,
    performance, conversion, compliance) ranked by impact/effort.

Outputs: `WorkPlan`, `ProjectRoadmap`, `ContentRoadmap`, `ContentBriefs[]`,
`OpportunityList`.

## Step 4: Design and Content

11. **UX Agent** — evaluate and improve information architecture, visual
    hierarchy, CTA clarity, and mobile experience for each planned page.
12. **Design System Agent** — propose design tokens, component patterns,
    and consistency rules.
13. **Content Writer Agent** — generate on-brand drafts from each
    `ContentBrief`. Output is always draft — editorial review required
    before publish.
14. **Content Quality Agent** — score each draft on usefulness, accuracy,
    readability, intent satisfaction.
15. **Conversion Optimization Agent** — optimize CTAs, forms, and
    conversion paths.
16. **Social Proof Agent** — audit and recommend trust signals, reviews,
    testimonials per page.
17. **Support Agent** — design help center structure and support routing.

Outputs: `UXRecommendations`, `DesignSystem`, `ContentDrafts[]`,
`QualityScores[]`, `ConversionPlan`, `SocialProofPlan`, `SupportPlan`.

## Step 5: Technical Implementation

18. **SEO Foundation** (run in parallel):
    - **Technical SEO Agent** — titles, metas, canonicals, structured data,
      heading hierarchy.
    - **Schema Markup Agent** — generate JSON-LD for each page type
      (Organization, Product, FAQ, Breadcrumb, etc.).
    - **Internal Linking Agent** — plan hub pages, topic clusters, contextual
      links.
    - **Sitemap Agent** — generate sitemap.xml from planned page structure.
    - **Robots.txt Agent** — propose crawl directives.
    - **Hreflang Agent** — if multi-language, implement hreflang map.
19. **Development**:
    - **Feature Development Agent** — implement each planned page and
      feature per the `WorkPlan`.
    - **Performance Agent** — implement Core Web Vitals optimizations
      during build.
    - **Image Optimization Agent** — optimize images, srcset, lazy loading.
    - **Accessibility Agent** — fix WCAG issues during build.
    - **Responsive Design Agent** — validate cross-viewport layouts.
    - **API Agent** — build and optimize API endpoints.
    - **Payment Agent** — integrate payment flows if ecommerce/monetization.
    - **Personalization Agent** — implement personalization signals if
      applicable.
    - **Web Push Agent** — implement push notification infrastructure if
      applicable.
20. **Infrastructure**:
    - **Infrastructure Agent** — IaC, Docker, deployment config.
    - **CDN Agent** — configure CDN and edge caching.
    - **Caching Agent** — implement multi-layer caching strategy.
    - **Database Agent** — design schema, indexes, connection pooling.
    - **Queue Agent** — implement async processing for slow operations.
    - **Event Tracking Agent** — implement analytics data layer and events.
    - **Error Tracking Agent** — set up error monitoring.
    - **Monitoring Agent** — set up uptime, performance, and error alerting.

Outputs: Working codebase, deployed preview, `SEOFoundation`, `TechStack`.

## Step 6: Quality Gates

21. **QA Agent** — run full quality gate: build, lint, type-check, unit
    tests, integration tests, E2E tests. Must return `PASS` before any PR.
22. **Code Review Agent** — review every change for correctness, security,
    scope creep, regression risk.
23. **Visual Regression Agent** — capture baseline and diff screenshots.
24. **Security Audit Agent** — scan for committed secrets, dependency
    vulnerabilities, auth flaws.
25. **Dependency Agent** — update safe dependencies, flag security
    upgrades.
26. **Compliance Agent** — verify cookie consent, privacy policy, data
    handling meets regulatory requirements.
27. **Page Experience Agent** — validate Core Web Vitals, mobile
    usability, HTTPS.
28. **Test Generation Agent** — fill coverage gaps, especially for bug
    fixes and new features.

No PR is opened without `PASS` from QA Agent + no `HIGH` risk findings from
Code Review Agent (unless human-approved).

## Step 7: Deployment

29. **PR Agent** — open well-documented PRs per feature/fix batch.
30. **Release Agent** — manage CI → approval → merge → deploy →
    verification.
31. **Rollback Agent** — on standby; verify deployment health post-deploy.
32. **Documentation Agent** — generate/update README, setup guides, API
    docs.
33. **Changelog Agent** — generate changelog from merged changes.

## Step 8: Search Engine Setup

34. **Search Console Agent** — verify GSC property, submit sitemap,
    monitor coverage.
35. **Indexation Agent** — validate indexation signals, fix canonical
    conflicts, ensure crawlability.
36. **Backlink Agent** — identify initial link-building targets and
    unlinked mentions.
37. **Crawl Budget Agent** — ensure crawl efficiency for the new site.
38. **Redirect Manager Agent** — if migrating from an existing site,
    validate redirect map.

## Step 9: Growth and Optimization

39. **Analytics Agent** — validate tracking, set up funnels, establish
    baselines.
40. **BI Agent** — build KPI dashboards and executive reporting.
41. **Growth Agent** — combine all signals into prioritized growth
    opportunities.
42. **Experiment Agent** — design A/B tests for top growth hypotheses.
43. **Retention Agent** — design onboarding, activation, and retention
    loops.
44. **Onboarding Agent** — optimize first-run experience and activation
    funnel.
45. **Local SEO Agent** — if local business, optimize local signals.
46. **Programmatic SEO Agent** — if applicable, identify scalable page
    templates.
47. **AI Search Visibility Agent** — optimize for answer engines and
    AI-powered search.

## Step 10: Continuous Improvement Loop

After deployment, the system enters a continuous cycle:

1. **Analytics Agent** — weekly traffic, conversion, and engagement report.
2. **Growth Agent** — re-prioritize opportunities based on real data.
3. **Opportunity Agent** — re-scan all domains for new findings.
4. **Content Refresh Agent** — identify stale content for updates.
5. **Bug Detection Agent** — continuous bug scanning.
6. **Performance Agent** — monitor Core Web Vitals regression.
7. **Experiment Agent** — run and evaluate growth experiments.
8. **CEO Strategy Agent** — re-plan the next cycle's `WorkPlan`.

## Execution Rules

- Work in **phases**. Do not skip ahead.
- Each phase must produce its output artifact before the next phase
  begins, unless the brief explicitly enables parallel execution.
- Default autonomy is **Level 2 (Issue)** unless the brief's `goals`
  section or config explicitly enables higher levels per agent.
- Any `HIGH` risk agent (Security Audit, Compliance, Release, Rollback,
  Payment, Database) requires human approval before execution, regardless
  of autonomy level.
- Never hard-code a domain, company name, or keyword into agent logic.
  All site-specific data flows through `WebsiteBrief` and the context
  system.
- If any required integration is unavailable, build a clean interface +
  mock adapter — no fake implementations, no TODO placeholders for core
  functionality.

## Start

When the user provides a completed `WebsiteBrief` inside
`<environment_details>`, begin at **Step 1**.
If the brief contains `{{...}}` placeholders, return it with a list of
missing fields and do not proceed.