//truthy and falsy values
// 0, "", null, undefined, NaN, false -falsy values
// 1, " ", {}, [], true  , number , string  -truthy values

let a = 12;
if(a) {
    console.log("a is truthy");
}else{
    console.log("a is falsy");
}
let v = "12" - 1;
console.log(v);
console.log(typeof v);
let v1 = "12" - "1";
console.log(v1);
console.log(typeof v1);
console.log("12" == 12)
console.log("12" === 12)
const arr = [1,2,3];
console.log(typeof arr);
console.log(Array.isArray(arr));

// diffrence between == and ===
// == checks for value equality
// === checks for value and type equality
// == converts the types of the operands and then compares them
// === does not convert the types of the operands and then compares them
// == is not recommended to use


