class Util {

public static checkCollision(hitbox1:HTMLElement, hitbox2:HTMLElement):boolean {

    let rect1:ClientRect = hitbox1.getBoundingClientRect();
    let rect2:ClientRect = hitbox2.getBoundingClientRect();

    return (rect2.left < rect1.right &&
            rect2.right > rect1.left &&
            rect2.top < rect1.bottom &&
            rect2.bottom > rect1.top)
    }
}