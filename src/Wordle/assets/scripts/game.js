const gameConfig = {
    rows: 6,
    cols: 5,
    wordList: ['apple','grape','lemon','peach','berry','mango','plums','melon','cherry','guava'],
};

let targetWord = '';
let currentAttempt = 0;
let currentPos = 0;
let grid = [];

function getRandomWord() {
    const index = Math.floor(Math.random() * gameConfig.wordList.length);
    return gameConfig.wordList[index].toUpperCase();
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function isWordValid(word) {
    return gameConfig.wordList.includes(word.toLowerCase());
}

function checkWord(guess) {
    const result = [];
    const tempTarget = targetWord.split('');
    const tempGuess = guess.split('');

    // first pass: correct letters
    for (let i = 0; i < guess.length; i++) {
        if (tempGuess[i] === tempTarget[i]) {
            result[i] = 'correct';
            tempTarget[i] = null;
        }
    }
    // second pass: misplaced letters
    for (let i = 0; i < guess.length; i++) {
        if (!result[i]) {
            if (tempTarget.includes(tempGuess[i])) {
                result[i] = 'misplaced';
                tempTarget[tempTarget.indexOf(tempGuess[i])] = null;
            } else {
                result[i] = 'incorrect';
            }
        }
    }
    return result;
}
