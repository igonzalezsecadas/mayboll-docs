---
title: init
description: Scaffold a new documentation site in ./docs/.
order: 1
---

# `mayboll-docs init`

Scaffolds a new Astro-based documentation site in a `./docs/` directory at your project root.

## Usage

```bash
mayboll-docs init [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--flat` | Flatten the sidebar so all pages appear as top-level items, ignoring directory nesting. |

## What it generates

### Astro project (`./docs/`)

A self-contained Astro project with all dependencies, configurations, and theme components:

- `astro.config.mjs` — Astro configuration with MDX, Shiki, and link rewriting.
- `package.json` — Dependencies (`astro`, `@astrojs/mdx`, `pagefind`, `unist-util-visit`).
- `tsconfig.json` — TypeScript configuration.
- `mayboll.config.mjs` — Per-project customization (name, logo, accent color, base path).
- `src/layouts/DocLayout.astro` — The main page layout with sidebar, TOC, and theme toggle.
- `src/pages/[...slug].astro` — Dynamic route for all documentation pages.
- `src/pages/index.astro` — Route for the homepage (`index.md`).
- `src/content/config.ts` — Content collection schema with frontmatter types.
- `src/lib/sidebar.ts` — Sidebar tree generation and directory index logic.
- `src/components/SidebarTree.astro` — Recursive sidebar navigation component.
- `src/components/Search.astro` — Pagefind search modal with ⌘K shortcut.
- `src/components/CopyButton.astro` — Copy-to-clipboard button for code blocks.

### Content directory (`./docs/content/`)

Your Markdown source files live here. `init` creates:

- `docs/content/index.md` — A starter homepage.
- A symlink from `docs/src/content/docs/` → `docs/content/` so Astro can consume the files.

### GitHub Actions workflow

If your repository already has (or can create) a `.github/workflows/` directory, `init` generates a `deploy.yml` workflow that builds and deploys to GitHub Pages on every push to `main`.

## GitHub repo detection

`init` runs `git remote get-url origin` to detect your GitHub repository. If found, it sets the correct `base` path in `astro.config.mjs` so asset links work on GitHub Pages (e.g. `/my-repo/`).

## Re-running init

If `./docs/` already exists, `init` exits with an error. Remove the directory first if you want to start fresh:

```bash
rm -rf docs
mayboll-docs init
```

> **Note:** Re-running `init` overwrites all generated files. Back up any customizations you made inside `./docs/` before doing this.