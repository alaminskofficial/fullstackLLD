//coffe shop problem solve with callback hell , promise chaining , async await 

function orderCoffee(coffee) {
    const menu = ['Americano', 'Latte', 'Cappuccino', 'Espresso'];
    const isCoffeAvailable = menu.includes(coffee);
    if (!isCoffeAvailable) return Promise.reject("Coffe is not available");
    return Promise.resolve(coffee);

}
function createCheckoutSession(order) {
    return new Promise((resolve, reject) => {
        if (order === undefined) return reject("Order is not available");
        const checkoutSession = {
            order: order,
            status: "Checkout Success"
        }
        return resolve(checkoutSession);
    });
}
function processPayment(session) {
    return new Promise((resolve, reject) => {
        if (session.status === "Checkout Success") {
            const payment = {
                payment: session.order,
                status: "Payment Success"
            }
            return resolve(payment);
        }
        return reject("Payment Failed");
    });
}
function createOrderOnServer(paymentInfo) {
    return new Promise((resolve, reject) => {
        if (paymentInfo.status === "Payment Success") {
            const coffee = {
                coffee: paymentInfo.payment,
                status: "Order is Served"
            }
            return resolve(coffee);
        }
        return reject("Order is not Served");
    });
}

function serveCoffee(coffee) {
    return new Promise((resolve) => {
        console.log("Your " + coffee.coffee + " is ready");
        return resolve(coffee);
    })
}

//call back hell

orderCoffee("Cappuccino")
    .then((order) => {
        createCheckoutSession(order)
            .then((session) => {
                processPayment(session)
                    .then((paymentInfo) => {
                        createOrderOnServer(paymentInfo)
                            .then((coffee) => {
                                serveCoffee(coffee)
                                    .then(coffee => console.log(coffee))
                            }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }).catch(err => console.log(err));

//promise chaining

orderCoffee("Cappuccino")
    // .then(order => createCheckoutSession(order))
    .then(createCheckoutSession)
    .then(processPayment)
    .then(createOrderOnServer)
    .then(serveCoffee)
    .then(coffee => console.log(coffee))
    .catch(err => console.log(err))

//async await : allows to write async code in more sync manner.
//or run async code in sync way.

async function orderCoffeInCafe(coffee) {
    try {
        const order = await orderCoffee(coffee);
        const session = await createCheckoutSession(order);
        const paymentInfo = await processPayment(session);
        const coffeeInfo = await createOrderOnServer(paymentInfo);
        const coffeeServed = await serveCoffee(coffeeInfo);
        console.log(coffeeServed);
    } catch (err) {
        console.log(err);
    }
}

orderCoffeInCafe("Cappuccino");


