class Score{

    private div:HTMLElement;
    public score:number;
    public ammo:number;
    public time:number;
    public lives: number;

    private scorediv:Element;
    private ammodiv:Element;
    private timediv: Element;
    private livesdiv: Element;
    private endscreens: Element;

    private game:Game;
    private level: Level;

constructor() {

    this.ammodiv = document.getElementsByTagName("ammo")[0];
    this.scorediv = document.getElementsByTagName("score")[0];
    this.livesdiv = document.getElementsByTagName("lives")[0];

    this.ammo = 6;
    this.score = 0;
    this.lives = 3;

    // this.timediv = document.getElementsByTagName("time")[0];
}
    public updateScore(score:number, ammo:number, lives:number){
        this.lives += lives;
        if(this.lives == 0) {
            this.endscreen();
        }
        if(this.ammo > 0) {
            console.log(this.score, this.ammo);
            this.score += score;
            this.ammo += ammo;
            console.log(this.score, this.ammo);
            console.log("This balloon is Popped");
            this.display();
        } else {
            this.reload();
            this.display();
        }
        // document.getElementsByTagName("time")[0].innerHTML = "TIME LEFT";
    }


private display(){
        // this.timediv.innerHTML = "Score: " + this.time;
        this.scorediv.innerHTML = "SCORE: " + this.score;
        this.ammodiv.innerHTML = "BULLETS LEFT: " + this.ammo;
        this.livesdiv.innerHTML = "LIVES LEFT: " + this.lives;
    }

private endscreen(){
    
    this.ammodiv.remove();
    this.livesdiv.remove();

    let endscreen = document.createElement("endscreen")
    document.body.appendChild(endscreen);
    endscreen.innerHTML = "YOU LOST, TRY AGAIN. PRESS F5";
    

}

private reload() {
    this.ammo = 6;
    
}    
}