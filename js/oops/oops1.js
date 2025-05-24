class BankAccount{
    #balance
    #pin
    constructor(name , gender , type , balance , pin){
        this.name = name;
        this.gender = gender;
        this.type = type;
        this.#balance = balance;
        this.#pin = pin;

        this.accountNo = Date.now();
    }
    getBalance(){
        return this.#balance;
    }
    deposit(amt , pin){
        if(this.#pin !== pin) throw new Error("Incorrect pin")
        this.#balance += amt;    
    }
    withdraw(amt , pin){
        if(this.#pin !== pin) throw new Error("Incorrect pin")
        if(this.#balance < amt) throw new Error("Insufficient Balance")    
        this.#balance -= amt;    
    }
    trasferAmount(to , amt , pin){
        if(this.#pin !== pin) throw new Error("Incorrect pin")
        if(this.#balance < amt) throw new Error("Insufficient Balance")
        to.#balance += amt;        
        this.#balance -= amt;    
    }
}

const alamin = new BankAccount('Alamin Account' ,'M','SAVINGS' ,3500 , 123);
const sk = new BankAccount('Sk Account' ,'M','SAVINGS',3400, 456);

console.log(alamin.accountNo);
console.log(alamin.getBalance());

alamin.trasferAmount(sk , 1000 , 123);
console.log(sk.getBalance());