// Fireworks object demo

let theSparks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(0);
  
  for (let i = theSparks.length - 1; i >= 0; i--)  {
    if (theSparks[i].isDead()) {
      theSparks.splice(i, 1);
    }
    else {
      theSparks[i].move();
      theSparks[i].display();
    }
  }
}

function mousePressed() {
  spawnSparks(100);
}

function spawnSparks(howManySparks) {
  let r = random(255);
  let g = random(255);
  let b = random(255);

  let theta = 0;
  let angleIncrease = 2 *PI/howManySparks;
  for (let i = 0; i < 100; i++) {
    let dx = cos(theta) + random(-0.2, 0.2);
    let dy = sin(theta) + random(-0.2, 0.2);
    let someSpark = new Spark(mouseX, mouseY, dx, dy, r, g, b);

    theSparks.push(someSpark);
    theta += angleIncrease;
  }
}

class Spark {
  constructor(x, y, dx, dy, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.gravity = 0.05;

    this.radius = 2;

    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    
    //gravity
    this.dy += this.gravity;

    //Slowwly fade
    this.alpha -= 2;
  }

  isDead() {
    return this.alpha <= 0;
  }
}