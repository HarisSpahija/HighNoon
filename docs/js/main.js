var Balloon = (function () {
    function Balloon(l) {
        var _this = this;
        this.speed = 0;
        console.log("New balloon");
        this.div = document.createElement("balloon");
        l.div.appendChild(this.div);
        this.level = l;
        this.x = Math.ceil(Math.random() * 8) * 110;
        this.y = 1300;
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
        this.y -= this.speed;
        if (this.y < 200) {
            this.div.remove();
            this.level.removeBalloon(this);
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Balloon.prototype.onClick = function (e) {
        console.log("This balloon is shot");
        if (this.level.display.ammo > 0) {
            this.ammodiv -= 1;
            this.level.display.updateScore(+1, -1);
            this.div.remove();
        }
        else {
            this.ammodiv = 6;
            this.level.display.updateScore(+6, 0);
        }
    };
    Balloon.prototype.remove = function () {
        this.div.remove();
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
var Level = (function () {
    function Level() {
        var _this = this;
        this.balloons = new Array();
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        setInterval(function () { return _this.createBalloon(); }, 1400);
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
        this.balloons.push(new Balloon(this));
        console.log("Het aantal ballonnen: " + this.balloons.length);
    };
    Level.prototype.update = function () {
        for (var _i = 0, _a = this.balloons; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
    };
    Level.prototype.removeBalloon = function (b) {
        var i = this.balloons.indexOf(b);
        if (i != -1) {
            this.balloons.splice(i, 1);
        }
    };
    return Level;
}());
var Score = (function () {
    function Score() {
        this.ammodiv = document.getElementsByTagName("ammo")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.ammo = 6;
        this.score = 0;
    }
    Score.prototype.updateScore = function (score, ammo) {
        document.getElementsByTagName("score")[0];
        document.getElementsByTagName("ammo")[0];
        this.score += score;
        this.ammo += ammo;
        this.display();
    };
    Score.prototype.display = function () {
        this.scorediv.innerHTML = "Lives: " + this.score;
        this.ammodiv.innerHTML = "Clicks left: " + this.ammo;
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