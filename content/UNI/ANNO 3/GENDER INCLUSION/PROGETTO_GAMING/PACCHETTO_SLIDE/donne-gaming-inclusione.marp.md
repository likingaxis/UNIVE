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
    padding: 52px 64px 44px;
    background: radial-gradient(circle at 85% 15%, rgba(167,139,250,.08), transparent 40%), var(--bg);
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
  h1 { font-size: 68px; line-height: .96; letter-spacing: -.045em; font-weight: 850; color: var(--text); }
  h2 { max-width: 950px; margin: 0 0 28px; font-size: 41px; line-height: 1.05; letter-spacing: -.025em; font-weight: 800; color: var(--text); }
  h3 { margin-bottom: 10px; font-size: 24px; color: var(--text); }
  strong { color: var(--text); }
  em { color: var(--cyan); font-style: normal; }
  a { color: inherit; text-decoration: none; }
  ul { margin: 8px 0 0; padding-left: 1.15em; }
  li { margin: 10px 0; color: var(--muted); }
  li::marker { color: var(--cyan); }

  .title-sub {
    font-size: 20px;
    line-height: 1.35;
    color: var(--muted);
    font-weight: 500;
    margin-top: 6px;
    margin-bottom: 0;
  }

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

  section.title-slide {
    padding: 46px 64px;
    position: relative;
    background:
      radial-gradient(circle at 75% 50%, rgba(55,214,232,0.14) 0%, rgba(167,139,250,0.10) 34%, transparent 65%),
      var(--bg);
  }
  
  .title-layout {
    display: grid;
    grid-template-columns: 1.22fr 0.78fr;
    gap: 36px;
    align-items: center;
    height: 100%;
  }
  .title-left { display: flex; flex-direction: column; justify-content: center; }
  .kicker-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 13px;
    background: rgba(55,214,232,0.08);
    border: 1px solid rgba(55,214,232,0.28);
    border-radius: 4px;
    color: var(--cyan);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    width: fit-content;
  }
  .tag-dot {
    width: 6px;
    height: 6px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--cyan);
  }
  .title-left h1 {
    font-size: 64px;
    line-height: 1.04;
    margin: 14px 0 16px;
    letter-spacing: -.03em;
    font-weight: 900;
    color: #FFFFFF;
  }
  .title-left h1 .highlight {
    background: linear-gradient(90deg, #37D6E8 0%, #A78BFA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .title-left .title-sub { font-size: 21px; line-height: 1.38; color: var(--text); font-weight: 550; max-width: 610px; }
  
  .team-pills {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 26px;
  }
  .team-pill {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 3px 0 3px 12px;
    background: transparent;
    border: none;
    border-left: 3.5px solid var(--cyan);
    font-size: 17.5px;
    color: var(--text);
    width: fit-content;
  }
  .team-pill.s2 { border-left-color: var(--violet); }
  .team-pill.s3 { border-left-color: var(--mint); }
  .pill-badge {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11.5px;
    font-weight: 800;
    color: var(--cyan);
    letter-spacing: .05em;
  }
  .pill-badge.s2 { color: var(--violet); }
  .pill-badge.s3 { color: var(--mint); }
  .pill-matr {
    color: var(--muted);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 14.5px;
    margin-left: 4px;
  }
  .session-meta {
    margin-top: 22px;
    color: var(--muted);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 13px;
    letter-spacing: .08em;
  }

  .title-right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .hud-controller {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 330px;
    height: auto;
    filter: drop-shadow(0 20px 32px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(55,214,232,0.22));
  }

  .pillars-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px;
    margin-top: 36px;
    margin-bottom: 30px;
  }
  .pillar-item {
    display: flex;
    gap: 20px;
    align-items: stretch;
  }
  .pillar-line {
    width: 3.5px;
    border-radius: 99px;
    background: var(--cyan);
    flex-shrink: 0;
  }
  .pillar-line.s2 { background: var(--violet); }
  .pillar-line.s3 { background: var(--mint); }
  
  .pillar-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .pillar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-right: 8px;
  }
  .pillar-icon-box {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10,24,42,0.7);
    border: 1.5px solid rgba(55,214,232,0.45);
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(55,214,232,0.25);
  }
  .pillar-item.s2 .pillar-icon-box {
    border-color: rgba(167,139,250,0.45);
    box-shadow: 0 0 20px rgba(167,139,250,0.25);
  }
  .pillar-item.s3 .pillar-icon-box {
    border-color: rgba(94,230,168,0.45);
    box-shadow: 0 0 20px rgba(94,230,168,0.25);
  }
  .pillar-icon-box img {
    width: 28px;
    height: 28px;
  }
  .pillar-num {
    font-size: 88px;
    font-weight: 900;
    line-height: 0.75;
    color: var(--cyan);
    opacity: 0.28;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.06em;
  }
  .pillar-item.s2 .pillar-num { color: var(--violet); }
  .pillar-item.s3 .pillar-num { color: var(--mint); }

  .pillar-content h3 {
    font-size: 23px;
    font-weight: 850;
    letter-spacing: .03em;
    text-transform: uppercase;
    color: var(--text);
    margin: 0 0 10px;
  }
  .pillar-points {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.35;
  }
  .pillar-points div {
    color: var(--muted);
  }

  .quote-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 38px;
  }
  .quote-bar-line {
    width: 4px;
    height: 32px;
    background: var(--cyan);
    border-radius: 99px;
    flex-shrink: 0;
  }
  .quote-bar-text {
    font-size: 20px;
    font-weight: 600;
    color: var(--text);
  }
  .quote-bar-text .accent {
    color: var(--cyan);
  }

  .demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
    margin-top: 32px;
    margin-bottom: 24px;
  }
  .demo-panel {
    display: flex;
    gap: 18px;
    align-items: stretch;
  }
  .demo-panel-line {
    width: 3.5px;
    border-radius: 99px;
    background: var(--cyan);
    flex-shrink: 0;
  }
  .demo-panel-line.s2 { background: var(--violet); }
  .demo-panel-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .panel-kicker {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .1em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .panel-kicker.s2 { color: var(--violet); }

  /* Composition split bar */
  .parity-bar-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 6px;
  }
  .parity-labels {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 14px;
    font-weight: 700;
  }
  .parity-labels .women { color: var(--cyan); font-size: 18px; font-weight: 850; }
  .parity-labels .men { color: var(--violet); font-size: 18px; font-weight: 850; }
  
  .parity-bar-track {
    width: 100%;
    height: 22px;
    background: rgba(169,184,204,0.1);
    border-radius: 6px;
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .parity-fill-women {
    flex: 1;
    background: var(--cyan);
    height: 100%;
  }
  .parity-center-line {
    width: 2.5px;
    background: #07111F;
    height: 100%;
    flex-shrink: 0;
  }
  .parity-fill-men {
    flex: 1;
    background: var(--violet);
    height: 100%;
  }
  .parity-caption {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .parity-caption .center-tag {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(244, 247, 251, 0.85);
    font-weight: 600;
  }

  .panel-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid rgba(169,184,204,0.15);
    font-size: 14.5px;
    color: var(--muted);
  }
  .panel-details strong { color: var(--text); }

  /* Growth comparison cards */
  .growth-compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 8px;
  }
  .growth-card {
    background: rgba(10, 24, 42, 0.55);
    border: 1px solid rgba(55, 214, 232, 0.25);
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .growth-card.men {
    border-color: rgba(167, 139, 250, 0.25);
  }
  .growth-pill {
    align-self: flex-start;
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 10px;
    font-weight: 750;
    letter-spacing: .06em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .growth-pill.cyan {
    color: var(--cyan);
    background: rgba(55, 214, 232, 0.12);
    border: 1px solid rgba(55, 214, 232, 0.3);
  }
  .growth-pill.violet {
    color: var(--violet);
    background: rgba(167, 139, 250, 0.12);
    border: 1px solid rgba(167, 139, 250, 0.3);
  }
  .growth-stat {
    font-size: 38px;
    font-weight: 850;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.03em;
    margin: 2px 0;
  }
  .growth-stat.cyan { color: var(--cyan); }
  .growth-stat.violet { color: var(--violet); }
  .growth-label {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11.5px;
    font-weight: 700;
    color: var(--text);
  }

  /* Utilities & Colors */
  .kicker.coral { color: var(--coral); }
  .kicker.violet { color: var(--violet); }
  .kicker.mint { color: var(--mint); }
  .stat-number.coral { color: var(--coral); }
  .stat-number.violet { color: var(--violet); }
  .stat-number.mint { color: var(--mint); }
  .demo-panel-line.coral { background: var(--coral); box-shadow: 0 0 10px rgba(255,107,107,.4); }
  .demo-panel-line.violet { background: var(--violet); box-shadow: 0 0 10px rgba(167,139,250,.4); }
  .demo-panel-line.mint { background: var(--mint); box-shadow: 0 0 10px rgba(94,230,168,.4); }
  .panel-kicker.coral { color: var(--coral); }

  /* Slide 4: Defense Pills */
  .defense-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 14px;
    margin-bottom: 20px;
  }
  .defense-pill {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 13px 18px;
    background: rgba(15, 33, 56, 0.75);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-left: 3.5px solid var(--coral);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }
  .defense-icon-box {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.35);
    border-radius: 10px;
    flex-shrink: 0;
  }
  .defense-icon-box img {
    width: 26px;
    height: 26px;
  }
  .defense-pill-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 2px;
  }
  .defense-pill-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.3;
  }

  /* Slide 5: Timeline v2 */
  .timeline-v2 {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 34px;
    margin-bottom: 28px;
  }
  .timeline-v2::before {
    content: "";
    position: absolute;
    left: 10%;
    right: 10%;
    top: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--coral) 0%, var(--violet) 33%, var(--cyan) 66%, var(--mint) 100%);
    border-radius: 99px;
    box-shadow: 0 0 12px rgba(55, 214, 232, 0.35);
    z-index: 0;
  }
  .timeline-node {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .timeline-avatar-wrap {
    width: 82px;
    height: 82px;
    margin-bottom: 12px;
    background: var(--bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .timeline-avatar-wrap img {
    width: 80px;
    height: 80px;
    display: block;
  }
  .timeline-tag {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: .08em;
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  .timeline-tag.coral { color: var(--coral); background: rgba(255,107,107,0.12); border: 1px solid rgba(255,107,107,0.3); }
  .timeline-tag.violet { color: var(--violet); background: rgba(167,139,250,0.12); border: 1px solid rgba(167,139,250,0.3); }
  .timeline-tag.cyan { color: var(--cyan); background: rgba(55,214,232,0.12); border: 1px solid rgba(55,214,232,0.3); }
  .timeline-tag.mint { color: var(--mint); background: rgba(94,230,168,0.12); border: 1px solid rgba(94,230,168,0.3); }
  .timeline-node h3 {
    font-size: 18.5px;
    font-weight: 800;
    margin: 0 0 4px;
    color: var(--text);
  }
  .timeline-sub-tag {
    font-size: 13.5px;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--text);
  }
  .timeline-desc {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.32;
  }

  /* Slide 6: Workforce Cards (Option 1) */
  .workforce-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 10px;
    margin-bottom: 6px;
  }
  .workforce-card {
    background: var(--surface);
    padding: 14px 12px 12px;
    border-radius: 8px;
    border: 1px solid var(--line);
    border-left: 3.5px solid var(--cyan);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .workforce-card.s2 {
    border-left-color: var(--violet);
  }
  .workforce-card.s3 {
    border-left-color: var(--coral);
  }
  .workforce-kicker {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .08em;
    color: var(--cyan);
    text-transform: uppercase;
  }
  .workforce-card.s2 .workforce-kicker { color: var(--violet); }
  .workforce-card.s3 .workforce-kicker { color: var(--coral); }
  .workforce-stat {
    font-size: 34px;
    font-weight: 900;
    line-height: 1.05;
    margin: 6px 0 4px;
    color: var(--cyan);
  }
  .workforce-card.s2 .workforce-stat { color: var(--violet); }
  .workforce-card.s3 .workforce-stat { color: var(--coral); }
  .workforce-label {
    font-size: 13px;
    font-weight: 750;
    color: var(--text);
    line-height: 1.2;
  }
  .workforce-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
    line-height: 1.25;
  }

  /* Slide 6: Segregation Cards */
  .segregation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin-top: 18px;
  }
  .segregation-card {
    display: flex;
    gap: 16px;
    padding: 15px 18px;
    background: rgba(15, 33, 56, 0.72);
    border: 1px solid rgba(167, 139, 250, 0.28);
    border-left: 3.5px solid var(--violet);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }
  .segregation-card.vertical {
    border-color: rgba(255, 107, 107, 0.28);
    border-left-color: var(--coral);
  }
  .segregation-icon {
    font-size: 24px;
    line-height: 1;
    color: var(--violet);
    flex-shrink: 0;
  }
  .segregation-card.vertical .segregation-icon {
    color: var(--coral);
  }
  .segregation-title {
    font-size: 16.5px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 3px;
    letter-spacing: .02em;
  }
  .segregation-desc {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.35;
  }

  /* Slide 7: VS comparison */
  .vs-container {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 4px 0 6px;
  }
  .vs-stat-col {
    display: flex;
    flex-direction: column;
  }
  .vs-stat-tag {
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 10.5px;
    font-weight: 750;
    color: var(--muted);
    letter-spacing: .08em;
  }
  .vs-stat-val {
    font-size: 54px;
    font-weight: 850;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .vs-stat-val.coral { color: var(--coral); }
  .vs-stat-val.text-val { color: var(--text); }
  .vs-stat-divider {
    display: flex;
    align-items: center;
    padding-top: 14px;
  }
  .vs-description {
    font-size: 14.5px;
    font-weight: 700;
    margin-top: 8px;
    color: var(--text);
    line-height: 1.35;
  }

  /* Slide 7: Pay gap & Esports */
  .esports-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin-top: 10px;
  }
  .esports-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 13px 18px;
    background: rgba(15, 33, 56, 0.72);
    border: 1px solid rgba(94, 230, 168, 0.28);
    border-left: 3.5px solid var(--mint);
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
  .esports-icon-box {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(94, 230, 168, 0.1);
    border: 1px solid rgba(94, 230, 168, 0.35);
    border-radius: 8px;
    color: var(--mint);
    font-size: 15px;
    font-weight: 900;
    flex-shrink: 0;
  }
  .esports-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 2px;
  }
  .esports-desc {
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.3;
  }

  /* Slide 8: Solutions */
  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-top: 32px;
    margin-bottom: 24px;
  }
  .solution-item {
    display: flex;
    gap: 18px;
    align-items: stretch;
  }
  .solution-line {
    width: 3.5px;
    border-radius: 99px;
    background: var(--cyan);
    flex-shrink: 0;
  }
  .solution-line.s2 { background: var(--violet); }
  .solution-line.s3 { background: var(--mint); }
  .solution-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .solution-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .solution-num {
    font-size: 80px;
    font-weight: 900;
    line-height: 0.75;
    color: var(--cyan);
    opacity: 0.28;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.06em;
  }
  .solution-item.s2 .solution-num { color: var(--violet); }
  .solution-item.s3 .solution-num { color: var(--mint); }
  .solution-title {
    font-size: 20px;
    font-weight: 850;
    letter-spacing: .02em;
    text-transform: uppercase;
    color: var(--text);
    margin: 0 0 10px;
  }
  .solution-points {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14.5px;
    color: var(--muted);
    line-height: 1.35;
  }
  .solution-desc {
    font-size: 16.5px;
    color: var(--muted);
    line-height: 1.45;
  }

  /* Slide 9: Conclusion */
  .conclusion-layout {
    display: grid;
    grid-template-columns: 1.28fr 0.72fr;
    gap: 36px;
    align-items: center;
    margin-top: 26px;
    margin-bottom: 16px;
  }
  .sources-panel {
    background: rgba(10, 24, 42, 0.65);
    padding: 22px 24px;
    border-radius: 14px;
    border: 1px solid rgba(55, 214, 232, 0.25);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
  }
  .sources-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 12.5px;
    font-weight: 800;
    color: var(--cyan);
    letter-spacing: .12em;
    text-transform: uppercase;
    margin-bottom: 14px;
    border-bottom: 1px solid rgba(55, 214, 232, 0.2);
    padding-bottom: 8px;
  }
  .sources-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .sources-list li {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.25;
  }
  .sources-list strong {
    color: var(--cyan);
    font-family: "Aptos Mono", "IBM Plex Mono", Consolas, monospace;
    font-size: 12.5px;
    margin-right: 6px;
  }

  section.closing { background: radial-gradient(circle at 50% 48%, rgba(167,139,250,.18), transparent 38%), var(--bg); }
