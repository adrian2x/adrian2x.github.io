---
title: "Choosing the Right Data Structures in Python"
author: Adrian Cruz
pubDatetime: 2022-06-11T17:00:00Z
tags:
  - Python
description: "In this article, we'll take a tour of the fundamental data structures and implementations built into Python and its standard library. As a Python..."
---

In this article, we'll take a tour of the fundamental data structures and implementations built into Python and its standard library.

As a Python developer, understanding and utilizing various data structures is a fundamental part of writing efficient and effective code. Each data structure provides a particular way of organizing data so it can be accessed efficiently, and learning when to use each one can greatly improve the performance and readability of your code. This information will also help you shine in Python coding interviews.

### Table of Contents

- [Dictionaries](#dictionaries)
- [Lists](#lists)
- [Tuples](#tuple)
- [Sets and Multisets](#sets-and-multisets)
- [Stacks](#stacks)
- [Queues](#queues)
- [Priority Queues](#priority-queues)

## Dictionaries

In Python, a dictionary (often referred to as a `dict`) is a data structure that stores a collection of items, where each item is a key-value pair. It is an unordered collection, which means that the items are not stored in a particular order, and the elements are accessed using keys rather than indexes.

### dict - General-purpose Dictionaries

Dictionaries are defined using curly braces `{}`, with keys and values separated by colons `:` – here's an example of how to work with dictionary:

```python
# Creating a dictionary
my_dict = {'name': 'John Doe', 'age': 30, 'gender': 'male'}

# Or with the dict constructor
my_dict = dict(name='John Doe', age=30, gender='male')

# Accessing elements of dictionary
print(my_dict['name'])  # 'John Doe'

# Return default if key is not found
print(my_dict.get('age'))  # 30
print(my_dict.get('job', 'Not Found'))  # 'Not Found'

# Get the dictionary members
print(my_dict.keys())  # ['name', 'age', 'gender', 'job']
print(my_dict.values())  # ['Jane Doe', 30, 'male', 'software engineer']
print(my_dict.items())  # [('name', 'Jane Doe'), ('age', 30), ('gender', 'male'), ...]
```

**Note:** while standard `dict` instances preserve the insertion order of keys in CPython 3.6 and above; this is just a side effect of the CPython implementation and is not defined in the language spec.

### OrderedDict - Preserve Insertion Order of Keys

An `OrderedDict` is a subclass of the built-in `dict` class in the `collections` module of python, that remembers the order in which items were added. It is similar to a regular dictionary, but it maintains the order of the items, so that when you iterate over the items, they are returned in the order they were added. Here's an example of how to use an `OrderedDict`:

```python
from collections import OrderedDict
d = OrderedDict()
d['task1'] = 'complete'
d['task2'] = 'pending'
d['task3'] = 'in-progress'

# Returns the items in order of insertion
print(list(d.items()))
```

_Use OrderedDict to preserve insertion order_

`OrderedDict` is useful when you want to maintain the order of elements in the dictionary and you need to access the elements in the order they were added. This can be useful in situations where the order of elements is important for the functionality of your code. For example, if you want to keep track of the order in which items were added to a shopping cart, you would use an `OrderedDict`.

### defaultdict – Return Default Values for Missing Keys

A `defaultdict` works just like a regular dictionary, but it has a default value for items that do not exist yet. This can make your code simpler because you do not have to check whether a key is in the dictionary before adding or retrieving a value. They are especially useful when working with dictionaries where the keys are unknown beforehand or when you want to do some operation on keys that doesn't exist yet.

```python
from collections import defaultdict

dd = defaultdict(list)
dd['fruits'].append('apple')
dd['fruits'].append('banana')
dd['vegetables'].append('potato')

print(dd)
# {'fruits': ['apple', 'banana'], 'vegetables': ['potato']}
```

_defaultdict provides initial values_

### ChainMap – Join Multiple Dictionaries

In Python, the `collections` module provides the `ChainMap` class, which is a type of data structure that allows you to group multiple dictionaries together into a single, logical view. This can be useful in certain situations where you want to access multiple dictionaries as if they were one dictionary while still keeping them separate.

One common use case for `ChainMap` is to handle situations where you want to provide defaults for a configuration or settings but also allow users to override them with their own settings.

```python
from collections import ChainMap
dict1 = {'one': 1, 'two': 2}
dict2 = {'three': 3, 'four': 4}
chain = ChainMap(dict1, dict2)
# ChainMap({'one': 1, 'two': 2}, {'three': 3, 'four': 4})
```

_Use ChainMap to merge multiple dicts_

---

## Lists

A `list` is an ordered, **mutable** collection of items that can be of any type. Lists are defined by enclosing the elements in square brackets `[]`, separated by commas. Here's an example of how to create and use a list in Python:

```python
# Creating a list
my_list = [1, "hello", 3.14, True]

# Accessing elements of list
print(my_list[0])  # 1
print(my_list[1])  # 'hello'
print(my_list[-1])  # True

# iterating over the list
for item in my_list:
    print(item)

# Modifying the list
my_list[0] = "world"
# ["world", 'hello', 3.14, True]

my_list.append(4)
# ["world", 'hello', 3.14, True, 4]

my_list.remove("world")
# ['hello', 3.14, True, 4]
```

_Lists have many methods and functions_

Lists are mutable, which means that the elements of a list can be modified after it is created. This is the main difference between lists and tuples.

## Tuple

In Python, a tuple is an **immutable**, ordered collection of items that can be of any type. Tuples are defined by enclosing the elements in parentheses `()`, separated by commas. For example:

```python
# Creating a tuple
t = (1, "hello", 3.14, True)

# Accessing elements of tuple
print(t[0])  # 1
print(t[1])  # 'hello'
print(t[-1])  # True

# iterating over tuple
for item in t:
    print(item)
```

_Use a tuple as a simpler version of list_

Tuples are useful when you want to group a set of related items together, like coordinates or a name and an age, or when you want to ensure that the data remains constant throughout the program execution. You can also use them as keys in dictionaries and as elements of sets because they are immutable.

### NamedTuple

The `NamedTuple` is a subclass of a tuple that allows accessing the elements of the tuple using human-readable names rather than index numbers:

```python
class Car(NamedTuple):
    make: str
    color: str
    mileage: float

car1 = Car('Jeep', 'blue', 9047.3)
# Car(make='Jeep', color='blue', mileage=9047.3)

# Accessing fields:
car1.mileage  # 9047.3

# Fields are immutable:
car1.mileage = 12  # AttributeError: "can't set attribute"
```

_A NamedTuple can be accessed by field name_

`NamedTuple`s are useful when working with tuples that have a clear meaning and intent, as they make it easier to understand the code and reduce the likelihood of bugs caused by using the wrong index numbers.

`NamedTuple`s make the code more readable and understandable, and they reduce the need for comments or variable names to explain the purpose of the tuple.

---

## Sets and Multisets

A set is an unordered collection of objects that does not allow duplicate elements. Typically, sets are used to quickly test a value for membership in the set, to insert or delete new values from a set, and to compute the union or intersection of two sets.

```python
vowels = {'a', 'e', 'i', 'o', 'u'}
print('i' in vowels)  # True
letters = set('alice')
letters.intersection(vowels)  # {'a', 'e', 'i'}
```

_Intersect two sets in Python_

### frozenset – Immutable Sets

The `frozenset` class implements an immutable version of a `set` that cannot be changed after it has been constructed (no inserts or deletions.) Because frozen sets are static and hashable, they can be used as dictionary keys or as elements of another set, something that isn’t possible with regular (mutable) set objects.

```python
vowels = frozenset({'a', 'e', 'i', 'o', 'u'})
vowels.add('p')
# AttributeError:
# "'frozenset' object has no attribute 'add'"
```

_frozenset is a read only set_

### Counter – Multisets

The `collections.Counter` class in the Python standard library implements a multiset (_or bag_) type that allows elements in the set to have more than one occurrence.

This is useful if we need to keep track of how many times an element is included in the set:

```python
from collections import Counter

inventory = Counter()

loot = {'gold': 1, 'bread': 3}
inventory.update(loot)
# Counter({'bread': 3, 'gold': 1})

len(inventory)  # 2
# Note: only unique elements, not total
```

_Counter in Python_

---

## Stacks

A useful real-world analogy for a stack data structure is a stack of plates – similar to a stack of plates, adding or removing is only possible at the top. To access plates lower in the stack, each plate must be removed one by one (Last In, First Out). Whenever a new plate is added, it is placed on top of the stack.

Both stacks and queues are linear collections of items. However, the way in which the items are accessed differs. In a queue, the item that was added first is the first to be removed (First In, First Out, or FIFO). Whereas in a stack, the item which was most recently added is the one that is removed first (Last In, First Out, or LIFO).

### Stack using a list

The built-in list type can be used as a stack, but be careful to only append and remove items with `append()` and `pop()` in order to avoid slow performance from having to move all the items in the list.

```python
# Create an empty stack
stack = []

# Push elements onto the stack
stack.append(1)
stack.append(2)
stack.append(3)

# Print the stack
print(stack)  # [1, 2, 3]

# Pop an element from the stack
x = stack.pop()
print(x)  # 3

# Print the remaining stack
print(stack)  # [1, 2]
```

_Using a list as a stack_

### deque – General Stacks

Even though we may be able to use a list as a stack, it may not be obvious to someone else reading our code. It's best to be explicit about the intent of the code.

We should use the `collections.deque` class instead for a safe and fast general-purpose stack implementation. Deques are actually double-ended queues, which can maintain a stack from the left or right side:

```python
from collections import deque

# Create a new deque
d = deque()

# Add elements to the deque
d.append(1)
d.appendleft(2)
d.extend([3, 4, 5])

# Remove elements from the deque
x = d.pop()
y = d.popleft()

print(x)  # 5
print(y)  # 2
print(d)  # deque([1, 3, 4])

# Remove all element
d.clear()
print(d)  # deque([])
```

_Using deque as a stack_

### LifoQueue – Locking Semantics for Parallel Computing

The `LifoQueue` (Last In, First Out) implementation in the Python standard library is synchronized and provides locking behavior to support multiple concurrent producers and consumers.

```python
from multiprocessing import Process, LifoQueue

def worker(q):
    # Get an item from the queue
    item = q.get()

    # Do something with the item
    print(f'Worker: {item}')

    # Signal that the task is done
    q.task_done()

# Create a LIFO queue
q = LifoQueue()

# Create a worker process
p = Process(target=worker, args=(q,))

# Start the process
p.start()

# Put some items on the queue
for i in range(5):
    q.put(i)

# Wait for all the tasks to be completed
q.join()

# Exit the process
p.join()
```

_LifoQueue from multiprocessing is thread safe_

In this example, a `LifoQueue` is created, and a single worker process is started that runs the `worker` function. The `worker` function is passed the `LifoQueue` as an argument, so the process can access it. The main process then puts five items on the queue and waits for them to be processed by the worker process using `q.join()`. The `worker` function takes an item from the queue, does something with it (e.g. print it out), signals that the task is done, and exits. The main process will wait on `p.join()` until the worker process finishes its task. The output will be as follows:

```text
Worker: 4
Worker: 3
Worker: 2
Worker: 1
Worker: 0
```

---

## Queues

Queues are similar to stacks, and the difference between them lies in how items are removed:

With a **stack**, you remove the item _most_ recently added (_Last In, First Out,_ or _LIFO_). With a **queue**, you remove the item _least_ recently added (_First In, First Out,_ or _FIFO_).

### collections.deque – Double Ended Queues

The deque class implements a double-ended queue that supports adding and removing elements from either end in O(1) time. Because deques support adding and removing elements from either end equally well, they can serve both as queues and as stacks.

### queue.Queue – Locking Semantics for Parallel Computing

This queue implementation in the Python standard library is synchronized and provides locking semantics to support multiple concurrent producers and consumers.

```python
import threading
import queue

def worker(q):
    while True:
        # Get an item from the queue
        item = q.get()
        if item is None:
            break

        # Process the item
        print(item)

        # Signal that task is done
        q.task_done()

q = queue.Queue()

# Put some items to the queue
for item in range(5):
    q.put(item)

# Create worker threads
t1 = threading.Thread(target=worker, args=(q,))
t2 = threading.Thread(target=worker, args=(q,))

# Wait for all the tasks to be completed
q.join()

t1.join()
t2.join()
```

_The Queue class is a thread-safe queue_

## Priority Queues

Ideally, high-priority tasks on the system (e.g., playing a real-time game) should take precedence over lower-priority tasks (e.g., downloading updates in the background). By organizing pending tasks in a priority queue that uses the task urgency as the key, the task scheduler can quickly select the highest-priority tasks and allow them to run first.

### heapq

Python provides a built-in module that implements a binary heap based on a list, which maintains the minimum element from the list in the first spot. Removing repeatedly from a min heap produces results in sorted order:

```python
import heapq

items = []
heapq.heappush(items, (2, 'code'))
heapq.heappush(items, (1, 'eat'))
heapq.heappush(items, (3, 'sleep'))

while items:
    next_item = heapq.heappop(items)
    print(next_item)

# Result:
# (1, 'eat')
# (2, 'code')
# (3, 'sleep')
```

_Maintaining a heap from list_

### PriorityQueue

The `PriorityQueue` class is a thread-safe implementation of a heap that uses locks behind the scenes. This is useful when multiple threads need access to a priority queue simultaneously.

```python
from queue import PriorityQueue

q = PriorityQueue()
q.put((2, 'code'))
q.put((1, 'eat'))
q.put((3, 'sleep'))

while not q.empty():
    next_item = q.get()
    print(next_item)

# Result:
# (1, 'eat')
# (2, 'code')
# (3, 'sleep')
```

_PriorityQueue class is a thread-safe heap_

## References

[Python Data Structures Docs](https://docs.python.org/3/tutorial/datastructures.html#data-structures)

[Leetcode Data Structures Crash Course](https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/)

[Common Python Data Structures Guide](https://realpython.com/python-data-structures/)

[Grokking Algorithms - An Illustrated Guide](https://amzn.to/3iAUia3)

---

**Did you find this helpful?**  
I’d love to hear about it. Please let me know in the comments.

**Do you have any questions?**  
Leave your question in a comment below, and we'll answer it with our best advice.
