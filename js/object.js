const alamin = {
    studentName : "Alamin",
    age : 25,
    address:{
        city : "Kolkata",
        state : "WB",
        country:"India"
    }
 }

 
// const sk = {...alamin}; // shallow copy using spread operator
// alamin.studentName = "Sourav"; 
// alamin.address.city = "Delhi";
// console.log(sk);

//......
// const sk = {...alamin}; // shallow copy using spread operator
// sk.studentName = "Sourav"; 
// sk.address.city = "Delhi";
// console.log(alamin);
//......


// deep copy
const sk = JSON.parse(JSON.stringify(alamin)); // it's copy the object fully (deep copy)
//--solution for copy issue
alamin.studentName = "Sourav"; 
alamin.address.city = "Delhi"; 
console.log(sk);


