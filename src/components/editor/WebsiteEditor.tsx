import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Eye, Info, PencilLine, RotateCcw, Save, Undo2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/components/site/HomePage";
import { LogoMark } from "@/components/site/Logo";
import { defaultContent, defaultImages } from "@/content/defaults";
import type { Lang, SiteContent, TextContent } from "@/content/types";
import { normalizeUrl } from "@/lib/links";
import { mergeWithDefaults } from "@/lib/merge";
import { loadSavedContent, resetSite, saveSite, SitePreviewProvider, useSite, type ImageEdits } from "@/lib/site-store";
import { cn } from "@/lib/utils";
import { FieldTree, ImageSlotEditor, TextField } from "./fields";
import { EDITOR_SECTIONS, type ImageSlotDef } from "./sections";

function normalizeLinks(c: SiteContent): SiteContent {
  const L = c.shared.links;
  return {
    ...c,
    shared: {
      links: { email: L.email.trim(), linkedin: normalizeUrl(L.linkedin), github: normalizeUrl(L.github), demoVideo: normalizeUrl(L.demoVideo) },
      teamLinks: c.shared.teamLinks.map((t) => ({ linkedin: normalizeUrl(t.linkedin), github: normalizeUrl(t.github) })),
      supervisorLinks: { linkedin: normalizeUrl(c.shared.supervisorLinks.linkedin) },
    },
  };
}

