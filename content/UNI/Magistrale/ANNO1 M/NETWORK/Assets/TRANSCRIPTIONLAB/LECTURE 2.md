  
recording_lesson_2.mov

0:00/1:55:50

## 

Trascrizione

0:02

recording started.

0:08

>> Okay guys, so again good morning and u this is the second time that we meet.

0:16

Okay, so last time we did let's say last time we did um introduction to kad.

0:24

Okay. So what kada is I told you something then you try to replicate a

0:31

laboratory. Okay. So I mean it was basically um

0:36

I threw to you a lot of stuff and basically you you you during the lecture

0:42

was to recreate the laboratory. So uh as far as I see I mean um well compared to

0:48

the other years I say that you you were doing more than let's say considering

0:55

the average a little bit more than the average. So yeah good job. Okay. So

1:01

today I want to um we move on and we speak a little bit about rooting

1:11

subnetting and also okay we'll see in a second. So have you ever

1:18

seen this image something like this? If if I talk if I

1:23

tell you the famous layer of internet you know this image maybe from

1:35

I don't know how it's called today when I did it was now it's the okay so um you

1:44

have seen this image you know that the internet is composed in layers maybe for

1:50

those who don't know what this image is fine. Don't no worries. It's we we're

1:54

going to do a brief recap on on on this. So our goal today is do again a brief

2:02

recap on this and see this layer with a let's say a practical a practical

2:08

perspective. Okay. Particularly we want to understand more

2:14

or less what happens here. Okay. physical layer and sorry the

2:22

the layer two and layer three. Again, if you have no idea what I'm talking about,

2:27

I'll be will be explaining in a in a second. Okay.

2:35

Okay. So,

2:39

why do you do we have this let's say this

2:44

this layering? Okay. Because internet is complex. Okay. Internet is a network of

2:50

networks. It is a little bit complex. So they came up with this idea. Let's say

2:56

so let's start from the basic problem. Okay. Basic problem. I have two routters

3:03

two entities. Let's say that they want to share information across a medium.

3:07

Okay. How do they share information across the medium? I don't know if those

3:12

two entities were two persons, two people, sorry. They may want to talk.

3:17

Okay. So, send some signal. Okay. Using some uh let's say some uh known

3:24

language. Okay. For example, I want to communicate to you. I'm using my voice.

3:28

If they're computer probably they're using something like electromagnetic

3:32

waves. Okay. But other options are possible. For example, underwater there

3:38

are the um also a field which is known as underwater communication. Okay. So,

3:43

there are sound waves under the water. But we don't care the the idea is that

3:50

um on the basic level so the physical layer so-called physical layer is

3:56

responsible to define how information is transmitted from one end to another. How

4:02

is transmitted is I mean we don't care that's stuff for the electronic

4:07

engineers okay but I mean physical layer is responsible for transmitting

4:12

information from point A to point B. Okay, let's this is a network. Okay, a

4:20

network composed just of two points but it's a line but it's a basic network.

4:25

Let's try to complicate the network a little bit. Let's try to add

4:32

some more entities. Okay. Okay. If you have more entities, there

4:38

is another problem. How do you let's say that this router

4:44

want to talk with this router not to all of them just one okay how can you

4:51

accomplish that by the way the slides are now uploaded on the drive if you

4:56

want to download them okay so

5:01

how do we do it accomplish that well basically first of all we have to we

5:08

should have a mean to uh distinguish these nodes. Okay, to address this node,

5:15

I have many nodes. I have to distinguish them. Okay, I want to talk to node A, to

5:20

node B or to note C. Okay, so here it is introduced the concept of addresses.

5:28

Okay, in internet these addresses are known as MAC addresses.

5:35

called me. MEA make me make stands for medium access control. Okay, these are

5:40

addresses. They are written in this form. Again, we will see them in a

5:45

second later in the lecture. Their addresses. Okay, so this router wants to

5:52

talk to this other router. We just have to specify it address. Okay, in this way

5:58

you can distinguish it between all of them. Okay.

6:04

So this is what layer 2 does. Layer two in case of you have let's say a network

6:09

which you have to distinguish to which one you have to you want to talk.

6:14

It manages many things among that it manages physical addressing. Okay

6:21

physical addressing which is addressing between adent let's say nodes that are

6:26

closing the network. Okay. That kunicate directly. Okay. Each network interface

6:33

of every device has assigned a unique identifier the MAC address. Okay. So

6:38

that's why the the MAC address. Okay. So now our network

6:45

is let's say just some entities connected. I can choose via the MAC

6:52

addressing. We are the this addressing I can choose to which one I want to talk.

6:57

Fine. Let's complicate our network a little bit again.

7:05

Let's do something like that. Let's introduce

7:09

the concept of distant nodes. Okay, nodes that I cannot communicate

7:15

directly. Okay, now before if I was this router and I want to talk to one of

7:22

these three routters, I just tell him directly. Okay.

7:29

Here not here this router if he wants to communicate with this other router

7:34

is too distant. Okay. You cannot communicate to it directly. Okay. So

7:38

basically this router has to send the message first to this router and say hey

7:44

deliver this message to its final destination. Okay

7:49

I don't know the word in English but they do a pasabarola. Okay, that's the

7:54

concept of of forwarding. This is the layer three. Okay, so

8:02

I have this nodes again the addressing problem. I have to know to to address to

8:10

identify uniquely the entity the router that I want to

8:15

talk to. Okay, how do I do that? Addressing. Okay.

8:21

So every node in our network receives a an address which is called an IP

8:27

address. Okay. So before we have MAC address and now we have another address

8:33

the IP address. Okay. And um

8:38

and so what this is what the layer three does. So again you see that every time

8:45

we go up in this scale okay the complexity of the network increases okay

8:51

so physical layer when we have just two entities layer two when we have multiple

8:57

entities directly connected layer three we have multiple entities that could be

9:03

scattered across the world and they they don't have the requirement to be let's

9:08

say uh close Okay.

9:16

And so basically this is the structure of the internet more or less. Okay.

9:22

Where we have we have multiple entities that they forward packets. Okay. And um

9:29

we will see actually what happens the routting because the layer 3 is also

9:34

responsible to determine which path to take. Okay. because maybe this router

9:40

sends the packet to this destination by going this way or maybe choose to go

9:46

this way. It depends. Okay. So that's the structure of the internet

9:54

moving on let's say on the stack we have transport layer which is I mean

10:02

we here we do not complicate anymore the network because it's already

10:07

complicated. is already a let's say a distributed network. Uh

10:12

but here I mean we don't care about this but basically then there is transport

10:17

layer which is TCP and UDP that they transport application data. So again

10:23

this is not that we we are going to uh it's not the focus of this course but

10:28

basically there could be some problems when we do this routting for example

10:34

some packets I send it let's say this way up some other packets I send it this

10:40

way down what happens if the destination receives the packets a non-ordered way

10:47

what happens if there are packet drop along the way so there are problems many

10:52

problems in this uh in this solution problems that should be solved by

11:00

the let's say uh protocols that are appear like TCP or there is UDP whatever

11:08

okay so it's very important to remember even if

11:13

you don't understand it 100% but to remember the layers of the network

11:17

because when you operate on a network you have to have clear in mind on which

11:24

layer you are working on. Okay, you are working on physical layer.

11:30

I hope not. You are working on layer two, you're working on layer three

11:34

because every layer has its own let's say capabilities to offer has its

11:41

own limitations. you are working on layer two say ah okay I have make

11:45

addresses I can talk only to near nodes or if I have layer three ah okay so I

11:52

can reach distant nodes I got to do this I can do that okay we will see it in a

11:58

second but basically this is I mean if you work with work in a company or or

12:04

whatever and you are put on networking networking environment you have to Keep

12:12

clear in mind where you're working on. Okay. Here, here, here. Okay. Because

12:18

it's important because otherwise things don't work.

12:24

Okay. So,

12:29

basically this was the legacy

12:35

layer subdivision. Okay. because nowadays these three layers are commonly

12:41

known as application. Okay. So

12:47

let's say that you have your final application http https whatever

12:54

it's here and uh it's on top we're going to not use it but it's on the top of the

13:01

of the layers. Okay. Why again why I'm telling you this? This

13:08

is just to make you understand what happens of all the

13:15

complexity involved for all the basic things that we do in our life. Okay, I

13:22

am I don't know I about to come home. I just send a

13:27

