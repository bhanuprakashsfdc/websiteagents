---
mode: agent
agents: [ecommerce-agent, technical-seo-agent, performance-agent, ux-agent]
---

# Prompt: Ecommerce Audit

Given an ecommerce website URL and/or repository:
1. Run Ecommerce Agent to audit product pages, structured data, checkout
   flow, and inventory signals.
2. Run Technical SEO Agent for product-page SEO issues.
3. Run Performance Agent for product image/checkout performance.
4. Run UX Agent for checkout and product page usability.
5. Output a consolidated `EcommerceAuditReport` with health scores per
   domain and a ranked opportunity list.

Do not implement fixes in this prompt — audit only.