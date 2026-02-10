- member
```scss
member(X,[X|_]).
member(X,[_|T]):-
    member(X,T).
```
- concat
```scss
concat([],L,L).
concat([H|T],L2,[H|L3]):-
    concat(T,L2,L3).
```
- append
```scss
append(X,[],[X]).
append(X,[H|T],[H|L3]):-
    append(X,T,L3).
```
- lunghezza
```scss
lunghezza([],0).
lunghezza([_|T],N):- lunghezza(T,N1) , N is N1+1.
```
- reverse
```scss
reverse([],[]).
reverse([H|T],L4):-
    reverse(T,L3),
    append(H,L3,L4).
```

🟢 ESERCIZIO 1 – CUT come scelta definitiva Definisci un predicato prezzo/2. Regole: se il cliente è vip, il prezzo è scontato per tutti gli altri, il prezzo è normale Vincolo: quando riconosci vip, non devono esserci altre soluzioni Query da testare: prezzo(vip, P). prezzo(standard, P). 
- Qui capisci a cosa serve la cut.
- cliente(mario, vip). cliente(luca, standard). cliente(anna, standard).
```scss
cliente(mario,vip).
cliente(mario,standard).
cliente(luca, standard). 
cliente(anna, standard).
prezzo(Cliente,50):-
    cliente(Cliente,vip), !.
prezzo(Cliente,100):-
    cliente(Cliente,standard). 
```

🟢 ESERCIZIO 2 – 
CUT come if–else Definisci esito_esame/2. 
Regole: voto ≥ 18 → promosso voto < 18 → bocciato Vincolo: 
se il primo caso vale, il secondo non deve essere provato 
Query: esito_esame(Nome, E). esito_esame(Nome, E).

``` scss
voto(marco, 28).
voto(luisa, 18).
voto(paolo, 12).
voto(marco, 28).
voto(luisa, 18).
voto(paolo, 12).


esito(Nome, promosso):-
    voto(Nome, Q),
    	Q >= 18, !.

esito(Nome, bocciato):-
    voto(Nome, Q), Q<18 .
    
```

🟢 ESERCIZIO 3 – 
(facile, classico da orale) Testo Scrivi il predicato: massimo(X,Y,M) che restituisce in M il maggiore tra X e Y. Vincoli usa una sola cut evita soluzioni alternative 
Esempi ?- massimo(3,5,M). M = 5. ?- massimo(7,2,M). M = 7. 
- Perché è importante Qui impari: cut deterministica come evitare backtracking inutile
	- 👉 Devi saper dire: “La cut serve a bloccare il secondo caso quando il primo è vero”
```scss
massimo(X,Y,X):-
    X >= Y, !.

massimo(X,Y,Y):-
    X<Y .
```

#### SIMIL esame
🧠 ESERCIZIO — Stile esame, versione semplificata Testo 

Si considerino i seguenti fatti: 
dipendente(mario, marketing). 
dipendente(luigi, sviluppo).
dipendente(anna, marketing). 
dipendente(paolo, risorse_umane). 

Scrivere il predicato: 
stesso_dipartimento(X, Y) che è vero se: 
X e Y lavorano nello stesso dipartimento X e Y sono persone diverse 

ogni coppia va data una sola volta 

Esempi attesi 
?- stesso_dipartimento(X,Y). 
X = mario, Y = anna. 

NON deve dare anche: X = anna, Y = mario.

```scss
:- dynamic scarta/2.
dipendente(mario, marketing). 
dipendente(luigi, sviluppo).
dipendente(anna, marketing). 
dipendente(sbubbu, marketing). 
dipendente(paolo, risorse_umane). 



stessodip(X,Y):-
    dipendente(X,Q1),
    dipendente(Y,Q1),
    X\=Y,
    not(scarta(X,Y)),
    assert(scarta(X,Y)),
    assert(scarta(Y,X)),
    write(X), write('-'), write(Y),writeln(''),
    fail.
```

