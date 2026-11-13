/**
 * Every image found in the `uploads/` folder, keyed by its path inside that folder
 * (for example `app/1.png`). Vite picks up new files while `npm run dev` is running.
 * Both lower and upper case extensions are listed because the glob is case sensitive.
 */
const found = import.meta.glob("/uploads/**/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const uploadFiles: Record<string, string> = Object.fromEntries(
  Object.entries(found).map(([path, url]) => [path.replace(/^\/uploads\//, ""), url]),
);
