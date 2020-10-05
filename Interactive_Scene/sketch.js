//Heather Grove
//Dodging Duck
//Dodge the incoming bombs by moving your mouse
//
//Extra for experts:
//I've added a quacking sound whenever the mouse is clicked

//Setting image and sound variables
let pond, duck, quack;
let duckScalar = 0.5;

//Movement variables
let x, y;

//Bomb variables
let numberofbombs = 10;
let bombposX = [];
let bombposY = [];
let bombacceleration = [];
let bombvelocity = [];
let bombSize;

//Time Variables
let time = 0;
let fallTime = 0;

//Button Variables
let startButton;
let gameStarted = false

let hit;
let score = 0;

let ballColours = ["Orange", "Blue", "Purple", "Pink", "yellow"];
let ballColour = "Orange"

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50, 50, 255);
  
  //Setting up initial Bombs
  initbombpos();
  
  //Creating acurate falltime for resetting bombs
  let temp00 = 0, temp01 = -20
  while(temp01 < height) {
    temp00 += 0.1;
    temp01 += temp00;
    fallTime++;
  }
  
  hit = false;
  
  //Setting up variables using width and height
  bombSize = width / 8
  x = width/2;
  y = height/ 2;
  
  //Displaying start button
  startButton = createButton("Start Game");
  startButton.position(width / 2 - ((width / 4) / 2), height / 2 - ((height / 8) / 2));
  startButton.size(width /4, height / 8);
  startButton.mousePressed(startGame);
  
  //Loading images and sounds
  pond = loadImage("pond.jpg");
  duck = loadImage("duck.png");
  quack = loadSound('duckQuack.mp3');
}

function draw() {
  
  if (gameStarted) {
    imageMode(CORNERS);
    background(pond);
    
    scoreUpdate();
    displayText();
    
    displayDuck();
    displayBombs();
    updateBombPos();
    
    time++;
  }
}

//Placement and Speed for initial Bombs
function initbombpos() {
  for (let i =0; i < numberofbombs; i++) {
    bombacceleration[i] = random(0.02, 0.03);
    bombvelocity[i] = random(5, 10);
    bombposX[i] = random(0.5, width);
    bombposY[i] = random(-20, -0.5);
  }
}

//Displaying bombs and checking collision
function displayBombs() {
  fill(ballColour);
  
  for (let b = 0; b < numberofbombs; b++) {
    circle(bombposX[b], bombposY[b], bombSize)
    
  hit = collidePointCircle(mouseX, mouseY - duck.height * duckScalar / 2, bombposX[b], bombposY[b], bombSize);
    
  if (hit) {
    endGame();
  }
  }
}

//Moving bombs and checking collision
function updateBombPos() {
  for(let r = 0; r < numberofbombs; r++) {
    bombvelocity[r] += bombacceleration[r];
    bombposY[r] += bombvelocity[r]
    
    hit = collidePointCircle(mouseX, mouseY - duck.height * duckScalar / 2, bombposX[r], bombposY[r], bombSize);
}
  
  if (hit) {
    endGame();
  }
  
  //Resetting bombs to top of screen
  if (time > fallTime) {
    initbombpos();
    time = 0;
  }
}

function startGame() {
  startButton.hide();
  noCursor();
  isUsingMouse = true;
  gameStarted = true;

}

//Ending game and displaying try again button
function endGame() {
    gameStarted = false;
    background('Black');
    fill(255)
    text("GAME OVER", width / 2, height /2);
    cursor();
    
    tryAgainButton = createButton("Try Again?");
    tryAgainButton.position(width / 2 - ((width / 4) / 2), height * 0.7);
    tryAgainButton.size(width /4, height / 8);
    tryAgainButton.mousePressed(tryAgain);
  
}

//resetting game
function tryAgain() {
  tryAgainButton.hide();
  setup();
}

function displayDuck() {
 
  imageMode(CENTER);
  
  //Keeping duck below half
  if (mouseY > height / 2) {
    image(duck, mouseX + 10, mouseY + 10, duck.width * duckScalar, duck.height * duckScalar) ;
    
    x = mouseX;
    y = mouseY;
  }
  
  //Following the X of the mouse but not Y if mouse is above half
  else {
    image(duck, mouseX, y, duck.width * duckScalar, duck.height * duckScalar);
  }
}

function mouseClicked() {
  quack.play();
}

function displayText() {
  fill(0)
  text("Press 'b' to change the balls colour", 0, height / 10); 
}

function keyPressed() {
 if (key === 'b') {
   ballColour = random(ballColours);
 }
}

function scoreUpdate() {
  score += 10;
  fill(0)
  text("SCORE:" + int(score/fallTime), width - 65, 15 )
}