#!/usr/bin/env python3
"""
Clean rewrite of all agent .md files with:
1. Standardized frontmatter (version, description, capabilities, autonomyLevel)
2. dependsOn, triggers, execution policy, testRequirements blocks
3. Resolves growth-agent -> growth-synthesis-agent naming collision
"""

import re
from pathlib import Path

AGENTS_DIR = Path(__file__).parent.parent / "agents"

DEPENDS_ON = {
    "website-discovery-agent": [],
    "repository-discovery-agent": [],
    "technology-detection-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "code-analysis-agent": ["repository-discovery-agent"],
    "technical-seo-agent": ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"],
    "page-experience-agent": ["website-discovery-agent", "technology-detection-agent"],
    "performance-agent": ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"],
    "ai-search-visibility-agent": ["website-discovery-agent"],
    "keyword-research-agent": ["website-discovery-agent"],
    "competitor-analysis-agent": ["website-discovery-agent"],
    "content-seo-agent": ["website-discovery-agent", "keyword-research-agent"],
    "content-strategy-agent": ["keyword-research-agent", "competitor-analysis-agent"],
    "content-brief-agent": ["content-strategy-agent", "keyword-research-agent", "competitor-analysis-agent"],
    "content-writer-agent": ["content-brief-agent", "content-strategy-agent"],
    "content-quality-agent": ["content-writer-agent"],
    "content-refresh-agent": ["website-discovery-agent"],
    "schema-markup-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "local-seo-agent": ["website-discovery-agent"],
    "crawl-budget-agent": ["website-discovery-agent", "technology-detection-agent", "search-console-agent"],
    "robots-txt-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "indexation-agent": ["website-discovery-agent", "repository-discovery-agent", "search-console-agent"],
    "redirect-manager-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "internal-linking-agent": ["website-discovery-agent"],
    "image-optimization-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "caching-agent": ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"],
    "cdn-agent": ["website-discovery-agent", "technology-detection-agent"],
    "monitoring-agent": ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent"],
    "error-tracking-agent": ["repository-discovery-agent", "website-discovery-agent", "technology-detection-agent"],
    "analytics-agent": ["website-discovery-agent"],
    "search-console-agent": ["website-discovery-agent"],
    "bi-agent": ["analytics-agent"],
    "personalization-agent": ["website-discovery-agent", "analytics-agent"],
    "ecommerce-agent": ["website-discovery-agent"],
    "payment-agent": ["website-discovery-agent"],
    "email-marketing-agent": ["website-discovery-agent", "analytics-agent"],
    "support-agent": ["website-discovery-agent", "analytics-agent"],
    "onboarding-agent": ["website-discovery-agent", "analytics-agent"],
    "conversion-optimization-agent": ["website-discovery-agent", "analytics-agent"],
    "experiment-agent": ["analytics-agent", "growth-synthesis-agent"],
    "responsive-design-agent": ["website-discovery-agent"],
    "visual-regression-agent": ["website-discovery-agent"],
    "ux-agent": ["website-discovery-agent"],
    "i18n-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "hreflang-agent": ["website-discovery-agent"],
    "compliance-agent": ["website-discovery-agent"],
    "security-audit-agent": ["repository-discovery-agent", "website-discovery-agent"],
    "bug-detection-agent": ["repository-discovery-agent", "website-discovery-agent"],
    "queue-agent": ["repository-discovery-agent", "technology-detection-agent"],
    "api-agent": ["repository-discovery-agent", "technology-detection-agent"],
    "database-agent": ["repository-discovery-agent", "technology-detection-agent"],
    "dependency-agent": ["repository-discovery-agent"],
    "design-system-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "event-tracking-agent": ["website-discovery-agent", "repository-discovery-agent"],
    "documentation-agent": ["repository-discovery-agent"],
    "infrastructure-agent": ["repository-discovery-agent", "technology-detection-agent"],
    "social-proof-agent": ["website-discovery-agent"],
    "test-generation-agent": ["repository-discovery-agent"],
    "retention-agent": ["analytics-agent"],
    "web-push-agent": ["website-discovery-agent", "analytics-agent"],
    "backlink-agent": ["website-discovery-agent"],
    "accessibility-agent": ["website-discovery-agent"],
    "programmatic-seo-agent": ["website-discovery-agent"],
    "ceo-strategy-agent": ["website-discovery-agent", "repository-discovery-agent", "technology-detection-agent", "opportunity-agent"],
    "project-manager-agent": ["ceo-strategy-agent"],
    "opportunity-agent": [],
    "growth-agent": ["growth-synthesis-agent", "analytics-agent"],
    "feature-development-agent": ["project-manager-agent"],
    "bug-fix-agent": ["bug-detection-agent"],
    "refactoring-agent": ["code-analysis-agent"],
    "code-review-agent": ["feature-development-agent", "bug-fix-agent", "refactoring-agent"],
    "qa-agent": ["feature-development-agent", "bug-fix-agent", "refactoring-agent"],
    "release-agent": ["code-review-agent", "qa-agent"],
    "rollback-agent": ["release-agent", "analytics-agent"],
    "changelog-agent": ["release-agent"],
    "pr-agent": ["code-review-agent", "qa-agent"],
}

