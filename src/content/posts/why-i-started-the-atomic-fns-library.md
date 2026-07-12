---
title: "Why I started the atomic-fns library"
author: Adrian Cruz
pubDatetime: 2023-02-04T17:00:00Z
tags:
  - javascript
  - open-source
  - dependencies
description: "The hidden costs of adding dependencies, seven signs of a healthy open-source project, and why I built atomic-fns to replace my lodash imports."
---

Open source is more important than ever, and more companies are realizing the benefits and increasing their adoption. As long as it's something popular that can speed up the development process, why not use it? It doesn't cost anything!

Well, it doesn't cost _money_... But I've found there are more subtle costs that could end up having a huge impact on the business, and we should consider them before introducing any dependencies to existing products or processes.

There's the cost of distributing the libraries you're using (and their dependencies) to your customers in your builds. That means your customers need to download a larger bundle, which makes their experience a bit slower.

There's the maintenance cost of outdated libraries, which often include outdated dependencies. Those could have known vulnerabilities with known exploits (and fixes), which can damage the brand, business, and customers.

When a library is no longer maintained, it's almost impossible to get support or request new features. The issues pile up on an endless list of open bugs. And those bugs are almost never fixed when you need them to be. You can count on Murphy's Law to kick in here.

Then there's the cost of the workarounds. Once you start uncovering bugs and you realize nobody is coming to save you, there are two possible outcomes: you either stop using that library, or you try to make it work on your own, taking on weeks of additional work.

On the other hand, there are specific characteristics that separate the quality open-source projects from their abandoned counterparts:

- **Bundle sizes.** Good projects are modular, so you can import only what you need and keep your bundle sizes low. JavaScript libraries can be checked using [bundlephobia.com](https://bundlephobia.com/) - also, look for libraries that are [tree-shakeable](https://www.smashingmagazine.com/2021/05/tree-shaking-reference-guide/).
- **Source code.** If you aren't able to inspect the code, _don't use it because it could explode_. But also, is the code clear? Are there comments? Could you explain how it works to others?
- **Up to date.** Look at the commit history. Are there recent commits and bug fixes landed? Are they keeping their dependencies up to date?
- **Test coverage.** If there are no tests, how do we know the code does what it's supposed to do? Browse through the tests and make sure that they cover enough cases.
- **Open issues.** Check the project's open issues to make sure the maintainers are active and listening. Check for a roadmap too.
- **No vulnerabilities.** Run `npm audit` after adding a new dependency to check that it doesn't introduce vulnerabilities. Bonus points if the library you plan to use has zero dependencies.
- **Documentation.** Can you find available docs that show how the library is meant to be used? Official or otherwise, having something you can refer to and share with other team members is super valuable.

Recently, I had to weigh these costs while choosing libraries for a new project, and I was leaning toward the popular `lodash` library. Then I started scrolling its long list of [open bugs](https://github.com/lodash/lodash/issues). At the time, lodash hadn't shipped a release since 4.17.21 in early 2021 - close to two years of silence - and the long-promised lodash 5 had been in the works for years without landing, while the issue backlog kept growing. So I opened the source, and found it riddled with custom macros and heavy abstractions (see [clone](https://github.com/lodash/lodash/blob/master/clone.js)). And then it clicked.

That is probably part of why so many bugs sit open: it takes real effort to follow even one basic function, so most people never get far enough to send a fix. (To be fair, lodash has since had a proper maintenance reboot; this post is a snapshot of where things stood when I made the call.)

So I started building [atomic-fns](https://github.com/adrian2x/atomic-fns) to replace my `lodash` imports, along with a handful of other utilities. The goal is deliberately narrow: easy to learn, easy to test, easy to maintain, with zero dependencies and everything tree-shakeable.

Here's the kind of swap it's meant to make. With lodash you often reach for the whole namespace:

```js
import _ from "lodash";

_.times(5, i => i); // [0, 1, 2, 3, 4]
_.sortBy([4, 3, 2, 1]); // [1, 2, 3, 4]
```

atomic-fns ships as ES modules, so you import only the functions you actually use:

```js
import { times, sorted } from "atomic-fns";

times(5, i => i); // [0, 1, 2, 3, 4]
sorted([4, 3, 2, 1]); // [1, 2, 3, 4]
```

The [docs](https://atomic-stack.github.io/atomic-fns/) cover the rest. If it saves you a dependency or two, it has done its job.
