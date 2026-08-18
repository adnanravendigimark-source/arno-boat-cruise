import { getHomepageContent } from "@/lib/homepage";

export default async function PracticalInfo() {
  const { sections } = await getHomepageContent();
  const s = sections.practical;

  return (
    <section className="bg-stone-50 py-20 border-y border-stone-200/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canal-blue/10 text-canal-blue font-bold text-lg mb-4">
            ⏱
          </div>
          <h3 className="font-display text-xl font-bold text-stone-900">{s.hoursHeading}</h3>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {s.hours.map((row, i) => (
                <tr key={row.range + i} className="border-b border-stone-100">
                  <td className="py-2.5 text-stone-600">{row.range}</td>
                  <td className="py-2.5 text-right font-semibold text-stone-900">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-stone-400">{s.hoursNote}</p>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canal-orange/10 text-canal-orange font-bold text-lg mb-4">
            📍
          </div>
          <h3 className="font-display text-xl font-bold text-stone-900">{s.addressHeading}</h3>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600">{s.address}</p>
          <p className="mt-3 text-xs font-medium text-canal-blue">{s.metro}</p>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-600 font-bold text-lg mb-4">
            💡
          </div>
          <h3 className="font-display text-xl font-bold text-stone-900">{s.bestTimeHeading}</h3>
          <div
            className="rich-content mt-4 text-sm text-stone-600"
            dangerouslySetInnerHTML={{ __html: s.bestTimeBody }}
          />
        </div>
      </div>
    </section>
  );
}
