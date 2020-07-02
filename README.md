# Async programming

## Motivation
When you think about simple code, it is a list of tasks for the program to execute.
```
let x = 5;
x = 3;
console.log(x);
```
These can all be immediately executed within the program.

But sometimes we want to call something that will run code on another program and we will have to wait for it to return a value (classic, everyday example is an API call)

The program will be inactive for the time it takes to load the data from the backend
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

To solve this problem, we will pass `loadXFromBackend` a **callback function** to call after the data has loaded from the backend. We will put all our logic for handling the response from `loadXFromBackend` in this callback function
```
let x = 5;
loadXFromBackend((val) => {
    x = val;
    console.log(x);
});
```


## Approaches

### Threads
Many languages handle

### Callbacks
### Promises
### Async await
