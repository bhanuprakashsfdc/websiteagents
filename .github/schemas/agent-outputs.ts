/**
 * Shared output schemas for all Website Agents.
 *
 * Every agent's `output` field in its .md definition should reference
 * one of these canonical types instead of inline structural descriptions.
 */

// ============================================================
// Discovery / Context
// ============================================================

export interface WebsiteContext {
  url: string
  pages: PageSnapshot[]
  sitemap: string[]
  navigation: NavNode[]
  forms: FormDescriptor[]
  metadata: MetaTag[]
  detectedTechnologies: TechnologySignal[]
  analyticsTags: AnalyticsTag[]
}

export interface RepositoryContext {
  framework: string
  language: string
  buildSystem: string
  dependencies: Dependency[]
  testSetup: TestSetup
  ciConfig: CIConfig
  deploymentTarget: string
  conventions: Conventions
}

export interface TechnologyContext {
  frontend: string
  backend: string
  database: string
  cms: string
  hosting: string
  cdn: string
  analytics: string[]
  thirdPartyServices: ThirdPartyService[]
}

export interface BusinessContext {
  industry: string
  businessModel: string
  targetAudience: string[]
  competitors: string[]
  valueProposition: string
}

export interface GoalContext {
  primaryGoal: string
  secondaryGoals: string[]
  timeframe: string
  successMetrics: string[]
}

export interface AnalyticsContext {
  platform: string
  propertyId: string
  dateRange: { start: string; end: string }
  keyMetrics: Record<string, number>
}

export interface AgentPolicy {
  authorizedSites: string[]
  authorizedRepos: string[]
  riskTolerance: "LOW" | "MEDIUM" | "HIGH"
  requireHumanApprovalFor: string[]
}

// ============================================================
// Discovery sub-types
// ============================================================

export interface PageSnapshot {
  url: string
  statusCode: number
  title: string
  description: string
  headings: HeadingInfo[]
  links: { internal: string[]; external: string[] }
  images: string[]
  structuredData: Record<string, unknown>[]
  openGraph: Record<string, string>
  loadTimeMs: number
}

export interface NavNode {
  label: string
  url: string
  children: NavNode[]
}

export interface FormDescriptor {
  action: string
  method: string
  fields: FormField[]
  csrfProtected: boolean
}

export interface FormField {
  name: string
  type: string
  required: boolean
  label: string
}

export interface MetaTag {
  name: string
  content: string
  property?: string
  httpEquiv?: string
}

export interface TechnologySignal {
  name: string
  category: string
  confidence: number
  evidence: string[]
}

export interface AnalyticsTag {
  type: string
  provider: string
  snippet: string
}

export interface Dependency {
  name: string
  version: string
  latestVersion: string
  vulnerabilities: CVE[]
  license: string
}

export interface CVE {
  id: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  description: string
  patchedIn: string
}

export interface TestSetup {
  framework: string
  coverage: number
  command: string
}

export interface CIConfig {
  provider: string
  pipelineFile: string
  stages: string[]
}

export interface Conventions {
  lint: string
  format: string
  commitStyle: string
  branching: string
}

export interface ThirdPartyService {
  name: string
  category: string
  integration: string
}

export interface HeadingInfo {
  level: number
  text: string
}

// ============================================================
// Analysis reports
// ============================================================

export interface CodeHealthReport {
  score: number
  hotspots: CodeHotspot[]
  recommendations: string[]
}

export interface CodeHotspot {
  file: string
  line: number
  issue: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  complexity: number
}

// ============================================================
// SEO reports
// ============================================================

export interface KeywordRoadmap {
  clusters: KeywordCluster[]
  gapMap: KeywordGap[]
  priorityList: KeywordPriority[]
}

export interface KeywordCluster {
  name: string
  intent: "informational" | "navigational" | "commercial" | "transactional"
  keywords: string[]
  volume: number
  difficulty: number
  relevance: number
}

export interface KeywordGap {
  keyword: string
  currentRanking: number | null
  competitorRanking: number
  opportunity: number
}

export interface KeywordPriority {
  keyword: string
  priority: number
  suggestedPage: string
  estimatedEffort: number
}

