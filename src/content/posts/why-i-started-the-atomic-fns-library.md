---
title: "Why I started the atomic-fns library"
author: Adrian Cruz
pubDatetime: 2021-12-11T17:00:00Z
tags:
  - JavaScript
  - open source
description: "Open source is more important than ever, and more companies are realizing the benefits and increasing their adoption. As long as it's something popular..."
---

Open source is more important than ever, and more companies are realizing the benefits and increasing their adoption. As long as it's something popular that can speed up the development process, why not use it? It doesn't cost anything!

Well, it doesn't cost _money_... But I've found there are more subtle costs that could end up having a huge impact on the business, and we should consider them before introducing any dependencies to existing products or processes.

There's the cost of distributing the libraries you're using (and their dependencies) to your customers in your builds. That means your customers need to download a larger bundle, which makes their experience a bit slower.

There's the maintenance cost of outdated libraries, which often include outdated dependencies. Those could have known vulnerabilities with known exploits (and fixes), which can damage the brand, business, and customers.

When a library is no longer maintained, it's almost impossible to get support or request new features. The issues pile up on an endless list of open bugs. And those bugs are almost never fixed when you need them to be. You can count on Murphy's Law to kick in here.

Then there's the cost of the workarounds. Once you start uncovering bugs and you realize nobody is coming to save you, there are two possible outcomes: you either stop using that library, or you try to make it work on your own, taking on weeks of additional work.

On the other hand, there are specific characteristics that separate the quality open-source projects from their abandoned counterparts:

- **Bundle sizes.** Good projects are modular, so you can import only what you need and keep your bundle sizes low. JavaScript libraries can be checked using [bundlephobia.com](https://bundlephobia.com/) – also, look for libraries that are [tree-shakeable](https://www.smashingmagazine.com/2021/05/tree-shaking-reference-guide/).
- **Source code.** If you aren't able to inspect the code, _don't use it because it could explode_. But also, is the code clear? Are there comments? Could you explain how it works to others?
- **Up to date.** Look at the commit history. Are there recent commits and bug fixes landed? Are they keeping their dependencies up to date?
- **Test coverage.** If there are no tests, how do we know the code does what it's supposed to do? Browse through the tests and make sure that they cover enough cases.
- **Open issues.** Check the project's open issues to make sure the maintainers are active and listening. Check for a roadmap too.
- **No vulnerabilities.** Run `npm audit` after adding a new dependency to check that it doesn't introduce vulnerabilities. Bonus points if the library you plan to use has zero dependencies.
- **Documentation.** Can you find available docs that show how the library is meant to be used? Official or otherwise, having something you can refer to and share with other team members is super valuable.

Recently, I've had to estimate these costs when deciding on which libraries to use for a new project and was considering using the popular `lodash` library. Until I started looking at their long list of [open bugs](https://github.com/lodash/lodash/issues), realizing this project has been dead for the past 6 years, and then I read their source code, ridden with custom macros and over-engineered abstractions (see [clone](https://github.com/lodash/lodash/blob/master/clone.js)). And then it hit me...

This must be why there are so many open bugs. It takes so much effort to understand just one basic function that most people won't even try. Hell, even the original maintainers probably can't understand it at this point because of all the abstractions.

So I started working on [atomic-fns](https://github.com/adrian2x/atomic-fns) to replace my `lodash` imports, and a handful of other libraries. But the main goal is that it should be easy to learn, easy to test, and easy to maintain. There are plenty of [docs](https://atomic-stack.github.io/atomic-fns/) available to get you started, and I hope you join the conversation on [github](https://github.com/adrian2x/atomic-fns) to help shape its future.

<https://github.com/adrian2x/atomic-fns>
