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
    move: false,
}

let mouse = {
    x: 0,
    y: 0,
    clicked: false,
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
    camera.x += (-obj.pos.x - camera.x) / 10;
    camera.y += (-obj.pos.y - camera.y) / 10;
    camera.z += (1 - camera.z) / 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let relativeZ = obj.distance_from_cam * camera.z;

        let objX = setCoordsToCenter((obj.get_center().x + camera.x) / relativeZ, true);
        let objY = setCoordsToCenter((obj.get_center().y + camera.y) / relativeZ, false);

        if (mouse.clicked) {
            if (isCollideWithCursor(obj)) {
                objToFocus = obj;
                clicked = false;
            }
        }

        camFocusOnObject(objToFocus);

        let brightness = 1 < min_distance / relativeZ ? 1 : min_distance / relativeZ;

        ctx.filter = 'brightness(' + brightness + ')';
        ctx.drawImage(imgs[obj.imgSrc], objX, objY, obj.size.width / relativeZ, obj.size.height / relativeZ);
    }
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
    mouse.clicked = false;

    ctx = canvas.getContext("2d");

    imgs = [
        createNewImg("../img/boojg.png"),
    ];

    objects = [
        new Obj(0, 30, 200, 256, 256, 1.3),
        new Obj(0, -200, 100, 256, 256, 0.9),
        new Obj(0, 800, -100, 256, 256, 0.5),
    ];

    min_distance = objects[objects.length - 1].distance_from_cam;
    objToFocus = objects[objects.length - 1];

    window.requestAnimationFrame(loop)
}

function loop() {
    draw();

    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.onload = main
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


window.addEventListener("mousedown", function (event) {
    mouse.clicked = true;
});

window.addEventListener("mouseup", function (event) {
    mouse.clicked = false;
});