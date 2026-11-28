  
recording_VPN.mp4

Gemini

0:01/1:56:38

## 

Trascrizione

0:02

Oh god. Sorry.

0:18

Okay guys, so for you that you are here, thank you for coming.

0:23

Uh, okay. So, we didn't see last time. Uh so we see uh we saw each other two

0:33

weeks ago and um we did rooting dynamic routting. Okay. Uh now the topic of

0:43

today is VPNs. Okay. VPN something that I mean

0:49

maybe you know you have heard of uh maybe you also use there are many VPN

0:55

providers that guarantee you different services but I don't know

1:01

grat in this lecture we see how what they really are how to use it how can

1:08

one configure it from scratch how can you create your own VPN let's say

1:48

Okay. And that

1:53

>> Okay. So what we talk today is okay VPN introduction what they really are we

2:00

will talk about also TLS and PKI okay because this TLS is the uh let's say um

2:08

it's one of the security framework that are um on which let's say many VPN

2:16

implementation are based we will use OpenVPN and this OpenVPN is based on TLS

2:21

but we will spend some time talking about TLS because it's really important

2:26

okay because TLS is the thing that is let's say um I don't know below 99% of

2:32

the internet for example HTTPS the S is for secure and they use SSL

2:39

previously now they use TLS okay so TLS is the security framework which is the

2:45

standard let's say in the internet one of the standards and um

2:52

And there are many programs that they base on the TLS such as OpenVPN which is

2:57

an implementation that we are going to use and it's commonly used uh let's say

3:02

commonly used in the wild okay

3:09

except for the definitions okay um when uh until now when we talk about a

3:17

private network okay we think about a network which is composed

3:22

of computers that are owned by a single organization. Okay, I'm from Sabiensa,

3:29

Marco from Sabiensa. Okay, so our computer, let's say they are owned by

3:34

Sabiensa, we want to form a uh private network. Okay, we want to make sure that

3:40

our computer not just two computers of us, but let's say I don't know all the

3:45

computers of the people working in the same company, they will talk securely

3:50

one to each other. Okay. Um, so there must be something that says, okay, I'm

3:57

assuring you that the computers that they talk on the private network,

4:02

they're going to be the only ones using the network. Okay, so there is some form

4:05

of authentication to the network and uh an example when we see the LAR

4:13

networks. Okay, so the subnets in Kadet this a kind of a private network. Okay,

4:20

it's a network. It's contained. Uh, okay.

4:25

The thing is that um what happens?

4:33

What happens if I want to spread this network in multiple geographical

4:38

locations? Okay. What happens if you are abroad and you want to access your

4:45

computer remotely? Okay. So again with Lance are a sort of private network but

4:50

what happens when you want to extend your network to the localize your

4:55

network. Okay. Uh of course there are two possible

5:02

solutions. One don't use the public internet which is not feasible or two

5:08

use the public internet uh to connect to the network. Okay. So again, the problem

5:15

is that uh I'm in Italy, Marco is in Germany, Professor Cuomo is in Spain. We

5:22

want to create our own network or we want to access the network of Sabiensa

5:28

from abroad and we would have some security

5:32

assurance. Okay. So the first option is don't trust anyone. Don't use the public

5:39

internet. Use some custom thing. I don't know which only you you can use which is

5:45

not possible. What you can do is to use the public

5:49

internet so to share the same medium with I don't know all the computers in

5:54

the world but you should have you should manage security IP addresses

6:00

rooting everything okay

6:05

um so that's why

6:12

they created the um the VPNs Okay. So, let let me just say this. Um, if you uh

6:23

know what a VPN is, if you use a VPN from they say there are many providers

6:28

like ProtonVPN, uh, NordVPN or whatever was okay. So,

6:35

um, they simply do, let's say, they simply

6:39

let you access from a location to another location via tunneling. Okay, we

6:44

will see it in a second, but basically VPNs are much more complex and they

6:49

allow you to do much more complex stuff than rather than just tunnling.

6:54

Okay, so um so they created as I was saying VPNs and they allow you to create

7:01

a secure private network over a public shared possibly insecured network. Okay.

7:09

So, uh when we do in kad our little subnet is as now we are doing our subnet

7:19

which is our our network our subnet which is let's say decentralized let's

7:23

say the localized it is um which many computers can connect to in different

7:30

locations um while guaranteeing security and other

7:36

other stuff. Okay. So the VPNs do this by let's say leveraging encryption,

7:42

authentication, tunneling and firewalls. Okay. So this is a connection of of a

7:49

lot of things. Um okay so in a second we will uh we will

7:57

see it. Um the things to keep in mind is that uh uh

8:07

okay with this magic tool okay you create you can create your own private

8:12

network uh nowadays the thing is that most of

8:17

the times there are many companies which they don't enforce security let's say

8:22

which they think that VPNs should be they are used like the main and only

8:28

security mechanism. Okay, the thing is that okay, if you have the VPN, if you

8:32

can access the VPN, you're authenticated to do everything. Okay, because it is

8:38

secure because it's authenticated. No. Okay. Uh they shouldn't be your

8:46

single let's say your single mechanism of the defense. Okay? Because you should

8:51

not have ideally one let's say one single point of failure. This is the

8:56

core idea of one of the coreest idea of of cyber security. Okay, you should not

9:00

have a single mechanism of defense. Okay.

9:04

Then there are also to consider reliability issues. Okay. Because you

9:07

use the public internet which is subject to latency, is subject to failures.

9:14

Okay. So you have to consider these things.

9:19

Okay. So um

9:25

uh talk about tunnels. We have seen actually tunnels. Okay, we have seen

9:32

tunnels with SSH. We've seen with port forwarding or SSH where we enter the

9:38

connection let's say we send packet from a host to a target host but instead of

9:46

doing directly we create a tunnel such a way that our

9:50

packets they are let's say steered across a

9:55

different direction they are sealed inside this tunnel okay

10:02

uh in SSH actually it's a little bit complicated because it's not a a real

10:09

tunnel because from a technical perspective what happens in SSH is that

10:15

um the packets are received by the SSH host and basically the packet is um

10:24

decapsulated encapsulated inside an SSH packet.

10:29

There are many operations that the the the SSH does and uh can disrupt the

10:34

packet. For example, in SSH port forwarding, you cannot forward UDP

10:41

packets only TCP just as an example. Um but for the

10:47

moment, we don't care because with the tunneling offered by the VPNs, you can

10:52

tunnel whatever you want. So um what happens

10:59

is that basically um the the the let's say the the good idea of tunneling is to

11:06

have your original packet okay your original packet with MAC

11:12

address destination IP address destination okay and when it enters the

11:17

tunnel so the two ends of the tunnel when it arrives to the start of the

11:23

tunnel let's Okay, the computer that is on the start of the

11:28

tunnel, it adds let's say an IP header. Okay, there is a protocol behind that.

11:36

Let's say that it adds an header. Um, so it encapsulates

11:42

the bucket with a P of the end of the tunnel. So when the packets flows

11:50

through the tunnel actually um it uses the one the public internet

11:56

okay and it is treated like a normal IP packet okay when the second end of the

12:05

tunnel so the end of the tunnel receives the packet recognizes that it was an

12:09

encapsulated packet so it strips the packet from the let's say from the IP uh

12:16

let's say from the uh IP layer which is

12:22

exposed and so it gets the original IP packet

12:27

the original frame which is then sent to the current destination.

12:33

Okay. So again the concept of tunneling is just taking the packet encapsulating

12:39

into another IP TCP UDP it depends on the protocol but

12:47

you encapsulate your packet inside another packet another IP packet you

12:51

send this big packet in the public internet which will be routed and

12:58

treated like as an a normal packet. When your packet receives the end of the

13:04

tunnel, it will be decapsulated. So the outer layer will be um removed

13:12

and you obtain the original packet which will be routed into into a destination.

13:23

Okay. Um so I was saying that ah by the way this

