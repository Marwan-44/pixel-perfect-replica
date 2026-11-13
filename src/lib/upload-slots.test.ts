import { describe, expect, it } from "vitest";

import { assignUploadSlots } from "./upload-slots";

const limits = { app: 6, dashboard: 5, team: 8 };
const url = (p: string) => `/assets/${p}`;
const files = (...paths: string[]) => Object.fromEntries(paths.map((p) => [p, url(p)]));

describe("assignUploadSlots", () => {
  it("uses the number at the start of the file name", () => {
    const out = assignUploadSlots(
      files("app/3.png", "app/01-home.jpg", "app/screen-2.webp"),
      limits,
    );
    expect(out).toEqual({
      app1: url("app/01-home.jpg"),
      app2: url("app/screen-2.webp"),
      app3: url("app/3.png"),
    });
  });

  it("fills free slots with unnumbered files in alphabetical order", () => {
    const out = assignUploadSlots(
      files(
        "dashboard/2.png",
        "dashboard/Screenshot_2026-11-13_b.png",
        "dashboard/Screenshot_2026-11-13_a.png",
      ),
      limits,
    );
    expect(out).toEqual({
      dashboard1: url("dashboard/Screenshot_2026-11-13_a.png"),
      dashboard2: url("dashboard/2.png"),
      dashboard3: url("dashboard/Screenshot_2026-11-13_b.png"),
    });
  });

  it("ignores numbered files beyond the slot count", () => {
    const out = assignUploadSlots(files("team/9.png", "team/8.png"), limits);
    expect(out).toEqual({ team8: url("team/8.png") });
  });

  it("maps single images by file name, ignoring case and extension", () => {
    const out = assignUploadSlots(
      files("Logo.PNG", "hero-app.jpg", "supervisor.webp", "notes.png"),
      limits,
    );
    expect(out).toEqual({
      logo: url("Logo.PNG"),
      heroApp: url("hero-app.jpg"),
      supervisor: url("supervisor.webp"),
    });
  });

  it("does not mix folders", () => {
    const out = assignUploadSlots(files("app/1.png", "team/1.png", "other/1.png"), limits);
    expect(out).toEqual({ app1: url("app/1.png"), team1: url("team/1.png") });
  });
});
