---
title: "The Zen of Python, by Tim Peters"
author: Adrian Cruz
pubDatetime: 2024-02-10T17:00:00Z
tags:
  - python
  - best-practices
  - philosophy
description: "PEP 20, the Zen of Python: the 19 aphorisms behind idiomatic Python, and what a few of them mean in practice."
---

Open a Python interpreter, type `import this`, and it prints a short poem back at you:

```
>>> import this
```

It's one of Python's oldest and most famous easter eggs. The text is Tim Peters' "Zen of Python," a set of guiding principles for the language's design that ships with every CPython install and is written down as [PEP 20](https://peps.python.org/pep-0020/). It's short and opinionated, and I've found it worth rereading over the years - not because it's profound, but because the trade-offs it names keep showing up in real code.

## The Zen of Python, by Tim Peters

Beautiful is better than ugly.  
Explicit is better than implicit.  
Simple is better than complex.  
Complex is better than complicated.  
Flat is better than nested.  
Sparse is better than dense.  
Readability counts.  
Special cases aren’t special enough to break the rules.  
Although practicality beats purity.  
Errors should never pass silently.  
Unless explicitly silenced.  
In the face of ambiguity, refuse the temptation to guess.  
There should be one-- and preferably only one --obvious way to do it.  
Although that way may not be obvious at first unless you’re Dutch.  
Now is better than never.  
Although never is often better than _right_ now.  
If the implementation is hard to explain, it’s a bad idea.  
If the implementation is easy to explain, it may be a good idea.  
Namespaces are one honking great idea -- let’s do more of those!

---

## What a few of them mean in practice

Read straight through, it can sound like a fortune cookie, but most of these lines map onto concrete decisions you make while writing Python. A handful I reach for the most:

**Explicit is better than implicit.** Import the names you use so a reader can trace where they came from:

```python
from math import sqrt   # not: from math import *
```

The wildcard import saves a little typing but hides which names are in scope and can silently shadow built-ins.

**Flat is better than nested.** Return early instead of wrapping the real work in layers of conditionals:

```python
if user is None:
    return None
# ... the rest runs one indent shallower
```

**Readability counts.** A comprehension usually reads better than nesting `map`, `filter`, and `lambda`:

```python
squares = [x * x for x in nums if x > 0]
```

**Errors should never pass silently.** Catch the exception you actually expect, not everything:

```python
try:
    timeout = config["timeout"]
except KeyError:
    timeout = 30   # not a bare `except: pass`
```

A bare `except` swallows typos and even Ctrl-C, turning a real bug into a mystery you debug later.

**There should be one obvious way to do it.** Joining parts into a string has an obvious answer, and it isn't a `+=` loop:

```python
line = ", ".join(parts)
```

None of this is revolutionary, and that's the point. The Zen isn't a set of rules the interpreter enforces; it describes the taste that the standard library and idiomatic Python already lean toward. Knowing it mostly helps you notice when you're fighting the language instead of going with it.
