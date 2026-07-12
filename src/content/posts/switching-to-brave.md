---
title: "Switching to Brave"
author: Adrian Cruz
pubDatetime: 2021-11-27T17:00:00Z
tags:
  - browsers
  - privacy
  - tutorial
description: "How I set up the Brave browser for daily use - Shields settings, secure DNS, privacy tweaks, and the extensions worth adding."
---

I switched to **Brave** for a more privacy- and security-focused browser. Today, we will be setting up the Brave browser for daily usage.

## Why should I use Brave?

Brave was co-founded by **[Brendan Eich](https://brendaneich.com/)** and Brian Bondy. Eich is widely recognized for [creating JavaScript in 10 days](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/), which he did at Netscape after joining the company in 1995. He went on to co-found the Mozilla project and served as its CTO for most of his tenure. He briefly became Mozilla's CEO in 2014 but resigned about 11 days later, amid controversy over a 2008 donation he made in support of California's Proposition 8, which banned same-sex marriage. He then focused on more privacy-oriented tools for the modern web, [launching the Brave browser in 2016](https://venturebeat.com/2016/01/20/brave-browser/).

So Eich knows a thing or two about the web - having created JavaScript and spent much of his career at Mozilla - which shows in this new browser. Brave blocks intrusive content like popups, ads, and trackers by default, which means less memory usage, less battery drain, and more privacy out of the box. Brave's own figures put it at loading large websites roughly 3 times faster than other browsers, though that gap comes mostly from blocking ads and trackers - run Chrome with a good ad blocker and the difference shrinks considerably.

If you haven't yet, [download Brave browser from their official website.](https://brave.com/its979) Or if you like living on the edge, [try Brave beta](https://brave.com/download-beta/) for early access to new features.

When we launch Brave, we get the initial setup screen. From here we can import settings from other browsers.

Next up, click on the menu icon at the top right, and go to **Settings**.

In the **Getting Started** section, we can set Brave as the default browser.

Click the **Shields** option and let's customize what Brave blocks and allows.

- **Trackers & ads blocking** should be set to **Aggressive**.
- **Upgrade connections to HTTPS** should be set to on.
- Cookie blocking should be set to **Only cross-site**, so we allow some cookies for login but only from the website where you log in to. All other cookies are blocked. Blocking all cookies is not recommended, as you might not be able to log in to some websites but if you want to do that, you can too.
- Fingerprinting blocking to **Strict, may break sites**. Let them break!
- Optionally block social media embedded posts. I'd rather not have Facebook content following me around, so I block it here.

Next, you can set your search engine to something other than Google if you'd like more privacy. I have been using **DuckDuckGo**.

From the **Extensions** section, you may want to turn on some nice tools that Brave offers:

- **Private window with Tor.**
- **WebTorrent** for downloading torrents directly from Brave.

Look for the **Additional settings** section and click **Privacy and security**. Then click on **Security** and scroll down to **Advanced**. Turn on **Use Secure DNS** and set the DNS provider to **With Cloudflare (1.1.1.1)**. Cloudflare is one of the fastest DNS resolvers out there, and I like using it (over an encrypted connection) instead of my ISP's.

## Brave Rewards

Brave has implemented an ads program that pays you when you see advertising content. You receive payments in [**BAT** tokens](https://brave.com/brave-rewards/). This is completely optional and you can opt-in by clicking on **Brave Rewards** at the top (next to Settings) and turning on Ads. You can also set the number of ads displayed per hour.

I think this is a better alternative to seeing ads without receiving any compensation, but I'd still prefer to see no ads at all, so I've opted out, but that's up to you.

## Extensions

We can also augment Brave's capabilities by installing extensions like a password manager and some tab management. Note that you don't need a third-party ad blocker here - Brave's built-in Shields already block ads and trackers, so adding one on top is redundant and can even cause sites to break. Brave uses the same extension engine as Chrome, so anything from the Chrome Web Store works. These are the ones I usually have installed everywhere:

- A reputable password manager like [Bitwarden](https://chromewebstore.google.com/detail/bitwarden-password-manager/nngceckbapebfimnlniiiahkandclblb) or 1Password
- [OneTab](https://chromewebstore.google.com/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) to keep a list of tabs
- [JSON Formatter](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)
- [Grammarly](https://chromewebstore.google.com/detail/grammarly-for-chrome/kbfnbcaeplbcioakkpcpgfkobkghlhen) for writing
- [React developer tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

And there you have it! Those are just some of my favorites.
