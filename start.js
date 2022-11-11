function start(){
    
}

function exit() {
    window.open("https://bigrat.monster/");
//     setTimeout(exit, 0.01);
    window.close();
}

window.addEventListener('resize', () => {
    const browserZoomLevel = window.devicePixelRatio;
  
    if (browserZoomLevel != 1) {
      document.getElementById("zum").style.display = "block";
      document.getElementById("main").style.display = "none";
    }
    else {
        document.getElementById("zum").style.display = "none";
        document.getElementById("main").style.display = "block";
    }
})
