class Game {
  players;
  playerPlayingId = null;

  constructor(playerNames, tableDeck) {
    if (tableDeck) {
      this.tableDeck = tableDeck;
    } else {
      this.tableDeck = new TableDeck();
    }

    this.pileDeck = new PileDeck();
    this.pileDeck.transferCardFromTop(this.tableDeck);

    this.players = [];

    let count = 0;
    for (let i = 0; i < playerNames.length; i++) {
      this.players.push(new Player(playerNames[i], ++count));
      console.log(this.players[i]);
      this.players[i].hand.pull5cards(this.tableDeck);
    }

    this.turn = 0;
  }

  // cardClicked(player, card) {
  //     if player.id === this.playerPlayingId
  // }

  dealCards(tableDeck) {
    this.players.forEach((player) => {
      for (let i = 0; i < 5; i++) {}
    });
  }
  newRound() {
    this.players.forEach((player) => (player.hand.cards.length = 0));
    this.pileDeck.cards.length = 0;
    this.tableDeck = new TableDeck();
    this.tableDeck.shuffle();
  }
}

function yanivCalled(
  game,
  yanivCalled,
  isCardToGetFromTableDeck,
  cardPickedFromSet
) {
  let playersRoundSum = [];
  for (const player of players) {
    playersRoundSum.push(player.calcScore());
  }

  if (Math.min(...playersRoundSum) === playerInTurn.calcScore()) {
    // check corner case whre other player has same lowest score
    // Yaniv successful
    for (player of players) {
      if (playerInTurn !== player) {
        player.points += player.calcScore();
      }
    }
  } else {
    // Assaf
    playerInTurn.points += 30;
    for (player of players) {
      if (Math.min(...playersRoundSum) !== playerInTurn.calcScore()) {
        player.points += player.calcScore();
      }
    }
    Game.newRound();
  }
}

function choseLegalCards(chosenCards) {
  if (chosenCards.length === 0) {
    return true;
  } else {
    for (let card of chosenCards) {
      if (card.rank === chosenCards[0].rank) {
        return false;
      }
    }
  }
}

chosenCard = [2, 1, 7, 5];
chosenCard.sort((a, b) => {
  return a - b;
});
const chosenCardsDifferences = chosenCard.slice(1).map(function (value, i) {
  return value - chosenCard[i];
});
const isDifference =
  chosenCardsDifferences.every((value) => value === 1) ||
  chosenCardsDifferences.every((value) => value === 0);
console.log(isDifference);

function arrayPyramid(arr) {
  let count = 0;
  return arr.reduce((prev, val) => {
    if (count++ === 0) return [[prev], val];
    return [prev, val];
  });
}
console.log(arrayPyramid([10, "j", "Q", "K"]));

//  [[[[10]"J"]"Q"]"K"]

function throwLegalCards(cards) {
  playerInTurn.playerDeck.removeCard(chosenCards);
  game.pileDeck.putInPile(chosenCards);
}

// };
//         // discard cards???
//         // discarded cards

//     //     // taking card/ cards --> where from??
//     //     if(isCardToGetFromTableDeck) {
//     //         // taking card from tabledeck
//     //         // update tabledeck
//     //     } else {
//     //         // taking card from pileDeck --> which one??
//     //         // update pileDeck
//     //         if (cardPickedFromSet... condition??) {
//     //             playerInTurn.giveCardPileDeck()
//     //         }
//     //     }

//     // }

//     // game.playerInTurn = game.players[(game.playerInTurn + 1) % game.numberOfPlayers]
//     // game.turnsSinceStart++;
