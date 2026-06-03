##### Express
- framework minimale di `nodejs`
- routing complesso
- `req/resp` handling
- middleware
- server side rendering

```Javascript
const express=require('express');
const app=express();
const port=4000;
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.listen(port,()=>{

    console.log(`Example app listening on port ${port}`);

});
```
##### REST API
Framework che ci consente di avere una serie di metodi utili per fare operazioni di recupero dei file
API sono endpoint che ci ritornano dati, non penso sia proprio corretta ma vabbè
###### Routing con stringhe con express
dentro `req` di `app.get` potrei avere header con content type il body oppure altre informazioni utili tipo parametri 

esempio a slide
con express abbiamo dei dati di richiesta già processati e semplificati rispetto a usare http. create server

le rotte dei file sono case sensitive e vanno in ordine di lettura sequenziale
- la possibilità di avere collisioni viene risolto grazie a questa sequenzialità di lettura
- ad esempio avere `app get /:post` prima di `app get /qualcosa` prenderebbe qualsiasi `/qualcosa` come un parametro
per creare richieste http con rest api creiamo un file.http creato così
```scss
http://localhost:8080

###

http://localhost:8080/about
```
###### Routing sui metodi
oltre a fare Routing sulle stringhe con get possiamo usare metodi come `app.all`
per agganciare tutte le richieste http esistenti
e poi ce ne sono tante altre presenti a slide
posso usare ad esempio `app.route` per agganciare più metodi
posso avere pezzi di codice in file esterni mediante `express.Router()`
creando dei piccoli gestori a se che poi chiamo con
`app.use('/user', userRouter);`
posso mettere Router in moduli separati
ad esempio creando un file js e richiamarlo con require
quindi diciamo che ogni parte del path verrà potenzialmente gestita da un router apparte
###### Parametri con il routing
posso passare dei parametri attraverso il routing
esempio con `/users/:userId/books/:bookId`
che poi posso gestire come

MI SONO VENUTI DEI DUBBI SULLE IIFE ECC... come fanno quelle cose a essere private? non capisco bho

##### Response
`res.send()`
res set
`res.json()`
`res.sendFile()`
`res redirect`
`res status`


###### Aggiunte a `res.send`
slide 24

aggiungi spiegazione sul wrapping nel file NODEJS aggiungi che node quando prende il modulo la wrappa con quella funzione con quei parametri e la esegue sennò anche con require per i moduli secondari

##### Middleware
architettura software usata per express di tipo middleware
si ha come obiettivo finale quello di creare una catena di funzioni che rispondono a richieste ecc
foto slide 26
concatenate e fatte da richiesta risposta e `next()`
da quello che ho capito next rimanda la `req` al middleware successivo che non conosco

express static con public e app use a quanto pare riguarda anche il cors e credo gestisca solo i file che arrivano statici? e public sarebbe la cartella delle foto e dei file statici?
morgan è un middleware che stampa le richieste

##### CORS nel server nodejs
il CORS viene gestito da nodejs con un modulo che si può installare
se si fa una richiesta tipo fetch a una porta diversa o indirizzo diverso posso avere problemi