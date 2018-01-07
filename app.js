

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(50, 50, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(70, 70, 50, 50);
  }
}


$(document).ready(function(){
  console.log("Let the drawing begin!");
  draw();
});
