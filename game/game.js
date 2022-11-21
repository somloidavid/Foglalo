class Question{
    constructor(q){
        // const randb = Math.floor(Math.random() * 2) + 1;
        this.question = q[0];
        this.correct = q[1];
        this.answers = [q[1], q[2], q[3]];
        console.log(this.answers)
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
    randq = questions[Math.floor(Math.random() * questions.length)];
    console.log(randq)
    document.getElementById("question").innerHTML = randq.question;
    let r_index = randq.answers[Math.floor(Math.random() * randq.answers.length)];
    console.log(randq.answers[r_index]);
    document.getElementById("ch1").innerHTML = `<p>${randq.answers[r_index]}</p>`;
    randq.answers.splice(r_index);
    r_index = randq.answers[Math.floor(Math.random() * randq.answers.length)];
    document.getElementById("ch2").innerHTML = `<p>${randq.answers.pop(Math.floor(Math.random() * randq.answers.length))}</p>`;
    randq.answers.splice(r_index);
    r_index = randq.answers[Math.floor(Math.random() * randq.answers.length)];
    document.getElementById("ch3").innerHTML = `<p>${randq.answers.pop(Math.floor(Math.random() * randq.answers.length))}</p>`;
    randq.answers.splice(r_index);
}

function Answer(a){
    console.log(a.innerHTML)
    console.log(`<p>${randq.correct}</p>`)
    if (a.innerHTML == `<p>${randq.correct}</p>`) {
        document.getElementById(a.id).style.backgroundColor = "rgb(0,255,0)";
    }
    else{
        document.getElementById(a.id).style.backgroundColor = "rgb(255,0,0)";
    }
}

Popup();