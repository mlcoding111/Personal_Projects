var canvas = document.querySelector('canvas');
var followInfo = document.getElementById("follow-info");
var infoText = document.getElementById("info-text");

canvas.height = window.innerHeight - 20;
canvas.width = window.innerWidth - 20;



/**********************************  VARIABLE DECLARATION  *****************************************/
/***************************************************************************************************/

var ctx = canvas.getContext("2d");
var c = canvas.getContext('2d');
var jumpAudio = new Audio();
var shootingAudio = new Audio();


var _blank = true;
var radius = 30;
var leftPressed = false;
var rightPressed = false;
var sideForce = 6;
var Jump = false;
var Force = 15;
var G = .4;
var isOnGround = false;
var gameStarted = false;
var collide = false;
var globalGameStarted = false;
var blockWidth = 250;
var blockHeight = 125;
var blocksCount = 0;
var bulletsTrack = 0;
var blockSpeed = 4;
var blockSenderTime = 1500; /* 1.5s */
var blockSenderTimer;
var shooting = false;
var bulletsCollide = false;
var collider = [];
/* Arrays */
var blocks = [];
var bulletsArray = [];
var startingX = [];
var startingY = [];

var speed = 5;

var transColor = "rgba(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + 0 + ")";
spawnerX = canvas.width - blockWidth;
spawnerY = canvas.height - blockHeight;

/********************************** PRINCIPAL FUNCTION ****************************************/
/**********************************************************************************************/

ctx.save();
ctx.rotate(20 * Math.PI / 180);
ctx.fillRect(50, 20, 100, 50);
ctx.restore();

function Player(x, y, radius, force) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.force = force;
    var executed = false;

    var bounceCount = 0;
    var bounceTrigger = false;
    var dx = 3;
    var dy = 100;

    this.draw = function () {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        c.beginPath();
        c.arc(this.x, this.y, radius, Math.PI * 2, false);
        c.fillStyle = "white";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "red";

        c.stroke();
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].update();
        }

    }

    this.update = function () {

        /* JUMP & FALL HANDLER */
        if (Jump) {
            isOnGround = false;
            this.y -= this.force;
            this.force -= G;
        } else {
            this.y += 3;
            this.force = Force;
        }


        /* FLOOR */
        if (this.y + radius > canvas.height) {
            this.y = canvas.height - radius;
            Jump = false;
            isOnGround = true;



            /* BOUNCING */
            /*
                        if(bounceCount < 3){
                            Jump = true;
                            bounceCount++;
                        }else if (bounceCount === 3){
                           Jump = false;
                           bounceCount = 0;
                        }           
                        
                        bounceTrigger = true;
                        */
        }


        /* MOVING SIDEWAYS */
        if (leftPressed) {
            this.x -= sideForce;

        }
        if (rightPressed) {
            this.x += sideForce;
        }

        this.draw();
    }
}

function Spawner(x, y, w, h, dx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;

    var _color = generateRandomColor();

    this.move = function () {

        /* Rebounce .. Only left Working 
        if(this.x / blockWidth <= 0){
            this.dx = -this.dx;
        }else if(this.x >= 1900){
           this.dx = +this.dx;
           console.log('run');        }
         */

        this.x -= this.dx;
    }

    this.setRandomColor = function () {

    }

    this.draw = function () {

        c.beginPath();
        c.lineWidth = "3";


                if(collide){
                    c.fillStyle = _color;
                    c.rect(this.x, this.y, this.w, this.h);
                    c.fill();
                }else{
                    c.strokeStyle = _color;
                    c.rect(this.x, this.y, this.w, this.h);
                    c.stroke();
            
        }
        
             /* Collision detection & drawing */
    
    } 
      
    

    this.update = function () {
        /* Variables Player */
        var dx = this.x - Kenny.x - radius;
        var dy = this.y - Kenny.y - radius;
        /* Variable Bullets */
      
        /* Detecting Collision Player */
        if (dx < 0 && dx > -blockWidth - radius * 2 && dy < 0) {
            collide = true;

        } else {
            collide = false;
        }
        /* Remove Blocks OnLeave */
        if (this.x + blockWidth < 0) {
            blocks.splice(0, 1)
            blocksCount--;
        }
        this.draw();

    }

}


