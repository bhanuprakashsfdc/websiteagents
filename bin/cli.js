#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

const brief = require("../lib/brief");
const templates = require("../lib/templates");
const promptBuilder = require("../lib/prompt-builder");

const BRIEF_FILE = brief.getBriefPath();

function showBanner() {
  console.log(chalk.cyan.bold("\n🚀 Website Agent Factory\n"));
}

async function cmdInit() {
  showBanner();

  const spinner = ora("Loading templates...").start();

  const templateList = templates.getTemplates();
  spinner.stop();

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a starting template:",
      choices: [
        { name: "Blank — start from scratch", value: "blank" },
        ...templateList.map((t) => ({ name: `${t.name} — ${t.description}`, value: t.key })),
      ],
    },
  ]);

  let currentBrief;

  if (answers.template === "blank") {
    currentBrief = brief.createEmptyBrief();
  } else {
    currentBrief = templates.getTemplate(answers.template);
  }

  const fields = [
    { key: "website.name", message: "Website name", type: "input" },
    { key: "website.url", message: "Website URL", type: "input" },
    { key: "website.repo", message: "GitHub repo URL", type: "input" },
    { key: "business.model", message: "Business model", type: "list", choices: ["SaaS", "Ecommerce", "Content", "Lead-gen", "Marketplace", "Other"] },
    { key: "business.industry", message: "Industry", type: "input" },
    { key: "business.targetAudience", message: "Target audience", type: "input" },
    { key: "business.valueProposition", message: "Value proposition (one sentence)", type: "input" },
    { key: "goals.primary", message: "Primary goal", type: "input" },
    { key: "goals.timeline", message: "Timeline", type: "input" },
    { key: "technical.preferredStack", message: "Preferred stack (or leave blank)", type: "input" },
    { key: "technical.hosting", message: "Hosting provider", type: "input" },
    { key: "technical.database", message: "Database", type: "input" },
    { key: "seo.regions", message: "Target regions", type: "input" },
    { key: "seo.languages", message: "Languages", type: "input" },
    { key: "compliance.regulations", message: "Compliance regulations", type: "input" },
    { key: "compliance.cookieConsent", message: "Cookie consent required?", type: "confirm" },
    { key: "growth.monetization", message: "Monetization model", type: "input" },
    { key: "growth.emailProvider", message: "Email provider", type: "input" },
    { key: "growth.analytics", message: "Analytics tool", type: "input" },
  ];

  for (const field of fields) {
    const value = await inquirer.prompt([
      {
        type: field.type,
        name: "value",
        message: field.message,
        choices: field.choices,
        default: getNestedValue(currentBrief, field.key) || "",
      },
    ]);

    setNestedValue(currentBrief, field.key, value.value);
  }

  const keywordAnswer = await inquirer.prompt([
    {
      type: "input",
      name: "keywords",
      message: "Target keywords (comma-separated)",
      default: getNestedValue(currentBrief, "seo.targetKeywords").filter(Boolean).join(", ") || "",
    },
  ]);
  currentBrief.seo.targetKeywords = keywordAnswer.keywords.split(",").map((k) => k.trim()).filter(Boolean);

  const competitorAnswer = await inquirer.prompt([
    {
      type: "input",
      name: "competitors",
      message: "Competitors (comma-separated URLs)",
      default: getNestedValue(currentBrief, "seo.competitors").filter(Boolean).join(", ") || "",
    },
  ]);
  currentBrief.seo.competitors = competitorAnswer.competitors.split(",").map((c) => c.trim()).filter(Boolean);

  const integrationsAnswer = await inquirer.prompt([
    {
      type: "input",
      name: "integrations",
      message: "Integrations (comma-separated)",
      default: getNestedValue(currentBrief, "technical.integrations").filter(Boolean).join(", ") || "",
    },
  ]);
  currentBrief.technical.integrations = integrationsAnswer.integrations.split(",").map((i) => i.trim()).filter(Boolean);

  const channelsAnswer = await inquirer.prompt([
    {
      type: "input",
      name: "channels",
      message: "Acquisition channels (comma-separated)",
      default: getNestedValue(currentBrief, "growth.acquisitionChannels").filter(Boolean).join(", ") || "",
    },
  ]);
  currentBrief.growth.acquisitionChannels = channelsAnswer.channels.split(",").map((c) => c.trim()).filter(Boolean);

  const spinner2 = ora("Validating brief...").start();
  const validation = brief.validateBrief(currentBrief);
  spinner2.stop();

  if (!validation.valid) {
    console.log(chalk.red("\n❌ Brief incomplete:\n"));
    console.log(validation.errors.join("\n"));
    console.log(chalk.yellow("\nFix the missing fields and run again.\n"));
    process.exit(1);
  }

  brief.saveBrief(currentBrief);
  console.log(chalk.green(`\n✅ Brief saved to ${BRIEF_FILE}\n`));

  const buildAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "build",
      message: "Generate FULL_PROMPT.md now?",
      default: true,
    },
  ]);

  if (buildAnswer.build) {
    const buildSpinner = ora("Building prompt...").start();
    const outputPath = promptBuilder.buildAndSave(currentBrief);
    buildSpinner.stop();
    console.log(chalk.green(`\n✅ FULL_PROMPT.md generated at ${outputPath}\n`));
    console.log(chalk.cyan("Next step:"));
    console.log(`  1. Open ${outputPath}`);
    console.log(`  2. Verify the brief inside <environment_details>`);
    console.log(`  3. Paste into your AI agent and say: "Execute this prompt"\n`);
  }
}

