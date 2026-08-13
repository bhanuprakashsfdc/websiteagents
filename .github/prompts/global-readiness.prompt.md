---
mode: agent
agents: [i18n-agent, payment-agent, compliance-agent, hreflang-agent]
---

# Prompt: Global Readiness Audit

Given a website URL and target markets:
1. Run I18n Agent to audit translation coverage, locale routing, and RTL
   support.
2. Run Payment Agent to validate payment methods, multi-currency, and
   checkout localization.
3. Run Compliance Agent to check regional regulation applicability.
4. Run Hreflang Agent to validate multi-region SEO targeting.
5. Output a `GlobalReadinessReport` with market-by-market gaps,
   localization priorities, and go-to-market checklist.

Do not implement changes in this prompt — audit and plan only.