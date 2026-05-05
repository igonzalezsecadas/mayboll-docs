## Parent

[PRD.md](../PRD.md)

## What to build

A working CLI entry point with an `init` command that scaffolds a self-contained Astro project in `./docs/`, wires up dark/light mode theming, and renders a homepage from `docs/content/index.md` using the shared layout. `dev` and `build` commands proxy to Astro's native commands.

This is the foundational vertical slice. After completing it, a user can:
- Run `mayboll-docs init` in a repo
- Write `docs/content/index.md`
- Run `mayboll-docs dev` to preview locally
- See a styled homepage with a working dark/light mode toggle that persists to `localStorage`

## Acceptance criteria

- [x] `npm install -g mayboll-docs` (or local dev equivalent) exposes a `mayboll-docs` CLI with `init`, `dev`, and `build` subcommands
- [x] `mayboll-docs init` creates the following in `./docs/`:
  - `package.json` with Astro and required dependencies (`@astrojs/mdx`, `pagefind`, `shiki`)
  - `astro.config.mjs` with a sensible default configuration
  - `src/layouts/DocLayout.astro` — the shared page layout with dark/light mode CSS custom properties (`--bg`, `--text`, `--accent`, etc.) and a theme toggle button
  - `src/pages/[...slug].astro` — a dynamic catch-all route that renders Markdown/MDX pages through `DocLayout`
  - `mayboll.config.mjs` — per-project customization file (project name, logo URL, accent colors, base path override) with sensible defaults
  - A symbolic link from `./docs/src/content/docs/` → `./docs/content/`
- [x] `docs/content/index.md` serves as the homepage and is rendered with the same `DocLayout` as every other page
- [x] `mayboll-docs dev` proxies to `astro dev` inside `./docs/`
- [x] `mayboll-docs build` proxies to `astro build` inside `./docs/`
- [x] The generated Astro project is a "normal" Astro project — users can `cd docs && npm install && npm run dev` directly without the CLI if they prefer
- [x] Theme toggle persists preference to `localStorage` and applies it on page load

## Blocked by

None — can start immediately
