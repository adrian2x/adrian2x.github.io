---
title: "How the internet works"
author: Adrian Cruz
pubDatetime: 2021-05-01T17:00:00Z
tags:
  - networking
  - dns
  - http
  - beginners
description: "What happens when you load a website: DNS, IP addresses, TCP and HTTPS, ports, and how your browser turns bytes into a page."
---

When you connect to the internet, magic happens. Seriously, it’s some pretty magical stuff and today we’re taking a deep dive into everything that makes up the internet.

_The Internet_ is made up of different technologies for transferring information from one place to another. Usually, the place where the information lives is a server and the destination is your browser running on your personal computer.

So let’s say you open your browser and navigate to _google.com_. In order for you to view the website, your browser needs to figure out what information is needed to display that Google page. It does so following a series of steps to open a connection to the source (google.com) and receive the information to present.

The steps at a high level are usually like this:

1. Your browser needs to figure out what the source is for google.com
2. It asks the Operating System to figure out how to reach google.com (this is called Domain Name Resolution) which means figuring out which IP Address is associated with google.com
3. Then, it tries to establish a connection to the source IP Address for google.com
4. When the connection is successful, it will start downloading the information from google.com
5. Finally, the browser converts that information to what you see on the page.

I just mentioned IP Addresses, which by the way are like your home address but for digital residences. So your browser needs to call google.com and say “Hey, what do you have for me today?” but in order to do that, it needs to know where to phone home to. That’s what an IP Address is for.

The domain name (google.com) is just the label for that IP address. Which can be also referred to as the _host_.

The information is stored somewhere (in the _host_) as a sequence of bytes. Yes, that image is a sequence of bytes, same for html, xml, or json. It’s stored as bytes and it moves from point A to point B as a sequence of bytes sent over the wires.

The data is routed across the network by the Internet Protocol (**IP**), which is what actually delivers packets from one address to another. On top of IP sits the Transmission Control Protocol (**TCP**), which adds reliable, ordered delivery - it is how we can connect with other sources and get their information intact. **TCP** is pretty cool in that it processes that sequence of bytes that are being sent over the wire and it knows how many are supposed to come until we have all the stuff we need. Together they are often written as TCP/IP.

So what’s a byte even…? For simplicity, let’s just say it’s a sequence of numbers used to identify a small unit of information, such as the letter **A**. The letter A can be represented as a single byte, but the larger the amount of information the more bytes in order to represent it.

When you connect to the internet, you are exchanging bytes back and forth over the wire, in order to receive the information you need. All of this exchange is controlled by **TCP** to make sure we get the right info.

OK, getting back to our example… so google.com resolves to an IP address like 142.250.72.206 (the exact address varies by location and over time). The next step is connecting directly to this IP address and waiting for it to respond back with some data. The data is picked up over **TCP** and then sent to the program that requested it as bytes, which is then converted back to text or images or whatever may be, based on the description of what type of content is associated with the byte sequence.

But now you might ask, what sends the data back? Usually, a server running on the host listening for requests sent to that IP Address. Also, different types of servers might use different channels so they don’t accidentally block each other. These channels have a number associated with them which is called the _port number_.

Continuing with the digital residence analogy, ports are like rooms in the house to discuss different topics. Each port is like a separate conversation going on about its business. Different topics, different people, different formats. This is what ports are for.

Plain HTTP used to travel over port 80, but today the norm is HTTPS over port 443. It’s still up to the host to choose which ports it listens and transmits over, but you can’t hide a service just by picking an unusual port number - that is security through obscurity, and a determined scanner will still find it. What actually keeps the connection private is TLS: HTTPS wraps the whole exchange in Transport Layer Security, which encrypts the bytes so anyone eavesdropping on the wire only sees scrambled data, not your passwords or page content.

Anyway, so your browser connects to google.com’s IP address over port 443 and receives some byte sequence back which happens to be html content. It still needs to read through that html to figure out what it needs to display from it.

Browsers are pretty smart in how they do this but it usually means making some more requests to other sources linked by the html for related stuff like images, or stylesheets, or other data the website may need in order to be fully functional.

When the browser decides it has all the information it needs to display, it’ll start rendering the information on the window and it starts executing the program included on that website. This may or may not include JavaScript and cookies.

Cookies are small pieces of key/value data that the host sends to your browser. The browser stores them and re-sends them with every following request to that site. They usually include some information about who is making the request and on which device, which is how a site can remember that you’re logged in.

Finally, when the browser runs the JavaScript included on the page, it becomes interactive and you can click around and do whatever it is you need to do.

And that’s basically it! Just a large network of IP addresses and labels and servers and files and programs.

But the real kicker is that the Internet is very resilient. Those IP addresses are sometimes volatile and they stop listening and go down. But then the _host_ can resurface again at a different address and continue business as usual.

The bytes being sent are sometimes late or never arrive because of the congestion on the network and all that information flowing through it. It just so happens that **TCP** is smart enough to handle that so you don’t end up with some random mess of nonsensical data.

So next time you’re sitting there waiting for the page to load, take a few seconds to appreciate this complex network which despite getting congested every now and then, allows us to transmit our thoughts and ideas with the whole world at the speed of _lightning_ and create connections that wouldn’t be possible in the physical world.
