import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About, Features, HowItWorks, Problem, Solution, Technology } from "./sections-a";
import { AppShowcase, Contact, DashboardShowcase, Impact, Supervisor, Team } from "./sections-b";
import { useSite } from "@/lib/site-store";

/** The full public site. `preview` disables window-level behaviour when shown inside the editor. */
export function HomePage({ preview }: { preview?: boolean }) {
  const { dir, lang } = useSite();
  return (
    <div dir={dir} lang={lang} className="relative">
      <Navbar preview={preview} />
      <main>
        <Hero />
        <About />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <Technology />
        <AppShowcase />
        <DashboardShowcase />
        <Impact />
        <Team />
        <Supervisor />
      </main>
      <Contact preview={preview} />
    </div>
  );
}
