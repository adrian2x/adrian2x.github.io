---
title: "Python asyncio - a guide to asynchronous programming"
author: Adrian Cruz
pubDatetime: 2025-09-21T17:00:00Z
tags:
  - python
  - concurrency
  - asyncio
  - async-await
description: "An introduction to async programming in Python: async/await, coroutines, the event loop, asyncio.run and gather, and when asyncio is the wrong tool."
---

In this guide, we'll introduce asynchronous programming in Python and review fundamental concepts like how to define, create and run asynchronous functions, coroutines, and some common use cases and best practices.

You may have seen asyncio in a new project you started working on. Or perhaps in a code example of how to perform a common task:

- Perhaps you need to use an API and the code examples use asyncio.
- Or you need to integrate a new library that uses asyncio.
- Or you found some code snippets that use asyncio.

Once you understand the concepts in this guide, you will be able to write programs that use the asyncio library to handle many IO-bound tasks concurrently in a single thread, without the overhead of creating and managing threads yourself.

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

We use `async def` to define asynchronous functions in Python. These are special types of functions that don't execute right away when called. Instead, they are scheduled, and we must then use `await` to execute and wait for the function to return.

This last point is key and is the reason why async functions are so powerful.

We can run an async function from regular (synchronous) code with `asyncio.run()`, which starts an event loop, runs the coroutine to completion, and then shuts the loop down.

```python
import asyncio

async def my_async_function():
    await asyncio.sleep(1)
    print("Hello, World!")

asyncio.run(my_async_function())
```

## What is the Event Loop

The **event loop** is the central mechanism in asyncio that schedules and runs asynchronous tasks. It works by continuously polling for events and running the appropriate tasks when they are ready.

You can think of the event loop as a kind of "coordinator" that manages the execution of asynchronous tasks.

### Creating and customizing event loops

By default, `asyncio.run()` creates a fresh event loop for you, runs your coroutine on it, and closes the loop again when the coroutine finishes. This is the recommended entry point, so you rarely need to manage a loop yourself.

```python
import asyncio

async def my_async_function():
    await asyncio.sleep(1)
    print("Hello, World!")

# asyncio.run() creates the event loop, runs the coroutine, and closes the loop
asyncio.run(my_async_function())
```

In older code you may still see the loop managed by hand with `asyncio.get_event_loop()`, `loop.run_until_complete()`, and `loop.close()`, but that pattern is discouraged now. When you need the loop from inside a running coroutine - for example to schedule a low-level callback - use `asyncio.get_running_loop()`.

Here are some of the methods a loop object exposes for scheduling and running work:

1. `loop.run_forever()`: This method runs the event loop indefinitely. It blocks until the event loop is stopped with the `loop.stop` method or until an exception is raised.
2. `loop.run_until_complete(future)`: This method runs the event loop until the given `future` is completed. It blocks until the `future` is done or until an exception is raised.
3. `loop.run_in_executor(executor, func, *args)`: This method runs the given `func` in a thread or process executor and returns a `Future` object. The event loop will run until the `Future` is done or until an exception is raised.
4. `loop.call_soon(callback, *args)`: This method schedules the given `callback` to be run as soon as possible, on the next iteration of the event loop. It does not block.
5. `loop.call_later(delay, callback, *args)`: This method schedules the given `callback` to be run after the specified `delay` in seconds. It does not block.

## What Are Coroutines

A coroutine is a task that can be suspended and resumed. In the context of asynchronous programming, when we talk about tasks that can be performed concurrently, we are referring to coroutines.

Therefore, coroutines are the unit of concurrency used in asyncio programs.

Many coroutines can be created and executed at the same time. They have control over when they will suspend and resume, allowing them to cooperate as to when concurrent tasks are executed.

This is called **cooperative multitasking** and is different from the multitasking typically used with threads called _preemptive multitasking_.

A coroutine can be defined using the `async def` expression. It can take arguments and return a value, just like a function. Calling a coroutine function will create a coroutine object, but it **does not** execute the coroutine function right away.

```python
import asyncio

async def my_coroutine(delay):
    await asyncio.sleep(delay)
    print(f'Finished waiting for {delay} seconds')

async def main():
    # calling the coroutine function creates a coroutine object...
    coro = my_coroutine(2)
    # ...and awaiting it runs the coroutine and blocks until it finishes
    await coro

asyncio.run(main())
```

