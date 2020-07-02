function makeApiCall(next) {
    setTimeout(next, 2000);
}


// callback, cb
// function loadData(request, next) {
//     makeApiCall((data) => {
//         if (request.x === undefined) {
//             next('x is undefined', null);
//         }
//         else next(null, {x: request.x + 1})
//     })
// }
//
// loadData({}, (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// })


// PROMISES

loadData() {
    return new Promise((resolve, reject) => {
        if (Math.random() > .5) {
            resolve('yay greater than .5')
        } else {
            reject('oh no, less than .5')
        }
    });
}

let loadData = true;
loadData()
    .then((data) => { // 'yay greater than .5'
        console.log('success:' + data);
    })
    .then()
    .then()
    .catch((err) => { // 'oh no, less than .5'
        console.log('error: '+ err);
    })
    .then(() => {
        loadData = false;
    });

// ASYNC await
