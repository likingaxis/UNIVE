Analisi dati  di telemetria
- end user agentic application
	- conversazionale
	- interpretare la user request
	- plan
	- decidere quale tool usare
	- response generation
	- modifica dei parametri dall'umano in un loop
- tool enterprise che elaborano dati
###### Piattaforma Enterprise API
- elementi API per poter interagire con gli LLM e tool 
- Response API
 - prima chiamata
	 - interagire con il modello cosa è necessario creare dal cloud OCI 
	 - creiamo delle risorse utili per scrivere codice e fare test di inferencing
- tenant
playground, chat interattiva con i modelli che oracle mette a disposizione
- utilizzo delle response api compatibili 
	- creo progetto
	- possiamo gestire la retention
	- possiamo gestire la memoria a breve e a lungo termine
	- compattazione, fenomeno dove si appendono i prompt precedenti con in aggiunta quello nuovo ma in modo riassuntivo fatto da un modello
- Vectore store
	- contenitore di vettori, documenti in vettori, embedding per similarità
###### Response API
- orchestratore di modelli comunica con response API
	- fornisce una risposta dei modelli e ritorna la comunicazione a questa response API
utilizziamo un modello MCP tool
model context protocol espone dati 
protocollo di comunicazione per comunicare con LLM
- consente di comunicare con strumenti esterni e fonti di dati
###### Conversation API
- diverse conversazioni accedono a stessa memoria condivisa
	- ipoteticamente a lungo termine
- utilizzo stesso identificativo univoco della memoria
	- così che l'utente possa ripartire da una memoria prima
- file non strutturato dato al vector store
	- con mcp server con i tool tipo
		- dammi le migliori vendite del mese ecc
API KEY DA USARE
PROJECT OCID DA USARE
BASE URL DA USARE
esempi
1 esempio di memorizzazione
2 esempio di query
3 funzionamento del MCP server che

deve rispettare lo schema in JSON così che poi il frontend si possa rappresentare adeguatamente
deve usare il final prompt quando faccio la response api devo sensibilizzare il modello
quando do un prompt devo massimizzare che la risposta sia simile
la response viene organizzata con dei tools
file search e mcp
in una unica response api


parte progettuale
###### Gestire il vector score
frontend con streamlit
installare e configurare un mcp server

obiettivo:
3 task
1 telemetry con mcp server 
2 rag per la compliance usare un vector store per caricare i file delle regole della gara, documento con documentazione dell'auto
3 creare ui con streamlit mettere tutto insieme