13:32

is only tunneling just a way of moving packets from A to B. Of course this

13:41

doesn't do anything about security authentication

13:45

encryption. This is just rooting let's say it's not about security.

13:51

Okay. Okay. So when I was saying that BPN's

14:01

allows you to do this tunneling this network uh

14:08

let's say um they're are a little bit more complex than just a port forwarding

14:13

of SSH. Okay. um you can use them, you can configure them

14:20

and we will configure them in different ways. Um for the moment just think about

14:26

let's say the um no ju just imagine this uh let's say

14:32

this uh um these modes of operation

14:38

for example uh let's start from the bottom okay so you have two computers

14:45

for example my computer and computer of Marco okay

14:49

uh we both have we both want to create a VPN. Okay, so we want to both access to

14:59

the same VPN. What we can do? Okay, I run my VPN client which connects to the

15:06

server. Marco runs its own VPN client, connects to the same server. Fantastic.

15:12

And so we operate like in a end to end mode. Okay. So my computer is running

15:18

the VPN. His computer is running the VPN end to end. fine but you can also

15:24

operate on let's say gateway to gateway buses if

15:30

you want what it means is that the encryption decryption so the VPN client

15:35

is operating not on the computer but on the gateway okay so let's say that again

15:41

me and Marco want to join the same VPN uh

15:48

and we are let's say in a different different locations If we know that the

15:53

gateways are connected to the VPN in this case on my PC and on Mark PC

16:01

there is no need to run any VPN client. Okay, you see I'm completely transparent

16:08

of what happens later. I'm just sending my packets my normal packets without

16:14

encryption encapsulation tunneling. I I don't know really about

16:19

any VPN because later the two gateways they encrypt the cry so they play with

16:26

the VPN so the VPN happens here the same thing later Marco doesn't know anything

16:34

about what happened in the network doesn't know anything

16:39

about VPN and um yes

16:46

Okay. So these are mode of operation. Of course you can also play with these two.

16:51

For example, you can use one gateway and um one end to end. For example, you put

16:58

your uh one VPN end here, another VPN end on a client. Okay, you can do it.

17:09

Okay. So for the moment keep in mind so VPNs they allow you to create this

17:16

virtual networks. Now in this example we have just to two nodes. Okay. But in

17:23

general these are meant to be uh let's say to to host multiple nodes not just

17:29

two three but let's say 100 1,000. Okay. It's like a real network. Okay. And with

17:39

any security authentication all the all the let's say assurance of

17:45

security authentication that you can have

17:50

okay so

17:58

we will use openVPN in our labs. Uh okay because the VPN

18:06

again is a is a concept okay you have your concept you have to implement it

18:12

okay so there are many implementations of VPN there is wire guard

18:18

openVPN and I think these are the most two most used used to I don't know if

18:23

you know others something by Cisco maybe also

18:28

anyway we will use openVPN is one of the most widely used Okay. Um,

18:36

for example, Saviensa use OpenVPN. Uh, ProtonVPN. I think it is. I I I

18:44

don't remember. Anyway, it's widely used. The thing the important thing is

18:48

that is that is based on TLS. Okay. So even if TLS

18:57

we won't use it directly I mean we will use it because

19:04

when we configure a VPN we have to configure its security okay so we have

19:10

to configure something about we have to know something about TLS okay and TLS

19:17

again is not that something is it's a little protocol that someone uses TLS is

19:22

on the basis is of 99% of the internet. Okay, just an example, HTTPS.

19:29

Okay, the desk that security comes from TLS. The mail that you exchange TLS.

19:36

Okay, so um the reason why you log into the bank and

19:43

10 seconds later you are you aren't robbed of everything is for the TLS

19:48

encrypts your communication, okay, on the internet.

19:52

So I think it's very important when we will see something we will use

19:57

something. So I think it's important um

20:06

so for the moment we start with the TLS then we see the the other stuff. Okay.

20:12

So again we will talk about I repeat we will talk

20:18

about TLS because I think it's really important not just for the VPNs but this

20:22

is for the like the one of the most important security standards on the

20:26

internet nowadays. Okay. And uh so we now spend some time on it because we

20:34

will need to use it when we configure OpenVPN.

20:39

Okay. and then we will when we understand something about TLS we will

20:45

move on and talk to for the the implementation of the VPN. Okay.

20:53

So um

21:00

I missed idle here. Sorry. Okay.

21:08

Okay. we start about talking um we start talking about TLS. Okay. So the

21:16

um one of the core concept of TLS let's just start with a definition

21:23

is a PKI a public key infrastructure So the certificate that we are going to

21:46

create spoiler are the same that

21:53

>> the device already

22:06

>> connect is the same that use on the internet or is only for the

22:13

>> No, no, no. I mean they are conceptually they are the same because it's the same

22:19

TLS. So the same TLS that you connect via

22:24

HTTP you we will use it now but if you are asking if like the same

22:30

certificates or the same file

22:32

>> no no they are different files the server of the VPN the

22:38

The traffic is like

22:43

>> to the server let's say one is dece deciphered.

22:59

>> Uh no to the server is um

23:09

No to the server is um in let's say in plain text

23:15

we will see it in a second actually we will see it when we talk about yes the

23:19

idea of VPN is the security is

23:25

we talk about client server so the security is end to end from the client

23:29

to the server if the two client will talk to each other you could you have to

23:35

go to go client server and then server client. So the two connections are

23:41

encrypted but to the server to server is not and if you yes so to

23:49

the central server no it's not encrypted because it needs to decapsulate the

23:53

packet and then send the packet back. Um I don't know if you use uh if you want

24:01

to make sure if you if you let's say send HTTPS inside a VPN

24:09

a double layer of encryption. So let's say that the VPN the server uh unfolds

24:15

the first layer of encryption but it it remains the other TLS of HTTPS.

24:22

Okay. So the ah okay so I didn't understand the question. Sorry. So yes,

24:25

there are two layers of uh No, it's not. Okay, now I get it. No, it's two

24:30

different layers of uh two different applications of TLS. Okay.

24:37

Okay. So um

24:42

one of the core concept of TLS is the public infrastructures. Okay. And um

24:51

so um in TLS it's very important you remember

24:57

when we speak about public key private key

25:02

we will talk all about public key uh private key we'll talk about

25:06

certificates okay so certificates in TLS are we very very important okay

25:16

and Um when we define a PKI we have to keep in

25:22

mind there there is the the the it needs the definition of something the

25:27

certificate format uh the relationships about uh

25:32

certificate authority we will see in a second. So it's like the definition of

25:38

operation okay we will we will see in a second.

25:46

So this is very central in TLS. Okay, we um

25:55

we actually didn't see in SSH. Uh when we talk about SSH because SSH we only

26:01

talk about public and private key. Um here in TLS we talk about certificates

26:08

which are conceptually a similar thing but they are called certificates. Okay.

26:15

Uh, have you seen these things in other courses?

26:19

I may be repetitive. Have you ever heard the the word certificate? Perfect. Okay.

26:26

Um, so the idea is that remember when we talk about the public

26:32

and private key, okay, that you can use as a sort of um

26:38

authentication, okay, the certificates, they just do that. Okay, these are a a

26:44

certificate. Let's say it's um we can say that it's a data structure,

26:51

okay, that simply connects that binds the public key. So the pup key to the

26:58

identity of the legitimate owner. Okay. Uh in the identity in this case could be

27:06

I don't know you are doing certificates for for example the certificate of the

27:11

card identity electronica. Okay. In Italy we have the chia cart identity

27:15

electronica. These are certificates. I didn't go inside the protocol. I would

27:21

bet €50 that are based on TLS. Okay. SP um I think that they are based on TLS.

27:32

Okay. So in this case the ID will be I don't know the um uh the number of your

27:40

card identity electronic of your identity card. Okay.

27:45

So your identity is a number that identifies you in some sense. And then

27:51

