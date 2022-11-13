class Obj {
    constructor(index, x, y, width, height) {
        this.imgSrc = index;
        this.pos = {
            x: x,
            y: y,
        }

        this.size = {
            width: width,
            height: height,
        }
    }
}


function draw(ctx, objs, imgs) {
    for (let i = 0; i < objs.length; i++) {
        let obj = objs[i];
        ctx.drawImage(imgs[obj.imgSrc], obj.pos.x, obj.pos.y);
    }
}

function main() {
    let canvas = document.getElementById("main-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    let imgs = [
        document.getElementById("kep"), // ind: 0
    ];

    let objects = [
        new Obj(0, 0, 0, 256, 256),
        new Obj(0, 256, 256, 256, 256),
    ];

    draw(ctx, objects, imgs);
}

window.onload = main;