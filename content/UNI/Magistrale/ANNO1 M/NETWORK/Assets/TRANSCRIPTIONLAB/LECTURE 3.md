  
recording_part_1.mp4

Gemini

0:00/40:41

## 

Trascrizione

0:12

Okay. Okay. The Zoom is recording.

0:21

Okay, guys. Thank you for coming in also for the rain, for for the hour, for

0:25

everything. So I mean today we should do fun things hopefully. Um we have a

0:33

little demo some demons. I hope that they work but uh yes we will see. Okay

0:39

so today what we're going to do basically we're talking about

0:47

basically we're talking about SSH. Okay. So SSH,

0:52

how many of you have already heard about SSH? What is

0:59

Okay. Uh okay fine. So SSH is a protocol which enables you to remotely connect to

1:08

a computer. Okay. I mean uh just by saying this it seems like something is I

1:16

mean uh kind of boring. I mean just a protocol to connect remotely to a

1:19

computer. Yes, but there is a lot of security going on. And uh before talking

1:25

SSH actually we'll do a little recap on uh

1:31

let's say symmetric asymmetric encryption.

1:34

Are you I think that you're seeing something maybe with the lecture after

1:39

the mine with the yeah um but basically this is an example of um symmetric and

1:47

asymmetric encryption. we will see it practically we will create private and

1:51

public keys. So we will do a a mini recap then we will talk about SSH this

1:58

magical protocol and then also we will also see some advanced

2:04

feature of SSH which is called port forwarding which is a nice tool

2:11

which can enable you to do different things from bypassing firewalls to

2:17

something that I have a little demo some demos to show you. So we will see.

2:23

Okay. So remote managing. Okay. When uh uh we

2:31

basically we are working with networking. Okay. So we are working with

2:35

hundreds of routters of servers computers. It's not that you if you have

2:42

to configure something. It's not that you have the possibility to physically

2:46

access them all. Right? So what do you do is configure and manage the the

2:51

network node remotely. Okay. So you are in Rome, your server is in the USA. Uh

2:58

you have to connect to it. Okay. Um basically when you access remotely

3:07

usually you access it with a terminal. So that's why in the first lecture I

3:12

asked you how many of you it's the terminal but I mean if you work in this

3:17

environments uh I mean basically the terminal is more lightweight with

3:22

respect to a GUI especially if you have to to to look in remotely that's that's

3:27

the only um okay so we need a protocol we need a

3:33

way to exchange data between uh ourself that are in Rome and our

3:39

server server there is in the USA. Um we need a protocol. The first protocol that

3:45

allowed such things was the so-called Tnet.

3:49

Um Tnet from the security perspective was not

3:55

secure because it it doesn't have security. Okay, it didn't encrypt, it

4:00

didn't authenticate, etc., etc. And um you know tnet is used in the airports

4:09

actually. Um if you like once it happened to me you

4:14

know that before boarding the plane you are in that corridor that attaches to

4:19

the plane and there was a little console which was blinking tnet. because like

4:26

um well has been debregated. So now

4:31

everybody uses SSH and um

4:36

SSH is a protocol that allows remote management but also over a secure

4:42

channel. Okay. So there are some features that you may want from a secure

4:48

protocol. authentication, encryption, integrity, all the stuff that everybody

4:53

the other course will will tell authentication, encryption, integrity.

5:00

I didn't remember the the others, but basically they are uh

5:05

it has everything. Okay. Um so we will see it in a second but

5:15

basically in SSH there is

5:20

the authentication. Okay the authentication

5:25

uh which is birectional. What what do I mean by the directional authentication?

5:29

I mean that you are the client your computer which is which wants to connect

5:34

to a server the server in the USA and the authentication is birectional. So

5:40

you are authenticated to the server. So the server has a way to prove your

5:45

identity and the other way around. So the server has to prove to you its own

5:52

identity. Okay, we will see it in a second.

5:56

Um this was just to say so in this context

6:02

authentication means to prove data entity of something else. Okay. So

6:08

I am the client. I am this computer. I want to connect to a computer in the

6:12

USA. How can I be sure that I'm not connecting to some man in the middle

6:18

some let's say some attacker server which is

6:21

not mine is some others. Okay. This is called authentication. So I have to find

6:28

a way to for my server to prove its own identity. So I want to be sure that I am

6:35

connecting to myself. Okay. And it's birectional. So also the server has to

6:40

