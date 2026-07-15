
## Direzione scelta: **Officina di precisione**

Non tratterei Gym Tracker come una normale app fitness. Il soggetto è un **diario tecnico da sala pesi per utenti intermedi e avanzati**; il suo compito principale è far registrare una serie e capire immediatamente se la prestazione sta migliorando.

Il linguaggio visivo deve quindi ricordare:

- strumenti calibrati;
    
- piastre e pacchi pesi;
    
- registri di allenamento;
    
- marcature industriali;
    
- etichette tecniche leggibili sotto sforzo.
    

Non deve ricordare una dashboard SaaS, un’app crypto o un videogioco. Il brief individua correttamente i problemi attuali: annidamento di card, superfici scure quasi identiche e diversi elementi flottanti che competono tra loro.

# Diagnosi delle schermate attuali

## Cosa conserverei

La struttura generale è valida:

- navigazione inferiore con quattro aree;
    
- colore associato alla scheda nello storico;
    
- giorno consigliato in Home;
    
- possibilità di riprendere una sessione;
    
- visualizzazione dell’ultima prestazione;
    
- importazione AI separata dall’importazione JSON;
    
- calendario mensile;
    
- dettaglio del singolo esercizio.
    

Non cambierei quindi l’architettura dell’app. Cambierei il modo in cui viene rappresentata.

## Cosa la rende ancora generica

### Troppe card equivalenti

Nelle schermate mostrate quasi ogni elemento è:

- contenitore blu scuro;
    
- bordo sottile;
    
- angoli molto arrotondati;
    
- titolo bianco pesante;
    
- piccolo label blu;
    
- pulsante verde.
    

Home, impostazioni, statistiche e allenamento sembrano costruiti con lo stesso componente ingrandito o ristretto. Di conseguenza non esiste una vera gerarchia: tutto chiede attenzione.

### Troppi livelli di contenimento

Nell’allenamento si vedono almeno questi livelli:

1. fondo della pagina;
    
2. contenitore della sessione;
    
3. contenitore dell’esercizio;
    
4. contenitore della GIF;
    
5. contenitore della serie;
    
6. input interno.
    

Ogni livello aggiunge spazio, bordo e colore. La conseguenza è che la prima serie realmente modificabile arriva molto in basso.

### Titoli troppo pesanti e onnipresenti

Il carattere display è usato quasi ovunque con peso molto alto:

- titoli pagina;
    
- nomi scheda;
    
- nomi esercizio;
    
- numeri;
    
- nomi profilo;
    
- pulsanti.
    

Il carattere ha personalità, ma non essendoci contrasto tra i ruoli diventa rumoroso.

### Il verde svolge troppi compiti

Attualmente il verde comunica contemporaneamente:

- azione primaria;
    
- elemento selezionato;
    
- allenamento attivo;
    
- progresso;
    
- punto del calendario;
    
- grafico;
    
- successo;
    
- importazione.
    

Un colore che significa tutto non comunica più nulla.

### Le informazioni importanti non sempre sono al posto giusto

Nella schermata allenamento la GIF occupa più spazio della registrazione della serie. Per un utente esperto dovrebbe avvenire il contrario: la GIF è consultata occasionalmente, mentre kg, reps, RPE e riferimento precedente sono il cuore dell’interazione.

Nel grafico del curl, inoltre, “peso medio” mostra due valori nello stesso giorno. Anche se tecnicamente corretto, visivamente sembra un errore e non aiuta a capire la progressione.

---

# Il nuovo sistema visivo

## Palette

Passerei da blu notte e verde neon a una palette ispirata a **cemento, acciaio verniciato e segnaletica tecnica**.

```css
:root {
  --canvas: #E5E7E4;
  --ink: #15191B;
  --steel: #2A3236;
  --line: #B7BDBA;
  --signal: #3857D6;
  --oxide: #C65F37;
  --success: #607D6D;
  --paper: #F4F5F2;
}
```

### Utilizzo rigoroso

**Canvas `#E5E7E4`**  
Sfondo principale dell’app. È un grigio cemento, non crema.

**Ink `#15191B`**  
Testo principale e grandi bande strutturali.

**Steel `#2A3236`**  
Barra inferiore, dock sessione, pannelli tecnici e modalità allenamento concentrata.

**Signal `#3857D6`**  
Unico colore delle azioni primarie e dello stato attivo.

**Oxide `#C65F37`**  
Timer di recupero, attenzione e azioni distruttive. Non usarlo come decorazione.

**Success `#607D6D`**  
Serie completate e conferme. Mai per il normale pulsante principale.

Il rischio estetico deliberato è passare da un’app interamente scura a un’interfaccia prevalentemente **chiara e industriale**, mantenendo scure soltanto le zone operative ad alta concentrazione. Questo rende Gym Tracker riconoscibile e migliora la distinzione tra consultazione e allenamento.

## Tipografia

### Display e numeri principali: Barlow Condensed

```text
Barlow Condensed 700
```

Da usare per:

- nome esercizio;
    
- giorno della scheda;
    
- valori di kg e reps;
    
- titoli principali;
    
- timer.
    

La forma condensata ricorda etichette di macchinari e permette grandi numeri senza occupare troppo spazio.

### Testo e controlli: Atkinson Hyperlegible Next

```text
Atkinson Hyperlegible Next 400 / 600
```

Da usare per:

- descrizioni;
    
- pulsanti;
    
- note;
    
- menu;
    
- nomi profilo;
    
- testi informativi.
    

