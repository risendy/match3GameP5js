var board = [];
var test2 = [];
var activeMode;
let backgroundImg;
let backgroundBoxImage;
let piece1;
let piece2;
let piece3;
let piece4;
let piece5;
let piece6;
var scoreElem;

const sketch = (p) => {
  p.preload = function() {
      backgroundBoxImage = p.loadImage('assets/img/chalkboard-517818_640.jpg');
  }

  p.setup = function() {
    p.createCanvas(580, 670);

    p.rectMode(p.CORNER);

    board = new Board(this);
    
    //p.image(backgroundImg, 0, 16);
    
    backgroundBoxImage.resize(150, 425);
    p.image(backgroundBoxImage, 0, 15); 

    scoreElem = p.createDiv('0');
    scoreElem.position(35, 100);
    scoreElem.class('score-span');

    goBackButton = p.createButton('Menu');
    goBackButton.position(33, 360);
    goBackButton.mousePressed(p.goBackToMenu);
    goBackButton.class('btn-circle-menu');

    p.frameRate(30);
  }

  p.draw = function() {
    p.fill(0);

    p.push();
    p.strokeWeight(1);
    p.stroke(255);
    p.fill(255);
    p.textSize(32);
    p.textFont('Comic Sans MS');
    p.text('Score', 35, 75);

    p.pop();

    board.show();
  }

  p.mouseClicked = function() {
    board.mouseClicked();
  }

  p.goBackToMenu = function() {
    p.remove();
    activeMode = 0;
    new p5(welcomeScreen);
  }

}

const welcomeScreen = (p) => {
  p.preload = function() {

    backgroundImg = p.loadImage('assets/img/blackboard-1906462_640.jpg');
    piece1 = p.loadImage('assets/img/element_yellow_diamond.png');
    piece2 = p.loadImage('assets/img/element_blue_polygon.png');
    piece3 = p.loadImage('assets/img/element_green_diamond.png');
    piece4 = p.loadImage('assets/img/element_grey_polygon.png');
    piece5 = p.loadImage('assets/img/element_purple_diamond.png');
    piece6 = p.loadImage('assets/img/element_red_polygon.png');
  }

  p.setup = function() {
    p.createCanvas(600, 600);

    ClassicModeButton = p.createButton('Classical');
    ClassicModeButton.position(70, p.height / 2 - 20);
    ClassicModeButton.mousePressed(p.startClassicalMode);
    ClassicModeButton.class('btn-circle');

    backgroundImg.resize(600,400);
    p.image(backgroundImg, 0, 0);
    //p.background(255);
  }

  p.draw = function() {
    p.push();
    p.strokeWeight(1);
    p.stroke(0);
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(42);
    p.textFont('Comic Sans MS');
    p.text('Match-3 game', 0, 65, p.width);
    p.pop();

    p.push();
    p.strokeWeight(1);
    p.stroke(0);
    p.fill(255);
    p.textSize(32);
    p.textAlign(p.CENTER);
    p.textFont('Comic Sans MS');
    p.text('Game modes', 0, 230, p.width);
    p.pop();

    //p.rect(25, 260, p.width - 50, 100);

    p.image(piece1, 120, 130);
    p.image(piece2, 180, 130);
    p.image(piece3, 240, 130);
    p.image(piece4, 300, 130);
    p.image(piece5, 360, 130);
    p.image(piece6, 420, 130);
  }

  p.startClassicalMode = function() {
    p.remove();
    activeMode = 1;
    new p5(sketch);
  }
}

new p5(welcomeScreen);