function cmdValidate() {
  showBanner();
  const currentBrief = brief.loadBrief();

  if (!currentBrief) {
    console.log(chalk.red(`\n❌ No brief found at ${BRIEF_FILE}\n`));
    console.log(chalk.yellow("Run `website-factory init` to create one.\n"));
    process.exit(1);
  }

  const spinner = ora("Validating brief...").start();
  const validation = brief.validateBrief(currentBrief);
  spinner.stop();

  if (validation.valid) {
    console.log(chalk.green("\n✅ Brief is complete — all fields filled\n"));
    brief.printBrief(currentBrief);
  } else {
    console.log(chalk.red("\n❌ Brief incomplete:\n"));
    console.log(validation.errors.join("\n"));
    console.log(chalk.yellow("\nRun `website-factory init` to fill missing fields.\n"));
    process.exit(1);
  }
}

function cmdBuild() {
  showBanner();
  const currentBrief = brief.loadBrief();

  if (!currentBrief) {
    console.log(chalk.red(`\n❌ No brief found at ${BRIEF_FILE}\n`));
    console.log(chalk.yellow("Run `website-factory init` to create one.\n"));
    process.exit(1);
  }

  const spinner = ora("Validating and building prompt...").start();
  const validation = brief.validateBrief(currentBrief);
  spinner.stop();

  if (!validation.valid) {
    console.log(chalk.red("\n❌ Brief incomplete:\n"));
    console.log(validation.errors.join("\n"));
    process.exit(1);
  }

  const outputPath = promptBuilder.buildAndSave(currentBrief);
  console.log(chalk.green(`\n✅ FULL_PROMPT.md generated at ${outputPath}\n`));
  console.log(chalk.cyan("Next step:"));
  console.log(`  1. Open ${outputPath}`);
  console.log(`  2. Verify the brief inside <environment_details>`);
  console.log(`  3. Paste into your AI agent and say: "Execute this prompt"\n`);
}

function cmdTemplates() {
  showBanner();
  const templateList = templates.getTemplates();

  console.log(chalk.cyan("Available templates:\n"));
  templateList.forEach((t) => {
    console.log(chalk.white(`  ${t.key}`) + chalk.gray(` — ${t.name}`));
    console.log(chalk.gray(`    ${t.description}\n`));
  });
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => {
    if (Array.isArray(current)) {
      const idx = parseInt(key, 10);
      return current[idx] !== undefined ? current[idx] : "";
    }
    return current && current[key] !== undefined ? current[key] : "";
  }, obj);
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (Array.isArray(current)) {
      const idx = parseInt(key, 10);
      return current[idx] || {};
    }
    return current[key] || {};
  }, obj);

  if (Array.isArray(target)) {
    const idx = parseInt(lastKey, 10);
    target[idx] = value;
  } else {
    target[lastKey] = value;
  }
}

const command = process.argv[2];
const commands = {
  init: cmdInit,
  validate: cmdValidate,
  build: cmdBuild,
  templates: cmdTemplates,
};

if (command && commands[command]) {
  commands[command]();
} else {
  showBanner();
  console.log(chalk.cyan("Usage:"));
  console.log(`  ${chalk.white("website-factory init")}     — Create a new website brief interactively`);
  console.log(`  ${chalk.white("website-factory validate")} — Validate an existing brief`);
  console.log(`  ${chalk.white("website-factory build")}    — Generate FULL_PROMPT.md from brief`);
  console.log(`  ${chalk.white("website-factory templates")} — List available templates\n`);
  process.exit(0);
}