find a way to prove the identity of our self. We will see it in a second.

6:48

First of all, a quick recap on symmetric key cryptography. So you're following

6:55

the courses you know these things much better than me. Uh I don't remember

7:00

anything but basically we are talking about encryption.

7:06

Basically encryption is either symmetric or asymmetric. What changes? It changes

7:12

the key which we are encrypting the data with. Okay. So in symmetric encryption

7:18

we have the same key to encrypt and decrypt. You know when you take a word

7:25

file you save it say ah save with password. Okay so you type in a password

7:31

to encrypt it. You want to reopen the file you type the same password. Okay

7:36

makes sense. In this case we call uh we we say that this is sematic encryption

7:41

because we use the same key uh same password. Okay to encrypt and decrypt.

7:48

stuff. Okay. Um and this may be the encryption that we

7:53

are more um used to. Okay. Maybe the standard I mean these are all the the

8:01

standard algorithms. A yes maybe is the most widely used one but there are

8:08

um there are options. So symmetric encryption same key to encrypt and

8:13

decrypt fine as symmetric cryptography basically it's

8:21

a little different because we have two keys okay not one key not one password

8:26

but two uh which are kind of inseparable okay so they often called key pair okay

8:34

they are two and the rule is the data is encrypted

8:40

with one key and it is decrypted with the other key. Okay. So

8:47

we have a message we encrypt it with one of the two keys. We have some cipher

8:54

data. Okay. And then we can decrypt only if we have the other key of the two.

9:01

Okay. So one key to encrypt the other key to

9:06

decrypt. Fine. Um okay what can we do with what can we do with this? So the

9:16

idea was that that we can have these two keys. One of the

9:21

two we call that is our public key. Okay. And the other the other key we

9:26

call private key. Okay. The idea is that we can give to everyone who wants our

9:34

key for encryption which is called the public key and I keep for myself as a

9:40

secret my private key. Okay. So for example I want

9:49

let's say I want that every one of you sent me like some private message some

9:54

encrypted message. Okay. How can I do it? Well, I can give to all of you

10:00

public publically my public key. Okay? So, you all take my

10:07

public key, you encrypt your message and then me and only me will be able to

10:13

decrypt it. Okay? Because me and only me has the the private key.

10:17

Okay? So, it's just a way to to to encrypt data but with two keys. Okay?

10:26

And you see why do we need this? Um the reality is this. In practice symmetric

10:33

key ciphers are not used to encrypt large quantities of data. Okay. They

10:37

tend to be slower. Uh they require a lot of computation. So they don't encrypt a

10:43

lot of data. Okay. So if you want to send a message a long message to me, you

10:48

you kind of don't want to use this method. Okay. Because it requires a lot

10:52

of computation. uh but what it is useful for nowadays

10:58

everywhere is basically authentication. Okay. So authentication we are proving

11:04

our identity to someone else. Okay. And um the idea let's say the the the

11:13

long the the overview idea is something like this. Um,

11:21

let's say that Bob wants to authenticate to Alice. Okay. So,

11:29

sorry. Alice Bob. Um, so so

11:38

I don't remember. Yes, Alice is authenticated to Bob. So, Ellis wants to

11:42

prove the identity to Bob. Ellis wants to prove its own identity to Bob. The

11:48

idea is something like that. Um Bob chooses a random number basically uh

11:58

which is called a a a challenge. Okay. So a random number let's see this random

12:06

number is a lot of bits is big. I I don't remember how many bits but

12:11

basically it's impossible to guess. Okay, just by uh brute force but

12:16

basically this number is encrypted with the Ellis public key. Okay, it is

12:22

encrypted with the public key. Only Ellis which has its own private key will

12:27

be able to decrypt it. Okay, so Bob will encrypt the number. Ellis

12:34

will encrypt sorry decrypt the number with the private key. send the original

12:40

number to Bob and if the number two the two two number

12:45

coincide. Okay. Bob is sure that um Ellis has its own identity. Okay. So um

12:57

Bob is sure that Ellis is the real owner of its private key and

13:04

its own identity. Okay? because only who has the private

13:09

key of Ellis hopefully only Ellis will um is able to

13:15

do this operation right here so to decrypt the number with the private key

13:19

okay so this is a let's say this is a form of authentication

13:26

okay um

13:32

so in this way the the identity of alis is proved to Bob And um

13:40

notice that in this case only Ellis has authenticated to Boba but Bob has been

