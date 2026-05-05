## Parent

[PRD.md](../PRD.md)

## What to build

Add authoring controls: YAML frontmatter parsing, MDX support, per-project customization via `mayboll.config.mjs`, a `--flat` flag for `init`, and draft filtering. This slice empowers authors to control page metadata, sort order, visibility, and sidebar presentation without touching generated files.

After completing this slice, a user can:
- Add `title`, `description`, `order`, `draft`, or `sidebar_label` to frontmatter
- Write interactive pages in `.mdx`
- Run `mayboll-docs init --flat` to flatten the sidebar hierarchy
- Customize the project name, logo, and accent color in `mayboll.config.mjs`
- Mark pages as drafts and have them hidden from production builds

## Acceptance criteria

- [x] Frontmatter fields are supported and behave as follows:
  - `title` (string): overrides the auto-derived page title
  - `description` (string): used for `<meta name="description">`
  - `order` (number, default 0): overrides alphabetical sorting within a directory; lower values appear first
  - `draft` (boolean, default false): when `true`, the page is excluded from production builds but visible in development
  - `sidebar_label` (string): overrides the title shown in the sidebar for this page only
- [x] `.mdx` files are supported via `@astrojs/mdx` and render through the same layout as `.md` files
- [x] `mayboll.config.mjs` is read at build time and its values are consumed by the layout/theme:
  - `projectName` (string)
  - `logo` (string, URL or path)
  - `accentColor` (string, CSS color value)
  - `base` (string, optional override for Astro `base` config)
- [x] `mayboll-docs init --flat` scaffolds the project so that all pages appear as top-level sidebar items, ignoring directory nesting in the sidebar (directory nesting on disk and in URLs is preserved)
- [x] Pages marked `draft: true` return 404 in production builds but render normally in `mayboll-docs dev`

## Blocked by

- [002-multi-page-navigation.md](./002-multi-page-navigation.md)
