##### Esercizio 1
>[!FAQ]- Creare una calcolatrice per sommare due numeri
> ```Javascript
> function calcolatrice() 
> {
>   let n1= prompt("inserisci il primo valore per la somma");
>   let n2= prompt("inserisci il secondo valore")
>   if (isNaN(n1) || isNaN(n2)) {
>     alert ("Errore: per favore inserisci solo numeri.");
>   }
>   console.log(("il risultato della somma è "+(Number(n1)+Number(n2))));  
> }
> calcolatrice();
> ```
##### Esercizio 2
>[!FAQ]- Realizzare una calcolatrice con oggetti e metodi deve Permettere l'inserimento di due numeri (funzione inserisci) deve Implementare i metodi somma, sottrazione, moltiplicazione e di divisione
>```Javascript
>let calcolatrice={
>   numero1:0,
>   numero2:0,
>   menu:function(){
>     this.inseriscinumeri();
> 	switch(Number(prompt("scegli cosa vuoi fare: 1=somma 2=sottrazione 3=moltiplicazione 4=divisione"))){
>     case 1:
>     	this.sommanumeri();
>           break;
>     case 2:
>     	this.sottrainumeri();
>           break;
>     case 3:
>     	this.moltiplicainumeri();
>           break;
>     case 4:
>     	this.divisionenumeri();
>           break; 
>     }
>   },
>   inseriscinumeri:function(){
>     this.numero1= Number(prompt("inserisci il primo numero"));
>     this.numero2= Number(prompt("inserisci il secondo numero"));
>     },
>   sommanumeri:function(){
>     alert("risultato è "+ (this.numero1+this.numero2));
>     },
>   sottrainumeri:function(){
>     alert("risultato è "+ (this.numero1-this.numero2));
>     },
>   moltiplicainumeri:function(){
>     alert("risultato è "+ (this.numero1*this.numero2));
>     },
>   divisionenumeri:function(){
>     if(this.numero2==0){
>       alert("divisione con 0 impossibile")} 
>     else {alert("risultato è "+ (this.numero1 / this.numero2));
>         }
>     }
>   };
> calcolatrice.menu();
>```
##### Esercizio 3
>[!FAQ]-  Crea un array con i giorni della settimana poi modificalo rendendolo compatibile con i giorni della settimana americani posizione 0 domenica poi lunedì ecc...
> ```Javascript
> let settimana=["lunedì","martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"];
> console.log(settimana[0]+"  "+ settimana[6]);
> let domenica=settimana.pop();
> settimana.unshift(domenica);
> console.log(settimana[0]+"  "+ settimana[1]);
> ```
##### Esercizio 4
>[!FAQ]-  `let names = ['mario', 'giovanna', 'pippo'];`
> Modificare l’array per:
> 1. Convertire i nomi in maiuscolo
> 2. Aggiungere `"Dr. "` prima del nome
> 3. Calcolare chi ha il nome più lungo
> ```Javascript
> let names = ['mario', 'giovanna', 'pippo'];
> let max=names[0].length;
> for(i in names)
> {
>   let nome=names[i]
>   if (nome.length >= max) {max=nome.length;}
>   names[i]="Dr."+ nome.toUpperCase();
> }
> console.log(names);
> console.log(max)
> ```
##### Esercizio 5
> [!FAQ]- Realizzare un modello di dati per un sito di e-commerce con:
> - Un array DI OGGETTI contenente i prodotti (`id`, `descrizione`, `costo`, `disponibilità`)
> - Un oggetto `"carrello"` con metodi:
>     - `aggiungi`
>     - `rimuovi`
>     - `guarda`
> ```Javascript
> let prodotti=[
> 
>   { id:0,
> 
>     descrizione:"Farina 00",
> 
>     costo:50,
> 
>     disponibilità:4
> 
>   },
> 
>     {id:1,
> 
>     descrizione:"Farina 01",
> 
>     costo:34,
> 
>     disponibilità:1
> 
>   },
> 
>     {id:2,
> 
>     descrizione:"Puzzette",
> 
>     costo:1,
> 
>     disponibilità:12231123213
>   }
> ];
> 
> let carrello = 
> {
>     oggetti: [],
>   	aggiungi: function () {
>     	let idScelto = Number(prompt("Inserisci l'ID del prodotto che vuoi comprare:"));
>     	let prodottoTrovato = prodotti.find(p => p.id === idScelto);
>     	if (prodottoTrovato)
>         	{
>     		this.oggetti.push(prodottoTrovato);
>           	alert("prodotto inserito "+prodottoTrovato.descrizione);
>         	}
>     	else
>         	{
>           	 alert("ID non trovato!");
>         	}
> 		},
> 	rimuovi:function(){
> 		let idScelto = Number(prompt("Inserisci l'ID del prodotto che vuoi eliminare:"));
>         let oggettoTrovato = this.oggetti.findIndex(p => p.id === idScelto);
>       	if(oggettoTrovato!==-1)
>           {
>       		let descrizione=this.oggetti[oggettoTrovato].descrizione;
>             this.oggetti.splice(oggettoTrovato, 1);
>             alert("ID eliminato! "+descrizione);
>           }
>       	else{
>           	 alert("ID non trovato!");
>         	}
> 	},
> 	guarda:function(){
>       let s="";
>       for(i of this.oggetti)
>       {
>         s+=i.id+ " "+ i.descrizione+ " "+ i.costo+ " \n";
>       }
>       alert(s);
>     }
> }
> 
> carrello.aggiungi();
> carrello.guarda();
> carrello.rimuovi();
> carrello.guarda();
> ```
##### Esercizio 6
>[!FAQ]- Stampare `"ciao"` ogni 5 secondi per un massimo di 4 volte
> - Ricaricare ogni X secondi una pagina (ad es. sito di un giornale online)
> ```Javascript
> let cont=0
> let id=setInterval(()=>
>       {
>           alert("ciao");
>           cont++;
>         if(cont>=4){
> 		clearInterval(id);
>     		}
>       },5000);
> 
> setTimeout(()=>location.reload(),5000);
> ```
##### Esercizio 7
>[!FAQ]-  Creare tramite closure un oggetto `Player`
> - Implementare le funzioni di movimento:
>     - su
>     - giù
>     - destra
>     - sinistra
> 
> ```Javascript
> function player() {
> 
>             let x=0;
> 
>             let y=0;
> 
>             return{
> 
>                 su: ()=> y--,
> 
>                 giu: ()=> y++,
> 
>                 destra: ()=> x++,
> 
>                 sinistra: ()=> x--,
> 
>                 mostrapos:()=> console.log(x+""+""+y)
> 
>             };
> 
>         }
> 
>         let primo=new player();
> 
>         primo.destra();
> 
>         primo.destra();
> 
>         primo.su();
> 
>         primo.mostrapos();
> ```
##### Esercizio 8
>[!FAQ]-  Far dire il proprio nome ai 3 studenti  – implementare `Student.sayName()`
> ```Javascript
> function Studente(nome, cognome, matricola)
> {
>     this.nome = nome;
>     this.cognome = cognome;
>     this.matricola = matricola;
> }
> Studente.prototype={sayName:function(){console.log(this.nome)}};
> 
> let paolo=new Studente("paolo","gianno","0342321");
> paolo.sayName();
> ```
##### Esercizio 9
>[!FAQ]- fare un piccolo videogioco, dove c'è il div che si muove e noi dobbiamo cliccarlo
> ```Javascript
> function haiVinto(e)
> 
> {
> 
>     alert('hai vinto');
> 
> }
> 
> const el=document.getElementById("clickme");
> 
> const bod=document.body; //oppure document.getElementsByTagName('body')[0]; perchè abbiamo una lista e prendiamo il primo
> 
> //el.style.backgroundColor='black';
> 
> bod.style.backgroundColor='white';
> 
> let divIsBlack=true;
> 
> function moveTheDiv(){
> 
>     if (divIsBlack)
> 
>         {
> 
>             //el.style.backgroundColor='white';
> 
>             bod.style.backgroundColor='black';
> 
>         }
> 
>         else{
> 
>             //el.style.backgroundColor='black';
> 
>             bod.style.backgroundColor='white';
> 
>         }
> 
>         divIsBlack=!divIsBlack;
> 
>     console.log('eccomi');
> 
>     el.style.marginLeft=Math.random()*500+"px";
> 
>     el.style.marginTop=Math.random()*500+"px";
> 
> }
> 
> el.addEventListener('click',haiVinto);
> 
> const INTERVAL=1000;
> 
> setInterval(moveTheDiv,INTERVAL);
> ```
> 
##### Esercizio 10
>[!FAQ]- Altro esercizio tutte le volte che premi un pulsante cambia la foto nello sfondo 
> ```Javascript
> const imgel= document.getElementById("my-image");
> const button= document.getElementById("change-img");
> let img=[
>     "https://media.istockphoto.com/id/1503385646/it/foto/ritratto-divertente-e-felice-shiba-inu-cucciolo-di-cane-che-fa-capolino-da-dietro-una-bandiera.jpg?s=612x612&w=0&k=20&c=rDIu9qMDJdPIwmpb88ms3cOZ6E04qT2EaAGQIxOE8Uw=",
>     "https://media.eliocarchidi.com/uploads/2017/05/foto-cani-bellissimi-meticci-13.jpg",
>     "capture.PNG"
> ];
> let randomIndex=0;
> imgel.src=img[randomIndex];
> function changeImage(){
>     randomIndex= (randomIndex+1)%img.length;
>     imgel.src=img[randomIndex];
> }
> button.addEventListener("click", changeImage);
> ```
##### Esercizio 11
>[!FAQ]- Altro esercizio crea una wishlist con desideri da aggiungere
> ```Javascript
> 
> const but=document.getElementById("add-item");
> 
> const list=document.getElementById("wish-list");
> 
> function addWish()
> 
> {
> 
>     const newWish=prompt("Enter your wish:");
> 
>     if(newWish)    {
> 
>         const listItem=document.createElement("li");
> 
>         listItem.textContent=newWish;
> 
>         //const txt= document.createTextNode(newWish);
> 
>         list.appendChild(listItem);
> 
>     }
> 
> }
> 
> but.addEventListener("click",addWish);
> 
> ```

