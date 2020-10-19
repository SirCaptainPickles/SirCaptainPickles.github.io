// Clicker Demo

let numberOfClicks = 0;
let highScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  highScore = getItem("maxClicks");
}

function draw() {
  background(220);
  showCLicks();
  highestClickScore();
}

function mousePressed() {
  numberOfClicks++;
  if (numberOfClicks > highScore) {
    storeItem("maxClicks", numberOfClicks);
  }
}

function showCLicks() {
  fill("black");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(numberOfClicks, width /2, height /2);
}

function highestClickScore() {
  fill("blue");
  textSize(40);
  text(highScore, width / 2, height / 2 + 150);
}
