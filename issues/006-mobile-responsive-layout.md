## Parent

[PRD.md](../PRD.md)

## What to build

Make the documentation site responsive on small screens. Replace the persistent desktop sidebar with a collapsible overlay triggered by a hamburger menu in a minimal sticky top bar. Ensure the theme toggle and project identity remain accessible on mobile.

After completing this slice, a user can:
- Open the docs site on a phone and read content without horizontal scrolling
- Open and close the sidebar via a hamburger menu
- Toggle dark/light mode from the mobile top bar

## Acceptance criteria

- [x] On viewports below a defined breakpoint (e.g., 768px), the left sidebar is hidden by default
- [x] A minimal sticky top bar is present on mobile containing:
  - A hamburger menu button that toggles the sidebar overlay
  - The project name (from `mayboll.config.mjs`)
  - The dark/light mode toggle
- [x] Tapping the hamburger menu opens the left sidebar as a full-height overlay with a close button or tap-outside-to-close behavior
- [x] The right sidebar (TOC) is hidden on mobile or collapsed into a dropdown/disclosure pattern (either approach is acceptable; choose the simpler one)
- [x] Main content uses comfortable font sizes and readable line lengths on small screens
- [x] Code blocks are horizontally scrollable on mobile instead of breaking layout
- [x] The search box remains accessible on mobile (either in the top bar or inside the sidebar overlay)

## Blocked by

- [002-multi-page-navigation.md](./002-multi-page-navigation.md)
