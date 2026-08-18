import Link from "next/link";
import Logo from "./Logo";
import { getSiteChrome } from "@/lib/homepage";

export default async function Footer() {
  const { header, footer } = await getSiteChrome();
  return (
    <footer className="border-t border-stone-800 bg-canal-navy text-stone-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="stacked" theme="dark" line1={header.logoLine1} line2={header.logoLine2} />
            <div
              className="mt-5 max-w-sm text-sm leading-relaxed text-stone-300 rich-content rich-content-invert"
              dangerouslySetInnerHTML={{ __html: footer.tagline }}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-stone-300">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="hover:text-white hover:underline transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                {footer.addressHeading}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                {footer.addressLine1}
                <br />
                {footer.addressLine2}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {footer.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