È molto leggibile anche rapidamente e con luminosità non ideale.

### Dati tecnici: IBM Plex Mono

```text
IBM Plex Mono 500
```

Da usare esclusivamente per:

- `36 kg`;
    
- `15 rep`;
    
- `RPE 8`;
    
- tempi;
    
- differenze percentuali;
    
- date compatte.
    

Non userei il monospace per paragrafi o titoli.

## Scala tipografica

```css
--text-caption: 12px;
--text-label: 13px;
--text-body: 16px;
--text-control: 17px;
--text-section: 24px;
--text-title: 34px;
--text-data: 40px;
```

Regole:

- mai testo informativo sotto i 13 px;
    
- mai uppercase su intere frasi;
    
- uppercase soltanto per label tecniche di massimo due parole;
    
- massimo due pesi tipografici nello stesso blocco;
    
- evitare il bianco puro su superfici scure: usare `#F4F5F2`.
    

---

# Struttura: niente più card dentro card

## Tre soli livelli di superficie

L’app deve avere soltanto:

1. **canvas**, cioè la pagina;
    
2. **banda**, una sezione strutturale a tutta larghezza;
    
3. **overlay**, bottom sheet o dialogo temporaneo.
    

Non devono esistere card annidate.

## Regole dei contenitori

```css
.page {
  padding-inline: 16px;
}

.section {
  padding-block: 24px;
  border-top: 1px solid var(--line);
}

.interactive-surface {
  border-radius: 10px;
}

.overlay {
  border-radius: 18px 18px 0 0;
}
```

Gli angoli arrotondati non devono identificare ogni sezione. Vanno riservati a:

- pulsanti;
    
- campi;
    
- selezioni;
    
- sheet;
    
- contenuti realmente trascinabili.
    

Niente ombre nelle schermate normali. Una sola ombra può essere usata sugli overlay.

## Spaziatura

Sistema su multipli di 4:

```text
4 px   micro-distanza
8 px   label → valore
12 px  elementi dello stesso controllo
16 px  righe e padding mobile
24 px  sezioni
32 px  cambio di argomento
48 px  separazione principale
```

Le schermate attuali usano spesso molto spazio dentro i contenitori e poco spazio tra le priorità informative. Bisogna fare il contrario: contenuti più compatti, sezioni più chiaramente distinte.

---

# Firma visiva: **la spina di calibrazione**

L’elemento memorabile dell’app deve essere una sottile barra verticale graduata, ispirata:

- al selettore di un pacco pesi;
    
- alle tacche di calibrazione;
    
- alla zigrinatura di un bilanciere.
    

La chiamerei internamente `CalibrationSpine`.

```text
│ 1   completata
│ 2   completata
● 3   serie corrente
│ 4   futura
│ 5   futura
```

Non è una decorazione: rappresenta sempre una sequenza reale.

Durante l’allenamento indica le serie. Nello storico indica la sequenza temporale. Nel dettaglio esercizio può indicare le sessioni confrontate.

Specifiche:

```css
.calibration-spine {
  width: 12px;
  border-left: 2px solid #8D9591;
}

.calibration-tick {
  width: 8px;
  height: 2px;
}

.calibration-current {
  width: 12px;
  height: 12px;
  background: var(--signal);
  border-radius: 50%;
}
```

Non la userei nella schermata profili, nelle impostazioni o nell’importazione: diventerebbe decorativa e perderebbe significato.

---

# Nuova schermata Allenamento

È la schermata che richiede il cambiamento più radicale.

## Struttura proposta

```text
┌─────────────────────────────────┐
│ GIORNO 1              34:22     │
│ 4 / 17 serie          PAUSA     │
├─────────────────────────────────┤
│ ● 1                             │
│ │ 2   PEC FLY                   │
│ │ 3   3 × 15 · recupero 80 s    │
│                                 │
│ Ultima prestazione              │
│ 36 kg × 15 · RPE 8              │
│                                 │
│ KG          REP          RPE    │
│ [ 36 ]      [ 15 ]       [ 8 ]  │
│                                 │
│ [ COMPLETA SERIE ]              │
│                                 │
│ Tecnica   Media   Note          │
├─────────────────────────────────┤
│ Prossimo: serie 2 di 3           │
└─────────────────────────────────┘
```

## Cambiamenti fondamentali

### Un solo esercizio operativo alla volta

L’esercizio corrente occupa la schermata. Gli altri esercizi possono essere raggiunti da un indice o tramite swipe controllato, ma non devono generare una lunga colonna di moduli aperti.

### GIF secondaria

Al posto della grande area media:

```text
Tecnica · Guarda movimento
```

Toccandola, la GIF si apre in un bottom sheet quasi a schermo intero. Una piccola miniatura può rimanere accanto al titolo, ma non deve superare 72 × 72 px.

### Inserimento serie come riga tecnica

Kg, reps e RPE devono apparire come tre celle allineate, non come tre grandi input verticali.

```text
KG        REP       RPE
36        15        8
```

Specifiche:

- altezza minima cella: 64 px;
    
- valore: Barlow Condensed 32 px;
    
- unità: IBM Plex Mono 12 px;
    
- divisori verticali da 1 px;
    
- tastiera numerica;
    
- selezione automatica del contenuto al focus.
    

### Ultima prestazione vicino agli input

Non dentro un’altra card:

```text
ULTIMA VOLTA
36 kg × 15 · RPE 8
```

Dopo aver inserito la serie:

```text
+1 rep rispetto all’ultima volta
```

### Pulsante principale

