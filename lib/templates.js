const brief = require("./brief");

const TEMPLATES = {
  saas: {
    name: "SaaS Startup",
    description: "Software as a Service with subscription pricing",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "SaaS";
      b.business.industry = "Technology";
      b.technical.integrations = ["Stripe", "Posthog", "Resend", "Sentry"];
      b.growth.monetization = "Subscription (Freemium)";
      b.growth.acquisitionChannels = ["Organic SEO", "Content Marketing", "Product-led growth"];
      b.content.pages = [
        { name: "Home", purpose: "Hero, value prop, primary CTA, social proof" },
        { name: "Features", purpose: "Feature breakdown, comparisons, use cases" },
        { name: "Pricing", purpose: "Plans, FAQs, CTA" },
        { name: "Blog", purpose: "Topical content, SEO, thought leadership" },
        { name: "About", purpose: "Founder story, mission, team" },
        { name: "Contact", purpose: "Demo request form, support links" },
      ];
      return b;
    },
  },
  ecommerce: {
    name: "Ecommerce Store",
    description: "Online store with product catalog and checkout",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "Ecommerce";
      b.business.industry = "Retail";
      b.technical.integrations = ["Stripe", "Posthog", "Resend", "Sentry"];
      b.growth.monetization = "One-time / Subscription";
      b.growth.acquisitionChannels = ["Organic SEO", "Paid Ads", "Email Marketing"];
      b.content.pages = [
        { name: "Home", purpose: "Hero, featured products, primary CTA" },
        { name: "Shop", purpose: "Product catalog, filters, search" },
        { name: "Product", purpose: "Product details, reviews, add to cart" },
        { name: "Cart", purpose: "Cart review, checkout flow" },
        { name: "Blog", purpose: "Product guides, buying tips, SEO" },
        { name: "Contact", purpose: "Support form, location, FAQ" },
      ];
      return b;
    },
  },
  blog: {
    name: "Blog / Content Site",
    description: "Content-driven site with articles and resources",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "Content";
      b.business.industry = "Media";
      b.technical.cms = "Ghost";
      b.technical.integrations = ["Resend", "Posthog", "Sentry"];
      b.growth.monetization = "Ads / Sponsorship / Affiliate";
      b.growth.acquisitionChannels = ["Organic SEO", "Social Media", "Email Newsletter"];
      b.content.pages = [
        { name: "Home", purpose: "Featured posts, newsletter signup, about snippet" },
        { name: "Blog", purpose: "Article listing, categories, search" },
        { name: "Article", purpose: "Full article, author bio, related posts" },
        { name: "About", purpose: "Author bio, mission, contact" },
        { name: "Newsletter", purpose: "Subscribe form, archive" },
        { name: "Contact", purpose: "Contact form, social links" },
      ];
      return b;
    },
  },
  portfolio: {
    name: "Portfolio",
    description: "Personal or agency portfolio showcase",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "Lead-gen";
      b.business.industry = "Design / Development";
      b.technical.integrations = ["Resend", "Posthog"];
      b.growth.monetization = "Freelance / Contract work";
      b.growth.acquisitionChannels = ["Organic SEO", "Social Media", "Referral"];
      b.content.pages = [
        { name: "Home", purpose: "Hero, featured work, CTA" },
        { name: "Work", purpose: "Project grid, case studies" },
        { name: "About", purpose: "Bio, skills, experience" },
        { name: "Services", purpose: "What you offer, process, pricing" },
        { name: "Blog", purpose: "Articles, tutorials, thoughts" },
        { name: "Contact", purpose: "Contact form, calendar link" },
      ];
      return b;
    },
  },
  leadgen: {
    name: "Lead Generation",
    description: "Service business with lead capture focus",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "Lead-gen";
      b.business.industry = "Services";
      b.technical.integrations = ["Stripe", "Posthog", "Resend", "Sentry"];
      b.growth.monetization = "Consulting / Service contracts";
      b.growth.acquisitionChannels = ["Organic SEO", "Paid Ads", "Email Marketing"];
      b.content.pages = [
        { name: "Home", purpose: "Hero, value prop, primary CTA, social proof" },
        { name: "Services", purpose: "Service breakdown, benefits, CTA" },
        { name: "Case Studies", purpose: "Client results, testimonials" },
        { name: "About", purpose: "Team, mission, credentials" },
        { name: "Blog", purpose: "Educational content, SEO, trust building" },
        { name: "Contact", purpose: "Lead capture form, consultation booking" },
      ];
      return b;
    },
  },
  marketplace: {
    name: "Marketplace",
    description: "Two-sided marketplace with buyers and sellers",
    apply: () => {
      const b = brief.createEmptyBrief();
      b.business.model = "Marketplace";
      b.business.industry = "Marketplace";
      b.technical.integrations = ["Stripe", "Posthog", "Resend", "Sentry"];
      b.growth.monetization = "Commission / Subscription";
      b.growth.acquisitionChannels = ["Organic SEO", "Paid Ads", "Referral program"];
      b.content.pages = [
        { name: "Home", purpose: "Hero, categories, search, CTA" },
        { name: "Browse", purpose: "Listings, filters, search" },
        { name: "Listing", purpose: "Product/service details, seller info, reviews" },
        { name: "How it Works", purpose: "Buyer/seller flow, trust signals" },
        { name: "Blog", purpose: "Category guides, tips, SEO" },
        { name: "Contact", purpose: "Support, seller inquiries" },
      ];
      return b;
    },
  },
};

function getTemplates() {
  return Object.entries(TEMPLATES).map(([key, template]) => ({
    key,
    name: template.name,
    description: template.description,
  }));
}

function getTemplate(key) {
  const template = TEMPLATES[key];
  if (!template) return null;
  return template.apply();
}

function applyTemplate(briefObj, templateKey) {
  const template = TEMPLATES[templateKey];
  if (!template) {
    throw new Error(`Template "${templateKey}" not found. Available: ${Object.keys(TEMPLATES).join(", ")}`);
  }
  const newBrief = template.apply();
  return { ...newBrief, ...briefObj };
}

module.exports = {
  TEMPLATES,
  getTemplates,
  getTemplate,
  applyTemplate,
};
