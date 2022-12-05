
import { Popup, QuizInForeground} from './questions.js';
import { HudArrow } from './hud.js';
import { selected } from './select.js';


class Obj {
    constructor(index, x, y, width, height, dst_cam, rad, info) {
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
        this.relativeZ = dst_cam;
        this.planetInfo = "";
        for (let i = 0; i < info.length; i++) {
            this.planetInfo += '<p>' + info[i] + '</p>';
        }
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

        if (Math.pow(mx - ((this.pos.x + camera.x) / this.relativeZ), 2) + Math.pow(my - ((this.pos.y + camera.y) / this.relativeZ), 2) <= Math.pow((this.rad) / this.relativeZ, 2)) {
            return true;
        }

        return false;
    }

    camFocus() {
        camera.x += (-this.pos.x - 150 - camera.x) / 20;
        camera.y += (-this.pos.y - camera.y) / 20;
        camera.z += (1 / this.distance_from_cam / camera.focus_zoom - camera.z) / 20;

        if (Math.abs(-this.pos.x - 150 - camera.x - this.pos.y - camera.y) < 100) {
            planetInfo.style.opacity = "100%";
            return true;            
        }
        displayInfo.displayed = false;
        planetInfo.style.opacity = "0%";
        return false;
    }

    isRenderAble() {
        if (setCoordsToCenter((this.pos.x + this.size.width + camera.x) / this.relativeZ, true) < 0 || 
            setCoordsToCenter((this.pos.x + camera.x) / this.relativeZ, true) > window.innerWidth ||
            setCoordsToCenter((this.pos.y + this.size.height + camera.y) / this.relativeZ, false) < 0 ||
            setCoordsToCenter((this.pos.y + camera.y) / this.relativeZ, false) > window.innerHeight
        )
            return false;

        if (this.relativeZ < 0.09 || min_distance / camera.focus_zoom / this.relativeZ < 0.01 ) {
            return false;
        }

        return true;
    }

    render() {
        let objX = setCoordsToCenter((this.get_center().x + camera.x) / this.relativeZ, true);
        let objY = setCoordsToCenter((this.get_center().y + camera.y) / this.relativeZ, false);
        let brightness = 1 <= min_distance / camera.focus_zoom / this.relativeZ ? 1 : min_distance / camera.focus_zoom / this.relativeZ;

        ctx.filter = 'brightness(' + brightness + ')';
        ctx.drawImage(imgs[this.imgSrc], objX, objY, this.size.width / this.relativeZ, this.size.height / this.relativeZ);
    }
}

let canvas;
let ctx;
let imgs;
let hud_imgs;

let objects;
let objToFocus;

let hud_objs;
let displayInfo = {
    info: "",
    displayed: false,
}

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

const planetInfo = document.getElementById("planet_info");

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
        createNewImg("../img/hud/right_arrow_select.png"),
        createNewImg("../img/hud/left_arrow_select.png"),
    ];

    objects = [
        new Obj(1, 30, -200, 92, 92, 200, 92 / 2, ["IDE MAR NINCS OTLETEM"]),
        new Obj(0, 30, 200, 256, 256, 25, 256 / 2, ["haha: HE"]),
        new Obj(1, -200, 100, 128, 128, 7, 128 / 2, ["Kriszthadvice: false"]),
        new Obj(2, window.innerWidth/2, window.innerHeight/2, 256, 256, 1, 124 / 2, ["population: 2", "Norb on planet: 0"]),
        new Obj(2, -300, 100, 256, 256, 0.1, 124 / 2, ["francboojg: ez itt"]),
    ];

    hud_objs = [
        new HudArrow(1, 32, window.innerHeight / 2 - 32, 32, 64),
        new HudArrow(0, window.innerWidth - 32 * 2, window.innerHeight / 2 - 32, 32, 64),
    ];

    min_distance = 1;
    objToFocus = objects.length - 1;

    window.requestAnimationFrame(loop);
}


let frames = 0;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(selected);
    if (QuizInForeground || selected == null) {
        mouse.clickable = false;
    }

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        obj.relativeZ = obj.distance_from_cam * camera.z;
        if (!obj.isRenderAble()) continue;
        if (mouse.clickable) {
            if (obj.isCollideWithCursor()) {
                objToFocus = i;
                Popup()
            }
        }
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
    

    let obj = objects[objToFocus];
    obj.camFocus();
    if (!displayInfo.displayed) {
        displayInfo.displayed = true;
        planetInfo.innerHTML = obj.planetInfo;
    }
    else {
        planetInfo.style.left = `${setCoordsToCenter((obj.pos.x + obj.rad + camera.x) / obj.relativeZ, true) + 100}px`
    }
    mouse.clickable = false;
    window.requestAnimationFrame(loop)
}


main()


window.onmousemove = function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
};

window.onmousedown = function (event) {
    mouse.pressed = true;
};

window.onmouseup = function (event) {
    mouse.clickable = true;
    mouse.pressed = false;
};