Un solo pulsante:

```text
Completa serie
```

Altezza 56 px, `--signal`, nessun gradiente. Dopo il tap diventa brevemente:

```text
Serie completata
```

con `--success`, poi passa alla serie successiva.

---

# Timer, mini-player e componenti flottanti

La regola deve essere:

> **Un solo livello persistente oltre alla pagina.**

## Durante l’allenamento

Il timer non deve essere una pillola flottante. Deve vivere nella barra superiore della sessione:

```text
RECUPERO 01:04
```

Quando parte il recupero, la barra superiore cambia stato:

- il valore diventa color oxide;
    
- una linea temporale scorre sotto la barra;
    
- il resto della schermata rimane stabile.
    

Nessun nuovo elemento appare sopra il contenuto.

## Fuori dalla schermata allenamento

Il mini-player diventa un **dock integrato**, non una card sospesa.

```text
┌─────────────────────────────────┐
│ ● Giorno 1 · 4/17 serie    Apri │
├─────────────────────────────────┤
│ Home   Scheda   Storico   Dati  │
└─────────────────────────────────┘
```

È attaccato alla navigazione inferiore, con lo stesso sfondo `--steel` e senza angoli arrotondati. Deve sembrare una parte temporanea della navigazione.

Non devono coesistere:

- mini-player;
    
- timer flottante;
    
- pulsante salva flottante;
    
- barra inferiore;
    
- toast permanente.
    

## Salvataggio

L’autosalvataggio non richiede un pulsante flottante.

Mostrare soltanto uno stato discreto:

```text
Salvato
```

oppure:

```text
Salvataggio…
```

nella barra della sessione. In caso di errore:

```text
Dati non salvati · Riprova
```

---

# Home

La Home attuale ha una buona priorità iniziale, ma troppe card.

## Nuova composizione

```text
LUCA · SETTIMANA 29

GIORNO 2
Quadricipiti, spalle e tricipiti
5 esercizi · circa 1 h 18 min

[ INIZIA ALLENAMENTO ]

────────────────────────────

SETTIMANA SCHEDA
● ● ○ ○    2 di 4 giorni

ULTIMA SESSIONE
14 luglio · Giorno 3
18 serie · Scheda Luca Luglio

PROGRESSIONE
Stacchi regular
+5 kg · stesso numero di ripetizioni
```

Il giorno consigliato non deve essere dentro una grande card. Deve essere il vero hero della pagina.

### “Progressi +5 kg”

Il dato attuale è troppo isolato. Va sempre spiegato:

```text
+5 kg
stesse ripetizioni e RPE simile
```

oppure:

```text
+2 ripetizioni
a pari peso
```

Un numero senza contesto sembra marketing, non analisi.

---

# Progressi

La schermata attuale alterna molte grandi card. La renderei più simile a un rapporto tecnico.

## Testata

```text
PROGRESSI

Settimana scheda       2 / 4
Esercizi in crescita       5
Possibili stalli           2
```

Niente griglia 2 × 2 di riquadri. Usare righe con divisori.

## Lista esercizi prima dei grafici

```text
ESERCIZI

Panca piana
In crescita · +2 rep a 70 kg          >

Curl bilanciere
Stabile · ultime 3 sessioni           >

Leg press
Possibile stallo · RPE in aumento     >
```

Un utente cerca prima l’esercizio, poi apre il dettaglio.

## Dettaglio esercizio

Il grafico principale non deve essere “peso medio”, ma **miglior set comparabile**.

```text
CURL IN PIEDI BILANCIERE

STATO
Stabile

ULTIMA PRESTAZIONE
7 kg × 12 · RPE 8

MIGLIOR SET NEL RANGE
8 kg × 10

[ grafico delle ultime 6 sessioni ]

14 lug    7 kg × 12    RPE 8
07 lug    8 kg × 10    RPE 9
30 giu    7 kg × 11    RPE 8
```

Se esistono due sessioni nella stessa data, mostrare anche l’orario oppure aggregarle consapevolmente. Due punti etichettati entrambi “14 lug” sembrano un errore.

## Distribuzione muscolare

La schermata attuale usa barre molto evidenti. Le terrei, ma senza contenitori individuali:

```text
Schiena             26 serie
━━━━━━━━━━━━━━━━━━━━━━━━━━

Spalle e tricipiti  15 serie
━━━━━━━━━━━━━━━

Femorali            11 serie
━━━━━━━━━━━
```

Il volume in kg deve essere secondario e accompagnato da “stimato” soltanto quando necessario.

---

# Storico e calendario

Questa è una delle schermate meglio riuscite. Il concetto del pallino colorato per indicare la scheda è corretto.

Migliorerei:

- selezione del giorno con bordo scuro, non riempimento verde;
    
- colori scheda non troppo simili allo stato attivo;
    
- legenda sempre visibile;
    
- giorni senza allenamento senza effetto “pulsante”;
    
- scheda del giorno selezionato trasformata in una sezione lineare.
    

Una giornata con più allenamenti o più schede potrebbe mostrare più tacche:

```text
14
— blu
— arancio
```

Il colore deve indicare esclusivamente la scheda, non anche “successo”.

---

# Importazione AI

La sequenza File → Anteprima → Importa è reale e quindi può essere numerata.

```text
1 FILE  ───  2 REVISIONE  ───  3 ATTIVA
```

Questo è uno dei pochi punti in cui una struttura a step è semanticamente corretta.

## Layout

