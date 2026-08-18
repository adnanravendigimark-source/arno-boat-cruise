import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MailIcon } from "@/components/icons";
import { getContactPage } from "@/lib/contact";
import { getIconComponent } from "@/lib/iconMap";
import { resolveRobots, resolveCanonical, resolveOg } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  const og = resolveOg(
    { ogTitle: contact.ogTitle, ogDescription: contact.ogDescription, ogImage: contact.ogImage },
    { title: contact.metaTitle, description: contact.metaDescription }
  );
  return {
    title: contact.metaTitle,
    description: contact.metaDescription,
    alternates: { canonical: resolveCanonical("/contact", contact.canonicalUrl) },
    robots: resolveRobots(contact.noIndex, contact.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/contact", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-block rounded-md bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            {contact.heroEyebrow}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {contact.heroHeading}
          </h1>
          <div
            className="rich-content mx-auto mt-3 max-w-md text-slate-600"
            dangerouslySetInnerHTML={{ __html: contact.heroSubheading }}
          />
        </div>

        {/* Primary email card */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/60 via-white to-blue-50/40 p-10 text-center shadow-md">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
            <MailIcon className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{contact.emailLabel}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block break-all font-display text-2xl font-bold text-blue-600 hover:underline"
            >
              {contact.email}
            </a>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">{contact.emailNote}</p>
        </div>

        {/* What we can help with */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {contact.reasons.map(({ icon, title, body }) => {
            const Icon = getIconComponent(icon);
            return (
              <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm text-center sm:text-left">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:mx-0">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-bold text-slate-900">{title}</p>
                <div
                  className="rich-content mt-1.5 text-xs text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="rich-content mt-12 border-t border-slate-200/80 pt-8 text-center text-sm text-slate-500"
          dangerouslySetInnerHTML={{ __html: contact.footerNote }}
        />

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-canal-navy to-slate-900 p-8 text-center text-white shadow-xl">
          <p className="text-base font-bold">{contact.ctaHeading}</p>
          <a
            href="/#tours"
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
          >
            {contact.ctaButtonLabel} →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
