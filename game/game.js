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

        this.center = {
            x: x+width/2,
            y: y+height/2,
        }
    }

    refresh_center() {
        this.center.x = this.pos.x+this.size.width/2;
        this.center.y = this.pos.y+this.size.height/2;
    }
}

let canvas;
let ctx;
let imgs;
let objects;

let mouse = {
    x: 0,
    y: 0,
    clicked: false,
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < objects.length; i++) {

        let obj = objects[i];
        let objX = obj.pos.x / obj.distance_from_cam;
        let objY = obj.pos.y / obj.distance_from_cam;

        if (mouse.clicked) {
            if (Math.pow(mouse.x - (obj.center.x / obj.distance_from_cam), 2) + Math.pow(mouse.y - (obj.center.y / obj.distance_from_cam), 2) <= Math.pow((obj.size.width/2) / obj.distance_from_cam, 2)) {
                obj.pos.x = mouse.x * obj.distance_from_cam - obj.size.width / 2;
                obj.pos.y = mouse.y * obj.distance_from_cam - obj.size.width / 2;
                obj.refresh_center();
            }
        }

        ctx.drawImage(imgs[obj.imgSrc], objX, objY, obj.size.width / obj.distance_from_cam, obj.size.height / obj.distance_from_cam);
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
    mouse.clicked = false;

    ctx = canvas.getContext("2d");

    imgs = [
        createNewImg("../img/boojg.png"),
    ];

    objects = [
        new Obj(0, 0, 0, 256, 256, 0.7),
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

window.addEventListener("mousedown", function(event) {
    mouse.clicked = true;
});


window.addEventListener("mouseup", function(event) {
    mouse.clicked = false;
});