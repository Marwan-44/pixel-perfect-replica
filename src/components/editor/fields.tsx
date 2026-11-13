import { useRef, type ReactNode } from "react";
import { ImagePlus, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  eyebrow: "Small label above title",
  intro: "Introduction",
  primaryCta: "Primary button",
  secondaryCta: "Secondary button",
  supportMessage: "Supporting message",
  identityLabel: "Identity label",
  appCaption: "Phone mockup caption",
  dashboardCaption: "Dashboard mockup caption",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2",
  siteName: "Website / brand name",
  languageName: "Language short name",
  howItWorks: "How It Works",
  app: "App Showcase",
  dashboard: "Doctor Dashboard",
  architectureTitle: "Architecture title",
  architecture: "Architecture diagram boxes",
  placeholderText: "Text shown when a screenshot is missing",
  previewHint: "Preview hint",
  notProvided: "Text when a link is empty",
  footerTagline: "Footer tagline",
  footerNote: "Footer note",
  editLink: "Discreet editor link text",
  academicTitle: "Academic title",
  demoVideo: "Demo video URL",
  linkedin: "LinkedIn URL",
  github: "GitHub URL",
  email: "Project email",
};

const ITEM_LABELS: Record<string, string> = {
  items: "Card",
  steps: "Step",
  highlights: "Highlight",
  components: "Component",
  points: "Point",
  categories: "Category",
  screens: "Screen",
  architecture: "Box",
  members: "Member",
};

export function humanize(key: string) {
  if (LABELS[key]) return LABELS[key];
  const s = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  return s.trim();
}

const LONG = /text|description|paragraph|bio|intro|quote|disclaimer|note|headline/i;

export function TextField({
  label,
  value,
  onChange,
  dir,
  multiline,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "ltr" | "rtl";
  multiline?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {multiline ? (
        <Textarea dir={dir} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="min-h-[88px] bg-card" />
      ) : (
        <Input dir={dir} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="bg-card" />
      )}
    </label>
  );
}

/** Renders inputs for any nested text structure (strings, objects, fixed-length arrays). */
export function FieldTree({
  value,
  onChange,
  name,
  dir,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  name: string;
  dir?: "ltr" | "rtl";
}): ReactNode {
  if (typeof value === "string") {
    return <TextField label={humanize(name)} value={value} onChange={onChange} dir={dir} multiline={LONG.test(name) || value.length > 80} />;
  }
  if (Array.isArray(value)) {
    const itemLabel = ITEM_LABELS[name] ?? "Item";
    const primitive = value.every((v) => typeof v === "string");
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">{humanize(name)}</p>
        <div className={cn(primitive ? "space-y-3" : "grid gap-4 md:grid-cols-2")}>
          {value.map((item, i) =>
            primitive ? (
              <TextField
                key={i}
                label={`${itemLabel} ${i + 1}`}
                value={item as string}
                dir={dir}
                multiline={(item as string).length > 80}
                onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))}
              />
            ) : (
              <div key={i} className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-deep">
                  {itemLabel} {i + 1}
                </p>
                <FieldTree name={`${name}-item`} value={item} dir={dir} onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))} />
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return (
      <div className="space-y-4">
        {Object.keys(obj).map((k) => (
          <FieldTree key={k} name={k} value={obj[k]} dir={dir} onChange={(nv) => onChange({ ...obj, [k]: nv })} />
        ))}
      </div>
    );
  }
  return null;
}

const ACCEPT = "image/png,image/jpeg,image/webp";
const MAX_BYTES = 10 * 1024 * 1024;

export function ImageSlotEditor({
  label,
  hint,
  src,
  custom,
  defaultPath,
  onUpload,
  onRestore,
  aspect = "aspect-video",
}: {
  label: string;
  hint?: string;
  src: string;
  custom: boolean;
  defaultPath?: string;
  onUpload: (file: File) => void;
  onRestore: () => void;
  aspect?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className={cn("relative overflow-hidden rounded-xl bg-muted petal-dots", aspect)}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <ImagePlus className="size-6" />
          <span className="text-[11px]">No image yet</span>
        </div>
        {src ? (
          <img
            key={src}
            src={src}
            alt={label}
            className="absolute inset-0 size-full bg-muted object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy">{label}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {custom ? "Uploaded image" : defaultPath ? `Default: ${defaultPath.startsWith("/") ? defaultPath : "built-in"}` : "Built-in design"}
          </p>
          {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
        <div className="flex shrink-0 gap-1.5">
          {custom ? (
            <Button type="button" variant="ghost" size="icon" onClick={onRestore} aria-label={`Restore default ${label}`} title="Restore default">
              <RotateCcw />
            </Button>
          ) : null}
          <Button type="button" variant="outline" size="sm" onClick={() => input.current?.click()}>
            <Upload /> Upload
          </Button>
        </div>
      </div>
      <input
        ref={input}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          if (!ACCEPT.split(",").includes(file.type)) {
            toast.error("Please choose a PNG, JPG/JPEG or WebP image.");
            return;
          }
          if (file.size > MAX_BYTES) {
            toast.error("That image is larger than 10 MB. Please choose a smaller file.");
            return;
          }
          onUpload(file);
        }}
      />
    </div>
  );
}
