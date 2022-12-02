class Question {
    constructor(q) {
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
        console.log(this.answers)
    }
}

const input = [["Ki Kriszhadvice?", "Tanács Krisztián", "A prediction-ök démonja", "A Béke Szigetének őrzője"], ["Milyen méretű Herby cigarettája?", "Közepes", "Kis", "Nagy"], ["Melyik egy chatbot neve?", "Málik Irén", "Stohl András", "Ben Dover"], ["Mi lett az L-ből az ismert népzene szerint?", "W", "N", "Szalonna"]];
const questions = [];

// input.forEach(q => {
//     questions.push(new Question(q));
// });

let randq;

function Popup() {
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
        if (timer.innerText <= 0) {
            clearInterval(interval);
            OffTimer();
        }
        else if (answered) {
            clearInterval(interval);
        }
    }, 1000);
}

let answered = false;
function Answer(a) {
    if (!answered) {
        document.getElementById(a.id).style.border = "thick solid orange";
        answered = true;
        if (a.innerHTML == `<p>${randq.correct}</p>`) {
            setTimeout(() => {
                document.getElementById(a.id).style.backgroundColor = "rgb(0,255,0)";
            }, 1000);
        }
        else {
            setTimeout(() => {
                document.getElementById(a.id).style.backgroundColor = "rgb(255,0,0)";
            }, 1000);
        }
    }
}

function OffTimer() {
    let notif = document.getElementById("notif");
    notif.style.visibility = "visible";
    notif.style.opacity = "1";
    document.getElementById("popup").style.visibility = "hidden";
}

// Popup()