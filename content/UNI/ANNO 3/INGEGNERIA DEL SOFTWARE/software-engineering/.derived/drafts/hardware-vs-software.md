# Confronto Hardware/Software e Disponibilità

## Guasti Hardware e Software

Hardware e software possono entrambi manifestare guasti, ma la natura dei difetti è diversa.

### Software

I guasti software sono dovuti alla presenza di difetti nei programmi.

Il punto fondamentale è che:
- il software **non si consuma**;
- i difetti software sono *latenti*;
- se non vengono corretti, possono continuare a causare guasti del sistema.

### Hardware

I guasti hardware sono quasi sempre collegati ai componenti fisici:
- consumo;
- deterioramento;
- comportamento diverso da quello specificato;
- rottura.

Esempi di difetti hardware:
- alterazione di un resistore;
- condensatore in corto;
- porta logica bloccata:
    - su `1`;
    - su `0`.

### Conseguenza sulle metriche

A causa della differenza tra gli effetti dei difetti hardware e software:
- le metriche usate per l'affidabilità hardware **non sono estensibili al software**.

>[!question]- Perché le metriche di affidabilità hardware non possono essere estese direttamente al software?
> >[!done]- la risposta
> > I guasti hardware sono quasi sempre legati a consumo, deterioramento o rottura dei componenti, mentre i guasti software derivano da difetti latenti nei programmi e il software non si consuma. Poiché gli effetti dei difetti sono diversi, le metriche di affidabilità hardware non sono estensibili al software.

## Riparazione Hardware vs Software

Anche l'effetto della riparazione è diverso.

### Riparazione Hardware

Per riparare un difetto hardware:
- si sostituisce il componente difettoso.

Dopo la riparazione:
- l'affidabilità dell'hardware torna ai livelli originali.

### Riparazione Software

Dopo una riparazione del software:
- l'affidabilità può aumentare;
- l'affidabilità può anche diminuire.

Quindi, mentre la sostituzione del componente hardware riporta l'affidabilità al livello originale, una modifica software non garantisce automaticamente un aumento dell'affidabilità.

## Obiettivi di affidabilità

### Hardware: stabilità

L'obiettivo dell'affidabilità hardware è la **stabilità**:
- mantenere costante la frequenza di guasto.

### Software: reliability growth

L'obiettivo dell'affidabilità software è la **crescita dell'affidabilità**:
- far decrescere la frequenza di guasto.

| Aspetto | Hardware | Software |
| --- | --- | --- |
| origine tipica dei guasti | consumo, deterioramento, comportamento non conforme o rottura dei componenti | difetti latenti nei programmi |
| consumo | i componenti possono consumarsi | il software non si consuma |
| riparazione | sostituzione del componente difettoso | modifica del software |
| effetto della riparazione | affidabilità riportata al livello originale | affidabilità può aumentare o diminuire |
| obiettivo | stabilità della frequenza di guasto | diminuzione della frequenza di guasto |

>[!question]- Si confrontino gli obiettivi di affidabilità di hardware e software.
> >[!done]- la risposta
> > Per l'hardware l'obiettivo è la stabilità, cioè mantenere costante la frequenza di guasto. Per il software l'obiettivo è invece la crescita dell'affidabilità, ottenuta facendo diminuire la frequenza di guasto.

## Frequenza di guasto nel tempo

### Hardware

L'andamento della frequenza di guasto hardware nel tempo è influenzato da due fenomeni:
1. eliminazione dei componenti difettosi;
    - indicata come *mortalità infantile*;
2. usura.

### Software

La frequenza di guasto software è influenzata:
1. inizialmente dall'eliminazione dei difetti;
2. successivamente dall'invecchiamento dovuto alla manutenzione.

La differenza resta quindi legata alla diversa natura dei due prodotti:
- per l'hardware intervengono fenomeni fisici dei componenti;
- per il software l'andamento è collegato all'eliminazione dei difetti e alla manutenzione.

## Availability

### Def disponibilità
La **disponibilità** (*availability*) del software è la percentuale del tempo in cui il software è risultato usabile nel corso della propria vita.

Dipende da:
- numero di guasti che si verificano;
- tempo necessario per ripararli.

### Importanza di Reliability e Availability

*Reliability* e *availability* sono cruciali nei sistemi in cui una caduta del servizio può causare:
- perdite economiche;
- perdite sociali;
- rischi di sicurezza.

>[!question]- Da quali fattori dipende la disponibilità del software?
> >[!done]- la risposta
> > La disponibilità è la percentuale del tempo in cui il software è risultato usabile nel corso della sua vita. Dipende dal numero di guasti che si verificano e dal tempo necessario per ripararli.

## Evoluzione della produzione del software

La produzione del software è passata attraverso tre fasi:
1. **abilità individuale**;
2. **fase artigianale**;
3. **fase industriale**.

Il termine **Ingegneria del Software** fu coniato nel 1968 durante la conferenza NATO di Garmisch.

### Definizione IEEE

Lo standard **IEEE Std. 610.12 (1990)** definisce l'Ingegneria del Software come l'applicazione di un approccio:
- sistematico;
- disciplinato;
- misurabile;

a:
- sviluppo;
- esercizio;
- manutenzione del software.

## Configurazione e caratteristiche del software

Il software è una configurazione di:
- programmi;
- documenti;
- dati multimediali.

Le caratteristiche indicate sono:
- deve essere ingegnerizzato;
- non si consuma;
- è complesso;
- è invisibile;
- si conforma;
- cambia.

## Scopi dei metodi di Software Engineering

I metodi e le tecniche di ingegneria del software servono a:
- assicurare la qualità;
- controllare il budget;
- gestire sistemi *legacy*;
- evitare ritardi;
- applicare nuove tecnologie.

>[!question]- Come viene definita l'Ingegneria del Software dallo standard IEEE Std. 610.12?
> >[!done]- la risposta
> > È definita come l'applicazione di un approccio sistematico, disciplinato e misurabile allo sviluppo, esercizio e manutenzione del software.

## Miti del Software

Tra i miti da sfatare rientrano le convinzioni che:
- aumentare il numero di programmatori risolva i ritardi;
- descrizioni generiche siano sufficienti;
- il lavoro finisca con il *deploy*;
- la qualità possa essere valutata soltanto alla fine;
- l'Ingegneria del Software sia costosa e rallenti la produzione.

>[!question]- Quali miti sul software vengono indicati?
> >[!done]- la risposta
> > I miti indicati sono che aggiungere programmatori risolva i ritardi, che bastino descrizioni generiche, che il lavoro termini con il deploy, che la qualità si possa valutare solo alla fine e che l'Ingegneria del Software sia costosa e rallenti la produzione.
