Perfetto. Ho letto il PDF **“5. La progettazione logica”** e lo useremo non come semplice riassunto, ma come base per imparare il **metodo d’esame** della docente.

In questa prima parte del PDF non ci sono ancora veri esercizi lunghi di ristrutturazione, ma ci sono molte regole fondamentali che poi negli esercizi verranno applicate quasi meccanicamente. La cosa più importante, per il tuo obiettivo, è questa:

> la ristrutturazione dello schema E/R serve a preparare lo schema alla traduzione nel modello relazionale, eliminando costrutti non direttamente traducibili e scegliendo gli identificatori principali.

La docente lo dice esplicitamente tra le fasi della progettazione logica: prima si fa la **ristrutturazione dello schema E/R**, e dentro questa fase rientra anche la **scelta degli identificatori principali di entità e relazioni**.

---

## 1. Dove siamo nel processo di progettazione

La progettazione logica parte da uno **schema concettuale E/R** e deve produrre uno **schema logico relazionale**.

La distinzione importante è:

- nella progettazione concettuale chiediamo: **che cosa esiste nel dominio?**
    
- nella progettazione logica chiediamo: **come rappresentarlo correttamente in un DBMS relazionale?**
    

Quindi non stiamo più solo “capendo il problema”, ma stiamo preparando lo schema a diventare tabelle, chiavi primarie, chiavi esterne e vincoli.

La docente divide la progettazione logica in tre fasi:

1. **Ristrutturazione dello schema E/R**
    
2. **Traduzione diretta nel modello relazionale**
    
3. **Ristrutturazione dello schema relazionale**
    

Il nostro focus, per ora, è la prima fase.

---

# 2. La regola madre: prima si esplicitano gli identificatori

La slide più importante per il tuo obiettivo è quella sulla **preparazione iniziale dello schema E/R**.

La docente dice che, prima di trasformare lo schema, bisogna ridisegnarlo aggiungendo i vincoli rilevanti, anche quelli **impliciti** o **derivati**.

Tradotto in metodo d’esame:

> prima di scegliere l’identificatore principale, devi elencare tutti gli identificatori possibili.

Questa è una regola fondamentale. Non devi guardare solo il pallino cerchiato nella soluzione. Devi chiederti:

1. Quali attributi identificano l’entità?
    
2. Ci sono identificatori esterni tramite relazioni?
    
3. Ci sono identificatori derivati dalle cardinalità?
    
4. Ci sono identificatori derivati da ISA o generalizzazioni?
    
5. Quale di questi verrà scelto come principale?
    

L’identificatore principale è quello che poi guiderà la traduzione nel modello relazionale: diventerà normalmente la **chiave primaria** della tabella corrispondente.

---

# 3. Identificatori di entità e identificatori di relazione

Nel modello E/R della docente bisogna distinguere bene due cose:

## Identificatore di entità

Serve a distinguere un’istanza di una entità dalle altre.

Esempio:

```text
Persona(CF, Nome, Cognome)
```

Se `CF` identifica ogni persona, allora `CF` è identificatore di `Persona`.

Un’entità può avere più identificatori.

Per esempio:

```text
Studente
- Matricola
- CF
- Email istituzionale
```

Tutti e tre potrebbero teoricamente identificare uno studente, ma uno solo verrà scelto come **identificatore principale**.

---

## Identificatore esterno

Un identificatore è esterno quando un’entità viene identificata tramite la partecipazione a una relazione.

Esempio intuitivo:

```text
Comune -- Ha -- Provincia
```

Supponiamo che un comune sia identificato da:

```text
NomeComune + Provincia
```

Allora `NomeComune` da solo non basta, perché possono esistere comuni con lo stesso nome in province diverse. L’identificazione dipende anche dalla relazione con `Provincia`.

Quindi abbiamo un identificatore misto:

```text
NomeComune + relazione con Provincia
```

Questa cosa è centrale negli esercizi perché poi, nella traduzione relazionale, l’identificatore della provincia dovrà essere propagato dentro la tabella del comune.

---

## Identificatore di relazione

Una relazione E/R può avere anch’essa identificatori.

Esempio:

```text
Fornitura(Fornitore, Prodotto, Ministero)
```

Una specifica fornitura potrebbe essere identificata dalla coppia:

```text
Ministero + Prodotto
```

oppure da:

```text
Fornitore + Prodotto
```

dipende dai vincoli del testo e dalle cardinalità.

La docente insiste su un punto: spesso alcuni identificatori di relazione sono **derivati**, cioè non vengono disegnati esplicitamente perché sono conseguenza di altri vincoli.

---

# 4. Regola pratica: cardinalità massima 1 genera identificatore di relazione

Questa è una delle regole più importanti del PDF.

La docente dice:

> se un’entità `E` partecipa a una relazione `R` in un ruolo `U` con cardinalità massima uguale a 1, allora quel ruolo `U` identifica la relazione `R`.

Vediamola lentamente.

Supponiamo:

```text
Volo -- ArrPart -- Aeroporto
```

e `Volo` partecipa ad `ArrPart` con cardinalità `(1,1)`.

Questo significa:

> ogni volo partecipa al massimo a una istanza della relazione ArrPart.

Quindi non possono esistere due istanze diverse di `ArrPart` con lo stesso `Volo`.

Perciò:

```text
Volo
```

è identificatore della relazione `ArrPart`.

La docente nel PDF mostra proprio un esempio con `Volo`, `Aeroporto`, `ArrPart`, `Arrivo` e `Partenza`.

Metodo d’esame:

> quando vedi una cardinalità massima 1 su un ruolo di relazione, chiediti subito: questo ruolo identifica la relazione?

Quindi, se hai:

```text
E -- R -- F
(1,1)
```

sul lato di `E`, allora `E` è identificatore di `R`.

Attenzione: non vuol dire che `E` identifica `F`. Vuol dire che l’istanza di relazione `R` è identificata dal ruolo `E`.

---

# 5. Seconda regola: se una relazione identifica un’entità, gli altri ruoli identificano la relazione

Questa è più sottile, ma è importantissima.

La docente dice:

se un’entità `E` partecipa a una relazione `R` nel ruolo `U1`, e quel ruolo costituisce un identificatore per `E`, allora gli altri ruoli della relazione identificano la relazione `R`.

Esempio del PDF:

```text
Ministero -- Fornitura -- Prodotto
                |
             Fornitore
```

La slide dice che il ruolo `Fornitore` è un identificatore dell’entità `Fornitore`.

Questo implica che la coppia:

```text
Ministero + Prodotto
```

è un identificatore derivato della relazione `Fornitura`.

Perché?

Ragioniamo da orale.

Se `Fornitore` è identificato dalla sua partecipazione a `Fornitura`, allora un fornitore non ha un’identità autonoma semplice, ma viene riconosciuto attraverso la fornitura in cui compare.

Se nella relazione ci sono i ruoli:

```text
Fornitore, Ministero, Prodotto
```

e `Fornitore` è identificato tramite quella relazione, allora non posso avere due istanze diverse di `Fornitura` con stessi `Ministero` e `Prodotto` ma diverso `Fornitore`, perché questo romperebbe l’identificazione.

Quindi:

```text
Ministero + Prodotto
```

identifica `Fornitura`.

Regola pratica:

> se una relazione entra nell’identificatore esterno di un’entità, allora gli altri ruoli della relazione diventano candidati identificatori della relazione stessa.

Questa è una delle fonti principali delle frecce negli schemi ristrutturati.

---

# 6. Eliminazione degli attributi multivalore

Un attributo multivalore è un attributo con cardinalità massima maggiore di 1.

Esempio:

```text
Persona
- Telefono (1,n)
```

Nel modello relazionale non posso mettere direttamente una lista di telefoni dentro una cella, perché una tabella relazionale lavora con valori atomici.

Quindi la docente applica questa trasformazione:

Prima:

```text
Persona
Telefono/Stringa (1,n)
```

Dopo:

```text
Persona -- HaTelefono -- Telefono
```

con `Telefono` trasformato in entità.

L’entità `Telefono` avrà un attributo, ad esempio:

```text
Numero/Stringa
```

Metodo d’esame:

1. Trovo l’attributo multivalore.
    
2. Creo una nuova entità per il dominio dell’attributo.
    
3. Creo una relazione tra l’entità originaria e la nuova entità.
    
4. Riporto le cardinalità coerentemente.
    
5. Scelgo o individuo gli identificatori della nuova entità.
    

Nel caso:

```text
Persona -- HaTelefono -- Telefono
```

l’identificatore naturale di `Telefono` sarà probabilmente `Numero`.

Ma attenzione: a seconda del dominio, potrebbe essere anche:

```text
Persona + Numero
```

se il testo dicesse che il numero è significativo solo per una persona. In un esercizio devi sempre chiederti se il valore è globalmente identificante o solo localmente identificante.

---

# 7. Eliminazione degli attributi composti

Un attributo composto è un attributo formato da sotto-attributi.

Esempio:

```text
Indirizzo
- Via
- Numero
- CAP
```

Se l’attributo composto ha cardinalità `(1,1)`, la docente lo elimina semplicemente portando i componenti sull’entità.

Prima:

```text
Persona
- Indirizzo
  - Via
  - Numero
  - CAP
```

Dopo:

```text
Persona
- Via
- Numero
- CAP
```

Se invece l’attributo composto è opzionale, per esempio:

```text
DataMatr (0,1)
- Giorno
- Mese
- Anno
```

ci sono due possibilità.

Prima possibilità: spalmo i componenti sull’entità:

```text
Persona
- GMatr
- MMatr
- AMatr
```

ma devo aggiungere un vincolo esterno:

> per ogni persona, `GMatr`, `MMatr` e `AMatr` sono definiti tutti insieme oppure nessuno dei tre è definito.

Seconda possibilità: trasformo l’attributo composto in una nuova entità:

```text
Persona -- Sposato -- Data
```

con `Data` che ha:

```text
Giorno
Mese
Anno
```

Metodo d’esame:

- se l’attributo composto è obbligatorio, lo appiattisco;
    
- se è opzionale, posso appiattirlo ma devo ricordare il vincolo esterno;
    
- se voglio evitare valori nulli o rappresentare meglio l’opzionalità, creo una nuova entità.
    

---

# 8. Eliminazione delle ISA tra entità

Questa è una parte centrale.

Nel modello E/R concettuale posso avere:

```text
Studente ISA Persona
```

cioè ogni studente è anche una persona.

Ma nella ristrutturazione la docente elimina la ISA trasformandola in una relazione binaria.

Prima:

```text
Persona
  ^
  |
Studente
```

Dopo:

```text
Studente -- ISA-S-P -- Persona
```

con cardinalità:

```text
Studente (1,1)
Persona  (0,1)
```

Perché?

Ogni `Studente` deve corrispondere esattamente a una `Persona`.

Quindi lato `Studente`:

```text
(1,1)
```

Ogni `Persona` può essere al massimo uno `Studente`, ma non necessariamente lo è.

Quindi lato `Persona`:

```text
(0,1)
```

Questa trasformazione ha una conseguenza fondamentale sugli identificatori.

La docente dice:

> agli eventuali identificatori di `Studente` viene aggiunto un identificatore esterno dato dalla partecipazione alla relazione ISA.

Cioè `Studente` viene identificato anche tramite la relazione con `Persona`.

Se `Persona` ha identificatore `CF`, allora dopo la ristrutturazione `Studente` può essere identificato tramite:

```text
ISA-S-P + CF di Persona
```

oppure, se ha un attributo proprio:

```text
Matricola
```

Quindi `Studente` potrebbe avere più identificatori:

1. `Matricola`
    
2. identificatore esterno tramite `Persona`, cioè il `CF` della persona collegata
    

La scelta dell’identificatore principale dipende dal criterio progettuale.

---

# 9. Come scegliere l’identificatore principale

Qui arriviamo al tuo obiettivo principale.

Un’entità può avere più identificatori candidati. La scelta dell’identificatore principale è importante perché, nella traduzione relazionale, quello diventerà la chiave primaria.

La docente non sta solo scegliendo “quello più bello graficamente”. Sta scegliendo quello che rende più semplice e corretta la traduzione.

Le regole pratiche sono queste.

## Regola 1: preferire identificatori semplici

Se ho:

```text
Studente
- Matricola
- CF
```

entrambi identificano. Ma se `Matricola` è più corta, stabile e propria del dominio universitario, può essere scelta come principale.

## Regola 2: preferire identificatori non composti

Tra:

```text
Codice
```

e:

```text
Nome + DataNascita + ComuneNascita
```

di solito scelgo `Codice`.

Perché nella traduzione relazionale una chiave primaria composta rende più pesanti le chiavi esterne.