## Creating and awaiting coroutines

When a coroutine is created but never executed, we will see a warning like this when the Python program finishes:

```bash
sys:1: RuntimeWarning: coroutine 'my_coroutine' was never awaited
```

Outside of an async function, `await` is a syntax error, which is why the examples above wrap their `await` expressions in a coroutine and start it with `asyncio.run()`. If you just want to experiment interactively, you can start the asyncio REPL, which runs on top of an event loop so you can use top-level `await` directly at the prompt:

```bash
python -m asyncio
```

Note that `python -m asyncio` starts an interactive REPL - it does not run a script file. Some environments, such as IPython and Jupyter, also let you use top-level `await` in a cell.

Having top level `await` is neat, but it can cause problems too. There can only be one event loop running in a thread. If any of your code tries to launch a second event loop, perhaps by calling `asyncio.run()` from inside a running loop, you'll get an error, so be careful.

### What's so great about coroutines

Threads and processes achieve multitasking managed by the operating system (OS) that chooses which threads and processes should run, when, and for how long. The OS switches between threads and processes rapidly, suspending those that are not running and resuming those granted time to run. This is called **preemptive multitasking**.

Coroutines in Python provide an alternative type of multitasking called **cooperating multitasking**. This allows coroutines to cooperate by design, choosing how and when to suspend their execution.

Another key aspect of coroutines is that they are more lightweight than threads. This means they are faster to start and use less memory. Essentially a coroutine is a special type of function, whereas a thread is represented by a Python object associated with an operating system thread with which the object must interact.

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
import asyncio
import time

def my_blocking_task():
    # a synchronous, blocking function (for example, heavy file or CPU work)
    time.sleep(1)
    print("blocking task done")

async def main():
    # execute the blocking function in a separate thread
    await asyncio.to_thread(my_blocking_task)

asyncio.run(main())
```

The `asyncio.to_thread()` function takes a function to execute and any arguments. It returns a coroutine that can be awaited or scheduled as an independent task. The function is then executed in a separate thread.

The `asyncio.to_thread()` function creates a `ThreadPoolExecutor` behind the scenes to execute blocking calls.

As such, the `asyncio.to_thread()` function is only appropriate for IO-bound tasks, and we should not use this method of asyncio for CPU bound tasks.

## Using Asyncio for Network Programming

Network calls are a good use case for asyncio since they are IO-bound. When a coroutine `await`s a read or write, it suspends and hands control back to the event loop, which is then free to run other coroutines until the IO is ready. The coroutine resumes right where it left off once the data has arrived. So while a single coroutine still waits for its own IO to finish, the program as a whole never sits idle.

The read and write operations are handled by the underlying operating system, and the coroutine is resumed with the result once the data is available.

**Non-blocking** IO is a way of performing IO where reads and writes are requested, although performed asynchronously. The caller does not need to wait for the operation to complete before returning. Non-blocking IO is implemented in practice with asynchronous programming.

Let's go through a few asyncio examples that implement non-blocking IO in client and server networking:

### HTTP server

This is an example of an asyncio-based HTTP server that serves static files from a given directory. It uses the `aiohttp` library to handle HTTP requests and responses.

```python
from aiohttp import web

async def handle(request):
    # web.FileResponse streams the file asynchronously instead of
    # blocking the event loop with a synchronous open().read()
    return web.FileResponse('index.html')

app = web.Application()
app.add_routes([web.get('/', handle)])

if __name__ == '__main__':
    web.run_app(app)
```

### WebSocket server

This is an example of an asyncio-based WebSocket server that broadcasts messages to all connected clients. It uses the `websockets` library to handle WebSocket connections.

```python
import asyncio
from websockets.asyncio.server import serve

# registry of currently connected clients
clients = set()

async def broadcast(message):
    # iterate over a copy so the set can change while we send
    for ws in set(clients):
        await ws.send(message)

async def handler(websocket):
    # in websockets 14+, the handler takes only the connection;
    # the request path is available as websocket.request.path
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message)
    finally:
        clients.discard(websocket)

async def main(host, port):
    async with serve(handler, host, port) as server:
        await server.serve_forever()

if __name__ == '__main__':
    asyncio.run(main('127.0.0.1', 8888))