TRIGGERS = {
    "website-discovery-agent": ["WebsiteContext"],
    "repository-discovery-agent": ["RepositoryContext"],
    "technology-detection-agent": ["TechnologyContext"],
    "code-analysis-agent": ["CodeHealthReport"],
    "technical-seo-agent": ["TechnicalSEOReport"],
    "page-experience-agent": ["PageExperienceReport"],
    "performance-agent": ["PerformanceReport"],
    "keyword-research-agent": ["KeywordRoadmap"],
    "competitor-analysis-agent": ["CompetitiveGapMap"],
    "content-strategy-agent": ["ContentRoadmap"],
    "content-brief-agent": ["ContentBrief"],
    "content-writer-agent": ["ContentDraft"],
    "content-quality-agent": ["ContentQualityScore"],
    "content-refresh-agent": ["ContentRefreshPlan"],
    "schema-markup-agent": ["SchemaReport"],
    "local-seo-agent": ["LocalSEOPlan"],
    "crawl-budget-agent": ["CrawlBudgetReport"],
    "robots-txt-agent": ["RobotsTxtPlan"],
    "indexation-agent": ["IndexationReport"],
    "redirect-manager-agent": ["RedirectAudit"],
    "internal-linking-agent": ["LinkingPlan"],
    "image-optimization-agent": ["ImageOptimizationReport"],
    "caching-agent": ["CachingAudit"],
    "cdn-agent": ["CDNAudit"],
    "monitoring-agent": ["MonitoringAudit"],
    "error-tracking-agent": ["ErrorTrackingAudit"],
    "analytics-agent": ["AnalyticsInsight"],
    "search-console-agent": ["GSCReport"],
    "bi-agent": ["BIReport"],
    "personalization-agent": ["PersonalizationAudit"],
    "ecommerce-agent": ["EcommerceAudit"],
    "payment-agent": ["PaymentAudit"],
    "email-marketing-agent": ["EmailMarketingPlan"],
    "support-agent": ["SupportAudit"],
    "onboarding-agent": ["OnboardingAudit"],
    "conversion-optimization-agent": ["ConversionOpportunities"],
    "growth-synthesis-agent": ["GrowthOpportunities"],
    "experiment-agent": ["ExperimentDesign"],
    "responsive-design-agent": ["ResponsiveDesignReport"],
    "visual-regression-agent": ["VisualRegressionReport"],
    "ux-agent": ["UXImprovements"],
    "i18n-agent": ["I18nAudit"],
    "hreflang-agent": ["HreflangReport"],
    "compliance-agent": ["ComplianceReport"],
    "security-audit-agent": ["SecurityAudit"],
    "bug-detection-agent": ["BugReport"],
    "queue-agent": ["QueueAudit"],
    "api-agent": ["APIAudit"],
    "database-agent": ["DatabaseAudit"],
    "dependency-agent": ["DependencyUpdatePlan"],
    "design-system-agent": ["DesignAudit"],
    "event-tracking-agent": ["EventTrackingAudit"],
    "documentation-agent": ["DocumentationUpdate"],
    "infrastructure-agent": ["InfrastructureReport"],
    "social-proof-agent": ["SocialProofAudit"],
    "test-generation-agent": ["TestSuite"],
    "retention-agent": ["RetentionReport"],
    "web-push-agent": ["PushStrategy"],
    "backlink-agent": ["BacklinkReport"],
    "accessibility-agent": ["AccessibilityReport"],
    "programmatic-seo-agent": ["ProgrammaticSEOOpportunities"],
    "ceo-strategy-agent": ["WorkPlan"],
    "project-manager-agent": ["ProjectRoadmap"],
    "opportunity-agent": ["OpportunityList"],
    "growth-agent": ["GrowthPipeline"],
    "feature-development-agent": ["FeatureImplementation"],
    "bug-fix-agent": ["BugFix"],
    "refactoring-agent": ["RefactoringResult"],
    "code-review-agent": ["ReviewResult"],
    "qa-agent": ["QAResult"],
    "release-agent": ["DeploymentResult"],
    "rollback-agent": ["RollbackRecommendation"],
    "changelog-agent": ["Changelog"],
    "pr-agent": ["PullRequest"],
}

