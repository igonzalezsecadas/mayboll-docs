## Parent

[PRD.md](../PRD.md)

## What to build

Add link rewriting so authors can use natural relative `.md`/`.mdx` file paths in their Markdown, and automate GitHub Pages deployment. The CLI auto-detects the repository name from git remotes during `init` and generates a GitHub Actions workflow for continuous deployment.

This slice requires a human-in-the-loop step: enabling GitHub Pages in repository settings after the workflow is generated.

After completing this slice, a user can:
- Write `[Auth docs](./api/auth.md)` and have it resolve to the correct built URL
- Push to `main` and have GitHub Actions build and deploy the docs site automatically

## Acceptance criteria

- [x] A remark/rehype plugin (or Astro integration) rewrites relative links ending in `.md` or `.mdx` to the correct output URL paths with trailing `/` (directory-style URLs)
  - Example: `./getting-started.md` → `./getting-started/`
  - Example: `../api/auth.md` → `../api/auth/`
  - External URLs, anchor-only links (`#section`), and non-`.md`/`.mdx` links are left untouched
- [x] `mayboll-docs init` auto-detects the repository name and owner from `git remote get-url origin`:
  - Supports HTTPS (`https://github.com/owner/repo.git`) and SSH (`git@github.com:owner/repo.git`) formats
  - Sets the Astro `base` config to `/repo-name`
  - Writes the detected base path to `mayboll.config.mjs` as an explicit, documented override field
- [x] `mayboll-docs init` generates `.github/workflows/deploy.yml` at the repository root (creating `.github/workflows/` if needed)
  - The workflow triggers on push to `main`
  - It checks out the repo, installs Node.js, installs dependencies in `./docs/`, runs `astro build`, and deploys to GitHub Pages using `actions/deploy-pages`
- [x] The generated workflow assumes a public GitHub Pages site (private Pages / auth is out of scope)

## Blocked by

- [001-init-and-homepage.md](./001-init-and-homepage.md)
