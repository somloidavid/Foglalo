const planetInfoDiv = document.getElementById("planet_info");

class HudArrow {
    constructor(index, x, y, width, height) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dir = (index - 1) * 2 + 1;
    }

    render(ctx, hud_imgs) {
        ctx.drawImage(hud_imgs[this.index], this.x, this.y, this.width, this.height);
    }

    isCollideWithCursor(mouse) {
        if (this.relX(mouse.x) >= 0 && this.relX(mouse.x) <= this.width) {
            if (this.relY(mouse.y) == 0)
                return true;

            return Math.abs( this.width * this.index - this.relX(mouse.x) ) / Math.abs(this.relY(mouse.y)) >= 1;
        }

        return false;
    }

    relX(coord) {
        return this.x + this.width - coord;
    }

    relY(coord) {
        return this.y + this.height/2 - coord;
    }
}

export { HudArrow };
