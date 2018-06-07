/*jshint esversion: 6 */

var myColors = new Colors(),
    bubbleStack,
    sortedTxt;

var canvasWidth = 820,
    canvasHeight = 420,
    // var canvas = document.getElementById('canvas');
    canvas = $('#canvas')[0] , // canvas must be defined here for backend functions
    time = 0,
    myReq,
    lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS, // The maximum FPS we want to allow
    loopRunning = false,
    maxBarHeight = canvasHeight - 10,
    pageLoadTime,
    sortStartTime;

// see this for html names colors
// https://www.w3schools.com/colors/colors_shades.asp
// all colors to be used with the canvas functions
function Colors() {
  this.black = 'rgba(0, 0, 0, 1)';
  this.darkGrey = 'rgba(50, 50, 50, 1)';
  this.lightGreyTrans = 'rgba(50, 50, 50, 0.3)';
  this.greyReset = 'rgb(211,211,211)';
  this.lighterGreyReset = 'rgb(240,240,240)';
  this.white = 'rgba(250, 250, 250, 1)';
  this.red = 'rgba(230, 0, 0, 1)';
  this.green = 'rgba(0, 230, 0, 1)';
  this.blue = 'rgba(0, 0, 230, 0.7)';
}

function TxtBox(x,y,txt) {
  this.x = x;
  this.y = y;
  this.font = "32px Georgia";
  this.color = myColors.blue;
  this.txt = txt;

  this.draw = function() {
    var ctx = canvas.getContext('2d');
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(this.txt,this.x,this.y);
  };
}

// a bar is single Bar object in a Stack
function Bar(barWidth) {
  this.color = myColors.red;
  this.x = 0;
  this.y = canvasHeight - 1;
  this.height = 0;
  this.width = barWidth;
}

