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
        if (mouse.x >= this.x && mouse.x <= this.x + this.width) {
            if (mouse.y >= this.y && mouse.y <= this.y + this.height) {
                return true;
            }
        }

        return false;
    }
}

export { HudArrow };