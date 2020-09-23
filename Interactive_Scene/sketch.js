let pond, duck, quack;
let duckScalar = 0.5;

let isUsingMouse;
let isMovingLeft, isMovingRight, isMovingUp, isMovingDown

let x, y;
let ballYPos = 0;
let ballSpeed = 5;

let startButton, useMouseButton, useKeyboardButton, tryAgainButton;
let gameStarted = false

let hit;

let positions;
let everyBall = []
let ballColours = ["Orange", "Blue", "Purple", "Pink", "yellow"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50, 50, 255);
  
  hit = false;
  
  positions = [width / 10, width / 8, width / 4, width / 3, width / 2, width * 0.8, width * 0.65, width * 0.9]
  
  x = width/2;
  y = height/ 2;
  
  isMovingLeft = false;
  isMovingRight = false;
  isMovingUp = false;
  isMovingDown = false;
  
  startButton = createButton("Start Game");
  startButton.position(width / 2, height / 2);
  startButton.size(width /4, height / 8);
  startButton.mousePressed(startGame);
  
  pond = loadImage("pond.jpg");
  duck = loadImage("duck.png");
  quack = loadSound('duckQuack.mp3');
}

function draw() {
  
  if (gameStarted) {
    imageMode(CORNERS);
    background(pond);
    
    if (isUsingMouse) {
        displayMouseDuck();
        window.setInterval(makeBalls, 1000);
    }
    else if (!isUsingMouse) {
      handleKeys();
      displayKeysDuck();
      window.setInterval(makeBalls, 1000);
    }
  }
  
  //displayTimer();
}

function startGame() {
  startButton.hide();
  
  useMouseButton = createButton("Use Mouse");
  useMouseButton.position(width / 8, height / 2);
  useMouseButton.size(width /4, height / 8);
  useMouseButton.mousePressed(useMouse);
  
  useKeyboardButton = createButton("Use WASD");
  useKeyboardButton.position(width / 2, height / 2);
  useKeyboardButton.size(width /4, height / 8);
  useKeyboardButton.mousePressed(useKeyboard);

}

function useMouse() {
  noCursor();
  isUsingMouse = true;
  frameRate(20);
  useMouseButton.hide();
  useKeyboardButton.hide();
  gameStarted = true;
}

function useKeyboard() {
  noCursor();
  isUsingMouse = false;
  useMouseButton.hide();
  useKeyboardButton.hide();
  gameStarted = true;
}

function endGame() {
    gameStarted = false;
    background('red');
    cursor();
  
    //tryAgainButton = createButton("Try Again?");
    //tryAgainButton.position(width / 2, height / 2);
    //tryAgainButton.size(width /4, height / 8);
    //tryAgainButton.mousePressed(tryAgain);
  
}

function tryAgain() {
  tryAgainButton.hide();
  setup();
}

function makeBalls() {
  // for (let xPos of positions) {
  //   fill('green');
  //   circle(xPos, ballYPos, width /8);
    for (let ball of everyBall) {
      noStroke();
      fill(ball.theColor);
      circle(ball.x, ball.y, ball.size);
    }
    
    moveBalls()
  
    hit = collidePointCircle(mouseX, mouseY - duck.height * duckScalar / 2, xPos, ballYPos, width / 8);
    
    if (hit) {
      endGame();
  }
}

function spawnBall() {
  let ball = {
    x: random(positions),
    y: (ballYPos),
    size: (width / 8),
    theColor: color(random(255), random(255), random(255), random(255)),
  };
  
  everyBall.push(ball);
}

function moveBalls() {
  ballYPos += ballSpeed
}

function displayMouseDuck() {
 
  imageMode(CENTER);
  if (mouseY > height / 2) {
    image(duck, pmouseX + 10, pmouseY + 10, duck.width * duckScalar, duck.height * duckScalar) ;
    
    x = mouseX;
    y = mouseY;
  }
  else {
    image(duck, mouseX, y, duck.width * duckScalar, duck.height * duckScalar);
  }
}

function displayKeysDuck() {
    imageMode(CENTER);
    image(duck, x, y, duck.width * duckScalar, duck.height * duckScalar);
}

function handleKeys() {
 if (isMovingUp && y > width / 2) {
   y -= 6;
 } 
  if (isMovingDown && y < height - (duck.height * duckScalar / 2)) {
   y += 6;
 } 
  if (isMovingLeft && x > 0 + (duck.width * duckScalar / 2)) {
   x -= 6;
 } 
  if (isMovingRight && x < width - (duck.height * duckScalar / 2)) {
   x += 6;
 } 
}

function keyPressed() {
 if (key === 'w') {
   isMovingUp = true;
 } 
  if (key === 's') {
   isMovingDown = true;
 } 
  if (key === 'a') {
   isMovingLeft = true;
 } 
  if (key === 'd') {
   isMovingRight = true;
 }  
}

function keyReleased() {
 if (key === 'w') {
   isMovingUp = false;
 } 
  if (key === 's') {
   isMovingDown = false;
 } 
  if (key === 'a') {
   isMovingLeft = false;
 } 
  if (key === 'd') {
   isMovingRight = false;
 }
}

function mouseClicked() {
  quack.play();
}

function displayTimer() {
  seconds = 60;
  
  fill('black');
  text('Time left:\n' + seconds, windowWidth - (windowWidth * clockScalar) - 20, windowHeight * clockScalar);
}
