# Documentazione Use Case — Amministratore di sede AMA

| **Use Case** **Generare codice invito** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla funzionalità di generazione dei codici invito.<br><br>**2.** Il sistema mostra i ruoli per i quali l’amministratore è autorizzato a generare un codice.<br><br>**3.** L’amministratore seleziona il ruolo del personale da invitare.<br><br>**4.** Il sistema verifica che l’amministratore disponga dei permessi necessari per il ruolo selezionato.<br><br>**5.** Il sistema genera un codice invito associato al ruolo selezionato.<br><br>**6.** Il sistema mostra il codice generato all’amministratore, che può comunicarlo al futuro utente. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore di sede AMA ha effettuato l’accesso al sistema e dispone dei permessi per generare codici invito per i ruoli di propria competenza. |
| **Scenario principale** | L’amministratore seleziona un ruolo autorizzato e il sistema genera correttamente un codice invito utilizzabile per la registrazione del nuovo utente. |
| **Scenari alternativi** | Il ruolo selezionato non rientra tra quelli che l’amministratore di sede è autorizzato a creare: il sistema impedisce la generazione del codice.<br><br>Si verifica un errore durante la generazione del codice: il sistema informa l’amministratore e non crea alcun invito valido. |
| **Post-condizioni** | È stato generato un codice invito valido, associato al ruolo selezionato e utilizzabile da un utente non registrato per completare la relativa procedura di registrazione. |

| **Use Case** **Gestire disponibilità dei lavoratori** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla sezione dedicata alla gestione dei lavoratori della propria sede.<br><br>**2.** Il sistema mostra l’elenco dei lavoratori associati alla sede e le relative disponibilità.<br><br>**3.** L’amministratore seleziona il lavoratore di cui intende gestire la disponibilità.<br><br>**4.** Il sistema mostra le informazioni attualmente registrate.<br><br>**5.** L’amministratore inserisce o modifica le disponibilità del lavoratore.<br><br>**6.** Il sistema verifica la validità delle informazioni inserite.<br><br>**7.** L’amministratore conferma le modifiche.<br><br>**8.** Il sistema aggiorna le disponibilità del lavoratore. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore ha effettuato l’accesso al sistema e il lavoratore interessato risulta associato alla sede amministrata. |
| **Scenario principale** | L’amministratore seleziona un lavoratore, modifica correttamente le relative disponibilità e conferma l’operazione. Il sistema registra le nuove informazioni. |
| **Scenari alternativi** | Le disponibilità inserite non sono valide o risultano incomplete: il sistema segnala l’errore e richiede una correzione.<br><br>Il lavoratore selezionato non risulta più associato alla sede: il sistema impedisce la modifica. |
| **Post-condizioni** | Le disponibilità del lavoratore risultano aggiornate nel sistema e possono essere utilizzate per la pianificazione dei servizi. |

| **Use Case** **Rimuovere operatori di sede AMA** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla sezione dedicata al personale della sede.<br><br>**2.** Il sistema mostra gli operatori associati alla sede.<br><br>**3.** L’amministratore seleziona l’operatore che intende rimuovere.<br><br>**4.** Il sistema mostra le informazioni dell’operatore selezionato.<br><br>**5.** L’amministratore richiede la rimozione dell’operatore dalla sede.<br><br>**6.** Il sistema richiede conferma dell’operazione.<br><br>**7.** L’amministratore conferma la rimozione.<br><br>**8.** Il sistema rimuove l’associazione tra l’operatore e la sede e conferma l’operazione. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore ha effettuato l’accesso al sistema e l’operatore selezionato risulta associato alla sede amministrata. |
| **Scenario principale** | L’amministratore seleziona un operatore, ne richiede la rimozione e conferma l’operazione. Il sistema aggiorna correttamente l’associazione del personale. |
| **Scenari alternativi** | L’operatore selezionato non risulta più associato alla sede: il sistema informa l’amministratore e non effettua modifiche.<br><br>L’amministratore annulla l’operazione prima della conferma: nessuna modifica viene effettuata. |
| **Post-condizioni** | L’operatore non risulta più associato alla sede AMA amministrata. |

