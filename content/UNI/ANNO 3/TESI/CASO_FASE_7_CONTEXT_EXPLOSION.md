# 💥 Post-Mortem Caso FASE_7: Host Blindness, Context Explosion & Truncation Guards

Analisi approfondita dell'incidente verificatosi durante l'esecuzione del Golden Path (Run `output_8`) e soluzioni architetturali per la tesi di laurea.

---

## 📌 1. Il Contesto del Successo Iniziale (6 Step su 10 Conclusi)
Nella sessione del Golden Path, VulcaTest White-Box ha superato con successo e in completa autonomia le prime 6 fasi:
1. **FASE_1 (Nmap):** Superficie di attacco identificata (porte 22 e 80).
2. **FASE_2 (Web Recon):** Discovery di `/orari.php`.
3. **FASE_3 (LFI Vuln):** Individuazione parametro vulnerabile `file`.
4. **FASE_4 (Arbitrary File Read):** Lettura ed estrazione del contenuto di `/etc/passwd`.
5. **FASE_5 (Credential Harvesting):** Estrazione credenziali `user:user` da `config.php`.
6. **FASE_6 (Foothold & Flag):** Login SSH non interattivo via `expect` ed estrazione della User Flag reale: `VDSI{f00th0ld_4cqu1r3d_ch3_p1zz4}`.

---

## 💥 2. L'Incidente di FASE_7 (La Catena Causale)

L'obiettivo di FASE_7 era:
> *"Enumerare il filesystem per individuare lo script bash amministrativo /opt/test.sh ed estrarre la password in chiaro dell'utente franchino."*

Ecco la dinamica esatta del blocco:

### A. Host Blindness (Confusione tra Kali e Target)
* Nelle fasi 1-5, lanciare comandi su Kali (`curl`, `nmap`) era corretto perché Kali operava da client attaccante verso il target `172.17.0.2`.
* In FASE_6 l'agente ha usato `expect` per eseguire `ssh user@172.17.0.2 "cat user.txt"`.
* Arrivato a FASE_7, l'agente ha letto come azione consigliata: `find / -name "*.sh" 2>/dev/null | grep -v "/proc"`.
* **L'errore cognitivo:** L'agente ha dimenticato di trovarsi sull'host attaccante (Kali) e ha invocato direttamente:
  ```json
  execute_command({"command": "find / -name \"*.sh\" 2>/dev/null | grep -v \"/proc\""})
  ```
* Il comando è stato eseguito **sul filesystem di Kali Linux**, non dentro il container Docker bersaglio!

### B. Unbounded Tool Output (Esplosione di Byte)
* Kali Linux contiene centinaia di pacchetti di sicurezza (Metasploit, ExploitDB, Python virtual environments, TeXLive, ecc.).
* La ricerca `find / -name "*.sh"` ha restituito **oltre 86.000 caratteri (migliaia di percorsi)**.
* Il modulo `mcp_bridge.py` non possedeva filtri di troncamento e ha catturato l'intero output raw.

### C. Context Length Exceeded a Cascata (Effetto Domino)
1. **Saturazione Executor (Qwen3-Coder):**
   - La conversazione è schizzata a **16.470 token**, superando la context window del modello (8.192 / 15.872 token).
   - Qwen3-Coder ha risposto con `400 context_length_exceeded` e lo step è stato dichiarato `FAILED`.
2. **Saturazione Final Evaluator (Qwen 3.8):**
   - L'Orchestrator ha passato lo stato al `final_evaluator_node`.
   - Il `model_manager` ha caricato `Qwen3.8-27B` in VRAM con context window di 15.872 token.
   - Nella costruzione del prompt per il `REPORT.md`, `nodes.py` ha serializzato l'intero `step_result` di FASE_7, compresi gli 86 KB di output del `find`.
   - Il prompt per Qwen 3.8 ha raggiunto **17.286 token**, superando anche i 15.872 token del valutatore:
     ```text
     Message too long: 17286 tokens exceeds the 15872-token context window
     ```
3. **Ghost Fallback Bug:**
   - Fallita la chiamata a Qwen 3.8, il codice ha tentato un fallback automatico su `Qwen3-Coder`.
   - Ma `Qwen3-Coder` era stato appena rimosso dalla VRAM per caricare Qwen 3.8! Unsloth Studio ha quindi restituito `404 model_not_found`.

---

## 🛠️ 3. Le 4 Soluzioni Architetturali per VulcaTest

### Soluzione 1: Truncation Guard di Sicurezza in `mcp_bridge.py`
Nessun tool di sistema deve poter restituire un payload illimitato all'LLM.
* Se l'output supera **4.000 caratteri** (~1.000 token), il bridge tronca l'output e aggiunge una direttiva esplicita:
  ```text
  [⚠️ OUTPUT TRONCATO: visualizzati 4000 caratteri su 86420 totali. Usa grep, head, tail o restringe la directory di ricerca (es. /opt, /var/www)]
  ```
* **Impatto:** Azzeramento matematico di qualsiasi crash da context length overflow nell'agente.

### Soluzione 2: Target Awareness & Post-Exploitation Wrapper
Risolvere alla radice la confusione dell'agente tra la macchina locale (Kali) e il target remoto:
* **Nel Prompt dell'Executor:** Istruzione vincolante: *"Una volta acquisito il foothold SSH, tutti i comandi di post-exploitation sul target DEVONO essere incapsulati nella sessione SSH remota (es. `sshpass -p <PASS> ssh user@<TARGET_IP> '<COMANDO>'`). Il tool `execute_command` gira su Kali!"*.
* **Nell'Attack Plan (`ATTACK_PLAN.md`):** Nei comandi consigliati di FASE_7 e successive, specificare l'esecuzione remota:
  ```bash
  sshpass -p user ssh -o StrictHostKeyChecking=no user@<TARGET_IP> "find /opt -name '*.sh' 2>/dev/null"
  ```
  *(Cercare solo in `/opt` o `/home` invece di `/` sul target, che è mirato, didatticamente corretto e produce 1 sola riga!)*.

### Soluzione 3: Sanitizzazione dei Dati nel Final Evaluator (`nodes.py`)
Prima di serializzare lo storico delle chiamate per `Qwen 3.8`:
* Filtrare gli output di `ToolCallRecord` tagliandoli a max **1.500 caratteri** per singola invocazione.
* In questo modo il prompt della Root Cause Analysis rimarrà sempre compatto (~2.500 token), lasciando a Qwen 3.8 tutto lo spazio per elaborare un report approfondito.

### Soluzione 4: Pulizia del Fallback Locale in `nodes.py`
* Rimuovere la chiamata a `Qwen3-Coder` in caso di errore di `Qwen 3.8`. Con lo switch a caldo della VRAM, l'unico modello disponibile è quello attivo. In caso di errore API, il sistema deve loggare l'eccezione reale senza tentare di invocare modelli scaricati.
