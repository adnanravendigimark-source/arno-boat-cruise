import Image from "next/image";
import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

// Modern/premium hero for Arno — full-bleed cinematic background, content
// anchored to the lower third (editorial poster feel), a slow vertical
// filmstrip of the gallery along the right edge on large screens, and a
// glass rating card floating over the image. All copy still comes from the
// same admin-editable homepage fields — only the composition changed.
export default async function Hero() {
  const content = await getHomepageContent();
  const gallery = content.heroGallery;
  const marqueeImages = gallery.length ? [...gallery, ...gallery] : [];

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-forest-950 text-white"
    >
      <style>{`
        @keyframes arnoHeroMarquee {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>

      {/* Background media */}
      <div className="absolute inset-0">
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
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/40" />
        <div className="absolute inset-0 bg-mosaic mix-blend-soft-light" aria-hidden="true" />
      </div>

      {/* Slow vertical filmstrip — right edge, large screens only */}
      {marqueeImages.length > 0 && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 overflow-hidden lg:block xl:w-40">
          <div
            className="absolute inset-x-0 top-0 flex flex-col gap-3 px-3"
            style={{ animation: "arnoHeroMarquee 38s linear infinite" }}
          >
            {marqueeImages.map((img, i) => (
              <div key={img.label + i} className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/40">
                <Image src={img.src} alt={img.alt} fill sizes="160px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-transparent to-forest-950" />
          <div className="absolute inset-0 bg-forest-950/25" />
        </div>
      )}

      {/* Content — anchored to the lower third */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6 sm:pb-16 lg:pr-40 lg:pb-20 xl:pr-52">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-sage-200">
          <span className="h-px w-9 bg-sage-400/70" aria-hidden="true" />
          {content.heroBadge}
        </div>

        <h1 className="mt-6 max-w-2xl font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
          {content.heroHeading}
        </h1>
        <div
          className="rich-content rich-content-invert mt-6 max-w-lg text-base text-stone-300 sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.heroSubheading }}
        />

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={content.heroCtaPrimaryHref}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-forest-950/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-forest-600/40"
          >
            {content.heroCtaPrimaryText}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={content.heroCtaSecondaryHref}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-white/90 underline decoration-white/30 decoration-2 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            {content.heroCtaSecondaryText}
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        {/* Compact photo cluster — replaces the filmstrip below lg */}
        {gallery.length > 0 && (
          <div className="mt-10 flex items-center gap-3 lg:hidden">
            <div className="flex -space-x-3">
              {gallery.slice(0, 4).map((img, i) => (
                <div
                  key={img.label + i}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-forest-950 shadow-md sm:h-14 sm:w-14"
                  style={{ zIndex: 4 - i }}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="56px" className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-stone-300">Moments along the Arno</p>
          </div>
        )}
      </div>

      {/* Floating glass rating card */}
      <div className="absolute bottom-8 right-4 z-10 hidden items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex lg:right-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-400/20 text-xl text-sage-300">
          ★
        </div>
        <div className="text-left leading-tight">
          <p className="text-base font-bold text-white">{content.ratingValue}</p>
          <p className="text-xs text-stone-300">{content.ratingCount}</p>
        </div>
      </div>
    </section>
  );
}