13:46

not authenticated to Ellis. Okay, it's not birectional the thing. So you have

13:50

to repeat the procedure another time with the whole switches switch. Okay.

13:57

But this is basically the the the the idea of

14:01

the the core idea of many many many algorithms to to to authentication

14:08

algorithms in reality nowadays. Okay. Used in the internet every days

14:15

thousands of time every second. Okay. Okay. So why I I did spend a lot of a

14:25

bit of time on this because all of these ideas symmetric encryption as encryption

14:31

user authentication we will use it throughout SSH. Again

14:38

these concepts are used in security in every protocol

14:43

that you you can imagine in the internet. uh SSH also use uses

14:51

some uh some of these concepts. So that's why I am talking a little bit

14:57

about this. Okay. So for the moment this was a

15:02

little recap just keep that in mind that we will use it a little bit later.

15:08

Okay. So now can we start talking about SSH? So connecting to an SSH. So being

15:17

an SSH um sorry first of all SSH is a client server protocol. Okay. So you are

15:24

a client. My PC could be like a client. The server I want to connect to or

15:29

another PC I want to connect to uh the the one that before we we we told that

15:34

was in the USA is called SSH server. Okay. So client server me the client

15:42

wants to connect to the server. Perfect. Okay. So if you want to be the

15:48

client is actually every Linux distribution but also Mac OS maybe also

15:54

Windows I don't know um as I said as as an SSH client. Okay. So you can be the

16:00

client is already pre-installed in every computer

16:03

I think. I'm not sure about Windows. Uh if you want instead to be the server you

16:10

need to install something. uh there is this demon sshd

16:17

uh but in kara is already installed so you don't need to do um to do anything

16:23

so ssh is something similar to this

16:33

actually I can show you this in a kad laboratory

16:38

actually I am some I have some my servers

16:42

uh let's say private servers, university servers, so

16:48

I can show you with real stuff what uh what we're talking about. So

16:57

if I want to connect to a server, a command may be something like this.

17:03

Okay. So it's basically sorry it's basically something like this.

17:14

What is that? So SSH the name of the command your username on

17:20

the server. Okay. So every server every computer has its own user. Okay. on the

17:27

virtual machine is kada I think or you I don't remember what's the name but

17:33

basically every computer has its own concept of user okay so here you write

17:39

the name of your user on the server then you write at kosula the IP address you

17:48

want to connect to and that's it the other things this is the port if your

17:54

your server doesn't run on your on um well-known port the well-known port of

17:59

SSH is 22 on TCP my server in this case doesn't run on 22 runs on this other

18:07

port you will connect this I just press enter

18:14

and I am connected okay

18:20

it didn't ask me password authentication anything

18:25

that's okay if you try to connect to it, it will ask some password. They will say

18:29

denied. Uh we will see how I did it in a second. But basically this is my um yes

18:40

server actually just a raspberry but I call it

18:44

a server. Okay. And um

18:49

so I have a terminal which is remotely connected to a server. Now it's still in

18:55

Rome but it could be anywhere in the world basically. Okay.

19:02

And then we have a terminal. We can do the same things that we can do uh with a

19:09

local terminal. Okay. Uh sometimes maybe I want to check to to

19:18

change the networking configuration of my servers basically and sometimes like

19:23

I do a change but I do a mistake and so basically the SSH connection just closes

19:29

and I am stuck out. I can no longer connect to the server. So I just have to

19:35

go there physically and restart it basically.

19:40

I mean that's SSH pretty

19:45

pretty easy. So syntax of the command SSH name of your

19:53

user inside the server and IP address. Okay. If you want to exit like any other

20:02

terminal, at least in Linux, Ctrl + D, you just exit.

20:09

By default, SSH runs on port 22. If you're using another port for whatever

20:14

reason, u you can just specify the port with the option dash P.

20:23

Easy enough. Okay.

20:32

Um so

20:39

if uh okay so no so now we we have seen how we can work as a client okay as SSH

20:47

client and that's easy enough okay but if we want to configure a server there

20:52

are a little bit of steps to do first of all is that you have to have a user on

20:58

the server okay so the server you are connecting ing to it must have a user

21:06

which you can connect to. Okay, without a user you cannot connect to the server

21:10

without without anything. Okay. Um so

21:18

in theory um

21:23

if you want to do it in the startup file you just need those lines basically. So

21:31

uh in theory Linux to create a user in

