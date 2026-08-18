import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageContent } from "@/lib/homepage";

// Copy editable from /admin/homepage → Content tab (see lib/homepage.ts's
// NotFoundSection / DEFAULT_SECTIONS.notFound).
export default async function NotFound() {
  const { sections } = await getHomepageContent();
  const s = sections.notFound;

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="font-display text-7xl font-black text-blue-600">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          {s.heading}
        </h1>
        <p className="mt-3 max-w-md text-slate-600">{s.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={s.primaryButtonHref}
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
          >
            {s.primaryButtonText}
          </Link>
          <Link
            href={s.secondaryButtonHref}
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            {s.secondaryButtonText}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
