//If there are two O's in place where the computer can win it should put a third 0 in

//Placing an O to make computer win diagonally
  // Top left to bottom Right 
  if (grid[0][0] === "O" && grid[1][1] === "O") {
    if (grid[2][2] === "E") {
      placeAnO(2, 2);
    }
  }

  if (grid[0][0] === "O" && grid[2][2] === "O") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
    }
  }

  if (grid[1][1] === "O" && grid[2][2] === "O") {
    if (grid[0][0] === "E") {
      placeAnO(0, 0);
    }
  }



//Placing an O to stop player one from winning diagonally
  // Top left to bottom Right 
  if (grid[0][0] === "X" && grid[1][1] === "X") {
    if (grid[2][2] === "E") {
      placeAnO(2, 2);
    }
  }

  if (grid[0][0] === "X" && grid[2][2] === "X") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
    }
  }

  if (grid[1][1] === "X" && grid[2][2] === "X") {
    if (grid[0][0] === "E") {
      placeAnO(0, 0);
    }
  }

  //Top right to bottom Left
  if (grid[0][2] === "X" && grid[1][1] === "X") {
    if (grid[2][0] === "E") {
      placeAnO(2,0);
    }
  }

  if (grid[0][2] === "X" && grid[2][0] === "X") {
    if (grid[1][1] === "E") {
      placeAnO(1,1);
    }
  }

  if (grid[1][1] === "X" && grid[0][2] === "X") {
    if (grid[0][2] === "E") {
      placeAnO(0,2);
    }
  }

  for (let y = 0; y < GRIDSIZE; y++) {
    //Place an O if Player one is going to win straight across
    if (grid[y][0] === "X" && grid[y][1] === "X") {
      if (grid[y][2] === "E") {
        placeAnO(y,2);
      }
    }

    if (grid[y][0] === "X" && grid[y][2] === "X") {
      if (grid[y][1] === "E") {
        placeAnO(y,1);
      }
    }

    if (grid[y][1] === "X" && grid[y][2] === "X") {
      if (grid[y][0] === "E") {
        placeAnO(y,0);
      }
    }
  }

  for (let x = 0; x < GRIDSIZE; x++) {
    //Place an O if Player one is going to win straight down
    if (grid[0][x] === "X" && grid[1][x] === "X") {
      if (grid[2][x] === "E") {
        placeAnO(2,x);
      }
    }

    if (grid[0][x] === "X" && grid[2][x] === "X") {
      if (grid[1][x] === "E") {
        placeAnO(1,x);
      }
    }

    if (grid[1][x] === "X" && grid[2][x] === "X") {
      if (grid[0][x] === "E") {
        placeAnO(0,x);
      }
    }
  }


  placeAnO(int(random(2)), int(random(2)));

}