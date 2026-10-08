const symbols = ['🧸', '🚀', '😊', '😨', '😠', '🐠', '🐭', '🚗', '🐀', '🎸'];
const TRIPLET_SIZE = 3; // Número de cartas por grupo (trios)
let cards = [];
let flippedCards = [];
let matchedTriplets = 0;
let moves = 0;
let lockBoard = false;

const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
const finalMoves = document.getElementById('final-moves');
const victory = document.getElementById('victory');
const restartBtn = document.getElementById('restart');
const playAgainBtn = document.getElementById('play-again');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  board.innerHTML = '';
  
  // Crear array con 3 copias de cada símbolo (trios)
  const cardSymbols = [];
  symbols.forEach(symbol => {
    for (let i = 0; i < TRIPLET_SIZE; i++) {
      cardSymbols.push(symbol);
    }
  });
  
  cards = shuffle([...cardSymbols]);
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back">?</div>
      </div>
    `;
    
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }
  
  card.classList.add('flipped');
  flippedCards.push(card);
  
  // Verificar cuando hay 3 cartas (trio)
  if (flippedCards.length === TRIPLET_SIZE) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  const [card1, card2, card3] = flippedCards;
  
  // Verificar que las 3 cartas coincidan
  if (card1.dataset.symbol === card2.dataset.symbol && 
      card2.dataset.symbol === card3.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    card3.classList.add('matched');
    matchedTriplets++;
    flippedCards = [];
    lockBoard = false;
    
    // Victoria cuando se completan todos los trios
    if (matchedTriplets === symbols.length) {
      setTimeout(showVictory, 500);
    }
  } else {
    // Aumentar tiempo para memorizar 3 cartas
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card3.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1200);
  }
}

function showVictory() {
  finalMoves.textContent = moves;
  victory.classList.add('show');
}

function restartGame() {
  matchedTriplets = 0;
  moves = 0;
  flippedCards = [];
  lockBoard = false;
  movesDisplay.textContent = moves;
  victory.classList.remove('show');
  createBoard();
}

restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);

createBoard();
