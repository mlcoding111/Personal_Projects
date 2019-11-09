var _X = document.getElementById("pos-x");
var _Y = document.getElementById("pos-y");

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 15;
canvas.height = window.innerHeight - 20;

var c = canvas.getContext("2d");


var info = document.getElementById("info");
var load = document.getElementById("loading");
var lodWrap = document.getElementById("loading-wrap");

var te = 0;
var blue = 0;
var yellow = 0;

var fillLoading = setInterval(changeBackground, 15);
var isDown = false;
init();
function startLoading(){
    isDown = true;
}


function timer_stop() {
    clearInterval(fillLoading);
  }

function changeBackground(){
    if(isDown){
        info.innerHTML = blue + "%";
        load.style.background = "linear-gradient(to right, green " + blue + "%, white 0%)"
        if(blue >= 100){
            info.innerHTML = "Loading 100%";
            info.style.textAlign = "center";
        }
        else{
            blue++;
        }
        
    }
    else if(!isDown){
        blue = 0;
        load.style.background = 'white';       
    }
    
}

window.addEventListener('mousemove', function(e){
    _X.innerHTML = e.x;
    _Y.innerHTML = e.y;
    _Y = e.y - (radius * 2);
    _X = e.x - (Math.PI * 2);
});

function init(){
   
}

load.addEventListener("mouseover", startLoading);
load.onmouseout = function() { isDown = false; info.innerHTML = "";}