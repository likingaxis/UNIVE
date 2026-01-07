##### Teorema 3.1: Un linguaggio l ⊆ Σ ∗ e decidibile se e soltanto se L e L ` c sono accettabili.
- mi creo una macchina di Turing T' basata sulla macchina che decide lchiamata T
- questa macchina T' estende gli stati di T invertendoli
- creo 2 macchine di Turing T1 e T2 con una che accetta L e l'altra $L^c$
- eseguo in alternanza le due macchine e sono certo che una delle due prima o poi accetterà quindi l è decidibile

Definizione 3.5: Siano Σ e Σ1 due alfabeti finiti; una funzione (parziale) f : Σ ∗ → Σ ∗ 1 e una funzione ` calcolabile se esiste una macchina di Turing T di tipo trasduttore che, dato in input x ∈ Σ ∗ , termina con la stringa f(x) scritta sul nastro output se e soltanto se f(x) e definita.



Sia Σ un alfabeto finito ed L ⊆ Σ ∗ un linguaggio. La funzione caratteristica χL : Σ ∗ → {0,1} di L e una funzione totale ` tale che, per ogni x ∈ Σ ∗ , χL(x) =    1 se x ∈ L 0 se x 6∈ L. 
Teorema 3.2: Un linguaggio L e decidibile se e soltanto se la funzione ` χL e calcolabile. ` Dimostrazione: Supponiamo che L ⊆ Σ ∗ sia decidibile: allora, esiste una macchina di Turing di tipo riconoscitore T, con stato di accettazione qA e stato di rigetto qR, tale che oT (x) =    qA se x ∈ L qR se x 6∈ L.

- prima fase: vedo se X_L è calcolabile
- seconda fase: appurando che X_L sia calcolabile sappiamo di per certo che è totale allora è anche decidibile


