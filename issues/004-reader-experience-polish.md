## Parent

[PRD.md](../PRD.md)

## What to build

Polish the reader experience with full-text search, a static table of contents per page, syntax-highlighted code blocks with copy-to-clipboard buttons, and Shiki colors that adapt to the active theme.

After completing this slice, a user can:
- Search all documentation content from a search box in the UI
- See H2 and H3 headings in the right sidebar and jump to them
- Read syntax-highlighted code blocks that look correct in both dark and light mode
- Click a copy button to copy code block contents to the clipboard

## Acceptance criteria

- [x] Pagefind is integrated: `astro build` triggers a post-build Pagefind index generation step; the search UI is rendered as an Astro Island component in the layout
- [x] The search box is accessible from the top bar or sidebar and returns ranked results with page titles and snippets
- [x] The right sidebar displays H2 and H3 headings extracted from the current page's content at build time
- [x] TOC items are anchor links that jump to the corresponding heading in the main content
- [x] Code blocks are syntax-highlighted at build time using Shiki (Astro's default)
- [x] Shiki theme configuration outputs CSS-variable-based colors (e.g., `color: var(--shiki-token-keyword)`) so that code block colors adapt when the user toggles dark/light mode
- [x] Every code block is rendered with a small "Copy" button (Astro Island with vanilla JS); clicking it copies the raw code to the clipboard and shows brief visual feedback

## Blocked by

- [002-multi-page-navigation.md](./002-multi-page-navigation.md)