there is the public key. Okay. your cryptographic public key.

27:57

Okay. Then there are also some other informations but we will see it

28:03

we will see it in a second. Okay. So this means let's say a certificate. A

28:11

certificate means this is my identity card ident

28:20

born Rome blah blah blah and this is my um cryptographic public key. Okay,

28:27

anyone can recreate this certificate. Okay, because there is no security until

28:33

that. Okay. Uh what happens is that this certificate it is signed it is granted

28:40

by a CA a certification authority that digitally signs the certificate. Okay.

28:46

So my certificate Pedro Parachino born Rome with the public key it is digitally

28:52

signed. So a digital signature is created by the

28:57

certification authority and that signed the certificate

29:02

I mean now is secure in the sense that no one can forge it. Okay. Unless this

29:09

certification authority is remains uh not broken. Okay. And the

29:16

signature is contained into the certificate

29:21

certainty. Okay. So again the idea is that um

29:28

what what does it mean again to sign to digitally sign it is the certificate

29:33

authority takes the certificate it passes the certificate through its

29:38

private key okay and there is the signature let's say and

29:44

there is the hashing but let's say that that is the signature if one takes my

29:49

certificate and wants to check the signature

29:53

takes the certificate, takes the public key of the certification authority, the

29:58

sign the the certificate and um

30:04

it can let's say decrypt the signature and check if the signature is is valid.

30:11

So the idea is always the same. Use the private key to encrypt public key to the

30:17

crypto. Okay. Uh give the public key to anyone so that anyone can decrypt

30:25

anyone can check my signature. So provided that we have the

30:30

certification authority public key we can verify the signature and verify the

30:36

authenticity. Okay.

30:41

And uh u in your computer there are many

30:46

certificates that are pre-installed. Okay. Uh

30:59

do what?

31:11

I know but I will show you them in a second. Okay, because we just have talk

31:15

about uh certificates. There are something more that that I want to say.

31:19

Okay. So keep in mind just that the certificate is my identity my public key

31:25

and is digitally signed by certification authority so that no one can cop it

31:31

forge it modify okay but in the essence it's just my identity and my public key.

31:39

Okay. And um and again sorry in the identity you can

31:45

put here whatever you want. It depends on

31:49

on what you can create on what you want to create the certificate. Okay, for

31:54

example, you want to certificate your email, your pack, you want to

31:57

certificate again your document identity, your document card, you want

32:01

to certificate your your website and you want to certificate your DNS name, I

32:08

don't know, apple.com, google.com, you put your name here. Okay. So the

32:13

entity it depends on what you want to certificate what you want to show.

32:21

Okay. Um fantastic.

32:27

So up till now we have a certificate that is issued. We use the word issued

32:33

to say signed. This is signed by a certification authority.

32:39

Question. who guarantees me about the identity of

32:44

the certification authority. Okay. So I see that the certification authority is

32:50

signing the certificate. I'm sure well this also the certification authority

32:58

has a certificate. Okay. And the certificate of the certification

33:04

authority is signed by another certification authority.

33:09

Okay. So you create this chain this chain of trust. So a certificate that is

33:16

signed by certification authority. It's certificate is signed by another

33:20

certification authority and so on. Okay. So you create this this

33:25

chain. This is also known as a chain of trust. Okay.

33:31

You must arrive cow you must arrive somewhere

33:35

where this chain ends. Okay. Because s uh certificate which is signed by

33:42

another CA by another CA you should arrive to some somewhere where this

33:47

chain of trust starts. Okay, you arrive to the root CA. Okay, what makes a a CA

33:55

a root CA just that certificate is self-signed.

34:00

So certificate self sign it means that you say okay this is my identity this is

34:06

my public key and I sign my certificate by myself. So who guarantees my identity

34:12

myself. Okay you have to trust the root CA. No

34:18

no uh we will see in a second you your computer will trust the CA.

34:24

Um okay.

34:29

So for example

34:34

again I said TLS is used everywhere also in HTTPS.

34:39

Now we are connected via HTTPS. Um if you want to observe the TLS chain

34:48

of trust here it means the certificate is valid

34:57

in English. Okay. If you click on it I don't like this. It's too short.

35:15

Okay. Corona virus

35:30

example because I cannot enlarge this this No,

35:46

but the thing is that if you go to let's say to the certificate then details

35:55

this is your chain of trust. Okay, this is your chain of trust.

36:02

Uh this is of your website that you are

36:07

working on. Usually usually

36:12

I mean I'm on Republica and you see last usually if you usually what you observe

36:19

is the full DNS name in the name of the certificate. This is

36:25

what happens usually uh as an example in Google

36:32

in Google you see this is the certificate is asterisk.g Google it

36:35

means everything that ends with.google.com google.com. Okay, this

36:40

is an example in our case is wwampa.

36:46

have a B. This is certificate is signed by the certification authority Amazon

36:51

RSA something Amazon does provide TLS services maybe

36:57

Republic in is in AWS I don't know okay and this certification authority is

37:05

signed by this root certification authority

37:10

okay so this is your chain of trust Um

37:17

so when you visit a website your computer does the following operations.

37:25

So when you visit a website sorry when you connect to a website before showing

37:29

anything. So after it uh let's say the DCP connection it

37:36

instates the TLS security before talking any HTTP or

37:42

sending images or text it creates the TLS connection the TLS uh uh binding

37:49

connection yes what happens is that they exchange the the let's say the the

37:55

server exchanges to the client these certificates and the client has to

38:00

verify them one by one re let's say recreating the chain of trust. Okay. So

38:08

he gets the certificate it takes the certification authority

38:13

decides the certificate dec

38:34

maybe I cannot see it here but usually maybe when if if you open

38:41

the certificate with other tools inside the certificate there is a link on where

38:46

you can take the certificate of the certification authority of the one who

38:52

signed. Okay. So it verifies this it verifies the the

38:57

root CA and when you arrive to the root CA the computer has to trust the

39:02

connection. How can you say that it trust? How my

39:06

computer can trust this root certification authority?

39:11

Well in every computer now I'm on Mac or Linux on Windows is the same. there is

39:17

pre-installed a set of certificates a set of root CA certificates okay that

39:23

your computer natively trust so in Linux

39:33

this folder is usually here chs so every certificate

39:44

there is inside Here is trust. Okay. And there are many of them.

39:51

I bet that I can find this Amazon

39:59

uh Amazon

40:05

root CA1. Okay.

40:11

Okay. We won't use this in in kadar. This is

40:17

just for for let's say for for general culture. Okay. Uh if you want to open

40:23

the certificate, what you can do is open SSL.

40:30

OpenSSL is the open-source library on which

40:36

I would say if not 100 99% if not 100% of the internet is based is an open

40:43

source library and um a couple of time in history they found a critical bug and

40:51

so everyone in the world was panicking because they all rely on this OpenSSL

40:58

library. Okay. So, OpenSSL X509 X509 is actually the name of the standard of the

41:07

uh certificate of this auto incode certificates. Okay, it's just the

41:12

standard is called X509 and you say you want this whoopsie this

41:22

Amazon root and you want to output in text form.

41:27

Okay. So that's the command and there are a lot of information

41:37

such you uh the the the you see when we talk about certificate that binds your

41:42

identity to the public key. Well this is your identity.

41:51

This is your public key.

41:58

Okay. And this is the signature signed by yourself. Okay.

42:05

Because this is a root CA. Um

42:14

they have expiring time. Okay. Have you ever happened to to the website of

42:18

Sabiensza? It happens often that says ah certificate certificate expired.

42:24

it because sometimes you have to renovate them. Okay.

42:30

Anyway, security considerations we have seen that every certificate that

42:36

is in in this folder is accepted by the system. Okay. Um

42:47

this is actually when uh little hackers try to uh

42:54

sniff traffic of uh from websites or even mobile apps.

43:00

Okay. What they can do what they do usually is TLS man in the middle. Okay.

43:07

