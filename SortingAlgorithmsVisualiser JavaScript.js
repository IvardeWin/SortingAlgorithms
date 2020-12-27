const WIDTH = screen.width * 0.7;
const HEIGHT = screen.height * 0.6;


var barWidth = 25;
var barSpace = 1;
var barAmount = Math.floor(WIDTH/(barWidth + barSpace));
var minHeight = 10;

var intsToSortArray = [];
var delay = -10000;

// Common variables used by multiple Sorting Algorithms
// Common variables are used to communicate information between
// calls of a function of a certain algorithm
var iterator = 0;
var runningSortingAlgorithm;

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
var mergeSortSortedArray = [false]
var coloringDevideDoneArray = [true]
var mergeSortColorArray = ["blue"]
var mergeSortDevisionArray = []
var mergeSortStepArray = []



// Return a random number between an min and max number.
function randomNumber(maxHeight, minHeight){
  return Math.floor(Math.random()*(maxHeight - minHeight))+minHeight;
}

// Creates an array with random integers between an min and a max.
function createRandomIntArray(){
  var i;
  for(i = 0; i < barAmount; i++){
    var randomHeight = randomNumber(HEIGHT, minHeight);
    var position = i * (barWidth + barSpace);
    intsToSortArray.push(new component(barWidth, randomHeight, "blue", position, HEIGHT));
  }
}

// Fucntion called to set up canvas, and to create a random array to display
function setUp() {
  canvasCreate.start();
  createRandomIntArray();
  updateCanvas();
}

function changeDelay(value){
  newDelay = Math.pow(value, 1.7);
  
  intervalToggleBubbleSort.stop()
  intervalToggleInsertionSort.stop()
  intervalToggleSelectionSort.stop()
  intervalToggleMergeSort.stop()

  delay = newDelay;

  if ( runningSortingAlgorithm == 0 ) {
    intervalToggleBubbleSort.continue()
  } else if( runningSortingAlgorithm == 1 ) {
    intervalToggleInsertionSort.continue()
  } else if ( runningSortingAlgorithm == 2 ) {
    intervalToggleSelectionSort.continue()
  } else if ( runningSortingAlgorithm == 3 ) {
    intervalToggleMergeSort.continue()
  }
}

function changeAmountOfBars(value){
  value = Math.pow(value, 2);
  if (value <= barWidth){
    barWidth = value;
    var newBarAmount = Math.floor(WIDTH/(barWidth + barSpace))
    var extraBars = newBarAmount - barAmount;
    var updateWidth = intsToSortArray.length
    for (var i = 0; i < updateWidth; i++){
      intsToSortArray[i].changeWidth(barWidth)

      var position = i * (barWidth + barSpace);
      intsToSortArray[i].changePosition(position);

    }
    
    for(var i = 0; i < extraBars; i++){
      var randomHeight = randomNumber(HEIGHT, minHeight);
      var position = (i + barAmount) * (barWidth + barSpace);
      intsToSortArray.push(new component(barWidth, randomHeight, "blue", position, HEIGHT))
    }
    barAmount = newBarAmount;

  } else if (value > barWidth){
    barWidth = value;
    var newBarAmount = Math.floor(WIDTH/(barWidth + barSpace))
    var redundantBars = barAmount - newBarAmount;
    for(var i = 0; i < redundantBars; i++){
      intsToSortArray.pop();
    }

    var arrayLength = intsToSortArray.length;

    for(var i = 0; i < arrayLength; i++ ){
      intsToSortArray[i].changeWidth(barWidth)
      
      var position = i * (barWidth + barSpace);
      intsToSortArray[i].changePosition(position);
    }

    barAmount = newBarAmount;
  }
  updateCanvas()
}

// Toggle to call the BubbleSort function after every delay ms
var intervalToggleBubbleSort = {
  start : function() {
    // Stop all other functions
    stopIntervals()
    runningSortingAlgorithm = 0;
    // Start the interval
    this.interval = setInterval(bubbleSort, delay);
  },
  continue : function() {
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
    stopIntervals()
    runningSortingAlgorithm = 1
    // Start the interval
    this.interval = setInterval(insertionSort, delay);
  },
  continue : function() {
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

    runningSortingAlgorithm = 2;
    // Start the interval
    this.interval = setInterval(selectionSort, delay);
  },
  continue : function() {
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

    runningSortingAlgorithm = 3;
    // Start the interval
    this.interval = setInterval(mergeSort, delay);
  },
  continue : function() {
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
  runningSortingAlgorithm = undefined;
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
  // MergeSort variables
  mergeSortSortedArray = [false]
  coloringDevideDoneArray = [true]
  mergeSortColorArray = ["blue"]
  mergeSortDevisionArray = []
  mergeSortStepArray = []
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
  };
  this.changeWidth = function(width){
    this.width = width;
  };
  this.changePosition = function(position){
    this.x = position;
  };
  this.getHeight = function(){
    return this.height;
  };
  this.getColor = function(){
    return this.color;
  };
  // Redraw the current values of the object.
  this.update = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, -this.height);
  };
}


