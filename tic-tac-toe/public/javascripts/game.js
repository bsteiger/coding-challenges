let marks = {
  X: "images/x.png",
  O: "images/o.png",
};
let turn;
window.addEventListener("DOMContentLoaded", () => {
  turn = 0;

  //register event listener on all squares
  let squareElements = document.getElementsByClassName("square");
  for (let element of Array.from(squareElements)) {
    element.addEventListener("click", (clickEvent) => {
      squareClickHandler(clickEvent);
    });
  }
});

/**
 * Things that happen when a square is clicked.
 * @param {Event} clickEvent
 */
function squareClickHandler(clickEvent) {
  console.log(
    `Turn ${turn}: Click on square ${clickEvent.target.id}: `,
    clickEvent
  );

  let imgSrc = turn % 2 ? marks.X : marks.O;
  // remove innerhtml
  clickEvent.innerHTML = "";

  //add png to the square
  let element = document.createElement("img");
  element.setAttribute("src", imgSrc);
  element.setAttribute("height", 100);
  clickEvent.target.append(element);
  turn += 1;
}
