

var myColors = new Colors();
var bubbleStack = new Stack();
var canvasWidth = 800;
var canvas = undefined; // canvas must be defined here for backend functions
var time = 0;

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
  this.baseArr = [];
  this.sorted = false;
  this.sortON = false;
  this.sortCount = 72;

  // init adds random bars to the stack
  this.init = function() {
    clearCanvas();
    this.baseArr = [];
    // fill the the array with random but unique intergers
    while (this.baseArr.length < 72) {
      var myRand = getRandomIntInclusive(1,396);
      if (this.baseArr.includes(myRand) === false) {
        this.baseArr.push(myRand);
      }
    } // while
  } // init

  this.draw = function() {
    clearCanvas();
    var ctx = canvas.getContext('2d');
    // draw each bar one at a time
    for (var i = 0; i < this.baseArr.length; i++) {
      ctx.fillStyle = myColors.red;
      // fillRect(x, y, width, height)
      ctx.fillRect((4+i*11), 399, 10, this.baseArr[i]*-1);
    } // for
  } // draw

  // look at each pair once from bottom to top and swap them if needed
  this.update = function() {
    var swapCount = 0;
    for (var i = 0; i < this.baseArr.length; i++) {
      var leftVal = this.baseArr[i];
      var rightVal = this.baseArr[i+1];
      if (leftVal > rightVal) {
        this.baseArr[i+1] = leftVal;
        this.baseArr[i] = rightVal;
        swapCount += 1;
      }
    } // for
    if (swapCount < 1) {
      this.sorted = true;
      this.sortON = false;
    }
  } // pass

  this.reset = function() {
    this.baseArr = [];
    this.sorted = false;
    this.sortCount = 72;
    this.sortON = false;
  }

} // stack

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

//////////////////////////////////////////////////////////////////////////////////
function gameLoop() {
  bubbleStack.draw();
  if ( (bubbleStack.sorted === false) && (bubbleStack.sortON === true) ) {
    bubbleStack.update();
    requestAnimationFrame(gameLoop);
  } else {
    return;
  }
}
//////////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
  var canvas = $('#canvas')[0]; // var canvas = document.getElementById('canvas');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function clockTimer() {
  time += 1;
  $('#clock').text(time);
}


////////////////////////////////////////////
// FRONT
////////////////////////////////////////////
$(document).ready(function() {
  // canvas is instantiated above to be global
  canvas = $('#canvas')[0];

  setInterval(clockTimer, 1000);

  var gameInterval = undefined;
  // var animFrame = undefined;

  $('.init').click(function() {
    console.log('init');
    bubbleStack.reset();
    bubbleStack.init();
    gameLoop();
  });

  $('.sort').click(function() {
  });

  $('.reset').click(function() {
    clearCanvas();
    bubbleStack.reset();
  });

  $('.step').click(function() {
  });

  $('.start').click(function() {
    console.log('start');
    bubbleStack.sortON = true;
    gameLoop();
  });

});
