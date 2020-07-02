function makeApiCall(next) {
    setTimeout(next, 2000); // simulate API call with setTimeout
}

// CALLBACKS
// // Handling with a callback
// loadData({data: true}, (error, response) => {
//     if (error) return console.log('Error: ' + error);
//     console.log('Success: ' + response);
// });
//
// // Defining a function to take a callback
// function loadData(input, next) {
//     makeApiCall((resultFromApiCall) => {
//         if (input.data) return next(null, 'yay');
//         return next('input was false', null)
//     });
// }

// PROMISES
// Handling a promise
loadData({data: true})
    .then((response) => {
        console.log('Success: ' + response);
    })
    .catch((error) => {
        console.log('Error: ' + error);
    });

// Defining a promise
function loadData(input) {
    return new Promise((resolve, reject) => {
        makeApiCall(() => {
            if (input) return resolve('yay');
            return reject('input was false')
        });
    });
}

// ASYNC AWAIT
async function load(input) {
    let promise = new Promise((resolve, reject) => {
        makeApiCall(() => {
            if (input) return resolve('yay');
            return reject('input was false')
        });
    });

    let response;
    try {
        response = await promise;
    } catch(err) {
        return console.log('Error: ', err);
    }
    console.log('success');
    console.log(response);
}

// load(true);
// load(false);

// Closer look at promises
// Promise chaining
new Promise((resolve, reject) => {
        resolve('Peppa');
    })
    .then((value) => {
        return value + ' is';
    })
    .then((value) => {
        return value + ' a'
    })
    .then((value) => {
        // return value + ' very good'
        // Can return another promise
        return new Promise((resolve, reject) => {
            makeApiCall(() => {
                // resolve(value + ' very good');
                reject(value + ' bad');
            })
        });
    })
    .then((value) => {
        return value + ' dog'
    })
    .then((value) => {
        console.log(value);
    })
    // Anytime there's an error in the above chain it will jump to the next catch block
    .catch((err) => {
        console.log('Error:', err);
    })
    // Then it will continue to the next then block, either after the catch or after the previous then (skipping the catch block)
    .then(() => {
        console.log('aarf!');
    });

// Promise all
let promises = ['a', 'b', 'c', 'd']
                    .map((x) => new Promise((yay, nay) => yay(x + ' is a letter')));;
Promise.all(promises)
    .then(console.log);
