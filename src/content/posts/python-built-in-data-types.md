---
title: "Python built-in data types"
author: Adrian Cruz
pubDatetime: 2021-10-11T17:00:00Z
tags:
  - Python
description: "Python is a batteries-included language. This means it ships with everything you need to get things working without having to install and compile external..."
---

Python is a _batteries-included_ language. This means it ships with everything you need to get things working without having to install and compile external packages. That includes a lot of data types and collections to help you manage the data that your program needs. Today we're taking a deep dive into the built-in types that are available in python and how to use them.

## Booleans

Boolean values are simple `True` or `False` values to represent logical truth values. These values can also be combined in boolean algebraic expressions to represent logical operations like `==`, `and`, `or`, and `not` . Here's an example of how we use booleans.

```python
>>> is_true = True
>>> is_false = False
>>> is_true == is_true
True
>>> is_true and is_false
False
>>> is_true and not is_false
True
>>> 1 == True and 0 == False
True
```

## Numeric

Numeric types are used to represent numbers or amounts. Python has a few types for numbers, the main ones being `int` and `float` here's an example:

```python
>>> one = 1  # an int value
>>> one_float = 1.0  # a float value
>>> total = 1 + 2  # an int value = 3
>>> big = 1234567890123456789012345678901234567890  # also an int
```

Note in the last example that python has arbitrary integer precision, which means it can hold really large numbers!

## Decimal

