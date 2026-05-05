---
title: Frontmatter
description: Control page titles, descriptions, sort order, and draft status with YAML frontmatter.
order: 1
---

# Frontmatter

Every Markdown or MDX file can include optional YAML frontmatter at the top of the file, delimited by `---`.

## Supported fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | Derived from filename | The page title used in `<title>`, TOC, and auto-generated index listings. |
| `description` | `string` | — | Meta description for SEO and social sharing. |
| `order` | `number` | `0` | Sort order within the parent directory. Lower numbers appear first. |
| `draft` | `boolean` | `false` | If `true`, the page is hidden in production builds but visible in development. |
| `sidebar_label` | `string` | `title` or filename | Label shown in the sidebar. Overrides `title` for navigation only. |

## Example

```markdown
---
title: Authentication API
description: How to authenticate requests to the REST API.
order: 1
draft: false
sidebar_label: Auth
---

# Authentication

Your content here...
```

## Title derivation

If you omit `title`, the page title is derived from the filename using kebab-case to Title Case conversion:

| Filename | Derived title |
|----------|---------------|
| `getting-started.md` | Getting Started |
| `api-reference.md` | Api Reference |
| `my-file.md` | My File |

For better titles, set `title` explicitly in frontmatter.

## Sorting

Within each directory, pages and subdirectories are sorted by `order` (ascending), then alphabetically by filename. Use `order` to pin important pages to the top of a section.

## Drafts

Mark a page as a draft to hide it from production builds while you work on it:

```markdown
---
draft: true
---
```

Drafts are always visible when running `mayboll-docs dev`, so you can preview them locally before publishing.