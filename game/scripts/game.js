import { HudArrow } from './hud.js';
import { Popup } from './questions.js';

class Obj {
    constructor(index, x, y, width, height, dst_cam, rad) {
        this.imgSrc = index;
        this.pos = {
            x: x,
            y: y,
        }

        this.rad = rad;

        this.size = {
            width: width,
            height: height,
        }

        this.distance_from_cam = dst_cam;
    }

    get_center() {
        return {
            x: this.pos.x - this.size.width / 2,
            y: this.pos.y - this.size.height / 2,
        }
    }

    isCollideWithCursor() {
        let mx = mouse.x - window.innerWidth / 2;
        let my = mouse.y - window.innerHeight / 2;


        let relativeZ = this.distance_from_cam * camera.z;

        if (relativeZ >= 0.09) {
            if (Math.pow(mx - ((this.pos.x + camera.x) / relativeZ), 2) + Math.pow(my - ((this.pos.y + camera.y) / relativeZ), 2) <= Math.pow((this.rad) / relativeZ, 2)) {
                return true;
            }
        }

        return false;
    }

    camFocus() {
        camera.x += (-this.pos.x - camera.x) / 20;
        camera.y += (-this.pos.y - camera.y) / 20;
        camera.z += (1 / this.distance_from_cam / camera.focus_zoom - camera.z) / 20;
    }
    render() {
        let relativeZ = this.distance_from_cam * camera.z;

        let objX = setCoordsToCenter((this.get_center().x + camera.x) / relativeZ, true);
        let objY = setCoordsToCenter((this.get_center().y + camera.y) / relativeZ, false);
        let brightness = 1 <= min_distance / camera.focus_zoom / relativeZ ? 1 : min_distance / camera.focus_zoom / relativeZ;

        ctx.filter = 'brightness(' + brightness + ')';
        if (relativeZ > 0.09) {
            ctx.drawImage(imgs[this.imgSrc], objX, objY, this.size.width / relativeZ, this.size.height / relativeZ);
        }
    }
}

let canvas;
let ctx;
let imgs;
let hud_imgs;

let objects;
let objToFocus;

let hud_objs;

let camera = {
    x: 0,
    y: 0,
    z: 1,
    focus_zoom: 2.5,
    move: false,
}

let mouse = {
    x: 0,
    y: 0,
    pressed: false,
    clickable: true,
}

let min_distance = undefined;

function setCoordsToCenter(Coord, X) {
    if (X) {
        return Coord + window.innerWidth / 2;
    }

    return Coord + window.innerHeight / 2;
}

function createNewImg(path) {
    let htmlImg = document.createElement("IMG");
    htmlImg.src = path;
    htmlImg.style.border = "2px solid white"
    document.body.appendChild(htmlImg);

    return htmlImg;
}

function main() {
    canvas = document.getElementById("main-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.clickable = false;

    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    imgs = [
        createNewImg("../img/boojg.png"),
        createNewImg("../img/planet0.png"),
        createNewImg("../img/planet1.png"),
    ];

    hud_imgs = [
        createNewImg("../img/hud/left_arrow_select.png"),
        createNewImg("../img/hud/right_arrow_select.png"),
    ];

    objects = [
        new Obj(1, 30, -200, 92, 92, 35, 92 / 2),
        new Obj(0, 30, 200, 92, 92, 12, 92 / 2),
        new Obj(1, -200, 100, 128, 128, 7, 128 / 2),
        new Obj(2, 300, 100, 256, 256, 1, 124 / 2),
        new Obj(2, -300, 100, 256, 256, 0.3, 124 / 2),
    ];

    hud_objs = [
        new HudArrow(0, 32, window.innerHeight / 2 - 32, 32, 64),
        new HudArrow(1, window.innerWidth - 32 * 2, window.innerHeight / 2 - 32, 32, 64),
    ];

    min_distance = 1;
    objToFocus = objects.length - 1;

    window.requestAnimationFrame(loop)
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (mouse.clickable) {
            if (obj.isCollideWithCursor()) {
                objToFocus = i;
            }
        }

        objects[objToFocus].camFocus();
        obj.render();
    }

    for (let i = 0; i < hud_objs.length; i++) {
        const obj = hud_objs[i];
        if (mouse.clickable) {
            if (obj.isCollideWithCursor(mouse)) {
                objToFocus += obj.dir;
                if (objToFocus < 0) {
                    objToFocus = 0;
                }
                else if (objToFocus > objects.length - 1) {
                    objToFocus = objects.length - 1;
                }
            }
        }

        obj.render(ctx, hud_imgs);
    }


    mouse.clickable = false;
    window.requestAnimationFrame(loop)
}

window.onload = main
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


window.addEventListener("mousedown", function (event) {
    mouse.pressed = true;
});

window.addEventListener("mouseup", function (event) {
    mouse.clickable = true;
    mouse.pressed = false;
});