export interface CompetitiveGapMap {
  competitors: Competitor[]
  gaps: CompetitorGap[]
  exploitOpportunities: ExploitOpportunity[]
}

export interface Competitor {
  domain: string
  organicTraffic: number
  topPages: string[]
  strengths: string[]
  weaknesses: string[]
}

export interface CompetitorGap {
  competitor: string
  dimension: string
  theirScore: number
  ourScore: number
  gapDescription: string
}

export interface ExploitOpportunity {
  competitor: string
  weakness: string
  suggestedAction: string
  estimatedImpact: number
}

export interface ContentBrief {
  topic: string
  audience: string
  intent: string
  outline: BriefSection[]
  requiredSources: string[]
  internalLinks: string[]
  schemaType: string
  uniquenessAngle: string
}

export interface BriefSection {
  heading: string
  level: number
  keyPoints: string[]
  wordCountGuidance: number
}

export interface ContentQualityScore {
  page: string
  scoresByDimension: Record<string, number>
  overallScore: number
  flaggedIssues: ContentFlag[]
  recommendation: "publish" | "revise" | "rewrite"
}

export interface ContentFlag {
  dimension: string
  evidence: string
  severity: "LOW" | "MEDIUM" | "HIGH"
}

export interface ContentRoadmap {
  clusters: ContentCluster[]
  publishSchedule: PublishItem[]
  refreshSchedule: RefreshItem[]
}

export interface ContentCluster {
  topic: string
  pages: string[]
  priority: number
  targetPublishDate: string
}

export interface PublishItem {
  topic: string
  assignee: string
  targetDate: string
  status: "planned" | "in-progress" | "published"
}

export interface RefreshItem {
  page: string
  lastUpdated: string
  stalenessScore: number
  recommendedActions: string[]
}

export interface SchemaReport {
  existingSchema: SchemaInstance[]
  errors: SchemaError[]
  missingSchema: MissingSchema[]
  generatedJsonLd: GeneratedSchema[]
}

export interface SchemaInstance {
  page: string
  type: string
  valid: boolean
  errors: string[]
}

export interface SchemaError {
  page: string
  property: string
  error: string
  severity: "LOW" | "MEDIUM" | "HIGH"
}

export interface MissingSchema {
  page: string
  suggestedType: string
  reason: string
}

export interface GeneratedSchema {
  page: string
  type: string
  jsonLd: Record<string, unknown>
  validated: boolean
}

export interface LocalSEOPlan {
  citations: Citation[]
  schemaGaps: string[]
  landingPageGaps: string[]
  keywordTargets: string[]
}

export interface Citation {
  directory: string
  napConsistent: boolean
  url: string
  issues: string[]
}

export interface CrawlBudgetReport {
  crawlStats: CrawlStat[]
  budgetDrains: BudgetDrain[]
  recommendations: string[]
  proposedDirectives: string[]
}

export interface CrawlStat {
  metric: string
  value: number
  trend: "improving" | "stable" | "degrading"
}

export interface BudgetDrain {
  pattern: string
  affectedUrls: number
  estimatedWaste: string
}

export interface RobotsTxtPlan {
  currentDirectives: string[]
  conflicts: string[]
  recommendations: string[]
  proposedDirectives: string[]
}

export interface IndexationReport {
  shouldBeIndexed: string[]
  shouldNotBeIndexed: string[]
  canonicalConflicts: CanonicalConflict[]
  priorityFixes: PriorityFix[]
}

export interface CanonicalConflict {
  url: string
  declaredCanonical: string
  actualCanonical: string
  issue: string
}

export interface PriorityFix {
  url: string
  issue: string
  impact: number
  effort: number
}

export interface RedirectAudit {
  chains: RedirectChain[]
  loops: RedirectLoop[]
  deadRedirects: string[]
  proposedRedirectMap: RedirectMapEntry[]
}

export interface RedirectChain {
  source: string
  hops: string[]
  finalDestination: string
  hopsCount: number
}

export interface RedirectLoop {
  url: string
  loop: string[]
}

export interface RedirectMapEntry {
  from: string
  to: string
  type: 301 | 302 | 410 | 404
}