export function WebsiteEditor() {
  const site = useSite();
  const [draft, setDraft] = useState<SiteContent>(defaultContent);
  const [edits, setEdits] = useState<ImageEdits>({});
  const [editUrls, setEditUrls] = useState<Record<string, string>>({});
  const [sectionId, setSectionId] = useState(EDITOR_SECTIONS[0].id);
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  const section = EDITOR_SECTIONS.find((s) => s.id === sectionId)!;
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    setDraft(loadSavedContent());
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = useCallback((fn: (c: SiteContent) => SiteContent) => {
    setDraft(fn);
    setDirty(true);
  }, []);

  const setText = (key: keyof TextContent, value: unknown) =>
    update((c) => ({ ...c, text: { ...c.text, [lang]: { ...c.text[lang], [key]: value } } }));

  const resolveImg = useCallback(
    (key: string) => {
      if (key in edits) return edits[key] ? editUrls[key] : (defaultImages[key] ?? "");
      return site.img(key);
    },
    [edits, editUrls, site],
  );
  const isCustom = (key: string) => (key in edits ? edits[key] !== null : site.isUploaded(key));

  const setImage = (key: string, blob: Blob | null) => {
    setEdits((e) => ({ ...e, [key]: blob }));
    setEditUrls((u) => {
      if (u[key]) URL.revokeObjectURL(u[key]);
      const next = { ...u };
      if (blob) next[key] = URL.createObjectURL(blob);
      else delete next[key];
      return next;
    });
    setDirty(true);
  };

  const clearEdits = () => {
    Object.values(editUrls).forEach((u) => URL.revokeObjectURL(u));
    setEdits({});
    setEditUrls({});
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const clean = normalizeLinks(draft);
      await saveSite(clean, edits);
      setDraft(clean);
      clearEdits();
      setDirty(false);
      toast.success("Changes saved in this browser.");
    } catch (err) {
      console.error(err);
      toast.error("Could not save. Your browser storage may be full or blocked.");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    setDraft(loadSavedContent());
    clearEdits();
    setDirty(false);
    toast("Unsaved changes discarded.");
  };

  const onReset = async () => {
    await resetSite();
    setDraft(defaultContent);
    clearEdits();
    setDirty(false);
    toast.success("Website restored to the default content.");
  };

  const onExport = () => {
    const blob = new Blob([JSON.stringify(normalizeLinks(draft), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "raqeeb-content.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const onImport = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      update(() => mergeWithDefaults(defaultContent, parsed));
      toast.success("Text imported. Review it, then press Save Changes.");
    } catch {
      toast.error("That file is not a valid RAQEEB content file.");
    }
  };

  // Scroll the live preview to the section being edited.
  useEffect(() => {
    if (mode !== "preview") return;
    const id = requestAnimationFrame(() => {
      const root = previewRef.current;
      const target = root?.querySelector<HTMLElement>(`#${section.anchor}`);
      if (root && target) root.scrollTop = target.offsetTop - 8;
    });
    return () => cancelAnimationFrame(id);
  }, [mode, section.anchor, lang]);

  const t = draft.text[lang];

  const imageGrid = (slots: ImageSlotDef[]) => (
    <div className={cn("grid gap-4", slots.length > 2 ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2")}>
      {slots.map((s) => (
        <ImageSlotEditor
          key={s.key}
          label={s.label}
          hint={s.hint}
          aspect={s.aspect}
          src={resolveImg(s.key)}
          custom={isCustom(s.key)}
          defaultPath={defaultImages[s.key]}
          onUpload={(f) => setImage(s.key, f)}
          onRestore={() => setImage(s.key, null)}
        />
      ))}
    </div>
  );

  const previewContent = useMemo(() => draft, [draft]);

  return (
    <div dir="ltr" lang="en" className="flex min-h-screen flex-col bg-muted/60">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 lg:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy">
            <ArrowLeft className="size-4" /> Website
          </Link>
          <div className="flex items-center gap-2">
            <LogoMark className="size-7" />
            <h1 className="font-display text-lg font-medium text-navy">RAQEEB Website Editor</h1>
            {dirty ? <span className="rounded-full bg-petal px-2 py-0.5 text-[11px] font-semibold text-rose-deep">Unsaved changes</span> : null}
          </div>
          <div className="ms-auto flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-border bg-muted p-0.5 text-xs font-semibold">
              {(["edit", "preview"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5", mode === m ? "bg-navy text-ivory" : "text-muted-foreground")}
                >
                  {m === "edit" ? <PencilLine className="size-3.5" /> : <Eye className="size-3.5" />}
                  {m === "edit" ? "Edit" : "Live Preview"}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={onCancel} disabled={!dirty}>
              <Undo2 /> Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RotateCcw /> Reset to Default
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset the whole website?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes all saved text and uploaded images from this browser and restores the original content. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep my changes</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset}>Reset everything</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button size="sm" onClick={onSave} disabled={!dirty || saving}>
              <Save /> {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Section list */}
        <aside className="border-b border-border bg-card lg:sticky lg:top-[61px] lg:h-[calc(100vh-61px)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-e">
          <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col">
            {EDITOR_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSectionId(s.id)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors",
                  s.id === sectionId ? "bg-petal font-semibold text-navy" : "text-muted-foreground hover:bg-muted hover:text-navy",
                )}
              >
                <span className="w-5 text-xs text-rose-deep">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </button>
            ))}
          </nav>
          <div className="hidden space-y-2 border-t border-border p-4 lg:block">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={onExport}>
              <Download /> Download content file
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => importRef.current?.click()}>
              <Upload /> Import content file
            </Button>
            <input
              ref={importRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) void onImport(f);
              }}
            />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Notice + section header */}
          <div className="border-b border-border bg-card px-4 py-5 lg:px-8">
            <div className="flex items-start gap-3 rounded-2xl border border-powder bg-powder/50 p-4 text-sm text-navy">
              <Info className="mt-0.5 size-4 shrink-0" />
              <p>
                Edits and uploaded images are stored <strong>only in this browser</strong>. They do not update the live website for other
                visitors and this editor is not a secure admin area. To make changes permanent for everyone, add the final screenshots to the
                project's <code className="rounded bg-card px-1">public/images</code> folder and update the default content in the project files
                (you can use “Download content file” to hand over your text).
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-medium text-navy">{section.label}</h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{section.description}</p>
              </div>
              <div className="inline-flex rounded-full border border-border bg-muted p-0.5 text-xs font-semibold">
                {(["en", "ar"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={cn("rounded-full px-4 py-1.5", lang === l ? "bg-navy text-ivory" : "text-muted-foreground")}
                  >
                    {l === "en" ? "English" : "العربية"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {mode === "preview" ? (
            <div ref={previewRef} className="relative h-[calc(100vh-61px)] overflow-y-auto bg-background">
              <SitePreviewProvider content={previewContent} lang={lang} images={resolveImg}>
                <HomePage preview />
              </SitePreviewProvider>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 lg:px-8">
              {section.images ? (
                <Panel title="Images" note="PNG, JPG, JPEG or WebP. Images keep their original proportions.">
                  {imageGrid(section.images)}
                </Panel>
              ) : null}

              {section.text?.map((key) => (
                <Panel key={key} title={`${section.text!.length > 1 ? `${key[0].toUpperCase()}${key.slice(1)} — ` : ""}Text (${lang === "en" ? "English" : "Arabic"})`}>
                  <FieldTree name={key} value={t[key]} dir={dir} onChange={(v) => setText(key, v)} />
                </Panel>
              ))}

              {section.custom === "team" ? (
                <>
                  <Panel title={`Section text (${lang === "en" ? "English" : "Arabic"})`}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Small label above title" value={t.team.eyebrow} dir={dir} onChange={(v) => setText("team", { ...t.team, eyebrow: v })} />
                      <TextField label="Title" value={t.team.title} dir={dir} onChange={(v) => setText("team", { ...t.team, title: v })} />
                    </div>
                    <div className="mt-4">
                      <TextField label="Introduction" multiline value={t.team.intro} dir={dir} onChange={(v) => setText("team", { ...t.team, intro: v })} />
                    </div>
                  </Panel>
                  <div className="grid gap-5 md:grid-cols-2">
                    {t.team.members.map((m, i) => {
                      const setMember = (patch: Partial<typeof m>) =>
                        setText("team", { ...t.team, members: t.team.members.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
                      const links = draft.shared.teamLinks[i];
                      const setLinks = (patch: Partial<typeof links>) =>
                        update((c) => ({
                          ...c,
                          shared: { ...c.shared, teamLinks: c.shared.teamLinks.map((x, j) => (j === i ? { ...x, ...patch } : x)) },
                        }));
                      return (
                        <Panel key={i} title={`Member ${i + 1}`}>
                          <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                            <ImageSlotEditor
                              label="Profile picture"
                              aspect="aspect-square"
                              src={resolveImg(`team${i + 1}`)}
                              custom={isCustom(`team${i + 1}`)}
                              onUpload={(f) => setImage(`team${i + 1}`, f)}
                              onRestore={() => setImage(`team${i + 1}`, null)}
                            />
                            <div className="space-y-3">
                              <TextField label="Full name" value={m.name} dir={dir} onChange={(v) => setMember({ name: v })} />
                              <TextField label="Role / position" value={m.role} dir={dir} onChange={(v) => setMember({ role: v })} />
                            </div>
                          </div>
                          <div className="mt-3 space-y-3">
                            <TextField label="Short biography" multiline value={m.bio} dir={dir} onChange={(v) => setMember({ bio: v })} />
                            <TextField label="LinkedIn URL (optional, both languages)" type="url" placeholder="https://linkedin.com/in/…" value={links.linkedin} onChange={(v) => setLinks({ linkedin: v })} />
                            <TextField label="GitHub URL (optional, both languages)" type="url" placeholder="https://github.com/…" value={links.github} onChange={(v) => setLinks({ github: v })} />
                          </div>
                        </Panel>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {section.custom === "supervisor" ? (
                <Panel title={`Supervisor (${lang === "en" ? "English" : "Arabic"})`}>
                  <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                    <ImageSlotEditor
                      label="Profile picture"
                      aspect="aspect-square"
                      src={resolveImg("supervisor")}
                      custom={isCustom("supervisor")}
                      onUpload={(f) => setImage("supervisor", f)}
                      onRestore={() => setImage("supervisor", null)}
                    />
                    <div className="space-y-4">
                      <FieldTree name="supervisor" value={t.supervisor} dir={dir} onChange={(v) => setText("supervisor", v)} />
                      <TextField
                        label="LinkedIn URL (optional, both languages)"
                        type="url"
                        placeholder="https://linkedin.com/in/…"
                        value={draft.shared.supervisorLinks.linkedin}
                        onChange={(v) => update((c) => ({ ...c, shared: { ...c.shared, supervisorLinks: { linkedin: v } } }))}
                      />
                    </div>
                  </div>
                </Panel>
              ) : null}

              {section.custom === "contact" ? (
                <>
                  <Panel title="Contact links (same for both languages)" note="Leave a field empty to show it as “coming soon”.">
                    <div className="grid gap-4 md:grid-cols-2">
                      {(Object.keys(draft.shared.links) as (keyof SiteContent["shared"]["links"])[]).map((k) => (
                        <TextField
                          key={k}
                          label={{ email: "Project email", linkedin: "LinkedIn URL", github: "GitHub repository URL", demoVideo: "Demo video URL" }[k]}
                          type={k === "email" ? "email" : "url"}
                          value={draft.shared.links[k]}
                          onChange={(v) => update((c) => ({ ...c, shared: { ...c.shared, links: { ...c.shared.links, [k]: v } } }))}
                        />
                      ))}
                    </div>
                  </Panel>
                  <Panel title={`Contact & footer text (${lang === "en" ? "English" : "Arabic"})`}>
                    <FieldTree name="contact" value={t.contact} dir={dir} onChange={(v) => setText("contact", v)} />
                  </Panel>
                </>
              ) : null}

              <div className="flex justify-end gap-2 pb-10">
                <Button variant="outline" onClick={() => setMode("preview")}>
                  <Eye /> Preview this section
                </Button>
                <Button onClick={onSave} disabled={!dirty || saving}>
                  <Save /> Save Changes
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-soft md:p-6">
      <div className="mb-5">
        <h3 className="font-sans text-base font-bold tracking-normal text-navy">{title}</h3>
        {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}
