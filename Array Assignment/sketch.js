// 2D Array Assignment: Tic Tac Toe
// Heather Grove
// Oct 1, 2020

let grid = [["E","E","E"], ["E","E","E"], ["E","E","E"]];

let cellWidth;
let cellHeight;
let isSecondPlayerHere;
let isPlayerOnesTurn = true;
const GRIDSIZE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(220);
  displayGrid();
  fill("black");
}

function mousePressed() {
  let cellX = floor(mouseX / cellWidth);
  let cellY = floor(mouseY / cellHeight);

  //if (isPlayerOnesTurn) {
  placeAnX(cellX, cellY);
  //}

  // else {
  //   if (isSecondPlayerHere) {
  //     placeAnO(cellX, cellY);
  //   }
  //   else {
  //     computersTurn();
  //   }
  // }
  console.log(grid[0], grid[1], grid[2]);
}

function placeAnX(cellX, cellY) {
  
  if (grid[cellX][cellY] === "E") {
    grid[cellX][cellY] = "X";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function placeAnO(cellX, cellY) {
  if (grid[cellX][cellY] === "E") {
    grid[cellX][cellY] = "O";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function computersTurn() {

}

function displayGrid() {
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {

      fill("white");
      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);

      textSize(cellWidth * 0.6);

      if (grid[y][x] === "X") {
        fill("black");
        text("X", cellWidth*x,  cellHeight*y);
      }
      if (grid[y][x] === "O") {
        fill("black");
        text("O", cellWidth*x,  cellHeight*y);
      }
    }
  }
}
