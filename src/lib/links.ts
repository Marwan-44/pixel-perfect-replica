/** Adds https:// to web links typed without a scheme; leaves empty values empty. */
export function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^(https?:|mailto:)/i.test(v)) return v;
  return `https://${v}`;
}
