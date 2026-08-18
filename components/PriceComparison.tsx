import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";

export default async function PriceComparison() {
  const [tours, { sections }] = await Promise.all([getTours(), getHomepageContent()]);
  const s = sections.price;
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-forest-600">
          {s.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">{s.heading}</h2>
        <div
          className="rich-content mt-3 text-base text-stone-600"
          dangerouslySetInnerHTML={{ __html: s.subheading }}
        />
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-stone-900 text-white">
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.itemLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.priceLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.column1Label}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.column2Label}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.bestForLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {tours.map((tour, i) => (
              <tr
                key={tour.id}
                className={`transition hover:bg-forest-50/40 ${
                  tour.ribbon === "Bestseller" ? "bg-forest-50/60 font-medium" : i % 2 ? "bg-stone-50/60" : ""
                }`}
              >
                <td className="px-6 py-4 font-semibold text-stone-900">{tour.title}</td>
                <td className="px-6 py-4 font-bold text-forest-600">
                  €{tour.price} <span className="font-normal text-xs text-stone-400">/ person</span>
                </td>
                <td className="px-6 py-4 text-stone-600">{tour.priceTableColumn1 || tour.duration}</td>
                <td className="px-6 py-4 text-stone-600">{tour.priceTableFeature || "Standard"}</td>
                <td className="px-6 py-4 text-stone-600">{tour.bestFor}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={tour.href}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="inline-flex rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:scale-[1.02]"
                  >
                    {s.bookLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3.5 text-xs text-stone-400">{s.note}</p>
    </section>
  );
}
