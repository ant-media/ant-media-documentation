#!/usr/bin/env node
/**
 * Generate REST API Examples docs from Ant Media Server Swagger/OpenAPI JSON.
 *
 * Emits a multi-page API Catalog category:
 *   docs/.../rest-api-guide/api-catalog/{index,broadcasts,vods,filters,push-notification,version,management}.md
 *
 * Usage:
 *   node scripts/generate-rest-endpoint-catalog.mjs
 *   node scripts/generate-rest-endpoint-catalog.mjs --sync-versions
 *   node scripts/generate-rest-endpoint-catalog.mjs --offline
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const APP_URL = "https://antmedia.io/rest/3.0.3/swagger.json";
const MGMT_URL = "https://antmedia.io/rest/3.0.3-management/swagger.json";
const APP_FIXTURE = path.join(ROOT, "scripts/fixtures/swagger-3.0.3.json");
const MGMT_FIXTURE = path.join(
  ROOT,
  "scripts/fixtures/swagger-3.0.3-management.json",
);

const CATALOG_DIR = path.join(
  ROOT,
  "docs/guides/developer-sdk-and-api/rest-api-guide/api-catalog",
);

const VERSIONED_CATALOG_DIRS = [
  "versioned_docs/version-3.0/guides/developer-sdk-and-api/rest-api-guide/api-catalog",
  "versioned_docs/version-2.17/guides/developer-sdk-and-api/rest-api-guide/api-catalog",
  "versioned_docs/version-2.16/guides/developer-sdk-and-api/rest-api-guide/api-catalog",
];

const LEGACY_PATHS = [
  "docs/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples.md",
  "docs/guides/developer-sdk-and-api/rest-api-guide/examples",
  "versioned_docs/version-3.0/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples.md",
  "versioned_docs/version-2.17/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples.md",
  "versioned_docs/version-2.16/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples.md",
  "versioned_docs/version-3.0/guides/developer-sdk-and-api/rest-api-guide/examples",
  "versioned_docs/version-2.17/guides/developer-sdk-and-api/rest-api-guide/examples",
  "versioned_docs/version-2.16/guides/developer-sdk-and-api/rest-api-guide/examples",
];

const HTTP_METHODS = ["get", "post", "put", "delete", "patch"];

/** One doc page per API family under API Catalog. */
const PAGES = [
  {
    key: "broadcasts",
    file: "broadcasts.md",
    title: "Broadcasts",
    sidebarLabel: "Broadcasts",
    position: 1,
    description:
      "Curl templates for Ant Media Server broadcast REST endpoints, generated from Swagger.",
    hubDescription:
      "Create, update, and delete live streams; manage stream sources, tokens, recording, and subscribers",
    swagger: "application",
  },
  {
    key: "vods",
    file: "vods.md",
    title: "VoDs",
    sidebarLabel: "VoDs",
    position: 2,
    description:
      "Curl templates for Ant Media Server VoD REST endpoints, generated from Swagger.",
    hubDescription:
      "List, upload, import, and delete video-on-demand assets and recordings",
    swagger: "application",
  },
  {
    key: "filters",
    file: "filters.md",
    title: "Filters",
    sidebarLabel: "Filters",
    position: 3,
    description:
      "Curl templates for Ant Media Server filter REST endpoints, generated from Swagger.",
    hubDescription:
      "Create and manage stream filters, including MCU-related filter APIs",
    swagger: "application",
  },
  {
    key: "push-notification",
    file: "push-notification.md",
    title: "Push Notification",
    sidebarLabel: "Push Notification",
    position: 4,
    description:
      "Curl templates for Ant Media Server push-notification REST endpoints, generated from Swagger.",
    hubDescription:
      "Send push notifications to subscribers and topics; fetch subscriber auth tokens",
    swagger: "application",
  },
  {
    key: "version",
    file: "version.md",
    title: "Version",
    sidebarLabel: "Version",
    position: 5,
    description:
      "Curl template for the application version REST endpoint, generated from Swagger.",
    hubDescription: "Read the Ant Media Server version from an application context",
    swagger: "application",
  },
  {
    key: "management",
    file: "management.md",
    title: "Management APIs",
    sidebarLabel: "Management APIs",
    position: 6,
    description:
      "Curl templates for Ant Media Server Web Panel / management REST endpoints, generated from Swagger.",
    hubDescription:
      "Manage applications, users, cluster nodes, server settings, and system status (Web Panel API)",
    swagger: "management",
  },
];

