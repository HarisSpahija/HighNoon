/// <reference path="balloon.ts"/>

class Level {
    public div: HTMLElement;
    public score:Score;

    public get display(): Score {
        return this.score;
    }
    public set display(value: Score) {
        this.score = value;
    }

    private balloons: Array<Balloon> = new Array<Balloon>();

    constructor() {

        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        
        // this.div.addEventListener("click", function() {
        // var canvas = document.createElement("canvas");
        // this.appendChild(canvas);

        // });


        setInterval(()=> this.createBalloon(), 1400);       

    }

    private createBalloon(): void{
        this.balloons.push(new Balloon(this));
        console.log("Het aantal ballonnen: " + this.balloons.length);
    }

    public update() : void {
        //gun

        //balloons
        for(let b of this.balloons){
            b.update();
        }
    }
  


    public removeBalloon(b:Balloon){

        let i:number = this.balloons.indexOf(b);
        if(i != -1) {
            this.balloons.splice(i, 1);
            
        }
    }
}
