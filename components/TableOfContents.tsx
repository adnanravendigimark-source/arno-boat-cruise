import type { TocItem } from "@/lib/tableOfContents";

export default function TableOfContents({
  items,
  label = "In This Guide",
}: {
  items: TocItem[];
  label?: string;
}) {
  const sections = items.filter((item) => item.level === 2);
  if (sections.length < 2) return null;

  return (
    <div className="mt-8 rounded-2xl border border-sky-200/80 bg-sky-50/50 p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-canal-blue">{label}</p>
      <ul className="mt-3.5 space-y-2.5 text-sm">
        {sections.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2 font-medium text-stone-700 transition hover:text-canal-orange hover:translate-x-0.5"
            >
              <span aria-hidden="true" className="text-canal-blue font-bold">
                ›
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
