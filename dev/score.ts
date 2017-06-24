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
        //gets elements from the HTML code
        this.ammodiv = document.getElementsByTagName("ammo")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];

        this.ammo = 7;
        this.score = 0;
        this.lives = 3;
    }
    //updates the score UI
    public updateScore(score:number, ammo:number, lives:number){
        this.lives += lives;
        //checks if player lost
        if(this.lives == 0) {
            this.endscreen();
        }
            this.score += score;
            this.ammo += ammo;
            this.display();        
    }

    //displays the updated UI
    public display(){
        this.scorediv.innerHTML = "SCORE: " + this.score;
        this.ammodiv.innerHTML = "BULLETS LEFT: " + this.ammo;
        this.livesdiv.innerHTML = "LIVES LEFT: " + this.lives;
    }

    //endscreen, removes the UI and posts endscreen message
    private endscreen(){
        this.ammodiv.remove();
        this.livesdiv.remove();
        this.scorediv.remove();
    
        //endscreen message
        let endscreen = document.createElement("endscreen")
        document.body.appendChild(endscreen);
        endscreen.innerHTML = "GAME OVER, YOUR SCORE WAS: " + this.score;
    }
}