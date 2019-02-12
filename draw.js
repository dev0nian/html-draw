let isDrawing = false;
let context = null;

function mouseDown(inEvent) {
  context.beginPath();
  context.moveTo(inEvent.x, inEvent.y);
  isDrawing = true;
}

function mouseMove(inEvent) {
  if(isDrawing) {
    context.lineTo(inEvent.x, inEvent.y);
    context.stroke();
  }
}

function mouseUp(inEvent) {
  context.lineTo(inEvent.x, inEvent.y);
  context.stroke();
  isDrawing = false;
}

window.onload = function() {
  console.log("window loaded");
  let canvas = document.getElementById("draw_surface");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.onmousedown = mouseDown;
  canvas.onmousemove = mouseMove;
  canvas.onmouseup = mouseUp;

  context = canvas.getContext("2d");
  context.lineJoin = "round";
  context.lineCap = "round";
  //context.shadowBlur = 3;
  //context.shadowColor = "black";
}

