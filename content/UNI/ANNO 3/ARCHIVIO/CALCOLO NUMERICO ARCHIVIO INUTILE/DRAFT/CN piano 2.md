>[!FAQ]- prompt sbers
> ```scss
> Sto studiando Calcolo Numerico per un esame scritto con successivo orale. Ti fornirò di volta in volta alcune pagine delle dispense “Elementi di Analisi Numerica” del prof. Carlo Garoni.
> 
> Il tuo compito è trasformare quelle pagine in una lezione completa, ordinata, tecnica e molto dettagliata.  
> Non devi fare un semplice riassunto: devi spiegarmi davvero la teoria, i passaggi, le formule, i teoremi, gli algoritmi e il collegamento con gli esercizi d’esame.
> 
> Devi seguire questa struttura.
> 
> # 0. Prima panoramica della lezione
> 
> Prima di spiegare le pagine, devi darmi una panoramica iniziale:
> 
> 1. quali argomenti compaiono nelle pagine;
>     
> 2. a quale macroargomento del corso appartengono, scegliendo tra:
>     
>     - interpolazione polinomiale;
>         
>     - integrazione numerica;
>         
>     - estrapolazione;
>         
>     - analisi di matrici;
>         
>     - autovalori e teoremi di Gershgorin;
>         
>     - norme vettoriali e matriciali;
>         
>     - metodi iterativi per sistemi lineari;
>         
>     - Jacobi e Gauss-Seidel;
>         
>     - criterio del residuo e convergenza;
>         
> 3. perché questi argomenti sono importanti nel corso;
>     
> 4. quali prerequisiti servono per capirli;
>     
> 5. quali tipi di esercizi d’esame sono collegati a queste pagine;
>     
> 6. quali risultati teorici potrebbero essere chiesti all’orale.
>     
> 
> Devi anche costruire un piccolo indice della spiegazione, così capisco in anticipo il percorso della lezione.
> 
> # 1. Contesto generale
> 
> Spiegami il problema matematico o numerico che si sta affrontando.
> 
> Per esempio:
> 
> - se si parla di interpolazione, spiegami perché vogliamo sostituire una funzione con un polinomio;
>     
> - se si parla di errore di interpolazione, spiegami perché non basta costruire il polinomio ma bisogna anche stimare quanto sbaglia;
>     
> - se si parla di trapezi, spiegami perché approssimiamo un integrale con una somma;
>     
> - se si parla di matrici, spiegami perché autovalori, norme, raggio spettrale e Gershgorin servono nei metodi numerici;
>     
> - se si parla di metodi iterativi, spiegami perché invece di risolvere direttamente Ax = b costruiamo una successione di approssimazioni.
>     
> 
> # 2. Spiegazione dalle basi
> 
> Spiega ogni concetto partendo dalle basi, anche quando sembra ovvio.
> 
> Quando compare una definizione, devi chiarire:
> 
> - cosa significa formalmente;
>     
> - cosa significa intuitivamente;
>     
> - perché viene introdotta;
>     
> - come si usa negli esercizi;
>     
> - quali simboli sono importanti;
>     
> - quali errori comuni devo evitare.
>     
> 
> Quando compare una formula, devi spiegare:
> 
> - da dove nasce;
>     
> - cosa rappresenta ogni simbolo;
>     
> - quali ipotesi servono;
>     
> - che significato numerico ha;
>     
> - come si applica concretamente;
>     
> - quali sono i passaggi algebrici nascosti.
>     
> 
> Quando compare un algoritmo, devi spiegare:
> 
> - qual è l’idea;
>     
> - quali sono gli input;
>     
> - quali sono gli output;
>     
> - quali sono i passaggi;
>     
> - perché funziona;
>     
> - qual è il costo computazionale, se presente;
>     
> - come riconoscerlo in un esercizio;
>     
> - quali controlli fare per non sbagliare.
>     
> 
> # 3. Teoremi, proposizioni e risultati da sapere
> 
> Per ogni teorema o risultato importante devi creare una scheda con questa struttura:
> 
> ## Nome del risultato
> 
> - Enunciato preciso.
>     
> - Ipotesi.
>     
> - Tesi.
>     
> - Significato intuitivo.
>     
> - Perché le ipotesi sono necessarie.
>     
> - Idea della dimostrazione.
>     
> - Passaggi chiave della dimostrazione.
>     
> - Come si usa negli esercizi.
>     
> - Come potrebbe essere chiesto all’orale.
>     
> - Errori tipici da evitare.
>     
> 
> Non devi limitarti a riportare il teorema: devi aiutarmi a capire perché è vero e perché serve.
> 
> # 4. Dimostrazioni
> 
> Se nelle dispense compare una dimostrazione, devi spiegarla riga per riga.
> 
> Per ogni passaggio devi dirmi:
> 
> - che cosa si sta facendo;
>     
> - quale proprietà, teorema o definizione si sta usando;
>     
> - perché il passaggio è lecito;
>     
> - qual è l’obiettivo del passaggio;
>     
> - quali passaggi intermedi sono sottintesi;
>     
> - quale parte potrei dover saper ripetere all’orale.
>     
> 
> Se la dimostrazione è lunga, prima dammi l’idea generale in 5-10 righe, poi entra nei dettagli.
> 
> # 5. Collegamento con gli esercizi
> 
> Dopo la teoria, devi spiegarmi come quella parte si traduce negli esercizi.
> 
> Per ogni argomento, indicami:
> 
> - tipo di esercizio tipico;
>     
> - dati che di solito vengono forniti;
>     
> - cosa devo riconoscere nel testo;
>     
> - quale formula o teorema usare;
>     
> - procedura passo-passo;
>     
> - controlli sul risultato;
>     
> - errori comuni;
>     
> - livello di importanza per lo scritto;
>     
> - livello di importanza per l’orale.
>     
> 
> Quando possibile, costruisci un mini-esempio numerico semplice, anche se non è presente nelle dispense, per farmi vedere il metodo in azione.
> 
> # 6. Schema operativo da esame
> 
> Alla fine della spiegazione, dammi uno schema pratico:
> 
> “Quando vedo un esercizio di questo tipo, faccio così…”
> 
> Lo schema deve essere molto operativo e ordinato.
> 
> Esempi di schemi che voglio:
> 
> - come costruire un polinomio interpolante in forma di Lagrange;
>     
> - come passare alla forma canonica;
>     
> - come usare la forma di Newton;
>     
> - come costruire la tabella delle differenze divise;
>     
> - come stimare l’errore di interpolazione;
>     
> - come applicare la formula dei trapezi;
>     
> - come stimare l’errore della formula dei trapezi;
>     
> - come scegliere n dato epsilon;
>     
> - come fare estrapolazione;
>     
> - come usare Gershgorin per localizzare autovalori;
>     
> - come capire se una matrice è definita positiva;
>     
> - come verificare convergenza di un metodo iterativo;
>     
> - come applicare Jacobi e Gauss-Seidel.
>     
> 
> # 7. Domande di controllo
> 
> Alla fine fammi domande per verificare se ho capito.
> 
> Dividile in:
> 
> ## Domande base
> 
> Per controllare definizioni e concetti semplici.
> 
> ## Domande teoriche
> 
> Per controllare teoremi, ipotesi, tesi e significato.
> 
> ## Domande da orale
> 
> Domande che un professore potrebbe farmi.
> 
> ## Domande applicative
> 
> Piccoli esercizi o mini-passaggi di calcolo.
> 
> Dopo le domande, non dare subito le risposte, a meno che io non te lo chieda.
> 
> # 8. Stile richiesto
> 
> Usa uno stile:
> 
> - molto dettagliato;
>     
> - tecnico ma comprensibile;
>     
> - schematico;
>     
> - ordinato per sezioni;
>     
> - da tutor paziente;
>     
> - senza salti logici;
>     
> - con formule spiegate simbolo per simbolo;
>     
> - con collegamenti continui tra teoria ed esercizi;
>     
> - con richiami alle basi quando servono.
>     
> 
> Quando usi concetti di algebra, analisi o geometria, richiamali brevemente prima di usarli.  
> Per esempio, se servono polinomi, matrici, autovalori, norme, derivate, integrali, massimo/minimo, successioni, convergenza, residuo o raggio spettrale, devi spiegare il richiamo minimo necessario.
> 
> Obiettivo finale: voglio capire la teoria dietro gli esercizi, imparare bene i teoremi del professore, saper giustificare i passaggi all’orale e saper risolvere gli esercizi scritti con consapevolezza.
> ```