const MGMT_SUBSECTION_ORDER = [
  "applications",
  "users-auth",
  "cluster",
  "server",
  "system",
  "other",
];

const MGMT_SUBSECTION_TITLES = {
  applications: "Applications",
  "users-auth": "Users & authentication",
  cluster: "Cluster",
  server: "Server settings",
  system: "System & status",
  other: "Other",
};

function managementSubsection(apiPath) {
  const parts = apiPath.split("/").filter(Boolean);
  const key =
    parts[0] === "v2" && parts[1]
      ? parts[1]
      : parts[0] === "cluster"
        ? "cluster"
        : parts[0] || "other";

  if (key === "applications" || key === "applications-info") {
    return "applications";
  }
  if (
    key === "users" ||
    key === "user-list" ||
    key === "authentication-status" ||
    key === "first-login-status" ||
    key === "admin-status"
  ) {
    return "users-auth";
  }
  if (key === "cluster" || key === "cluster-mode-status") {
    return "cluster";
  }
  if (
    key === "server-settings" ||
    key === "ssl-settings" ||
    key === "server-time"
  ) {
    return "server";
  }
  if (
    [
      "system",
      "system-status",
      "system-resources",
      "system-memory-status",
      "cpu-status",
      "gpu-status",
      "jvm-memory-status",
      "file-system-status",
      "heap-dump",
      "thread-dump",
      "thread-dump-json",
      "threads",
      "live-clients-size",
      "liveness",
      "shutdown-proper-status",
      "shutdown-properly",
      "enterprise-edition",
      "licence-status",
      "last-licence-status",
      "log-file",
      "support",
      "version",
    ].includes(key)
  ) {
    return "system";
  }
  return "other";
}

function parseArgs(argv) {
  const args = { offline: false, syncVersions: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--offline") args.offline = true;
    else if (a === "--sync-versions") args.syncVersions = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/generate-rest-endpoint-catalog.mjs [options]
  --offline           Use scripts/fixtures only (no network)
  --sync-versions     Also copy api-catalog/ to versioned_docs 3.0 / 2.17 / 2.16`);
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${a}`);
      process.exit(1);
    }
  }
  return args;
}

async function fetchOrFixture(url, fixturePath, offline) {
  if (!offline) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "ant-media-documentation-catalog-generator" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const spec = await res.json();
      fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
      fs.writeFileSync(fixturePath, JSON.stringify(spec, null, 2) + "\n");
      return { spec, sourceLabel: url };
    } catch (err) {
      console.warn(
        `Fetch failed (${err.message}); using ${path.relative(ROOT, fixturePath)}`,
      );
    }
  }
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Missing fixture: ${fixturePath}`);
  }
  return {
    spec: JSON.parse(fs.readFileSync(fixturePath, "utf8")),
    sourceLabel: path.relative(ROOT, fixturePath),
  };
}

function appSectionForPath(apiPath) {
  const parts = apiPath.split("/").filter(Boolean);
  if (parts[0] === "v2" && parts[1]) return parts[1];
  return parts[0] || "other";
}

function truncate(text, max = 280) {
  if (!text) return "";
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  return oneLine.slice(0, max - 1).trimEnd() + "…";
}

function collectOperations(spec, { scope, swaggerPrimaryName }) {
  const ops = [];
  for (const [apiPath, item] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      const op = item[method];
      if (!op) continue;
      const section =
        scope === "management" ? "management" : appSectionForPath(apiPath);
      ops.push({
        scope,
        section,
        subsection:
          scope === "management" ? managementSubsection(apiPath) : null,
        method: method.toUpperCase(),
        path: apiPath,
        operationId: op.operationId || `${method}_${apiPath}`,
        summary: op.summary || op.operationId || apiPath,
        description: op.description || "",
        parameters: op.parameters || [],
        requestBody: op.requestBody || null,
        swaggerPrimaryName,
      });
    }
  }
  return ops;
}

function disambiguateOperationIds(ops) {
  const counts = new Map();
  for (const op of ops) {
    counts.set(op.operationId, (counts.get(op.operationId) || 0) + 1);
  }
  for (const op of ops) {
    if (counts.get(op.operationId) > 1) {
      op.headingId =
        op.scope === "management"
          ? `${op.operationId} (management)`
          : `${op.operationId} (application)`;
    } else {
      op.headingId = op.operationId;
    }
  }
}

function buildUrl(op) {
  const urlPath = op.path.replace(/\{([^}]+)\}/g, (_, name) => `{${name}}`);
  const base =
    op.scope === "management"
      ? `https://{domain}:5443/rest${urlPath}`
      : `https://{domain}:5443/{app}/rest${urlPath}`;
  const query = op.parameters.filter((p) => p.in === "query");
  if (query.length === 0) return base;
  const qs = query.map((p) => `${p.name}={${p.name}}`).join("&");
  return `${base}?${qs}`;
}

