import aboutIllustration from "@/assets/women-solidarity.jpg";
import impactIllustration from "@/assets/hands-bloom.jpg";
import { parseLinksFile } from "@/lib/links";
import { assignUploadSlots } from "@/lib/upload-slots";
import linksFile from "../../uploads/links.json";
import { defaultAr } from "./defaults-ar";
import { defaultEn } from "./defaults-en";
import type { SiteContent } from "./types";
import { uploadFiles } from "./uploads";

export const TEAM_SIZE = 8;
export const APP_SCREEN_COUNT = 6;
export const DASHBOARD_SCREEN_COUNT = 5;

/** Links come from `uploads/links.json`, so they can be changed without touching the code. */
export const defaultContent: SiteContent = {
  text: { en: defaultEn, ar: defaultAr },
  shared: parseLinksFile(linksFile, TEAM_SIZE),
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Images dropped into the `uploads/` folder (see uploads/README.md for the naming rules). */
const fromFolder = assignUploadSlots(uploadFiles, {
  app: APP_SCREEN_COUNT,
  dashboard: DASHBOARD_SCREEN_COUNT,
  team: TEAM_SIZE,
});

/**
 * Every replaceable image on the site. The value is the default source used when no
 * image has been uploaded in the editor: the file from the `uploads/` folder if there is one,
 * otherwise the older `public/images/` file names, otherwise the built-in design.
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
    Array.from({ length: APP_SCREEN_COUNT }, (_, i) => [
      `app${i + 1}`,
      `/images/app/screen-${pad(i + 1)}.png`,
    ]),
  ),
  ...Object.fromEntries(
    Array.from({ length: DASHBOARD_SCREEN_COUNT }, (_, i) => [
      `dashboard${i + 1}`,
      `/images/dashboard/dashboard-${pad(i + 1)}.png`,
    ]),
  ),
  ...Object.fromEntries(Array.from({ length: TEAM_SIZE }, (_, i) => [`team${i + 1}`, ""])),
  ...fromFolder,
} as Record<string, string>;

/** Slots that currently get their image from the `uploads/` folder. */
export const folderImageKeys = new Set(Object.keys(fromFolder));

export type ImageKey = string;
