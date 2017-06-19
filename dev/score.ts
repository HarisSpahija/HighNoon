class Score{
    public score:number;
    public ammo:number;
    public time:number;

    private scorediv:Element;
    private ammodiv:Element;
    private timediv: Element;

    private game:Game;


constructor() {

    this.ammodiv = document.getElementsByTagName("ammo")[0];
    this.scorediv = document.getElementsByTagName("score")[0];

    this.ammo = 6;
    this.score = 0;
    // this.timediv = document.getElementsByTagName("time")[0];
}
    public updateScore(score:number, ammo:number){

        document.getElementsByTagName("score")[0];
        document.getElementsByTagName("ammo")[0];
        // document.getElementsByTagName("time")[0].innerHTML = "TIME LEFT";

        this.score += score;
        this.ammo += ammo;
        this.display()
        //check wincondition
    }


private display(){
        // this.timediv.innerHTML = "Score: " + this.time;
        this.scorediv.innerHTML = "Lives: " + this.score;
        this.ammodiv.innerHTML = "Clicks left: " + this.ammo;
    }
}