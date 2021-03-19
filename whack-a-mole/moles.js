window.addEventListener("DOMContentLoaded", () => {
  console.log("Hi i loaded.");
  //Register a click action on the start button.  Use that to start the game
  let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", startGame);
});

/** Returns a random integer between and up to start and end values */
function randomInt(start, end) {
  return Math.floor(Math.random() * end + start);
}

function startGame() {
  //make a random mole appear for a random time
  resetScore();
  popUpMole();
}

/** Pop up a random mole for a random time after a random delay */
async function popUpMole() {
  let minTimeUp = 300;
  let maxTimeUp = 1000;
  const upDelay = randomInt(0, 2000);
  let upTime = randomInt(minTimeUp, maxTimeUp);
  let hole = randomInt(1, 6);

  console.log(
    `Going to pop up hole ${hole} for ${upTime}ms after a ${upDelay}ms delay`
  );

  await sleep(upDelay);
  holeUp(hole);
  setTimeout(() => {
    holeDown(hole);
  }, upTime);
}

/** Sleep Function for async timeouts */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Set a hole to be up
 * @param {Number} hole
 */
function holeUp(hole) {
  let element = document.getElementsByClassName(`hole${hole}`);
  element[0].classList.add("up");
}

/**
 * Set a hole to be down
 * @param {Number} hole
 */
function holeDown(hole) {
  let element = document.getElementsByClassName(`hole${hole}`);
  element[0].classList.remove("up");
}

function getScoreElement() {
  let els = document.getElementsByClassName("score");
  return els[0];
}

function increaseScore() {
  let scoreboard = getScoreElement();
  scoreboard.innerText = +scoreboard.innerText + 1;
}
function resetScore() {
  let scoreboard = getScoreElement();
  scoreboard.innerText = 0;
}