---

<!-- _class: title-slide -->
<!-- _paginate: false -->
<!-- _footer: "" -->

<div class="title-layout">
<div class="title-left">
  <div class="kicker-tag">
    <span class="tag-dot"></span>
    UNIVERSITÀ DI ROMA TOR VERGATA · INFORMATICA
  </div>
  <h1>Donne, gaming<br><span class="highlight">e inclusione</span></h1>
  <div class="title-sub">
    Donne e cultura videoludica: radici storiche, dati di settore e considerazioni sui futuri sviluppi tra codice e società
  </div>
  
  <div class="team-pills">
    <div class="team-pill"><span class="pill-badge">01</span> <strong>Luca Gugliotta</strong> <span class="pill-matr">0342634</span></div>
    <div class="team-pill s2"><span class="pill-badge s2">02</span> <strong>Valerio Bernardi</strong> <span class="pill-matr">0349538</span></div>
    <div class="team-pill s3"><span class="pill-badge s3">03</span> <strong>Samuele De Santis</strong> <span class="pill-matr">0348324</span></div>
  </div>
  
  <div class="session-meta">GENDER & INCLUSION · A.A. 2025–2026 · 4/09/2026</div>
</div>

<div class="title-right">
  <img src="./hud-controller.svg" class="hud-controller" alt="Gaming Setup Icon" />
