function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getComputerChoice(choices) {
  const i = Math.floor(Math.random() * choices.length);
  return choices[i];
}

function getUserChoice() {
  return prompt('Rock, paper, or scissors?');
}

function getWinner(userChoice, computerChoice) {
  if ((userChoice === 'rock' && computerChoice === 'scissors') || 
      (userChoice === 'paper' && computerChoice === 'rock') || 
      (userChoice === 'scissors' && computerChoice === 'paper')) {
    console.log(`You win! ${capitalize(userChoice)} beats ${computerChoice}!`);
    return 'player won';
  } else if (userChoice === computerChoice) {
    console.log("It's a draw!");
    return 'draw';
  } else {
    console.log(`You lose! ${capitalize(computerChoice)} beats ${userChoice}!`);
    return 'player lost'
  };
}

function playRound(score) {
  const choices = ['rock', 'paper', 'scissors'];
  const userChoice = (getUserChoice() ?? '').trim().toLowerCase();
  const computerChoice = getComputerChoice(choices);

  let result = getWinner(userChoice, computerChoice);

  if (result === 'player won') {
    score[0] += 1;
  } else if (result === 'player lost') {
    score[1] += 1;
  };

  return score;
}

function announceWinner(score) {
  if (score[0] > score[1]) {
    console.log('You win the game!')
  } else if (score[0] < score[1]) {
    console.log('You lose the game!')
  } else {
    console.log("It's a draw!")
  };
}

function playGame() {
  let score = [0, 0];
  for (let i = 0; i < 5; i++) { score = playRound(score); }
  announceWinner(score);
}

playGame();
