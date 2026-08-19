"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { TicketIcon, CalendarIcon, SearchIcon } from "./icons";
import type { Post } from "@/lib/posts";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogIndexSidebar({
  posts,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  ctaHeading = "Book Your Arno River Cruise",
  ctaBody = "Best prices, secure booking and instant confirmation.",
  ctaButtonText = "Compare Cruises →",
}: {
  posts: Post[];
  categories: { name: string; count: number }[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonText?: string;
}) {
  const popular = posts.slice(0, 5);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Search Widget */}
      <div className="flex rounded-xl border border-stone-300 bg-white overflow-hidden shadow-sm focus-within:border-forest-600">
        <input
          type="text"
          value={searchQuery || ""}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search articles..."
          className="w-full bg-transparent px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Search"
          className="flex items-center justify-center bg-forest-700 px-3.5 text-white transition hover:bg-forest-800"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
          <p className="font-display text-base font-bold text-stone-900">Categories</p>
          <div className="mt-3.5 space-y-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(isSelected ? "All" : cat.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-forest-50 text-forest-700 font-bold"
                      : "text-stone-700 hover:bg-stone-100 hover:text-forest-700"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-stone-100 px-1.5 text-[10px] font-bold text-stone-700">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Articles Widget */}
      {popular.length > 0 && (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
          <p className="font-display text-base font-bold text-stone-900">Popular Articles</p>
          <div className="mt-4 space-y-3.5">
            {popular.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-3"
              >
                <div className="relative h-13 w-16 shrink-0 aspect-[4/3] overflow-hidden rounded-xl bg-stone-100">
                  <SafeImage
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="80px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-bold leading-snug text-stone-900 transition-colors group-hover:text-forest-700">
                    {post.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                    <CalendarIcon className="h-3 w-3 text-forest-600" />
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Book Your Arno River Cruise Promo Card */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-br from-sage-50/60 via-white to-forest-50/40 p-6 text-center shadow-sm">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
          <TicketIcon className="h-5 w-5" />
        </div>
        <p className="mt-3.5 font-display text-base font-bold text-stone-900">{ctaHeading}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{ctaBody}</p>
        <a
          href="/#tours"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:scale-[1.02]"
        >
          {ctaButtonText}
        </a>
      </div>
    </aside>
  );
}
