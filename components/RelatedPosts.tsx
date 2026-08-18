import Link from "next/link";
import SafeImage from "./SafeImage";
import { getRelatedPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";

export default async function RelatedPosts({ slug }: { slug: string }) {
  const [related, { sections }] = await Promise.all([getRelatedPosts(slug), getHomepageContent()]);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-stone-200/80 pt-12">
      <p className="font-display text-2xl font-bold text-stone-900">{sections.blogPage.relatedGuidesHeading}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 transition-all hover:border-canal-blue/40 hover:shadow-lg"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
              <SafeImage src={post.image} alt={post.imageAlt} fill sizes="100px" className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-canal-blue">
                {post.category}
              </span>
              <p className="mt-1 text-sm font-bold text-stone-900 group-hover:text-canal-orange transition-colors">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