| **Use Case** **Gestire disponibilità dei veicoli** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla sezione dedicata ai veicoli.<br><br>**2.** Il sistema mostra i veicoli associati alla sede e le relative informazioni di disponibilità.<br><br>**3.** L’amministratore seleziona un veicolo.<br><br>**4.** Il sistema mostra la disponibilità attualmente registrata.<br><br>**5.** L’amministratore modifica le informazioni di disponibilità del veicolo.<br><br>**6.** Il sistema verifica la validità dei dati inseriti.<br><br>**7.** L’amministratore conferma le modifiche.<br><br>**8.** Il sistema aggiorna la disponibilità del veicolo. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore ha effettuato l’accesso al sistema e il veicolo selezionato risulta associato alla sede. |
| **Scenario principale** | L’amministratore seleziona un veicolo, modifica correttamente la sua disponibilità e conferma l’operazione. |
| **Scenari alternativi** | I dati inseriti non sono validi: il sistema segnala l’errore e richiede una correzione.<br><br>Il veicolo non risulta disponibile o associato alla sede: il sistema impedisce l’aggiornamento delle relative informazioni. |
| **Post-condizioni** | La disponibilità del veicolo risulta aggiornata nel sistema e può essere utilizzata per la pianificazione dei ritiri. |

| **Use Case** **Gestire disponibilità della sede e fasce orarie** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla sezione dedicata alla configurazione della sede.<br><br>**2.** Il sistema mostra le informazioni relative ai giorni e alle fasce orarie attualmente disponibili per i conferimenti.<br><br>**3.** L’amministratore seleziona le disponibilità che intende modificare.<br><br>**4.** L’amministratore inserisce, modifica o rimuove giorni e fasce orarie disponibili.<br><br>**5.** Il sistema verifica la validità delle informazioni inserite.<br><br>**6.** L’amministratore conferma le modifiche.<br><br>**7.** Il sistema aggiorna le disponibilità della sede. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore ha effettuato l’accesso al sistema ed è associato alla sede da configurare. |
| **Scenario principale** | L’amministratore modifica correttamente i giorni o le fasce orarie disponibili per i conferimenti e conferma l’operazione. |
| **Scenari alternativi** | Le fasce orarie inserite non sono valide o presentano incongruenze: il sistema segnala l’errore e richiede una correzione. |
| **Post-condizioni** | Le disponibilità della sede e le relative fasce orarie risultano aggiornate e possono essere utilizzate dal sistema per le prenotazioni dei cittadini. |

| **Use Case** **Gestire associazioni tra sede e zone/CAP** |  |
| --- | --- |
| **Descrizione** | **Passo azione**<br><br>**1.** L’amministratore di sede AMA accede alla sezione dedicata alla copertura territoriale della sede.<br><br>**2.** Il sistema mostra le zone e i CAP attualmente associati alla sede.<br><br>**3.** L’amministratore aggiunge, modifica o rimuove un’associazione tra la sede e una zona o un CAP.<br><br>**4.** Il sistema verifica la validità dell’associazione indicata.<br><br>**5.** L’amministratore conferma le modifiche.<br><br>**6.** Il sistema aggiorna le associazioni territoriali della sede. |
| **Attori** | Amministratore di sede AMA |
| **Precondizioni** | L’amministratore ha effettuato l’accesso al sistema ed è associato alla sede da configurare. |
| **Scenario principale** | L’amministratore modifica correttamente le zone o i CAP associati alla propria sede e conferma l’operazione. |
| **Scenari alternativi** | La zona o il CAP indicato non è valido: il sistema segnala l’errore e non registra l’associazione.<br><br>L’associazione indicata risulta già presente: il sistema informa l’amministratore e non crea un duplicato. |
| **Post-condizioni** | Le associazioni tra la sede AMA e le relative zone o CAP risultano aggiornate e possono essere utilizzate dal sistema per determinare le sedi compatibili con le richieste dei cittadini. |