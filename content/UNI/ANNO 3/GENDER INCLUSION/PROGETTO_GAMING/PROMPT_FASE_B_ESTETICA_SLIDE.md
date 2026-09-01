# PROMPT PER CHATGPT: FASE B (Design Estetico & Codice Marp per Slide PPTX)

Copia e incolla il seguente prompt su **ChatGPT** (nella stessa conversazione in cui hai generato la Fase A):

```text
Agisci come un visual designer professionista ed esperto di presentazioni accademiche ad alto impatto.

Partendo dalla STRUTTURA DELLE 9 SLIDE (Sezione 1) che abbiamo definito per l'esame di "Gender & Inclusion" per 3 relatori, crea il CODICE SORGENTE MARKDOWN COMPLETO compatibile con il framework MARP (Markdown Presentation Ecosystem).

--- LINEE GUIDA DI DESIGN ESTETICO ---

1. PALETTE CROMATICA MODERNA ED ELEGANTE:
   - Sfondo Dark Slate moderno: `#0f172a` (evita il nero puro e il bianco piatto)
   - Testo primario: `#f8fafc` (massima leggibilità)
   - Accento Tecnologico/Tech: `#38bdf8` (Cyan brillante per titoli, informatica e dati positivi)
   - Accento Alert/Criticità: `#f43f5e` (Rosa corallo/magenta per dati su molestie, tossicità e gender pay gap)
   - Accento Inclusione: `#a855f7` (Viola/lilla per concetti di unicità, identità e inclusione)

2. COMPONENTI VISIVI DA IMPLEMENTARE CON CSS INLINE/STYLESHEET:
   - Speaker Badge: un badge a pillola in alto a sinistra su ogni slide per identificare l'oratore (es. [RELATORE 1], [RELATORE 2], [RELATORE 3]).
   - Stat Cards (Box Statistiche): riquadri con bordo colorato e numeri in grande (font-size 40-48px) per i dati chiave (48% gamer donne, 24% pay gap, 76% molestie, 23-25% sviluppatrici).
   - Layout a 2 Colonne (CSS Grid/Flex): colonna sinistra con bullet point sintetici (massimo 3-4 righe) e colonna destra con box statistici, schemi visivi o confronti.
   - Timeline Card: per la Slide 5 (evoluzione da Lara Croft '96 ad Aloy/Abby fino a BG3).

3. REGOLA AUREA:
   - NIENTE muri di testo! Il testo deve essere sintetico, a punti elenco, facile da leggere al volo dalla docente mentre noi parliamo.
   - Ogni slide deve occupare esattamente lo spazio visivo senza debordare o creare barre di scorrimento.

--- INTESTAZIONE MARP OBBLIGATORIA DA INCLUDERE IN CIMA ---

```markdown
---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #0f172a
color: #f8fafc
style: |
  section {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 22px;
    padding: 40px 50px;
    background-color: #0f172a;
    color: #f8fafc;
  }
  h1 { color: #38bdf8; font-size: 38px; margin-bottom: 10px; }
  h2 { color: #38bdf8; font-size: 30px; margin-bottom: 15px; border-bottom: 2px solid #334155; padding-bottom: 6px; }
  h3 { color: #94a3b8; font-size: 19px; margin-top: 0; }
  ul { line-height: 1.5; margin-top: 8px; }
  li { margin-bottom: 8px; }
  .speaker-badge {
    display: inline-block;
    background: #0284c7;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    padding: 2px 10px;
    border-radius: 9999px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 25px;
    align-items: center;
  }
  .grid-equal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .stat-card {
    background: #1e293b;
    border-left: 5px solid #38bdf8;
    padding: 15px 18px;
    border-radius: 8px;
    margin: 8px 0;
  }
  .stat-card-alert {
    background: #1e293b;
    border-left: 5px solid #f43f5e;
    padding: 15px 18px;
    border-radius: 8px;
    margin: 8px 0;
  }
  .stat-num {
    font-size: 38px;
    font-weight: 800;
    color: #38bdf8;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-num-alert {
    font-size: 38px;
    font-weight: 800;
    color: #f43f5e;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-desc {
    font-size: 15px;
    color: #94a3b8;
    line-height: 1.3;
  }
---
```

Genera ora l'intero codice Markdown completo per TUTTE E 9 LE SLIDE pronto per essere salvato ed esportato in PowerPoint (.pptx)!
```