message. Look, I am about to go home in 5 minutes. Just press enter time two

13:34

seconds. What happens under the hood? Well, it

13:38

happens all of this that we have seen. Okay, for example, you want to send a

13:43

message to a WhatsApp. That message is encapsulated into the um application

13:50

layer of WhatsApp of your application. If it was Telegram, it is Telegram.

13:55

Instagram is Instagram. Okay? So, every application has its own application

13:59

layer. And then you run the stack all the way down.

14:04

You run this stack all the way down. So application then transport network data

14:10

and physical. So this application frame is packed into

14:15

a TCP frame. This TCP frame is packed into an AP frame when assigned an IP

14:21

address. Then it's assigned a MAC address into a layer two and then

14:25

everything is transmitted using the physical layer. Okay. So all of this

14:31

just for send a message. Okay. I mean and this is done in some microsconds.

14:38

Okay. Okay.

14:48

So this is actually called packet

14:53

encapsulation. So that's why the name layers. Okay. Because in every layer

15:00

your packet let's say in every layer that you when

15:04

you go down the stack of layers every frame is encapsulated into the

15:12

protocol of the next layer. Okay, this application layer WhatsApp talks with

15:19

TCP. So I create a TCP packet that encloses the WhatsApp packet let's say.

15:26

Then TCP runs on IP. Fine. I create an EP packet which contains the TCP packet

15:33

containing the WhatsApp packet. It's like an onion. Okay. If you go deeper,

15:38

then you have create a mech packet that creates the P packet containing TCP

15:42

packet containing the WhatsApp packet. So you have this layering. Okay.

15:47

This layering, this encapsulation, okay, and this happens in every packet that

15:53

runs on the internet. Okay.

15:57

For example, for example, you can

16:07

uh did we see war shark last time?

16:10

>> No. Maybe not.

16:12

>> Okay. Well, because there's a watch. Did you

16:23

already seen it or because I had in the previous slides but basically because of

16:28

time I don't think that we managed to do it.

16:34

So in the drive actually later we'll see it better but basically in the drive I

16:40

have uploaded some files. Okay.

16:50

I updated some files in the drive. For example, there is an httpcap

16:57

pcap. Okay, strange file. Okay, if you install warshot, sorry, on your

17:04

machine, you will be able to open it. Okay,

17:08

so if you have if you just download the file from the share drive, okay, where I

17:12

uploaded now the slides, you download this file and you open it with

17:16

wireshark, okay? If you have the virtual machine, I

17:26

forgot to If you have the virtual machine and you

17:30

want to use wire shark, basically I just forgot to install it. You just have to

17:43

if you have the virtual machine, I forgot to install it. So just run this

17:48

command and we should be fine. Okay, for now this is just just to let you see the

17:55

let's say the the layering of the packag. Okay, for example here I was

18:00

running my computer was asking some HTTP request

18:05

to somewhere I I don't even remember and I

18:09

listened for the traffic. Okay. So if you see there is an HTTP packet

18:17

standard get and here you see all of these lines. So

18:26

on the on the right there is the bucket. There's the full binary packet. Okay.

18:32

The exadimal representation of the packet. Let's say this is the full

18:37

packet that runs on the physical layer. Okay, for example, it was connected via

18:43

Wi-Fi. Then all of those byes uh let's say that were sent via Wi-Fi.

18:50

Okay, but inside the spockets there are many layers, many protocol that run.

18:57

Okay, they are in the reverse sorted. Okay, so

19:00

this is the application layer which was on top. Then you have transmission

19:05

control protocol which is TCP. Then you have internet protocol which is

19:10

IP then internet which is layer two and

19:15

that's it. Okay. So application so this is the highest layer layer four and

19:22

layer three layer two and for every layer you can actually observe what

19:28

happened. So in wireshark if you just open

19:34

the corresponding the corresponding let's say layer it

19:39

gives you some information okay for example TCP

19:45

gives you information about the product this is a very complicated protocol okay

19:49

there are many windows many scaling procedures but it gives you all

19:55

of the information if you open a

19:59

Internet protocol you should have source address destination address. Okay. If

20:06

you open internet you should observe the MAC address of destination and the

20:15

MAC address uh let's say um source MAC address.

20:20

Okay. This was the MAC address of my old

20:23

computer by the way. Okay.

20:30

So why I'm telling you this just because to to let you know that there is this

20:36

encapsulation in internet. It's not just we're not talking about kad. We're not

20:40

talking about this this the the the course. Okay. This is how it works in

20:46

internet every time every day. Okay. So you have when you want to send a packet

20:50

there is this encapsulation to keep in mind.

20:55

Okay. Okay. So a little question why

21:10

um when we talk about L2 and L3 and means layer two I mean layer two and

21:16

layer three. Okay. So we're talking about MAC address MAC layer and IP

21:21

layer. So the question is each node in the network. So you have a

21:27

network computer and computer or phone and phone and you want to just to send a

21:32

message. Every node in the network has let's say that it has one IP address and

21:39

one MAC address. Okay, usually if some someone is on the is on the internet at

21:47

least as a one IP address and at least as one MAC address.

21:52

Why is that? Why do we need this double addressing? So two ME let's say a MAC

21:58

address and an IP address. Why we couldn't stick to to to

22:04

one?

22:05

>> Because basically the address is the the address of like layer

22:10

while the address is the address of layer two of the network layer. So like

22:18

uh just like they're made for different purposes because uh the address is made

22:23

for rooting. The the net address is just made to identify a certain network.

22:32

Exactly. Yes. Why? Why is that? Just repeat it to everyone.

22:39

We cannot stick with just one address. Okay. We cannot just stick with one

22:44

address. Why is that? because we will see it in a second that IP addresses

22:51

as of now they enable rooting okay they are chosen dynamically

22:58

in let's say in groups okay in order to make the routting of packets a little

23:04

bit easier okay so the idea is that the make address

23:12

they let's say they they they only their only purpose is to uniquely identify a

23:18

network interface. How do they uniquely identify a network interface? Because

23:23

following the rules, okay, each manufacturer gets its own pool of

23:27

addresses. What does it mean? It means that I am Apple or I am Lenovo whatever.

23:35

Uh I buy from the authorities my own pool of ME address, my own group of mech

23:42

addresses. Okay? so that every network interface that I produce I'm confident

23:49

that I'm assigned to each and every one um network interface its own distinct

23:56

MAC address. Okay. So in this way

24:02

we could say that following these rules in the world there there aren't two

24:07

network interfaces with the same MAC address. Okay. It's like a unique

24:12

identifier. Okay. Um, in general, MEC addresses are not

24:18

used to identify a network interface around the globe, around the world. Mer

24:23

just are used in physical addressing to uniquely identify the node in my direct

24:28

neighbors. Okay. Okay. IP addresses on the other end,

24:33

they assigned logically. Okay. Dynamically, they can change. And uh how

24:40

they are assigned? Well, basically they are assigned in a way to simplify the

24:45

rooting process. How? We'll see in a second. But they are set, let's say, in

24:51

a smart way. The MAC addresses are not set in a smart way. They're just unique.

24:55

The P address are set in a smarter way. Okay. Um

25:03

we we say also that AP addresses

25:12

belong to a pool of addresses which are called subnet.

25:18

Okay. So when I call when I talk about subnet or prefixes

25:24

or whatever or yes basically subnet is the word that I use more more often. uh

25:30

it's a pool of addresses a group a set of addresses okay and uh IP addresses

25:37

and netting they enable routing okay um

25:45

okay again we will see it in a second so we start

25:50

one second from the layer two and then we move on to the layer three okay so

25:59

let's Let's go back to the layer two. Okay. So on layer two basically we have

26:07

this problem right here. Okay. Um

26:12

so ju just me let me read the slide and then we'll talk about it in a second. So

26:16

ARP is used to discover the link layer MAC address associated to a given

26:22

internet layer IP address. Okay. Um why is that? Why there is this

26:28

problem? uh the applications are required to

26:32

specify the destination IP address to which send or receive data. Okay, they

26:37

don't know nothing about MAC addresses. Okay, let's say that you want your

26:42

application is just a ping. You just want to ping Google. Okay, you want to

26:48

ping Google. So you just specify the P address.

26:54

Okay, it's fine. Just if you want to ping Google, just ping 8.8 Rotate

26:58

rotate. Okay, it's just a ping of something or or you are in a cateral

27:04

laboratory. You would just want to ping a node like we did the previous time.

