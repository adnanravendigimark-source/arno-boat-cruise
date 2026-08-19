import Image from "next/image";
import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";

export default async function Hero() {
  const content = await getHomepageContent();
  const gallery = content.heroGallery;
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden bg-stone-900 text-white"
    >
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
            quality={68}
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/40" />
        <div className="absolute inset-0 bg-mosaic mix-blend-soft-light" aria-hidden="true" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-sage-400/30 bg-sage-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sage-200 backdrop-blur-md shadow-sm">
          <span className="h-2 w-2 rounded-full bg-sage-400 animate-pulse" />
          {content.heroBadge}
        </div>

        <h1 className="mt-5 max-w-3xl font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight drop-shadow-sm">
          {content.heroHeading}
        </h1>
        <div
          className="rich-content rich-content-invert mt-4 max-w-2xl text-base text-stone-200 drop-shadow-sm sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.heroSubheading }}
        />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={content.heroCtaPrimaryHref}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-forest-950/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-forest-600/40"
          >
            {content.heroCtaPrimaryText}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={content.heroCtaSecondaryHref}
            className="rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            {content.heroCtaSecondaryText}
          </a>

          <div className="ml-auto flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md shadow-lg shadow-black/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-400/20 text-xl text-sage-300">
              ★
            </div>
            <div className="text-left leading-tight">
              <p className="text-base font-bold text-white">{content.ratingValue}</p>
              <p className="text-xs text-stone-300">{content.ratingCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {gallery.map((img, i) => (
            <div
              key={img.label + i}
              className="group relative h-24 overflow-hidden rounded-2xl border border-white/15 shadow-xl shadow-black/20 sm:h-28 lg:h-32 transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-xs font-bold text-white drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
