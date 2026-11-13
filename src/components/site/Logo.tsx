import { cn } from "@/lib/utils";
import { useSite } from "@/lib/site-store";

/** Built-in RAQEEB mark: petals forming a watchful eye, with a gentle pulse. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="raqeeb-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--blush)" />
          <stop offset="1" stopColor="var(--lavender-deep)" />
        </linearGradient>
      </defs>
      <g transform="translate(24 24)">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <path
            key={r}
            d="M0 0 C -6 -5, -6 -16, 0 -20 C 6 -16, 6 -5, 0 0 Z"
            transform={`rotate(${r})`}
            fill="url(#raqeeb-petal)"
            opacity={0.85}
          />
        ))}
        <circle r={6.5} fill="var(--ivory)" />
        <circle r={3.2} fill="var(--navy)" />
      </g>
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  const { img, t } = useSite();
  const src = img("logo");
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {src ? (
        <img src={src} alt={t.general.siteName} className="h-10 w-auto max-w-[160px] object-contain" />
      ) : (
        <>
          <LogoMark className="size-9 shrink-0" />
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-[0.18em] rtl:tracking-normal",
              light ? "text-ivory" : "text-navy",
            )}
          >
            {t.general.siteName}
          </span>
        </>
      )}
    </span>
  );
}