CAPABILITIES = {
    "website-discovery-agent": ["web-crawling", "sitemap-parsing", "metadata-extraction", "form-enumeration"],
    "repository-discovery-agent": ["repo-analysis", "framework-detection", "ci-cd-mapping", "dependency-mapping"],
    "technology-detection-agent": ["stack-fingerprinting", "header-analysis", "signal-correlation"],
    "code-analysis-agent": ["static-analysis", "complexity-measurement", "duplication-detection", "tech-debt-mapping"],
    "technical-seo-agent": ["meta-tag-audit", "canonical-validation", "structured-data-validation", "heading-hierarchy"],
    "page-experience-agent": ["core-web-vitals", "mobile-usability", "https-validation", "interstitial-audit"],
    "performance-agent": ["lighthouse-audit", "bundle-analysis", "image-optimization", "render-blocking-detection"],
    "ai-search-visibility-agent": ["entity-analysis", "answerability-scoring", "schema-coverage", "topical-authority"],
    "keyword-research-agent": ["keyword-clustering", "intent-classification", "gap-analysis", "difficulty-scoring"],
    "competitor-analysis-agent": ["competitive-benchmarking", "gap-analysis", "content-comparison", "crawl-benchmarking"],
    "content-seo-agent": ["topical-coverage", "intent-matching", "thin-content-detection", "duplicate-detection"],
    "content-strategy-agent": ["roadmap-planning", "cluster-mapping", "publish-scheduling", "refresh-planning"],
    "content-brief-agent": ["brief-generation", "outline-design", "source-verification", "internal-linking"],
    "content-writer-agent": ["draft-generation", "brand-voice", "factual-grounding", "seo-integration"],
    "content-quality-agent": ["readability-scoring", "factual-verification", "duplication-detection", "ai-filler-detection"],
    "content-refresh-agent": ["staleness-detection", "content-updating", "factual-correction", "structure-improvement"],
    "schema-markup-agent": ["json-ld-generation", "schema-validation", "rich-result-eligibility", "error-correction"],
    "local-seo-agent": ["nap-validation", "local-schema", "citation-audit", "local-keyword-research"],
    "crawl-budget-agent": ["log-analysis", "crawl-stat-review", "budget-drain-detection", "directive-recommendation"],
    "robots-txt-agent": ["robots-parsing", "directive-validation", "conflict-detection", "crawl-optimization"],
    "indexation-agent": ["canonical-validation", "noindex-audit", "gsc-cross-reference", "orphan-detection"],
    "redirect-manager-agent": ["redirect-mapping", "chain-detection", "loop-detection", "soft404-detection"],
    "internal-linking-agent": ["orphan-detection", "link-gap-analysis", "hub-identification", "cluster-mapping"],
    "image-optimization-agent": ["format-conversion", "compression", "srcset-generation", "alt-text-audit"],
    "caching-agent": ["header-audit", "service-worker-audit", "cache-strategy", "invalidation-analysis"],
    "cdn-agent": ["cache-rule-audit", "edge-function-review", "tls-validation", "miss-rate-analysis"],
    "monitoring-agent": ["uptime-checking", "error-boundary-audit", "alert-validation", "apm-review"],
    "error-tracking-agent": ["sentry-audit", "error-boundary-coverage", "alert-threshold-review", "slo-definition"],
    "analytics-agent": ["traffic-analysis", "conversion-tracking", "dropoff-analysis", "opportunity-identification"],
    "search-console-agent": ["gsc-data-pull", "coverage-analysis", "query-analysis", "anomaly-detection"],
    "bi-agent": ["kpi-definition", "dashboard-design", "cohort-analysis", "metric-gap-identification"],
    "personalization-agent": ["segment-analysis", "recommendation-audit", "behavior-tracking", "ab-test-design"],
    "ecommerce-agent": ["product-page-audit", "checkout-flow-analysis", "schema-validation", "cross-sell-identification"],
    "payment-agent": ["provider-detection", "checkout-audit", "pci-validation", "currency-validation"],
    "email-marketing-agent": ["capture-point-audit", "flow-design", "segmentation", "esp-recommendation"],
    "support-agent": ["help-center-audit", "bot-capability-review", "contact-option-audit", "gap-analysis"],
    "onboarding-agent": ["funnel-mapping", "dropoff-analysis", "form-friction-detection", "activation-optimization"],
    "conversion-optimization-agent": ["cro-analysis", "cta-audit", "form-friction-detection", "trust-signal-audit"],
    "growth-synthesis-agent": ["signal-synthesis", "opportunity-ranking", "cross-domain-analysis", "impact-scoring"],
    "experiment-agent": ["hypothesis-design", "sample-size-calculation", "statistical-significance", "experiment-tracking"],
    "responsive-design-agent": ["viewport-testing", "breakpoint-audit", "screenshot-capture", "layout-detection"],
    "visual-regression-agent": ["screenshot-diff", "baseline-comparison", "delta-detection", "threshold-validation"],
    "ux-agent": ["navigation-audit", "information-architecture", "visual-hierarchy", "form-usability"],
    "i18n-agent": ["framework-detection", "translation-coverage", "rtl-support", "locale-routing"],
    "hreflang-agent": ["hreflang-validation", "reciprocity-check", "conflict-detection", "x-default-validation"],
    "compliance-agent": ["cookie-consent-audit", "privacy-policy-review", "gdccpa-compliance", "tracking-compliance"],
    "security-audit-agent": ["secret-detection", "dependency-vulnerability", "auth-audit", "injection-detection"],
    "bug-detection-agent": ["runtime-bug-detection", "ui-bug-detection", "logic-bug-detection", "form-validation"],
    "queue-agent": ["queue-detection", "retry-logic-audit", "dead-letter-analysis", "webhook-audit"],
    "api-agent": ["api-architecture-detection", "endpoint-performance", "n-plus-one-detection", "auth-audit"],
    "database-agent": ["query-analysis", "index-audit", "connection-pooling", "backup-validation"],
    "dependency-agent": ["outdated-detection", "cve-scanning", "version-compatibility", "unused-detection"],
    "design-system-agent": ["token-audit", "component-consistency", "drift-detection", "visual-comparison"],
    "event-tracking-agent": ["platform-detection", "data-layer-audit", "event-taxonomy", "gtm-audit"],
    "documentation-agent": ["doc-generation", "api-documentation", "readme-sync", "architecture-docs"],
    "infrastructure-agent": ["iac-detection", "dockerfile-review", "secrets-management", "network-policy-audit"],
    "social-proof-agent": ["trust-signal-audit", "review-freshness", "ugc-moderation", "placement-recommendation"],
    "test-generation-agent": ["unit-test-generation", "integration-test-generation", "e2e-test-generation", "regression-test-generation"],
    "retention-agent": ["retention-curve-analysis", "churn-segmentation", "dropoff-detection", "habit-forming-design"],
    "web-push-agent": ["opt-in-audit", "frequency-analysis", "campaign-design", "subscription-management"],
    "backlink-agent": ["link-profile-analysis", "toxicity-detection", "outreach-identification", "anchor-distribution"],
    "accessibility-agent": ["wcag-audit", "keyboard-navigation", "contrast-checking", "aria-validation"],
    "programmatic-seo-agent": ["template-identification", "uniqueness-validation", "spam-detection", "scalable-page-design"],
    "ceo-strategy-agent": ["opportunity-scoring", "work-planning", "resource-allocation", "progress-tracking"],
    "project-manager-agent": ["issue-creation", "dependency-tracking", "roadmap-management", "progress-monitoring"],
    "opportunity-agent": ["finding-aggregation", "opportunity-scoring", "deduplication", "priority-ranking"],
    "growth-agent": ["campaign-orchestration", "experiment-pipeline", "cross-agent-coordination", "impact-tracking"],
    "feature-development-agent": ["requirement-analysis", "planning", "coding", "testing", "pr-creation"],
    "bug-fix-agent": ["bug-reproduction", "root-cause-analysis", "fix-implementation", "regression-testing"],
    "refactoring-agent": ["code-quality-improvement", "test-verification", "behavior-preservation"],
    "code-review-agent": ["correctness-review", "security-review", "maintainability-review", "scope-creep-detection"],
    "qa-agent": ["build-validation", "lint-checking", "type-checking", "test-execution", "coverage-reporting"],
    "release-agent": ["ci-management", "deployment", "smoke-testing", "health-verification"],
    "rollback-agent": ["anomaly-detection", "deployment-correlation", "rollback-execution"],
    "changelog-agent": ["pr-parsing", "change-categorization", "changelog-generation"],
    "pr-agent": ["pr-creation", "documentation", "screenshot-capture", "risk-assessment"],
}