```text
NUOVA SCHEDA

Genera da un documento del trainer
oppure importa un JSON già pronto.

[ Genera con AI ]  [ Importa JSON ]

1 · FILE
Trascina PDF, DOCX o immagine
oppure scegli dal dispositivo.

[ SCEGLI FILE ]

☑ Attiva la nuova scheda
  La scheda precedente sarà archiviata.
```

Toglierei:

- la grande card blu attorno all’intero contenuto;
    
- l’icona duplicata;
    
- il titolo “Genera con AI” ripetuto;
    
- il testo tecnico sulle API key dalla schermata principale.
    

“Le API key restano lato server” appartiene alla documentazione o a una nota informativa, non al flusso quotidiano.

---

# Profili

Le card attuali sono troppo grandi rispetto alle informazioni contenute.

Userei una griglia più asciutta:

```text
CHI SI ALLENA?

[ 🏋️  Luca      🔒 ]
[ 💪  Samus        ]
[ ⚡  Frakka       ]

+ Aggiungi profilo
```

Specifiche:

- altezza tile: 116 px;
    
- avatar: 48 px;
    
- nome: 20 px;
    
- PIN come piccola icona, non come testo verde;
    
- niente grandi aree vuote;
    
- massimo 12 px di raggio.
    

La barra di navigazione non dovrebbe comparire nella scelta profilo: prima si sceglie l’identità, poi si entra nell’app.

---

# Impostazioni

Le impostazioni dovrebbero essere una lista, non una collezione di card.

```text
PROFILO
PIN
Cambia profilo

SCHEDA
Importa nuova scheda
Gestisci schede archiviate

DATI
Esporta CSV
Scarica backup JSON
Cestino

ZONA PERICOLO
Reimposta dati
```

Le azioni distruttive devono stare in una sezione separata con testo oxide, non con un grande pulsante rosso sempre visibile.

---

# Motion system

La motion deve spiegare dove si trova l’utente.

## Un’unica animazione caratteristica

Quando viene completata una serie:

1. la tacca corrente della spina di calibrazione si riempie;
    
2. il valore si sposta verso l’alto di 4 px;
    
3. la tacca successiva diventa attiva;
    
4. i campi assumono i valori suggeriti.
    

Durata complessiva: **220 ms**.

Questa è l’animazione riconoscibile dell’app.

## Transizioni standard

```text
Page enter: opacity 0 → 1, translateY 6 → 0, 160 ms
Sheet enter: translateY 100% → 0, 220 ms
Accordion: height + opacity, 180 ms
Button feedback: scale 1 → 0.98 → 1, 120 ms
```

Mai usare bounce.  
Mai animare contemporaneamente più di due proprietà.  
Rispettare `prefers-reduced-motion`.

I grafici devono animarsi soltanto al primo ingresso, non ogni volta che cambia un filtro.

---

# Regole non negoziabili per la riscrittura

1. Nessuna card può contenere un’altra card.
    
2. Massimo un elemento sticky o flottante per lato dello schermo.
    
3. Il colore primario indica soltanto azione o selezione.
    
4. Il verde indica soltanto completamento o risultato positivo.
    
5. Il rosso-arancio indica soltanto timer, attenzione o distruzione.
    
6. La GIF non può occupare più spazio del modulo della serie.
    
7. Ogni numero di progresso deve avere una frase che ne spieghi il significato.
    
8. Angoli arrotondati massimi normali: 10–12 px.
    
9. Niente gradienti.
    
10. Niente ombre sulle sezioni.
    
11. I dati numerici devono essere allineati e usare il carattere mono o condensato previsto.
    
12. Un’azione mantiene sempre lo stesso nome: “Elimina allenamento”, “Allenamento eliminato”, “Ripristina allenamento”.
    
13. La barra inferiore deve avere un’altezza stabile e non essere coperta da pillole indipendenti.
    
14. I controlli principali devono avere almeno 48 px di altezza.
    
15. Durante l’allenamento, kg, reps e RPE devono essere raggiungibili senza scorrere oltre la GIF.
    

Questa direzione conserva la solidità funzionale dell’app, ma le dà un’identità precisa: **non un’altra dashboard scura, bensì uno strumento calibrato per misurare lavoro e progressione**.Adesso che ho visto praticamente tutte le schermate, la direzione è molto più chiara.

L’app è già funzionalmente ricca, ma visivamente soffre di tre problemi ricorrenti:

- troppe superfici blu una dentro l’altra;
    
- troppe azioni persistenti contemporaneamente;
    
- stesso linguaggio visivo usato per Home, allenamento, editor, storico, progressi e impostazioni.
    

Il risultato è coerente, ma non ancora davvero “da esperto”. La base concettuale resta quella dell’**officina di precisione**: un’app che sembra uno strumento di lavoro, non una collezione di card fitness. Il brief che hai allegato va esattamente in questa direzione: eliminare l’effetto template Tailwind, usare struttura e tipografia come informazione e concentrare la personalità in pochi elementi riconoscibili.

# Valutazione generale dell’app attuale

## Cosa funziona bene

Hai già alcune scelte corrette:

- navigazione principale semplice;
    
- pulsanti grandi durante l’allenamento;
    
- storico collegato alla scheda;
    
- calendario leggibile;
    
- pausa, eliminazione, timer e riepilogo sessione;
    
- editor completo;
    
- dashboard con molte informazioni già disponibili;
    
- colore coerente per azioni principali;
    
- nomi degli esercizi molto visibili.
    

La UI non è disordinata nel senso classico. È ordinata, ma troppo uniforme. Tutto sembra avere quasi la stessa importanza.

