---
title: "Benchmark — metodo, macchine e perturbazioni"
---

# Benchmark di VulcaTest

Documento unico di riferimento. Spiega **come** misuro VulcaTest (il metodo), **cosa** misuro (i benchmark), su **quali macchine**, e **quali rotture** inietto divise per tipo.

---

## 1. Il metodo

**Obiettivo:** dimostrare con dei numeri che VulcaTest *vede* se una macchina è buona o rotta, *capisce* perché è rotta, e *la ripara* bene (o si rifiuta quando deve).

**Perturbazione meccanica controllata.** Parto da una macchina **sana** che supera i test (la chiamo *golden*) e le inietto **una sola modifica precisa e programmata** (es. cambiare un permesso, rimuovere un file, mettere un valore sbagliato). Così so con certezza cosa ho rotto e cosa mi aspetto in risposta: la verità di riferimento è nota *per costruzione*, senza bisogno di un giudice esterno o di un altro LLM.

**Dove inietto la rottura.** Nel sorgente `vulcaforge/machines/<slug>.yaml` (poi si rigenera `out/<slug>/`). Non direttamente in `out/`: l'Healer ripara il sorgente e rigenera `out/`, quindi una rottura messa solo in `out/` verrebbe cancellata "gratis" dalla rigenerazione (falso successo di riparazione).

