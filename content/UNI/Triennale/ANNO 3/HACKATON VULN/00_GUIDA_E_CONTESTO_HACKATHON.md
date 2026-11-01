# 00 — GUIDA RAPIDA & CONTESTO DI GARA
### Scheda tattica da tenere SEMPRE aperta · Hackathon Blue Team · CNIT NAM Lab · Tor Vergata

> **Team**: Luca · Davide · Alfredo — **Target**: una VM Linux con N vulnerabilità non dichiarate — **Durata del tick**: 2 minuti.

---

## ⚡ LA REGOLA CHE DECIDE TUTTO
```
╔══════════════════════════════════════════════════════╗
║   PUNTEGGIO = (Vuln Corrette)  ×  (% di Uptime)        ║
╚══════════════════════════════════════════════════════╝
```
| Scenario | Vuln | Uptime | Punteggio |
| :--- | :---: | :---: | :---: |
| "Aggressivo cieco" | 10 | 20% | **2.0** |
| "Difensore disciplinato" | 6 | 99% | **5.94** ✅ |

➡️ **L'uptime è il moltiplicatore sovrano. Una patch che rompe un servizio vale ZERO e in più ti costa i tick.** Meglio 6 vulnerabilità chiuse col servizio sempre su, che 10 con la macchina a pezzi.

---

## 📋 REGOLE & PENALITÀ ESSENZIALI
|  Art.  | Regola                                                                                    | Implicazione operativa                                                 |
| :----: | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **5**  | VM identica con vuln non dichiarate su tutto lo stack                                     | Caccia su OS, rete, web, binari, permessi                              |
| **6**  | Patch valida solo se: attacco neutralizzato **E** revisione manuale ok                    | Vietate patch distruttive (stop servizio, porta chiusa) → bocciate a 0 |
| **7**  | Scorebot segreto ogni **2 min**; check fallito = servizio down per l'intero tick          | Mai interrompere, neanche per 1 secondo                                |
| **8**  | Snapshot organizzatori = **perdita di tutte le patch non validate + tick irrecuperabili** | **MAI** usarlo: rollback solo dal backup LOCALE                        |
| **9**  | `Punteggio = Vuln × %Uptime`                                                              | Vedi sopra                                                             |
| **10** | Spareggio: 1) uptime più alto, 2) prima notifica valida                                   | Annota l'orario di ogni notifica                                       |
| **11** | **IA VIETATA in gara**                                                                    | Questi documenti vanno studiati e memorizzati prima                    |

---

## ⏱️ TIMELINE STRATEGICA DI GARA

### 🟢 PRIMI 10 MINUTI — "Congela e fotografa" (NON patchare ancora)
```
Membro 1 (Host)    : backup /etc /home + chattr +i snapshot + audit SUID/getcap/sudoers
Membro 2 (Network) : ss -tulpn baseline + tcpdump pcap + lsof LISTEN
Membro 3 (Web/Bin) : backup /var/www /opt + dump DB + curl baseline + grep webshell
TUTTI              : lanciare pspy64, costruire /root/healthcheck.sh, fissare la baseline VERDE
```
> ⚠️ Non applicare nessuna modifica prima di avere il backup congelato e la baseline. Senza rete di sicurezza, un errore = catastrofe.

### 🟡 MINUTI 10-70 — "Quick wins" (le vulnerabilità che conoscete a memoria)
Priorità alle falle a basso rischio-uptime e alta certezza: SUID anomali (`chmod u-s`), capabilities (`setcap -r`), sudoers aperti, account backdoor, webshell evidenti, porte palesemente di troppo. Ciclo completo a 7 fasi su ciascuna, **una per volta**, validando prima di passare oltre.

### 🟠 FASE CENTRALE — "I pezzi difficili" (demoni, binari, RCE)
Qui servono sandboxing systemd ed egress filtering: demoni C/Python con overflow o RCE si **ingabbiano** (override `ProtectSystem=strict`, `NoNewPrivileges`, `SystemCallFilter`) e si isola l'uscita (`iptables -m owner --uid-owner`). Niente ricompilazioni rischiose sotto pressione: la gabbia neutralizza l'exploit lasciando il servizio up.

### 🔴 ULTIMI 30 MINUTI — "Consolida, non rischiare"
Smetti di aprire nuovi fronti. Verifica che **tutte** le patch notificate siano ancora verdi. Nessuna modifica dell'ultimo minuto che possa rompere l'uptime nei tick finali. Sorveglia l'health-check in loop. Un tick rosso negli ultimi minuti pesa quanto uno all'inizio.

