

var myColors = new Colors(),
    bubbleStack = new Stack(),
    canvasWidth = 800,
    canvas = undefined, // canvas must be defined here for backend functions
    time = 0;
    myReq = undefined;

var lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS = 1; // The maximum FPS we want to allow

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
  this.sortCount = 71;

  // init adds random bars to the stack
  this.init = function() {
    clearCanvas();
    this.heightArr = [];
    this.barArr = [];
    // fill the the array with random but unique intergers
    while (this.heightArr.length < 71) {
      var myRand = getRandomIntInclusive(1,396);
      if (this.heightArr.includes(myRand) === false) {
        var newBar = new Bar();
        newBar.height = myRand;
        this.heightArr.push(myRand);
        this.barArr.push(newBar);``
      }
    } // while
    // console.log("this.barArr = ", this.barArr);
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
  this.update = function() {
    var swapCount = 0;
    for (var i = 0; i < this.barArr.length-1; i++) { // rem! length-1
      this.barArr[i].color = myColors.green;
      this.barArr[i+1].color = myColors.green;

      var leftVal = this.barArr[i];
      var rightVal = this.barArr[i+1];
      if (leftVal.height > rightVal.height) {
        this.barArr[i+1] = leftVal;
        this.barArr[i] = rightVal;
        swapCount += 1;
      }
      this.barArr[i].color = myColors.red;
      this.barArr[i+1].color = myColors.red;
    } // for
    if (swapCount < 1) {
      this.sorted = true;
      this.sortON = false;
    }
  } // pass

  this.reset = function() {
    this.heightArr = [];
    this.barArr = [];
    this.sorted = false;
    this.sortCount = 71;
    this.sortON = false;
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
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
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
    console.log('init');
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
