const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultsDiv = document.getElementById('results');
const scoreDiv = document.getElementById('score');
const gameOverDiv = document.getElementById('game-over');

let score = [0, 0];

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getComputerChoice(choices) {
  const i = Math.floor(Math.random() * choices.length);
  return choices[i];
}

function getWinner(userChoice, computerChoice) {
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')) {
    return 'player won';
  } else if (userChoice === computerChoice) {
    return 'draw';
  } else {
    return 'player lost';
  }
}

function updateScoreDisplay() {
  scoreDiv.textContent = 'You: ' + score[0] + ' — Computer: ' + score[1];
}

function setChoiceButtonsDisabled(disabled) {
  rockBtn.disabled = disabled;
  paperBtn.disabled = disabled;
  scissorsBtn.disabled = disabled;
}

function checkGameOver() {
  if (score[0] >= 5) {
    gameOverDiv.textContent = 'You win the game!';
    setChoiceButtonsDisabled(true);
    return true;
  }
  if (score[1] >= 5) {
    gameOverDiv.textContent = 'You lose the game!';
    setChoiceButtonsDisabled(true);
    return true;
  }
  return false;
}

function playRound(playerSelection) {
  if (rockBtn.disabled) {
    return;
  }

  const choices = ['rock', 'paper', 'scissors'];
  const userChoice = playerSelection;
  const computerChoice = getComputerChoice(choices);
  const result = getWinner(userChoice, computerChoice);

  if (result === 'player won') {
    resultsDiv.textContent =
      'You win! ' + capitalize(userChoice) + ' beats ' + computerChoice + '!';
    score[0] += 1;
  } else if (result === 'draw') {
    resultsDiv.textContent = "It's a draw!";
  } else {
    resultsDiv.textContent =
      'You lose! ' + capitalize(computerChoice) + ' beats ' + userChoice + '!';
    score[1] += 1;
  }

  updateScoreDisplay();
  checkGameOver();
}

rockBtn.addEventListener('click', function () {
  playRound('rock');
});
paperBtn.addEventListener('click', function () {
  playRound('paper');
});
scissorsBtn.addEventListener('click', function () {
  playRound('scissors');
});

updateScoreDisplay();
