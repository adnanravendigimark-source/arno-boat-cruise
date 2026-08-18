import Link from "next/link";
import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import { getTours } from "@/lib/data";
import { getRelatedPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";

export default async function BlogSidebar({
  slug,
  recommendedTourId,
}: {
  slug: string;
  recommendedTourId: string;
}) {
  const [tours, related, { header, sections }] = await Promise.all([
    getTours(),
    getRelatedPosts(slug),
    getHomepageContent(),
  ]);
  const tour = tours.find((t) => t.id === recommendedTourId);
  const s = sections.blogPage;

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
      {tour && (
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:shadow-md">
          <div className="relative aspect-[16/10]">
            <SafeImage src={tour.image} alt={tour.imageAlt} fill sizes="320px" className="object-cover" />
            <span className="absolute left-3 top-3 rounded-lg bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              {s.sidebarRecommendedBadge}
            </span>
          </div>
          <div className="p-5">
            <p className="font-display text-base font-bold leading-snug text-stone-900">
              {tour.title}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <StarRating rating={tour.rating} showValue reviewCount={tour.reviews} size="xs" />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">from</p>
                <p className="font-display text-xl font-bold text-stone-900">€{tour.price}</p>
              </div>
              <a
                href={tour.href}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:scale-[1.02] transition"
              >
                {header.bookNowText}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
          {s.sidebarRelatedHeading}
        </p>
        <div className="mt-4 space-y-4">
          {related.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-3.5 items-center">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">
                <SafeImage src={post.image} alt={post.imageAlt} fill sizes="80px" className="object-cover transition group-hover:scale-105" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-orange-600">
                  {post.category}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <a
        href="/#tours"
        className="block rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 p-6 text-center text-sm font-bold text-white shadow-md transition hover:scale-[1.01]"
      >
        {s.sidebarCompareLinkText}
      </a>
    </aside>
  );
}
