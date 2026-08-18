import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/Logo.png";

export default function Logo({
  className = "",
  variant = "compact",
  theme = "light",
  src = "",
  alt = "Arno Boat Cruise Florence",
  line1 = "Arno",
  line2 = "Boat Cruise",
}: {
  className?: string;
  variant?: "compact" | "stacked";
  theme?: "light" | "dark";
  src?: string;
  alt?: string;
  line1?: string;
  line2?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = src?.trim();

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-3 ${className}`}>
        {/* Sized to the bridge-and-boat artwork's actual ~1.34:1 aspect
            ratio so it fills its box edge-to-edge instead of leaving empty
            pillarbox space on either side. */}
        <span className="relative block h-20 w-[107px] sm:h-24 sm:w-[129px] transition-transform duration-300 hover:scale-105">
          <Image
            src={customSrc || logoImg}
            alt={alt}
            fill
            sizes="129px"
            className="object-contain"
            priority
          />
        </span>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-3xl font-black tracking-[-0.02em] uppercase ${
              isDark ? "text-white" : "text-forest-800"
            }`}
          >
            {line1}
          </span>
          <span className="block font-display text-sm font-extrabold uppercase tracking-[0.32em] bg-gradient-to-r from-forest-600 via-sage-500 to-forest-800 bg-clip-text text-transparent">
            {line2}
          </span>
          <span className="block text-xs font-medium tracking-[0.25em] uppercase text-stone-400 mt-0.5">
            Florence, Italy
          </span>
        </div>
      </Link>
    );
  }

  const emblem = (
    <span className="relative block h-11 w-[59px] sm:h-12 sm:w-[64px] shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
      <Image
        src={customSrc || logoImg}
        alt={alt}
        fill
        priority
        sizes="64px"
        className="object-contain"
      />
    </span>
  );

  const wordmark = (
    <div className="flex flex-col leading-[1.1]">
      <div className="flex items-center gap-2">
        <span
          className={`block whitespace-nowrap font-display text-[1.55rem] font-black tracking-[-0.02em] uppercase ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          {line1}
        </span>
      </div>
      <span className="block whitespace-nowrap font-display text-[13px] font-extrabold uppercase tracking-[0.26em] bg-gradient-to-r from-forest-600 via-sage-500 to-forest-800 bg-clip-text text-transparent">
        {line2}
      </span>
    </div>
  );

  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      {emblem}
      {wordmark}
    </Link>
  );
}
