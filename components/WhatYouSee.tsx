import { getHomepageContent } from "@/lib/homepage";

export default async function WhatYouSee() {
  const { sections } = await getHomepageContent();
  const s = sections.why;

  return (
    <section className="bg-gradient-to-b from-stone-50 via-white to-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600">
            Renaissance River Architecture &amp; Heritage
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">{s.heading}</h2>
          <div
            className="rich-content mt-3 text-base text-stone-600"
            dangerouslySetInnerHTML={{ __html: s.intro }}
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-7 shadow-sm">
            <h3 className="font-display text-xl font-bold text-stone-900">{s.timelineHeading}</h3>
            <ol className="mt-6 space-y-6 border-l-2 border-orange-500/30 pl-6">
              {s.timeline.map((row, i) => (
                <li key={row.time + i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-orange-600 ring-4 ring-orange-100" />
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">{row.time}</span>
                  <p className="mt-1 text-sm font-semibold text-stone-700">{row.step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-7 shadow-sm">
              <h3 className="font-display text-xl font-bold text-stone-900">{s.learnHeading}</h3>
              <ul className="mt-5 space-y-3">
                {s.learn.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-orange-50/70 border border-orange-100 p-3.5 text-sm text-stone-700">
                    <span className="text-orange-600 font-bold">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-stone-400">{s.note}</p>
            </div>
          </div>
        </div>

        {s.extraItems.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-xl font-bold text-stone-900">{s.extraHeading}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {s.extraItems.map((point, i) => (
                <div key={point.name + i} className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition hover:border-orange-400/40">
                  <p className="text-sm font-bold text-orange-600">{point.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{point.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 p-8 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">{s.ctaText}</p>
            <p className="text-xs text-amber-200 mt-0.5">Flexible departure times from Piazza Mentana, Lungarno Torrigiani &amp; Ponte Vecchio docks</p>
          </div>
          <a
            href={s.ctaHref}
            className="shrink-0 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02]"
          >
            {s.ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  );
}
