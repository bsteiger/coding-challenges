window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded!");
  let marks = {
    X: "tic-tac-toe/public/images/x.png",
    O: "tic-tac-toe/public/images/o.png",
  };
  let startingPlayer = "X";
  let turn = 0; //evens will be Starting Player

  //register event listener on all squares
  let squareElements = document.getElementsByClassName("square");
  for (let element of Array.from(squareElements)) {
    console.log("Square", element);
    element.addEventListener("click", (clickEvent) => {
      squareClickHandler(clickEvent);
    });
  }
});

function squareClickHandler(clickEvent) {
  console.log(`Click on square ${clickEvent.path[0].id}: `, clickEvent);
}
