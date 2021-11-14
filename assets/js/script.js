const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';

startGame();

function startGame() {
  initializeCards(game.createCardsFromThings());
};

function initializeCards(cards) {
  let gameBoard = document.querySelector('.board');
  gameBoard.innerHTML = '';

  game.cards.forEach((card) => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
};

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
};

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if(face === FRONT) {
    let iconElementFront = document.createElement('img');
    iconElementFront.classList.add(ICON);
    iconElementFront.src = './assets/images/' + card.icon + '.png';
    cardElementFace.appendChild(iconElementFront);
  } else {
    let iconElementBack = document.createElement('img');
    iconElementBack.src = './assets/images/question.png';
    cardElementFace.appendChild(iconElementBack);
  };
  element.appendChild(cardElementFace);
};

function flipCard() {
  if(game.setCard(this.id)) {
    this.classList.add('flip');
    if(game.secondCard) {
      if(game.checkMatch()) {
        game.clearCards();
        if(game.checkGameOver()) {
          let gameOverLayer = document.querySelector('.game-over');
          setTimeout(() => {
            gameOverLayer.style.display = 'flex';
          }, 300);
        };
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
  
          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
        }, 1000);
      };
    };
  };
};

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.querySelector('.game-over');
  gameOverLayer.style.display = 'none';
};

document.querySelector('#restart').addEventListener('click', restart);