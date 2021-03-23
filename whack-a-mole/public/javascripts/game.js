//Globals
let game = {
  interval: null,
  running: false,
  score: 0,
  moleCount: 0,
  config: {
    molesPerGame: 20,
    popUpInterval: 1000,
    minTimeUp: 300,
    maxTimeUp: 1000,
    maxDelay: 2000,
  },
};

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
  let range = end - start;
  return Math.round(Math.random() * range + start);
}

/** Stuff to do when start button is clicked */
function onStartClick() {
  let btn = document.getElementById("startBtn");
  if (!game.running) {
    startGame();
    btn.innerText = "Stop!";
  } else {
    stopGame();
    btn.innerText = "Start!";
  }
}

function stopGame() {
  clearInterval(game.interval);
  game.running = false;
}

/** Reset the score and start a new game */
function startGame() {
  resetScore();
  game.interval = setInterval(() => {
    if (game.moleCount == game.config.molesPerGame) {
      onStartClick();
      console.log(
        `Game has ended. Final score: ${game.score}/${game.moleCount} (${
          (game.score / game.moleCount) * 100
        }%)`
      );
      return;
    }
    popUpMole();
    game.moleCount++;
  }, game.config.popUpInterval);
  console.log("Game Started");
  game.running = true;
}

/** Pop up a random mole for a random time after a random delay */
async function popUpMole() {
  let upDelay = randomInt(0, game.config.maxDelay);
  let upTime = randomInt(game.config.minTimeUp, game.config.maxTimeUp);
  let hole = randomInt(1, 6);

  await sleep(upDelay);

  if (!game.running) return;

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
    console.log("GOT EM");
    clickEvent.target.classList.add("clicked");
    clickEvent.target.parentElement.classList.remove("up");
    increaseScore();
  }
}

/** Set a hole to be up
 * @param {Number} hole
 */
function holeUp(hole) {
  let element = document.getElementsByClassName(`hole${hole}`);
  element[0].classList.add("up");
}

/** Set a hole to be down and reset props
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

function updateScore() {
  let scoreboard = getScoreElement();
  scoreboard.innerText = game.score;
}

function increaseScore() {
  game.score += 1;
  updateScore();
}

function resetScore() {
  game.moleCount = 0;
  game.score = 0;
  updateScore();
}
