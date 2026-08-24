# Ingegneria del Software 🧩
qui ci sarà tutto sul corso
aggiungere attributi in generale su tutto il diagramma
revisione non lo sta a di
mancano le classi di boundary
per l'orale sapere se una classe è BCE
servono delle classi per dire che serve un certo protocollo che viene usato da un operatore di sede
- in sostanza classi intermediarie


UTENTE
1.  SequenceRegistrarsiComeCittadino FATTO
2.  SequenceRegistrarsiTramiteCodiceInvito FATTO
3.  SequenceEffettuareAccesso FATTO

CITTADINO
4.  SequenceRichiedereRitiroADomicilio FATTO
5.  SequencePrenotareConferimentoSedeAMA FATTO
6.  SequenceVisualizzareSediCompatibili NO
7.  SequenceVisualizzareDateEFasceOrarie NO
8.  SequenceVisualizzarePrenotazioniAttive FATTO
9.  SequenceAnnullarePrenotazione FATTO
10. SequenceVisualizzareStoricoPrenotazioni FATTO
11. SequenceValutareServizio FATTO

AUTISTA AMA
12. SequenceVisualizzareRitiriAssegnati FATTO
13. SequenceRegistrareEsitoRitiro FATTO
14. SequenceChiamareCittadino FATTO

OPERATORE DI SEDE AMA
15. SequenceVisualizzarePrenotazioniSede FATTO 
16. SequenceVerificarePrenotazioneCittadino FATTO 
17. SequenceRegistrareEsitoConferimento FATTO 

AMMINISTRATORE DI SEDE AMA
18. SequenceGenerareCodiceInvitoPersonale FATTO 
19. SequenceGestireDisponibilitaLavoratori FATTO 
20. SequenceGestireDisponibilitaVeicoli FATTO N
21. SequenceGestireDisponibilitaSede FATTO
22. SequenceGestireAssociazioniSedeZoneCAP FATTO
23. SequenceRimuoverePersonaleAMA 

AMMINISTRATORE GENERALE AMA
24. SequenceGenerareCodiceAmministratoreSede FATTO
25. SequenceRimuovereAmministratoreSede FATTO