const fs = require("fs");
const path = require("path");

const PROMPT_TEMPLATE_PATH = path.join(__dirname, "..", ".github", "prompts", "create-website.prompt.md");

function loadPromptTemplate() {
  if (!fs.existsSync(PROMPT_TEMPLATE_PATH)) {
    throw new Error(`Prompt template not found at ${PROMPT_TEMPLATE_PATH}`);
  }
  return fs.readFileSync(PROMPT_TEMPLATE_PATH, "utf8");
}

function buildYamlFromBrief(brief) {
  function toYaml(obj, indent = 0) {
    const pad = "  ".repeat(indent);
    let yaml = "";

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        yaml += `${pad}${key}:\n`;
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            yaml += `${pad}- \n`;
            yaml += toYaml(item, indent + 1);
          } else {
            const escaped = String(item).replace(/"/g, '\\"');
            yaml += `${pad}- "${escaped}"\n`;
          }
        });
      } else if (typeof value === "object" && value !== null) {
        yaml += `${pad}${key}:\n`;
        yaml += toYaml(value, indent + 1);
      } else {
        const escaped = String(value).replace(/"/g, '\\"');
        yaml += `${pad}${key}: "${escaped}"\n`;
      }
    }

    return yaml;
  }

  return toYaml(brief);
}

function buildPrompt(brief) {
  const template = loadPromptTemplate();
  const yaml = buildYamlFromBrief(brief);
  const indentedYaml = yaml.split("\n").map((line) => `  ${line}`).join("\n");

  const briefBlock = `<environment_details>
  <summary>Website Brief — generated from website-brief.json</summary>

${indentedYaml}
</environment_details>`;

  const marker = "<environment_details>\n  <summary>Website Brief — replace this block with your actual website data</summary>";
  const markerEnd = "</environment_details>";

  const startIdx = template.indexOf(marker);
  const endIdx = template.indexOf(markerEnd, startIdx);

  if (startIdx === -1 || endIdx === -1) {
    return template.replace(
      /<environment_details>[\s\S]*?<\/environment_details>/,
      briefBlock
    );
  }

  const before = template.slice(0, startIdx);
  const after = template.slice(endIdx + markerEnd.length);

  return before + briefBlock + after;
}

function buildAndSave(brief, outputPath) {
  const prompt = buildPrompt(brief);
  const target = outputPath || path.join(process.cwd(), "FULL_PROMPT.md");
  fs.writeFileSync(target, prompt, "utf8");
  return target;
}

module.exports = {
  buildPrompt,
  buildAndSave,
  loadPromptTemplate,
  buildYamlFromBrief,
};