21:35

Kadarat to create a user you just type this user ad name of the user okay dash

21:42

to create all of the folders that the users need the user need and um

21:50

and this is just a way to automatically set set the password. Okay. So I can do

21:57

it live. I mean I have a lab test.

22:05

This is just a lab with some machines. Uh there is nothing

22:12

in it. Okay. Just to show you how you can create a user.

22:20

Say no.

22:37

Okay. So if I go to

22:43

basically basically in Linux all um if you go to

22:51

this folder right here so /home in theory inside here there should be

22:59

all of the all of the own folders for every user that you have. Okay. Now in

23:05

this case it's empty because I don't have no user except of course for the

23:11

root user. Okay. So I have no user. I can create one with user add name of the

23:18

user my user dashm to create all of the folders.

23:26

And that's it. Now I have a folder called my user

23:33

inside the home folder and I have added a user inside the um the system. Now in

23:42

order to log in to the user I have to set a password for the user. How going

23:48

to do it is just pass goody which changes the password and then the name

23:54

of the user. say new password

24:00

as the okay

24:07

so now I have a user with a password okay and um

24:17

and that's basically the only system configuration that we need also to to

24:22

access it with SSH okay because we have a user we have a password we can login

24:27

basically Um,

24:46

actually, let's do it right now. Sorry. Hello.

25:23

Okay. So basically I have this uh I have this laboratory right here. Okay.

25:35

Just configured with the things that we know. So the topology, the routing, the

25:40

addressing. Okay. Um on this one I create a user actually I created at

25:49

startup just in the startup file. I just these

25:54

are the two lines that I've did it before. Okay, so user ad and this is

26:00

just a way to automatically set for uh set the password

26:05

and then the first lines should be of course the networking restart which uh

26:11

says the IP and stuff and this line right here SSH start. In

26:20

this case we are in the server. So this enables the SSH server. Okay.

26:27

So enables the SSH demon which accepts the SSH connection. Okay. It starts the

26:32

SSH server. So you need that line in your in your server basically.

26:41

If I start it on the GM

26:57

if I start it. Okay. Um so from

27:07

the idea is that from PC1 I want to connect with SSH to S1. Okay. So S1 is

27:13

1050. So from PC1 at least I should be able to

27:19

ping it. IP.

27:36

So, SSH the syntax of the command

27:43

uh the username SSH SSH user

27:52

and then the IP address just like so

27:59

it ask me something. He says the first time that I'm connecting to a server he

28:04

says look this is the identity of the server you trust it this is your server

28:10

actually there is an attack in which the first time that you are connecting to an

28:14

SSH server a a fake SSH server can uh basically can reply to you okay and

28:25

uh basically you have to know

28:30

to already know the identity of your server. So in inside your server there

28:34

will be something called a a an o key. So a key an identity for the server and

28:42

the identity of the server that I am connecting to right now is this one.

28:48

Okay.

28:49

>> The first time that you are connecting to a server kind of best practice to

28:54

know the identity of your server. I mean I'm not asking you to to memorize all of

29:00

the characters on by memory. Okay. But more or less the the last char the last

29:07

characters I mean this is the identity. Okay. If some attacker is let's say

29:12

doing a man in the middle uh it will have a different identity

29:17

than your own server. Okay. So just

29:22

uh it can happen. So, are you sure you want

29:27

to continue? I say yes. And it ask me a password. So, the

29:33

password that I have set up in the lab should be

29:37

you see that when I type the password, it doesn't

29:43

it doesn't show that I'm typing the password. Okay, this is just for

29:46

privacy. Okay, but in reality, it is typing. Okay, just when you press enter,

29:51

it's uh it will do. Okay, let me remove. Okay,

29:58

so I no I got the the password wrong.

30:06

Um, okay. I am connected. Okay, how can I

30:14

understand? I am connected. Well, basically this is the the welcome

30:17

message, the default welcome message of SSH say the Linux the I'm on blah blah

30:24

blah no warranty do what you want and basically I am I have the little

30:29

terminal right here okay I can do all the commands that I know I can ping

30:36

stuff ping

30:41

10.0.1 000.1 for example

30:47

remember that now I am in S1 okay because I have a ter this terminal

30:53

is connected v SSH to S1 so every command that I run also the networking

30:58

commands are executed from S1 so I am pinging

31:05

in this case R1 what is this

31:11

