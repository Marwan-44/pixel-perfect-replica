import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { defaultContent, defaultImages } from "@/content/defaults";
import type { Lang, SiteContent, TextContent } from "@/content/types";
import { clearImages, deleteImage, getAllImages, putImage } from "./image-db";
import { mergeWithDefaults } from "./merge";

const CONTENT_KEY = "raqeeb:content:v1";
const LANG_KEY = "raqeeb:lang";

export function loadSavedContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    return raw ? mergeWithDefaults(defaultContent, JSON.parse(raw)) : defaultContent;
  } catch {
    return defaultContent;
  }
}

/** Pending image edits: a Blob to store, or null to remove the uploaded image. */
export type ImageEdits = Record<string, Blob | null>;

export async function saveSite(content: SiteContent, imageEdits: ImageEdits) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  for (const [key, blob] of Object.entries(imageEdits)) {
    if (blob) await putImage(key, blob);
    else await deleteImage(key);
  }
  window.dispatchEvent(new Event("raqeeb:saved"));
}

export async function resetSite() {
  localStorage.removeItem(CONTENT_KEY);
  await clearImages();
  window.dispatchEvent(new Event("raqeeb:saved"));
}

interface SiteContextValue {
  content: SiteContent;
  t: TextContent;
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  /** Resolved image source for a slot: uploaded image, else default ("" = built-in design). */
  img: (key: string) => string;
  /** True for keys whose image comes from an upload (vs. the default). */
  isUploaded: (key: string) => boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

/** Loads saved text + images from this browser and applies language direction to <html>. */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [uploaded, setUploaded] = useState<Record<string, string>>({});
  const [lang, setLangState] = useState<Lang>("en");

  const reload = useCallback(async () => {
    setContent(loadSavedContent());
    try {
      const blobs = await getAllImages();
      setUploaded((prev) => {
        Object.values(prev).forEach((u) => URL.revokeObjectURL(u));
        return Object.fromEntries(Object.entries(blobs).map(([k, b]) => [k, URL.createObjectURL(b)]));
      });
    } catch {
      setUploaded({});
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ar" || saved === "en") setLangState(saved);
    void reload();
    const onSaved = () => void reload();
    window.addEventListener("raqeeb:saved", onSaved);
    return () => window.removeEventListener("raqeeb:saved", onSaved);
  }, [reload]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<SiteContextValue>(
    () => ({
      content,
      t: content.text[lang],
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      img: (key) => uploaded[key] ?? defaultImages[key] ?? "",
      isUploaded: (key) => key in uploaded,
    }),
    [content, lang, setLang, uploaded],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Lets the editor preview unsaved changes by overriding the provider value. */
export function SitePreviewProvider({
  content,
  lang,
  images,
  children,
}: {
  content: SiteContent;
  lang: Lang;
  images: (key: string) => string;
  children: ReactNode;
}) {
  const parent = useSite();
  const value = useMemo<SiteContextValue>(
    () => ({
      ...parent,
      content,
      lang,
      t: content.text[lang],
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: () => {},
      img: images,
    }),
    [parent, content, lang, images],
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
