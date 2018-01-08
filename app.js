
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

function Stack() {
  this.x = 5;
  this.y = 360;
  this.baseArr = [];
  this.init = function() {
    console.log('stack init');
    // fill the the array with random but unique intergers
    while (this.baseArr.length < 70) {
      this.baseArr.push();
    }
  }
  this.draw = function() {
    var ctx = canvas.getContext('2d');
    // draw each bar one at a time
    for (var i = 0; i < this.baseArr.length; i++) {
      ctx.fillStyle = myColors.red;
      // fillRect(x, y, width, height)
      ctx.fillRect((11+i*11), 370, 10, this.baseArr[i]);
    } // for
  } // draw
} // stack

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var myColors = new Colors();
var bubbleStack = new Stack();
bubbleStack.init();

var canvasWidth = 800;
var canvas = undefined; // canvas must be defined here for backend functions

// var x1 = 10;
// var y1 = 10;
// var x3 = 20;
// var y3 = 150;
// var xVel3 = 10;
// var boxWidth = 50;
// var boxHeight = 50;

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

  $('.btn0').click(function() {
    gameInterval = setInterval(gameLoop, 17);
  });

  $('.btn1').click(function() {

  });

  $('.btn2').click(function() {
    clearCanvas();
    clearInterval(gameInterval);
  });

  $('.btn3').click(function() {
    // setInterval(draw3, 17);
  });

  $('.btn4').click(function() {
    x3 = 50;
    y3 = 150;
  });

});
