// 2D Array Assignment: Tic Tac Toe
// Heather Grove
// Oct 1, 2020

//Setting up Grid Variables
let grid, cellWidth, cellHeight;
const GRIDSIZE = 3;

//Button Variables
let playAgainButton, playAnotherPlayerButton, playTheComputerButton;

//Setting up Turn, Winning and Opponent Variables
let isSecondPlayerHere, isPlayerOnesTurn, playerOneWon, playerTwoWon, everyoneTied;

let gameEnded;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Hide the play again button if Players are replaying
  if (gameEnded === "Resetting Game") {
    playAgainButton.hide();
  }

  //Create Empty Grid
  grid = [["E","E","E"], ["E","E","E"], ["E","E","E"]];

  //Sizes grid according to window size
  if (width < height) {
    cellWidth = width / GRIDSIZE;
    cellHeight = cellWidth;
  }

  else {
    cellHeight = height / GRIDSIZE;
    cellWidth = cellHeight;
  }

  //Loop the draw loop again if the game was ended previously
  loop();

  //Displaying Opponent Buttons
  playTheComputerButton = createButton("Play Against the Computer");
  playTheComputerButton.position(width / 8, height / 2);
  playTheComputerButton.size(width /4, height / 8);
  playTheComputerButton.mousePressed(startComputerGame);

  playAnotherPlayerButton = createButton("Play Against Another Player");
  playAnotherPlayerButton.position(width / 2, height / 2);
  playAnotherPlayerButton.size(width /4, height / 8);
  playAnotherPlayerButton.mousePressed(startSecondPersonGame);


  //Setting / resetting variables (In case of Play again)
  isPlayerOnesTurn = true;
  playerOneWon = false; //Player One = X's
  playerTwoWon = false; //Player Two = O's
  everyoneTied = false;

}

function draw() {
  //If game is playing display Grid
  if (gameEnded === false) {
    background(225);
    displayGrid();
  }

  //If game has ended change background and end the game
  else if (gameEnded === true) {
    noLoop();
    background(0);
    endGame();
  }
}

//Used when player selects 'Play against the computer'
function startComputerGame() {
  //hides buttons
  playTheComputerButton.hide();
  playAnotherPlayerButton.hide();

  //Sets second player variable and starts game
  isSecondPlayerHere = false;
  gameEnded = false;
}

//Used when player selects 'Play against another player'
function startSecondPersonGame() {
  //hides buttons
  playTheComputerButton.hide();
  playAnotherPlayerButton.hide();

  //Sets second player variable and starts game
  isSecondPlayerHere = true;
  gameEnded = false;
}

function mousePressed() {
  
  //Select Cell player is clicking on
  let cellX = floor(mouseX / cellWidth);
  let cellY = floor(mouseY / cellHeight);

  //If there is a second player switch between them
  if (!gameEnded && isSecondPlayerHere) {
    if (isPlayerOnesTurn) {
      placeAnX(cellX, cellY);
    }

    else {
      placeAnO(cellY, cellX);
    }
  }

  //If the computer is playing take player's turn and computer's turn
  if (!gameEnded && !isSecondPlayerHere && grid[cellY][cellX] === "E") {
    placeAnX(cellX, cellY);
    computersTurn();
  }

  //Check if the game has ended
  checkIfGameHasEnded();
}

function checkIfGameHasEnded() {
  //Creating local Variable to check if the grid is full
  let isAnEmptySpot = false;

  //End game if Player One has Won on either diagonal 
  // Top left to bottom Right X's
  if (grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X") {
    playerOneWon = true;
    gameEnded = true;
  }
  //Top right to bottom Left X's
  if (grid[0][2] === "X" && grid[1][1] === "X" && grid[2][0] === "X") {
    playerOneWon = true;
    gameEnded = true;
  }

  //End game if Player Two/Computer has Won on either diagonal 
  // Top left to bottom Right O's
  if (grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O") {
    playerTwoWon = true;
    gameEnded = true;
  }
  //Top right to bottom Left O's
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

    //End game if Player two/Computer got O's straight across
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

      //End game if player two/Computer got O's Straight Down
      if (y === 0) {
        if (grid[y][x] === "O" && grid[y+1][x] === "O" && grid[y+2][x] === "O") {
          playerTwoWon = true;
          gameEnded = true;
        }
      }
      
      //Loops through and checks for an E, if there is at least one then it switches the local variable
      if (grid[y][x] === "E") {
        isAnEmptySpot = true;
      }
    }
  }

  //Checking to see if grid is full
  if (isAnEmptySpot === false) {
    everyoneTied = true;
    gameEnded = true;
  }
}