## Regola 3: preferire identificatori interni se sono naturali e stabili

Se un’entità ha un attributo proprio che la identifica bene, spesso si sceglie quello.

Esempio:

```text
Studente(Matricola)
```

meglio di:

```text
Studente identificato tramite Persona
```

se `Matricola` è disponibile e stabile.

## Regola 4: usare identificatori esterni quando l’entità è debole o dipendente

Se l’entità non ha un identificatore autonomo, allora si usa un identificatore esterno.

Esempio:

```text
RigaOrdine
```

può essere identificata da:

```text
Ordine + NumeroRiga
```

Qui non avrebbe senso scegliere solo `NumeroRiga`, perché il numero riga è unico solo dentro un ordine.

## Regola 5: negli schemi con ISA, l’identificatore della super-entità è spesso molto importante

Dopo aver eliminato una ISA:

```text
Studente -- ISA-S-P -- Persona
```

lo studente può essere identificato esternamente dalla persona.

Se la soluzione della docente sceglie quell’identificatore come principale, il motivo di solito è:

> nella traduzione relazionale si vuole mantenere la corrispondenza uno-a-uno tra sottoclasse e superclasse usando la stessa chiave.

Cioè, se `Persona` ha chiave `CF`, anche `Studente` può usare `CF` come chiave primaria tramite la relazione ISA.

Questo evita di introdurre una chiave indipendente che poi dovrebbe comunque essere collegata a `Persona`.

---

# 10. Come leggere le frecce degli identificatori

Quando vedi una freccia di identificazione, devi chiederti:

> l’identità di questa entità dipende da quale altra entità o relazione?

La freccia non è decorativa: indica una dipendenza identificativa.

Per orientarla correttamente, usa questo ragionamento:

## Caso A: entità identificata tramite relazione

Se `Studente` è identificato tramite `Persona`, la freccia parte dal pallino dell’identificatore di `Studente` e punta verso la relazione ISA, perché l’identificazione passa da lì.

Concettualmente:

```text
Studente viene identificato dalla Persona a cui è collegato
```

Quindi la direzione è dalla entità dipendente verso il legame che porta all’entità identificante.

---

## Caso B: relazione identificata da un ruolo

Se una relazione `R` è identificata dal ruolo `E`, allora la freccia dell’identificatore della relazione riguarda il ruolo `E`.

Esempio:

```text
Volo -- ArrPart -- Aeroporto
```

se ogni `Volo` partecipa al massimo a una `ArrPart`, allora `Volo` identifica `ArrPart`.

Il ragionamento è:

```text
dato un Volo, trovo al massimo una istanza di ArrPart
```

Quindi il ruolo `Volo` è sufficiente a identificare la relazione.

---

## Caso C: identificatore derivato dagli altri ruoli

Nell’esempio:

```text
Ministero -- Fornitura -- Prodotto
                |
             Fornitore
```

se `Fornitore` è identificato dalla sua partecipazione a `Fornitura`, allora gli altri ruoli:

```text
Ministero + Prodotto
```

identificano `Fornitura`.

Qui la freccia serve a dire:

```text
per riconoscere quella fornitura bastano Ministero e Prodotto
```

---

# 11. Generalizzazioni

Una generalizzazione:

```text
Persona
 /     \
Studente Docente
```

viene trattata come più ISA separate:

```text
Studente -- ISA-S-P -- Persona
Docente  -- ISA-D-P -- Persona
```

con cardinalità:

```text
Studente (1,1) verso Persona
Persona  (0,1) verso Studente

Docente  (1,1) verso Persona
Persona  (0,1) verso Docente
```

Poi si aggiungono vincoli esterni.

Se la generalizzazione è **non completa**, significa che una persona può anche non essere né studente né docente.

Vincolo:

> nessuna istanza di Persona partecipa sia a ISA-S-P sia a ISA-D-P.

Se la generalizzazione è **completa**, significa che ogni persona deve appartenere ad almeno una sottoclasse.

E se è anche disgiunta:

> ogni Persona partecipa esattamente a una tra le relazioni ISA delle sottoclassi.

Nel PDF c’è l’esempio:

```text
Persona
 /     \
Uomo   Donna
```

La generalizzazione completa diventa:

```text
Uomo -- ISA-U-P -- Persona
Donna -- ISA-D-P -- Persona
```

con vincolo:

> ogni Persona partecipa a ISA-U-P oppure a ISA-D-P, ma non a entrambe.

---

# 12. Metodo operativo da usare negli esercizi

Quando mi manderai una slide con un esercizio, io la analizzerò così.

## Passo 1: leggo il testo

Cerco nomi, oggetti, concetti autonomi.

Esempio:

```text
Si vogliono rappresentare studenti, corsi, esami sostenuti...
```

Candidati entità:

```text
Studente
Corso
Esame
```

Poi verifico se `Esame` è davvero entità o relazione tra `Studente` e `Corso`.

---

## Passo 2: individuo entità e relazioni

Mi chiedo:

- è un oggetto autonomo?
    
- ha attributi propri?
    
- partecipa a più relazioni?
    
- deve essere identificato?
    

Se sì, probabilmente è entità.

Se invece rappresenta un collegamento tra entità, probabilmente è relazione.

---

## Passo 3: elenco tutti gli identificatori

Per ogni entità scrivo:

```text
Entità: Studente
Identificatori possibili:
- Matricola
- CF
- identificatore esterno tramite Persona, se Studente ISA Persona
Identificatore principale:
- da determinare
```

Non scelgo subito. Prima elenco.

---

## Passo 4: scelgo l’identificatore principale

Uso i criteri:

1. è semplice?
    
2. è stabile?
    
3. è naturale per il dominio?
    
4. evita chiavi composte inutili?
    
5. è coerente con ISA/generalizzazioni?
    
6. semplifica la traduzione relazionale?
    
7. è quello che la docente probabilmente vuole propagare come chiave primaria?
    

---

## Passo 5: controllo le cardinalità

Ogni cardinalità può generare informazioni sugli identificatori.

Se vedo:

```text
E -- R
(1,1)
```

mi chiedo:

```text
E identifica R?
```

Se vedo:

```text
E identificata tramite R
```

mi chiedo:

```text
gli altri ruoli di R identificano R?
```

---

## Passo 6: controllo ISA e generalizzazioni

Per ogni ISA:

```text
E ISA F
```

dopo la ristrutturazione avrò:

```text
E -- ISA-E-F -- F
```

con:

```text
E: (1,1)
F: (0,1)
```

e aggiungo a `E` un identificatore esterno tramite `F`.

Quindi nell’analisi scriverò sempre:

```text
Entità E:
- identificatori propri: ...
- identificatore esterno tramite ISA-E-F: ...
- identificatore principale scelto: ...
- motivo della scelta: ...
```

---

# 13. La domanda chiave per riconoscere l’identificatore principale

Quando guardi uno schema E/R ristrutturato e vedi un identificatore principale, devi porti questa domanda:

> quale identificatore conviene far diventare chiave primaria nella tabella relazionale?

Questo è il collegamento con la progettazione logica.

Il doppio cerchio attorno al pallino non sta dicendo solo:

```text
questo identifica
```

sta dicendo:

```text
questo è l’identificatore scelto come riferimento principale per la traduzione relazionale
```

Gli altri identificatori rimangono vincoli di unicità, ma non diventano la chiave primaria principale.

Esempio:

```text
Studente
- Matricola
- CF
```

Se scelgo `Matricola` come identificatore principale:

```text
Studente(Matricola, CF, ...)
```

con `CF` eventualmente UNIQUE.

Se scelgo `CF` come identificatore principale:

```text
Studente(CF, Matricola, ...)
```

con `Matricola` eventualmente UNIQUE.

La differenza non è semantica soltanto: cambia anche il modo in cui altre tabelle faranno riferimento a `Studente`.

---

# 14. Come lavoreremo da qui in poi

Per ogni slide/esercizio che mi mandi, userò sempre questa struttura:

```text
1. Lettura del testo
2. Entità individuate
3. Relazioni individuate
4. Cardinalità
5. Identificatori possibili di ogni entità
6. Identificatori esterni
7. ISA/generalizzazioni
8. Scelta dell’identificatore principale
9. Perché gli altri identificatori non sono principali
10. Conseguenze sulla traduzione relazionale
```

Quindi, per esempio, quando comparirà uno schema con `Persona`, `Studente`, `Docente`, `Esame`, `Corso`, ecc., non dirò semplicemente “Studente ha Matricola come chiave”. Dirò:

```text
Studente ha almeno due identificatori candidati:
- Matricola, identificatore interno;
- identificatore esterno tramite Persona, se deriva da ISA.

La docente sceglie Matricola come principale perché è un identificatore proprio, semplice e tipico del dominio universitario. L’identificatore tramite Persona resta valido, ma non viene scelto come principale perché renderebbe la chiave primaria dipendente dalla super-entità e potrebbe non essere il riferimento più naturale nelle relazioni universitarie.
```

Oppure, se la docente sceglie l’identificatore esterno:

```text
La docente sceglie l’identificatore tramite Persona perché, dopo l’eliminazione della ISA, vuole mantenere la stessa identità logica tra la persona e la sottoclasse. Questa scelta facilita la traduzione relazionale delle ISA, perché la chiave della sottoclasse coincide con la chiave della superclasse.
```

Questa è esattamente la logica da imparare per l’orale e per gli esercizi.

Perfetto: questo secondo PDF è **centrale** per il tuo obiettivo, perché contiene proprio la parte sulla **scelta degli identificatori principali** e due esercizi completi di ristrutturazione. Lo useremo come farebbe un docente all’orale: non “cosa c’è scritto”, ma **perché la soluzione è fatta così**.

Partiamo dalla regola più importante.

# 1. Che cos’è davvero l’identificatore principale

Ogni entità e ogni relazione possono avere più identificatori. Però, alla fine della ristrutturazione, la docente vuole che ognuna abbia **un solo identificatore principale**.

Un identificatore principale non è semplicemente “uno qualsiasi che identifica”. È quello che verrà usato come riferimento privilegiato nella traduzione relazionale, cioè quello che tendenzialmente diventerà la **chiave primaria** della tabella.

La docente dà criteri molto precisi:

1. deve essere **essenziale**;
    
2. deve essere il più possibile **semplice**;
    
3. deve essere utile nelle operazioni frequenti;
    
4. per le entità, si preferiscono gli **identificatori interni**;
    
5. tra gli identificatori esterni, si privilegiano quelli derivanti dall’eliminazione di ISA;
    
6. bisogna evitare cicli di identificazione esterna;
    
7. se non c’è un buon identificatore, si introduce un codice artificiale.
    

La parola più importante qui è **essenziale**.

Un identificatore è essenziale se non contiene pezzi inutili. Per esempio:

```text
Studente: Matricola
```

è essenziale se la matricola identifica già da sola lo studente.

Invece:

```text
Studente: Matricola + CodiceFiscale
```

non è essenziale, perché se `Matricola` identifica già lo studente, aggiungere `CodiceFiscale` è inutile.

Questa regola spiega molte scelte negli esercizi: quando nella soluzione compare la nota **“non essenziale”**, la docente sta dicendo che quell’insieme identifica sì, ma contiene elementi superflui, quindi non può essere scelto come identificatore principale.

---

# 2. La regola pratica per scegliere l’identificatore principale

Quando sei davanti a uno schema, non devi partire dal doppio cerchio. Devi ragionare così:

```text
Per questa entità, quali sono tutti gli identificatori possibili?
Tra questi, quali sono essenziali?
Tra quelli essenziali, quale è più semplice?
Tra quelli semplici, quale è più naturale o più usato?
Se c’è ISA, conviene usare l’identificatore esterno verso la super-entità?
Se scelgo questo identificatore, creo un ciclo di identificazione esterna?
```

Solo alla fine scegli il principale.

Quindi all’esame devi saper dire una frase del tipo:

> L’identificatore principale scelto è questo perché è essenziale, semplice e interno. L’altro identificatore esiste, ma non è stato scelto perché è esterno oppure composto oppure non essenziale oppure causerebbe un ciclo.

Questa è esattamente la forma di risposta da orale.

---

# 3. Cicli di identificazione esterna

Questa parte è fondamentale.

Un ciclo di identificazione esterna nasce quando due o più entità si identificano “a catena” l’una tramite l’altra.

Esempio concettuale:

```text
E1 identificata tramite E2
E2 identificata tramite E3
E3 identificata tramite E1
```

Qui nessuna entità ha un’identità autonoma: per identificare E1 devo conoscere E2, per E2 devo conoscere E3, per E3 devo tornare a E1. È un circolo vizioso.

La docente costruisce il **grafo degli identificatori principali esterni**:

- ogni entità è un nodo;
    
