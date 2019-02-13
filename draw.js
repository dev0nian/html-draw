let isDrawing = false;
let prevPoint = null;
let context = null;

function mouseDown(inEvent) {
  context.beginPath();
  context.moveTo(inEvent.x, inEvent.y);
  prevPoint = {x: inEvent.x, y: inEvent.y};
  isDrawing = true;
}

function mouseMove(inEvent) {
  if(isDrawing) {
    let endP = {x: (inEvent.x + prevPoint.x) * 0.5, y: (inEvent.y + prevPoint.y) * 0.5};
    context.quadraticCurveTo(prevPoint.x, prevPoint.y, endP.x, endP.y);
    context.stroke();
    prevPoint = {x: inEvent.x, y: inEvent.y};
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
  context.lineWidth = 5.0;
  //context.shadowBlur = 3;
  //context.shadowColor = "black";
}

