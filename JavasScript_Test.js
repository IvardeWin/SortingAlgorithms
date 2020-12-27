const WIDTH = screen.width * 0.7;
const HEIGHT = screen.height * 0.6;

var barAmount = 50;
var barWidth = Math.floor(WIDTH / barAmount) - 1;
var barSpace = 1;
var minHeight = 10;

var intsToSortArray = [];
var delay = 150;

// Common variables used by multiple Sorting Algorithms
var iterator = 0;

// Variables BubbleSort
var cycleNumberBubbleSort = 1;
var alreadySorted = false;

// Variables InsertionSort
var switched;
var locationStartMainArray = 0;

// Variables SelectionSort
var currentHeighestValueInArray = 0;
var cycleNumberSelectionSort = 0;

// Variables MergeSort


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


// Toggle to call the BubbleSort function after every delay ms
var intervalToggleBubbleSort = {
  start : function() {
    // Stop all other functions
    stopIntervals()
    // Start the interval
    this.interval = setInterval(bubbleSort, delay);
  },
  stop : function(){
    // Stop the interval
    clearInterval(this.interval);
  }

}


// Toggle to call the InsertionSort function after every delay ms
var intervalToggleInsertionSort = {
  start : function() {
    // Stop all other functions
    stopIntervals();
    // Start the interval
    this.interval = setInterval(insertionSort, delay);
  },
  stop : function(){
    // Stop the interval
    clearInterval(this.interval);
  }

}


// Toggle to call the InsertionSort function after every delay ms
var intervalToggleSelectionSort = {
  start : function() {
    // Stop all other functions
    stopIntervals();
    // The iterator needs to start at 3 for the first cycle of selectionSort
    iterator = 3;
    // Start the interval
    this.interval = setInterval(selectionSort, delay);
  },
  stop : function(){
    // Stop the interval
    clearInterval(this.interval);
  }

}

// Toggle to call the MergeSort function after every delay ms
var intervalToggleMergeSort = {
  start : function() {
    // Stop all other functions
    stopIntervals();

    mergeSortDevisionArray = [intsToSortArray];

    // Start the interval
    this.interval = setInterval(mergeSort, delay);
  },
  stop : function(){
    // Stop the interval
    clearInterval(this.interval);
  }

}


// Stops every interval of every Sorting Algorithm
function stopIntervals(){
  intervalToggleInsertionSort.stop();
  intervalToggleBubbleSort.stop();
  intervalToggleSelectionSort.stop();
  intervalToggleMergeSort.stop();
  resetAfterSuddenIntervalStop();
  // Reset the variables for when an interval, or Sorting algorithm, is restarted 
  resetVariables();
}


function resetAfterSuddenIntervalStop(){
  for(i = 0; i < barAmount; i++){
    intsToSortArray[i].changeColor("blue");
  }
  updateCanvas();
}


// Reset the variables for when an interval, or Sorting algorithm, is restarted 
function resetVariables(){
  // Common Variables
  iterator = 0;
  // BubbleSort variables
  cycleNumberBubbleSort = 1;
  alreadySorted = true;
  // InsertionSort variables
  switched = false;
  locationStartMainArray = 0;
  // SelectionSort variables
  currentHeighestValueInArray = 0;
  cycleNumberSelectionSort = 0;
}


// Creates a canvas where the Sorting Agorithms can be displayed
var canvasCreate = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      },
  // Cleans up the canvas so a new visualisation can be displayed
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


// Redraws the current state of the Sorting algoritms
function updateCanvas(){
  var k;
  canvasCreate.clear();
  for(k = 0; k < barAmount; k++){
    intsToSortArray[k].update();
  }
}


// Creates an object for every value in the array.
// Height is equal to the value of the array.
// All other variables are present for the visualisation of the Sorting Algorithms.
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
  this.getColor = function(){
    return this.color;
  }
  // Redraw the current values of the object.
  this.update = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, -this.height);
  }
}

// Generates a Random Color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


/*
function generateRandomColorArray(){
  for( var i = 0; i < barAmount; i++){
    mergeSortColorList.push(getRandomColor());
  }
}
*/

var mergeSortSortedArray = [false]
var coloringDevideDoneArray = [true]
var mergeSortColorArray = ["blue"]
var mergeSortDevisionArray = []
var mergeSortStepArray = []

