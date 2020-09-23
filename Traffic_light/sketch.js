// Traffic Lights
// Heather Grove
// Sept 23 2020

let state = "go";
let switchTime = 5000;
let lastSwitched = 0;
let greenLightDuration = 4000;
let yellowLightDuration = 1000;
let redLightDuration = 4000;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  drawOutlineOfLights();
  chooseWhichColour();
  colourLights();
  
}


function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill("black");
  rect(width/2, height/2, 75, 200, 10);
  
  //lights
  fill("white");
  circle(width/2, height/2 - 65, 50); //top
  circle(width/2, height/2, 50); //middle
  circle(width/2, height/2 + 65, 50); //bottom
    
}

function colourLights() {
  if (state === "stop") {
    fill("red");
    circle(width/2, height/2 - 65, 50); //top
  }

  else if (state === "wait") {
    fill("yellow");
    circle(width/2, height/2, 50); //middle
  }
  
  else if (state === "go") {
    fill("green");
    circle(width/2, height/2 + 65, 50); //bottom
  }
}

function chooseWhichColour() {
  if (state === "go" && millis() > lastSwitched + greenLightDuration) {
    state = "wait";
    lastSwitched = millis()
  }

  else if (state === "wait" && millis() > lastSwitched + yellowLightDuration) {
    state = "stop";
    lastSwitched = millis();
  }

  else if (state === "stop" && millis() > lastSwitched + redLightDuration) {
    state = "go";
    lastSwitched = millis();
  }
}