ESERCIZIO (facile, stile esame) Hai questi fatti: 
assunto(mario, marketing, 2024, 12). 
assunto(anna, marketing, 2024, 12). 
assunto(luca, marketing, 2024, 11). 
assunto(paolo, sviluppo, 2024, 12). 
assunto(giulia,sviluppo, 2024, 12). 
assunto(rita, sviluppo, 2023, 12). 

Scrivi il predicato: stessa_assunzione(Dip, Anno, Mese, X, Y) 

che è vero se: X e Y sono due persone diverse sono state assunte nello stesso Dipartimento stesso Anno e stesso Mese e la coppia deve uscire una sola volta (non anche invertita) In più, scrivi: 
stampa_coppie(Dip, Anno, Mese) che stampa tutte le coppie per quel dip/anno/mese usando fail (loop di stampa). 

Esempio atteso 
?- stessa_assunzione(marketing, 2024, 12, X, Y).
X = mario, Y = anna. 
e 
?- stampa_coppie(sviluppo, 2024, 12).
paolo - giulia true.

```scss
:- dynamic scarta/2.
assunto(mario, marketing, 2024, 12). 
assunto(anna, marketing, 2024, 12). 
assunto(luca, marketing, 2024, 11). 
assunto(paolo, sviluppo, 2024, 12). 
assunto(giulia,sviluppo, 2024, 12). 
assunto(edoardo,sviluppo, 2024, 12). 
assunto(melforz,sviluppo, 2024, 12). 
assunto(rita, sviluppo, 2023, 12). 


stampa_coppie(Dip,Anno,Mese):-
    stessa_assunzione(Dip, Anno, Mese, X, Y),
    write(X),write('-'),write(Y),writeln(''),
    fail.


stessa_assunzione(Dip, Anno, Mese, X, Y):-
	assunto(X,Dip,Anno,Mese), 
	assunto(Y,Dip,Anno,Mese),
	X\=Y,
	not(scarta(X,Y)),
	assert(scarta(X,Y)),
	assert(scarta(Y,X)).
```

Versione semplificata (fattibile subito) 
Hai 8 giocatori (non 30). 
Ogni giocatore ha 2 dati: 
punti e falli.
Fatti tipo: 
giocatore(mario, 20, 2). 
giocatore(anna, 15, 1). ... 
Definisci: 
prestazione(Nome, Valore) dove Valore = Punti - 3*Falli. 

Definisci: migliore_giocatore(Nome) vero se Nome è quello con prestazione massima. 

Vincoli: niente liste niente findall puoi usare cut e fail puoi usare assert/retract come hai fatto con visto/2 Perché è la versione giusta per te stesso concetto “massimizza” ma senza combinazioni di 5 giocatori ti allena al pezzo 
“scelgo il migliore”, che è la parte chiave della traccia
```scss
giocatore(mario,   20, 2).
giocatore(anna,    18, 1).
giocatore(luca,    15, 0).
giocatore(paolo,   22, 4).
giocatore(giulia,  17, 2).
giocatore(rita,    10, 1).
giocatore(sergio,  25, 5).
giocatore(elena,   19, 1).

prestazione(Nome,Valore):-
    giocatore(Nome,X,Y),
    Valore is X - 3*Y.

miglior_giocatore(Nome):-
    prestazione(Nome,Valore),
    not( (prestazione(_,Val), Val > Valore) ).
```


trova il max

```scss
maxlista([X],X).
maxlista([H|T],X):-
    maxlista(T,X1),
    ( H>=X1, X is H; X is X1) .
```


fai FINDALL, BAGOF, SETOF
```scss
:- dynamic visto/2.

dipendente(mario, marketing).
dipendente(luigi, sviluppo).
dipendente(valerio, sviluppo).
dipendente(anna, marketing).
dipendente(luca, marketing).
dipendente(paolo, risorse_umane).


stesso_dipartimento(X, Y, Coppie) :-
    setof([X,Y], 
          (dipendente(X, Z), dipendente(Y, Z), X\=Y, not(visto(X, Y)), assert(visto(X, Y)), assert(visto(Y, X))), 
          Coppie).   
          
```
