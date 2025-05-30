//closures

// A normal function that adds three numbers
function add(x, y, z) {
    return x + y + z;
}

// Curried version of the add function
function curriedAdd(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        };
    };
}

// Using the curried function
const addFive = curriedAdd(5); // Returns a function that adds 5 to its argument
const addFiveAndThree = addFive(3); // Returns a function that adds 8 to its argument
const result = addFiveAndThree(2); // Returns 10

console.log(result); // Output: 10

//composition -example

// Function to double a number
function double(x) {
    return x * 2;
}

// Function to square a number
function square(x) {
    return x * x;
}

// Function composition: compose two functions
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

// Create a new function that doubles and then squares a number
const doubleThenSquare = compose(square, double);

// Use the composed function
const res = doubleThenSquare(3); // First doubles 3 to get 6, then squares 6 to get 36

console.log(res); // Output: 36

// Function to add multiple numbers
function addMultiple(...args) {
    return args.reduce((sum, current) => sum + current, 0);
}

// Function to square a number
function square(x) {
    return x * x;
}

// Function to add multiple numbers and then square the result
function addAndSquare(...args) {
    const sum = addMultiple(...args);
    return square(sum);
}

// Use the addAndSquare function
const my = addAndSquare(2, 3, 4); // Adds 2, 3, and 4 to get 9, then squares 9 to get 81

console.log(my); // Output: 81