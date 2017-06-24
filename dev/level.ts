/// <reference path="target.ts"/>

class Level {
    private game:Game;
    private gun:Gun;
    public score:Score;
    private ammo:Score;
    private rand:number;

    public private: number;
    
    public div: HTMLElement;
    public create: number;

    public get display(): Score {
        return this.score;
    }
    public set display(value: Score) {
        this.score = value;
    }
    //array for targets
    private targets: Array<Target> = new Array<Target>();
    
    constructor() {
        //Level div gets created
        this.div = document.createElement("level");
        document.body.appendChild(this.div);

        //Classes for level are created (score and gun)
        this.score = new Score();
        this.gun = new Gun(this, this.game, this.score);

        //New target created
        this.create = setInterval(()=> this.createTarget(), 1400);  
    }
    
    //Creates array and pushes new targets
    private createTarget(): void{
        this.rand = Math.random();
        //checks if the player is still able to play
        if(this.score.lives <= 0) {
            clearInterval(this.create);
        }
        //randomizer selects next target
        if(this.rand < 0.94) {
            this.targets.push(new Balloon(this));
            console.log("Balloon push");
        } else if(this.rand < 0.99) {
            this.targets.push(new Zenyatta(this));
            console.log("Zenyatta push");
        } else {
            this.targets.push(new Cat(this));
            console.log("Cat push");
        }
    }

    //Updates the game
    public update() : void {

        this.gun.update();
        if(this.score.lives > 0) {
            //targets forloop
            for(let t of this.targets){
                if(t){
                    t.move();
                    //check if there is collision between bullet and target
                    if(Util.checkCollision(t.hitbox, this.gun.hitbox)){
                        if(t.hitbox.tagName == "cathitbox"){
                            this.score.updateScore(0, 0, -1000);
                        }
                            this.score.updateScore(t.points, 0, 0);
                            this.removeTarget(t);
                            break;
                    }
                    else if (t.x > 1300) {
                    t.points = 0-t.points;
                    this.score.updateScore(0, 0, t.points);   
                    this.removeTarget(t);
                    break;
                    }
                }
            }        
        } 

    }
  
    public removeTarget(t:Target){
        let i:number = this.targets.indexOf(t);
        if(i != -1) {
            this.targets.splice(i, 1);
            t.remove();
        }
    }

}
