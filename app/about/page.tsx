import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAboutPage } from "@/lib/about";
import { getIconComponent } from "@/lib/iconMap";
import { resolveRobots, resolveCanonical, resolveOg } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const og = resolveOg(
    { ogTitle: about.ogTitle, ogDescription: about.ogDescription, ogImage: about.ogImage },
    { title: about.metaTitle, description: about.metaDescription, image: about.heroImage }
  );
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: { canonical: resolveCanonical("/about", about.canonicalUrl) },
    robots: resolveRobots(about.noIndex, about.noFollow),
    openGraph: {
      title: og.title,
      description: og.description,
      url: "/about",
      images: og.image ? [{ url: og.image, alt: about.heroImageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="relative overflow-hidden bg-canal-navy text-white">
          <div className="absolute inset-0">
            <Image
              src={about.heroImage}
              alt={about.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canal-navy via-canal-navy/80 to-canal-navy/40" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <span className="inline-block rounded-full bg-sky-500/20 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-sky-200 backdrop-blur-md">
              {about.heroEyebrow}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {about.heroHeading}
            </h1>
            <div
              className="rich-content rich-content-invert mt-5 text-slate-200 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about.heroSubheading }}
            />
          </div>
        </section>

        {/* What we do — text + image */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Mission</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">{about.introHeading}</h2>
            <div className="rich-content mt-4 text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: about.introParagraph1 }} />
            <div className="rich-content mt-4 text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: about.introParagraph2 }} />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-slate-200">
            <Image
              src={about.introImage}
              alt={about.introImageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Why us — icon cards */}
        <section className="bg-slate-50 py-20 border-y border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Why Book With Us</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">{about.reasonsHeading}</h2>
              <div
                className="rich-content mt-3 text-slate-600"
                dangerouslySetInnerHTML={{ __html: about.reasonsSubheading }}
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {about.reasons.map(({ icon, title, body }) => {
                const Icon = getIconComponent(icon);
                return (
                  <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-400/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-base font-bold text-slate-900">{title}</p>
                    <div
                      className="rich-content mt-2 text-xs leading-relaxed text-slate-600"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Disclosure + CTA */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900">{about.disclosureHeading}</h2>
          <div
            className="rich-content mt-4 text-sm leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: about.disclosureBody }}
          />

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-r from-canal-navy to-slate-900 p-8 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-bold">{about.ctaText}</p>
              <p className="text-xs text-sky-200 mt-0.5">Instant confirmation &amp; mobile tickets</p>
            </div>
            <a
              href="/#tours"
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
            >
              {about.ctaButtonLabel} →
            </a>
          </div>

          <div
            className="rich-content mt-8 text-sm text-slate-500 [&_a]:font-bold [&_a]:text-blue-600 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: about.contactPromptHtml }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