// MergeSort. The mergeSort algorithm recursively devides the array that it needs to sort into 2, and merges the 2 arrays back into 1 array,
// where it sorts the elements during the merging.
// Unfortunatly, calling mergesort recursively would not have worked with the visualisation present in this project.
// Therefore, this is an iterative variant of mergeSort.
function mergeSort(){
  // If Arrays have been merged, execute the animation steps
  if (mergeSortStepArray.length > 0){
    // Execute animation step
    mergeSortStepArray = mergeArraysColoring(mergeSortStepArray)
    if (mergeSortStepArray.length == 1){
      // Last step is making sure everything is the right color
      mergeSortStepArray = mergeArraysColoring(mergeSortStepArray)
      // Update the Devision array, the array used for the devisions and merging
      mergeSortDevisionArray.splice(iterator, 2, mergeSortStepArray)
      // Empty the animation steps array
      mergeSortStepArray = []
    }
    // update the canvas with the new heights and colors
    updateCanvas()
    // Do not do anything else than the coloring
    return
  }

  // When arrays are devided, give each array a different color from each other
  if (coloringDevideDoneArray.includes(false)){
    // Amount of times for the loop to run
    var coloringDoneArrayLength = coloringDevideDoneArray.length
    for( var i = 0; i < coloringDoneArrayLength; i++){
      // This makes sure every time only 1 bar is colored, and coloringDoneArrayLength contains
      // false so that the coloring will continue the next time mergeSort is called
      coloringDevideDoneArray[i] = colorArrayDivision(mergeSortDevisionArray[i], mergeSortColorArray[i])
    }
    // update the canvas with the new colors
    updateCanvas()
    // Do not do anything else than the coloring
    return
  }

  // When everything has the right colors and heights, check if the MergeSort algorithm is done
  if (mergeSortDevisionArray.length == 1 && mergeSortSortedArray[0] == true){
    intervalToggleMergeSort.stop()
    return;
  }

  // Split the array if the array can be devided into parts, and if the array is not sorted.
  if (mergeSortDevisionArray[iterator].length != 1 && !mergeSortSortedArray[iterator]){
    // Split the array and get the new left and right array
    var newArrays = divideArray(mergeSortDevisionArray[iterator])
    // Add the new arrays to the list
    mergeSortDevisionArray.splice(iterator, 1, newArrays[0], newArrays[1])
    
    // Update coloringDevideDoneArray such that in the next mergesort iteration the new array will be colored in
    coloringDevideDoneArray.splice(iterator, 1, false, false);
    
    // If array has length 1, then the array is sorted. Else the array is not sorted.
    if (newArrays[0].length != 1 && newArrays[1].length != 1){
      mergeSortSortedArray.splice(iterator, 1, false, false);
    } else if (newArrays[0].length == 1){
      mergeSortSortedArray.splice(iterator, 1, true, true);
    } else {
      mergeSortSortedArray.splice(iterator, 1, false, true)
    }

    // Get a new Color for the coloring of the arrays
    mergeSortColorArray.splice(iterator, 0, getRandomColor());
    return;


  // If array can't be split, see if it can be combined with the array to the left of it
  // If iterator == 0, then no array exist on the left.
  } else if ( iterator != 0){
    // get array to the left and right of array in question, and the array itself
    var leftArray = mergeSortDevisionArray[iterator - 1];
    var array = mergeSortDevisionArray[iterator];
    var rightArray = mergeSortDevisionArray[iterator + 1]
    // There might not be an array to the right, hence, rightArray.length sometimes gives an error
    var rightArrayLength;

    // Error handeling with the array to the right
    if (rightArray === undefined){
      rightArrayLength = -2;
    // Edge case handeling where all 3 arrays are the same length
    } else if (rightArray.length == array.length && array.length == leftArray.length ){
      rightArrayLength = -2;
    } else {
      rightArrayLength = rightArray.length;
    }
    
    // If array in question is about the same length as the array to the left of it, and it is not about 
    // the same length as the array to the right of it, then the array will merge with the array to
    // the left of it.
    if((leftArray.length == array.length || array.length + 1) && array.length != rightArrayLength 
    && array.length != (rightArrayLength + 1)){
      // Remove one of the colors of the arrays. 
      mergeSortColorArray.splice(iterator, 1);
      // Decrement iterator. Every operation will now be relative to the left array.
      iterator--;
      // Get the Array of steps needed for the visualisation of the mergeSort algorithm
      mergeSortStepArray = mergeArraysSteps(leftArray, array, mergeSortColorArray[iterator]);
      // Edit length of coloringDevideDoneArray such that it is the same length as MergeSortDevisionArray
      coloringDevideDoneArray.splice(iterator, 1);
      // The merged array is sorted, and 2 arrays have have been removed from MergeSortDevisionArray
      mergeSortSortedArray.splice(iterator, 2, true)
      return;
    } 

  }
  // If the arrays could not be devided or merged, then consider the next array the next time MergeSort is called
  iterator++;

}