It means giving to the computer a custom

43:11

certificate saying, "Oh, this is my certificate, but trust it anyway." Okay.

43:17

And um so again

43:24

if uh if I have my certificate here okay I can

43:31

digitally signed google.com and I can pose as google.com okay because when

43:38

someone connects via me I show ah this is my signature I am Google I let's say

43:48

I am I provide identity for google.com. A new computer believes it. Why believes

43:55

it? Because it has the certificate of the certification authority inside the

43:59

trusted folder. Okay? So you can have all the security that

44:04

you want but you have to let's say arrive somewhere when where you have to

44:10

trust. Okay. Okay. This was just for the general

44:16

culture for we we won't use it in the in Canada but this is how security in

44:23

internet works. Okay. About certificates and keys and whatever.

44:34

Uh let's see. Okay.

44:46

This is what we have seen. So this is what we have talked about.

44:51

When you connect to a website, the website returns its certificate.

44:57

Uh you verify it. You want also to get the certificate of

45:03

the certification authority. inside the certificate you verify it and you do all

45:07

the chain of trust up until you go get to the root CA you verify is certificate

45:15

and you have to trust it okay so is this certificate in my folder yes I trust it

45:22

okay this security model is strong is strong

45:30

because um the um the verification

45:38

this is done completely by the client. There is no need for the

45:46

root CA server to to also be online. Okay, the thing is

45:53

that there should be just a proxy server whatever it just sends the public

45:59

certificate to the client. So the private key of the

46:06

root CA but even of the intermediate CA of the website

46:10

they can be I don't know wherever on a server which is not connected to the

46:16

internet protected the thing is that the client only needs

46:22

the certificate and the client works up itself all the all the verification okay

46:30

so the idea is that you have your sensible information somewhere they are

46:35

stored on a computer that computer can even be turned off okay for maximum

46:40

security. So in this way this um security framework is strong okay

46:48

so the servers holding the private key which is the most important most crucial

46:53

piece of information in this public infrastructure are not per are not

46:57

required to perform anything during verification.

47:01

Okay. And they also can be disconnected from

47:05

the internet if you want. Okay. So this add this adds strength to

47:12

the to the framework. Okay. So 10 minutes uh break we will

47:30

continue in a second. Okay.

47:39

This was the command that I uh was written before.

47:44

There is the certificate format. Okay.

47:50

uh which contains among other stuff the public key the entity then there is the

47:56

date expiration date which algorithm I use which combination

48:02

of algorithm because this always a combination of public and private key

48:06

algorithms hash algorithms um symmetric encryption algorithms like

48:14

AES or something okay so it's always a mixture of different different

48:21

algorithms. Okay. Um

48:27

so up until now we have talked about TLS again. A because it's important, B

48:35

because it's the basis of many things including OpenVPN that we have going to

48:42

use. Okay. So we now uh start talking about VP OpenVPN. So the first step of

48:50

building an OpenVPN configuration is creating

48:55

our public key infrastructure, our PKI, okay, consisting of a certificate

49:04

authority, master certificate, let's say a root certificate authority, okay,

49:11

that digitally signs all the certificates

49:15

and the all the certificates of the clients.

49:19

and the server. Okay. Um

49:23

so again to configure OpenVPN with TLS here we have to create first the

49:30

certification authority with that certification authority we create for

49:34

one server its private key and certificate and then for every client

49:40

that wants to connect their own private key and certificates. Okay. So a

49:47

separate certificate and private key for all the

49:50

server and each client. Okay. Um

49:57

so when the client or the server wants to

50:01

connect the thing is that both the server and

50:05

the client will verify that the present certificate was signed by the same

50:11

master certification authority. Okay. So the idea is that I have my certificate.

50:18

The server has its own certificate. How can we do mutual authentication? So how

50:24

can I authenticate to the server? How the server can authenticate to me? Well,

50:27

we exchange the certificates. We check ah they are signed by the certification

50:34

authority by my certification authority what I have. So I trust him. Okay. I

50:41

trust him because the certification authority is trusts or itself him. Okay.

50:46

So you have your chain of trust. So like an SSH OpenVPN requires

50:53

birectional authentication. The client is authenticated to the server

50:58

and the server is authenticated to me. Um

51:06

we will see it in a second this slide. Let me skip this. Okay. So

51:13

um how to create a um a PKI again until until now we are configuring

51:22

the security which is on the basis of OpenVPN. So now we don't really need we

51:29

are not again still speaking about already speaking sorry about networking

51:34

routting. So what we really need to do these steps now is just any machine. We

51:42

don't specify the routing the networking because for now we really don't need it.

51:46

Okay. So um

51:52

there is I had to close the VM because it

51:56

crashed. Okay, here I have just a a laboratory.

52:18

Uh let's say an almost empty laboratory because I have to reply.

52:26

Okay. A laboratory with just just a node

52:32

inside. Okay. So, you can create your own if you want. Just create a lab.com

52:38

with a a note name, a single note name. We just need that. Okay.

52:45

We do l start.

52:53

Okay. So, we are on this machine. on this machine we will create all of the

52:59

certificate all of the all of the security. Okay. How to do it? Well

53:07

um the thing is that do you remember

53:11

OpenSSL the library which is based 100% of

53:16

internet security. Well we will use OpenSSL but not directly

53:22

because it's very complicate complicated to use. You have to be very sure about

53:27

what you are doing when you deal about security. So there is this tool

53:33

say okay which was custom built to use open SSL just to create these

53:41

certificates and uh and stuff. Okay. So what I will write now on the terminal is

53:48

actually all written in the slides. By the way, if you do

53:57

user share is let's say

54:01

okay in this folder there is the when you see Linux at least on on Ubuntu the

54:09

default uh default color scheme when you see

54:14

green it means that it's an executable okay so either compiled or as means that

54:20

can be executed. included. Okay. So if you do easy essay

54:29

this is all the commands that you you have uh let's say at at your disposal.

54:35

Okay. So first thing to do more or less they

54:39

are in order init pi. Okay. Initialize your private

54:44

key infrastructures. So

54:48

you see these are the contents of the folder. Now if you do is say init pki

54:58

pki complete. Okay. Let me do ls again. Now it created this

55:06

folder. Okay. which as of now should be

55:11

if not empty just let's say just the structure is

55:16

there but it's let's say it's most of the it's empty here in this folder there

55:21

will be created all of the certificates all of the keys okay

55:30

um do you want that I can put this lab on

55:36

the drive the factual vol

55:45

again you don't have to remember by by memory if you just type the command you

55:51

see just the second command is build CA to build your CA so is easier say build

55:59

CA it's it's telling to me look I am

56:04

creating your stuff into P um this folder right

56:11

here, this path right here using OpenSSL.

56:17

This is not secure actually. This is not one of the newest.

56:21

Um I may have to update it.

56:26

Enter new CA key passphrase. Okay. So this is

56:33

so what happens when I press enter then it it will create the private key and

56:40

the public key for your certification authority for an additional layer of sec

56:44

of security. You may want to add a security password to the private key.

56:50

Okay. So that it doesn't reside in clear text on your hard drive. Okay. It's just

56:57

an additional layer of security. But just remember that this Y keepers phrase

57:02

is not the private key or the public key. It's just something of related to

57:07

security of your own computer. If you don't want that file to be on plain text

57:11

or your computer for our purposes, let's put a password.

57:17

Uh where re-enter the new the same passphrase.

57:25

Okay. common name. See you will find this also

57:30

abbreviated as CN is uh common name that is um when we

57:38

observe the chain of trust inside the web file the the web the websites. Okay,

57:45

that was www. lasampa.it or republica.

57:51

Uh that was the common name. So you can put uh my beautiful

58:02

CA. Okay. See

58:12

CA certification is complete and we can now start to create and sign requests.

58:22

Okay. Um

58:26

this is the certificate of the CA. Okay. Let's create I don't know the

58:33

