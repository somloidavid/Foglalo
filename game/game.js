function inspect(a){
    console.log(a)
    const elso = document.getElementById("elso");
    const masodik = document.getElementById("masodik");
    const harmadik = document.getElementById("harmadik");
    const negyedik = document.getElementById("negyedik");
    const lore = document.getElementById("lore");
    const stat = document.getElementById("stat");
    const nev = document.getElementById("nev");
    const titulus = document.getElementById("titulus");
    
    if(a == 1){
        elso.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
        lore.innerText = " Sanyit 5x baszták ki instáról mert rasszista oltásellenes buta és mihazánkos, valamint pornót posztol. Igazi nagymagyar ezért fontosnak tartja magyarország fia, KriszhAdvice megmentését attól függetlenül hogy cigá.."
        stat.innerText = "mi"
        nev.innerText = "Sanyi"
        titulus.innerText = "Sándor Sanyi , barátoknak csak Sanyi"
      }
     if(a == 2){
        masodik.classList.add("highlighted")
        elso.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
        lore.innerHTML = "Gémes Norbert a Téti maffia vezetője ,mindennapjaiban tehetséges vezetője a Tét VÁROS(nem falu)beli illegális üzleti életnek, valamint kegyetlenül írtja az <a href='https://cdn.discordapp.com/attachments/938790196147781642/966386047061745714/IMG_4399.png' target='_blank'>oppokat</a>"
        stat.innerText = "mi"
        nev.innerText = "Gémes Norbrt"
        titulus.innerText = "Andrew Tét másnéven a Téti maffia feje"
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