Even though we can represent floating-point numbers using float types, [floats have some limitations](https://docs.python.org/3/tutorial/floatingpoint.html) in how they're represented internally and can lead to precision issues. Check this out:

```python
>>> .1 + .1 + .1
0.30000000000000004
>>> .1 + .1 + .1 == 0.3
False
```

Hmmm, so even though we're just adding `0.1` three times, somehow we end up with a value that's larger than `0.3`. It is only larger by a very small fraction, but still. If we were adding up transactions in a bank account, that could result in giving a user more money than their original amount. So to avoid precision issues, we should use decimals to guarantee correctness.

```python
>>> from decimal import Decimal
>>> dec = Decimal('0.1')
>>> dec + dec + dec
Decimal('0.3')
>>> dec + dec + dec == Decimal('0.3')
True
```

Decimal can be initialized from integers, strings, floats, or tuples. But if you initialize them from float values, you will run into the same issues as using floats, so just use strings!

## Strings

Strings are for representing text data. Like names, addresses, and so on. You can initialize a string by surrounding its value with quotes, either double, singles, or even triple quotes like so:

```python
>>> a_string = "Hello World!"
>>> escaped = "I contain \"double quotes\""
>>> long_string = """
... This is a long string
... with multiple lines
... """
>>> singles = 'Can also use single quotes'
```

The de-facto standard is to use double quotes for string values, and triple quotes for comments that span multiple lines.

Strings are a sequence that is indexed starting at zero. You can access any element in the string by index so in our previous example, `a_string[0]` is the letter `H`, while `a_string[1]` is the letter `e` and so on. Strings also have a lot of useful methods.

## Tuples

Sometimes we have two pieces of data that are related to each other and should be stored together. For example, a first name and last name. Or a point represented by `x, y` or even more than two pieces, like a 3d point such as `x, y, z`. In python, we can represent that using a Tuple, which is a container type. To create tuples, simply wrap your values with parenthesis.

```python
>>> point = (0, 3)
>>> point3d = (0, 3, 12)
>>> person = ('Jon', 'Snow')
>>> mixed = ('Jon', 23, 1992)  # tuple with mixed types
```

Those are all tuples and they come in very handy. Something to note is that you cannot add more elements to a tuple after creating it. But you can access the elements in a tuple by index, just like strings. So in the example above, `point[0]` would evaluate to `0`, while `point[1]` gives `3`. Another cool trick is that you can get multiple elements out of a tuple by assigning multiple variables. This is also known as unpacking a tuple:

```python
>>> x, y, z = point3d  # assigning multiple values
>>> x
0
>>> y
3
>>> z
12
```

## Lists

Lists are similar to tuples in that they can hold any number of values, but it is mutable after created. So we can add more later. To initialize a list, we add square brackets around its values, like this:

```python
>>> letters = ["a", "b", "c"]
>>> letters
['a', 'b', 'c']
>>> letters.append("x")  # add a single value
>>> letters
['a', 'b', 'c', 'x']
>>> letters.extend(["y", "z"])  # add multiple values
>>> letters
['a', 'b', 'c', 'x', 'y', 'z']
>>> letters[0]
'a'
>>> letters[-1]
'z'
```

Note how we can also get elements from the list by index. In the last example, we are accessing `letters[-1]`, which in python means the first value from the end. We can also remove elements from the list, or merge values from two lists using [list methods.](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists)

## Sets

Another container type similar to Lists is the **Set**. The difference is that a list can contain duplicated values, while a set only contains unique values. Adding a value to a set that is already in the set does nothing. Sets are pretty useful when we only care about unique values. Another crucial difference is that lists maintain the order of elements as they are added, while sets do not guarantee any particular order. See below:

```python
>>> vowels = {"a", "e", "i", "o", "u"}  # initializes a set
>>> vowels
{'e', 'u', 'a', 'o', 'i'}  # note the order changed
>>> vowels.add('a')
{'e', 'u', 'a', 'o', 'i'}
>>> vowels.remove('u')
>>> vowels
{'e', 'a', 'o', 'i'}
```

We can also perform set operations to join, merge, or even exclude elements from the set. [See some more examples here](https://docs.python.org/3/tutorial/datastructures.html#sets).

## Dictionaries

As the name implies, dictionaries or `dict` in python land, are useful for mappings or data which is identified by some key and has some value associated with that key. An example of this is a real-life dictionary, in which you have the word (key) and the definition as the value. A phone book (remember those?) is another kind of dictionary where the keys are the phone numbers and the values the information associated with the owner of the phone number, such as name, address, etc. Let's see some python examples:

```python
>>> MLB_team = {
...     'Colorado': 'Rockies',
...     'Boston': 'Red Sox',
...     'Minnesota': 'Twins',
...     'Milwaukee': 'Brewers',
...     'Seattle': 'Mariners'
... }

# alternatively, use the dict() constructor
>>> MLB_team = dict(
...     Colorado='Rockies',
...     Boston='Red Sox',
...     Minnesota='Twins',
...     Milwaukee='Brewers',
...     Seattle='Mariners'
... )

>>> type(MLB_team)
<class 'dict'>
>>> MLB_team
{'Colorado': 'Rockies', 'Boston': 'Red Sox', 'Minnesota': 'Twins', 'Milwaukee': 'Brewers', 'Seattle': 'Mariners'}
```

Unlike lists and tuples, `dict` items are accessed by their key, instead of by index.

```python
>>> MLB_team['Minnesota']
'Twins'
>>> MLB_team['Colorado']
'Rockies'
>>> MLB_team['Toronto']
Traceback (most recent call last):
  File "<pyshell#19>", line 1, in <module>
    MLB_team['Toronto']
KeyError: 'Toronto'
```

_Accessing a missing key results in a `KeyError` exception._

If you try to access a key that is not in the dictionary, python throws a `KeyError`. You can also add and update keys by setting a new value for the key:

```python
>>> MLB_team['Kansas City'] = 'Royals'
>>> MLB_team
{'Colorado': 'Rockies', 'Boston': 'Red Sox', 'Minnesota': 'Twins', 'Milwaukee': 'Brewers', 'Seattle': 'Mariners', 'Kansas City': 'Royals'}
```

Any given key can only appear in a dictionary once. If you try to set a duplicated key, it will just update the value associated with it. For more info on dictionaries, check out the [list of supported operations](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict).

## Iterators

We have discussed a few different types of containers like strings, lists, sets, and dictionaries. In python, we can iterate over the elements in a container using iterators. The iterator is a special type that represents the position in a sequence and has only one operation, which is `next()`. If you've worked with database cursors, iterators are a similar concept. Here's an example:

```python
>>> my_list = [1, 2, 3]
>>> iterator = iter(my_list)
>>> next(iterator)
1
>>> next(iterator)
2
>>> next(iterator)
3
```

Note that now the iterator has returned the last element in the list. Watch what happens if we call `next()` again:

```python
>>> next(iterator)
StopIteration
```

Python raises a `StopIteration` exception to signal the end of the sequence. You should handle this using a `try/except` block.

## Immutables

Sometimes you want your data to be read-only. Meaning you want to prevent changing their values once it's initialized. This is where immutable types come in handy. In python, strings and tuples are immutable. Once you initialize them, you can't change them, you can only assign a new value to them. Lists, sets, and dictionaries are mutable after the fact since you can add, remove and update their values. However, python also has a `frozenset` which behaves like an immutable set and supports the same operations as regular sets.

There is no built-in `frozendict` but [we might get one soon](https://www.python.org/dev/peps/pep-0603/). If you do need an immutable dictionary, you can install the [frozendict package with pip](https://pypi.org/project/frozendict/).

## Functions

Functions are a special data type that only runs when we ask it to. Functions are created using a function definition and they only have one operation, which is to call it. They can receive data to operate on, using parameters. A function can also return some data out to the caller.

```python
>>> def add(num, other):
...     return num + other
...
>>> add(1, 1)
2
>>> add(0.1, 0.2)
0.30000000000000004
>>> type(add)
<class 'function'>
```

Here we defined a function called `add` which receives two parameters and returns the sum of the parameters. We then called the function with different values and got back a result, which is the sum. Finally, we use another built-in function to inspect the type of our function, which is (duh) a `function`. [See more built-in functions here.](https://docs.python.org/3/library/functions.html#built-in-functions)

## Classes

Classes are how we make objects in python. An object is just an abstraction for a data type that is actually composed of multiple pieces of data. For example, consider a dog. We might know many things about a dog like its name, kind, age, and weight. We can represent all these pieces of data about a dog using strings or tuples, but a better approach is to use an object to hold all the information about our dog:

```python
class Dog:
    def __init__(self, name, kind, age):
        self.name = name
        self.kind = kind
        self.age = age
```

Here we have defined a class that contains information about our dog. Now we can represent multiple types of dogs by creating instances.

```python
>>> leo = Dog("Leo", "german shepherd", 1)
>>> neeko = Dog("Neeko", "pitbull", 2)
```

This creates two new `Dog` instances — one for a one-year-old German shepherd dog named **Leo** and one for a two-year-old pitbull named **Neeko**. We can also access and update dog attributes by name:

```python
>>> leo.age = 1.5
>>> leo.age
1.5
```

Classes are special too because we can add functionality by defining methods which we can then call in the instances. Methods are just a special type of function which is associated with a specific class.

```python
class Dog:
    def __init__(self, name, kind, age):
        self.name = name
        self.kind = kind
        self.age = age

    def bark(self):
        return "Woof, woof!"

    def sit(self):
        return "Okay I'm sitting."
```

Now we can call these methods on our instances:

```python
>>> leo.bark()
'Woof, woof!'
>>> leo.sit()
"Okay I'm sitting."
```

## None

Finally, the last type in our list is `None`. This is just a special python type to represent empty values. It supports no other operations and functions that don't have a return statement will implicitly return `None` when they're done.

And there you have it, that's the basic built-in python types! Hope you learned something.
