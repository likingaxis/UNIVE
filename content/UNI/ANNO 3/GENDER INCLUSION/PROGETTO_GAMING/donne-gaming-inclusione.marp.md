---
marp: true
theme: default
paginate: true
size: 16:9
html: true
footer: "Gender & Inclusion · Università di Roma Tor Vergata"
style: |
  :root {
    --bg: #07111F;
    --surface: #0F2138;
    --surface-2: #122A46;
    --text: #F4F7FB;
    --muted: #A9B8CC;
    --cyan: #37D6E8;
    --violet: #A78BFA;
    --coral: #FF6B6B;
    --mint: #5EE6A8;
    --line: rgba(169,184,204,.22);
  }

  section {
    box-sizing: border-box;
    padding: 54px 64px 48px;
    background:
      linear-gradient(rgba(55,214,232,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(55,214,232,.035) 1px, transparent 1px),
      radial-gradient(circle at 88% 10%, rgba(167,139,250,.14), transparent 32%),
      var(--bg);
    background-size: 40px 40px, 40px 40px, auto, auto;
    color: var(--text);
    font-family: "Aptos", "Inter", "Segoe UI", Arial, sans-serif;
    font-size: 21px;
    line-height: 1.3;
  }

  section::after {
    color: var(--muted);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 12px;
    right: 28px;
    bottom: 20px;
  }

  footer {
    left: 64px;
    bottom: 18px;
    color: rgba(169,184,204,.66);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 10px;
    letter-spacing: .08em;
  }

  h1, h2, h3, p { margin-top: 0; }
  h1 { font-size: 68px; line-height: .96; letter-spacing: -.045em; font-weight: 850; }
  h2 { max-width: 950px; margin: 0 0 28px; font-size: 41px; line-height: 1.05; letter-spacing: -.025em; font-weight: 800; }
  h3 { margin-bottom: 10px; font-size: 24px; color: var(--text); }
  strong { color: var(--text); }
  em { color: var(--cyan); font-style: normal; }
  a { color: inherit; text-decoration: none; }
  ul { margin: 8px 0 0; padding-left: 1.15em; }
  li { margin: 10px 0; color: var(--muted); }
  li::marker { color: var(--cyan); }

  .kicker {
    margin-bottom: 15px;
    color: var(--cyan);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .speaker-badge {
    position: absolute;
    top: 46px;
    right: 64px;
    padding: 7px 12px;
    border: 1px solid rgba(55,214,232,.55);
    border-radius: 999px;
    background: rgba(7,17,31,.72);
    color: var(--cyan);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
  }
  .speaker-badge.s2 { color: var(--violet); border-color: rgba(167,139,250,.6); }
  .speaker-badge.s3 { color: var(--mint); border-color: rgba(94,230,168,.6); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: stretch; }
  .grid-2.wide-left { grid-template-columns: 1.22fr .78fr; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

  .stat-card {
    position: relative;
    min-height: 190px;
    padding: 25px 27px 23px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: linear-gradient(145deg, rgba(18,42,70,.95), rgba(15,33,56,.78));
    box-shadow: 0 18px 44px rgba(0,0,0,.18);
    overflow: hidden;
  }
  .stat-card::before {
    content: "";
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 4px;
    background: var(--cyan);
  }
  .stat-card.alert::before { background: var(--coral); }
  .stat-card.inclusion::before { background: var(--violet); }
  .stat-card.positive::before { background: var(--mint); }
  .stat-number {
    display: block;
    margin-bottom: 5px;
    color: var(--cyan);
    font-size: 78px;
    font-weight: 850;
    line-height: .95;
    letter-spacing: -.05em;
    font-variant-numeric: tabular-nums;
  }
  .alert .stat-number { color: var(--coral); }
  .inclusion .stat-number { color: var(--violet); }
  .positive .stat-number { color: var(--mint); }
  .stat-label { color: var(--text); font-size: 20px; font-weight: 700; }
  .source { margin-top: 16px; color: var(--muted); font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace; font-size: 11px; letter-spacing: .03em; }

  .hero-number {
    color: var(--cyan);
    font-size: 116px;
    font-weight: 900;
    line-height: .82;
    letter-spacing: -.065em;
  }
  .hero-caption { margin-top: 22px; max-width: 680px; font-size: 29px; font-weight: 650; line-height: 1.12; }
  .big-claim { max-width: 1000px; font-size: 32px; line-height: 1.17; font-weight: 720; }
  .accent { color: var(--cyan); }
  .violet { color: var(--violet); }
  .coral { color: var(--coral); }
  .mint { color: var(--mint); }
  .muted { color: var(--muted); }

  .signal {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 15px 0;
    padding: 15px 18px;
    border-left: 3px solid var(--cyan);
    background: rgba(15,33,56,.62);
    color: var(--text);
    font-weight: 650;
  }
  .signal.alert { border-color: var(--coral); }
  .signal.inclusion { border-color: var(--violet); }
  .signal.positive { border-color: var(--mint); }
  .signal-icon { min-width: 34px; color: var(--cyan); font-family: "Segoe UI Symbol", sans-serif; font-size: 28px; text-align: center; }
  .alert .signal-icon { color: var(--coral); }
  .inclusion .signal-icon { color: var(--violet); }
  .positive .signal-icon { color: var(--mint); }

  .bar-row { margin: 18px 0 22px; }
  .bar-meta { display: flex; justify-content: space-between; margin-bottom: 7px; font-size: 15px; font-weight: 700; }
  .bar-track { height: 16px; border-radius: 99px; background: rgba(169,184,204,.13); overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 99px; background: var(--cyan); }
  .bar-fill.violet { background: var(--violet); }
  .bar-fill.coral { background: var(--coral); }
  .bar-fill.mint { background: var(--mint); }

  .timeline { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 40px; }
  .timeline::before { content: ""; position: absolute; left: 7%; right: 7%; top: 16px; height: 2px; background: linear-gradient(90deg, var(--coral), var(--violet), var(--cyan), var(--mint)); }
  .era { position: relative; padding-top: 44px; }
  .era::before { content: ""; position: absolute; top: 7px; left: 0; width: 18px; height: 18px; border: 3px solid var(--bg); border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 2px var(--cyan); }
  .era:nth-child(1)::before { background: var(--coral); box-shadow: 0 0 0 2px var(--coral); }
  .era:nth-child(2)::before { background: var(--violet); box-shadow: 0 0 0 2px var(--violet); }
  .era:nth-child(4)::before { background: var(--mint); box-shadow: 0 0 0 2px var(--mint); }
  .era-year { color: var(--muted); font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace; font-size: 12px; }
  .era h3 { margin: 5px 0 8px; font-size: 21px; }
  .era p { color: var(--muted); font-size: 16px; line-height: 1.28; }

  .pill-row { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 18px; }
  .pill { padding: 8px 12px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace; font-size: 12px; }

  .quote-line { margin-top: 30px; padding-left: 22px; border-left: 4px solid var(--violet); font-size: 28px; line-height: 1.2; font-weight: 700; }
  .sources { columns: 2; column-gap: 42px; margin-top: 20px; padding: 0; list-style: none; }
  .sources li { break-inside: avoid; margin: 0 0 13px; padding-bottom: 12px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 13px; line-height: 1.25; }
  .sources strong { display: block; margin-bottom: 3px; color: var(--text); font-size: 14px; }

  section.title-slide { padding-top: 78px; }
  section.title-slide h1 { max-width: 840px; margin-bottom: 26px; }
  .title-rule { width: 118px; height: 6px; margin: 28px 0; background: linear-gradient(90deg, var(--cyan), var(--violet)); border-radius: 99px; }
  .title-sub { max-width: 720px; color: var(--muted); font-size: 25px; line-height: 1.25; }
  .title-meta { position: absolute; left: 64px; bottom: 68px; color: var(--muted); font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace; font-size: 13px; letter-spacing: .08em; }
  .ghost-mark { position: absolute; right: 58px; bottom: 68px; color: rgba(55,214,232,.14); font-size: 160px; font-weight: 900; line-height: .8; }

  section.closing { background: radial-gradient(circle at 50% 48%, rgba(167,139,250,.18), transparent 38%), var(--bg); }
---

<!-- _class: title-slide -->
<!-- _paginate: false -->
<!-- _footer: "" -->

<div class="kicker">Gender & Inclusion · Esame universitario</div>

# Donne, gaming<br>e inclusione

<div class="title-rule"></div>

<div class="title-sub">Quasi parità nel pubblico. Ancora forti asimmetrie nella visibilità, nella competizione e nel lavoro.</div>

<div class="title-meta">3 STUDENTI · INFORMATICA · 9 SLIDE · ≤ 12 MIN</div>
<div class="ghost-mark">48%</div>

---

<div class="speaker-badge">01 · RELATORE 1</div>
<div class="kicker">01 / Il punto di vista informatico</div>

## Il software non è culturalmente neutrale

<div class="grid-2 wide-left">
<div>
  <div class="big-claim">Ogni ambiente digitale incorpora <span class="accent">scelte</span>: può ridurre le barriere oppure renderle invisibili.</div>
  <div class="pill-row">
    <span class="pill">VOICE CHAT</span>
    <span class="pill">MATCHMAKING</span>
    <span class="pill">MODERAZIONE</span>
    <span class="pill">AVATAR</span>
  </div>
</div>
<div>
  <div class="signal"><span class="signal-icon">⌘</span><span><strong>Design</strong><br><span class="muted">definisce le possibilità</span></span></div>
  <div class="signal inclusion"><span class="signal-icon">◎</span><span><strong>Esperienza</strong><br><span class="muted">orienta i comportamenti</span></span></div>
  <div class="signal positive"><span class="signal-icon">◇</span><span><strong>Inclusione</strong><br><span class="muted">diventa requisito</span></span></div>
</div>
</div>

---

<div class="speaker-badge">01 · RELATORE 1</div>
<div class="kicker">02 / Demografia</div>

## La realtà è quasi paritaria. La percezione no.

<div class="grid-2 wide-left">
<div>
  <div class="hero-number">48%</div>
  <div class="hero-caption">dei gamer globali sono donne</div>
  <div class="source">ESA · GLOBAL POWER OF PLAY REPORT 2025</div>
</div>
<div>
  <div class="bar-row">
    <div class="bar-meta"><span>Europa · giocatrici</span><span class="accent">47,8%</span></div>
    <div class="bar-track"><div class="bar-fill" style="width:47.8%"></div></div>
  </div>
  <div class="bar-row">
    <div class="bar-meta"><span>Italia · crescita donne</span><span class="mint">+14%</span></div>
    <div class="bar-track"><div class="bar-fill mint" style="width:70%"></div></div>
  </div>
  <div class="bar-row">
    <div class="bar-meta"><span>Italia · crescita uomini</span><span class="muted">+2,5%</span></div>
    <div class="bar-track"><div class="bar-fill violet" style="width:12.5%"></div></div>
  </div>
  <div class="source">55 M DONNE IN EUROPA · 5,7 M IN ITALIA · IIDEA 2025 / VGE 2024</div>
</div>
</div>

<div class="quote-line">Il gap percepito è molto più grande del gap reale.</div>

---

<div class="speaker-badge s2">02 · RELATORE 2</div>
<div class="kicker">03 / Esperienza online</div>

## Quando basta una voce per diventare un bersaglio

<div class="grid-2">
  <div class="stat-card alert">
    <span class="stat-number">76%</span>
    <div class="stat-label">ha subito molestie nei giochi online</div>
    <div class="source">ADL · HATE IS NO GAME 2024</div>
  </div>
  <div class="stat-card alert">
    <span class="stat-number">48%</span>
    <div class="stat-label">delle giocatrici: molestie legate al genere</div>
    <div class="source">GRUPPO PIÙ COLPITO DAL 2019</div>
  </div>
</div>

<div class="grid-3" style="margin-top:24px">
  <div class="signal alert"><span class="signal-icon">⌁</span><span>Microfono<br><strong>in mute</strong></span></div>
  <div class="signal alert"><span class="signal-icon">◌</span><span>Nickname<br><strong>neutro</strong></span></div>
  <div class="signal alert"><span class="signal-icon">⬡</span><span>Solo party<br><strong>chiusi</strong></span></div>
</div>

<div class="source">WELLS ET AL., 2025: RITIRO DALLA CHAT O DALLA SESSIONE · GAMERGATE 2014–15: UN PRECEDENTE ANCORA ATTUALE</div>

---

<div class="speaker-badge s2">02 · RELATORE 2</div>
<div class="kicker">04 / Character design</div>

## Il personaggio femminile conquista agentività

<div class="timeline">
  <div class="era">
    <div class="era-year">ARCHETIPO</div>
    <h3>Princess Peach</h3>
    <p>La “damsel in distress”: esiste per essere salvata.</p>
  </div>
  <div class="era">
    <div class="era-year">1996</div>
    <h3>Lara Croft</h3>
    <p>Autonoma e competente, ma costruita anche per il <em>male gaze</em>.</p>
  </div>
  <div class="era">
    <div class="era-year">2017–2020</div>
    <h3>Aloy · Senua · Ellie · Abby</h3>
    <p>Competenza, trauma, salute mentale e corpi non standardizzati.</p>
  </div>
  <div class="era">
    <div class="era-year">OGGI</div>
    <h3>Identità modulare</h3>
    <p>Corpo, voce e pronomi si separano in BG3, Cyberpunk e The Sims 4.</p>
  </div>
</div>

<div class="quote-line">Da oggetto della narrazione a <span class="violet">soggetto della narrazione</span>.</div>

---

<div class="speaker-badge s3">03 · RELATORE 3</div>
<div class="kicker">05 / Dietro lo schermo</div>

## Quasi metà gioca. Solo un quarto sviluppa.

<div class="grid-2 wide-left">
<div class="stat-card inclusion">
  <span class="stat-number">23–25%</span>
  <div class="stat-label">donne nella forza lavoro videoludica</div>
  <div class="source">GDC · STATE OF THE GAME INDUSTRY 2024–2025</div>
</div>
<div>
  <div class="bar-row">
    <div class="bar-meta"><span>Pubblico femminile</span><span class="accent">48%</span></div>
    <div class="bar-track"><div class="bar-fill" style="width:48%"></div></div>
  </div>
  <div class="bar-row">
    <div class="bar-meta"><span>Forza lavoro</span><span class="violet">25%</span></div>
    <div class="bar-track"><div class="bar-fill violet" style="width:25%"></div></div>
  </div>
  <div class="bar-row">
    <div class="bar-meta"><span>Ruoli tecnici core</span><span class="coral">≈20%</span></div>
    <div class="bar-track"><div class="bar-fill coral" style="width:20%"></div></div>
  </div>
</div>
</div>

<div class="grid-2" style="margin-top:22px">
  <div class="signal inclusion"><span class="signal-icon">↔</span><span><strong>Segregazione orizzontale</strong><br><span class="muted">meno presenza nei ruoli tecnici</span></span></div>
  <div class="signal inclusion"><span class="signal-icon">↥</span><span><strong>Segregazione verticale</strong><br><span class="muted">meno presenza nella leadership</span></span></div>
</div>

---

<div class="speaker-badge s3">03 · RELATORE 3</div>
<div class="kicker">06 / Potere economico e competitivo</div>

## Il gap cresce salendo di livello

<div class="grid-3">
  <div class="stat-card alert">
    <span class="stat-number">−24%</span>
    <div class="stat-label">retribuzione media delle donne negli studi USA</div>
    <div class="source">SURVEY INDUSTRIA USA · 2025</div>
  </div>
  <div class="stat-card alert">
    <span class="stat-number">68/38</span>
    <div class="stat-label">quota oltre 125k$: uomini / donne e persone non binarie</div>
    <div class="source">GAME DESIGNER · 6+ ANNI</div>
  </div>
  <div class="stat-card inclusion">
    <span class="stat-number">33%</span>
    <div class="stat-label">del pubblico eSports è femminile</div>
    <div class="source">DELOITTE · 2024</div>
  </div>
</div>

<div class="grid-2" style="margin-top:24px">
  <div class="signal positive"><span class="signal-icon">◇</span><span><strong>VCT Game Changers</strong><br><span class="muted">Valorant · Riot Games</span></span></div>
  <div class="signal positive"><span class="signal-icon">◇</span><span><strong>ESL Impact</strong><br><span class="muted">Counter-Strike</span></span></div>
</div>

---

<div class="speaker-badge s3">03 · RELATORE 3</div>
<div class="kicker">07 / Buone pratiche</div>

## Non basta essere presenti: bisogna poter partecipare

<div class="grid-3">
  <div>
    <div class="hero-number" style="font-size:64px">01</div>
    <h3>Design inclusivo</h3>
    <p class="muted">Avatar e narrazioni meno stereotipati; identità personalizzabile.</p>
  </div>
  <div>
    <div class="hero-number violet" style="font-size:64px">02</div>
    <h3>Community sicure</h3>
    <p class="muted">Moderazione efficace, reporting chiaro e contrasto all'hate speech.</p>
  </div>
  <div>
    <div class="hero-number mint" style="font-size:64px">03</div>
    <h3>Opportunità eque</h3>
    <p class="muted">Accesso ai ruoli tecnici, leadership e percorsi competitivi.</p>
  </div>
</div>

<div class="quote-line" style="margin-top:52px">L'inclusione non è un'aggiunta al prodotto: è un <span class="mint">requisito di progettazione</span>.</div>

---

<!-- _class: closing -->
<div class="speaker-badge s3">03 · RELATORE 3</div>
<div class="kicker">08 / Sintesi e fonti</div>

## La presenza non è ancora piena inclusione

<div class="grid-2 wide-left">
<div>
  <div class="big-claim">Le donne nel gaming <span class="accent">ci sono già</span>. La sfida è progettare ambienti in cui possano essere visibili, competere e lavorare alle stesse condizioni.</div>
  <div class="quote-line">Valorizzare l'<span class="violet">unicità</span>, non tollerare una presunta “diversità”.</div>
</div>
<div>
  <ul class="sources">
    <li><strong>ESA (2025)</strong>Global Power of Play</li>
    <li><strong>ADL (2024)</strong>Hate is No Game</li>
    <li><strong>IIDEA (2025)</strong>I videogiochi in Italia</li>
    <li><strong>GDC (2025)</strong>State of the Game Industry</li>
    <li><strong>Video Games Europe (2024)</strong>Key Facts Report</li>
    <li><strong>Wells et al. (2025)</strong>Frontiers in Psychology</li>
    <li><strong>Botto (2025)</strong>AboutGender</li>
  </ul>
</div>
</div>

<div class="source">BIBLIOGRAFIA APA COMPLETA NEL DOSSIER DI RICERCA · GRAZIE</div>