</div>
</div>

---

<div class="speaker-badge">01 · LUCA GUGLIOTTA</div>
<div class="kicker">01 / LA PROSPETTIVA INFORMATICA</div>

## Perché parlarne da informatici?

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px; max-width: 1080px;">
  I videogiochi sono spazi sociali: le scelte di codice e design determinano chi può partecipare in sicurezza.
</div>

<div class="pillars-layout">
  <div class="pillar-item s1">
    <div class="pillar-line"></div>
    <div class="pillar-content">
      <div class="pillar-header">
        <div class="pillar-icon-box"><img src="./icon-chat.svg" alt="Chat" /></div>
        <div class="pillar-num">01</div>
      </div>
      <h3>CHI GIOCA</h3>
      <div class="pillar-points">
        <div>Voice chat & matchmaking</div>
        <div>Tossicità, sicurezza e moderazione</div>
      </div>
    </div>
  </div>

  <div class="pillar-item s2">
    <div class="pillar-line s2"></div>
    <div class="pillar-content">
      <div class="pillar-header">
        <div class="pillar-icon-box"><img src="./icon-avatar.svg" alt="Avatar" /></div>
        <div class="pillar-num">02</div>
      </div>
      <h3>COSA VEDIAMO</h3>
      <div class="pillar-points">
        <div>Narrazione e stereotipi</div>
        <div>Evoluzione del character design</div>
      </div>
    </div>
  </div>

  <div class="pillar-item s3">
    <div class="pillar-line s3"></div>
    <div class="pillar-content">
      <div class="pillar-header">
        <div class="pillar-icon-box"><img src="./icon-code.svg" alt="Code" /></div>
        <div class="pillar-num">03</div>
      </div>
      <h3>CHI SVILUPPA</h3>
      <div class="pillar-points">
        <div>Donne nella carriera del gaming</div>
        <div>Ruoli tecnici, leadership e divario</div>
      </div>
    </div>
  </div>
