import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-[2.6rem] bg-navy p-[9px] shadow-device", className)}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-ivory">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-navy" />
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-device", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5" dir="ltr">
        <span className="size-2.5 rounded-full bg-rose" />
        <span className="size-2.5 rounded-full bg-lavender-deep/50" />
        <span className="size-2.5 rounded-full bg-powder" />
        <span className="mx-auto truncate rounded-md bg-card px-6 py-0.5 text-[11px] text-muted-foreground">
          {label ?? "dashboard.raqeeb"}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-ivory">{children}</div>
    </div>
  );
}

/** Abstract interface sketch shown until a real screenshot is uploaded (not a fake screen). */
export function AbstractAppUI() {
  return (
    <div className="flex h-full flex-col gap-3 bg-bloom px-4 pb-4 pt-10">
      <div className="h-2.5 w-24 rounded-full bg-navy/70" />
      <div className="h-2 w-32 rounded-full bg-slate/30" />
      <div className="mt-2 rounded-2xl bg-card/90 p-3 shadow-soft">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-rose-gradient" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-navy/40" />
            <div className="h-2 w-1/2 rounded-full bg-slate/25" />
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={cn("h-6 flex-1 rounded-lg", i === 2 ? "bg-rose" : "bg-petal")} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-16 rounded-2xl bg-lavender/80" />
        <div className="h-16 rounded-2xl bg-powder" />
      </div>
      <div className="space-y-2 rounded-2xl bg-card/90 p-3 shadow-soft">
        {[80, 60, 70].map((w) => (
          <div key={w} className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blush" />
            <div className="h-2 rounded-full bg-navy/25" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-auto h-9 rounded-full bg-navy" />
    </div>
  );
}

export function AbstractDashboardUI() {
  return (
    <div className="flex h-full" dir="ltr">
      <div className="hidden w-1/5 flex-col gap-2 border-e border-border bg-card p-3 sm:flex">
        <div className="mb-2 h-3 w-12 rounded-full bg-navy/70" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={cn("h-2.5 rounded-full", i === 1 ? "w-full bg-rose" : "w-3/4 bg-slate/20")} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {["bg-petal", "bg-lavender", "bg-powder"].map((c) => (
            <div key={c} className={cn("h-12 rounded-xl p-2", c)}>
              <div className="h-2 w-1/2 rounded-full bg-navy/30" />
              <div className="mt-2 h-3 w-1/3 rounded-full bg-navy/60" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-3">
          <div className="flex flex-[2] items-end gap-1.5 rounded-xl border border-border bg-card p-3">
            {[40, 65, 50, 80, 55, 70, 45, 85, 60].map((h, i) => (
              <div key={i} className={cn("flex-1 rounded-t-md", i % 3 === 0 ? "bg-rose" : "bg-lavender-deep/40")} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={cn("size-4 rounded-full", i === 2 ? "bg-rose" : "bg-blush/70")} />
                <div className="h-2 flex-1 rounded-full bg-slate/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
