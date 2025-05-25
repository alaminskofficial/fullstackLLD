class Animal{
    #name //private properties
    constructor(name , age , height){
        this.#name = name;
        this.age= age;
        this.height = height;
    }
    get name(){ //getter method
        return this.#name;
    }
    set name(name){ //setter method
        this.#name = name;
    }
    speak(){
        console.log( this.#name + ' is speaking');
    }
    walk(){
        console.log(this.#name + ' is walking');
    }
    toObject(){
        return {
            name: this.#name,
            age: this.age,
            height: this.height
        }
    }
    
}
class Lion extends Animal{ //inheritance
    constructor(color ,name , age , height){
        super(name , age , height);
        this.color = color;
    }
    speak(){
        // console.log(super.name + ' is roaring');
        console.log(this.name + ' is roaring');
    }
    toObject(){
        return {
            ...super.toObject(),
            color : this.color
        };
    }
}

const newLion = new Lion('Grey',"my Lion" , 2,7);
console.log(newLion.age);
console.log(newLion.name);
newLion.speak();
newLion.name = "updated my lion";// Use assignment to set the name(setter method)
console.log(newLion.toObject()); // Use the toObject method to print the whole object

// Example of call
function describe(whatIsDoing) {
    console.log(`This is a ${this.color} lion named ${this.name} ,  ${whatIsDoing}.`);
}
describe.call(newLion , 'just roaming...'); // Using call to invoke describe with newLion as this

// Example of apply
function describeKingStatus(whatIsDoing , withWhom) {
    console.log(`This is a ${this.color} lion named ${this.name} ,  ${whatIsDoing} , ${withWhom}`);
}
describeKingStatus.apply(newLion , ['just chilling in his kingdom' , 'enjoying with his wife']);

function updateDetails(name, color) {
    this.name = name;
    this.color = color;
}
updateDetails.apply(newLion, ["Majestic Lion", "Golden"]); // Using apply to update newLion's details
console.log(newLion.toObject());

// Example of bind
const boundDescribe = describe.bind(newLion , 'roaming with his wife'); // Using bind to create a new function with newLion as this
boundDescribe(); // Invoking the bound function

//console.log(Lion.prototype);

// console.log(newLion.__proto__);

Lion.prototype.hunt = function() {
    console.log(`${this.name} is hunting.`);
};

newLion.hunt(); // This will work because hunt is added to Lion.prototype

// Check prototypes
console.log(Lion.prototype); // Shows the prototype object with the hunt method
console.log(newLion.__proto__ === Lion.prototype); // true, confirming the prototype link




