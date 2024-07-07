const characters = ['tanjiro', 'nezuko', 'zenitsu', 'inosuke', 'giyu', 'shinobu', 'kanao', 'rengoku'];

const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('gameOverModal');
const winnerModal = document.getElementById('winnerModal');
const closeGameOverModal = document.getElementById('closeGameOverModal');
const closeWinnerModal = document.getElementById('closeWinnerModal');
const restartGameOver = document.getElementById('restartGameOver');
const restartWinner = document.getElementById('restartWinner');
const closeGameOver = document.getElementById('closeGameOver');
const closeWinner = document.getElementById('closeWinner');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;

function createBoard() {
    const cardArray = characters.concat(characters);
    cardArray.sort(() => 0.5 - Math.random());

    cardArray.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;

        const frontFace = document.createElement('img');
        frontFace.src = `images/${character}.jpg`;
        card.appendChild(frontFace);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showGameOverModal();
        }
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.character === card2.dataset.character) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === characters.length) {
            clearInterval(timer);
            showWinnerModal();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showGameOverModal() {
    gameOverModal.style.display = 'flex';
}

function showWinnerModal() {
    winnerModal.style.display = 'flex';
}

closeGameOverModal.onclick = () => gameOverModal.style.display = 'none';
closeWinnerModal.onclick = () => winnerModal.style.display = 'none';
restartGameOver.onclick = () => location.reload();
restartWinner.onclick = () => location.reload();
closeGameOver.onclick = () => window.close();
closeWinner.onclick = () => window.close();

window.onclick = (event) => {
    if (event.target === gameOverModal) gameOverModal.style.display = 'none';
    if (event.target === winnerModal) winnerModal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', createBoard);
