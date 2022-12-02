import { Popup } from './questions.js';

class Obj {
    constructor(index, x, y, width, height, dst_cam) {
        this.imgSrc = index;
        this.pos = {
            x: x,
            y: y,
        }

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
}

let canvas;
let ctx;
let imgs;

let objects;
let objToFocus;

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
    down: false,
    clickable: true,
}

let min_distance = undefined;

function setCoordsToCenter(Coord, X) {
    if (X) {
        return Coord + window.innerWidth / 2;
    }

    return Coord + window.innerHeight / 2;
}

function isCollideWithCursor(obj) {
    let mx = mouse.x - window.innerWidth / 2;
    let my = mouse.y - window.innerHeight / 2;


    let relativeZ = obj.distance_from_cam * camera.z;


    if (Math.pow(mx - ((obj.pos.x + camera.x) / relativeZ), 2) + Math.pow(my - ((obj.pos.y + camera.y) / relativeZ), 2) <= Math.pow((obj.size.width / 2) / relativeZ, 2)) {
        return true;
    }

    return false;
}

function camFocusOnObject(obj) {
    camera.x += (-obj.pos.x - camera.x) / 20;
    camera.y += (-obj.pos.y - camera.y) / 20;
    camera.z += (1 / obj.distance_from_cam / camera.focus_zoom - camera.z) / 20;
}
function draw(obj) {
    let relativeZ = obj.distance_from_cam * camera.z;

    let objX = setCoordsToCenter((obj.get_center().x + camera.x) / relativeZ, true);
    let objY = setCoordsToCenter((obj.get_center().y + camera.y) / relativeZ, false);
    let brightness = 1 <= min_distance / camera.focus_zoom / relativeZ ? 1 : min_distance / camera.focus_zoom / relativeZ;

    ctx.filter = 'brightness(' + brightness + ')';
    ctx.drawImage(imgs[obj.imgSrc], objX, objY, obj.size.width / relativeZ, obj.size.height / relativeZ);
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

    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;


    imgs = [
        createNewImg("../img/boojg.png"),
        createNewImg("../img/planet0.png"),
        createNewImg("../img/planet1.png"),
    ];

    objects = [
        new Obj(0, 30, 200, 92, 92, 1.9),
        new Obj(1, -200, 100, 128, 128, 1.2),
        new Obj(2, 300, 100, 256, 256, 0.7),
    ];

    min_distance = objects[objects.length - 1].distance_from_cam;
    objToFocus = objects[objects.length - 1];

    window.requestAnimationFrame(loop)
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (mouse.clickable) {
            if (mouse.down) {
                if (isCollideWithCursor(obj)) {
                    objToFocus = obj;
                    Popup();
                    mouse.clickable = false;
                }
            }
        }

        camFocusOnObject(objToFocus);
        draw(obj);
    }

    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.onload = main
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


window.addEventListener("mousedown", function (event) {
    mouse.down = true;
});

window.addEventListener("mouseup", function (event) {
    mouse.clickable = true;
    mouse.down = false;
});