## Problema principale: ogni contenuto diventa una card

Nelle schermate mostrate vedo continuamente:

```text
pagina
  card
    card
      input
      card
        pulsante
```

Questo succede soprattutto in:

- allenamento;
    
- editor scheda;
    
- progressi;
    
- impostazioni;
    
- riepilogo storico.
    

Le card devono essere usate soltanto quando un contenuto è realmente separabile, spostabile o selezionabile. Non per ogni sezione.

# Nuovo principio strutturale

Ogni schermata dovrebbe usare solo tre tipi di superficie:

## 1. Pagina

Sfondo principale, senza bordo.

## 2. Sezione

Separata da spazio, titolo e linea sottile.

## 3. Overlay

Bottom sheet, dialogo o pannello temporaneo.

Le card vere restano solo per:

- scelta profilo;
    
- giorno della scheda;
    
- sessione nello storico;
    
- esercizio in elenco;
    
- eventuali elementi trascinabili.
    

Non devono esserci card dentro altre card.

---

# Revisione schermata per schermata

# Home

La Home attuale ha quattro blocchi:

- giorno consigliato;
    
- ultimo allenamento;
    
- progresso;
    
- scheda attiva;
    
- riepilogo settimanale;
    
- mini-player sessione.
    

Il problema non è il contenuto, ma la gerarchia.

## Nuova struttura

Il giorno consigliato diventa il vero hero:

```text
LUCA · SETTIMANA 29

GIORNO 2
Quadricipiti, spalle e tricipiti

Ultima volta 9 luglio
5 esercizi · circa 1 h 18 min

[ Inizia allenamento ]
```

Niente card esterna enorme. Potrebbe essere una sezione scura a tutta larghezza, distinta dal resto della Home.

Sotto:

```text
SETTIMANA SCHEDA
● ● ○ ○

2 di 4 giorni completati
51 serie da lunedì
```

Poi:

```text
ULTIMA SESSIONE
Giorno 3 · Schiena e bicipiti
14 luglio · 18 serie
```

Poi:

```text
PROGRESSIONE
Stacchi regular
+5 kg a ripetizioni simili
```

Il dato `+5 kg` non deve mai apparire da solo. Deve sempre spiegare perché rappresenta un miglioramento.

## Animazione Home

All’apertura:

1. compare il nome utente;
    
2. entra il giorno consigliato con un movimento verticale di 6 px;
    
3. la barra settimanale si compone da sinistra;
    
4. le informazioni secondarie sfumano dopo.
    

Durata totale: circa 320 ms.

Non animerei ogni card singolarmente. Un’unica sequenza iniziale è più elegante.

---

# Scheda

La schermata Scheda è una delle più chiare, ma le quattro card sono molto grandi.

## Nuova impostazione

Ogni giorno dovrebbe essere una riga espansa:

```text
GIORNO 1

Petto e spalle
Ultima volta 10 luglio · 5 esercizi

Ripeti →
```

Il giorno consigliato può essere identificato da:

- una tacca laterale blu;
    
- testo “Consigliato”;
    
- leggero sfondo differente.
    

Non userei contemporaneamente:

- card evidenziata;
    
- badge;
    
- bordo;
    
- colore diverso;
    
- icona.
    

Uno o due segnali bastano.

## Animazione Scheda

Quando si cambia giorno:

- la tacca laterale scorre;
    
- il titolo si sposta di 2 px;
    
- il pulsante “Ripeti” cambia stato.
    

Quando l’utente riordina i giorni:

- la riga sollevata aumenta leggermente di scala `1.015`;
    
- compare una linea di destinazione;
    
- nessun bounce.
    

---

# Allenamento attivo

Questa è la schermata che necessita più lavoro.

Attualmente convivono:

- GIF grande;
    
- percentuale flottante;
    
- modulo serie;
    
- timer nella serie;
    
- pulsante recupero;
    
- timer flottante in basso;
    
- bottom nav;
    
- note;
    
- tecnica;
    
- note generali;
    
- pulsante chiudi allenamento.
    

Sono troppe zone operative contemporanee.

## Nuova architettura

Durante l’allenamento deve esserci una sola area primaria:

```text
GIORNO 1                           34:22
4 / 17 serie                      Pausa
────────────────────────────────────────

PEC FLY
3 × 15 · recupero 80 sec

Ultima volta
36 kg × 15 · RPE 8

KG              REP             RPE
36              15              8

[ Completa serie ]

Serie 1 di 3
● ─ ○ ─ ○

Tecnica       Nota
```

La GIF non deve essere sempre aperta.

Può diventare:

```text
[ miniatura ] Guarda tecnica
```

e aprirsi in un bottom sheet.

## Percentuale flottante

Il cerchio `0%` flottante a destra è visivamente invasivo e non abbastanza utile.

Lo sostituirei con:

```text
4 / 17 serie
```

nella barra superiore.

La percentuale può restare nel riepilogo o nella mini-sessione, ma non deve galleggiare sul contenuto.

## Timer recupero

Adesso compare in più luoghi. Deve esistere una sola volta.

Quando parte il timer:

```text
RECUPERO · PUSH-DOWN IN GINOCCHIO

01:15

[ Pausa ]   [ +15 s ]   [ Chiudi ]
```

Questo pannello deve sostituire temporaneamente il dock della sessione, non sovrapporsi a tutto.

## Animazione completamento serie

Questa deve essere la micro-interazione firma.

Quando premi “Completa serie”:

