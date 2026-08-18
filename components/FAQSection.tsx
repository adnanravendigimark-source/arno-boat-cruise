import { getFaqs } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";

export default async function FAQSection() {
  const [faqs, { sections }] = await Promise.all([getFaqs(), getHomepageContent()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600">
          {sections.faq.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
          {sections.faq.heading}
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.question}
            className="group rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-200 open:border-orange-500/40 open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-stone-900">
              <span className="text-base">{f.question}</span>
              <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition group-open:rotate-45 group-open:bg-orange-600 group-open:text-white">
                +
              </span>
            </summary>
            <div
              className="rich-content mt-4 text-sm leading-relaxed text-stone-600 border-t border-stone-100 pt-4"
              dangerouslySetInnerHTML={{ __html: f.answer }}
            />
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
