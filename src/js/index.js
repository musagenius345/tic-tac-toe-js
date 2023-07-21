// Import functions from the game.js module
import { cells, statusText, initializeGame, updateBoard, resetGame } from './game.js';

// Initialize the game
initializeGame();

// Event listener for cell clicks
export const cellClickHandler = (event) => {
  const cellIndex = parseInt(event.target.getAttribute('cellIndex') - 1);
  updateBoard(cellIndex);
}

// Add event listeners to each cell
cells.forEach((cell) => cell.addEventListener('click', cellClickHandler));

// Event listener for reset button
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  resetGame(cellClickHandler);
});