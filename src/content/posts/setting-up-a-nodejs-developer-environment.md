---
title: "Setting up a Node.js developer environment"
author: Adrian Cruz
pubDatetime: 2022-02-06T17:00:00Z
tags:
  - nodejs
  - javascript
  - tooling
  - tutorial
description: "Set up Node.js from scratch: manage versions with nvm and .nvmrc, pick a package manager with Corepack, and get your machine ready to build."
---

In a previous episode, we set up Python for development like a Boss.

In this one, I'll show you how to set up your local machine for **Node.js** development so you can start building today.

## Requirements

- macOS, Linux, or Windows via WSL
- A terminal and an internet connection
- A code editor - I use [VS Code](https://code.visualstudio.com/), but anything works

## nvm (node version manager)

Similar to **Pyenv** for Python, **nvm** is a program that lets us manage multiple versions of **Node.js** and makes switching between versions across projects as seamless as it can be.

Let's install **nvm** following [their instructions on GitHub](https://github.com/nvm-sh/nvm#installing-and-updating). The installer URL is pinned to a specific version, and that version goes stale, so always grab the current one from the [nvm releases page](https://github.com/nvm-sh/nvm/releases) rather than copying an old tag out of a blog post (including this one). At the time of writing the latest is `v0.40.5`:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

This downloads **nvm**, installs it locally, adds a few lines to your `.bashrc` (or `.zshrc`), and tells you to restart your terminal to apply the changes. So let's restart the terminal.

To verify that **nvm** is installed correctly, run this:

```
command -v nvm
```

You should see it print `nvm` if it's working. If not, follow the [troubleshooting guide](https://github.com/nvm-sh/nvm#troubleshooting-on-linux).

Now we can install **Node.js** using **nvm**. Let's grab the latest version by running:

```
nvm install node # "node" is an alias for the latest version
```

You should see some output ending like this:

```
...
Now using node v26.5.0 (npm v11.17.0)
Creating default alias: default -> node (-> v26.5.0)
```

## Installing other versions

The whole point of **nvm** is that we can manage multiple versions of Node.js. That matters because some apps require a specific version, and you can also test features from a new release without disturbing the versions other projects depend on. In the previous step we installed the latest version, but for anything you plan to maintain over time it's better to stick with a **Long Term Support (LTS)** release for stability and security updates.

```
nvm install --lts
```

That installed `v24.18.0` (the "Krypton" LTS) for me today. Since it's the current LTS, I'll also tell my system to default to the latest LTS line for every new shell:

```
nvm alias default 'lts/*'
# default -> lts/* (-> v24.18.0)
```

Using `lts/*` instead of a hardcoded number means "always the newest LTS," so this alias keeps working after the next LTS ships. If I now run `nvm ls`, it shows all my installed versions alongside the other available ones.

My system now defaults to the LTS release, but for newer projects where I want to try the latest features I can opt in per project. We do that with a `.nvmrc` file in the project root (_or any parent directory_) that tells **nvm** which version to use here.

```
mkdir ~/src/nodeproj
cd ~/src/nodeproj
echo "node" > .nvmrc # pin this project to the latest version
```

Now running `nvm use` reads that `.nvmrc` and switches to whatever it says.

If you'd like, you can also set up **nvm** to switch versions automatically based on the local `.nvmrc` (without typing `nvm use`). To do that, follow [the official guide here](https://github.com/nvm-sh/nvm#deeper-shell-integration).

## Bonus: picking a package manager

We're done with the Node.js part. But Node.js wouldn't be what it is without its ecosystem of packages. Every install ships with the official [npm](https://www.npmjs.com/) client, and for plenty of projects that's all you need.

If you want alternatives, the two popular ones are [pnpm](https://pnpm.io/) and [Yarn](https://yarnpkg.com/). Both were built to speed up installs and make builds reproducible. You'll still see Yarn quoted as "about 4x faster than npm," but that figure is from 2016; npm has closed most of the gap since, so on a warm cache the three are roughly comparable, and pnpm or Yarn mostly pull ahead on cold installs and large monorepos. pnpm has a nice bonus: it keeps a single content-addressable store on disk and links packages into each project, so it uses far less space than the others.

One caveat: skip Yarn Classic (v1). It has been in maintenance mode since 2020, so "Yarn" today means Yarn 2+ (aka Berry).

The cleanest way to get either is [Corepack](https://github.com/nodejs/corepack), which manages package-manager versions per project so you don't install them globally. It ships with the current LTS (Node 24); it was unbundled starting in Node 25, so on newer lines you install it once with `npm install -g corepack`. Either way, turn it on with:

```
corepack enable
```

Then reach for pnpm or Yarn directly:

```
pnpm add <package>   # or: yarn add <package>
```

The commands map closely to npm - `pnpm add` / `yarn add` instead of `npm install`, and so on. Pin a `packageManager` field in your `package.json` and Corepack makes sure everyone on the project uses the exact same version. If you go the Yarn route, here's a handy cheatsheet:

[![Yarn cheatsheet](/images/posts/setting-up-a-nodejs-developer-environment/02.jpeg)](https://devhints.io/yarn)

[**Yarn cheatsheet**](https://devhints.io/yarn) - the one-page guide to Yarn: usage, examples, links, snippets, and more. (via Devhints.io)

And that's everything you need to start building with **Node.js**. Go write some code.
