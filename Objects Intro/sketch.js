// Objects intro

let jinny;
let elif;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jinny = new Walker(width /2, height /2, "purple");
  elif = new Walker(200, 100, "Green");
}

function draw() {
  jinny.display();
  elif.display();
  jinny.move();
  elif.move();
}

class Walker {
  constructor(x, y, theColour) {
    this.x = x;
    this.y = y;
    this.color = theColour;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, 5);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //left
      this.x -= 5;
    }
    else if (choice < 50 ) {
      //right
      this.x += 5;
    }
    else if (choice < 75) {
      //up 
      this.y -= 5;
    }
    else {
      //down
      this.y += 5;
    }
  }
}