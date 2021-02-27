const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const suits = ["♠", "♣", "♥", "♦"];

//Card
class Card {
  constructor(rank, suit, isJoker = false) {
    this.rank = rank;
    this.suit = suit;
    this.isJoker = isJoker;
  }
  getName() {
    return `${this.rank} ${this.suit}`;
  }
}

//Player
class Player {
  constructor(name, number, score = 0, playersDeck) {
    this.name = name;
    this.number = number;
    this.playersDeck = playersDeck;
    this.score = score;
  }
  calcHandScore() {
    for (cards of deck) {
      if (card.value === "joker") {
        score += 0;
      } else if (card.value <= 10) {
        score += card.value;
      } else {
        score += 10;
      }
    }
    return score;
  }
  pick1Card(deck) {
    this.cards.push(this.pickCard(deck));
    deck.cards.shift();
  }
}

//Deck
class Deck {
  constructor() {
    this.cards = [];
  }
  pickCard() {
    return deck.cards[0];
  }
  createCardsDeck() {
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < ranks.length; x++) {
        if (x < 10) {
          this.cards.push(new Card(ranks[x], x + 1, suits[i]));
        } else {
          this.cards.push(new Card(ranks[x], 10, suits[i]));
        }
      }
    }
    this.cards.push(new Card(null, 0, null, true));
    this.cards.push(new Card(null, 0, null, true));
  }

  randomCards() {
    for (let i = 0; i > this.cards.length; i++) {
      let random = Math.floor(Math.random() * i);
      let tmp = this.cards[location1];
      this.cards[i] = this.cards[random];
      this.cards[random] = tmp;
    }
  }
  addCard(...card) {
    this.cards.push(...card);
  }
  useCard() {
    return this.cards.shift();
  }
}

//PlayersDeck
class playersDeck extends Deck {
  constructor() {}

  deal1Card(deck) {
    this.cards.push(this.pickCard(deck));
    deck.cards.shift();
  }

  deal5Cards(deck) {
    for (let i = 0; i < 5; i++) {
      this.cards.push(this.pickCard(deck));
      deck.cards.shift();
    }
  }
}

//TableDeck
class TableDeck extends Deck {
  constructor() {
    super();
  }
  takeFromPile(pileDeck, cardLocation) {
    let set = pileDeck.usePile();
    let setLast = Math.abs(set.length - 1 - cardLocation);
    if (set.length > 1) {
      this.addCard(set[cardLocation]);
      pileDeck.addPile(set[setLast]);
    }
  }
}

//PileDeck
class PileDeck extends Deck {
  constructor() {
    super();
    this.pile = [];
  }
  addPile(set) {
    this.pile.unshift(set);
  }
  usePile() {
    return this.pile.shift();
  }
}

function createGame(players, tableDeck) {
  for (let player of players) {
    let playerBox = document.getElementsByClassName(`player-${player.number}`);
    printPlayer(player, playerBox);
  }
  let deckBox = document.createElement("div");
  deckBox.classList.add("table-deck");
  deckBox.innerText = tableDeck.length;
  document.body.append(deckBox);
}
