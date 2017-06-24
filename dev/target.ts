class Target {
    
    private level:Level;
    public score:Score;
    private game: Game;
    
    public div: HTMLElement;
    public hitbox: HTMLElement;
    private sound: HTMLElement;

    public points: number;
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

    constructor(l: Level, points: number) {

        //target gets created
        this.div = document.createElement("target");
        l.div.appendChild(this.div);

        //target values
        this.level = l;
        this.score = this.level.score;
        this.points = points;
        this.y = Math.ceil(Math.random() * 500) + 418;
        this.x = -200;
        this.width = 200;
        this.height = 200;
        //multiplier makes it harder during progress
        let multiplier = (this.score.score/10) + 0.2;
        this.speed = this.y/300 * multiplier;

        //target functions
        this.setColor(); 
        this.move();

    }
    
    public move(): void {
        //targets get moved
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    
    public remove() : void {
        //target gets removed
        //sound uppon pop 
        let sound  = <HTMLAudioElement>document.getElementById("balloonpop");
        sound.volume = 0.2;
        sound.play();
        this.div.remove();        
        this.div = undefined;
    }


    private setColor() {
        //random color is generated for all targets
    let color:number = Math.random()*360; 
    this.div.style.webkitFilter = "hue-rotate("+color+"deg)";
    this.div.style.filter = "hue-rotate("+color+"deg)";
    }

}

//Balloon moved due compile errors
class Balloon extends Target{

    constructor(l: Level){
        super(l, 1);

                this.div.classList.add("balloon");
                this.hitbox = document.createElement("balloonhitbox");
                this.div.appendChild(this.hitbox);

        }
}

//Cat moved due compile errors
class Cat extends Target{

    constructor(l:Level){
        super(l, 0);

                this.div.classList.add("cat");
                this.hitbox = document.createElement("cathitbox");
                this.div.appendChild(this.hitbox);

        }
}

//Zenyatta moved due compile errors
class Zenyatta extends Target{

    constructor(l:Level){
        super(l, -1);
                this.div.classList.add("zenyatta");
                this.hitbox = document.createElement("zenyattahitbox");
                this.div.appendChild(this.hitbox);
    	}
}