---

## 🚨 PROTOCOLLO DI CRISI — "Un servizio è caduto / tick rosso"
```
                    ┌─────────────────────────────┐
                    │  TICK ROSSO su un servizio  │
                    └──────────────┬──────────────┘
                                   ▼
                 ┌──────────────────────────────────┐
                 │ L'ho toccato io negli ultimi 4min?│
                 └───────┬──────────────────┬────────┘
                    SÌ   │                  │  NO
                         ▼                  ▼
            ┌────────────────────┐   ┌──────────────────────────┐
            │ ROLLBACK IMMEDIATO │   │ È un ATTACCO in corso?    │
            │ dal backup locale  │   │ (tcpdump / pspy / log)    │
            │ (Fase 6, <30s)     │   └──────┬─────────────┬──────┘
            └─────────┬──────────┘      SÌ  │             │ NO
                      ▼                     ▼             ▼
              healthcheck.sh        ┌───────────────┐  ┌─────────────┐
              torna VERDE?          │ Virtual patch │  │ Diagnostica │
                      │             │ egress/iptbl/ │  │ journalctl  │
                      ▼             │ rate-limit +  │  │ + ripristino│
              Rianalizza offline    │ sandbox       │  │ servizio    │
              cosa ha rotto         └───────────────┘  └─────────────┘
```
**Regole di crisi:**
1. **Mai** chiedere lo snapshot degli organizzatori (Art. 8). Il rollback è **sempre** locale.
2. Prima ripristina il verde, **poi** capisci cosa è andato storto.
3. Un tick rosso isolato non è un disastro; una macchina giù per 10 tick sì.
4. Cause tipiche di tick rosso auto-inflitto: `ProtectSystem=strict` senza `ReadWritePaths`; egress DROP troppo ampio; `chattr +i` su dir che l'app scrive; rate-limit `hitcount` troppo basso.

---

## 🗂️ SCHEDA TATTICA — da compilare a inizio gara

### Servizi & porte identificate (baseline Fase 0)
| Porta | Servizio | Utente processo | Check scorebot atteso | Note |
| :---: | :------- | :-------------- | :-------------------- | :--- |
|  22   | SSH      | root            | banner + connessione  |      |
|  80   |          | www-data        | HTTP 200              |      |
| 8080  |          |                 | HTTP 200 / JSON       |      |
|       |          |                 |                       |      |
|       |          |                 |                       |      |

### Registro notifiche (per spareggio Art. 10)
| # | Orario | Servizio | Vulnerabilità | Patch applicata | Validata (2 tick)? |
| :---: | :---: | :--- | :--- | :--- | :---: |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

### Checklist PRE-NOTIFICA (Fase 4 — obbligatoria)
- [ ] POC offensivo rieseguito → **FALLISCE** (Permission denied / connection dropped)
- [ ] `/root/healthcheck.sh` → **TUTTO VERDE**
- [ ] Payload/header identici alla baseline (`diff`)
- [ ] Backup del file toccato ancora disponibile e congelato
- [ ] Orario annotato nel registro

---

## 👥 CHI FA COSA (colpo d'occhio)
| Membro             | Perimetro                                                           | Patch-firma                                          |
| :----------------- | :------------------------------------------------------------------ | :--------------------------------------------------- |
| **1 — Host**       | SUID, capabilities, sudoers, cron, chattr /etc, systemd confinement | `chmod u-s`, override systemd, `chattr +i`           |
| **2 — Network**    | ss, iptables/nftables, egress, tcpdump, eBPF, fail2ban              | egress per-uid, rate-limit, drop payload             |
| **3 — Web/Binari** | Nginx/Apache, web app, DB, demoni C/Python, firejail                | webroot immutabile, deny exec upload, sandbox demone |


> 📌 Un solo membro scrive su un dato servizio alla volta. Comunicate ogni modifica ad alta voce.

---

## 🧭 IL CICLO DA RIPETERE (promemoria 7 fasi)
```
0 Baseline → 1 Backup → 2 Hunting+POC → 3 Patch chirurgica → 4 Valida (POC KO + SLA OK) → 5 Notifica+TickWatch → [verde ✅ | rosso → 6 Rollback]
```
Dettaglio comandi completo nell'artefatto **`02_CHEATSHEET_OPERATIVO_GARA.md`**. Cosa studiare e ruoli nell'artefatto **`01_COSA_STUDIARE_E_ROADMAP.md`**.
