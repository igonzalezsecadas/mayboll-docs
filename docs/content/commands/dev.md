---
title: dev
description: Start the local development server.
order: 2
---

# `mayboll-docs dev`

Starts Astro's development server so you can preview your documentation site locally.

## Usage

```bash
mayboll-docs dev
```

## What it does

`dev` proxies to `npx astro dev` inside the `./docs/` directory. It starts a local server with hot module replacement, so changes to your Markdown files or components are reflected instantly in the browser.

## Requirements

You must run `mayboll-docs init` first. If `./docs/` does not exist, the command exits with an error.

## Common workflow

```bash
# Terminal 1 — keep the dev server running
mayboll-docs dev

# Terminal 2 — edit your docs
vim docs/content/getting-started.md
```

Open the URL printed by the dev server (usually `http://localhost:4321`) in your browser.

## Draft pages

Pages marked with `draft: true` in their frontmatter are visible during development but excluded from production builds. This lets you preview unfinished content before publishing it.