---
title: "Python asyncio - A Guide to Asynchronous Programming"
author: Adrian Cruz
pubDatetime: 2022-02-11T17:00:00Z
tags:
  - Python
  - asyncio
  - asynchronous
  - Programming Tips
  - coroutines
description: "In this guide, we'll introduce asynchronous programming in Python and review fundamental concepts like how to define, create and run asynchronous..."
---

In this guide, we'll introduce asynchronous programming in Python and review fundamental concepts like how to define, create and run asynchronous functions, coroutines, and some common use cases and best practices.

You may have seen asyncio in a new project you started working on. Or perhaps in a code example of how to perform a common task:

- Perhaps you need to use an API and the code examples use asyncio.
- Or you need to integrate a new library that uses asyncio.
- Or you found some code snippets that use asyncio.

Once you understand the concepts in this guide, you will be able to develop programs that can leverage the asyncio library in Python to process many tasks concurrently and make better use of your machine resources, such as additional CPU cores.

### Table of Contents

1. [Introduction to Asynchronous Programming](#introduction-to-asynchronous-programming)
2. [Getting Started with Asyncio in Python](#getting-started-with-asyncio-in-python)
3. [Working with Asyncio Event Loops](#what-is-the-event-loop)
4. [What Are Coroutines](#what-are-coroutines)
5. [Using Asyncio for Network Programming](#using-asyncio-for-network-programming)
6. [Advanced Asyncio Concepts](#advanced-asyncio-concepts)
7. [When to Use Asyncio](#when-to-use-asyncio)
8. [When Not to Use Asyncio](#when-not-to-use-asyncio)
9. [Best Practices for Asynchronous Programming in Python](#best-practices-for-asynchronous-programming-in-python)

## Introduction to Asynchronous Programming

**Asynchronous** refers to the concept of not occurring at the same time as something else. In the context of programming, asynchronous refers to the execution of tasks that do not block the flow of execution of other tasks. This means that multiple tasks can be performed concurrently, rather than sequentially.

This is achieved by using asynchronous function calls, which return control to the calling function before the task is completed, allowing other tasks to be executed in the meantime.

For example, we can make an asynchronous function call. This will issue the request to make the function call and will not wait around for the call to complete. We can choose to check on the status or result of the function call later.

One of the main benefits of asynchronous programming is improved performance, as it allows for non-blocking IO operations and allows multiple tasks to be performed simultaneously.

## Getting Started with Asyncio in Python

The `asyncio` module contains utilities to implement asynchronous programming in Python.

It allows you to write concurrent code using asynchronous programming techniques rather than traditional thread-based concurrent programming.

You may be wondering how asyncio differs from traditional thread-based concurrent programming in Python...

Asyncio is particularly useful in Python because it allows you to write concurrent code in a single-threaded environment, which can be more efficient and easier to work with than using multiple threads.

### Understanding the async, await syntax

We use `def async` to define asynchronous functions in Python. These are special types of functions that don't execute right away when called. Instead, they are scheduled, and we must then use `await` to execute and wait for the function to return.

This last point is key and is the reason why async functions are so powerful.

We can also execute async functions in other parts of our program with `asyncio.run()`

```python
async def an_async_function():
    await asyncio.sleep(1)
    print("Hello, World!")

asyncio.run(my_async_function())
```

## What is the Event Loop

The **event loop** is the central mechanism in asyncio that schedules and runs asynchronous tasks. It works by continuously polling for events and running the appropriate tasks when they are ready.

You can think of the event loop as a kind of "coordinator" that manages the execution of asynchronous tasks.

### Creating and customizing event loops

By default, asyncio will create an event loop for you when you use `asyncio.run()` or call `asyncio.AbstractEventLoop.run_until_complete()`. However, you can also create and customize your own event loop if needed.

```python
loop = asyncio.get_event_loop()
loop.run_until_complete(an_async_function())
loop.close()
```

The event loop starts with the `loop.run_until_complete()` method, which blocks until all tasks have completed. Finally, the event loop is closed with the `loop.close()` method.

Here are some other ways you can run an event loop in Python using the `asyncio` module:

1. `loop.run_forever()`: This method runs the event loop indefinitely. It blocks until the event loop is stopped with the `loop.stop` method or until an exception is raised.
2. `loop.run_until_complete(future)`: This method runs the event loop until the given `future` is completed. It blocks until the `future` is done or until an exception is raised.
3. `loop.run_in_executor(executor, func, *args)`: This method runs the given `func` in a thread or process executor and returns a `Future` object. The event loop will run until the `Future` is done or until an exception is raised.
4. `loop.run_as_soon_as_possible(callback)`: This method schedules the given `callback` to be run as soon as possible. It does not block.
5. `loop.call_later(delay, callback, *args)`: This method schedules the given `callback` to be run after the specified `delay` in seconds. It does not block.

## What Are Coroutines

A coroutine is a task that can be suspended and resumed. In the context of asynchronous programming, when we talk about tasks that can be performed concurrently, we are referring to coroutines.

Therefore, coroutines are the unit of concurrency used in asyncio programs.

Many coroutines can be created and executed at the same time. They have control over when they will suspend and resume, allowing them to cooperate as to when concurrent tasks are executed.

This is called **cooperative multitasking** and is different from the multitasking typically used with threads called _preemptive multitasking_.

A coroutine can be defined using the `async def` expression. It can take arguments and return a value, just like a function. Calling a coroutine function will create a coroutine object, but it **does not** execute the coroutine function right away.

```python
async def my_coroutine(delay):
    await asyncio.sleep(delay)
    print(f'Finished waiting for {delay} seconds')

# creates but does not execute the coroutine
coroutine_1 = my_coroutine(1)
# await starts the coroutine and blocks until finished
result = await my_coroutine(2)
```

## Creating and awaiting coroutines

When a coroutine is created but never executed, we will see a warning like this when the Python program finishes:

```bash
sys:1: RuntimeWarning: coroutine 'my_coroutine' was never awaited
```

We can avoid this warning and support top-level `await` expressions by starting the Python interpreter with a default event loop. This is also the default in IPython.

```bash
python -m asyncio script.py
```

Having top level `await` is neat, but it can cause problems too. There can only be one event loop running in a thread. If any of your code tries to launch an event loop, perhaps by calling `asyncio.run()`, you'll get an error, so be careful.

### What's so great about coroutines

Threads and processes achieve multitasking managed by the operating system (OS) that chooses which threads and processes should run, when, and for how long. The OS switches between threads and processes rapidly, suspending those that are not running and resuming those granted time to run. This is called **preemptive multitasking**.

Coroutines in Python provide an alternative type of multitasking called **cooperating multitasking**. This allows coroutines to cooperate by design, choosing how and when to suspend their execution.

Another key aspect of coroutines is that they are more lightweight than threads. This means they are faster to start and use less memory. They may use less than 1 KB of memory to execute. Essentially a coroutine is a special type of function, whereas a thread is represented by a Python object associated with an operating system thread with which the object must interact.

Coroutines are a new alternate, interesting, and powerful approach to concurrency, different from thread-based and process-based concurrency. As such, we may have thousands of threads in a Python program, but we could easily have tens or hundreds of thousands of coroutines just in one thread.

You can also schedule coroutines for execution in separate threads, with `ThreadPoolExecutor`, or separate processes using `ProcessPoolExecutor`.

### How to Run Blocking Tasks with Asyncio

We often need to execute a blocking function call within an asyncio application because, in practice, most workloads include a mix of IO-bound operations and also CPU-bound operations.

This could be for many reasons, such as:

- To execute a CPU-bound task like calculating something.
- To execute a blocking IO-bound task like reading or writing from a file.
- To call into a third-party library that does not support asyncio yet.

Making a blocking call directly in an asyncio program will cause the event loop to stop while the blocking call is executing. It will not allow other coroutines to run in the background.

This can be prevented by running the blocking call outside of the event loop, which we can do with `asyncio.to_thread()`.

```python
# execute a function in a separate thread
await asyncio.to_thread(my_blocking_task)
```

The `asyncio.to_thread()` function takes a function to execute and any arguments. It returns a coroutine that can be awaited or scheduled as an independent task. The function is then executed in a separate thread.

The `asyncio.to_thread()` function creates a `ThreadPoolExecutor` behind the scenes to execute blocking calls.

As such, the `asyncio.to_thread()` function is only appropriate for IO-bound tasks, and we should not use this method of asyncio for CPU bound tasks.

## Using Asyncio for Network Programming

Network calls are a good use case for asyncio since they're IO-bound, and we can just fire and forget the write or read\_,\_ and our program can go on to perform other tasks. The caller does not need to wait for the operation to complete before returning, so we should not waste time just checking on them.

The read and write operations are performed somehow (e.g., by the underlying operating system or perhaps a task queue like Kafka), and the status of the action and/or data is retrieved by the caller later, once available, or when the caller is ready.

**Non-blocking** IO is a way of performing IO where reads and writes are requested, although performed asynchronously. The caller does not need to wait for the operation to complete before returning. Non-blocking IO is implemented in practice with asynchronous programming.

Let's go through a few asyncio examples that implement non-blocking IO in client and server networking:

### HTTP server

This is an example of an asyncio-based HTTP server that serves static files from a given directory. It uses the `aiohttp` library to handle HTTP requests and responses.

```python
import asyncio
from aiohttp import web

async def handle(request):
    with open('index.html', 'rb') as f:
        return web.Response(body=f.read(), content_type='text/html')

async def main():
    app = web.Application()
    app.add_routes([web.get('/', handle)])
    return app

if __name__ == '__main__':
    web.run_app(main())
```

### WebSocket server

This is an example of an asyncio-based WebSocket server that broadcasts messages to all connected clients. It uses the `websockets` library to handle WebSocket connections.

```python
import asyncio
import websockets

async def broadcast(websockets, message):
    for ws in websockets:
        await ws.send(message)

async def handler(websocket, path):
    async for message in websocket:
        await broadcast(websockets, message)

async def main(host, port):
    server = await websockets.serve(handler, host, port)
    await server.wait_closed()

if __name__ == '__main__':
    asyncio.run(main('127.0.0.1', 8888))
```

### WebSocket client

This is an example of an asyncio-based WebSocket client that connects to a server, sends a message, and prints the response. It uses the `websockets` library to handle the WebSocket connection.

```python
import asyncio
import websockets

async def main():
    async with websockets.connect('ws://localhost:8888') as websocket:
        await websocket.send("Hello, world!")
        response = await websocket.recv()
        print(f'Received: {response}')

asyncio.run(main())
```

## Advanced Asyncio Concepts

So far, we've only seen examples of how to run a single asynchronous function to perform non-blocking IO operations.

When we have many operations to run concurrently, we need to coordinate and manage those operations. Fortunately, the asyncio module has some functions that make it easier for us.

### How to use asyncio.gather() to wait for multiple async tasks

```python
import asyncio

async def task_one():
    print("Starting task one")
    await asyncio.sleep(1)
    print("Finishing task one")
    return 1

async def task_two():
    print("Starting task two")
    await asyncio.sleep(2)
    print("Finishing task two")
    return 2

async def main():
    # This will wait for all the coroutines
    results = await asyncio.gather(task_one(), task_two())
    print(results)

asyncio.run(main())
```

This code will produce the following output:

```python
Starting task one
Starting task two
Finishing task one
Finishing task two
[1, 2]
```

As you can see, the tasks are run concurrently rather than sequentially. This can be useful for improving the performance of an application by allowing it to make better use of available CPU resources.

The `asyncio.gather()` method accepts many arguments and returns a list of the results returned by all the coroutines.

It is also common to create many coroutines beforehand and then gather them later. We can collect many coroutines together into a list either manually or using a list comprehension. We can then unpack this list as arguments to `gather()`. Note the use of the star operator (`*`) here:

```python
# creates many coroutines
coros = [my_async_task(i) for i in range(10)]
...
# then, run the tasks
results = await asyncio.gather(*coros)
```

### How to use asyncio.wait() to manage multiple asynchronous tasks

The `asyncio.wait()` function blocks and returns a tuple containing two sets of tasks: those that have completed and those that are still pending. In this example, we iterate over the completed tasks and print their results.

Using the `asyncio.wait()` function, you can easily manage multiple asynchronous tasks and perform actions when they have completed. This can be particularly useful for situations where you need to wait for multiple tasks to complete before moving on to the next step of your program and for setting timeouts for some tasks.

```python
# Run these tasks and wait
tasks = [task_one(), task_two()]
    completed, pending = await asyncio.wait(tasks)

    results = [t.result() for t in completed]
    print(results)
```

Alternatively, we could use the `asyncio.as_completed()` function to run concurrent tasks and iterate their results as they become available. This is possible because `asyncio.as_completed()` returns an iterable of the coroutines that can be awaited.

### Chaining multiple asynchronous tasks

There are situations where you may need to perform a series of asynchronous tasks in a specific order. Since coroutines are awaitable, another coroutine can `await` it. You may use this class to chain async tasks since the `asyncio` library does not (yet) provide a similar function.

```python
class Chain:
    "A class to execute async tasks sequentially"
    def __init__(self, tasks):
        self.tasks = tasks

    async def __call__(self, *args, **kwargs):
        for task in self.tasks:
            args = await task(*args, **kwargs)
            args = (result,)
        return result
```

To use this class, you can pass a list of asynchronous tasks to the constructor and then call the `Chain` instance to execute the tasks in the specified order. The result of each task is passed as an argument to the next task in the chain.

```python
chain = Chain([task_one, task_two])
# block until tasks are performed synchronously
result = await chain() # returns the last task result
```

## When to Use Asyncio

Coroutines are an alternative to threading-based concurrency that is provided by the Python language and further supported by the asyncio module. They are suited to non-blocking IO with subprocesses and sockets. However, blocking IO and CPU-bound tasks can be used in a simulated non-blocking manner using threads and processes under the covers.

Any program written using threads or processes can be rewritten or instead written using coroutines if we so desire.

A coroutine is even more lightweight than a process. Processes, like threads, are created and managed by the underlying operating system and are represented by a **multiprocessing.Process** object.

This means that coroutines are significantly faster than a process to create and start and take up much less memory. A coroutine is just a special function, whereas a Process is an instance of the interpreter that has at least one thread.

As such, we may have thousands of threads in a Python program, but we could easily have tens or hundreds of thousands of coroutines all in one thread.

## When Not to Use Asyncio

There are many misconceptions about Python concurrency and especially around asyncio. Using `asyncio` does not magically solve all the issues with Python.

For example:

- Asyncio works around the Global Interpreter Lock (GIL).
- Asyncio is faster than using threads.
- Asyncio avoids the need for locks and other synchronization methods.
- Asyncio is easier to use than threads.

These are all **False**.

Only a single coroutine can run at a time by design, and they cooperate to execute. This is just like threads under the GIL. However, the GIL still applies to `asyncio` code, and the performance of `asyncio` programs may be affected by the GIL in the same way as multithreaded programs. So `asyncio` is not faster and is also not multithreaded and not parallel.

Any program you can write with `asyncio`, you can also write with threads, and it could actually be as fast or even faster. It could also probably be simpler and easier to read and interpret by other developers.

If you need to bypass the GIL and take full advantage of multiple CPU cores in your Python program, you may want to consider using a different concurrency framework like `multiprocessing` and other libraries such as `concurrent.futures`. These frameworks allow you to create multiple processes, each with its own Python interpreter and GIL, which can run in parallel on separate CPU cores.

Any concurrency pitfalls you might expect with threads, you can also encounter with coroutines. You must ensure coroutines are thread safe and safe from deadlocks and race conditions, just like with threads or processes.

Another reason not to use `asyncio` is that you may not like asynchronous programming. Even though asynchronous programming has been popular for some time now in various programming communities, it is different from procedural, object-oriented, and functional programming, and some developers just don’t like it.

If you don’t like it, don’t use it. It’s a fair reason.

You can achieve concurrency in many ways other than using asynchronous programming, using threads or processes as needed.

You can learn all about threads and processes in our guides:

Running Multiple Processes in Python - A Multiprocessing Guide

## Best Practices for Asynchronous Programming in Python

These are some tips that will have you writing efficient and maintainable asynchronous code and save you lots of headaches:

### Use asyncio's high-level APIs whenever possible

The asyncio library provides several high-level APIs that make it easy to write concurrent code. For example, you can use the `gather()` function to run multiple tasks concurrently or the `as_completed()` function to iterate over a group of tasks as they complete. These APIs can help you write efficient and maintainable code, as they abstract away many of the low-level details of concurrent programming.

### Avoid blocking the event loop

The event loop is the heart of asyncio, and it is responsible for scheduling and executing asynchronous tasks. If you block the event loop, you can cause performance issues and disrupt the execution of other tasks. To avoid blocking the event loop, use non-blocking IO operations whenever possible, and avoid using blocking functions such as `time.sleep` or `threading.Lock`.

### Use async context managers and async iterators

Async context managers and async iterators can help you write asynchronous code that is easy to understand and maintain. For example, you can use async context managers to manage resources that need to be acquired and released asynchronously, or you can use async iterators to iterate over asynchronous data streams in a natural and intuitive way.

### Common pitfalls to avoid when doing asynchronous programming

1. Forgetting to `await` asynchronous tasks: When you `await` an asynchronous task, you are telling the event loop to execute that task and pause the current task until the awaited task completes. If you forget to `await` a task, it will be scheduled to run, but the event loop will not wait for it to complete before moving on to the next task. This can lead to unexpected behavior and race conditions.
2. Not using asynchronous functions when appropriate: On the other hand, it is important to use asynchronous functions when appropriate, as this can significantly improve the performance and scalability of your application. If you have long-running tasks or tasks that perform IO operations, consider using asynchronous functions to ensure that they do not block the event loop.
3. Not using synchronization techniques: Any concurrency pitfalls you might expect with threads, you can also encounter with coroutines. While only one coroutine can run within the event loop at one time, they can be suspended and resumed while using a shared variable. You must ensure coroutines are safe from deadlocks and race conditions, just like with threads or processes.

If you keep these practices in mind and avoid the multiple pitfalls related to concurrency and asynchronous programming, you should be able to develop Python programs that can process many tasks concurrently.

You may even want to experiment with running asynchronous tasks combined with other concurrency techniques, especially when pairing asyncio with multiprocessing and [concurrent.futures.Executor](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor) instances.

## References

- [Event Loop](https://docs.python.org/3/library/asyncio-eventloop.html)
- [Coroutines](https://docs.python.org/3/library/asyncio-task.html)
- [Using Asyncio in Python](https://amzn.to/3Q47hh3)
- [Python Asyncio The Complete Guide](https://superfastpython.com/python-asyncio/)

**How are you using asyncio in your programs?**  
I’d love to hear about it. Please let me know in the comments.

**Do you have any questions?**  
Leave your question in a comment below, and I'll answer it with my best advice.
