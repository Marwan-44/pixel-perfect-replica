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

Other scripts: `npm run share`, `npm run build`, `npm run preview`, `npm run lint`, `npm run test`.

### Editing in GitHub Codespaces

The repo includes a dev container, so you can edit everything from the browser:

1. On the repo page, click **Code → Codespaces → Create codespace on main**.
2. Wait for the setup to finish. Dependencies install automatically and the dev server starts on port `8080` with a live preview.
3. Edit any file, upload images by dragging them into `uploads/` in the file explorer, then commit and push from the Source Control tab.

## Project structure

| Path | What it holds |
| --- | --- |
| `src/components/site/` | The public page sections (navbar, hero, about, features, and so on) |
| `src/components/editor/` | The built-in Website Editor (`/editor`) |
| `src/content/` | Default text in English (`defaults-en.ts`) and Arabic (`defaults-ar.ts`), links, and image defaults (`defaults.ts`) |
| `src/assets/` | Illustrations bundled with the site |
| `uploads/` | Screenshots, team photos and `info.json`: the files you change (see below) |
| `scripts/` | `share` (site + public link) and the automatic commit/push |
| `public/images/` | Older location for screenshots, still supported |

## Updating the site content

There are a few ways to change what the site shows, and they behave differently.

### 1. Website Editor (`/editor`), local to one browser

Text, images, and links edited here are saved in the **browser that made the change** (localStorage and IndexedDB). Other visitors do not see them. Use it to preview changes, not to publish them.

### 2. The `uploads/` folder, visible to everyone

Put screenshots, team photos and links in the [`uploads/`](uploads/README.md) folder:

- `uploads/app/` (patient app screenshots), `uploads/dashboard/` (doctor dashboard screenshots), `uploads/team/` (team photos): name files `1.png`, `2.png`, and so on to choose the slot, or leave raw names and they fill the slots in alphabetical order.
- `uploads/info.json`: project, team and supervisor links.
- Single images such as `logo.png` and `supervisor.jpg` are matched by name.

The full naming rules are in [`uploads/README.md`](uploads/README.md).

Run `npm run share` to start the site, get a public link that anyone can open, and have every change in `uploads/` committed and pushed automatically. `npm run publish:now` pushes the current changes once.

### 3. Text

Edit `src/content/defaults-en.ts` and `src/content/defaults-ar.ts`. Keep both languages in sync.

The older way still works too: screenshots saved as `public/images/app/screen-01.png` to `screen-06.png` and `public/images/dashboard/dashboard-01.png` to `dashboard-05.png` are used when `uploads/` has no image for that slot.

## Deployment

**GitHub Pages.** Every push to `main` runs `.github/workflows/pages.yml`, which builds a static copy of the site and publishes it at `https://<user>.github.io/<repo>/`. One-time setup: in the repository go to Settings, Pages, and set Source to **GitHub Actions**. The first run takes a couple of minutes; later runs happen by themselves, including the automatic pushes from `npm run share`.

**Lovable.** Publishing there is separate. Commits on `main` still sync to the Lovable project, so avoid force pushes or rewriting already-pushed history.
