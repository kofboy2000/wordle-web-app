const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const targetWord = "APPLE"; // 정답 단어는 변경할 수 있습니다.
let currentAttempt = 0;
let currentTile = 0;
let gameEnded = false;

// 게임 보드를 초기화합니다.
const gameBoard = document.getElementById("game-board");
for (let i = 0; i < MAX_ATTEMPTS * WORD_LENGTH; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);
}

// 키보드 이벤트를 설정합니다.
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener("click", () => handleKeyPress(key.textContent));
});

document.getElementById("enter").addEventListener("click", checkGuess);
document.getElementById("delete").addEventListener("click", deleteLetter);

// 키 입력 처리
function handleKeyPress(letter) {
    if (gameEnded || currentTile >= (currentAttempt + 1) * WORD_LENGTH) return;
    const tiles = document.querySelectorAll(".tile");
    tiles[currentTile].textContent = letter;
    currentTile++;
}

// 삭제 처리
function deleteLetter() {
    if (gameEnded || currentTile <= currentAttempt * WORD_LENGTH) return;
    const tiles = document.querySelectorAll(".tile");
    currentTile--;
    tiles[currentTile].textContent = "";
}

// 단어 검사
function checkGuess() {
    if (gameEnded || currentTile < (currentAttempt + 1) * WORD_LENGTH) return;
    const guess = [];
    const tiles = document.querySelectorAll(".tile");
    
    for (let i = currentAttempt * WORD_LENGTH; i < (currentAttempt + 1) * WORD_LENGTH; i++) {
        guess.push(tiles[i].textContent);
    }
    
    const guessWord = guess.join('');
    if (guessWord.length !== WORD_LENGTH) return;
    
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = tiles[currentAttempt * WORD_LENGTH + i];
        const letter = guess[i];
        
        if (targetWord[i] === letter) {
            tile.classList.add("correct");
        } else if (targetWord.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }
    
    currentAttempt++;
    
    if (guessWord === targetWord) {
        gameEnded = true;
        alert("Congratulations! You've guessed the word!");
    } else if (currentAttempt === MAX_ATTEMPTS) {
        gameEnded = true;
        alert(`Game over! The correct word was ${targetWord}`);
    }
}
