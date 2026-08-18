import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getPosts } from "@/lib/posts";
import { getBlogSeoSettings } from "@/lib/settings";
import { getHomepageContent } from "@/lib/homepage";
import { resolveRobots, resolveCanonical, resolveOg } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSeoSettings();
  const og = resolveOg(settings, { title: settings.metaTitle, description: settings.metaDescription });
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    alternates: { canonical: resolveCanonical("/blog", settings.canonicalUrl) },
    robots: resolveRobots(settings.noIndex, settings.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/blog", type: "website", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function BlogIndexPage() {
  const [posts, { sections }] = await Promise.all([getPosts(), getHomepageContent()]);
  const s = sections.blogPage;
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="inline-block rounded-md bg-orange-50 border border-orange-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            {s.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
            {s.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-stone-600">{s.subheading}</p>
        </div>

        {!featured && (
          <p className="mt-14 rounded-2xl border border-dashed border-stone-300 p-12 text-center text-sm text-stone-500">
            {s.emptyStateText}
          </p>
        )}

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-14 grid gap-0 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <SafeImage
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit rounded-md bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
                {featured.category}
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-orange-600">
                {s.featuredLinkText} <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* Remaining posts */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-md bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    {post.category}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">{post.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 p-10 text-center text-white shadow-xl">
          <p className="font-display text-2xl font-bold">{s.ctaHeading}</p>
          <a
            href="/#tours"
            className="rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
          >
            {s.ctaButtonText}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
