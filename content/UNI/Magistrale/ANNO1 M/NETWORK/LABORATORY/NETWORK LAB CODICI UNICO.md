##### Comandi di base
- `lab.conf` file di configurazione che contiene Topologie, interfacce e collision domain
- `dispositivo/etc/interfaces` configurazione delle interfacce di quel dispositivo
- `dispositivo.startup` file con i comandi che deve eseguire all'avvio il dispositivo
- `/etc/init.d/networking restart` mettere sempre questo nello startup così
	- fa un restart delle interfacce di rete
- convenzione: il router con il numero inferiore riceve l'indirizzo ip inferiore