**Gate del baseline.** Prima di rompere una macchina, la versione sana deve passare. "Passa" significa che **passano tutte le run valide** (quindi 3 su 3 se le run valide sono 3). Il gate è severo di proposito: una macchina "golden" deve essere risolvibile in modo affidabile. Se è instabile già da sana, quando poi la rompo non capisco più se il fallimento è della rottura o della solita instabilità del modello. Se la sana non arriva a passarle tutte, esce dal set. (Le run non valide — timeout, reset fallito, blocco dell'antivirus — non contano nel conteggio.)

**K ripetizioni.** Ogni caso si gira più volte. Non per avere potenza statistica, ma per **misurare quanto il modello è instabile** sullo stesso caso. Riportare questa oscillazione è più onesto che nascondere la varianza dietro un numero secco.

**Che tipo di valutazione è.** È *software testing*, non statistica inferenziale. I casi li scelgo io per coprire i tipi di attacco, non sono un campione casuale da una popolazione. Le metriche sono quindi **descrittive su questa suite**, non stime con intervallo di confidenza.

**Perché proprio queste macchine.** Prese insieme coprono tutti i tipi di attacco del programma pratico d'esame, senza doppioni inutili. Inoltre ogni tipo di attacco compare su **almeno 2 macchine diverse**: così un difetto mancato non è attribuibile a una singola macchina.

**Piano congelato.** Il gate e la Fase 2 usano lo **stesso** piano d'attacco congelato per macchina (il Planner è spento). Così la qualità del Planner non inquina la misura di Executor/Evaluator/Healer, e un fallimento è attribuibile alla sola macchina o alla rottura.

---

## 2. I benchmark (cosa misuro)

Quattro domande, quattro misure. Lo scoring è **deterministico** (niente LLM-giudice). I risultati si leggono **per tipo di perturbazione**, non aggregati in un unico numero.

| # | Domanda | Misura | Formula | Fonte |
|---|---|---|---|---|
| **B1** | Vede se è rotta? | Riconoscimento | confusion matrix → precision, recall, F1. Più il *progress rate* (voci di checklist superate / totali) per non appiattire tutto su passa/fallisce | Cybench, AgentBoard, SWE-Bench Pro |
| **B2** | Capisce perché? | Diagnosi | diagnosi corrette / fallimenti totali | AgentBoard |
| **B3** | Ripara bene (o declina)? | Riparazione | closed-loop success = riparazioni che ripassano il test / tentativi; + ampiezza della patch (file e righe); + direzione corretta (aggiunge / toglie / rifiuta) | SWE-Bench (patch minimality) |
| **B4** | Quanto costa? | Costo | tempo per fase e token per attore; la run sana come riferimento, la differenza sana/rotta = costo di gestione del difetto | Cybench |

*Fonti considerate:* The Test Oracle Problem in Synthetic LLM-as-Judge Corpora; Cybench; AgentBoard; PentestGPT; SWE-Bench Pro Verified.

---

## 3. Le macchine (11)

Tutte Boot2Root (dall'accesso iniziale fino a root). Create con VulcaForge.

| # | Macchina | Tipo / Servizio | Accesso iniziale | Movimento laterale | Salita a root | Competenze |
|:--:|---|---|---|---|---|---|
| 1 | **Pizzeria** | Web PHP / Nginx | credenziali in chiaro in `/opt/test.sh` | → `franchino` | sudo nano su `/etc/passwd` (GTFObins) | web inspection, credential hunting, sudo text editor |
| 2 | **AuthGate** | Web + SSH | leak utenti/pass → bruteforce SSH (Hydra) | chiave SSH con permessi deboli (`id_rsa` 0644) | sudo vi (GTFObins) | Hydra SSH, abuso permessi chiave, sudo vi |
| 3 | **Citadel** | Web PHP multi-livello | SQLi login bypass + command injection | cronjob `/opt/backup.sh` | SUID PATH hijacking | SQLi, command injection, cron, SUID PATH |
| 4 | **DataVault** | Portale upload | upload file con bypass MIME/Content-Type | — | capability `cap_setuid` su Python3 | upload bypass, Linux capabilities |
| 5 | **WebMaster** | CMS Web PHP | LFI con wrapper PHP (`php://filter/base64`) | — | capability `cap_setuid` su Python3 | LFI, PHP stream filter, capabilities |
| 6 | **CryptoVault** | Backup SSH | credenziali fornite (`student:student123`) | reverse engineering script XOR (`decrypt.py`) | SUID PATH hijacking (`tar`) | enum locale, reversing XOR, SUID PATH |
| 7 | **ConsoleGate** | Demone TCP grezzo | porta alta 20000, banner grabbing + auth via `nc` | — | Python module hijacking via cronjob root | port scanning, socket grezzo, cron, library hijacking |
| 8 | **PrivAudit** | Sistema dev Linux | credenziali fornite (`student:student123`) | password in `.bash_history` → `developer` | sudo git pager escape (`less` → `!/bin/bash`) | credential leak da history, sudo git GTFObins |
| 9 | **NetVault** | DNS + Web | zone transfer DNS (AXFR) + fuzzing vhost | cracking archivio 7z (`7z2john` + regole John) | scrittura diretta su `/etc/passwd` (utente UID 0) | DNS recon, cracking con regole, `/etc/passwd` writable |
| 10 | **GitPoison** | Web app / dev | dump `.git` esposto + bruteforce form (Hydra) | — | LFI → RCE via Apache log poisoning | git dump, Hydra web, log poisoning |
| 11 | **TunnelGate** | Portale interno | SSH base (`trainee`) | SSH local port forwarding (`ssh -L`) | dump hash, `unshadow`, cracking John, gruppo shadow | port forwarding, hash cracking, permessi di gruppo |

---

## 4. Le perturbazioni (le rotture), divise per tipo

Ogni rottura è **una sola modifica**, deterministica e reversibile, con una risposta attesa nota: una **tripla** (verdetto / diagnosi / azione dell'Healer).

I quattro tipi (l'asse è: *come la macchina si allontana dal percorso giusto, e cosa deve fare VulcaTest*):

- **P1 — Blocco.** Manca qualcosa: un passo non è eseguibile e dà errore esplicito (404, 502, permesso negato, utente mancante, SUID assente). L'Healer **aggiunge** ciò che manca.
- **P2 — Alterazione silenziosa.** Il passo riesce senza errori, ma il risultato è **sbagliato** (valore corrotto, flag dal formato errato, codice che torna in chiaro invece di essere eseguito). Nessun errore a schermo: va notato confrontando atteso e osservato.
- **P3 — Scorciatoia.** La macchina funziona ma è **troppo permissiva**: esiste una via non prevista (flag leggibile da tutti, permessi 777, script di root sovrascrivibile). VulcaTest non deve sfruttarla, deve **segnalarla**; l'Healer **toglie** l'eccesso (hardening).
- **P4 — Oracolo.** La macchina è **sana**: è la specifica (writeup/checklist) a pretendere qualcosa di sbagliato o impossibile. VulcaTest fallisce lo step ma capisce che il difetto è nelle istruzioni, non nella macchina, e l'Healer **si rifiuta** di riparare.

**Nota su P1 vs P3:** sono agli opposti. P1 = risorsa mancante (Healer aggiunge). P3 = eccesso (Healer toglie). Devono usare difetti diversi per non confondersi.

### Vulnerabilità volute da NON toccare

Alcune macchine hanno *già* un permesso lasco come vulnerabilità voluta: non vanno usate come P3 (le romperebbe). Per il P3 su queste si usa un permesso *aggiuntivo* o `root.txt 0400→0644`.

| Macchina | Permesso lasco voluto (non toccare) |
|---|---|
| DataVault | `uploads/` 0777 (l'upload deve scrivere) |
| NetVault | `/etc/passwd` 0666 (è la salita a root) |
| Citadel | `/opt/backup.sh` 0777 (writable per il cron) |
| CryptoVault | `.key` 0644 (deve leggerla `student`) |
| AuthGate | `id_rsa` 0644 (lo studente deve fare `chmod 600`) |

### P1 — Blocco (manca qualcosa → Healer aggiunge)

| Macchina | Cosa si rompe | Risultato atteso (verdetto / diagnosi / azione) |
|---|---|---|
| Pizzeria | rimuovi la web-app | FAILED@web-recon / app non copiata / rimetti l'app |
| WebMaster | rimuovi la web-app | FAILED@web-recon / app non copiata / rimetti l'app |
| WebMaster | rimuovi `view.php` (componente LFI) | FAILED@LFI / componente mancante / rimetti view.php |
| AuthGate | vhost nginx di default sbagliato | FAILED@web-recon / config nginx / sistema vhost |
| AuthGate | rimuovi l'utente `sysadmin` | FAILED@laterale / utente mancante / crea utente |
| AuthGate | owner di `id_rsa` da `operator` a `root` | FAILED@laterale / ownership / sistema owner |
| DataVault | document_root nginx sbagliato | FAILED@web-recon / config nginx / sistema root |
| Pizzeria | rimuovi l'utente `franchino` | FAILED@laterale / utente mancante / crea utente |
| Citadel | rimuovi il SUID da `citadel_report` | FAILED@privesc / SUID mancante / rimetti SUID |
| Citadel | rimuovi l'utente `sysadmin` | FAILED@laterale / utente mancante / crea utente |
| CryptoVault | rimuovi il file `.key` | FAILED@decode / keyfile mancante / rimetti `.key` |
| PrivAudit | rimuovi l'utente `developer` | FAILED@laterale / utente mancante / crea utente |
| ConsoleGate | permessi cartella cron troppo stretti | FAILED@module-hijack / permessi / rimetti write al gruppo |
| GitPoison | rimuovi il leak `.git` | FAILED@git-dump / componente mancante / esponi `.git` |
| NetVault | document_root vhost `backup.corp.vdsi` sbagliato | FAILED@vhost / config nginx / sistema root |
| NetVault | rimuovi la zona/record DNS | FAILED@dns / config DNS / rimetti la zona |
| TunnelGate | binding/porta del portale interno disallineati | FAILED@portale-interno / config nginx / sistema binding |

### P2 — Alterazione silenziosa (nessun errore, valore sbagliato)

| Macchina | Cosa si rompe | Risultato atteso |
|---|---|---|
| qualsiasi con flag | flag fittizia in `root.txt` | FAILED (falso successo) / flag errata / rimetti la flag |
| DataVault | disabilita le estensioni php-fpm | FAILED@upload-RCE / config php-fpm / riabilita estensioni |
| CryptoVault | cambia 1 carattere in `.key` (`2026!→2026?`) | FAILED@su-vault_admin / chiave errata / correggi chiave |
| Pizzeria | hint in `test.sh` diverso dalla password vera | FAILED@laterale / credenziale errata / riallinea |
| PrivAudit | password in `.bash_history` diversa da quella vera | FAILED@laterale / credenziale errata / riallinea |
| ConsoleGate | token/password del demone disallineati | FAILED@ssh / token errato / riallinea |
| TunnelGate | hash in `shadow.txt` diverso dalla password | FAILED@ssh-login / hash errato / riallinea |
| WebMaster | disabilita le estensioni php-fpm | FAILED@upload-RCE / config php-fpm / riabilita estensioni |
| DataVault | EXIF alterato in `vault_banner.jpg` | FAILED@forensics / asset errato / rimetti l'asset |

### P3 — Scorciatoia (troppo permissivo → Healer toglie)

Serve un controllo *negativo* in checklist (es. "la flag NON deve essere leggibile prima della privesc") perché la scorciatoia sia rilevabile.

| Macchina | Cosa si rompe | Risultato atteso |
|---|---|---|
| qualsiasi | `root.txt` da 0400 a 0644 | FAILED non-conforme / permessi / hardening |
| Citadel | file/script sensibile world-writable in più | FAILED non-conforme / permessi / hardening |
| CryptoVault | owner di `.key`/`backup.enc` dato a `student` | FAILED non-conforme / ownership / hardening |
| PrivAudit | `root.txt` da 0400 a 0644 (ha già il controllo negativo) | FAILED non-conforme / permessi / hardening |
| ConsoleGate | aggiungi `chmod 4755 /bin/bash` | FAILED non-conforme / SUID / rimuovi SUID |
| NetVault | aggiungi una zona con AXFR aperto non prevista | FAILED non-conforme / DNS / restringi AXFR |
| TunnelGate | aggiungi `trainee` al gruppo shadow | FAILED non-conforme / gruppi / rimuovi dal gruppo |

### P4 — Oracolo (macchina sana, istruzioni sbagliate → Healer declina)

Non si tocca la macchina: la rottura si mette nella **checklist congelata** (`benchmark/plans/<slug>.ATTACK_PLAN.md`). La macchina resta golden; l'Healer non deve essere invocato.

| Macchina | Cosa si inietta nella checklist | Risultato atteso |
|---|---|---|
| qualsiasi con SSH | pretende un banner di build preciso (es. `OpenSSH 9.2p1`) | FAILED / difetto di specifica / Healer declina |
| AuthGate | `ssh-keygen -y` a 0644 = sequenza impossibile (caso reale) | FAILED / difetto di specifica / correggi il writeup |
| ConsoleGate | pretende `STATUS → 'HTTP/1.1 200 OK'` su un socket TCP grezzo | FAILED / specifica errata / Healer declina |
| Pizzeria | premessa falsa in checklist (porta/banner inesistente) | FAILED / difetto di specifica / Healer declina |

### Ogni tipo su più macchine

Ogni tipo di rottura è coperto su almeno 2 macchine diverse: un difetto mancato non è attribuibile a una singola macchina.

| Tipo | Macchine coperte |
|---|---|
| P1 | tutte e 11 |
| P2 | CryptoVault, Pizzeria, PrivAudit, ConsoleGate, TunnelGate, DataVault, WebMaster |
| P3 | PrivAudit, Citadel, CryptoVault, ConsoleGate, NetVault, TunnelGate + generico (`root.txt`) |
| P4 | AuthGate, ConsoleGate, Pizzeria + iniettabile su ogni macchina con SSH |

- assicurare il contesto prima della generazione del ground truth
	- prima isolato da dopo
- esperimento -> rappresenta interpretazione delle metriche con rispettiva domanda di ricerca
- isolare il nodo dell'architettura
- cambiare il numero di test
- salvare corrispondenza perturbazione run ->report


##### Limitazioni
1. nonostante la verificà