- c’è un arco da una entità all’altra quando l’identificazione principale esterna passa attraverso quella relazione;
    
- se il grafo contiene un ciclo, la scelta è sbagliata.
    

La soluzione pratica è:

> bisogna spezzare il ciclo scegliendo per almeno una entità un identificatore principale diverso.

Se non esiste un identificatore alternativo buono, si introduce un codice.

Questo è il motivo per cui nelle slide compare un esempio in cui viene introdotto `Codice` come identificatore principale di `E1`: non perché il codice fosse semanticamente interessante, ma perché serviva a spezzare un ciclo di identificazione esterna.

Regola da ricordare:

> un identificatore esterno può essere corretto localmente, ma sbagliato globalmente se crea un ciclo.

---

# 4. Identificatori principali delle relazioni

Per le relazioni la docente distingue tre casi.

## Caso 1: la relazione partecipa a un identificatore principale esterno di un’entità

Se una relazione `R` serve già a identificare principalmente un’entità `E`, allora l’identificatore principale di `R` è già implicitamente determinato.

In pratica, non devi fare una scelta separata per `R`.

Esempio intuitivo:

```text
Comune identificato da Nome + Provincia tramite relazione InProvincia
```

La relazione `InProvincia` entra nell’identificatore principale di `Comune`. Quindi la traduzione terrà già conto di quella relazione quando costruirà la chiave della tabella `Comune`.

---

## Caso 2: la relazione non ha identificatori espliciti

Se una relazione non partecipa a identificatori esterni e non ha identificatori indicati, allora il suo identificatore principale è quello **implicito**, cioè formato da tutti i ruoli.

Esempio:

```text
Studente -- Sostiene -- Esame
```

Se non ci sono altri vincoli, l’identificatore implicito è:

```text
Studente + Esame
```

o più precisamente, le chiavi principali delle entità partecipanti.

In questo caso spesso non serve disegnarlo, perché è sottinteso.

---

## Caso 3: la relazione ha identificatori espliciti diversi da quello implicito

Qui bisogna scegliere.

E se la docente sceglie l’identificatore implicito come principale, allora deve indicarlo esplicitamente nel diagramma, perché altrimenti l’unico identificatore disegnato verrebbe interpretato come principale.

Questo è esattamente ciò che succede nell’esempio con `Svolge`.

La relazione `Svolge` ha un identificatore esplicito:

```text
Anno + Filiale
```

ma la docente sceglie come principale l’identificatore implicito:

```text
Filiale + Progetto
```

Perché? Perché nel testo della slide dice che le operazioni usano principalmente la combinazione di **filiale e numero di progetto** per accedere alle informazioni sullo svolgimento dei progetti. Quindi la scelta non è solo teorica: tiene conto anche dell’uso applicativo.

---

# 5. Esercizio 1 — Analisi dello schema iniziale

Lo schema contiene queste entità:

```text
Volo
VoloCharter
Aeroporto
Compagnia
Sede
Città
```

e dopo la ristrutturazione compare anche:

```text
Telefono
```

perché `Telefono` era un attributo multivalore della relazione `Sede`.

Le relazioni principali sono:

```text
ArrPart
Tappa
Della
Luogo
Sede
```

e nella soluzione compaiono nuove relazioni:

```text
ISA-VC-V
C-S
S-C
TelSede
```

---

## 5.1 Volo

Nello schema iniziale `Volo` ha:

```text
Codice
Durata
```

`Codice` è identificatore interno di `Volo`.

Nella soluzione, `Codice` resta l’identificatore principale di `Volo`.

Perché?

Perché è:

- interno;
    
- semplice;
    
- essenziale;
    
- naturale;
    
- non dipende da altre entità.
    

`Volo` partecipa anche a relazioni come `ArrPart` e `Della`, ma non ha bisogno di essere identificato esternamente tramite esse. Quindi la docente sceglie l’attributo interno `Codice`.

Nota importante: `Volo` partecipa a `ArrPart` con cardinalità `(1,1)`. Questo implica che il ruolo `Volo` identifica la relazione `ArrPart`. Però questo è un identificatore della relazione, non dell’entità `Volo`.

---

## 5.2 VoloCharter

Nel modello iniziale `VoloCharter` è una sottoentità di `Volo`, cioè:

```text
VoloCharter ISA Volo
```

Dopo la ristrutturazione, la ISA viene eliminata e diventa:

```text
VoloCharter -- ISA-VC-V -- Volo
```

con cardinalità:

```text
VoloCharter: (1,1)
Volo:        (0,1)
```

Perché?

Ogni volo charter deve corrispondere a esattamente un volo. Quindi lato `VoloCharter` c’è `(1,1)`.

Un volo generico può essere charter oppure no. Quindi lato `Volo` c’è `(0,1)`.

Ora la parte sugli identificatori.

`VoloCharter` ha l’attributo:

```text
TipoAereo
```

ma `TipoAereo` non identifica un volo charter. Molti voli charter possono usare lo stesso tipo di aereo.

Quindi l’identificatore naturale di `VoloCharter` deriva dalla ISA:

```text
ISA-VC-V + Codice di Volo
```

Nella soluzione la docente privilegia l’identificatore esterno proveniente dall’eliminazione della ISA, come dice la regola generale del PDF.

Quindi:

```text
Identificatore principale di VoloCharter:
relazione ISA-VC-V verso Volo
```

in pratica, nella traduzione relazionale, `VoloCharter` erediterà/propagherà il codice del `Volo`.

Perché non viene scelto `TipoAereo`? Perché non è identificante.

Perché non si introduce un nuovo codice? Perché non serve: l’identificatore tramite `Volo` è perfettamente naturale e deriva dalla ISA.

---

## 5.3 Aeroporto

`Aeroporto` ha:

```text
Codice
Nome
```

Il pallino nero è su `Codice`, quindi `Codice` è identificatore.

Nella soluzione resta identificatore principale.

Perché?

Perché `Codice` è interno, semplice, essenziale e più affidabile di `Nome`. Due aeroporti potrebbero avere nomi simili o lo stesso nome commerciale in contesti diversi, mentre un codice aeroportuale è pensato proprio per identificare.

`Aeroporto` partecipa a:

```text
ArrPart
Tappa
Luogo
```

ma nessuna di queste relazioni è necessaria per identificarlo.

---

## 5.4 Città

`Città` ha:

```text
Nazione
Nome
NumAbit
```

Dallo schema si vede che l’identificatore è composto:

```text
Nazione + Nome
```

`NumAbit` non identifica la città: molte città possono avere lo stesso numero di abitanti.

Quindi:

```text
Identificatore principale di Città:
Nazione + Nome
```

Perché è composto? Perché il nome della città da solo non basta: possono esistere città con lo stesso nome in nazioni diverse.

Esempio intuitivo:

```text
Roma, Italia
Roma, Stati Uniti
```

Quindi `Nome` da solo non è essenzialemente identificante. Serve anche `Nazione`.

---

## 5.5 Compagnia

`Compagnia` ha:

```text
Nome
Anno
```

Il pallino nero è su `Nome`, quindi `Nome` è identificatore principale.

Perché non `Anno`?

Perché l’anno non identifica una compagnia: molte compagnie possono essere state fondate nello stesso anno.

Perché non `Nome + Anno`?

Perché se `Nome` identifica già da solo, allora `Nome + Anno` non sarebbe essenziale.

Questa è esattamente la regola di essenzialità.

---

## 5.6 Sede

Questa è la parte più interessante dell’esercizio 1.

Nel testo iniziale `Sede` non è un’entità autonoma. È una relazione tra:

```text
Compagnia
Città
```

con attributo multivalore:

```text
Telefono (1,n)
```

Poiché un attributo multivalore di relazione non è traducibile direttamente, la docente deve prima trasformare la relazione `Sede` in entità.

Quindi nella soluzione compare l’entità:

```text
Sede
```

e la vecchia relazione viene spezzata in:

```text
Compagnia -- C-S -- Sede
Sede -- S-C -- Città
Sede -- TelSede -- Telefono
```

Questa è una reificazione: la relazione `Sede` diventa un oggetto autonomo.

### Identificatori di Sede

La nuova entità `Sede` viene identificata esternamente tramite:

```text
Compagnia + Città
```

Più precisamente:

```text
C-S verso Compagnia
S-C verso Città
```

Quindi l’identificatore di `Sede` contiene:

```text
Nome della Compagnia
+
Nazione, Nome della Città
```

Questo deriva dal fatto che una sede è una sede di una certa compagnia in una certa città.

Nella soluzione compare una nota rosa:

```text
non "essenziale"
```

Questa nota è molto importante.

Vuol dire che un certo identificatore disegnato o derivabile contiene più elementi del necessario. La docente sta richiamando la regola della slide 37: un identificatore principale deve essere essenziale.

Nel caso di `Sede`, bisogna stare attenti a non prendere come identificatore principale qualcosa che include anche elementi ridondanti, per esempio includere sia la relazione verso `Compagnia`, sia una relazione che già la determina indirettamente.

La scelta corretta deve essere il più possibile minimale.

---

## 5.7 Telefono

`Telefono` viene introdotto perché il telefono era multivalore.

La nuova entità ha:

```text
Numero
```

`Numero` è identificatore principale di `Telefono`.

Perché?

Perché il vincolo esterno dice:

> un numero di telefono è di una sola sede.

Prima questo era un vincolo esterno. Dopo la ristrutturazione, diventa interno allo schema.

Infatti se `Telefono` è entità identificata da `Numero`, e ogni telefono partecipa a una sola `Sede`, allora il numero non può appartenere a più sedi.

Quindi nella soluzione il vincolo 2 non resta più come vincolo esterno: è stato assorbito dalla struttura dello schema.

Questo è un passaggio molto tipico da esame:

> alcuni vincoli esterni, dopo la ristrutturazione, diventano vincoli interni espressi da cardinalità e identificatori.

---

# 6. Esercizio 1 — Le relazioni una per una

## ArrPart

`ArrPart` collega `Volo` e `Aeroporto`, ma `Aeroporto` compare con due ruoli:

```text
Arrivo
Partenza
```

Quindi semanticamente rappresenta:

```text
un volo ha un aeroporto di partenza e un aeroporto di arrivo
```

`Volo` partecipa con cardinalità `(1,1)`.

Questo implica che:

```text
Volo
```

è identificatore della relazione `ArrPart`.

Perché?

Dato un volo, c’è al massimo una coppia partenza/arrivo associata a quel volo. Quindi non possono esistere due istanze diverse di `ArrPart` con lo stesso `Volo`.

Questa è la regola vista nel PDF precedente: cardinalità massima 1 su un ruolo implica identificatore della relazione su quel ruolo.

---

## Della

`Della` collega:

```text
Volo
Compagnia
```

e indica che un volo è di una compagnia.

`Volo` partecipa con `(1,1)`, quindi ogni volo è della sua compagnia e non può essere di più compagnie.

Di conseguenza, anche qui il ruolo `Volo` identifica la relazione `Della`.

Nella traduzione relazionale, questa relazione tenderà a essere accorpata in `Volo`, perché ogni volo ha una sola compagnia.

---

## Tappa

`Tappa` collega:

```text
VoloCharter
Aeroporto
```

con attributo:

```text
Ordine
```

Il vincolo esterno dice che per ogni volo charter, se ha n tappe, gli ordini devono essere esattamente 1, 2, ..., n.

Quindi il vincolo su `Ordine` non è una semplice chiave: è un vincolo di sequenza.

Identificatori possibili della relazione `Tappa`:

```text
VoloCharter + Aeroporto
```

oppure, se si volesse modellare l’ordine come identificante:

```text
VoloCharter + Ordine
```

Ma attenzione: nelle slide lo schema conserva il vincolo esterno su `Ordine`, quindi la docente non lo banalizza trasformandolo in semplice identificatore.

Il vincolo rimane esterno:

```text
per ogni volo charter, le tappe devono avere ordini 1,...,n
```

Questa è una scelta importante: non tutto è esprimibile comodamente con identificatori e cardinalità.

---

# 7. Esercizio 2 — Analisi dello schema iniziale

Lo schema contiene:

```text
Officina
Riparazione
Veicolo
Persona
Direttore
Dipendente
Terminata
```

e dopo la ristrutturazione viene introdotta anche:

```text
Telefono
```

Le relazioni principali sono:

```text
Dirige
Lavora
Ripara
Relativa
Possiede
```

e dopo la ristrutturazione compaiono:

```text
ISA-Dr-P
ISA-Dp-P
ISA-T-R
TelPer
```

---

# 8. Esercizio 2 — Entità e identificatori

## Officina

`Officina` ha:

```text
Nome
Indirizzo
NumDip
```

