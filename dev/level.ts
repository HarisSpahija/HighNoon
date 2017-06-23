/// <reference path="balloon.ts"/>

class Level {
    private game:Game;
    private gun: Gun;
    private score:Score;
    private ammo:Score;
    
    public div: HTMLElement;
    public create: number;



    public get display(): Score {
        return this.score;
    }
    public set display(value: Score) {
        this.score = value;
    }

    private balloons: Array<Balloon> = new Array<Balloon>();
    
    constructor() {
        this.score = new Score();
        
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        
        this.gun = new Gun(this, this.game, this.score);

        this.create = setInterval(()=> this.createBalloon(), 1400);  
        
    }

    private createBalloon(): void{
        if(this.score.lives <= 0) {
            clearInterval(this.create);
        }
        this.balloons.push(new Balloon(this,this.game, this.score));
        console.log("Het aantal ballonnen: " + this.balloons.length);
        
    }

    public update() : void {
        if(this.score.lives > 0) {
            //balloons
            for(let b of this.balloons){
                if(b){
                    b.update();
                    if(Util.checkCollision(b.hitbox, this.gun.hitbox)){
                        if (this.score.ammo > 0) {
                            console.log("This balloon hit wall");
                            this.score.updateScore(1, -1, 0);
                            this.removeBalloon(b);
                            break;
                        }
                    }
                    else if (b.x > 1300) {
                    this.score.updateScore(0, 0, -1);   
                    this.removeBalloon(b);
                    break;
                    }
                }
            }        
        } 

    }
  


    public removeBalloon(b:Balloon){
        let i:number = this.balloons.indexOf(b);
        if(i != -1) {
            this.balloons.splice(i, 1);
            b.remove();
        }
    }

    public removeBalloonAll(b:Balloon){

        //Remove all entities
    }
}
