// fetch call -async
// promise
const productsPromise = fetch('https://fakestoreapi.com/products');

productsPromise.then(response => response.json())
                  .then(data => console.log(data))
                 .catch(error => console.error(error)); 

//promise state : pending, fulfilled, rejected

// fs file read file async--promisification
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
//promise all