certificate of um the certificate for uh uh two clients

58:41

and a server. Okay, that we will use later. Okay,

58:47

so again OpenVPN we have always a client and a server. Okay. So a single server

58:55

to which is connected many clients. So how to create them? Well, there is

59:01

the commands build the client full and build server full.

59:07

So again say build server

59:13

full and it requires as an argument the common name. Okay. So we are

59:21

creating the server. Let's call it my server.

59:29

Okay. Um

59:38

here again we want to encrypt this uh this key this certificate.

59:45

No uh no because we have to specify it.

59:54

Let's let's put a password. Okay, again let's put it

1:00:03

our password again. If even if you don't see the characters appearing is writing.

1:00:09

Okay. So I inserted the password to to encrypt the key and then it asked me the

1:00:17

password to unlock the key of the certification authority. Okay. To sign

1:00:22

the certificate and I put the password that I've put it

1:00:27

before. Signature. Okay.

1:00:33

This is the common name. my server and this let's say the default let's say

1:00:40

expiration date is a couple of years from now some years from now 2028 okay

1:00:50

so we have it let's create also for the clients

1:00:55

B client full client one and this the start procedure

1:01:01

Okay, let's put it some

1:01:07

again the same procedure. So the same passwords as always.

1:01:13

Client one is created. Let's create another client. We will use it later.

1:01:20

Client two. Okay. and we have also client two. So

1:01:33

all of these certificates and keys are inside our PKI folder.

1:01:40

Okay. So if we navigate inside PKI now there is a little bit of stuff in

1:01:50

particular there is these two folders. Uh first of all this is the CA. CRT is

1:01:56

the certificate of your certification authority. Okay, which you can expect

1:02:02

with the command that we have seen before. OpenSSL X509

1:02:07

stuff. Then we have these two folders issued

1:02:11

and private. Issued contains the certificates that you have generated.

1:02:17

Private contains the private key that you have generated. Okay. So in other

1:02:23

words, these are the contents

1:02:35

of the cert of the issued folder. These are the contents of the private folders

1:02:41

of the private folder. So you see that you have all the certificate that you

1:02:45

have created. Client one, client two, my server

1:02:50

and then here there are all the private keys connected to the certificate that

1:02:55

you have created. So same name it means that client one key is is the key of the

1:03:02

certificate client one. CFT client one client two and my server. Okay.

1:03:12

Okay. So

1:03:15

we have a functioning a functioning public infrastructure.

1:03:21

Okay. always talk about security because we

1:03:37

now have a functioning public infrastructure. We have a real

1:03:41

certification authority. We have certificates and clients

1:03:48

that we want to authorize. Okay. So all the security all the TLS it's it's

1:03:55

created. So what to do with these certificates

1:03:59

that we have created? Well, in Kad there is a folder that sh which can be

1:04:07

which is shared from the katara lab to your computer. Okay. So this folder is

1:04:16

in the path slashshared. So for example, I can move the entire

1:04:22

public infrastructure, the entire folder inside

1:04:30

inside the No, sorry. GD. What I don't I can move the entire PKI inside the

1:04:37

shared folder. Okay.

1:04:44

Okay. So as of now we just leave the security stuff on a side and we talk

1:04:51

about OpenVPN. So OpenVPN how is built from a technical

1:04:59

perspective is that

1:05:04

it creates again a tunnel TCP UDP towards a server. So there is an OpenVPN

1:05:12

client, an OpenVPN server and a tunnel based on TCP or UDP is created. Okay.

1:05:21

And uh the thing is that

1:05:27

let's say that my this client want sends send sends any packet to the server any

1:05:34

non nonVPN any any HTTP email packet passing through the server. Again it the

1:05:43

the OpenVPN encapsulates the packet. It means that it takes the packet contents

1:05:50

based on an EP header, MTCP, UDP contents, whatever. takes any user

1:05:57

packet, put it inside, encapsulate them inside another packet

1:06:03

which is encrypted by OpenVPN and it is carried by um an IP and TTCP

1:06:14

um UDP packet. Okay,

1:06:19

which are given by the um

1:06:25

the VPN. Okay, so when you join a VPN, when a client joins a VPN, it gets a p

1:06:32

an IP address as it as it is as it was like any real subnet. But that IP

1:06:40

address is only valid inside the VPN. Okay. So what happens and now I will

1:07:00

show it in an example. What happens is that

1:07:06

um in the OpenVPN implementation but it in

1:07:13

all VPNs let's say you have your application your final application which

1:07:17

could be I don't know YouTube an email app whatever

1:07:23

uh if you communicate through the VPN this communication goes to the

1:07:30

uh let's say to the kernel driver that manages your uh the implementation of

1:07:38

the virtual network interface. Um

1:07:45

the kernel that gives back the data to the open VPN client which sends the data

1:07:53

to the real network interface which goes to the internet.

1:07:58

So OpenVPN creates a virtual network interface. you remember at zero, at one,

1:08:04

at whatever. When you run an OpenVPN and it's working, you see that another

1:08:10

network interface pops up. It's not at zero at one, but is they usually call

1:08:16

tan zero tan uno tan written tun for tan link. Okay, so that's a network

1:08:25

interface, but it's called a virtual network interface, but it's not

1:08:29

physical. Okay. It's not that physically exist. It's not like an internet port.

1:08:34

It's virtual. Um,

1:08:39

we just ignore this for a moment. We will see it in a second.

1:08:54

Then we will talk about everything

1:09:02

lab VP.

1:09:13

So let me jump straight to the lab and then when we see

1:09:19

practically what a VPN does and then we talk about

1:09:24

uh other stuff. Okay. So I can upload to you the this

1:09:34

lab VPN which is already configured

1:09:44

compress and not move to stop aluminum

1:09:57

lab VPN compress. press. Okay.

1:10:14

So this lab, okay,

1:10:19

I have just two PC and a server and uh

1:10:28

it's already configured such that uh

1:10:33

it has all the certificates pre-generated.

1:10:38

and uh we will see I will we will show I will show you the the the configuration

1:10:43

file for the moment let me just start the VPN. Okay. So to to let you see what

1:10:48

happens. So the VPN server is the server one

1:11:01

to start the VPN. The command is openVPN and then I have created a configuration

1:11:08

file again that we will see it in a second but it's already pre

1:11:12

preconfigured in the lab and you just open VPN. Open

1:11:19

VPN okay

1:11:23

and it's just running. See, it's just running doing anything. Let's

1:11:35

go to PC1, which is configured to be a client of the VPN.

1:11:41

Uh, open VPN client.com.

1:11:52

You just press enter and again it's running. Okay.

1:11:58

When you see initialization sequence completed

1:12:01

it means okay let's open a new terminal on PC1 because

1:12:09

we as in SSH port forwarding we need this command to continue running. Okay.

1:12:15

So we open our previous st or our original terminal

1:12:20

and we do the same command connect PC1. So we are in another terminal of PC1

1:12:29

again because this terminal of PC1 is occupied by the OpenVPN command and let

1:12:34

me just run these commands. IP address show. You remember to see all

1:12:42

of the IP addresses. Here we have our physical network

1:12:49

interface, the one specified in the lab.com. Fantastic. But now OpenVPN

1:12:56

has found this T zero. This is a virtual network interface. So a network

1:13:01

interface that is virtual. It's not physical with its own IP address. You

1:13:07

see it's own IP address. So this IP address is only valid inside the VPN.

1:13:14

Okay. The server by default gets the first

1:13:20

address. So now it's connected to the server which has the point one.

1:13:27

I can for example can ping it 10.8.0.1.

1:13:34

0.1. Okay.

1:13:39

So what happens now? What is happening now when a ping is running

1:13:46

is that my computer sees this packet since sorry this host this 0.1 as if it

1:13:54

is connected as it is let's say connected to this

1:13:58

network interface okay to to reachable via tan zero the bucket is intercepted

1:14:06

