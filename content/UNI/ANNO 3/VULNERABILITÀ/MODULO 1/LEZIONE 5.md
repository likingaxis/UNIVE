### DOCKER BREAKOUT
- potrebbe accadere che diventiamo root ma non di un intero sistema ma solo di un determinato ambiente containeraised
	- attraverso docker
	- dove container root è diverso da host root
##### Come identificare se si è in un container?
- presenza di file particolare
- a pid 0 un processo particolare
- alte limitazioni hardware ecc...
###### Definizione di container
- una unità standard di software che contiene tutte le dipendenze ecc
- la natura è differente dalle macchine virtuali
	- il SO è comune tra tutti ma è presente il Docker 
###### Criticità dei container
- il kernel condiviso con i docker può presentare delle criticità
	- ma ha delle feature di isolamento
		- namespace
			- cosa sono
			- quali sono
				- PID namespace
					- ovvero...
				- NET namespace
					- ovvero...
				- MNT namespace
					- ovvero...
				- UTS namespace
					- ovvero...
				- IPC namespace
					- ovvero...
				- USER namespace
					- ovvero...
				- TIME namespace
					- ovvero...
				- CGROUP namespace
					- ovvero...
		- control group
			- cosa sono
		- capabilities
			- cosa sono
###### Docker container engine
- il docker container engine più famoso è docker
	- ha un daemon che si esegue in background e svolge il compito di...
##### Come creare un docker container
- un *docker file* viene buildato e viene creata una *docker image*
	- che eseguita dal *docker engine* diventa un vero e proprio *docker container*
- ad un *docker file* viene creato un layer superiore che contiene le info create dopo l'esecuzione
	- ogni volta che viene creato un nuovo container si elimina quel layer e si può rieseguire da zero
###### Container privilegiati
- toglie tutte le feature di limitazione come namespace ecc
##### Il socket di docker
- il socket ci permette di comunicare con il demone di docker
- docker sock esposto ci permette con dei comandi di diventare root
