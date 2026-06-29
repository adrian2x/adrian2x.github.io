---
title: "A Gentle Introduction to Python Programming"
author: Adrian Cruz
pubDatetime: 2022-10-05T17:00:00Z
tags:
  - Python
description: "Programming offers a chance to develop creativity, reasoning, and problem-solving skills. In this gentle introduction we install Python, write our first programs, and learn about variables and operations."
---

Programming offers a chance to develop creativity, reasoning, and problem-solving skills. As a programmer, you get to bring ideas to life through code and using logic to create programs that can be executed by a computer.

If you know how to write computer programs, you can do all sorts of useful things. You might not be able to write programs to control cars, traffic lights, or your fridge right away, but you could make web pages, your own games, or even a program to help you with your homework.

When faced with obstacles, programming requires you to use problem-solving to find solutions. While it can be challenging (and at times frustrating), programming is also a fun and rewarding activity! The skills gained from programming can be beneficial in multiple professions, even if your chosen career is not directly related to computers.

## How to Learn to Code

Like anything you try for the first time, it's always best to start with the basics. Gymnasts don't usually do backflips on their first try. If you jump ahead too quickly, not only will the basic ideas not stick in your head, but you'll also find the content of the later articles more complicated than it actually is.

Remember that the better you understand the basics, the easier it will be to understand more complicated ideas later on. When you find something frustrating or too challenging, here are some things that I find helpful:

1. Break a problem down into smaller pieces. Try to understand what a small piece of code is doing or think about only a small part of a difficult idea (focus on a small piece of code rather than trying to understand the whole thing at once).
2. If that still doesn't help, it might be best to leave it alone for a while. Sleep on it and come back to it another day. This is a good way to solve many problems, and it can be particularly helpful for computer programmers.

## What is a Computer Program

A program is a list of steps for a computer to follow. Programs are made up of lines of code. Each line tells the computer something specific about how to follow these instructions.

Software is a collection of computer programs.

Programs are like thoughts. If you didn't have thoughts, you would probably just sit on the couch all day, staring at the ceiling. Your thought "get up off the couch" is a command or instruction that tells your body to stand up. In the same way, computer programs use commands to tell computers what to do.

## The Python Programming Language

Like humans, computers use multiple languages to communicate-these are called programming languages. A programming language is simply a way to talk to a computer by using instructions that both humans and computers can understand.

The Python programming language has many features that make it extremely useful for beginners. Most importantly, you can use Python to write simple, efficient programs quite quickly. Python doesn't use as many complicated symbols as other programming languages, which makes it easier to read and a lot friendlier for beginners.

The Python programming language was actually named after the Monty Python's Flying Circus TV show, not after the snake.

## Installing Python

