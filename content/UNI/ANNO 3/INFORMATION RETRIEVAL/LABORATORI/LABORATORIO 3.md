https://colab.research.google.com/drive/1XHONRbBC7tMeTzhIW3-jJoaet4snEbDr?usp=sharing

#### BM25 AND LANGUAGE MODELS
L'obiettivo non è solo implementare le formule, ma capire:

- perché BM25 modifica TF-IDF;
- perché la term frequency deve saturare;
- perché la lunghezza dei documenti va normalizzata;
- perché nei language model serve lo smoothing;
- come cambiano i ranking prodotti dai diversi modelli.

1. caricamento della stessa collezione del laboratorio precedente
2. preprocessing dei documenti
3. costruzione delle statistiche della collezione
4. intuizione della formula BM25
5. analisi del ruolo di k1
6. analisi del ruolo di b
7. implementazione di BM25
8. ispezione dei contributi termine-per-termine
9. confronto qualitativo con TF-IDF
10. introduzione ai language model
11. smoothing con Dirichlet
