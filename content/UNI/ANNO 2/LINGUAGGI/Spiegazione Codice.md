- Creo 2 classi enum che mi consentono di definire il mezzo e la tipologia senza uscire da queste costanti
- Creo 4 classi
	- Tratta, rappresenta la tratta da un punto a un'altro con una lista di tutte le classi che può avere 
		- utilizza dei metodi di calcolo della tratta in termini di costo e prende la lunghezza la moltiplica per il costo del tipo e per il coefficiente della classe
	- TrattaSpecifica, rappresenta una singola tratta quindi con una sola classe 
		- ha una modifica con override al toString così quando l'oggetto viene stampato presenta una cosa più leggibile 
	- Biglietto, prende la sequenza di tratte e ritorna il suo costo facendo un for di tutta la sequenza e sommando nel prezzo il costo di ogni tratta
		- nel for creo degli oggetti trattespecifiche che rappresentano le singole tratte
		- questo calcolo viene fatto nel costruttore automaticamente
		- ha un toString che ritorna la sequenza delle tratte e il prezzo
	- Main, istanzio 3 oggetti tratta con una lista delle classi disponibili per ognuno
		- scrivo la mia lista percorsoTratte che contiene le tratte
		- e un array che definisce le classi specifiche
		- chiamo biglietto con tratta e classe specifica come array
		- stampo biglietto



`setof` cerca tutte le istanze della variabile `Skill` tali che esistano un fatto `richiesta(Lavoro, Skill)` e un fatto `persona(Persona, Skill)` che unificano sulla stessa skill.  
Le soluzioni vengono raccolte in una lista senza duplicati e ordinate

La cut serve a evitare che Prolog torni indietro e applichi la seconda regola quando la prima ha già prodotto una misura valida.


```scss


persona(mario, [java, c]).
persona(paolo, [prolog]).
persona(marco, [arm]).

richiesta(lavoro1, [java, c]).
richiesta(lavoro2, [prolog]).

lunghezza([],0).
lunghezza([_|T],N):- lunghezza(T,N1) , N is N1+1.

member(X,[X|_]).
member(X,[_|T]):-
	member(X,T).

misura(Persona, Lavoro, Val) :-
    persona(Persona, SkillsP),
    richiesta(Lavoro, SkillsL),
    findall(S, (member(S, SkillsL), member(S, SkillsP)),Match),
    lunghezza(Match, Val), !.
misura(_, _, 0).
```