via tan zero is intercepted by your openvpn client

1:14:11

encaps that encapsulates the packet, encrypts the packet and whatever and

1:14:16

send it tunnled via the um via the server.

1:14:23

If I do this is the routing table and you see in

1:14:31

the routing table I have an entry for for the the the the VPN subnet this 10.8

1:14:40

8.0.0. Okay. So, every packet that is sent via

1:14:46

T0 is sent to the OpenVPN client which again takes the bucket, encapsulated,

1:14:55

encrypts it, tunnels it to its final destination on the server.

1:15:02

Okay. If I do a trace route here,

1:15:15

if I do a trace route here, my computer sees ah but you are directly connected

1:15:20

to it. This just one hop, one step. See

1:15:31

Primo Commando. Now we we we still haven't seen the

1:15:41

configuration of OpenVPN. We we have to see it. But basically it's

1:15:46

just the command is OpenVPN and then the configuration file

1:15:51

and the same is for the client in the Cal lab that I have just

1:15:57

uploaded. It's already configured. Okay. So this is what a VPN does.

1:16:06

Basically it creates a virtual network interface. Okay. So again you may use

1:16:13

your VPN for access I don't know for access some websites or

1:16:20

some content that is not available in your country or whatever. in reality is

1:16:25

complex because you see it creates a virtual network interface which you can

1:16:29

communicate to other people inside your VPN. Okay.

1:16:36

So again now that the VPN is running PC1 and S1 they believe to be inside the

1:16:43

same subnet even if they are not there is a router that separates them. Just

1:16:48

imagine if there were 10 100 router that separate PC1 and S1.

1:16:56

So two different geographical location, one in in the US, one in Italy. As long

1:17:01

as they have public IP address and they are routable, they can set up a VPN.

1:17:07

Okay. And believe that they are on the same subet on the same network.

1:17:15

Okay. So again this is what a VPN is. Then

1:17:20

there are many providers that use say VPN just to mean tunneling. Okay. But I

1:17:26

guess VPN is says more than just saying half tunneling. Okay.

1:17:34

Okay. So let let that run the the VPN run for

1:17:41

a second. U let me get back to this just for

1:17:49

reference. OpenVPN supports two layer of two two modes of operation either TAN or

1:17:57

TAP. You remember when we did the layer of internet

1:18:02

layer two layer three we will use TAN which is a layer three encapsulation.

1:18:09

Okay, it means encapsulate

1:18:13

the packet from the layer three. So it means that

1:18:21

you have your application packet TCP packet TCP let's say header IP header

1:18:29

and that packet is encapsulated. So layer three encapsulation. But OpenVPN

1:18:35

also works can also work with top which is layer 2 encapsulation. It means that

1:18:42

the packet that you send is encapsulated not just the IP layer but also the MAC

1:18:50

layer. So the layer two and uh we will use just because this is a little bit

1:18:57

difficult to configure and is used in uh some uh weird cases. For example,

1:19:07

there are uh there are some multiplayer games back in the days that uh

1:19:14

uh see if you download this game, not officially download this game, uh if you

1:19:22

want to play with your friend, um basically there are some

1:19:29

communication stuff that happens on layer two. For example, if on layer two

1:19:36

all the MAC signaling the if you use MAC broadcast, okay, if you want to find

1:19:43

someone on your subnet, so you use like DCP that sends the MAC address in

1:19:49

broadcast, okay, that's a layer two thing. So you have to use this T. Okay.

1:19:56

So there are some protocols in the internet that rely not on layer three

1:20:01

but on layer two. Okay, if you want to have

1:20:06

that uh to work, you need to use that. Another thing,

1:20:12

Netflix, for example, now has blocked the um

1:20:17

um you know that before people just share

1:20:21

some account and Netflix says ah but you are accessing from different APs. Uh no,

1:20:27

okay. So, it's blocked. What people are doing is at least people are doing some

1:20:32

people that knows how these things are are built. They are creating their own

1:20:36

VPN. Okay, they exit uh on the same IP. Okay, and so Netflix

1:20:43

says, "Ah, you're exiting from the same IP. I guess you are in the same house.

1:20:48

Bravo." My let's say prediction for the future,

1:20:54

this is not true. This is my prediction is that Netflix will implement some

1:20:58

other security feature if these things gets a little bit out of hand.

1:21:03

Implementing also layer two signaling. Okay. To check if

1:21:11

the computer accessing Netflix are indeed on the same network, okay, via

1:21:16

layer two senior link, layer two messages. Okay, in that case just switch

1:21:21

to tap. Okay. Bye-bye. is was for just a general

1:21:26

culture. Okay.

1:21:35

This thing is something that I've told you turn and tap. Okay. Ah yes. For

1:21:46

example, if you if you use ARP, if you need ARP for for your U

1:21:53

thing won't encapsulate won't support AR

1:21:58

because a layer is a layer two. So you need okay but for the most most

1:22:04

protocols available Tness is enough. Okay,

1:22:12

this is the comment that I wrote before. Okay,

1:22:16

in order to launch an OpenVPN configuration,

1:22:20

uh you have to write a configuration file. We will see it in a second. And

1:22:25

then the syntax is OpenVPN configuration file.

1:22:31

Okay. Uh in C, yes, you can place this command

1:22:37

in a startup file. Bear in mind that if you place this

1:22:41

command in a startup file, the terminal will be frozen. Okay? Because it will be

1:22:46

frozen just executing this command which will never end. Okay? This command uh

1:22:53

occupies the terminal and if you interrupt this command, the VPN just

1:22:59

falls. Okay. Um,

1:23:11

a little thing in Kad. I actually tried very hard to solve this

1:23:16

issue, but it's not so um so easy to solve it in in Docker.

1:23:24

Just um place these lines inside your startup

1:23:30

file of Kadara. Again, it's already in the lab. You can see it. But basically,

1:23:37

we have we have to tell the kernel we we are telling the kernel to uh create the

1:23:43

tunneling tunneling node. Okay? Because when you

1:23:47

launch in Dogger, there are problems. It doesn't work. Anyway, just believe me if

1:23:53

you paste these lines inside the startup file as this is already pasted inside

1:24:00

the lab that I've uploaded to you, it will work. Okay. So, if you see error

1:24:06

like ah dev netan is not found, it's because you have to write actually this

1:24:12

these comments right here. This is just a thing to keep in mind to

1:24:18

just remember to paste these slides whenever you want to use OpenVPN in

1:24:22

Kadara. Okay, just a little limitation. Okay,

1:24:30

so let's take our lab before our VPN which was running

1:24:37

and let's see. So

1:24:45

this was a lab with three sorry four nodes. Ignore just this read me read me

1:24:52

and diagrams just for uh for the slides just the figure

1:24:58

again. This lab is uploaded. Um

1:25:04

and so you see that they have all the startup.

1:25:09

We have PC1, PC2 and S1. And then there is also a router but a router is not

1:25:15

doing anything in the VPN. It's just routing packets. Okay.

1:25:21

So let's go for example into PC1. I have let's open this folder. I have

1:25:29

put these files that I have previously created on my

1:25:36

public key infrastructure. Okay. You remember when we did easy

1:25:42

build client build server? It generated me a certificate

1:25:49

and a key. I just paste the pasted the file here. Okay.

1:25:56

I just put the certificate and the key of the client here. and also

1:26:02

the certificate the certificate of the certification

1:26:09

authority CA. Certiles are the cryptographic files

1:26:16

that are needed. Okay. And these are again the files that I have we have

1:26:22

created previously. Okay. So if you go inside PKI you find my

1:26:27

client one key my client one CRT and CA.CRT.

1:26:36

Okay. This client.com is the config the

1:26:43

OpenVPN configuration file. So if you just double click it.

1:26:50

So this is the OpenVPN configuration file. You may you may find it a little

1:26:57

bit confusing, but the thing is is that everything that starts with a uh an

1:27:05

