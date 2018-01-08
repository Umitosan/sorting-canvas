
// see this for html names colors
// https://www.w3schools.com/colors/colors_shades.asp

var fBlack = 'rgba(0, 0, 0, 1)';
var fdarkGrey = 'rgba(50, 50, 50, 1)';
var flightGreyTrans = 'rgba(50, 50, 50, 0.3)';
var flightGreySolid = 'rgb(211,211,211)';
var fWhite = 'rgba(250, 250, 250, 1)';
var fRed = 'rgba(200, 0, 0, 0.5)';
var fGreen = 'rgba(0, 200, 0, 0.5)';
var fBlue = 'rgba(0, 0, 200, 0.5)';

var canvasWidth = 800;

var x1 = 10;
var y1 = 10;
var x3 = 20;
var y3 = 150;
var xVel3 = 10;
var boxWidth = 50;
var boxHeight = 50;

var time = 0;

function draw1() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {

    var ctx = canvas.getContext('2d');

    for (var i = 0; i < 35 ;i++) {
      // alternate between color boxes
      if ( ((i % 2) === 0) && ((i % 3) !== 0) ) {
        ctx.fillStyle = fBlue;
      } else if ((i % 3) === 0) {
        ctx.fillStyle = fGreen;
      } else {
        ctx.fillStyle = fRed;
      }
      // fillRect(x, y, width, height)
      ctx.fillRect(x1+(i*20), y1+(i*10), boxWidth, boxHeight);
    } // end for
  } // end if
} // end draw

function draw3() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // clear old box
    ctx.fillStyle = flightGreySolid;
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


// FRONT
// FRONT
// FRONT
$(document).ready(function() {

  function clockTimer() {
    time += 1;
    $('#clock').text(time);
  }

  setInterval(clockTimer, 1000);

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