function buildCurl(op) {
  const url = buildUrl(op);
  const lines = [`curl -X ${op.method} \\`];
  const jsonBody = op.requestBody?.content?.["application/json"] != null;
  const multipart = op.requestBody?.content?.["multipart/form-data"] != null;

  if (op.scope === "management") {
    lines.push(`  -H "ProxyAuthorization: {JWTToken}" \\`);
  }

  if (multipart) {
    const schema =
      op.requestBody.content["multipart/form-data"].schema || {};
    const props = schema.properties || {};
    for (const [name, prop] of Object.entries(props)) {
      if (
        name === "file" ||
        prop.format === "binary" ||
        prop.type === "object"
      ) {
        lines.push(`  -F "${name}=@{path/to/file}" \\`);
      } else {
        lines.push(`  -F "${name}={${name}}" \\`);
      }
    }
    lines.push(`  "${url}"`);
    return lines.join("\n");
  }

  if (jsonBody) {
    lines.push(`  -H "Content-Type: application/json" \\`);
    lines.push(`  "${url}" \\`);
    lines.push(`  -d '{}'`);
    return lines.join("\n");
  }

  lines.push(`  "${url}"`);
  return lines.join("\n");
}

function swaggerLink(op) {
  if (op.scope === "management") {
    return `https://antmedia.io/rest/?urls.primaryName=${op.swaggerPrimaryName}#/default/${op.operationId}`;
  }
  return `https://antmedia.io/rest/#/default/${op.operationId}`;
}

function renderOperation(op, headingLevel = 2) {
  const pathParams = op.parameters.filter((p) => p.in === "path");
  const queryParams = op.parameters.filter((p) => p.in === "query");
  const desc = truncate(op.description || op.summary);
  const hashes = "#".repeat(headingLevel);

  let md = `${hashes} \`${op.headingId}\`\n\n`;
  md += `[${op.summary}](${swaggerLink(op)})`;
  if (desc && desc !== op.summary) {
    md += ` — ${desc}`;
  }
  md += "\n\n";
  md += `| Method | Path |\n|--------|------|\n`;
  md += `| \`${op.method}\` | \`/rest${op.path}\` |\n\n`;

  if (pathParams.length || queryParams.length) {
    md += `| Parameter | In | Required | Description |\n|-----------|----|----------|-------------|\n`;
    for (const p of [...pathParams, ...queryParams]) {
      const req = p.required ? "yes" : "no";
      const pDesc = truncate(p.description || "", 120).replace(/\|/g, "\\|");
      md += `| \`${p.name}\` | ${p.in} | ${req} | ${pDesc} |\n`;
    }
    md += "\n";
  }

  if (op.requestBody?.content?.["application/json"]) {
    let bodyDesc = truncate(
      op.requestBody.description || "JSON request body",
      160,
    );
    bodyDesc = bodyDesc.replace(/\.+$/, "");
    md += `Request body: ${bodyDesc}. See schema in [Swagger](${swaggerLink(op)}).\n\n`;
  }

  md += "```bash\n";
  md += buildCurl(op);
  md += "\n```\n";
  return md;
}

function sortOps(list) {
  return [...list].sort((a, b) => {
    if (a.path !== b.path) return a.path.localeCompare(b.path);
    return a.method.localeCompare(b.method);
  });
}