EXECUTION_POLICIES = {
    "LOW": {
        "timeoutSeconds": 120,
        "retry": {"maxAttempts": 2, "backoff": "exponential", "retryableErrors": ["HTTP_5xx", "TOOL_TIMEOUT", "RATE_LIMIT"]},
        "fallback": ["Use cached results from shared memory if tool fails", "Skip non-critical checks and flag as 'data unavailable'"]
    },
    "MEDIUM": {
        "timeoutSeconds": 300,
        "retry": {"maxAttempts": 3, "backoff": "exponential", "retryableErrors": ["HTTP_5xx", "TOOL_TIMEOUT", "RATE_LIMIT", "PARTIAL_DATA"]},
        "fallback": ["Queue for human review if tool fails after retries", "Use partial results with confidence scoring", "Flag incomplete analysis in report"]
    },
    "HIGH": {
        "timeoutSeconds": 600,
        "retry": {"maxAttempts": 2, "backoff": "exponential", "retryableErrors": ["HTTP_5xx", "TOOL_TIMEOUT"]},
        "fallback": ["Block execution and require human intervention", "Never proceed with partial or estimated data", "Log full error context for audit trail"]
    },
}


def capabilities_for(name: str) -> list:
    return CAPABILITIES.get(name, ["general-analysis", "report-generation"])


