class Question {
    constructor(q) {
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
        // console.log(this.answers)
    }
}

const input = [["Ki Kriszhadvice?", "Tanács Krisztián", "A prediction-ök démonja", "A Béke Szigetének őrzője"], ["Milyen méretű Herby cigarettája?", "Közepes", "Kis", "Nagy"], ["Melyik egy chatbot neve?", "Málik Irén", "Stohl András", "Ben Dover"], ["Mi lett az L-ből az ismert népzene szerint?", "W", "N", "Szalonna"]];
const questions = [];

input.forEach(q => {
    questions.push(new Question(q));
});

let randq;

function Popup() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup").style.opacity = "1";
    randq = questions.splice(Math.floor(Math.random() * questions.length), 1);
    console.log(randq[0].answers);
    document.getElementById("question").innerHTML = randq[0].question;
    const ch1 = document.getElementById("ch1");
    const ch2 = document.getElementById("ch2");
    const ch3 = document.getElementById("ch3");
    ch1.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;
    ch2.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;
    ch3.innerHTML = `<p>${randq[0].answers.splice(Math.random() * randq[0].answers.length, 1)}</p>`;

    // let timer = document.getElementById("timer");
    // let interval = setInterval(() => {
    //     timer.innerHTML = `<p>${parseInt(timer.innerText) - 1}</p>`;
    //     console.log(interval)
    //     if (timer.innerText <= 0) {
    //         clearInterval(interval);
    //         OffTimer();
    //     }
    //     else if (answered) {
    //         clearInterval(interval);
    //     }
    // }, 1000);
}

function OffTimer() {
    let notif = document.getElementById("notif");
    notif.style.display = "block";
    notif.style.opacity = "1";
    document.getElementById("popup").style.display = "none";
}

export { Popup };

