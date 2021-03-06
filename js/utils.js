// Collision of rectangles
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

//Check who wins
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
    play1.play();
  } else if (player.health < enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
    play2.play();
  }
}

// Timer
let timer = 60;
let timerId;
function decreaseTimer() {
  let num = document.querySelector("#timer");

  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    num.innerHTML = timer;
  }

  if (timer <= 20) {
    num.style.color = `yellow`;
  }

  if (timer <= 10) {
    num.style.color = `red`;
    countDown.play();
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
