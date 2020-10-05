// 2D Array Assignment: Tic Tac Toe
// Heather Grove
// Oct 1, 2020

//
let grid;
let cellWidth;
let cellHeight;

//Button Variables
let tryAgainButton, playAnotherPlayerButton, playTheComputerButton;

//Setting up Turn, Winning and Opponent Variables
let isSecondPlayerHere, isPlayerOnesTurn, playerOneWon, playerTwoWon, everyoneTied;

let gameEnded;

const GRIDSIZE = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create Empty Grid
  grid = [["E","E","E"], ["E","E","E"], ["E","E","E"]];

  //Displaying Opponent Buttons
  playTheComputerButton = createButton("Play Against the Computer");
  playTheComputerButton.position(width / 2 - width/ 2, height / 2 - height / 2);
  playTheComputerButton.size(width /4, height / 8);
  playTheComputerButton.mousePressed(startComputerGame);

  playAnotherPlayerButton = createButton("Play Against Another Player");
  playAnotherPlayerButton.position(width / 2 - width/ 2, height / 2 - height / 2);
  playAnotherPlayerButton.size(width /4, height / 8);
  playAnotherPlayerButton.mousePressed(startSecondPersonGame);

  isPlayerOnesTurn = true;
  playerOneWon = false; //Player One = X's
  playerTwoWon = false; //Player Two = O's
  everyoneTied = false;

  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  if (gameEnded === false) {
    background(225);
    displayGrid();
  }
  else {
    noLoop();
    background(0);
    endGame();
  }
}

function startComputerGame() {
  isSecondPlayerHere = false;
  gameEnded = false;
}

function startSecondPersonGame() {
  isSecondPlayerHere = true;
  gameEnded = false;
}

function checkIfGameHasEnded() {
  //Creating local Variable to check if the grid is full
  let isAnEmptySpot = false;

  //End game if Player One has Won on either diagonal 
  // Top left to bottom Right 
  if (grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X") {
    playerOneWon = true;
    gameEnded = true;
  }
  //Top right to bottom Left
  if (grid[0][2] === "X" && grid[1][1] === "X" && grid[2][0] === "X") {
    playerOneWon = true;
    gameEnded = true;
  }

  //End game if Player Two has Won on either diagonal 
  // Top left to bottom Right 
  if (grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O") {
    playerTwoWon = true;
    gameEnded = true;
  }
  //Top right to bottom Left
  if (grid[0][2] === "O" && grid[1][1] === "O" && grid[2][0] === "O") {
    playerTwoWon = true;
    gameEnded = true;
  }

  for (let y = 0; y < GRIDSIZE; y++) {

    //End Game if Player one got X's Straight across
    if (grid[y][0] === "X" && grid[y][1] === "X" && grid[y][2] === "X") {
      playerOneWon = true;
      gameEnded = true;
    }

    //End game if Player two got O's straight across
    if (grid[y][0] === "O" && grid[y][1] === "O" && grid[y][2] === "O") {
      playerTwoWon = true;
      gameEnded = true;
    }

    for (let x = 0; x < GRIDSIZE; x++) {

      //End game if player one got X's Straight down
      if (y === 0) {
        if (grid[y][x] === "X" && grid[y+1][x] === "X" && grid[y+2][x] === "X") {
          playerOneWon = true;
          gameEnded = true;
        }
      }

      //End game if player two got O's Straight Down
      if (y === 0) {
        if (grid[y][x] === "O" && grid[y+1][x] === "O" && grid[y+2][x] === "O") {
          playerTwoWon = true;
          gameEnded = true;
        }
      }
      
      //Checking to see if grid is full
      if (grid[y][x] === "E") {
        isAnEmptySpot = true;
      }
    }
  }
  if (isAnEmptySpot === false) {
    everyoneTied = true;
    gameEnded = true;
  }
}

function endGame() {
  console.log("Endgame function triggered");

  fill("Black");
  rect(0,0, width, height);

  textSize(width / 10);
  textAlign(CENTER, CENTER);
  fill("White");
  if (playerOneWon) {
    text("Player 1 Wins!", width / 2, height / 5);
  }

  else if (isSecondPlayerHere && playerTwoWon) {
    text("Player 2 Wins!", width / 2, height / 5);
  }

  else if (everyoneTied) {
    text("It's a Tie!", width / 2, height / 5);
  }
  else {
    text("The Computer Wins!", width / 2, height / 5);
  }
}

function mousePressed() {

  let cellX = floor(mouseX / cellWidth);
  let cellY = floor(mouseY / cellHeight);

  if (isPlayerOnesTurn) {
    placeAnX(cellX, cellY);
  }

  else {
    if (isSecondPlayerHere) {
      placeAnO(cellX, cellY);
    }
    else {
      computersTurn();
    }
  }

  //Checking if the game has ended
  checkIfGameHasEnded();

  //Debugging Help
  console.log(cellX, cellY);
  console.log(grid[0], grid[1], grid[2]);
  console.log(playerOneWon, playerTwoWon, everyoneTied);
  console.log(gameEnded);
}

function placeAnX(cellX, cellY) {
  
  if (grid[cellY][cellX] === "E") {
    grid[cellY][cellX] = "X";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function placeAnO(cellX, cellY) {
  if (grid[cellY][cellX] === "E") {
    grid[cellY][cellX] = "O";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function computersTurn() {

}

function displayGrid() {
  for (let x=0; x < GRIDSIZE; x++) {
    for (let y=0; y < GRIDSIZE; y++) {

      fill("white");
      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);

      textSize(cellWidth * 0.6);
      textAlign(CENTER, CENTER);

      if (grid[y][x] === "X") {
        fill("black");
        text("X", cellWidth * x + cellWidth / 2,  cellHeight * y + cellHeight / 2);
      }
      if (grid[y][x] === "O") {
        fill("black");
        text("O", cellWidth * x + cellWidth / 2,  cellHeight * y + cellHeight / 2);
      }
    }
  }
}
