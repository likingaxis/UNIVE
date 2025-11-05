## 🔹 Idea di fondo

- Il **software tradizionale** segue una **sequenza fissa di istruzioni**: prende un input, applica regole predefinite, produce un output. Tende a **lavorare in isolamento**.
    
- Un **agente IA**, invece, **vive in un ambiente**: percepisce segnali, **decide** in modo (più o meno) autonomo e **agisce**, influenzando a sua volta l’ambiente.
    

---

## 🤖 Cos’è un agente intelligente e come cicla

Un **agente** è qualunque entità che **percepisce** il mondo con dei **sensori** e **agisce** su di esso con **attuatori**. Possono esserlo robot o programmi software.

### 🔄 Il ciclo dell’agente (percepire → decidere → agire → aggiornarsi)

1. **Percepisco** — ricevo dati dall’ambiente tramite i sensori.
    
2. **Decido** — elaboro la percezione (e lo **stato interno**, se presente) e scelgo un’azione.
    
3. **Agisco** — invio l’azione agli attuatori.
    
4. **Mi aggiorno** — aggiorno **me stesso** e/o l’**ambiente** in base all’azione eseguita.
    

![[Pasted image 20251013185628.png]]

---

## 🧩 Percezioni, funzione agente e programma agente

### 1) **Percept** (Percezione)

L’**input** che l’agente riceve dai sensori in un dato istante.

### 2) **Percept Sequence** (Sequenza percettiva)

La **storia completa** di tutte le percezioni ricevute dall’agente nella sua esistenza.

### 3) **Agent Function** (Funzione agente)

La mappa astratta che, data **ogni possibile sequenza percettiva**, sceglie **un’azione**:  
$$f: P^* \rightarrow A$$
dove $P^*$ è l’insieme di tutte le sequenze percettive e $A$ l’insieme delle azioni.

> In teoria, la scelta dipende **solo** dalla sequenza percettiva (più eventuale conoscenza interna).

### 4) **Agent Program** (Programma agente)

L’**implementazione concreta** della funzione agente su una certa **architettura fisica**.  
A differenza della funzione astratta, il programma vede **la percezione corrente** e deve **memorizzare/gestire lo stato** del passato, quando serve.

![[Pasted image 20251016085815.png]]

---

## 🎯 Agenti razionali (e perché non servono poteri magici)

Un **agente razionale** sceglie, per ogni sequenza di percezioni, l’azione che **massimizza il valore atteso** della **misura di prestazione**, date le informazioni disponibili e la propria conoscenza.

> “Agente intelligente” ≈ “agente razionale”.

**Razionalità ≠ Onniscienza**  
Essere razionali **non** significa sapere o poter fare tutto: si decide **al meglio** con le informazioni e le capacità disponibili.

### Come si valuta la prestazione

- **Misura esterna**: valuta i **risultati** nell’ambiente (non “come pensa” l’agente).
    
- **Criterio del progettista**: definisce **cosa conta come successo** per quel problema.  
    → Insieme determinano la **misura di prestazione**.
    

### I 4 fattori della razionalità

1. **Misura di prestazione** → definisce il **successo**.
    
2. **Conoscenza pregressa** → aiuta a **prevedere** le conseguenze.
    
3. **Sequenza percettiva** (presente+passato) → info realmente disponibili.
    
4. **Capacità dell’agente** → azioni **davvero eseguibili**.
    

### Razionalità, apprendimento e autonomia

- Poiché **non conosciamo tutto a priori**, un agente razionale dovrebbe **migliorare con l’esperienza**.
    
- Un agente è **autonomo** quando il suo comportamento dipende in misura significativa dalla **propria esperienza**, non solo da conoscenza “built-in”.
    

---

## 🧰 Il framework PEAS

Serve per **specificare l’ambiente** e chiarire il problema dell’agente.

- **P — Performance (Prestazioni)**: cosa consideriamo **buono**?  
    _Taxi autonomo:_ sicurezza, rispetto del codice, tempo, profitti.
    
- **E — Environment (Ambiente)**: cosa c’è “là fuori” che conta?  
    _Strade, traffico, pedoni, meteo…_
    
- **A — Actuators (Attuatori)**: con cosa **agisco**?  
    _Sterzo, acceleratore, freni, clacson…_
    
- **S — Sensors (Sensori)**: cosa **percepisco**?  
    _Telecamere, radar, GPS, tachimetro…_
    

##### Esempio con ChatGPT

![[Pasted image 20251016093738.png]]

---

## 🌍 Le proprietà dell’ambiente (e del problema) — **versione completa**

Queste dimensioni guidano **complessità**, **algoritmi** e **architettura**. Per ognuna: **definizione → come la riconosco → implicazioni → esempio**.

