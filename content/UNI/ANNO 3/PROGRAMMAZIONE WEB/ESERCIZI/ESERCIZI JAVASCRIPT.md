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
Realizzare una calcolatrice con oggetti e metodi
- Permettere l'inserimento di due numeri (funzione inserisci)
- Implementare i metodi somma, sottrazione, moltiplicazione e di divisione
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
Realizzare un modello di dati per un sito di e-commerce con:
- Un array DI OGGETTI contenente i prodotti (`id`, `descrizione`, `costo`, `disponibilità`)
- Un oggetto `"carrello"` con metodi:
    - `aggiungi`
    - `rimuovi`
    - `guarda`

##### Esercizio 6
- Stampare `"ciao"` ogni 5 secondi per un massimo di 4 volte
- Ricaricare ogni X secondi una pagina (ad es. sito di un giornale online)
##### Esercizio 7
Creare tramite closure un oggetto `Player`
- Implementare le funzioni di movimento:
    - su
    - giù
    - destra
    - sinistra
##### Esercizio 8
Far direi il proprio nome ai 3 studenti  – implementare `Student.sayName()`
