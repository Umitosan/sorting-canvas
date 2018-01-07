
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {

    var ctx = canvas.getContext('2d');

    var ctx1 = 'rgb(200, 0, 0)';
    var ctx2 = 'rgba(0, 0, 200, 0.5)';

    var x = 10;
    var y = 10;
    var width = 50;
    var height = 50;

    // fillRect(x, y, width, height)

    for (var i = 0; i < 10 ;i++) {
      // alternate between color boxes
      if ((i % 2) === 0) {
        ctx.fillStyle = ctx1;
      } else {
        ctx.fillStyle = ctx2;
      }
      // color the box in
      ctx.fillRect(x+(i*20), y+(i*20), width, height);
    } // end for
  } // end if
} // end draw


function clearCanvas() {
  // var canvas = document.getElementById('canvas');
  var canvas = $('#canvas')[0];
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}


$(document).ready(function(){
  console.log("Let the drawing begin!");

  // initial draw
  draw();

  $('.btn1').click(function() {
    draw();
  });

  $('.btn2').click(function() {
    clearCanvas();
  });

});
