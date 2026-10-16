Ciao, ti spiego la mia situazione, al momento sto facendo la magistrale in cybersecurity della sapienza e ho le materie del 1 anno 1 semestre [https://corsidilaurea.uniroma1.it/it/course/33516](https://corsidilaurea.uniroma1.it/it/course/33516) ho perso qualcosa come 10 lezioni per materia e non so come recuperarle, potremmo fare in modo che tu mi dia il giusto materiale per recuperare brevemente la cosa? Devo recuperare crittografia, distributed systems e network la mia idea era farti vedere qualche skill qualcosa su come scrivere degli appunti bene in modo che io come studente li capisca, magari ci metti delle immagini delle cose ecc... Prima però raccogliamo più dati possibili sporchi ecc appunti della gente trascrizioni e lo usiamo come fonte da usare, ha senso?
Sì, ha senso, ed è il modo giusto: prima si raccolgono le fonti, poi si scrivono appunti puliti costruiti su quelle.

Una nota utile: dalla pagina del corso risulta che **Cryptography (Venturi)** è sospesa dal **28 ottobre al 3 novembre**. È una settimana perfetta per recuperare quella materia senza accumulare altro ritardo.

**Come lo organizzerei**

1. **Raccolta fonti, per materia.** Slide e pagine ufficiali dei docenti, appunti e repo GitHub di studenti degli anni precedenti, eventuali registrazioni o trascrizioni, e il libro di riferimento.
2. **Mappa delle lacune.** Confronto il programma con le 10 lezioni che hai perso, così sai esattamente cosa recuperare e in che ordine.
3. **Appunti puliti, una lezione alla volta.** Ogni lezione segue lo stesso schema: intuizione, definizione formale, esempio svolto, diagramma (ad esempio flussi di protocolli o messaggi tra nodi), errori tipici e domanda d'esame. Diventano documenti che puoi rileggere, annotare ed esportare in PDF.

**Per partire mi servono quattro cose**

- **Nomi esatti e docenti** di Distributed Systems e del corso di Network (Network Security? Network Infrastructures?).
- **Materiale che hai già:** slide, registrazioni, chat di gruppo o Drive di colleghi. Puoi allegarli qui. Le trascrizioni di audio e video non riesco a generarle io, ma se hai i file di testo le uso volentieri.
- **Lingua degli appunti:** il corso è in inglese, ma li preferisci in italiano, con i termini tecnici in inglese?
- **Da quale materia partiamo:** io suggerirei Crypto, per sfruttare la settimana di pausa.

Appena mi rispondi, inizio la raccolta per la prima materia.
È importante che se il prof da degli esercizi ci siano anche quelli, e penso tu debba darti una ricerca online poi per quando dovrai scrivere gli appunti per capire come scriverli in modo che io possa capirli che dici? Passo a mandarti tutto il materiale che ho? Secondo me potremmo usare dei subagenti così non ti riempi la memoria, magari per ogni materia chiamiamo sonnet per leggere il materiale e scegliere cosa prendere poi opus 5.5 High per scrivere gli appunti e facciamo questo in loop però prima ti prendi e studi delle skill che dici?
Sì, mi sembra un'ottima impostazione. Ti propongo solo qualche aggiustamento.

**Esercizi.** Ogni lezione avrà una sezione dedicata con le soluzioni. Se il prof non ha dato la soluzione, la svolgo io e la segno come "soluzione nostra, da verificare", così sai di cosa fidarti per l'esame.

**Ricerca sul metodo.** Ottima idea, e la faccio prima di tutto. Esistono tecniche di studio con buone prove a favore: esempi svolti passo passo, domande di auto-verifica, schemi accanto al testo, collegamenti tra concetti. Da questa ricerca ricavo una **guida di stile** fissa, che tutti gli agenti di scrittura seguono. Così gli appunti delle tre materie hanno lo stesso formato. Se ti piace, la salviamo come skill da riusare anche nei prossimi semestri.

**Subagenti.** D'accordo. Lo farei per lezione, non per materia intera, così ogni agente lavora su un pezzo piccolo e non perde dettagli:

1. **Sonnet** legge il materiale grezzo di una lezione e produce una sintesi strutturata: argomenti, definizioni, esercizi, punti confusi nelle fonti.
2. **Opus** scrive l'appunto partendo da quella sintesi e dalla guida di stile.
3. **Un terzo agente indipendente** controlla correttezza ed esercizi mancanti, perché per la crittografia un errore in una dimostrazione costa caro.

Una precisazione: posso scegliere il modello di ogni agente, ma non il livello di ragionamento ("High"). Opus però va benissimo per la scrittura.

**Sì, mandami tutto.** Ti chiedo di organizzarlo così:

- una cartella o uno zip per materia;
- se possibile, i file con il numero o la data della lezione nel nome;
- i testi degli esercizi separati, se li hai.

E ricordami i nomi esatti di Distributed Systems e del corso di Network, con i docenti. Mentre carichi, inizio la ricerca sulla guida di stile?
Si procedi grazie fai la ricerca della guida di stile
Inizio la ricerca sulle tecniche di studio con più prove a favore, poi la trasformo in una guida di stile per gli appunti.La guida di stile è pronta (guida-stile-appunti.md). Si basa su tre filoni di ricerca:

- **Cosa funziona nello studio.** La grande rassegna di Dunlosky ha dato il voto più alto a due tecniche: fare test di pratica e distribuire lo studio nel tempo, perché aiutano studenti di età e livelli diversi su molti tipi di prova. Invece rileggere ed evidenziare, pur essendo le tecniche più usate, non migliorano in modo consistente i risultati. Per questo ogni lezione chiude con domande di auto-verifica, non con un riassunto.
- **Esempi svolti.** In una meta-analisi l'effetto più forte è dato dai passi della soluzione tolti progressivamente, seguito dall'abitudine a spiegarsi i passaggi. Quindi per ogni tecnica ci sarà un esempio completo e uno da finire tu, con i passi etichettati.
- **Testo e immagini.** Dai principi di Mayer vengono tre regole: togliere il superfluo, segnalare la struttura e tenere parole e immagini vicine sulla pagina. Da qui vengono i box fissi (Definizione, Perché?, Attenzione) e i diagrammi specifici per materia: giochi Challenger–Adversary per Crypto, diagrammi spazio-tempo per Distributed Systems, sequence diagram dei protocolli per Network.

Gli esercizi del prof sono obbligatori, ognuno con un badge che dice da dove viene la soluzione: del prof, di colleghi, oppure nostra da verificare.

Un punto da confermare: ho impostato gli appunti in italiano con i termini tecnici in inglese. Se ti va bene, ora mandami il materiale. Più avanti, se il formato funziona, possiamo salvare la guida come skill.

Sources:

- [Dunlosky et al. 2013 – Improving Students' Learning](https://www.citedrive.com/en/discovery/improving-students-learning-with-effective-learning-techniques)
- [Crissman 2006 – Worked examples meta-analysis](https://digitalcommons.unl.edu/dissertations/AAI3208114)
- [Mayer – Multimedia learning principles](https://lucidea.com/blog/mayers-12-principles-of-multimedia-learning)
- [Weinstein et al. 2018 – Teaching the science of learning](https://cognitiveresearchjournal.springeropen.com/articles/10.1186/s41235-017-0087-y)

Scusami facciamoli in inglese mi sono scordato di dirtelo, come vogliamo operare poi? Ti dico la materia poi ti mando il materiale e poi ci pensi tu?

Fatto: la guida ora prevede appunti interamente in inglese, in un inglese semplice e chiaro, con le sezioni e i box rinominati di conseguenza.

Sì, il flusso è quello. In pratica:

1. **Mi dici la materia e mi mandi tutto** in uno zip o in più file: slide, appunti di altri, trascrizioni, esercizi, esami passati. Non serve sistemare niente, il materiale "sporco" va benissimo.
2. **Faccio l'inventario**: ricostruisco l'elenco delle lezioni e degli argomenti, ti mostro la lista e ti segnalo i buchi (lezioni senza fonti, esercizi senza soluzione). Qui ti chiedo solo una conferma veloce, ad esempio "le lezioni perse sono dalla 3 alla 12".
3. **Parte il ciclo per ogni lezione**: Sonnet legge e sintetizza, Opus scrive seguendo la guida, un revisore indipendente controlla.
4. **Ti consegno le lezioni man mano che sono pronte**, senza aspettare la fine. Così puoi iniziare a studiare la prima mentre scrivo le altre, e se qualcosa non ti torna nel formato lo correggiamo subito.

Gli appunti li metto in **un documento per materia, con una scheda per lezione**. Lo puoi leggere da telefono, commentare ed esportare in PDF per stamparlo.

Da quale materia partiamo? Se è Crypto, mandami pure il materiale.

Ok è importante secondo me prendere bene le figure ecc e ad esempio se ci sono registrazioni o altro concentrarsi su dove si sofferma di più il prof, cosa dice in più ecc quindi è fondamentale che tu sappia bene come scremare e filtrare le info buone da quelle cattive o inutili


Partiamo con crittografia:

- link del corso del prof https://dventuri83.github.io/teaching/1_crypto/
- appunti di un collega dello scorso anno ma sono di tutto il corso: https://github.com/Exyss/university-notes/tree/main/Master/Distributed%20Systems
- lezioni del 2021 magari estraiamo solo l'audio? https://drive.google.com/drive/folders/1UyRfB0bJMY51ycVfLL7hWx7UIOopaRxC?usp=drive_link
- ti allego 2 PDF uno con tutti gli esercizi e uno con credo sempre appunti di tutto il corso