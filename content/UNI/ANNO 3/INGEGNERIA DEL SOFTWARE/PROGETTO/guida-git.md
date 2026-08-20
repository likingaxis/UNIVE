# 🛠️ Guida a Git & GitHub per i Collaboratori — *MyAma*

Questa guida spiega passo-passo come iniziare a lavorare sul repository **`PROGETTOISW`**, come sincronizzare le modifiche con il gruppo, gestire commit e push ed evitare/risolvere i conflitti.

---

## 📋 Indice dei Contenuti
1. [Fase 0: Accettare l'invito su GitHub](#-fase-0-accettare-linvito-su-github)
2. [Fase 1: Configurazione Iniziale (Una Tantum)](#-fase-1-configurazione-iniziale-una-tantum)
3. [Fase 2: Il Ciclo di Lavoro Quotidiano](#-fase-2-il-ciclo-di-lavoro-quotidiano)
   - [Approccio Semplice (Lavoro Diretto su `main`)](#-approccio-a-lavoro-diretto-su-main-consigliato-per-piccole-modifiche-ai-doc)
   - [Approccio Consigliato (Con Branch e Pull Request)](#-approccio-b-lavoro-con-branch-consigliato-per-sezioni-grandi)
4. [Fase 3: Come Risolvere i Conflitti (Merge Conflict)](#-fase-3-come-risolvere-i-conflitti-merge-conflict)
5. [Regole d'Oro & Best Practices](#-regole-doro--best-practices)
6. [Cheat Sheet: Tabella dei Comandi Rapidi](#-cheat-sheet-tabella-dei-comandi-rapidi)

---

## ✉️ Fase 0: Accettare l'invito su GitHub

Prima di poter effettuare qualsiasi operazione di scrittura (push) sul repository:

1. **Controlla l'email**: Cerca l'email ricevuta da GitHub con oggetto *"likingaxis invited you to collaborate on likingaxis/PROGETTOISW"*.
2. **Oppure visita direttamente il link**: [https://github.com/likingaxis/PROGETTOISW/invitations](https://github.com/likingaxis/PROGETTOISW/invitations).
3. Clicca su **"Accept Invitation"**.
4. Verifica di avere ora i permessi di scrittura sulla pagina del repository.

---

## ⚙️ Fase 1: Configurazione Iniziale (Una Tantum)

Se non hai ancora configurato Git sul tuo computer o non hai scaricato il progetto:

### 1. Configura la tua identità Git
Apri il terminale (PowerShell, Prompt dei comandi o Terminale di VS Code) ed esegui:
```bash
git config --global user.name "Tuo Nome e Cognome"
git config --global user.email "tua-email-github@example.com"
```

### 2. Clona il repository in locale
Spostati nella cartella in cui vuoi scaricare il progetto (ad esempio sul Desktop o nella cartella Università):
```bash
git clone https://github.com/likingaxis/PROGETTOISW.git
```

### 3. Entra nella cartella del progetto
```bash
cd PROGETTOISW
```

---

## 🔄 Fase 2: Il Ciclo di Lavoro Quotidiano

### 📌 Regola d'Oro Numero 1: *Pull prima di iniziare!*
> **Prima di metterti a scrivere o modificare qualsiasi file, scarica sempre l'ultima versione del lavoro fatta dai tuoi compagni.**

```bash
git pull
```

---

### 🟢 Approccio A: Lavoro Diretto su `main` (Per Modifiche Veloci / Documenti Separati)

Se ognuno lavora su file o sezioni diverse senza pestarsi i piedi:

1. **Aggiorna il codice locale**:
   ```bash
   git pull
   ```
2. **Modifica o crea i file** sul tuo editor (es. VS Code, Visual Paradigm, Obsidian, ecc.).
3. **Verifica quali file hai modificato**:
   ```bash
   git status
   ```
4. **Metti in stage i file da salvare**:
   - Per aggiungere tutti i file modificati/creati:
     ```bash
     git add .
     ```
   - Oppure per aggiungere solo un file specifico:
     ```bash
     git add idea.md
     ```
5. **Crea il commit con un messaggio descrittivo**:
   ```bash
   git commit -m "docs: aggiunti casi d'uso per il ritiro a domicilio"
   ```
6. **Invia le modifiche su GitHub**:
   ```bash
   git push origin main
   ```
   *(oppure semplicemente `git push`)*.

---

### 🔵 Approccio B: Lavoro con Branch (Consigliato per Modifiche Grandi o Parallele)

Se stai scrivendo una sezione complessa o vuoi lavorare senza rischiare di bloccare gli altri:

1. **Crea un tuo branch personale e spostati lì**:
   ```bash
   git checkout -b feature/analisi-requisiti
   ```
2. **Lavora normalmente**: fai le tue modifiche, `git add` e `git commit`:
   ```bash
   git add .
   git commit -m "docs: completata tabella requisiti funzionali"
   ```
3. **Invia il branch su GitHub**:
   ```bash
   git push -u origin feature/analisi-requisiti
   ```
4. **Unisci il lavoro su `main`**:
   - Vai su GitHub e clicca su **"Compare & pull request"** per aprire la Pull Request, oppure:
   - Se vuoi fare il merge da terminale:
     ```bash
     git checkout main
     git pull
     git merge feature/analisi-requisiti
     git push origin main
     ```

---

## ⚠️ Fase 3: Come Risolvere i Conflitti (Merge Conflict)

### Quando succede?
Se tu e un tuo collega avete modificato **le stesse righe dello stesso file** contemporaneamente e lui ha fatto `git push` prima di te, quando proverai a fare `git pull` o `git push` Git ti segnalerà un **CONFLICT**.

### Cosa fare:

1. **Esegui un pull**:
   ```bash
   git pull
   ```
   Git ti dirà quali file hanno conflitti (es. `CONFLICT (content): Merge conflict in idea.md`).

2. **Apri il file su Visual Studio Code**:
   Vedrai una sezione evidenziata simile a questa:
   ```markdown
   <<<<<<< HEAD (La tua versione in locale)
   Il cittadino può scegliere 3 fasce orarie: mattina, pomeriggio, sera.
   =======
   Il cittadino può scegliere 2 fasce orarie: mattina (8-13) o pomeriggio (14-19).
   >>>>>>> origin/main (La versione su GitHub del tuo compagno)
   ```

3. **Scegli come risolverlo**:
   Sopra il blocco, VS Code mostra dei comodi bottoni:
   - **Accept Current Change**: tieni solo la tua versione.
   - **Accept Incoming Change**: tieni solo la versione del tuo compagno.
   - **Accept Both Changes**: tieni entrambe.
   - Oppure **cancella a mano** i simboli `<<<<<<<`, `=======`, `>>>>>>>` e scrivi il testo corretto definitivo concordato.

4. **Conferma e invia la risoluzione**:
   ```bash
   git add nome-file-risolto.md
   git commit -m "fix: risolto conflitto di merge su idea.md"
   git push
   ```

---

## 💡 Regole d'Oro & Best Practices

1. **Scrivi messaggi di commit chiari**:
   - ✅ `docs: aggiunta descrizione attore Responsabile AMA`
   - ✅ `fix: corretto typo nei requisiti di performance`
   - ❌ `modifiche`, `update`, `asdasd`, `final_final2`
2. **Fai commit piccoli e frequenti**:
   - Non aspettare giorni per committare 50 file tutti insieme. Fai commit ogni volta che completi una sezione o un paragrafo coerente.
3. **Avvisa il gruppo se tocchi file centrali**:
   - Un messaggio veloce sul gruppo Telegram/WhatsApp (*"Ragazzi, sto modificando la tabella degli attori in `ideaprogetto.md`"*) evita il 99% dei conflitti!
4. **Non toccare la cartella `.git`**:
   - È la cartella nascosta che gestisce la cronologia; lasciala gestire a Git in automatico.

---

## ⚡ Cheat Sheet: Tabella dei Comandi Rapidi

| Comando | A cosa serve |
|---|---|
| `git pull` | **Scarica** le ultime modifiche da GitHub in locale |
| `git status` | **Mostra** quali file hai modificato o creato |
| `git diff` | **Mostra riga per riga** cosa hai cambiato nei file |
| `git add .` | **Prepara** tutte le modifiche per il salvataggio (staging) |
| `git add <file>` | **Prepara** solo il file specificato |
| `git commit -m "messaggio"` | **Salva** le modifiche nello storico locale con una nota |
| `git push` | **Invia** i commit locali su GitHub |
| `git checkout -b <nome-branch>` | **Crea e passa** a un nuovo ramo di lavoro |
| `git checkout main` | **Torna** al ramo principale `main` |
| `git log --oneline -n 10` | **Visualizza** gli ultimi 10 commit effettuati |
| `git stash` | **Mette da parte temporaneamente** modifiche non committate |
| `git stash pop` | **Ripristina** le modifiche messe da parte |
