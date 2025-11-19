## simulatore d'ambiente

```scss
function RUN-EVAL-ENVIR (state, UPDATE-FN, CV, PERFORMANCE-FN) returns CE
  local variables  CE   % inizialmente 0

  repeat
      (NWpos, Dpos, PRpos, EXpos) ← GET-PERCEPT(CV, state)

      Action ← CV-PROG(NWpos, Dpos, PRpos, EXpos)

      state  ← UPDATE-FN(state, Action)

      CE     ← PERFORMANCE-FN(state, CE)

  until TERMINATION(state)

  return CE

```
---
🔹 `GET-PERCEPT(CV, state)`
Legge dallo **stato del mondo** le informazioni che l’agente può osservare  
(es. posizione cavaliere, principessa, drago, uscita)  
e le passa come **percezione** al programma agente.
🔹 `CV-PROG(...)`
È il **programma dell’agente** (il cavaliere):  
prende la percezione e decide **una sola azione** da compiere in questo ciclo  
(es. N, S, E, O).
🔹 `UPDATE-FN(state, Action)`
Aggiorna lo **stato dell’ambiente** applicando l’azione:  
sposta il cavaliere, segna se ha preso la principessa, controlla se è finito sul drago, ecc.
🔹 `PERFORMANCE-FN(state, CE)`
Aggiorna il **costo / punteggio cumulativo** in base al nuovo stato  
(es. +1 per ogni passo, penalità se entra in zona pericolosa).
🔹 `TERMINATION(state)`
Controlla se la simulazione deve finire  
(es. cavaliere è uscito con la principessa, oppure è morto, oppure finito il tempo).
🔹 `return CE`
Restituisce il **costo totale** (o score) del comportamento dell’agente nell’ambiente.

## ⚙️ PROGRAMMA AGENTE

```scss
function CV-PROGRAM(percept) returns action
    persistent:
        plan      % sequenza di azioni
        state     % stato interno stimato (posizioni ecc.)
        goal      % goal corrente
	    problem 

    if (CVpos = PRpos) and (hasPrincess = false) then
        hasPrincess ← true
        goal ← "torna_all_uscita"
        plan ← EMPTY          % forza una nuova pianificazione
    if (hasPrincess = true) and (CVpos = EXpos) then
        return exit       
    if plan = EMPTY then
        if hasPrincess = false then
            goal ← PRpos      % primo goal: raggiungi principessa
        else
            goal ← EXpos      % secondo goal: torna all’uscita
        problem ← FORMULATE-PROBLEM(perception, goal)
        plan    ← SEARCH(problem)   % es. A* su MAZE evitando Dpos
        if plan = failure then
            return null-action
    end if
    action ← FIRST(plan)
    plan   ← REST(plan)
    return action
```

## 🔍 Significato riga per riga
**1. `FORMULATE-PROBLEM(state, goal)`**
Costruisce il _problema di ricerca_ da dare all’algoritmo di pianificazione.  
Contiene:
- stato iniziale (posizione attuale)
- goal da raggiungere
- azioni disponibili
- modello di transizione
- costi
- euristica
Serve per dire al planner **“da qui voglio arrivare lì, questo è il mondo”**.
 **2. `SEARCH(problem)`**
Esegue l’algoritmo di ricerca (es. A*).  
Input: problema formale.  
Output: **plan**, cioè una lista di azioni ottima per raggiungere il goal.  
Se non trova soluzione → `failure`.
Serve per **calcolare il percorso**.
 **3. `FIRST(plan)`**
Restituisce la **prima azione** della lista `plan`.
Serve per **decidere cosa fare ora**.
 **4. `REST(plan)`**
Rimuove la prima azione dalla lista, lasciando il resto.
Serve per **avanzare nel piano** passo dopo passo.
**5. Logica di cambio goal**
Nel codice ci sono due condizioni speciali:
- **se raggiunge la principessa** ⇒ cambia goal all’uscita e svuota il piano
- **se raggiunge l’uscita** ⇒ termina (`exit`)
Serve per gestire **le due fasi** del problema.
**6. `return action`**
Restituisce l’azione da eseguire **in questo ciclo**.

### A*

```scss
function A* (problem) returns a solution or failure
nodo <- nodo con stato = problem.initialstate
frontiera <- coda di priorità ordinata in base a f(n) con all'inizio solo nodo "nodo"
esplorati <- insieme dei nodi esplorati inizialmente vuoto
loop do
    if frontiera is empty? then return failure
    nodo <- POP(frontiera)
    if problem.GOALTEST(nodo.state) then return SOLUTION(nodo)
    add nodo.state to esplorati
    for each action in problem.ACTIONS(nodo.state) do
        child <- CHILD-NODE(problem, nodo, action)
        if child.state non in frontiera or esplorati then
            frontiera <- INSERT(child.state)
        else if child.state is in frontiera con f(n) più alto allora
            replace that frontier node with child
```

🔹 `problem.initialstate`
Stato iniziale del problema: da dove parte la ricerca.
🔹 `frontiera` (priority queue su f(n))
Insieme dei nodi “da esplorare dopo”, ordinati per **f(n) = g(n) + h(n)**.  
`POP(frontiera)` prende il nodo con f più piccolo.
🔹 `esplorati`
Insieme degli **stati già espansi**: serve per non riesplorare gli stessi stati.
🔹 `problem.GOALTEST(nodo.state)`
Test logico: controlla se lo stato del nodo corrente è un **goal**.  
Se sì → ricostruisce e ritorna la soluzione (`SOLUTION(nodo)` seguendo i parent).
🔹 `problem.ACTIONS(nodo.state)`
Restituisce l’insieme delle **azioni applicabili** in quello stato (es. {su, giù, dx, sx}).
🔹 `CHILD-NODE(problem, nodo, action)`
Crea il **nodo figlio**:
- calcola il nuovo stato con il modello di transizione
- aggiorna g(n), h(n), f(n)
- mette il `parent` = `nodo` e l’azione usata.
🔹 Test su `frontiera` / `esplorati`
- se lo stato del figlio non è mai stato visto → lo inserisce in `frontiera`
- se è già in `frontiera` ma con f peggiore → lo **sostituisce** con la versione migliore