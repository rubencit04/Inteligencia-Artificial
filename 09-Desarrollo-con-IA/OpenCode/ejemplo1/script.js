const categories = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    food: ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍪', '🎂', '🍦', '🧁'],
    sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎱', '🏓', '🏸', '🥊']
};

const levels = {
    easy: { pairs: 6, name: 'Fácil' },
    medium: { pairs: 8, name: 'Medio' },
    hard: { pairs: 10, name: 'Difícil' }
};

let currentLevel = 'easy';
let currentCategory = 'animals';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let gameStarted = false;
let isLocked = false;
let bestScores = JSON.parse(localStorage.getItem('memoryBestScores')) || {};

const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');
const pairsFound = document.getElementById('pairs-found');
const pairsTotal = document.getElementById('pairs-total');
const victoryScreen = document.getElementById('victory');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');
const victoryLevel = document.getElementById('victory-level');
const newBest = document.getElementById('new-best');
const nextLevelBtn = document.getElementById('next-level');
const difficultyBtns = document.querySelectorAll('.difficulty .btn');
const categoryBtns = document.querySelectorAll('.btn-cat');
const restartBtn = document.getElementById('restart');
const playAgainBtn = document.getElementById('play-again');

function initGame() {
    const level = levels[currentLevel];
    const emojis = categories[currentCategory];
    const selectedEmojis = emojis.slice(0, level.pairs);
    cards = [...selectedEmojis, ...selectedEmojis];
    shuffle(cards);
    
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    gameStarted = false;
    flippedCards = [];
    isLocked = false;
    
    clearInterval(timer);
    timer = null;
    
    movesDisplay.textContent = '0';
    timeDisplay.textContent = '00:00';
    pairsFound.textContent = '0';
    pairsTotal.textContent = level.pairs;
    victoryScreen.classList.remove('show');
    newBest.style.display = 'none';
    
    updateBestDisplay();
    renderBoard();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderBoard() {
    const level = levels[currentLevel];
    board.className = 'board ' + currentLevel;
    board.innerHTML = '';
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.style.animationDelay = `${index * 0.03}s`;
        card.animate([
            { opacity: 0, transform: 'scale(0.5) rotateY(180deg)' },
            { opacity: 1, transform: 'scale(1) rotateY(0deg)' }
        ], {
            duration: 400,
            delay: index * 30,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
        
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (isLocked) return;
    if (flippedCards.length >= 2) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;
    
    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsFound.textContent = matchedPairs;
        flippedCards = [];
        isLocked = false;
        
        if (matchedPairs === levels[currentLevel].pairs) {
            setTimeout(showVictory, 600);
        }
    } else {
        setTimeout(() => {
            card1.classList.add('shake');
            card2.classList.add('shake');
        }, 300);
        
        setTimeout(() => {
            card1.classList.remove('flipped', 'shake');
            card1.textContent = '';
            card2.classList.remove('flipped', 'shake');
            card2.textContent = '';
            flippedCards = [];
            isLocked = false;
        }, 1200);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timeDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function formatTime(secs) {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function showVictory() {
    clearInterval(timer);
    finalMoves.textContent = moves;
    finalTime.textContent = formatTime(seconds);
    victoryLevel.textContent = levels[currentLevel].name;
    
    const scoreKey = `${currentLevel}_${currentCategory}`;
    const currentBest = bestScores[scoreKey];
    
    if (!currentBest || moves < currentBest.moves || (moves === currentBest.moves && seconds < currentBest.time)) {
        bestScores[scoreKey] = { moves, time: seconds };
        localStorage.setItem('memoryBestScores', JSON.stringify(bestScores));
        newBest.style.display = 'block';
    }
    
    const levelKeys = Object.keys(levels);
    const currentIndex = levelKeys.indexOf(currentLevel);
    nextLevelBtn.style.display = currentIndex < levelKeys.length - 1 ? 'block' : 'none';
    
    victoryScreen.classList.add('show');
    
    launchConfetti();
}

function launchConfetti() {
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 200;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

function updateBestDisplay() {
    const scoreKey = `${currentLevel}_${currentCategory}`;
    const best = bestScores[scoreKey];
    if (best) {
        bestDisplay.textContent = `${best.moves} (${formatTime(best.time)})`;
    } else {
        bestDisplay.textContent = '--';
    }
}

function setLevel(level) {
    currentLevel = level;
    difficultyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });
    initGame();
}

function setCategory(category) {
    currentCategory = category;
    categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    initGame();
}

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => setLevel(btn.dataset.level));
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.category));
});

restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

nextLevelBtn.addEventListener('click', () => {
    const levelKeys = Object.keys(levels);
    const currentIndex = levelKeys.indexOf(currentLevel);
    if (currentIndex < levelKeys.length - 1) {
        setLevel(levelKeys[currentIndex + 1]);
    }
});

initGame();