</div>

<div class="quote-bar">
  <div class="quote-bar-line"></div>
  <div class="quote-bar-text">
    Il modo in cui programmiamo uno spazio digitale determina <span class="accent">chi potrà viverlo</span>.
  </div>
</div>

---

<div class="speaker-badge">01 · LUCA GUGLIOTTA</div>
<div class="kicker">02 / DEMOGRAFIA E MERCATO</div>

## La realtà è quasi paritaria. <span style="color:var(--cyan);">La percezione no.</span>

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
Il paradosso percettivo: la partecipazione reale sfiora la parità, ma lo stereotipo del gamer resta maschile.
</div>

<div class="demo-grid">
<div class="demo-panel">
<div class="demo-panel-line"></div>
<div class="demo-panel-content">
<div class="panel-kicker">PUBBLICO GLOBALE · ESA 2025</div>
<div class="parity-bar-wrap">
<div class="parity-labels">
<span class="women">48% DONNE</span>
<span class="men">52% UOMINI</span>
</div>
<div class="parity-bar-track">
<div class="parity-fill-women"></div>
<div class="parity-center-line"></div>
<div class="parity-fill-men"></div>
</div>
<div class="parity-caption">
<span>Quasi 1 gamer su 2</span>
<span class="center-tag">Soglia parità (50%)</span>
<span>ESA 2025</span>
</div>
</div>
<div class="panel-details">
<div><strong>Europa:</strong> 47,8% donne · 55 milioni di giocatrici (VGE)</div>
<div><strong>Italia:</strong> 41,0% donne · 5,7 milioni su 14M gamer (IIDEA)</div>
</div>
</div>
</div>

