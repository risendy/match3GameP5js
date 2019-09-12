var cols = 8;
var rows = 8;
var tileSize = 32;
var offset = 1.5;

var offsetX = 115;
var offsetY = 25;

var clickedPieces = [];
var grid = [];
var activeTile1;
var activeTile2;
var swapCompleted = false;
var backgroundImage;
var particles = [];
var hintTile = [];

class Board {
  constructor(sketch) {
    this.sketch = sketch;

    this.setupGrid();
    backgroundImage = this.sketch.loadImage('assets/img/chalkboard-517818_640.jpg');
  }

  setupGrid() {
    for (let i = 0; i < cols; i++) {
      grid[i] = [];

      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Piece(
          i * tileSize + offsetX,
          j * tileSize + offsetY,
          i,
          j,
          this.sketch.floor(this.sketch.random(1, 7)),
          false,
          this.sketch
        )
      }
    }

    while (this.getMatches().length > 0) {
      this.removeTiles(this.getMatches());
      this.resetTile();
      this.fillTile()
    }
  }

  drawBackgroundBox() {
    backgroundImage.resize(430, 425);
    this.sketch.image(backgroundImage, 150, 15);
    //this.sketch.rect(165, 30, 400, 400);
  }

  show() {
    this.drawBackgroundBox();
    let moving = false;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j]) {
          if (grid[i][j].moving) {
            moving = true;
          }

          grid[i][j].show();
          grid[i][j].update(this);
        }
      }
    }

    if (!moving) {
      this.checkMatches();
      this.resetTile();
      this.fillTile();
    }
  }

  getMatches() {
    var matches = [];
    var groups = [];

    //Check for horizontal matches
    for (var i = 0; i < grid.length; i++) {
      var tempArr = grid[i];
      groups = [];
      for (var j = 0; j < tempArr.length; j++) {
        if (j < tempArr.length - 2)
          if (grid[i][j] && grid[i][j + 1] && grid[i][j + 2]) {
            if (grid[i][j].kind == grid[i][j + 1].kind && grid[i][j + 1].kind == grid[i][j + 2].kind) {
              if (groups.length > 0) {
                if (groups.indexOf(grid[i][j]) == -1) {
                  matches.push(groups);
                  groups = [];
                }
              }

              if (groups.indexOf(grid[i][j]) == -1) {
                groups.push(grid[i][j]);
              }
              if (groups.indexOf(grid[i][j + 1]) == -1) {
                groups.push(grid[i][j + 1]);
              }
              if (groups.indexOf(grid[i][j + 2]) == -1) {
                groups.push(grid[i][j + 2]);
              }
            }
          }
      }
      if (groups.length > 0) matches.push(groups);
    }

    //Check for vertical matches
    for (j = 0; j < grid.length; j++) {
      var tempArr = grid[j];
      groups = [];
      for (i = 0; i < tempArr.length; i++) {
        if (i < tempArr.length - 2)
          if (grid[i][j] && grid[i + 1][j] && grid[i + 2][j]) {
            if (grid[i][j].kind == grid[i + 1][j].kind && grid[i + 1][j].kind == grid[i + 2][j].kind) {
              if (groups.length > 0) {
                if (groups.indexOf(grid[i][j]) == -1) {
                  matches.push(groups);
                  groups = [];
                }
              }

              if (groups.indexOf(grid[i][j]) == -1) {
                groups.push(grid[i][j]);
              }
              if (groups.indexOf(grid[i + 1][j]) == -1) {
                groups.push(grid[i + 1][j]);
              }
              if (groups.indexOf(grid[i + 2][j]) == -1) {
                groups.push(grid[i + 2][j]);
              }
            }
          }
      }
      if (groups.length > 0) matches.push(groups);
    }

    return matches;
  }

  checkMatches() {
    let matches = this.getMatches();

    if (matches.length > 0) {
      this.removeTiles(matches);
    } else {

    }
  }

  fillTile() {
    //Check for blank spaces in the grid and add new tiles at that position
    for (var i = 0; i < grid.length; i++) {

      for (var j = 0; j < grid.length; j++) {

        if (grid[i][j] == null) {
          //Found a blank spot so lets add animate a tile there
          var tile = new Piece(
            i * tileSize + offsetX,
            j * tileSize + offsetY,
            i,
            j,
            this.sketch.floor(this.sketch.random(1, 7)),
            false,
            this.sketch
          );

          //And also update our "theoretical" grid
          grid[i][j] = tile;
        }

      }
    }
  }

  checkIfThereAreAvailableMoves() {
    let matches = [];
    let groups = [];
    
    //makes sure there are no null cells
    for (var i = 0; i < grid.length; i++) {
      //Loop through each tile in column from bottom to top
      for (var j = 0; j < grid.length; j++) {
          if (!grid[i][j]){
             return false; 
          }
      } 
    }

    for (var i = 0; i < grid.length; i++) {
      //Loop through each tile in column from bottom to top
      for (var j = 0; j < grid.length; j++) {
        
        //horizontal
        if (typeof grid[i][j] !== 'undefined' && typeof grid[i + 1] !== 'undefined' && typeof grid[i + 1][j] !== 'undefined') {
          //two match horizontal next to each other
          if (grid[i][j].kind == grid[i + 1][j].kind) {

            //one move left up one move down
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i - 1] !== 'undefined' && typeof grid[i - 1][j + 1] !== 'undefined') {
              if (grid[i][j].kind == grid[i - 1][j + 1].kind) {
                if (groups.indexOf(grid[i - 1][j + 1]) == -1) {
                  groups.push(grid[i - 1][j + 1]);
                }
              }
            }

            //one move left up one move up
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i - 1] !== 'undefined' && typeof grid[i - 1][j - 1] !== 'undefined') {
              if (grid[i][j].kind == grid[i - 1][j - 1].kind) {
                if (groups.indexOf(grid[i - 1][j - 1]) == -1) {
                  groups.push(grid[i - 1][j - 1]);
                }
              }
            }

            //one move right one move up
            if (typeof grid[i + 1] !== 'undefined' && typeof grid[i + 2] !== 'undefined' && typeof grid[i + 2][j - 1] !== 'undefined') {
              if (grid[i + 1][j].kind == grid[i + 2][j - 1].kind) {
                if (groups.indexOf(grid[i + 2][j - 1]) == -1) {
                  groups.push(grid[i + 2][j - 1]);
                }
              }
            }

            //one move right one move down
            if (typeof grid[i + 1] !== 'undefined' && typeof grid[i + 2] !== 'undefined' && typeof grid[i + 2][j + 1] !== 'undefined') {
              if (grid[i + 1][j].kind == grid[i + 2][j + 1].kind) {
                if (groups.indexOf(grid[i + 2][j + 1]) == -1) {
                  groups.push(grid[i + 2][j + 1]);
                }
              }
            }

            //two moves right
            if (typeof grid[i + 1][j] !== 'undefined' && typeof grid[i + 3] !== 'undefined' && typeof grid[i + 3][j] !== 'undefined') {
              if (grid[i + 1][j].kind == grid[i + 3][j].kind) {
                if (groups.indexOf(grid[i + 3][j]) == -1) {
                  groups.push(grid[i + 3][j]);
                }
              }
            }

            //two moves left
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i - 2] !== 'undefined' && typeof grid[i - 2][j] !== 'undefined') {
              if (grid[i][j].kind == grid[i - 2][j].kind) {
                if (groups.indexOf(grid[i - 2][j]) == -1) {
                  groups.push(grid[i - 2][j]);
                }
              }
            }
          }

          //endif
        }
        
         //one up between two same kind tiles horizontal
         if (typeof grid[i][j] !== 'undefined' && typeof grid[i + 2] !== 'undefined' && typeof grid[i + 1][j - 1] !== 'undefined') {
          if (grid[i][j].kind == grid[i + 2][j].kind) {
            if (grid[i][j].kind == grid[i + 1][j - 1].kind) {
              if (groups.indexOf(grid[i + 1][j - 1]) == -1) {
                  groups.push(grid[i + 1][j - 1]);
              }
            }
          }
         }
        
        //one down between two same kind tiles horizontal
        if (typeof grid[i][j] !== 'undefined' && typeof grid[i + 2] !== 'undefined' && typeof grid[i + 1][j + 1] !== 'undefined') {
          if (grid[i][j].kind == grid[i + 2][j].kind) {
            if (grid[i][j].kind == grid[i + 1][j + 1].kind) {
              if (groups.indexOf(grid[i + 1][j + 1]) == -1) {
                  groups.push(grid[i + 1][j + 1]);
              }
            }
          }
         }

        //vertical
        if (typeof grid[i][j] !== 'undefined' && typeof grid[i][j + 1] !== 'undefined') {
          //two match vertical next to each other
          if (grid[i][j].kind == grid[i][j + 1].kind) {

            //two moves down
            if (typeof grid[i][j + 1] !== 'undefined' && typeof grid[i][j + 3] !== 'undefined') {
              if (grid[i][j + 1].kind == grid[i][j + 3].kind) {
                if (groups.indexOf(grid[i][j + 3]) == -1) {
                  groups.push(grid[i][j + 3]);
                }
              }
            }

            //two moves up
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i][j - 2] !== 'undefined') {
              if (grid[i][j].kind == grid[i][j - 2].kind) {
                if (groups.indexOf(grid[i][j - 2]) == -1) {
                  groups.push(grid[i][j - 2]);
                }
              }
            }

            //one move up one move left
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i - 1] !== 'undefined' && typeof grid[i - 1][j - 1] !== 'undefined') {
              if (grid[i][j].kind == grid[i - 1][j - 1].kind) {
                if (groups.indexOf(grid[i - 1][j - 1]) == -1) {
                  groups.push(grid[i - 1][j - 1]);
                }
              }
            }

            //one move up one move right
            if (typeof grid[i][j] !== 'undefined' && typeof grid[i + 1] !== 'undefined' && typeof grid[i + 1][j - 1] !== 'undefined') {
              if (grid[i][j].kind == grid[i + 1][j - 1].kind) {
                if (groups.indexOf(grid[i + 1][j - 1]) == -1) {
                  groups.push(grid[i + 1][j - 1]);
                }
              }
            }

            //one move down one move left
            if (typeof grid[i][j + 1] !== 'undefined' && typeof grid[i - 1] !== 'undefined' && typeof grid[i - 1][j + 2] !== 'undefined') {
              if (grid[i][j + 1].kind == grid[i - 1][j + 2].kind) {
                if (groups.indexOf(grid[i - 1][j + 2]) == -1) {
                  groups.push(grid[i - 1][j + 2]);
                }
              }
            }

            //one move down one move right
            if (typeof grid[i][j + 1] !== 'undefined' && typeof grid[i + 1] !== 'undefined' && typeof grid[i + 1][j + 2] !== 'undefined') {
              if (grid[i][j + 1].kind == grid[i + 1][j + 2].kind) {
                if (groups.indexOf(grid[i + 1][j + 2]) == -1) {
                  groups.push(grid[i + 1][j + 2]);
                }
              }
            }

            //end 2 match
          }

          //endif
        }
        
         //one right between two same kind tiles vertical
         if (typeof grid[i][j] !== 'undefined' && typeof grid[i + 1] !== 'undefined' && typeof grid[i][j + 2] !== 'undefined' && typeof grid[i + 1][j + 1] !== 'undefined') {
          if (grid[i][j].kind == grid[i][j + 2].kind) {
            if (grid[i][j].kind == grid[i + 1][j + 1].kind) {
              if (groups.indexOf(grid[i + 1][j + 1]) == -1) {
                  groups.push(grid[i + 1][j + 1]);
              }
            }
          }
         }
        
        //one left between two same kind tiles vertical
        if (typeof grid[i][j] !== 'undefined' && typeof grid[i - 1] !== 'undefined' && typeof grid[i][j + 2] !== 'undefined' && typeof grid[i - 1][j - 1] !== 'undefined') {
          if (grid[i][j].kind == grid[i][j + 2].kind) {
            if (grid[i][j].kind == grid[i - 1][j - 1].kind) {
              if (groups.indexOf(grid[i - 1][j - 1]) == -1) {
                  groups.push(grid[i - 1][j - 1]);
              }
            }
          }
         }

        //endfor
      }
      //endfor  
    }

    return groups;
  }

  resetTile() {
    //Loop through each column starting from the left
    for (var i = 0; i < grid.length; i++) {
      //Loop through each tile in column from bottom to top
      for (var j = grid[i].length - 1; j > 0; j--) {
        //If this space is blank, but the one above it is not, move the one above down
        if (grid[i][j] == null && grid[i][j - 1] != null) {
          //Move the tile above down one
          var tempTile = grid[i][j - 1];
          grid[i][j] = tempTile;
          grid[i][j - 1] = null;

          grid[i][j].y += 32;
          grid[i][j].row += 1;

          j = grid[i].length;
        }
      }
    }

  }

  swapPieces(piece1, piece2, counter = null) {
    if (piece1 && piece2) {
      let piece1Col = piece1.col;
      let piece1Row = piece1.row;
      let tile1 = grid[piece1Col][piece1Row];

      let piece2Col = piece2.col;
      let piece2Row = piece2.row;
      let tile2 = grid[piece2Col][piece2Row];

      if (grid[piece1Col][piece1Row] && grid[piece2Col][piece2Row]) {
        grid[piece2Col][piece2Row].swappedWith = tile1;

        grid[piece1Col][piece1Row] = tile2;
        grid[piece2Col][piece2Row] = tile1;

        grid[piece1Col][piece1Row].col = piece1Col;
        grid[piece1Col][piece1Row].row = piece1Row;

        grid[piece2Col][piece2Row].col = piece2Col;
        grid[piece2Col][piece2Row].row = piece2Row;

        grid[piece1Col][piece1Row].xTo = piece1.x;
        grid[piece1Col][piece1Row].yTo = piece1.y;

        grid[piece2Col][piece2Row].xTo = piece2.x;
        grid[piece2Col][piece2Row].yTo = piece2.y;

        grid[piece1Col][piece1Row].moving = true;
        grid[piece2Col][piece2Row].moving = true;
      }
    }
  }

  swapPiecesReverse(piece1, piece2) {
    if (piece1 && piece2) {
      let piece1Col = piece1.col;
      let piece1Row = piece1.row;
      let tile1 = grid[piece1Col][piece1Row];

      let piece2Col = piece2.col;
      let piece2Row = piece2.row;
      let tile2 = grid[piece2Col][piece2Row];

      if (grid[piece1Col][piece1Row] && grid[piece2Col][piece2Row]) {
        grid[piece1Col][piece1Row] = tile2;
        grid[piece2Col][piece2Row] = tile1;

        grid[piece1Col][piece1Row].col = piece1Col;
        grid[piece1Col][piece1Row].row = piece1Row;

        grid[piece2Col][piece2Row].col = piece2Col;
        grid[piece2Col][piece2Row].row = piece2Row;

        grid[piece1Col][piece1Row].xTo = piece1.x;
        grid[piece1Col][piece1Row].yTo = piece1.y;

        grid[piece2Col][piece2Row].xTo = piece2.x;
        grid[piece2Col][piece2Row].yTo = piece2.y;

        grid[piece1Col][piece1Row].moving = true;
        grid[piece2Col][piece2Row].moving = true;
      }
    }
  }

  mouseClicked() {
    let hitPiece = false;
    let exitLoop = false;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]) {
          hitPiece = this.sketch.collidePointRect(this.sketch.mouseX, this.sketch.mouseY, grid[i][j].x * offset, grid[i][j].y * offset, 32, 32);

          if (hitPiece) {
            grid[i][j].clicked = true;
            
            clickedPieces.push(grid[i][j]);
            exitLoop = true;
            break;
          }
        }
      }

      if (exitLoop) {
        break;
      }
    }

    if (clickedPieces.length > 1) {
      clickedPieces.forEach(function(piece) {
        piece.clicked = false;
      });

      if (this.sketch.abs(clickedPieces[0].col - clickedPieces[1].col) < 2 && this.sketch.abs(clickedPieces[0].row - clickedPieces[1].row) < 2) {
        this.swapPieces(clickedPieces[0], clickedPieces[1]);
      }

      this.resetHint();
      clickedPieces = [];
    }

  }

  removeTiles(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let pieceCol = arr[i][j].col;
        let pieceRow = arr[i][j].row;

        grid[pieceCol][pieceRow] = null;

        if (scoreElem) {
          let prevScore = parseInt(scoreElem.html());
          scoreElem.html(prevScore + 100);
        }

        //const prevScore = parseInt(scoreSpan.html().substring(8));
        //scoreSpan.html(prevScore + 1);
      }
    }
  }
  
  showHint(){
    let availableMoves = this.checkIfThereAreAvailableMoves();
    
    if (availableMoves.length > 0)
    {
      let piece =  availableMoves[0];
      
      grid[piece.col][piece.row].isHint = true;
      hintTile = grid[piece.col][piece.row];
    }
  }
  
  resetHint(){
     if (hintTile && typeof grid[hintTile.col] !== 'undefined' && typeof grid[hintTile.col][hintTile.row] !== 'undefined'){
        grid[hintTile.col][hintTile.row].isHint = false; 
        hintTile = [];
     }
  }

  getGrid() {
    return grid;
  }
}