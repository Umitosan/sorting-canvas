

var myColors = new Colors(),
    bubbleStack = undefined,
    sortedTxt = undefined;

var canvasWidth = 800,
    // var canvas = document.getElementById('canvas');
    canvas = $('#canvas')[0] , // canvas must be defined here for backend functions
    time = 0,
    myReq = undefined,
    lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS = undefined, // The maximum FPS we want to allow
    loopRunning = false,
    maxBarHeight = 396;

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

function TxtBox() {
  this.x = 370;
  this.y = 50;
  this.font = "32px Georgia";
  this.color = myColors.blue;

  this.draw = function() {
    var ctx = canvas.getContext('2d');
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText("Sorted!",this.x,this.y);
  }
}

// a bar is single Bar object in a Stack
function Bar(barWidth) {
  this.color = myColors.red;
  this.x = 0;
  this.y = 399;
  this.height = 0;
  this.width = barWidth;
}

// a stack is a group of bars to be sorted
function Stack(size) {
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

  // init adds random bars to the stack
  this.init = function() {
    console.log('init funk run');
    this.barWidth = Math.floor( ((800 - this.size - 1) / (this.size)) );  // canvas size - this.size for each 1 pixel gap / number of desired bars in stack
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
    } // while
  } // init

  this.draw = function() {
    clearCanvas();
    var ctx = canvas.getContext('2d');
    // draw each bar one at a time
    for (var i = 0; i < this.barArr.length; i++) {
      ctx.fillStyle = this.barArr[i].color;
      // fillRect(x, y, width, height)
      // (x= start at 4, + i bars from left, +1 for a gap)
      ctx.fillRect((4+i*(this.barWidth+1)), 399, this.barWidth, this.barArr[i].height*-1);
    } // for
  } // draw

  // look at each pair once from bottom to top and swap them if needed
  // 1 update call only sorts 1 pair of bars in the stack
  this.update = function() {
    var i = this.sortingIndex;
    // console.log('this.swapCount = ', this.swapCount);

    if (i > 0) {  // turn last bars back to red
      this.barArr[i].color = myColors.red;
      this.barArr[i-1].color = myColors.red;
      this.barArr[i].color = myColors.green;
      this.barArr[i+1].color = myColors.green;
    }

    if (this.barArr[i].height > this.barArr[i+1].height ) {
      var h1 = this.barArr[i].height;
      var h2 = this.barArr[i+1].height;
      this.barArr[i].height = h2;
      this.barArr[i+1].height = h1;
      this.swapCount += 1;
    }

    if ( (i > (this.size - 3 - this.passCount)) && (this.swapCount < 1) ) {
      console.log("Sorting Complete!");
      this.sorted = true;
      loopRunning = false;
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
    } else if (i > (this.size - 3 - this.passCount)) {  // Start a new pass on the stack
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
      this.barArr[0].color = myColors.blue;
      this.barArr[1].color = myColors.blue;
      this.passCount += 1;
      this.sortingIndex = 0;
      // console.log('swapCount = ', this.swapCount);
      this.swapCount = 0;
    } else {
      this.sortingIndex += 1;
    }

  } // UPDATE

  this.reset = function() {
    loopRunning = false;
    this.heightArr = [];
    this.barArr = [];
    this.sorted = false;
    this.swapCount = undefined;
    this.bar1 = undefined;
    this.bar2 = undefined;
    this.sortingIndex = 0;
  }

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
    // Throttle the frame rate.
    // this effectively SHORT CIRCUITS the loop so that nothing is updated or drawn... UNLESS desired time as passed
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        myReq = requestAnimationFrame(gameLoop);
        return;
    }

    lastFrameTimeMs = timestamp;
    if ( (bubbleStack.sorted === false) && (loopRunning === true) ) { bubbleStack.update() };
    bubbleStack.draw();
    if (bubbleStack.sorted === true) { sortedTxt.draw() };  // show sorted text if sorted
    myReq = requestAnimationFrame(gameLoop);
}

//////////////////////////////////////////////////////////////////////////////////
// FRONT
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
  // canvas is instantiated above to be global
  canvas = $('#canvas')[0];

  setInterval(clockTimer, 1000);

  var gameInterval = undefined;

  $('.init').click(function() {
    console.log('init');
    var bars = $('#bars').val();
    clearCanvas();
    sortedTxt = new TxtBox();
    bubbleStack = new Stack(bars);
    maxFPS = $('#max-fps').val();
    loopRunning = false;
    bubbleStack.reset();
    bubbleStack.init();
    myReq = requestAnimationFrame(gameLoop)
  });

  $('.reset').click(function() {
    cancelAnimationFrame(myReq);
    clearCanvas();
    bubbleStack.reset();
  });

  $('.start').click(function() {
    loopRunning = true;
  });

});
