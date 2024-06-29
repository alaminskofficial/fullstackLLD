//generate a otp and send it to the user
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

















