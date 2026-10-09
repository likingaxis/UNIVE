---
title: "Checklist Operativa — Esecuzione Benchmark VulcaTest"
---

# Checklist Operativa delle Run Sperimentali

Questa checklist serve a tracciare **passo dopo passo** l'avanzamento della campagna sperimentale di VulcaTest secondo la strategia incrementale a gradini (*Staged Rollout*).

---

## Stato Attuale
- [x] **Pizzeria — P1-01** (blocco additivo, web-app rimossa): test eseguito con piano congelato e healing.
- [x] **Pizzeria — P2-04** (valore disallineato, password hint errata): test eseguito con piano congelato e healing.

---

## Fase 1: Calibrazione Core 8 Macchine a $K=1$ (Una Macchina alla Volta)
> Esegue la prima replica ($K=1$) su ciascuna macchina perturbata per verificare build, stabilità e assenza di timeout anomali prima di triplicare i tempi.
> **Comando base**: `uv run python benchmark/run_matrix.py --set core15 --profile local --machines <slug> -k 1`

### 1. Pizzeria_B2R
- [x] P1-01 (Run 1) — `web-app-deploy` rimosso *(già fatto)*
- [x] P2-04 (Run 1) — credenziali in `/opt/test.sh` disallineate *(già fatto)*

### 2. AuthGate_B2R
- [x] P1-03 (Run 1) — vhost Nginx errato
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines authgate -k 1
```

### 3. Citadel_B2R
- [x] P1-10 (Run 1) — utente `sysadmin` rimosso
- [x] P3-02 (Run 1) — script sensibile extra world-writable (`0777`)
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines citadel -k 1
```

uv run python benchmark/run_matrix.py --set core15 --profile local --machines cryptovault --cells P3-03 -k 1 --force
### 4. CryptoVault_B2R
- [x] P2-03 (Run 1) — 1 carattere alterato in `.key` (`2026! -> 2026?`)
- [x] P3-03 (Run 1) — permessi/ownership deboli su `.key` o `backup.enc`
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines cryptovault -k 1
```

### 5. ConsoleGate_B2R
- [x] P1-13 (Run 1) — permessi cartella cron ristretti (`0775 -> 0755`)
- [x] P2-06 (Run 1) — token autenticazione demone TCP disallineato
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines consolegate -k 1
```

### 6. NetVault_B2R
- [x] P1-16 (Run 1) — zona DNS AXFR rimossa
- [x] P3-06 (Run 1) — zona AXFR secondaria aperta non prevista
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines netvault -k 1
```

### 7. GitPoison_B2R
- [x] P1-14 (Run 1) — esposizione directory `.git` rimossa
- [x] P3-08 (Run 1) — `root.txt` con permessi laschi `0644` (check negativo)
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines gitpoison -k 1
```

### 8. TunnelGate_B2R
- [x] P2-07 (Run 1) — hash in `shadow.txt` disallineato
- [x] P3-07 (Run 1) — utente `trainee` aggiunto al gruppo `shadow`
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local --machines tunnelgate -k 1
```

---

## Fase 2: Completamento a $K=3$ con `--resume` (Run 2 e 3)
> Una volta che tutte le 15 celle hanno chiuso la Run 1 con successo, si lanciano le repliche 2 e 3 con `--resume`.
> Il runner salterà automaticamente tutte le Run 1 già presenti nel ledger.
```bash
uv run python benchmark/run_matrix.py --set core15 --profile local -k 3 --resume
```
- [x] Pizzeria (P1-01, P2-04) — Run 2 e Run 3
- [x] AuthGate (P1-03) — Run 2 e Run 3
- [x] Citadel (P1-10, P3-02) — Run 2 e Run 3
- [x] CryptoVault (P2-03, P3-03) — Run 2 e Run 3
- [x] ConsoleGate (P1-13, P2-06) — Run 2 e Run 3
- [x] NetVault (P1-16, P3-06) — Run 2 e Run 3
- [x] GitPoison (P1-14, P3-08) — Run 2 e Run 3
- [x] TunnelGate (P2-07, P3-07) — Run 2 e Run 3

---

## Fase 3: E2 Clean Runs di Controllo (Negative Controls, 3x per Macchina Golden)
> Servono a quantificare i True Negative e False Positive per la Confusion Matrix.
> **Comando**: `uv run python benchmark/run_matrix.py --gate --profile local --machines <slug> -k 3`

- [ ] Pizzeria Golden (3x)
- [ ] AuthGate Golden (3x)
- [ ] Citadel Golden (3x)
- [ ] CryptoVault Golden (3x)
- [ ] ConsoleGate Golden (3x)
- [ ] NetVault Golden (3x)
- [ ] GitPoison Golden (3x)
- [ ] TunnelGate Golden (3x)

*(Oppure in un colpo solo per tutte le 8 macchine):*
```bash
uv run python benchmark/run_matrix.py --gate --profile local --machines pizzeria,authgate,citadel,cryptovault,consolegate,netvault,gitpoison,tunnelgate -k 3
```

---

## Fase 4: E1 — Valutazione del Planner (Live Plan Generation su Macchine Sane)
> Valuta se il Planner genera un Attack Plan operativo e compatibile con l'Executor su macchina Golden.
> 11 macchine $\times$ 3 run con `--gate-regen-plan`.
```bash
uv run python benchmark/run_matrix.py --gate --gate-regen-plan --profile local -k 3
```
- [ ] Pizzeria (3x)
- [ ] AuthGate (3x)
- [ ] Citadel (3x)
- [ ] CryptoVault (3x)
- [ ] ConsoleGate (3x)
- [ ] NetVault (3x)
- [ ] GitPoison (3x)
- [ ] TunnelGate (3x)
- [ ] DataVault (3x)
- [ ] WebMaster (3x)
- [ ] PrivAudit (3x)

---

## Fase 5: Estrazione Risultati e Calcolo Metriche
> Da eseguire alla fine della campagna sperimentale.
```bash
uv run python benchmark/scorer.py --profile local
```
Verificare la corretta generazione di:
- [ ] `benchmark/results/scores/aggregate.json`
- [ ] `benchmark/results/scores/per_run.csv`
- [ ] Tabella della Matrice di Confusione B1 (Precision, Recall, F1)
- [ ] Tasso di accuratezza diagnostica B2 (RCA Accuracy)
- [ ] Tasso di successo dell'autoriparazione B3 (Healing Success Rate)
- [ ] Report consumo token e tempi B4
