// Get references to the elements
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.statusText');

// 2D Array representing the game board
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// Player's turn (initially 'X')
let currentPlayer = 'X';

// Function to check for a win or draw
const checkResult = () => {
  // Check rows, columns, and diagonals for a win
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
      (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) ||
      (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
      (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
    ) {
      statusText.textContent = `${currentPlayer} wins!`;
      return true;
    }
  }

  // Check for a draw
  if (board.flat().every((cell) => cell !== '')) {
    statusText.textContent = "It's a draw!";
    return true;
  }

  return false;
};

// Function to update the board and check for a win or draw
const updateBoard = (cellIndex) => {
  const row = Math.floor(cellIndex / 3);
  const col = cellIndex % 3;

  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    if (checkResult()) {
      // Disable further moves after the game ends
      cells.forEach((cell) => cell.removeEventListener('click', cellClickHandler));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  }
};

// Event listener for cell clicks
const cellClickHandler = (event) => {
  const cellIndex = parseInt(event.target.getAttribute('cellIndex') - 1);
  updateBoard(cellIndex);
};

// Add event listeners to each cell
cells.forEach((cell) => cell.addEventListener('click', cellClickHandler));