<div class="demo-panel">
<div class="demo-panel-line s2"></div>
<div class="demo-panel-content">
<div class="panel-kicker s2">CRESCITA ANNUALE · ITALIA (IIDEA)</div>
<div class="growth-compare-grid">
  <div class="growth-card women">
    <div class="growth-pill cyan">Traino del mercato</div>
    <div class="growth-stat cyan">+14,0%</div>
    <div class="growth-label">GIOCATRICI DONNE</div>
  </div>
  <div class="growth-card men">
    <div class="growth-pill violet">Crescita stabile</div>
    <div class="growth-stat violet">+2,5%</div>
    <div class="growth-label">GIOCATORI UOMINI</div>
  </div>
</div>
<div class="panel-details">
<div><strong>Dinamica di settore:</strong> l'espansione dei videogiocatori in Italia è trainata in modo predominante dall'ingresso del pubblico femminile.</div>
</div>
</div>
</div>
</div>

<div class="quote-bar">
<div class="quote-bar-line"></div>
<div class="quote-bar-text">
Il problema non è l'assenza delle donne nel gaming, ma la loro <span class="accent">invisibilità culturale</span>.
</div>
</div>

---

<div class="speaker-badge s2">02 · VALERIO BERNARDI</div>
<div class="kicker coral">03 / ESPERIENZA ONLINE</div>

## Quando basta una voce per diventare un <span style="color:var(--coral);">bersaglio</span>

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
L'attivazione del microfono, il più delle volte, rivela l'identità femminile esponendo l'individuo a un'immediata ostilità nei suoi confronti.
</div>

<div class="demo-grid" style="margin-top: 24px; margin-bottom: 20px; gap: 36px;">
  <div class="demo-panel">
    <div class="demo-panel-line coral"></div>
    <div class="demo-panel-content">
      <div class="panel-kicker coral">ADL · HATE IS NO GAME REPORT 2024</div>
      <div class="stat-number coral" style="font-size: 60px; line-height: 1; margin: 4px 0 6px;">76%</div>
      <div class="stat-label">ha subito <strong>molestie nelle partite online</strong></div>
      <div style="font-size: 14px; color: var(--muted); margin-top: 8px;">Insulti, minacce e comportamenti tossici durante il gioco competitivo</div>
    </div>
  </div>

  <div class="demo-panel">
    <div class="demo-panel-line coral"></div>
    <div class="demo-panel-content">
      <div class="panel-kicker coral">PRIMO TARGET IDENTITY-BASED DAL 2019</div>
      <div class="stat-number coral" style="font-size: 60px; line-height: 1; margin: 4px 0 6px;">48%</div>
      <div class="stat-label">delle giocatrici: <strong>molestie mirate al genere</strong></div>
      <div style="font-size: 14px; color: var(--muted); margin-top: 8px;">Bersaglio più frequente rispetto a qualsiasi altra categoria d'identità</div>
    </div>
  </div>
</div>

<div class="panel-kicker" style="color: var(--muted); margin-bottom: 8px; font-size: 12px; letter-spacing: .12em;">COME SI DIFENDONO LE GIOCATRICI ONLINE</div>

<div class="defense-grid">
  <div class="defense-pill">
    <div class="defense-icon-box"><img src="./icon-mic-mute.svg" alt="Mute" /></div>
    <div>
      <div class="defense-pill-title">Microfono in mute</div>
      <div class="defense-pill-desc">Rinuncia forzata alla <strong>voice chat</strong> di squadra</div>
    </div>
  </div>

  <div class="defense-pill">
    <div class="defense-icon-box"><img src="./icon-nick-neutral.svg" alt="Nickname" /></div>
    <div>
      <div class="defense-pill-title">Nickname neutro</div>
      <div class="defense-pill-desc">Mascheramento dell'<strong>identità di genere</strong></div>
    </div>
  </div>

  <div class="defense-pill">
    <div class="defense-icon-box"><img src="./icon-party-lock.svg" alt="Party" /></div>
    <div>
      <div class="defense-pill-title">Solo party chiusi</div>
      <div class="defense-pill-desc">Ritiro dal <strong>matchmaking pubblico</strong></div>
    </div>
  </div>
