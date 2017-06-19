class Gun {
    
    private gun: Level;
    private score: Score;

    public div: HTMLElement;

    public ammodiv: number;

    private game: Game;


constructor() {

    
    this.div = document.createElement("gun");
    document.body.appendChild(this.div);

    
}
}