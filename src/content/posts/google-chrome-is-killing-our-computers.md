---
title: "Google Chrome is killing our computers"
author: Adrian Cruz
pubDatetime: 2021-06-11T17:00:00Z
tags:
  - Google Chrome
  - internet
description: "Listen to this article here. Google Chrome is the most popular web browser by far, handling over 60% of all web traffic. It seems like the ideal browser..."
---

[Listen to this article here.](https://play.ht/articles/0ea6e430d5c345f7986542057ed5f905)

Google Chrome is the most popular web browser by far, handling over **60% of all web traffic**. It seems like the ideal browser given that most people spend a lot of time using other Google services like Search, Gmail, Calendar, YouTube, and Android. But convenience comes at a cost and even though Chrome itself is free to use, a lot is going on behind the scenes of this popular browser that most people are not aware of.

### Much Memory, yum!

The first inconvenience is that as you start browsing websites, Chrome tends to keep its data around in memory. Just in case you want to go back to it later, so things look fast. This is not a novel idea, memory is faster to read from than the network so it makes sense to cache some data for recently used websites… what doesn’t make sense is that it will eat up all your available memory just in case, to the point of leaving no available memory for other apps running on your computer.

The reason for this is that Chrome splits every tab and extension into its own process, so if one thing crashes, it doesn’t bring down the whole web page or all of your open tabs at once.

The more tabs you open, the more memory-hungry Chrome gets, happily devouring all your RAM like some kid on a sugar rush. At some point, websites start taking longer to load and the rest of your computer becomes slower as a result of having to constantly reclaim some of that memory used by Chrome. _Geez, thanks Chrome…_ sure, go ahead and eat up all my available memory and slam my CPU until it drops dead.

In case you don’t believe me, check out this screenshot of Chrome spawning processes like crazy to handle all your tabs

![Google Chrome is killing our computers](/images/posts/google-chrome-is-killing-our-computers/01.png)

When there’s no more memory, your OS will freak out and probably just crash to let you know it’s not safe to continue. You will be left with either an unresponsive computer or the **blue screen of death** if using Windows.

Now, what happened to that word document that I was editing…?

### Security issues

So as a workaround for this gigantic usage of memory, some people have recommended using extensions to manage Chrome tabs. One such popular extension is the **Great Suspender**… if you see any articles recommending that please stop reading.

Turns out the Great Suspender had some malware included which tracked users and manipulated web requests. The only reason people needed to install such a piece of crap was to keep Chrome in check. Eventually, [Google itself disabled this extension and removed it from the Chrome store](https://arstechnica.com/information-technology/2021/02/chrome-users-have-faced-3-security-concerns-over-the-past-24-hours/), claiming it contained malware.

That’s not all though. Another convenient feature of Chrome is **Autofill**. Nobody likes filling out forms and entering the same information over and over again. I get it. You get it. Chrome gets it. So they made Autofill for us.

Well, Autofill has its own share of security issues. Back a couple of years someone realized Chrome was sending all the information saved in Autofill to any page that had a form. That included your address, email, even saved credit card information. See for yourself:

![Google Chrome is killing our computers](/images/posts/google-chrome-is-killing-our-computers/02.gif)

Autofill sending more information that you wanted

You can see here how even though the form only asks for name and email, Chrome is also sending back an address, phone number, and organization.

This is like every hacker’s dream! You got **billions** of people running on a browser that will let you scoop all that information for free on any website that contains a form!

### Privacy... what privacy?

This is not even the end of the story. Usually, Google is on top of these security flaws and they eventually get fixed. Even though the damage is already done and your data is already sold more than a couple of times and all over the dark web. Then you start getting more random calls and even some charges on your credit cards that you have no idea where it came from. Oh, but they fixed the issue, okay all good right?

You would be a fool to think it’s all good. Because the truth behind all this is that you’re just a product in the eyes of Google. Yes, you yourself are a product which they can sell to the highest bidder. All your information is for sale and Chrome is one way to make sure they can keep gathering the most recent and up-to-date info on you.

_How did you think Google got so_ [_insanely rich_](https://www.statista.com/statistics/266249/advertising-revenue-of-google/) _without charging its users for their services? Information is Power after all, isn’t it!?_

[A Washington Post article](https://www.washingtonpost.com/technology/2019/06/21/google-chrome-has-become-surveillance-software-its-time-switch/) reported Chrome gathers around 11,000 trackers in the average week. Do you really want 11,000 eyes on you every time you do a web search???

Just so you know, this is how they track you:

> Similar to Google, advertisers and trackers want to record as much of your online browsing as possible. The more data they have, the better they can show you ads specifically tailored to you. The two tools they use to follow you around the Internet are device fingerprinting and cookies.
>
> Device fingerprinting is when a site looks at all the characteristics of your device (the make and model of your device, what browser you are using, what plugins you have installed, what timezone you are in, etc.) until it has enough information to identify and follow it. Your device share this information to optimize the websites you visit. For example, websites want to know if you’re using a laptop or a smartphone so that it can select the correct font size and screen resolution. This can be surprisingly accurate. To see if your device has an easily identifiable fingerprint, check out the Electronic Frontier Foundation’s Panopticlick.
>
> Cookies, or HTTP cookies, are tiny data packets that websites or services plant on your browser while you’re on a website. These cookies differentiate your browsers from others, like a nametag.

And that’s not all, [Gmail is also known for selling your mail to advertisers, ok?](https://www.wsj.com/articles/techs-dirty-secret-the-app-developers-sifting-through-your-gmail-1530544442)

## Alternatives

Hopefully, by now you are maybe a little concerned or even upset. And you should be. After all, you never agreed to any of this, right? Well, you kinda did when you clicked that checkbox that says **You agree to our Terms & Conditions**… and even though the damage is done, you can still opt-out of being looked at, watched over, and treated as a product and go back to being a private person.

Instead of Google Chrome, I recommend looking for browsers that have a smaller memory footprint, respect your privacy, don’t track you, and block all ads by default. Here are some of my favorites:

### Brave

The Brave browser does a lot to ensure you’re not being tracked by fingerprinting, cookies, popups, or malware. It even ships with a built-in ad blocker! This is my current browser. [Download Brave here](https://brave.com/download/).

For an in-depth comparison of how brave compares to other browsers, [check out this article](https://brave.com/popular-browsers-first-run/).

> Get Brave!  
> macOS, Windows, Linux: <https://t.co/AHZLQYeNaP>  
> iOS: <https://t.co/Luf0XeFe5W> …  
> Android: <https://t.co/ME6ZkOYfLx>
>
> — Brave Software (@brave) [November 3, 2016](https://twitter.com/brave/status/794221010484502528?ref_src=twsrc%5Etfw)

### Firefox

Firefox has been around for a while and they do a lot to preserve users’ privacy and have a lot of options for disabling trackers, but it does not ship with its own ad blocker. This is why I currently prefer Brave. But Firefox is fast too and uses little memory. You can [download Firefox here](https://www.mozilla.org/en-US/firefox/new/?redirect_source=firefox-com).

### What about Tor?

Tor — which stands for _The Onion Router_ — is actually [a project started and funded by the US Government to this day](https://www.wired.com/story/cia-sets-up-shop-on-tor/#:~:text=On%20Tuesday%2C%20the%20CIA%20announced,that%20uses%20its%20own%20URLs.). Sure it does route your traffic through some hoops to make it less likely to be recognized but I’m pretty sure the government can track down your traffic if they wanted. _They built the damn thing!_

## Other important things

Whatever browser you decide on, you should also install an Ad Blocker extension. My current go-to is [AdBlocker Ultimate](https://adblockultimate.net/), cause it blocks everything.

> .[@AdBlockUltimate](https://twitter.com/AdBlockUltimate?ref_src=twsrc%5Etfw) is back on [@googlechrome](https://twitter.com/googlechrome?ref_src=twsrc%5Etfw) <https://t.co/6zNtQnTVcO>
>
> — AdBlocker Ultimate (@AdBlockUltimate) [April 9, 2016](https://twitter.com/AdBlockUltimate/status/718847056018817024?ref_src=twsrc%5Etfw)

Instead of relying on your browser’s autofill functionality, you should be using a password manager.

I definitely recommend checking out **LastPass**, to manage your personal information and passwords. It comes with browser extensions and apps for all your devices.

> See why [@PCMag](https://twitter.com/PCMag?ref_src=twsrc%5Etfw) gave LastPass an Editor’s Choice 🏆 for ease of use, secure password sharing, 2FA and more. Check it out: <https://t.co/KE0RY0bU72>
>
> — LastPass (@LastPass) [July 3, 2020](https://twitter.com/LastPass/status/1279067413963833344?ref_src=twsrc%5Etfw)

And finally, even when you’re not using **Chrome**, Google can still track your search history for advertising purposes, so if you really want to be free from targeting, consider using an alternative search engine such as [DuckDuckGo](https://duckduckgo.com/) or [Brave search.](https://brave.com/search)

One last thought for you… how much is your privacy worth? How much are you being sold for? _Do you even care?_
