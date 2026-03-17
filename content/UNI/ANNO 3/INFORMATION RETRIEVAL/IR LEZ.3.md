### INDEX COMPRESSION
- usata per ridurre le dimensioni della indicizzazione
	- ma allo stesso tempo ne preserva la sua operatività
- due tipi di compressione
	- lossy
		- posso perdere alcune informazioni qualità ecc
	- lossless
		- ottengo la stessa informazione dopo la decompressione
- basso costo di decompressione
- nelle posting list potenzialmente se ho 173 e poi 174 metto +1 al posto di 174 così non uso log_2 174 bit per rappresentarlo
