const gridDiv = document.getElementById('wordle-grid');

// Build grid dynamically
function addBoxToGrid(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('letter');
    cell.id = `cell-${row}-${col}`;
    gridDiv.appendChild(cell);
}

function setupGrid() {
    for (let r = 0; r < gameConfig.rows; r++) {
        grid[r] = [];
        for (let c = 0; c < gameConfig.cols; c++) {
            addBoxToGrid(r, c);
            grid[r][c] = '';
        }
    }
}

function addLetterToGrid(letter) {
    if (currentPos < gameConfig.cols) {
        const cell = document.getElementById(`cell-${currentAttempt}-${currentPos}`);
        cell.textContent = letter.toUpperCase();
        grid[currentAttempt][currentPos] = letter.toUpperCase();
        currentPos++;
    }
}

function removeLetterFromGrid() {
    if (currentPos > 0) {
        currentPos--;
        const cell = document.getElementById(`cell-${currentAttempt}-${currentPos}`);
        cell.textContent = '';
        grid[currentAttempt][currentPos] = '';
    }
}

function submitGuess() {
    if (currentPos < gameConfig.cols) {
        alert("Word not complete!");
        return;
    }

    const guess = grid[currentAttempt].join('');
    if (!isWordValid(guess)) {
        alert("Word not valid!");
        return;
    }

    const result = checkWord(guess);
    for (let c = 0; c < gameConfig.cols; c++) {
        const cell = document.getElementById(`cell-${currentAttempt}-${c}`);
        cell.classList.add(result[c]);
    }

    if (guess === targetWord) {
        alert("You win!");
        document.removeEventListener('keydown', handleKey);
        return;
    }

    currentAttempt++;
    currentPos = 0;

    if (currentAttempt >= gameConfig.rows) {
        alert(`Game Over! Word was: ${targetWord}`);
        document.removeEventListener('keydown', handleKey);
    }
}

function handleKey(event) {
    const key = event.key;
    if (isLetter(key)) {
        addLetterToGrid(key);
    } else if (key === 'Backspace') {
        removeLetterFromGrid();
    } else if (key === 'Enter') {
        submitGuess();
    }
}

// Initialize
setupGrid();
targetWord = getRandomWord();
document.addEventListener('keydown', handleKey);
console.log("Target Word:", targetWord); // for debugging
