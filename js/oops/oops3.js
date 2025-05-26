class Animal{
    #name //private properties
    constructor(name , age , height){
        this.#name = name;
        this.age= age;
        this.height = height;
    }
    //static property
    static species = "Mammal";
    //static method
    static getSpecies(){
        return this.species;
    }
    static getSpecies2(){
        return this.getSpecies();
    }
    //instanceof keyword
    isInstanceOfAnimal(obj){
        return obj instanceof Animal;
    }
    // Method to create a shallow copy
    shallowCopy() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    // Method to create a deep copy
    deepCopy() {
        return JSON.parse(JSON.stringify(this.toObject()));
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
class Lion extends Animal{ 
    constructor(color ,name , age , height){
        super(name , age , height);
        this.color = color;
    }
    speak(){
        console.log(this.name + ' is roaring');
    }
    //overriding
    walk(){
        console.log(this.name +'is running');
    }
    //clone method in js
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
const dog = new Animal('dog', 3, 4);

//static keyword 
console.log(Animal.species);
//static method
console.log(Animal.getSpecies());
//static property
//console.log(Animal.getSpecies2());
//instanceof keyword
console.log(newLion.isInstanceOfAnimal(dog));

//polymorphism
//abstraction
//encapsulation

//shallow copy and deep copy
const myLion = newLion;
myLion.name = 'updated my lion';
console.log(newLion.toObject()); //original object value is changed due to reference
console.log(myLion.toObject()); 

const myLion2 = {...newLion};
myLion2.name = 'updated my lion 2';
console.log(newLion.toObject()); //original object value is not changed due to shallow copy

const myLion3 = JSON.parse(JSON.stringify(newLion));
myLion3.name = 'updated my lion 3';
console.log(newLion.toObject()); //original object value is not changed due to deep copy

// Using the shallow copy method
const shallowLion = newLion.shallowCopy();
shallowLion.name = 'Shallow Copy Lion';
console.log(newLion.toObject()); // Original object value is not changed

// Using the deep copy method
const deepLion = newLion.deepCopy();
deepLion.name = 'Deep Copy Lion';
console.log(newLion.toObject()); // Original object value is not changed

//A shallow copy will not work as expected for nested objects because it only copies the top-level properties.
//If any of those properties are objects themselves, the shallow copy will still reference the same nested objects as the original. 
//This means changes to nested objects in the copy will affect the original object.