function Bullets(x, y, dy, w, h) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.w = w;
    this.h = h;
    var dx;
    var selfCollide = false;
    this.draw = function () {

        c.rect(this.x, this.y - radius * 2, w, h);
        c.strokeStyle = "yellow";
        c.fillStyle = "black";
        c.fill();
        c.stroke();


    }


    this.update = function () {
        this.draw();
        if (bulletsArray.length > 0) {
            for (var i2 = 0; i2 < blocks.length; i2++) {

                for (var i = 0; i < bulletsArray.length; i++) {
                    this.dx = this.x - blocks[i2].x;
                           /* Bullets Collision */
                if (this.dx >= 0 && this.dx < blocks[i2].w) {
                    console.log('collide');
                    this.selfCollide = true;          
                }else {
                  
                    console.log('do not collide');
                    this.selfCollide = false;
                }

                }
             
            }
        }


        console.log(this.dx);
        /* TRYING TO DESTROY ONCE REACH LEFT */

        if (this.x >= canvas.width) {
            var destroyedB = bulletsArray.length;
            bulletsArray.splice(0, 1)
            /*  bulletsArray.pop(); */
            console.log('Destroyed Bullets Number : ' + destroyedB);
            console.log(bulletsTrack);
            bulletsTrack--;
            if (bulletsArray.length === 0) {
                shooting = false;
                console.log("Shooting : false");
            }

        }
        this.x += this.dy;

    }

}



function Gun(h, w, x, y) {

    this.h = h;
    this.w = w;
    var selfX = Kenny.x - Kenny.radius / 2;
    var selfY = Kenny.y - Kenny.radius / 2;

    this.gunShoot = function () {

    }

    this.drawGun = function () {
        c.beginPath();
        c.lineWidth = 3;
        c.fillStyle = "black";
        c.rect(selfX, selfY, this.w, this.h);
        c.fill();
        c.beginPath();
        c.rect(selfX, selfY + this.h - 5, 14, 17);
        c.fillStyle = "black";
        c.fill();
    }

    this.gunUpdate = function () {

        selfX = Kenny.x - Kenny.radius / 2 + 20;
        selfY = Kenny.y - Kenny.radius / 2 + 5;
        this.x = selfX + radius;
        this.y = selfY + radius * 2 + 5;
        this.drawGun();
    }
}

/* Function that run Once 

var test = function () {
    if (!executed) {
        bounceCount++;
        executed = true;
    }
}

*/
function Init() {
    jumpAudio.src = "fx/jumping4.wav";
    shootingAudio.src = "fx/laser.wav";
    animate();
    animateBlocks();
}



/* DECLARING PLAYER */

var Kenny = new Player(canvas.width / 2, canvas.height / 2, radius, Force);
blocks.push(new Spawner(canvas.width - blockWidth, canvas.height - blockHeight, blockWidth, blockHeight, blockSpeed));
var gun = new Gun(13, 50);
/* INITIALIZING */

Init();


/*      THIS IS THE CORE OF THE PROGRAM      */



/**********************************  ANIMATE  *****************************************/
/**********************************           *****************************************/

function animateBullets() {
    requestAnimationFrame(animateBullets);
    for (var i = 0; i < bulletsArray.length; i++) {
        bulletsArray[i].update();

    }

}

function animateBlocks() {
    requestAnimationFrame(animateBlocks);
    if (gameStarted) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].move();
        }

    }
}

function animate() {
    requestAnimationFrame(animate);
    /* Initiate Game */

    /******** Update Player *********/
    Kenny.update();
    gun.gunUpdate();

    /* Print Customs Info */

    printInfo();
}

