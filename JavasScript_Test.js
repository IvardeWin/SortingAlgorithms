const WIDTH = screen.width * 0.7;
const HEIGHT = screen.height * 0.6;

var barAmount = 50;
var barWidth = Math.floor(WIDTH / barAmount) - 1;
var barSpace = 1;
var minHeight = 1;

var intsToSortArray = [];
var delay = 0;


//var slider = document.getElementById("barWidth");
//console.log(typeof(slider));

/*
slider.oninput = function() {
  barWidth = this.value;
  barAmount = Math.floor(WIDTH/(barAmount + 1));
}
*/

function randomNumber(maxHeight, minHeight){
  return Math.floor(Math.random()*(maxHeight - minHeight))+minHeight;
}

function createRandomIntArray(){
  var i;
  for(i = 0; i < barAmount; i++){
    var randomHeight = randomNumber(HEIGHT, minHeight);
    var position = i * (barWidth + barSpace);
    intsToSortArray.push(new component(barWidth, randomHeight, "blue", position, HEIGHT));
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

var intervalToggleInsertionSort = {
  start : function() {
    this.interval = setInterval(insertionSort, delay);
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
  for(k = 0; k < barAmount; k++){
    intsToSortArray[k].update();
  }
}


var iterator = 0;
var cycleNumberBubbleSort = 1;

function resetSorts(){
  cycleNumberBubbleSort = 1;
  iterator = 0;
}

function bubbleSort(){
  
  if ((iterator - (barAmount - cycleNumberBubbleSort)*3) >= 0){
    cycleNumberBubbleSort++;

    iterator = 0;

    if (cycleNumberBubbleSort >= barAmount){
      intervalToggleBubbleSort.stop();
      return;
    }
  } 

  var currentBarBubbleSort = Math.floor(iterator/3);

  switch(iterator - (currentBarBubbleSort * 3)){
    case 0:

      intsToSortArray[currentBarBubbleSort].changeColor("red");
    	intsToSortArray[currentBarBubbleSort + 1].changeColor("red");
      break;

    case 1:
      var heightFirst = intsToSortArray[currentBarBubbleSort].getHeight();
      var heightSecond = intsToSortArray[currentBarBubbleSort + 1].getHeight();
      if (heightFirst > heightSecond){
        intsToSortArray[currentBarBubbleSort].changeHeight(heightSecond);
        intsToSortArray[currentBarBubbleSort + 1].changeHeight(heightFirst)
      }

      break;
    
    case 2:
      intsToSortArray[currentBarBubbleSort].changeColor("blue");
    	intsToSortArray[currentBarBubbleSort + 1].changeColor("blue");

      break;

  }

  iterator++;
  updateCanvas();

}

var switched;
var locationStartMainArray = 0;
function insertionSort(){
  // Stop the algorithm when the end of the array is reached.
  if (iterator >= (barAmount - 1) * 3){
    intervalToggleBubbleSort.stop();
    return;
  }

  // Get the current bar in int, hence Math.floor
  var currentBarInsertionSort = Math.floor(iterator/3);
  // Keeps track of where the SubArray ends
  locationStartMainArray = Math.max(locationStartMainArray, currentBarInsertionSort + 1);

  // This is equal to iterator%3, but is less taxing on perfomance.
  switch(iterator - (currentBarInsertionSort * 3)){
    case 0:
      // Change the colors of the elements that will be compared to red.
      intsToSortArray[currentBarInsertionSort].changeColor("red");
    	intsToSortArray[currentBarInsertionSort + 1].changeColor("red");
      break;

    case 1:
      
      var heightFirst = intsToSortArray[currentBarInsertionSort].getHeight();
      var heightSecond = intsToSortArray[currentBarInsertionSort + 1].getHeight();
      // Switch the heigths if the elements are not in the correct order.
      if (heightFirst > heightSecond){
        intsToSortArray[currentBarInsertionSort].changeHeight(heightSecond);
        intsToSortArray[currentBarInsertionSort + 1].changeHeight(heightFirst);
        
        // Making sure that when the start of the SubArray is reached, the algorithm stops.
        if (currentBarInsertionSort != 0 ){
          // 1 gets added at the end of each iteration, hence, -2 + 1 = -1, 1 back.
          // The iterator increases 3 times as fast for the animation, so -2 * 3
          iterator -= (2 * 3);
          switched = true;
        } else {
          switched = false;
        }
      // When switched is equal to false, either the end of the end of the subarray is reached,
      // or an element has reached the correct position in the subArray,
      // or last elements of the subarray and the first element of the main array are in the correct position.
      } else {
        switched = false;
      }
      break;
    
    case 2:
      if (switched){
        // Make sure the switched bars get turned to blue again
        intsToSortArray[currentBarInsertionSort + 2].changeColor("blue");
        intsToSortArray[currentBarInsertionSort + 2 + 1] .changeColor("blue");
      } else {
        intsToSortArray[currentBarInsertionSort].changeColor("blue");
        intsToSortArray[currentBarInsertionSort + 1].changeColor("blue");
        // Send the iterator to the start of the main array.
        // -1 for the addtion to iterator at the end of the function.
        iterator = locationStartMainArray * 3 - 1 ;
      }
    }
  iterator++;
  updateCanvas();
}