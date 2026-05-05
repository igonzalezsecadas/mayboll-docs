---
title: Links
description: Write internal links using relative file paths and let Mayboll Docs rewrite them automatically.
order: 2
---

# Links

Mayboll Docs lets you write internal links using natural relative file paths. A remark plugin rewrites them to the correct output URLs during the build.

## Writing internal links

Link to other Markdown files using their relative paths, exactly as you would in GitHub's preview:

```markdown
Read the [getting started guide](./getting-started.md).

See the [API reference](../api-reference.md).

Jump to the [auth section](./api/auth.md).
```

## What gets rewritten

- Links ending in `.md` or `.mdx` are rewritten to directory-style URLs with a trailing slash.
- `index.md` links resolve to the directory itself, not `/index/`.

| Source link | Rewritten URL |
|-------------|---------------|
| `./getting-started.md` | `./getting-started/` |
| `./api/auth.md` | `./api/auth/` |
| `./index.md` | `./` |

## What is preserved

- **External URLs** (`https://`, `mailto:`, etc.) are left untouched.
- **Anchor links** (`#section-id`) are left untouched.
- **Non-Markdown links** (`./image.png`, `./config.json`) are left untouched.

## Benefits

This approach has two major advantages:

1. **GitHub preview compatibility** — Your links work when browsing Markdown files on GitHub.
2. **No broken URLs** — You never have to hardcode output paths or remember trailing-slash rules.

## Cross-page anchors

You can combine file links with anchors:

```markdown
See the [auth section](./api/auth.md#token-based-auth).
```

This is rewritten to `./api/auth/#token-based-auth`.