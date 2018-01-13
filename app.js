

var myColors = new Colors(),
    bubbleStack = new Stack(),
    canvasWidth = 800,
    canvas = undefined, // canvas must be defined here for backend functions
    time = 0;
    myReq = undefined;

var lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS = 1000; // The maximum FPS we want to allow

// see this for html names colors
// https://www.w3schools.com/colors/colors_shades.asp
// all colors to be used with the canvas functions
function Colors() {
  this.black = 'rgba(0, 0, 0, 1)';
  this.darkGrey = 'rgba(50, 50, 50, 1)';
  this.lightGreyTrans = 'rgba(50, 50, 50, 0.3)';
  this.greyReset = 'rgb(211,211,211)';
  this.white = 'rgba(250, 250, 250, 1)';
  this.red = 'rgba(200, 0, 0, 1)';
  this.green = 'rgba(0, 200, 0, 0.5)';
  this.blue = 'rgba(0, 0, 200, 0.5)';
}

// a bar is single Bar object in a Stack
function Bar() {
  this.color = myColors.red;
  this.x = 0;
  this.y = 399;
  this.height = 0;
  this.width = 11;
}

// a stack is a group of bars to be sorted
function Stack() {
  this.heightArr = [];
  this.barArr = [];
  this.sorted = false;
  this.sortON = false;
  this.sortCount = undefined;
  this.bar1 = undefined;
  this.bar2 = undefined;
  this.sortingIndex = 0;

  // init adds random bars to the stack
  this.init = function() {
    console.log('init funk run');
    // fill the the array with random but unique intergers
    while (this.heightArr.length < 72) {
      var myRand = getRandomIntInclusive(1,396);
      if (this.heightArr.includes(myRand) === false) {
        var newBar = new Bar();
        newBar.height = myRand;
        this.heightArr.push(myRand);
        this.barArr.push(newBar);``
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
      ctx.fillRect((4+i*11), 399, 10, this.barArr[i].height*-1);
    } // for
  } // draw

  // look at each pair once from bottom to top and swap them if needed
  // 1 update call only sorts 1 pair of bars in the stack
  this.update = function() {
    var i = this.sortingIndex;
    console.log('index = ', i);

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

    if (this.swapCount < 1) {
      console.log("Sorting Complete!");
      this.sorted = true;
      this.sortON = false;
    } else if (i > 69) {
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
      this.sortingIndex = 0;
    } else {
      this.sortingIndex += 1;
    }

  } // UPDATE

  this.reset = function() {
    this.heightArr = [];
    this.barArr = [];
    this.sorted = false;
    this.sortON = false;
    this.sortCount = undefined;
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
  var canvas = $('#canvas')[0]; // var canvas = document.getElementById('canvas');
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
    if ( (bubbleStack.sorted === false) && (bubbleStack.sortON === true) ) { bubbleStack.update() };
    bubbleStack.draw();
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
    console.log('init-btn');
    clearCanvas();
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
    console.log('start');
    bubbleStack.sortON = true;
  });

});
