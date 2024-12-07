const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const replayButton = document.querySelector("#replay");
const statusText = document.querySelector("#status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
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

const checkWinner = () => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return gameBoard.includes("") ? null : "draw";
};

const handleCellClick = (e) => {
  const index = e.target.dataset.index;
  if (!gameBoard[index] && isGameActive) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      isGameActive = false;
      statusText.textContent = winner === "draw" ? "It's a Draw!" : `${winner} Wins!`;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

const resetGame = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = "";
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
replayButton.addEventListener("click", resetGame);
