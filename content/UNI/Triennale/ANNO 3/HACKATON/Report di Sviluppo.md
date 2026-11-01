##### Componenti del gruppo
- Valerio Bernardi
- Alfredo Grande 
- Samuele De santis
- Luca Gugliotta
### 1. Riepilogo dello Sviluppo
**Fase 1: Setup e Analisi Iniziale**
* Analisi dei requisiti tecnici delle challenge.
* Definizione della struttura modulare del progetto.
* Configurazione dell'ambiente virtuale (`venv`) e gestione dipendenze.

**Fase 2: Challenge 1 (MCP Server & Telemetria)**
* Sviluppo di `mcp-server-struffoli.py`: implementazione dei tool per l'estrazione e l'analisi di dati JSON/JSONL.
* Testing delle capacità di aggregazione dati (es. medie temperature, logica dei pit stop).

**Fase 3: Challenge 2 (RAG & Compliance)**
* Implementazione della pipeline di ingestione: upload, chunking e indicizzazione dei PDF nel **OCI Vector Store**.
* Sviluppo del motore di ricerca semantica (FastAPI) per il recupero delle normative.

**Fase 4: Challenge 3 (Integrazione & Web App)**
* Creazione del client unificato per interrogare simultaneamente telemetria e documenti.
* Sviluppo dell'interfaccia **Streamlit** finale con visualizzazione dati in tempo reale e chat intelligente.

---

### 2. Architettura
![[tree.png]]


---

### 3. Mappa dei Componenti (File)

| File | Descrizione |
| :--- | :--- |
| `mcp-server-struffoli.py` | Server MCP dedicato all'analisi della telemetria (JSON/JSONL). |
| `upload_file.py` | Carica i PDF (regolamenti/dossier) nel Vector Store con logica di chunking. |
| `file_search.py` | Server FastAPI che gestisce la logica RAG per le verifiche di compliance. |
| `chat_bot.py` | Interfaccia Streamlit dedicata esclusivamente al testing del Task 2. |
| `client.py` | Client Responses API unificato che interroga sia MCP che `file_search`. |
| `interfaccia.py` | **Web App finale Streamlit**: integra telemetria, documenti e UI Race Engineer. |

---