27:10

You specify just a P address. You don't know nothing about the MAC address.

27:14

Okay. Fortunately, there is this protocol AR which is address resolution

27:21

protocol. Okay. post only job let's say is to make um

27:33

uh let's say an entity aware of the MAC address of the destination MAC address

27:39

okay consider a simple network consider a simple network like this where we have

27:46

L1 L2 L3 okay L1 wants to send a packet okay space we sending a packet

27:53

and he wants to send a packet to this IP address right here 1010.10.3 103. Okay,

28:01

it wants to send a packet to this IP address. Problem

28:05

he knows that is directly connected. Okay, you know that it's here. Okay, but

28:11

it doesn't know anything about the MAC address. So what ARP does ARP basically

28:16

is a just a a few it's a simple protocol. Okay.

28:22

And L1 what it does is just say hey dear neighbors what is the MAC M the MAC

28:28

address of 1010.103. Okay. This message is sent in broadcast. Okay. So it's sent

28:35

on every neighbors. Okay. Every direct neighbors. Okay. If one has some other

28:41

neighbors let's say right here that message will have been sent also let's

28:46

say to to your to the other neighbors. Okay.

28:51

Um to this let's say to this request just one neighbor should reply should

28:59

reply saying look the MAC address of 10.103 is

29:05

this one. Okay. When one receive this reply he can

29:12

finally populate the packet. Okay. This is the packet where here you have TCP or

29:17

UDP whatever. Then you have your IP layer with your IP destination and then

29:23

you should have a MAC address. Okay, once you have a MAC address, you can

29:29

take the packet and send it. Okay, so ARP is basically a request

29:35

reply protocol. Okay, what is the MAC address associated to this IP address?

29:40

And you get the reply back is nothing fancy.

29:50

uh just want to tell you that MAC addresses are collected in a cache let's

29:57

say in a database temporary database which uh let's say are accessible with

30:04

IP flands or IP neighbor stands for something I

30:09

don't remember if you open your VM or something in a

30:15

terminal P

30:22

show these are my neighbors. Okay, I'm alone

30:28

now basically. So I have this is my default gateway I think

30:36

this I don't know. Okay so again these are the neighbors the

30:44

layer two neighbors to which my computer has talked in recent times. Okay,

30:51

if you are on the same network and you try to ping each other and you try to

30:56

run this command, you could probably observe your neighbors grow. Okay,

31:02

because your computer knows more neighbors. So your database, your ARP

31:07

cache will grow accordingly. Okay. um

31:18

one little parenthesis one thing if you are um let's say if you want to um

31:26

get a little bit deep into the code basically a lot a lot of these not a lot

31:32

sorry all of the networking implementation

31:37

basically the the the standard reference is the network implementation of Linux

31:42

okay So what we are talking now there are just protocols okay the

31:47

implementation so the code that implement those protocols

31:54

there are many implementations the most widely used is the Linux kernel

31:58

implementation if you want to let's say go in the code and try to to to to to

32:05

look something you see I don't know the IP packet the mech packet I have

32:12

written use some let's say some some references some some files

32:18

u I mean it's nice to investigate the code just to because I can tell you look

32:24

you know that in this art cache all the entries are regulated by timers you can

32:29

find the source code that you see the the little timer associated with each uh

32:35

each entry so I think it's it's cool if you want to spend a little bit time on

32:41

on it. Okay.

32:51

So, what happens?

32:56

Let's say that um before we we just did example of an AR request reply of some

33:04

sort. Let's say now let's configure things a little bit. Let's say that PC1

33:10

wants to ping. So technical term P request PC1 wants to ping S1. Okay. So

33:20

what happens under the hood? Okay. So PC1 and S1 are not neighbors. Okay. Are

33:29

not neighbors. It means that they should be the package should be rooted

33:35

by one. Okay. So there is an hop in their communication okay in their

33:41

network. So what should happen? Well PC1 the

33:46

first thing that he has to do is to run an AR request reply to L1.

33:53

It's not the ARP is not run uh let's say from PC1 to S1. Okay. The ARP works on

34:02

layer two. It means on my neighbors, my closest neighbors. Okay. So in this case

34:09

PC1 and one they are closest neighbors they speak ARP. In this way PC1 knows

34:18

about the MAC address of R1 and it's ready to send a packet and you

34:24

send the ICMP request. Again this is the ping. Uh this R1 is not the final

34:30

destination of the ping. It will be in S1 but the packet should be first sent

34:34

to R1 and then forwarded on its part. What happens when R1 receives the

34:40

packet? It has to send it to S1 but it doesn't know anything about where is S1

34:47

doesn't know anything about the MAC address. So N1 again at this point in

34:52

time runs ARP request and AR reply again because ARP is run just between

35:02

closest neighbors. Okay. So AR request AR reply R1 finally can

35:10

send the packet to S1. S1 can reply okay with the pong ping pong. Okay. Or

35:19

literally usually you can find the the reply of the ping written as pong.

35:25

Um and finally R1 forwards the packet to PC1. Okay.

35:32

Here you don't see again request reply of ARP because you've stored in your

35:36

cache in your local temporary database and so you trust that for a few seconds

35:43

things don't change. So when you do the request, you send

35:48

also your own address. This is why you don't need to do the another request

35:54

when the problem.

35:56

>> Exactly. because basically um

36:01

no I I missed in the slide uh uh let's say the the header of the MAC pocket but

36:08

sorry of the also the the the MAC protocol but basically yes in the ARP

36:14

request you send basically your own MAC and the destination MAC okay and this

36:20

app it's also

36:23

>> uh no yes go So, so the MAC address of S1 doesn't go

36:28

back to PC.

36:30

>> The MAC address of S1 doesn't go back to to PC1.

36:34

>> This is the question.

36:37

>> Yes. Exactly. Exactly.

36:39

>> So, put it another way. If you connect to Facebook, Google or whatever,

36:44

they could know your IP address because I mean it's the your distant your your

36:51

your address that needs for distant addressing. They don't know anything

36:56

about your MAC address. Okay? Because MAC address is shared only across my

37:01

closest neighbors. Okay? Again, because MAC address works on layer two.

37:08

Okay. Sorry, I didn't understand like

37:19

>> uh what is

37:21

>> yes

37:21

>> is a ping

37:23

>> because actually uh what we call commonly known as ping okay just ping it

37:30

is actually ping is just a message a possible message of this protocol ICMP

37:37

uh I don't even remember the acronym I should know it. Internet control message

37:46

protocol. Okay. And uh

37:51

if you see the all these are just a protocol a send a reply protocol and it

37:56

has some uh some possible message. For example, echo

38:03

reply which is the requ the the reply to a ping. There should be echo request.

38:09

This is just the ping dal ping. For example, time to

38:20

>> this ICMP runs actually on the

38:26

>> on the IP layer.

38:28

>> Okay,

38:29

>> this runs directly on MP layer. So if you get the

38:40

stuck here.

38:44

It runs over the yellow. Okay, here it doesn't

38:49

run on TCP or UDP or something. Okay, just runs directly on on layer three.

38:57

>> So the technical name of ping is just ICMP request. Okay.

39:09

Okay. Um, so actually this was just a zoom on um

39:31

on Wshak. I I think I have loaded it on the drive. If you open uh the packet

39:36

with wire sharkark first of all this is the your layer

39:42

stack. Okay, you just have ARP and then let's say this is just layer

39:49

two because it works on top of layer two. Okay, and this is just a zoom on

39:56

what an AR packet is. Basically, if you open on Wireshark the the properties of

40:01

the bucket below, you observe that it's a request.

40:08

Okay. To which you you say

40:13

this is my source MAC address.

40:20

Okay. And I want to know the the let's say the so this is the content of the

40:26

ARP. So this is my IP address. This is my MAC address. This is the destination

40:33

IP address that I'm interested to know the MAC. And this is the MAC of the

40:38

destination which I don't know. So I set it to 000000

40:42

which means just broadcast. Okay. So send it to every neighbor that I know

40:47

of. And then a reply looks something like

40:54

this. So who have sent the IP address? So the

41:00

source IP address, the source MAC, the destination, the target IP address and

41:05

the target MAC. So just to there are some security

41:17

consideration to do. First of all, let's go back to this example. First of

41:25

all, let's say that R1 wants to know the MAC address of of R3. So, it send the

41:31

messaging broadcast. R3 replies. Okay, what happens if two replies? You say, oh

