class Obj {
    constructor(index, x, y, width, height, dst_cam, rad, planet_name, additionalInfo, limit, isConquered) {
        this.imgSrc = index;
        this.pos = {
            x: x,
            y: y,
        }

        this.rad = rad;
        this.question_limit = limit;
        this.maxHp = limit; 
        this.hp = 0;

        this.size = {
            width: width,
            height: height,
        }

        this.distance_from_cam = dst_cam;
        this.relativeZ = dst_cam;
        this.planetInfoRaw = [`<h1>ID: ${planet_name}</h1>`];
        if (additionalInfo != null) {
            for (let i = 0; i < additionalInfo.length; i++) {
                this.planetInfoRaw.push('<p>' + additionalInfo[i] + '</p>');
            }
        }
        if (!isConquered) {
            this.planetInfoRaw.push('<p style="color: rgb(228, 74, 74);">Staus: Enemy</p>');
            this.planetInfoRaw.push(`<p style="color: rgb(228, 74, 74);" id="hp">${this.hp}/${this.question_limit}</p>`);
        }
        else {
            this.planetInfoRaw.push('<p style="color: rgb(74, 228, 163);">Staus: Ally</p>');
        }
        this.planetInfo = this.infoToStr();

    
        this.isConquered = isConquered;
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

    camFocus(camera, displayInfo, content, button) {
        camera.x += (-this.pos.x - 150 - camera.x) / 20;
        camera.y += (-this.pos.y - camera.y) / 20;
        camera.z += (1 / this.distance_from_cam / camera.focus_zoom - camera.z) / 20;


        const dst= Math.abs(-this.pos.x - 150 - camera.x - this.pos.y - camera.y);
        if (this.isConquered) {
            button.style.display = "none";
        }
        else {
            button.style.display = "block";
        }
        if (!this.isConquered && dst < 40) {
            button.style.opacity = "100%";
        }

        if (dst < 100) {
            content.style.opacity = "100%";
        }
        else {
            displayInfo.displayed = false;
            content.style.opacity = "0%";
            button.style.opacity = "0%";
        }
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

    infoToStr() {
        let info = "";
        for (let i = 0; i < 5; i++) {
            if (i+1 < this.planetInfoRaw.length)
                info += this.planetInfoRaw[i];
            else
                info += "<br>";
        }
        info += this.planetInfoRaw[this.planetInfoRaw.length-1];
        return info;
    }
}

function setCoordsToCenter(Coord, X, window) {
    if (X) {
        return Coord + window.innerWidth / 2;
    }

    return Coord + window.innerHeight / 2;
}

export { Obj, setCoordsToCenter };