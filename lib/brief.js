const fs = require("fs");
const path = require("path");

const TEMPLATES_DIR = path.join(__dirname, "..", "templates");
const BRIEF_FILE = path.join(process.cwd(), "website-brief.json");

const DEFAULT_BRIEF = {
  website: {
    name: "",
    url: "",
    repo: "",
  },
  business: {
    model: "",
    industry: "",
    targetAudience: "",
    valueProposition: "",
    differentiators: ["", ""],
  },
  goals: {
    primary: "",
    secondary: ["", ""],
    timeline: "",
  },
  content: {
    pages: [
      { name: "Home", purpose: "Hero, value prop, primary CTA, social proof" },
      { name: "About", purpose: "Founder story, mission, team" },
      { name: "Product", purpose: "Features, pricing, use cases" },
      { name: "Blog", purpose: "Topical content, SEO, thought leadership" },
      { name: "Contact", purpose: "Form, location, support links" },
    ],
    existingContent: "No — generate from scratch",
    brandGuidelines: "",
  },
  technical: {
    preferredStack: "",
    cms: "",
    hosting: "",
    database: "",
    integrations: ["", "", "", ""],
    constraints: "",
  },
  seo: {
    targetKeywords: ["", ""],
    competitors: ["", ""],
    regions: "",
    languages: "",
  },
  compliance: {
    regulations: "",
    dataCollected: "",
    cookieConsent: "",
  },
  growth: {
    acquisitionChannels: ["Organic SEO", "Content Marketing"],
    monetization: "",
    emailProvider: "",
    analytics: "",
  },
};

function createEmptyBrief() {
  return JSON.parse(JSON.stringify(DEFAULT_BRIEF));
}

const REQUIRED_FIELDS = [
  "website.name",
  "website.url",
  "business.model",
  "business.industry",
  "business.targetAudience",
  "business.valueProposition",
  "goals.primary",
  "goals.timeline",
  "seo.targetKeywords",
  "growth.monetization",
];

const REQUIRED_ARRAY_FIELDS = [
  "business.differentiators",
  "seo.competitors",
  "growth.acquisitionChannels",
];

function validateBrief(brief) {
  const errors = [];
  const missing = [];

  function checkRequired(obj, prefix = "") {
    for (const field of REQUIRED_FIELDS) {
      const parts = field.split(".");
      let current = obj;
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          current = undefined;
          break;
        }
      }
      if (typeof current === "string" && (!current || current.trim() === "")) {
        missing.push(field);
      }
    }

    for (const field of REQUIRED_ARRAY_FIELDS) {
      const parts = field.split(".");
      let current = obj;
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          current = undefined;
          break;
        }
      }
      if (!Array.isArray(current) || current.length === 0 || current.some((item) => !item || (typeof item === "string" && item.trim() === ""))) {
        missing.push(`${field} (needs at least one non-empty item)`);
      }
    }
  }

  checkRequired(brief);

  if (missing.length > 0) {
    errors.push(
      `Missing ${missing.length} required field(s):\n` +
        missing.map((p) => `  - ${p}`).join("\n")
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    missingCount: missing.length,
  };
}

function loadBrief(filePath = BRIEF_FILE) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveBrief(brief, filePath = BRIEF_FILE) {
  fs.writeFileSync(filePath, JSON.stringify(brief, null, 2), "utf8");
  return filePath;
}

function printBrief(brief) {
  console.log("\n=== WEBSITE BRIEF ===\n");
  function printObj(obj, indent = 0) {
    const pad = "  ".repeat(indent);
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        console.log(`${pad}${key}:`);
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            printObj(item, indent + 1);
          } else {
            console.log(`${pad}  - ${item}`);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        console.log(`${pad}${key}:`);
        printObj(value, indent + 1);
      } else {
        console.log(`${pad}${key}: ${value}`);
      }
    }
  }
  printObj(brief);
  console.log("\n=== END BRIEF ===\n");
}

function getBriefPath() {
  return BRIEF_FILE;
}

function getDefaultBrief() {
  return JSON.parse(JSON.stringify(DEFAULT_BRIEF));
}

module.exports = {
  validateBrief,
  loadBrief,
  saveBrief,
  printBrief,
  createEmptyBrief,
  getBriefPath,
  getDefaultBrief,
  BRIEF_FILE,
};
