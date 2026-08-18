export default function QuickAnswer({
  children,
  label = "Quick Answer",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div id="quick-answer" className="mt-6 flex scroll-mt-24 gap-3.5 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 p-6 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-lg">
        💡
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-stone-700">{children}</p>
      </div>
    </div>
  );
}
