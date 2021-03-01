const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const suits = ["♠", "♣", "♥", "♦"];

//Card
class Card {
  constructor(rank, suit, isJoker = false) {
    this.rank = rank;
    this.suit = suit;
    this.isJoker = isJoker;
    this.faceDown = true;

    switch (rank) {
      case "A":
        this.rankIndex = 1;
        break;
      case "J":
        this.rankIndex = 11;
        break;
      case "Q":
        this.rankIndex = 12;
        break;
      case "K":
        this.rankIndex = 13;
        break;
      default:
        this.rankIndex = this.rank;
        break;
    }
  }

  get value() {
    if (this.isJoker) {
      return 0;
    }
    if (this.rank <= 10) {
      return this.rank;
    }
    if (this.rank === "A") {
      return 1;
    }
    return 10;
  }

  toString() {
    return this.isJoker ? "🃏" : `${this.rank} ${this.suit}`;
  }
  flip() {
    this.faceDown ? (this.faceDown = false) : (this.faceDown = true);
  }
}

//Player
class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.hand = new PlayerDeck();
    console.log("asd");
    this.score = 0;
  }

  get currentScore() {
    return this.hand.calcScore();
  }

  pullCard(Deck) {
    const card = Deck.useCard();
    this.addCard(card);
  }
}

//Deck
class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  createNewFullDeck() {
    for (let j = 0; j < ranks.length; j++) {
      for (let i = 0; i < suits.length; i++) {
        this.cards.push(new Card(ranks[j], suits[i], false));
      }
    }
    this.cards.push(new Card(null, null, true));
    this.cards.push(new Card(null, null, true));
  }

  size() {
    return this.cards.length;
  }
  // takeFromTop(deck) {
  //   return deck.cards[0];
  // }

  transferCardFromTop(deckToTransferFrom) {
    this.cards.push(deckToTransferFrom.cards.pop());
  }
}

class PlayerDeck extends Deck {
  constructor() {
    super();
  }
  pull5cards(deck) {
    for (let i = 0; i < 5; i++) {
      this.cards.push(this.transferCardFromTop(deck));
      // deck.cards.shift();
    }
  }
  removeCard(cardToRemove) {
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      if (card === cardToRemove) {
        // might need to use card.toString
        this.cards.splice(i, 1);
        return cardToRemove;
      }
    }
    throw new Error("Player doesnt have card: " + cardToRemove);
  }

  add(card) {
    this.cards.push(card);
  }

  calcScore() {
    return this.cards.reduce((prevScore, card) => prevScore + card.value, 0);
  }
}

//TableDeck
class TableDeck extends Deck {
  constructor() {
    super();
    this.createNewFullDeck();
  }

  takeFromTop() {
    if (this.size() === 0) {
      throw new Error("Can't take from empty pile!");
    }
    return this.cards.shift();
  }
  shuffle() {
    this.cards.sort(() => Math.random() > 0.5);
  }
}

//PileDeck
class PileDeck extends Deck {
  revealed = [];
  constructor() {
    super();
  }

  takeFromPile() {
    if (this.size() === 0) {
      throw new Error("Can't take from empty pile!");
    }
    return this.cards.shift();
  }

  putInPile(cards) {
    if (cards.length === 0) {
      throw new Error("Can't put 0 cards in pile");
    }
    this.revealed = cards;
    cards.forEach((card) => this.cards.unshift(card));
    return cards;
  }
}

function printGame(players, tableDeck) {
  for (let player of players) {
    let playerElement = document.getElementById(`player${player.id}`);
    printPlayer(player, playerElement);
  }
  let tablePileElement = document.createElement("div");
  tablePileElement.classList.add("table-pile");
  let tableDeckElement = document.createElement("div");
  tableDeckElement.classList.add("table-deck");
  let board = document.querySelector(".game-board");

  board.append(tablePileElement);
  board.append(tableDeckElement);

  for (let card of tableDeck.cards) {
    tableDeckElement.append(printCard(card));
  }
}

function printCard(card) {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  let cardImgPath;
  if (card.isJoker) {
    cardImgPath = `frontEnd/styles/cards/joker.jpg`;
  } else {
    cardImgPath = `frontEnd/styles/cards/${card.rank}${card.suit}.jpg`;
  }
  let imgElement = document.createElement("img");
  imgElement.src = cardImgPath;

  cardElement.append(imgElement);

  return cardElement;
}

function printPlayer(player, playerElement) {
  for (let card of player.hand.cards) {
    playerElement.append(printCard(card));
  }
  let pointsElement = document.createElement("div");
  pointsElement.className = "player-points";
  pointsElement.innerText = player.hand.calcScore();
  playerElement.append(pointsElement);
}
