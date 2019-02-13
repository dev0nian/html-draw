let isDrawing = false;
let context = null;
let bgContext = null;
let points = [];
let drawState = "pen"; //"pen", "eraser"
const eraserLineWidth = 30;
const penLineWidth = 5;

function mouseDown(inEvent) {
  points.length = 0;
  points.push({x: inEvent.clientX, y: inEvent.clientY});
  isDrawing = true;
}

function mouseMove(inEvent) {
  if(isDrawing) {
    points.push({x: inEvent.clientX, y: inEvent.clientY});
    if(drawState == "pen") {
      draw(context, true);
    }
    else if(drawState == "eraser") {
      draw(context, false);
    }
  }
}

function mouseUp(inEvent) {
  points.push({x: inEvent.clientX, y: inEvent.clientY});
  if(drawState == "pen") {
    draw(bgContext, false);
  }
  else if(drawState == "eraser") {
    draw(context, false);
  }
  isDrawing = false;
}

function draw(inContext, inClear) {
  if(inClear) {
    inContext.clearRect(0, 0, inContext.canvas.width, inContext.canvas.height);
  }
  for(let i = 0; i < points.length; ++i) {
    if(i == 0) {
      inContext.beginPath();
      inContext.moveTo(points[i].x, points[i].y);
    }
    else {
      let curP = points[i];
      let prevP = points[i-1];
      let endP = {x: (curP.x + prevP.x) * 0.5,
                  y: (curP.y + prevP.y) * 0.5};
      inContext.quadraticCurveTo(prevP.x, prevP.y, endP.x, endP.y);
    }
  }
  if(points.length > 0) {
    inContext.stroke();
  }
}

function setDrawState(state) {
  if(drawState == state) {
    return;
  }
  if(drawState == "eraser" && state == "pen") {
    bgContext.drawImage(context.canvas, 0, 0, bgContext.canvas.width, bgContext.canvas.height);
  }
  drawState = state;
  if(drawState == "pen") {
    context.globalCompositeOperation = "source-over";
    context.lineWidth = penLineWidth;
    bgContext.lineWidth = penLineWidth;
  }
  else if(drawState == "eraser") {
    //copy over the contents of the bgCanvas into the drawing canvas.
    //Clear the bgCanvas
    let bgImageData = bgContext.getImageData(0, 0, bgContext.canvas.width, bgContext.canvas.height);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.putImageData(bgImageData, 0, 0);
    bgContext.fillRect(0, 0, bgContext.canvas.width, bgContext.canvas.height);
    context.lineWidth = eraserLineWidth;
    bgContext.lineWidth = eraserLineWidth;

    context.globalCompositeOperation = "destination-out";
  }
}

window.onload = function() {
  console.log("window loaded");
  let canvas = document.getElementById("draw_surface");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.onmousedown = mouseDown;
  canvas.onmousemove = mouseMove;
  canvas.onmouseup = mouseUp;

  let bgCanvas = document.getElementById("background");
  bgCanvas.width = canvas.width;
  bgCanvas.height = canvas.height;

  context = canvas.getContext("2d");
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth = penLineWidth;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  bgContext = bgCanvas.getContext("2d");
  bgContext.lineJoin = context.lineJoin;
  bgContext.lineCap = context.lineCap;
  bgContext.lineWidth = penLineWidth;
  bgContext.fillStyle = "#EEEEEE";
  bgContext.fillRect(0, 0, bgContext.canvas.width, bgContext.canvas.height);
}