def test_requirements(risk: str) -> list:
    base = [
        "Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts",
        "Given missing requiredContext, throws before execute() with clear error message",
        "Given tool failure, falls back to cached results or flags as 'data unavailable'",
        "Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport",
        "Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications",
        "Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria",
        "Given autonomyLevel=PR, includes QA Agent PASS result before creating PR",
    ]
    if risk == "HIGH":
        base += [
            "Given HIGH risk finding, blocks execution until human approval is recorded",
            "Given unauthorized site/repo, refuses to execute and logs security event",
            "Given any data containing secrets/PII, redacts before including in reports",
        ]
    if risk == "MEDIUM":
        base += [
            "Given partial data, includes confidence score in output",
            "Given ambiguous input, requests clarification instead of guessing",
        ]
    return base


def extract_frontmatter(content: str):
    """Return (frontmatter_dict, body) or (None, None)."""
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", content, re.DOTALL)
    if not m:
        return None, None
    fm_text = m.group(1)
    body = m.group(2)
    fm = {}
    for line in fm_text.split("\n"):
        if ":" in line:
            key, val = line.split(":", 1)
            fm[key.strip()] = val.strip()
    return fm, body


def build_frontmatter(fm: dict) -> str:
    lines = []
    lines.append(f'version: "1.0.0"')
    lines.append(f"name: {fm.get('name', 'unknown')}")
    lines.append(f"description: {fm.get('description', fm.get('role', ''))}")
    if "role" in fm:
        lines.append(f"role: {fm['role']}")
    lines.append(f"riskLevel: {fm.get('riskLevel', fm.get('risk_level', 'LOW'))}")
    lines.append(f"autonomyLevel: {fm.get('autonomyLevel', fm.get('defaultAutonomy', 'RECOMMEND'))}")
    lines.append(f"requiredContext: {fm.get('requiredContext', fm.get('required_context', '[]'))}")
    lines.append(f"tools: {fm.get('tools', '[]')}")
    caps = capabilities_for(fm.get("name", ""))
    caps_str = ", ".join(f'"{c}"' for c in caps)
    lines.append(f"capabilities: [{caps_str}]")
    return "\n".join(lines)