Nello schema iniziale il pallino nero è su `Nome`, quindi `Nome` è identificatore.

Nella soluzione `Nome` viene scelto come identificatore principale, indicato con il doppio cerchio.

Perché `Nome`?

Perché è:

- interno;
    
- semplice;
    
- già identificante;
    
- più semplice di eventuali identificatori esterni tramite `Dirige` o `Lavora`.
    

`Indirizzo` non viene scelto perché non è indicato come identificatore e potrebbe non essere unico.

`NumDip` non identifica l’officina: è un dato derivabile dal numero di istanze della relazione `Lavora`.

Infatti resta un vincolo esterno:

```text
vincolo che lega NumDip alle istanze in Lavora
```

Questo vuol dire che `NumDip` è una ridondanza controllata: può essere mantenuta, ma va documentata.

---

## Persona

`Persona` ha:

```text
CodFis
Indirizzo
NumTel (0,n)
```

`CodFis` è identificatore principale.

Perché?

Perché è interno, semplice, essenziale e semanticamente naturale.

`Indirizzo` non identifica una persona.

`NumTel` è multivalore, quindi viene eliminato e trasformato in entità `Telefono` più relazione `TelPer`.

---

## Telefono

`Telefono` viene introdotto per eliminare l’attributo multivalore `NumTel`.

Ha attributo:

```text
Numero
```

`Numero` è identificatore principale.

La relazione:

```text
Persona -- TelPer -- Telefono
```

rappresenta i numeri telefonici delle persone.

La cardinalità lato `Persona` è `(0,n)`, perché una persona può avere zero o più numeri.

Lato `Telefono` nella soluzione è `(1,n)` verso `TelPer`, nel senso che un numero può essere associato ad almeno una persona e potenzialmente più persone, a seconda della semantica scelta nello schema.

---

## Direttore

Nel modello iniziale:

```text
Direttore ISA Persona
```

Dopo la ristrutturazione:

```text
Direttore -- ISA-Dr-P -- Persona
```

con cardinalità:

```text
Direttore: (1,1)
Persona:   (0,1)
```

Ogni direttore è una persona. Una persona può essere direttore oppure no.

`Direttore` ha attributi:

```text
Età
AnniAnz
```

ma nessuno dei due identifica un direttore.

Quindi l’identificatore principale naturale di `Direttore` è esterno, tramite `Persona`:

```text
ISA-Dr-P + CodFis di Persona
```

Perché la docente sceglie questo?

Perché tra gli identificatori esterni bisogna privilegiare quelli provenienti dall’eliminazione della ISA.

La regola è: una sottoclasse, se non ha un identificatore interno migliore, viene identificata tramite la superclasse.

Quindi nella traduzione relazionale `Direttore` avrà come riferimento il `CodFis` della persona corrispondente.

---

## Dipendente

Analogo a `Direttore`.

Nel modello iniziale:

```text
Dipendente ISA Persona
```

Dopo la ristrutturazione:

```text
Dipendente -- ISA-Dp-P -- Persona
```

con:

```text
Dipendente: (1,1)
Persona:    (0,1)
```

`Dipendente` ha:

```text
AnniAnz
```

ma `AnniAnz` non identifica un dipendente.

Quindi l’identificatore principale è esterno tramite `Persona`:

```text
ISA-Dp-P + CodFis di Persona
```

Nella soluzione resta anche un vincolo esterno su `AnniAnz`.

Perché?

Perché `Direttore` e `Dipendente`, essendo entrambe sottoentità di `Persona`, nello schema originario potevano condividere semanticamente l’attributo `AnniAnz`. Dopo l’eliminazione delle ISA, le entità diventano disgiunte; quindi bisogna aggiungere un vincolo esterno per dire che, se una stessa persona corrisponde sia a un direttore sia a un dipendente, i valori coerenti di `AnniAnz` devono essere rispettati.

Questa è esattamente una delle regole della ristrutturazione: dopo aver eliminato ISA/generalizzazioni, eventuali attributi comuni tra entità figlie richiedono vincoli esterni.

---

## Veicolo

`Veicolo` ha:

```text
Targa
Modello
Tipo
AnnoImm
```

`Targa` è identificatore principale.

Perché?

Perché è interno, semplice, essenziale e naturale per i veicoli.

`Modello`, `Tipo`, `AnnoImm` non identificano un veicolo: molti veicoli possono avere stesso modello, tipo e anno.

---

## Riparazione

`Riparazione` ha:

```text
Codice
OraAccettazione
DataAccettazione
```

Nello schema iniziale il codice compare come attributo identificante, ma attenzione: nella soluzione si vede anche che `Riparazione` partecipa con cardinalità `(1,1)` a:

```text
Ripara
Relativa
```

Questo significa che ci sono anche identificatori esterni possibili.

Possibili identificatori di `Riparazione`:

```text
Codice
```

oppure:

```text
Officina + Veicolo + eventualmente dati della riparazione
```

a seconda delle relazioni e dei vincoli.

La docente sceglie `Codice` come identificatore principale.

Perché?

Perché è interno, semplice ed essenziale. Gli identificatori esterni sarebbero più complessi e meno comodi.

Questa è una regola d’esame fortissima:

> se c’è un codice interno semplice e non ambiguo, di solito viene scelto come identificatore principale rispetto a identificatori esterni più lunghi.

---

## Terminata

Nel modello iniziale:

```text
Terminata ISA Riparazione
```

Dopo la ristrutturazione:

```text
Terminata -- ISA-T-R -- Riparazione
```

con:

```text
Terminata:   (1,1)
Riparazione: (0,1)
```

Una riparazione terminata è sempre una riparazione. Una riparazione può non essere ancora terminata.

`Terminata` ha:

```text
OraRiconsegna
DataRiconsegna
```

Questi attributi non identificano una riparazione terminata.

Quindi l’identificatore principale di `Terminata` è esterno tramite `Riparazione`:

```text
ISA-T-R + Codice di Riparazione
```

Perché la docente sceglie questo?

Perché è una sottoentità ottenuta da ISA e non ha un identificatore interno migliore. La regola dice di privilegiare identificatori esterni derivanti dall’eliminazione della ISA.

Resta il vincolo esterno:

```text
riconsegna dopo accettazione
```

perché riguarda il confronto tra data/ora di accettazione della riparazione e data/ora di riconsegna della riparazione terminata.

---

# 9. Esercizio 2 — Relazioni principali

## Dirige

`Dirige` collega:

```text
Officina
Direttore
```

Nello schema ogni officina è diretta da un direttore e ogni direttore dirige un’officina, con cardinalità `(1,1)` da entrambe le parti.

Quindi `Dirige` ha due identificatori possibili:

```text
Officina
Direttore
```

Perché?

Dato un direttore, trovi al massimo una officina diretta.  
Data un’officina, trovi al massimo un direttore.

Nella soluzione il pallino con doppio cerchio indica l’identificatore principale scelto per la relazione.

La scelta si collega alla regola della slide 42:

> sulle relazioni provenienti da ISA si privilegia il ruolo della figlia, ma qui `Dirige` non proviene da ISA; quindi valgono semplicità, uso e coerenza con lo schema.

Dato che entrambe le parti sono `(1,1)`, entrambe sono essenziali. La scelta può dipendere da quale accesso è più frequente: cercare il direttore di un’officina oppure l’officina diretta da un direttore.

---

## Lavora

`Lavora` collega:

```text
Officina
Dipendente
```

con attributo:

```text
AnniServizio
```

Le cardinalità indicano:

```text
Officina:   (1,n)
Dipendente: (1,n)
```

Quindi è una relazione molti-a-molti obbligatoria da entrambi i lati.

L’identificatore implicito è:

```text
Officina + Dipendente
```

Non c’è un ruolo singolo che identifica la relazione, perché un’officina ha molti dipendenti e un dipendente può lavorare in più officine.

Quindi l’identificatore principale di `Lavora` sarà normalmente l’implicito:

```text
NomeOfficina + CodFisDipendente
```

o, più precisamente, le chiavi principali delle entità partecipanti.

---

## Ripara

`Ripara` collega:

```text
Officina
Riparazione
```

Ogni riparazione è fatta in una officina, quindi lato `Riparazione` c’è `(1,1)`.

Questo implica che il ruolo `Riparazione` identifica la relazione `Ripara`.

Dato una riparazione, so qual è la sua officina.

Però non è vero il contrario: un’officina può fare molte riparazioni.

Quindi:

```text
Riparazione
```

è identificatore della relazione `Ripara`.

---

## Relativa

`Relativa` collega:

```text
Riparazione
Veicolo
```

Ogni riparazione è relativa a un veicolo, quindi lato `Riparazione` c’è `(1,1)`.

Anche qui:

```text
Riparazione
```

identifica la relazione `Relativa`.

Dato una riparazione, so quale veicolo riguarda.

Un veicolo, invece, può avere molte riparazioni.

---

## Possiede

`Possiede` collega:

```text
Persona
Veicolo
```

Semanticamente: una persona proprietaria possiede un veicolo.

Dallo schema si vede che `Veicolo` partecipa con `(1,1)`: ogni veicolo ha un proprietario.

Quindi il ruolo `Veicolo` identifica la relazione `Possiede`.

Dato un veicolo, trovo il proprietario.

Una persona può possedere più veicoli, quindi `Persona` da sola non identifica una singola istanza di `Possiede`.

---

# 10. Perché nella soluzione compaiono tante frecce

Le frecce degli identificatori servono a dire da dove passa l’identificazione.

La direzione va letta così:

```text
questa entità/relazione è identificata tramite questo ruolo o questa relazione
```

Negli schemi ristrutturati, le frecce aumentano perché:

1. le ISA sono state trasformate in relazioni;
    
2. gli attributi multivalore sono diventati entità;
    
3. alcune relazioni sono diventate entità;
    
4. gli identificatori esterni devono essere resi espliciti;
    
5. bisogna distinguere identificatori candidati e principali.
    

Quindi non devi interpretare la freccia come “navigazione” o “verso della relazione”. È il verso della **dipendenza identificativa**.

Domanda pratica da farti:

> per riconoscere questa istanza, devo passare da quella relazione?

Se sì, la freccia va verso la relazione/ruolo usato per identificare.

---

# 11. Collegamento con la traduzione relazionale

Dopo la ristrutturazione, la docente passa alla traduzione diretta.

Qui diventa chiaro perché l’identificatore principale era così importante.

La regola generale è:

> l’identificatore principale dell’entità diventa la chiave primaria della relazione corrispondente.

Esempio semplice:

```text
Persona(CodFis, Indirizzo)
```

se `CodFis` è identificatore principale, allora:

```text
Persona(CodFis, Indirizzo)
```

con `CodFis` chiave primaria.

Se invece l’identificatore è esterno, la relazione usata per identificare viene **accorpata** nella tabella dell’entità.

Esempio:

```text
Ditta -- Di -- Città
```

se `Ditta` è identificata anche tramite la città, allora nella tabella `Ditta` entrano gli attributi della chiave primaria di `Città`.

Per questo la scelta dell’identificatore principale non è un dettaglio grafico: determina quali attributi entreranno nella tabella e quali diventeranno chiavi primarie o foreign key.

---

# 12. Regola fondamentale sull’accorpamento

Una ER-relazione viene accorpata nella relazione di un’entità quando partecipa all’identificatore principale esterno di quell’entità.

Esempio:

```text
Ditta -- Di -- Città
```

Se `Di` è parte dell’identificatore principale esterno di `Ditta`, allora non creo una tabella autonoma `Di`.

Creo:

```text
Ditta(Codice, NomeCit, Nazione, AnnoFond)
```

con foreign key:

```text
Ditta[NomeCit, Nazione] ⊆ Città[Nome, Nazione]
```

Quindi la tabella `Ditta` rappresenta sia l’entità `Ditta`, sia la relazione `Di`.

Questo è un passaggio molto importante:

> una relazione E/R non sempre diventa una tabella autonoma; se serve a identificare esternamente un’entità, viene spesso accorpata nella tabella di quell’entità.

---

# 13. ISA nella traduzione relazionale

Dopo aver eliminato una ISA:

```text
Studente -- ISA-S-P -- Persona
```

la traduzione produce:

```text
Persona(CodiceFiscale, Età)

Studente(CodiceFiscale, Matricola)
foreign key: Studente[CodiceFiscale] ⊆ Persona[CodiceFiscale]
chiave: Matricola
```

Questo esempio è interessante perché `Studente` ha due identificatori:

```text
CodiceFiscale tramite Persona
Matricola
```

La docente nell’esempio sceglie:

```text
Matricola
```

come chiave, ma mantiene `CodiceFiscale` come foreign key verso `Persona`.

Perché può scegliere `Matricola`?

