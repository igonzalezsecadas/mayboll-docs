---
title: Deployment
description: Deploy your documentation site to GitHub Pages or any static host.
order: 5
---

# Deployment

Mayboll Docs generates a static site that can be hosted anywhere. The CLI includes built-in support for GitHub Pages via an auto-generated Actions workflow.

## GitHub Pages (recommended)

### 1. Enable Pages in repository settings

Go to **Settings → Pages** in your GitHub repository and set the source to **GitHub Actions**.

### 2. Push the workflow

`mayboll-docs init` generates `.github/workflows/deploy.yml` at your repository root. Commit and push it:

```bash
git add .github/workflows/deploy.yml docs/
git commit -m "Add documentation site"
git push origin main
```

### 3. Watch it deploy

On every push to `main`, GitHub Actions will:

1. Check out your code
2. Install dependencies in `./docs/`
3. Build the Astro site
4. Index the content with Pagefind
5. Deploy the `docs/dist/` output to GitHub Pages

The workflow URL is printed in the Actions tab of your repository.

### Base path handling

If your repository is served from a subpath (e.g. `https://username.github.io/repo-name/`), `init` auto-detects the repository name and sets the correct `base` path. If detection fails or you rename the repo later, update `base` in `docs/mayboll.config.mjs`.

## Custom domain

If you use a custom domain with GitHub Pages, set `base` to an empty string in `mayboll.config.mjs` and configure the custom domain in your repository settings. You may also need to add a `CNAME` file at the root of your repository.

## Other hosts

The `docs/dist/` directory is a plain static site. You can deploy it to any host that serves static files:

- **Netlify** — Drag and drop `docs/dist/` or connect your Git repo.
- **Vercel** — Use the static output from `docs/dist/`.
- **Cloudflare Pages** — Upload `docs/dist/` or connect your Git repo.
- **AWS S3 + CloudFront** — Sync `docs/dist/` to an S3 bucket.

Build locally first:

```bash
mayboll-docs build
```

Then upload the `docs/dist/` folder.

## Verifying the build

Before deploying, you can preview the production build locally:

```bash
cd docs && npx astro preview
```

This serves the contents of `docs/dist/` at a local URL so you can verify everything looks correct.