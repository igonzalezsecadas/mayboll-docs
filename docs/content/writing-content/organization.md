---
title: Organization
description: How to structure your docs/content/ directory for the best navigation experience.
order: 3
---

# Content Organization

Your documentation source lives in `docs/content/`. The directory structure directly determines the sidebar navigation and URL routing.

## Basic structure

```
docs/content/
├── index.md              # Homepage
├── getting-started.md    # Top-level page
├── guides/
│   ├── installation.md   # /guides/installation/
│   └── configuration.md  # /guides/configuration/
└── api/
    ├── index.md          # /api/
    └── endpoints.md      # /api/endpoints/
```

## File extensions

Use `.md` for plain Markdown and `.mdx` when you need to embed Astro components or JSX expressions.

## Homepage

`docs/content/index.md` (or `README.md`) serves as the homepage. It is rendered with the same layout as every other page. No special hero or landing layout is provided — if you want a custom landing page, author it in MDX with inline components.

## Directories and index pages

If a directory contains pages but no `index.md`, Mayboll Docs auto-generates an index page listing all child pages. This prevents dead navigation clicks and gives readers a landing point for each section.

## Flat sidebar

If you prefer a flat navigation structure with no nesting, pass `--flat` during initialization:

```bash
mayboll-docs init --flat
```

In flat mode, all pages appear as top-level sidebar items regardless of directory depth. Their order is controlled by the `order` frontmatter field.

## Best practices

- **Group related pages** into directories. The sidebar reflects this grouping automatically.
- **Name files descriptively**. The filename becomes the default page title (kebab-case → Title Case).
- **Use `order` sparingly**. Pin the most important pages to the top of each section; let alphabetical sorting handle the rest.
- **Avoid deeply nested structures**. Three levels of nesting is usually enough for most documentation sites.