---
title: "Making Ubuntu fast again"
author: Adrian Cruz
pubDatetime: 2021-11-11T17:00:00Z
tags:
  - Ubuntu
  - Linux
description: "Ubuntu is one of the most popular distros out there. It's pretty fast by default, but it can also slow down because of bloat and poor management. Today we..."
---

Ubuntu is one of the most popular distros out there. It's pretty fast by default, but it can also slow down because of bloat and poor management. Today we are discussing some optimizations we can make to get back to fast ubuntu. Let's go!

The first step is to remove any bloatware that came preinstalled that could be updated or just unnecessary.

```
sudo apt autoremove --purge
```

## Boot optimizations

Another thing holding you back is that your system starts unnecessary apps and services during startup. Ubuntu has the _Startup Applications_ program that lets you remove any apps that may be slow to start. To show the complete list of startup apps and services, run this:

```
sudo sed -i 's/NoDisplay=true/NoDisplay=false/g' /etc/xdg/autostart/*.desktop
```

Now launch _Startup Applications_ and disable any application by unchecking its box. Make sure to read the description so you disable only things you're sure you don't require!

![Making Ubuntu fast again](/images/posts/making-ubuntu-fast-again/01.png)

## Swap only when you need to

Chances are you have plenty of RAM but you still feel like your machine is not fast enough. It could be that your OS is still using disk swap, instead of the full memory available. Ubuntu will actually use disk space when the RAM is **40%** full by default. That can be very low for machines with tons of RAM, so let's increase that.

```
sudo sysctl vm.swappiness=10
```

This will tell the kernel to only start using swap space when the RAM is 90% full. To make this change permanent, edit the `/etc/sysctl.conf` file in a text editor. Change the value of `vm.swappiness` or add it at the end of the file, like this:

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

The default package manager in ubuntu is `apt` – Advanced Package Tool. But you can also use any other package manager you like. I will be sticking with `apt` because I like being able to copy/paste commands that I read on forums, blogs, etc. and I want it to _just work TM_. However, one issue I have with `apt` is that it downloads packages sequentially, one after the other. So much for advanced, huh? We can do better by fetching packages in parallel, using multiple connections. That's exactly what `apt-fast` is for.

```
sudo add-apt-repository ppa:apt-fast/stable
sudo apt update
sudo apt install apt-fast
echo "alias apt='apt-fast'" >> ~/.bash_aliases
echo "alias apt-get='apt-fast'" >> ~/.bash_aliases
```

## Liquorix patch

[Liquorix](https://liquorix.net/#features) is a custom kernel for Debian distros that uses a modern (**MuQSS**) process and disk scheduler for better performance and throughput. It also disables a lot of verbose logging, by turning off debug flags. Let's install that too:

```
sudo add-apt-repository ppa:damentz/liquorix
sudo apt-get update
sudo apt install linux-image-liquorix-amd64 linux-headers-liquorix-amd64
```

## Preload apps

Preload is a program that runs in the background and analyzes the apps that you use to determine the ones you use frequently and fetches their binaries and dependencies in memory beforehand. This makes it so when you launch your apps, they start instantly from memory. The best thing about it is that you only have to install it once and it will make your apps start faster after that. You will be amazed!

```
sudo apt install preload
```

## TLP

If your computer it's overheating, it will become slower to prevent damaging the core components of the CPU. This is called thermal throttling and it can impact the performance of your system. There are some programs that can help diagnose this problem, and even control how your CPU runs.

```
sudo apt-get install tlp tlp-rdw
sudo tlp start
# TLP started in AC mode (auto).
sudo apt install indicator-cpufreq
```

After your next restart, you will see an indicator next to the date/time (up on the status bar) from which you can select what speed your CPU should run at.

![Making Ubuntu fast again](/images/posts/making-ubuntu-fast-again/02.png)

## Alternative distros

Of course, it would be nice to start out with a distro that enabled all these performance optimizations from the start. That means less tweaking and more fun. One such distro is [Linux Lite](https://www.linuxliteos.com/), which is a modified version of ubuntu (using an Xfce desktop) with some nice tools for performance optimization, like Lite Tweaks and preload. This is a seriously snappy distro that can run on any machine with at least 1Gb of RAM.

And that's all I have. Don't forget to restart your system after tweaking the performance settings, and enjoy a faster Ubuntu!

---
