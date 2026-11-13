import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CirclePlay, Github, GraduationCap, Linkedin, Mail, Pencil, ZoomIn, type LucideIcon } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./devices";
import { FloralSprig, LeafBranch, OrganicBlob, PetalBloom } from "./floral";
import { Logo } from "./Logo";
import { Reveal, SectionHeading, SlotImage } from "./primitives";

function ComingSoon({ text }: { text: string }) {
  return (
    <span className="flex flex-col items-center gap-3 px-4 text-center">
      <PetalBloom className="size-14 text-rose-deep/50" />
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/60 rtl:tracking-normal">{text}</span>
    </span>
  );
}

/* ---------------- App showcase ---------------- */
export function AppShowcase() {
  const { t, img } = useSite();
  const a = t.appShowcase;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="app" className="relative overflow-hidden section-pad bg-lavender/40">
      <FloralSprig className="pointer-events-none absolute -start-8 bottom-10 hidden h-96 text-rose/50 lg:block" />
      <div className="container-site relative">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
        <p className="mt-4 text-center text-sm text-muted-foreground">{a.previewHint}</p>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-10">
          {a.screens.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className={cn("flex flex-col items-center", i % 3 === 1 && "md:translate-y-10")}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative w-full max-w-[250px] cursor-zoom-in transition-transform duration-500 hover:-translate-y-2"
                aria-label={s.title}
              >
                <PhoneFrame>
                  <SlotImage src={img(`app${i + 1}`)} alt={s.title} placeholder={<ComingSoon text={a.placeholderText} />} />
                </PhoneFrame>
                <span className="absolute end-3 top-12 flex size-9 items-center justify-center rounded-full bg-card/90 text-navy opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                  <ZoomIn className="size-4" />
                </span>
              </button>
              <h3 className="mt-6 text-center text-xl font-medium text-navy">{s.title}</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-sm border-none bg-transparent p-0 shadow-none">
          {open !== null ? (
            <>
              <DialogTitle className="sr-only">{a.screens[open].title}</DialogTitle>
              <DialogDescription className="sr-only">{a.screens[open].text}</DialogDescription>
              <PhoneFrame className="mx-auto w-full max-w-[340px]">
                <SlotImage src={img(`app${open + 1}`)} alt={a.screens[open].title} placeholder={<ComingSoon text={a.placeholderText} />} />
              </PhoneFrame>
              <p className="text-center font-display text-xl text-ivory">{a.screens[open].title}</p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------------- Doctor dashboard ---------------- */
export function DashboardShowcase() {
  const { t, img } = useSite();
  const d = t.dashboard;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <section id="dashboard" className="relative section-pad">
      <div className="container-site">
        <SectionHeading eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_300px]">
          <Reveal>
            <button type="button" className="block w-full cursor-zoom-in text-start" onClick={() => setZoom(true)} aria-label={d.screens[active].title}>
              <BrowserFrame label={d.screens[active].title}>
                <SlotImage
                  key={active}
                  src={img(`dashboard${active + 1}`)}
                  alt={d.screens[active].title}
                  fit="contain"
                  className="animate-in fade-in duration-500"
                  placeholder={<ComingSoon text={d.placeholderText} />}
                />
              </BrowserFrame>
            </button>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {d.screens.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "min-w-[220px] rounded-2xl border p-4 text-start transition-all lg:min-w-0",
                  active === i ? "border-rose bg-petal shadow-soft" : "border-border bg-card hover:border-rose/50",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn("font-display text-lg", active === i ? "text-rose-deep" : "text-muted-foreground")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-navy">{s.title}</span>
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-6xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{d.screens[active].title}</DialogTitle>
          <DialogDescription className="sr-only">{d.screens[active].text}</DialogDescription>
          <BrowserFrame label={d.screens[active].title}>
            <SlotImage src={img(`dashboard${active + 1}`)} alt={d.screens[active].title} fit="contain" placeholder={<ComingSoon text={d.placeholderText} />} />
          </BrowserFrame>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------------- Impact ---------------- */
export function Impact() {
  const { t, img } = useSite();
  const m = t.impact;
  return (
    <section id="impact" className="relative overflow-hidden section-pad bg-petal/60">
      <PetalBloom className="pointer-events-none absolute -end-24 -top-24 size-[420px] text-lavender-deep/20" />
      <LeafBranch className="pointer-events-none absolute -start-10 bottom-6 w-[400px] text-rose/40" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-md">
          <OrganicBlob className="absolute -inset-6 text-card" />
          <SlotImage src={img("impactIllustration")} alt={m.title} className="relative aspect-square rounded-[3rem]" />
        </Reveal>
        <div>
          <SectionHeading eyebrow={m.eyebrow} title={m.title} intro={m.intro} align="start" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {m.items.map((it, i) => (
              <Reveal key={i} delay={i * 60} className="flex gap-4 rounded-2xl bg-card/80 p-5 shadow-soft">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-gradient font-display text-sm text-navy">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-navy">{it.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground rtl:not-italic">{m.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Team ---------------- */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function SocialLink({ href, label, Icon, dark }: { href: string; label: string; Icon: LucideIcon; dark?: boolean }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border transition-colors",
        dark ? "border-ivory/25 text-ivory hover:bg-ivory hover:text-navy" : "border-border text-navy hover:border-navy hover:bg-navy hover:text-ivory",
      )}
    >
      <Icon className="size-4" />
    </a>
  );
}

export function Team() {
  const { t, img, content } = useSite();
  const tm = t.team;
  return (
    <section id="team" className="relative section-pad bg-card">
      <div className="container-site">
        <SectionHeading eyebrow={tm.eyebrow} title={tm.title} intro={tm.intro} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tm.members.map((m, i) => {
            const links = content.shared.teamLinks[i];
            return (
              <Reveal key={i} delay={(i % 4) * 70} className="group flex flex-col rounded-[1.75rem] border border-border bg-ivory p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-bloom">
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.4rem]">
                  <SlotImage
                    src={img(`team${i + 1}`)}
                    alt={m.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                    placeholder={
                      <span className="relative flex size-full items-center justify-center">
                        <PetalBloom className="absolute size-40 text-card" />
                        <span className="relative font-display text-4xl text-navy/70">{initials(m.name)}</span>
                      </span>
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <h3 className="text-xl font-medium text-navy">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-rose-deep">{m.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                  {links?.linkedin || links?.github ? (
                    <div className="mt-5 flex gap-2">
                      <SocialLink href={links.linkedin} label={`${m.name} LinkedIn`} Icon={Linkedin} />
                      <SocialLink href={links.github} label={`${m.name} GitHub`} Icon={Github} />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Supervisor ---------------- */
export function Supervisor() {
  const { t, img, content } = useSite();
  const s = t.supervisor;
  return (
    <section id="supervisor" className="relative pb-24 lg:pb-32">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-navy-gradient p-8 text-ivory shadow-device md:p-12">
          <PetalBloom className="pointer-events-none absolute -end-20 -top-20 size-80 text-blush/20" />
          <FloralSprig className="pointer-events-none absolute bottom-0 end-10 hidden h-64 text-blush/25 md:block" />
          <div className="relative grid items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="mx-auto w-full max-w-[260px] rounded-[2rem] bg-rose-gradient p-1.5">
              <div className="aspect-square overflow-hidden rounded-[1.7rem] bg-navy">
                <SlotImage
                  src={img("supervisor")}
                  alt={s.name}
                  placeholder={<GraduationCap className="size-16 text-navy/60" />}
                />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blush/40 bg-ivory/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blush rtl:tracking-normal">
                <GraduationCap className="size-4" />
                {s.label}
              </span>
              <h2 className="mt-5 text-4xl font-medium text-ivory md:text-5xl">{s.name}</h2>
              <p className="mt-2 text-lg font-semibold text-blush">{s.academicTitle}</p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/80">{s.bio}</p>
              {content.shared.supervisorLinks.linkedin ? (
                <div className="mt-6">
                  <SocialLink href={content.shared.supervisorLinks.linkedin} label={`${s.name} LinkedIn`} Icon={Linkedin} dark />
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact & footer ---------------- */
export function Contact({ preview }: { preview?: boolean }) {
  const { t, content } = useSite();
  const c = t.contact;
  const L = content.shared.links;
  const items: { label: string; value: string; href: string; Icon: LucideIcon }[] = [
    { label: c.emailLabel, value: L.email, href: L.email ? `mailto:${L.email}` : "", Icon: Mail },
    { label: c.linkedinLabel, value: L.linkedin, href: L.linkedin, Icon: Linkedin },
    { label: c.githubLabel, value: L.github, href: L.github, Icon: Github },
    { label: c.demoLabel, value: L.demoVideo, href: L.demoVideo, Icon: CirclePlay },
  ];
  return (
    <>
      <section id="contact" className="relative overflow-hidden section-pad">
        <div className="pointer-events-none absolute inset-0 bg-bloom opacity-70" />
        <PetalBloom className="pointer-events-none absolute -start-24 bottom-0 size-[380px] text-rose/25" />
        <div className="container-site relative">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} intro={c.description} />
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ label, value, href, Icon }, i) => {
              const inner = (
                <>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-petal text-rose-deep transition-colors group-hover:bg-navy group-hover:text-ivory">
                    <Icon className="size-5" />
                  </span>
                  <span className="mt-5 block font-semibold text-navy">{label}</span>
                  <span className="mt-1 block truncate text-sm text-muted-foreground" dir="ltr">
                    {value ? value.replace(/^https?:\/\/(www\.)?/, "") : c.notProvided}
                  </span>
                </>
              );
              return (
                <Reveal key={i} delay={i * 70}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group block h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-rose/60"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group block h-full rounded-3xl border border-dashed border-border bg-card/60 p-6">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <footer className="relative bg-navy-gradient text-ivory">
        <div className="container-site flex flex-col items-center gap-6 py-14 text-center">
          <Logo light />
          <p className="font-display text-xl text-ivory">{c.footerTagline}</p>
          <p className="text-sm text-ivory/65">{c.footerNote}</p>
          <div className="h-px w-24 bg-line-gradient" />
          <p className="text-xs text-ivory/45">© {new Date().getFullYear()} {t.general.siteName}</p>
          {!preview ? (
            <Link to="/editor" className="inline-flex items-center gap-1.5 text-[11px] text-ivory/35 transition-colors hover:text-ivory/80">
              <Pencil className="size-3" />
              {c.editLink}
            </Link>
          ) : null}
        </div>
      </footer>
    </>
  );
}
