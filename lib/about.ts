import { sql } from "./db";

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  content: string;
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
  content: `<h2>Our Mission</h2>
<p>We created this guide because experiencing Florence from the calm waters of the Arno River offers an incomparable perspective of Renaissance history. Gliding beneath Ponte Vecchio, gazing up at the Vasari Corridor, and toasting with Tuscan wine away from bustling sidewalks is one of Italy's greatest travel pleasures.</p>
<p>We are an independent Florence travel resource — not a single boat operator. We independently review and compare traditional handcrafted barchetti, eco-friendly electric sightseeing boats, and skip-the-line museum combo packages from verified licensed operators, pointing you directly to the highest-rated experiences.</p>
<h2>How We Choose Our Arno River Boat Tours</h2>
<p>Every river cruise featured on our platform is evaluated against strict quality and authenticity standards.</p>
<ul>
<li><strong>Licensed Florentine Operators</strong> — Every cruise listed is operated by licensed Italian boatmen and certified river navigators adhering to strict safety protocols.</li>
<li><strong>High Ratings &amp; Verified Reviews</strong> — We prioritize boat tours with outstanding customer ratings and thousands of verified traveler testimonials.</li>
<li><strong>Transparent Pricing &amp; Free Cancellation</strong> — Clear upfront prices with 100% free cancellation up to 24 hours before departure on all standard tickets.</li>
<li><strong>Authentic Local Heritage</strong> — We highlight traditional wooden barchetti steered by local renaioli to preserve Florence's unique river culture.</li>
</ul>
<h2>Independent Florence Boat Tour Guide</h2>
<p>Arno Boat Cruise is an independent travel guide, not an official ticketing authority, tour operator, or municipal body. We do not sell tickets directly — every booking on this site is processed through GetYourGuide, a trusted third-party booking platform, and is subject to that platform's own booking terms, cancellation policy, and confirmation process.</p>
<h2>Our Content</h2>
<p>We aim to write practical, honest guides rather than oversold marketing copy — prices, schedules, and tour details can change, so always check the booking page for the most current information before you travel.</p>
<h2>Affiliate Disclosure</h2>
<p>When you book an Arno boat cruise or combo ticket through links on our site, we may earn a small affiliate commission at absolutely no additional cost to you. This enables us to maintain this free, independent travel resource.</p>
<p>Have questions about Florence river tours? <a href="/contact">Contact our team</a>.</p>`,
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

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow || DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading || DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading || DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image || DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt || DEFAULT_ABOUT.heroImageAlt,
    content: row.content || DEFAULT_ABOUT.content,
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
      content, meta_title, meta_description, canonical_url,
      no_index, no_follow, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${data.content || ""},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.canonicalUrl || ""},
      ${!!data.noIndex}, ${!!data.noFollow}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      content = EXCLUDED.content,
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
