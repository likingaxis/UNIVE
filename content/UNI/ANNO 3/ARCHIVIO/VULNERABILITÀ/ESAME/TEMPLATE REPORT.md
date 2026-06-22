# Template breve report challenge

**Nome e cognome:** Luca Gugliotta  
**Matricola:** 0342634  
**Target:** `<IP_TARGET>`

## 1. Ricognizione iniziale

È stata eseguita una scansione iniziale della macchina target:

```bash
nmap --top-ports 1000 <IP_TARGET>
```

La scansione ha mostrato `<NUMERO>` porte aperte.  
Successivamente è stata effettuata una scansione più dettagliata per identificare servizi e versioni:

```bash
nmap -sC -sV -sS <IP_TARGET>
```

Sono stati individuati i seguenti servizi rilevanti:

```text
<PORTA> - <SERVIZIO>
<PORTA> - <SERVIZIO>
```

## 2. Enumerazione web

Analizzando il sito web è stato individuato il dominio principale:

```text
<DOMINIO>
```

Il dominio è stato aggiunto a `/etc/hosts`:

```text
<IP_TARGET>    <DOMINIO>
```

È stata poi effettuata una enumerazione dei virtual host:

```bash
gobuster vhost --ad -u http://<DOMINIO> -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt
```

È stato trovato il virtual host:

```text
<VHOST>
```

Sul virtual host è stata eseguita una content discovery:

```bash
feroxbuster -u http://<VHOST> -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

Sono stati individuati percorsi interessanti, tra cui:

```text
<PATH_INTERESSANTE>
```

## 3. Identificazione vulnerabilità

Dalle informazioni esposte dall’applicazione è stato identificato il software:

```text
<SOFTWARE> <VERSIONE>
```

La versione risultava vulnerabile a:

```text
<CVE>
```

Tipo di vulnerabilità:

```text
<TIPO_VULNERABILITÀ>
```

Impatto:

```text
<IMPATTO>
```

## 4. Exploitation e accesso iniziale

La vulnerabilità è stata sfruttata tramite:

```bash
<COMANDO_O_PAYLOAD>
```

Questo ha permesso di ottenere accesso come utente:

```text
<UTENTE>
```

Nel caso specifico, è stato possibile accedere via SSH con:

```bash
ssh -i <CHIAVE> <UTENTE>@<IP_TARGET>
```

Flag utente:

```text
<FLAG_USER>
```

## 5. Privilege escalation

Dopo l’accesso iniziale è stata eseguita enumerazione locale:

```bash
whoami
id
sudo -l
```

Il comando `sudo -l` ha mostrato che l’utente poteva eseguire:

```text
<COMANDO_PERMESSO>
```

Il binario è stato sfruttato con:

```bash
<COMANDO_PRIVESC>
```

Questo ha permesso di ottenere privilegi root.

Flag finale:

```text
<FLAG_ROOT>
```

## 6. Riepilogo vulnerabilità

Le principali debolezze individuate sono:

1. **Virtual host nascosto / non documentato**  
    Ha permesso di raggiungere una superficie web non visibile direttamente.
    
2. **Information disclosure**  
    Alcune pagine esponevano informazioni utili come versione software o percorsi interni.
    
3. **Vulnerabilità nota del software**  
    La versione individuata era affetta da `<CVE>`, sfruttata per ottenere accesso iniziale.
    
4. **Misconfigurazione sudo**  
    L’utente compromesso poteva eseguire un binario abusabile con privilegi elevati.
    

## 7. Conclusione

La compromissione è avvenuta partendo dall’enumerazione dei servizi esposti, passando per la scoperta di virtual host e percorsi web interni. L’identificazione di una versione vulnerabile ha permesso l’accesso iniziale alla macchina. Successivamente, una configurazione sudo debole ha consentito la privilege escalation fino a root.