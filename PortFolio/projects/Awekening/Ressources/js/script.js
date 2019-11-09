var elem = document.querySelector(".others-photo");

document.addEventListener("click", function(e){
    if(e.target == elem){
        console.log('click');
    }
   
});

elem.onclick = function(){
    alert("yea");
}