// High-Order Function (HOF) in JavaScript:
// A high-order function is a function that either:

// Takes one or more functions as arguments, or
// Returns a function as its result.
// In simpler terms, a high-order function operates on functions, meaning it can receive functions as inputs or output new functions. 
// This concept is powerful in functional programming, where functions are treated as first-class citizens
//  (i.e., they can be passed around like any other data type).

//---------
// Callback Function in JavaScript:
// A callback function is a function that is passed as an argument to another function 
// and is executed after some operation or event occurs. Callback functions are widely used in JavaScript, 
// especially for asynchronous operations, such as handling user interactions or API responses.

//eg: generate a otp and send it to the user
function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000);
}
function sendOtpMessage(otp){
    console.log(`Your OTP is: ${otp}`);
}
function sendOtpAndMessage(gen , cb){
    let otp = gen();
    cb(otp);
}
//sendOtpAndMessage(generateOTP , sendOtpMessage);

let fruits = ['🍎','🍌','🍇','🍓','🍉'];

function printFruits(fruit ,index){
    console.log("fruit >>>",fruit , index);
}
//fruits.forEach(printFruits);

//fruits.forEach((fruit,index) => console.log("fruit >>>",fruit , index));

function customForEachMethod(cb){
    for(let i = 0; i < fruits.length; i++){
        cb(fruits[i] ,i);
    }
}
customForEachMethod((fruit , index) => console.log("fruit >>>",fruit , index));

fruits.map((fruit) => fruit + "bug").forEach((fruit) => console.log(fruit));

let numbers = [1,2,3,4,5,6,7,8,9,10];
let evenNumbers = numbers.filter((no) => no % 2 === 0);
console.log(evenNumbers);

const accumulator = (accumulator , currentValue) => accumulator + currentValue;

// let sum = numbers.reduce((prev , curr) => prev + curr , 0);
let sum = numbers.reduce(accumulator , 0);
console.log(sum);
// sum of even numbers
let sumOfEvenNumbers = numbers.filter((no) => no % 2 === 0).reduce(accumulator , 0);
//console.log(sumOfEvenNumbers);

let sumOfEvenNumbers2 = numbers.reduce((prev , curr) =>{
    if(curr % 2 === 0){
        return prev + curr;
    }return prev;
},0);
console.log(sumOfEvenNumbers2);

function hackFb(username , cb){
    console.log("Hacking facebook....");
    setTimeout(()=>{
        console.log(`Facebook account of ${username} has been hacked`);
        cb({password:"123456"});
    },10000)
}
console.log("excetuing the code 1");
console.log("excetuing the code 2");
console.log("excetuing the code 3");
hackFb("alamin", (data) => console.log(data));
console.log("excetuing the code 4");
console.log("excetuing the code 5");

















