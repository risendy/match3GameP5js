var isActive = true;
var timer = 3;
var clickedFrame = -999;

class Game {
  constructor(sketch) {
    this.sketch = sketch;

    this.board = new Board(sketch);
    isActive = true;
  }

  showBoard() {
    this.board.show();
  }

  checkIfGameActive() {
    let moves = this.board.checkIfThereAreAvailableMoves();

    if (!moves) return false;

    if (moves.length == 0) {     
      if (activeMode == 2) {   
        shufflingElem.show();
        
        this.board.setupGrid();
      } else {
        isActive = false;

        this.sketch.push();
        this.sketch.strokeWeight(1);
        this.sketch.stroke(0);
        this.sketch.fill(255);
        this.sketch.textSize(26);
        this.sketch.textFont('Comic Sans MS');
        this.sketch.text('Game over', 15, 225);
        this.sketch.pop();
      }
    }
    else
    {
       shufflingElem.hide(); 
    }

  }

  showHint() {
    this.board.showHint();
  }

  mouseClicked() {
    if (isActive) {
      this.board.mouseClicked();
    }
  }
}