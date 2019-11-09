var canvas = document.querySelector("canvas");
var xUi = document.getElementById("x-span");
var yUi = document.getElementById("y-span");
var info = document.getElementById("custom-info");


canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var c = canvas.getContext("2d");

var mouseX;
var mouseY;


var radius = 15;
var startingY = [];
var startingX = [];
var _blank = true;

var gameStarted = false;

var bulletsTrack = 0;
var bulletsArray = [];
var speed = 2;

window.onresize = function(e){
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
}

function init() {
    
    canvas.style.cursor = "none";
    info.innerHTML ="Canvas Height : " +  canvas.height;
}


function Bullets(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.draw = function () {

        c.rect(this.x, this.y - radius * 2, 3, 30);
        c.fillStyle = "white";
        c.fill();

        /* TRYING TO DESTROY ONCE REACH TOP */

        if (this.y <= 0) {
           var destroyedB = bulletsArray.length;
            bulletsArray.splice(0,1)
          /*  bulletsArray.pop(); */
            console.log('Destroyed Bullets Number : ' + destroyedB);
            bulletsTrack --;
        }

        /* TRYING TO DESTROY ONCE REACH TOP */

        this.y -= this.dy;

    }

}
init();



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    drawPlayer();
}

function animateBullet() {
    requestAnimationFrame(animateBullet);

    for (var i = 0; i < bulletsArray.length; i++) {
        bulletsArray[i].draw();
    }

}

var count = 0;

function Start() {
    count++;
    if (_blank) {
        animateBullet();
        _blank = false;
        console.log("(Start) Function Runned : " + count);
    }
}

function drawPlayer() {
    c.beginPath();
    c.arc(mouseX, mouseY, radius, Math.PI * 2, false);
    c.fillStyle = "white";
    c.fill();
}


canvas.onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    xUi.innerHTML = mouseX;
    yUi.innerHTML = mouseY;

}


document.body.onkeypress = function (e) {
    if (e.keyCode == 32) {
        Start();
        playFx();
        gameStarted = true;
        startingX[bulletsTrack] = mouseX;
        startingY[bulletsTrack] = mouseY;

        bulletsArray.push(new Bullets(startingX[bulletsTrack], startingY[bulletsTrack], 5));

        bulletsTrack++;



        console.log("Space pressed");
        console.log("Bullet Tracking : " + bulletsTrack);
    }
}

canvas.onmouseover = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    xUi.innerHTML = mouseX;
    yUi.innerHTML = mouseY;

    animate();
}

function playFx(){
    document.getElementById("shoot-audio").play();
}