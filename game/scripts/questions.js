import { objects, selected } from "./game.js";
const infoContent = document.getElementById("info_content");

class Question {
    constructor(q) {
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
    }
}

const input = [["Ki Kriszhadvice?", "Tanács Krisztián", "A prediction-ök démonja", "A Béke Szigetének őrzője"], ["Milyen méretű Herby cigarettája?", "Közepes", "Kis", "Nagy"], ["Melyik egy chatbot neve?", "Málik Irén", "Stohl András", "Ben Dover"], ["Mi lett az L-ből az ismert népzene szerint?", "W", "N", "Szalonna"], ["Beugratós-e a Kvízapo.hu?", "Igen", "1kg vas", "GWM Music Production"], ["Hol található Nagybajom?", "Somogy megyében", "Az Isten háta mögött", "Csenevész mellett"], ["Mi a megfelelő öltözet(úgymond viselet) egy programozónak?", "Combzokni hozzá illő kiegészítőkkel", "Fehér ing", "Kényszerzubbony"], ["Mi 2022.12.07. vicces szava?", "Hebehurgya", "Istók", "Öblös"], ["Mennyit posztol Sanyi bá naponta?", "∞", "3", "Sándor"], ["Melyik az a Kisé zene?","Costa Rica", "Pörög a show", "Sándor Kevin ?" ], ["Hogy érzi magát Kisé (Sándor Kevin) a No love című operaénekben?", "Mint majka 2012 ben", "Még mindig ki az a kisé?", "Mint Márta Sándor sanyi"], ["adyváros jó hely?", "Csak egy kicsit", "Jobb mint Francia ország", "megböknek az oppok :("], ["Mi taszított nagyot a szentesi emberen a közmondás szerint?", "Hosszú kutya", "Rövid cickány", "Széles borjú"]];
const questions = [];
input.forEach(q => {
    questions.push(new Question(q));
});

let conqueredPlanets = 0;
let randq;
let QuizInForeground;
function ModifyQuizInForeground(q){
    QuizInForeground = q;
}

let answerable = true;
function Popup(obj) {
    if (selected == 4 && conqueredPlanets == 1) {
        conqueredPlanets++;
    }
    let timer = document.getElementById("timer");
    timer.innerText = "6";
    answerable = true;
    QuizInForeground = true;
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup").style.opacity = "1";
    document.getElementById("planet_info").style.display = "none";
    randq = questions.splice(Math.floor(Math.random() * questions.length), 1);
    document.getElementById("question").innerHTML = randq[0].question;
    const ch1 = document.getElementById("ch1");
    const ch2 = document.getElementById("ch2");
    const ch3 = document.getElementById("ch3");
    ch1.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;
    ch2.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;
    ch3.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;

    let elem;

    window.addEventListener("click", function(event){ 
        if (event.target.parentElement.classList[0] == "choice") {
            elem = event.target.parentElement;
        } 
        else if (event.target.classList[0] == "choice") {
            elem = event.target;
        }

        Answer(elem);
    });

    let interval = setInterval(() => {
        timer.innerHTML = `<p>${parseInt(timer.innerText) - 1}</p>`;
        if (timer.innerText <= 0) {
            clearInterval(interval);
            switch (validate(elem)) {
                case true:
                    if (obj.hp == obj.maxHp) {
                        obj.isConquered = true;
                        conqueredPlanets ++;
                        obj.planetInfoRaw[obj.planetInfoRaw.length-1] = '<p style="color: rgb(74, 228, 163);">Staus: Ally</p>';
                        obj.planetInfo = obj.infoToStr();
                        infoContent.innerHTML = obj.planetInfo;
                    }
                    break;
                // case undefined: 
                //     let notif = document.getElementById("notif");
                //     notif.style.display = "block";
                //     notif.style.opacity = "1";
                //     break;
                default:
                    break;
            }
            OffTimer(elem);
        }
    }, 1000);
}

function OffTimer(element) {
    setTimeout(() => {
        // let notif = document.getElementById("notif");
        // notif.style.display = "block";
        // notif.style.opacity = "1";
        document.getElementById("popup").style.display = "none";
        document.getElementById("planet_info").style.display = "flex";
        if (element)
            element.className = "choice";
        
        QuizInForeground = false;
    }, 1000);

}
function validate(element) {
    let current_planet = objects[objects.length - conqueredPlanets - 1];
    answerable = false;
    if (element) {
        if (element.innerHTML == `<p>${randq[0].correct}</p>`) {
            current_planet.hp++;
            element.classList.add("correct");
            document.getElementById("hp").innerHTML = `<p style="color: rgb(228, 74, 74);" id="hp">${current_planet.hp}/${current_planet.maxHp}</p>`;
            return true;
        }
        else {
            element.classList.add("incorrect")
            return false;
        }
    }
    return undefined;
}

function Answer(element) {
    if (answerable) {
        if (element && !element.classList.contains("chosen_answ")) {
            if (document.querySelector(".chosen_answ"))
                document.querySelector(".chosen_answ").classList.remove("chosen_answ");
            element.classList.add("chosen_answ");
        }
    }
}

export { Popup, randq, QuizInForeground, ModifyQuizInForeground };