import type { Lang, SharedContent, TextContent } from "@/content/types";

/** Adds https:// to web links typed without a scheme; leaves empty values empty. */
export function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^(https?:|mailto:)/i.test(v)) return v;
  return `https://${v}`;
}

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const record = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

/** Reads `uploads/info.json`. Missing or malformed entries become empty links. */
export function parseLinksFile(raw: unknown, teamSize: number): SharedContent {
  const file = record(raw);
  const team = Array.isArray(file["team"]) ? (file["team"] as unknown[]) : [];
  return {
    links: {
      email: text(file["email"]),
      linkedin: normalizeUrl(text(file["linkedin"])),
      github: normalizeUrl(text(file["github"])),
      demoVideo: normalizeUrl(text(file["demoVideo"])),
    },
    teamLinks: Array.from({ length: teamSize }, (_, i) => {
      const member = record(team[i]);
      return {
        linkedin: normalizeUrl(text(member["linkedin"])),
        github: normalizeUrl(text(member["github"])),
      };
    }),
    supervisorLinks: { linkedin: normalizeUrl(text(record(file["supervisor"])["linkedin"])) },
  };
}

/** Uses the saved value when it has one, otherwise the value from the project files. */
export function fillEmptyLinks(saved: SharedContent, fallback: SharedContent): SharedContent {
  const pick = (a: string, b: string) => a || b;
  return {
    links: {
      email: pick(saved.links.email, fallback.links.email),
      linkedin: pick(saved.links.linkedin, fallback.links.linkedin),
      github: pick(saved.links.github, fallback.links.github),
      demoVideo: pick(saved.links.demoVideo, fallback.links.demoVideo),
    },
    teamLinks: saved.teamLinks.map((t, i) => ({
      linkedin: pick(t.linkedin, fallback.teamLinks[i]?.linkedin ?? ""),
      github: pick(t.github, fallback.teamLinks[i]?.github ?? ""),
    })),
    supervisorLinks: {
      linkedin: pick(saved.supervisorLinks.linkedin, fallback.supervisorLinks.linkedin),
    },
  };
}

/**
 * Applies the names, roles, bios and supervisor details from `uploads/info.json`.
 * Fields left empty keep the default text.
 */
export function applyPeopleText(
  base: Record<Lang, TextContent>,
  raw: unknown,
): Record<Lang, TextContent> {
  const file = record(raw);
  const team = Array.isArray(file["team"]) ? (file["team"] as unknown[]) : [];
  const sup = record(file["supervisor"]);
  const out = {} as Record<Lang, TextContent>;
  for (const lang of ["en", "ar"] as const) {
    const sfx = lang === "ar" ? "Ar" : "";
    const t = base[lang];
    out[lang] = {
      ...t,
      team: {
        ...t.team,
        members: t.team.members.map((m, i) => {
          const f = record(team[i]);
          return {
            name: text(f[`name${sfx}`]) || m.name,
            role: text(f[`role${sfx}`]) || m.role,
            bio: text(f[`bio${sfx}`]) || m.bio,
          };
        }),
      },
      supervisor: {
        ...t.supervisor,
        name: text(sup[`name${sfx}`]) || t.supervisor.name,
        academicTitle: text(sup[`title${sfx}`]) || t.supervisor.academicTitle,
        bio: text(sup[`bio${sfx}`]) || t.supervisor.bio,
      },
    };
  }
  return out;
}
