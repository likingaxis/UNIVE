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
    font-size: 23px;
    padding: 45px 55px;
    background-color: #0f172a;
    color: #f8fafc;
  }
  h1 {
    color: #38bdf8;
    font-size: 40px;
    margin-bottom: 12px;
  }
  h2 {
    color: #38bdf8;
    font-size: 32px;
    margin-bottom: 20px;
    border-bottom: 2px solid #334155;
    padding-bottom: 8px;
  }
  h3 {
    color: #94a3b8;
    font-size: 20px;
    margin-top: 0;
  }
  ul {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  li {
    margin-bottom: 8px;
  }
  strong {
    color: #f1f5f9;
  }
  .highlight {
    color: #f43f5e;
    font-weight: bold;
  }
  .cyan {
    color: #38bdf8;
    font-weight: bold;
  }
  .speaker-badge {
    display: inline-block;
    background: #0284c7;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    padding: 3px 12px;
    border-radius: 9999px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 30px;
    align-items: center;
  }
  .grid-equal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
  .stat-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-left: 6px solid #38bdf8;
    padding: 18px 22px;
    border-radius: 10px;
    margin: 10px 0;
  }
  .stat-card-rose {
    background: #1e293b;
    border: 1px solid #334155;
    border-left: 6px solid #f43f5e;
    padding: 18px 22px;
    border-radius: 10px;
    margin: 10px 0;
  }
  .stat-number {
    font-size: 42px;
    font-weight: 800;
    color: #38bdf8;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-number-rose {
    font-size: 42px;
    font-weight: 800;
    color: #f43f5e;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-label {
    font-size: 16px;
    color: #94a3b8;
    line-height: 1.3;
  }
  .timeline-box {
    background: #1e293b;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #334155;
    font-size: 18px;
    margin-bottom: 8px;
  }
  footer {
    font-size: 13px;
    color: #64748b;
  }
---

<!-- SLIDE 1: COPERTINA -->
<span class="speaker-badge">Relatore 1</span>

# Donne, Gaming e Inclusione
### Stereotipi di Genere, Tossicità Online ed Evoluzione dell'Industria

<div class="grid-2" style="margin-top: 25px;">
<div>

* **Progetto d'Esame:** Corso di *Gender & Inclusion* (3 CFU)
* **Docente:** Prof.ssa Barbara Martini
* **Presentato da:** Studenti del Corso di Laurea in Informatica

</div>
<div class="stat-card" style="text-align: center;">

<div class="stat-number">Gaming ≠</div>
<div style="font-size: 20px; font-weight: bold; color: #f8fafc; margin-top: 5px;">Hobby Maschile</div>
<div class="stat-label" style="margin-top: 8px;">Analisi sociologica e tecnica tra utenza, narrazione e lavoro</div>

</div>
</div>

---

<!-- SLIDE 2: INTRODUZIONE & MOTIVAZIONE -->
<span class="speaker-badge">Relatore 1</span>

## Perché Parlarne da Informatici?
### La tecnologia non è culturalmente neutrale

<div class="grid-2">
<div>

* **Spazio sociale e medium culturale:** Il videogioco muove miliardi di interazioni umane quotidiane.
* **Le piattaforme sono progettate:** Voice chat, matchmaking, algoritmi di moderazione e avatar dipendono da scelte di codice.
* **Inclusione come requisito:** L'architettura software può amplificare le barriere o contribuire ad abbatterle.
* **Tre livelli di analisi:** Utenza, Contenuto narrativo e Industria.

</div>
<div>

<div class="stat-card">
  <div style="font-weight: bold; color: #38bdf8; font-size: 18px; margin-bottom: 5px;">⚙️ Scelte Architetturali</div>
  <div class="stat-label">Ogni feature tecnica impatta direttamente l'esperienza e l'inclusione degli utenti.</div>
</div>

<div class="stat-card" style="border-left-color: #a855f7;">
  <div style="font-weight: bold; color: #c084fc; font-size: 18px; margin-bottom: 5px;">🎯 Responsabilità Sociale</div>
  <div class="stat-label">Il design dei sistemi digitali definisce chi può partecipare in sicurezza.</div>
</div>

</div>
</div>

---

<!-- SLIDE 3: DEMOGRAFIA & PARADOSSO PERCETTIVO -->
<span class="speaker-badge">Relatore 1</span>

## Demografia: Il "Paradosso Percettivo"
### Le donne videogiocano già: perché sembrano invisibili?

<div class="grid-2">
<div>

* **Globale (ESA 2025):** Il <span class="cyan">48% dei videogiocatori</span> nel mondo è donna (51% uomini).
* **Europa (Video Games Europe):** **47,8%** di giocatrici (**55 milioni** di donne).
* **Italia (IIDEA 2025):** **5,7 milioni** di videogiocatrici attive.
* **Trend di crescita Italia:** Donne <span class="cyan">+14% anno su anno</span> (vs +2,5% maschile).
* **Il paradosso:** Parità demografica reale, ma stereotipo di "settore maschile" ancora dominante.

