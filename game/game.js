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
        lore.innerHTML = "Gémes Norbert a Téti maffia vezetője ,mindennapjaiban tehetséges vezetője a Tét VÁROS(nem falu)beli illegális üzleti életnek, valamint kegyetlenül írtja az <a href='https://cdn.discordapp.com/attachments/938790196147781642/966386047061745714/IMG_4399.png' target='_blank'>oppokat</a>.Casanova ugymond "
        stat.innerText = "mi"
        nev.innerText = "Gémes Norbrt"
        titulus.innerText = "Andrew Tét másnéven a Téti maffia feje"
     }
     if(a == 3){
        harmadik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        elso.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")           
        lore.innerHTML = "Herby mostani nevén Dely Péter előző életében híres énekes Lil Peep, egy nagyon(xsdxdxd) híres videoblogger amolyan vlogger. napi 32db 1 perces videojat 1000 viewbot követi figyelemmel a 100 000 feliratkozójából. de legalább a cigarettája közepes méretű"
        stat.innerText = "ja"
        nev.innerText = "Herby, Előző életében Lil Peep"
        titulus.innerText = "Sámsoni legenda"
     }
     if(a == 4){
        negyedik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        elso.classList.remove("highlighted")           
        lore.innerHTML = "Kenya Waste igazabol. Miután megcsalták, átverték mély Keresztény lett és ugy gondolta hogy ideje a villian arcnak ezert a kisebbféle zsidóellenességből oda jutott hogy elismerje Hitler jó emberi értékeit, jó keresztényként tartsa számon "
        stat.innerText = "igen"
        nev.innerText = "Kanye West"
        titulus.innerText = "Cancelled mellet az illusztráció konkrétan"        
     }

}