To install Python, navigate to [python.org/downloads](https://www.python.org/downloads) and click on Download Python. At the time of this writing, the latest version is 3.11.1. Make sure you download a version higher than 3.10.

Once downloaded, double-click the file to run the installer. Make sure you select Add Python to PATH, and accept all the defaults as you click through the installer.

When the setup is complete, you will find your Python folder inside the Applications folder on your computer.

Now that you have Python installed, we can write our first program!

### For Windows

Search for the Command application in the Start Menu or the Windows search box. Enter `python` in all lowercase. You should see a message from Python like this:

```text
$ python
Python 3.11.0 (main, Jan 9 2023, 15:58:34) [Clang 14.0.0 (clang-1400.0...)]
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Here, you can play around with the Python interpreter. Note the three greater-than signs (`>>>`) are called the prompt. This means Python is waiting for our input.

### For Mac

Python is already installed on most Macs, but it's probably an outdated version and not the one you want.

To see which version of Python is installed, open the Terminal application from the Applications folder and enter `python3`. You should then see the Python version and prompt.

> Note: A shell window (or terminal) is a command-line interface on a computer where you can type commands to the operating system and receive text output in return.

Enter the following line into the prompt:

```python
print("Hello World")
```

You should see the "Hello World" line printed out.

To close the terminal session, press Ctrl-Z and Enter, or type `exit()` and press Enter.

But wait a second... you may be thinking, "How is this useful?". That's a totally fair question. Let's look at a more realistic example.

Copy and paste the following code into your Python shell, and press Enter:

```python
# Get started with Python by showing the current date and time!
from datetime import datetime

today = datetime.now()
print(today)
```

> Note: In Python, the hash symbol (`#`) indicates a comment. Anything following a hash char in your code is ignored by Python; they are just there for human readers. You can use comments to write notes in plain English within your programs.

Comments can also be used to experiment with your code. If you want to temporarily "turn off" some code so that it doesn't run but don't want to delete it entirely, start the line with a `#`. This will convert the line into a comment, which Python will ignore when running the program.

Let's take a look at the code starting with this line:

```python
from datetime import datetime
```

This imports a module called `datetime` from somewhere, which we will use to display the current date and time. You probably have no idea where it's coming from, and that's completely okay.

The second line is a bit different:

```python
today = datetime.now()
```

It kind of sounds like this line is saying: today is equal to a datetime now, maybe? Or more like today is datetime now.

That's pretty much exactly what this line does:

1. It creates a new variable name called "today".
2. It assigns the result of `datetime.now()` to the variable `today`.

Finally, this prints out the value of the variable `today`.

```python
print(today)
```

Now, try to change the name `today` in the last line to something else, like `now`, and run the code again.

## What to do if you see an error

You may see an error this time, and the output is just the Python interpreter telling us where the problem is.

```text
Traceback (most recent call last):
  File "/var/shared-data/code/main.py", line 6, in <module>
    print(now)
          ^^^
NameError: name 'now' is not defined. Did you mean: 'pow'?
```

A `NameError` happens when we either forget to set a variable's name before using it or we made a spelling error when entering the variable name.

The output also reports that this error happened in line 6 of the file main.py. This can help us spot the error quickly.

If we change both of these lines to use the same name "now", the code works again. Try copying these lines into your shell now:

```python
now = datetime.now()
print(now)
```

Many programming mistakes are simple typos of one character in one line of code. If you spend a long time trying to find one of these mistakes, you're not alone. Many skilled and experienced programmers spend hours looking for these types of small mistakes. Try to laugh about it and move on, knowing that this will happen a lot as you learn to code.

## Variables and Operations

Variables are a way of storing things in a program. They're essentially a way to name a value, and they point to the given value in memory. Their value can later be retrieved and used in expressions.

To create a variable, we simply type the name on the left side of an equal sign (`=`). The right side must be an expression. This can be a primitive value or a more complicated expression.

For example, we can assign the result of a calculation to a variable:

```python
weeks = 52
days = 5 * 52
vacation = 5 * 2 + 4
workdays = days - vacation
workweeks = workdays / 7
print(workdays)
```

To find the value of a variable, we can use `print` followed by the name of the variable in parentheses. Try copying the code above to your shell, and then press Enter.

We can also tell Python to change the variable so that it contains a new value and also use more than one name or variable for the same value:

```python
days = 7
week = days
print(week)
```

Here we're changing the value of the variable `days` to `7` and then, we're saying that we want the variable `week` to refer to the current value of the variable `days`.

However, `week` isn't a very useful name for a variable because it doesn't tell us much about what the variable is used for. Let's call our variable `days_in_week` instead.

```python
days_in_week = 7
print(days_in_week)
```

This makes it clear that we're talking about the number of days in a week. Variable names can be made up of letters, numbers, and underscores (`_`), but they can't start with a number.

You can use any lowercase letters for variable names, but the name cannot contain a space, so we use underscores to separate words.

You should not use uppercase letters in variable names because they have a special meaning that we'll discuss another time. Python is a case-sensitive language, which means that `today` is not the same as `Today`.

### The order of operations

You can do all the basic math operations in Python using the corresponding operators, as you saw in that example.

We use parentheses in programming languages to control the order of operations. An operation is anything that uses an operator. Multiplication and division have a higher order than addition and subtraction, so they're performed first. In other words, if you enter an equation in Python, multiplication or division is performed before addition or subtraction.

For example, in this expression, the numbers `2` and `10` are multiplied first, and then the number `5` is added to the product:

```python
5 + 2 * 10
```

The result is `25`.

We can change the order of operations (and the result) by adding the parentheses around the numbers:

```python
(5 + 2) * 10
```

The result of this expression is now `70` because the parentheses tell Python to add `5` to `2`, and then multiply the result by `10`.

Parentheses can be nested, which means that there can be parentheses inside parentheses, like this:

```python
((5 + 2) * 10) / 7
```

In this case, Python evaluates the innermost parentheses first, then the outer ones, and then the final division. So it adds `5` to `2`, then multiplies the result by `10`, and then divides that by `7`.

## Saving Your Python Programs

As we saw, we can write Python code directly into the shell window... but Python programs wouldn't be very useful if you needed to rewrite them every time you wanted to use them.

Sure, it might be fine for short programs, but a large program could have millions of lines of code!

Luckily, we can save our programs for future use.

To create and save a new program, enter `idle` in the Windows search box, and select IDLE (Python 3.11.1 64-bit). In a Mac, open your Applications folder and open the Python 3.11 folder to find IDLE.

IDLE (Integrated DeveLopment Environment) is a Python file editor which let you write programs in Python.

When you open IDLE, you will see the Python shell. Click File › New Window. An empty window will appear.

Paste the code from the previous example into the window, then click File ▸ Save. Enter `hello.py` as the file name, and save it to your desktop. Then, you can click Run › Run Module to run it.

An alternative to IDLE for Python is Pycharm, which is loved by many Python programmers. You can download the free community Pycharm from their website.

We prefer using Pycharm because it provides a more user friendly environment. It really works like a charm! You can use it to create new programs and to run saved programs directly from within Pycharm.

## Run your Python program from the Terminal

We can also run our program from the Terminal by taking these steps:

### For Windows

1. Open the Command Prompt from the Start Menu or Windows search.
2. Enter `cd Desktop` in the command window to change the directory to the folder containing our program.
3. Type `python hello.py` to run the program.

### For Mac and Linux

1. Open the Terminal app from Applications.
2. Enter `cd ~/Desktop` in your terminal to change the directory to the folder containing the program.
3. Type `python3 hello.py` to run it.

With some luck, you should see the result of your Python program printed out!

## Recap

You just learned how to set up Python and how to start playing with it! Also:

- How to save your programs
- How to create variables to name values
- How to use parentheses to control the order of operations.

Now would be a great time for a celebratory dance! 🎉
