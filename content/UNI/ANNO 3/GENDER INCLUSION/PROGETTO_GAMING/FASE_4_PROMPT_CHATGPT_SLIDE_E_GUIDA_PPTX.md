# FASE 4: Prompt per Slide Marp & Guida Esportazione in PPTX

In questa fase trasformerai il discorso in una presentazione slide pulita, visivamente accattivante e convertibile direttamente in un file PowerPoint (`.pptx`) o `.pdf`.

---

## 1. Prompt per ChatGPT (Generazione Slide in Markdown Marp per 3 Persone)

Copia e incolla questo prompt su **ChatGPT** dopo aver generato il discorso della Fase 3:

```text
Agisci come un visual designer ed esperto di presentazioni universitarie.
In base al discorso d'esame per 3 relatori generato in precedenza, crea il codice Markdown completo per una presentazione compatibile con il framework MARP (Markdown Presentation Ecosystem).

REQUISITI VISIVI E DI CONTENUTO:
1. Lunghezza totale: esattamente 9 slide, suddivise per i 3 relatori:
   - Relatore 1: Slide 1 (Copertina), Slide 2 (Introduzione & Motivazioni), Slide 3 (Demografia & Paradosso Percettivo)
   - Relatore 2: Slide 4 (Tossicità, Voce & Invisibilità), Slide 5 (Evoluzione del Character Design & Fluidità)
   - Relatore 3: Slide 6 (Industria & Glass Ceiling), Slide 7 (eSports & VCT Game Changers), Slide 8 (Conclusioni & Soluzioni), Slide 9 (Bibliografia & Fonti)
2. Layout moderno ed elegante: usa il tema Marp "gaia" o "default" con sfondi chiari/scuri puliti.
3. Regola aurea: NIENTE muri di testo! Solo bullet point essenziali, statistiche in evidenza con numeri grandi e callout visivi.
4. Ogni slide deve essere separata dalla sintassi Marp standard (tre trattini `---`).

ECCO L'INTESTAZIONE MARP DA USARE OBBLIGATORIAMENTE:
---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #f5f6fa
color: #2f3640
style: |
  section {
    font-family: 'Segoe UI', sans-serif;
    font-size: 24px;
    padding: 40px;
  }
  h1 { color: #2c3e50; }
  h2 { color: #34495e; font-size: 32px; }
  .highlight { color: #e74c3c; font-weight: bold; }
  .speaker-badge {
    display: inline-block;
    background: #3498db;
    color: white;
    font-size: 16px;
    padding: 4px 12px;
    border-radius: 12px;
    margin-bottom: 10px;
  }
  .stat-box {
    background: #ecf0f1;
    border-left: 6px solid #3498db;
    padding: 12px 20px;
    border-radius: 6px;
    margin: 10px 0;
  }
---

Genera ora l'intero codice Markdown pronto da salvare in un file .md!
```

---

## 2. Come convertire il file Markdown in PPTX (PowerPoint)

### Metodo A: Tramite Terminale (1 riga di comando con Node.js)
Nel tuo terminale (PowerShell o CMD), esegui direttamente con `npx`:

```powershell
# Per generare il file PowerPoint (.pptx)
npx @marp-team/marp-cli SLIDE_PRESENTAZIONE.md -o Presentazione_Gaming_Donne.pptx

# Per generare anche la versione PDF
npx @marp-team/marp-cli SLIDE_PRESENTAZIONE.md -o Presentazione_Gaming_Donne.pdf --allow-local-files
```
> Il file `.pptx` generato è nativo al 100%: puoi aprirlo con **Microsoft PowerPoint**, **Google Slides** o **Keynote**, cambiare i font, aggiungere immagini e loghi dei videogiochi e personalizzarlo liberamente.

---

### Metodo B: Tramite Estensione VS Code / Cursor (con 1 Click)
1. Installa l'estensione **"Marp for VS Code"** dal marketplace.
2. Apri il file `SLIDE_PRESENTAZIONE.md`.
3. In alto a destra clicca su **"Export Slide Deck..."** e scegli **PowerPoint Document (.pptx)** o **PDF Document (.pdf)**.