function anchorFor(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function generatedBanner() {
  return `<!-- Generated by scripts/generate-rest-endpoint-catalog.mjs — do not edit by hand -->\n`;
}

function pageFrontMatter(page) {
  return `---
title: ${page.title}
description: ${page.description}
keywords: [API Catalog, ${page.sidebarLabel}, Ant Media Server REST API, Ant Media Server Documentation]
sidebar_position: ${page.position}
sidebar_label: ${page.sidebarLabel}
---
`;
}

function conventionsBlock({ includeManagementAuth }) {
  let md = `## Conventions

| Placeholder | Meaning |
|-------------|---------|
| \`{domain}\` | Server hostname or IP |
| \`{app}\` | Application name (often \`live\`) |
| Path/query placeholders | Match the parameter name in the tables below |

Use port \`5080\` with \`http://\` for local HTTP tests.

`;

  if (includeManagementAuth) {
    md += `**Base URL:** \`https://{domain}:5443/rest/v2/...\` (no application name)

**Auth:** \`-H "ProxyAuthorization: {JWTToken}"\` (server JWT) or dashboard username/password — see [Web Panel API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).

`;
  } else {
    md += `**Base URL:** \`https://{domain}:5443/{app}/rest/v2/...\`

**Auth:** [IP filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) or \`-H "Authorization: Bearer {JWTToken}"\` — see [Secure with JWT](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/).

`;
  }

  md += `:::tip Windows Command Prompt
Escape JSON quotes in \`-d\` bodies: \`-d "{""name"":""My Stream""}"\`
:::

`;
  return md;
}

function renderIndex(opsByPage) {
  const appPages = PAGES.filter((p) => p.swagger === "application");
  const mgmtPage = PAGES.find((p) => p.swagger === "management");

  const appRows = appPages
    .map((page) => {
      const href = `./${page.file.replace(/\.md$/, "")}`;
      return `| [${page.sidebarLabel}](${href}) | ${page.hubDescription} |`;
    })
    .join("\n");

  const mgmtHref = `./${mgmtPage.file.replace(/\.md$/, "")}`;

  return `---
title: API Catalog
description: Browse Ant Media Server REST endpoints by category — Broadcasts, VoDs, Filters, Push Notification, and Management — with ready-to-run curl templates.
keywords: [API Catalog, REST API, Ant Media Server REST API, Management REST API, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

${generatedBanner()}
# API Catalog

Ready-to-run \`curl\` templates for every Ant Media Server REST operation, organized by API family. Use this catalog when you know the resource you need; use [Swagger](https://antmedia.io/rest/) when you need full schemas or Try it out.

## Application APIs

These endpoints live under an application path such as \`/live/rest/v2/...\`.

| Guide | What you can do |
|-------|-----------------|
${appRows}

**Base URL:** \`https://{domain}:5443/{app}/rest/v2/...\`  
**Auth:** [IP filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) or \`Authorization: Bearer {JWTToken}\` ([JWT guide](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/)).

OpenAPI: [Application REST](https://antmedia.io/rest/)

## Management APIs

Web Panel / server endpoints for applications, users, cluster nodes, settings, and system status. They do **not** include an application name in the path.

→ [Management APIs](${mgmtHref}) — ${mgmtPage.hubDescription}

**Base URL:** \`https://{domain}:5443/rest/v2/...\`  
**Auth:** \`ProxyAuthorization: {JWTToken}\` or dashboard credentials — see [Web Panel API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).

OpenAPI: [Management REST](https://antmedia.io/rest/?urls.primaryName=3.0.3-management)

## Placeholders

| Placeholder | Meaning |
|-------------|---------|
| \`{domain}\` | Server hostname or IP |
| \`{app}\` | Application name (often \`live\`) — application APIs only |
| Path and query values | Match the parameter names in each endpoint table |

Use port \`5080\` with \`http://\` for local tests. Import the OpenAPI definition into Postman using [this GitHub discussion](https://github.com/orgs/ant-media/discussions/5664).
`;
}

function renderAppPage(page, ops) {
  const list = sortOps(ops);
  let md = pageFrontMatter(page);
  md += `\n${generatedBanner()}\n`;
  md += `# ${page.title}\n\n`;
  md += `${page.hubDescription}.\n\n`;
  md += `Part of the [API Catalog](./). Full schemas: [Swagger](https://antmedia.io/rest/).\n\n`;
  md += conventionsBlock({ includeManagementAuth: false });
  for (const op of list) {
    md += renderOperation(op, 2);
    md += "\n";
  }
  return md;
}

function renderManagementPage(page, ops) {
  let md = pageFrontMatter(page);
  md += `\n${generatedBanner()}\n`;
  md += `# ${page.title}\n\n`;
  md += `${page.hubDescription}.\n\n`;
  md += `Part of the [API Catalog](./). Full schemas: [Management Swagger](https://antmedia.io/rest/?urls.primaryName=3.0.3-management). Auth walkthrough: [Web Panel API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).\n\n`;
  md += conventionsBlock({ includeManagementAuth: true });

  const bySub = new Map();
  for (const op of ops) {
    const key = op.subsection || "other";
    if (!bySub.has(key)) bySub.set(key, []);
    bySub.get(key).push(op);
  }
  const subKeys = [
    ...MGMT_SUBSECTION_ORDER.filter((k) => bySub.has(k)),
    ...[...bySub.keys()]
      .filter((k) => !MGMT_SUBSECTION_ORDER.includes(k))
      .sort(),
  ];

  md += `## Contents\n\n`;
  for (const key of subKeys) {
    const title = MGMT_SUBSECTION_TITLES[key] || key;
    md += `- [${title}](#${anchorFor(title)}) (${bySub.get(key).length})\n`;
  }
  md += "\n";

  for (const key of subKeys) {
    const title = MGMT_SUBSECTION_TITLES[key] || key;
    const list = sortOps(bySub.get(key));
    md += `## ${title}\n\n`;
    for (const op of list) {
      md += renderOperation(op, 3);
      md += "\n";
    }
  }

  return md;
}

function writeCategoryJson(dir) {
  const json = {
    label: "API Catalog",
    position: 5,
    link: {
      type: "doc",
      id: "guides/developer-sdk-and-api/rest-api-guide/api-catalog/index",
    },
  };
  fs.writeFileSync(
    path.join(dir, "_category_.json"),
    JSON.stringify(json, null, 2) + "\n",
  );
}

function writeCatalogTree(dir, ops) {
  fs.mkdirSync(dir, { recursive: true });
  writeCategoryJson(dir);

  disambiguateOperationIds(ops);

  const opsByPage = new Map();
  for (const page of PAGES) {
    opsByPage.set(
      page.key,
      ops.filter((op) => op.section === page.key),
    );
  }

  fs.writeFileSync(path.join(dir, "index.md"), renderIndex(opsByPage));
  console.log(`Wrote ${path.relative(ROOT, path.join(dir, "index.md"))}`);

  for (const page of PAGES) {
    const pageOps = opsByPage.get(page.key) || [];
    const body =
      page.key === "management"
        ? renderManagementPage(page, pageOps)
        : renderAppPage(page, pageOps);
    const out = path.join(dir, page.file);
    fs.writeFileSync(out, body);
    console.log(`Wrote ${pageOps.length} ops → ${path.relative(ROOT, out)}`);
  }
}

function removeLegacyPaths() {
  for (const rel of LEGACY_PATHS) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`Removed legacy ${rel}`);
  }
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(from, to);
    else fs.copyFileSync(from, to);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const app = await fetchOrFixture(APP_URL, APP_FIXTURE, args.offline);
  const mgmt = await fetchOrFixture(MGMT_URL, MGMT_FIXTURE, args.offline);

  const ops = [
    ...collectOperations(app.spec, {
      scope: "application",
      swaggerPrimaryName: "3.0.3",
    }),
    ...collectOperations(mgmt.spec, {
      scope: "management",
      swaggerPrimaryName: "3.0.3-management",
    }),
  ];

  writeCatalogTree(CATALOG_DIR, ops);
  removeLegacyPaths();

  if (args.syncVersions) {
    for (const rel of VERSIONED_CATALOG_DIRS) {
      const dest = path.join(ROOT, rel);
      fs.rmSync(dest, { recursive: true, force: true });
      copyDirRecursive(CATALOG_DIR, dest);
      console.log(`Synced → ${rel}`);
    }
    removeLegacyPaths();
  }

  console.log(`Total operations: ${ops.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
