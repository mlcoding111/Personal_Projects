
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
