import { Obj, setCoordsToCenter } from './obj.js';
import { Popup, QuizInForeground } from './questions.js';
import { HudArrow } from './hud.js';



let selected;
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
const infoContent = document.getElementById("info_content");
const infoButton = document.getElementById("c_button");

let min_distance = undefined;

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
    console.log(selected);


    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    imgs = [
        createNewImg("../img/boojg.png"),
        createNewImg("../img/planet0.png"),
        createNewImg("../img/planet1.png"),
        createNewImg("../img/planet2.png"),
        createNewImg("../img/planet3.png"),
    ];

    hud_imgs = [
        createNewImg("../img/hud/right_arrow_select.png"),
        createNewImg("../img/hud/left_arrow_select.png"),
    ];

    if (selected == 4){
        objects = [
            new Obj(0, 30, -200, 92, 92, 2000, 92 / 2, "Some planet", ["Nothing special"], 2, false),
            new Obj(1, 30, 200, 256, 256, 100, 256 / 2, "Norb's wonder land", ["Norb gonna rape you"], 1,false),
            new Obj(2, -200, 100, 256, 256, 20, 124 / 2, "Juputr", ["Juputr", "Bottom  text"], 1,false),
            new Obj(4, window.innerWidth/2, window.innerHeight/2, 256, 256, 0.3, 256 / 2, "Moon", ["Elm usk vs Kanye", "Super duper Hitler plot twist"], 1,true),
            new Obj(3, -300, 100, 128, 128, 0.01, 128/2, "Hah heh", null, 1,false),
        ];
    }
    else{ 
        objects = [
            new Obj(0, 30, -200, 92, 92, 2000, 92 / 2, "Some planet", ["Nothing special"], 2, false),
            new Obj(1, 30, 200, 256, 256, 100, 256 / 2, "Norb's wonder land", ["Norb gonna rape you"], 1,false),
            new Obj(2, -200, 100, 256, 256, 20, 124 / 2, "Juputr", ["Juputr", "Bottom  text"], 1,false),
            new Obj(4, window.innerWidth/2, window.innerHeight/2, 256, 256, 0.3, 256 / 2, "Moon", ["Elm usk vs Kanye", "Super duper Hitler plot twist"], 1,false),
            new Obj(3, -300, 100, 128, 128, 0.01, 128/2, "Hah heh", null, 1,false),
        ];
    }

    

    hud_objs = [
        new HudArrow(1, 32, window.innerHeight / 2 - 32, 32, 64),
        new HudArrow(0, window.innerWidth - 32 * 2, window.innerHeight / 2 - 32, 32, 64),
    ];
    
    min_distance = 1;
    objToFocus = objects.length - 1;
    
    window.requestAnimationFrame(loop);
}



function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (QuizInForeground || selected == null) { 
        mouse.clickable = false;
    }

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        obj.relativeZ = obj.distance_from_cam * camera.z;
        if (!obj.isRenderAble(camera, min_distance, window)) continue;
        infoButton.onclick = function() {
            Popup(obj);
        };

        if (mouse.clickable) {
            if (obj.isCollideWithCursor(mouse, camera)) {
                objToFocus = i;
            }
        }

        obj.render(ctx, imgs, camera, window, min_distance);
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
    obj.camFocus(camera, displayInfo, infoContent, infoButton);
    if (!displayInfo.displayed) {
        displayInfo.displayed = true;
        infoContent.innerHTML = obj.planetInfo;
    }
    else {
        planetInfo.style.left = `${setCoordsToCenter((obj.pos.x + obj.rad + camera.x) / obj.relativeZ, true, window) + 100}px`
    }
    mouse.clickable = false;
    window.requestAnimationFrame(loop)
}


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
function setselected(karakter){
    selected = karakter
}
export { objects };
export { setselected };
export { main };
export { selected };