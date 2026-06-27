---
title: I wrote a tiny CSS framework by deleting things
author: Adrian Cruz
pubDatetime: 2022-11-24T03:10:15Z
featured: false
draft: false
tags:
  - css
  - web
  - side-projects
description: How reading "100 bytes of CSS" sent me down a rabbit hole and out the other side with a little modular theme called atomic-theme.
---

A while back I read swyx's lovely post,
[100 bytes of CSS to look great everywhere](https://swyx.io/css-100-bytes).
The pitch is exactly what it says: a handful of CSS rules that take a plain,
unstyled web page and make it readable on basically any screen. No framework, no
build step, just width, spacing, and a bigger font.

It's part of a small tradition. There's
[motherfuckingwebsite.com](https://motherfuckingwebsite.com/), which is gloriously
naked HTML making the point that you might not need much. Then
[the "better" version](http://bettermotherfuckingwebsite.com/) adds about seven
lines of CSS and suddenly it looks like a real website. I loved that bit. Seven
lines! The whole genre is basically "look how far a little goes."

I nodded along the whole way through swyx's post. And then, because I have a
problem, I thought: what if a little went a _little_ further?

That turned into [`atomic-theme`](https://github.com/Atomic-stack/atomic-theme), a
tiny modular CSS theme. This is the story of how I built it, which is mostly a story
about deleting things.

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

That's it. The typography needs zero classes - that's just the base styles waking
up. The one thing I add is the `.container` wrapper, which keeps everything in a
comfy ~70ch column and centers it on the page. It also calms the font down, sizes
the headings sensibly, and quietly does dark mode if your system asks for it. Same
trick as the seven-line crowd, just with a few more opinions about buttons and
quotes.

## Step one: start from normalize, then subtract

I didn't start from a blank file. I started from
[modern-normalize](https://github.com/sindresorhus/modern-normalize), which is the
sane, up-to-date cousin of the old `normalize.css` everyone used to paste in.

Then I did the fun part: I started deleting.

A lot of what classic resets do is fix browsers that, frankly, don't exist
anymore. Every modern browser agrees on a pile of things they used to fight about,
so all those defensive little rules are just dead weight today. So the rule I gave
myself was simple - if the browser already gets it right on its own, the line
goes. What's left is a `normalize.scss` that's mostly "set `box-sizing` to
`border-box` and get out of the way." Subtraction as a feature.

## Step two: make everything a knob

The next thing I wanted was for the whole look to be tweakable without editing the
framework. So the foundation is a pile of CSS variables in `:root`, and every
other rule reads from them instead of hardcoding values.

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
accent color or a wider column? Override one variable and the whole theme follows
along. One nice perk of building on custom properties is that the faded shades
derive from the base color with `color-mix` - the muted borders and dividers are
literally `--font-color` mixed with a little transparency, not a separate magic
hex value. So when dark mode flips the text color to white, every faded shade
follows along on its own.

## Step three: optional modules, pick what you want

This is where I wandered off the 100-bytes path. swyx's snippet is perfect
_because_ it stops. I wanted the stopping to be the user's choice instead of mine,
so everything past the basics is a separate, optional module:

- **typography** - headings, lists, quotes, code. The "reads nicely" layer.
- **layout** - a Tailwind-inspired set of flexbox and grid helpers (`.flex`,
  `.items-center`, column spans, `.w-50` and friends) for when you want to
  arrange things without leaving your HTML.
- **components** - the small interactive stuff that's annoying to style from
  scratch: `nav`, `forms`, `button`, `card`, and `dialog`.
- **utilities** - the sugar: `effects`, `transitions`, and `animations`.

The point of splitting it up: you can grab the whole thing from the CDN in one
line and move on, _or_ you can build only the modules you actually use and ship a
couple of kilobytes. Either way you never had to adopt a build system, learn a
class vocabulary, or sign up for someone else's idea of how a website should look.

## Why bother, when Tailwind exists?

Tailwind is great. So is Bootstrap. But both ask you to buy in - a toolchain, a
mental model, a way of writing markup. Sometimes I just have a `.html` file and an
afternoon, and I want it to look decent without any of that ceremony.

That's the whole niche `atomic-theme` is going for: the "looks good everywhere" feeling of
the minimalist crowd, but modular, so you can take a little or a lot. It's the
same instinct behind my
[Just HTML](https://atomic-stack.github.io/just-html/) page, which is a tiny tour
of how much you can do with plain elements before you reach for anything fancy.
`atomic-theme` is the next thought after that one: okay, now make the plain stuff _pretty_,
and let people opt in to the rest.

## Try it

One line in your `<head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/atomic-theme" />
```

Or `npm install atomic-theme` if you'd rather build your own slice of it. The code
is [on GitHub](https://github.com/Atomic-stack/atomic-theme).

Mostly I just had fun taking a famous "you don't need much" idea and seeing how
modular I could make "much." Turns out the answer involves a lot of deleting,
which is my favorite kind of programming.
