class Gun {
    
    private level:Level;
    private score:Score;
    private game: Game;

    public div: HTMLElement;
    public hitbox: HTMLElement;

    public ammodiv: number;
    public x: number;




constructor(l:Level, g: Game, ammo:Score) {

    this.score = ammo;
    
    console.log("create new gun");

    this.div = document.createElement("gun");
    l.div.appendChild(this.div);

    this.hitbox = document.createElement("gunhitbox");
    this.div.appendChild(this.hitbox);
    
    this.div.addEventListener("click", (e:MouseEvent) => this.onClick(e));
}

private onClick(e:MouseEvent):void {
    this.score.reload();
    this.score.display();
}
}