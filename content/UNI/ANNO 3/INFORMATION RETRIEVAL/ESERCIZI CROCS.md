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
>potremmo prima verificare se la frequenza di countrymen è inferiore agli altri per toglierla subito con una delle altre due

![[Pasted image 20260311103454.png|300]]
![[Pasted image 20260311111004.png|400]]
