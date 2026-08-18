import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";

export const dynamic = "force-dynamic";

const displayFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const DEFAULT_OG_IMAGE = "/images/gallery/barchetto-cruise.jpg";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arno Boat Cruise",
  url: SITE_URL,
  description:
    "Independent Florence river cruise guide comparing traditional wooden barchetto tours, sunset wine aperitivo cruises, and skip-the-line museum tickets from licensed Italian operators.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Arno Boat Cruise",
  url: SITE_URL,
};

export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Arno Boat Cruise Florence — River Cruise Tickets & Tours (2026)",
      template: "%s | Arno Boat Cruise Florence",
    },
    description:
      "Compare top-rated Arno River boat cruises in Florence — traditional barchetto rides beneath Ponte Vecchio, sunset aperitivo cruises with Tuscan wine, and Uffizi combos. Free cancellation.",
    keywords: [
      "Arno boat cruise",
      "Arno River cruise",
      "Arno River boat tour",
      "Florence Arno River cruise",
      "Florence boat cruise",
      "Arno River cruise Florence",
      "Arno boat tour Florence",
      "boat tour Florence Italy",
      "Florence river cruise",
      "Arno River sightseeing cruise",
      "Arno River cruise tickets",
      "Arno boat cruise tickets",
      "Arno River cruise booking",
      "Arno River cruise prices",
      "best Arno River cruise",
      "romantic Arno River cruise",
      "Arno River cruise at sunset",
      "Arno River cruise with drinks",
      "Things to do in Florence Italy",
      "best views of Florence from the Arno River",
      "Ponte Vecchio boat cruise",
      "barchetto boat tour Florence",
      "Florence gondola-style boat tour",
      "Uffizi Gallery boat tour combo",
      "Florence sunset boat tour",
      "traditional Florentine boat tour",
    ],
    alternates: {
      canonical: "/",
    },
    robots,
    openGraph: {
      title: "Arno Boat Cruise Florence — River Cruise Tours & Sunset Tickets",
      description:
        "Compare traditional barchetto boat tours, romantic sunset cruises with Tuscan wine, and museum combo tickets on the Arno River in Florence.",
      type: "website",
      url: SITE_URL,
      siteName: "Arno Boat Cruise",
      images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "Arno River boat cruise in Florence past Ponte Vecchio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Arno Boat Cruise Florence — River Cruise Tours & Sunset Tickets",
      description:
        "Compare traditional barchetto boat tours, romantic sunset cruises with Tuscan wine, and museum combo tickets on the Arno River in Florence.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function buildThemeStyle(theme: { primary: string; secondary: string; dark: string; accent: string }) {
  const vars: [string, string | null][] = [
    ["--color-canal-primary", hexToRgbTriplet(theme.primary)],
    ["--color-canal-blue", hexToRgbTriplet(theme.secondary)],
    ["--color-canal-ink", hexToRgbTriplet(theme.dark)],
    ["--color-sage-400", hexToRgbTriplet(theme.accent)],
  ];
  const declarations = vars
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return declarations ? `:root{${declarations}}` : "";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = await getSiteChrome();
  const themeStyle = buildThemeStyle(theme);

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SYMDM65LVH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SYMDM65LVH');
          `}
        </Script>
      </head>
      <body className="font-body bg-stone-50 text-stone-900 antialiased selection:bg-forest-600 selection:text-white">
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
