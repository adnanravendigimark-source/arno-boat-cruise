import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuickAnswer from "@/components/QuickAnswer";
import TableOfContents from "@/components/TableOfContents";
import BlogPostBody from "@/components/BlogPostBody";
import BlogSidebar from "@/components/BlogSidebar";
import SafeImage from "@/components/SafeImage";
import { getPost } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { getRedirectTarget } from "@/lib/redirects";
import { resolveRobots, resolveCanonical, resolveOg, buildArticleJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { extractTableOfContents } from "@/lib/tableOfContents";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  const og = resolveOg(
    { ogTitle: post.ogTitle, ogDescription: post.ogDescription, ogImage: post.ogImage },
    { title: post.metaTitle, description: post.metaDescription, image: post.image }
  );
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: resolveCanonical(`/blog/${params.slug}`, post.canonicalUrl) },
    robots: resolveRobots(post.noIndex, post.noFollow),
    openGraph: {
      title: og.title,
      description: og.description,
      url: `/blog/${params.slug}`,
      type: "article",
      images: og.image ? [{ url: og.image, alt: post.imageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const [post, { sections }] = await Promise.all([getPost(params.slug), getHomepageContent()]);
  const s = sections.blogPage;
  if (!post) {
    const target = await getRedirectTarget(params.slug);
    if (target) permanentRedirect(`/blog/${target}`);
    notFound();
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    authorName: "Arno Boat Cruise",
    siteName: "Arno Boat Cruise",
  });

  const { toc: headingToc, html: contentHtml } = extractTableOfContents(post.content);
  const toc = post.quickAnswer.trim()
    ? [{ id: "quick-answer", text: s.quickAnswerLabel, level: 2 as const }, ...headingToc]
    : headingToc;

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.category, path: `/blog/${post.slug}` }]} />
      <main>
        <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:underline">
            {s.backToGuidesText}
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-orange-600">
            <span className="rounded-md bg-orange-50 px-2.5 py-1">{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span className="text-stone-400 font-medium">{post.readTime}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-stone-900 sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-600">{post.excerpt}</p>}
          <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-stone-200/80 shadow-md">
            <SafeImage
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:grid lg:grid-cols-[1fr_21rem] lg:gap-12">
          <div>
            <TableOfContents items={toc} label={s.tocLabel} />

            <QuickAnswer label={s.quickAnswerLabel}>{post.quickAnswer}</QuickAnswer>

            <BlogPostBody
              content={contentHtml}
              recommendedTourId={post.recommendedTourId}
              showRecommendedTour={!!post.recommendedTourAfterBlock}
            />

            <div className="mt-12 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 p-8 shadow-sm">
              <p className="font-display text-xl font-bold text-stone-900">{post.ctaHeading}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{post.ctaBody}</p>
              <Link
                href={post.ctaButtonHref}
                className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-600/20 transition hover:scale-[1.02]"
              >
                {post.ctaButtonText}
              </Link>
            </div>
          </div>

          <div className="mt-14 lg:mt-0 lg:border-l lg:border-stone-200/80 lg:pl-10">
            <BlogSidebar slug={post.slug} recommendedTourId={post.recommendedTourId} />
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}
