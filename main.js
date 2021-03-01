const playerNames = ["avi", "shlomi", "baruh", "menash"];
const game1 = new Game(playerNames);

console.log(game1);

document.addEventListener("click", (e) => {
  const cards = document.querySelectorAll(".card");
  //   if (cards.contains(e.target)) {

  //   }
});
window.addEventListener("DOMContentLoaded", () => {
  printGame(game1.players, game1.tableDeck);
});
