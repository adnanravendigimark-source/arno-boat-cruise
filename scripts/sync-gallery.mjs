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

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const heroGallery = [
    { src: "/images/gallery/canal-cruise.jpg", alt: "A classic glass-topped canal cruise boat gliding past historic Amsterdam houses and trees", label: "Canal Cruise" },
    { src: "/images/gallery/evening-lights.jpg", alt: "Illuminated Skinny Bridge glowing over the Amstel River with canal tour boat", label: "Evening Lights" },
    { src: "/images/gallery/historic-gables.jpg", alt: "Historic 17th-century Dutch canal houses with step, neck, and bell gables reflected in water", label: "Historic Gables" },
    { src: "/images/gallery/unesco-canal-ring.jpg", alt: "Wide angle panoramic view of the UNESCO Canal Ring with arched bridges and canal tour boat", label: "UNESCO Canal Ring" }
  ];

  await sql`INSERT INTO site_settings (key, value) VALUES ('hero_gallery', ${JSON.stringify(heroGallery)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`;
  console.log("✓ Updated hero_gallery in database");

  const rows = await sql`SELECT value FROM site_settings WHERE key = 'homepage_sections'`;
  if (rows.length && rows[0].value) {
    const sections = typeof rows[0].value === "string" ? JSON.parse(rows[0].value) : rows[0].value;
    if (sections.tower) {
      sections.tower.images = [
        { src: "/images/gallery/evening-lights.jpg", alt: "Illuminated Skinny Bridge glowing over the Amstel River with canal tour boat", label: "Evening Lights" },
        { src: "/images/gallery/golden-hour-cruise.jpg", alt: "Open-air canal cruise boat gliding past historic canal houses during golden hour", label: "Golden Hour Cruise" },
        { src: "/images/gallery/unesco-canal-ring.jpg", alt: "Wide angle view of UNESCO Canal Ring bridges and canal boat", label: "Canal Ring" },
        { src: "/images/gallery/jordaan-district.jpg", alt: "Charming canals and houseboats in the historic Jordaan district", label: "Jordaan District" }
      ];
      await sql`UPDATE site_settings SET value = ${JSON.stringify(sections)}, updated_at = NOW() WHERE key = 'homepage_sections'`;
      console.log("✓ Updated homepage_sections.tower.images in database");
    }
  }
}

main().catch(console.error);
