// const { JSDOM } = require('jsdom');

// // Create a new JSDOM instance for simulating DOM in node server
// const dom = new JSDOM(`<!DOCTYPE html><body><button id="button">Click Me</button></body>`);
// const document = dom.window.document;

console.log('Start');

setTimeout(() => { // async : callstack queue/task queue
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => { // async : microtask queue
  console.log('Promise');
});

console.log('End');

// call stack , event loop , GEC(global execution context)
// microtask queue, task queue , web apis(window) browser
//microtask queue - promises , mutation observer
//task queue - setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering


// const button = document.getElementById('button');
// console.log("start")
// button.addEventListener('click', () => { // async 
//   console.log('Button clicked');
// });
// console.log("end")

// button.click();