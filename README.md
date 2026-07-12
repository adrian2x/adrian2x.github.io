# adrian2x.github.io

Personal blog. Built with [Astro](https://astro.build) + the
[AstroPaper](https://github.com/satnaing/astro-paper) theme (MIT), deployed to
GitHub Pages at <https://adrian2x.github.io/>.

## Authoring a post

Posts live in `src/content/posts/` as `.md` or `.mdx`. Create a file and add
frontmatter:

```yaml
---
title: My post title
author: Adrian Cruz
pubDatetime: 2026-06-27T17:00:00Z # any date; see below
description: One-line summary shown in listings and SEO.
tags:
  - investing
draft: false # true = excluded from the build
featured: false # true = pinned on the homepage
---
```

### Publish-date control

- **Past date** → publishes immediately, sorted by that date.
- **Future date** → hidden until that time passes (scheduled post). The margin
  is `scheduledPostMargin` in `astro-paper.config.ts` (15 min).
- **`draft: true`** → never built, regardless of date.

Use `.mdx` instead of `.md` when you want to embed components.

## Local preview

```sh
pnpm install      # once
pnpm dev          # http://localhost:4321  (live reload)
pnpm build        # full production build + search index (what CI runs)
```

## Publishing

Push to `main`. `.github/workflows/deploy.yml` builds the site and deploys to
GitHub Pages. No manual step.

## Config

- `astro-paper.config.ts` — site title, description, author, socials, features.
- `astro.config.ts` — Astro integrations, Markdown/MDX, fonts.
