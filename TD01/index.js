const canvas = document.getElementById("gameScreen1");
const canvas2 = document.getElementById("gameScreen2");
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
let debug = document.getElementById("test");
let shootingAudio = new Audio();
shootingAudio.src = "laser.wav"
resizeGameScreen();

document.body.style.cursor = "crosshair";

const middleScreenX = canvas.innerWidth / 2;
const middleScreenY = canvas.innerHeight / 2;
// Mouse variable
let mouse = {
    x: 0,
    y: 0
}

// Base variables
let baseHeight = 75;
let baseWidth = 75;
let baseX = canvas.width / 2 - baseWidth / 2;
let baseY = canvas.height / 2 - baseHeight / 2;

// Canon variable
let canonHeight = 75;
let canonWidth = 15;
let canonX = canvas.width / 2 - canonWidth / 2;
let canonY = canvas.height / 2 - canonHeight;
let deG;

// Spawner variables 
var x = getRandomInt(0, 1920);
var y = getRandomInt(0, 1080);
let speed = 2;
var canonRotation;
var triggerRotation;
var targetX;
var targetY;
var fire = false;

function Base(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.draw = function () {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.rect(baseX, baseY, baseWidth, baseHeight);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();


    }
    this.update = function () {
        this.draw();

    }
}

function Canon(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.degree;
    this.draw = function () {
        ctx2.clearRect(0, 0, innerWidth, innerHeight);
        drawRotateRect(this.x, this.y, canonWidth, canonHeight, this.degree, this.color);

    }
    this.update = function () {
        this.draw();
        let radian = Math.atan2(mouse.x - this.x, mouse.y - this.y);
        let rot = (radian * (180 / Math.PI) * -1) + 180;
        this.degree = rot;
        canonRotation = rot;
    }
}


function Entities(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx;
    this.dy;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        /* console.log('circle spawned'); */
    }

    this.update = function () {
        this.draw();
        // Pull Entites towards middle
        this.dx = baseX + baseWidth / 2 - this.x;
        this.dy = baseY + baseHeight / 2 - this.y;
        var pct = 0.5;
        this.x = this.x + this.dx * pct / 100;
        this.y = this.y + this.dy * pct / 100;
        /*
        if(ent.length > 3){
            ent.splice(0, 1);
        }
        */

    }
}


function Bullet(x, y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 50;
    this.dx;
    this.dy;
    this.targetX;
    this.targetY;
    this.triggerRotation;

    this.draw = function () {
       
       drawRotateRect(this.x, this.y + baseWidth / 2, this.width, this.height, this.triggerRotation, "red");
    }
    this.update = function () {
        this.draw();       

        if(fire){
            this.dx = this.targetX - this.x;
            this.dy = this.targetY - this.y;
            var pct = 2;
            this.x = this.x + (this.dx * pct / 100) -0.5;
            this.y = this.y + (this.dy * pct / 100) -0.5;
            
           // debug.innerHTML = Math.round(this.x) + " || " + targetX;
           // debug.innerHTML = Math.round(this.x + 25) + " || " + targetX;
            if(Math.round(this.x + 25) === this.targetX){
                console.log("yes");
                bullets.splice(0,1);
            }
            /*
            if(this.dx > 10){
                console.log("destination");
                bullets.splice(0,1);
            }*/
        }

        ent.forEach(element => {
            if(element.x < this.x + this.width && element.x + element.width > this.x &&
               element.y < this.y + this.height && element.y + element.height > this.y ){
                    console.log("Collide");
            }
        });
    }

    
}

/*
let bullets = new Bullet(canonX, canonY);
*/
let bullets = [];
let base = new Base(baseX, baseY, baseWidth, baseHeight, "rgb(44, 43, 43)");
let canon = new Canon(canonX, canonY, canonWidth, canonHeight, "rgb(53, 53, 207)");

let ent = [];



animate();

function animate() {
    base.update();
    canon.update();
    if(bullets.length > 0){
        bullets.forEach(element => {
            element.update();
        });
    }
    ent.forEach(element => {
        element.update();
    });
    requestAnimationFrame(animate);
}
/*
setInterval(function(){
    ent.splice(0, 1);
}, 2000);
*/
setInterval(function () {
    x = Math.floor(Math.random() * 1920);
    y = Math.floor(Math.random() * 1080);
    console.log(ent.length);
    ent.push(new Entities(x, y, 25, generateRandomColor()));

    /*
    ent.forEach(element => {
        if(element.dx < 9 && element.dy < 9){         
                ent.splice(0, 1);
        } 
    });

    */

}, 1500);

/*
var x = Math.floor(Math.random() * 1920);
    var y = Math.floor(Math.random() * 1080);
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.stroke();
    console.log('circle spawned');
*/
function resizeGameScreen() {
    canvas.width = innerWidth - 10;
    canvas.height = innerHeight - 20;
    canvas2.width = innerWidth - 10;
    canvas2.height = innerHeight - 20;
}

function drawRotateRect(x, y, width, height, degrees, color) {
    // first save the untranslated/unrotated context
    ctx2.save();

    ctx2.beginPath();
    // move the rotation point to the center of the rect
    ctx2.translate(x + width / 2, y + height / 2 * 2);
    // rotate the rect
    ctx2.rotate(degrees * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    /* ctx.rect(-width / 2, -height / 2, width, height); */
    ctx2.rect(-width / 2, -height, width, height);
    ctx2.fillStyle = color;
    ctx2.fill();

    // restore the context to its untranslated/unrotated state
    ctx2.restore();

}


function getMousePos(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomColor() {
    return "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
}



document.addEventListener("mousemove", getMousePos);

window.addEventListener("resize", resizeGameScreen);

window.addEventListener("click", function(){
    shootingAudio.play();
    bullets.push(new Bullet(canonX, canonY));
    lastElem = bullets[bullets.length - 1];
    targetX = mouse.x;
    targetY = mouse.y - 75;
    triggerRotation = canonRotation;
    lastElem.targetX = targetX;
    lastElem.targetY = targetY;
    lastElem.triggerRotation = triggerRotation;

    fire = true;
    
    console.log(mouse.x +"." + mouse.y);
   
});

canvas2.onmousemove = function (e) {
    ent.forEach(element => {

    });
}

/*
document.addEventListener('mousemove', smartRotate);

let base = document.getElementById("base");

function smartRotate(){
    var canon = document.querySelector("#canon");
        let x = canon.getBoundingClientRect().left + (canon.clientWidth / 2 );
        let y = canon.getBoundingClientRect().top + (canon.clientHeight/ 2 );
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 0;
        canon.style.transform = "rotate(" + rot + "deg)";
        canon.style.left -= "120px";
        canon.style.top -= "120px";
        console.log('working');

}

*/