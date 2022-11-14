class Question{
    constructor(q){
        // const randb = Math.floor(Math.random() * 2) + 1;
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
    }
}

const input = [["Ki Kriszhadvice?","Tanács Krisztián","A prediction-ök démonja","A Béke Szigetének őrzője"], ["?","A","B","C"], ["!", "1", "2", "3"]];
const questions = [];

input.forEach(q => {
    questions.push(new Question(q));
});

let randq;

function Popup(){
    document.getElementById("popup").style.visibility = "visible";
    randq = Math.floor(Math.random() * input.length);
    document.getElementById("question").innerHTML = questions[randq].question;
    document.getElementById("ch1").innerHTML = `<p>${questions[randq].answers.pop(Math.floor(Math.random() * 2) + 1)}</p>`;
    document.getElementById("ch2").innerHTML = `<p>${questions[randq].answers.pop(Math.floor(Math.random() * 2) + 1)}</p>`;
    document.getElementById("ch3").innerHTML = `<p>${questions[randq].answers.pop(Math.floor(Math.random() * 2) + 1)}</p>`;
}

function Answer(a){
    console.log(a.innerHTML)
    console.log(`<p>${questions[randq].correct}</p>`)
    if (a.innerHTML == `<p>${questions[randq].correct}</p>`) {
        document.getElementById(a.id).style.backgroundColor = "rgb(0,255,0)";
    }
    else{
        document.getElementById(a.id).style.backgroundColor = "rgb(255,0,0)";
    }
}

Popup();