var board = [];
var test2 = [];

function setup() {
  createCanvas(600, 600);
  
  rectMode(CORNER);

  board = new Board();
}

function draw() {
  background(220);
  
  board.show();
}

function mouseClicked() {
    board.mouseClicked();  
}