41:36

no, you know that MAC address, it's me. Just send the packets to me. Okay, this

41:42

is so-called spoofing attack. Okay, where you spoof the MAC address, you

41:48

fake that it's uh you fake let's say you take that you

41:53

impersonate another entity with another MAC address

41:58

and uh for example again if you have two replies to the to the AR request it's a

42:04

problem how this can be done well in theory we

42:11

have said the following the rules make addresses are assign signed by the

42:15

manufacturer and are immutable. Okay, in practice

42:21

if you go I mean this is works on a Linux system

42:27

you can try it on a cadral lab. Okay, every network interface inside your

42:33

kadal lab has its own network interface. Okay, as its own sorry me address.

42:39

If you run this command IP link set uh network interface and then your new

42:46

chosen beautiful MAC address you can change your MAC address. Okay. So I can

42:54

do some um for example I am connected via Wi-Fi.

43:00

Okay. If I was streaming the lecture, let's say, and you knew my MAC address,

43:06

you could just spoof my MAC address. So, you can just run this command with my

43:11

MAC address. I don't know, send this connection packets, create some

43:17

stability in the Wi-Fi connection. Okay, something like that.

43:23

Um, so this command just changes the MAC

43:30

address. If you want to observe then the changed MAC address just do IP link show

43:36

something or just AP link it works. Okay. Some Wi-Fi and networks they may

43:43

use MAC based authentication. If you ever let's say uh

43:51

um when you over your computer you are in

43:56

the university connect to the Saba Wi-Fi. Okay,

44:01

>> it ask for a password. Okay, why why is that? And then when you click connect,

44:05

it doesn't ask you for a password anymore.

44:08

It's not like session cookies on HTTP. It's just that Wi-Fi

44:15

this let's say authentication Wi-Fi just remembers your Mac. Okay, so I turn on

44:22

my computer. I connect to Wi-Fi network. My computer sends its Wi-Fi sends its

44:29

MAC address. Okay. When it connecting to the Wi-Fi, okay, and if I said this MAC

44:36

address is new, it has to authenticate. Okay.

44:41

So uh if you are on mobile is a little bit

44:46

complicated but on internet for example you can just uh let's say if you are in

44:52

office with this authentication you just read the MAC address of some

44:57

authenticated computer no

45:02

and put the cable into your computer and tada you you are uh let's say you behave

45:08

like an authenticated computer. Okay. And

45:16

I mean it's not uh Okay.

45:27

So this is ARP. Okay. It has some vulnerabilities.

45:34

I mean the if you are a system administrator it's not that

45:40

there is some security implemented in the protocol. Okay. There is not secure

45:45

AR secure something. There is no the equivalent of HTTPS

45:50

for AR. Okay. All the methods to defend against these

45:56

attacks are apostori. Okay. They happen later. Okay. So you implement something

46:03

in the system that listens for such kinds of attack

46:08

and yes there are some solutions. Okay.

46:15

So maybe something like this you should maybe you already heard about it about

46:21

the the max spoofing. I don't know if you do like um ethical ethical hugging

46:28

or practical practical network defense. Ah yeah. Okay.

46:35

Uh you you will you will see it uh you will see it anyway.

46:41

Uh so this is kind of known. Okay. If you look for Google on ARP I think the

46:47

first result is just ARPs moving. Okay. one less new less no

46:56

vulnerability I don't know let's call it but it's not

47:01

regarding gar is regarding the whole MAC addresses how they are assigned there is

47:08

a problem MAC addresses are you we have said that following the rules MAC

47:13

addresses are unique values unique addresses that identifies

47:18

each network interface of any device in the network. So they're like a unique

47:23

identifier. What's the problem? That if they are

47:29

truly unique, a MAC address could be used to track a device through space.

47:36

Okay. Um

47:41

for example if I know your MAC address okay and I am a rer I listen that your

47:49

MAC address it's here okay then we when you move to another place I know that

47:56

you are no longer here for example because I don't hear you anymore okay

48:01

but maybe another routter on

48:06

I speak your address. So it knows that you are more or less in that in that

48:11

area. Okay.

48:13

>> But you can change your address.

48:15

>> You can change your MAC address. You can one second that I

48:23

um so this is a uh let's say a a Wi-Fi

48:34

based localization on basically how it works. This is works on devices

48:38

basically. Uh I mean if you

48:44

if you are on a phone and maybe your GPS doesn't work, you can give a rough

48:48

estimation of your position based on Wi-Fi. Okay, how it works? This is how

48:54

it works. Well, basically uh you turn off your Wi-Fi of your phone. your

49:00

device, let's say, listens for all of the Wi-Fi

49:05

signals, all of the Wi-Fi uh routters that are, let's say,

49:11

considered to be fixed in mobile. They don't move to space. Okay. So, it

49:17

listens for any Wi-Fi packet. Um,

49:23

there exist databases, even open one. So if you want you can download your own

49:28

databases containing millions of MAC addresses with their relative position.

49:34

Okay. And so when you give to the let's say that when you um listen for

49:42

all of your MAC addresses in the area and you crossorrelate it with the

49:49

positions of the some known mech addresses. So you do this cross

49:54

reference you will get a rough estimation okay

49:59

again if you open some databases you see that they are very very very

50:05

fine grained okay so I don't know one every meter or something like that mean

50:10

there are many many uh indexed me addresses for example even the Wi-Fi

50:16

router of your home okay if you are not on the dance floor but someone on the

50:22

street is able to pick your signal. You contributed to this data set.

50:32

Okay. Um

50:37

so fine. Um

50:43

this is another this just to discuss but this is just a paper that some

50:48

researcher have published and uh what did they do for example now

51:00

it's just a phone okay just turning on localization permission

51:05

and Wi-Fi okay and just leave it here for a second Okay. So what do they do?

51:13

They have decoded and encrypted via SSL man in the middle

51:20

by some let's say using some techniques um the uh diagnostic traffic. You know

51:28

that your phone computer periodically send some diagnostic information

51:34

whatever that is. Okay. So diagnosis for what? some random data. Okay. So

51:41

basically they have decoded and decrypted the traffic. Okay. And they

51:49

have observed what are they let's say what what is inside this data and they

51:55

found out this is an example. This is just one of a lot of examples that they

52:00

found basically for iPhones with GPS localization enables. Okay.

52:07

what it does the the the cute iPhone basically it sends all of the nearby

52:13

devices connected to the same Wi-Fi and send

52:18

to Apple servers the list of these MAC addresses okay

52:25

what it means again is now this is not an iPhone just imagine there is an

52:30

iPhone okay is localization permission and Wi-Fi open it let's say Wi-Fi turned

52:37

on. What happens that now he would have listened to every MAC address that is in

52:45

this room connected to the same Wi-Fi and he will send

52:49

all of the list all of the non MAC addresses to the servers of the

52:55

manufacturer. Okay, it means that now the manufacturer of my phone, if it is

53:01

Apple, Apple, this is Apple, Chinese, Chinese for um manufacturer. Now they

53:08

know not only my location but also your location without your consent

53:15

if you think about it. Okay, because it just listens for your MAC addresses

53:21

and the manufacturer says, "Okay, you are in this location.

53:25

you are able to listen his me address you are pro and probably

53:31

so his is not very far from you so he is more or less on the same geographical

53:37

position of you okay so again this is just by so since I turn no localization

53:44

permission now someone else knows your position

53:49

okay uh so that that's the way it works uh

53:55

Okay, possible counter measures as your colleague says implement randomization.

54:02

Randomization is say you know what I don't I don't want to use my fixed known

54:10

me address by the way sorry parenthesis you

54:14

remember co no the appava no in how did money work well in mooney

54:24

it is something like that something like that based on localization no

54:30

localization via GPS Yes, but localization via

54:35

let's say uh referencing all of the neighbors that are in contact through

54:40

time. Okay, it doesn't use internet uses Bluetooth. Okay, but also Bluetooth has

54:46

its own MAC address. Okay, so unique identifier. So basically if I just go on

54:54

a walk and on he listens for other Bluetooth beacons

55:02

Bluetooth MC addresses and so

55:07

so it is something similar it doesn't work on GPS

55:13

okay possible solution running randomization I don't want to

55:19

use my fixed MAC address I want to randomize it. Fine. First of all, it

55:24

should be a implemented b enabled. Okay. Uh for example, on Windows machines, I

55:32

