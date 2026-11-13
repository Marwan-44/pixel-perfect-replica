/**
 * Maps files dropped into the `uploads/` folder to the image slots used by the site.
 *
 * - `app/`, `dashboard/` and `team/` hold numbered series. A file whose name starts with a number
 *   (`1.png`, `03-home.jpg`, `screen-2.webp`) goes to that slot. Files without a number fill the
 *   remaining slots in alphabetical order, so raw phone screenshots work too.
 * - Single images sit directly in `uploads/` and are matched by file name (see ROOT_FILES).
 */

export interface SlotLimits {
  app: number;
  dashboard: number;
  team: number;
}

/** File name (without extension, lower case) to image slot key. */
export const ROOT_FILES: Record<string, string> = {
  logo: "logo",
  "hero-app": "heroApp",
  "hero-dashboard": "heroDashboard",
  supervisor: "supervisor",
  about: "aboutIllustration",
  impact: "impactIllustration",
};

const baseName = (path: string) => {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^.]+$/, "");
};

/** Leading number of a file name: `03-home` is 3, `Screenshot_2026-11-13` has none. */
function leadingNumber(name: string): number | null {
  const match = /^\D*?(\d{1,3})(?!\d)/.exec(name);
  return match?.[1] ? Number(match[1]) : null;
}

const byName = (a: [string, string], b: [string, string]) =>
  a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" });

/**
 * @param files paths relative to `uploads/` (for example `app/3.png`) mapped to their URL
 * @returns image slot key (`app3`, `team1`, `logo`, ...) mapped to its URL
 */
export function assignUploadSlots(
  files: Record<string, string>,
  limits: SlotLimits,
): Record<string, string> {
  const out: Record<string, string> = {};
  const entries = Object.entries(files).sort(byName);

  for (const group of ["app", "dashboard", "team"] as const) {
    const limit = limits[group];
    const unnumbered: string[] = [];

    for (const [path, url] of entries) {
      const [folder, ...rest] = path.split("/");
      if (rest.length === 0 || folder?.toLowerCase() !== group) continue;
      const n = leadingNumber(baseName(path));
      if (n === null || n === 0) {
        unnumbered.push(url);
      } else if (n <= limit && !out[`${group}${n}`]) {
        out[`${group}${n}`] = url;
      }
    }

    for (let n = 1; n <= limit && unnumbered.length > 0; n++) {
      if (!out[`${group}${n}`]) out[`${group}${n}`] = unnumbered.shift()!;
    }
  }

  for (const [path, url] of entries) {
    if (path.includes("/")) continue;
    const key = ROOT_FILES[baseName(path).toLowerCase()];
    if (key && !out[key]) out[key] = url;
  }

  return out;
}
