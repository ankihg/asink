function makeApiCall(next) {
    setTimeout(next, 2000); // simulate API call with setTimeout
}

// Callbacks
function loadDataIfInputTrueCB(input, next) {
    // simulate API call with setTimeout
    makeApiCall(() => {
        if (input) return next(null, 'yay');
        return next('input was false', null)
    });
}

function runCallbackExample(input) {

    loadDataIfInputTrueCB(input, (error, response) => {
        if (error) return console.log('Error: ' + error);
        console.log('Success: ' + response);
    });

}

runCallbackExample(true);
runCallbackExample(false);

// Promises
function loadDataIfInputTrueP(input) {
    return new Promise((resolve, reject) => {
        makeApiCall(() => {
            if (input) return resolve('yay');
            return reject('input was false')
        });
    });
}


function runPromiseExample(input) {
    loadDataIfInputTrueP(input)
        .then((response) => {
            console.log('Success: ' + response);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
}

runPromiseExample(true);
runPromiseExample(false);
