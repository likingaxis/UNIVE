##### Frontend e Backend
Applicazioni come CMS come wordpress scritto in php
comunicano con web server
DB fuori dal web server di solito mettiamo un DBMS esterni dal web server che comunicano insieme
- uso di site builder nei siti dinamici
- nei siti API based ho dei server senza generatore di html e css, solo un Server che espone i dati del DB con le JSON API
	- e il browser
	- il sito viene creato dal client
	- ad esempio i post personalizzati vengono poi elaborati dal client e visualizzati dal site builder del client

###### NODEJS
Applicazione costruita basandosi sul V8, interprete Javascript di Google
è possibile installarlo ovunque e poter creare dei server
il single thread usato di solito nel browser su javascript in questo lato server abbiamo una sorta di simulatore del singolo thread mediante libreria Libuv e abbiamo la possibilità di chiamare
- Event loop e worker thread pool
- altre librerie come 
	- http-parser z-lib OpenSSL c-ares
foto slide architettura normale vs architettura nodejs
- usiamo più threads per rispondere alle richieste più lunghe
- ma event loop di base è single thread
in nodejs il codice si può nascondere senza IFE, ma con un sistema di moduli
con i moduli importiamo delle funzionalità, abbiamo 3 tipi di moduli
- core modules
	- http, url, querystring, path, fs, util
- local modules
- third party modules
	- con npm

fs module, creo un oggetto fs che mi fa fare roba
Creiamo un server web
node rimane agganciato in attesa di risposte del client
TUTTE LE RICHIESTE FATTE AL SERVER PASSANO PER QUESTA FUNZIONE
###### Routing
processo per cui il server decide cosa fare per un determinato path ricevuto
###### Creare un modulo
creo un file js con una funzione e per esportarla faccio 
`exports.debug=debug`
associamo a exports un metodo con debug 
e lo importiamo con 
`const betterlog=require('./betterLog');`


