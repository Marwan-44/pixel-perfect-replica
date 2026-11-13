# RAQEEB

**Smarter Care. Safer Treatment. Better Outcomes.**

RAQEEB is an AI-powered healthcare platform that supports cancer treatment monitoring through intelligent toxicity assessment, clinical decision support, and continuous patient follow-up. This repository is the project's public website: a bilingual (English / Arabic, with RTL support) landing page that presents the patient mobile app and the doctor dashboard.

Graduation project, October 6 University.

## Tech stack

- React + TypeScript
- [TanStack Start](https://tanstack.com/start) / TanStack Router, built with Vite
- Tailwind CSS and shadcn/ui components
- Vitest for tests

The site was created with [Lovable](https://lovable.dev) and stays in sync with it: commits pushed to `main` appear in the Lovable editor.

## Development

You need Node.js and npm (or Bun, a `bun.lock` is included).

```sh
git clone https://github.com/Marwan-44/pixel-perfect-replica.git
cd pixel-perfect-replica
npm i
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run test`.

## Project structure

| Path | What it holds |
| --- | --- |
| `src/components/site/` | The public page sections (navbar, hero, about, features, and so on) |
| `src/components/editor/` | The built-in Website Editor (`/editor`) |
| `src/content/` | Default text in English (`defaults-en.ts`) and Arabic (`defaults-ar.ts`), links, and image defaults (`defaults.ts`) |
| `src/assets/` | Illustrations bundled with the site |
| `public/images/` | Screenshots served as-is (see below) |

## Updating the site content

There are two ways to change what the site shows, and they behave differently.

### 1. Website Editor (`/editor`), local to one browser

Text, images, and links edited here are saved in the **browser that made the change** (localStorage and IndexedDB). Other visitors do not see them. Use it to preview changes, not to publish them.

### 2. Repository files, visible to everyone

**Screenshots.** Add the real screenshots to `public/images/` with these exact names:

- `public/images/app/screen-01.png` to `screen-06.png`: patient app screens (portrait)
- `public/images/dashboard/dashboard-01.png` to `dashboard-05.png`: doctor dashboard screens (landscape)

The site loads them automatically. To replace one, upload a file with the same name.

**Text.** Edit `src/content/defaults-en.ts` and `src/content/defaults-ar.ts`. Keep both languages in sync.

**Links.** Project links (demo video, LinkedIn, GitHub, email), team member links, and the supervisor link are defined in `src/content/defaults.ts` and its types in `src/content/types.ts`.

**Other images** (logo, hero screens, team photos, supervisor photo) have empty defaults. To make one permanent, import the image from `src/assets/` in `src/content/defaults.ts`, or point the entry to a file under `public/images/`.

## Deployment

Publishing is handled through Lovable. Any commit on `main` syncs to the Lovable project, so avoid force pushes or rewriting already-pushed history.