##### Esercizio 12
>[!FAQ]- Associamo una funzione js quando si clikka un div  poi presentiamo un “alert” all’utente
>
> ```html
> <!DOCTYPE html>
> 
> <html lang="en">
> 
> <head>
> 
>     <meta charset="UTF-8">
> 
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
> 
>     <title>Document</title>
> 
>     <script src="script.js" defer></script>
> 
> </head>
> 
> <body>
> 
>     <div id="myDiv">click me</div>
> 
> </body>
> 
> </html>
> ```
> 
> ```Javascript
> const div=document.getElementById("myDiv");
> div.addEventListener("click",()=>alert("ciao"));
> ```
> 
##### Esercizio 13
>[!FAQ]- Prendere esercizio precedente e spostare  dinamicamente il div ogni X secondi  
> • Ogni volta che si sposta, cambiare il colore del  background e del div da bianco a nero e viceversa
>
> 
> ```html
> <!DOCTYPE html>
> 
> <html lang="en">
> 
> <head>
> 
>     <meta charset="UTF-8">
> 
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
> 
>     <title>Document</title>
> 
>     <script src="script.js" defer></script>
> 
>     <style>
> 
>         #myDiv{
> 
>             width: 100px;
> 
>             height: 50px;
> 
>             position:absolute;
> 
>         }
> 
>     </style>
> 
> </head>
> 
> <body>
> 
>     <div id="myDiv">click me</div>
> 
> </body>
> 
> </html>
> ```
> 
> 
> ```Javascript
> const div=document.getElementById("myDiv");
> 
> div.addEventListener("click",()=>alert("ciao"));
> 
> let bool=true
> 
> function funzione()
> 
> {
> 
>     div.style.marginTop=300*Math.random()+"px";
> 
>     div.style.marginLeft=600*Math.random()+"px";
> 
>     if(bool){
> 
>         div.style.backgroundColor="white";  
> 
>         document.body.style.backgroundColor="black";
> 
>         bool=false;
> 
>     }
> 
>     else{
> 
>         div.style.color="black";  
> 
>         document.body.style.backgroundColor="white";
> 
>         bool=true;
> 
>     }
> 
> }
> 
> setInterval(funzione,1000);
> ```
##### Esercizio 14
>[!FAQ]- Aggiungere dinamicamente un elemento a una lista
> ```html
> <!DOCTYPE html>
> 
> <html lang="en">
> 
> <head>
> 
>     <meta charset="UTF-8">
> 
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
> 
>     <title>Document</title>
> 
>     <script defer src="script.js"> </script>
> 
> </head>
> 
> <body>
> 
>     <h3>lista della spesa</h3>
> 
>     <ul id="listaspesa">
> 
>         <li>cacao</li>  
> 
>         <li>peffozza</li>
> 
>         <li>sivallets</li>
> 
>     </ul>
> 
>     <button id="aggiungi">aggiungi nuovo li</button>
> 
> </body>
> 
> </html>
> ```
> 
> ```Javascript
> function aggiungi()
> 
> {
> 
>     let newli=document.createElement("li");
> 
>     let testo=prompt("scrivi cosa vuoi aggiungere")
> 
>     let text=document.createTextNode(testo);
> 
>     newli.appendChild(text);
> 
>     document.getElementById("listaspesa").appendChild(newli);
> 
>   
> 
> }
> 
>   
>   
> 
> document.getElementById("aggiungi").addEventListener("click",aggiungi);
> ```
##### Esercizio 15
Creare un json con la lista degli esami svolti • Visualizzarlo i dati in una pagina con una tabella

##### Esercizio 16
>[!FAQ]-  Costruisce una promise che si risolve dopo 5 secondi. 
> – Il valore della promessa dovrebbe essere: "la mia prima promise è stata un successo!" su console
>
> const promise=new Promise(function(resolve,reject)
> 
>     {
> 
>         setTimeout(function()
> 
>         {resolve("la mia prima promise è stata un successo!")},5000);
> 
>     }
> 
> );
> 
> promise.then(function(messaggio)
> 
>     {
> 
>         console.log(messaggio);
> 
>     }
> 
> );

##### Esercizio 17
>[!FAQ]- Come esercizio possiamo creare due bottoni, ad esempio `button1` e `button2`.
>Quando clicchiamo un bottone, viene chiamata una funzione che fa una richiesta al server e recupera i dati di una persona in base al suo `id`

Esercizi vari alle ultime slide con una sorta di quiz
