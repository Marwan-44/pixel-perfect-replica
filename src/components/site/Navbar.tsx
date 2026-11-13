import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSite } from "@/lib/site-store";
import { Logo } from "./Logo";

export const NAV_ITEMS = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "problem", key: "problem" },
  { id: "solution", key: "solution" },
  { id: "how-it-works", key: "howItWorks" },
  { id: "features", key: "features" },
  { id: "technology", key: "technology" },
  { id: "app", key: "app" },
  { id: "dashboard", key: "dashboard" },
  { id: "team", key: "team" },
  { id: "contact", key: "contact" },
] as const;

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useSite();
  return (
    <div className={cn("inline-flex rounded-full border border-border bg-card p-0.5 text-xs font-semibold", className)} dir="ltr">
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            lang === l ? "bg-navy text-ivory" : "text-muted-foreground hover:text-navy",
          )}
        >
          {l === "en" ? "EN" : "AR"}
        </button>
      ))}
    </div>
  );
}

export function Navbar({ preview }: { preview?: boolean }) {
  const { t } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (preview) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [preview]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled || open ? "border-b border-border/70 bg-ivory/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#home" aria-label={t.general.siteName} onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map(({ id, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors",
                  active === id ? "text-navy" : "text-muted-foreground hover:text-navy",
                )}
              >
                {t.nav[key]}
                {active === id ? <span className="absolute inset-x-2.5 -bottom-0.5 h-px bg-line-gradient" /> : null}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-navy xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-border/70 xl:hidden">
          <ul className="container-site grid gap-1 py-4 sm:grid-cols-2">
            {NAV_ITEMS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-petal"
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
