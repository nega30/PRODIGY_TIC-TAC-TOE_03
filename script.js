// Variables for the game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Select the board and restart button
const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("status-message");
const restartButton = document.getElementById("restart-button");

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-cell-index");

  // Prevent overwriting an already filled cell
  if (board[index] !== "" || gameOver) return;

  // Update board and display the player's symbol
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a winner
  if (checkWinner(currentPlayer)) {
    statusMessage.textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
  } else if (board.every(cell => cell !== "")) {
    // Check for a draw
    statusMessage.textContent = "It's a Draw!";
    gameOver = true;
  } else {
    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Function to check for a winner
function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

// Function to reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  cells.forEach(cell => cell.textContent = "");
  statusMessage.textContent = `Player X's Turn`;
}

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Add event listener to restart button
restartButton.addEventListener("click", resetGame);
