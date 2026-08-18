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

  return (
    <section id="top" className="relative overflow-hidden bg-stone-950 text-white">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left — copy panel */}
        <div className="relative z-10 flex flex-col justify-center bg-stone-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sage-200">
            <span aria-hidden="true">🍃</span>
            {content.heroBadge}
          </div>

          <h1 className="mt-6 max-w-lg font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {content.heroHeading}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-sage-400/40" aria-hidden="true">
            <span className="h-px w-14 bg-current" />
            <span className="text-lg">🛶</span>
            <span className="h-px w-14 bg-current" />
          </div>

          <div
            className="rich-content rich-content-invert mt-6 max-w-md text-base leading-relaxed text-stone-300"
            dangerouslySetInnerHTML={{ __html: content.heroSubheading }}
          />

          {/* Trust bullets */}
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-sage-400">
                <path d="M12.59 2.59 20 10a2 2 0 0 1 0 2.83l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V4a2 2 0 0 1 2-2h8.59z" />
                <circle cx="7.5" cy="7.5" r="1.5" />
              </svg>
              <span className="text-xs font-semibold leading-tight text-stone-300">
                Best Price
                <br />
                Guaranteed
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-sage-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-xs font-semibold leading-tight text-stone-300">
                Free Cancellation
                <br />
                on Most Tours
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-sage-400">
                <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                <path d="M21 15v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Zm-18 0v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
              </svg>
              <span className="text-xs font-semibold leading-tight text-stone-300">
                24/7 Support
                <br />
                We&apos;re Here
              </span>
            </div>
          </div>

          <div className="mt-9">
            <a
              href={content.heroCtaPrimaryHref}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-forest-950/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-forest-600/40"
            >
              {content.heroCtaPrimaryText}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right — hero photo */}
        <div className="relative h-72 sm:h-[26rem] lg:h-auto">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
          {/* Soft blend into the left panel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-stone-950 to-transparent lg:block xl:w-40" />

          {/* Floating rating card */}
          <div className="absolute bottom-5 right-4 z-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-stone-950/60 px-4 py-3 shadow-xl backdrop-blur-md sm:right-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-400/20 text-base text-sage-300">
              ★
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-bold text-white">{content.ratingValue}</p>
              <p className="text-[11px] text-stone-300">{content.ratingCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "popular cruises" preview card — overlaps the hero's bottom edge */}
      {previewTours.length > 0 && (
        <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-4 pb-6 sm:px-6 sm:pb-8 lg:-mt-14">
          <div className="rounded-3xl border border-stone-200/60 bg-white p-5 shadow-2xl shadow-black/20 sm:p-7">
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

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {previewTours.map((tour) => (
                <a
                  key={tour.id}
                  href={tour.href}
                  target="_blank"
                  rel="noopener nofollow sponsored"
                  className="group overflow-hidden rounded-2xl border border-stone-200/70 transition hover:border-forest-400/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <SafeImage
                      src={tour.image}
                      alt={tour.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {tour.ribbon && (
                      <span className="absolute left-2 top-2 rounded-md bg-stone-950/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {tour.ribbon}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-bold text-stone-900">{tour.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      {tour.duration ? (
                        <span className="flex min-w-0 items-center gap-1 text-[11px] font-medium text-stone-500">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 shrink-0">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 3" />
                          </svg>
                          <span className="truncate">{tour.duration}</span>
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-800 text-xs text-white transition group-hover:bg-forest-700">
                        →
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-stone-500">
                      From <span className="font-bold text-stone-900">€{tour.price}</span>
                    </p>
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