### 1) **Osservabilità**

- **Completamente osservabile**: i sensori forniscono **tutte le informazioni rilevanti** sullo stato corrente.
    
    - _Riconoscimento_: non devo ricordare il passato per decidere ora.
        
    - _Implicazioni_: meno memoria; pianificazione/decisione più diretta.
        
    - _Esempio_: scacchi da tavolo (vedi tutta la scacchiera).
        
- **Parzialmente osservabile**: i sensori sono **incompleti/rumorosi** → lo stato non è pienamente noto.
    
    - _Riconoscimento_: devo **mantenere uno stato interno**/**belief state** (filtri di Bayes/Kalman).
        
    - _Implicazioni_: politiche con memoria; stima dello stato.
        
    - _Esempio_: guida con foschia, robot con sensori imperfetti.
        
- **Inosservabile**: nessuna informazione utile.
    
    - _Implicazioni_: **agisci alla cieca** seguendo una strategia fissa o esplorazioni casuali.
        

### 2) **Numero di agenti**

- **Singolo agente**: il resto è **non strategico** (oggetti/ostacoli).
    
    - _Esempio_: aspirapolvere domestico.
        
- **Multi-agente**: altri agenti con **obiettivi propri**.
    
    - **Cooperativo** (stessa misura) vs **competitivo** (misure opposte/differenti).
        
    - _Implicazioni_: coordinamento, comunicazione, teoria dei giochi.
        
    - _Esempio_: asta online; giochi a due.
        

### 3) **Modello di transizione**

- **Deterministico**: stato successivo = funzione di stato + azione.
    
    - _Implicazioni_: planning classico su grafi.
        
- **Stocastico**: transizioni con **probabilità** note/stimabili.
    
    - _Implicazioni_: MDP/POMDP, massimizzazione dell’**utilità attesa**.
        
- **Non deterministico**: elenchi gli **esiti possibili**, ma **senza probabilità**.
    
    - _Implicazioni_: planning su **AND/OR graph** (garantisci successo sui rami ammessi).
        

### 4) **Struttura dell’interazione**

- **Episodico**: decisioni **indipendenti** fra loro.
    
    - _Implicazioni_: policy “miopiche” bastano; niente pianificazione lunga.
        
    - _Esempio_: classificare immagini isolate.
        
- **Sequenziale**: le azioni **influenzano** il futuro.
    
    - _Implicazioni_: serve **pianificare** (ricerca, planning, RL).
        
    - _Esempio_: scacchi, guida.
        

### 5) **Cambiamento temporale**

- **Statico**: il mondo **non cambia** mentre delibero.
    
    - _Esempio_: puzzle off-line.
        
- **Dinamico**: il mondo **cambia** mentre penso/agisco.
    
    - _Implicazioni_: sensing continuo, tempi di risposta.
        
    - _Esempio_: robotica, trading in tempo reale.
        
- **Semi-dinamico**: stato stabile ma **la misura di prestazione** cambia (penalità tempo).
    
    - _Esempio_: scacchi con orologio.
        

### 6) **Natura delle variabili**

- **Discrete**: stati/azioni/tempo **finiti o enumerabili**.
    
    - _Implicazioni_: grafi, tabelle, logiche proposizionali.
        
    - _Esempio_: griglie, giochi a turni.
        
- **Continue**: valori **reali** (stato/azioni/tempo).
    
    - _Implicazioni_: controllo, ottimizzazione continua, reti neurali.
        
    - _Esempio_: velocità, angoli, posizioni.
        

### 7) **Conoscenza delle regole (Known/Unknown)**

- **Ambiente noto**: conosco il **modello** azione→stato (o le probabilità).
    
    - _Implicazioni_: **pianificazione off-line** accurata possibile.
        
- **Ambiente ignoto**: il modello **non è noto** → devo **apprenderlo** (model-learning) o imparare una policy (model-free).
    
    - _Implicazioni_: **esplorazione** e gestione dell’incertezza.
        

![[Pasted image 20251016094914.png]]

**Attenzione terminologica**

- **Parzialmente osservabile ≠ ignoto**: puoi conoscere perfettamente le **regole** ma vedere **male** lo stato (POMDP).
    
- **Non deterministico ≠ stocastico**: nel primo non hai probabilità; nel secondo sì.
    
- **Statico/dinamico** riguarda **il tempo**; **episodico/sequenziale** riguarda **la dipendenza** tra decisioni.
    

---

## 🧪 Ambiente e automazione (simulazione)

Per progettare/testare agenti servono **simulatori** che:

- generano **stimoli** per gli agenti,
    
- raccolgono le **azioni**,
    
- **aggiornano** lo stato dell’ambiente,
    
- attivano processi conseguenti,
    
- **valutano** le prestazioni.
    

**Esempio di simulatore**  
![[Pasted image 20251016140906.jpg]]

---

## 🧱 Struttura di un agente

$$\textbf{AGENTE} = \textbf{ARCHITETTURA} + \textbf{PROGRAMMA}$$
### Funzione agente → Programma agente

La funzione (astratta) diventa un **programma**:  
$$Agent : \text{Percezioni} \rightarrow \text{Azioni}$$

**Pseudo–programma**  
![[Pasted image 20251016141848.jpg]]

---

# 🧭 Famiglie di architetture di agenti

## 1) Agenti basati su **tabella** (lookup)

Consultano una **tabella** che associa **(sequenza di) percezioni → azioni**.

> Semplice ma **impraticabile** su problemi reali e **non autonomo**.

### Reattivi semplici

![[Pasted image 20251016143808.jpg]]  
Flusso: percepisco → **regola condizione–azione** → agisco.  
**Schema tipico**  
![[Pasted image 20251016144146.jpg]]

> [!tip] Esempio (Wumpus)  
> ![[Pasted image 20251016144405.jpg]]  
> Il Wumpus **puzza**, il **buco** genera **vento**.  
> ![[Pasted image 20251016144415.jpg]]

---

## 2) Agenti **basati su modello**

Mantengono uno **stato interno** del mondo, aggiornato con:

- percezioni attuali,
    
- modello di **come evolve il mondo**,
    
- modello di **come le azioni lo modificano**.
    

![[Pasted image 20251016144855.jpg]]

**Codice (schema)**  
![[Pasted image 20251016145402.jpg]]

---

## 3) Agenti **con obiettivo** (goal-based)

Come i basati su modello, ma con un **goal** che guida la scelta.  
![[Pasted image 20251016145830.jpg]]

- **Guidati da obiettivi**,
    
- **pianificano** sequenze di azioni,
    
- **più flessibili**, ma più **costosi** computazionalmente.
    

---

## 4) Agenti con **utilità** (utility-based)

Non basta raggiungere un goal: occorre valutare **quanto è buono** ciascun esito.

**Funzione di utilità**  
$U(s) = \text{grado di utilità dello stato }$ 
→ Confronti stati/obiettivi diversi e consideri la **probabilità di successo** (valore atteso).

> [!tip] Esempio  
> Auto autonoma: **breve ma rischiosa** vs **lunga ma sicura** → utility combina tempo, rischio, comfort.

---

## 5) Agenti che **apprendono**

Migliorano nel tempo grazie a un **ciclo di feedback**.

![[Pasted image 20251016150117.jpg]]

- **Performance Element**: il programma che **agisce**.
    
- **Performance Standard**: misura esterna di **quanto bene** va.
    
- **Critic**: analizza risultati e fornisce **feedback**.
    
- **Learning Element**: **adatta** il comportamento.
    
- **Problem Generator**: propone **nuove situazioni** da esplorare.
    

**Meccanismo**: Agisco → Valuto (critic+standard) → Imparo (spesso in **simulazione**) → Esploro → **Aggiorno** il performance element.

---

## 🧩 Rappresentazioni della conoscenza

Gli agenti ragionano meglio con **rappresentazioni interne** adeguate.

### 1) **Atomica**

![[Pasted image 20251016150129.jpg]]  
Stati come **unità indivisibili**. Semplice; utile con spazi **finiti** e transizioni semplici.

### 2) **Fattorizzata**

![[Pasted image 20251016150349.jpg]]  
Stati descritti da **variabili/feature** (posizione, velocità, temperatura…).

### 3) **Strutturata**

![[Pasted image 20251016150400.jpg]]  
Oggetti e **relazioni** (grafi, logiche). Più espressiva per relazioni **complesse**.

> [!tip] Digressione — **Semantic Embedding (Wordspace)**  
> ![[Pasted image 20251016150450.jpg]]  
> ![[Pasted image 20251016150513.jpg]]  
> Parole come **vettori** in spazi continui: vicinanza ≈ **somiglianza semantica**.  
> Esempio: “Parma” vicino a “culatello”, “Langhirano” per contesti simili.

---

## 📌 Desiderata di un buon agente

- **Accuratezza** (vicino a umani/esperti)
    
- **Generalità** (portabilità tra domini)
    
- **Sostenibilità** (costi di manutenzione)
    
- **Modularità** (riuso/aggiornabilità)
    
- **Trasparenza** (capire **come/perché** decide)
    
- **Scalabilità** (reggere dati/utenti in crescita)