// MergeArraysColoring executes 1 given step of the visualisation of the merging
// of 2 arrays in MergeSort.
function mergeArraysColoring(stepArray){
  var currentStep = stepArray[0]
  // The first number in the array indicates what kind of step will be taken
  switch(currentStep[0]){
    // Color the bars that will be compared/moved red.
    case 0:
      currentStep[1].changeColor("red")
      currentStep[2].changeColor("red")
    break;

    // If bars need to be moved, change the height of every bar so every bar has the right height.
    // and change the colors of 2 bars, since the 1 of the red bar has been moved according to the 
    // visualisation
    case 1:
      // If bars need to be moved/collored
      if (currentStep[1] == true){
        for (var i = 0; i < currentStep[2].length; i++){
          currentStep[2][i].changeHeight(currentStep[3][i])
        }
        // color 2 bars differently so it will look like the red bars has been moved.
        currentStep[4][0].changeColor(currentStep[5])
        currentStep[4][1].changeColor("red")
      }
    break;

    // Return 1 or multiple bars to the ending colors
    case 2:
      for(var i = 0; i < currentStep[1].length; i++){
        currentStep[1][i].changeColor(currentStep[2])
      }
    break;

    // Don't forget to make a function of the changing of colors. Code has been copied 3 times, Ivar
    // Ending case. All visualisation steps are done. Return every bar to the final color, and 
    // return the final mergedArray
    case 3:
      for(var i = 0; i < currentStep[1].length; i++){
        currentStep[1][i].changeColor(currentStep[2])
      }
      return currentStep[1]

  }

  // Shift StepArray such that the first entry will be removed, and return the resulting steparray
  stepArray.shift()
  return stepArray

}