Perché è un identificatore interno di `Studente`, semplice e molto naturale nel dominio universitario.

Perché non sceglie `CodiceFiscale`?

Avrebbe potuto, ma in questo esempio la matricola è probabilmente più rilevante per le operazioni sugli studenti.

Questa è una cosa importantissima: la regola “privilegiare ISA” non significa sempre scegliere la chiave della super-entità. Significa che, tra gli identificatori esterni, quelli da ISA sono preferiti. Ma se esiste un buon identificatore interno, spesso può vincere l’identificatore interno.

---

# 14. Generalizzazione non completa

Esempio:

```text
Persona
 /      \
Studente Docente
```

non completa significa:

```text
una Persona può non essere né Studente né Docente
```

Dopo la traduzione:

```text
Persona(CodiceFiscale, Età)

Studente(CodiceFiscale, Matricola)
foreign key: Studente[CodiceFiscale] ⊆ Persona[CodiceFiscale]

Docente(CodiceFiscale, Fascia)
foreign key: Docente[CodiceFiscale] ⊆ Persona[CodiceFiscale]
```

Vincolo di disgiunzione:

```text
Studente[CodiceFiscale] ∩ Docente[CodiceFiscale] = ∅
```

Cioè la stessa persona non può essere sia studente sia docente, se la generalizzazione è disgiunta.

Non c’è invece un vincolo che obbliga ogni persona a comparire in Studente o Docente, perché la generalizzazione non è completa.

---

# 15. Generalizzazione completa

Esempio:

```text
Persona
 /    \
Uomo  Donna
```

completa e disgiunta significa:

```text
ogni Persona è Uomo oppure Donna, ma non entrambe
```

Traduzione:

```text
Persona(CodFiscale, Età)

Uomo(CodFiscale, ServMilitare)
foreign key: Uomo[CodFiscale] ⊆ Persona[CodFiscale]

Donna(CodFiscale, CogNubile)
foreign key: Donna[CodFiscale] ⊆ Persona[CodFiscale]
```

Vincoli:

```text
Uomo[CodFiscale] ∩ Donna[CodFiscale] = ∅
Persona[CodFiscale] ⊆ Uomo[CodFiscale] ∪ Donna[CodFiscale]
```

Il primo vincolo dice: non può essere in entrambe.

Il secondo dice: ogni persona deve stare almeno in una delle due.

---

# 16. Metodo finale da usare negli esercizi

Quando ti trovi davanti a uno schema come quelli delle slide, devi seguire questa scaletta.

Prima fai l’inventario:

```text
Entità
Relazioni
Attributi
Cardinalità
ISA/generalizzazioni
Attributi multivalore
Attributi composti
Vincoli esterni
```

Poi per ogni entità scrivi:

```text
Entità: X
Identificatori interni:
Identificatori esterni:
Identificatori derivati da ISA:
Identificatore principale scelto:
Perché:
Altri identificatori non scelti:
```

Poi per ogni relazione:

```text
Relazione: R
Ruoli:
Cardinalità:
Identificatore implicito:
Identificatori derivati da cardinalità massima 1:
Identificatori espliciti:
Identificatore principale scelto:
Perché:
```

Poi controlli i problemi:

```text
Ci sono identificatori non essenziali?
Ci sono cicli di identificazione esterna?
Ci sono ISA eliminate?
Ci sono generalizzazioni da tradurre in vincoli esterni?
Ci sono attributi multivalore da trasformare in entità?
```

Infine colleghi alla traduzione relazionale:

```text
L’identificatore principale diventerà chiave primaria.
Gli altri identificatori diventeranno vincoli di chiave.
Le relazioni usate per identificare esternamente un’entità verranno accorpate.
Le relazioni non accorpate diventeranno tabelle autonome.
```

La frase chiave da memorizzare è questa:

> scelgo come identificatore principale l’identificatore essenziale più semplice e più utile, preferendo gli interni; se uso un identificatore esterno, controllo che non crei cicli; se deriva da ISA è particolarmente naturale perché conserva l’identità tra sottoclasse e superclasse nella traduzione relazionale.

Da qui in poi, quando mi mandi una singola slide o uno schema, possiamo analizzarlo riga per riga e io ti farò vedere esattamente **perché ogni pallino, ogni doppio cerchio e ogni freccia sono messi lì**.

Perfetto. Questo terzo PDF completa la parte più importante: dalla **traduzione diretta nel modello relazionale** fino ai primi cenni di **ristrutturazione dello schema logico**. Qui non stiamo più solo scegliendo identificatori principali: vediamo **che effetto concreto hanno quelle scelte sulle tabelle, sulle chiavi primarie, sulle foreign key, sulle inclusioni e sui vincoli esterni**.

La cosa da tenere sempre in testa è questa:

> nella ristrutturazione E/R scelgo gli identificatori principali; nella traduzione relazionale quegli identificatori diventano chiavi primarie o determinano accorpamenti.

Quindi questo PDF ti fa vedere “il conto finale” delle scelte fatte prima.

---

# 1. Traduzione delle ER-relazioni: idea generale

Una **ER-relazione** può essere tradotta in due modi:

1. viene **accorpata** dentro una tabella di entità;
    
2. diventa una **tabella autonoma**.
    

La regola è:

> se una ER-relazione partecipa all’identificatore principale esterno di un’entità, viene accorpata nella tabella di quell’entità; altrimenti diventa una relazione dello schema logico, cioè una tabella.

Esempio intuitivo:

```text
Impiegato -- Partecipa -- Progetto
```

Se `Partecipa` non identifica esternamente né `Impiegato` né `Progetto`, allora diventa una tabella:

```text
Partecipa(Cognome, DataN, Progetto, OreSett)
```

dove `Cognome, DataN` sono la chiave primaria dell’impiegato, `Progetto` è la chiave primaria del progetto, e `OreSett` è attributo della relazione.

---

# 2. Caso 1: ER-relazione con solo identificatore implicito

Questo è il caso più semplice.

Schema E/R:

```text
Impiegato -- Partecipa -- Progetto
```

cardinalità:

```text
Impiegato (0,n)
Progetto  (0,n)
```

La relazione `Partecipa` non ha identificatori espliciti. Quindi il suo identificatore principale è quello **implicito**, cioè formato da tutti i ruoli:

```text
Impiegato + Progetto
```

Traduzione:

```text
Impiegato(Cognome, DataN, Stipendio)

Progetto(Nome, Budget)

Partecipa(Cognome, DataN, Progetto, OreSett)
foreign key: Partecipa[Cognome, DataN] ⊆ Impiegato[Cognome, DataN]
foreign key: Partecipa[Progetto] ⊆ Progetto[Nome]
```

La chiave primaria di `Partecipa` è:

```text
Cognome, DataN, Progetto
```

Perché?

Perché una stessa coppia `Impiegato-Progetto` identifica una partecipazione. Se lo stesso impiegato partecipa allo stesso progetto, non voglio due tuple distinte per la stessa partecipazione, a meno che il modello non dica diversamente.

Regola pratica:

> quando una relazione molti-a-molti non ha identificatori espliciti, la tabella corrispondente ha come chiave primaria la combinazione delle chiavi primarie delle entità partecipanti.

---

# 3. Cardinalità minima 1: da dove nasce il vincolo di inclusione

Ora cambia la cardinalità:

```text
Impiegato (1,n)
Progetto  (1,n)
```

Questo significa:

- ogni impiegato partecipa ad almeno un progetto;
    
- ogni progetto ha almeno un impiegato.
    

La tabella resta:

```text
Partecipa(Cognome, DataN, Progetto, OreSett)
```

ma devo aggiungere vincoli di inclusione:

```text
inclusione: Impiegato[Cognome, DataN] ⊆ Partecipa[Cognome, DataN]

inclusione: Progetto[Nome] ⊆ Partecipa[Progetto]
```

Perché?

La foreign key:

```text
Partecipa[Cognome, DataN] ⊆ Impiegato[Cognome, DataN]
```

dice solo:

> ogni partecipazione deve riferirsi a un impiegato esistente.

Ma non dice:

> ogni impiegato deve partecipare ad almeno un progetto.

Per esprimere la partecipazione obbligatoria dell’impiegato alla relazione, serve l’inclusione inversa:

```text
Impiegato[Cognome, DataN] ⊆ Partecipa[Cognome, DataN]
```

Questa è una regola molto importante:

> la cardinalità minima 1 di un’entità verso una relazione diventa un vincolo di inclusione dalla tabella dell’entità verso la tabella della relazione.

Detto in modo orale:

> se ogni istanza dell’entità deve comparire almeno una volta nella relazione E/R, allora ogni chiave dell’entità deve comparire almeno una volta nella tabella che traduce quella relazione.

---

# 4. Caso 2: ER-relazione con identificatore principale non implicito

Ora abbiamo una relazione in cui non si usa più come chiave primaria la combinazione di tutti i ruoli, ma un identificatore più piccolo.

Esempio:

```text
Impiegato -- Lavora -- Progetto
```

con cardinalità:

```text
Impiegato (0,1)
Progetto  (1,n)
```

Se ogni impiegato lavora al massimo a un progetto, allora il ruolo `Impiegato` identifica la relazione `Lavora`.

Perché?

Dato un impiegato, trovo al massimo una istanza di `Lavora`.

Quindi la tabella è:

```text
Lavora(Cognome, DataN, Progetto, Da)
```

ma la chiave primaria è solo:

```text
Cognome, DataN
```

non tutta la coppia `Impiegato + Progetto`.

Questa scelta deriva dalla cardinalità massima 1.

Regola pratica:

> se un ruolo ha cardinalità massima 1, quel ruolo identifica la ER-relazione; quindi nella tabella della relazione la chiave primaria può essere la chiave dell’entità che partecipa in quel ruolo.

Esempio più chiaro:

```text
Direttore -- Dirige -- Progetto
```

con cardinalità:

```text
Direttore (1,1)
Progetto  (1,1)
```

Entrambi i ruoli identificano la relazione, perché:

- dato un direttore, trovo esattamente un progetto diretto;
    
- dato un progetto, trovo esattamente un direttore.
    

La docente nella slide sceglie come chiave:

```text
Cognome, DataN
```

cioè il lato `Direttore`.

Ma avrebbe potuto scegliere anche `Progetto`, se il contesto applicativo lo avesse preferito.

Qui devi dire all’orale:

> esistono due identificatori essenziali della relazione, uno sul ruolo Direttore e uno sul ruolo Progetto. La docente sceglie quello sul ruolo Direttore come identificatore principale; l’altro resta un vincolo di chiave o si riflette tramite foreign key/inclusioni a seconda della traduzione.

---

# 5. Quando un’inclusione diventa una foreign key

Nel PDF compare una regola sottile ma molto utile:

> se un identificatore della relazione è costituito da una sola entità e quell’entità ha anche cardinalità minima 1, il vincolo di inclusione corrispondente diventa in realtà una foreign key.

Vediamolo piano.

Se ho:

```text
Impiegato -- Lavora -- Progetto
Impiegato (1,1)
```

allora:

1. ogni impiegato partecipa almeno una volta a `Lavora`;
    
2. ogni impiegato partecipa al massimo una volta a `Lavora`.
    

Quindi ogni impiegato compare **esattamente una volta** nella tabella `Lavora`.

Traduzione:

```text
Impiegato(Cognome, DataN, Stipendio)
foreign key: Impiegato[Cognome, DataN] ⊆ Lavora[Cognome, DataN]

Lavora(Cognome, DataN, Progetto, Da)
foreign key: Lavora[Cognome, DataN] ⊆ Impiegato[Cognome, DataN]
```

Qui hai foreign key in entrambe le direzioni.

Perché?

- `Lavora → Impiegato` dice che ogni lavoro riguarda un impiegato esistente.
    
- `Impiegato → Lavora` dice che ogni impiegato deve comparire in `Lavora`.
    
- siccome `Cognome, DataN` è chiave di `Lavora`, l’inclusione da `Impiegato` a `Lavora` può essere trattata come foreign key verso una chiave.
    

Metodo d’esame:

> se la partecipazione è `(1,1)`, spesso avrai sia funzionalità sia obbligatorietà: quindi chiave sulla relazione e inclusione/foreign key dall’entità alla relazione.

---

# 6. Traduzione di una ER-relazione derivante da ISA

Questa parte è molto importante perché collega direttamente il tuo obiettivo sugli identificatori principali.

Schema:

```text
Studente -- ISA-S-P -- Persona
```

dove:

```text
Studente(Matricola, MediaVoti)
Persona(Cognome, DataN, Indirizzo)
```

Cardinalità:

```text
Studente (1,1)
Persona  (0,1)
```

Questa relazione `ISA-S-P` deriva dall’eliminazione di una ISA.

