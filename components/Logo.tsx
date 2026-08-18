import Link from "next/link";
import Image from "next/image";

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

  // Custom Florentine Barchetto SVG emblem
  const BarchettoIcon = ({ size = "w-9 h-9" }: { size?: string }) => (
    <div className={`relative ${size} flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 p-1.5 shadow-md shadow-orange-950/20`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-white"
      >
        {/* River Waves */}
        <path
          d="M6 36C12 34 16 38 22 36C28 34 32 38 42 35"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
        <path
          d="M8 41C14 39 18 43 24 41C30 39 34 43 40 41"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        {/* Florentine Barchetto Hull */}
        <path
          d="M9 29C13 32 35 32 39 29L42 23H6L9 29Z"
          fill="currentColor"
        />
        {/* Gondolier / Renaiolo Pole */}
        <path
          d="M31 10L17 31"
          stroke="#fef08a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Canopy / Renaissance Arch silhouette */}
        <path
          d="M17 23C17 17 29 17 29 23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Tuscan Sun / Ponte Vecchio spark */}
        <circle cx="34" cy="14" r="3.5" fill="#fde047" />
      </svg>
    </div>
  );

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <div className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105">
          {customSrc ? (
            <span className="relative block h-20 w-[240px]">
              <Image
                src={customSrc}
                alt={alt}
                fill
                sizes="240px"
                className="object-contain"
                priority
              />
            </span>
          ) : (
            <BarchettoIcon size="w-16 h-16 sm:w-20 sm:h-20" />
          )}
        </div>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-2xl font-black tracking-[-0.02em] uppercase ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            {line1}
          </span>
          <span className="block font-display text-xs font-extrabold uppercase tracking-[0.32em] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 bg-clip-text text-transparent">
            {line2}
          </span>
          <span className="block text-[10px] font-medium tracking-[0.25em] uppercase text-stone-400 mt-0.5">
            Florence, Italy
          </span>
        </div>
      </Link>
    );
  }

  const emblem = (
    <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
      {customSrc ? (
        <span className="relative block h-9 w-[120px] overflow-hidden">
          <Image
            src={customSrc}
            alt={alt}
            fill
            priority
            sizes="120px"
            className="object-contain"
          />
        </span>
      ) : (
        <BarchettoIcon size="w-10 h-10" />
      )}
    </div>
  );

  const wordmark = (
    <div className="flex flex-col leading-[1.1]">
      <div className="flex items-center gap-1.5">
        <span
          className={`block whitespace-nowrap font-display text-[1.22rem] font-black tracking-[-0.02em] uppercase ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          {line1}
        </span>
        <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600">
          Firenze
        </span>
      </div>
      <span className="block whitespace-nowrap font-display text-[10.5px] font-extrabold uppercase tracking-[0.26em] bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
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
