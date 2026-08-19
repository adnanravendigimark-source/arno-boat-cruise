import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getAboutPage } from "@/lib/about";
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
        <section className="relative overflow-hidden bg-stone-900 text-white">
          <div className="absolute inset-0">
            <SafeImage
              src={about.heroImage}
              alt={about.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-xs font-medium text-stone-200/70">
              <ol className="flex items-center justify-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-stone-200/40">&gt;</li>
                <li className="font-semibold text-white" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>
            <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-sage-200">
              {about.heroEyebrow}
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {about.heroHeading}
            </h1>
            <div
              className="rich-content rich-content-invert mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-200/90 sm:text-base"
              dangerouslySetInnerHTML={{ __html: about.heroSubheading }}
            />
          </div>
        </section>

        {/* Page content */}
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="rich-content leading-relaxed text-stone-600" dangerouslySetInnerHTML={{ __html: about.content }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