### 4. Istruzioni per l'Esecuzione
**Setup Ambiente:**
```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Esposizione Pubblica:**
Poiché non avevamo una porta aperta sull'IP pubblico, abbiamo utilizzato **ngrok** per il tunneling:
```
ngrok http 8000
```

**Avvio dei Servizi (Terminali separati):**
1. **Server MCP:** `uvicorn mcp-server-struffoli:app --host 0.0.0.0 --port 8000`
2. **Caricamento dei file PDF nel Vector Store**: `python3.12 upload_file.py`
3. **Motore RAG:** `python3.12 file_search.py`
4. **Web App Finale:** `streamlit run interfaccia.py`

---

### 5. Esempi di Interrogazione (Demo Cases)
#### Demo Task 2: Example Challenge Questions

##### 1. Is the new rear wing geometry compliant with aerodynamic regulations?

###### RISPOSTA
**1. Understanding of the request**
Compliance check for the new rear‑wing geometry (RW-26C) for the STV-E26.

**2. Compliance conclusion**
**Non‑compliant**

**3. User‑provided specifications (from Technical Dossier for RW-26C)**
*   **Total width:** 1190 mm
*   **Main-element chord:** 308 mm
*   **Rearward extension:** 286 mm
*   **End-plate envelope:** 810 mm × 415 mm

**4. Documented requirements (Reg. 3.2 & 3.3)**
*   **Total width:** ≤ 1200 mm
*   **Max chord:** ≤ 300 mm
*   **Rearward extension:** ≤ 250 mm from rear-axle centreline.
*   **End-plate envelope:** ≤ 820 mm × 420 mm

**5. Specification comparison**
| Parameter | Experimental Spec | Requirement | Status |
| :--- | :--- | :--- | :--- |
| Total width | 1190 mm | ≤ 1200 mm | **Match** |
| Main-element chord | 308 mm | ≤ 300 mm | **Mismatch** |
| Rearward extension | 286 mm | ≤ 250 mm | **Mismatch** |
| End-plate envelope | 810x415 mm | ≤ 820x420 mm | **Match** |

**6. Detailed reasoning**
Two mandatory dimensional limits (chord and rearward extension) are violated. The chord exceeds the limit by 8 mm and the extension by 36 mm.

**7. Compliance risk: High.**

**8. Documentation support score: 88%.**

---

##### 2. Can the BAT-X9 accumulator enclosure material be used under the safety rules?
*(Note: Questa risposta differisce dalla precedente per la mancanza di testi regolamentari nei documenti forniti in questa specifica analisi)*

###### RISPOSTA
**1. Compliance conclusion**
**Insufficient information** – the supplied documents do not contain the actual safety‑rule text to allow a definitive judgement.

**2. Documented requirements (found in files)**
*   `fs_e26_technical_dossier.pdf`: “BAT-X9... material compliance review required.”
*   No regulation handbook excerpts are present in the provided documents for this specific check.

**3. Detailed reasoning**
The dossier flags the material (1.5 mm Mg-Li) as needing review. Without the specific rule clauses defining acceptable materials or prohibited alloys, we cannot verify compliance.

**4. Documentation support score: 45%.**

---

##### 3. Does the SA-LF-OPT suspension arm satisfy the dimensional constraints?

###### RISPOSTA
**1. Compliance conclusion**
**Insufficient information**

**2. User‑provided specifications**
No numerical dimensions (chord, thickness, etc.) were supplied in the query.

**3. Documented requirements (Technical Dossier Section 3.1)**
*   **Max fairing chord:** 34 mm
*   **Max fairing thickness:** 18 mm
*   **Structural insert wall thickness:** 1.2 mm steel
*   **Qualitative:** Split line must leave rod-end inspection area visible.

**4. Detailed reasoning**
The dossier defines the limits, but without the actual measurements of the manufactured SA-LF-OPT component, compliance cannot be determined.

**5. Suggested actions**
Provide measured dimensions and confirm if the split line leaves the rod-end visible.

**6. Documentation support score: 84%.**

---
#### Demo Task 3
##### DOMANDA 1
**Richiesta:** What is happening to the front-left tyre at lap 23, and should we pit?

###### RISPOSTA
**1. Understanding of the request**
You asked for a diagnosis of the front‑left tyre condition at lap 23 and whether a pit stop should be taken at this point in the race.

**2. Evidence source and weighting**
*   **Source used:** MCP only
*   **MCP contribution:** 100%
*   **file_search contribution:** 0%
*   **Reason for weighting:** The question concerns live tyre telemetry, driver feedback and the current race‑strategy context, all of which are provided by the MCP telemetry system. No regulatory or dossier information is required.

**3. Race / telemetry findings (lap 23)**

| Parameter | Value | Comment |
| :--- | :--- | :--- |
| **Tyre temperature (FL)** | 98.6 °C | Significantly above the optimal 90 °C window for the M2 compound – indicates overheating. |
| **Wear % (FL)** | 61.4 % | Exceeds the expected wear of 43.1 % for this lap. |
| **Degradation rate %/lap (FL)** | 5.48 % | Much higher than the other corners (≈1.5‑1.9 %/lap). |
| **Driver feedback** | — | “Front‑left is overheating. Pace falling in sector 2.” Confirms the sensor data. |
| **Strategy context** | — | Pit‑window status: **urgent**. Estimated pit loss: 18.6 s. Positions lost if pitting now: 2.5. Projected finish (no stop): 9. Projected finish (pit now): 7. |
| **Race-control status** | — | Track status: green (no safety‑car). No external constraint on pitting. |

**4. Interpretation**
*   **Overheating & high wear:** The front‑left tyre is both hotter than optimal and wearing far faster than the model predicts. At 61% wear, the remaining life is limited; the degradation rate suggests the tyre could reach a critical failure point (≈80% wear) within 3-4 laps.
*   **Performance impact:** The driver notes a loss of pace in sector 2, consistent with reduced grip from an overheated, heavily worn tyre.
*   **Strategic impact:** The strategy engine marks the pit window as urgent and forecasts a net gain of two positions by stopping now. Staying out would likely drop the car to ninth place.

**5. Strategy recommendation**
**Pit at the next available window (lap 24-25).**
The tyre’s condition poses a high risk of failure. The strategy model predicts a better finishing position after pitting now (7th vs 9th).

**6. Operational risk**
| Risk type | Level | Reason |
| :--- | :--- | :--- |
| **Tyre failure / loss of performance** | High | Overheating + >60% wear + degradation >5%/lap. |
| **Pit-stop time loss** | Medium | 18.6 s loss is typical; mitigated by expected position gain. |
| **Overall race outcome** | Low/Med | Expected to improve final position; minimal additional risk. |

**7. Missing information**
*   Confirmation of any upcoming safety‑car periods.
*   Real-time tyre pressure trends (currently stable at 1.522 bar).

**Conclusion:** The front‑left tyre is overheating and wearing excessively fast. An urgent pit stop is advisable.

---

##### DOMANDA 2
**Richiesta:** Can the BAT-X9 accumulator enclosure material be used under the safety rules?

###### RISPOSTA
**1. Understanding of the request**
You want to know whether the proposed BAT‑X9 accumulator enclosure complies with the Formula Student AI Endurance safety regulations.

**2. Evidence source and weighting**
*   **Source used:** file_search only
*   **file_search contribution:** 100%
*   **Reason for weighting:** Purely a regulatory‑compliance query.

**3. Compliance conclusion**
**Non‑compliant**

**4. User‑provided specifications**
*   **Outer shell material:** 1.5 mm magnesium‑lithium sheet
*   **Inner liner:** 3.0 mm aramid panel
*   **Status in dossier:** “Material compliance review required” (not yet passed)

**5. Documented requirements (Source: Section 5.3 – STV Organizer Pack 2026)**
*   **Allowed:** Aluminum alloy (min. 2.0 mm), Steel (min. 1.0 mm), or specific certified Composite laminate.
*   **Prohibited:** “Magnesium, magnesium‑lithium alloys... shall not be used as the primary load‑bearing enclosure material.”

**6. Specification comparison**
*   **Material type:** User: magnesium‑lithium (prohibited). Regulation: Aluminum, steel, or composite only.
*   **Wall thickness:** User: 1.5 mm (below the 2.0 mm minimum for aluminum).
*   **Compliance status:** Mismatch – material is expressly forbidden.

**7. Detailed reasoning**
The technical dossier identifies the BAT-X9 as using magnesium-lithium. The regulations (Section 5.3) explicitly list magnesium-lithium alloys as prohibited for the primary load-bearing enclosure. The enclosure fails the material-acceptability test regardless of thickness or liner.

**8. Compliance risk**
**High** – Could lead to scrutineering rejection or mandatory redesign.

**9. Suggested corrections**
*   **Option A:** 2.0 mm (or greater) 6061-T6 aluminum.
*   **Option B:** 1.0 mm steel.
*   **Option C:** Certified composite laminate with aramid inner layer.

**10. Sources used**
*   `fs_e26_technical_dossier.pdf` – Section 7.2
*   `fs_ai_endurance_regulations.pdf` – Section 5.3

**11. Documentation support score: 94%**

---

##### DOMANDA 3
**Richiesta:** Generate an exciting social media post after our successful late-race tyre strategy.

###### RISPOSTA
**Public‑facing copy**

🚀 **Late‑race masterclass!** 🚀
Our daring tyre strategy paid off in the final laps – a perfect blend of speed, precision, and teamwork. The crew’s bold call gave us the grip we needed to surge past the competition and clinch an unforgettable finish.

A massive thank you to the drivers, engineers, and every member of #ScuderiaTorVergata for making it happen. This is what racing is all about – pushing limits and thriving under pressure!

#ScuderiaTorVergata #Motorsport #FormulaStudent #RaceStrategy #TyreBrilliance #AI #Engineering #VictoryLap 🏁💨


---

### 6. Limitazioni del Sistema
* **Dataset Telemetrico:** L’MCP server lavora su un dataset simulato in formato JSON/JSONL, non su stream live via bus CAN.
* **Tempi di Indicizzazione:** Il caricamento di nuovi PDF nel Vector Store richiede un tempo tecnico di elaborazione prima di rendere i dati disponibili.
* **Qualità del Retrieval:** La precisione delle citazioni dipende strettamente dalla qualità del chunking applicato durante l'upload.
* **Disallineamento UI:** Le visualizzazioni grafiche in Streamlit leggono il file JSON locale, mentre il ragionamento dell'AI avviene tramite il server MCP.

### 7. Nota Tecnica sulla Ponderazione (Weighting)
L'interfaccia specifica in percentuale l'origine delle informazioni. Questa funzione assicura che:
*   Le risposte di diagnostica provengano prioritariamente dal **Server MCP**.
*   Le verifiche su regolamenti e specifiche del **vehicle** provengano dal **Vector Store**.
*   Se un contributo è nullo (es. post social), il sistema dichiara che il contenuto è generato senza l'ausilio di tool esterni.