</div>

<div class="source" style="margin-top: 18px; font-size: 11.5px;">
  FONTI: WELLS ET AL., 2025 (RITIRO DALLA CHAT O ABBANDONO) · GAMERGATE 2014–15 (UN PRECEDENTE ANCORA ATTUALE)
</div>

---

<div class="speaker-badge s2">02 · VALERIO BERNARDI</div>
<div class="kicker">04 / CHARACTER DESIGN & RAPPRESENTAZIONE</div>

## Da contorno a <span style="color:var(--violet);">Soggetto</span>: L'Evoluzione femminile nei videogiochi

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
Dall'oggettificazione passiva degli esordi alla complessità psicologica e all'identità modulare contemporanea.
</div>

<div class="timeline-v2">
  <div class="timeline-node">
    <div class="timeline-avatar-wrap">
      <img src="./avatar-peach.svg" alt="Peach" />
    </div>
    <div class="timeline-tag coral">ARCHETIPO · ANNI '80</div>
    <h3>Princess Peach</h3>
    <div class="timeline-sub-tag coral">Donna in pericolo</div>
    <div class="timeline-desc">Personaggio passivo privo di agentività: <strong>esiste per essere salvata</strong>.</div>
  </div>

  <div class="timeline-node">
    <div class="timeline-avatar-wrap">
      <img src="./avatar-lara.svg" alt="Lara" />
    </div>
    <div class="timeline-tag violet">1996 · TOMB RAIDER</div>
    <h3>Lara Croft</h3>
    <div class="timeline-sub-tag violet">Male gaze & azione</div>
    <div class="timeline-desc">Costruita per il <strong>male gaze</strong>, ma <strong>autonoma e coraggiosa</strong>.</div>
  </div>

  <div class="timeline-node">
    <div class="timeline-avatar-wrap">
      <img src="./avatar-aloy.svg" alt="Aloy" />
    </div>
    <div class="timeline-tag cyan">2017–2020 · REALISMO</div>
    <h3>Aloy · Senua · Ellie</h3>
    <div class="timeline-sub-tag accent">Complessità & vissuto</div>
    <div class="timeline-desc"><strong>Competenza, salute mentale</strong> e <strong>corpi non standardizzati</strong>.</div>
  </div>

  <div class="timeline-node">
    <div class="timeline-avatar-wrap">
      <img src="./avatar-bg3.svg" alt="BG3" />
    </div>
    <div class="timeline-tag mint">OGGI · LIBERTÀ</div>
    <h3>Identità modulare</h3>
    <div class="timeline-sub-tag mint">Disaccoppiamento</div>
    <div class="timeline-desc">Corpo, voce e pronomi si <strong>separano liberamente</strong> (BG3, The Sims 4).</div>
  </div>
</div>

<div class="quote-bar" style="margin-top: 22px;">
  <div class="quote-bar-line" style="background: var(--violet);"></div>
  <div class="quote-bar-text">
    La figura femminile passa da oggetto della narrazione a <span class="violet">soggetto della narrazione</span>.
  </div>
</div>

---

<div class="speaker-badge s3">03 · SAMUELE DE SANTIS</div>
<div class="kicker mint">05 / DIETRO LO SCHERMO: IL LAVORO</div>

## Quasi metà gioca. Solo un <span style="color:var(--cyan);">quarto</span> sviluppa.

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
La parità nel consumo non si riflette nella composizione dei team di produzione e ingegneria software.
</div>

<div class="demo-grid" style="margin-top: 22px; margin-bottom: 18px; gap: 36px;">
  <div class="demo-panel">
    <div class="demo-panel-line"></div>
    <div class="demo-panel-content" style="justify-content: center; text-align: center;">
      <div class="panel-kicker">GDC · STATE OF THE GAME INDUSTRY 2024–2025</div>
      <div class="stat-number" style="font-size: 62px; margin: 8px 0; color: var(--cyan); line-height: 1;">23–25%</div>
      <div class="stat-label" style="font-size: 19px;">donne nella <strong>forza lavoro videoludica</strong></div>
      <div style="font-size: 13.5px; color: var(--muted); margin-top: 8px;">
        Quota che si riduce a <strong>≈20%</strong> nei ruoli tecnici core e programming (UE)
      </div>
    </div>
  </div>
  <div class="demo-panel">
    <div class="demo-panel-line s2"></div>
    <div class="demo-panel-content" style="justify-content: center;">
      <div class="panel-kicker s2">DALLA FRUIZIONE AL CODICE</div>
      <div class="workforce-grid">
        <div class="workforce-card">
          <div class="workforce-kicker">01 · CHI GIOCA</div>
          <div class="workforce-stat">48%</div>
          <div class="workforce-label">Pubblico Gaming</div>
          <div class="workforce-sub">Parità tra chi gioca</div>
        </div>
        <div class="workforce-card s2">
          <div class="workforce-kicker">02 · CHI LAVORA</div>
          <div class="workforce-stat">25%</div>
          <div class="workforce-label">Forza Lavoro</div>
          <div class="workforce-sub">Negli studi di sviluppo</div>
        </div>
        <div class="workforce-card s3">
          <div class="workforce-kicker">03 · CHI PROGRAMMA</div>
          <div class="workforce-stat">≈20%</div>
          <div class="workforce-label">Ruoli Tecnici Core</div>
          <div class="workforce-sub">Ingegneria e codice</div>
        </div>
      </div>
      <div style="font-size: 13px; color: var(--muted); margin-top: 8px; text-align: center;">
        Il divario aumenta avvicinandosi alla scrittura del codice e ai ruoli apicali.
      </div>
    </div>
  </div>
