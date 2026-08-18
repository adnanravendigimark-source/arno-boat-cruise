import { sql } from "./db";

export interface AboutReason {
  icon: string;
  title: string;
  body: string;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  introImage: string;
  introImageAlt: string;
  reasonsHeading: string;
  reasonsSubheading: string;
  reasons: AboutReason[];
  disclosureHeading: string;
  disclosureBody: string;
  ctaText: string;
  ctaButtonLabel: string;
  contactPromptHtml: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_ABOUT: AboutPageContent = {
  heroEyebrow: "About Us",
  heroHeading: "Your Independent Guide to Florence Arno River Cruise Tickets",
  heroSubheading:
    "We help travelers discover and book the finest Arno River sightseeing cruises, traditional barchetto aperitivo tours, and museum combo tickets in Florence — curated from licensed Italian operators.",
  heroImage: "https://images.unsplash.com/photo-1601195576601-346d58e024c0?q=80&w=2400&auto=format&fit=crop",
  heroImageAlt: "Aerial view of Ponte Vecchio and the Arno River winding through Florence, Italy",
  introHeading: "Why We Built an Arno River Cruise Guide",
  introParagraph1:
    "We created this guide because experiencing Florence from the calm waters of the Arno River offers an incomparable perspective of Renaissance history. Gliding beneath Ponte Vecchio, gazing up at the Vasari Corridor, and toasting with Tuscan wine away from bustling sidewalks is one of Italy's greatest travel pleasures.",
  introParagraph2:
    "We are an independent Florence travel resource — not a single boat operator. We independently review and compare traditional handcrafted barchetti, eco-friendly electric sightseeing boats, and skip-the-line museum combo packages from verified licensed operators, pointing you directly to the highest-rated experiences.",
  introImage: "https://images.unsplash.com/photo-1666692871771-341bf6ac40dc?q=80&w=2400&auto=format&fit=crop",
  introImageAlt: "Historic bridge over the Arno River in Firenze, Italy",
  reasonsHeading: "How We Curate Our Arno River Boat Tours",
  reasonsSubheading: "Every river cruise featured on our platform is evaluated against strict quality and authenticity standards.",
  reasons: [
    { icon: "ShieldCheckIcon", title: "Licensed Florentine Operators", body: "Every cruise listed is operated by licensed Italian boatmen and certified river navigators adhering to strict safety protocols." },
    { icon: "StarIcon", title: "High Ratings & Verified Reviews", body: "We prioritize boat tours with outstanding customer ratings and thousands of verified traveler testimonials." },
    { icon: "LockIcon", title: "Transparent Pricing & Free Cancellation", body: "Clear upfront prices with 100% free cancellation up to 24 hours before departure on all standard tickets." },
    { icon: "HeadsetIcon", title: "Authentic Local Heritage", body: "We highlight traditional wooden barchetti steered by local renaioli to preserve Florence's unique river culture." },
  ],
  disclosureHeading: "Affiliate Transparency",
  disclosureBody:
    "When you book an Arno boat cruise or combo ticket through links on our site, we may earn a small affiliate commission at absolutely no additional cost to you. This enables us to maintain this free, independent travel resource.",
  ctaText: "Ready to explore Florence from the water?",
  ctaButtonLabel: "Compare Arno Boat Cruises",
  contactPromptHtml:
    "Have questions about Florence river tours? Contact our team via the <a href=\"/contact\">contact page</a>.",
  metaTitle: "About Us | Arno Boat Cruise Florence Booking Guide",
  metaDescription:
    "Learn about Arno Boat Cruise: our mission, curation standards, and independent guide to the best boat tours in Florence, Italy.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "About Us | Arno Boat Cruise Florence Booking Guide",
  ogDescription:
    "Learn about Arno Boat Cruise: our mission, curation standards, and independent guide to the best boat tours in Florence, Italy.",
  ogImage: "",
};

function parseReasons(value: unknown): AboutReason[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow || DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading || DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image || DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt || DEFAULT_ABOUT.heroImageAlt,
    introHeading: row.intro_heading || DEFAULT_ABOUT.introHeading,
    introParagraph1: row.intro_paragraph_1 || DEFAULT_ABOUT.introParagraph1,
    introParagraph2: row.intro_paragraph_2 || DEFAULT_ABOUT.introParagraph2,
    introImage: row.intro_image || DEFAULT_ABOUT.introImage,
    introImageAlt: row.intro_image_alt || DEFAULT_ABOUT.introImageAlt,
    reasonsHeading: row.reasons_heading || DEFAULT_ABOUT.reasonsHeading,
    reasonsSubheading: row.reasons_subheading || DEFAULT_ABOUT.reasonsSubheading,
    reasons: (() => {
      const r = parseReasons(row.reasons);
      return r.length ? r : DEFAULT_ABOUT.reasons;
    })(),
    disclosureHeading: row.disclosure_heading || DEFAULT_ABOUT.disclosureHeading,
    disclosureBody: row.disclosure_body || DEFAULT_ABOUT.disclosureBody,
    ctaText: row.cta_text || DEFAULT_ABOUT.ctaText,
    ctaButtonLabel: row.cta_button_label || DEFAULT_ABOUT.ctaButtonLabel,
    contactPromptHtml: row.contact_prompt_html || DEFAULT_ABOUT.contactPromptHtml,
    metaTitle: row.meta_title || DEFAULT_ABOUT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_ABOUT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const rows = await sql`SELECT * FROM about_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToAbout(rows[0]) : DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  return getAboutPage();
}

export async function setAboutIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO about_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      intro_heading, intro_paragraph_1, intro_paragraph_2, intro_image, intro_image_alt,
      reasons_heading, reasons_subheading, reasons,
      disclosure_heading, disclosure_body, cta_text, cta_button_label,
      contact_prompt_html, meta_title, meta_description, canonical_url,
      no_index, no_follow, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${data.introHeading}, ${data.introParagraph1}, ${data.introParagraph2},
      ${data.introImage}, ${data.introImageAlt}, ${data.reasonsHeading}, ${data.reasonsSubheading},
      ${JSON.stringify(data.reasons || [])}::jsonb,
      ${data.disclosureHeading}, ${data.disclosureBody}, ${data.ctaText}, ${data.ctaButtonLabel},
      ${data.contactPromptHtml || ""},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.canonicalUrl || ""},
      ${!!data.noIndex}, ${!!data.noFollow}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      intro_heading = EXCLUDED.intro_heading,
      intro_paragraph_1 = EXCLUDED.intro_paragraph_1,
      intro_paragraph_2 = EXCLUDED.intro_paragraph_2,
      intro_image = EXCLUDED.intro_image,
      intro_image_alt = EXCLUDED.intro_image_alt,
      reasons_heading = EXCLUDED.reasons_heading,
      reasons_subheading = EXCLUDED.reasons_subheading,
      reasons = EXCLUDED.reasons,
      disclosure_heading = EXCLUDED.disclosure_heading,
      disclosure_body = EXCLUDED.disclosure_body,
      cta_text = EXCLUDED.cta_text,
      cta_button_label = EXCLUDED.cta_button_label,
      contact_prompt_html = EXCLUDED.contact_prompt_html,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