hashtag, how it's called? They say an hashtag, okay, is a comment. And also

1:27:10

everything that starts with a a semicolon is a comment. Okay.

1:27:17

So all of this it's a comment. So this is the first directive

1:27:25

of the of the configuration file. It says client. Okay. Because in a VPN

1:27:31

there are two cases. Either I am a client or I'm a server. Here I'm running

1:27:36

client. So I am a client. Second thing either I'm using tap

1:27:42

operation or tan operation in this case I'm using

1:27:48

okay and basically

1:27:54

here we ignore this you see comment comment comment

1:27:59

here we have to choose whether to use uh TCP or UDP.

1:28:06

What does that mean? Uh again when we create the tunneling the

1:28:13

VPN tunneling you see we connect DC1 and S1 and we

1:28:18

have our tunneling this tunneling how is performed is performed on UDP or on TCP

1:28:28

we can choose it. Okay the default is on UDP.

1:28:35

So again let me take this

1:28:44

this tunneling slide. So this tunneling right here is

1:28:50

performed via UTP not via TCP. It may sound strange but the thing is

1:28:57

that uh usually the client the two clients

1:29:05

they already speak TCP. So there is no need to encapsulate a TCP

1:29:13

connection inside another TCP connection. It's redundant. You get more

1:29:19

acknowledgements. uh you you don't get any benefit because

1:29:23

one application of TCP is enough to guarantee uh orders of packet delivery

1:29:30

uh congestion control all of the stuff.

1:29:35

Okay. So what happens is that the encapsulation the tunneling is performed

1:29:40

usually via UDP. Okay. So TCP over UDP.

1:29:47

This is just a technicality but to keep in mind

1:29:56

the server. Okay. The server you want to connect to.

1:30:02

And this is the public IP of the server. And the port

1:30:08

by default it runs on port 1194 on UDP. Okay.

1:30:16

And basically that's it. Sorry. Basically that's it. These are

1:30:23

all options. And then you have these entries right here. These

1:30:31

are the three cryptographic files that you have to specify. Okay. trigger

1:30:37

cryptographics files that you have to specify which is

1:30:42

first the certificate of your certification authority,

1:30:47

the certificate of yourself and the key the private key of yourself. Okay.

1:30:54

And you just say look you can find this files in this path. Okay. The CI the

1:31:01

certification authority certificate is in this path. My certificate is in this

1:31:07

part. My private key is in this part. Okay.

1:31:16

And then there is just a log and other let's say optional uh

1:31:24

optional things. Again I have uploaded this file to you. Remember everything

1:31:30

that starts with a semicolumn on or an hashtag is considered a comment. So just

1:31:36

ignore the line. Uh but anyway in the client config in the client

1:31:40

configuration we specify again that we have we are a client we are operating on

1:31:47

layer three tunneling the server to which we want to connect

1:31:52

to. So which IP address and which port we are talking UDP

1:32:00

or TCP. Okay. Um,

1:32:06

bust. Okay. Did I say the cryptographic files? Maybe. Yes. Okay. The the the

1:32:11

keys. Okay.

1:32:17

The CL the server configuration is the same. Again, if you go to root

1:32:25

server.com, it's basically

1:32:30

a similar thing. Okay, you say

1:32:38

somewhere that you are on a server.

1:32:47

You say to which port you are listening to. This is the default port. You say I

1:32:51

speak UDP. You say I speak uh I want to do layer

1:32:57

three tunneling. These things must be shared across the clients. So the

1:33:01

clients have to know whether you speak TCP or UDP which port you are listening

1:33:05

to if you are doing layer two or layer three tunneling

1:33:10

and then again the cryptographic keys the certification authority

1:33:17

which is the same of the one of the clients my certificate and my key.

1:33:24

Okay. And then I also can specify this. This

1:33:31

is something that the client couldn't specificate

1:33:35

the subnet. When you connect to the VPN, you add your the client gets their own

1:33:42

IP addresses to which subnet. Okay. Here the server can specify the subnet of the

1:33:50

VPN. In this case, it's 10.8.0.0/24. Okay. Y /24. This is the the net mask is

1:34:02

SL24. You can put here whatever you want.

1:34:08

You shouldn't create any conflict. What what I'm saying is that if I

1:34:17

I don't know do do something like this.

1:34:24

So this is a very common subnet. This is the subnet that many router at home will

1:34:31

use. This could potentially cause a conflict because if I run the VPN like

1:34:37

so, the clients connected to the VPN will receive an address

1:34:43

inside this subnet which is the same subnet of the one that they are

1:34:49

connected physically. So it can create rooting conflicts

1:34:54

and nothing works. Okay. So when you create your VPN just use

1:35:03

some uh some subnet which is not too common.

1:35:08

Okay. So I don't remember if I told you this

1:35:12

but there are some blocks of private IP addresses. Okay. So

1:35:18

192 168 SL16 is a private address. 10 SL8

1:35:25

is another block of private addresses. Okay. So it means that they are private.

1:35:31

Choose a random one a random subnet. Just bear in mind to to that is not uh

1:35:38

should not be too common. Okay.

1:35:59

Okay,

1:36:06

>> let's do this last 20 minutes and then we can go.

1:36:24

Okay. So, um here we have al always the VPN running.

1:36:34

Just a thing that I forgot to mention is that let's observe the routing table.

1:36:45

uh by default by default

1:36:50

how VPN works you know when you use a commercial VPN like ProtonVPN

1:36:57

NVPN or something the thing is that all the packets that exit from your computer

1:37:05

they pass inside the VPN okay this is not the default behavior of a VPN the

1:37:12

default behavior VPN is just saying look you want to reach this private network

1:37:19

you have to go inside the virtual network interface

1:37:24

that's it if you want to add the capability of routting all the traffic

1:37:31

inside the VPN you have to manually add the thing okay

1:37:39

Uh let's take for example

1:37:48

um let's see let's take for example a real

1:37:59

um a real protonVPN configuration file okay

1:38:06

just to make thing a Okay.

1:38:15

And you see it's connected. I have on my computer a virtual network interface.

1:38:23

And let's inspect the routing table. Now I am on a Mac so it will be a little

1:38:32

different than a Linux that I will see at least how it is formatted.

1:38:40

But I think it's the same. So just ignore all the stuff.

1:38:50

What a VPN, what the VPN do in order to take all the traffic and put it in and

1:38:57

redirect it inside the VPN. Well, it add that these two routing actually these

1:39:04

three configuration routing entry line. Let's say let me write them on a file so

1:39:09

it's it's just a little bit clearer. Okay.

1:39:21

And then we have 10 uh and let me just write the extended

1:39:35

notation. Okay, this is just a same thing of doing this.

1:39:47

Okay, so the VPN I just wrote it here for

1:39:53

added these three routing entries and you see

1:40:01

what does these two entries do? Basically they are catching all of the

1:40:07

network traffic because you see this first entry is catching every address

1:40:14

basically was this most significant bit of the

1:40:18

first bite is zero and this is catching all of the address significant bit was

1:40:24

let's say most significant bit of the first bite is one.

1:40:31

Again, if you translate this into binary, you see that these two lines

1:40:36

take all the possible traffic. Okay, so this matches everything.

1:40:44

Um, on your computer, you probably have running a default gateway entry. A

1:40:50

default gateway entry means just matches everything. But it's not a default

1:40:55

gateway. This has a net mask of one. while the default gateway has a net mask

1:41:01

of zero. So longest prefix match this slash one wins against the default

1:41:08

gateway. Okay. So in this way they catch all the traffic and you say you know you

1:41:14

want to reach everything pass through here and this is the address inside the

1:41:25

VPN of the VPN server. Okay.

1:41:32

Uh so these two lines, the first two line catch every traffic, every pocket

1:41:37

that is going on the internet and you say

1:41:41

catch it uh send it to the VPN server. Okay. Okay. How can your computer reach

1:41:50

your VP the the real physical VPN server? Okay. Well, it adds a third

