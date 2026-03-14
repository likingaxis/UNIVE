## LEZIONE 1 ESERCIZI
![[Pasted image 20260311101813.png|400]]
>[!info]- soluzione
>
> ```scss
> INTERSECT(p1,p2)
> answer <- {}
> while p1 != NIL and p2 != NIL
> do if docID(p1)=docID(p2)
> 	p1<- next(p1)
> 	p2<- next(p2)
> 	else if docID(p1)<docID(p2)
> 			ADD(answer,docID(p1))
> 			p1<- next(p1)
> 		else p2<- next(p2)
>while p1 != NIL
> 	ADD(answer,docID(p1))
> return answer
> ```
> costi uguali
> per il 2 scorrerei tutti i docID e vedrei solo se non stanno in Caesar
> i costi cambiano


![[Pasted image 20260311101826.png|400]]
>[!info]- soluzione
>- la freq di countryman ci serve per determinare quanti elementi dobbiamo escludere dal totale
>	- prima controllo friends and roman e poi escludo countryman
>- in teoria no basta mettere una not con or per dover scorrere tutta la collezione

![[Pasted image 20260311103454.png|400]]
>[!info]- soluzione
>- farei l'unione dei due docID senza ripetizioni di kaleidoscope e eyes
>	- poi la metterei in merge con tangerine or trees formando una nuova lista risultante
>	- questa lista la metterei in and con kmarmelade or skies
>- farei prima kaleidoscope or eyes

![[Pasted image 20260311111004.png|400]]

>[!info]- soluzione
> ```scss
>  INTERSECT(p1,p2)
>  answer <- {}
>  while p1 != NIL and p2 != NIL
>  do if docID(p1)=docID(p2)
> 		 pos1 <- first(p1)
> 		 pos2 <- first(p2)
> 		 while pos1 != NIL and pos2 != NIL 
> 			do if pos1=pos2-1
> 					ADD(answer,docID(p1))
> 					break
> 				else if pos1< pos2 -1
> 						pos1 <- nextpos(pos1)
> 					else
> 						pos2 <- nextpos(pos2)
> 		 p1<- next(p1)
> 		 p2<- next(p2)
> 	else if docID(p1)< docID(p2)
> 			p1<- next(p1)
> 		 else
> 			 p2<-next(p2)
>  return answer
>  ```

