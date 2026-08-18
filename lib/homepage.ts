import { sql } from "./db";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface TimelineRow {
  time: string;
  step: string;
}

export interface HoursRow {
  range: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface TourSection {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface HighlightCard {
  icon: string;
  title: string;
  body: string;
}
export interface HighlightsSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: HighlightCard[];
}

export interface WhySection {
  heading: string;
  intro: string;
  timelineHeading: string;
  timeline: TimelineRow[];
  learnHeading: string;
  learn: string[];
  note: string;
  extraHeading: string;
  extraItems: { name: string; note: string }[];
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
}

export interface TowerSection {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  ctaButtonText: string;
  ctaHref: string;
  images: GalleryImage[];
}

export interface PracticalSection {
  hoursHeading: string;
  hours: HoursRow[];
  hoursNote: string;
  addressHeading: string;
  address: string;
  metro: string;
  bestTimeHeading: string;
  bestTimeBody: string;
}

export interface PriceSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  note: string;
  itemLabel: string;
  priceLabel: string;
  column1Label: string;
  column2Label: string;
  bestForLabel: string;
  bookLabel: string;
}

export interface FaqSection {
  eyebrow: string;
  heading: string;
}

export interface NotFoundSection {
  heading: string;
  body: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface BlogTeaserSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  viewAllText: string;
  readArticleText: string;
}

export interface BlogPageSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  emptyStateText: string;
  featuredLinkText: string;
  ctaHeading: string;
  ctaButtonText: string;
  backToGuidesText: string;
  quickAnswerLabel: string;
  tocLabel: string;
  relatedGuidesHeading: string;
  sidebarRelatedHeading: string;
  sidebarRecommendedBadge: string;
  sidebarCompareLinkText: string;
  promoRecommendedText: string;
}

export interface HomepageSections {
  tours: TourSection;
  highlights: HighlightsSection;
  why: WhySection;
  tower: TowerSection;
  practical: PracticalSection;
  price: PriceSection;
  faq: FaqSection;
  notFound: NotFoundSection;
  blogTeaser: BlogTeaserSection;
  blogPage: BlogPageSection;
}

export interface HeaderContent {
  logoImage: string;
  logoAlt: string;
  logoLine1: string;
  logoLine2: string;
  bookNowText: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  dark: string;
  accent: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroVideo: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  sections: HomepageSections;
  header: HeaderContent;
  footer: FooterContent;
  theme: ThemeColors;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "",
  logoAlt: "Arno Boat Cruise Florence",
  logoLine1: "Arno",
  logoLine2: "Boat Cruise",
  bookNowText: "Book Now",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Book a Cruise",
  ctaHref: "/#tours",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Independent Florence booking guide.</strong> Not affiliated with any single boat operator — we curate verified Arno River sightseeing cruises, traditional barchetto aperitivo tours, and museum combo tickets from licensed Italian operators.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Arno River Cruises", href: "/#tours" },
        { label: "Sunset Aperitivo Cruise", href: "/#night-cruise" },
        { label: "Cruise Prices", href: "/#prices" },
        { label: "Arno FAQs", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Florence Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Main Boarding Pier",
  addressLine1: "Piazza Mentana / Lungarno Anna Maria Luisa de' Medici",
  addressLine2: "50122 Firenze (FI), Italy",
  copyrightText:
    "Arno Boat Cruise. All prices shown in EUR and subject to change by the licensed boat operator.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#c85a32",   // Tuscan Terracotta / Burnt Sienna
  secondary: "#0d9488", // Arno River Teal
  dark: "#181411",      // Florence Midnight Umber
  accent: "#f59e0b",    // Renaissance Amber Gold
};

export const DEFAULT_GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/barchetto-cruise.jpg",
    alt: "Traditional wooden barchetto boat cruising past Ponte Vecchio on the Arno River",
    label: "Traditional Barchetto",
  },
  {
    src: "/images/gallery/golden-hour-cruise.jpg",
    alt: "Couple enjoying Tuscan wine on an Arno River sunset cruise in Florence",
    label: "Sunset Cruise",
  },
  {
    src: "/images/gallery/evening-lights.jpg",
    alt: "Illuminated Uffizi Gallery and Florence bridges glowing along the Arno River at night",
    label: "Uffizi Riverfront",
  },
  {
    src: "/images/gallery/historic-bridges.jpg",
    alt: "Ponte Santa Trinita and historic Renaissance palaces reflected in the Arno River",
    label: "Historic Bridges",
  },
];