1. il pulsante si comprime leggermente;
    
2. la serie corrente diventa verde desaturato;
    
3. la tacca della spina di calibrazione si riempie;
    
4. la serie successiva scorre nella stessa posizione;
    
5. i valori suggeriti vengono precompilati;
    
6. parte il timer di recupero.
    

Tempi:

```text
pressione pulsante: 90 ms
conferma serie: 140 ms
passaggio serie: 180 ms
totale percepito: circa 240 ms
```

Nessun coriandolo, bagliore o animazione celebrativa eccessiva.

## Note e tecnica

“Nota” e “Tecnica” possono diventare due tab compatte:

```text
Tecnica | Nota personale
```

Il contenuto si apre sotto, senza creare un’altra card.

---

# Mini-player allenamento

Attualmente il mini-player può espandersi e mostrare:

- pausa;
    
- completa;
    
- elimina;
    
- progresso;
    
- barra;
    
- chiusura.
    

Funziona, ma è troppo simile a una seconda pagina sopra la Home.

## Nuovo dock

Il dock deve essere collegato alla barra inferiore:

```text
● Giorno 1 · 4/17 serie
Pec fly · serie 2 di 3             Apri
```

Quando viene espanso, diventa bottom sheet.

Azioni come elimina non devono essere nel mini-player principale. Devono stare nel menu `…`.

## Animazioni dock

Apertura:

- il dock sale da sopra la barra inferiore;
    
- la barra rimane fissa;
    
- altezza da 64 px a circa 70% dello schermo;
    
- sfondo dietro leggermente sfocato.
    

Chiusura:

- ritorna esattamente alla sua posizione originale;
    
- il titolo mantiene continuità tramite `layoutId` di Framer Motion.
    

Questo renderebbe il passaggio molto più professionale.

---

# Riepilogo andamento allenamento

Il bottom sheet “Andamento” è utile, ma adesso è una lista di card dentro una card.

## Nuova versione

```text
ANDAMENTO

Giorno 1 · Petto e spalle
4 / 17 serie · fine stimata 21:18

● Pec fly                    3/3
● Panca inclinata            1/3
○ Croci ai cavi              0/3
○ Tirate alte                0/4
○ Push-down                  0/4

[ Vai all’esercizio attuale ]
```

Niente pillole separate per ogni esercizio. Una semplice riga è sufficiente.

## Animazione

Le righe già completate possono avere una transizione:

```text
opacity 0.65 → 1
checkmark scale 0.8 → 1
```

Quando tocchi un esercizio, il bottom sheet si chiude e la schermata scorre a quell’esercizio con un breve highlight laterale.

---

# Editor scheda

Questa è probabilmente la schermata più pesante in assoluto.

Attualmente ha:

- card generale;
    
- campi scheda;
    
- giorno;
    
- descrizione;
    
- esercizio;
    
- campi esercizio;
    
- pulsante salva sticky;
    
- bottom nav.
    

È funzionale ma troppo lunga e troppo densa.

## Nuova struttura

Dividerei l’editor in tre livelli:

```text
SCHEDA
Nome
Periodo

GIORNI
Giorno 1
Giorno 2
Giorno 3
Giorno 4
```

Toccando un giorno:

```text
GIORNO 1

Nome
Descrizione

ESERCIZI
1 Pec fly
2 Spinte manubri 45°
3 Croci ai cavi
4 Tirate alte
5 Push-down
```

Toccando un esercizio si apre un bottom sheet editor.

Non mostrare tutti i campi di tutti gli esercizi contemporaneamente.

## Modifica esercizio

```text
MODIFICA ESERCIZIO

Nome
Pec fly

Serie        Ripetizioni       Recupero
3            15                80 sec

Gruppo
Petto

RPE target
8

Peso suggerito
36 kg

Note tecniche
...

[ Salva esercizio ]
```

Questo riduce drasticamente la lunghezza della pagina.

## Pulsante salva

Il pulsante sticky attuale copre contenuto e convive con la bottom nav.

Meglio:

- salvataggio automatico;
    
- stato “Modifiche salvate” in alto;
    
- pulsante “Salva” solo se necessario.
    

Se il salvataggio automatico non è possibile, usa una barra unica sopra la bottom nav:

```text
3 modifiche non salvate        [ Salva ]
```

Non un grande pulsante verde largo tutto lo schermo.

## Animazioni editor

Riordino esercizi:

- drag handle visibile;
    
- elemento in trascinamento con `scale: 1.02`;
    
- ombra temporanea;
    
- placeholder sottile;
    
- vibrazione aptica breve su mobile.
    

Salvataggio:

- stato testo da `Salvataggio…` a `Salvato`;
    
- piccola icona check;
    
- niente toast enorme.
    

---

# Progressi

Attualmente la pagina contiene molte informazioni valide, ma sembra una successione di pannelli.

## Cosa tenere

- esercizio in crescita;
    
- allenamenti settimanali;
    
- giorni svolti;
    
- serie;
    
- durata media;
    
- costanza;
    
- migliori carichi;
    
- distribuzione;
    
- ultimi esercizi.
    

## Cosa ridurre

“Allenamenti”, “Giorni svolti”, “Serie”, “Durata media” non devono essere quattro card equivalenti.

Possono diventare una tabella compatta:

```text
QUESTA SETTIMANA

Giorni scheda       2 / 4
Sessioni               3
Serie                  51
Durata media        1h 11m
```

## Costanza e frequenza