function mergeSort(){


  if (mergeSortStepArray.length > 0){
    mergeSortStepArray = mergeArraysColoring(mergeSortStepArray)
    if (mergeSortStepArray.length == 1){
      mergeSortStepArray = mergeArraysColoring(mergeSortStepArray)
      mergeSortDevisionArray.splice(iterator, 2, mergeSortStepArray)
      mergeSortStepArray = []
    }
    updateCanvas()
    return
  }

  if (coloringDevideDoneArray.includes(false)){
    var coloringDoneArrayLength = coloringDevideDoneArray.length
    for( var i = 0; i < coloringDoneArrayLength; i++){
      coloringDevideDoneArray[i] = colorArrayDivision(mergeSortDevisionArray[i], mergeSortColorArray[i])
    }
    updateCanvas()
    return
  }

  if (mergeSortDevisionArray.length == 1 && mergeSortSortedArray[0] == true){
    intervalToggleMergeSort.stop()
    return;
  }

  // Split array if length of array in question is not 1 and if the array has not been sorted yet.
  if (mergeSortDevisionArray[iterator].length != 1 && !mergeSortSortedArray[iterator]){
    var newArrays= divideArray(mergeSortDevisionArray[iterator])
    mergeSortDevisionArray.splice(iterator, 1, newArrays[0], newArrays[1])
    coloringDevideDoneArray.splice(iterator, 1, false, false);
    
    if (newArrays[0].length != 1 && newArrays[1].length != 1){
      mergeSortSortedArray.splice(iterator, 1, false, false);
    } else if (newArrays[0].length == 1){
      mergeSortSortedArray.splice(iterator, 1, true, true);
    } else if (newArrays[1].length == 1){
      mergeSortSortedArray.splice(iterator, 1, false, true)
    } else {
      console.log("error")
    }

    mergeSortColorArray.splice(iterator, 0, getRandomColor());
    return;

  // If array can't be split, see if it can be combined with the array to the left of it
  } else if ( iterator != 0){
    var leftArray = mergeSortDevisionArray[iterator - 1];
    var array = mergeSortDevisionArray[iterator];
    var rightArray = mergeSortDevisionArray[iterator + 1]
    var rightArrayLength;

    if (rightArray === undefined){
      rightArrayLength = -2;
    } else if (rightArray.length == 1 && array.length == 1 && leftArray.length == 1){
      rightArrayLength = -2;
    } else {
      rightArrayLength = rightArray.length;
    }
    
    if((leftArray.length == array.length || array.length + 1) && array.length != rightArrayLength 
    && array.length != (rightArrayLength + 1)){
      
      coloringDevideDoneArray.splice(iterator, 2, false);
      mergeSortColorArray.splice(iterator, 1);
      iterator--;
      mergeSortStepArray = mergeArraysSteps(leftArray, array, mergeSortColorArray[iterator]);
      mergeSortSortedArray.splice(iterator, 2, true)
      return;
    } 

    iterator++;
  } else {
    iterator++;
  }

}

function mergeArraysColoring(stepArray){
  var currentStep = stepArray[0]
  switch(currentStep[0]){
    case 0:
      currentStep[1].changeColor("red")
      currentStep[2].changeColor("red")
    break;

    case 1:
      if (currentStep[1] == true){
        for (var i = 0; i < currentStep[2].length; i++){
          currentStep[2][i].changeHeight(currentStep[3][i])
        }
        currentStep[4][0].changeColor(currentStep[5])
        currentStep[4][1].changeColor("red")
      }
    break;

    case 2:
      currentStep[1].changeColor(currentStep[3])
      currentStep[2].changeColor(currentStep[3])
    break;

    case 3:
      for(var i = 0; i < currentStep[1].length; i++){
        currentStep[1][i].changeColor(currentStep[2])
      }
      return currentStep[1]

  }
  stepArray.shift()
  return stepArray
}


