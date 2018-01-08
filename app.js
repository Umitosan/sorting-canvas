
// see this for html names colors
// https://www.w3schools.com/colors/colors_shades.asp

// all colors to be used with the canvas functions
var fBlack = 'rgba(0, 0, 0, 1)';
var fdarkGrey = 'rgba(50, 50, 50, 1)';
var flightGreyTrans = 'rgba(50, 50, 50, 0.3)';
var fGreyReset = 'rgb(211,211,211)';
var fWhite = 'rgba(250, 250, 250, 1)';
var fRed = 'rgba(200, 0, 0, 0.5)';
var fGreen = 'rgba(0, 200, 0, 0.5)';
var fBlue = 'rgba(0, 0, 200, 0.5)';

var canvasWidth = 800;
// canvas must be defined here for backend funcs
var canvas = undefined;

var x1 = 10;
var y1 = 10;
var x3 = 20;
var y3 = 150;
var xVel3 = 10;
var boxWidth = 50;
var boxHeight = 50;

var time = 0;

function gameLoop() {
  draw1();
  draw3();
}


function draw1() {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // clear old boxes
    ctx.fillStyle = fGreyReset;
    for (var i = 0; i < 35 ;i++) {
      ctx.fillRect(x1+(i*20), y1+(i*10), boxWidth, boxHeight);
    }
    for (var i = 0; i < 35 ;i++) {
      // alternate between color boxes
      if ( ((i % 2) === 0) && ((i % 3) !== 0) ) {
        ctx.fillStyle = fBlue;
      } else if ((i % 3) === 0) {
        ctx.fillStyle = fGreen;
      } else {
        ctx.fillStyle = fRed;
      }
      ctx.fillRect(x1+(i*20), y1+(i*10), boxWidth, boxHeight);
    } // end for
  } // end if
} // end draw


function draw3() {
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // clear old box
    ctx.fillStyle = fGreyReset;
    ctx.fillRect(x3, y3, boxWidth, boxHeight);
    // change velocity if needed
    if (x3+10+boxWidth > canvasWidth) {
      xVel3 = -10;
    } else if (x3-10 < 0) {
      xVel3 = 10;
    }
    // move box
    x3 += xVel3;
    ctx.fillStyle = flightGreyTrans;
    ctx.fillRect(x3, y3, boxWidth, boxHeight);
  }
}


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
  canvas = document.getElementById('canvas');

  setInterval(clockTimer, 1000);
  setInterval(gameLoop, 17);

  $('.btn1').click(function() {
    draw1();
  });

  $('.btn2').click(function() {
    clearCanvas();
  });

  $('.btn3').click(function() {
    setInterval(draw3, 50);
  });

  $('.btn4').click(function() {
    x3 = 50;
    y3 = 150;
  });

});
