### 29 giugno
**Mattina:** richiami di probabilità essenziali: valore atteso, varianza, Markov, Chebyshev, Chernoff, union bound.  
**Pomeriggio:** Data Stream + Sliding Window + problema Counting Bits. Devi saper dire bene perché salvare tutta la finestra costa troppo.
### 30 giugno
**Mattina:** Sampling su stream e Reservoir Sampling.  
**Pomeriggio:** DGIM, parte strutturale: bucket, regole, invarianti, aggiornamento quando arriva uno 0 o un 1.
### 1 luglio
**Mattina:** hashing universale, famiglie hash, collisioni, tabelle hash.  
**Pomeriggio:** DGIM, analisi: spazio, tempo di aggiornamento, query e fattore di approssimazione.
### 2 luglio
**Mattina:** Count-Min Sketch, dimostrazione con Markov, errore one-sided.  
**Pomeriggio:** prepari il discorso completo dell’argomento a piacere. Qui devi iniziare a parlare come se fossi davanti al professore.
### 3 luglio
**Mattina:** Bloom Filter, First-Cut, falsi positivi, scelta di k.  
**Pomeriggio:** DGIM + possibili domande collegate: “perché sliding window?”, “perché bucket esponenziali?”, “perché perdiamo al massimo metà del bucket più vecchio?”, “come ridurre l’errore?”.
### 4 luglio
**Mattina:** Document Similarity, Shingling, MinHashing, LSH.  
**Pomeriggio:** rifai DGIM da zero senza guardare gli appunti. Poi scrivi una versione sintetica da 10 minuti.
### 5 luglio
**Mattina:** algoritmi probabilistici classici: verifica polinomiale, verifica prodotto matriciale, Min-Cut, QuickSort randomizzato.  
**Pomeriggio:** simulazione orale completa: argomento a piacere + 3 domande casuali.
### 6 luglio
**Mattina:** ripasso leggero delle dimostrazioni più probabili.  
**Pomeriggio:** solo esposizione argomento a piacere, formule principali, errori da evitare. Niente studio pesante nuovo.
## Priorità per le domande secondarie
Secondo me devi sapere bene, in ordine:
1. **DGIM / Sliding Window**, perché è il tuo argomento.
2. **Count-Min Sketch**, molto collegato agli stream.
3. **Bloom Filter**, altro algoritmo su stream con errore one-sided.
4. **Reservoir Sampling**, perché introduce bene il tema “non posso salvare tutto”.
5. **MinHashing + LSH**, perché è un blocco grosso del programma.
6. **Hashing universale**, perché ritorna in Count-Min, Bloom e strutture hash.
7. **Min-Cut, verifica prodotto matriciale, verifica polinomi**, come classici algoritmi randomizzati.

## Struttura giornaliera corretta
### Mattina
Argomenti generali nuovi + appunti Obsidian.
Esempio: probabilità, poi algoritmi probabilistici, poi hashing, poi stream.
### Pomeriggio
Argomento a piacere DGIM.
Qui lavori ogni giorno un pezzo diverso: prima struttura, poi dimostrazione, poi discorso orale, poi simulazione.
### Sera
Interrogazione cumulativa.
Non solo su quello fatto quel giorno, ma anche su quello già visto.
Per esempio:
- **giorno 1 sera:** probabilità + DGIM base;
- **giorno 2 sera:** sampling + reservoir + probabilità;
- **giorno 3 sera:** hashing + sampling + DGIM;
- **giorno 4 sera:** Count-Min + hashing + probabilità;
- **giorno 5 sera:** Bloom + Count-Min + DGIM;
- **giorno 6 sera:** MinHash + LSH + stream;
- **giorno 7 sera:** simulazione completa.
In questo modo gli argomenti dei primi giorni tornano più volte.
## Come evitare di arrivare a filo
Ti consiglio di dividere lo studio in tre livelli.
### Livello A: da sapere bene
Questi devono essere pronti entro il **3 luglio**, non il 6:
- probabilità base: Markov, Chebyshev, Chernoff, union bound;
- hashing universale;
- sampling e reservoir sampling;
- DGIM;
- Count-Min Sketch;
- Bloom Filter.
Questi sono troppo collegati tra loro e molto probabili.
### Livello B: da sapere discretamente
Da chiudere entro il **5 luglio**:
- MinHashing;
- LSH;
- Pattern Matching / Rabin-Karp su stream;
- Flajolet-Martin;
- AMS.
### Livello C: da ripassare come domande secondarie
Da tenere più sintetici:
- verifica identità polinomiali;
- verifica moltiplicazione matriciale;
- Min-Cut;
- QuickSort randomizzato;
- randomized median;
- contention resolution;
- load balancing.
Non li devi ignorare, ma non puoi dedicare loro lo stesso peso di DGIM, Count-Min, Bloom e MinHash.
## Piccola modifica al piano
Io non lascerei il “ripasso generale” al 6. Farei così:
- **29 giugno:** probabilità + DGIM introduzione.
- **30 giugno:** sampling/reservoir + DGIM algoritmo.
- **1 luglio:** hashing + DGIM analisi.
- **2 luglio:** Count-Min Sketch + prima simulazione DGIM completa.
- **3 luglio:** Bloom Filter + ripasso cumulativo di probabilità/hashing/Count-Min.
- **4 luglio:** MinHashing/LSH + seconda simulazione completa.
- **5 luglio:** classici algoritmi randomizzati + ripasso stream.
- **6 luglio:** solo ripasso orale, schemi, domande probabili, niente argomenti nuovi.
Quindi il vero obiettivo è: **entro il 5 sera hai visto tutto almeno una volta; il 6 non studi, consolidi**.
## Metodo pratico per la sera
La sera non fare rilettura passiva. Fai così:
1. chiudi gli appunti;
2. provi a spiegare a voce;
3. quando ti blocchi, guardi;
4. riscrivi in Obsidian una frase breve tipo:
