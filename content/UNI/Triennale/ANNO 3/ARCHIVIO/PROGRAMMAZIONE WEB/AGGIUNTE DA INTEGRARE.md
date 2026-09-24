##### HTML FORM
inviano dati al server
foto della configurazione standard dell'uso dei form
nel nostro caso la web application è express
form è un elemento html che conterrà al suo interno tutti i campi attivi da inviare al server
ogni tag input dentro il form ha name della variabile id del tag il valore conterrà il valore finale come default e type sta per tipo di input
a chi mando le informazioni?
- attributo action per indicare a chi inviare questa richiesta post
- se action non viene specificata la richiesta è stata inviata all'url di base

come le mando?
- il form ha anche l'attributo method che definisce se usare una get o una post
- con la get le variabili sono inviate sulla url mentre 
- con la post sul body del messaggio 

###### Tag label
definisce un etichetta utile, se viene cliccata da un focus al tag che lo clicca
posso fare una associazione implicita o esplicita, esplicita usando gli id

###### IN NODEJS 
`app.use(express.urlencoded({ extended: true }));`
middleware che prende la query e la mostra in console
se faccio una get devo prendere i dati da `req.query` sennò da `req.body`

##### Gestire form di login per fare autenticazione
segue la seguente pipeline
login(html) token e poi fetch per chiamare le nostre api con middleware
Autenticazione vs autorizzazione
- autenticazione usa la tua identità digitale come login
- autorizzazione indica quale accesso hai ad esempio quale accesso API hai
###### HTTP è stateless
ogni chiamata è indipendente
ogni richiesta deve provare la sua autorizzazione
per farlo possiamo fare
- sessione+Cookie
	- chiamate http non sono correlate fra loro ma usare una aggiunta ci permette di avere una correlazione tra questi
	- aggiunte come Cookie Api key o Bearer token
###### Cookie
mostrare ad un utente una pagina di login se l'utente fornisce credenziali corrette il server invia un set-cookie all'utente, il browser dell'utente salva quel cookie e ad ogni richiesta lo fornisce, così facendo si identifica
invio al client se la pass è giusta nell'header
`res.setHeader('Set-Cookie', 'authenticated=true; session=123456');`
il browser si ricorda i cookie di quella pagina ogni volta

visto che è una rottura gestire ogni volta le sessioni usiamo un middleware chiamato session
non funziona un cazzo e non ho capito perchè
i cookie possono anche scadere dopo un po di solito il server aggiorna la durata
```Javascript
const express = require('express');

const app = express();

  
  

app.use(express.static('public'));

app.use(express.json());

  
  
  
  

app.use(express.urlencoded({ extended: true }));

  

app.use(session({

    secret: 'your_secret_key',

    resave: false,

    saveUninitialized: true

}));

  

app.get('/getdata', (req, res) => {

    res.send('Data received successfully!');

});

  

app.get('/', (req, res) => {

  res.send('Hello, World!');

});

  
  

app.get('/auth', (req, res) => {

    console.log(req.query);

    if(req.query.username === 'admin' && req.query.password === 'password') {

        //res.setHeader('Set-Cookie', 'authenticated=true; session=123456');

        res.session.authenticated = true;

        res.session.username = req.query.username;

        res.redirect('/index.html');

    } else {

        res.send('Invalid username or password.');

    }

});

  

app.listen(3000, () => {

  console.log('Server is running on port 3000');

});
```

##### API key
i cookie non sono il massimo con gli api server
inviate di solito con header
- di solito usata per accedere a delle applicazioni dando autorizzazioni
le API key sono stringhe definite nell'header
di solito stanno nel backend
##### Bearer token
simile all'API key spesso con roba dentro ma altre volte può essere random
faccio il login mi viene fornito il token, posso usare questo token per fare chiamate a delle api
non ho capito la differenza tra API key e Bearer

##### JWT
json web token codificato con informazioni utili, non è cifrato quindi non possiamo mettere password e dati sensibili

##### Flusso implementativo effettivo
creare il form gestire l'api di login che genera il token poi nelle pagine successive le fetch devono essere verificate da un middlewere che verifica la validità del token
