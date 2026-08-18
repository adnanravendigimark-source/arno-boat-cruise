import { sql } from "./db";
import postsSeed from "@/data/posts.json";

export type ContentBlockType = "paragraph" | "heading" | "list" | "image";

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  level?: 2 | 3;
  items?: string[];
  ordered?: boolean;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  excerpt: string;
  quickAnswer: string;
  readTime: string;
  date: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  recommendedTourId: string;
  recommendedTourAfterBlock?: number;
  content: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  focusKeyword: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_CTA_HEADING = "Ready to explore Florence from the water?";
const DEFAULT_CTA_BODY = "Compare Arno River boat cruise prices and tickets on the homepage.";
const DEFAULT_CTA_BUTTON_TEXT = "Compare Florence Boat Tours & Tickets";
const DEFAULT_CTA_BUTTON_HREF = "/#prices";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function blocksToHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") {
        const level = block.level === 3 ? 3 : 2;
        return `<h${level}>${escapeHtml(block.text || "")}</h${level}>`;
      }
      if (block.type === "list") {
        const tag = block.ordered ? "ol" : "ul";
        const items = (block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
        return `<${tag}>${items}</${tag}>`;
      }
      if (block.type === "image") {
        if (!block.src) return "";
        const img = `<img src="${block.src}" alt="${escapeHtml(block.alt || "")}" />`;
        return block.caption
          ? `<figure>${img}<figcaption>${escapeHtml(block.caption)}</figcaption></figure>`
          : `<figure>${img}</figure>`;
      }
      return block.text || "";
    })
    .filter(Boolean)
    .join("");
}

function parseContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return blocksToHtml(value as ContentBlock[]);
  return "";
}

function rowToPost(row: any): Post {
  return {
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    category: row.category,
    excerpt: row.excerpt,
    quickAnswer: row.quick_answer,
    readTime: row.read_time,
    date: row.date,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString().slice(0, 10) : row.date,
    image: row.image,
    imageAlt: row.image_alt,
    recommendedTourId: row.recommended_tour_id || "",
    recommendedTourAfterBlock:
      row.recommended_tour_after_block === null ? undefined : Number(row.recommended_tour_after_block),
    content: parseContent(row.content),
    ctaHeading: row.cta_heading || DEFAULT_CTA_HEADING,
    ctaBody: row.cta_body || DEFAULT_CTA_BODY,
    ctaButtonText: row.cta_button_text || DEFAULT_CTA_BUTTON_TEXT,
    ctaButtonHref: row.cta_button_href || DEFAULT_CTA_BUTTON_HREF,
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

function seedPosts(): Post[] {
  return (postsSeed as any[]).map((p) => ({
    ...p,
    content: parseContent(p.content),
    updatedAt: p.updatedAt || p.date,
    ctaHeading: p.ctaHeading || DEFAULT_CTA_HEADING,
    ctaBody: p.ctaBody || DEFAULT_CTA_BODY,
    ctaButtonText: p.ctaButtonText || DEFAULT_CTA_BUTTON_TEXT,
    ctaButtonHref: p.ctaButtonHref || DEFAULT_CTA_BUTTON_HREF,
    focusKeyword: p.focusKeyword || "",
    noIndex: !!p.noIndex,
    noFollow: !!p.noFollow,
    canonicalUrl: p.canonicalUrl || "",
    ogTitle: p.ogTitle || "",
    ogDescription: p.ogDescription || "",
    ogImage: p.ogImage || "",
  }));
}

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await sql`SELECT * FROM posts ORDER BY date DESC, sort_order ASC`;
    if (rows.length) return rows.map(rowToPost);
    return seedPosts();
  } catch {
    return seedPosts();
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
    if (rows.length) return rowToPost(rows[0]);
    return seedPosts().find((p) => p.slug === slug);
  } catch {
    return seedPosts().find((p) => p.slug === slug);
  }
}

export async function setPostIndexing(slug: string, noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`UPDATE posts SET no_index = ${!!noIndex}, no_follow = ${!!noFollow} WHERE slug = ${slug}`;
}

export async function getRelatedPosts(slug: string, count?: number): Promise<Post[]> {
  const posts = await getPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  return typeof count === "number" ? filtered.slice(0, count) : filtered;
}

export async function savePosts(posts: Post[]): Promise<void> {
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await sql`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, category, excerpt,
        quick_answer, read_time, date, updated_at, image, image_alt,
        recommended_tour_id, recommended_tour_after_block, content, sort_order,
        cta_heading, cta_body, cta_button_text, cta_button_href, focus_keyword,
        no_index, no_follow, canonical_url, og_title, og_description, og_image
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.metaTitle}, ${p.metaDescription}, ${p.category},
        ${p.excerpt}, ${p.quickAnswer}, ${p.readTime}, ${p.date}, ${p.updatedAt || p.date}, ${p.image}, ${p.imageAlt},
        ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
        ${JSON.stringify(p.content || "")}::jsonb, ${i},
        ${p.ctaHeading || ""}, ${p.ctaBody || ""}, ${p.ctaButtonText || ""}, ${p.ctaButtonHref || ""}, ${p.focusKeyword || ""},
        ${!!p.noIndex}, ${!!p.noFollow}, ${p.canonicalUrl || ""}, ${p.ogTitle || ""}, ${p.ogDescription || ""}, ${p.ogImage || ""}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        category = EXCLUDED.category,
        excerpt = EXCLUDED.excerpt,
        quick_answer = EXCLUDED.quick_answer,
        read_time = EXCLUDED.read_time,
        date = EXCLUDED.date,
        updated_at = EXCLUDED.updated_at,
        image = EXCLUDED.image,
        image_alt = EXCLUDED.image_alt,
        recommended_tour_id = EXCLUDED.recommended_tour_id,
        recommended_tour_after_block = EXCLUDED.recommended_tour_after_block,
        content = EXCLUDED.content,
        sort_order = EXCLUDED.sort_order,
        cta_heading = EXCLUDED.cta_heading,
        cta_body = EXCLUDED.cta_body,
        cta_button_text = EXCLUDED.cta_button_text,
        cta_button_href = EXCLUDED.cta_button_href,
        focus_keyword = EXCLUDED.focus_keyword,
        no_index = EXCLUDED.no_index,
        no_follow = EXCLUDED.no_follow,
        canonical_url = EXCLUDED.canonical_url,
        og_title = EXCLUDED.og_title,
        og_description = EXCLUDED.og_description,
        og_image = EXCLUDED.og_image
    `;
  }

  const existing = await sql`SELECT slug FROM posts`;
  const keepSlugs = posts.map((p) => p.slug);
  const toDelete = existing.map((r) => r.slug as string).filter((slug) => !keepSlugs.includes(slug));
  for (const slug of toDelete) {
    await sql`DELETE FROM posts WHERE slug = ${slug}`;
  }
}
