let karakter = null;
let selected = 4;
import { setselected } from './game.js';
import { main } from './game.js';




function inspect(a){
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
        stat.innerHTML = "<td>IQ</td><td>kevés</td></tr><tr><td>gyorsasag</td><td>kicsi</td></tr> <tr><td>Special</td><td title='Sanyi a Mi Hazánk Betyárseregét segítségül hívva a nagy bolygóknál mindig 2 vel kevesebb kérdéest kell eltalálnia '>Mi Hazánk</td></tr>"
        nev.innerText = "Sanyi"
        titulus.innerText = "Sándor Sanyi , barátoknak csak Sanyi"
        karakter = a
      }
     if(a == 2){
        masodik.classList.add("highlighted")
        elso.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")        
        lore.innerHTML = "Gémes Norbert a Téti maffia vezetője ,mindennapjaiban tehetséges vezetője a Tét VÁROS(nem falu)beli illegális üzleti életnek, valamint kegyetlenül írtja az <a href='https://cdn.discordapp.com/attachments/938790196147781642/966386047061745714/IMG_4399.png' target='_blank'>oppokat</a>.Casanova ugymond "
        stat.innerHTML = "<td>IQ</td><td>???</td></tr><tr><td>gyorsasag</td><td>közepes</td></tr> <tr><td>Special</td><td Title='Andrew Tét úgy van vele hogy kilóra megvehet egy bolygót mert megteheti'>Teli Bag pénz</td></tr>"
        nev.innerText = "Gémes Norbrt"
        titulus.innerText = "Andrew Tét másnéven a Téti maffia feje"
        karakter = a

     }
     if(a == 3){
        harmadik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        elso.classList.remove("highlighted")
        negyedik.classList.remove("highlighted")           
        lore.innerHTML = "Herby mostani nevén Dely Péter előző életében híres énekes Lil Peep, egy nagyon(xsdxdxd) híres videoblogger amolyan vlogger. napi 32db 1 perces videojat 1000 viewbot követi figyelemmel a 100 000 feliratkozójából. de legalább a cigarettája közepes méretű"
        stat.innerHTML = "<td>IQ</td><td>∞</td></tr><tr><td>gyorsasag</td><td>kisé lassú</td></tr> <tr><td>Special</td><td  title='Lil peep elrobbant neha egy közepest emiatt mindenttudóvá válik egy körre de a következő körben ki lesz ütve ami miatt nehezebb kérdést kap'>Közepes méretű</td></tr>"
        nev.innerText = "Herby, Előző életében Lil Peep"
        titulus.innerText = "Sámsoni legenda"
        karakter = a

     }
     if(a == 4){
        negyedik.classList.add("highlighted")
        masodik.classList.remove("highlighted")
        harmadik.classList.remove("highlighted")
        elso.classList.remove("highlighted")           
        lore.innerHTML = "Kenya Waste igazabol. Miután megcsalták, átverték mély Keresztény lett és ugy gondolta hogy ideje a villian arcnak ezert a kisebbféle zsidóellenességből oda jutott hogy elismerje Hitler jó emberi értékeit, jó keresztényként tartsa számon "
        stat.innerHTML = "<td>IQ</td><td><a href='https://cdn.discordapp.com/attachments/1004405326331793548/1048973461466382386/image.png' target='_blank'>133</a></td></tr><tr><td>gyorsasag</td><td>csak egy kicsit</td></tr> <tr><td>Special</td><td title='Hitler támogatása miatt a holdon bújó zombinácik nekiadják a holdat a játék kezdetén'>Mindvégig a Holdon voltak</td></tr>"
        nev.innerText = "Kanye West"
        titulus.innerText = "Cancelled mellet az illusztráció konkrétan"        
        karakter = a

     }

}
function select(){ 
  
   if (karakter !=  null)
   {
      setselected(karakter);
      document.getElementById("planet_info").style.display = "flex"
      document.getElementById("main-canvas").style.display = "block";
      document.getElementById("hide").style.display = "none";
      main()  
   }
}

document.getElementById("gob").onclick = select;
document.getElementById("elso").onclick = function() {
   inspect(1)
};
document.getElementById("masodik").onclick = function() {
   inspect(2)
};
document.getElementById("harmadik").onclick = function() {
   inspect(3)
};
document.getElementById("negyedik").onclick = function() {
   inspect(4)
};
// document.getElementById("masodik").onclick = inspect(2);
// document.getElementById("harmadik").onclick = inspect(3);
// document.getElementById("negyedik").onclick = inspect(4);
// export {selected};


export {selected};