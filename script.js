const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

board.addEventListener('click', handleClick);

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] !== '' || isGameOver) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
  } else if (boardState.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] &&
           boardState[a] === boardState[b] &&
           boardState[a] === boardState[c];
  });
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  isGameOver = false;
  statusText.textContent = "Player X's turn";
}