don't know if it's enabled or it exist or Linux machines is not enabled for

55:38

sure. And uh on phones, yes, on phones, someone something is is enabled. But

55:45

let's say that is enabled fine. The thing is that I can randomize my MAC

55:50

address as much as as I want. Okay. But the thing is that

55:57

if there is another device close to you that listens for the new MAC address,

56:05

goodbye randomization. Okay? Because um you are like you you are surrounded by

56:14

other phones. You can change your MAC address as much as you want. But if you

56:18

have one closest to you, one neighbor that listens for this change,

56:25

you don't have that uh anonymously uh thatization anymore.

56:33

Okay. So these things are just something to to to to

56:39

keep it in mind. So that's why also it's best, at least in my opinion, to keep

56:43

your Wi-Fi turned off if you don't use it.

56:49

Okay, I think we can have a little break for

56:53

now. Ah, question or something now. Later,

56:58

whatever. A little break.

57:36

Let's get the other.

58:00

Okay, guys. I try to speak a little bit louder because

58:05

escarati please please guys the my microphone has

58:14

just died so okay I'll try to speak louder but it's better

59:13

Don't worry. Thank you.

59:59

Okay. Okay. We have rechargeable batteries

1:00:11

technologies. Okay. Okay. So uh let's move on a little bit. So before

1:00:19

we'll talk about layer two ARP MAC addresses. So now let's talk about layer

1:00:25

three IP addresses. Okay. So basically during the course we will talk about

1:00:34

IPv4. Okay. So version four of the protocol.

1:00:39

Basically there is version four and version six. version five is that they

1:00:44

skipped it. Okay. Uh basically when we talk about IP we we we mean IPv4 because

1:00:51

IPv6 basically it is not very new but

1:00:56

basically no one uses it. So I mean it's the concepts are the same. They're just

1:01:02

long addresses but we for the moment we we we use IPv4. The concept are are the

1:01:09

same. Okay. So IP addresses are four byes identifiers.

1:01:17

They're expressed in a dot notation. So the lowest IP address are 0000 0. Okay.

1:01:24

Two 255 255 etc. Okay. So again this is a

1:01:34

four bytes long. Okay. In this notation every number is a bite. A bite could

1:01:41

represent any number from zero to 255. Okay. So

1:01:48

in this way these are the the possible okay example some examples.

1:01:54

Uh how many PV PV4 address addresses do we have if you want to count them

1:02:01

for bytes more or less around four billions.

1:02:09

Four billions, four by see around four billions IP addresses.

1:02:14

Okay, four billions quilt. Okay, consider that in the world we are we are

1:02:21

10 billions. Okay, so the number of PP4 addresses is not that much. Okay, they

1:02:28

are um if you want to buy some subnet, some IP

1:02:35

addresses, you have to pay a lot and you have to

1:02:39

wait a lot. Okay, so a subnet or prefix is a logical

1:02:47

division of IP addresses. Okay, it is a so-called pool of IP addresses. Uh these

1:02:55

are just examples. We will see it in a second why. But basically, for example,

1:03:00

subnet 192.168.1.0/24. It contains all addresses from 1921

1:03:09

168.1.0 to 192 168.1 to25.

1:03:16

Okay. There could be any uh some other subnets. Okay. slash

1:03:22

16 slash31. Okay, so every subnet indicates a pool

1:03:29

of addresses. It means that there are some addresses that are inside the pool.

1:03:35

Okay. The number after the slash/24

1:03:40

16 or 31 is the net mask, the number of bits in the subnet.

1:03:49

uh and we will see it um in a second. Um

1:03:56

basically all the internet the majority of the

1:04:02

internet runs on PV4 and all the addresses are subdivided into these

1:04:08

subnets into these pools. Okay. So for example you are at home you use Vodafon.

1:04:15

Okay. Vodafon has its own pool of IP addresses,

1:04:21

has its own subnets. Vodafon is one big uh internet service provider. So it's

1:04:27

likely that it doesn't have one subnet, it has many subnets. Okay. Uh Sapiensa

1:04:35

Sapiensa has its own has its own uh addresses.

1:04:41

If you are interested, if you go online, there are many tools.

1:04:45

For example, there is this BGP tools.

1:04:51

I just write this because

1:04:58

sorry this is the home page say ah you are connect this is my IP address you

1:05:04

are connecting from this this is your subnet right here

1:05:11

basically now I don't want to go into the details but there is this consortio

1:05:19

okay which is a consort consorts that provides among the things all the

1:05:24

connectivity to uh universities. So if you swipe down,

1:05:33

there are all IP addresses managed by Roma.

1:05:51

No. Oh, this. Okay.

1:06:01

Imagine that. You see this network

1:06:06

we we have not yet talked about, but it is a SL16.

1:06:11

It means that it could contain around 65,000

1:06:17

IP addresses. Okay. Now in the world, I mean it's very

1:06:24

difficult to have such a big sub network. You have to pay a lot. But the

1:06:29

university since they arrived to the internet

1:06:32

earlier than any other let's say company institution or whatever

1:06:39

they let's say they they have such big subnets since back in the days that's

1:06:46

all that's how that's how it works. Okay.

1:06:56

So we have said that

1:07:02

we have said that there are subnets subnets are pool of IP addresses the

1:07:07

basic question is I give you a subnet which IP addresses belong to a specific

1:07:14

subnet for example you read u 19268.1.0/24

1:07:22

0/24 tell me what are the P addresses of that

1:07:26

subnet. Um

1:07:31

the rule is that an IP belongs to a subnet if the first

1:07:38

number of bits equal to the number of the net mask match the subnet.

1:07:46

Okay. There are some simple rules to follow.

1:07:51

This is just an example. Consider that consider this subnet right here

1:07:57

10.860.0/19. Okay.

1:08:04

And I'm asking you which addresses does this subnet contain?

1:08:12

Okay. So uh remember that the IP addresses these are decimal notation but

1:08:18

we are working with computers. So all of the IP addresses eventually they're

1:08:23

transformed into bytes and into bits. Okay. So the first thing to do is that

1:08:29

your address in decimal notation you have to write it into binary notation.

1:08:36

Okay. Uh sorry here you write your IP addresses in binary. Okay. So 10 becames

1:08:46

0 0 1 0 1 0. Okay, 8 is this thing. 16 is this thing and zero is this thing.

1:08:55

It's just a binary conversion. Okay, from decimal to binary.

1:09:01

Second thing you get, you have your net mask. For example, here is 19. And so

1:09:06

you set the first 19 bits to one, the remaining to zero. So every net mask

1:09:14

divides those we have four byes. So we have 3 32 bits into two parts. Okay, the

1:09:21

parts with the ones which is called network ID

1:09:26

and then the zeros which is the host ID. The rule is that

1:09:32

in the in the subnet the network ID is fixed. The host ID can

1:09:38

change is variable. Okay. So again this is fixed the network ID.

1:09:45

This is variable. So the subnet contains all the possible

1:09:50

combinations of these bits fixed and this bits changed. Okay.

1:09:57

And how to find all the possible combination? Well, these are contiguous

1:10:02

IP addresses. Subnets are all contiguous IP address. So there is a minimum, there

1:10:07

is a maximum. Okay. The lowest IP address is the address that you obtain

1:10:13

by setting the host ID all to zero. And in this case is

1:10:19

this one in binary. The highest IP is the one that you obtain by setting the

1:10:24

host ID all to once. Okay, you write it here.

1:10:30

Of course, now we have still binary. So you have to convert it back to decimal.

1:10:36

And if you do the the conversion in this subnet, the lowest IP address is

1:10:44

10.860 uh.0

1:10:48

and the highest IP address 10.8

1:10:53

191.255. Okay.

1:10:59

Uh the thing is that when you have simple net masks, what I mean simples, a

1:11:06

simple set net mask are just net mask that exactly split the bite. For

1:11:14

example, slash 24 or slash16 or slash8. It means that the fixed network ID and

1:11:22

the variable ID are into separate byes. Okay. So if it this if this was a /24

1:11:32

then the lowest address was uh where 10.8.160.0

1:11:37

and the highest is 10.8.160.255. So the first part wouldn't have changed.

1:11:45

But now since we have a net mask that splits

1:11:51

the bite the highest address you see this there is this 191 okay this

1:11:58

number which wasn't present in the sub 94

1:12:05

okay Is there like a bound

1:12:14

>> a bound of in size?

