# Mayboll Docs — Product Requirements Document

## Problem Statement

I maintain multiple GitHub projects, each with documentation written in Markdown. Every time I want to publish a documentation site, I have to scaffold an Astro project, configure it, set up a sidebar, wire up dark mode, add syntax highlighting, configure GitHub Pages deployment, and repeat this boilerplate for every single repository. This is repetitive, error-prone, and fragments the maintenance burden across N projects. I need a standardized, reusable way to turn a directory of Markdown files into a polished, static documentation site deployed to GitHub Pages — without manually setting up Astro every time.

## Solution

**Mayboll Docs** is an npm-installable CLI tool that generates a static documentation site from a directory of Markdown/MDX files. The workflow is:

1. Write documentation in `docs/content/` as `.md` or `.mdx` files.
2. Run `mayboll-docs init` to scaffold an Astro project in `./docs/`.
3. Run `mayboll-docs dev` to preview locally, or push to GitHub to auto-deploy via the generated GitHub Actions workflow.

The CLI handles all boilerplate: Astro configuration, sidebar generation, dark/light mode theming, syntax highlighting, search indexing, link rewriting, and GitHub Pages deployment. The generated Astro project is self-contained and uses a hardcoded theme (dark and light modes) that can be customized per project via a simple config file.

## User Stories

1. As a developer with multiple GitHub projects, I want to generate a documentation site from a folder of Markdown files without manually configuring Astro, so that I can publish docs quickly and consistently across all my repositories.
2. As a documentation author, I want the sidebar navigation to automatically reflect the directory structure of my Markdown files, so that I don't have to manually maintain a navigation manifest.
3. As a documentation author with a small project, I want a `--flat` flag during initialization that makes all pages top-level in the sidebar, so that nested directories don't create unnecessary hierarchy.
4. As a documentation author, I want to optionally use YAML frontmatter in my Markdown files to override titles, descriptions, sort order, and visibility, so that I have fine-grained control without editing generated files.
5. As a reader of the documentation, I want a left sidebar that shows the documentation structure, so that I can navigate between pages easily.
6. As a reader, I want a right-side table of contents showing the H2 and H3 headings of the current page, so that I can jump to specific sections quickly.
7. As a reader, I want dark mode and light mode with a toggle that remembers my preference, so that I can read comfortably in different lighting conditions.
8. As a reader on a mobile device, I want a collapsible sidebar accessible via a hamburger menu in a minimal top bar, so that the documentation is usable on small screens.
9. As a documentation author, I want code blocks to be syntax-highlighted automatically, so that my examples are readable without extra configuration.
10. As a reader, I want a copy-to-clipboard button on code blocks, so that I can easily reuse example code.
11. As a reader, I want full-text search across all documentation pages, so that I can find content without manually browsing the sidebar.
12. As a documentation author, I want to write internal links using relative `.md` file paths (e.g., `./api/auth.md`), and have them automatically rewritten to the correct URL paths in the built site, so that links work both in GitHub's preview and in the deployed site.
13. As a project maintainer, I want the CLI to auto-detect my GitHub repository name and configure the correct base path for GitHub Pages, so that asset links work out of the box.
14. As a project maintainer, I want `mayboll-docs init` to generate a GitHub Actions workflow that builds and deploys the site to GitHub Pages on every push to `main`, so that documentation stays in sync with code changes automatically.
15. As a documentation author, I want to write MDX files when I need interactive or custom components, while keeping plain Markdown for everything else, so that I have flexibility without complexity.
16. As a reader clicking a sidebar section that contains sub-pages, I want to land on an auto-generated index page listing all pages in that section, so that I don't encounter a dead link.
17. As a documentation author, I want `index.md` in the content root to serve as the homepage, rendered with the same layout as other pages, so that there's no special-casing for the landing page.
18. As a project maintainer, I want the CLI to be written in TypeScript but kept simple and maintainable, so that I can understand and modify it even with limited TypeScript experience.
19. As a documentation author, I want the source Markdown files to live in `docs/content/` while the generated Astro project lives in `docs/`, so that source content is cleanly separated from build tooling.
20. As a project maintainer, I want to customize the project name/logo and color accents via a simple config file, so that each docs site has its own identity without forking the theme.

## Implementation Decisions

### CLI Architecture
- The CLI is implemented in **TypeScript/Node.js** and distributed as an npm package named `mayboll-docs`.
- The CLI remains thin: its primary responsibilities are scaffolding the Astro project, detecting GitHub repository metadata, and proxying to Astro's native `dev` and `build` commands. The heavy lifting (building, rendering, routing) is delegated to the scaffolded Astro project.
- Commands: `init [--flat]`, `dev`, `build`, `sync`.

### Astro Project Scaffolding
- `mayboll-docs init` generates a self-contained Astro project in `./docs/` at the repository root.
- The scaffolded project includes: `astro.config.mjs`, `package.json` with required dependencies, theme components (hardcoded), layout files, a dynamic catch-all route (`[...slug].astro`), and a GitHub Actions workflow file at the repository root.
- The theme is **hardcoded** into the scaffolded project (not a separate npm package), as the primary use case is personal/single-user. Updates to the default theme require re-running `init` or manual migration.
- A `mayboll.config.mjs` file is generated for per-project customization (project name, logo, accent colors, base path override).

### Content Directory and Symlink
- Source content lives in `./docs/content/` (author-managed).
- The Astro Content Collection convention expects files at `src/content/docs/`.
- During `init` and `sync`, the CLI creates a **symbolic link** from `./docs/src/content/docs/` → `./docs/content/`, bridging the author's preferred directory structure with Astro's requirements.

