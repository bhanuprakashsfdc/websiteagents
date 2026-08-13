#!/usr/bin/env python3
"""
Validate all agent manifest files in .github/agents/.

Checks:
1. Valid YAML frontmatter
2. Required fields present
3. No duplicate agent names
4. No circular dependsOn chains
5. All requiredContext types reference known schemas
6. All tools reference known tool names
7. autonomyLevel is valid
8. riskLevel is valid
"""

import re
import sys
from pathlib import Path

AGENTS_DIR = Path(__file__).parent.parent / "agents"
SCHEMA_FILE = Path(__file__).parent.parent / "schemas" / "agent-outputs.ts"

REQUIRED_FIELDS = ["name", "version", "description", "role", "riskLevel", "autonomyLevel", "requiredContext", "tools", "capabilities"]
VALID_RISK_LEVELS = {"LOW", "MEDIUM", "HIGH"}
VALID_AUTONOMY_LEVELS = {"AUDIT", "RECOMMEND", "ISSUE", "PR", "AUTONOMOUS"}

KNOWN_TOOLS = {
    "HTTPTool", "BrowserTool", "SearchTool", "GitTool", "FileSystemTool",
    "GitHubTool", "TerminalTool", "LighthouseTool", "SearchConsoleTool",
    "AnalyticsTool", "PlaywrightTool", "ScreenshotTool",
}

# Extract schema type names from the TypeScript file
def extract_schema_types() -> set:
    if not SCHEMA_FILE.exists():
        return set()
    text = SCHEMA_FILE.read_text()
    # Match `export interface FooBar {`
    types = re.findall(r"export interface (\w+)", text)
    return set(types)

SCHEMA_TYPES = extract_schema_types()


def parse_frontmatter(content: str):
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


def extract_array_field(fm: dict, key: str) -> list:
    raw = fm.get(key, "[]")
    # Handle quoted strings like ["a", "b"]
    strings = re.findall(r'"([^"]*)"', raw)
    return strings


def validate(filepath: Path, errors: list, agent_names: dict, depends_graph: dict):
    content = filepath.read_text()
    fm, body = parse_frontmatter(content)
    if not fm:
        errors.append(f"{filepath.name}: missing YAML frontmatter")
        return

    # Required fields
    for field in REQUIRED_FIELDS:
        if field not in fm:
            errors.append(f"{filepath.name}: missing required field '{field}'")

    # riskLevel
    risk = fm.get("riskLevel", "")
    if risk and risk not in VALID_RISK_LEVELS:
        errors.append(f"{filepath.name}: invalid riskLevel '{risk}' (must be one of {VALID_RISK_LEVELS})")

    # autonomyLevel
    autonomy = fm.get("autonomyLevel", "")
    if autonomy and autonomy not in VALID_AUTONOMY_LEVELS:
        errors.append(f"{filepath.name}: invalid autonomyLevel '{autonomy}' (must be one of {VALID_AUTONOMY_LEVELS})")

    # Duplicate names
    name = fm.get("name", "")
    if name:
        if name in agent_names:
            errors.append(f"{filepath.name}: duplicate agent name '{name}' (also in {agent_names[name]})")
        else:
            agent_names[name] = filepath.name

    # requiredContext types
    ctx_types = extract_array_field(fm, "requiredContext")
    for ctx in ctx_types:
        # Allow "all specialist AgentReports" style entries and mixedCase
        if ctx in SCHEMA_TYPES:
            continue
        # Check if it's a valid composite/alias
        if " " in ctx or ctx.startswith("all"):
            continue
        errors.append(f"{filepath.name}: requiredContext '{ctx}' not found in .github/schemas/agent-outputs.ts")

    # tools
    tools = extract_array_field(fm, "tools")
    for tool in tools:
        if tool and tool not in KNOWN_TOOLS:
            errors.append(f"{filepath.name}: unknown tool '{tool}'")

    # dependsOn
    deps = extract_array_field(fm, "dependsOn") if "dependsOn" in fm else []
    depends_graph[filepath.name] = deps


def detect_cycles(graph: dict) -> list:
    """Detect circular dependencies using DFS."""
    cycles = []
    visited = set()
    rec_stack = set()

    def dfs(node, path):
        visited.add(node)
        rec_stack.add(node)
        path.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor, path)
            elif neighbor in rec_stack:
                cycle_start = path.index(neighbor)
                cycle = path[cycle_start:] + [neighbor]
                cycles.append(cycle)
        path.pop()
        rec_stack.discard(node)

    for node in graph:
        if node not in visited:
            dfs(node, [])

    return cycles


def main():
    errors = []
    agent_names = {}
    depends_graph = {}

    files = sorted(AGENTS_DIR.glob("*.md"))
    for fp in files:
        validate(fp, errors, agent_names, depends_graph)

    cycles = detect_cycles(depends_graph)
    for cycle in cycles:
        errors.append(f"Circular dependency detected: {' -> '.join(cycle)}")

    if errors:
        print("VALIDATION FAILED")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print(f"VALIDATION PASSED ({len(files)} agents checked)")


if __name__ == "__main__":
    main()