</div>

<div class="segregation-grid">
  <div class="segregation-card">
    <div class="segregation-icon">↔</div>
    <div>
      <div class="segregation-title">Segregazione orizzontale</div>
      <div class="segregation-desc">uomini e donne concentrati in ruoli diversi</div>
    </div>
  </div>

  <div class="segregation-card vertical">
    <div class="segregation-icon">↥</div>
    <div>
      <div class="segregation-title">Segregazione verticale</div>
      <div class="segregation-desc">meno presenza femminile salendo nella gerarchia</div>
    </div>
  </div>
</div>

---

<div class="speaker-badge s3">03 · SAMUELE DE SANTIS</div>
<div class="kicker mint">06 / POTERE ECONOMICO E COMPETITIVO</div>

## Il <span style="color:var(--coral);">gap</span> cresce salendo di livello

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
Dalle asimmetrie retributive alle barriere d'accesso nei circuiti professionistici eSports.
</div>

<div class="grid-3" style="gap: 20px; margin-top: 18px; margin-bottom: 16px;">
  <div class="demo-panel" style="padding: 16px 18px; background: rgba(15,33,56,.72); border: 1px solid rgba(255,107,107,.25); border-radius: 12px;">
    <div class="demo-panel-line coral"></div>
    <div class="demo-panel-content">
      <div class="panel-kicker coral" style="margin-bottom: 6px;">DIVARIO RETRIBUTIVO</div>
      <div class="stat-number coral" style="font-size: 56px; line-height: 1; margin: 4px 0 6px;">−24%</div>
      <div style="font-size: 14.5px; font-weight: 700; margin-top: 8px; color: var(--text); line-height: 1.35;">gender pay gap medio negli studi USA</div>
    </div>
  </div>

  <div class="demo-panel" style="padding: 16px 18px; background: rgba(15,33,56,.72); border: 1px solid rgba(255,107,107,.25); border-radius: 12px;">
    <div class="demo-panel-line coral"></div>
    <div class="demo-panel-content">
      <div class="panel-kicker coral" style="margin-bottom: 6px;">SENIORITY & COMPENSI</div>
      <div class="vs-container">
        <div class="vs-stat-col">
          <span class="vs-stat-tag">UOMINI</span>
          <span class="vs-stat-val coral">68%</span>
        </div>
        <div class="vs-stat-divider">
          <span style="font-size:16px; color:var(--muted); font-weight:600;">vs</span>
        </div>
        <div class="vs-stat-col">
          <span class="vs-stat-tag">DONNE</span>
          <span class="vs-stat-val text-val">38%</span>
        </div>
      </div>
      <div class="vs-description">
        Oltre 125k$ tra game designer con 6+ anni di esperienza
      </div>
    </div>
  </div>

  <div class="demo-panel" style="padding: 16px 18px; background: rgba(15,33,56,.72); border: 1px solid rgba(55,214,232,.25); border-radius: 12px;">
    <div class="demo-panel-line"></div>
    <div class="demo-panel-content">
      <div class="panel-kicker" style="margin-bottom: 6px;">PUBBLICO ESPORTS GLOBALE</div>
      <div class="stat-number" style="font-size: 56px; line-height: 1; margin: 4px 0 6px;">33%</div>
      <div style="font-size: 14.5px; font-weight: 700; margin-top: 8px; color: var(--text); line-height: 1.35;">Spettatrici femminili (Deloitte)</div>
      <div style="font-size: 13px; color: var(--muted); margin-top: 4px;">Presenza attiva limitata dall'ambiente ostile</div>
    </div>
  </div>
</div>

<div class="panel-kicker" style="color: var(--muted); margin-top: 8px; margin-bottom: 8px; font-size: 12px; letter-spacing: .12em;">SPAZI COMPETITIVI INCLUSIVI</div>

