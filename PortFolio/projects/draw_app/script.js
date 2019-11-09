var canvas = document.querySelector("canvas");
var choiceCanvas = document.getElementById("choice-canvas");
var drawMode = document.getElementById("draw-mode");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c2 = choiceCanvas.getContext("2d");



var c = canvas.getContext("2d");
var currentColorText = document.getElementById("current-color");

var mouseX;
var mouseY;
var isPressed = false;
var penColor = "black";
var radius = 30;
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");


var circleMode = true;

init();


drawMode.addEventListener('change', updateMode);

function updateMode(){
    if(circleMode === true)
    {
        circleMode = false;
    }else
    {
        circleMode = true;
    }

}

function Line(x, y, targetX, targetY){
    this.y = y;
    this.x = x;
    this.targetX = targetX;
    this.targetY = targetY;

    this.draw = function(){
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.targetX, this.targetY);
        c.strokeStyle = penColor;
        c.stroke();
        
    }
   
}

function init(){
    radius = slider.value;
    currentColorText.innerHTML += "Black";
    output.innerHTML = slider.value + "px";
    drawSelection();

}

function drawSelection(){
    c2.beginPath();
    c2.arc(50, 80, 20, Math.PI * 2, 0,false);
    c2.lineWidth = 7;
    c2.strokeStyle = "black";
    c2.stroke();

    c2.rect(100, 60, 80, 40);
    c2.stroke();

    c2.rect(215, 45, 60, 60);
    c2.stroke();
}

function clearAll(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    console.log("clear");
}


slider.oninput = function() {
    output.innerHTML = this.value +"px";
    radius = this.value;
}

var linesArray = [];
var linesArrayReal = [];
var linesCount = 0;
var startPointX;
var startPointY;
var goToPointX;
var goToPointY;
canvas.onclick = function(e){
    
}

canvas.onmouseover = function(e){
    console.log("mouse is hover");
}

canvas.onmousedown = function(e){
    document.getElementById("mouse-drawing").innerHTML = "true";
    isPressed = true;   
    if(circleMode === false){
        startPointX = e.x;
        startPointY = e.y; 
       
    }

}


canvas.onmouseup = function(e){
    document.getElementById("mouse-drawing").innerHTML = "false";
    if(circleMode === false){
        goToPointX = e.x;
        goToPointY = e.y;
        linesArray.push(new Line(startPointX, startPointY, goToPointX, goToPointY));
        linesArray[linesCount].draw();
        linesCount++;
        console.log('Lines number : '+linesCount);
    }
    isPressed = false;
}

document.onmouseenter = function(e){
    document.getElementById("mouse-hover").innerHTML = "true";
}

document.onmouseleave = function(e){
    document.getElementById("mouse-hover").innerHTML = "false";
}

var timer;
var timeout = function() {
    document.getElementById("mouse-moving").innerHTML = "false";  
}

document.onmousemove = function(){
    clearTimeout(timer);
    timer = setTimeout(timeout, 50);
    document.getElementById("mouse-moving").innerHTML = "true";
}
var started = false;
var linesRealCount = 0;
canvas.onmousemove = function(e){
    mouseX = e.x;
    mouseY = e.y;
    document.getElementById("mouse-coords").innerHTML = e.x + "|" + e.y;
    if(isPressed && circleMode === false){
        if(started){
            linesArrayReal.shift();
       
            delete linesArrayReal[linesRealCount - 1];
        }
        linesArrayReal.push(new Line(startPointX, startPointY, e.x, e.y));
        linesArrayReal[linesRealCount].draw();
       
        
        started = true;
        
    }

    if(isPressed && circleMode) { draw(); }
    
}

function draw(){     
    c.beginPath();
    c.arc(mouseX, mouseY+ radius / 2, radius, Math.PI * 2, false);
    c.fillStyle = penColor;
    c.fill();
}

function drawPreview(){
    c.beginPath();
    c.arc(mouseX, mouseY+ radius / 2, radius, Math.PI * 2, false);
    c.fillStyle = "rgb(0, 0, 0, 0.1";
    c.fill();
    c.clearRect(mouseX, mouseY + radius, 200, 200);
}


function orange_clicked(){
    penColor = "orange";
    currentColorText.innerHTML = "Orange";
}
function blue_clicked(){
    penColor = "blue";
    currentColorText.innerHTML = "Blue";
}
function pink_clicked(){
    penColor = "pink";
    currentColorText.innerHTML = "Pink";
}
function red_clicked(){
    penColor = "red";
    currentColorText.innerHTML = "Red";
}
function yellow_clicked(){
    penColor = "yellow";
    currentColorText.innerHTML = "Yellow";
}
function green_clicked(){
    penColor = "green";
    currentColorText.innerHTML = "Green";
}
function purple_clicked(){
    penColor = "purple";
    currentColorText.innerHTML = "Purple";
}
function white_clicked(){
    penColor = "white";
    currentColorText.innerHTML = "White";
}