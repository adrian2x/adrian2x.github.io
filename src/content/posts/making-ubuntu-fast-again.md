---
title: "Making Ubuntu fast again"
author: Adrian Cruz
pubDatetime: 2022-11-12T17:00:00Z
tags:
  - linux
  - ubuntu
  - performance
  - tutorial
description: "Practical tweaks to speed up Ubuntu: trim startup services and swappiness, faster package downloads, Preload, and lighter desktop alternatives."
---

Ubuntu is one of the most popular distros out there. It's pretty fast by default, but it can also slow down because of bloat and poor management. Today we are discussing some optimizations we can make to get back to fast ubuntu. Let's go!

The first step is to clear out orphaned packages - dependencies that were pulled in for something you've since removed and that nothing else needs anymore. This won't uninstall the apps that came preinstalled, but it frees up disk space and trims clutter.

```
sudo apt autoremove --purge
```

If you do want to drop preinstalled software you never use, remove those packages by name with `sudo apt remove <package>` - that's a separate, deliberate step.

## Boot optimizations

Another thing holding you back is that your system starts unnecessary apps and services during startup. Ubuntu has the _Startup Applications_ program that lets you remove any apps that may be slow to start. By default it hides entries flagged `NoDisplay=true`, so to reveal the complete list you flip that flag on the autostart files.

That's an in-place edit of every file in `/etc/xdg/autostart`, so back the directory up first in case you want to restore it:

```
sudo cp -r /etc/xdg/autostart /etc/xdg/autostart.bak
sudo sed -i 's/NoDisplay=true/NoDisplay=false/g' /etc/xdg/autostart/*.desktop
```

Now launch _Startup Applications_ and disable any application by unchecking its box. Make sure to read the description so you disable only things you're sure you don't require!

![Making Ubuntu fast again](/images/posts/making-ubuntu-fast-again/01.png)

## Swap only when you need to

Chances are you have plenty of RAM but you still feel like your machine is not fast enough. It could be that your OS is leaning on disk swap when it doesn't need to. The `vm.swappiness` knob controls how aggressively the kernel pushes idle application memory out to swap versus dropping cached file data to reclaim RAM. It's a relative weight from 0 to 100, **not** a "percent full" threshold, and Ubuntu ships it at a default of **60**.

A higher value biases the kernel toward swapping application pages out earlier, even while you still have free RAM, trading responsiveness for a bigger file cache. On a machine with memory to spare that's usually the wrong tradeoff, so let's lower it:

```
sudo sysctl vm.swappiness=10
```

A value of 10 tells the kernel to strongly prefer keeping your running programs in RAM and to reach for swap only under real memory pressure. To make this change permanent, edit the `/etc/sysctl.conf` file in a text editor. Change the value of `vm.swappiness` or add it at the end of the file, like this:

```
#
# /etc/sysctl.conf - Configuration file for setting system variables
# See /etc/sysctl.d/ for additional system variables.
# See sysctl.conf (5) for information.
#
...
#kernel.sysrq=438
vm.swappiness=10
```

## apt-fast

The default package manager in ubuntu is `apt` - the Advanced Package Tool. But you can also use any other package manager you like. I will be sticking with `apt` because I like being able to copy/paste commands that I read on forums, blogs, etc. and I want it to _just work TM_. However, one issue I have with `apt` is that it downloads packages sequentially, one after the other. So much for advanced, huh? We can do better by fetching packages in parallel, using multiple connections. That's exactly what `apt-fast` is for.

```
sudo add-apt-repository ppa:apt-fast/stable
sudo apt update
sudo apt install apt-fast
```

From now on, call `apt-fast` explicitly wherever you'd normally reach for `apt` - for example `apt-fast install <package>` or `apt-fast update`. It's tempting to alias `apt` to `apt-fast` in your shell config, but shell aliases aren't expanded after `sudo`, so a `sudo apt install ...` would quietly bypass apt-fast anyway. Just type the name and you'll always get the parallel downloads.

## Liquorix patch

[Liquorix](https://liquorix.net/#features) is a custom kernel for Debian distros tuned for desktop responsiveness. It swaps in a lower-latency CPU scheduler (**Project C**, in its PDS/BMQ variants) and I/O schedulers chosen for interactivity (Kyber for multiqueue devices, BFQ for single-queue ones), and it turns off a lot of verbose debug logging. Older Liquorix builds used the **MuQSS** CPU scheduler, but that was dropped around 2021 - and MuQSS only ever scheduled the CPU, never disk I/O.

Two things to know before you install a third-party kernel:

- If you have **Secure Boot** enabled, the Liquorix kernel is unsigned and won't boot with it on. You'd have to disable Secure Boot in your firmware first.
- Out-of-tree drivers built with **DKMS** (some GPU drivers, VirtualBox, and the like) have to rebuild against the new kernel and can occasionally fail to. Keep the stock Ubuntu kernel installed so you can always boot back into it from the GRUB menu if something breaks.

```
sudo add-apt-repository ppa:damentz/liquorix
sudo apt-get update
sudo apt install linux-image-liquorix-amd64 linux-headers-liquorix-amd64
```

## Preload apps

Preload is a daemon that watches which applications you use most and reads their binaries and libraries into the page cache ahead of time, so launching them can skip some disk reads. You install it once and it works quietly in the background from then on.

Temper your expectations, though. The payoff was much bigger in the spinning-disk era; on a modern SSD, reads are already fast enough that the difference is marginal, and the project is essentially unmaintained. It's a harmless thing to try, not a miracle.

```
sudo apt install preload
```

## TLP

If your computer is overheating, it will slow itself down to avoid damaging the CPU - this is called thermal throttling, and on a laptop it's often a sign the machine is running hotter than it needs to. TLP won't cool an overheating chip on its own, but it's the standard power-management tool for laptops: it tunes CPU frequency scaling along with disk and device power settings to cut heat and stretch battery life, which can indirectly ease throttling.

```
sudo apt-get install tlp tlp-rdw
sudo tlp start
# TLP started in AC mode (auto).
```

TLP works from sensible defaults the moment it's running, so there's nothing else to configure to get the benefit. Older guides pair it with `indicator-cpufreq` for a status-bar menu that lets you pick a CPU speed by hand, but that applet is unmaintained and broken on recent Ubuntu releases, so I'd skip it.

## Alternative distros

Of course, it would be nice to start out with a distro that enabled all these performance optimizations from the start. That means less tweaking and more fun. One such distro is [Linux Lite](https://www.linuxliteos.com/), which is a modified version of ubuntu (using an Xfce desktop) with some nice tools for performance optimization, like Lite Tweaks and preload. This is a seriously snappy distro that can run on any machine with at least 1Gb of RAM.

And that's all I have. Don't forget to restart your system after tweaking the performance settings, and enjoy a faster Ubuntu!

---
