var playerBase = document.getElementById("playerBase");
var playerCanon = document.getElementById("playerCanon");
const visual = document.querySelector('.visual');
//Mouse variables
var mouse = {
    x: 0,
    y: 0
}

animate();



function animate(){
    smartRotate();
    requestAnimationFrame(animate);
    
}
spawnBubbles();

function spawnBubbles(){
    const bubble = document.createElement("div");
    bubble.id = "bubbles";
    visual.appendChild(bubble);
    bubble.style.backgroundColor = "red";
    bubble.style.animation = "jump 1s ease";
}


function smartRotate(){
    var canon = document.querySelector("#playerCanon");
        let x = canon.getBoundingClientRect().left + (canon.clientWidth / 2 );
        let y = canon.getBoundingClientRect().top  + (canon.clientHeight / 2 );
        let radian = Math.atan2(mouse.x - x, mouse.y - y);
        let rot = (radian * (180 / Math.PI) * -1) + 180;
        canon.style.transform = "rotate(" + rot + "deg)";
        canon.style.left -= "120px";
        canon.style.top -= "120px";
}

document.addEventListener("mousemove", function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

document.addEventListener("click", function(e){
    const bullet = document.createElement("div");
    bullet.id = "bullets";
    visual.appendChild(bullet);   
    var canon = document.querySelector("#playerCanon");
        let x = canon.getBoundingClientRect().left + (canon.clientWidth / 2 );
        let y = canon.getBoundingClientRect().top  + (canon.clientHeight / 2 );
        let radian = Math.atan2(mouse.x - x, mouse.y - y);
        let rot = (radian * (180 / Math.PI) * -1) + 180;
        bullet.style.transform = "rotate(" + rot + "deg)";
        bullet.style.animation = "shoot 1s ease";

        bullet.addEventListener('animationend', function(){
            visual.removeChild(this);
          });
        
});