is just a ping being coming from S1. Okay, it doesn't know that the being

31:16

actually comes from my computer. Okay, because I am connected the SSH to

31:22

S1 and then S1 does the being here. Okay,

31:29

and um yeah, just like that.

31:41

Okay. So, uh a little tip. There are any

31:47

questions so far? Is something? It's okay.

31:52

I guess um

31:57

since we may have a lot of computers, a lot of

32:02

um host server in order for us to not remember every time the exact IP

32:07

address. We can use literal to remember the exact IP address. Okay. Um for

32:16

example, we may want that

32:20

this this AP right here is is let's say is um

32:27

corresponds to the string PC2. Okay. So every time that we type in an

32:35

address and instead of the real address we type

32:40

PC2 the computer automatically translate the string PC2 in into the the the real

32:47

address. Okay. So just taking the laboratory before I did

32:54

this trick. So instead of putting the the full AP

33:01

address 100050 with this trick, I just can do S1

33:10

and I'm connecting. Okay. Okay, how can be how can we do how can

33:24

we do this? So basically we have to add

33:30

we have to add the this string right here to the file in Linux which is

33:34

called H O. Okay. So basically a P address

33:41

blank space name that we are we want to have. Okay.

33:48

For example, I was in PC1. PC1

34:01

IP address space S1. Okay. Uh remember that you have to um uh you

34:11

have to run this command. If you run this command after this other

34:16

command, it will be overridden. Okay. So if you

34:21

run first this uh 10.00 inside host and then you run a

34:28

networking restart networking restart will remove start will will start from

34:34

scratch the the host file. Okay. So it will be delayed. So if you want to

34:40

launch this command this networking restart just do it before

34:45

okay before this come. Okay.

35:01

So now we I actually um

35:06

this ledger presents all the technicalities of the protocol. Now we

35:10

won't go into the technicalities of the protocol but if you want I've just

35:13

reported but basically is divided into three main steps one two three.

35:23

First steps they um build an encrypted connection.

35:31

Then the server authenticates to the client and then the client authenticates

35:35

to the server basically. First step, second step,

35:40

third step. Okay. and um

35:50

just like so. Okay. So,

35:58

um actually

36:01

we want to take a look at the client authentication. This is

36:07

the let's say most important part the part we will focus on. So the client

36:12

authentication is how the client can authenticate itself to the server. Okay.

36:18

So I want to connect to my server. How the server is sure that

36:24

I mean I'm not a man in the middle. I am not uh um not doing nasty things. Okay.

36:32

So client authentication. So basically client authentication we

36:40

have two methods password authentication and

36:45

public key authentication. Okay. Um

36:51

so with password authentication basically just the client sends the

36:55

password to the server. Okay. Like we did in a few seconds ago. Okay. Okay. So

37:01

we connect to the server. The server ask okay type your password. just type our

37:07

password. It worked fine. Um,

37:14

what's the problem of sending the password the the real password is that

37:23

we can have an attack man in the middle between me and our server. Okay. Um,

37:34

oh, sorry. Let me let me go back. Um main the middle is not possible because

37:43

we have an encrypted connection. We have done a server authentication.

37:48

But basically if the server we are connecting to is malicious. We have just

37:53

given the password to the attacker. Okay.

37:58

Because we are sending just the password is actually I did this. This is just a

38:03

little experiment that I did. Uh, basically I had like my server turned on

38:10

for three days more or less and was just listening for all the password, all the

38:17

the the username that come into my server. This is just an experiment that

38:22

I tried. Okay. And uh you see all of the atoms from bot inside the internet.

38:29

Okay. So malicious bots that try to break in inside the SSH server and these

38:36

are all the attempts that I observed in I don't remember around three days okay

38:42

so on the left is all the the the users that they tried brute admin user user

38:50

one default okay and on the right the password okay

38:55

so the password is password one two three four five six one. Okay. So, in

39:04

three days I served more than I more than 8,000

39:10

tentives to break in inside my server. Okay. Just myself. Okay. just to remind

39:14

you that the internet if you want to put something public on the internet

39:19

just be sure what you're doing because okay there there are a lot of automated

39:23

automated programs that uh look for

39:29

to to enter inside your server. Okay, this is blank password the white space.

39:37

Okay, so at least don't put one of these passwords inside yourself. Okay.

39:45

Okay. So,

39:49

this was password authentication. I don't know if you want to do a small

40:07

really small break because we have seen a lot of things and

