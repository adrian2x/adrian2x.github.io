---
title: How much CSS does a good-looking website need?
author: Adrian Cruz
pubDatetime: 2022-11-24T03:10:15Z
featured: false
draft: false
tags:
  - css
  - web
  - side-projects
description: I built atomic-theme, a modular CSS theme, then measured how far each kilobyte goes - from a 650-byte reset to the whole thing in 4.6KB gzipped.
---

A while back I read swyx's post,
[100 bytes of CSS to look great everywhere](https://swyx.io/css-100-bytes). The
pitch is right there in the title: a handful of CSS rules that take a plain,
unstyled page and make it readable on basically any screen. No framework, no build
step, just width, spacing, and a bigger font.

It's part of a small tradition. There's
[motherfuckingwebsite.com](https://motherfuckingwebsite.com/), which is gloriously
naked HTML making the point that you might not need much. Then
[the "better" version](http://bettermotherfuckingwebsite.com/) adds about seven
lines of CSS and suddenly it looks like a real website. Seven lines! The whole
genre is basically "look how far a little goes."

I nodded along the whole way through. And then, because I have a problem, I
thought: what if a little went a _little_ further?

That turned into [`atomic-theme`](https://github.com/Atomic-stack/atomic-theme), a
tiny modular CSS theme. This is the story of how I built it - mostly a story about
deleting things - plus a tally of how few bytes each piece actually costs.

## The before and after

Here's the whole reason any of this exists. Same HTML, side by side. On the left,
the raw thing your browser gives you. On the right, the exact same markup with one
line added to the `<head>` and the body wrapped in a `.container` to center it:

```html
<link rel="stylesheet" href="https://unpkg.com/atomic-theme" />
...
<body>
  <div class="container"><!-- your content --></div>
</body>
```

<figure style="position:relative;left:50%;transform:translateX(-50%);width:min(1200px,94vw);margin:2rem 0">
  <img
    src="/images/atomic-theme-before-after.png"
    alt="Two browser windows side by side showing the same Pale Blue Dot page. On the left, unstyled HTML in the browser default serif. On the right, the same page with atomic-theme: a centered column, larger sans-serif headings, and a dark background."
    loading="lazy"
    style="display:block;width:100%;height:auto;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.12)"
  />
  <figcaption style="margin-top:0.6rem;text-align:center;font-size:0.9em;opacity:0.7">
    Same HTML, two browsers. Left is raw. Right is one stylesheet link plus a
    <code>.container</code> wrapper - here on a system set to dark mode.
  </figcaption>
</figure>

That screenshot is only one page. If you'd rather poke at the real thing, there's a
[full live demo](https://atomic-stack.github.io/theme/) with every component - nav,
forms, cards, dialogs, and the rest - on a single page.

## Step one: start from normalize, then subtract

I didn't start from a blank file. I started from
[modern-normalize](https://github.com/sindresorhus/modern-normalize), which is the
sane, up-to-date cousin of the old `normalize.css` everyone used to paste in.

Then I did the fun part: I started deleting.

A lot of what classic resets do is fix browsers that, frankly, don't exist anymore.
Every modern browser agrees on a pile of things they used to fight about, so all
those defensive little rules are just dead weight today. So I made one rule for
myself: if the browser already gets it right, the line goes. What's left is a
`normalize.scss` that mostly just sets `box-sizing` to `border-box` and gets out of
the way. Subtraction as a feature.

And that file keeps shrinking. The browser vendors have been converging on sensible
defaults - through [Interop](https://web.dev/blog/interop-2024) and other efforts to
agree on how the basics should behave - so every year there's a little less for a
reset to fix. A few versions from now the normalize layer might be empty enough to
drop entirely. The web fixing its own defaults is the best kind of deletion: the
one you don't have to do yourself.

## Step two: make everything a knob

The next thing I wanted was for the whole look to be tweakable without editing the
framework. So the foundation is a pile of CSS variables in `:root`, and every other
rule reads from them instead of hardcoding values.

```css
:root {
  --font-family: system-ui, sans-serif;
  --font-size: 1rem;
  --line-height: 1.6;
  --measure: 70ch; /* the readable line length */
  --primary: #0088ff;
}
```

There's a `root` layer for the variables, a `base` layer that applies them to bare
elements, and a `media-queries` layer for the responsive bits. Want a different
accent color or a wider column? Override one variable and the whole theme follows.
One perk of building on custom properties: the faded shades derive from the base
color with `color-mix`. The muted borders and dividers are literally `--font-color`
mixed with a little transparency, not a separate magic hex value. So when dark mode
flips the text to white, every faded shade follows on its own.

## Step three: use only what you need

This is where I wandered off the 100-bytes path. swyx's snippet is perfect
_because_ it stops. I wanted the stopping to be your choice instead of mine, so the
source is a handful of small SCSS files, and the build compiles each one to a
standalone `.css` you can link on its own. Files prefixed with `_` are partials -
they don't ship by themselves, they only get bundled into a bigger layer. You can
[browse the compiled CSS on unpkg](https://app.unpkg.com/atomic-theme@1.1.1/files/css)
and read along.

A couple of those files are bundles, which is the part worth understanding:

- **`root.css`** is the batteries-included foundation. It pulls in the variables,
  `normalize`, `base`, and every component (`nav`, `forms`, `button`, `card`,
  `dialog`) so one link gets you a site that looks good _and_ handles the things
  people click.
- **`utilities.css`** rolls up the three sugar layers - `effects`, `transitions`,
  and `animations`.
- **`index.css`** is everything: `root` plus `typography`, `layout`, and
  `utilities`. It's what you get from the bare `unpkg.com/atomic-theme` link.

Everything else (`normalize`, `base`, `typography`, `layout`, `animations`) stands
on its own, so you can stack only the layers you want.

Now for the fun part: how little each layer costs. All numbers below are
**gzipped**, since that's how a CDN actually serves them.

The **normalize** layer is the floor - cross-browser fixes and `box-sizing`,
nothing else. About **650 bytes**. That's genuinely all some pages need.

For a couple hundred bytes more, **`base.css`** (**0.8 KB**) adds the opinions:
readable links, styled code and tables, a tidy scrollbar, sensible blockquotes, and
automatic dark mode. normalize plus base is roughly the
[seven-line-website](http://bettermotherfuckingwebsite.com/) level of polish, and
it's still under 1.5 KB combined.

Writing a static text article? Add **`typography.css`** (**under 300 bytes**) for
headings, lists, and a few font helpers, and the whole thing reads well for just
over a kilobyte total.

If your site has forms and buttons, **`root.css`** is the one to reach for. At
**2.4 KB** it bundles the whole interactive foundation - variables, `normalize`,
`base`, plus `nav`, `forms`, `button`, `card`, and `dialog` - so "looks good
everywhere" now includes the parts people actually tap and type into.

Then there are the extras. The **`layout.css`** system - the Tailwind-inspired
flexbox and grid helpers (`.flex`, `.items-center`, column spans, `.w-50` and
friends) - is **1.4 KB**. Want just a little motion? **`animations.css`** on its own
is about **330 bytes**. Want the works - animations, transitions, and shadow
effects - that's the **`utilities.css`** bundle at **0.8 KB**.

And if you want all of it, **`index.css`** is everything: every layer above,
**4.6 KB** gzipped. That's the number I keep coming back to. The entire framework,
components and all, is smaller than a single icon font.

| File             | What it gives you                             | Gzipped |
| ---------------- | --------------------------------------------- | ------- |
| `normalize.css`  | minimal cross-browser reset                   | 0.6 KB  |
| `base.css`       | opinionated element defaults + dark mode      | 0.8 KB  |
| `typography.css` | headings, lists, font helpers                 | 0.3 KB  |
| `root.css`       | variables + normalize + base + all components | 2.4 KB  |
| `layout.css`     | flexbox + grid + spacing helpers              | 1.4 KB  |
| `animations.css` | keyframe animations                           | 0.3 KB  |
| `utilities.css`  | effects + transitions + animations            | 0.8 KB  |
| `index.css`      | everything                                    | 4.6 KB  |

The point of splitting it up: grab the whole thing from the CDN in one line and
move on, _or_ stack a couple of layers and ship under a kilobyte. Either way, you
never had to set up a build system.

## Why bother, when Tailwind exists?

Tailwind is great. So is Bootstrap. But both ask you to buy in - a toolchain, a
mental model, a way of writing your markup. Sometimes I just have a `.html` file and
an afternoon, and I want it to look decent without any of that ceremony.

That's the niche `atomic-theme` is going for: the "looks good everywhere" feeling of
the minimalist crowd, but modular, so you can take a little or a lot. It's the same
instinct behind my [Just HTML](https://atomic-stack.github.io/just-html/) page, a
tiny tour of how much you can do with plain elements before you reach for anything
fancy. `atomic-theme` is the next thought after that one: okay, now make the plain
stuff _pretty_, and let people opt in to the rest.

## Try it

One line in your `<head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/atomic-theme" />
```

Or `npm install atomic-theme` if you'd rather build your own slice of it. The code
is [on GitHub](https://github.com/Atomic-stack/atomic-theme), and there's a
[live demo](https://atomic-stack.github.io/theme/) of the whole thing.

So, how much CSS does a good-looking website need? Less than you'd think. A few
hundred bytes turns naked HTML into something you'd happily read - a little really
does go a long way. But the modular part means it doesn't have to stop there: when
you _do_ want forms, a grid, a dialog, and some motion, you can have all of it for a
few kilobytes - no build step, no design system to buy into. Use only what you need,
and ship not a byte more. (It's free and open source, of course.)
