var dateText = document.getElementById("current-time");
var time = new Date();

var backgroundMusic = new Audio();
backgroundMusic.src = "fx/op.mp3";

Init();

function Init(){

    backgroundMusic.play();
    setTime();
    setInterval(setTime, 1000);
    
}

function setTime(){
    console.log('time set');
   
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
    if(minutes < 10){
        dateText.innerHTML = hours + ":" + 0 + minutes;
    }else{
        dateText.innerHTML = hours + ":" + minutes;
    }
   
}

screen.orientation.lock('portrait').catch(function(error) {
    console.log('error');// whatever
});