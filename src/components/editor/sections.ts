import { APP_SCREEN_COUNT, DASHBOARD_SCREEN_COUNT } from "@/content/defaults";
import type { TextContent } from "@/content/types";

export interface ImageSlotDef {
  key: string;
  label: string;
  hint?: string;
  aspect?: string;
}

export interface EditorSection {
  id: string;
  label: string;
  /** Section id on the public page, used to scroll the live preview. */
  anchor: string;
  description: string;
  text?: (keyof TextContent)[];
  images?: ImageSlotDef[];
  custom?: "team" | "supervisor" | "contact";
}

export const EDITOR_SECTIONS: EditorSection[] = [
  {
    id: "general",
    label: "General Information",
    anchor: "home",
    description: "Website name, tagline and the menu labels.",
    text: ["general", "nav"],
  },
  {
    id: "branding",
    label: "Logo & Branding",
    anchor: "home",
    description: "Upload your logo. When a logo is uploaded it replaces the drawn RAQEEB mark and name in the menu and footer.",
    images: [{ key: "logo", label: "RAQEEB logo", hint: "A wide PNG with transparent background works best.", aspect: "aspect-[3/1]" }],
  },
  {
    id: "hero",
    label: "Hero Section",
    anchor: "home",
    description: "The first thing visitors see. Until you upload images, an abstract illustration is shown inside the phone and browser frames.",
    text: ["hero"],
    images: [
      { key: "heroApp", label: "Hero — phone screen", hint: "Portrait screenshot (about 9:19.5).", aspect: "aspect-[9/16]" },
      { key: "heroDashboard", label: "Hero — dashboard screen", hint: "Landscape screenshot (about 16:10).", aspect: "aspect-[16/10]" },
    ],
  },
  {
    id: "about",
    label: "About Section",
    anchor: "about",
    description: "The story of RAQEEB and the women-supporting-women illustration.",
    text: ["about"],
    images: [{ key: "aboutIllustration", label: "About illustration", aspect: "aspect-[8/9]" }],
  },
  {
    id: "problem-solution",
    label: "Problem & Solution",
    anchor: "problem",
    description: "The challenge and the three parts of the RAQEEB platform.",
    text: ["problem", "solution"],
  },
  { id: "how", label: "How It Works", anchor: "how-it-works", description: "The six workflow steps.", text: ["howItWorks"] },
  { id: "features", label: "Features", anchor: "features", description: "The feature cards.", text: ["features"] },
  {
    id: "technology",
    label: "Technology",
    anchor: "technology",
    description: "Technology categories and the architecture diagram. Only list technologies you have confirmed.",
    text: ["technology"],
  },
  {
    id: "app",
    label: "Mobile App Screenshots",
    anchor: "app",
    description: "Upload the real screenshots of the patient app. Each screenshot matches the screen text with the same number.",
    text: ["appShowcase"],
    images: Array.from({ length: APP_SCREEN_COUNT }, (_, i) => ({
      key: `app${i + 1}`,
      label: `App screen ${i + 1}`,
      aspect: "aspect-[9/16]",
    })),
  },
  {
    id: "dashboard",
    label: "Doctor Dashboard Screenshots",
    anchor: "dashboard",
    description: "Upload the real screenshots of the doctor dashboard.",
    text: ["dashboard"],
    images: Array.from({ length: DASHBOARD_SCREEN_COUNT }, (_, i) => ({
      key: `dashboard${i + 1}`,
      label: `Dashboard screen ${i + 1}`,
      aspect: "aspect-[16/10]",
    })),
  },
  { id: "team", label: "Team Members", anchor: "team", description: "All 8 team members. LinkedIn and GitHub are optional — icons only appear when a link is filled in.", custom: "team" },
  { id: "supervisor", label: "Project Supervisor", anchor: "supervisor", description: "Shown separately from the team.", custom: "supervisor" },
  {
    id: "impact",
    label: "Impact Section",
    anchor: "impact",
    description: "Intended benefits. Keep them framed as goals, not proven results.",
    text: ["impact"],
    images: [{ key: "impactIllustration", label: "Impact illustration", aspect: "aspect-square" }],
  },
  { id: "contact", label: "Contact & Footer", anchor: "contact", description: "Contact links and footer text.", custom: "contact" },
];
