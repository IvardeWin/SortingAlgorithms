const WIDTH = screen.width * 0.7;
const HEIGHT = screen.height * 0.6;
const BAR_AMOUNT = 500;
const BAR_WIDTH = Math.floor(WIDTH / BAR_AMOUNT) - 1;
const BAR_SPACE = 1;

var iteratorBubbleSort = 0;
var cycleNumberBubbleSort = 1;
var minHeight = 1;

var intsToSortArray = [];

var delay = 0;

function randomNumber(maxHeight, minHeight){
  return Math.floor(Math.random()*(maxHeight - minHeight))+minHeight;
}

function createRandomIntArray(){
  var i;
  for(i = 0; i < BAR_AMOUNT; i++){
    var randomHeight = randomNumber(HEIGHT, minHeight);
    var position = i * (BAR_WIDTH + BAR_SPACE);
    intsToSortArray.push(new component(BAR_WIDTH, randomHeight, "blue", position, HEIGHT));
  }
}

function setUp() {
  canvasCreate.start();
  createRandomIntArray();
  updateCanvas();
}

var intervalToggleBubbleSort = {
  start : function() {
    this.interval = setInterval(bubbleSort, delay);
  },
  stop : function(){
    clearInterval(this.interval);
  }

}

var canvasCreate = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.ctx = canvasCreate.context;
  this.changeHeight = function(height){
      this.height = height;
  };
  this.changeColor = function(color){
    this.color = color;
  }
  this.getHeight = function(){
    return this.height;
  };
  this.update = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, -this.height);
  }
}

function updateCanvas(){
  var k;
  canvasCreate.clear();
  for(k = 0; k < BAR_AMOUNT; k++){
    intsToSortArray[k].update();
  }
}

function bubbleSort(){

  if ((iteratorBubbleSort - (BAR_AMOUNT - cycleNumberBubbleSort)*3) >= 0){
    cycleNumberBubbleSort++;

    iteratorBubbleSort = 0;

    if (cycleNumberBubbleSort >= BAR_AMOUNT){
      intervalToggleBubbleSort.stop();
      return;
    }
  } 

  var barCompare1 = Math.floor(iteratorBubbleSort/3);
  var barCompare2 = barCompare1 + 1;

  switch(iteratorBubbleSort - (barCompare1 * 3)){
    case 0:

      intsToSortArray[barCompare1].changeColor("red");
    	intsToSortArray[barCompare2].changeColor("red");
      break;

    case 1:
      var heightFirst = intsToSortArray[barCompare1].getHeight();
      var heightSecond = intsToSortArray[barCompare2].getHeight();
      if (heightFirst > heightSecond){
        intsToSortArray[barCompare1].changeHeight(heightSecond);
        intsToSortArray[barCompare2].changeHeight(heightFirst)
      }

      break;
    
    case 2:
      intsToSortArray[barCompare1].changeColor("blue");
    	intsToSortArray[barCompare2].changeColor("blue");

      break;

  }

  iteratorBubbleSort++;
  updateCanvas();

}