function mergeArraysSteps(left, right, color){
  var stepArray = []
  var leftLength = left.length;
  var loopCycles = leftLength + right.length
  var leftLocation = 0;
  var rightLocation = 0;

  var mergedArray = []
  var leftHeights = [];
  var rightHeights = [];

  for (var i = 0; i < left.length; i++){
    mergedArray.push(left[i])
    leftHeights.push(left[i].getHeight());
  }

  for (var i = 0; i < right.length; i++){
    mergedArray.push(right[i])
    rightHeights.push(right[i].getHeight());
  }


  for (var i = 0; i < loopCycles; i++){
    var leftComponent = left[leftLocation]
    var rightComponent  = right[rightLocation]

    if (leftComponent === undefined && (leftLocation - left.length) < rightLocation){
      leftComponent = right[leftLocation - left.length]
    }
   
    if (leftComponent === undefined){
      break;

    } else if (rightComponent === undefined || rightHeights[0] === undefined){
      break;

    } else if (leftHeights[leftLocation + rightLocation] > rightHeights[0]){
      var firstStep = [0]
      var secondStep = [1]
      var secondStepObjectArray = []
      var secondStepHeightArray = []
      var secondStepChangeCollorArray = []
      var thirdStep = [2]

      if ( left[leftLocation+rightLocation] !== undefined){
        firstStep.push(left[leftLocation + rightLocation]);
      } else if (right[(leftLocation + rightLocation) - leftLength] !== undefined){
        firstStep.push(right[(leftLocation + rightLocation) - leftLength])
      } else {
        firstStep.push(right[0])
      }
      
      firstStep.push(rightComponent);
      
      leftHeights.splice(leftLocation + rightLocation, 0, rightHeights[0])
      rightHeights.splice(0, 1)
      

      if (leftLength > 1){

        for(var k = leftLocation; k < leftHeights.length; k++){
          
          if (left[k] !== undefined){

            secondStepObjectArray.push(left[k])
            secondStepHeightArray.push(leftHeights[k])

          } else if (leftHeights[k] !== undefined){

            secondStepObjectArray.push(right[k - leftLength])
            secondStepHeightArray.push(leftHeights[k])

          } else {
            secondStepObjectArray.push(right[k - leftLength])
            secondStepHeightArray.push(rightHeights[k - leftHeights.length])

          }
        }

      } else {
        secondStepObjectArray.push(left[0]);
        secondStepHeightArray.push(leftHeights[0])
        secondStepObjectArray.push(right[0]);
        secondStepHeightArray.push(leftHeights[1])
        secondStepChangeCollorArray.push(right[0])

      }

      secondStepChangeCollorArray.push(rightComponent)
      
      if (left[leftLocation] != undefined){
        secondStepChangeCollorArray.push(left[leftLocation])
      } else {
        secondStepChangeCollorArray.push(right[leftLocation - leftLength])
      }
      secondStep.push(true)
      secondStep.push(secondStepObjectArray)
      secondStep.push(secondStepHeightArray)
      secondStep.push(secondStepChangeCollorArray)
      secondStep.push(color)

      thirdStep.push(leftComponent)
      thirdStep.push(rightComponent)
      
      thirdStep.push(color)
      
      stepArray.push(firstStep, secondStep, thirdStep)
      rightLocation++;
    } else {
      var firstStep = [0]
      var secondStep = [1]
      var thirdStep = [2]
      
      if ( left[leftLocation+rightLocation] !== undefined){
        firstStep.push(left[leftLocation + rightLocation]);
      } else if (right[leftLength - (leftLocation + rightLocation)] !== undefined){
        firstStep.push(right[leftLength - (leftLocation + rightLocation)])
      } else {
        firstStep.push(right[0])
      }

      firstStep.push(rightComponent);

      secondStep.push(false);

      thirdStep.push(leftComponent)
      thirdStep.push(rightComponent)
      thirdStep.push(color)

      stepArray.push(firstStep, secondStep, thirdStep)
      leftLocation++;
    }
  }

  stepArray.push([3, mergedArray, color])

  return stepArray;
}


function divideArray(arrayToSplit){
  lengthLeft = Math.ceil(arrayToSplit.length/2);
  leftArray = arrayToSplit.slice(0, lengthLeft);
  rightArray = arrayToSplit.slice(lengthLeft, arrayToSplit.length);

  return [leftArray, rightArray];
}


function colorArrayDivision(array, color){
  if (array === undefined){
    return true;
  }

  arrayLength = array.length;
  for(var i = 0; i < array.length; i++){
    if (array[i].getColor() != color){
      array[i].changeColor(color);
      return false;
    }
  }
  return true;
}


