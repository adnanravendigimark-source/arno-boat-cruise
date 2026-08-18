import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";
import { getTours } from "@/lib/data";

// Split hero: a solid dark copy panel on the left blending into the hero
// photo on the right, a floating rating card over the image, and a white
// "popular cruises" preview card that overlaps the hero's bottom edge.
// heroGallery and the secondary CTA aren't used in this layout — the
// gallery grid and a "how it works" link don't fit this composition.
export default async function Hero() {
  const content = await getHomepageContent();
  const tours = await getTours();

  const orderedTours = content.showFeaturedTour
    ? [...tours].sort((a, b) => {
        if (a.id === content.featuredTourId) return -1;
        if (b.id === content.featuredTourId) return 1;
        return 0;
      })
    : tours;
  const previewTours = orderedTours.slice(0, 4);
  const avatarSrcs = content.heroGallery.slice(0, 3).map((g) => g.src).filter(Boolean);
  // Literal class names (not a template string) so Tailwind's static scan
  // picks them up — avoids an empty trailing grid gap when there are fewer
  // than 4 tours.
  const previewGridColsClass =
    { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3" }[previewTours.length] || "lg:grid-cols-4";

  return (
    <section id="top" className="relative overflow-hidden bg-forest-950 text-white">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left — copy panel (dark forest green, matching the logo/brand
            color — not a neutral black) */}
        <div className="relative z-10 flex flex-col justify-center bg-forest-950 px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-10 xl:px-14">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-[10.5px] font-bold uppercase leading-snug tracking-[0.16em] text-sage-200">
            <span aria-hidden="true">🍃</span>
            {content.heroBadge}
          </div>

          <h1 className="mt-4 max-w-2xl font-display text-[1.6rem] font-bold leading-[1.14] tracking-tight sm:text-[1.9rem] lg:text-[1.85rem] xl:text-[2.1rem]">
            {content.heroHeading}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sage-400/40" aria-hidden="true">
            <span className="h-px w-12 bg-current" />
            <span className="text-base">🛶</span>
            <span className="h-px w-12 bg-current" />
          </div>

          <div
            className="rich-content rich-content-invert mt-4 max-w-md text-sm leading-relaxed text-stone-300 sm:text-[15px]"
            dangerouslySetInnerHTML={{ __html: content.heroSubheading }}
          />

          {/* Trust bullets */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 text-sage-400">
                <path d="M12.59 2.59 20 10a2 2 0 0 1 0 2.83l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V4a2 2 0 0 1 2-2h8.59z" />
                <circle cx="7.5" cy="7.5" r="1.5" />
              </svg>
              <span className="text-[11px] font-semibold leading-tight text-stone-300">
                Best Price
                <br />
                Guaranteed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 text-sage-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-[11px] font-semibold leading-tight text-stone-300">
                Free Cancellation
                <br />
                on Most Tours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 text-sage-400">
                <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                <path d="M21 15v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Zm-18 0v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
              </svg>
              <span className="text-[11px] font-semibold leading-tight text-stone-300">
                24/7 Support
                <br />
                We&apos;re Here
              </span>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={content.heroCtaPrimaryHref}
              className="group inline-flex items-center gap-2.5 rounded-full bg-sage-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/30 transition-all duration-200 hover:scale-[1.02] hover:bg-sage-700"
            >
              {content.heroCtaPrimaryText}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right — hero photo */}
        <div className="relative h-72 sm:h-[24rem] lg:h-auto">
          {content.heroVideo ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={content.heroVideo}
              poster={content.heroImage || undefined}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <SafeImage
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          )}
          {/* Just enough darkening behind the floating card for legibility */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
          {/* Soft blend into the left panel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-forest-950 to-transparent lg:block xl:w-36" />

          {/* Floating rating card — kept clear of the popular-cruises card
              that overlaps up from below (see the -mt on that card) */}
          <div className="absolute bottom-10 right-4 z-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-forest-950/70 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-11 sm:right-6">
            {avatarSrcs.length > 0 && (
              <div className="flex -space-x-2.5">
                {avatarSrcs.map((src, i) => (
                  <span key={src + i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-forest-950">
                    <SafeImage src={src} alt="" fill sizes="32px" className="object-cover" />
                  </span>
                ))}
              </div>
            )}
            <div className="text-left leading-tight">
              <div className="text-[11px] tracking-tight text-sage-300" aria-hidden="true">★★★★★</div>
              <p className="mt-0.5 text-xs font-bold text-white">{content.ratingCount}</p>
              <p className="text-[11px] text-stone-300">{content.ratingValue} average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "popular cruises" preview card — overlaps the hero's bottom edge */}
      {previewTours.length > 0 && (
        <div className="relative z-20 mx-auto -mt-4 max-w-6xl px-4 pb-6 sm:px-6 sm:pb-7 lg:-mt-5">
          <div className="rounded-3xl border border-stone-200/60 bg-white p-5 shadow-2xl shadow-black/20 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-forest-600">
                  Popular Cruises
                </span>
                <h2 className="mt-1 font-display text-xl font-bold text-stone-900 sm:text-2xl">
                  Find the perfect cruise for you
                </h2>
              </div>
              <a
                href="#tours"
                className="text-sm font-bold text-stone-500 underline decoration-stone-300 underline-offset-4 transition hover:text-forest-600 hover:decoration-forest-400"
              >
                View all cruises →
              </a>
            </div>

            <div className={`mt-5 grid grid-cols-2 gap-4 ${previewGridColsClass}`}>
              {previewTours.map((tour) => (
                <a
                  key={tour.id}
                  href={tour.href}
                  target="_blank"
                  rel="noopener nofollow sponsored"
                  className="group overflow-hidden rounded-2xl border border-stone-200/70 shadow-sm transition hover:border-forest-400/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-stone-100">
                    <SafeImage
                      src={tour.image}
                      alt={tour.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {tour.ribbon && (
                      <span className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-stone-900 shadow-sm backdrop-blur-sm">
                        {tour.ribbon}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 text-[15px] font-bold text-stone-900">{tour.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2.5">
                        {tour.duration && (
                          <span className="flex min-w-0 items-center gap-1 text-[11px] font-medium text-stone-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 shrink-0">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 3" />
                            </svg>
                            <span className="truncate">{tour.duration}</span>
                          </span>
                        )}
                        <span className="truncate text-[11px] font-semibold text-stone-500">
                          From <span className="font-bold text-stone-900">€{tour.price}</span>
                        </span>
                      </div>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-800 text-xs text-white transition group-hover:bg-forest-700">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