// a stack is a group of bars to be sorted
function Stack(size, sortDuration = 10) {
  this.size = size;
  this.heightArr = [];
  this.barArr = [];
  this.sorted = false;
  this.swapCount = undefined;
  this.passCount = undefined;
  this.bar1 = undefined;
  this.bar2 = undefined;
  this.barWidth = undefined;
  this.sortingIndex = 0;
  this.sortDuration = sortDuration;
  this.lastUpdateTime = 0;
  this.totalTimeToSort = 0;
  this.txtBoxes = [];


  // init adds random bars to the stack
  this.init = function() {
    console.log('init funk run');
    this.barWidth = Math.floor( ((canvasWidth - this.size - 1) / (this.size)) );  // canvas size - this.size for each 1 pixel gap / number of desired bars in stack
    console.log("barWidth = ", this.barWidth);
    this.swapCount = 0;
    this.passCount = 0;
    while (this.heightArr.length < this.size) {
      // fill the the array with random but unique intergers
      var myRand = getRandomIntInclusive(1, maxBarHeight);
      if (this.heightArr.indexOf(myRand) === -1) { // rem: indexOf returns -1 when not found, also indexOf is supported in IE11 but not .includes
        var newBar = new Bar(this.barWidth);
        newBar.height = myRand;
        this.heightArr.push(myRand);
        this.barArr.push(newBar);
      }
      if (this.heightArr.length === this.size) {
        console.log('init while needs to end');
        return;
      }
    } // while
    console.log('Statck.init finished');
  }; // init

  this.draw = function() {
    var ctx = canvas.getContext('2d');
    // draw each bar one at a time
    for (var i = 0; i < this.barArr.length; i++) {
      ctx.fillStyle = this.barArr[i].color;
      // fillRect(x, y, width, height)
      // (x= start at 4, + i bars from left, +1 for a gap)
      ctx.fillRect((4+i*(this.barWidth+1)), canvasHeight-1, this.barWidth, this.barArr[i].height*-1);
    } // for
    // draw each txt box
    for (let i=0; i < this.txtBoxes.length; i++) {
      this.txtBoxes[i].draw();
    }
  }; // draw

  // look at each pair once from bottom to top and swap them if needed
  // 1 update call only sorts 1 pair of bars in the stack
  this.update = function() {
    var i = this.sortingIndex;
    // turn last bars back to red
    if (i > 0) {
      this.barArr[i].color = myColors.red;
      this.barArr[i-1].color = myColors.red;
      this.barArr[i].color = myColors.green;
      this.barArr[i+1].color = myColors.green;
    }
    // compare and swap bars if needed
    if (this.barArr[i].height > this.barArr[i+1].height ) {
      var h1 = this.barArr[i].height;
      var h2 = this.barArr[i+1].height;
      this.barArr[i].height = h2;
      this.barArr[i+1].height = h1;
      this.swapCount += 1;
    }
    // check if sorting is complete
    if ( (i > (this.size - 3 - this.passCount)) && (this.swapCount < 1) ) {
      console.log("Sorting Complete!");
      this.totalTimeToSort =  (Math.round( (performance.now() - sortStartTime) * 100 ) / 100000);
      this.sorted = true;
      this.txtBoxes.push( new TxtBox(canvasWidth/2,50,"Sort time:") );
      this.txtBoxes.push( new TxtBox(canvasWidth/2,90,this.totalTimeToSort+" sec") );
      loopRunning = false;
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
    } else if (i > (this.size - 3 - this.passCount)) {  // Start a new pass on the stack
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
      this.barArr[0].color = myColors.blue;  // only the first pair of bars show blue to indicate the start
      this.barArr[1].color = myColors.blue;
      this.passCount += 1;
      this.sortingIndex = 0;
      this.swapCount = 0;
    } else {
      this.sortingIndex += 1;
    }
  }; // UPDATE
} // stack

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function clearCanvas() {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function clockTimer() {
  time += 1;
  $('#clock').text(time);
}

//////////////////////////////////////////////////////////////////////////////////
// GAME LOOP
//////////////////////////////////////////////////////////////////////////////////
function gameLoop(timestamp) {
  // if (first time) {
  //   bubbleStack.lastUpdateTime = performance.now();
  // }
  // timestamp is automatically returnd from requestAnimationFrame
  // timestamp uses performance.now() to compute the time
  myReq = requestAnimationFrame(gameLoop);

  if ((!bubbleStack.sorted) && (loopRunning)) {
    var now = performance.now();
    if ( (now - bubbleStack.lastUpdateTime) >= bubbleStack.sortDuration ) {
      var timesToUpdate = Math.ceil( (now - bubbleStack.lastUpdateTime) / bubbleStack.sortDuration);
      for (var i=0; i < timesToUpdate; i++) {
        bubbleStack.update();
        if (bubbleStack.sorted) { break; }
      }
      bubbleStack.lastUpdateTime = performance.now();
    }
  }
  clearCanvas();
  bubbleStack.draw();
}



//////////////////////////////////////////////////////////////////////////////////
// FRONT
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
  // canvas is instantiated above to be global
  canvas = $('#canvas')[0];

  pageLoadTime = performance.now();

  setInterval(clockTimer, 1000);

  var gameInterval;

  $('.init').click(function() {
    var bars = $('#bars').val();
    if ((bars < 2) || (bars > 400)) {
      return;
    }
    if (myReq !== undefined) {
      cancelAnimationFrame(myReq);
    } else {
      console.log("first game loop started");
    }
    clearCanvas();
    sortSpeed = parseFloat( $('#sort-speed').val() );
    bubbleStack = new Stack(bars, sortSpeed);
    loopRunning = false;
    bubbleStack.init();
    bubbleStack.draw();
  });

  $('.sort').click(function() {
    if ( (!loopRunning) && (bubbleStack) && (!bubbleStack.sorted) )  {
      sortStartTime = performance.now();
      console.log('sortStartTime = ', sortStartTime);
      loopRunning = true;
      bubbleStack.lastUpdateTime = performance.now();
      console.log("bubbleStack.lastUpdateTime = ", bubbleStack.lastUpdateTime);
      myReq = requestAnimationFrame(gameLoop);
    }
  });

  $('.reset').click(function() {
    if (bubbleStack) {
      clearCanvas();
      loopRunning = false;
      bubbleStack = undefined;
      cancelAnimationFrame(myReq);
    }
  });

});