>[!FAQ]- prompt sbers 2
> 
> ```scss
> Ora ti fornisco le pagine [X-Y] delle dispense.
> 
> Spiegale seguendo il prompt generale.  
> Prima fai una panoramica della lezione e un indice ragionato.  
> Poi spiega teoria, definizioni, formule, teoremi, dimostrazioni e passaggi tecnici.  
> Collega sempre il contenuto agli esercizi d’esame e concludi con schema operativo, riassunto e domande di controllo.
> 
> Dai particolare attenzione a:
> 
> - ipotesi e tesi dei teoremi;
>     
> - significato delle formule;
>     
> - passaggi algebrici nascosti;
>     
> - dimostrazioni;
>     
> - come riconoscere il tipo di esercizio;
>     
> - cosa devo saper dire all’orale.
> ```

| Mini-lezione | Pagine | Argomento                                                                                           | Valutazione                             |
| ------------ | -----: | --------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1            |    2-6 | Esistenza, unicità, Vandermonde, forma canonica, Lagrange                                           | **Perfetta**                            |
| 2            |   7-10 | Errore/resto dell’interpolazione polinomiale                                                        | **Perfetta**                            |
| 3            |  11-12 | Forma di Newton e differenze divise                                                                 | **Meglio separarla**                    |
| 4            |  13-15 | Algoritmo di valutazione, Ruffini-Horner, costo computazionale                                      | **Da sola**                             |
| 5            |  15-17 | Aggiunta di un nodo + transizione all’integrazione numerica                                         | **Breve ma utile**                      |
| 6            |  17-22 | Formula dei trapezi, errore, scelta di n dato ε                                                     | **Buona, ma molto importante**          |
| 7            |  22-24 | Estrapolazione                                                                                      | **Perfetta da sola**                    |
| 8            |  25-29 | Richiami di algebra lineare: determinanti, autovalori, invertibilità, diagonalizzazione, hermitiane | **Meglio separata**                     |
| 9            |  29-31 | Matrici definite positive                                                                           | **Da sola**                             |
| 10           |  31-33 | Polinomi di matrici + introduzione matrici irriducibili                                             | **Buona**                               |
| 11           |  34-41 | Gershgorin e localizzazione degli autovalori                                                        | **Da sola, molto importante**           |
| 12           |  41-43 | Diagonale dominante e invertibilità                                                                 | **Da sola**                             |
| 13           |  43-48 | Norme vettoriali e matriciali                                                                       | **Da sola**                             |
| 14           |  49-55 | Metodo iterativo stazionario e convergenza                                                          | **Da sola**                             |
| 15           |  55-57 | Velocità di convergenza, residuo, decomposizione A = M − N                                          | **Da sola**                             |
| 16           |  58-60 | Jacobi e Gauss-Seidel: costruzione dei metodi                                                       | **Da sola**                             |
| 17           |  60-68 | Teoremi di convergenza di Jacobi e Gauss-Seidel                                                     | **Da sola, molto teorica**              |
| 18           |  69-77 | Esercizi di riepilogo risolti                                                                       | **Da dividere esercizio per esercizio** |


