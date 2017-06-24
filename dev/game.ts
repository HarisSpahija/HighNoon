class Game {
    
    private level:Level;
    private startUI: Element;
    public menusound: Element;

    public score: HTMLElement;
    public ammo: HTMLElement;
    public lives: HTMLElement;
     
    constructor() {
        //click to start the game
        this.startUI = document.getElementsByTagName("start")[0]; 
        this.startUI.addEventListener("click", (e:MouseEvent) => this.onClick(e));

        //music gets created
        var menusound  = <HTMLAudioElement>document.getElementById("menu");
        menusound.volume = 0.2;
        menusound.play();
        menusound.loop = true;
    }

    private onClick(e:MouseEvent):void{
        //start screen gets removed
        this.startUI.remove();

        //elements for ui are created
        this.score = document.createElement("score");
        this.score.innerHTML = "SCORE: 0";
        this.ammo = document.createElement("ammo");
        this.ammo.innerHTML = "BULLETS LEFT: 6";
        this.lives = document.createElement("lives");
        this.lives.innerHTML = "LIVES LEFT: 3";

        //animation frame binds gameloop and creates new level class
        requestAnimationFrame(this.gameLoop.bind(this));
        this.level = new Level();
    }
    
    //Game loop updates the game in 60hz
    private gameLoop(){
        
        this.level.update();      
        requestAnimationFrame(this.gameLoop.bind(this));
    }
} 

window.addEventListener("load", function() {
    new Game();
});



