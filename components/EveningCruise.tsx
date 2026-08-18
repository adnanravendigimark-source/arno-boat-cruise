import Image from "next/image";
import { getHomepageContent } from "@/lib/homepage";

export default async function EveningCruise() {
  const { sections } = await getHomepageContent();
  const s = sections.tower;

  return (
    <section id="night-cruise" className="bg-stone-100/70 py-20 border-t border-b border-stone-200/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            <span>✨</span> {s.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">{s.heading}</h2>
          <div
            className="rich-content mt-4 text-base text-stone-600"
            dangerouslySetInnerHTML={{ __html: s.body }}
          />
          <ul className="mt-6 space-y-3.5 text-sm font-medium text-stone-700">
            {s.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <a
            href={s.ctaHref}
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-600/25 transition hover:scale-[1.02] hover:shadow-orange-600/40"
          >
            {s.ctaButtonText}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {s.images.map((img, i) => (
            <div
              key={img.label + i}
              className="group relative h-36 overflow-hidden rounded-2xl border border-stone-200/80 shadow-md sm:h-44"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
