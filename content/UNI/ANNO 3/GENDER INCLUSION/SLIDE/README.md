# Donne, gaming e inclusione

Gender & Inclusion · Informatica · Università di Roma Tor Vergata · A.A. 2025–2026.

Versione stabilizzata del progetto ricevuto, con 9 slide e gli asset originali. Non sono state generate nuove immagini.

## Aprire e presentare

- **PDF**: `donne-gaming-inclusione.pdf`, 9 pagine 16:9, con font incorporati.
- **HTML**: aprire `index.html` mantenendo accanto le cartelle `Assets` e `Fonts` e i due file CSS. Non richiede connessione a Internet. Frecce, Spazio o Page Up/Down cambiano slide; F attiva lo schermo intero, N mostra le note, P apre la stampa.
- **PowerPoint**: `donne-gaming-inclusione.pptx`, 9 slide con testi, alcuni elementi dei grafici e note del relatore modificabili. Prima dell'apertura installare i file `.ttf` della cartella `Fonts` per evitare sostituzioni. Le immagini e la grafica decorativa sono mantenute come fondali; la modifica completa rimane nel sorgente HTML.

L'onda audio della slide 4 è animata nell'HTML. PDF e PPTX contengono una rappresentazione statica.

## Modificare

`index.html` contiene testi, struttura, note e navigazione. `utilities.css` contiene le classi già compilate; non viene caricato Tailwind da una rete esterna. Le correzioni finali sono in `final.css`, caricato dopo lo stile originale. Per nuovi stili, usare CSS esplicito: aggiungere una classe Tailwind sconosciuta non genera automaticamente il relativo stile.

Il PDF incluso è stato esportato e controllato con un renderer locale. Una nuova stampa dal browser può presentare piccole differenze di impaginazione: selezionare formato 16:9, scala 100%, nessun margine, grafica di sfondo attiva e intestazioni/piè di pagina del browser disattivati. Il PDF fornito è il riferimento visivo per la presentazione.

## Documentazione

- `BRIEF.md`: decisioni finali e limiti della revisione.
- `BRIEF_PIANO.md`: piano originale, conservato come riferimento storico.
- `DESIGN.md`: direzione artistica e regole di mantenimento.
- `REVISIONE.md`: diagnosi, interventi e verifiche.
- `copione.md`: copione aggiornato, allineato alle note dei due formati modificabili.
- `FONTI.md`: collegamenti, ambito dei dati e riferimenti ancora da completare.

## Dati da confermare prima dell'esposizione

Il layout è finalizzato. Restano da documentare puntualmente **47,8% Europa**, **≈20% nei ruoli tecnici**, **33% del pubblico esports** e il **circa 25% GDC** nella fascia 23–25%. Le incertezze non sono state colmate inventando fonti. Il valore europeo richiesto è stato conservato e marcato; gli altri limiti sono esplicitati nella presentazione o nelle note. Vedere `FONTI.md` prima di usare il deck come elaborato definitivo.
