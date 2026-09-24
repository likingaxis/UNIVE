# Workflow Operativo per la Creazione di Macchine (Guida per il Tesista)

Questo documento illustra il flusso operativo standard per trasformare un'idea di massima in una challenge completa e deployabile. Il processo sfrutta l'ecosistema agentico suddiviso tra la logica di design (**VulcaMind**) e la generazione infrastrutturale (**VulcaForge**).

Il flusso va eseguito rigorosamente in quest'ordine per garantire la totale coerenza tra il concept narrativo e il reale codice generato.

---

### Fase 0: Preparazione file di base e Design Narrativo (VulcaMind)
Creare una cartella in VulcaMind con al suo interno un file `DESCRIPTION.md` dove scrivi la tua idea di massima per la macchina b2r e le due standalone.

Il punto di partenza è sempre un'idea grezza (es. *"Voglio una macchina riguardante un autosalone. Tramite enumerazione sul erver web aziendale troviamo il vhost dalle email, e enumerazione mostra un vhost admin.autosalone.vdsi. Questa piattaforma admin chiede un login vulnerabile a sSQLI base. La pagina interna è vulnerabile a LFI che porta a un RCE tramite log poisoning"*).

### Fase 1: Generazione storyline dettagliata
A partire da `DESCRIPTION.md`, genera la storyline dettagliata e le domande CTF usando il comando: 
2. **Generazione Storyline** (`/mind_generate_storyline_b2r` oppure `stnd`)
   - **Obiettivo:** Trasforma il riassunto dell'idea in una narrativa tecnica estremamente dettagliata (`STORYLINE.md`), fornendo un contesto immersivo e realistico alla challenge.
3. **Generazione Challenge CTF** (`/mind_generate_ctf_b2r` oppure `stnd`)
   - **Obiettivo:** Estrae gli obiettivi dalla storyline e popola automaticamente la struttura delle domande, delle flag e dei punteggi compatibili con CTFd.

**Loopback feedback:** tra fase 1 e fase 0, fino a quando `DESCRIPTION.md` non rispecchia perfettamente la storyline generata e le domande CTF.

---

### Fase 2: Generazione Infrastrutturale (VulcaForge)

Una volta definita e approvata la storyline, l'agente deve tradurla in codice infrastrutturale reale.

4. **Creazione della Macchina** (`/forge_generate_machine`)
   - **Obiettivo:** Legge la storyline e crea il file Ansible YAML completo per la macchina. L'agente individuerà le componenti necessarie all'interno del *vulnerability registry* e le assemblerá per costruire l'ambiente. 
   - Tipicamente dopo questo passo si effettua una prima fase di verifica manuale per vedere se i servizi sono raggiungibili e le logiche di base implementate correttamente.
   - Viene generato tutto il materiale per l'applicazione ansible dentro la cartella `VulcaForge/machines/autosalone_test`
5. **Generazione Applicativi Web (Opzionale)** (`/forge_generate_web_app`)
   - **Obiettivo:** Se la challenge prevede un portale web custom vulnerabile (es. form di login, upload file), questo comando ne scrive il codice sorgente pronto da iniettare nella macchina.
   - Dopo aver verificato che le vulnerabilità del passo 4. sono state inserite correttamente si passa alla generazione delle web app presenti inserendo temi e interfacce che rispecchino in maniera fedele quanto richiesto dalla storyline.

**Loopback feedback:** tra fase 2, fase 1 e fase 0. Se la macchina non funziona si corregge se necessario `DESCRIPTION.md` e `STORYLINE.md` se gli agenti non hanno catturato bene l'idea di base (es. autosalone in realtà è un meccanico oppure about us presenta me senza nomi e cognomi per fare wordlist custom). Se invece c'è un errore durante la generazione ansible ma non funzionano si passa a fase 3 per correggere la documentazione (anche se in questo caso la documentazione non rispecchia perfettamente la macchina).


### Fase 3: Gernerazione Macchina Virtuale (VulcaForge)

Dopo aver generato il file ansible per la macchina si passa alla generazione della macchina virtuale:

```
python .\generator\main.py machines\autosalone_test
```

Viene generata la cartella `VulcaForge/out/autosalone_test/` con all'interno le configurazioni per la macchina virtuale. Il Dockerfile permette di creare ed eseguire una macchina docker locale tramite il comando

```
cd VulcaForge\out\autosalone_test
docker build . -t autosalone_test
docker run -d -p 10001:22 autosalone_test
```

---

### Fase 3: Allineamento e Documentazione Finale (VulcaMind)

Spesso il codice Ansible generato (nomi file, path, utenti) devia leggermente da quanto ipotizzato in fase di design. È cruciale allineare la parte documentale alla realtà infrastrutturale.

6. **Raffinamento CTF** (`/mind_refine_ctf_from_machine`)
   - **Obiettivo:** Mette a confronto la CTF generata nella Fase 1 con il file Ansible della Fase 2. Corregge autonomamente incongruenze (es. path di una flag) per assicurarsi che corrispondano alla realtà della macchina forgiata.
7. **Generazione Writeup Ufficiale** (`/mind_generate_exam_writeup`)
   - **Obiettivo:** Produce la soluzione ufficiale dell'esame in Markdown. Unisce i passaggi pratici di compromissione a profonde spiegazioni teoriche, predisponendo già i segnaposti per gli screenshot.
8. **Generazione Esame Orale (Opzionale)** (`/mind_generate_oral_exam`)
   - **Obiettivo:** Genera un set di domande mirate per le sessioni orali basandosi sulle vulnerabilità specifiche implementate sulla macchina.

---

### Fase 4: Orchestrazione e Testing (VulcaShip)

A questo punto gli artefatti sono completi. Il passaggio finale sfugge al controllo degli agenti e passa al motore di deployment.

9. **Deployment su Proxmox**
   - **Obiettivo:** Si invoca **VulcaShip** (CLI) passando in input le configurazioni autogenerate. VulcaShip effettuerà il provisioning sull'hypervisor, applicherà le configurazioni Ansible in modalità "stateless" e preparerà la macchina per il testing di QA finale.