<div class="esports-grid">
  <div class="esports-card">
    <div class="esports-icon-box">◆</div>
    <div>
      <div class="esports-title">VCT Game Changers</div>
      <div class="esports-desc"><strong>Valorant · Riot Games:</strong> circuito professionistico ufficiale e Academy per creare visibilità e carriere esports sostenibili.</div>
    </div>
  </div>

  <div class="esports-card">
    <div class="esports-icon-box">◆</div>
    <div>
      <div class="esports-title">ESL Impact</div>
      <div class="esports-desc"><strong>Counter-Strike · ESL:</strong> ecosistema competitivo dedicato per abbattere le barriere d'ingresso nel panorama storico di CS2.</div>
    </div>
  </div>
</div>

---

<div class="speaker-badge s3">03 · SAMUELE DE SANTIS</div>
<div class="kicker mint">07 / DALLA DIVERSITÀ ALL'INCLUSIONE</div>

## Non basta essere presenti: <span style="color:var(--mint);">bisogna poter partecipare</span>

<div class="title-sub" style="font-size: 20px; color: var(--muted); margin-top: 6px;">
Dalla semplice rappresentazione numerica alla progettazione attiva di spazi e ambienti equi.
</div>

<div class="solutions-grid">
  <div class="solution-item">
    <div class="solution-line"></div>
    <div class="solution-content">
      <div class="solution-header">
        <div class="solution-num">01</div>
      </div>
      <div class="solution-title">Design inclusivo</div>
      <div class="solution-desc">Personaggi e sistemi di personalizzazione meno stereotipati.</div>
    </div>
  </div>

  <div class="solution-item s2">
    <div class="solution-line s2"></div>
    <div class="solution-content">
      <div class="solution-header">
        <div class="solution-num">02</div>
      </div>
      <div class="solution-title">Community sicure</div>
      <div class="solution-desc">Moderazione efficace, reporting chiaro e contrasto all’hate speech.</div>
    </div>
  </div>

  <div class="solution-item s3">
    <div class="solution-line s3"></div>
    <div class="solution-content">
      <div class="solution-header">
        <div class="solution-num">03</div>
      </div>
      <div class="solution-title">Opportunità eque</div>
      <div class="solution-desc">Accesso ai ruoli tecnici, alla leadership e ai percorsi competitivi.</div>
    </div>
  </div>
</div>

<div class="quote-bar" style="margin-top: 22px;">
  <div class="quote-bar-line" style="background: var(--mint);"></div>
  <div class="quote-bar-text">
    L'inclusione non è un'aggiunta al prodotto: è un <span class="mint">requisito fondamentale di progettazione</span>.
  </div>
</div>

---

<!-- _class: closing -->
<div class="speaker-badge s3">03 · SAMUELE DE SANTIS</div>
<div class="kicker mint">08 / SINTESI E CONCLUSIONI</div>

## La presenza <span style="color:var(--coral);">non è ancora</span> piena inclusione

<div class="title-sub" style="font-size: 19px; color: var(--muted); margin-top: 6px; margin-bottom: 8px;">
Dalla constatazione dei divari alla costruzione consapevole di ambienti di gioco e lavoro paritari.
</div>

<div class="conclusion-layout" style="margin-top: 14px;">
<div class="conclusion-left">
  <div class="big-claim" style="font-size: 48px; line-height: 1.08; margin-bottom: 20px; font-weight: 850;">
    Le donne nel gaming <span class="accent">ci sono già.</span>
  </div>
  <div style="font-size: 20px; color: var(--muted); line-height: 1.45; margin-bottom: 26px;">
    La sfida è capire come questo mondo possa cambiare, affinché tutte e tutti possano viverlo, lavorarci e competere alle stesse condizioni.
  </div>
  <div class="quote-bar" style="margin-top: 0; margin-bottom: 22px;">
    <div class="quote-bar-line" style="background: var(--violet);"></div>
    <div class="quote-bar-text" style="font-size: 19px;">
      L’inclusione parte dalla valorizzazione dell’unicità della persona.
    </div>
  </div>
  <div class="kicker-tag" style="font-size: 11px;">
    <span class="tag-dot" style="background: var(--violet); box-shadow: 0 0 8px var(--violet);"></span>
    GENDER & INCLUSION · TOR VERGATA · 2025–2026
  </div>
</div>

<div class="conclusion-right">
  <div class="sources-panel">
    <div class="sources-header"><span style="color: var(--cyan); font-size: 14px;">⚡</span> FONTI PRINCIPALI</div>
    <ul class="sources-list">
      <li><strong>ESA (2025)</strong> Global Power of Play Report</li>
      <li><strong>ADL (2024)</strong> Hate is No Game Report</li>
      <li><strong>IIDEA (2025)</strong> I videogiochi in Italia nel 2024</li>
      <li><strong>GDC (2025)</strong> State of the Game Industry</li>
      <li><strong>VGE (2024)</strong> Key Facts Report (GameTrack)</li>
      <li><strong>Wells et al. (2025)</strong> Frontiers in Psychology</li>
      <li><strong>Botto (2025)</strong> AboutGender Journal</li>
    </ul>
  </div>
</div>
</div>

<div class="source" style="margin-top: 14px; font-size: 11.5px; letter-spacing: .06em;">
  DOSSIER ACCADEMICO COMPLETO CON BIBLIOGRAFIA IN FORMATO APA DISPONIBILE NEGLI ATTI DEL CORSO
</div>

