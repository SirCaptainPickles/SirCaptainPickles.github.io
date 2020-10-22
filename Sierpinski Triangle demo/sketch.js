// Sierpinski Triangle Demo

let triangleVertices = [
  {x: 600, y: 25},
  {x: 200, y: 700},
  {x: 1000, y: 700}
];

let levelsDeep = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(triangleVertices, levelsDeep);
}

function mousePressed() {
  levelsDeep++;
}

function sierpinski(points, depth) {
  let theColours = ["black","red", "blue", "orange", "purple", "cyan", "white", "pink", "green"];
  fill(theColours[depth % theColours.length]);
  noStroke();

  triangle(points[0].x, points[0].y,
          points[1].x, points[1].y,
          points[2].x, points[2].y);

  //Exit clause
  if (depth > 0) {
    sierpinski([points[0],
              getMidpoint(points[0], points[1]),
              getMidpoint(points[0], points[2])],
              depth - 1
    );
    sierpinski([points[1],
              getMidpoint(points[1], points[0]),
              getMidpoint(points[1], points[2])],
              depth - 1
    );        
    sierpinski([points[2],
              getMidpoint(points[2], points[0]),
              getMidpoint(points[2], points[1])],
              depth - 1
    );
  }

}

function getMidpoint(point1, point2) {
  let xDifference = point1.x + point2.x;
  let yDifference = point1.y + point2.y;
  let midpoint = {x: xDifference/2, y: yDifference/2};
  return midpoint;
}