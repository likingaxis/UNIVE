---
title: "Perturbazioni — Catalogo per il Benchmark"
---

# Catalogo delle Perturbazioni

Perturbazioni meccaniche (mutazione singola, deterministica, reversibile) applicate al bundle generato `out/<slug>/` per misurare le capacità di VulcaTest con ground-truth nota.

## Metodologia (in breve)

- **Validità ecologica**: le perturbazioni derivano da errori *reali* di generazione (segnalati dai tutor + incidenti documentati), non da guasti inventati.
- **Tassonomia P1–P4** (asse: *come devia dall'intended-way / cosa deve fare VulcaTest*):
  - **P1 Blocco** — under-provisioning, errore esplicito → healer *additivo*.
  - **P2 Alterazione** — mis-provisioning, difetto *silenzioso*, valore sbagliato senza errore.
  - **P3 Scorciatoia** — over-provisioning, via non prevista → agente segnala, healer *sottrattivo* (hardening).
  - **P4 Oracolo** — macchina sana, spec/writeup sbagliato → Evaluator declina la riparazione (B2 senza B3).
- **Ground-truth = tripla** (verdetto / diagnosi / azione), non pass/fail.
- **Baseline-gate obbligatorio**: la sana deve passare `COMPLETED` pulita prima di perturbare.
- **Finding**: gli errori riportati dai tutor sono tutti **P1/P3** (visibili). I **P2/P4** (silenziosi/oracolo) non emergono dal loro ricordo → sono proprio i difetti che l'uomo *non* nota, dove VulcaTest aggiunge valore unico.
- **Mecanizzabilità**: solo mutazioni a singola modifica con tripla specificabile entrano nel benchmark; i casi fuzzy restano case-study qualitativi.

## Errori reali dei tutor (fonte)

Macchine generate da VulcaMind/VulcaForge, VulcaTest svolto manualmente (Michele, Danilo — VDSI).

| id | Errore | Classe | Direzione |
|:--|:--|:--|:--|
| E1 | web app generata ma **non copiata** sulla macchina | P1 | under |
| E2 | **config nginx non cambiata** / vhost errato | P1 | under |
| E3 | **creazione utenti fallita** / utente mancante | P1 | under |
| E4a | **ownership** sbagliata, verso restrittivo | P1 | under |
| E4b | **ownership** sbagliata, verso permissivo | P3 | over |
| E5 | **permessi troppo laschi** | P3 | over |
| E6 | vuln associata al **vhost sbagliato** | P1-sintomo / compound | misroute |

## Catalogo perturbazioni — 8 macchine realizzate

Formato mutazione: `file : campo` in `out/<slug>/setup_machine.yml` (o config incluso). ✔ = evidenza già esistente.

### P1 — Blocco

| ID | Err | Macchina | Mutazione concreta | Sintomo | Ground-truth (verdetto/diagnosi/azione) | Ev |
|:--|:--|:--|:--|:--|:--|:--:|
| P1-01 | E1 | Pizzeria | rimuovi include `web-app-deploy.yml` | app 404 | FAILED @ web-recon / IAC_GENERATION_DEFECT·webapp / deploy app | ✔ |
| P1-02 | E1 | WebMaster | rimuovi include `web-app-deploy.yml` | app 404 | FAILED @ web-recon / IAC_GEN·webapp / deploy app | |
| P1-03 | E2 | AuthGate | nginx-vhost: `is_default:false`,`keep_default_site:true` | pagina default, `staff/passwords.txt` 404 | FAILED @ web-recon / CONFIG_DEFECT·nginx / fix vhost | |
| P1-04 | E2 | DataVault | `document_root: /var/www/datavault → /wrong` | 404 | FAILED @ web-recon / CONFIG_DEFECT·nginx / fix root | |
| P1-05 | E3 | AuthGate | rimuovi `sysadmin` da `users:` | lateral bloccato (auth fail) | FAILED @ lateral / CONFIG_DEFECT·users / crea utente | |
| P1-06 | E3 | Pizzeria | rimuovi `franchino` da `users:` | lateral bloccato | FAILED @ lateral / CONFIG_DEFECT·users / crea utente | |
| P1-07 | E4a | AuthGate | `id_rsa : owner: operator → root` | operator non legge la chiave | FAILED @ lateral / CONFIG_DEFECT·ownership / fix owner | |

> Nota: su AuthGate `id_rsa mode:0644` è **intended** (lo studente deve fare `chmod 600`) — non toccarlo, muta l'owner.

### P2 — Alterazione silenziosa

| ID | Macchina | Mutazione concreta | Sintomo | Ground-truth | Ev |
|:--|:--|:--|:--|:--|:--:|
| P2-01 | qualsiasi | `root.txt` : contenuto → flag fittizia `VDSI{...}` | flag catturata senza errore, exact-match fallisce | FAILED (False-Success test) / semantic·flag / ripristina flag | |
| P2-02 | DataVault | re-inietta bug `php-fpm-allow-extensions` (solo `.php`) | upload 200 OK, RCE 403 al trigger | FAILED @ upload-RCE / CONFIG_DEFECT·php-fpm / fix limit_extensions | ✔ |

### P3 — Scorciatoia

| ID | Err | Macchina | Mutazione concreta | Sintomo | Ground-truth | Ev |
|:--|:--|:--|:--|:--|:--|:--:|
| P3-01 | E5 | qualsiasi (es. CryptoVault) | `root.txt : mode 0400 → 0644` | root flag leggibile senza privesc | FAILED-non-conf / P3 / hardening perms | |
| P3-02 | E5 | Citadel | file/script sensibile → `world-writable` extra | scorciatoia aggiuntiva | FAILED-non-conf / P3 / hardening | |
| P3-03 | E4b | CryptoVault | `.key`/`backup.enc : owner/group → student` | salta il reversing XOR | FAILED-non-conf / P3·ownership / hardening | |

### P4 — Oracolo (macchina sana)

| ID | Macchina | Mutazione concreta | Sintomo | Ground-truth | Ev |
|:--|:--|:--|:--|:--|:--:|
| P4-01 | qualsiasi con SSH | checklist congelata: item su stringa di build (es. banner `OpenSSH 9.2p1`) | macchina OK, item impossibile | FAILED / SPECIFICATION_DEFECT / Healer declina | ✔(S-ID) |
| P4-02 | AuthGate (nativo) | nessuna iniezione: `ssh-keygen -y` a 0644 = sequenza impossibile nel writeup | — | FAILED / SPECIFICATION_DEFECT / correggi writeup | ✔ |

## Crossing (classe × architettura)

Ogni classe su ≥2 architetture → un guasto mancato non è attribuibile alla singola macchina.

| Classe | Architetture |
|:--|:--|
| P1 | AuthGate, Pizzeria, DataVault, WebMaster |
| P2 | DataVault + generico (flag) |
| P3 | CryptoVault, Citadel + generico (root.txt) |
| P4 | AuthGate (nativo) + iniettabile su ogni macchina SSH |

## Macchine in arrivo (perturbazioni candidate — *pending baseline*)

Da validare `COMPLETED` pulita prima di attivare. Componenti registry già presenti salvo dove indicato.

| Macchina | Nuove architetture | Perturbazioni candidate |
|:--|:--|:--|
| **NetVault** | DNS server | P1: DNS misconfig / zona non servita · P3: **AXFR lasciata aperta** su zona non prevista · P3: `/etc/passwd` writable |
| **GitPoison** | Apache + log poisoning *(modulo net-new)* | P1: `.git` non esposto · P1: log non leggibile via LFI · P3: dir upload troppo larga |
| **TunnelGate** | SSH port-forward | P1: forward bloccato / servizio interno spento · P3: gruppo `shadow` troppo largo · **rischio harness**: validare che l'Executor sappia fare `ssh -L` (spike) |

## Limiti emersi (per "sviluppi futuri")

- **E6 / difetti compound (P1+P3)**: VulcaTest esegue lineare e si ferma al primo fallimento bloccante → può rilevare il P1 (intended path bloccato) e **mancare il P3** (scorciatoia sull'altro vhost). Blind-spot noto.
- **E6 come test di granularità RCA (B2)**: distinguere "componente mancante" da "componente mal-instradato" → candidato a raffinare l'enum `defect_type` (aggiunta *routing/misassociation*).
