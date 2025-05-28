//promises all
const resolveAfter = (delay) => new Promise((resolve, reject) => setTimeout(() => resolve(delay), delay));
const rejectAfter = (delay) => new Promise((resolve, reject) => setTimeout(() => reject(delay), delay));
const promises = [
    resolveAfter(5),
    resolveAfter(3),
    resolveAfter(4),
    rejectAfter(7),
    rejectAfter(2)
]

// Promise.all : returned promise resolves when all of the input promises have resolved,
//  or it rejects as soon as one of the input promises rejects 
Promise.all(promises)  
.then((data) => console.log(data))
.catch((err) => console.log(err));

//Promise.allSettled : returned promise resolved with an array of results when all of the provided Promises resolve or reject.
Promise.allSettled(promises)
.then((data) => console.log(data));

//Promise.race : returned promise resolves or rejects as soon as one of the input promises resolves or rejects, with the value or reason from that promise.
Promise.race(promises)
.then((data) => console.log(data))
.catch((err) => console.log(err));

//Promise.any : a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an AggregateError containing an array of rejection reasons if all of the given promises are rejected. 
// It resolves all elements of the passed iterable to promises as it runs this algorithm.
Promise.any(promises)
.then((data) => console.log(data))
.catch((err) => console.log(err.errors));


  