let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  things: [
    'book',
    'coffin',
    'eye',
    'hat',
    'pumpkin',
    'ted',
    'scarecows',
    'witch',
    'zoombie'
  ],
  setCard: function(id) {
    let card = this.cards.filter(card => card.id === id)[0];
    if(card.flipped || this.lockMode) {
      return false;
    }
    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.lockMode = true;
      this.secondCard.flipped = true;
      return true;
    }
  },
  checkMatch: function() {
    if(!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },
  clearCards: function() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  unflipCards: function() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },
  checkGameOver: function() {
    return this.cards.filter(card => !card.flipped).length === 0;
  },
  cards: null,
  createCardsFromThings: function() {

    this.cards = [];
  
    this.things.forEach((thing) => {
      this.cards.push(this.createPairFromThing(thing));
    });
  
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  },  
  createPairFromThing: function(thing) {
    return [{
      id: this.createIdWithThing(thing),
      icon: thing,
      flipped: false
    }, {
      id: this.createIdWithThing(thing),
      icon: thing,
      flipped: false
    }];
  },  
  createIdWithThing: function(thing) {
    return thing + parseInt(Math.random() * 1000);
  },
  shuffleCards: function() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;
  
    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [this.cards[randomIndex], this.cards[currentIndex]] = [ this.cards[currentIndex], this.cards[randomIndex]];
    }
  },
}