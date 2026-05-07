---
title: Welcome
description: Documentation for Mayboll Docs — a CLI tool that generates static documentation sites from Markdown files.
---

# Welcome to mayboll-docs

Mayboll Docs is a CLI tool that turns a directory of Markdown (or MDX) files into a polished, static documentation site. It scaffolds a pre-configured Astro project so you never have to wire up sidebar generation, dark mode, syntax highlighting, search, or GitHub Pages deployment by hand.

## What it does

1. You write documentation in `docs/content/` as `.md` or `.mdx` files.
2. You run `mayboll-docs init` once to scaffold the site.
3. You run `mayboll-docs dev` to preview, or push to GitHub to auto-deploy.

The CLI handles the boilerplate: Astro configuration, sidebar generation, theming, syntax highlighting, search indexing, link rewriting, and deployment workflows.

## Who it is for

- Developers who maintain multiple GitHub projects and want consistent documentation sites across all of them.
- Teams that want a docs site without learning Astro's internals.
- Anyone who prefers writing Markdown over configuring build tools.

## Key features

- **Auto-generated sidebar** — Reflects your `docs/content/` directory structure.
- **Dark & light mode** — CSS-variable-based theming with a persisted toggle.
- **Syntax highlighting** — Shiki-powered code blocks that adapt to the active theme.
- **Copy-to-clipboard** — One-click copy on every code block.
- **Full-text search** — Pagefind-powered client-side search with a ⌘K shortcut.
- **Link rewriting** — Write relative `.md` links; they resolve correctly in the built site.
- **Auto index pages** — Directories without an `index.md` get a generated listing page.
- **GitHub Pages ready** — Auto-detects your repo name and generates a deploy workflow.
- **Mobile responsive** — Collapsible sidebar with a hamburger menu on small screens.
- **MDX support** — Drop in Astro components when you need interactivity.

## Next steps

- [Install the CLI](/getting-started/installation/)
- [Run through the quickstart](/getting-started/quickstart/)
- [Learn how to write content](/writing-content/frontmatter/)
