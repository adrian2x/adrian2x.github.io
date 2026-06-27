# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog at <https://adrian2x.github.io/>, built with Astro 6 + the
[AstroPaper](https://github.com/satnaing/astro-paper) theme (MIT). Static site
deployed to GitHub Pages. The previous (Jan 2023) site lives on the
`legacy-2023-demo` branch.

## Commands

Package manager is **pnpm** (pinned via `packageManager` + `engines.node >=22.12`).

- `pnpm dev` — dev server at http://localhost:4321 (live reload)
- `pnpm build` — `astro check` (typecheck) + `astro build` + Pagefind search index, then copies the index into `public/`. This is exactly what CI runs.
- `pnpm preview` — serve the production build locally
- `pnpm lint` — ESLint (`no-console` is an **error**; don't leave `console.*` in committed code)
- `pnpm format` / `pnpm format:check` — Prettier (includes `prettier-plugin-astro` + Tailwind class sorting)

CI (`.github/workflows/ci.yml`) runs lint → format:check → build on every PR and **must pass**. Deploy (`deploy.yml`) builds and publishes to Pages on push to `main` — no manual step.

There is no test suite. "Verification" here means `pnpm build` succeeds (it typechecks) and the page looks right in `pnpm dev`.

## Authoring posts

Posts are a content collection in `src/content/posts/` (`.md` / `.mdx`). Files prefixed with `_` are ignored by the loader. The frontmatter schema is enforced by Zod in `src/content.config.ts` — required fields are `title`, `description`, `pubDatetime`; common optional ones are `tags`, `featured`, `draft`, `modDatetime`, `ogImage`, `timezone`.

Publish behavior (driven by `pubDatetime` + `postFilter.ts`):
- Past date → published, sorted by date.
- Future date → hidden until it passes (scheduled post; margin is `posts.scheduledPostMargin` in `astro-paper.config.ts`).
- `draft: true` → never built.

Use `.mdx` (not `.md`) when embedding components.

## Architecture

**Config flows in two layers — edit the right one.**
- `astro-paper.config.ts` — the user-facing config (site title/description/author, socials, share links, feature flags). **Edit this** for site-level changes. Type-checked via `defineAstroPaperConfig` from `src/types/config.ts`.
- `src/config.ts` — internal resolved config that applies defaults over the user config and exports `ResolvedAstroPaperConfig`. Imported everywhere as `@/config`. Don't hand-edit unless changing default-resolution logic.
- `astro.config.ts` — Astro-level concerns: integrations (MDX, sitemap, Tailwind via Vite), Markdown/MDX remark/rehype plugins, Shiki transformers, fonts, `astro:env` vars.

**Path alias:** `@/*` → `src/*` (and `@/astro-paper.config`). Defined in `tsconfig.json`; use it instead of long relative paths. TS config extends `astro/tsconfigs/strict`.

**Content → pages.** `src/content.config.ts` defines two collections: `posts` and `pages`. Routes under `src/pages/` (`posts/[...slug]`, `tags/[tag]`, `archives/`, `index.astro`, `search.astro`) consume them. The post-listing pipeline lives in `src/utils/` — `getSortedPosts`, `postFilter` (draft/scheduled logic), `getUniqueTags`, `getPostPaths`, `slugify` — keep filtering/sorting logic there rather than inlining it in pages.

**Search** is [Pagefind](https://pagefind.app/), indexed at build time over `dist` and served from `public/pagefind/` (gitignored / excluded from typecheck). It only works against a real build, not `astro dev`.

**OG images** are generated dynamically with Satori (`src/pages/og.png.ts`, `src/pages/posts/[...slug]/`), gated by the `dynamicOgImage` feature flag. Fonts for this are resolved via `getFontPathByWeight.ts`.

**Theme/dark mode** toggle logic is client-side in `src/scripts/theme.ts`.

## Conventions

- No em dashes anywhere (use `-`). No `console.*` in committed code (lint fails).
- Match existing Astro component style; let Prettier handle formatting (run `pnpm format` before committing).