1:12:21

>> No. So you have your separate.

1:12:24

>> So why does

1:12:32

no I I didn't understand the question. Sorry. This was the slide.

1:12:42

I do understand the question.

1:12:45

>> There's no bound on the pool. We can have

1:12:50

why one company like

1:12:55

multiple

1:12:56

>> as multiple subsets. Yes.

1:12:58

>> Uh the thing is that is easier.

1:13:05

I mean this happened during the time. So it's not like that vodafon just to make

1:13:09

an example vodafon arrived and say to speak say I want half a billion IP

1:13:16

addresses I want my subnet slate which is speak like this is not like that that

1:13:22

it happens over time. So he started by getting a subnet then another subnet

1:13:28

then a bigger subnet then he sold out some other subnets. So there is if you

1:13:35

have multiple subnets, multiple smaller subnets, you can trade them, you can

1:13:40

sell them, buy them. So at the end, if you use the tool that I show that I show

1:13:46

you before and again as an example, search for Vodavorn.

1:13:59

Let's go to Italy. This is just vodafon in Italy. These are

1:14:09

how many sness they have. Okay.

1:14:21

>> Okay.

1:14:26

>> H

1:14:27

>> divide by country. Do they know?

1:14:29

>> Uh yes this is uh this is another concept. This is the concept of

1:14:34

autonomous systems NBGP which maybe if we have time we will

1:14:40

cover it at the last during the last lecture of this course but uh basically

1:14:46

for how the internet is organized. These subnets are controlled by

1:14:52

this autonomous system as something and so to which AS is assigned one or more

1:14:58

subnets. Okay. And so the the flag is also is just to indicate which

1:15:04

nationality is registered this adorable system.

1:15:09

Logically no logically it's the same about subness. They don't care about the

1:15:14

the okay.

1:15:24

So okay we have found the IP addresses belong to a subnet. If I just ask you to

1:15:31

count how many IP addresses belong to a subnet. Okay consider the the the

1:15:37

previous example 10.860 with 19 of net mask.

1:15:44

Uh the thing is that how many IP addresses

1:15:48

do I have? This is the previous example. Well,

1:15:54

basically how many combination of host ID? Okay, I can have well I have how

1:16:01

many how how long is this? 1 2 3 4 5 uh 13.

1:16:09

Okay, basically it's 32 minus

1:16:14

>> minus 13. Okay, so the idea is that I have two to the 13 possible IP address.

1:16:23

Okay, all the possible combination. However, we don't assign two addresses.

1:16:30

Okay, the lowest address we don't assign it. Okay, why? Because it indicates the

1:16:37

subnet itself. We prefer to not use No, we prefer by rule you cannot use it.

1:16:43

Okay, otherwise you go into some context and you don't assign also the highest IP

1:16:50

address. In that case it was the this one the

1:16:54

255. You don't assign it. Why? Because by convention it is the broadcast

1:16:59

address. So the P address that means broadcast that means that it is received

1:17:06

by every other node. Okay. So the real total number of assignable addresses is

1:17:14

in this case 2 to the 13 minus 2. So minus this these two ones that I cannot

1:17:21

assign. That's the that's the answer. However, again there is a convention

1:17:29

that if you imagine a SL31 subnet a SL31 subnet, how many IP addresses do we

1:17:36

have? Imagine this. Imagine a SL32 subnet.

1:17:41

>> IP address.

1:17:43

>> Huh? Sure. But zero because

1:17:49

>> exactly. So it arrives up here. So you have just one degree of freedom, one bit

1:17:54

one bit of freedom. So you have the lowest and the highest. But there is a

1:17:57

conversion that says that SL31 subnets and only SL31 subnets

1:18:04

uh both the zero one. Let's see. So sorry. So um

1:18:10

both the lowest and the highest they are assignable. Okay, all is left one and

1:18:15

these are pointtooint sapets. Imagine that you are a router. You are connected

1:18:20

to another router but via link just use this

1:18:25

smooth sub. Okay.

1:18:32

So another question

1:18:38

to which subnet does an IP belong? So if I give you an IP address and a net mask,

1:18:47

how to find it subnet? H keep in mind that all of these subnet it's important

1:18:52

the routing. Okay, we will see it in a second. This these operations are done

1:18:59

every microscond from your by your computer by your phone while sending

1:19:03

internet packets. So given IP address and the net mask how

1:19:08

to find it subnet what do you have to do? You have to you

1:19:13

have to uh you can obtain the subnet by doing the end bit by bit of the address

1:19:20

and the net mask. It is like the

1:19:26

inverse procedure of before more or less.

1:19:30

Example, I have this IP address and I know that this subnet is 19 / 19.

1:19:38

What is this subnet, the real subnet? Do the same procedure as before. You have

1:19:45

your IP address, translate into binary, translate the net mask into binary.

1:19:51

Okay? And then you do the bitwise end. What does it mean to do the bitwise end?

1:19:57

It means that for every bit you just see that if both of them are

1:20:04

once right one in the result if at least one

1:20:10

is zero right zero. Okay. So for example first and first bit first bit is zero.

1:20:17

First bit here is one result is zero. And you keep doing this for each and

1:20:23

every bit up until you uh hit the point where the

1:20:30

net mask is ended. So it will be all zeros then the result will be all zeros.

1:20:36

Okay. So the result you re you write the

1:20:41

result here you converting to decimal again

1:20:46

and if you convert to decimal you have 10.860 8.160.0

1:20:53

slash the net mask that you had /9. Okay. So again, if I give you this

1:20:59

address right here, this 16252 and I know that the uh the the net mask

1:21:08

is 19. You can find the net mask the the the subnet

1:21:13

in this way. Why I'm telling you this? Why it's

1:21:19

important? Why care about subness?

1:21:24

They are fundamentally tied to rooting. Okay. Rooting is the

1:21:31

process of forwarding a packet towards his final destination. Okay. So again

1:21:38

this is a address wants to pin Google. It sends a message to its closest

1:21:45

neighbors and the closest neighbors should know how to root the bug.

1:21:51

Okay. Um

1:21:57

so every node in the network, every router what it does receives a packet,

1:22:06

reads the final destination IP address. Okay.

1:22:11

um it look up the let's say the address into the rooting

1:22:19

table and decides where to route it. Okay,

1:22:23

which is the next stop to advance the routing. For example, this router in

1:22:28

this case it reads the bucket is a destination

1:22:33

8.8. Okay. Then I look up my routing table. I

1:22:38

know that the let's say the neighbor should forward the packet to in order to

1:22:45

reach it is this one. Okay.

1:22:53

Uh this is if you wanted to expect your

1:22:59

routing table if you are on uh This is the routing table. Okay,

1:23:19

an example of rooting table. There is the whole gateway. There are some

1:23:22

subnets here in this slide. I just reported an

1:23:26

example of the rooting table just in tabular

1:23:31

form. Okay, just to make things a little bit more more clear. So the IP root

1:23:36

command the root table should look something like this. Okay,

1:23:42

where you have a destination subnet and where you have an interface.

1:23:49

Okay, or you could have so for example default gateway, you could have a next

1:23:55

op. Okay.

1:24:00

Uh the important thing to notice is that the rooting table each entry in the

1:24:06

rooting table does not indicate a specific precise IP address but it

1:24:15

contains subnets pools of IP addresses. Just picture this in your mind. Imagine

1:24:21

that you are a router in some data center. Okay. and you have

1:24:26

to route a packet uh towards it final destination.

1:24:32

If there weren't sublets, okay, if there weren't subets that you would you would

1:24:37

have forced to know the destination for each and every IP address. Okay, we know

1:24:43

that there are four billion possible IP addresses. So they are too much too much

1:24:49

to know. So instead of every single IP address, I just write it subnet. Okay,

1:24:55

it's pool it's corresponding pool. So instead of writing that 10.2 that

1:25:02

128.0 and that.12

1:25:06

dot three instead of writing all explicitly the the IP address I just use

1:25:13

the subnet. Okay. So that's the way how subnets

1:25:18

enable routting because it's easier. It reduces the problem.

1:25:27

Okay, how to add a rooting

1:25:34

entry to your routing table. It is something that we have we were trying to

1:25:39

do before in the the previous lecture but is something like this.

1:25:46

uh for example you want to tell to your router that you can reach a specific

1:25:52

subnet using a neighbor and you just write IP rout destination subnet

1:26:00

