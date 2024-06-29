// different way of writing function-Arrow ,function,annonymous,expression function
//1. function declaration
function sum(n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i + 1;
    }
    return sum;
}
console.log(sum(5));

//2. function expression
const sum2 = function(n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i + 1;
    }
    return sum;
}
console.log(sum2(5));

//3. Arrow function
const sum3 = (n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i + 1;
    }
    return sum;
}
//4. annonymous function
// Anonymous functions are functions without a name. They are often not accessible after their initial creation.
//They can be used as arguments to other functions.
setTimeout(function() {
    console.log("Hello, World after 1 second!");
  }, 1000);


// how i can pass unlimited number of arguments to a function

function sum4(...args) {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}
console.log(sum4(5, 6, 7, 8, 9, 10));

function printArguments(...args) {
    args.forEach(arg => console.log(arg));
  }
  
  printArguments('Hello', 'World', 'and', 'the', 'universe');

  //5.arguments object
  function sum5() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
console.log(sum5(5, 6, 7, 8, 9, 10));

const b = (...x)=> console.log(x);

b(1,2,3,4,5,6,7,8,9,10);

// high order function & callback function
// A higher-order function is a function that takes another function as an argument or returns a function as a result.
//example of higher order function:
function higherOrderFunction(callback) {
    console.log('From higher order function');
    callback();
}
//example of callback function
function callbackFunction() {
    console.log('From callback function');
}
higherOrderFunction(callbackFunction);

function funA(x , y){
      console.log("calling x...");
      x();
      console.log("calling y...");
      y();
}
function funB(){
     console.log("I am function B");
};
funA(funB,()=> console.log("I am function C"));