L’attuale “Giorni svolti 2 da lunedì” è già un passo avanti rispetto allo streak.

Però il conteggio per gruppo muscolare:

```text
Bicipiti 1 giorno
Femorali 1 giorno
```

non è molto utile come metrica primaria.

Meglio:

```text
SCHEDA SETTIMANALE
Giorno 1    completato
Giorno 2    completato
Giorno 3    da fare
Giorno 4    da fare
```

Poi, in una sezione secondaria:

```text
FREQUENZA GRUPPI
Petto        1 esposizione
Schiena      1 esposizione
Gambe        1 esposizione
```

## Migliori carichi

Il record puro in kg va bene, ma va contestualizzato:

```text
PEC FLY

36 kg × 15
miglior set nel range previsto
```

Invece di:

```text
36 kg
trend n/d
```

“Trend n/d” non dovrebbe apparire così spesso. Se mancano dati:

```text
1 sessione registrata
```

è più chiaro.

## Lista ultimi esercizi

La lista è utile, ma oggi mostra numeri troppo grandi e non sempre comparabili.

Nuova riga:

```text
Curl bilanciere

7 kg × 10
−1 rep rispetto all’ultima volta
```

Oppure:

```text
Lat pull-down machine

13,3 kg × 12
+3,3 kg a reps simili
```

## Animazioni progressi

I grafici devono animarsi solo una volta.

Line chart:

- la linea si disegna da sinistra a destra;
    
- i punti appaiono dopo;
    
- durata 450 ms;
    
- nessun rimbalzo.
    

Barre muscolari:

- crescita da 0 alla percentuale finale;
    
- durata 360 ms;
    
- ritardo massimo 30 ms tra righe.
    

Cambio periodo:

- crossfade tra dati;
    
- non rianimare tutto dalla base ogni volta.
    

---

# Storico lista

La schermata è già leggibile.

Migliorerei tre cose:

## 1. Ridurre le card

Ogni sessione può essere una riga ampia:

```text
14 LUG · 20:03

Giorno 3 · Schiena e bicipiti
18 serie · 1.946 kg
Scheda Luca Luglio 2026

Dettaglio →
```

## 2. Scheda come metadato

Il pallino verde va bene, ma il colore deve indicare esclusivamente quale scheda è stata usata.

Non deve indicare anche “completato”.

## 3. Stato

“Completato” può essere una label piccola, non verde brillante.

## Animazione lista

Quando si cambia filtro:

- le righe non valide svaniscono;
    
- quelle rimanenti si riposizionano con layout animation;
    
- durata 180–220 ms.
    

Quando una sessione viene eliminata:

- scivola leggermente a sinistra;
    
- altezza collassa;
    
- appare undo temporaneo:
    

```text
Allenamento spostato nel cestino · Annulla
```

---

# Calendario

Il calendario è una delle parti migliori dell’app.

## Miglioramenti

- giorni senza allenamento più piatti;
    
- giorno selezionato con contorno e non riempimento pieno;
    
- pallini delle schede più piccoli;
    
- più schede nello stesso giorno rappresentate da due linee o due punti;
    
- legenda sempre vicina.
    

## Animazione cambio mese

Non fare uno slide completo di tutta la pagina.

Solo la griglia calendario:

- mese successivo entra da destra;
    
- mese precedente entra da sinistra;
    
- titolo mese cambia con crossfade;
    
- riepilogo mensile aggiorna i valori con dissolvenza.
    

Durata 220 ms.

## Selezione giorno

Quando tocchi un giorno:

- il contorno si espande;
    
- il pannello del giorno sotto scorre fino alla posizione visibile;
    
- le sessioni compaiono in ordine temporale.
    

---

# Impostazioni

Questa schermata evidenzia molto il problema card-based.

Hai card per:

- profili;
    
- PIN;
    
- scheda;
    
- backup;
    
- zona pericolosa;
    
- info app.
    

## Nuova struttura

```text
APP E DATI

PROFILO
Luca
Gestisci profili                      >

SICUREZZA
PIN profilo                         Attivo
Cambia PIN                            >

SCHEDA
Importa nuova scheda                  >
Schede archiviate                     >

DATI
Esporta CSV                           >
Scarica backup JSON                   >
Cestino                               >

ZONA PERICOLO
Reimposta dati                        >

INFO
Gym Tracker v0.26.0
```

La schermata diventa molto più compatta.

## PIN

La modifica PIN non dovrebbe essere tutta aperta.

Toccando “Cambia PIN” si apre uno sheet o una pagina dedicata.

## Zona pericolosa

Il colore rosso deve essere usato solo nel momento in cui l’utente entra nella sezione, non per una grande card sempre visibile.

## Animazioni impostazioni

- righe che aprono sheet con transizione verticale;
    
- stato PIN che cambia con un piccolo crossfade;
    
- nessuna animazione decorativa.
    

---

# Profili

La schermata profili è semplice, ma le tile sono troppo grandi e molto vuote.

## Nuova griglia

```text
CHI SI ALLENA?

[ 🏋️ Luca     🔒 ]
[ 💪 Samus       ]
[ ⚡ Frakka      ]

[ + Aggiungi profilo ]
```

Il profilo selezionato:

- si solleva di 2 px;
    
- avatar cresce leggermente;
    
- compare stato di caricamento interno.
    

Dopo la selezione:

- il nome profilo si espande verso la Home con `layoutId`;
    
- la schermata Home appare sotto;
    
- durata totale 260 ms.
    

La bottom nav non dovrebbe essere presente nella schermata di selezione profilo.

