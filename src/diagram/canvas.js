/**
 * Main code for diagram generation.
 */

const stage = new Konva.Stage({
  container: "canvas",
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true,
});

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

// Makes canvas fit to window
function updateStageSize() {
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);

  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;
}
window.addEventListener("resize", updateStageSize);

// Creates a node at coordinate (x, y)
function newNode(coord, amp) {
  let circle = new Konva.Circle({
    x: coord.x,
    y: coord.y,
    radius: 4,
    stroke: (amp[0] < 0) ? "red" : "black",
    fill: (amp[0] < 0) ? "red" : "black",
    strokeWidth: 2,
  });

  return circle;
}

// Creates an curved line between (x1, y1) and (x2, y2)
//  src for line: https://konvajs.org/docs/sandbox/Modify_Curves_with_Anchor_Points.html
function newLine(coord1, coord2, weight) {
  let mid_x = (coord2.x - coord1.x) / 2;
  let anchor1 = { x: coord1.x + mid_x, y: coord1.y };
  let anchor2 = { x: coord2.x - mid_x, y: coord2.y };

  console.log(weight);
  var bezier_line = new Konva.Shape({
    stroke: weight[0] < 0 ? "orange" : "blue",
    strokeWidth: 8 * Math.abs(weight[0]),
    sceneFunc: (ctx, shape) => {
      ctx.beginPath();
      ctx.moveTo(coord1.x, coord1.y);
      ctx.bezierCurveTo(
        anchor1.x,
        anchor1.y,
        anchor2.x,
        anchor2.y,
        coord2.x,
        coord2.y
      );
      ctx.fillStrokeShape(shape);
    },
  });

  return bezier_line;
}

function newLabel(coord, text, font_size = 16) {
  console.log("here");
  let label = new Konva.Text({
    x: coord.x,
    y: coord.y,
    text: text,
    fontSize: font_size,
  })
  console.log(label);
  return label;
}

// Adds a series of elements to the stage
function addElements(elements) {
  let layer = new Konva.Layer();

  elements.forEach((element) => {
    layer.add(element);
  });

  layer.draw();
  stage.add(layer);
}


// Functions to download canvas as image:
// main src:           https://konvajs.org/docs/data_and_serialization/High-Quality-Export.html
// downloadURI() from: https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function downloadCanvas() {
  let dataURL = stage.toDataURL({ pixelRatio: 3 });
  downloadURI(dataURL, "diagram.png");
}
