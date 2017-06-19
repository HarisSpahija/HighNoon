class Balloon {
    
    private level:Level;
    private score:Score;
    
    public div: HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number = 0;
    public ammodiv: number;
    private game: Game;

    public get display(): Score {
        return this.score;
    }
    public set display(value: Score) {
        this.score = value;
    }

    constructor(l:Level, g: Game, score:Score) {
        console.log("New balloon")
        this.div = document.createElement("balloon");
        l.div.appendChild(this.div);

        this.score = score;
        this.level = l;
        this.game = g;
        this.y = Math.ceil(Math.random() * 500) + 418;
        this.x = -200;
        this.width = 200;
        this.height = 200;
        this.speed = Math.random() * 1 + 2; 
        this.setColor(); 
        this.update();

        this.div.addEventListener("click", (e:MouseEvent) => this.onClick(e));
        this.div.addEventListener('keydown', this.keyboardInput);
    }

    public update(): void {
        this.x += this.speed;
        if (this.x > 1300) {
            this.score.updateScore(0, 0, -1);   
            this.remove();
        } else {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        }
}

    private onClick(e:MouseEvent):void {
        
        console.log("This balloon is Popped");
        this.score.updateScore(1, -1, 0);
        this.remove();

    }

    public remove() : void {
        this.div.remove();        
        this.div.removeEventListener("click", (e:MouseEvent) => this.onClick(e));
        this.div.removeEventListener('keydown', this.keyboardInput);
        this.div = undefined;
        this.level.removeBalloon(this);
    }
    
    private keyboardInput(event: KeyboardEvent) {
        if (event.keyCode == 82) {
            console.log("R is pressed, reloading...");
        }
    }

    private setColor() {
    let color:number = Math.random()*360; 
    this.div.style.webkitFilter = "hue-rotate("+color+"deg)";
    this.div.style.filter = "hue-rotate("+color+"deg)";
    }

}