Ora, se l’identificatore principale di `Studente` **non** è quello esterno tramite `Persona`, ma è `Matricola`, allora la relazione `ISA-S-P` non viene accorpata in `Studente`.

Quindi diventa una tabella autonoma:

```text
ISA-S-P(Matricola, Cognome, DataN)
foreign key: ISA-S-P[Cognome, DataN] ⊆ Persona[Cognome, DataN]
foreign key: ISA-S-P[Matricola] ⊆ Studente[Matricola]
chiave: Cognome, DataN
```

e poi:

```text
Studente(Matricola, MediaVoti)
foreign key: Studente[Matricola] ⊆ ISA-S-P[Matricola]

Persona(Cognome, DataN, Indirizzo)
```

Qui c’è una cosa fondamentale.

`ISA-S-P` ha due identificatori:

```text
Matricola
Cognome + DataN
```

Perché?

Dato uno studente, c’è esattamente una persona corrispondente.  
Data una persona, c’è al massimo uno studente corrispondente.

La docente sceglie come chiave della relazione `ISA-S-P`:

```text
Cognome, DataN
```

Perché sulle relazioni derivanti da ISA, nella scelta dell’identificatore principale della relazione si privilegia il ruolo corrispondente all’entità figlia **solo se stiamo scegliendo per la relazione?**

Qui attenzione: la slide dice che la relazione derivante da ISA non è stata accorpata perché l’identificatore principale della figlia non è quello esterno. Quindi si deve tradurre la relazione ISA come relazione autonoma e tener conto del suo identificatore principale indicato.

In questo esempio, la chiave indicata per `ISA-S-P` è `Cognome, DataN`, cioè il lato `Persona`.

Perché è sensato?

Perché la cardinalità lato `Persona` è `(0,1)`: una persona può essere associata al massimo a uno studente. Quindi `Persona` identifica l’istanza della relazione ISA. Se una certa persona è studente, c’è una sola tupla ISA corrispondente.

Ma serve anche:

```text
foreign key: Studente[Matricola] ⊆ ISA-S-P[Matricola]
```

Perché ogni studente deve partecipare alla ISA. Cioè ogni studente deve avere una persona corrispondente.

Regola pratica:

> se una ISA eliminata non viene accorpata nella tabella della figlia, allora la relazione ISA diventa tabella autonoma e devi tradurre entrambe le cardinalità: foreign key dalla ISA verso padre e figlia, più vincoli dall’entità obbligatoria verso la tabella ISA.

---

# 7. Identificatore esterno non principale: il vincolo di join

Questa è una delle parti più delicate del PDF.

Supponiamo:

```text
Studente -- Iscritto -- Università
```

con:

```text
Studente(CodFis, Matricola)
Università(Codice, AnnoFond)
Iscritto(Data)
```

La slide dice che un vincolo di identificazione esterna **non principale** diventa un vincolo esterno “di join”.

Cosa significa?

Supponiamo che `Studente` abbia identificatore principale:

```text
CodFis
```

ma abbia anche un altro identificatore esterno:

```text
Matricola + Università
```

Il problema è che `Matricola` sta nella tabella `Studente`, mentre `Università` sta nella tabella `Iscritto`.

Traduzione:

```text
Studente(CodFis, Matricola)

Iscritto(Studente, Università, Data)
foreign key: Iscritto[Studente] ⊆ Studente[CodFis]
foreign key: Iscritto[Università] ⊆ Università[Codice]

Università(Codice, AnnoFond)
```

L’identificatore esterno non principale dice:

> la coppia Matricola + Università identifica lo studente.

Ma questi due attributi non stanno nella stessa tabella.

Quindi il vincolo non è una semplice chiave su una singola tabella. Bisogna formularlo sul join tra `Studente` e `Iscritto`.

La docente lo esprime così:

```text
nell’equi-join tra Studente e Iscritto sugli attributi CodFis e Studente,
gli attributi Matricola e Università formano una chiave
```

Metodo d’esame:

> se un identificatore esterno non è principale, non viene usato per accorpare la relazione nell’entità; quindi può restare “spezzato” su più tabelle e deve essere tradotto come vincolo esterno sul join.

Questa è una frase da orale ottima.

---

# 8. Traduzione dei vincoli: riassunto operativo

La docente elenca i vincoli più importanti. Te li riscrivo come metodo.

## Attributo obbligatorio

Cardinalità `(1,1)`:

```text
attributo NOT NULL
```

## Attributo opzionale

Cardinalità `(0,1)`:

```text
attributo con *
```

cioè può essere nullo.

## Attributo composto opzionale

Se hai appiattito:

```text
DataMatr = Giorno, Mese, Anno
```

e la data era opzionale, devi aggiungere:

```text
Giorno è NULL se e solo se Mese è NULL se e solo se Anno è NULL
```

## Identificatore principale

Diventa:

```text
chiave primaria
```

## Identificatore non principale

Diventa:

```text
vincolo di chiave non primaria
```

## Cardinalità minima 1

Diventa:

```text
vincolo di inclusione
```

dalla tabella dell’entità verso la tabella della relazione.

## Cardinalità massima 1

Diventa:

```text
vincolo di chiave
```

sulla tabella della relazione.

## ISA/generalizzazione

Diventa:

```text
foreign key + vincoli insiemistici
```

Per esempio:

```text
Uomo[CodFiscale] ∩ Donna[CodFiscale] = ∅
Persona[CodFiscale] ⊆ Uomo[CodFiscale] ∪ Donna[CodFiscale]
```

se la generalizzazione è completa e disgiunta.

---

# 9. Esercizio 3: traduzione dello schema voli

Questo esercizio traduce lo schema ristrutturato che avevamo già visto nell’esercizio 1.

La cosa importante è che ora devi guardare ogni tabella e chiederti:

> da quale entità o relazione E/R deriva?  
> perché ha questa chiave?  
> perché ci sono queste foreign key?  
> perché alcune relazioni sono accorpate e altre no?

---

## 9.1 Volo

Soluzione:

```text
Volo(Codice, Comp, Durata)
foreign key: Volo[Comp] ⊆ Compagnia[Nome]
foreign key: Volo[Codice, Comp] ⊆ ArrPart[Codice, Comp]
```

Perché `Volo` contiene `Comp`?

Perché la relazione `Della` collega `Volo` a `Compagnia` e `Volo` partecipa con cardinalità `(1,1)`. Quindi ogni volo è di una compagnia. La relazione `Della` viene accorpata in `Volo`.

La chiave di `Volo` non è solo `Codice`, ma:

```text
Codice, Comp
```

Questo è importante: nello schema ristrutturato la presenza del legame con `Compagnia` entra nell’identificazione effettiva di `Volo`.

Quindi, anche se intuitivamente penseresti “il volo ha Codice”, nella soluzione relazionale la tabella è:

```text
Volo(Codice, Comp, Durata)
```

e viene usata la coppia `Codice, Comp` nei riferimenti.

La foreign key:

```text
Volo[Comp] ⊆ Compagnia[Nome]
```

è semplice: ogni compagnia citata in `Volo` deve esistere in `Compagnia`.

La foreign key:

```text
Volo[Codice, Comp] ⊆ ArrPart[Codice, Comp]
```

deriva da un identificatore esterno non principale di `Volo` collegato ad `ArrPart`. La slide nota che qui non serve un vincolo di join perché gli attributi rilevanti si trovano già nella relazione `ArrPart`.

---

## 9.2 ArrPart

Soluzione:

```text
ArrPart(Codice, Comp, Arrivo, Partenza)
foreign key: ArrPart[Arrivo] ⊆ Aeroporto[Codice]
foreign key: ArrPart[Partenza] ⊆ Aeroporto[Codice]
foreign key: ArrPart[Codice, Comp] ⊆ Volo[Codice, Comp]
chiave: Comp, Arrivo, Partenza
```

`ArrPart` è una relazione E/R tra:

```text
Volo
Aeroporto come Arrivo
Aeroporto come Partenza
```

Perché `Arrivo` e `Partenza` sono due foreign key verso `Aeroporto[Codice]`?

Perché sono due ruoli diversi della stessa entità `Aeroporto`.

Metodo da ricordare:

> quando la stessa entità partecipa più volte a una relazione con ruoli diversi, nella tabella uso nomi di attributo diversi, tipicamente i nomi dei ruoli.

Quindi non scrivo due volte `CodiceAeroporto`, ma:

```text
Arrivo
Partenza
```

Perché la chiave è:

```text
Comp, Arrivo, Partenza
```

Qui la docente sta usando l’identificatore principale scelto per la relazione `ArrPart`.

Gli altri identificatori possibili sono:

```text
Codice, Comp
```

perché dato un volo si ha una sola coppia arrivo-partenza.

Ma nella soluzione la chiave indicata è:

```text
Comp, Arrivo, Partenza
```

Quindi la docente sta scegliendo come identificatore principale quello basato sulla combinazione compagnia + aeroporti. L’altro identificatore resta rappresentato dalla foreign key reciproca con `Volo`.

Da orale devi dire:

> `ArrPart` ha più identificatori candidati. Uno deriva dal fatto che ogni volo ha una sola relazione di partenza/arrivo; un altro è quello indicato dalla docente come principale, cioè `Comp, Arrivo, Partenza`. La scelta determina la chiave primaria della tabella `ArrPart`. Gli altri identificatori devono comunque essere preservati tramite vincoli di chiave o foreign key/inclusioni.

---

## 9.3 VoloCharter

Soluzione:

```text
VoloCharter(Codice, Comp, TipoAereo)
foreign key: VoloCharter[Codice, Comp] ⊆ Volo[Codice, Comp]
```

`VoloCharter` deriva da una ISA eliminata:

```text
VoloCharter -- ISA-VC-V -- Volo
```

L’identificatore principale di `VoloCharter` è esterno tramite `Volo`, quindi la relazione ISA viene accorpata in `VoloCharter`.

Per questo `VoloCharter` contiene:

```text
Codice, Comp
```

cioè la chiave del volo corrispondente.

Questa è la regola:

> se l’identificatore principale della figlia è quello esterno derivante dalla ISA, la relazione ISA viene accorpata nella tabella della figlia.

`TipoAereo` non è chiave: è solo attributo descrittivo.

---

## 9.4 Aeroporto e LuogoAeroporto

Soluzione:

```text
Aeroporto(Codice, Nome)
foreign key: Aeroporto[Codice] ⊆ LuogoAeroporto[Aeroporto]

LuogoAeroporto(Aeroporto, NomeCittà, NazCittà)
foreign key: LuogoAeroporto[Aeroporto] ⊆ Aeroporto[Codice]
foreign key: LuogoAeroporto[NomeCittà, NazCittà] ⊆ Città[Nome, Nazione]
```

`Luogo` è una relazione tra:

```text
Aeroporto
Città
```

con cardinalità `(1,1)` dal lato aeroporto: ogni aeroporto è localizzato in una città.

Quindi `Luogo` diventa tabella `LuogoAeroporto`, o viene comunque rappresentata separatamente perché ha un ruolo importante nella struttura degli identificatori/vincoli.

Le due foreign key opposte:

```text
Aeroporto[Codice] ⊆ LuogoAeroporto[Aeroporto]
LuogoAeroporto[Aeroporto] ⊆ Aeroporto[Codice]
```

dicono insieme:

> ogni aeroporto compare esattamente una volta in LuogoAeroporto.

Questa è la traduzione della cardinalità `(1,1)`.

La foreign key:

```text
LuogoAeroporto[NomeCittà, NazCittà] ⊆ Città[Nome, Nazione]
```

serve perché la città è identificata dalla coppia `Nome, Nazione`.

---

## 9.5 Città

Soluzione:

```text
Città(Nome, Nazione, NumAbitanti)
```

Identificatore principale:

```text
Nome, Nazione
```

Perché?

Perché `Nome` da solo non basta; città con lo stesso nome possono esistere in nazioni diverse.

`NumAbitanti` è descrittivo.

---

## 9.6 Compagnia e Sede

Soluzione:

```text
Compagnia(Nome, AnnoFond)
foreign key: Compagnia[Nome] ⊆ Sede[Comp]

Sede(Comp)
foreign key: Sede[Comp] ⊆ Compagnia[Nome]
foreign key: Sede[Comp] ⊆ CittàSede[Comp]
inclusione: Sede[Comp] ⊆ TelefonoComp[Comp]
```

Qui devi ricordare la ristrutturazione precedente: `Sede` era stata trasformata in entità perché la relazione originaria aveva un attributo multivalore `Telefono`.

La tabella `Sede` ha solo:

```text
Comp
```

Questo può sembrare strano, ma deriva dalla scelta degli identificatori nella soluzione: la sede viene identificata principalmente tramite la compagnia.