/*
mergeArraysSteps function creates an array whith every step the visualisation
needs to make to create an functioning visualisation
This is by far the most important and hardest part of the MergeSort algorithm.

@pre Left and right must be sorted, and left >= right
left and right are final in this function.

Every step is exist of an identifier, step[0], to indicate what kind of step it is.
Then an series of arrays and colors, which are decoded by mergeArraysColoring.
*/
function mergeArraysSteps(left, right, color){
  // StepArray will contain every step
  var stepArray = []
  var leftLength = left.length;
  // loopCycles will be the maximum amount of times the forloop will run for
  var loopCycles = leftLength + right.length
  // Keep track of where in the loop we are at
  var leftLocation = 0;
  var rightLocation = 0;

  // Merged array will contain the sorted elements of left and right where 
  // mergedArray[i].getHeight() <= mergedArray[i+1].getHeight
  var mergedArray = []
  
  // Arrays of integers which contain the heights of the object in left and right.
  // These arrays are not final
  var leftHeights = []
  var rightHeights = []

  // Get the heights, and thus the intergers for the intergers arrays
  for (var i = 0; i < left.length; i++){
    mergedArray.push(left[i])
    leftHeights.push(left[i].getHeight());
  }

  for (var i = 0; i < right.length; i++){
    mergedArray.push(right[i])
    rightHeights.push(right[i].getHeight());
  }

  // Start making the steps
  for (var i = 0; i < loopCycles; i++){
    // Get some basic information about this iteration of the loop
    var leftComponent = left[leftLocation]
    var rightComponent  = right[rightLocation]

    // heck if the basic information means that the array needs to be stopped.
    if (leftComponent === undefined && (leftLocation - left.length) < rightLocation){
      leftComponent = right[leftLocation - left.length]
    }
   
    if (leftComponent === undefined){
      break;

    } else if (rightComponent === undefined || rightHeights[0] === undefined){
      break;

    // If components need to switched arround, create a set of steps.
    } else if (leftHeights[leftLocation + rightLocation] > rightHeights[0]){
      var firstStep = [0]
      var secondStep = [1]
      var secondStepObjectArray = []
      var secondStepHeightArray = []
      var secondStepChangeCollorArray = []
      var thirdStep = [2]
      var thirdStepChangeCollorArray = []

      // Step 1. Turn 2 bars red. These bars will be compared and switched. These bars are located at
      // some location of the leftHeights and the first position of the rightHeights array, which is equal
      // to rightcomponent. Since leftHeights.length >= leftLength, the component can appear in right.
      // The third case is for error handeling, and the last object of right will automatically selected.
      if ( left[ leftLocation + rightLocation ] !== undefined ) {

        firstStep.push( left[ leftLocation + rightLocation ] );
        thirdStepChangeCollorArray.push( left[ leftLocation + rightLocation ] )

      } else if ( right[ ( leftLocation + rightLocation )  - leftLength ] !== undefined ) {

        firstStep.push( right[( leftLocation + rightLocation ) - leftLength ] )
        thirdStepChangeCollorArray.push( right[ ( leftLocation + rightLocation ) - leftLength ] )

      } else {

        firstStep.push( right[ right.length - 1 ] )
        thirdStepChangeCollorArray.push( right[ right.length - 1 ] )

      }

      // The right component to change color to red
      firstStep.push(rightComponent)
      thirdStepChangeCollorArray.push(rightComponent)
      
      // Put the first element of rightHeights in an sorted position of leftHeights.
      // This will sort the heights such that every object can get the right height.
      leftHeights.splice(leftLocation + rightLocation, 0, rightHeights[0])
      rightHeights.splice(0, 1)
      
    
      if (leftLength > 1){
        // run a loop, where every object will get it's corresponding height from either leftHeights
        // or rightHeights. The loop runs from the left element being considered all the way to the right
        // element being considered, since all these elements will change height.
        
        for(var k = leftLocation; k < leftHeights.length; k++){
          
          // Since leftHeight.length >= left, elements from right can get heights from leftHeights.
          // This is handeled by this if-stament
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
      // error handeling for when left.length == 1
      } else {
        // the heights of only 2 elements need to be changed.
        secondStepObjectArray.push(left[0])
        secondStepHeightArray.push(leftHeights[0])
        secondStepObjectArray.push(right[0])
        secondStepHeightArray.push(leftHeights[1])
        secondStepChangeCollorArray.push(right[0])
      }

      // SeconsecondStepChangeCollorArray will color rightComponent 'color' and the element left to 
      // leftComponent red to create the illusion that the element moved. The if statement handeles 
      // whether the element to turn red is in left or right, or the same as rightComponent.
      secondStepChangeCollorArray.push(rightComponent)
      
      if ( left[ leftLocation + rightLocation + 1 ] !== undefined ) {
        secondStepChangeCollorArray.push( left[ leftLocation + rightLocation + 1 ] )

      } else if ( right[ (leftLocation + rightLocation) + 1  - leftLength ] !== undefined) {
        secondStepChangeCollorArray.push( right[ (leftLocation + rightLocation) + 1 - leftLength ] )

      } else {
        secondStepChangeCollorArray.push(rightComponent)
      }

      // true will cause the heights and colors to be changed
      secondStep.push(true)
      // Add all the arrays to secondStep
      secondStep.push(secondStepObjectArray)
      secondStep.push(secondStepHeightArray)
      secondStep.push(secondStepChangeCollorArray)
      secondStep.push(color)

      // The third Step will turn every element that has turned red back to color
      // Every element for which this is the case is present in thirdStepChangeCollorArray
      thirdStep.push(thirdStepChangeCollorArray)
      thirdStep.push(color)

      // Add all the steps to colorArray
      stepArray.push(firstStep, secondStep, thirdStep)
      // Consider in the next iteration the element to the right of rightComponent
      rightLocation++;


    // If components do not need to switched arround, create a different set of steps,
    // where the second step does not change anything in the visualisation
    } else {

      var firstStep = [0]
      var secondStep = [1]
      var thirdStep = [2]
      var thirdStepChangeCollorArray = []

      // Step 1. Turn 2 bars red. These bars will be compared and switched. These bars are located at
      // some location of the leftHeights and the first position of the rightHeights array, which is equal
      // to rightcomponent. Since leftHeights.length >= leftLength, the component can appear in right.
      // The third case is for error handeling, and the last object of right will automatically selected.
      if ( left[ leftLocation + rightLocation ] !== undefined ) {

        firstStep.push( left[ leftLocation + rightLocation ] );
        thirdStepChangeCollorArray.push( left[ leftLocation + rightLocation ] )

      } else if ( right[ ( leftLocation + rightLocation )  - leftLength ] !== undefined ) {

        firstStep.push( right[( leftLocation + rightLocation ) - leftLength ] )
        thirdStepChangeCollorArray.push( right[ ( leftLocation + rightLocation ) - leftLength ] )

      } else {

        firstStep.push( right[ right.length - 1 ] )
        thirdStepChangeCollorArray.push( right[ right.length - 1 ] )

      }

      // The right component to change color to red
      firstStep.push(rightComponent)
      thirdStepChangeCollorArray.push(rightComponent)


      // Since no heights are changed, second step should not be done and is thus false.
      secondStep.push(false);

      // The third Step will turn every element that has turned red back to color
      // Every element for which this is the case is present in thirdStepChangeCollorArray
      thirdStep.push(thirdStepChangeCollorArray)
      thirdStep.push(color)

      // Add all the steps to colorArray
      stepArray.push(firstStep, secondStep, thirdStep)
      // Since leftComponent is smaller then every element in rightHeights, consider the next left element
      leftLocation++;

    }
  }

  // Add a Final step, where every element of left and right get a given color, \
  // and where the sorted array will be returned.
  stepArray.push([3, mergedArray, color])

  return stepArray;
}

// Devide the array in 2 parts, where left >= right
function divideArray(arrayToSplit){
  lengthLeft = Math.ceil(arrayToSplit.length/2);
  leftArray = arrayToSplit.slice(0, lengthLeft);
  rightArray = arrayToSplit.slice(lengthLeft, arrayToSplit.length);

  return [leftArray, rightArray];
}

// Generates a Random Color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  // The first 2 letters corrospong to red. Red colors are unfavourable, hence, red should not get
  // high values.
  for (var i = 0; i < 2; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  for (var i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// colorArrayDivision either colors exactly 1 bar of array to color and return false, or return true
// false indicates that it is very likely that not all bars have been turned to color
// true indicates that every bar has color
function colorArrayDivision(array, color){
  arrayLength = array.length;
  for(var i = 0; i < arrayLength; i++){
    if (array[i].getColor() != color){
      array[i].changeColor(color);
      return false;
    }
  }
  return true;
}


// SelectionSort seeks the largest element of the part of the array which still needs to be sorted. When this element is found, 
// the element is switched with the last element of the part of the array which still needs to be sorted, and this last element will
// thus be sorted. This is repeated untill the array is sorted.
// This algorithm is used when the costs of switching element is relatively high.
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

  // The animation cycle
  switch(switchCaseValue){
    // Turn the elements wich will be compared to red.
    case 0:

      intsToSortArray[currentBarSelectionSort].changeColor("red");
      intsToSortArray[currentHeighestValueInArray].changeColor("red");

      break;
    // Empty case to create a smoother animation
    case 1:

      break;
    // Select the largest element, and turn the element with a smaller height blue again.
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
    // Turn the elements wich will be switched to red, where 1 of the elements is the largest element
    // of the part of the array which is not sorted 
    case 1003:
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeColor("red");
      intsToSortArray[currentHeighestValueInArray].changeColor("red");

      break;
    
    // Switch the 2 elements.
    case 1002:
      
      var heightCurrent = intsToSortArray[barAmount - cycleNumberSelectionSort].getHeight();
      var heightHeigestValue = intsToSortArray[currentHeighestValueInArray].getHeight();
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeHeight(heightHeigestValue);
      intsToSortArray[currentHeighestValueInArray].changeHeight(heightCurrent);
      
      break;
      
    // Turn the elements blue again, and reset the var that keeps track of the heighest element.
    case 1001:
      intsToSortArray[barAmount - cycleNumberSelectionSort].changeColor("blue");
      intsToSortArray[currentHeighestValueInArray].changeColor("blue");
      currentHeighestValueInArray = 0;

  }
  // increase iterator for the next loop.
  iterator++;
  // Update the canvas, and thus the heights and colors.
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
