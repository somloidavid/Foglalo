import { randq , QuizInForeground} from "./questions.js";

let answered = false;
document.getElementById ("ch1").addEventListener ("click", Answer("ch1"));
document.getElementById ("ch2").addEventListener ("click", Answer("ch2"));
document.getElementById ("ch3").addEventListener ("click", Answer("ch3"));
function Answer(a) {
    if (!answered) {
        let element = document.getElementById(a);
        document.getElementById(a).style.border = "thick solid orange";
        answered = true;
        if (element.innerHTML == `<p>${randq[0].correct}</p>`) {
            setTimeout(() => {
                document.getElementById(a).style.backgroundColor = "rgb(0,255,0)";
            }, 1000);
        }
        else {
            setTimeout(() => {
                document.getElementById(a).style.backgroundColor = "rgb(255,0,0)";
            }, 1000);
        }
        setTimeout(() => {
            document.getElementById("popup").style.display = "none";
            QuizInForeground = false;
        }, 3000);
    }
}

export { answered };