</div>
<div>

<div class="stat-card">
  <div class="stat-number">48%</div>
  <div class="stat-label">Gamer donne a livello globale (ESA 2025)</div>
</div>

<div class="stat-card-rose">
  <div class="stat-number-rose">+14%</div>
  <div class="stat-label">Crescita annua giocatrici in Italia (IIDEA 2025)</div>
</div>

</div>
</div>

---

<!-- SLIDE 4: TOSSICITÀ & STRATEGIE DIFENSIVE -->
<span class="speaker-badge">Relatore 2</span>

## Tossicità Online: Quando la Voce Rivela il Genere
### Molestie vocali e strategie di autodifesa in-game

<div class="grid-2">
<div>

* **Molestie di genere (ADL Report):** Il <span class="highlight">48% delle giocatrici</span> subisce molestie specificamente legate al genere (primo gruppo per hate speech).
* **L'effetto della Voice Chat:** Aprire il microfono espone a sessismo immediato (molestie in 2 sessioni su 3 in titoli come *Valorant/CS2*).
* **Strategie difensive:** Mute forzato, nickname neutri/maschili, rinuncia al matchmaking pubblico.
* **Studio Frontiers in Psychology (2025):** Le donne tendono al ritiro/abbandono, gli uomini alla flame war.
* **Eredità Gamergate:** Misoginia online normalizzata nelle community.

</div>
<div>

<div class="stat-card-rose">
  <div class="stat-number-rose">48%</div>
  <div class="stat-label">Delle giocatrici subisce molestie di genere (ADL)</div>
</div>

<div class="stat-card">
  <div style="font-weight: bold; color: #e2e8f0; font-size: 16px; margin-bottom: 6px;">🛡️ Tattiche di Mitigazione</div>
  <div class="stat-label">🔇 Mute del microfono<br>🎭 Nickname neutri / maschili<br>🔒 Party e gruppi chiusi</div>
</div>

</div>
</div>

---

<!-- SLIDE 5: EVOLUZIONE DEI PERSONAGGI -->
<span class="speaker-badge">Relatore 2</span>

## Dal "Male Gaze" a Personaggi Complessi
### L'evoluzione: da oggetto della trama a soggetto narrativo

<div class="grid-equal">
<div>

<div class="timeline-box" style="border-left: 4px solid #ef4444;">
  <span style="color: #f87171; font-weight: bold;">Ieri — Stereotipo & Male Gaze</span><br>
  <small style="color: #cbd5e1;">• <b>Damsel in Distress:</b> Peach (personaggio passivo)<br>• <b>Ipersessualizzazione:</b> Lara Croft 1996 (corpo irrealistico)</small>
</div>

<div class="timeline-box" style="border-left: 4px solid #38bdf8;">
  <span style="color: #38bdf8; font-weight: bold;">Oggi — Realismo & Complessità</span><br>
  <small style="color: #cbd5e1;">• <b>Aloy (Horizon):</b> Competenza tecnica e autonomia<br>• <b>Ellie & Abby (TLOU2):</b> Realismo morale e fisico<br>• <b>Senua (Hellblade):</b> Salute mentale e psicosi</small>
</div>

</div>
<div>

<div class="timeline-box" style="border-left: 4px solid #a855f7;">
  <span style="color: #c084fc; font-weight: bold;">Identità Modulari & Non-Binarie</span><br>
  <small style="color: #cbd5e1;">• <b>Baldur's Gate 3 & Cyberpunk 2077:</b> Disaccoppiamento tra corpo, voce e pronomi<br>• <b>The Sims 4:</b> Personalizzazione fluida dell'identità</small>
</div>

<div class="stat-card" style="margin-top: 15px;">
  <div style="font-size: 17px; font-weight: bold; color: #38bdf8;">💡 Concetto Chiave</div>
  <div class="stat-label">La rappresentazione femminile passa da archetipo estetico a protagonista tridimensionale.</div>
</div>

</div>
</div>

---

<!-- SLIDE 6: DIETRO LO SCHERMO - L'INDUSTRIA -->
<span class="speaker-badge">Relatore 3</span>

## Dietro lo Schermo: Il Gender Gap nell'Industria
### Chi crea i videogiochi? Segregazione e Glass Ceiling

<div class="grid-2">
<div>

* **Forza lavoro (GDC Report 2024-2025):** Solo il <span class="highlight">23-25% degli sviluppatori</span> è donna.
* **Ruoli tecnici core (Commissione UE):** La quota scende a circa il **20%** nella programmazione pura.
* **Segregazione Orizzontale:** Donne concentrate in ruoli HR, QA o community; uomini dominanti in engineering.
* **Segregazione Verticale (Glass Ceiling):** Leadership e ruoli di Game Director a larghissima maggioranza maschile.

