
/* MEDIA-PLAYER */
var media_sound = new Audio();
var media_text = document.querySelector(".now-playing");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var stop = document.getElementById("stop");

var yo = new sound("Always - Peder B.Helland.mp3");
media_text.innerHTML = yo.name;


function sound(src){
   stop.style.display = "none";
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
   pause.style.color = stop.style.color;
    play.style.color = "red";
  }

  this.stop = function(){
    this.sound.pause();
    play.style.color = pause.style.color;  
    pause.style.color = "red";  
  }
  
  this.next = function(){
     
  }
  this.name = src;
}


/* Date */
var elem = document.getElementById("time");
var today = new Date();
elem.innerHTML = today.getHours() +":" + today.getMinutes()+ ":" +today.getSeconds();

setInterval(setDate, 1000);

function setDate(){
   /* Initialize new date */
    today = new Date();
    var am = false;
    var pm = false;

     /* AM / PM */
     if(today.getHours < 12){
        am = true;
        pm = false;
     }else{
        pm = true;
        am = false;
     }
            /* New method of printing AM/PM */

     var hey = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
     elem.innerHTML = hey;


     /*        OLD METHOD FOR AM/PM NOT SHOWING    
     if(am){
        if(today.getMinutes() < 10){
            elem.innerHTML = today.getHours() +":" + "0" + today.getMinutes()+  ":" +today.getSeconds() + " am";
         }else{
            elem.innerHTML = today.getHours() +":" + today.getMinutes()+  ":" +today.getSeconds() + " am";; 
         }   
      
     }else if(pm){
        if(today.getMinutes() < 10){
            elem.innerHTML = today.getHours() +":" + "0" + today.getMinutes()+  ":" +today.getSeconds() + " pm";
         }else{
            elem.innerHTML = today.getHours() +":" + today.getMinutes()+  ":" +today.getSeconds() + " pm";; 
         }   
     }
     

   */
  
}