# Sequenza consigliata

## Settimana 1 — Interpolazione

Obiettivo: arrivare a saper fare ogni esercizio di interpolazione recente.

Ordine:

1. Teorema di esistenza e unicità.
2. Forma di Lagrange.
3. Forma di Newton.
4. Differenze divise.
5. Aggiunta di nodo.
6. Errore di interpolazione.
7. Esercizi teorici sui polinomi di Lagrange.

Esercizi prioritari:

- 17/06/2024 E1;
- 08/07/2024 E1;
- 17/06/2025 E1;
- 14/07/2025 E1;
- 19/01/2026 E1;
- 22/06/2026 E1.

## Settimana 2 — Trapezi, estrapolazione, matrici base

Prima metà:

1. Formula dei trapezi.
2. Errore.
3. Scelta di nnn.
4. Estrapolazione.

Esercizi prioritari:

- 17/06/2024 E2;
- 02/09/2024 E2;
- 20/01/2025 E2;
- 14/07/2025 E2;
- 01/09/2025 E2;
- 09/02/2026 E2.

Seconda metà:

1. Autovalori.
2. Raggio spettrale.
3. Polinomi di matrici.
4. Limiti di potenze.

Esercizi prioritari:

- 17/06/2024 E4;
- 08/07/2024 E3;
- 10/02/2025 E4;
- 09/02/2026 E1;
- 22/06/2026 E3.

## Settimana 3 — Gershgorin, definita positiva, metodi iterativi

Prima parte:

1. Gershgorin.
2. Raggio spettrale da localizzazione.
3. Invertibilità.
4. Autovalori reali/non reali.

Esercizi prioritari:

- 29/01/2024 E3;
- 19/02/2024 E3;
- 08/07/2024 E3;
- 14/07/2025 E3;
- 19/01/2026 E3;
- 09/02/2026 E3.

Seconda parte:

1. Definita positiva.
2. Hermitiana.
3. Re⁡(A)\operatorname{Re}(A)Re(A).
4. Jacobi.
5. Gauss-Seidel.
6. Metodi modificati.

Esercizi prioritari:

- 20/09/2024 E2-E3;
- 20/01/2025 E3-E4;
- 10/02/2025 E4;
- 17/06/2025 E3;
- 14/07/2025 E4;
- 19/01/2026 E4;
- 09/02/2026 E4;
- 22/06/2026 E3.


