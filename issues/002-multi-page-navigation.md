## Parent

[PRD.md](../PRD.md)

## What to build

Extend the scaffolded Astro project to support multiple Markdown pages in nested directories under `docs/content/`. A left sidebar is auto-generated from the directory tree at build time. Directories without an `index.md` receive an auto-generated section index page listing their child pages. The desktop layout shows sidebar + content + right sidebar placeholder.

After completing this slice, a user can:
- Create `docs/content/getting-started.md` and `docs/content/api/auth.md`
- Run `mayboll-docs dev`
- Navigate between pages via the left sidebar
- Click a directory in the sidebar and land on an auto-generated index page instead of a 404

## Acceptance criteria

- [x] Any `.md` or `.mdx` file under `docs/content/` (except `index.md` at root) is rendered as a routable page
- [x] A build-time script scans `docs/content/` and generates a `sidebar.json` (or equivalent data structure) consumed by the layout component
- [x] The left sidebar reflects the directory tree structure: directories are expandable sections, files are leaf links
- [x] Files and directories are sorted alphabetically by default
- [x] File names are converted to page titles via kebab-case → Title Case (e.g., `getting-started.md` → "Getting Started")
- [x] If a directory contains children but no `index.md`, a virtual index page is generated at build time listing all child pages with their titles and links
- [x] The root `docs/content/index.md` remains the homepage and does not appear in the sidebar
- [x] Desktop layout renders: fixed left sidebar (navigation) + scrollable main content area + right sidebar (static TOC placeholder — content comes in slice 4)

## Blocked by

- [001-init-and-homepage.md](./001-init-and-homepage.md)
