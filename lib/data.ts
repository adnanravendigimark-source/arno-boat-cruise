import { sql } from "./db";
import toursSeed from "@/data/tours.json";
import faqsSeed from "@/data/faqs.json";

export const PARTNER_ID = process.env.GYG_PARTNER_ID || "YOUR_PARTNER_ID";

function gygLink(path: string, extra = "") {
  const trimmed = (path || "").trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return `${trimmed}${extra || ""}`;
  }
  return `https://www.getyourguide.com/${trimmed}?partner_id=${PARTNER_ID}&utm_medium=online_publisher&cmp=florence-arno${extra}`;
}

export type TourType = "guided" | "self-guided" | "combo";

export interface TourRecord {
  id: string;
  badge: TourType;
  ribbon?: string;
  title: string;
  description: string;
  includes: string[];
  duration?: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  hrefPath: string;
  hrefExtra?: string;
  featured?: boolean;
  bestFor: string;
  // Shown in the homepage price-comparison table's first feature column
  // (see components/PriceComparison.tsx and the Price section's
  // column1Label in lib/homepage.ts) — e.g. "1h 15m". Blank falls back to
  // the tour's own Duration field.
  priceTableColumn1?: string;
  // Shown in the homepage price-comparison table's second feature column
  // (see components/PriceComparison.tsx and the Price section's
  // column2Label in lib/homepage.ts) — e.g. "Dutch Wine & Cheese". Blank
  // renders as "No" in that column.
  priceTableFeature?: string;
}

export interface Tour extends Omit<TourRecord, "hrefPath" | "hrefExtra"> {
  href: string;
}

function parseJsonArray(value: unknown): string[] {
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

function rowToTour(row: any): TourRecord {
  return {
    id: row.id,
    badge: row.badge,
    ribbon: row.ribbon || undefined,
    title: row.title,
    description: row.description,
    includes: parseJsonArray(row.includes),
    duration: row.duration || undefined,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    price: Number(row.price),
    originalPrice: row.original_price === null ? undefined : Number(row.original_price),
    image: row.image,
    imageAlt: row.image_alt,
    hrefPath: row.href_path,
    hrefExtra: row.href_extra || undefined,
    featured: !!row.featured,
    bestFor: row.best_for,
    priceTableColumn1: row.price_table_column1 || undefined,
    priceTableFeature: row.price_table_feature || undefined,
  };
}

export async function getToursRaw(): Promise<TourRecord[]> {
  try {
    const rows = await sql`SELECT * FROM tours ORDER BY sort_order ASC, id ASC`;
    if (rows.length) return rows.map(rowToTour);
    return toursSeed as TourRecord[];
  } catch {
    return toursSeed as TourRecord[];
  }
}

export async function saveTours(records: TourRecord[]): Promise<void> {
  for (let i = 0; i < records.length; i++) {
    const t = records[i];
    await sql`
      INSERT INTO tours (
        id, badge, ribbon, title, description, includes, duration, rating,
        reviews, price, original_price, image, image_alt, href_path,
        href_extra, featured, best_for, price_table_column1, price_table_feature, sort_order
      ) VALUES (
        ${t.id}, ${t.badge}, ${t.ribbon || null}, ${t.title}, ${t.description},
        ${JSON.stringify(t.includes || [])}::jsonb, ${t.duration || null}, ${t.rating},
        ${t.reviews}, ${t.price}, ${t.originalPrice ?? null}, ${t.image}, ${t.imageAlt},
        ${t.hrefPath}, ${t.hrefExtra || null}, ${!!t.featured}, ${t.bestFor}, ${t.priceTableColumn1 || ""}, ${t.priceTableFeature || ""}, ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        badge = EXCLUDED.badge,
        ribbon = EXCLUDED.ribbon,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        includes = EXCLUDED.includes,
        duration = EXCLUDED.duration,
        rating = EXCLUDED.rating,
        reviews = EXCLUDED.reviews,
        price = EXCLUDED.price,
        original_price = EXCLUDED.original_price,
        image = EXCLUDED.image,
        image_alt = EXCLUDED.image_alt,
        href_path = EXCLUDED.href_path,
        href_extra = EXCLUDED.href_extra,
        featured = EXCLUDED.featured,
        best_for = EXCLUDED.best_for,
        price_table_column1 = EXCLUDED.price_table_column1,
        price_table_feature = EXCLUDED.price_table_feature,
        sort_order = EXCLUDED.sort_order
    `;
  }

  const existing = await sql`SELECT id FROM tours`;
  const keepIds = records.map((t) => t.id);
  const toDelete = existing.map((r) => r.id as string).filter((id) => !keepIds.includes(id));
  for (const id of toDelete) {
    await sql`DELETE FROM tours WHERE id = ${id}`;
  }
}

export async function getTours(): Promise<Tour[]> {
  const records = await getToursRaw();
  return records.map(({ hrefPath, hrefExtra, ...rest }) => ({
    ...rest,
    href: gygLink(hrefPath, hrefExtra || ""),
  }));
}

export async function getTour(id: string): Promise<Tour | undefined> {
  const tours = await getTours();
  return tours.find((t) => t.id === id);
}

export interface FAQ {
  question: string;
  answer: string;
}

export async function getFaqs(): Promise<FAQ[]> {
  try {
    const rows = await sql`SELECT question, answer FROM faqs ORDER BY sort_order ASC, id ASC`;
    if (rows.length) return rows.map((r: any) => ({ question: r.question, answer: r.answer }));
    return faqsSeed as FAQ[];
  } catch {
    return faqsSeed as FAQ[];
  }
}

export async function saveFaqs(faqs: FAQ[]): Promise<void> {
  await sql`DELETE FROM faqs`;
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await sql`INSERT INTO faqs (question, answer, sort_order) VALUES (${f.question}, ${f.answer}, ${i})`;
  }
}
