- Ansible
- LLM Agents and MCP
	- Come strutturare un tool per un LLM, come fare il parsing degli output dei comandi da dare in pasto all'AI, logiche di loop agentico (ReAct, Plan-and-Execute).
	- workflow ai
- Proxmox VE
- yaml
- Docker
	- Dockerfile, docker-compose, esposizione porte


- [x] Yaml
- [x] Ansible
- [x] Proxmox VE
- [x] Docker
- [x] LLM Agents
- [x] MCP
- [ ] ReAct
- [ ] AI Workflows
- [ ] LangGraph


PARTE LLM
Certamente! Avere le giuste chiavi di ricerca (keywords) in inglese è fondamentale, perché il 90% del materiale di alta qualità su questi temi super-recenti si trova così (su Google, YouTube o nella documentazione ufficiale).

Ecco un elenco formattato per il "copia-incolla" da usare per le tue ricerche, diviso per fasi:

### Fase 1: Parlare con l'AI via Codice

- _Per capire le basi pratiche:_ `"OpenAI API Python tutorial per principianti"` oppure `"Google Gemini API Python SDK tutorial"`
- _Per capire come istruire l'AI:_ `"System prompt vs User prompt LLM"`
- _Per i concetti teorici importanti:_ `"LLM Context Window limits explained"` e `"LLM parameters: Temperature and Top-P"`

### Fase 2: Fornire le "Braccia" all'AI (Tool Use)

- _La keyword più importante in assoluto:_ `"LLM Function Calling Python tutorial"` (oppure `"OpenAI Tool Calling examples"`)
- _Per capire come l'AI descrive i parametri:_ `"JSON Schema for LLM tools"`
- _Concetti avanzati:_ `"How to pass custom Python functions to LLMs"`

### Fase 3: Il Protocollo Universale (MCP)

_Questo è un argomento nuovissimo (fine 2024), quindi le ricerche devono essere molto specifiche._

- _Il concetto base:_ `"Model Context Protocol Anthropic explanation"`
- _Per iniziare a programmare:_ `"How to build an MCP Server Python"` oppure `"MCP Client implementation Python"`
- _Per il tuo caso specifico:_ `"MCP Kali Linux server integration"`

### Fase 4: Parsing e Pulizia dei Dati

- _Per far rispondere l'LLM in modo leggibile dal codice:_ `"LLM Structured Output JSON format"` oppure `"OpenAI JSON mode tutorial"`
- _Per una libreria Python usatissima a questo scopo:_ `"Using Pydantic with LLMs for structured data"`
- _Per pulire l'output di Ansible prima di darlo all'LLM:_ `"Python Regex for log parsing"` oppure `"Extracting errors from CLI output Python"`

### Fase 5: Il "Cervello" - Logiche di Loop Agentico

_Cerca questi argomenti anche su YouTube, ci sono ottime spiegazioni visive._

- _Il pattern principale:_ `"ReAct prompting framework explained"` oppure `"ReAct agent logic LLM"`
- _Il pattern alternativo:_ `"LLM Plan-and-Execute pattern"`
- _Concetti generali:_ `"How autonomous AI agents work"` oppure `"LLM reasoning loops"`

### Fase 6: Ingegnerizzazione (LangGraph)

_LangGraph è attualmente lo standard de facto dell'industria per queste cose._

- _Le basi assolute:_ `"LangGraph Python tutorial for beginners"`
- _Capire l'architettura:_ `"LangGraph nodes and edges explained"`
- _Per la memoria dell'agente:_ `"Managing state in LangGraph"`
- _Per fargli eseguire i comandi:_ `"LangGraph tool execution node"`

**Un consiglio extra per la ricerca:** Quando cerchi tutorial per la Fase 2, 5 e 6, ti imbatterai spesso nel nome **LangChain**. LangChain è una libreria enorme che ha un po' "inventato" questo settore. LangGraph (Fase 6) è nato proprio come costola di LangChain per fare le cose in modo più pulito. Ti consiglio di saltare i vecchi tutorial su LangChain generico e puntare dritto alle ricerche specifiche su **LangGraph**, risparmierai un sacco di tempo!