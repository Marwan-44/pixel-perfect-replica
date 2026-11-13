import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";

import { useSite } from "@/lib/site-store";
import { BrowserFrame, PhoneFrame, AbstractAppUI, AbstractDashboardUI } from "./devices";
import { FloralSprig, LeafBranch, PetalBloom } from "./floral";
import { SlotImage } from "./primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, img } = useSite();
  const h = t.hero;
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-bloom opacity-90" />
      <div className="pointer-events-none absolute inset-0 petal-dots opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <FloralSprig className="pointer-events-none absolute -start-6 top-24 hidden h-[420px] text-rose/60 animate-sway lg:block" />
      <PetalBloom className="pointer-events-none absolute -end-24 -top-20 size-[380px] text-lavender-deep/20" />
      <LeafBranch className="pointer-events-none absolute bottom-10 end-0 w-[360px] text-rose/40 flip-rtl" />

      <div className="container-site relative grid items-center gap-14 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-32 lg:pt-16">
        <div className="animate-[rise_0.9s_cubic-bezier(.2,.7,.2,1)_both]">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-rose/50 bg-card/70 px-4 py-2 text-xs font-semibold text-navy shadow-soft backdrop-blur">
            <Sparkles className="size-3.5 shrink-0 text-rose-deep" />
            <span className="truncate">{h.identityLabel}</span>
          </span>
          <h1 className="mt-7 text-5xl font-medium leading-[1.02] text-navy text-balance sm:text-6xl lg:text-[4.4rem]">
            {h.headline.split(/(?<=\.)\s+/).map((part, i) => (
              <span key={i} className={cn("block", i === 1 && "text-gradient-rose italic rtl:not-italic")}>
                {part}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#solution" className={cn(buttonVariants({ variant: "hero", size: "xl" }))}>
              {h.primaryCta}
              <ArrowRight className="size-4 flip-rtl" />
            </a>
            <a href="#how-it-works" className={cn(buttonVariants({ variant: "soft", size: "xl" }))}>
              {h.secondaryCta}
            </a>
          </div>
          <p className="mt-10 flex items-center gap-3 font-display text-lg italic text-navy-soft rtl:not-italic">
            <span className="h-px w-10 bg-line-gradient" />
            {h.supportMessage}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] animate-[rise_1.1s_cubic-bezier(.2,.7,.2,1)_0.15s_both]">
          <div className="absolute inset-6 rounded-[3rem] bg-rose-gradient opacity-40 blur-3xl" />
          <BrowserFrame className="relative ms-auto w-[92%]" label={h.dashboardCaption}>
            <SlotImage
              src={img("heroDashboard")}
              alt={h.dashboardCaption}
              loading="eager"
              placeholder={<AbstractDashboardUI />}
            />
          </BrowserFrame>
          <div className="absolute -bottom-12 start-0 w-[38%] min-w-[150px] animate-float-soft">
            <PhoneFrame>
              <SlotImage src={img("heroApp")} alt={h.appCaption} loading="eager" placeholder={<AbstractAppUI />} />
            </PhoneFrame>
          </div>
          <div className="absolute -end-2 -bottom-6 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-bloom backdrop-blur sm:-end-6">
            <span className="relative flex size-9 items-center justify-center rounded-full bg-petal">
              <span className="absolute inset-0 rounded-full bg-rose/40 animate-pulse-ring" />
              <HeartPulse className="relative size-4.5 text-rose-deep" />
            </span>
            <span className="text-sm font-semibold text-navy">{h.appCaption} · {h.dashboardCaption}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