---

# Importazione nuova scheda

La separazione AI / JSON è corretta.

## Riduzione delle ripetizioni

Attualmente appaiono più volte:

- “Genera con AI”;
    
- “PDF, DOCX, foto o testo”;
    
- descrizione del processo;
    
- step;
    
- file chooser.
    

La pagina dovrebbe essere:

```text
NUOVA SCHEDA

Da documento del trainer
[ Genera con AI ]

Da file già preparato
[ Importa JSON ]

1 · SCEGLI FILE

PDF, DOCX, immagine o testo
[ Seleziona file ]

☑ Attiva la nuova scheda
  La scheda attuale verrà archiviata.
```

## Animazioni importazione

Dopo la selezione file:

1. il nome file sostituisce l’area vuota;
    
2. appare una barra di elaborazione;
    
3. le fasi cambiano:
    

```text
Lettura documento
Riconoscimento esercizi
Controllo GIF
Preparazione anteprima
```

Non usare una progress bar falsa che va da 0 a 100 senza significato.

Usare step reali con check progressivi.

Durante il matching AI:

- un solo indicatore animato;
    
- niente testo che lampeggia;
    
- niente effetti “magici”.
    

---

# Sistema motion completo

## Principio

La motion deve rispondere a una di queste domande:

- dove è andato il contenuto?
    
- cosa è cambiato?
    
- quale azione è stata confermata?
    
- quale elemento è ora attivo?
    

Se non risponde a una di queste domande, probabilmente non serve.

## Durate

```css
--motion-fast: 110ms;
--motion-control: 160ms;
--motion-layout: 220ms;
--motion-sheet: 280ms;
--motion-chart: 420ms;
```

## Easing

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

## Press feedback

Tutti i pulsanti:

```text
scale 1 → 0.98
duration 90 ms
```

Non applicare scale più forti ai grandi CTA.

## Page transition

Tra tab principali:

- niente slide laterale completa;
    
- contenuto in fade;
    
- spostamento massimo 4 px;
    
- barra attiva nella bottom nav scorre orizzontalmente.
    

## Bottom sheet

- ingresso dal basso;
    
- overlay opacità massima 0.45;
    
- handle visibile;
    
- chiusura trascinando;
    
- snap point solo se serve davvero.
    

## Reduced motion

Con `prefers-reduced-motion`:

- rimuovere spostamenti;
    
- mantenere solo opacity;
    
- grafici senza disegno progressivo;
    
- nessun auto-scroll animato.
    

---

# Bottom navigation

L’attuale bottom nav è coerente, ma:

- la barra verde sopra l’icona è molto lunga;
    
- il dock sessione spesso la copre;
    
- alcune schermate molto operative dovrebbero ridurne la presenza.
    

## Nuova nav

```text
Home   Scheda   Storico   Progressi
```

Stato attivo:

- icona piena;
    
- testo più scuro o chiaro;
    
- piccola tacca da 24 px;
    
- niente glow.
    

Durante l’allenamento attivo potresti sostituire la nav completa con:

```text
← Scheda      Allenamento      Andamento
```

oppure mantenerla nascosta e usare una barra sessione dedicata.

La navigazione globale durante l’inserimento di una serie è meno importante della continuità dell’allenamento.

---

# Palette finale consigliata

Per mantenere una modalità prevalentemente scura, ma più sofisticata:

```css
:root {
  --canvas: #101416;
  --surface: #171D20;
  --surface-raised: #20282C;
  --surface-input: #0B0F11;

  --text-primary: #F0F1ED;
  --text-secondary: #A9B0AD;
  --text-muted: #747D79;

  --line: #343D3A;

  --action: #5E78D6;
  --success: #70927D;
  --timer: #D27A4A;
  --danger: #B95A55;
  --plan-a: #5E78D6;
  --plan-b: #A576C5;
  --plan-c: #C48A4E;
}
```

Questa palette rimane scura, ma si allontana dal classico navy + mint.

Il verde attuale può restare solo come colore storico della versione precedente, non come asse principale del nuovo linguaggio.

---

# Regole finali per la riscrittura

1. Una schermata non deve avere più di una grande CTA primaria visibile.
    
2. Nessuna card dentro un’altra card.
    
3. La GIF è secondaria rispetto alla registrazione della serie.
    
4. Il timer esiste in un solo posto.
    
5. Il progresso si mostra come serie completate, non come badge flottante.
    
6. Le azioni pericolose vivono in menu o sezioni dedicate.
    
7. Le statistiche devono spiegare il motivo del miglioramento.
    
8. `trend n/d` va sostituito con un messaggio umano.
    
9. Gli input numerici devono essere orizzontali e molto leggibili.
    
10. L’editor deve aprire un esercizio alla volta.
    
11. I grafici animano solo al primo ingresso.
    
12. Il mini-player deve essere un’estensione della bottom nav.
    
13. La motion firma è il completamento della serie attraverso la spina di calibrazione.
    
14. I colori delle schede non devono coincidere con colori di stato.
    
15. La Home deve mostrare prima ciò che bisogna fare, poi ciò che è successo.
    

La priorità visiva ideale sarebbe:

1. **Allenamento attivo**
    
2. **Home**
    
3. **Editor scheda**
    
4. **Progressi**
    
5. **Impostazioni**
    
6. **Storico e calendario**
    

Storico e calendario sono già le parti più vicine a una UI completa. Allenamento ed editor, invece, sono le aree dove il redesign produrrebbe il salto di qualità più evidente.