function selectionSort(){
  if ((iterator - (barAmount - cycleNumberSelectionSort)*3) >= 0){
    cycleNumberSelectionSort++;

    // Stop when the sort is done
    if (cycleNumberSelectionSort >= barAmount){
      intervalToggleSelectionSort.stop();
      return;
    }

    // Prevent switching with itself
    if ((barAmount - cycleNumberSelectionSort) != currentHeighestValueInArray ){
      iterator = 0;
    } else {
      iterator = 2;
    }
  }
  var currentBarSelectionSort = Math.floor(iterator/3);
  var switchCaseValue;
  // Special cases for the switch statement to create end of cycle animation
  if (iterator >= 3){
    switchCaseValue = iterator - (currentBarSelectionSort * 3);
  } else if ( iterator == 0 ){
    switchCaseValue = 1003;
  } else if ( iterator == 1 ) {
    switchCaseValue = 1002;
  } else if ( iterator == 2 ) {
    switchCaseValue = 1001;
  }

  switch(switchCaseValue){
    case 0:

      intsToSortArray[currentBarSelectionSort].changeColor("red");
      intsToSortArray[currentHeighestValueInArray].changeColor("red");

      break;
    // Empty case to create a smoother animation
    case 1:

      break;

    case 2:
      var heightCurrent = intsToSortArray[currentBarSelectionSort].getHeight();
      var heightHeigestValue = intsToSortArray[currentHeighestValueInArray].getHeight();
      if (heightCurrent >= heightHeigestValue){
        intsToSortArray[currentHeighestValueInArray].changeColor("blue");
        currentHeighestValueInArray = currentBarSelectionSort;
      } else {
        intsToSortArray[currentBarSelectionSort].changeColor("blue");
      }
      break;
    
    // These 3 cases animate the end of every cycle when the heighest value has been found
    case 1003:
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeColor("red");
      intsToSortArray[currentHeighestValueInArray].changeColor("red");

      break;

    case 1002:
      
      var heightCurrent = intsToSortArray[barAmount - cycleNumberSelectionSort].getHeight();
      var heightHeigestValue = intsToSortArray[currentHeighestValueInArray].getHeight();
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeHeight(heightHeigestValue);
      intsToSortArray[currentHeighestValueInArray].changeHeight(heightCurrent);
      
      break;

    case 1001:
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeColor("blue");
      intsToSortArray[currentHeighestValueInArray].changeColor("blue");
      currentHeighestValueInArray = 0;

  }

  iterator++;
  updateCanvas();
}


// The bubbleSort algoritm
function bubbleSort(){
  // After every cycle, 1 more value at the end of the array will certainly
  // be sorted, so this value does not have to be compared again. 
  // This keeps track of the number of cycles and makes sure the already sorted 
  // values will not be compared again.
  if ((iterator - (barAmount - cycleNumberBubbleSort)*3) >= 0){
    cycleNumberBubbleSort++;

    iterator = 0;
    // Stops the algorithm if either everything is sorted, or if the number of 
    // elements that are certainly sorted is equal or greater than the amount
    // of elements in the array
    if (cycleNumberBubbleSort >= barAmount || alreadySorted){
      intervalToggleBubbleSort.stop();
      return;
    }
    // If alreadySorted turns false before the start of the next cycle, then not every 
    // element in the array is sorted.
    alreadySorted = true;
  } 

  var currentBarBubbleSort = Math.floor(iterator/3);

  // There are 3 cases to create an animation. 
  //   1 case to turn the bars that will be compared red
  //   1 case to compare and maybe switch the bars that are being compared
  //   1 case to turn the bars blue again.
  switch(iterator - (currentBarBubbleSort * 3)){
    // Turn the bars that will be compared red.
    case 0:
      intsToSortArray[currentBarBubbleSort].changeColor("red");
    	intsToSortArray[currentBarBubbleSort + 1].changeColor("red");
      break;
    // Compare and maybe switch the bars.
    case 1:
      var heightFirst = intsToSortArray[currentBarBubbleSort].getHeight();
      var heightSecond = intsToSortArray[currentBarBubbleSort + 1].getHeight();
      if (heightFirst > heightSecond){
        intsToSortArray[currentBarBubbleSort].changeHeight(heightSecond);
        intsToSortArray[currentBarBubbleSort + 1].changeHeight(heightFirst);
        alreadySorted = false;
      }

      break;
    // Turn the bars blue again
    case 2:
      intsToSortArray[currentBarBubbleSort].changeColor("blue");
    	intsToSortArray[currentBarBubbleSort + 1].changeColor("blue");

      break;

  }

  iterator++;
  updateCanvas();
}

// The InsertionSort Algorithms.
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
  // There are 3 cases to create an animation. 
  //   1 case to turn the bars that will be compared red
  //   1 case to compare and maybe switch the bars that are being compared
  //   1 case to turn the bars blue again.
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
