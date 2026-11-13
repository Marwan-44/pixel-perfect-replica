/**
 * Deep-merges saved content over the defaults so that older saved data keeps working when
 * the content structure changes. Arrays keep the DEFAULT length (e.g. always 8 team members);
 * saved items are merged by index. Only values of the same type as the default are accepted.
 */
export function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (saved === undefined || saved === null) return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    return defaults.map((item, i) => mergeWithDefaults(item, saved[i])) as T;
  }

  if (typeof defaults === "object" && defaults !== null) {
    if (typeof saved !== "object" || Array.isArray(saved)) return defaults;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(defaults as Record<string, unknown>)) {
      out[key] = mergeWithDefaults(
        (defaults as Record<string, unknown>)[key],
        (saved as Record<string, unknown>)[key],
      );
    }
    return out as T;
  }

  return (typeof saved === typeof defaults ? saved : defaults) as T;
}