export const DEFAULT_SECTIONS: HomepageSections = {
  tours: {
    eyebrow: "Handpicked River Experiences",
    heading: "Florence Arno River Cruise Tours & Tickets",
    subheading:
      "Curated Arno boat cruises — authentic wooden barchetto rides with Tuscan wine, romantic golden-hour sunset cruises, and skip-the-line Uffizi combos. Experience Florence from the water.",
  },
  highlights: {
    eyebrow: "Why the Arno River",
    heading: "Florence Arno River Highlights",
    subheading:
      "The Arno isn't just a river — it's the heart of Renaissance Florence. Here is why seeing the city from the water is unmatched.",
    cards: [
      {
        title: "Glide Under Ponte Vecchio",
        body: "Pass directly beneath the 700-year-old medieval stone arches of Ponte Vecchio and look up at the jewelry workshops suspended over the river.",
        icon: "🏛️",
      },
      {
        title: "Traditional Wooden Barchetti",
        body: "Ride aboard authentic flat-bottomed wooden boats piloted with a wooden pole by local Florentine boatmen (renaioli) — silent, peaceful, and eco-friendly.",
        icon: "🛶",
      },
      {
        title: "Tuscan Wine & Aperitivo",
        body: "Sip chilled Italian Prosecco or Chianti Classico wine accompanied by light artisanal appetizers as you drift through Renaissance history.",
        icon: "🍷",
      },
      {
        title: "Tuscan Sunset Glow",
        body: "Golden hour transforms the sandstone facades, Santa Trinita arches, and Uffizi colonnade into warm amber and glowing rose reflections.",
        icon: "✨",
      },
    ],
  },
  why: {
    heading: "What You Actually See on an Arno River Boat Tour",
    intro:
      "Fifty minutes of serenity, gliding past the greatest monuments of Renaissance Florence without crowds or sidewalk noise. Here is the itinerary landmark by landmark.",
    timelineHeading: "Sample River Route",
    timeline: [
      { time: "0:00", step: "Depart Piazza Mentana dock along Lungarno Anna Maria Luisa de' Medici" },
      { time: "0:12", step: "Glide past the classical colonnade of the Uffizi Gallery at water level" },
      { time: "0:25", step: "Float directly beneath the central medieval arch of the iconic Ponte Vecchio" },
      { time: "0:38", step: "Admire the Vasari Corridor and the graceful arches of Ponte Santa Trinita" },
      { time: "0:48", step: "Take in the baroque riverside facade of Palazzo Corsini and the Oltrarno" },
      { time: "0:55", step: "Return smoothly to the central riverbank boarding dock" },
    ],
    learnHeading: "What You Will Discover",
    learn: [
      "Why the Medici family built the elevated Vasari Corridor to cross the river in secret",
      "How historic renaioli boatmen dredged river sand that built the Florence Duomo and palaces",
      "The architectural secret behind Michelangelo's catenary curves on Ponte Santa Trinita",
      "Why the jewelry shops on Ponte Vecchio replaced the original medieval butcher stalls in 1593",
    ],
    note: "All featured tours include live English commentary or multilingual audio apps. Boats operate with safety jackets and shaded canopies.",
    extraHeading: "Where You Can Board",
    extraItems: [
      { name: "Piazza Mentana Pier", note: "Just a 3-minute walk from the Uffizi Gallery — the primary departure dock" },
      { name: "Lungarno Torrigiani Pier", note: "On the southern Oltrarno riverbank near Ponte alle Grazie" },
      { name: "Ponte Vecchio Dock", note: "Convenient meeting point near the historic bridge entrance" },
    ],
    ctaText: "Ready to cruise? Traditional barchetto tours start at €28/person with flexible departure times.",
    ctaButtonText: "Book Your Arno Boat Tour →",
    ctaHref: "#tours",
  },
  tower: {
    eyebrow: "Romantic Sunset Cruise with Tuscan Wine",
    heading: "See Florence's Bridges & Palaces Glowing at Sunset",
    body:
      "As the Tuscan sun sets behind the hills of Bellosguardo, the Arno River transforms into liquid amber. Stone arches and Renaissance facades reflect on the glassy water while you enjoy chilled Italian Prosecco and Tuscan wine — an unforgettable evening experience.",
    bullets: [
      "Complimentary glass of chilled Italian Prosecco or Tuscan wine with savory snacks",
      "Prime golden-hour departure timing timed with the sunset over Ponte Santa Trinita",
      "Intimate small-group setting (max 10–12 guests per boat)",
      "Unmatched photo opportunities of Ponte Vecchio with amber reflections",
    ],
    ctaButtonText: "See Romantic Sunset Cruise",
    ctaHref: "#tours",
    images: [
      {
        src: "/images/gallery/golden-hour-cruise.jpg",
        alt: "Romantic sunset boat cruise on the Arno River in Florence with wine",
        label: "Sunset Aperitivo",
      },
      {
        src: "/images/gallery/barchetto-cruise.jpg",
        alt: "Traditional barchetto wooden boat gliding on the Arno past Ponte Vecchio",
        label: "Traditional Barchetto",
      },
      {
        src: "/images/gallery/evening-lights.jpg",
        alt: "Illuminated bridges and Uffizi Gallery riverfront in Florence at night",
        label: "Evening Lights",
      },
      {
        src: "/images/gallery/historic-bridges.jpg",
        alt: "Arno River bridges and Renaissance buildings in Florence",
        label: "Historic Arches",
      },
    ],
  },
  practical: {
    hoursHeading: "Cruise Timetables & Season (2026)",
    hours: [
      { range: "April – October (Peak Season)", time: "10:00 AM – 8:30 PM (departs every 30–45 mins)" },
      { range: "Sunset Cruises (May – September)", time: "18:30 – 20:00 (daily scheduled golden hour slots)" },
    ],
    hoursNote: "Operating seasonally from April to late October when river conditions and weather are optimal.",
    addressHeading: "Primary Boarding Dock",
    address:
      "Piazza Mentana / Lungarno Anna Maria Luisa de' Medici, 50122 Firenze (FI), Italy.\nJust 250m east of the Uffizi Gallery and Ponte Vecchio along the northern riverbank.",
    metro: "Please arrive 15 minutes before your scheduled departure. Look for the Arno Boat Cruise dock sign at the water stairs.",
    bestTimeHeading: "Best Time for an Arno Cruise",
    bestTimeBody:
      "Golden hour (1 hour prior to sunset) is the most sought-after departure for romantic lighting and comfortable temperatures. Morning departures before 11:30 AM offer calm water and quiet reflections.",
  },
  price: {
    eyebrow: "Transparent Comparison",
    heading: "Compare & Choose Your Florence Arno River Cruise",
    subheading:
      "All top-rated Arno boat tours compared side by side — choose your preferred experience and book instantly online.",
    note: "Children and youth discounts available on select tours. Free cancellation up to 24 hours prior on all verified tickets.",
    itemLabel: "Cruise Option",
    priceLabel: "Price",
    column1Label: "Duration",
    column2Label: "Tasting / Wine",
    bestForLabel: "Best For",
    bookLabel: "Book",
  },
  faq: {
    eyebrow: "Got Questions?",
    heading: "Florence Arno River Cruise FAQs",
  },
  notFound: {
    heading: "Looks like this page drifted down the Arno.",
    body: "The page you are looking for doesn't exist or may have moved. Explore our top Florence river cruises instead.",
    primaryButtonText: "Compare Arno River Cruises & Tickets →",
    primaryButtonHref: "/#tours",
    secondaryButtonText: "Read the Florence Travel Guide",
    secondaryButtonHref: "/blog",
  },
  blogTeaser: {
    eyebrow: "Florence Travel Guides",
    heading: "Arno River Cruise Guides & Sightseeing Tips",
    subheading:
      "Expert local advice, sunset cruise reviews, barchetto history, and 2-to-3-day Florence itineraries.",
    viewAllText: "View All Articles",
    readArticleText: "Read Article",
  },
  blogPage: {
    eyebrow: "Florence River & Travel Guides",
    heading: "Arno River Travel Tips, Routes & Guides",
    subheading: "Practical advice to help you choose the best departure dock, cruise duration, and sunset timing in Florence.",
    emptyStateText: "No articles published yet — check back soon.",
    featuredLinkText: "Read the guide",
    ctaHeading: "Ready to book your Arno River cruise in Florence?",
    ctaButtonText: "Compare Arno River Cruises & Tickets →",
    backToGuidesText: "← All Florence travel guides",
    quickAnswerLabel: "Quick Answer",
    tocLabel: "In This Guide",
    relatedGuidesHeading: "Related Florence Guides",
    sidebarRelatedHeading: "Related Travel Guides",
    sidebarRecommendedBadge: "Recommended",
    sidebarCompareLinkText: "Compare all cruises & tickets →",
    promoRecommendedText: "Recommended Cruise",
  },
};

