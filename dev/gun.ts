class Gun {
    
    private level:Level;
    private score:Score;
    private game: Game;

    public div: HTMLElement;
    public hitbox: HTMLElement;
    public reloading: HTMLElement;

    public ammodiv: number;
    public x: number; 
    public y: number;

    constructor(l:Level, g: Game, ammo:Score) {
        //creates gun div
        this.div = document.createElement("gun");
        l.div.appendChild(this.div);

        this.score = ammo;
        this.x = 500;
        this.y = 0;
        
        //event listener for gun
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        //first shot to start the game + create hitboxes
        this.shoot(); 
        this.update();
    }


    public update() : void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    //keyboard functionality for moving the gun
    public onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65: //A
            this.x = Math.max(-10, this.x-30);
            break;
        case 68: //D
            this.x = Math.min(1100, this.x+30);
            break;
        case 82: //R
            this.reloadAnimation();
            this.reloadSound();
            setTimeout(() => this.reload(), 800);
            setTimeout(() => this.score.display(), 1000);
            break;
        case 32: //Spacebar
            this.shoot();        
            break;
        }
    }

    //Shoot function contains sound and removes itself
    public shoot() : void {
        if (this.score.ammo > 0) {
        this.hitbox = document.createElement("gunhitbox");   
        this.div.appendChild(this.hitbox);
        this.shootSound();
        setTimeout(() => this.removeHitbox(), 100);   
        this.score.updateScore(0, -1, 0);
        }    
    }

    //Shoot sound for the gun is created
    private shootSound() {
        var shootsound = <HTMLAudioElement>document.getElementById("shoot");
        shootsound.load();
        shootsound.volume = 0.1;
        shootsound.play();
        console.log("shot sound is played");
    }

    //remove shot hitbox
    private removeHitbox(): void {
        this.hitbox.remove();
    }

    //reload sound
    private reloadSound() {
        var reloadsound  = <HTMLAudioElement>document.getElementById("reload");
        reloadsound.load();
        reloadsound.play();
    }

    //update score.ammo to 6
    public reload() {
        this.score.ammo = 6;
    }   

    //animation for reloading
    public reloadAnimation() : void {
        this.reloading = document.createElement("reloading");
        this.reloading.innerHTML = "RELOADING";
        this.div.appendChild(this.reloading);
        this.reloading.style.backgroundImage = "url(images/reload.gif)";
        setTimeout(() => this.removeAnimation(),1500);
    }

    //remove reload animation
    private removeAnimation(): void {
        this.reloading.remove();
    }
}