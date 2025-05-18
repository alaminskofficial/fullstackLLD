const grid = document.getElementById('grid');
const rgbDisplay = document.getElementById('rgb-display');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let score = 0;
let correctIndex = -1;
let firstClick = true;
let noOfOptions = 6;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateGame() {
  grid.innerHTML = '';
  messageDisplay.textContent = '';
  firstClick = true;
  const colors = [];
  correctIndex = Math.floor(Math.random() * 6);
  const correctColor = getRandomColor();

  for (let i = 0; i < noOfOptions; i++) {
    colors.push(i === correctIndex ? correctColor : getRandomColor());
  }

  rgbDisplay.textContent = correctColor;

  colors.forEach((color, index) => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;
    box.addEventListener('click', () => handleGuess(index));
    grid.appendChild(box);
  });
}

function handleGuess(index) {
  if (index === correctIndex) {
    messageDisplay.textContent = '✅ Correct! Game Resetting...';
    if (firstClick) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
    setTimeout(generateGame, 1000);
  } else {
    messageDisplay.textContent = '❌ Wrong! Try again.';
    firstClick = false;
  }
}

// Start game
generateGame();

//using keypress 
document.addEventListener("keypress" ,(event) =>{
    const key = event.key;
    const keyAsNum = parseInt(key);
    if(isNaN(keyAsNum)) return;
    if(keyAsNum > noOfOptions || keyAsNum <= 0) return;
    console.log(keyAsNum);
    const el = document.querySelector(`#grid :nth-child(${keyAsNum})`);
    if(el){ 
        el.click()
        console.log(el);
    };
})