### Sidebar Generation
- Sidebar structure is derived from the directory tree of `./docs/content/`.
- Files and directories are sorted alphabetically by default.
- The `order` frontmatter field (numeric) overrides alphabetical sorting within a directory.
- File names are converted to page titles via kebab-case → Title Case transformation (e.g., `getting-started.md` → "Getting Started").
- The `title` and `sidebar_label` frontmatter fields override the auto-derived title.
- The `--flat` flag changes the Astro content collection configuration during scaffolding so that all pages appear as top-level sidebar items, ignoring directory nesting.
- A build-time script scans the content tree and generates a `sidebar.json` (or equivalent data structure) consumed by the layout component.

### Theme and Layout
- The theme is hardcoded into the scaffolded project with support for **dark mode and light mode**.
- Mode switching uses **CSS custom properties** (`--bg`, `--text`, `--accent`, etc.) and a `data-theme` attribute on the document root.
- A theme toggle button persists the user's preference to `localStorage`.
- **Desktop layout**: left sidebar (navigation) + main content area + right sidebar (static table of contents).
- **Mobile layout**: a minimal sticky top bar (hamburger menu, project name, theme toggle) + collapsible left sidebar overlay.
- The right sidebar displays H2 and H3 headings statically (no scroll-spy). It is generated at build time from page content.

### Homepage
- `docs/content/index.md` (or `README.md`) serves as the homepage.
- It is rendered with the same layout as every other page. No special hero/landing layout is provided.
- Authors who want a custom landing page can author it in MDX with inline components.

### Markdown Processing
- Both `.md` and `.mdx` files are supported via Astro's Content Collections and `@astrojs/mdx`.
- Frontmatter is optional. Supported fields: `title` (string), `description` (string), `order` (number, default 0), `draft` (boolean, default false), `sidebar_label` (string).
- Files marked `draft: true` are excluded from production builds but visible in development.

### Syntax Highlighting
- Code blocks are highlighted at **build time** using Shiki (Astro's default), producing static HTML with no runtime JavaScript for highlighting.
- The Shiki theme is configured to output CSS-variable-based colors that adapt to the active dark/light mode.

### Copy-to-Clipboard
- A lightweight Astro Island component (vanilla JS) is rendered alongside each code block, providing a copy button.

### Search
- **Pagefind** is integrated for client-side full-text search.
- The search index is built at build time (`astro build`).
- Pagefind runs post-build to index the static HTML output.

### Link Rewriting
- A remark/rehype plugin (or Astro integration) rewrites relative links ending in `.md` or `.mdx` to the correct output URL paths (trailing `/` for directory-style URLs).
- This allows authors to write natural file-relative links that work in GitHub's Markdown preview and resolve correctly in the built site.

### GitHub Pages Integration
- The CLI auto-detects the repository name from `git remote get-url origin` during `init` and sets the `base` path in `astro.config.mjs` accordingly.
- The detected base path is also written to `mayboll.config.mjs` as an explicit, documented override field.
- `mayboll-docs init` generates `.github/workflows/deploy.yml` (if `.github/workflows/` exists or can be created), configuring GitHub Actions to build the Astro project and deploy to GitHub Pages on pushes to `main`.

### Section Index Pages
- If a directory contains subdirectories or files but no `index.md`, a virtual/auto-generated index page is created at build time listing all child pages.
- This prevents dead navigation clicks and provides a landing point for each documentation section.

## Testing Decisions

- **Good tests** verify external behavior and observable outputs, not internal implementation details. For example: "given a directory of markdown files, the built site contains correctly linked HTML pages with a sidebar reflecting the directory structure."
- **CLI scaffolding module** will be tested: verify that `init` generates the expected file tree, that `base` path detection works for various git remote URL formats, and that `--flat` produces a different sidebar configuration.
- **Sidebar generation module** will be tested: verify that directory trees are correctly translated to nested navigation structures, that `order` frontmatter affects sorting, and that auto-generated index pages are injected where missing.
- **Link rewriting module** will be tested: verify that `.md` relative links are rewritten to trailing-slash URLs, and that external/internal anchors are preserved.
- **Frontmatter parsing module** will be tested: verify default values, type coercion, and draft filtering.
- The Astro theme components (UI/layout) are considered presentation layer and will be tested via visual/integration testing (build the site, assert on HTML structure) rather than unit tests.

## Out of Scope

- **Theme packages / theming system**: The theme is hardcoded. There is no plugin architecture for third-party themes.
- **Multi-language / i18n support**: No localization framework or multi-locale content collections.
- **Versioned documentation**: No support for multiple doc versions (e.g., v1, v2).
- **Scroll-spy on TOC**: The right sidebar TOC is static; highlighting the current heading during scroll is deferred.
- **Custom landing page layouts**: No special hero/banner layout for the homepage. Authors must use MDX if they want custom layouts.
- **Remote content sources**: Content must live in the repository's `docs/content/` directory. No fetching from CMSs, APIs, or external git repos.
- **Private GitHub Pages / authentication**: The generated workflow assumes public GitHub Pages.
- **Non-GitHub hosting**: While the static output can be hosted anywhere, the CLI's auto-detection and workflow generation are GitHub-centric.

## Further Notes

- The CLI code should prioritize readability and maintainability over clever abstractions. Use plain functions, descriptive names, and avoid advanced TypeScript features.
- The generated Astro project should be a "normal" Astro project after scaffolding — users can `cd docs && npm run dev` directly without the CLI if they prefer.
- Consider adding a `--dry-run` flag to `init` in the future to preview what files would be generated without writing them.
- Future enhancements (not part of this PRD) could include: scroll-spy, built-in callout/admonition components, custom footer injection, and social/SEO image generation.
