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

    public get display(): Score {
        return this.score;
    }
    public set display(value: Score) {
        this.score = value;
    }

    constructor(l:Level) {
        console.log("New balloon")
        this.div = document.createElement("balloon");
        l.div.appendChild(this.div);

        this.level = l;
        
        this.x = Math.ceil(Math.random() * 8) * 110;
        this.y = 1300;
        this.width = 200;
        this.height = 200;
        this.speed = Math.random() * 1 + 2; 
        this.setColor(); 
        this.update();

        this.div.addEventListener("click", (e:MouseEvent) => this.onClick(e));
        this.div.addEventListener('keydown', this.keyboardInput);
    }

    public update(): void {
        this.y -= this.speed;
        if (this.y < 200) {
            this.div.remove();
            this.level.removeBalloon(this);
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    private onClick(e:MouseEvent):void {
        // als er nog geen gun is, dan aanmaken
        console.log("This balloon is shot");

        if (this.level.display.ammo > 0){
            this.ammodiv -= 1;
            this.level.display.updateScore(+1, -1);
            this.div.remove();
        }
        else { //Geen Ammo, reload
            this.ammodiv = 6;
            this.level.display.updateScore(+6, 0);
        }

        // optioneel: listener weghalen
    }
    public remove() {
        this.div.remove();
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