var randBlockWidth = Math.floor(Math.random() * Math.floor(50) + 200);
var randBlockHeight = Math.floor(Math.random() * Math.floor(50) + 100);

function printInfo() {
    /* Ball X & Y */
    infoText.innerHTML = "x : " + Kenny.x + "| " + "y : " + Kenny.y.toFixed(0) + "<br>";
    /* Ball isOnGround value */
    infoText.innerHTML += "isOnGround = " + isOnGround + "<br>";
    /* Block X */
    if (blocksCount >= 0) {
        infoText.innerHTML += "Current Block X : " + blocks[blocksCount].x + "<br>";
    }

    /* Canvas.Width */
    infoText.innerHTML += "Canvas.Width : " + canvas.width + "<br>";
    infoText.innerHTML += randBlockWidth + "." + randBlockHeight;
    /* Blocks Tracking */
    document.getElementById("block-count").innerHTML = "Blocks Tracking : " + blocksCount;


}

/**********************************  EVENT LISTENER  *****************************************/
/**********************************************************************************************/

function keyDownListener(e) {

    switch (e.which) {
        case 37:
            leftPressed = true;
            break;
        case 65:
            leftPressed = true;
            break;
        case 39:
            rightPressed = true;
            break;
        case 68:
            rightPressed = true;
            break;
        case 32:
            Jump = true;
            playJumpFx();
            break;
            /* SHOOTING WITH ' E ' */
        case 69:
            bulletsArray.push(new Bullets(gun.x + 20, gun.y, speed));
            bulletsTrack++;
            playShootFx();
            Start();
            /*
                       if (gameStarted) {

                           blocks.push(new Spawner(canvas.width - blockWidth, canvas.height - blockHeight, blockWidth, blockHeight, 5));
                           blocksCount++;

                       } */
            break;

    }
}

function keyUpListener(e) {
    switch (e.which) {
        case 37:
            leftPressed = false;
            break;
        case 65:
            leftPressed = false;
            break;
        case 39:
            rightPressed = false;
            break;
        case 68:
            rightPressed = false;
            break;
    }
}

document.addEventListener("keydown", function (e) {
    console.log(e.which);
    console.log(e.keyCode);
    if (e.which == 69) {


    }
});

function keyPressListener(e) {

}

function startGame() {
    gameStarted = true;
    setInterval(sendBlocks, blockSenderTime);
}

function Start() {

    if (_blank) {
        animateBullets();
        _blank = false;
        console.log('run');
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function playShootFx() {
    shootingAudio.play();
}

function playJumpFx() {
    if (isOnGround) {
        jumpAudio.play();
    }

}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomColor() {
    return "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
}
/*
document.addEventListener("click", function(){
  
    bulletsArray.push(new Bullets(gun.x +20, gun.y, speed));
    bulletsTrack++;
    playShootFx();
    Start();    
    if(gameStarted){
       
        blocks.push(new Spawner(canvas.width - blockWidth, canvas.height - blockHeight, blockWidth, blockHeight, 5));
        blocksCount++;
      
    }
    
});
*/


function sendBlocks() {

    var randBlockWidth = Math.floor(Math.random() * Math.floor(75) + 200);
    var randBlockHeight = Math.floor(Math.random() * Math.floor(100) + 100);
    blocks.push(new Spawner(canvas.width - randBlockWidth, canvas.height - randBlockHeight, randBlockWidth, randBlockHeight, blockSpeed));
    blocksCount++;

}

document.addEventListener("mousedown", function () {

    bulletsArray.push(new Bullets(gun.x + 20, gun.y, speed, 20, 5));
    bulletsTrack++;
    shooting = true;
    playShootFx();
    Start();

});

document.addEventListener("keydown", keyDownListener, false);
document.addEventListener("keyup", keyUpListener, false);
document.addEventListener("keypress", keyPressListener, false);


/**********************************************************************************************/