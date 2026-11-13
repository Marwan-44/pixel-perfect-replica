import aboutIllustration from "@/assets/women-solidarity.jpg";
import impactIllustration from "@/assets/hands-bloom.jpg";
import { defaultAr } from "./defaults-ar";
import { defaultEn } from "./defaults-en";
import type { SiteContent } from "./types";

export const TEAM_SIZE = 8;
export const APP_SCREEN_COUNT = 6;
export const DASHBOARD_SCREEN_COUNT = 5;

export const defaultContent: SiteContent = {
  text: { en: defaultEn, ar: defaultAr },
  shared: {
    links: { email: "", linkedin: "", github: "", demoVideo: "" },
    teamLinks: Array.from({ length: TEAM_SIZE }, () => ({ linkedin: "", github: "" })),
    supervisorLinks: { linkedin: "" },
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Every replaceable image on the site. The value is the default source used when no
 * image has been uploaded in the editor. Paths under /images/ are served from public/images/,
 * so permanent screenshots can be added there with these exact file names.
 * An empty string means "use the built-in design" (e.g. the drawn logo or phone mockup).
 */
export const defaultImages = {
  logo: "",
  heroApp: "",
  heroDashboard: "",
  aboutIllustration,
  impactIllustration,
  supervisor: "",
  ...Object.fromEntries(
    Array.from({ length: APP_SCREEN_COUNT }, (_, i) => [`app${i + 1}`, `/images/app/screen-${pad(i + 1)}.png`]),
  ),
  ...Object.fromEntries(
    Array.from({ length: DASHBOARD_SCREEN_COUNT }, (_, i) => [
      `dashboard${i + 1}`,
      `/images/dashboard/dashboard-${pad(i + 1)}.png`,
    ]),
  ),
  ...Object.fromEntries(Array.from({ length: TEAM_SIZE }, (_, i) => [`team${i + 1}`, ""])),
} as Record<string, string>;

export type ImageKey = string;
