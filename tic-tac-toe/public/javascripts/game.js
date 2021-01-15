let marks = {
  X: "images/x.png",
  O: "images/o.png",
};
let gameState;

class GameState {
  constructor() {
    this.turn = 0;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  gameState = new GameState();

  //register event listener on all squares
  let squareElements = document.getElementsByClassName("square");
  for (let element of Array.from(squareElements)) {
    element.addEventListener("click", onSquareClick);
  }
});

/**
 * Things that happen when a square is clicked.
 * @param {Event} clickEvent
 */
function onSquareClick(clickEvent) {
  console.log(
    `Turn ${gameState.turn}: Click on square ${clickEvent.target.id}: `,
    clickEvent
  );

  let imgSrc = gameState.turn % 2 ? marks.O : marks.X;
  // remove innerhtml
  clickEvent.target.innerHTML = "";

  //add png to the square
  let element = document.createElement("img");
  element.setAttribute("src", imgSrc);
  element.setAttribute("height", 100);
  element.classList.add("game-mark");
  clickEvent.target.append(element);
  gameState.turn += 1;
}
