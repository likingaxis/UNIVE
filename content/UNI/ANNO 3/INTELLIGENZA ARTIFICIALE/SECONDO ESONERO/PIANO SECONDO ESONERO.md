- [x] MAPPA ARGOMENTI PER CONTESTUALIZZARLI
- [ ] INIZIO SCRITTURA TEORIA UNICA SECONDO ESONERO
- [ ] ESERCIZIO 
- [ ] ESERCIZIO SIMO
- [ ] ESERCIZIO AUR
- [ ] RIPASSO TEORIA(Flashcards?)
# Mappa concettuale finale del corso di Intelligenza Artificiale

> **Domanda guida del corso**  
> _Come può una macchina rappresentare la conoscenza, usare il linguaggio, ragionare e imparare dai dati?_

---

## 1. Rappresentazione della conoscenza (Knowledge Representation)

**Obiettivo:** dare una struttura esplicita a ciò che esiste nel mondo, in modo computabile.

### 1.1 Ontologie

- Specifiche formali di un dominio
    
- Definiscono **categorie (classi)**, **relazioni**, **proprietà**, **vincoli**
    
- Consentono **condivisione**, **riuso** e **ragionamento**
    
- Ontologie superiori: concetti generali → concetti specifici
    

### 1.2 Categorie, classificazione, ereditarietà

- Le categorie organizzano il mondo
    
- Classificazione = appartenenza a una categoria
    
- Ereditarietà = propagazione delle proprietà
    
- Problemi: eccezioni, conflitti, incompletezza
    

---

## 2. Sistemi di categorizzazione e ragionamento

### 2.1 Reti semantiche

- Grafi concettuali: nodi = concetti, archi = relazioni
    
- Relazioni fondamentali: **IS**, **IS-A**
    
- Inferenze per ereditarietà
    
- Limiti: semantica poco rigorosa, gestione difficile di eccezioni
    

### 2.2 Logiche descrittive (DL)

- Linguaggi formali per definire concetti
    
- Consentono verifica di coerenza e classificazione automatica
    
- Base delle ontologie moderne (OWL)
    

### 2.3 Ragionamento default e logiche non monotone

- Gestione di ciò che è "normalmente vero"
    
- Possibilità di ritirare conclusioni
    

---

## 3. Rappresentazioni semantiche avanzate

### 3.1 Frame (Minsky)

- Rappresentazione strutturata di situazioni tipiche
    
- Slot–filler, valori default, procedure
    
- Gestiscono eccezioni e conoscenza incompleta
    
- Vicini alla programmazione a oggetti
    

### 3.2 Frame semantics

- Il significato dipende dallo **scenario concettuale**
    
- Le parole attivano frame e ruoli semantici
    
- Ponte tra linguaggio e conoscenza
    

### 3.3 Risorse linguistiche

- **WordNet**: rete semantica lessicale (synset)
    
- **FrameNet**: frame + ruoli semantici
    
- **Knowledge Graph**: fatti come triple (head, relation, tail)
    

---

## 4. Linguaggio Naturale (NLP)

**Obiettivo:** interpretare, generare e usare il linguaggio umano.

### 4.1 Perché è difficile

- Ambiguità (lessicale, sintattica, semantica, pragmatica)
    
- Variabilità
    
- Dipendenza dal contesto
    

### 4.2 Pipeline NLP classica

1. Analisi lessicale
    
2. Analisi sintattica (albero di derivazione)
    
3. Analisi semantica (predicati, ruoli)
    
4. Analisi pragmatica
    

### 4.3 Sintassi ↔ Semantica

- Dalla struttura sintattica ai predicati logici
    
- Collegamento con FOL e frame
    

---

## 5. Logica e ragionamento formale

### 5.1 Logica proposizionale

- Sintassi, semantica, modelli
    
- Validità, soddisfacibilità
    
- Inferenza, risoluzione
    

### 5.2 Logica del primo ordine (FOL)

- Oggetti, predicati, funzioni, quantificatori
    
- Inferenza più espressiva
    
- Unificazione, risoluzione per refutazione
    

### 5.3 Vantaggi della logica

- Trasparenza epistemologica
    
- Spiegabilità
    
- Modularità
    

---

## 6. Machine Learning (ML)

**Motivazione:** quando la conoscenza non può essere scritta a mano.

### 6.1 Definizione

- Imparare una funzione dai dati
    
- Da esempi specifici a regole generali (induzione)
    

### 6.2 Tipi di apprendimento

- Supervised
    
- Unsupervised
    
- Reinforcement
    
- Weakly supervised
    

### 6.3 Compiti

- **Classificazione**: output discreto
    
- **Regressione**: output continuo
    

---

## 7. Apprendimento supervisionato

### 7.1 Modello di apprendimento

- Funzione target f (ignota)
    
- Ipotesi h (modello appreso)
    
- Training set come unica informazione su f
    

### 7.2 Spazio delle ipotesi H

- Insieme dei modelli possibili
    
- Bias–variance trade-off
    
- Rasoio di Occam
    

---

## 8. Modelli di ML

### 8.1 Classificatori lineari

- Funzione: w·x + b
    
- Frontiera di decisione iperpianare
    
- Efficienti, interpretabili
    

### 8.2 Perceptron

- Classificatore lineare addestrabile
    
- Aggiornamento dei pesi sugli errori
    
- Limite: separabilità lineare
    

### 8.3 Alberi decisionali

- Regole if–then apprese
    
- Entropia, Information Gain
    
- Interpretabilità
    

---

## 9. Reti neurali

### 9.1 MLP (Multilayer Perceptron)

- Composizione di funzioni lineari + non linearità
    
- Maggiore espressività
    

### 9.2 Training

- Forward propagation
    
- Loss function
    
- Backpropagation
    
- Gradient Descent / SGD
    

### 9.3 Deep Learning

- Apprendimento automatico delle rappresentazioni
    
- Encoder–decoder, embedding
    

---

## 10. Valutazione dei modelli

### 10.1 Dataset

- Training
    
- Validation
    
- Test
    

### 10.2 Metriche

- Confusion Matrix
    
- Precision, Recall, F1
    
- Macro vs Micro averaging
    

### 10.3 Generalizzazione

- Overfitting
    
- Underfitting
    
- Cross-validation, hold-out
    

---

## 11. Quadro finale unificante

- **Ontologie / logica** → conoscenza esplicita, simbolica
    
- **NLP + frame** → linguaggio come accesso alla conoscenza
    
- **ML** → conoscenza appresa dai dati
    
- **Deep learning** → rappresentazioni apprese automaticamente
    

> L’IA integra rappresentazione, ragionamento, linguaggio e apprendimento per agire in ambienti complessi.