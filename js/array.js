const fruits = ['🍎','🍌','🍇','🍓','🍉'];
//console.log(fruits);
// let[a,b, ...c] = fruits
// console.log(a,b);
// console.log(c);

// let [a, b] = fruits;
// console.log(a,b);
// [b,a] = [a,b];
// console.log(a,b);

// let[...c] = fruits;
// [a,b] = [c];
// console.log(a,b);

let[...c] = fruits;
[a,b] = c;
console.log(a,b);


