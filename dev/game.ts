class Game {
    
    private level:Level;
     
    constructor() {
        this.level = new Level();   
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    private gameLoop(){
        this.level.update();      
        requestAnimationFrame(this.gameLoop.bind(this));
    }
} 

window.addEventListener("load", function() {
    new Game();
});