1:41:56

entry. You see this a SL32 so it's not a subet it's a physical real EP4 address

1:42:03

and you says you want to reach this specific address the specific IP public

1:42:09

address of the server send it via the it was this was the default gateway that we

1:42:16

had before okay this is the it's not the VPN

1:42:22

address this is the address that my computer this is the sorry the the the

1:42:27

the address of the default gateway of the Sabiensa Wi-Fi. Okay, because now

1:42:31

I'm connected via Wi-Fi. Okay, so by adding these three lines,

1:42:37

you get that all the traffic that you your computer sends is rooted through

1:42:45

the VPN. Okay, so this two slash one to catch all the traffic and a specific IP

1:42:53

address to reach the

1:42:59

to reach the server on the internet. Okay.

1:43:06

Uh remember

1:43:12

if you are doing uh I mean just telling this because you

1:43:18

am recording. Yes, just telling this because you are most of you are cyber

1:43:23

securityist. Um remember if you're using your VPN to

1:43:31

privacy, hide your traffic, whatever, this is what happens in your routting

1:43:37

table. If you have a routing entry which is more specific than this that matches,

1:43:46

your traffic won't be rooted inside the VPN.

1:43:51

example let's see let's say that let's imagine

1:43:57

that I am connected to our Wi-Fi

1:44:04

which has this um

1:44:09

this subnet right here. Okay.

1:44:14

Well, if I have to send packets

1:44:20

to my router, these packets are not captured are not passed through the VPN.

1:44:27

Okay? Because this if I if I have to send a packet to this to an IP inside

1:44:34

the subnet, this wins because as the longest privates that matches, okay,

1:44:38

this also match they match to every uh IPv4 address. Okay. But it matches.

1:44:44

Okay. And for example on your home Wi-Fi um by default your defa your um router

1:44:54

acts as a DNS resolver. Okay. So when you do google.com republic it whatever

1:45:02

the DNS thing is sent to your home router. So in

1:45:09

other words, if you use the default configuration

1:45:13

and default VPN, your VP your your DNS calls are not

1:45:19

passed through the VPN because they are sent to your home

1:45:23

router and it's not it does not pass through the VPN. Okay, this is just a

1:45:30

technicalities but since you are cyber securityist keep in mind that this is

1:45:35

what technically happens inside your routing table. Okay, if you have other

1:45:39

entries they won't get inside the VPN. Okay. So just

1:45:47

make sure that you understand I think that I I don't remember who which cyber

1:45:52

criminal they called because of uh the reasons because of this the DNS was

1:46:01

a a near router which didn't encrypt it through the VPN. So they found something

1:46:06

anyway keep this in mind.

1:46:11

Okay, I mean this is just a technicalities

1:46:17

uh just for future reference or uh general culture.

1:46:25

Okay, last lab mode of operation that we see

1:46:33

is this um up until now we have just seen let's

1:46:39

say client server where they both run the VPN a VPN client a VPN server

1:46:47

they communicate each other okay let's create a VPN which is not end to

1:46:54

end like the example like the introduction that we see at the

1:46:57

beginning of the lecture. Consider this lab. I have a client one a router

1:47:04

possibly the internet with other stuff a router on which a VPN server is running

1:47:12

and then a computer on which a VPN is not running.

1:47:17

Okay. So the OpenVPN is running only on client one and on the air server VPN.

1:47:26

Okay. Uh

1:47:32

so considering this host right here, it

1:47:37

does not run a VPN. It doesn't know anything about VPN.

1:47:41

doesn't know about the VPN running on the server and cannot reach directly

1:47:49

client one VPN using its private address. Okay, we have

1:47:55

two separate LS. Okay, one is 10.0 something and the other is one state

1:48:01

something P host cannot reach client one because

1:48:07

they are two different LS. Okay. But we can set up a VPN to make this

1:48:14

happen. Okay. Um so we can create this VPN deducts

1:48:21

from the client to this um router server right here. Okay.

1:48:30

In this way, this is also let's say a scalable approach if you want because

1:48:34

here you can connect many other computers.

1:48:40

You don't have to configure a VPN uh certificate clients whatever for all

1:48:48

the computers that you have here. You just have one VPN configuration running

1:48:53

on the server. Okay.

1:48:58

Um how this can be achieved?

1:49:05

How this can be achieved? Well, basically

1:49:10

we just align. It means that

1:49:19

um consider

1:49:22

the subet of Post. Okay.

1:49:27

sub of Po 1926 168.0.0 we have to tell to the server we have to

1:49:35

insert this route inside the server configuration push routt 192.168.0/24 00

1:49:43

/24. What happens when the client connects to

1:49:50

the server? Okay, it automatically adds to its routting table

1:49:57

this entry. Okay, so it knows that 1926.0.0

1:50:03

is reachable passing through the VPN server.

1:50:08

Okay. So again we have our VPN. We add this

1:50:14

configuration line to the server. So whenever any client connects to the

1:50:19

server, it gets on its own routing table. Okay. 1916.0.0

1:50:26

is reachable through the VPN tunneling. Okay.

1:50:34

So Hello. Okay,

1:50:48

let me close the lab here. And we have push road.

1:51:11

Let's see. Okay, let's launch the VPN which is

1:51:34

again openvpn. Here we have server.com.

1:51:42

So this is the client. We are not connected to the VPN.

1:51:53

Sorry. So this is the client before connecting

1:52:00

to the VPN. This is our routing table. It's just a default entry. And this is

1:52:07

the subnet of our address. These are our network interfaces at zero our address.

1:52:16

That's it. We connected to the VPN.

1:52:22

We have to open another terminal to connect to it again.

1:52:34

OpenVPNC client.com and it just goes okay let's rerun again

1:52:43

this commands ip and IP A.

1:52:51

So this is the new routting table. We have a default.

1:52:57

We have this dot 100.

1:53:04

I know that's an unfortunate name, but these are two different subnets. Okay,

1:53:07

this 1921 16800 is the subnet of the VPN. You see that

1:53:14

zero and the server the VPN server has also added this entry right here. this

1:53:21

1916.0.024 which is the subnet of P host

1:53:27

and is reachable via this one which is the VPN server.

1:53:35

Okay. And here we have tan zero

1:53:42

with its own IP address inside the VPN. So you see we have two IP addresses. one

1:53:49

IP address for our physical network interface at zero and one IP address

1:53:54

inside the VPN. Okay, for example, what happens in many most

1:54:00

of the companies all the companies they employ a VPN for

1:54:05

security for their services. What happens is that um you have they have

1:54:11

their own web services and instead of listening

1:54:17

on all the available IPs on the machine, they just listen on the IPs that come

1:54:24

from the VPN subnet. Okay? So in other words, in order to access the services,

1:54:31

you must have a VPN IP. So you have to be authenticated

1:54:38

to the VPN. Okay. So in this way I can think I can ping p

1:54:59

it works. Okay. Uh so you see this is important because

1:55:06

in this way we can use the VPN tunneling security

1:55:13

authentication whatever most computers that they don't know anything about the

1:55:20

VPN for example if

1:55:26

you have a a computer which is closed which you cannot access

1:55:31

to for example, a company computer or a computer to which you don't have the

1:55:36

password and you want to change some uh some settings. Okay, so you cannot

1:55:43

change some settings because you don't have the credentials.

1:55:46

For example, you can just connect it to a network,

1:55:50

set up a VPN tunnel and so at least you can reconfigure when where is traffic is

1:55:58

is uh where is traffic is going.

1:56:05

Okay. Any questions?

1:56:21

We see each other on the next Friday. Okay,

1:56:28

that's it. Bye, guys.

1:56:38

Is

![Genera immagine capitoli](https://ssl.gstatic.com/docs/common/viewer/video/chapter_failure.svg)

[](https://support.google.com/a/users?p=gw_gemini_responses)

Visualizzazione di recording_VPN.mp4.