via the IP address of your neighbor. Okay, you remember this we have seen it

1:26:06

in the previous lecture. Um

1:26:12

this a detail when you do something like this. Okay. Or you could do also a rout

1:26:22

next. Okay. when we launch this command

1:26:29

um we let's say we we specify a a neighbor

1:26:36

to send the packet to to forward the packet to okay we do not specify an

1:26:43

interface we just specify the IP address of our neighbor that for example we want

1:26:48

to specify the default gateway we just specify the IP address of the default

1:26:52

gateway that we are interested to send the packet

1:26:55

Um the thing is that when we write this

1:27:00

comma right here, next hope AP, so the P of the gateway whatever

1:27:07

is looked up itself inside the um

1:27:15

the the the the table. Okay. If I don't know how to reach next to PP

1:27:23

then if I run the command gives me an error say I don't know how to reach the

1:27:28

you have written something wrong. Okay. Um

1:27:40

okay so basically I can specify two ways of adding let's

1:27:45

say there are two possible ways to add a rooting directive first again add target

1:27:54

network via nexttop AP second this one you notice that here there isn't via

1:28:01

nexttop it just written

1:28:05

target network dev network interface. This is a fundamental difference. Okay,

1:28:12

why? Because here the subnet is remote. Okay, it's

1:28:18

remote means it's not directly attached to me. It means that I have to go

1:28:23

through the next top IP to reach the subnet.

1:28:27

In this case, no, in this case, I'm telling the router, look, you want to

1:28:31

reach this subnet, you don't get don't have to go through

1:28:36

any other router. Okay? Because you are directly attached to this network via at

1:28:42

zero at one via network interface. Okay. Um

1:29:04

okay so forwarding decision again we are a router we receive a packet we have to

1:29:11

route it somewhere okay how to forward a pocket based on the routing table okay

1:29:18

so a pocket just arrives So consider this is just an example a

1:29:25

network example. Okay. You have um let's say a node sending a

1:29:33

packet. You're a router in the middle. What you can observe is just that the

1:29:38

bucket has an IP source and a P destination. Okay. You don't know

1:29:44

anything about the net mask of the uh source IP of the destination IP. You

1:29:52

don't don't know anything in the packet. It's solely written the IP address

1:29:58

without any net mask. Okay. So you are a router. You receive this packet with an

1:30:04

IP address, a destination IP address. What do you do? Okay.

1:30:11

Uh first of all for me the P address

1:30:16

destination let's call it a okay just for keep things short

1:30:22

and what do we do for each subnet let's call it for each subnet in the

1:30:29

routing table I check whether a belongs to the subnet okay how can we do it we

1:30:39

have seen it in the previous slide it does basically no not basically this

1:30:44

100% the same operations that we have done before. So you have an address you

1:30:51

have subnets in your routing table and for each subnet you check ah this

1:30:57

address belong to the subnet yes no this address belong to the subnet yes no okay

1:31:04

how many subnets do you want to have in your routing table then 10 100 1,000

1:31:11

10,000 the full internet ring table is

1:31:17

in in a million let's say let's say a million entries of your routing table

1:31:22

imagine just writing IP rules showing your terminal and 1 million lines of

1:31:27

code just appear okay so and you do this check for each subnet

1:31:37

in in the login table it's not like that when you find a match then you stop okay

1:31:42

it's not like code okay it's that you have to do this

1:31:47

operation for every subnet in the in the room table. Okay,

1:31:54

then you have three options. First, only one subnet matches. Okay, fine. You

1:32:01

have your champion. You know that that pack that that IP address belongs to

1:32:06

just one subnet that you are aware of. So, the packet is forwarded there

1:32:13

following that routing decision. Uh

1:32:19

let's go here. No subnet match. So you don't have any match in your in your uh

1:32:27

routing table. There is a default entry. So the default

1:32:32

gateway if yes forward it using the default

1:32:35

gateway. Okay. So the default gateway when we write IP root as default

1:32:43

that has the lowest priority. Okay. If there is a a route that matches it, the

1:32:51

default gateway has not priority. Okay. Uh if I don't have any mesh and I don't

1:32:59

have a default gateway, well network reachable. Okay. It means that if I have

1:33:06

a router, I receive a packet and I don't know how to what to do, how to forward

1:33:12

it. What I do is that I send an ICMP I don't

1:33:16

remember who was asking before about ICMP you it sends an ICMP network

1:33:21

reachable error to the source okay so there is a package error I could

1:33:28

not I did not I wasn't able to what happens

1:33:33

interesting case what happens if more than one subnet matches this is the

1:33:38

so-called longest traffic smatch Okay,

1:33:44

so there are many more than one subnet that matches your IP address. What do I

1:33:50

choose? Okay, what do we do when one more than one meshing occurs in the

1:33:55

routing table? Uh what I do is that I forward the packet

1:34:04

to the matching subnet with the highest net mask with the longest net mask.

1:34:12

Okay? For example, consider that

1:34:18

this address right here 192.168.1.100 exactly matches with both

1:34:27

a /24 and a /16. Okay, if you do the calculation, you

1:34:33

find that this address is contained both in this pool and both in this pool.

1:34:39

Okay, these are logical pools. Okay, if you see that you you you will observe

1:34:45

that the SL16 includes the SL24

1:34:50

which includes includes this. Okay, so both of them

1:34:57

matches. However, the address matches um

1:35:06

sorry matches with both but the subnet the most the most

1:35:11

specific subnets. So the the subnet with the highest net

1:35:16

mask is is preferred. So in this case SL24.

1:35:27

Okay. Uh I want to tell you another thing about

1:35:33

the wing table which is was it is a little bit important in case

1:35:39

I have a sub which is directly attached to me or not directly attached to me. Uh

1:35:46

this is the output of IP r show. Okay. Default gateway subnet reachable via

1:35:53

something and then a subnet reachable directly via

1:36:01

the sorry dev at zero. So using network interface at zero.

1:36:07

So hosting subnet 19168 are directly reachable through at zero. Okay.

1:36:14

hosts in 1050 are not directly reachable. Again there is a next stop.

1:36:19

Okay. So again the package should be sent to this

1:36:24

before uh say as a as a first step. Okay.

1:36:31

Why there is this distinction? Why do we care?

1:36:35

basically because depending on the destination of the routing table being

1:36:41

it local or non-local I decide

1:36:47

it changes the ARP request it decides the AR request that I do. So this is

1:36:53

where it connects everything. So all the AR that we have seen before why it

1:36:58

matters why layer 2 matters why why we talk about it in the first part of the

1:37:03

lecture because based on this it changes the AR request that I do

1:37:11

example local destinations this is the the routing table of before

1:37:18

example of a local destination suppose that I have a packet for an cost with an

1:37:25

IP 1921 168.100. Okay, I have this packet this IP

1:37:31

address. What I do again I compare it with the routing table. I see I have one

1:37:37

match. Fantastic. I have one match and it is directly uh reachable via

1:37:45

sorry not via using at zero. What I do this is the bucket that I set. Okay. I

1:37:53

do the ARP request directly on A. I do the AR request directly on A

1:38:01

because it's directly attached to me. So there is this matching between the IP

1:38:06

address of A and the MAC address of A. In other words, the P address and the

1:38:11

MAC address in the packet are the same

1:38:17

is the P address of A or the one of the same node. Okay.

1:38:28

So same node IP, same node MAC. This is not true for non-local destinations.

1:38:37

This is the second slide. The routing table is the same. Now I want to send an

1:38:43

IP a packet to this IP to 10.50. I go to the routing table 10.50.

1:38:50

There is a next stop next and what do I do? What do I have to do

1:38:57

is that um this is reachable through 192 168.132.

1:39:05

Okay. So what do I do? This is the packet that I will send on

1:39:11

the layer two. It is the MAC address of my neighbor. So the ARP request reply

1:39:21

I do it with my neighbor with via this one. Okay, I do it with my neighbor.

1:39:27

Okay. And then the IP address is the one of the final destination.

1:39:33

So in other word that's why do we have two different addresses IP addresses and

1:39:40

MAC addresses because IP addresses it manages distant

1:39:46

let's call it distant distant addressing okay this network right here

1:39:53

you want to address the nodes that are far away to you addressing me addressing

1:40:00

is used to um address your close neighbors. Okay. So

1:40:07

when you send a packet you have to specify two things. First the final

1:40:13

destination of the packet of course to to the the final node that you want to