```

### WebSocket client

This is an example of an asyncio-based WebSocket client that connects to a server, sends a message, and prints the response. It uses the `websockets` library to handle the WebSocket connection.

```python
import asyncio
from websockets.asyncio.client import connect

async def main():
    async with connect('ws://localhost:8888') as websocket:
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

```text
Starting task one
Starting task two
Finishing task one
Finishing task two
[1, 2]
```

As you can see, the tasks run concurrently rather than sequentially. While `task_one` is waiting on `asyncio.sleep(1)`, the event loop runs `task_two`, so the total run time is close to the longest task (about 2 seconds) rather than the sum of both. This is where asyncio shines: overlapping IO-bound waits, not running work across extra CPU cores.

The `asyncio.gather()` method accepts many arguments and returns a list of the results returned by all the coroutines.

It is also common to create many coroutines beforehand and then gather them later. We can collect many coroutines together into a list either manually or using a list comprehension. We can then unpack this list as arguments to `gather()`. Note the use of the star operator (`*`) here:

```python
import asyncio

async def my_coroutine(delay):
    await asyncio.sleep(delay)
    return delay

async def main():
    # create many coroutines
    coros = [my_coroutine(i) for i in range(10)]
    # then run them all concurrently
    results = await asyncio.gather(*coros)
    print(results)

asyncio.run(main())
```

### How to use asyncio.wait() to manage multiple asynchronous tasks

The `asyncio.wait()` function blocks and returns a tuple containing two sets of tasks: those that have completed and those that are still pending. In this example, we iterate over the completed tasks and print their results.

Using the `asyncio.wait()` function, you can easily manage multiple asynchronous tasks and perform actions when they have completed. This can be particularly useful for situations where you need to wait for multiple tasks to complete before moving on to the next step of your program and for setting timeouts for some tasks.

```python
import asyncio

async def task_one():
    await asyncio.sleep(1)
    return 1

async def task_two():
    await asyncio.sleep(2)
    return 2

async def main():
    # since Python 3.11, asyncio.wait() only accepts Task objects,
    # so wrap the coroutines with asyncio.create_task() first
    tasks = [asyncio.create_task(task_one()), asyncio.create_task(task_two())]
    completed, pending = await asyncio.wait(tasks)

    results = [t.result() for t in completed]
    print(results)

asyncio.run(main())
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
        result = None
        for task in self.tasks:
            result = await task(*args, **kwargs)
            # feed this task's result in as the argument to the next one
            args = (result,)
        return result
```

To use this class, you can pass a list of asynchronous tasks to the constructor and then call the `Chain` instance to execute the tasks in the specified order. The result of each task is passed as an argument to the next task in the chain.

```python
import asyncio

async def add_one(x):
    await asyncio.sleep(0.1)
    return x + 1

async def double(x):
    await asyncio.sleep(0.1)
    return x * 2

async def main():
    chain = Chain([add_one, double])
    # runs add_one, then feeds its result into double
    result = await chain(1)  # (1 + 1) * 2 -> 4
    print(result)

asyncio.run(main())
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

Only a single coroutine runs at a time by design. asyncio runs all of your coroutines in one thread on a single event loop, and they cooperate by voluntarily suspending at `await` points, so there is never more than one coroutine executing at any moment. This serialization is not caused by the Global Interpreter Lock - it is simply how a single-threaded event loop works. Because your code still runs in one thread, asyncio does not execute Python across multiple CPU cores, so it is not faster than well-written threaded code and is not multithreaded and not parallel.

Any program you can write with `asyncio`, you can also write with threads, and it could actually be as fast or even faster. It could also probably be simpler and easier to read and interpret by other developers.

If you need to bypass the GIL and take full advantage of multiple CPU cores in your Python program, you may want to consider using a different concurrency framework like `multiprocessing` and other libraries such as `concurrent.futures`. These frameworks allow you to create multiple processes, each with its own Python interpreter and GIL, which can run in parallel on separate CPU cores.

Any concurrency pitfalls you might expect with threads, you can also encounter with coroutines. You must ensure coroutines are thread safe and safe from deadlocks and race conditions, just like with threads or processes.

Another reason not to use `asyncio` is that you may prefer a different style. Asynchronous programming is different from procedural, object-oriented, and functional programming, and some developers find it harder to read and reason about. You can achieve concurrency in many other ways, using threads or processes as needed.

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
