import { describe, expect, it } from "vitest";

import { fillEmptyLinks, normalizeUrl, parseLinksFile } from "./links";

describe("normalizeUrl", () => {
  it("adds https:// and keeps mailto and empty values", () => {
    expect(normalizeUrl(" github.com/me ")).toBe("https://github.com/me");
    expect(normalizeUrl("http://a.com")).toBe("http://a.com");
    expect(normalizeUrl("mailto:a@b.com")).toBe("mailto:a@b.com");
    expect(normalizeUrl("  ")).toBe("");
  });
});

describe("parseLinksFile", () => {
  it("reads project, team and supervisor links", () => {
    const out = parseLinksFile(
      {
        email: " team@raqeeb.app ",
        github: "github.com/raqeeb",
        team: [{ linkedin: "linkedin.com/in/a" }, { github: "github.com/b" }],
        supervisor: { linkedin: "linkedin.com/in/dr" },
      },
      3,
    );
    expect(out.links).toEqual({
      email: "team@raqeeb.app",
      linkedin: "",
      github: "https://github.com/raqeeb",
      demoVideo: "",
    });
    expect(out.teamLinks).toEqual([
      { linkedin: "https://linkedin.com/in/a", github: "" },
      { linkedin: "", github: "https://github.com/b" },
      { linkedin: "", github: "" },
    ]);
    expect(out.supervisorLinks.linkedin).toBe("https://linkedin.com/in/dr");
  });

  it("copes with a missing or broken file", () => {
    expect(parseLinksFile(null, 2).teamLinks).toHaveLength(2);
    expect(parseLinksFile({ team: "x", supervisor: 5, email: 3 }, 1).links.email).toBe("");
  });
});

describe("fillEmptyLinks", () => {
  it("keeps saved values and fills empty ones from the project files", () => {
    const fallback = parseLinksFile({ github: "github.com/x", team: [{ linkedin: "l.com/1" }] }, 1);
    const saved = parseLinksFile({ email: "me@x.com", team: [{ github: "g.com/1" }] }, 1);
    const out = fillEmptyLinks(saved, fallback);
    expect(out.links.email).toBe("me@x.com");
    expect(out.links.github).toBe("https://github.com/x");
    expect(out.teamLinks[0]).toEqual({ linkedin: "https://l.com/1", github: "https://g.com/1" });
  });
});
