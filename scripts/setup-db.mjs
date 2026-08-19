// One-time (and safe-to-re-run) database setup for the admin CMS.
//
// What it does:
//   1. Creates every table the app needs, if they don't already exist.
//   2. If a table is empty, seeds it from the matching file in /data (the
//      real Arno Boat Cruise Florence starter content) so the site has
//      real tours/posts/FAQs/homepage copy from the first run.
//
// How to run it:
//   1. Add DATABASE_URL to your .env file
//   2. Run: node scripts/setup-db.mjs

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
  console.error(
    "DATABASE_URL is not set. Add it to your .env file, then re-run."
  );
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const dataDir = path.join(process.cwd(), "data");

function readJsonFile(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

async function createTables() {
  console.log("Creating tables (if they don't already exist)...");

  await sql`
    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      badge TEXT NOT NULL DEFAULT 'self-guided',
      ribbon TEXT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      includes JSONB NOT NULL DEFAULT '[]',
      duration TEXT,
      rating NUMERIC(2, 1) NOT NULL DEFAULT 5.0,
      reviews INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 0,
      original_price INTEGER,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL DEFAULT '',
      href_path TEXT NOT NULL,
      href_extra TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      best_for TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Guide',
      excerpt TEXT NOT NULL DEFAULT '',
      quick_answer TEXT NOT NULL DEFAULT '',
      read_time TEXT NOT NULL DEFAULT '5 min read',
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL DEFAULT '',
      recommended_tour_id TEXT NOT NULL DEFAULT '',
      recommended_tour_after_block INTEGER,
      content JSONB NOT NULL DEFAULT '[]',
      no_index BOOLEAN NOT NULL DEFAULT false,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS homepage (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_badge TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_image_alt TEXT NOT NULL DEFAULT '',
      rating_value TEXT NOT NULL DEFAULT '',
      rating_count TEXT NOT NULL DEFAULT '',
      show_featured_tour BOOLEAN NOT NULL DEFAULT true,
      featured_tour_id TEXT NOT NULL DEFAULT '',
      featured_badge_label TEXT NOT NULL DEFAULT '',
      featured_urgency_text TEXT NOT NULL DEFAULT '',
      featured_reasons JSONB NOT NULL DEFAULT '[]',
      no_index BOOLEAN NOT NULL DEFAULT false,
      CONSTRAINT homepage_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS privacy_policy (
      id INTEGER PRIMARY KEY DEFAULT 1,
      title TEXT NOT NULL DEFAULT 'Privacy Policy',
      last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
      content JSONB NOT NULL DEFAULT '[]',
      no_index BOOLEAN NOT NULL DEFAULT false,
      CONSTRAINT privacy_policy_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS about_page (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_eyebrow TEXT NOT NULL DEFAULT 'About Us',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_image_alt TEXT NOT NULL DEFAULT '',
      intro_heading TEXT NOT NULL DEFAULT '',
      intro_paragraph_1 TEXT NOT NULL DEFAULT '',
      intro_paragraph_2 TEXT NOT NULL DEFAULT '',
      intro_image TEXT NOT NULL DEFAULT '',
      intro_image_alt TEXT NOT NULL DEFAULT '',
      reasons_heading TEXT NOT NULL DEFAULT '',
      reasons_subheading TEXT NOT NULL DEFAULT '',
      reasons JSONB NOT NULL DEFAULT '[]',
      disclosure_heading TEXT NOT NULL DEFAULT '',
      disclosure_body TEXT NOT NULL DEFAULT '',
      cta_text TEXT NOT NULL DEFAULT '',
      cta_button_label TEXT NOT NULL DEFAULT '',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      canonical_url TEXT NOT NULL DEFAULT '',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT about_page_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_page (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_eyebrow TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      email_label TEXT NOT NULL DEFAULT 'Email Us Directly',
      email_note TEXT NOT NULL DEFAULT '',
      reasons_heading TEXT NOT NULL DEFAULT '',
      reasons JSONB NOT NULL DEFAULT '[]',
      footer_note TEXT NOT NULL DEFAULT '',
      cta_heading TEXT NOT NULL DEFAULT '',
      cta_button_label TEXT NOT NULL DEFAULT '',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      canonical_url TEXT NOT NULL DEFAULT '',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT contact_page_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      blog_no_index BOOLEAN NOT NULL DEFAULT false,
      blog_no_follow BOOLEAN NOT NULL DEFAULT false,
      blog_meta_title TEXT NOT NULL DEFAULT '',
      blog_meta_description TEXT NOT NULL DEFAULT '',
      blog_canonical_url TEXT NOT NULL DEFAULT '',
      blog_og_title TEXT NOT NULL DEFAULT '',
      blog_og_description TEXT NOT NULL DEFAULT '',
      blog_og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT site_settings_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      pages JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Tables ready.");
}

async function addSeoColumns() {
  console.log("Ensuring SEO columns exist...");
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_video TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_no_index BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_meta_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_image TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_table_column1 TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_table_feature TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE about_page ADD COLUMN IF NOT EXISTS contact_prompt_html TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE about_page ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE contact_page ADD COLUMN IF NOT EXISTS email_label TEXT NOT NULL DEFAULT 'Email Us Directly'`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS last_updated_label TEXT NOT NULL DEFAULT 'Last updated: '`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS empty_state_text TEXT NOT NULL DEFAULT E'This page hasn''t been filled in yet.'`;

  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS admin_password_hash TEXT`;
  console.log("SEO columns ready.");
}

async function addHomepageCmsColumns() {
  console.log("Ensuring homepage CMS columns exist...");
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_gallery JSONB NOT NULL DEFAULT '[]'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_primary_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_primary_href TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_secondary_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_secondary_href TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS focus_keyword TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS sections_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS header_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS footer_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS theme_json JSONB NOT NULL DEFAULT '{}'`;
  console.log("Homepage CMS columns ready.");
}

async function addBlogCmsColumns() {
  console.log("Ensuring blog CMS columns exist...");
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_heading TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_body TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_button_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_button_href TEXT NOT NULL DEFAULT ''`;
  // Byline shown on the article page ("By <name>") — added for the new
  // blog design's author meta row. Format convention: "Name / Role".
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS author TEXT NOT NULL DEFAULT ''`;
  await sql`
    CREATE TABLE IF NOT EXISTS post_redirects (
      old_slug TEXT PRIMARY KEY,
      new_slug TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("Blog CMS columns ready.");
}

async function addMediaLibraryTable() {
  console.log("Ensuring media_library table exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS media_library (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL UNIQUE,
      filename TEXT NOT NULL DEFAULT '',
      content_type TEXT NOT NULL DEFAULT '',
      size_bytes INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("media_library table ready.");
}

async function seedTours() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM tours`;
  if (count > 0) {
    console.log(`tours: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const tours = readJsonFile("tours.json");
  if (!tours || tours.length === 0) {
    console.log("tours: no data/tours.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < tours.length; i++) {
    const t = tours[i];
    await sql`
      INSERT INTO tours (
        id, badge, ribbon, title, description, includes, duration, rating,
        reviews, price, original_price, image, image_alt, href_path,
        href_extra, featured, best_for, sort_order
      ) VALUES (
        ${t.id}, ${t.badge}, ${t.ribbon || null}, ${t.title}, ${t.description},
        ${JSON.stringify(t.includes || [])}::jsonb, ${t.duration || null},
        ${t.rating ?? 5}, ${t.reviews ?? 0}, ${t.price ?? 0}, ${t.originalPrice ?? null},
        ${t.image}, ${t.imageAlt}, ${t.hrefPath}, ${t.hrefExtra || null},
        ${!!t.featured}, ${t.bestFor || ""}, ${i}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`tours: seeded ${tours.length} row(s).`);
}

async function seedPosts() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM posts`;
  if (count > 0) {
    console.log(`posts: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const posts = readJsonFile("posts.json");
  if (!posts || posts.length === 0) {
    console.log("posts: no data/posts.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await sql`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, category, excerpt,
        quick_answer, read_time, date, image, image_alt,
        recommended_tour_id, recommended_tour_after_block, content, sort_order
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.metaTitle}, ${p.metaDescription}, ${p.category},
        ${p.excerpt}, ${p.quickAnswer}, ${p.readTime}, ${p.date}, ${p.image}, ${p.imageAlt},
        ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
        ${JSON.stringify(p.content || [])}::jsonb, ${i}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`posts: seeded ${posts.length} row(s).`);
}

async function seedHomepage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM homepage`;
  if (count > 0) {
    console.log("homepage: already configured — skipping seed.");
    return;
  }
  const h = readJsonFile("homepage.json");
  if (!h) {
    console.log("homepage: no data/homepage.json to seed from — inserting defaults.");
    await sql`INSERT INTO homepage (id) VALUES (1) ON CONFLICT (id) DO NOTHING`;
    return;
  }
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      rating_value, rating_count, show_featured_tour, featured_tour_id,
      featured_badge_label, featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${h.heroBadge || ""}, ${h.heroHeading || ""}, ${h.heroSubheading || ""},
      ${h.heroImage || ""}, ${h.heroImageAlt || ""}, ${h.ratingValue || ""}, ${h.ratingCount || ""},
      ${!!h.showFeaturedTour}, ${h.featuredTourId || ""}, ${h.featuredBadgeLabel || ""},
      ${h.featuredUrgencyText || ""}, ${JSON.stringify(h.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("homepage: seeded from data/homepage.json.");
}

async function seedFaqs() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM faqs`;
  if (count > 0) {
    console.log(`faqs: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const faqs = readJsonFile("faqs.json");
  if (!faqs || faqs.length === 0) {
    console.log("faqs: no data/faqs.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await sql`
      INSERT INTO faqs (question, answer, sort_order) VALUES (${f.question}, ${f.answer}, ${i})
    `;
  }
  console.log(`faqs: seeded ${faqs.length} row(s).`);
}

async function seedPrivacyPolicy() {
  const rows = await sql`SELECT content FROM privacy_policy WHERE id = 1`;
  const hasUsableContent =
    rows.length > 0 &&
    Array.isArray(rows[0].content) &&
    rows[0].content.some((b) => b && typeof b.text === "string" && b.text.trim());
  if (hasUsableContent) {
    console.log("privacy_policy: already has content — skipping seed.");
    return;
  }
  const p = readJsonFile("privacy-policy.json");
  const today = new Date().toISOString().slice(0, 10);
  if (!p) {
    console.log("privacy_policy: no data/privacy-policy.json to seed from — inserting defaults.");
    await sql`INSERT INTO privacy_policy (id, last_updated) VALUES (1, ${today}) ON CONFLICT (id) DO NOTHING`;
    return;
  }
  // The admin page/editor stores content as ContentBlock[] ({type, text}),
  // not raw {heading, content} pairs - convert data/privacy-policy.json's
  // sections into that shape before inserting. This conversion was missing
  // before, which is why previously-seeded rows had non-empty but useless
  // content: every block's `.text` was undefined, so the page rendered blank.
  const contentBlocks = (p.sections || []).map((s) => ({
    type: "paragraph",
    text: `<h3>${s.heading}</h3><p>${s.content}</p>`,
  }));
  // Row may already exist from an earlier deploy with empty or wrongly
  // shaped content - heal that by filling in title + content on conflict,
  // without touching any other admin-edited fields (SEO, last_updated_label, etc.).
  await sql`
    INSERT INTO privacy_policy (id, title, last_updated, content)
    VALUES (1, ${p.title || "Privacy Policy"}, ${today}, ${JSON.stringify(contentBlocks)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      content = EXCLUDED.content
  `;
  console.log("privacy_policy: seeded from data/privacy-policy.json.");
}

async function seedSiteSettings() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM site_settings`;
  if (count > 0) {
    console.log("site_settings: already configured — skipping seed.");
    return;
  }
  const blogTitle = "Florence Arno River Cruise Guides, Tips & Itineraries (2026)";
  const blogDescription =
    "Practical guides for Arno River boat cruises in Florence — traditional barchetto vs. electric sightseeing, romantic sunset cruises, routes, and tickets.";
  await sql`
    INSERT INTO site_settings (id, blog_meta_title, blog_meta_description)
    VALUES (1, ${blogTitle}, ${blogDescription})
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("site_settings: seeded (Blog listing page SEO fields, indexing ON by default).");
}

async function seedAboutPage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM about_page`;
  if (count > 0) {
    console.log("about_page: already configured — skipping seed.");
    return;
  }
  const reasons = [
    { icon: "ShieldCheckIcon", title: "Licensed Florentine Operators", body: "Every cruise listed is operated by licensed Italian boatmen and certified river navigators adhering to strict safety protocols." },
    { icon: "StarIcon", title: "High Ratings & Verified Reviews", body: "We prioritize boat tours with outstanding customer ratings and thousands of verified traveler testimonials." },
    { icon: "LockIcon", title: "Transparent Pricing & Free Cancellation", body: "Clear upfront prices with 100% free cancellation up to 24 hours before departure on all standard tickets." },
    { icon: "HeadsetIcon", title: "Authentic Local Heritage", body: "We highlight traditional wooden barchetti steered by local renaioli to preserve Florence's unique river culture." },
  ];
  const a = {
    heroEyebrow: "About Us",
    heroHeading: "Your Independent Guide to Florence Arno River Cruise Tickets",
    heroSubheading:
      "We help travelers discover and book the finest Arno River sightseeing cruises, traditional barchetto aperitivo tours, and museum combo tickets in Florence — curated from licensed Italian operators.",
    heroImage: "/images/gallery/barchetto-cruise.jpg",
    heroImageAlt: "Traditional barchetto wooden boat gliding on the Arno River in Florence past Ponte Vecchio",
    introHeading: "Why We Built an Arno River Cruise Guide",
    introParagraph1:
      "We created this guide because experiencing Florence from the calm waters of the Arno River offers an incomparable perspective of Renaissance history. Gliding beneath Ponte Vecchio, gazing up at the Vasari Corridor, and toasting with Tuscan wine away from bustling sidewalks is one of Italy's greatest travel pleasures.",
    introParagraph2:
      "We are an independent Florence travel resource — not a single boat operator. We independently review and compare traditional handcrafted barchetti, eco-friendly electric sightseeing boats, and skip-the-line museum combo packages from verified licensed operators, pointing you directly to the highest-rated experiences.",
    introImage: "/images/gallery/golden-hour-cruise.jpg",
    introImageAlt: "Sunset over the Arno River and Florence bridges",
    reasonsHeading: "How We Curate Our Arno River Boat Tours",
    reasonsSubheading: "Every river cruise featured on our platform is evaluated against strict quality and authenticity standards.",
    disclosureHeading: "Affiliate Transparency",
    disclosureBody:
      "When you book an Arno boat cruise or combo ticket through links on our site, we may earn a small affiliate commission at absolutely no additional cost to you. This enables us to maintain this free, independent travel resource.",
    ctaText: "Ready to explore Florence from the water?",
    ctaButtonLabel: "Compare Arno Boat Cruises",
    metaTitle: "About Us | Arno Boat Cruise Florence Booking Guide",
    metaDescription:
      "Learn about Arno Boat Cruise: our mission, curation standards, and independent guide to the best boat tours in Florence, Italy.",
  };
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      intro_heading, intro_paragraph_1, intro_paragraph_2, intro_image, intro_image_alt,
      reasons_heading, reasons_subheading, reasons,
      disclosure_heading, disclosure_body, cta_text, cta_button_label,
      meta_title, meta_description
    ) VALUES (
      1, ${a.heroEyebrow}, ${a.heroHeading}, ${a.heroSubheading}, ${a.heroImage}, ${a.heroImageAlt},
      ${a.introHeading}, ${a.introParagraph1}, ${a.introParagraph2}, ${a.introImage}, ${a.introImageAlt},
      ${a.reasonsHeading}, ${a.reasonsSubheading}, ${JSON.stringify(reasons)}::jsonb,
      ${a.disclosureHeading}, ${a.disclosureBody}, ${a.ctaText}, ${a.ctaButtonLabel},
      ${a.metaTitle}, ${a.metaDescription}
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("about_page: seeded with About page copy.");
}

async function seedContactPage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM contact_page`;
  if (count > 0) {
    console.log("contact_page: already configured — skipping seed.");
    return;
  }
  const reasons = [
    { icon: "HeadsetIcon", title: "Booking & Tour Selection", body: "Need help deciding between a daytime barchetto cruise, romantic sunset wine tour, or Uffizi combo? Ask our Florence travel team." },
    { icon: "BriefcaseIcon", title: "Partnerships & Operators", body: "Licensed Florence boat operators, tourism agencies, and travel publishers — reach out regarding listings and features." },
    { icon: "MailIcon", title: "General Inquiries", body: "Feedback, travel advice, or content updates regarding Florence Arno River cruise experiences." },
  ];
  const c = {
    heroEyebrow: "Contact",
    heroHeading: "Get in Touch",
    heroSubheading:
      "Questions about an Arno River boat cruise or Florence ticket options — or a partnership inquiry? Reach out directly by email.",
    email: "livetravelpartner@gmail.com",
    emailNote: "We typically reply within 1–2 business days.",
    reasonsHeading: "What We Can Help With",
    footerNote:
      "Already booked? Please contact the licensed boat operator directly through your confirmation voucher for real-time timetable adjustments or immediate pier directions.",
    ctaHeading: "Ready to plan your cruise?",
    ctaButtonLabel: "Compare Florence Arno Boat Cruises & Tickets",
    metaTitle: "Contact Us | Arno Boat Cruise Florence",
    metaDescription:
      "Questions about booking an Arno River boat cruise, sunset wine tour, or Florence sightseeing tickets? Reach out to our team.",
  };
  await sql`
    INSERT INTO contact_page (
      id, hero_eyebrow, hero_heading, hero_subheading, email, email_note,
      reasons_heading, reasons, footer_note, cta_heading, cta_button_label,
      meta_title, meta_description
    ) VALUES (
      1, ${c.heroEyebrow}, ${c.heroHeading}, ${c.heroSubheading}, ${c.email}, ${c.emailNote},
      ${c.reasonsHeading}, ${JSON.stringify(reasons)}::jsonb, ${c.footerNote}, ${c.ctaHeading}, ${c.ctaButtonLabel},
      ${c.metaTitle}, ${c.metaDescription}
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("contact_page: seeded with Contact page copy.");
}

async function main() {
  await createTables();
  await addSeoColumns();
  await addHomepageCmsColumns();
  await addBlogCmsColumns();
  await addMediaLibraryTable();
  await seedTours();
  await seedPosts();
  await seedHomepage();
  await seedFaqs();
  await seedPrivacyPolicy();
  await seedSiteSettings();
  await seedAboutPage();
  await seedContactPage();
  console.log("\nDone. Florence Arno database is ready.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\nSetup failed:", err);
    process.exit(1);
  });
