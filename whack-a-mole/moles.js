//Globals
let gameRunner = {
  interval: null,
  running: false,
};
const popUpInterval = 1000;

window.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", onStartClick);

  let holeElements = document.getElementsByClassName("hole");
  for (let element of Array.from(holeElements)) {
    element.addEventListener("click", onHoleClick);
  }
});

/** Returns a random integer between and up to start and end values */
function randomInt(start, end) {
  return Math.floor(Math.random() * end + start);
}

/** Stuff to do when start button is clicked */
function onStartClick() {
  let btn = document.getElementById("startBtn");
  if (!gameRunner.running) {
    startGame();
    btn.innerText = "Stop!";
  } else {
    stopGame();
    btn.innerText = "Start!";
  }
}

function stopGame() {
  clearInterval(gameRunner.interval);
  gameRunner.running = false;
}

/** Reset the score and start a new game */
function startGame() {
  stopGame();
  resetScore();
  gameRunner.interval = setInterval(() => {
    popUpMole();
  }, popUpInterval);
  console.log("Game Started");
  gameRunner.running = true;
}

/** Pop up a random mole for a random time after a random delay */
async function popUpMole() {
  let minTimeUp = 300;
  let maxTimeUp = 1000;
  const upDelay = randomInt(0, 2000);
  let upTime = randomInt(minTimeUp, maxTimeUp);
  let hole = randomInt(1, 6);

  await sleep(upDelay);

  if (!gameRunner.running) return;

  holeUp(hole);
  setTimeout(() => {
    holeDown(hole);
  }, upTime);
}

/** Sleep Function for async timeouts */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function onHoleClick(clickEvent) {
  let isMole = [...clickEvent.target.classList].includes("mole");
  let alreadyClicked = [...clickEvent.target.classList].includes("clicked");
  if (isMole && !alreadyClicked) {
    console.log(clickEvent);
    clickEvent.target.classList.add("clicked");
    clickEvent.target.parentElement.classList.remove("up");
    increaseScore();
  }
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
 * Set a hole to be down and reset props
 * @param {Number} hole
 */
function holeDown(hole) {
  let resetDelay = 400; //This is set to the same value as up animation length
  let element = document.getElementsByClassName(`hole${hole}`);
  element[0].classList.remove("up");
  setTimeout(() => {
    element[0].children[0].classList.remove("clicked");
  }, resetDelay);
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
