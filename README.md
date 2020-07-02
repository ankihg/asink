# Async programming

## Motivation
When you think about code simply, it is a list of tasks for the program to execute.
```
let x = 5;
x = 3;
console.log(x);
```
These can all be immediately executed within the program.

But sometimes we want to call something that will run code on another program and we will have to wait for it to return a value (ex an API call)

Our program will be inactive for the time it takes to load the data from the backend
```
let x = 5;
x = waitToLoadXFromBackend(); // Blocks program execution, takes 5 seconds to load and will return the value 3
console.log(x);
```
This is inefficient because the program can't get anything else done while it's waiting for the data to load.

So JavaScript handles this by having **non-blocking** function calls
```
let x = 5;
x = loadXFromBackend(); // Does not block execution but will take 5 seconds to load and set x to 3
console.log(x);
```
This is good because we are no longer stuck waiting for the data to return but it introduces some complications

Looking at the same example and assume `loadXFromBackend` will take five seconds to return
```
let x = 5; // x is 5
x = loadXFromBackend(); // x will be set to 3 in 5 seconds
console.log(x); // this line runs immediately after, before x gets set to 3, logging 5
```
This will print the value `5` when we want it to print `3`

We need a way to wait for the data to load before we handle the response.

To solve this problem, we will pass `loadXFromBackend` a **callback function** to call after the data has loaded from the backend. We will put all our logic for handling the response from `loadXFromBackend` in this callback function
```
let x = 5;
loadXFromBackend((val) => {
    x = val;
    console.log(x);
});
```

JavaScript has a few approaches for handling this. **Callbacks functions**, in my opinion, are the most conceptually simple way but can become messy in practice.

## Approaches

### Threads
Many languages handle this "waiting to load" scenario by having multiple "threads" (**multi-threaded** - the ability to execute multiple lines of code at once).

("Executing in parellel")
Think: Holding your baby in one hand and washing dishes with the other at the same time

JavaScript is a **single-threaded** language meaning it can only execute one line of code at a time so it has a few techniques to pretend it's doing multiple things at once and not get hung up waiting for a result from someone else.

("Executing concurrently") Think: You fed your baby and now he will take a nap. You start to do the dishes and between each dish you check in to see if he needs anything. If you see he needs something you will take a break from dishes to care for him. Then get back to the dishes.



### Callbacks
Pass the non-blocking function another function to be called to handle the response once the data has been loaded
```
loadData((err, data) => {
    if (err) handleError(err);
    else display(data)
});
```

### Promises
Associate handlers with the non-blocking function to be executed when it completes. Successful execution will result in the `.then` handler being executed and unsuccessful execution will execute the `.catch` handler.
```
loadData()
    .then((data) => {
        display(data)
    })
    .catch((err) => {
        handleError(err);
    });
```

### Async/await
A newer approach to asynchronous code in JavaScript. It gives the appearance of blocking function calls. This is how multi-threaded code looks.

`await` can only be used inside a function labeled `async`. Execution will wait at the line labeled `await` until the promise is fulfilled but the program will be able to continue handling other tasks while it's waiting.
```
async function setup() {
    try {
        data = await loadData; // loadData is a promise
        display(data);
    } catch(err) {
        handleError(err);
    }
}
```

## A closer look at promises
### Defining a promise
Make a new promise using the `Promise` constructor.

The `Promise` constructor will take in a function that has two parameters, `resolve` and `reject`. `resolve` and `reject` are callback functions that you will use to fulfill the promise. `resolve` will successfully fulfill the promise and trigger the execution of the `.then` handler, passing whatever data you call `resolve` with to the `.then` handler. `reject` will do the same but for failure, passing the data to the `.catch` handler.

Note: You can name the `resolve` and `reject` parameters whatever you want, but these names are standard and often what you'll see in documentation.
```
let promise = new Promise((resolve, reject) => {
    if (Math.random() > .5) resolve('yay good things');
    else reject('uh oh, bad');
});
```
If we establish our promise to be handled like this and `Math.random()` gives a value greater than `.5` then the `.then` handler will be called with `result` as `'yay good things'`
```
promise
    .then((result) => { // result = 'yay good things'
        console.log(result);
    })
    .catch((err) => { //
        console.log(err);
    });
```
But if `Math.random()` gives a value less than `.5` the `.then` handler will not be called and the `.catch` handler will be called with `err` as `'uh oh, bad'`
```
promise
    .then((result) => { // NOT CALLED
        console.log(result);
    })
    .catch((err) => { // err = 'uh oh, bad'
        console.log(err);
    });
```
