# mayboll-docs

Generate static documentation sites from Markdown files. No Astro configuration required.

## What is it?

mayboll-docs is a CLI tool that turns a directory of Markdown (or MDX) files into a polished, deployable documentation site. It scaffolds a pre-configured Astro project with a sidebar, dark mode, syntax highlighting, full-text search, copy-to-clipboard buttons, and GitHub Pages deployment — all from a single command.

## Quick Start

```bash
# Install the CLI
npm install -g mayboll-docs

# Scaffold a docs site in your project
mayboll-docs init

# Start the dev server
mayboll-docs dev

# Build for production
mayboll-docs build
```

After `init`, write your documentation in `docs/content/` as `.md` or `.mdx` files. The sidebar, search index, and navigation are generated automatically from your file structure.

## Features

- **Zero-config Astro setup** — `init` scaffolds everything.
- **Auto sidebar** — Navigation reflects your `docs/content/` directory tree.
- **Dark & light mode** — Toggle with persisted preference.
- **Syntax highlighting** — Shiki-powered, theme-aware code blocks.
- **Copy-to-clipboard** — One-click copy on every code block.
- **Full-text search** — Pagefind-powered client-side search (⌘K).
- **Link rewriting** — Write `.md` relative links; they resolve correctly in the built site.
- **Auto index pages** — Empty directories get an auto-generated listing page.
- **GitHub Pages ready** — Auto-detects repo name and generates a deploy workflow.
- **Mobile responsive** — Collapsible sidebar on small screens.
- **MDX support** — Use Astro components inline when you need them.

## Commands

| Command | Description |
|---------|-------------|
| `mayboll-docs init [--flat]` | Scaffold a new docs site in `./docs/` |
| `mayboll-docs dev` | Start the Astro dev server |
| `mayboll-docs build` | Build for production and index search |

## Project Structure

```
.
├── docs/                    # Generated Astro project
│   ├── content/             # Your markdown source files
│   ├── src/
│   ├── dist/                # Build output
│   └── mayboll.config.mjs   # Site customization
├── .github/workflows/
│   └── deploy.yml           # Auto-generated GH Pages workflow
└── ...
```

## Documentation

Full docs are in the [`docs/content/`](./docs/content/) directory of this repo.

## License

MIT
