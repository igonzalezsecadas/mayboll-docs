---
title: Configuration
description: Customize your documentation site with mayboll.config.mjs.
order: 4
---

# Configuration

After running `mayboll-docs init`, a `mayboll.config.mjs` file is created inside `./docs/`. This is where you customize the look and feel of your site.

## Config file location

```
docs/
└── mayboll.config.mjs
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `projectName` | `string` | Site name displayed in the header, sidebar, and page titles. |
| `logo` | `string` | Path or URL to a logo image. Leave empty for text-only branding. |
| `accentColor` | `string` | Hex color for links, active states, and interactive elements. |
| `base` | `string` | Base path for GitHub Pages (e.g. `/my-repo/`). Auto-detected during `init`. |
| `flatSidebar` | `boolean` | If `true`, the sidebar shows all pages as top-level items. Set by `--flat` during `init`. |

## Example

```javascript
export default {
  projectName: 'My Project Docs',
  logo: '/logo.svg',
  accentColor: '#e11d48',
  base: '/my-project/',
  flatSidebar: false,
};
```

## Changing the accent color

The accent color is applied to links, active sidebar items, hover states, and focus rings. Pick a color that contrasts well with both light and dark backgrounds. The theme automatically computes a hover variant using CSS `oklch()`.

## Changing the base path

If you move your repository or rename it, update the `base` path to match the new GitHub Pages URL:

```javascript
export default {
  base: '/new-repo-name/',
};
```

For custom domains (no base path), set `base` to an empty string:

```javascript
export default {
  base: '',
};
```

## Re-initializing with different settings

`mayboll.config.mjs` is generated once during `init`. After that, you can edit it directly. If you want to change `flatSidebar`, edit the value in the config file — there is no need to re-run `init`.

> **Note:** If you delete `./docs/` and re-run `init`, your config changes will be lost. Consider committing `mayboll.config.mjs` to version control.