</div>
<div>

<div class="stat-card-rose">
  <div class="stat-number-rose">23-25%</div>
  <div class="stat-label">Donne nella forza lavoro globale dello sviluppo (GDC)</div>
</div>

<div class="stat-card">
  <div class="stat-number">~20%</div>
  <div class="stat-label">Donne impiegate nei ruoli core di programmazione (UE)</div>
</div>

</div>
</div>

---

<!-- SLIDE 7: GENDER PAY GAP ED ESPORTS -->
<span class="speaker-badge">Relatore 3</span>

## Retribuzioni ed eSports Professionistici
### Divario salariale e percorsi agonistici dedicati

<div class="grid-2">
<div>

* **Gender Pay Gap:** Negli studi di sviluppo le donne guadagnano in media il <span class="highlight">24% in meno</span>.
* **Divario a parità di anzianità (6+ anni):**
  * Uomini con stipendio >125.000$: **68%**
  * Donne e non-binary con stipendio >125.000$: **38%**
* **eSports:** 33% di pubblico femminile, ma assenza nei tornei open per ambiente ostile.
* **Iniziative inclusive:** *VCT Game Changers* (Riot Games / Valorant) ed *ESL Impact* (CS2).

</div>
<div>

<div class="stat-card-rose">
  <div class="stat-number-rose">24%</div>
  <div class="stat-label">Gender Pay Gap medio nell'industria dei videogiochi</div>
</div>

<div class="stat-card" style="border-left-color: #38bdf8;">
  <div style="font-weight: bold; color: #38bdf8; font-size: 16px; margin-bottom: 5px;">🏆 VCT Game Changers</div>
  <div class="stat-label">Circuiti agonistici protetti e programmi Academy per creare visibilità e carriere.</div>
</div>

</div>
</div>

---

<!-- SLIDE 8: CONCLUSIONI & SOLUZIONI -->
<span class="speaker-badge">Relatore 3</span>

## Dalla Diversità all'Inclusione
### Valorizzare l'unicità e progettare ambienti equi

<div class="grid-equal">
<div>

<div class="stat-card" style="border-left-color: #38bdf8;">
  <div style="font-weight: bold; color: #38bdf8; font-size: 18px; margin-bottom: 5px;">1. Game Design Inclusivo</div>
  <div class="stat-label">Narrazioni autentiche, opzioni modulari e superamento dei bias estetici.</div>
</div>

<div class="stat-card" style="border-left-color: #a855f7;">
  <div style="font-weight: bold; color: #c084fc; font-size: 18px; margin-bottom: 5px;">2. Moderazione Attiva</div>
  <div class="stat-label">Algoritmi anti-tossicità, voice moderation e sanzioni severe per hate speech.</div>
</div>

</div>
<div>

<div class="stat-card" style="border-left-color: #22c55e;">
  <div style="font-weight: bold; color: #4ade80; font-size: 18px; margin-bottom: 5px;">3. Opportunità nel Lavoro</div>
  <div class="stat-label">Mentorship, trasparenza salariale e promozione di donne nei ruoli tecnici e apicali.</div>
</div>

<div class="stat-card-rose">
  <div style="font-weight: bold; color: #f43f5e; font-size: 18px; margin-bottom: 5px;">🎯 Principio Guida</div>
  <div class="stat-label">L'inclusione non è un'aggiunta opzionale: è un <b>requisito di progettazione</b>.</div>
</div>

</div>
</div>

---

<!-- SLIDE 9: BIBLIOGRAFIA & FONTI -->
<span class="speaker-badge">Relatore 3</span>

## Fonti Accademiche e Report di Settore
### Riferimenti bibliografici (Stile APA)

<div style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">

* **Anti-Defamation League (ADL)** (2024). *Hate is No Game: Hate and Harassment in Online Games*.
* **Botto, M.** (2025). Gatekeeping and Reactionary Cultures in Video Games Ten Years after Gamergate. *AboutGender*.
* **Entertainment Software Association (ESA)** (2025). *Global Power of Play Report 2025*.
* **European Parliamentary Research Service (EPRS)** (2023). *Developing the Video Games and e-Sports Sector in the EU*.
* **Ecorys & KEA European Affairs** (2023). *Understanding the Value of a European Video Games Society*. European Commission.
* **IIDEA** (2025). *I videogiochi in Italia nel 2024*. Italian Interactive Digital Entertainment Association.
* **Video Games Europe / ISFE** (2024). *Key Facts Report 2023* (GameTrack / Ipsos).
* **Wells, G. et al.** (2025). Hate speech and hate-based harassment in online games. *Frontiers in Psychology*.
* **Women in Games / GDC** (2025). *State of the Game Industry Report 2025*.

</div>
