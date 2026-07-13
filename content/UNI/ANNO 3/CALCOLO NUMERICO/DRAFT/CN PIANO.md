Sì, **puoi farcela**, ma non con l’obiettivo “so tutto perfettamente”. In 17 giorni l’obiettivo realistico è:

**arrivare allo scritto sapendo riconoscere e svolgere bene le tipologie ricorrenti**, e avere una base teorica sufficiente per l’orale.

Il vantaggio è che il programma è abbastanza compatto e gli esercizi recenti sono molto ripetitivi nelle famiglie: interpolazione, trapezi, Gershgorin, definita positiva, metodi iterativi.

## Strategia per 17 giorni

Devi studiare “a blocchi chiusi”, non in modo lineare leggendo tutto. Ogni giorno fai:

**Mattina/pomeriggio: teoria + esempi**
**Pomeriggio/sera: esercizi d’esame dello stesso argomento**
**Fine giornata: 30 minuti di orale a voce**

Non fare prima tutta la teoria e poi tutti gli esercizi: perderesti troppo tempo.

---

# Piano compatto da 17 giorni

## Giorni 1-4 — Interpolazione

Obiettivo: saper fare tutti gli esercizi su Lagrange, Newton, errore.

Studia:

* esistenza e unicità;
* forma di Lagrange;
* forma di Newton;
* differenze divise;
* aggiunta di nodo;
* errore di interpolazione;
* proprietà dei polinomi di Lagrange.

Esercizi prioritari:

* 17/06/2024 E1;
* 08/07/2024 E1;
* 17/06/2025 E1;
* 14/07/2025 E1;
* 19/01/2026 E1-E2;
* 22/06/2026 E1.

Alla fine del giorno 4 devi saper scrivere senza guardare:

$f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i).$

---

## Giorni 5-7 — Trapezi ed estrapolazione

Studia:

* formula dei trapezi;
* errore;
* scelta di $n$;
* confronto con $\tilde I=\int p(x)\,dx$;
* estrapolazione;
* Romberg base.

Esercizi prioritari:

* 17/06/2024 E2;
* 02/09/2024 E2;
* 20/01/2025 E2;
* 14/07/2025 E2;
* 01/09/2025 E2;
* 09/02/2026 E2;
* 22/06/2026 E2.

Formula da sapere a memoria:

$|I-I_n|\leq \frac{(b-a)^3}{12n^2}\max_{[a,b]}|f''(x)|.$

---

## Giorni 8-11 — Matrici, Gershgorin, raggio spettrale

Studia:

* autovalori;
* raggio spettrale;
* polinomi di matrici;
* $A^k\to O$;
* Gershgorin riga/colonna;
* irriducibilità;
* stima di $\rho(A)$.

Esercizi prioritari:

* 29/01/2024 E3;
* 19/02/2024 E3;
* 08/07/2024 E3;
* 02/09/2024 E3;
* 14/07/2025 E3;
* 19/01/2026 E3;
* 09/02/2026 E3;
* 22/06/2026 E3.

Qui devi diventare molto automatico con frasi tipo:

$B^k\to O \iff \rho(B)<1.$

e

$\lambda \in \sigma(A) \Rightarrow p(\lambda)\in \sigma(p(A)).$

---

## Giorni 12-14 — Definita positiva, norme, condizionamento, metodi iterativi

Studia:

* matrice hermitiana;
* definita positiva;
* minori principali;
* $\operatorname{Re}(A)$;
* norme $1$, $\infty$, Frobenius;
* condizionamento;
* metodo iterativo generale;
* Jacobi;
* Gauss-Seidel;
* Gauss-Seidel modificato;
* convergenza con $\rho(P)<1$.

Esercizi prioritari:

* 20/09/2024 E2-E3;
* 20/01/2025 E3-E4;
* 10/02/2025 E4;
* 17/06/2025 E3;
* 14/07/2025 E4;
* 01/09/2025 E3;
* 19/01/2026 E4;
* 09/02/2026 E4;
* 22/06/2026 E3.

Formula chiave:

$P=M^{-1}(M-A),\qquad \text{converge} \iff \rho(P)<1.$

---

## Giorni 15-16 — Simulazioni

Fai almeno **due esami interi** in condizioni realistiche.

Io sceglierei:

1. **19/01/2026**
2. **09/02/2026**

Poi correggi così:

* segna gli esercizi che non riconosci;
* segna i passaggi teorici mancanti;
* rifai subito gli esercizi sbagliati;
* crea una mini-scheda “cosa avrei dovuto fare”.

---

## Giorno 17 — Ripasso finale

Non fare nuovi esercizi difficili.

Fai solo:

* formule;
* teoremi;
* procedure standard;
* errori ricorrenti;
* 1 esercizio breve per argomento.

Ripassa soprattutto:

* errore interpolazione;
* errore trapezi;
* Gershgorin;
* definita positiva;
* $\rho(P)<1$;
* Jacobi/Gauss-Seidel.

---

# Quanto devi studiare al giorno?

Per farcela seriamente:

* **minimo**: 5 ore al giorno;
* **buono**: 6-7 ore al giorno;
* **molto buono**: 8 ore al giorno, con pause.

Non servono 10 ore disordinate. Servono 6 ore fatte bene.

Un giorno ideale:

| Tempo  | Attività                         |
| ------ | -------------------------------- |
| 2h     | teoria dalle dispense            |
| 2h     | esercizi guidati/svolti          |
| 1.5h   | esercizi recenti senza soluzione |
| 30 min | orale a voce                     |

---

# Cosa NON fare

Non cercare di rifare tutti gli esami dal 2022.

Non copiare soluzioni passivamente.

Non passare tre giorni solo su interpolazione perché “non ti senti pronto”.

Non saltare Gershgorin e metodi iterativi: sono troppo frequenti.

Non studiare l’orale separato dallo scritto: ogni esercizio deve diventare anche teoria.

---

# Valutazione realistica

In 17 giorni puoi arrivare a:

* riconoscere quasi tutte le tipologie;
* fare bene gli esercizi standard;
* avere una buona base per gli esercizi teorici;
* preparare l’orale sui teoremi principali.

La parte più rischiosa sono gli esercizi “nuovi” tipo minimizzazione, parametro ottimo, dimostrazione astratta. Però anche quelli si basano sugli stessi strumenti.

Quindi sì: **è fattibile**, ma devi partire subito e lavorare in modo molto selettivo.

Il primo blocco da iniziare oggi è **interpolazione + errore**, perché compare ovunque e ti dà anche sicurezza per l’orale.