class Piece {
  constructor(x, y, col, row, kind, match) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.row = row;
    this.kind = kind;
    this.xTo = -1;
    this.yTo = -1;
    this.xFrom = -1;
    this.yFrom = -1;
    this.swappedWith = -1;
    this.match = match;
    this.kindState = -1;
    this.counter = 0;
    this.clicked = false;
    this.moving = false;
    this.counter = 0;

    this.piece1 = loadImage('assets/img/element_yellow_diamond.png');
    this.piece2 = loadImage('assets/img/element_blue_polygon.png');
    this.piece3 = loadImage('assets/img/element_green_diamond.png');
    this.piece4 = loadImage('assets/img/element_grey_polygon.png');
    this.piece5 = loadImage('assets/img/element_purple_diamond.png');
    this.piece6 = loadImage('assets/img/element_red_polygon.png');
  }

  getPieceImg(kind) {
    switch (kind) {
      case 1:
        return this.piece1;
      case 2:
        return this.piece2;
      case 3:
        return this.piece3;
      case 4:
        return this.piece4;
      case 5:
        return this.piece5;
      case 6:
        return this.piece6;
    }
  }

  update(board) {
    //board.checkMatches();

    if (this.x == this.xTo && this.y == this.yTo) {
      this.moving = false;

      let matches = board.getMatches();

      if (matches.length == 0 && this.swappedWith!= -1)
      {
        if (this.counter == 0)
        {
          board.swapPiecesReverse(this, this.swappedWith);
        }
        else
        {
          this.swappedWith = -1;
        }

        this.counter++;
      }
      else
      {
        this.xTo = -1;
        this.yTo = -1;
        this.counter = 0;
        board.removeTiles(matches);
        //board.checkMatches();
      }

      //this.xTo = -1;
      //this.yTo = -1;
    }

    if (this.xTo > -1 && this.yTo > -1) {

      if (this.x > this.xTo) {
        this.x -= 2;
      }
      if (this.x < this.xTo) {
        this.x += 2;
      }

      if (this.y > this.yTo) {
        this.y -= 2;
      }
      if (this.y < this.yTo) {
        this.y += 2;
      }
    }

    while (this.canMove()) {
      grid[this.col][this.row + 1] = this;
      grid[this.col][this.row] = null;

      //this.yTo = this.y + 32;
      this.y = this.y + 32;
      this.row++;

      this.moving = true;
    }
  }

  canMove() {
    if (this.row + 1 == rows) {
      this.moving = false;

      return false;
    }

    if (grid[this.col][this.row + 1] == null) {
      return true;
    }
  }

  show() {
    if (this.clicked) {
      push();
      noFill();
      stroke(255);
      rect(this.x * offset, this.y * offset, 32 * offset, 32 * offset);
      pop();
    }

    if (this.moving == false){
      //board.checkMatches();
    }

    if (grid[this.col][this.row]) {
      let imageObj = this.getPieceImg(grid[this.col][this.row].kind);

      image(imageObj, this.x * offset, this.y * offset);
    }

  }
}