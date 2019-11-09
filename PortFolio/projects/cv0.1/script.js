var canvas = document.querySelector('canvas');
var menuColor = document.getElementById("co-select");
var menuSize = document.getElementById("si-select");
var menuSpeed = document.getElementById("sp-select");
var canvasInput = document.getElementById("input-canvas");
var spawnInfo = document.getElementById("spawn-info");

canvas.width = window.innerWidth - 265;
canvas.height = window.innerHeight - 6;


var c = canvas.getContext("2d");
var circleCount = 50;
var circleArray = [];
var oneTimeCount = 4;
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2); 
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {

        if (this.x > canvas.width - this.radius || this.x - this.radius < 0) {
            this.dx = -this.dx;
        } else if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}




init();



function init(){
    animate();
    var introSkip = setTimeout(defaultSpawner, 5000);
    var introTimer = setInterval(countDown, 1000);
    console.log(canvas.width);
    document.getElementById("default-amount").innerHTML = circleCount;
}

function countDown(){
        document.getElementById("countdown-intro").innerHTML = oneTimeCount;
        oneTimeCount --;
   
}

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomColor() {
    return "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
}

/**************** EVENT ****************/

function menuHover() {
    // canvas.style.opacity = 0.5;
}

function menuHoverFalse() {
    canvas.style.opacity = 1;
}

function defaultSpawner(){
    document.getElementById("default-amount").style.display = "none";
    document.getElementById("h2-info").style.display = "none";
    document.getElementById("countdown-intro").style.display = "none";

    for (var i = 0; i < circleCount; i++) {
        var x = getRandomInt(0, canvas.width);
        var y = getRandomInt(0, canvas.height);
        var dx = (Math.random() - 0.5) * 10;
        var dy = (Math.random() - 0.5) * 10;
        var radius = 20;
        var color = generateRandomColor();
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
}
}

function colorHandler() {
    var value = menuColor.value;
    switch (value) {
        case '1':
             for (var i = 0; i < circleArray.length; i++) {
                 circleArray[i].color = generateRandomColor(0, 255);
             }
            break;
        case '2':
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].color = 'red';
            }
            break;
            case '3':
             for (var i = 0; i < circleArray.length; i++) {
                 circleArray[i].color = generateRandomColor(0, 255);
                 circleArray[i].color = 'blue';
             }
            break;
        case '4':
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].color = 'yellow';
            }
            break;
            case '5':
             for (var i = 0; i < circleArray.length; i++) {
                 circleArray[i].color = generateRandomColor(0, 255);
                 circleArray[i].color = 'green';
             }
            break;
        case '6':
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].color = 'pink';
            }
            break;
        default:
            console.log('invalid');

    }
}



function speedHandler() {
    var value = menuSpeed.value;
    switch (value) {
        case '1':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 10;
            circleArray[i].dy = (Math.random() - 0.5) * 10;
            
        }
            break;
        case '2':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 2;
            circleArray[i].dy = (Math.random() - 0.5) * 2;
           
        }
        break;
        case '3':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 4;
            circleArray[i].dy = (Math.random() - 0.5) * 4;
           
        }
            break;
            case '4':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 6;
            circleArray[i].dy = (Math.random() - 0.5) * 6;
           
        }
            break;
            case '5':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 8;
            circleArray[i].dy = (Math.random() - 0.5) * 8;
           
        }
            break;
            case '6':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].dx = (Math.random() - 0.5) * 10;
            circleArray[i].dy = (Math.random() - 0.5) * 10;
    
        }
            break;
        default:
            console.log('invalid');

    }
}


function sizeHandler() {
    var value = menuSize.value;
    switch (value) {
        case '1':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].radius = 20;
        }
            break;
        case '2':
        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].radius = 10;
        }
            break;
            case '3':
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].radius = 30;
            }
                break;
                case '4':
                for (var i = 0; i < circleArray.length; i++) {
                    circleArray[i].radius = 40;
                }
                    break;
        default:
            console.log('invalid');

    }
}

function canvasResizeHandler(){
    circleCount = canvasInput.value;
    c.clearRect(0,0, innerWidth, innerHeight);
for (var i = 0; i < circleCount; i++) {
    var x = getRandomInt(0, canvas.width);
    var y = getRandomInt(0, canvas.height);
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var radius = 20;
    var color = generateRandomColor();
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
}
}

function skipIntro(){
    clearTimeout(introSkip);
    defaultSpawner();
}