40:12

then uh

40:16

>> yeah I mean a little break and then uh a demo.

40:21

Okay, I think that we can do a little break because we've been we a lot a lot

40:26

of things and then we we do the some practical stuff. Okay. So, 10 minutes.

40:31

Okay.

[](https://support.google.com/a/users?p=gw_gemini_responses)

Visualizzazione di recording_part_1.mp4.

  
recording_part_2.mp4

Gemini

0:00/31:23

## 

Trascrizione

0:00

Ok. Ok. So this is inside my server. If I

0:06

want to create public private authentication,

0:10

first of all I exit the server. Ok. Control D. Close the connection from the

0:15

server. Fantastic. Now I am in my host. Ok.

0:19

So first step SSH kijen. Ops. Ssh kijen.

0:37

Enter a file. Yes. No.

0:42

Perfect. Saved in this folder. If I show the see the contract of that

0:52

file of that folder contained my key, my private key, my

0:58

public key. This is my private key and this is my

1:16

public key. Ok.

1:21

So now I have to copy all of this only the public key to the server.

1:28

How can I do it? Well, I the first step kijen, the second step

1:36

and the third step or I can do all of manually or as I told

1:44

you the previous steps can just be done by

1:50

writing this command right here. Sop it does everything. Eh, takes the key,

1:56

authorize it, copies. Fine. So, just type

2:02

SSH copy D. Eh,

2:10

qual era il mio utente? Non mi ricordo. Certo.

2:17

Mi scusate, eh, non mi ricordo il coso.

2:30

Quindi Ssh copy di spadacino 100

2:40

188 217

2:46

711 196 Ok

2:55

bla bla bla password

3:13

And if I didn't fuck up the password, fine. Number of keys are one. Now try to

3:19

log in the same machine and check that

3:25

and check it worked. Ok. So if du ssh spadacino

3:34

188 217

3:39

711 196

3:45

enter password because

3:53

inside the folder filesh/utor

4:03

keys. This is my key guys.

4:25

server working on the server because

4:38

I have to close. Sorry. Eh, ho capito.

4:54

E sorry.

5:07

Sorry something in my server. Ok.

5:28

Ok guys, so now another

5:36

so since we're talking about SSH so SSH

5:42

fantastic remote access ok there are some other

5:47

functionalities of SSH that can be used to do some nice things. In particular

5:55

one is called port forwarding. Ok. So

6:05

now see of course by word is since difficult but if you do the examples

6:13

actually nice so the s gives us the possibility to perform port so port

6:20

forwarding and in the context of SSH port forward redirects packets

6:40

PC1 we entered SSH S1 and then from S1 we launched a ping ok

6:49

kind that we are using the SS connection to tunnel our packets and to send them

6:57

from another destination more or less. Ok. So there is this

7:03

concept of tunneling. Ok, we have this SSH connection. We will use this SSH

7:08

connection as a tunnel to let's say and we do nice things with this. Ok, we

7:16

will see it in a second. But basically these are some only some of the use

7:26

cases that you can have. For example, you may want to run a public web server

7:32

inside bypass firewalls. Ok.

7:38

So yeah, we will see this. Ok. So enough words. So basically we

7:46

have to differentiate first if we want to perform the socalled local or remote

7:51

port forwarding we will start with the local port forwarding. So these are two

8:00

two two scenarios. Ok. So the first scenario

8:06

again by telling word in my opinion will be harder

8:11

to understand rather than just showing you an example. Ok so this is an example

8:18

scenario suppose that you are abroad for example in Germany I know if there are

8:23

any Germans just was my chance. Are you from Germany?

8:28

No, and the server you wish to connect some

8:33

regional restrictions. You know, you may have encountered like

8:38

websites this video is not available in your country.

8:48

Ok. How can you do it if you want to do it yourself?

8:53

Basically SSH local port forwarding gives you this possibility ok the only

9:00

thing that we need is that we have home PC

9:06

or whatever it could be something connected to the internet even Rasberry

9:11

P something mini PC whatever runs an SSH server ok and that we can access it

9:22

that's example scenario

9:30

y upload upload this is catara labeming this scenario.

9:37

This is Germany, this is Italy. You are in Germany. You try to connect to the

9:41

server, you connect to the server. recworilable

9:51

because in Germany what if

9:57

we can do something like this instead of connecting directly to the server we

10:03

first connect from connect from Germany to Italy to

10:10

our server computer It

10:17

connectver in this case server accepts the

10:22

connection because he just see a connection coming from

10:26

Italy. It doesn't see all of doesn't see that in reality I'm connecting from

10:30

Germany. Ok. So in this way we are we are tunneling the connection

10:36

from Germany to Italy and then to Italy we are connecting to the server. Ok.

10:44

This is just a catara lab. Let me

11:04

cd local forward. Ok,

11:21

I didn't open all the terminals. If you catara, you use this option. Dash dash

11:26

no terminals. It launches the lab. It doesn't create the terminals.

11:31

You connect to a terminal by doing katara connect. Boh, PC one. Ok.

11:38

So from PC one if I try to connect to the server

11:49

remember which service was running on the server

11:56

python 3 eegooserver.pby ported. Ok. Yes, of course. AD is for

12:03

the mem. Ok. Ehm. Ok. So if I do here now I'm in Germany

12:15

from I'm in PC one connecting to the server. So Netcut 10.0.3.3

12:28

porta recogniz the just an ecerver which sees

12:36

the connect and says from Germany connection

12:43

ok let's try to do this way ok so how can

12:48

we create this tunnel how can we do it the syntax of the command is similar of

12:55

course starts with Ssh and then we pass some options.

13:01

We say NL actually the N is not necessary but we

13:13

use it the L the one which stands for local part forwarding.

13:19

Ah this is the the slides this is the slide.

13:23

Let me write the command and then I'll show you. Ok.

13:27

Then I'll give you explanation. SSH bla bla bla.

13:36

Connetti a 10. 0

13:44

3580 e

13:55

102 102%

13:59

Ok so this is the command that

14:08

I want to launch What is this stuff?

14:13

What is this stuff? Basically, SSH, ok, L is the option that we need and then we

14:22

have this stuff right here. So, a port the IP address another port. What is

14:29

this stuff? Basically by doing this I'm telling DSS

14:36

open on my computer my local computer that's why local

14:42

forward on my local computer a port which can be

14:47

whatever you want I selected 5000 could be 9000 port you want arbitrary

14:55

everything that will go through this port will

15:00

sent user and then forward

15:07

address to this port. So

15:14

I repeat it again with the scheme here. Local port forwarding we are opening a

15:20

port here. We are putting a port in listen mode here. I've selected 5000 by

15:26

arbitrar whatever you want. And you say, "Ok, everything that goes local my port

15:33

will be first sent to my user." Ok,

15:42

this is your usual SSH string. Ok. User IP address. Ok. It will first sent to

15:49

this user and then it will be redirected to the server. Which address has the

15:56

server? 10.0.3. 3.5 port editi

16:03

10.03.5 portai. Ok. I also use the option dash vbos.

16:14

So to give you gives you some information mode if you want. Press

16:18

enter. So this information is just for the verbos mode. Okay.Ok. So it's a lot

16:24

of stuff but just to understand it's not that you you we have to know

16:31

all of this stuff. So we want to connect. Yes. Password it

16:36

was password. Ok. Requesting. Request.

16:44

You see that nothing is working. At least it seems

16:49

instead it is working. Ok. So you see that it but actually still it's working.

16:56

Ok. So we take this terminal and leave it

17:05

and leave it here for a moment. We don't have to close it.

17:10

Ok. Because now the tunnel is running. We have to open another terminal.

17:16

So again we do in eh

17:24

local forward. Ok, again, this is my computer in Germany.

17:36

Of course, if I do as always, Netcut 103

17:46

3. If if I do the usual net cut connecting

17:52

to the server, it still tells me it still recognizes me

17:59

that I am connecting from Germany. Ok, because I'm connecting directly, ok,

18:03

from my PC. By writing that I'm using this route

18:09

right here. Even if the tunnel existing this route here. How can I use this

18:14

route? Well, instead of this, I just write

18:23

local 5000.

18:27

Why log 5000? Because if we look the command that

18:32

running before this one.

18:40

Dimmi dimmi. Ok. If we see the command that we are

18:45

running before it says that I'm opening a local port 5000.

18:52

Ok. So this arbitrary port should match the port that you specify here. Ok. This

19:01

creates a tunnel and now you are connecting using the tunnel.

19:07

I press enter I connected from it. Ok. You have just bybassed

19:15

regional restrictions. Ok. Just an echob.

19:20

Ciao. Ok.

19:25

So again instead of using the direct root we say

19:33

we first create an SSH connection and SSH SSH everything that passes that go

19:41

through my tunnel please let it arrive to PC2 and then PC2 send

19:48

it to its final destination ok this is nice.

19:56

Ehm, ok. In this way we have bypassed for

20:03

example regional restrictions but there are many many use cases that something

20:10

like this could be useful. For example, bypass in firewalls.

20:17

Ehm, vabbè, faccio vedere pure questo.

20:38

Ok, last thing and then we are done. Remote power forwarding.

20:45

Remote for forwarding is a similar thing.

20:50

The concept is more or less the same. So we have a C connection. We tunnel the

20:56

connection. But this time the port the openet port is not opened on my

21:03

local computer but on the remote host. H the name remote port for ok

21:12

so what it does is it opens a listening port on the remote host ok

21:20

instead of a local port or my local computer

21:28

we will see an example right now Ehm,

21:38

let me do it. Pa pa.

21:46

Ok. Suppose for example that I am on a LAN

21:51

without a public address for example in Sapiens. Ok. In sapienza I don't have a

21:59

public address private address the addresses are not under my control not

22:05

sapien not sapien guy ok so I not a public IP address

22:12

what's my problem is running some web service web site

22:18

something that I am developing just hosting a web page. This is just a

22:25

scenario. one of the possible things that you can do.

22:30

What do I want? network

22:35

service. Ok, how can we do it?

22:41

So again the problem is let me start things and then

22:49

I show you. Pace,

22:59

la pace. 5 2 4 7

23:15

8080. Ok. So on my host now is running this

23:20

beautiful web page that I am developing. Costed me 10 hours of HTML basically. So

23:31

this is web page running on local host my computer. I

23:37

don't have any public AP on my computer connected in Sapienza. How can I do it?

23:43

I don't want to

23:49

I don't want to transfer all of the stuff

23:54

with SCP or something to my remote server. Ok. Why I don't want to do that?

23:59

Well, basically because I may have all of the configuration variables, all of

24:05

the programming environment. I don't want to move files. Moving files is

24:09

complicated. Ok. It runs on my computer. I want to show you to you how it runs on

24:14

my computer, not on myself. Ok. But don't have a public IP. How can you

24:19

connect to me? Ok. So

24:25

you may need an hotspot to connect to this. Because will block the sport.

24:34

What's the command here? If I do should be written on the slides, right?

24:47

Yes. The concept is the same. Let me again

24:52

write the command and then and then the P address which I always

25:09

forgot is

25:15

18 problem with remembering address.

25:23

217 7 rà vi giuro non

25:32

>> Grazie 192 168

25:41

you know this right ecco vbè ok what's the what's the deal ok

25:49

the command is pretty similar not using L sorry stands for local port forwarding

25:56

using remote port forwarding and this is the screen what happens again arbitrary

26:02

port some other stuff this arbitary port will

26:07

be opened on my remote server which remote server the one that specify here

26:13

ok this remote port will be opened on the remote server and everything that

26:18

will go will arrive to port

26:22

will be tunnel through my computer and send al to local host ed ok

26:33

so if i launch it yes

26:41

ups Ok. So try to connect.

26:53

So open your browser need hotspot or something or even your

26:59

phone. It's ok. Your phone connected to data plane not the wifi. And try to

27:06

connect to this this address right here. 188 217

27:17

71 196.

27:21

Port port port

27:27

5 47

27:31

527 Now I'm connecting the thing to sa

27:43

network so it won't work does it work for you if you type in this

27:48

address or in your You see my web page.

29:47

here for the forwarding and lower forwarding.

29:54

sketch found stock exchange show you the differen

30:00

between remote and local this sketch seems to be drawn by years

30:07

old but actually they are pretty good if you look at them understand them

30:14

take a little time this really Ok,

30:25

if you want not now because of course we don't have time but I can to exercise if

30:33

you want. firewalls are acting and basically the

30:45

goal is by using forwarding

30:50

you have to bypass all of firewalls and to make the ultimate goal is to make a

30:57

connection from PC1 to PC2. Ok.

31:09

Ok. Eh, ciao.

31:20

Vabbè,

![Genera immagine capitoli](https://ssl.gstatic.com/docs/common/viewer/video/chapter_failure.svg)

[](https://support.google.com/a/users?p=gw_gemini_responses)

Visualizzazione di recording_part_1.mp4.