function computersTurn() {
  //If there are two O's in place where the computer can win it should put a third 0 in

  //Placing an O to make computer win diagonally
  // Top left to bottom Right 
  if (grid[0][0] === "O" && grid[1][1] === "O") {
    if (grid[2][2] === "E") {
      placeAnO(2, 2);
      return true;
    }
  }

  if (grid[0][0] === "O" && grid[2][2] === "O") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
      return true;
    }
  }

  if (grid[1][1] === "O" && grid[2][2] === "O") {
    if (grid[0][0] === "E") {
      placeAnO(0, 0);
      return true;
    }
  }

  //Top right to bottom Left
  if (grid[0][2] === "O" && grid[1][1] === "O") {
    if (grid[2][0] === "E") {
      placeAnO(2,0);
      return true;
    }
  }

  if (grid[0][2] === "O" && grid[2][0] === "O") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
      return true;
    }
  }

  if (grid[1][1] === "O" && grid[2][0] === "O") {
    if (grid[0][2] === "E") {
      placeAnO(0,2);
      return true;
    }
  }

  for (let i = 0; i < GRIDSIZE; i++) {
    //Place an O to make computer win straight across
    if (grid[i][0] === "O" && grid[i][1] === "O") {
      if (grid[i][2] === "E") {
        placeAnO(i,2);
        return true;
      }
    }

    if (grid[i][0] === "O" && grid[i][2] === "O") {
      if (grid[i][1] === "E") {
        placeAnO(i,1);
        return true;
      }
    }

    if (grid[i][1] === "O" && grid[i][2] === "O") {
      if (grid[i][0] === "E") {
        placeAnO(i,0);
        return true;
      }
    }

    //Place an O to make computer win straight down
    if (grid[0][i] === "O" && grid[1][i] === "O") {
      if (grid[2][i] === "E") {
        placeAnO(2,i);
        return true;
      }
    }

    if (grid[0][i] === "O" && grid[2][i] === "O") {
      if (grid[1][i] === "E") {
        placeAnO(1,i);
        return true;
      }
    }

    if (grid[1][i] === "O" && grid[2][i] === "O") {
      if (grid[0][i] === "E") {
        placeAnO(0,i);
        return true;
      }
    }
  }

  //If there are two X's in a place where player one can win the computer should put a O to stop them

  //Placing an O to stop player one from winning diagonally
  // Top left to bottom Right 
  if (grid[0][0] === "X" && grid[1][1] === "X") {
    if (grid[2][2] === "E") {
      placeAnO(2, 2);
      return true;
    }
  }

  if (grid[0][0] === "X" && grid[2][2] === "X") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
      return true;
    }
  }

  if (grid[1][1] === "X" && grid[2][2] === "X") {
    if (grid[0][0] === "E") {
      placeAnO(0, 0);
      return true;
    }
  }

  //Top right to bottom Left
  if (grid[0][2] === "X" && grid[1][1] === "X") {
    if (grid[2][0] === "E") {
      placeAnO(2,0);
      return true;
    }
  }

  if (grid[0][2] === "X" && grid[2][0] === "X") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
      return true;
    }
  }

  if (grid[1][1] === "X" && grid[2][0] === "X") {
    if (grid[0][2] === "E") {
      placeAnO(0,2);
      return true;
    }
  }

  for (let i = 0; i < GRIDSIZE; i++) {
    //Place an O if Player one is going to win straight across
    if (grid[i][0] === "X" && grid[i][1] === "X") {
      if (grid[i][2] === "E") {
        placeAnO(i,2);
        return true;
      }
    }

    if (grid[i][0] === "X" && grid[i][2] === "X") {
      if (grid[i][1] === "E") {
        placeAnO(i,1);
        return true;
      }
    }

    if (grid[i][1] === "X" && grid[i][2] === "X") {
      if (grid[i][0] === "E") {
        placeAnO(i,0);
        return true;
      }
    }

    //Place an O if Player one is going to win straight down
    if (grid[0][i] === "X" && grid[1][i] === "X") {
      if (grid[2][i] === "E") {
        placeAnO(2,i);
        return true;
      }
    }

    if (grid[0][i] === "X" && grid[2][i] === "X") {
      if (grid[1][i] === "E") {
        placeAnO(1,i);
        return true;
      }
    }

    if (grid[1][i] === "X" && grid[2][i] === "X") {
      if (grid[0][i] === "E") {
        placeAnO(0,i);
        return true;
      }
    }
  }

  //Randomly place an O 
  for (let j = 0; j < 300; j++) {
    let randomX = int(random(3));
    let randomY = int(random(3));

    if (grid[randomY][randomX] === "E") {
      placeAnO(randomY, randomX);
      return true;
    }
  }
}

function endGame() {
  gameEnded = "Resetting Game";

  //Display 'Play Agian' button
  playAgainButton = createButton("Play Again?");
  playAgainButton.position(width / 2, height / 2);
  playAgainButton.size(width /4, height / 8);
  playAgainButton.mousePressed(setup);


  //Display Text based on winning conditions
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

function placeAnX(cellX, cellY) {
  if (grid[cellY][cellX] === "E") {
    grid[cellY][cellX] = "X";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function placeAnO(cellY, cellX) {
  if (grid[cellY][cellX] === "E") {
    grid[cellY][cellX] = "O";
    isPlayerOnesTurn = !isPlayerOnesTurn;
  }
}

function displayGrid() {
  for (let x=0; x < GRIDSIZE; x++) {
    for (let y=0; y < GRIDSIZE; y++) {

      fill("white");
      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);

      //Display an Xs and/or Os respectively
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