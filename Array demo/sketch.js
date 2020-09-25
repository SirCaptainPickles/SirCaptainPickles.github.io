let numberOfRects = 80;
let rectHeights = [];
let rectWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth  = width / numberOfRects;
  setTheHeights();

}

function draw() {
  background(220);
  displayRects();
}

function setTheHeights() {
  for (let i = 0; i < numberOfRects; i++) {
    rectHeights.push(random(1, height));    
  }
}

function displayRects() {
  for (let i = 0; i < numberOfRects; i++) {
    fill("Black");
    rect(i * rectWidth, height - rectHeights[i], rectWidth, rectHeights[i]);
  }
}