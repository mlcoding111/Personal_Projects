var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth -40;
canvas.height = window.innerHeight -40;

var canvasPos = getPosition(canvas);
var mouseX = 0;
var mouseY = 0;
var sqSize = 100;
var xPos = 0;
var yPos = 0;
var dx = 0;
var dy = 0;

canvas.style.cursor = "crosshair";

window.onresize = function(){
    canvas.width = window.innerWidth -40;
canvas.height = window.innerHeight -40;
};
canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;
    console.log(mouseX + "|" + mouseY);
}

function animate(){
    dX = mouseX - xPos;
    dY = mouseY - yPos;

    xPos +=(dX / 30);
    yPos +=(dY / 30);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#00CCFF";
    context.fillRect(xPos - sqSize / 2,
        yPos - sqSize / 2,
        sqSize,
        sqSize);

requestAnimationFrame(animate);
}
animate();







function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    }
}