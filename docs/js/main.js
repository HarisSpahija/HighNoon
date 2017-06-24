var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.startUI = document.getElementsByTagName("start")[0];
        this.startUI.addEventListener("click", function (e) { return _this.onClick(e); });
        var menusound = document.getElementById("menu");
        menusound.volume = 0.2;
        menusound.play();
        menusound.loop = true;
    }
    Game.prototype.onClick = function (e) {
        this.startUI.remove();
        this.score = document.createElement("score");
        this.score.innerHTML = "SCORE: 0";
        this.ammo = document.createElement("ammo");
        this.ammo.innerHTML = "BULLETS LEFT: 6";
        this.lives = document.createElement("lives");
        this.lives.innerHTML = "LIVES LEFT: 3";
        requestAnimationFrame(this.gameLoop.bind(this));
        this.level = new Level();
    };
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
    function Gun(l, g, ammo) {
        var _this = this;
        this.div = document.createElement("gun");
        l.div.appendChild(this.div);
        this.score = ammo;
        this.x = 500;
        this.y = 0;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.shoot();
        this.update();
    }
    Gun.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Gun.prototype.onKeyDown = function (event) {
        var _this = this;
        switch (event.keyCode) {
            case 65:
                this.x = Math.max(-10, this.x - 30);
                break;
            case 68:
                this.x = Math.min(1100, this.x + 30);
                break;
            case 82:
                this.reloadAnimation();
                this.reloadSound();
                setTimeout(function () { return _this.reload(); }, 800);
                setTimeout(function () { return _this.score.display(); }, 1000);
                break;
            case 32:
                this.shoot();
                break;
        }
    };
    Gun.prototype.shoot = function () {
        var _this = this;
        if (this.score.ammo > 0) {
            this.hitbox = document.createElement("gunhitbox");
            this.div.appendChild(this.hitbox);
            this.shootSound();
            setTimeout(function () { return _this.removeHitbox(); }, 100);
            this.score.updateScore(0, -1, 0);
        }
    };
    Gun.prototype.shootSound = function () {
        var shootsound = document.getElementById("shoot");
        shootsound.load();
        shootsound.volume = 0.1;
        shootsound.play();
        console.log("shot sound is played");
    };
    Gun.prototype.removeHitbox = function () {
        this.hitbox.remove();
    };
    Gun.prototype.reloadSound = function () {
        var reloadsound = document.getElementById("reload");
        reloadsound.load();
        reloadsound.play();
    };
    Gun.prototype.reload = function () {
        this.score.ammo = 6;
    };
    Gun.prototype.reloadAnimation = function () {
        var _this = this;
        this.reloading = document.createElement("reloading");
        this.reloading.innerHTML = "RELOADING";
        this.div.appendChild(this.reloading);
        this.reloading.style.backgroundImage = "url(images/reload.gif)";
        setTimeout(function () { return _this.removeAnimation(); }, 1500);
    };
    Gun.prototype.removeAnimation = function () {
        this.reloading.remove();
    };
    return Gun;
}());
var Target = (function () {
    function Target(l, points) {
        this.speed = 0;
        this.div = document.createElement("target");
        l.div.appendChild(this.div);
        this.level = l;
        this.score = this.level.score;
        this.points = points;
        this.y = Math.ceil(Math.random() * 500) + 418;
        this.x = -200;
        this.width = 200;
        this.height = 200;
        var multiplier = (this.score.score / 10) + 0.2;
        this.speed = this.y / 300 * multiplier;
        this.setColor();
        this.move();
    }
    Object.defineProperty(Target.prototype, "display", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Target.prototype.move = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Target.prototype.remove = function () {
        var sound = document.getElementById("balloonpop");
        sound.volume = 0.2;
        sound.play();
        this.div.remove();
        this.div = undefined;
    };
    Target.prototype.setColor = function () {
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    return Target;
}());
var Balloon = (function (_super) {
    __extends(Balloon, _super);
    function Balloon(l) {
        var _this = _super.call(this, l, 1) || this;
        _this.div.classList.add("balloon");
        _this.hitbox = document.createElement("balloonhitbox");
        _this.div.appendChild(_this.hitbox);
        return _this;
    }
    return Balloon;
}(Target));
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(l) {
        var _this = _super.call(this, l, 0) || this;
        _this.div.classList.add("cat");
        _this.hitbox = document.createElement("cathitbox");
        _this.div.appendChild(_this.hitbox);
        return _this;
    }
    return Cat;
}(Target));
var Zenyatta = (function (_super) {
    __extends(Zenyatta, _super);
    function Zenyatta(l) {
        var _this = _super.call(this, l, -1) || this;
        _this.div.classList.add("zenyatta");
        _this.hitbox = document.createElement("zenyattahitbox");
        _this.div.appendChild(_this.hitbox);
        return _this;
    }
    return Zenyatta;
}(Target));
var Level = (function () {
    function Level() {
        var _this = this;
        this.targets = new Array();
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.score = new Score();
        this.gun = new Gun(this, this.game, this.score);
        this.create = setInterval(function () { return _this.createTarget(); }, 1400);
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
    Level.prototype.createTarget = function () {
        this.rand = Math.random();
        if (this.score.lives <= 0) {
            clearInterval(this.create);
        }
        if (this.rand < 0.94) {
            this.targets.push(new Balloon(this));
            console.log("Balloon push");
        }
        else if (this.rand < 0.99) {
            this.targets.push(new Zenyatta(this));
            console.log("Zenyatta push");
        }
        else {
            this.targets.push(new Cat(this));
            console.log("Cat push");
        }
    };
    Level.prototype.update = function () {
        this.gun.update();
        if (this.score.lives > 0) {
            for (var _i = 0, _a = this.targets; _i < _a.length; _i++) {
                var t = _a[_i];
                if (t) {
                    t.move();
                    if (Util.checkCollision(t.hitbox, this.gun.hitbox)) {
                        if (t.hitbox.tagName == "cathitbox") {
                            this.score.updateScore(0, 0, -1000);
                        }
                        this.score.updateScore(t.points, 0, 0);
                        this.removeTarget(t);
                        break;
                    }
                    else if (t.x > 1300) {
                        t.points = 0 - t.points;
                        this.score.updateScore(0, 0, t.points);
                        this.removeTarget(t);
                        break;
                    }
                }
            }
        }
    };
    Level.prototype.removeTarget = function (t) {
        var i = this.targets.indexOf(t);
        if (i != -1) {
            this.targets.splice(i, 1);
            t.remove();
        }
    };
    return Level;
}());
var Score = (function () {
    function Score() {
        this.ammodiv = document.getElementsByTagName("ammo")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.ammo = 7;
        this.score = 0;
        this.lives = 3;
    }
    Score.prototype.updateScore = function (score, ammo, lives) {
        this.lives += lives;
        if (this.lives == 0) {
            this.endscreen();
        }
        this.score += score;
        this.ammo += ammo;
        this.display();
    };
    Score.prototype.display = function () {
        this.scorediv.innerHTML = "SCORE: " + this.score;
        this.ammodiv.innerHTML = "BULLETS LEFT: " + this.ammo;
        this.livesdiv.innerHTML = "LIVES LEFT: " + this.lives;
    };
    Score.prototype.endscreen = function () {
        this.ammodiv.remove();
        this.livesdiv.remove();
        this.scorediv.remove();
        var endscreen = document.createElement("endscreen");
        document.body.appendChild(endscreen);
        endscreen.innerHTML = "GAME OVER, YOUR SCORE WAS: " + this.score;
    };
    return Score;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (hitbox1, hitbox2) {
        var rect1 = hitbox1.getBoundingClientRect();
        var rect2 = hitbox2.getBoundingClientRect();
        return (rect2.left < rect1.right &&
            rect2.right > rect1.left &&
            rect2.top < rect1.bottom &&
            rect2.bottom > rect1.top);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map