const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "⚓ Licensed Florentine Boatmen · Free Cancellation · Instant Mobile Confirmation",
  heroHeading: "Arno River Boat Cruise Florence — Experience the Renaissance from the Water",
  heroSubheading:
    "Glide beneath the ancient arches of Ponte Vecchio, marvel at the Vasari Corridor, and enjoy a glass of Tuscan wine aboard an authentic wooden barchetto. Book your Arno boat cruise online with instant confirmation and free cancellation.",
  heroImage: "/images/gallery/barchetto-cruise.jpg",
  heroImageAlt: "Traditional wooden barchetto boat cruise on the Arno River in Florence past Ponte Vecchio at sunset",
  heroVideo: "",
  heroGallery: DEFAULT_GALLERY,
  heroCtaPrimaryText: "Compare Arno Cruises",
  heroCtaPrimaryHref: "#tours",
  heroCtaSecondaryText: "See Cruise Prices",
  heroCtaSecondaryHref: "#prices",
  ratingValue: "4.9 / 5",
  ratingCount: "12,400+ reviews",
  showFeaturedTour: true,
  featuredTourId: "florence-traditional-barchetto-cruise-aperitivo",
  featuredBadgeLabel: "Bestseller Tour",
  featuredUrgencyText: "Best Price Guaranteed · High Demand for Sunset Slots",
  featuredReasons: [
    "12,400+ verified reviews — rated 4.9 / 5 by international travelers",
    "Pass directly underneath Ponte Vecchio with authentic Tuscan wine & snacks",
    "100% free cancellation up to 24 hours before your departure",
  ],
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): string[] {
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

function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    heroVideo: row.hero_video || "",
    heroGallery: (() => {
      const g = parseReasons(row.hero_gallery);
      return g.length ? (g as unknown as GalleryImage[]) : DEFAULT_GALLERY;
    })(),
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    heroCtaSecondaryText: row.hero_cta_secondary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryText,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryHref,
    ratingValue: row.rating_value || "",
    ratingCount: row.rating_count || "",
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
    sections: {
      tours: { ...DEFAULT_SECTIONS.tours, ...sectionsRaw.tours },
      highlights: { ...DEFAULT_SECTIONS.highlights, ...sectionsRaw.highlights },
      why: { ...DEFAULT_SECTIONS.why, ...sectionsRaw.why },
      tower: { ...DEFAULT_SECTIONS.tower, ...sectionsRaw.tower },
      practical: { ...DEFAULT_SECTIONS.practical, ...sectionsRaw.practical },
      price: { ...DEFAULT_SECTIONS.price, ...sectionsRaw.price },
      faq: { ...DEFAULT_SECTIONS.faq, ...sectionsRaw.faq },
      notFound: { ...DEFAULT_SECTIONS.notFound, ...sectionsRaw.notFound },
      blogTeaser: { ...DEFAULT_SECTIONS.blogTeaser, ...sectionsRaw.blogTeaser },
      blogPage: { ...DEFAULT_SECTIONS.blogPage, ...sectionsRaw.blogPage },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

export async function getSiteChrome(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}

export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroVideo: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_video, hero_gallery, hero_cta_primary_text, hero_cta_primary_href,
      hero_cta_secondary_text, hero_cta_secondary_href,
      rating_value, rating_count, meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${data.heroVideo || ""}, ${JSON.stringify(data.heroGallery || [])}::jsonb,
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.heroCtaSecondaryText || ""}, ${data.heroCtaSecondaryHref || ""},
      ${data.ratingValue}, ${data.ratingCount},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_video = EXCLUDED.hero_video,
      hero_gallery = EXCLUDED.hero_gallery,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      hero_cta_secondary_text = EXCLUDED.hero_cta_secondary_text,
      hero_cta_secondary_href = EXCLUDED.hero_cta_secondary_href,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveRecommendedTour(data: {
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, show_featured_tour, featured_tour_id, featured_badge_label,
      featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${!!data.showFeaturedTour}, ${data.featuredTourId}, ${data.featuredBadgeLabel},
      ${data.featuredUrgencyText}, ${JSON.stringify(data.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons
  `;
}

export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET sections_json = EXCLUDED.sections_json
  `;
}

export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(header)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET header_json = EXCLUDED.header_json
  `;
}

export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET footer_json = EXCLUDED.footer_json
  `;
}

export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET theme_json = EXCLUDED.theme_json
  `;
}
