# Affidabilità, Guasti ed Errori

## Ruoli nella produzione e nell'uso del software

Nel contesto di un prodotto software si distinguono tre soggetti:

- **cliente**
    - ordina il prodotto software;
- **sviluppatore**
    - produce il prodotto software;
- **utente**
    - usa il prodotto software.

### Software interno e software a contratto

La relazione tra cliente e sviluppatore permette di distinguere:

| Tipologia | Cliente | Sviluppatore |
| --- | --- | --- |
| **software interno** | coincide con lo sviluppatore | coincide con il cliente |
| **software a contratto** | soggetto distinto | soggetto distinto dal cliente |

>[!question]- Qual è la differenza tra software interno e software a contratto?
> >[!done]- la risposta
> > Nel software interno cliente e sviluppatore coincidono. Nel software a contratto, invece, cliente e sviluppatore sono soggetti differenti.

## Affidabilità Software

### Def Reliability

L'***affidabilità*** (*reliability*) può essere espressa a due livelli:

- **informalmente**
    - è la credibilità del prodotto software;
- **formalmente**
    - è la probabilità che il prodotto software lavori correttamente in un determinato intervallo temporale.

Intuitivamente:
- un prodotto con molti difetti è poco affidabile;
- l'affidabilità migliora man mano che il numero di difetti viene ridotto.

>[!question]- Come si definisce formalmente l'affidabilità software?
> >[!done]- la risposta
> > Formalmente, l'affidabilità software è la probabilità che il prodotto lavori correttamente in un determinato intervallo temporale. In modo informale può essere vista come la credibilità del prodotto.

## Errore, Difetto e Guasto

I tre concetti sono collegati ma non coincidono.

### Def errore
Un **errore** è l'azione errata di chi introduce un difetto nel prodotto software.

Può derivare, per esempio, da:
- ignoranza;
- distrazione.

### Def defect
Un **difetto** (*defect*) è un'anomalia presente in un prodotto software.

### Def failure
Un **guasto** (*failure*) è il comportamento anomalo del prodotto software dovuto alla presenza di un difetto.

La relazione è:

```text
errore → difetto → guasto
```

- l'errore introduce il difetto;
- il difetto può causare il guasto.

>[!question]- Si distinguano errore, difetto e guasto.
> >[!done]- la risposta
> > L'errore è l'azione errata che introduce un difetto nel prodotto software. Il difetto è un'anomalia presente nel prodotto. Il guasto è il comportamento anomalo del software dovuto alla presenza di un difetto. La relazione è quindi errore → difetto → guasto.

## Affidabilità osservata e difetti latenti

La relazione tra:
- affidabilità osservata;
- numero di difetti latenti;

non è semplice.

Eliminare un difetto non produce sempre lo stesso miglioramento dell'affidabilità.

In particolare:
- eliminare difetti presenti in parti del prodotto raramente utilizzate ha piccoli effetti sull'affidabilità osservata;
- il miglioramento ottenuto dipende dalla localizzazione del difetto.

## Regola 10-90

Secondo la **regola 10-90**:
- il **90% del tempo di esecuzione totale** viene speso eseguendo;
- soltanto il **10% delle istruzioni**.

Questo 10% delle istruzioni costituisce il *core*, cioè il nucleo del programma.

Di conseguenza, l'effetto dell'eliminazione di un difetto sull'affidabilità dipende anche dalla sua posizione:
- se il difetto appartiene al *core*;
- se il difetto si trova fuori dal *core*.

>[!question]- Che cosa afferma la regola 10-90 e perché è rilevante per l'affidabilità?
> >[!done]- la risposta
> > La regola 10-90 afferma che il 90% del tempo di esecuzione totale viene speso eseguendo soltanto il 10% delle istruzioni, chiamato core del programma. Per questo il miglioramento dell'affidabilità ottenuto eliminando un difetto dipende dalla sua localizzazione e, in particolare, dal fatto che appartenga o meno al core.

## Operational Profile

### Def operational profile
L'***operational profile*** descrive come viene usato il prodotto software.

L'affidabilità osservata dipende dal profilo operativo:
- utenti differenti possono usare lo stesso software in modi diversi;
- quindi possono esercitare parti differenti del prodotto;
- un difetto può manifestarsi per un utente e non per un altro.

Conseguenza:
- l'affidabilità dipende anche dall'utente.

>[!question]- Perché l'affidabilità software dipende dall'utente?
> >[!done]- la risposta
> > L'affidabilità osservata dipende dall'operational profile, cioè da come il prodotto viene utilizzato. Utenti diversi possono avere profili operativi diversi, quindi un difetto può manifestarsi per un utente e non per un altro. Per questo l'affidabilità dipende anche dall'utente.
