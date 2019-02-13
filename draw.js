let isDrawing = false;
let context = null;
let bgContext = null;
let points = [];

function mouseDown(inEvent) {
  points.length = 0;
  points.push({x: inEvent.clientX, y: inEvent.clientY});
  isDrawing = true;
}

function mouseMove(inEvent) {
  if(isDrawing) {
    points.push({x: inEvent.clientX, y: inEvent.clientY});
    draw(context, true);
  }
}

function mouseUp(inEvent) {
  points.push({x: inEvent.clientX, y: inEvent.clientY});
  draw(bgContext, false);
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
  context.lineWidth = 5.0;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  bgContext = bgCanvas.getContext("2d");
  bgContext.lineJoin = context.lineJoin;
  bgContext.lineCap = context.lineCap;
  bgContext.lineWidth = context.lineWidth;
  bgContext.fillStyle = "gray";
  bgContext.fillRect(0, 0, bgContext.canvas.width, bgContext.canvas.height);
}

