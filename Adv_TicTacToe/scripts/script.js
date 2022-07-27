window.addEventListener("load", init);
const classX = "x";
const classO = "o";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winMessage = document.querySelector(".win-message");
const winText = document.querySelector(".who-wins");
const restartBtn = document.querySelector('.restart');
let firstTurn;

function init() {
  bindEvents();
}

function bindEvents(){
  startGame();
  restartBtn.addEventListener('click', startGame);
}

function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove(classO);
    cell.classList.remove(classX);
    cell.addEventListener("click", gettingCells, { once: true });
  });
  setHoverOnBoard();
  winMessage.classList.remove('show');
}

function gettingCells(e) {
  let cell = e.target;
  let currentMark = firstTurn ? classO : classX;
  placeMark(cell, currentMark);
  if (checkWin(currentMark)) {
    console.log(`Winner is ${firstTurn ? classO.toUpperCase() : classX.toUpperCase()}`);
    endGame(false);
  }
  if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
    setHoverOnBoard();
  }
}

function endGame(draw) {
  if (draw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `Winner is  ${
      firstTurn ? classO.toUpperCase() : classX.toUpperCase()
    }`;
  }
  winMessage.classList.add("show");
}

function isDraw(){
  return [...cells].every(cell=>{
    return cell.classList.contains(classO) || cell.classList.contains(classX);
  })
}

function placeMark(cell, currentMark) {
  cell.classList.add(currentMark);
}
function switchTurn() {
  firstTurn = !firstTurn;
}

function setHoverOnBoard() {
  board.classList.remove(classX);
  board.classList.remove(classO);
  if (firstTurn) {
    board.classList.add(classO);
  } else {
    board.classList.add(classX);
  }
}

function checkWin(currentMark) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentMark);
    });
  });
}
