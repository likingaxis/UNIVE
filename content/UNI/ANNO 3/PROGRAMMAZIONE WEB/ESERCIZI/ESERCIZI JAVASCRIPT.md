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
- fare un piccolo videogioco, dove c'è il div che si muove e noi dobbiamo cliccarlo

Altro esercizio tutte le volte che premi un pulsante cambia la foto nello sfondo
Altro esercizio crea una wishlist con desideri da aggiungere