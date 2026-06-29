---
title: "How the Internet works"
author: Adrian Cruz
pubDatetime: 2021-05-11T17:00:00Z
tags:
  - technology
  - internet
description: "When you connect to the internet, magic happens. Seriously, it\u2019s some pretty magical stuff and today we\u2019re taking a deep dive into everything that makes..."
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

The way the information actually moves is called Transmission Control Protocol (**TCP**) and it’s how we can connect with other sources and get their information. **TCP** is pretty cool in that it processes that sequence of bytes that are being sent over the wire and it knows how many are supposed to come until we have all the stuff we need.

So what’s a byte even…? For simplicity, let’s just say it’s a sequence of numbers used to identify a small unit of information, such as the letter **A**. The letter A can be represented as a single byte, but the larger the amount of information the more bytes in order to represent it.

When you connect to the internet, you are exchanging bytes back and forth over the wire, in order to receive the information you need. All of this exchange is controlled by **TCP** to make sure we get the right info.

OK, getting back to our example… so google.com is behind IP Address 8.8.8.8. The next step is connecting directly to this IP address and waiting for it to respond back with some data. The data is picked up over **TCP** and then sent to the program that requested it as bytes, which is then converted back to text or images or whatever may be, based on the description of what type of content is associated with the byte sequence.

But now you might ask, what sends the data back? Usually, a server running on the host listening for requests sent to that IP Address. Also, different types of servers might use different channels so they don’t accidentally block each other. These channels have a number associated with them which is called the _port number_.

Continuing with the digital residence analogy, ports are like rooms in the house to discuss different topics. Each port is like a separate conversation going on about its business. Different topics, different people, different formats. This’ what ports are for.

Usually, websites are transmitted over port 80 but not necessarily so. It’s up to the host to choose which ports it listens and transmits over. Sometimes it’s useful to choose a large number for the port to avoid unwanted transmissions or keep eavesdroppers away.

Anyway, so your browser connects to google.com’s IP address over port 80 and receives some byte sequence back which happens to be html content. It still needs to read through that html to figure out what it needs to display from it.

Browsers are pretty smart in how they do this but it usually means making some more requests to other sources linked by the html for related stuff like images, or stylesheets, or other data the website may need in order to be fully functional.

When the browser decides it has all the information it needs to display, it’ll start rendering the information on the window and it starts executing the program included on that website. This may or may not include JavaScript and cookies.

Cookies are just a text file sent from the host which is then sent back with every following request. They usually include some information about who is making the request and on which device.

Finally, when the browser runs the JavaScript included on the page, it becomes interactive and you can click around and do whatever it is you need to do.

And that’s basically it! Just a large network of IP addresses and labels and servers and files and programs.

But the real kicker is that the Internet it’s very resilient. Those IP addresses are sometimes volatile and they stop listening and go down. But then the _host_ can resurface again at a different address and continue business as usual.

The bytes being sent are sometimes late or never arrive because of the congestion on the network and all that information flowing through it. It just so happens that **TCP** is smart enough to handle that so you don’t end up with some random mess of nonsensical data.

So next time you’re sitting there waiting for the page to load, take a few seconds to appreciate this complex network which despite getting congested every now and then, allows us to transmit our thoughts and ideas with the whole world at the speed of _lightning_ and create connections that wouldn’t be possible in the physical world.
