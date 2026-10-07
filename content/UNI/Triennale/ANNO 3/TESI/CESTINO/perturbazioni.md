---
title: "Perturbazioni — Catalogo per il Benchmark"
---

# Catalogo delle Perturbazioni

Perturbazioni meccaniche (mutazione singola, deterministica, reversibile) applicate al **sorgente** `vulcaforge/machines/<slug>.yaml` (poi si rigenera `out/<slug>/`) per misurare le capacità di VulcaTest con ground-truth nota.

> **Perché il sorgente e non il bundle `out/`**: l'Healer (`agy`) ripara il sorgente e RIGENERA `out/`. Se perturbassi solo `out/`, la rigenerazione cancellerebbe il difetto "gratis" (falso-successo di healing). Perturbando il sorgente, la ground-truth coincide con ciò che l'Healer deve trovare e correggere.

## Metodologia (in breve)

- **Validità ecologica**: le perturbazioni derivano da errori *reali* di generazione (segnalati dai tutor + incidenti documentati), non da guasti inventati.
- **Machine-vs-framework**: sono ammissibili SOLO i difetti correggibili sul lato macchina (esistono come manopola singola nell'IaC). I fallimenti risolti sul lato framework (guardrail provider, serializzazione, budget turni…) NON sono perturbazioni → vanno nel capitolo evoluzione/design.
- **Tassonomia P1–P4** (asse: *come devia dall'intended-way / cosa deve fare VulcaTest*):
  - **P1 Blocco** — under-provisioning, errore esplicito → healer *additivo*.
  - **P2 Alterazione** — mis-provisioning, difetto *silenzioso*, valore sbagliato senza errore.
  - **P3 Scorciatoia** — over-provisioning, via non prevista → agente segnala, healer *sottrattivo* (hardening).
  - **P4 Oracolo** — macchina sana, spec/writeup sbagliato → Evaluator declina la riparazione (B2 senza B3).
- **Ground-truth = tripla** (verdetto / diagnosi / azione), non pass/fail.
- **Baseline-gate obbligatorio**: la sana deve passare `COMPLETED` pulita prima di perturbare.
- **Finding**: gli errori riportati dai tutor sono tutti **P1/P3** (visibili). I **P2/P4** (silenziosi/oracolo) non emergono dal loro ricordo → sono proprio i difetti che l'uomo *non* nota, dove VulcaTest aggiunge valore unico.
- **Meccanizzabilità**: solo mutazioni a singola modifica con tripla specificabile entrano nel benchmark; i casi fuzzy restano case-study qualitativi.
- **T vs n**: questo catalogo è lo spazio dei casi $T$ (matrice di applicabilità classe×macchina). Da qui si campiona $n$ per le run effettive (copertura + ordine di grandezza), $n \le T$.

## Errori reali dei tutor (fonte)

Macchine generate da VulcaMind/VulcaForge, VulcaTest svolto manualmente (Michele, Danilo — VDSI). Confermati dai messaggi originali (04–07/09/2026).

| id | Errore | Classe | Direzione |
|:--|:--|:--|:--|
| E1 | web app generata ma **non copiata** sulla macchina | P1 | under |
| E2 | **config nginx non cambiata** / vhost errato | P1 | under |
| E3 | **creazione utenti fallita** / utente mancante | P1 | under |
| E4a | **ownership** sbagliata, verso restrittivo | P1 | under |
| E4b | **ownership** sbagliata, verso permissivo | P3 | over |
| E5 | **permessi troppo laschi** | P3 | over |
| E6 | vuln associata al **vhost sbagliato** | P1-sintomo / compound | misroute |

---

## ⚠️ Vuln intended da NON perturbare (over-provisioning by design)

Alcune macchine hanno *già* un permesso lasco come vulnerabilità voluta. Non vanno usate come P3 (le romperebbe): per il P3 su queste macchine si usa `root.txt 0400→0644` o un permesso *aggiuntivo*.

| Macchina | Vuln intended (NON toccare) |
|:--|:--|
| DataVault | `uploads/ dir_mode:0777` (l'upload deve scrivere) |
| NetVault | `privesc-others-passwd-write` = `/etc/passwd 0666` (è la privesc) |
| Citadel | `/opt/backup.sh mode:0777` (writable per il cron privesc) |
| CryptoVault | `.key mode:0644` (deve leggerla `student`) |
| AuthGate | `id_rsa mode:0644` (lo studente deve fare `chmod 600`) |

---

## Catalogo verificato sul sorgente (2026-09-23)

Formato manopola: `componente/campo (riga in machines/<slug>.yaml)`. ✔ev = evidenza già esistente in `evidence/`.

### P1 — Blocco (under-provisioning → healer additivo)

| ID | Err | Macchina | Manopola (riga) | Mutazione | Ground-truth (verdetto / diagnosi / azione) | ✔ |
|:--|:--|:--|:--|:--|:--|:--:|
| P1-01 | E1 | Pizzeria | `web-app-deploy` (25) | rimuovi componente | FAILED@web-recon / IAC_GEN·webapp / deploy app | ✔ |
| P1-02 | E1 | WebMaster | `web-app-deploy` (59) | rimuovi componente | FAILED@web-recon / IAC_GEN·webapp / deploy app | |
| P1-03 | E2 | AuthGate | `service-nginx-vhost is_default/keep_default_site` (22-23) | `false / true` | FAILED@web-recon / CONFIG·nginx / fix vhost | |
| P1-04 | E2 | DataVault | `service-nginx-vhost document_root` (34) | `→ /wrong` | FAILED@web-recon / CONFIG·nginx / fix root | |
| P1-05 | E3 | AuthGate | `users: sysadmin` (11) | rimuovi utente | FAILED@lateral / CONFIG·users / crea utente | |
| P1-06 | E3 | Pizzeria | `users: franchino` (9) | rimuovi utente | FAILED@lateral / CONFIG·users / crea utente | |
| P1-07 | E4a | AuthGate | `id_rsa owner` (195) | `operator → root` | FAILED@lateral / CONFIG·ownership / fix owner | |
| P1-08 | — | WebMaster | `web-lfi-php-basic` view.php (65) | rimuovi componente | FAILED@LFI-discovery / IAC_GEN·lfi / deploy view.php | flagship NT-WEB-02 |
| P1-09 | — | Citadel | SUID `chmod 4755 citadel_report` (722) | rimuovi SUID | FAILED@privesc / CONFIG·suid / ripristina SUID | P1 su fase privesc |
| P1-10 | E3 | Citadel | `users: sysadmin` (11) | rimuovi utente | FAILED@lateral / CONFIG·users / crea utente | |
| P1-11 | — | CryptoVault | `.key` componente (49) | rimuovi file | FAILED@decode / IAC_GEN·keyfile / ripristina .key | |
| P1-12 | E3 | PrivAudit | `users: developer` (18) | rimuovi utente | FAILED@lateral / CONFIG·users / crea utente | |
| P1-13 | E5→under | ConsoleGate | `privesc-cron… dir_mode:"0775"` (73) | `→ 0755` | FAILED@module-hijack / CONFIG·perms / ripristina write gruppo | ✔ev (output_3) |
| P1-14 | — | GitPoison | `web-git-leak` (40) | rimuovi componente | FAILED@git-dump / IAC_GEN·gitleak / esponi .git | |
| P1-15 | E2 | NetVault | `service-nginx-vhost backup.corp.vdsi document_root` (371) | `→ /wrong` | FAILED@vhost-recon / CONFIG·nginx / fix root | |
| P1-16 | — | NetVault | `dns-axfr-zone dns_records` (32) | rimuovi record/zona | FAILED@dns-recon / CONFIG·dns / ripristina zona | |
| P1-17 | — | TunnelGate | `service-nginx-vhost interno document_root/http_port` (55-56) | disallinea | FAILED@internal-portal / CONFIG·nginx / fix binding | dopo tunnel: portale 404 |

### P2 — Alterazione silenziosa (mis-provisioning → nessun errore, valore sbagliato)

| ID | Macchina | Manopola (riga) | Mutazione | Ground-truth | ✔ |
|:--|:--|:--|:--|:--|:--:|
| P2-01 | qualsiasi con flag | `system-flag-setup content` (root.txt) | flag fittizia | FAILED (False-Success) / semantic·flag / ripristina flag | |
| P2-02 | DataVault | `php-fpm-allow-extensions` (29) | rimuovi componente | FAILED@upload-RCE / CONFIG·php-fpm / riabilita estensioni | ✔ |
| P2-03 | CryptoVault | `.key content` (53) | 1 char (`2026! → 2026?`) | FAILED@su-vault_admin / semantic·key / correggi chiave | **verificato single-knob** |
| P2-04 | Pizzeria | `/opt/test.sh` hint (36) vs `franchino.password` (10) | disallinea i due valori | FAILED@lateral / semantic·cred-leak / riallinea | cred leak errato |
| P2-05 | PrivAudit | `.bash_history` pass (58) vs `developer.password` (19) | disallinea | FAILED@lateral / semantic·cred-leak / riallinea | |
| P2-06 | ConsoleGate | `service-telemetry-daemon session_token`/`auth_password` (47/50) | disallinea | FAILED@ssh-foothold / semantic·token / riallinea | AUTH dà creds errate |
| P2-07 | TunnelGate | `shadow.txt` hash sysadmin (357) vs `users:sysadmin.password` (33) | disallinea | FAILED@ssh-login / semantic·hash / riallinea | john "cracca" ma login fallisce |
| P2-08 | WebMaster | `php-fpm-allow-extensions` (39) | rimuovi componente | FAILED@upload-RCE / CONFIG·php-fpm / riabilita estensioni | gemello di P2-02 |
| P2-09 | DataVault | asset `vault_banner.jpg` EXIF (185) | endpoint EXIF alterato | FAILED@forensics / semantic·exif / ripristina asset | ⚠ swap asset, non riga yaml |

### P3 — Scorciatoia (over-provisioning → healer sottrattivo/hardening)

> Richiede un **item negativo** in checklist (es. "root.txt NON leggibile da utente basso") per essere rilevabile.

| ID | Err | Macchina | Manopola (riga) | Mutazione | Ground-truth | ✔ |
|:--|:--|:--|:--|:--|:--|:--:|
| P3-01 | E5 | qualsiasi | `system-flag-setup root.txt mode` | `0400 → 0644` | FAILED-non-conf / P3·perms / hardening | |
| P3-02 | E5 | Citadel | file/script sensibile | world-writable *extra* | FAILED-non-conf / P3·perms / hardening | |
| P3-03 | E4b | CryptoVault | `.key`/`backup.enc owner/group` | `→ student` | FAILED-non-conf / P3·ownership / hardening | |
| P3-04 | E5 | PrivAudit | `root.txt mode` (83) | `0400 → 0644` | FAILED-non-conf / P3·perms / hardening | **flagship P3 (ha già item negativo)** |
| P3-05 | E5 | ConsoleGate | *aggiungi* `chmod 4755 /bin/bash` | additivo | FAILED-non-conf / P3·suid / rimuovi SUID | ⚠ additivo; ✔ev (output_4) |
| P3-06 | E5 | NetVault | *aggiungi* zona con AXFR aperto non prevista | additivo | FAILED-non-conf / P3·dns / restringi AXFR | ⚠ additivo |
| P3-07 | E5 | TunnelGate | `privesc-groups-shadow` → aggiungi `trainee` al gruppo shadow | additivo | FAILED-non-conf / P3·groups / rimuovi da shadow | ⚠ additivo (salta sysadmin) |

### P4 — Oracolo (macchina sana, difetto nella specifica → Evaluator declina)

> P4 **non** sta nel sorgente della macchina: si inietta nella **checklist congelata** (`benchmark/plans/<slug>.ATTACK_PLAN.md`). La macchina resta golden; l'esito atteso è che l'Healer **non** venga invocato.

| ID | Macchina | Iniezione (nel piano congelato) | Ground-truth | ✔ |
|:--|:--|:--|:--|:--:|
| P4-01 | qualsiasi con SSH | item su stringa di build (es. banner `OpenSSH 9.2p1`) | FAILED / SPECIFICATION_DEFECT / Healer declina | ✔(S-ID) |
| P4-02 | AuthGate (nativo) | `ssh-keygen -y` a 0644 = sequenza impossibile nel writeup | FAILED / SPECIFICATION_DEFECT / correggi writeup | ✔ |
| P4-03 | ConsoleGate | checklist pretende `STATUS → 'HTTP/1.1 200 OK'` su socket TCP grezzo | FAILED / SPECIFICATION_DEFECT·oracle-mismatch / Healer declina | flagship P4 |
| P4-04 | Pizzeria | premessa falsa in checklist (es. porta/banner inesistente) | FAILED / SPECIFICATION_DEFECT / Healer declina | sintetico |

---

## Case-study qualitativi (fuori dal benchmark pulito)

- **Chat Pizzeria (storico)**: `output_33` (FAILED, Strict Auditor) vs `output_34` (COMPLETED, falso positivo) sulla *stessa* macchina/modello, quando la chat non era ancora generata. La macchina è ora golden (chat presente). Si cita **al passato** come prova empirica del **non-determinismo** (giustifica le K ripetizioni) e del rischio di razionalizzazione dell'Executor. Classe ibrida (`DIDACTIC_MISMATCH`) → non è una cella pulita.
- **06.Web_Exploitation `ENV-PRIVILEGE-MISCONFIG`**: incidente reale (privilege misconfig rilevato in Auditor Mode) su target VulcaMind di riferimento; fonte ecologica per la classe P3, non macchina base del dataset.

---

## Crossing (classe × architettura)

Ogni classe su ≥2 architetture → un guasto mancato non è attribuibile alla singola macchina (leva contro il confondimento classe/macchina).

| Classe | Architetture coperte |
|:--|:--|
| P1 | Pizzeria, WebMaster, AuthGate, DataVault, Citadel, CryptoVault, PrivAudit, ConsoleGate, GitPoison, NetVault, TunnelGate |
| P2 | CryptoVault, Pizzeria, PrivAudit, ConsoleGate, TunnelGate, DataVault, WebMaster |
| P3 | PrivAudit, Citadel, CryptoVault, ConsoleGate, NetVault, TunnelGate + generico (root.txt) |
| P4 | AuthGate (nativo), ConsoleGate, Pizzeria + iniettabile su ogni macchina SSH |

---

## Limiti emersi (per "sviluppi futuri")

- **E6 / difetti compound (P1+P3)**: VulcaTest esegue lineare e si ferma al primo fallimento bloccante → può rilevare il P1 (intended path bloccato) e **mancare il P3** (scorciatoia sull'altro vhost). Blind-spot noto.
- **E6 come test di granularità RCA (B2)**: distinguere "componente mancante" da "componente mal-instradato" → candidato a raffinare l'enum `defect_type` (aggiunta *routing/misassociation*).
- **Perturbazioni additive** (P3-05/06/07): non sono flip di una riga esistente ma aggiunte al sorgente; restano single-knob e deterministiche, ma vanno etichettate come tali nello scorer.
- **P2-09 (EXIF)**: richiede lo swap dell'asset `vault_banner.jpg`, non una riga yaml → gestire come mutazione a livello di asset.
