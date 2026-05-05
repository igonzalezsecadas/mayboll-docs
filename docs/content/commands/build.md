---
title: build
description: Build the documentation site for production.
order: 3
---

# `mayboll-docs build`

Builds your documentation site for production and indexes the content for search.

## Usage

```bash
mayboll-docs build
```

## What it does

1. **Builds the static site** — Runs `npx astro build` inside `./docs/`, producing static HTML in `docs/dist/`.
2. **Indexes for search** — Runs Pagefind over the built output so the client-side search modal can find content.

## Output

The production build is written to `docs/dist/`. This directory contains:

- Static HTML pages for every Markdown file
- CSS and JavaScript bundles
- The `pagefind/` search index

## Draft exclusion

Pages with `draft: true` in their frontmatter are omitted from the production build. They still appear when running `mayboll-docs dev`.

## Hosting the output

The `docs/dist/` folder is a static site that can be hosted anywhere. The generated GitHub Actions workflow deploys it to GitHub Pages automatically, but you can also:

- Copy `docs/dist/` to any static host (Netlify, Vercel, Cloudflare Pages, etc.)
- Serve it locally with `npx serve docs/dist`

## Troubleshooting

### Build fails

Ensure dependencies are installed inside `./docs/`:

```bash
cd docs && npm install
```

### Search indexing fails

If Pagefind indexing fails, the build still completes but search will not work. Check that the `dist/` directory was created successfully and that `pagefind` is installed.