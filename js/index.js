const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
// document.getElementById(`button`).onclick = () => {
  //   startGame()
  // }
  
  canvas.width = 1024
  canvas.height = 576
  
  c.fillRect(0, 0, canvas.width, canvas.height)
  
    let blink_speed = 800; // every 1000 == 1 second, adjust to suit
    let t = setInterval(function () {
    let ele = document.getElementById('pressEnter');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, blink_speed);
  
function startGame() {
  document.querySelector(`#pressEnter`).remove()
  document.querySelector(`#startTitle`).remove()
  int = setInterval(2000)
  animate()
  decreaseTimer()
  
  if(keys.J.pressed === true) {
    easter.play()
    document.body.style.backgroundImage = "url('img/money.jpeg')"
  } else {
    theme.play();
  }
}

//Audio
let theme = new Audio('audio/main.mp3');
theme.loop = true;
theme.volume = .1;

let easter = new Audio(`audio/easter.mp3`)

let jump = new Audio('audio/Jump.wav');
jump.volume = .5
let jump2 = new Audio('audio/Jump.wav');
jump2.volume = .5

let dmgHero = new Audio(`audio/dmgH.wav`)
dmgHero.volume = .5

let dmgKnight = new Audio(`audio/dmgK.wav`)
dmgKnight.volume = .5

let sword = new Audio(`audio/sword.wav`)
sword.volume = .25

let sword1 = new Audio(`audio/sword.wav`)
sword1.volume = .25

let swordHit = new Audio(`audio/swordHit.wav`)
swordHit.volume = .5

let countDown = new Audio(`audio/countdown.wav`)

let play1 = new Audio(`audio/player1.mp3`)

let play2 = new Audio(`audio/player2.mp3`)






const gravity = .7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: 'img/Background.png'
})

const jeff = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: 'img/jeff.jpeg'
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: 'img/knight/Idle.png',
  framesMax: 11,
  scale: 2,
  offset: {
    x: 95,
    y: 30
  },
  sprites: {
    idle: {
      imageSrc: 'img/knight/Idle.png',
      framesMax: 11
    },
    run: {
      imageSrc: 'img/knight/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: 'img/knight/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: 'img/knight/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: 'img/knight/Attack2.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: 'img/knight/Take-HitK.png',
      framesMax: 4,
    },
    death: {
      imageSrc: 'img/knight/Death.png',
      framesMax: 11
    }
  },
  attackBox: {
    offset: {
      x: 184,
      y: 130
    },
    width: 160,
    height: 50
  }
})

console.log(player)

const enemy = new Fighter({
  position: {
    x: 1000,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: 'img/hero/Idle.png',
  framesMax: 10,
  scale: 2,
  offset: {
    x: 215,
    y: -35
  },
  sprites: {
    idle: {
      imageSrc: 'img/hero/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: 'img/hero/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: 'img/hero/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: 'img/hero/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: 'img/hero/Attack1.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: 'img/hero/Take-HitH.png',
      framesMax: 3
    },
    death: {
      imageSrc: 'img/hero/Death.png',
      framesMax: 11
    }
  },
  attackBox: {
    offset: {
      x: -290,
      y: 130
    },
    width: 170,
    height: 50
  }
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  J: {
    pressed: false
  }
}

// decreaseTimer()
function animate() {
  window.requestAnimationFrame(animate)
  
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  if(keys.J.pressed === true) {
    jeff.update()
  } else {
    background.update()
  }
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }
  
  //player collision
  if(player.position.x <= -50) {
    player.position.x = -50
  }
  if(player.position.x >= 875) {
    player.position.x = 875
  }
  if(player.position.y <= -98) {
    player.position.y = -98
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  //enemy collsion
  if(enemy.position.x <= 130) {
    enemy.position.x = 130 
  }
  if(enemy.position.x >= 1100) {
    enemy.position.x = 1100
  }
  if(enemy.position.y <= -139) {
    enemy.position.y = -130
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    dmgHero.play()
    dmgHero.pause();
    dmgHero.currentTime = 0;
    dmgHero.play();
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    dmgKnight.play()
    dmgKnight.pause();
    dmgKnight.currentTime = 0;
    dmgKnight.play();
    swordHit.play()
    swordHit.pause();
    swordHit.currentTime = 0;
    swordHit.play();
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}


//Player controls
window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'     
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -17
        jump.play()
        jump.pause();
        jump.currentTime = 0;
        jump.play();
        break
       case 's':
        // setTimeout(() => {
        player.attack()
        sword.play()
        sword.pause();
        sword.currentTime = 0;
        sword.play();
        // }, "100 ")
        break
        case ` `:
        startGame()
        break
        case `J`:
        keys.J.pressed = true
        break
    }
  }

  //Enemy Controls
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -18
        jump2.play()
        jump2.pause();
        jump2.currentTime = 0;
        jump2.play();
        break
      case 'ArrowDown':
        // setTimeout(() => {
        enemy.attack()
        sword1.play()
        sword1.pause();
        sword1.currentTime = 0;
        sword1.play();
        // }, "100 ")
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
