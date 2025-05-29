//call stack
//lexical scoping
var a = 10;
function f1() {
    var b = 20;
    console.log(a); //10
    console.log(b);//20
    function f2() {
        var b = 30;
        console.log(a); //10
        console.log(b); //30
    }
    f2();
}
f1();
// Lexical Scoping & scope chaining
var globalVar = "I am a global variable";

function outerFunction() {
    var outerVar = "I am an outer variable";

    function innerFunction() {
        var innerVar = "I am an inner variable";
        console.log(globalVar); // Accesses globalVar
        console.log(outerVar);  // Accesses outerVar
        console.log(innerVar);  // Accesses innerVar
    }

    innerFunction();
}

outerFunction();

// closure 
function init(){
    let value = 10;
    function increment(){
        value++;
        console.log(value);
    }
    return increment;
}
// function init(){
//     let value = 10;
//     return function(){
//         value++;
//         console.log(value);
//     }
// }
const counter = init();
counter();
counter();
counter();
counter();

// Closure Counter Example
function createCounter() {
    let count = 0; // This variable is enclosed in the closure

    return {
        increment: function() {
            count++;
            console.log("Incremented:", count);
        },
        decrement: function() {
            count--;
            console.log("Decremented:", count);
        },
        getCount: function() {
            console.log("Current Count:", count);
            return count;
        }
    };
}

const counterEg = createCounter();

counterEg.increment(); // Incremented: 1
counterEg.increment(); // Incremented: 2
counterEg.decrement(); // Decremented: 1
counterEg.getCount();  // Current Count: 1


//once

// Function to ensure a given function is executed only once
function once(fn) {
    let executed = false;
    return function(...args) {
        if (!executed) {
            executed = true;
            fn(...args);
        }
        console.log("Function has already been executed.");
    };
}

// Example function to be executed only once
function initialize() {
    console.log("Initialization complete.>>");
}

// Create a "once" version of the initialize function
const initializeOnce = once(initialize);

// Test the "once" functionality
initializeOnce(); // Output: Initialization complete.
initializeOnce(); // Output: Function has already been executed.
initializeOnce(); // Output: Function has already been executed.
