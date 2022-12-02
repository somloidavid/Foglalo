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
        // setTimeout(() => {}, 3000);
    }
}