1:40:18

send the bucket and second the neighbor that is

1:40:24

responsible to forward the bucket and moving on. Okay.

1:40:33

So in this case you have two different nodes. Use the the the IP address of the

1:40:40

destination but use the MAC address of your next stop of your neighbor of your

1:40:46

local let's say of your uh yes neighbor that

1:40:50

is let's say has the duty to forward the packet and moving on.

1:40:55

So in this case the AR request reply I do it with my enables with my via 192

1:41:02

168 whatever. Okay.

1:41:12

I mean this is a a um sometimes things don't work because

1:41:23

maybe in a subnet uh uh I mean you you have to keep an eye on whether it

1:41:31

consider as a subnet directly attached or that subnet is far away because that

1:41:39

changes how AARP is managed. Okay, if it doesn't work ARP, it doesn't work

1:41:46

anything else. Okay, because ARP is the first step to know the MAC address. If

1:41:53

you don't know the MAC address, your packet doesn't leave your system. Okay,

1:41:58

so ARP has to work in order for all the rest to work.

1:42:09

Okay. Rooting example.

1:42:14

Address to root is this one. This is the routing table. So the rooting table

1:42:19

contains these entries. Which one would you choose?

1:42:24

Uh this again longest perfect match. These kind of operation again are done

1:42:30

in every router every microscond in in every router in

1:42:34

the world. Okay, there are billions of such operations do doing them

1:42:40

every second. Okay, basically nowadays

1:42:46

uh back in the days these were the kinds of exercises I mean

1:42:51

back in the days back in the let's say 10 20 years ago this was the kinds of

1:42:57

exercises that you would find up in an exam. Now you just ask it to charge GPT

1:43:03

and I mean it uh it works but the operations are very simple.

1:43:12

For every entry you just write the the the

1:43:19

address in binary with the net mask. So the green part is the host ID. Sorry.

1:43:27

Yes. not the ID, the network ID. And then you see, for example, you see

1:43:34

that this address right here matches with the first, the second, and

1:43:40

the third. It doesn't match with the last two.

1:43:45

It doesn't match with the last two. Okay?

1:43:50

If you do the the calculation, so let me be quick. If you want you can try to to

1:43:56

to to reproduce it at home but basically the idea is that again longest pre match

1:44:04

routter let's say root number two matches and that's the longest prefix

1:44:10

that it match so the longest net mask so we selected

1:44:18

okay so

1:44:23

I want to let's do this kinds of exercise. Okay.

1:44:31

Uh this kind of exercise is not for like uh is a bit different from the one that

1:44:36

we have seen the last time. Last time I just give you a a laboratory with some

1:44:41

AP and you just have to create the laboratory set AP set the rooting. In

1:44:47

this case it's a little bit different. In this case, I've give you the

1:44:54

laboratory already configured with the IP, the topology,

1:45:00

the routing, everything is already u set up.

1:45:06

What I ask you to do is um I mean this lab is important because

1:45:14

uh when there are errors in the network let's say that you communicate to a

1:45:20

non-existent IP or you don't have the corresponding

1:45:27

IP in in the routing table. Okay. So there are some errors. There are

1:45:32

different behaviors of the network. So when you're debugging the error, you see

1:45:40

different behaviors. Okay. So the idea of this lab is something like that. of

1:45:46

this lab is to try to create such errors and to observe

1:45:53

the behavior of the network via capturing the traffic and listen the

1:45:59

traffic and listen the errors that are generated by the network. Okay. So in

1:46:07

this way if you have your network uh and there are some problems you can

1:46:14

understand the art works here but it doesn't work in that in the other

1:46:20

section. So I mean just to observe the different behaviors of the network in

1:46:25

case of an error. So

1:46:29

the lab is already configured. I have uploaded into drive

1:46:39

as to drive. See this is the share drive. You just

1:46:45

download the lab,

1:46:50

open it on kad. Okay. And try to try to run it.

1:47:00

Okay. The first thing that I'm asking to you is

1:47:05

what happens under the hood when if I try to ping a local destination which is

1:47:12

not existent. For example, what happens if I

1:47:20

from PC1 here I try to ping 192160.17. What error do you observe? Okay. what

1:47:30

messages are exchanged into the network. Okay, let's try to to do it and then go

1:47:38

on from point to point. I will go into the into the desks.

1:47:44

Okay. Uh if you want to capture traffic, okay, I

1:47:50

don't remember if we have said this the last time, but basically there is this

1:47:54

command this TCP dump. to write TCP dump inside the gad

1:48:01

uh specify the network interface is optional and then specify a file

1:48:09

for example let me do it because I don't remember if we have seen

1:48:41

Let's say that on one I'm pinging something.

1:48:47

I'm pinging myself. Ping 10.10.10.1.

1:48:54

Okay. So, it's generated some traffic. I want to capture the traffic that is

1:49:01

being exchanged. Okay. How can I do it? I need another terminal on one. To open

1:49:09

another terminal, it was written in the slides. If you need another terminal as

1:49:15

we seen the second the the last lecture, you just go into your main terminal and

1:49:20

write ka connect and the name of the node L1.

1:49:27

And here you can write your um

1:49:37

traffic capture command which is just TCP dump

1:49:43

e is the network interface. So in which network interface you want to listen on.

1:49:48

In my case I think it is at zero. See

1:49:53

at zero. and then where to save the capture. Okay, remember the pickup file

1:50:00

with wire sharkark to open this is the file that will be opened with wire

1:50:04

sharkark. So I'm launching it.

1:50:17

It doesn't happen anything. Okay, but it's running because it's writing the

1:50:22

capture inside the file. Okay, if I interrupt it with Ctrl C,

1:50:30

zero bucket captures. I know maybe there are some bug captures.

1:50:54

I know it's stopping myself. Wait, wrong IP address.

1:51:05

Sorry, I was I was creating the traffic on on a wrong IP.

1:51:16

If I interrupt the capture. Okay, now 12 packets were captured. Okay, I want to

1:51:23

open it with Wireshark. Okay, the thing is that this file lives

1:51:30

inside the Kadal lab. How to put it inside my

1:51:37

computer? Okay, well Kad offers you a shared folder. If you do list of

1:51:45

available folders and files, there is this shared folder. Okay. And this

1:51:55

folder is shared across

1:52:02

your uh laboratory home. There is this shared folder. Okay. So this folder acts

1:52:09

as a bridge between the kadar lab and your host machine. So in Linux if I want

1:52:16

to move a file the command is just move capture inside the shared folder

1:52:25

press enter. If I go to my computer shared

1:52:31

I have captured the file that I've captured right now.

1:52:38

And this is the traffic that I was generating. So I was pinging something.

1:52:46

You see the arrows. So the ping request and ping require ping reply.

1:53:01

Okay. So try try to do something like that. Try

1:53:08

to capture the traffic, save it in a file, open it with wire

1:53:13

sharkark. Okay, try to do it right now.

1:53:21

So step by step the these tools were these are the first set

1:53:27

of slides. So of the previous Friday. Yes, this is the common DCP dump. So

1:53:42

try to So again download the lab.

1:53:48

Download the lab which was which is shared into the drive and try to set up

1:53:55

some packet capture. Okay. Try to set up capture and try to for

1:54:02

example to ping an unreachable local destination

1:54:05

>> and see what happens. So see the packets that are being captured. See

1:54:13

what error is generating. What is happening?

1:54:25

If you do the first part, the first if you capture the traffic as of the the

1:54:30

first point you should observe something like this.

1:54:44

You should have you should observe an infinite list of AR request.

1:54:50

Okay, ignore this. This is just

1:54:56

the average bugget. For example, I'm trying to ping 192168.1.7.

1:55:00

So a local destination which is not unreachable. What happens? It means that

1:55:07

since it's local then in the routting table of PC1

1:55:13

he knows that 1916.1.7 is does belong to a local serent. So it

1:55:21

tries to connect it and try to do an ARP with that 7, but the ARP never succeeds

1:55:29

because 7 doesn't exist. But the behavior of the network is that PC1

1:55:36

tries forever to do an AR request to to find the the point 7. Okay, this is the

1:55:44

the the behavior of 0.1. Did you hear the shots?

![Genera immagine capitoli](https://ssl.gstatic.com/docs/common/viewer/video/chapter_failure.svg)

[](https://support.google.com/a/users?p=gw_gemini_responses)

Visualizzazione di recording_lesson_2.mov.