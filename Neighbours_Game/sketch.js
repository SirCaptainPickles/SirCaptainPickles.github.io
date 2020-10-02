// 2D Arrays demo

let grid;
let cellWidth;
let cellHeight;
const GRIDSIZE = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateGrid(GRIDSIZE);
  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let cellX = floor(mouseX / cellWidth);
  let cellY = floor(mouseY / cellHeight);

  toggleCell(cellX, cellY); //self
  toggleCell(cellX, cellY - 1); //south
  toggleCell(cellX, cellY + 1); //north
  toggleCell(cellX - 1, cellY); //west
  toggleCell(cellX + 1, cellY); //east
  
  console.log(grid[0]);
}

function toggleCell(cellX, cellY) {
  if (cellX >= 0 && cellX < GRIDSIZE &&
    cellY >= 0 && cellY < GRIDSIZE) {

    if (grid[cellY][cellX] === 0) {
      grid[cellY][cellX] = 1;
    }

    else {
      grid[cellY][cellX] = 0;
    }
  }
}

function keyPressed() {
  if (key === " ") {
    grid = generateGrid(10);
  }
}

function displayGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("black");
      }
      else {
        fill("white");
      }

      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);
    }
  }
}


function generateGrid(gridSize) {
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      grid[i].push(1);
    }
  }
  return grid;
}