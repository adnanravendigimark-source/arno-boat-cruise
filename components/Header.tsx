import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { getSiteChrome } from "@/lib/homepage";

export default async function Header() {
  const { header } = await getSiteChrome();
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo src={header.logoImage} alt={header.logoAlt} line1={header.logoLine1} line2={header.logoLine2} />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-stone-700 md:flex">
          {header.navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="relative py-1 hover:text-forest-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-forest-600 after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={header.ctaHref}
            className="hidden rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-forest-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-forest-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-forest-600/30 hover:scale-[1.02] md:inline-flex"
          >
            {header.ctaText}
          </Link>
          <MobileNav navLinks={header.navLinks} ctaText={header.ctaText} ctaHref={header.ctaHref} />
        </div>
      </div>
    </header>
  );
}