La foreign key reciproca:

```text
Compagnia[Nome] ⊆ Sede[Comp]
Sede[Comp] ⊆ Compagnia[Nome]
```

dice che la corrispondenza tra compagnia e sede, rispetto a quel vincolo, è obbligatoria e identificante.

Attenzione: questa è una delle parti dove la soluzione della docente è molto “metodologica”: non sta cercando lo schema più intuitivo per un database reale, ma sta applicando rigidamente le scelte di identificazione dello schema ristrutturato.

---

## 9.7 CittàSede

Soluzione:

```text
CittàSede(Comp, NomeCittà, NazCittà)
foreign key: CittàSede[Comp] ⊆ Sede[Comp]
foreign key: CittàSede[NomeCittà, NazCittà] ⊆ Città[Nome, Nazione]
```

Questa tabella rappresenta la relazione tra sede e città.

Poiché `Città` ha chiave composta:

```text
Nome, Nazione
```

nella relazione compaiono due attributi:

```text
NomeCittà, NazCittà
```

Metodo pratico:

> quando porto dentro una tabella la chiave di un’entità con chiave composta, devo portare tutti gli attributi della chiave, rinominandoli se serve per chiarezza.

---

## 9.8 TelefonoSede e Telefono

Soluzione:

```text
TelefonoSede(Numero, Sede)
foreign key: TelefonoSede[Sede] ⊆ Sede[Comp]
foreign key: TelefonoSede[Numero] ⊆ Telefono[Numero]

Telefono(Numero)
foreign key: Telefono[Numero] ⊆ TelefonoComp[Numero]
```

Qui il PDF sembra contenere un possibile cambio di nome tra `TelefonoSede` e `TelefonoComp`. A livello metodologico, il punto è questo:

- `Telefono` è l’entità introdotta per rappresentare i numeri;
    
- `TelefonoSede` è la relazione che collega numeri e sedi;
    
- `Numero` identifica il telefono.
    

Il vincolo che nel testo iniziale diceva:

> un numero di telefono è di una sola sede

viene espresso tramite identificatori/cardinalità nella struttura tradotta.

---

## 9.9 Tappa

Soluzione:

```text
Tappa(CodVoloCharter, Comp, Aeroporto, Ordine)
foreign key: Tappa[CodVoloCharter, Comp] ⊆ VoloCharter[Codice, Comp]
foreign key: Tappa[Aeroporto] ⊆ Aeroporto[Codice]
```

`Tappa` collega:

```text
VoloCharter
Aeroporto
```

e ha attributo:

```text
Ordine
```

La chiave implicita sarebbe:

```text
CodVoloCharter, Comp, Aeroporto
```

Ma il vincolo importante non è solo identificativo. È il vincolo esterno sull’ordine:

> per ogni volo charter, gli ordini delle tappe devono essere esattamente 1, 2, ..., n.

La docente lo traduce in forma relazionale:

```text
per ogni v in Tappa[CodVoloCharter],
se o1,...,on sono i valori che compaiono nell’attributo Ordine
nelle tuple di Tappa relative a v,
allora per i=1,...,n esiste uno ed un solo oj tale che oj = i.
```

Cioè:

- non devono esserci buchi;
    
- non devono esserci duplicati;
    
- l’ordine deve formare una sequenza da 1 a n per ogni volo charter.
    

Questa è una cosa da esame: non tutti i vincoli diventano chiavi o foreign key. Alcuni restano vincoli esterni.

---

# 10. Esercizio 4: traduzione dello schema officine

Questo esercizio traduce lo schema ristrutturato dell’esercizio 2.

---

## 10.1 Officina

Soluzione:

```text
Officina(Nome, NumDip, Indirizzo)
foreign key: Officina[Nome] ⊆ Dirige[Officina]
inclusione: Officina[Nome] ⊆ Lavora[Officina]
```

Identificatore principale:

```text
Nome
```

Perché?

Era l’identificatore interno scelto nello schema ristrutturato: semplice, essenziale, preferibile a identificatori esterni.

La foreign key:

```text
Officina[Nome] ⊆ Dirige[Officina]
```

deriva dal fatto che ogni officina partecipa obbligatoriamente e funzionalmente a `Dirige`.

Cioè ogni officina deve essere diretta da qualcuno.

L’inclusione:

```text
Officina[Nome] ⊆ Lavora[Officina]
```

deriva dalla cardinalità minima `(1,n)` di `Officina` in `Lavora`: ogni officina deve avere almeno un dipendente che lavora lì.

`NumDip` resta nella tabella, ma è ridondante rispetto a `Lavora`. Per questo resta un vincolo esterno che lega `NumDip` al conteggio delle istanze in `Lavora`.

---

## 10.2 Persona

Soluzione:

```text
Persona(CodFis, Indirizzo)
```

Identificatore principale:

```text
CodFis
```

Perché è interno, semplice, essenziale.

Il telefono non sta più in `Persona` perché l’attributo multivalore `NumTel` è stato trasformato in entità `Telefono` e relazione `TelPer`.

---

## 10.3 Direttore

Soluzione:

```text
Direttore(CodFis, Età, AnniAnz)
foreign key: Direttore[CodFis] ⊆ Persona[CodFis]
foreign key: Direttore[CodFis] ⊆ Dirige[Direttore]
```

`Direttore` deriva da ISA:

```text
Direttore ISA Persona
```

Dopo la ristrutturazione:

```text
Direttore -- ISA-Dr-P -- Persona
```

La ISA è accorpata in `Direttore`, perché l’identificatore principale di `Direttore` è quello esterno tramite `Persona`.

Quindi `Direttore` usa:

```text
CodFis
```

come chiave, che è la chiave della persona corrispondente.

La foreign key:

```text
Direttore[CodFis] ⊆ Persona[CodFis]
```

dice che ogni direttore è una persona.

La foreign key:

```text
Direttore[CodFis] ⊆ Dirige[Direttore]
```

dice che ogni direttore dirige effettivamente un’officina, perché nella relazione `Dirige` il direttore partecipa con cardinalità `(1,1)`.

---

## 10.4 Dipendente

Soluzione:

```text
Dipendente(CodFis, AnniAnz)
foreign key: Dipendente[CodFis] ⊆ Persona[CodFis]
inclusione: Dipendente[CodFis] ⊆ Lavora[Dipendente]
```

Anche `Dipendente` deriva da ISA:

```text
Dipendente ISA Persona
```

Quindi `CodFis` viene propagato da `Persona`.

La foreign key verso `Persona` dice:

> ogni dipendente è una persona.

L’inclusione verso `Lavora` dice:

> ogni dipendente lavora in almeno un’officina.

Perché inclusione e non semplice foreign key?

Perché `Lavora` è una relazione molti-a-molti: `Dipendente` può comparire molte volte. La cardinalità minima 1 si traduce come inclusione da `Dipendente` verso `Lavora`.

---

## 10.5 Dirige

Soluzione:

```text
Dirige(Officina, Direttore)
foreign key: Dirige[Officina] ⊆ Officina[Nome]
foreign key: Dirige[Direttore] ⊆ Direttore[CodFis]
chiave: Direttore
```

Relazione:

```text
Officina -- Dirige -- Direttore
```

Cardinalità:

```text
Officina  (1,1)
Direttore (1,1)
```

Quindi ci sono due identificatori possibili:

```text
Officina
Direttore
```

La docente sceglie:

```text
Direttore
```

come chiave principale.

Perché non `Officina`?

Avrebbe potuto essere scelto, perché anche `Officina` identifica la relazione: ogni officina ha un solo direttore.

Perché allora `Direttore`?

La scelta della docente indica che, in questa soluzione, l’accesso o la semantica privilegiata è:

> dato un direttore, voglio sapere quale officina dirige.

Inoltre `Direttore` è un identificatore semplice, essenziale, e la relazione è uno-a-uno. Quindi entrambe le scelte sarebbero possibili dal punto di vista semantico. La docente ne sceglie una come principale, e l’altra va preservata tramite gli altri vincoli.

Questa è una frase da orale:

> in una relazione 1:1 entrambi i ruoli sono identificatori essenziali della relazione. La scelta dell’identificatore principale è una scelta progettuale; qui la docente sceglie `Direttore`, probabilmente perché è il ruolo più rilevante per l’accesso alla relazione o perché coerente con le scelte dello schema ristrutturato.

---

## 10.6 Lavora

Soluzione:

```text
Lavora(Officina, Dipendente, AnniServizio)
foreign key: Lavora[Officina] ⊆ Officina[Nome]
foreign key: Lavora[Dipendente] ⊆ Dipendente[CodFis]
```

Relazione molti-a-molti:

```text
Officina (1,n)
Dipendente (1,n)
```

Identificatore principale implicito:

```text
Officina + Dipendente
```

`AnniServizio` è attributo della relazione.

Le partecipazioni obbligatorie sono tradotte altrove:

```text
Officina[Nome] ⊆ Lavora[Officina]
Dipendente[CodFis] ⊆ Lavora[Dipendente]
```

cioè ogni officina e ogni dipendente devono comparire in `Lavora`.

---

## 10.7 TelPer e Telefono

Soluzione:

```text
TelPer(CodFis, Telefono)
foreign key: TelPer[CodFis] ⊆ Persona[CodFis]
foreign key: TelPer[Telefono] ⊆ Telefono[Numero]

Telefono(Numero)
inclusione: Telefono[Numero] ⊆ TelPer[Telefono]
```

`Telefono` deriva dall’eliminazione dell’attributo multivalore `NumTel`.

Identificatore principale di `Telefono`:

```text
Numero
```

La relazione `TelPer` collega persona e telefono.

La foreign key da `TelPer` verso `Telefono` dice:

> ogni telefono usato nella relazione deve esistere nella tabella Telefono.

L’inclusione:

```text
Telefono[Numero] ⊆ TelPer[Telefono]
```

dice:

> ogni telefono registrato deve appartenere ad almeno una persona.

Questa inclusione deriva dalla cardinalità minima 1 del telefono nella relazione.

---

## 10.8 Veicolo e Possiede

Soluzione:

```text
Veicolo(Targa, Modello, Tipo, AnnoImm)
foreign key: Veicolo[Targa] ⊆ Possiede[Veicolo]

Possiede(Veicolo, Proprietario)
foreign key: Possiede[Veicolo] ⊆ Veicolo[Targa]
foreign key: Possiede[Proprietario] ⊆ Persona[CodFis]
```

Identificatore principale di `Veicolo`:

```text
Targa
```

La relazione `Possiede` ha cardinalità `(1,1)` dal lato `Veicolo`: ogni veicolo ha un proprietario.

Per questo ci sono vincoli in entrambe le direzioni:

```text
Possiede[Veicolo] ⊆ Veicolo[Targa]
Veicolo[Targa] ⊆ Possiede[Veicolo]
```

Insieme significano:

> ogni tupla di Possiede riguarda un veicolo esistente, e ogni veicolo deve comparire in Possiede.

`Proprietario` è foreign key verso `Persona[CodFis]`.

---

## 10.9 Riparazione

Soluzione:

```text
Riparazione(Codice, Officina, OraAcc, DataAcc)
foreign key: Riparazione[Officina] ⊆ Officina[Nome]
foreign key: Riparazione[Codice, Officina] ⊆ Relativa[Codice, Officina]
```

Identificatore principale:

```text
Codice, Officina
```

Qui devi notare una cosa: nella soluzione non basta `Codice`, ma viene usata la coppia:

```text
Codice + Officina
```

Questo deriva dal fatto che `Riparazione` è collegata a `Officina` tramite `Ripara`, e quella relazione è stata accorpata in `Riparazione`.

Quindi `Riparazione` contiene anche l’officina.

La foreign key:

```text
Riparazione[Officina] ⊆ Officina[Nome]
```

dice che l’officina della riparazione deve esistere.

La foreign key:

```text
Riparazione[Codice, Officina] ⊆ Relativa[Codice, Officina]
```

serve a rappresentare la partecipazione obbligatoria di `Riparazione` alla relazione `Relativa`: ogni riparazione deve essere relativa a un veicolo.

---

## 10.10 Relativa

Soluzione:

```text
Relativa(Codice, Officina, Veicolo)
foreign key: Relativa[Codice, Officina] ⊆ Riparazione[Codice, Officina]
foreign key: Relativa[Veicolo] ⊆ Veicolo[Targa]
```

Relazione:

```text
Riparazione -- Relativa -- Veicolo
```

Ogni riparazione è relativa a un veicolo.

La chiave principale della relazione è:

```text
Codice, Officina
```

perché dato una riparazione, c’è un solo veicolo relativo.

Quindi il ruolo `Riparazione` identifica `Relativa`.

---

## 10.11 Terminata

