function inspect(a){
    console.log(a)
    const elso = document.getElementById("elso");
    const masodik = document.getElementById("masodik");
    const harmadik = document.getElementById("harmadik");
    const negyedik = document.getElementById("negyedik");
    
    if(a == 1){
        elso.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
     }
     if(a == 2){
        masodik.classList.add("highlighted")
        elso.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
     }
     if(a == 3){
        harmadik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        elso.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
     }
     if(a == 4){
        negyedik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        elso.classList.remove("highlighted")        
     }

}
