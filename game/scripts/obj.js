class Obj {
    constructor(index, x, y, width, height, dst_cam, rad, planet_name, additionalInfo, limit) {
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
        this.planetInfo = `<h1>ID: ${planet_name}</h1>`;
        if (additionalInfo != null) {
            for (let i = 0; i < additionalInfo.length; i++) {
                this.planetInfo += '<p>' + additionalInfo[i] + '</p>';
            }
        }

        this.question_limit = limit;
        this.isConquered = false;
    }

    get_center() {
        return {
            x: this.pos.x - this.size.width / 2,
            y: this.pos.y - this.size.height / 2,
        }
    }

    isCollideWithCursor(mouse, camera) {
        let mx = mouse.x - window.innerWidth / 2;
        let my = mouse.y - window.innerHeight / 2;

        if (Math.pow(mx - ((this.pos.x + camera.x) / this.relativeZ), 2) + Math.pow(my - ((this.pos.y + camera.y) / this.relativeZ), 2) <= Math.pow((this.rad) / this.relativeZ, 2)) {
            return true;
        }

        return false;
    }

    camFocus(camera, displayInfo, planetInfo) {
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

    isRenderAble(camera, min_distance, window) {
        if (setCoordsToCenter((this.pos.x + this.size.width + camera.x) / this.relativeZ, true, window) < 0 || 
            setCoordsToCenter((this.pos.x + camera.x) / this.relativeZ, true, window) > window.innerWidth ||
            setCoordsToCenter((this.pos.y + this.size.height + camera.y) / this.relativeZ, false, window) < 0 ||
            setCoordsToCenter((this.pos.y + camera.y) / this.relativeZ, false, window) > window.innerHeight
        )
            return false;

        if (this.relativeZ < 0.09 || min_distance / camera.focus_zoom / this.relativeZ < 0.01 ) {
            return false;
        }

        return true;
    }

    render(ctx, imgs, camera, window, min_distance) {
        let objX = setCoordsToCenter((this.get_center().x + camera.x) / this.relativeZ, true, window);
        let objY = setCoordsToCenter((this.get_center().y + camera.y) / this.relativeZ, false, window);
        let brightness = 1 <= min_distance / camera.focus_zoom / this.relativeZ ? 1 : min_distance / camera.focus_zoom / this.relativeZ;

        ctx.filter = 'brightness(' + brightness + ')';
        ctx.drawImage(imgs[this.imgSrc], objX, objY, this.size.width / this.relativeZ, this.size.height / this.relativeZ);
    }
}

function setCoordsToCenter(Coord, X, window) {
    if (X) {
        return Coord + window.innerWidth / 2;
    }

    return Coord + window.innerHeight / 2;
}

export { Obj, setCoordsToCenter };