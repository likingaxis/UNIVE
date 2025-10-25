+
### Introduzione al labirinto​
- Una principessa è stata rinchiusa e legata in una grotta insieme ad un drago che le fa da guardia.​
    
- Il cavaliere, che vuole salvarla e riportarla a casa, deve entrare nella grotta, aggirare il drago dormiente, prendere la principessa in braccio e portarla all’uscita.​
    
- Il drago è spietato e non deve essere risvegliato, altrimenti mangerà in un solo boccone il cavaliere.​
    
- Le luci sono accese, c’è una sola entrata/uscita.
![[Pasted image 20251024174023.png]]
![[Pasted image 20251024174032.png]]
![[Pasted image 20251024174045.png]]

### PEAS

| PRESTAZIONI                                       | AMBIENTE                                                                                                                                                                                   | ATTUATORI                                                                             | SENSORI                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Salvare la principessa senza risvegliare il drago | Grotta suddivisa in caselle, con un drago che ne occupa 4 una principessa che ne occupa 1, se il drago viene risvegliato la partita è persa, l'agente deve muoversi una casella alla volta | si muove di casella in casella per prendere la principessa, e muoversi verso l'uscita | posizione agente, posizione drago, posizione principessa, uscita della grotta, matrice rappresentativa di tutta la grotta |
#### definizione delle proprietà dell'ambiente 
ambiente totalmente osservabile, singolo agente, deterministico, sequenziale, statico, discreto


### PSEUDO 
- save(AgPos, DrPos, ExPos, PrPos) -> Path, dove:​
    
- AgPos è la posizione (Xa, Ya) iniziale dell’agente​
    
- DrPos è la posizione ((X1, Y1), (X2, Y2), (X3, Y3), (X4, Y4)) del drago​
    
- ExPos è la posizione di entrata/uscita​
    
- PrPos è la posizione (Xp,Yp) della principessa​
    
- Path è la sequenza di azioni (N,S,E,W,P) che il cavaliere esegue per salvare la principessa

si vuole implementare un agente basato su tabella

```scss
function save (AgPos, DrPos, ExPos, PrPos) returns Path


```
