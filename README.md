# Fiverr Gig Thumbnail Creator

A browser-based tool to design **1280 × 769 px** gig cover images for [Fiverr](https://www.fiverr.com/) (and similar marketplaces). Pick a layout, customize copy and colors, drop in your photos and logos, preview at different zoom levels, and **download a PNG** ready to upload—without Photoshop or Figma.

**Live app:** [https://gig-thumbnail-generator.vercel.app](https://gig-thumbnail-generator.vercel.app)

---

## Why this project exists

Selling on Fiverr means your **gig image** is often the first thing buyers see. A clear, on-brand thumbnail improves clicks and trust, but not everyone wants to maintain design files or pay for templates elsewhere.

This app was built to:

- **Save time** — reusable layouts tuned to Fiverr’s image proportions so you are not cropping or guessing sizes by hand.
- **Stay consistent** — same canvas dimensions and structure across gigs (Software and Graphics templates today; more slots planned).
- **Work locally** — your images are handled in the browser; export uses the preview you see.

It is a focused editor, not a general-purpose design suite: opinionated templates, fast iteration, one-click PNG export.

---

## What you can do

| Capability | Details |
|------------|---------|
| **Canvas** | Fixed **1280 × 769** px (Fiverr-style gig image aspect). |
| **Categories** | **Software Development**, **Graphics & Design**, **Digital Marketing** — three template slots each in the UI. |
| **Templates** | **Software** has **three** layouts; **Graphics & Design** has **three** (“Vector poster”, “UX device frame”, “Flow hybrid”); Marketing slots are still placeholders. |
| **Customization** | Per template: headlines, colors, service lists, hero/brand images, tech-stack icons, footers, etc. (depends on template). |
| **Preview** | Live preview with adjustable zoom; **Download PNG** uses [`html-to-image`](https://github.com/bubkoo/html-to-image) to rasterize the same frame. |
| **Language** | **English** and **French** UI (i18n). |
| **Theme** | Light / dark / system (via `next-themes`). |

---

## Tech stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** + **shadcn/ui** (Radix-based components)
- **Zustand** — editor state (active category/template, per-template settings)
- **Framer Motion** — light UI motion where used
- **i18next** — translations (`src/locales/en.json`, `fr.json`)
- **Sonner** — toasts (e.g. invalid or oversized image uploads)

---

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) (LTS recommended) and npm.

```bash
# Install dependencies
npm install

# Dev server with HMR
npm run dev

# Production build (output in dist/)
npm run build

# Preview the production build locally
npm run preview
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## Project layout (high level)

| Path | Role |
|------|------|
| `src/App.tsx` | Shell: header, sidebar (categories + template picker + controls), preview pane. |
| `src/components/thumbnail-preview.tsx` | Scaled preview + zoom + PNG download. |
| `src/stores/editor-store.ts` | Active template and settings map. |
| `src/templates/registry.ts` | All templates: defaults, `View`, `Controls`, `ready` vs `placeholder`. |
| `src/templates/software/*` | Software Development layouts (`software-1` … `software-3`). |
| `src/templates/graphics/*` | Graphics & Design layouts (`graphics-1` … `graphics-3`). |
| `src/templates/placeholder/*` | Placeholder canvas + minimal controls for unfinished templates. |
| `src/assets/` | Bundled images used by templates (e.g. hero artwork). |
| `src/locales/` | UI strings for EN / FR. |

Adding a new **ready** template means: extend `TemplateId` / `TemplateSettingsMap`, register defaults and components in `registry.ts`, and add any new copy keys to the locale files.

---

## Image uploads

Uploaded images are read in the browser and stored as **data URLs** in application state (in-memory). Use **PNG**, **JPEG**, or **SVG**; oversized files are rejected with a toast (see app limits in `src/lib/files/image-data-url.ts`).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server. |
| `npm run build` | Typecheck + production bundle. |
| `npm run preview` | Serve `dist/` locally. |
| `npm run lint` | Run ESLint. |

---

## License

This repository is **private** (`package.json`). If you publish it later, add a `LICENSE` file and update this section.

---

## Acknowledgements

- UI built with [shadcn/ui](https://ui.shadcn.com/) patterns and [Lucide](https://lucide.dev/) icons.
- PNG export powered by [html-to-image](https://github.com/bubkoo/html-to-image).