def strip_blocks(body: str) -> str:
    """Remove all previously injected blocks from the body."""
    # These are the section headings we inject; strip everything from the
    # first occurrence of any of them to the end of the body.
    injected_headings = [
        "## Dependency Graph",
        "## Execution Policy",
        "## Test Requirements",
    ]
    # Find the earliest injected heading
    earliest = None
    earliest_pos = len(body)
    for heading in injected_headings:
        pos = body.find(heading)
        if pos != -1 and pos < earliest_pos:
            earliest_pos = pos
            earliest = heading
    if earliest:
        body = body[:earliest_pos]
    # Remove trailing whitespace and stray --- lines
    body = re.sub(r"\n---\s*$", "", body)
    return body.rstrip()


def build_blocks(agent_name: str, risk: str) -> str:
    deps = DEPENDS_ON.get(agent_name, [])
    deps_str = ", ".join(f'"{d}"' for d in deps)
    trigs = TRIGGERS.get(agent_name, [])
    trigs_str = ", ".join(f'"{t}"' for t in trigs)

    policy = EXECUTION_POLICIES.get(risk, EXECUTION_POLICIES["LOW"])
    tests = test_requirements(risk)
    tests_str = "\n".join(f"    - [ ] {t}" for t in tests)

    blocks = f"""
## Dependency Graph

```yaml
dependsOn: [{deps_str}]
triggers: [{trigs_str}]
```

## Execution Policy

```yaml
timeoutSeconds: {policy['timeoutSeconds']}
retry:
  maxAttempts: {policy['retry']['maxAttempts']}
  backoff: {policy['retry']['backoff']}
  retryableErrors: {policy['retry']['retryableErrors']}
fallback:
"""
    for f in policy["fallback"]:
        blocks += f"  - {f}\n"
    blocks += "```\n\n## Test Requirements\n\n"
    for t in tests:
        blocks += f"- [ ] {t}\n"
    return blocks


def clean_heading(text: str) -> str:
    """Normalize heading underlines (remove excessive blank lines before)."""
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def update_file(filepath: Path) -> bool:
    raw = filepath.read_text()

    # Handle growth-agent -> growth-synthesis-agent rename
    if filepath.name == "growth-agent.md":
        fm, body = extract_frontmatter(raw)
        if fm:
            fm["name"] = "growth-synthesis-agent"
            fm["description"] = "Cross-domain growth signal synthesizer"
            fm["role"] = "Cross-domain growth signal synthesizer"
            fm["tools"] = "[AnalyticsTool]"
            new_fm = build_frontmatter(fm)
            clean_body = strip_blocks(body)
            clean_body = clean_body.replace("Growth Agent", "Growth Synthesis Agent")
            clean_body = clean_body.replace("growth-agent", "growth-synthesis-agent")
            blocks = build_blocks("growth-synthesis-agent", fm.get("riskLevel", "LOW"))
            new_content = f"---\n{new_fm}\n---\n{clean_heading(clean_body)}\n\n{blocks}"
            filepath.write_text(new_content)
        return True

    fm, body = extract_frontmatter(raw)
    if not fm:
        print(f"  SKIP {filepath.name}: no frontmatter")
        return False

    new_fm = build_frontmatter(fm)
    clean_body = strip_blocks(body)
    risk = fm.get("riskLevel", fm.get("risk_level", "LOW"))
    blocks = build_blocks(fm.get("name", ""), risk)
    new_content = f"---\n{new_fm}\n---\n{clean_heading(clean_body)}\n\n{blocks}"
    filepath.write_text(new_content)
    return True


def main():
    files = sorted(AGENTS_DIR.glob("*.md"))
    print(f"Updating {len(files)} agent files...")
    updated = 0
    skipped = 0
    for fp in files:
        try:
            if update_file(fp):
                updated += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  ERROR {fp.name}: {e}")
            skipped += 1
    print(f"Done. Updated: {updated}, Skipped: {skipped}")


if __name__ == "__main__":
    main()
