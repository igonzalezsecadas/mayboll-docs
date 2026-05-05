---
title: Quickstart
description: Scaffold your first documentation site in under a minute.
order: 2
---

# Quickstart

This guide walks you from zero to a running documentation site in about a minute.

## 1. Initialize the site

In the root of your project (where you keep your Markdown docs), run:

```bash
mayboll-docs init
```

This creates a `./docs/` directory containing:

- A self-contained Astro project
- A `docs/content/` directory for your Markdown source files
- A symlink bridging `docs/content/` into Astro's content collection
- A `docs/content/index.md` starter homepage
- A `.github/workflows/deploy.yml` file for GitHub Pages deployment

If your project has a Git remote, Mayboll Docs auto-detects your repository name and configures the correct base path for GitHub Pages.

## 2. Preview locally

```bash
mayboll-docs dev
```

This starts Astro's dev server. Open the URL printed in your terminal (usually `http://localhost:4321`) to see your site.

## 3. Write some content

Edit `docs/content/index.md` to customize your homepage. Add more `.md` or `.mdx` files to `docs/content/` and they automatically appear in the sidebar.

For example:

```bash
echo "# API Reference\n\nThis page documents the public API." > docs/content/api-reference.md
```

Refresh the dev server to see the new page.

## 4. Build for production

```bash
mayboll-docs build
```

This produces a static site in `docs/dist/` and indexes it for search with Pagefind.

## 5. Deploy to GitHub Pages

If `init` generated a workflow file, commit it along with the rest of your code and push to `main`:

```bash
git add docs/ .github/workflows/deploy.yml
git commit -m "Add documentation site"
git push origin main
```

Enable GitHub Pages in your repository settings (source: GitHub Actions) and your site will deploy automatically on every push.

## What's next?

- [Learn the CLI commands](/commands/init/)
- [Customize your site](/configuration/)
- [Organize your content](/writing-content/organization/)