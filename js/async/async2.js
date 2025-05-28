// fetch call -async
// promise
fetch('https://fakestoreapi.com/products/1').then(response => response.json())
                  .then(data => console.log(data))
                 .catch(error => console.error(error)); 

//promise state : pending, fulfilled, rejected

// fs file read file async 
// promisification: means make callback function like readFile to promise
const fs = require('fs');
const readFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
readFilePromise('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));

//customm promise few examples
//rocket launch example
function rockectLaunch() {
    return new Promise((resolve, reject) => {
        console.log("Rocket Launching !!!");
        setTimeout(() => {
            const success = Math.random() > 0.5; 
            if (success) {
                resolve("Rocket Launched....");
            } else {
                reject("Rocket failed");
            }
        }, 5000);
    });
}

rockectLaunch().then((message) => {
    console.log(message);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    console.log("Rocket Launching Completed!!!");
});

// set timer for 5 s
const setTimer = time => {
    return new Promise((resolve, reject) => {
        if(time < 0) return reject("Invalid time");
        setTimeout(() => {
            resolve("Timer Completed!!!");
        }, time);
    });
};
setTimer(5000).then((message) => {
    console.log(message);
}).catch((err) => {
    console.log(err);
})

//promise all
//3 files read example with promise all.
const files = [
    "file.txt",
    "file2.txt",
    "file3.txt"
]
const promises = files.map(file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
})
Promise.all(promises).then((data) => {
    console.log(data);
})


