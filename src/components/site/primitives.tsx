import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Fades content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-start", className)}>
      <span className="eyebrow">
        <span className="h-px w-8 bg-line-gradient" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-medium leading-[1.08] text-navy text-balance md:text-5xl">{title}</h2>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{intro}</p> : null}
    </Reveal>
  );
}

/** Image that falls back to an elegant placeholder when missing or failing to load. */
export function SlotImage({
  src,
  alt,
  className,
  placeholder,
  loading = "lazy",
  fit = "cover",
  natural = false,
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: ReactNode;
  loading?: "lazy" | "eager";
  fit?: "cover" | "contain";
  /** Show the whole image at its own proportions (no cropping). */
  natural?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) {
    return (
      <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2 bg-petal-gradient text-center", natural && "aspect-[9/19.5]", className)}>
        {placeholder ?? <ImageIcon className="size-6 text-rose-deep/60" />}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(natural ? "block h-auto w-full" : "h-full w-full", fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
