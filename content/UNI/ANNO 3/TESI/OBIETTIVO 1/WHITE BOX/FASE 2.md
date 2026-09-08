##### Python per executor
[STEP 0] Setup Ambiente con UV & Dipendenze

│ (uv init, uv add openai pydantic "mcp<2" langgraph ...)

▼

[STEP 1] Contratti Dati Rigidi

│ (executor/models.py: ToolCallRecord, TestStep, StepResult)

▼

[STEP 2] Gateway MCP & Tool Slicing

│ (executor/mcp_bridge.py: clear_cache, list_tools filtrati, call_tool)

▼

[STEP 3] L'Auditor Agent Multi-Turno & Test Isolato

│ (executor/executor.py: System Prompt Auditor, loop tool calling)

│ (executor/run_test.py: Test reale su FASE_1 contro Kali)

▼

[STEP 4] Parser dell'Attack Plan Markdown

│ (orchestrator/plan_parser.py: estrazione sezioni e blocchi YAML)

▼

[STEP 5] Macchina a Stati Finiti con LangGraph

│ (state.py, nodes.py, graph.py: StateGraph, routing deterministico)

▼

[STEP 6] Entrypoint CLI & Esecuzione End-to-End

(main.py: uv run python main.py -> test su container Pizzeria)


Supporto a più indirizzi IP
