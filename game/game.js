class Question{
    constructor(q){
        // const randb = Math.floor(Math.random() * 2) + 1;
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
        console.log(this.answers)
    }
}

const input = [["Ki Kriszhadvice?","Tanács Krisztián","A prediction-ök démonja","A Béke Szigetének őrzője"], ["Milyen méretű Herby cigarettája?","Közepes","Kis","Nagy"], ["Melyik egy chatbot neve?", "Málik Irén", "Stohl András", "Ben Dover"], ["Mi lett az L-ből az ismert népzene szerint?", "W", "N", "Szalonna"]];
const questions = [];

input.forEach(q => {
    questions.push(new Question(q));
});

let randq;

function Popup(){
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById("popup").style.opacity = "1";
    randq = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById("question").innerHTML = randq.question;
    document.getElementById("ch1").innerHTML = `<p>${randq.answers.splice(Math.random() * randq.answers.length, 1)}</p>`;
    document.getElementById("ch2").innerHTML = `<p>${randq.answers.splice(Math.random() * randq.answers.length, 1)}</p>`;
    document.getElementById("ch3").innerHTML = `<p>${randq.answers.splice(Math.random() * randq.answers.length, 1)}</p>`;
    let timer = document.getElementById("timer");
    let interval = setInterval(() => {
        timer.innerHTML = `<p>${parseInt(timer.innerText) - 1}</p>`;
        console.log(interval)
        if (timer.innerText <= 0){
            clearInterval(interval);
            OffTimer();
        }
    }, 1000);
}

let answered = false;
function Answer(a){
    if (!answered) {
        document.getElementById(a.id).style.border = "thick solid orange";
        answered = true;
        if (a.innerHTML == `<p>${randq.correct}</p>`) {
            setTimeout(() => {
                document.getElementById(a.id).style.backgroundColor = "rgb(0,255,0)";
              }, 1000);
        }
        else{
            setTimeout(() => {
                document.getElementById(a.id).style.backgroundColor = "rgb(255,0,0)";
            }, 1000);
        }
    }
}

function OffTimer(){
    let main = document.getElementById("main");
    main.innerHTML = `<div id="notif"></div>`;
    let notif = document.getElementById("notif");
    notif.style.width = "55%";
    notif.style.height = "30vh";
    notif.style.margin = "35vh auto";
    notif.style.backgroundColor = "red";
    notif.style.opacity = "0";
    notif.style.transition = "opacity 1s";
    notif.innerHTML = `<div id="OffTimerBox"><p id="OffTimerText">Lejárt az idő!</p></div>`
    let OffTimerBox = document.getElementById("OffTimerBox");
    OffTimerBox.style.margin = "12vh auto";
    OffTimerBox.style.height = "6vh";
    OffTimerBox.style.top = "10vh";
    OffTimerBox.style.position = "relative";
    let OffTimerText = document.getElementById("OffTimerText");
    OffTimerText.style.fontSize = "6vh";
}

Popup();