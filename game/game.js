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
}

let canvas;
let ctx;
let imgs;
let objects;

let mouse = {
    x: 0,
    y: 0,
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        ctx.drawImage(imgs[obj.imgSrc], obj.pos.x / obj.distance_from_cam, obj.pos.y / obj.distance_from_cam, obj.size.width / obj.distance_from_cam, obj.size.height / obj.distance_from_cam);
    }
}

function createNewImg(path) {
    let htmlImg = document.createElement("IMG");
    htmlImg.src = path;
    htmlImg.style.filter = 'brightness(0.2)';
    document.body.appendChild(htmlImg);

    return htmlImg;
}

function main() {
    canvas = document.getElementById("main-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");

    imgs = [
        createNewImg("../img/boojg.png"),
    ];

    objects = [
        new Obj(0, 1024, 128, 256, 256, 1.3),
        new Obj(0, 0, 0, 256, 256, 1),
    ];

    window.requestAnimationFrame(loop)

}

function loop() {
    draw();

    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.onload = main
window.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});