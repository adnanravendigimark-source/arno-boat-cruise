// One-off repair: arno's privacy_policy.content was found to be corrupted
// (a mix of garbage pasted HTML, empty blocks, and leftover old-shape
// {heading, content} objects from a prior buggy seed run). This forcibly
// overwrites it with clean content converted from data/privacy-policy.json,
// unlike setup-db.mjs's seedPrivacyPolicy() which cautiously skips if any
// content already exists. Safe to run once; delete this file afterward.
import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const p = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "privacy-policy.json"), "utf-8"));
const today = new Date().toISOString().slice(0, 10);
const contentBlocks = (p.sections || []).map((s) => ({
  type: "paragraph",
  text: `<h3>${s.heading}</h3><p>${s.content}</p>`,
}));

await sql`
  UPDATE privacy_policy
  SET title = ${p.title || "Privacy Policy"}, last_updated = ${today}, content = ${JSON.stringify(contentBlocks)}::jsonb
  WHERE id = 1
`;

console.log(`privacy_policy: force-reset with ${contentBlocks.length} section(s) from data/privacy-policy.json.`);
