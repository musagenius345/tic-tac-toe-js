import { cellClickHandler } from './index.js'

// 2D Array representing the game board 
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// Player's turn (initially 'X')
let currentPlayer = 'X';

// Get references to the elements
export const cells = document.querySelectorAll('.cell');
export const statusText = document.querySelector('.statusText');



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
export const updateBoard = (cellIndex) => {
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
    // Save the game state to localStorage
    localStorage.setItem('noughtsAndCrossesGame', JSON.stringify(board));
    localStorage.setItem('currentPlayer', currentPlayer);
  }
};

// Function to reset the game
export const resetGame = () => {
  // Clear the board and reset the currentPlayer
  board.forEach((row, rowIndex) => row.fill(''));
  currentPlayer = 'X';
  statusText.textContent = `${currentPlayer}'s turn`;

  // Clear cells and re-add event listeners
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.addEventListener('click', cellClickHandler);
  });

  // Clear the localStorage
  localStorage.removeItem('noughtsAndCrossesGame');
  localStorage.removeItem('currentPlayer');
};

// Function to initialize the game with saved state from localStorage (if any)
export const initializeGame = () => {
  const savedGame = localStorage.getItem('noughtsAndCrossesGame');
  const savedCurrentPlayer = localStorage.getItem('currentPlayer');

  if (savedGame && savedCurrentPlayer) {
    board = JSON.parse(savedGame);
    currentPlayer = savedCurrentPlayer;
    statusText.textContent = `${currentPlayer}'s turn`;

    // Render the board from the saved state
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellIndex = rowIndex * 3 + colIndex;
        cells[cellIndex].textContent = cell;
      });
    });
  }
};