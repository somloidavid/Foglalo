import { randq, ModifyQuizInForeground} from "./questions.js";

let answered = false;
function Answer(a) {
    if (!answered) {
        let element = document.getElementById(a);
        element.style.border = "thick solid orange";
        answered = true;
        if (element.innerHTML == `<p>${randq.correct}</p>`) {
            setTimeout(() => {
                element.style.backgroundColor = "rgb(0,255,0)";
            }, 1000);
        }
        else {
            setTimeout(() => {
                element.style.backgroundColor = "rgb(255,0,0)";
            }, 1000);
        }
        setTimeout(() => {
            document.getElementById("popup").style.display = "none";
            element.style.border = "none";
            element.style.backgroundColor = "#fff";
            ModifyQuizInForeground(false);
        }, 3000);
    }
}

export { answered, Answer };