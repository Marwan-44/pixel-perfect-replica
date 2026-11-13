import {
  BrainCircuit,
  CalendarClock,
  Check,
  ClipboardList,
  FileStack,
  Gauge,
  HeartPulse,
  LayoutDashboard,
  Quote,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TriangleAlert,
  UserPlus,
  Activity,
  Bell,
  Database,
  HandHeart,
  Sparkles,
  Eye,
} from "lucide-react";

import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";
import { FloralSprig, LeafBranch, OrganicBlob, PetalBloom } from "./floral";
import { Reveal, SectionHeading, SlotImage } from "./primitives";

/* ---------------- About ---------------- */
export function About() {
  const { t, img } = useSite();
  const a = t.about;
  const icons = [CalendarClock, ClipboardList, HandHeart];
  return (
    <section id="about" className="relative overflow-hidden section-pad bg-petal/60">
      <PetalBloom className="pointer-events-none absolute -start-32 top-10 size-[420px] text-rose/25" />
      <LeafBranch className="pointer-events-none absolute -end-10 bottom-8 w-[420px] text-lavender-deep/25 flip-rtl" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <OrganicBlob className="absolute -inset-8 text-lavender/70" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-card shadow-bloom">
            <SlotImage src={img("aboutIllustration")} alt={a.quote} className="aspect-[8/9]" />
          </div>
          <FloralSprig className="absolute -bottom-10 -end-6 h-48 text-rose-deep/40" />
        </Reveal>
        <div>
          <SectionHeading eyebrow={a.eyebrow} title={a.title} align="start" />
          <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{a.paragraph1}</p>
            <p>{a.paragraph2}</p>
          </Reveal>
          <Reveal delay={200} className="relative mt-10 rounded-3xl bg-card/80 p-7 shadow-soft">
            <Quote className="absolute -top-4 start-6 size-9 rounded-full bg-rose-gradient p-2 text-navy flip-rtl" />
            <p className="font-display text-2xl italic leading-snug text-navy rtl:not-italic">“{a.quote}”</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {a.highlights.map((hl, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={i} delay={250 + i * 80} className="rounded-2xl border border-border/80 bg-card/60 p-4">
                  <Icon className="size-5 text-rose-deep" />
                  <p className="mt-3 font-semibold text-navy">{hl.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{hl.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Problem ---------------- */
export function Problem() {
  const { t } = useSite();
  const p = t.problem;
  const icons = [TriangleAlert, Activity, CalendarClock, Gauge, FileStack];
  return (
    <section id="problem" className="relative section-pad">
      <div className="container-site">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {p.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={i}
                delay={i * 70}
                className={cn(
                  "group card-soft relative overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1",
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                )}
              >
                <span className="absolute -end-6 -top-6 size-24 rounded-full bg-petal transition-transform duration-500 group-hover:scale-125" />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-navy text-ivory">
                  <Icon className="size-5" />
                </span>
                <span className="absolute end-7 top-8 font-display text-sm text-rose-deep">0{i + 1}</span>
                <h3 className="relative mt-6 text-2xl font-medium text-navy">{item.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Solution ---------------- */
export function Solution() {
  const { t } = useSite();
  const s = t.solution;
  const icons = [Smartphone, LayoutDashboard, BrainCircuit];
  const tones = ["bg-petal", "bg-powder", "bg-lavender"];
  return (
    <section id="solution" className="relative overflow-hidden section-pad bg-card">
      <PetalBloom className="pointer-events-none absolute -end-28 top-24 size-[360px] text-rose/20" />
      <div className="container-site relative">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {s.components.map((c, i) => {
            const Icon = icons[i % icons.length];
            const featured = i === 2;
            return (
              <Reveal
                key={i}
                delay={i * 100}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-[2rem] p-8",
                  featured ? "bg-navy-gradient text-ivory shadow-device" : "border border-border bg-ivory shadow-soft",
                )}
              >
                {featured ? <PetalBloom className="pointer-events-none absolute -bottom-16 -end-16 size-56 text-blush/25" /> : null}
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-2xl",
                    featured ? "bg-rose-gradient text-navy" : cn(tones[i], "text-navy"),
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <p className={cn("mt-7 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal", featured ? "text-blush" : "text-rose-deep")}>
                  {c.subtitle}
                </p>
                <h3 className={cn("mt-2 text-3xl font-medium", featured ? "text-ivory" : "text-navy")}>{c.title}</h3>
                <ul className="relative mt-6 space-y-3">
                  {c.points.map((pt, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                          featured ? "bg-blush/25 text-blush" : "bg-petal text-rose-deep",
                        )}
                      >
                        <Check className="size-3" />
                      </span>
                      <span className={cn("leading-relaxed", featured ? "text-ivory/85" : "text-muted-foreground")}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-rose/50 bg-petal/70 p-5">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-rose-deep" />
          <p className="font-medium leading-relaxed text-navy">{s.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
export function HowItWorks() {
  const { t } = useSite();
  const h = t.howItWorks;
  const icons = [UserPlus, Eye, ClipboardList, BrainCircuit, Stethoscope, RefreshCw];
  return (
    <section id="how-it-works" className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 bg-bloom opacity-50" />
      <div className="container-site relative">
        <SectionHeading eyebrow={h.eyebrow} title={h.title} intro={h.intro} />
        <ol className="relative mx-auto mt-16 max-w-5xl">
          <span className="absolute inset-y-4 start-7 w-px bg-gradient-to-b from-rose via-lavender-deep/50 to-rose md:start-1/2" />
          {h.steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            const right = i % 2 === 1;
            return (
              <li key={i} className="relative grid gap-4 pb-10 last:pb-0 md:grid-cols-2 md:gap-16">
                <span className="absolute start-7 top-3 z-10 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-ivory bg-rose-gradient text-navy shadow-bloom md:start-1/2 rtl:translate-x-1/2">
                  <Icon className="size-5" />
                </span>
                <Reveal
                  delay={i * 60}
                  className={cn(
                    "ms-20 card-soft p-6 md:ms-0",
                    right ? "md:col-start-2" : "md:col-start-1 md:text-end",
                  )}
                >
                  <span className="font-display text-4xl text-gradient-rose">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-2xl font-medium text-navy">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
export function Features() {
  const { t } = useSite();
  const f = t.features;
  const icons = [Gauge, Stethoscope, HeartPulse, Activity, LayoutDashboard, Bell, Database, RefreshCw];
  const tones = ["bg-petal", "bg-lavender", "bg-powder"];
  return (
    <section id="features" className="relative section-pad bg-card">
      <div className="container-site">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} intro={f.intro} />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {f.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                key={i}
                delay={(i % 4) * 70}
                className="group rounded-3xl border border-border bg-ivory p-6 transition-all duration-500 hover:-translate-y-1 hover:border-rose/60 hover:shadow-bloom"
              >
                <span className={cn("flex size-12 items-center justify-center rounded-2xl text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-ivory", tones[i % 3])}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Technology ---------------- */
export function Technology() {
  const { t } = useSite();
  const tc = t.technology;
  const icons = [Smartphone, Database, BrainCircuit, HeartPulse];
  const archIcons = [Smartphone, Database, Sparkles, LayoutDashboard];
  return (
    <section id="technology" className="relative overflow-hidden section-pad">
      <FloralSprig className="pointer-events-none absolute -end-4 top-16 hidden h-80 text-lavender-deep/25 lg:block" />
      <div className="container-site relative">
        <SectionHeading eyebrow={tc.eyebrow} title={tc.title} intro={tc.intro} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tc.categories.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={i} delay={i * 70} className="card-soft p-6">
                <Icon className="size-6 text-rose-deep" />
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground rtl:tracking-normal">{c.title}</p>
                <p className="mt-2 font-display text-2xl text-navy">{c.value}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-[2rem] bg-navy-gradient p-8 text-ivory shadow-device md:p-12">
          <h3 className="text-center text-2xl font-medium text-ivory">{tc.architectureTitle}</h3>
          <div className="mt-10 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            {tc.architecture.map((node, i) => {
              const Icon = archIcons[i % archIcons.length];
              return (
                <div key={i} className="contents">
                  <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-ivory/15 bg-ivory/5 p-5 text-center backdrop-blur">
                    <span className="flex size-12 items-center justify-center rounded-full bg-rose-gradient text-navy">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-semibold">{node}</span>
                  </div>
                  {i < tc.architecture.length - 1 ? (
                    <span className="mx-auto flex items-center text-blush md:mx-0">
                      <span className="h-6 w-px bg-blush/60 md:h-px md:w-8" />
                      <span className="hidden md:inline rtl:rotate-180">›</span>
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-ivory/65">{tc.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