export interface LinkingPlan {
  newLinks: ProposedLink[]
  hubPages: string[]
  clusters: LinkCluster[]
}

export interface ProposedLink {
  from: string
  to: string
  anchorText: string
  context: string
}

export interface LinkCluster {
  hubPage: string
  satellitePages: string[]
}

export interface CachingAudit {
  layers: CacheLayer[]
  headerIssues: HeaderIssue[]
  serviceWorkerIssues: string[]
  invalidationGaps: string[]
  proposedHierarchy: string[]
}

export interface CacheLayer {
  name: string
  type: string
  hitRate: number
  issues: string[]
}

export interface HeaderIssue {
  url: string
  header: string
  currentValue: string
  recommendedValue: string
}

export interface MonitoringAudit {
  currentStack: string[]
  gaps: string[]
  recommendations: string[]
  alertGaps: string[]
}

export interface ErrorTrackingAudit {
  currentSetup: string[]
  coverageGaps: string[]
  unhandledPatterns: string[]
  alertIssues: string[]
  recommendations: string[]
}

export interface GSCReport {
  coverageSummary: GSCCoverageItem[]
  queryOpportunities: GSCQueryOpportunity[]
  errors: string[]
  manualActions: string[]
  anomalies: string[]
}

export interface GSCCoverageItem {
  status: string
  count: number
  urls: string[]
}

export interface GSCQueryOpportunity {
  query: string
  impressions: number
  clicks: number
  ctr: number
  averagePosition: number
  opportunity: string
}

export interface SitemapPlan {
  generatedSitemaps: string[]
  validationErrors: string[]
  orphans: string[]
  exclusions: string[]
  submissionStatus: string
}

export interface SocialProofAudit {
  currentSignals: string[]
  gaps: string[]
  freshnessScore: number
  placementRecommendations: string[]
  moderationGaps: string[]
}

export interface RetentionReport {
  retentionCurves: RetentionCurve[]
  churnSegments: ChurnSegment[]
  dropOffTriggers: string[]
  retentionTactics: string[]
  habitOpportunities: string[]
}

export interface RetentionCurve {
  period: string
  retentionRate: number
}

export interface ChurnSegment {
  segment: string
  churnRate: number
  characteristics: string[]
}

export interface BacklinkReport {
  topDomains: BacklinkDomain[]
  anchorDistribution: AnchorDistribution[]
  toxicLinks: string[]
  opportunityGaps: string[]
  outreachTargets: string[]
}

export interface BacklinkDomain {
  domain: string
  linkCount: number
  authority: number
  toxicity: number
}

export interface AnchorDistribution {
  anchorText: string
  count: number
  toxicity: number
}

// ============================================================
// Conversion / Growth
// ============================================================

export interface BIReport {
  kpiDefinitions: KPIDefinition[]
  dashboardDesign: DashboardPanel[]
  metricGaps: string[]
  reportingCadence: string[]
  cohortAnalysis: CohortAnalysis[]
}

export interface KPIDefinition {
  name: string
  formula: string
  source: string
  target: number
  current: number
}

export interface DashboardPanel {
  title: string
  type: string
  metrics: string[]
  filters: string[]
}

export interface CohortAnalysis {
  cohort: string
  metric: string
  values: number[]
  trend: string
}

export interface PersonalizationAudit {
  currentSignals: string[]
  recommendationGaps: string[]
  segmentOpportunities: string[]
  testHypotheses: string[]
}

export interface EcommerceAudit {
  productIssues: string[]
  checkoutIssues: string[]
  schemaGaps: string[]
  conversionOpportunities: string[]
}

export interface PaymentAudit {
  providers: string[]
  methods: string[]
  checkoutFlow: CheckoutStep[]
  currencySupport: string[]
  frictionPoints: string[]
  complianceSignals: string[]
}

export interface CheckoutStep {
  step: number
  name: string
  fields: number
  frictionScore: number
}

export interface EmailMarketingPlan {
  captureAudit: CapturePoint[]
  flowRecommendations: string[]
  segmentationOpportunities: string[]
}

export interface CapturePoint {
  location: string
  method: string
  incentive: string
  frictionScore: number
}

