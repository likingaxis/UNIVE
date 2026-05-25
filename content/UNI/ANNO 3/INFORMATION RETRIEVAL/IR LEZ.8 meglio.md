INIZIO SI PUÒ RIASSUMERE MOLTO I CONCETTI SONO DAVVERO MOLTO POCHI

BIM TOTALMENTE DA RISCRIVERE, LE FORMULE PIÙ IMPORTANTI SONO
- BIM
	- documento $v_{d}= (x_{1},\dots,x_{m})$ con $x_{i} = 1$ se $t_{i} \in d$.
	- query $v_{q} = (y_{1},\dots,y_{m})$ dove $y_{i} = 1$ se $t_{i} \in q$.
	- $O(R|v_d, v_q) = \prod_{i=1}^{M} \frac{p(x_i|R, v_q)}{p(x_i|\bar{R}, v_q)}$
		- per i termini non presenti nella query metto probabilità per R e not R a 1 così si annullano
	- parametrizzazione
		* $p_{t} = p(x_{t}=1|R,v_{q})$ : probabilità che il termine $t_i$ compaia in un documento rilevante per la query $q$
			* con giudizi di rilevanza
				* $p_i = \frac{r_i}{R}$
				* $u_i = \frac{df_i - r_i}{N - R}$
			* senza giudizi di rilevanza
				* $p_i = 0.5$
				* $u_i \approx \frac{df_i}{N}$
		* $u_{t} = p(x_{t} = 1| \bar{R},v_{q})$ : probabilità che il termine $t_i$ compaia in un documento non rilevante per la query $q$
		* $c_i = \log \frac{p_i(1-u_i)}{u_i(1-p_i)}$
		* con giudizi di rilevanza 
			* $RSV_d = \sum_{i:x_i=y_i=1} c_i$
		* senza giudizi di rilevanza e pi=0.5
			* $RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$
