var Balloon = (function () {
    function Balloon(l, g, score) {
        var _this = this;
        this.speed = 0;
        console.log("New balloon");
        this.div = document.createElement("balloon");
        l.div.appendChild(this.div);
        this.score = score;
        this.level = l;
        this.game = g;
        this.y = Math.ceil(Math.random() * 500) + 418;
        this.x = -200;
        this.width = 200;
        this.height = 200;
        this.speed = Math.random() * 1 + 2;
        this.setColor();
        this.update();
        this.div.addEventListener("click", function (e) { return _this.onClick(e); });
        this.div.addEventListener('keydown', this.keyboardInput);
    }
    Object.defineProperty(Balloon.prototype, "display", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Balloon.prototype.update = function () {
        this.x += this.speed;
        if (this.x > 1300) {
            this.score.updateScore(0, 0, -1);
            this.remove();
        }
        else {
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        }
    };
    Balloon.prototype.onClick = function (e) {
        console.log("This balloon is Popped");
        this.score.updateScore(1, -1, 0);
        this.remove();
    };
    Balloon.prototype.remove = function () {
        var _this = this;
        this.div.remove();
        this.div.removeEventListener("click", function (e) { return _this.onClick(e); });
        this.div.removeEventListener('keydown', this.keyboardInput);
        this.div = undefined;
        this.level.removeBalloon(this);
    };
    Balloon.prototype.keyboardInput = function (event) {
        if (event.keyCode == 82) {
            console.log("R is pressed, reloading...");
        }
    };
    Balloon.prototype.setColor = function () {
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    return Balloon;
}());
var Game = (function () {
    function Game() {
        this.level = new Level();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.level.update();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Gun = (function () {
    function Gun() {
        this.div = document.createElement("gun");
        document.body.appendChild(this.div);
    }
    return Gun;
}());
var Level = (function () {
    function Level() {
        var _this = this;
        this.balloons = new Array();
        this.score = new Score();
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.gun = document.createElement("gun");
        document.body.appendChild(this.div);
        this.create = setInterval(function () { return _this.createBalloon(); }, 1400);
    }
    Object.defineProperty(Level.prototype, "display", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Level.prototype.createBalloon = function () {
        if (this.score.lives <= 0) {
            clearInterval(this.create);
        }
        this.balloons.push(new Balloon(this, this.game, this.score));
        console.log("Het aantal ballonnen: " + this.balloons.length);
    };
    Level.prototype.update = function () {
        if (this.score.lives > 0) {
            for (var _i = 0, _a = this.balloons; _i < _a.length; _i++) {
                var b = _a[_i];
                if (b) {
                    b.update();
                    if (b.x > 1300) {
                        this.score.updateScore(0, 0, -1);
                        this.removeBalloon(b);
                        b = undefined;
                        break;
                    }
                }
            }
        }
    };
    Level.prototype.removeBalloon = function (b) {
        var i = this.balloons.indexOf(b);
        if (i != -1) {
            this.balloons.splice(i, 1);
            b = undefined;
        }
    };
    Level.prototype.removeBalloonAll = function (b) {
    };
    return Level;
}());
var Score = (function () {
    function Score() {
        this.ammodiv = document.getElementsByTagName("ammo")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.ammo = 6;
        this.score = 0;
        this.lives = 3;
    }
    Score.prototype.updateScore = function (score, ammo, lives) {
        this.lives += lives;
        if (this.lives == 0) {
            this.endscreen();
        }
        if (this.ammo > 0) {
            console.log(this.score, this.ammo);
            this.score += score;
            this.ammo += ammo;
            console.log(this.score, this.ammo);
            console.log("This balloon is Popped");
            this.display();
        }
        else {
            this.reload();
            this.display();
        }
    };
    Score.prototype.display = function () {
        this.scorediv.innerHTML = "SCORE: " + this.score;
        this.ammodiv.innerHTML = "BULLETS LEFT: " + this.ammo;
        this.livesdiv.innerHTML = "LIVES LEFT: " + this.lives;
    };
    Score.prototype.endscreen = function () {
        this.ammodiv.remove();
        this.livesdiv.remove();
        var endscreen = document.createElement("endscreen");
        document.body.appendChild(endscreen);
        endscreen.innerHTML = "YOU LOST, TRY AGAIN. PRESS F5";
    };
    Score.prototype.reload = function () {
        this.ammo = 6;
    };
    return Score;
}());
var test = (function () {
    function test() {
        console.log("typescript configured");
    }
    return test;
}());
//# sourceMappingURL=main.js.map