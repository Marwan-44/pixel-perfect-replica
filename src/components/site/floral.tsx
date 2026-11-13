import type { SVGProps } from "react";

/** Lightweight line-art botanicals. Color via currentColor (use text-* tokens). */

export function FloralSprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 320" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" aria-hidden {...props}>
      <path d="M100 318 C 96 250, 112 200, 98 140 S 104 70, 100 40" />
      <path d="M99 250 C 70 240, 52 214, 46 186 C 76 192, 94 214, 99 250 Z" />
      <path d="M101 205 C 130 196, 150 172, 156 144 C 126 150, 106 172, 101 205 Z" />
      <path d="M98 160 C 76 150, 64 130, 62 108 C 84 116, 96 136, 98 160 Z" />
      <path d="M99 246 L 62 196 M101 201 L 142 154 M98 156 L 70 116" opacity={0.6} />
      <g transform="translate(100 40)">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M0 0 C -12 -10, -12 -30, 0 -36 C 12 -30, 12 -10, 0 0 Z" transform={`rotate(${r})`} />
        ))}
        <circle r={4} />
      </g>
      <g transform="translate(150 110) scale(0.5)">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M0 0 C -12 -10, -12 -30, 0 -36 C 12 -30, 12 -10, 0 0 Z" transform={`rotate(${r})`} />
        ))}
      </g>
      <path d="M150 128 C 140 150, 120 170, 104 178" />
    </svg>
  );
}

export function PetalBloom(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-60 -60 120 120" fill="none" stroke="currentColor" strokeWidth={0.9} aria-hidden {...props}>
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d="M0 0 C -14 -16, -12 -44, 0 -54 C 12 -44, 14 -16, 0 0 Z" transform={`rotate(${i * 36})`} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <path key={`i${i}`} d="M0 0 C -7 -9, -6 -24, 0 -30 C 6 -24, 7 -9, 0 0 Z" transform={`rotate(${i * 36 + 18})`} />
      ))}
      <circle r={5} />
    </svg>
  );
}

export function LeafBranch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 120" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 100 C 80 80, 180 70, 316 20" />
      {[40, 90, 140, 190, 240, 285].map((x, i) => {
        const y = 100 - (x / 316) * 75;
        const up = i % 2 === 0;
        return (
          <path
            key={x}
            d={up ? `M${x} ${y} C ${x - 4} ${y - 26}, ${x + 18} ${y - 38}, ${x + 30} ${y - 34} C ${x + 26} ${y - 18}, ${x + 12} ${y - 4}, ${x} ${y} Z` : `M${x} ${y} C ${x + 6} ${y + 20}, ${x + 26} ${y + 24}, ${x + 36} ${y + 14} C ${x + 28} ${y + 2}, ${x + 14} ${y - 2}, ${x} ${y} Z`}
          />
        );
      })}
    </svg>
  );
}

/** Soft organic blob used behind content. */
export function OrganicBlob(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M310 70c45 38 70 104 56 164s-62 112-124 128-132-6-168-56S30 186 56 128 140 30 200 26s65 6 110 44z"
      />
    </svg>
  );
}

/** Gentle wave used between sections. */
export function SectionCurve({ flip, ...props }: SVGProps<SVGSVGElement> & { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden {...props} style={{ transform: flip ? "scaleY(-1)" : undefined, ...props.style }}>
      <path fill="currentColor" d="M0 40 C 240 90, 480 0, 720 30 S 1200 80, 1440 30 V80 H0 Z" />
    </svg>
  );
}
