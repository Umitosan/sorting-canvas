
// see this for html names colors
// https://www.w3schools.com/colors/colors_shades.asp

// all colors to be used with the canvas functions
function Colors() {
  this.black = 'rgba(0, 0, 0, 1)';
  this.darkGrey = 'rgba(50, 50, 50, 1)';
  this.lightGreyTrans = 'rgba(50, 50, 50, 0.3)';
  this.greyReset = 'rgb(211,211,211)';
  this.white = 'rgba(250, 250, 250, 1)';
  this.red = 'rgba(200, 0, 0, 0.5)';
  this.green = 'rgba(0, 200, 0, 0.5)';
  this.blue = 'rgba(0, 0, 200, 0.5)';
}

// a stack is a group of bars to be sorted
function Stack() {
  this.x = 5;
  this.y = 360;
  this.baseArr = [];

  // init randomizes the initial bar lengths
  this.init = function() {
    clearCanvas();
    this.baseArr = [];
    // fill the the array with random but unique intergers
    while (this.baseArr.length < 72) {
      var myRand = getRandomIntInclusive(1,396);
      if (this.baseArr.includes(myRand) === false) {
        this.baseArr.push(myRand);
      }
    }
    console.log('this.baseArr = ', this.baseArr);
  }

  this.draw = function() {
    var ctx = canvas.getContext('2d');
    // draw each bar one at a time
    for (var i = 0; i < this.baseArr.length; i++) {
      ctx.fillStyle = myColors.red;
      // fillRect(x, y, width, height)
      ctx.fillRect((4+i*11), 399, 10, this.baseArr[i]*-1);
    } // for
  } // draw

  // look at each pair once from bottom to top and swap them if needed
  this.pass1 = function() {
    clearCanvas();
    for (var i = 0; i < this.baseArr.length; i++) {
      var leftVal = this.baseArr[i];
      var rightVal = this.baseArr[i+1];
      if (leftVal > rightVal) {
        this.baseArr[i+1] = leftVal;
        this.baseArr[i] = rightVal;
      }
    } // for
  } // pass1
} // stack

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var myColors = new Colors();
var bubbleStack = new Stack();

var canvasWidth = 800;

var canvas = undefined; // canvas must be defined here for backend functions

var time = 0;

function gameLoop() {
  bubbleStack.draw();
}

// function draw1() {
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//     // clear old boxes
//     ctx.fillStyle = fGreyReset;
//     for (var i = 0; i < 35 ;i++) {
//       ctx.fillRect(x1+(i*20), y1+(i*10), boxWidth, boxHeight);
//     }
//     for (var i = 0; i < 35 ;i++) {
//       // alternate between color boxes
//       if ( ((i % 2) === 0) && ((i % 3) !== 0) ) {
//         ctx.fillStyle = fBlue;
//       } else if ((i % 3) === 0) {
//         ctx.fillStyle = fGreen;
//       } else {
//         ctx.fillStyle = fRed;
//       }
//       ctx.fillRect(x1+(i*20), y1+(i*10), boxWidth, boxHeight);
//     } // end for
//   } // end if
// } // end draw

// function draw3() {
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//     // clear old box
//     ctx.fillStyle = fGreyReset;
//     ctx.fillRect(x3, y3, boxWidth, boxHeight);
//     // change velocity if needed
//     if (x3+10+boxWidth > canvasWidth) {
//       xVel3 = -10;
//     } else if (x3-10 < 0) {
//       xVel3 = 10;
//     }
//     // move box
//     x3 += xVel3;
//     ctx.fillStyle = flightGreyTrans;
//     ctx.fillRect(x3, y3, boxWidth, boxHeight);
//   }
// }

function clearCanvas() {
  // var canvas = document.getElementById('canvas');
  var canvas = $('#canvas')[0];
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}


function clockTimer() {
  time += 1;
  $('#clock').text(time);
}


// FRONT
// FRONT
// FRONT
$(document).ready(function() {
  // canvas is instantiated above to be global
  canvas = $('#canvas')[0];

  setInterval(clockTimer, 1000);

  var gameInterval = undefined;

  $('.init').click(function() {
    console.log('init');
    bubbleStack.init();
  });

  $('.draw').click(function() {
    console.log('draw');
    gameInterval = setInterval(gameLoop, 17);
  });

  $('.sort').click(function() {
    console.log('sort');
  });

  $('.clear').click(function() {
    clearCanvas();
    clearInterval(gameInterval);
    bubbleStack.baseArr = [];
  });

  $('.step').click(function() {
    console.log('step');
  });

  $('.pass1').click(function() {
    console.log('pass1');
    bubbleStack.pass1();
  });

});