Soluzione:

```text
Terminata(Codice, Officina, OraRic, DataRic)
foreign key: Terminata[Codice, Officina] ⊆ Riparazione[Codice, Officina]
```

`Terminata` deriva da ISA:

```text
Terminata ISA Riparazione
```

Quindi viene tradotta con la chiave della super-entità:

```text
Codice, Officina
```

La foreign key verso `Riparazione` dice:

> ogni riparazione terminata è una riparazione esistente.

La cardinalità lato `Riparazione` era `(0,1)`, quindi non ogni riparazione deve essere terminata. Perciò non c’è inclusione inversa da `Riparazione` a `Terminata`.

---

# 11. I vincoli esterni dell’esercizio 4

La docente lascia tre vincoli esterni.

## Vincolo 1: riconsegna dopo accettazione

```text
se una riparazione è terminata, allora la data/ora di riconsegna
deve essere successiva alla data/ora di accettazione
```

Formalmente:

```text
se (c,o,oa,da) ∈ Riparazione
e (c,o,or,dr) ∈ Terminata,
allora dr > da oppure dr = da e or > oa
```

Questo non è esprimibile solo con chiavi e foreign key, perché confronta valori temporali tra due tabelle.

---

## Vincolo 2: NumDip coerente con Lavora

`NumDip` in `Officina` deve essere uguale al numero di dipendenti che lavorano in quella officina.

Quindi:

```text
Officina.NumDip = COUNT(Lavora.Dipendente)
```

per ciascuna officina.

Questo è un vincolo di ridondanza: `NumDip` è derivabile, ma mantenuto nello schema.

---

## Vincolo 3: AnniAnz coerente tra Direttore e Dipendente

Se una stessa persona è sia direttore sia dipendente, il valore di `AnniAnz` deve coincidere.

Formalmente:

```text
se Direttore.CodFis = Dipendente.CodFis,
allora Direttore.AnniAnz = Dipendente.AnniAnz
```

Questo vincolo nasce dall’eliminazione della ISA: dopo la ristrutturazione, `Direttore` e `Dipendente` sono entità disgiunte, ma possono corrispondere alla stessa `Persona`. Quindi serve un vincolo esterno per preservare la semantica originaria degli attributi comuni.

---

# 12. Ristrutturazione dello schema logico: normalizzazione e denormalizzazione

Dopo la traduzione diretta, la docente dice: lo schema ottenuto è corretto e normalizzato, ma potrebbe non essere efficiente per certe operazioni.

Qui entrano le ristrutturazioni logiche.

Ci sono due grandi famiglie:

```text
decomposizione
accorpamento
```

La decomposizione spezza una tabella.

L’accorpamento unisce tabelle.

L’obiettivo non è cambiare il significato dei dati, ma migliorare le prestazioni.

---

# 13. Esempio Cliente-Interesse-Appartamento

Schema concettuale:

```text
Cliente -- Interesse -- Appartamento
```

Traduzione diretta:

```text
Cliente(codice)

Interesse(cliente, appartamento)
foreign key: Interesse[cliente] ⊆ Cliente[codice]
foreign key: Interesse[appartamento] ⊆ Appartamento[codice]

Appartamento(codice, valore)
```

Ora immaginiamo che ogni volta che accedo a `Interesse`, mi serva anche il valore dell’appartamento.

Allora posso denormalizzare:

```text
Interesse(cliente, appartamento, valore)
```

così evito un join con `Appartamento`.

Vantaggio:

```text
query più veloci
```

Svantaggi:

```text
ridondanza
anomalie di aggiornamento
possibile perdita di informazione
```

---

## 13.1 Perché nasce una ridondanza

Se l’appartamento `A2` vale `2000` e interessa a tre clienti, avrò:

```text
C1 A2 2000
C2 A2 2000
C3 A2 2000
```

Il valore `2000` è ripetuto.

Se cambia il valore di `A2`, devo aggiornarlo in tutte le tuple.

Questa è anomalia di aggiornamento.

---

## 13.2 Perdita di informazione

Se elimino il cliente `C2` e alcuni appartamenti interessavano solo a lui, rischio di perdere anche il valore di quegli appartamenti dalla tabella `Interesse`.

La docente nota che bisognerebbe “trasferire” i dati nella tabella `Appartamento`.

Questa è una tipica anomalia da denormalizzazione.

---

## 13.3 Perché la tabella è denormalizzata

La chiave di `Interesse` è:

```text
cliente, appartamento
```

Ma l’attributo:

```text
valore
```

dipende solo da:

```text
appartamento
```

non dall’intera chiave.

Quindi c’è una dipendenza funzionale nascosta:

```text
appartamento → valore
```

dentro una tabella la cui chiave è:

```text
cliente, appartamento
```

La docente dice:

> una tabella è normalizzata se ogni attributo dipende funzionalmente dalla chiave della tabella.

Qui `valore` non dipende dall’intera chiave, ma solo da una parte. Quindi la tabella è denormalizzata.

Da orale puoi dire:

> la denormalizzazione può essere accettata solo se è giustificata dal carico applicativo, cioè se il risparmio sui join frequenti compensa il costo degli aggiornamenti e il rischio di anomalie.

---

# 14. Esercizio 5: ristrutturazione e traduzione

Questo esercizio è astratto, ma molto utile perché concentra il metodo.

Schema iniziale:

```text
E -- R -- F -- Q -- M
```

con attributi:

```text
E: C, A, B
R: D1, D2, D3
F: G, H
M: N, P
Q: ruoli M1, M2 verso M
```

La slide dice:

> alle istanze di R si accede prevalentemente dalle istanze di F.

Questa informazione sul carico applicativo guida la scelta dell’identificatore principale di `R`.

---

## 14.1 Entità

### E

Attributi:

```text
C
A
B
```

Identificatore principale:

```text
C
```

Traduzione:

```text
E(C, A, B)
```

Perché `C`?

Perché nello schema il pallino nero è su `C`: è identificatore interno, semplice, essenziale.

---

### M

Attributi:

```text
N
P
```

Identificatore principale:

```text
N
```

Traduzione:

```text
M(N, P)
```

Perché `N`?

Perché è l’attributo identificante indicato nello schema. `P` è descrittivo.

---

### F

Attributi:

```text
G
H
```

Ma nella traduzione diventa:

```text
F(G, H, M1, M2)
foreign key F[M1] ⊆ M[N]
foreign key F[M2] ⊆ M[N]
```

Perché `F` contiene `M1` e `M2`?

Perché la relazione `Q` tra `F` e `M` viene accorpata in `F`.

Lo schema mostra che `F` partecipa a `Q` con cardinalità `(1,1)`: ogni istanza di `F` è collegata obbligatoriamente a istanze di `M` attraverso i ruoli `M1` e `M2`.

Quindi, quando traduco `F`, porto dentro gli identificatori di `M`.

Dato che `M` ha chiave `N`, ottengo:

```text
M1
M2
```

come attributi di `F`, entrambi foreign key verso `M[N]`.

---

## 14.2 Relazione R

Traduzione:

```text
R(D2, F, D1, E, D3)
chiave: D1, E
foreign key R[E] ⊆ E[C]
foreign key R[F] ⊆ F[M1]
```

Questa parte è la più interessante.

`R` ha attributi:

```text
D1
D2
D3
```

e collega:

```text
E
F
```

Nello schema ristrutturato, l’identificatore principale scelto per `R` è:

```text
D1 + E
```

Perché?

La traccia dice che si accede prevalentemente alle istanze di `R` dalle istanze di `F`.

Quindi la docente deve scegliere un identificatore principale che renda coerente e utile la traduzione rispetto all’accesso tramite `F`.

Ma attenzione: nella tabella finale la chiave è:

```text
D1, E
```

e c’è anche l’attributo:

```text
F
```

con foreign key verso `F[M1]`.

Questo significa che `R` conserva sia il riferimento a `E` sia il riferimento a `F`, ma la chiave primaria scelta è quella derivata dall’identificatore principale della relazione nello schema ristrutturato.

Altri identificatori possibili?

Dallo schema si vede che esistono pallini/frecce anche legati ad altri componenti di `R`, quindi potrebbero esserci identificatori candidati alternativi, per esempio basati su:

```text
F + D2
```

oppure su altri attributi della relazione, a seconda dei vincoli grafici.

La docente però sceglie quello indicato nella soluzione:

```text
D1 + E
```

e lo dichiara nella traduzione:

```text
chiave: D1, E
```

Regola pratica:

> l’identificatore principale scelto nello schema ristrutturato determina direttamente la chiave primaria della tabella che traduce la ER-relazione.

---

## 14.3 Relazione Q

`Q` collega `F` con `M` in due ruoli:

```text
M1
M2
```

Nella traduzione non compare una tabella autonoma `Q`.

Perché?

Perché `Q` è stata accorpata in `F`.

Quindi:

```text
F(G, H, M1, M2)
```

rappresenta sia l’entità `F`, sia la relazione `Q`.

Le foreign key:

```text
F[M1] ⊆ M[N]
F[M2] ⊆ M[N]
```

dicono che entrambi i ruoli puntano a istanze di `M`.

C’è anche:

```text
inclusione: M[N] ⊆ F[M2]
```

Perché?

Perché nel ruolo `M2` la cardinalità minima di `M` verso `Q` è `(1,n)`: ogni istanza di `M` deve partecipare almeno una volta nel ruolo `M2`.

Quindi ogni `M[N]` deve comparire almeno una volta come `F[M2]`.

Questa è la regola della cardinalità minima 1:

> partecipazione obbligatoria dell’entità alla relazione → inclusione dalla tabella dell’entità verso l’attributo della tabella che rappresenta la relazione.

---

# 15. Metodo finale per tradurre uno schema ristrutturato

Da ora in poi, quando hai uno schema ristrutturato, devi procedere così.

## Passo 1: traduci tutte le entità

Per ogni entità `E` scrivi una tabella:

```text
E(...)
```

Dentro metti:

- gli attributi propri;
    
- eventuali attributi derivanti da relazioni accorpate;
    
- chiavi di altre entità se entrano per identificazione esterna.
    

La chiave primaria viene dall’identificatore principale.

---

## Passo 2: decidi quali relazioni E/R diventano tabelle

Per ogni relazione chiediti:

```text
è stata accorpata in qualche entità?
```

Se sì, non creo una tabella autonoma.

Se no, creo:

```text
R(chiavi delle entità partecipanti, attributi propri di R)
```

---

## Passo 3: scegli la chiave della tabella-relazione

La chiave primaria della tabella che traduce una relazione E/R è data dall’identificatore principale della relazione.

Se non c’è identificatore esplicito:

```text
uso quello implicito, cioè tutti i ruoli
```

Se c’è un identificatore derivato da cardinalità massima 1:

```text
posso usare il ruolo con max 1
```

Se ci sono più identificatori:

```text
uso quello scelto come principale nello schema ristrutturato
```

---

## Passo 4: aggiungi le foreign key di ruolo

Ogni volta che una tabella contiene la chiave di un’altra entità, aggiungi:

```text
foreign key verso quella entità
```

Esempio:

```text
Lavora[Dipendente] ⊆ Dipendente[CodFis]
```

---

## Passo 5: traduci le cardinalità minime

Se un’entità partecipa con minimo 1 a una relazione non accorpata, aggiungi:

```text
Entità[chiave] ⊆ Relazione[ruolo]
```

Esempio:

```text
Dipendente[CodFis] ⊆ Lavora[Dipendente]
```

---

## Passo 6: traduci le cardinalità massime

Se un ruolo ha massimo 1, allora nella tabella della relazione quel ruolo diventa chiave o vincolo di chiave.

Esempio:

```text
Dirige(Officina, Direttore)
chiave: Direttore
```

perché ogni direttore dirige al massimo una officina.

---

## Passo 7: traduci ISA e generalizzazioni

Se la ISA è accorpata:

```text
Figlia(chiavePadre, attributiFiglia)
foreign key: Figlia[chiavePadre] ⊆ Padre[chiavePadre]
```

Se non è accorpata:

```text
ISA-Figlia-Padre(chiaveFiglia, chiavePadre)
```

con foreign key verso entrambe.

Per generalizzazioni complete/disgiunte, aggiungi vincoli insiemistici.

---

# 16. La frase più importante da memorizzare

Per collegare tutto il capitolo, tieni questa frase:

> nella ristrutturazione scelgo identificatori principali essenziali, semplici e adatti al carico applicativo; nella traduzione diretta questi identificatori determinano chiavi primarie, accorpamenti e vincoli; nella ristrutturazione logica posso poi modificare lo schema solo per motivi di efficienza, accettando eventualmente denormalizzazioni controllate.

Questa frase riassume esattamente il metodo della docente.