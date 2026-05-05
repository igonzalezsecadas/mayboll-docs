---
title: Installation
description: How to install the Mayboll Docs CLI globally or locally in your project.
order: 1
---

# Installation

## Global install (recommended)

Install the CLI once and use it across all your projects:

```bash
npm install -g mayboll-docs
```

This makes the `mayboll-docs` command available everywhere.

## Local install

If you prefer to pin the CLI version per project:

```bash
npm install --save-dev mayboll-docs
```

When installed locally, run it via `npx`:

```bash
npx mayboll-docs init
npx mayboll-docs dev
npx mayboll-docs build
```

## Requirements

- **Node.js** 18 or later
- **npm** (or `pnpm`, `yarn`)
- A Git repository with a remote named `origin` (optional, used for auto-detecting the GitHub Pages base path)

## Verify the installation

```bash
mayboll-docs --version
```

You should see the installed version printed to the console.