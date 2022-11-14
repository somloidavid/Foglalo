class Question{
    constructor(q){
        const randb = Math.floor(Math.random() * 2) + 1;
        this.question = q[0];
        this.correct = q[1];
        this.first = q[];
        this.second = ;
        this.third = ;
    }
}

const input = [["Ki Kriszhadvice?","Tanács Krisztián","A prediction-ök démonja","A Béke Szigetének őrzője"], ["?","A","B","C"], ["!", "1", "2", "3"]];
const questions = [];

input.forEach(q => {
    questions.push(new Question(q));
});

function Popup(){
    const randq = Math.floor(Math.random() * input.length);
    document.getElementById("question").innerText = questions[randq].question;
    document.getElementById("ch1").innerText = questions[randq];
}

function Answer(a){
    if (a.innerText == questions[0].correct) {
        
    }

}