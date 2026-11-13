# uploads/

Everything you can change without touching the code: screenshots, team photos, and links.

```
uploads/
├── info.json          project links, team links, supervisor link
├── app/                patient app screenshots (6 slots)
├── dashboard/          doctor dashboard screenshots (5 slots)
├── team/               team member photos (8 slots)
├── logo.png            optional, replaces the drawn RAQEEB logo
├── supervisor.jpg      optional, supervisor photo
├── hero-app.png        optional, phone screen in the top section
├── hero-dashboard.png  optional, dashboard screen in the top section
├── about.jpg           optional, replaces the About illustration
└── impact.jpg          optional, replaces the Impact illustration
```

PNG, JPG, JPEG, WebP and AVIF all work, in upper or lower case.

## Naming the files

**Numbered folders (`app/`, `dashboard/`, `team/`).** Start the file name with the slot number:

| File name                         | Goes to                            |
| --------------------------------- | ---------------------------------- |
| `1.png`, `01.png`, `screen-1.jpg` | slot 1                             |
| `03-home.webp`                    | slot 3                             |
| `team/2.jpg`                      | the second member in the team list |

Files without a number (for example raw phone screenshots) fill the slots that are still empty, in alphabetical order. Numbers above the slot count are ignored.

**Single images.** Use the exact names from the tree above (`logo`, `supervisor`, `hero-app`, `hero-dashboard`, `about`, `impact`).

## Names, roles and links (`info.json`)

Open `info.json` and edit the values in place. Empty values keep the default text (or hide the link).

- Project links: `email`, `linkedin`, `github`, `demoVideo`. You can write `github.com/name` without `https://`.
- `team`: same order as the team on the site, the first entry is the first member. Each has `name`, `role`, `bio`, `linkedin`, `github`. The `...Ar` fields (`nameAr`, `roleAr`, `bioAr`) are the Arabic version.
- `supervisor`: `name`, `title`, `bio`, `linkedin` (plus the `Ar` versions).

Member photos: put `team/1.jpg` for member 1, `team/2.jpg` for member 2, and so on.

## Publishing

```sh
npm run share
```

This starts the site, prints a public link you can send to anyone, and watches this folder. Every time you add or change something here it is committed and pushed to GitHub automatically (only this folder is committed).

- `npm run share -- --no-tunnel` skips the public link.
- `npm run share -- --no-publish` skips the automatic commit and push.
- `npm run publish:now` commits and pushes the current changes once.
- The public link works only while the command is running, and a new link is created each time.

If you used the Website Editor (`/editor`) in your browser before, it can still show old uploads on your own computer. Open `/editor` and press **Reset to Default** to see the folder contents.