export interface SupportAudit {
  helpCenterCoverage: string[]
  botCapabilities: string[]
  contactOptions: string[]
  gapAreas: string[]
  recommendations: string[]
}

export interface OnboardingAudit {
  funnelMap: FunnelStep[]
  dropOffPoints: string[]
  frictionIssues: string[]
  activationRecommendations: string[]
}

export interface FunnelStep {
  step: string
  conversionRate: number
  dropOffRate: number
  frictionScore: number
}

export interface PushStrategy {
  optInAudit: string[]
  frequencyAnalysis: string[]
  campaignRecommendations: string[]
  subscriptionGaps: string[]
}

export interface GrowthOpportunities {
  opportunities: Opportunity[]
  prioritizedWorkPlan: WorkPlanEntry[]
}

export interface Opportunity {
  id: string
  domain: string
  title: string
  impact: number
  effort: number
  confidence: number
  risk: number
  priority: number
  sourceAgent: string
}

export interface WorkPlanEntry {
  agent: string
  task: string
  priority: number
  risk: "LOW" | "MEDIUM" | "HIGH"
  expectedImpact: number
}

export interface WorkPlan {
  goal: string
  entries: WorkPlanEntry[]
  estimatedDuration: string
}

// ============================================================
// Quality / Delivery
// ============================================================

export interface QAResult {
  status: "PASS" | "FAIL" | "BLOCKED"
  evidence: string[]
  coverageDelta: number
  logs: string[]
}

export interface AgentReport {
  agent: string
  timestamp: string
  status: "success" | "partial" | "failed"
  findings: Finding[]
  summary: string
  nextActions: string[]
}

export interface Finding {
  id: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  category: string
  description: string
  evidence: string[]
  recommendation: string
  estimatedImpact: number
  estimatedEffort: number
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

// ============================================================
// Infrastructure / Platform
// ============================================================

export interface CDNAudit {
  provider: string
  cacheRules: string[]
  missRateDrivers: string[]
  edgeFunctionIssues: string[]
  recommendations: string[]
}

export interface EventTrackingAudit {
  platforms: string[]
  dataLayerIssues: string[]
  missingEvents: string[]
  gtmIssues: string[]
  taxonomyRecommendations: string[]
}

export interface I18nAudit {
  framework: string
  locales: string[]
  coverageGaps: string[]
  rtlIssues: string[]
  formattingIssues: string[]
  routingIssues: string[]
}

export interface ComplianceReport {
  gaps: ComplianceGap[]
  severity: Record<string, number>
  requiredActions: string[]
}

export interface ComplianceGap {
  regulation: string
  area: string
  description: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  remediation: string
}

export interface QueueAudit {
  systems: string[]
  jobPatterns: string[]
  retryLogic: string[]
  deadLetterIssues: string[]
  webhookIssues: string[]
  recommendations: string[]
}

export interface APIAudit {
  architecture: string
  endpointPerformance: EndpointPerformance[]
  paginationIssues: string[]
  authIssues: string[]
  cachingGaps: string[]
  recommendations: string[]
}

export interface EndpointPerformance {
  path: string
  method: string
  p50Ms: number
  p95Ms: number
  p99Ms: number
  payloadBytes: number
}

export interface DatabaseAudit {
  dbType: string
  slowQueries: SlowQuery[]
  missingIndexes: string[]
  connectionIssues: string[]
  replicationGaps: string[]
  migrationRisks: string[]
}

export interface SlowQuery {
  query: string
  executionTimeMs: number
  rowsExamined: number
  recommendation: string
}

export interface DesignAudit {
  inconsistencies: DesignInconsistency[]
  driftScore: number
  recommendations: string[]
}

export interface DesignInconsistency {
  component: string
  property: string
  expected: string
  actual: string
  pages: string[]
}

export interface HreflangReport {
  currentImplementation: string[]
  errors: string[]
  missingVariants: string[]
  proposedHreflangMap: HreflangEntry[]
}

export interface HreflangEntry {
  url: string
  lang: string
  region: string
  xdefault: boolean
}

export interface InfrastructureReport {
  IaCTools: string[]
  findings: string[]
  configDrift: string[]
  recommendations: string[]
}
