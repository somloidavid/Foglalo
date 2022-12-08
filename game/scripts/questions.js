// import { Answer } from "./answer.js";
const infoContent = document.getElementById("info_content");

class Question {
    constructor(q) {
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
    }
}

const input = [["Ki Kriszhadvice?", "Tanács Krisztián", "A prediction-ök démonja", "A Béke Szigetének őrzője"], ["Milyen méretű Herby cigarettája?", "Közepes", "Kis", "Nagy"], ["Melyik egy chatbot neve?", "Málik Irén", "Stohl András", "Ben Dover"], ["Mi lett az L-ből az ismert népzene szerint?", "W", "N", "Szalonna"], ["Beugratós-e a Kvízapo.hu?", "Igen", "1kg vas", "GWM Music Production"], ["Hol található Nagybajom?", "Somogy megyében", "Az Isten háta mögött", "Csenevész mellett"], ["Mi a megfelelő öltözet(úgymond viselet) egy programozónak?", "Combzokni hozzá illő kiegészítőkkel", "Fehér ing", "Kényszerzubbony"], ["Mi 2022.10.07. vicces szava?", "Hebehurgya", "Istók", "Öblös"], ["Mennyit posztol Sanyi bá naponta?", "∞", "3", "Sándor"]];
const questions = [];
input.forEach(q => {
    questions.push(new Question(q));
});

let randq;
let QuizInForeground;
function ModifyQuizInForeground(q){
    QuizInForeground = q;
}

let answerable = true;
function Popup(obj, canvas) {
    let timer = document.getElementById("timer");
    timer.innerText = "6";
    answerable = true;
    QuizInForeground = true;
    document.getElementById("popup").style.opacity = "1";
    document.getElementById("popup").style.top = "25%";
    canvas.style.filter = "brightness(30%)";
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
                    if (--obj.question_limit == 0) {
                        obj.isConquered = true;
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
            OffTimer(elem, canvas);
        }
    }, 1000);
}

function OffTimer(element, canvas) {
    setTimeout(() => {
        // let notif = document.getElementById("notif");
        // notif.style.display = "block";
        // notif.style.opacity = "1";
        document.getElementById("popup").style.top = "-900px";
        canvas.style.filter = "brightness(100%)";
        document.getElementById("planet_info").style.display = "flex";
        if (element)
            element.className = "choice";
        
        QuizInForeground = false;
    }, 1000);

}

function validate(element) {
    answerable = false;
    if (element) {
        if (element.innerHTML == `<p>${randq[0].correct}</p>`) {
            element.classList.add("correct");
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