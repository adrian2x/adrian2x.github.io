---
title: Hello, world
author: Adrian Cruz
pubDatetime: 2026-06-27T17:00:00Z
featured: true
draft: false
tags:
  - meta
description: First post. How this blog is written and published.
---

This blog is built with [Astro](https://astro.build) and the
[AstroPaper](https://github.com/satnaing/astro-paper) theme, and it deploys to
GitHub Pages automatically on every push to `main`.

## Authoring

Posts are Markdown (`.md`) or MDX (`.mdx`) files in `src/content/posts/`. The
frontmatter at the top of this file controls everything:

- `pubDatetime` — set **any** date. A past date publishes immediately; a future
  date stays hidden until that moment passes (scheduled posts).
- `draft: true` — keep a post out of the build entirely.
- `featured: true` — pin it to the homepage.
- `tags` — group related posts.

MDX files can import and render components, so custom embeds are just a tag in
the body.

## Publishing

Save the file, push to `main`, and GitHub Actions builds and deploys. That's it.
