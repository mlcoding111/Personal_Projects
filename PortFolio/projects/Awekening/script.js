var y = window.scrollY;
var c = document.getElementById("scroll-container");
var p = document.getElementById("progress");

var navToggle = document.getElementById("hide-option");
var showOption = document.getElementById("show-option");
var mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", toggleOFF);
showOption.addEventListener("click", toggleON);



setInterval(handleBar, 50);
function handleBar(){
    y = window.scrollY;
    var scroll = (y / document.documentElement.scrollHeight) * 130;
    c.style.height = document.documentElement.scrollTop - document.documentElement.clientHeight;
    p.style.height = scroll + "%";
    p.innerHTML = Math.round(scroll) + "%";
    /*
      console.log( "Scroll Height : " + document.documentElement.scrollHeight);    
      console.log( "Client Height : " + document.documentElement.clientHeight); 
      console.log( "Scroll top : " + document.documentElement.scrollTop);
      console.log(y);   
    */
}

function toggleOFF(){
   if(navToggle.style.display != "none"){
     /*
      mainNav.style.display = "none";
      */
     mainNav.style.opacity = "0";
     showOption.style.display = "block";
   }
}

function toggleON(){
  if(mainNav.style.opacity == "0"){
    /*
    mainNav.style.display = "flex";
    */
   mainNav.style.opacity = "1";
    showOption.style.display = "none";   
  }else{
 
  }
   
}
console.log('%c yea', 'color:red; font-weight:bold;');

/* background: linear-gradient(to top, #ffffff 50%, #c42929 50%); */
