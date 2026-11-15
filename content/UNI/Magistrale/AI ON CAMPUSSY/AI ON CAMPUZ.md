token 3/4 of a word

how multimodal models work
text, image, audio
with each one we have different encoder 
then they will all get aligned and then transformed simply by a transformer
first limit hallucination: to solve them we give to an LLM more context 
- prompt engineering
- RAG 
- Fine Tuning
>[!question] difference between fine tuning and RF

- context engineering
	- decides what goes into that window in what form and at which step
	- for example we should isolate the context we want to give to a processing LLM without sending 400 pages all together

workflow vs agents

 building agents you can trust
Graph rag

we make a knowledge graph a map of connected facts

we define ontology 
(ive lost the ontology part 25:00)
ethics and privacy
fairness accountability transparency explainability beneficence privacy autonomy robustness and safety

EU AI ACT
- classify risk of using AI
	- unacceptable (banned)
	- high(strict obligations)
	- limited(trasparency)
	- minimal(no specific obligations)

every prompt has a cost
accuracy data and privacy cost energy

coding agents
loop understand plan act verify

explore and plan first give context small clear tasks let it verify

as a human in the loop you should review every diff commit often protect secrets understand what you ship

AI multiplies accessibility
grounded not generic
people stay in charge

code: 4696

##### PIPELINE
- chiedere allo studente quale percorso seguire
- taking sources
for lecture by lecture:
- search for prerequisites and make quizzes about it, before a new exam materia (for example if you are studying algorithm exam, you should know what is a graph)
- organization of the sources and planning deviding it with an overview and division in submodules
- for each submodule combine explaination on the left, and on the right white notes that should be complete by the student, we can call this node first comprehension node phase
	- after this we have a question about lacks of this block topic
	- doing little questions to the student to make him understanding better and to be sure he apprended things well, to make the student understands better things, maybe a student have read a probability formula but he dont really make enough thinking to it
	- the objective is define a structure of this notes
- l'idea è che lo studente può selezionare parti di testo spiegate e approfondirle fare domande, dare feedback ecc...
- the student receives question as a feedback, if you answered wrong you can ask an explaination of this
- alla fine di tutto viene creato questo appunto finale
- registro dei progressi feedback ecc...
for exam preparing
- quiz complessi 
- organization of the sources and planning
- l'idea è simile alla prima ma senza explaination troppo complesse l'idea è quella che lo studente ha già la struttura delle lezioni ma potrebbe avere idee sparse ecc... la comprehension è già stata fatta ora ci sta la memorization
- fornire esempi di esame oppure spiegare solo come è fatto il tutto

- idea generale: prendere screen dalle slide+ creare svg schemi per la spiegazione a sinistra ecc...