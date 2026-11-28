0:00

registr. Okay, so the recording has started. So

0:11

as always, if you don't see me recording, just remember it and I will

0:15

upload it at the end of the lecture. So

0:23

network infrastructures today we start the I don't know how do you want to call

0:29

it the laboratory sessions practical session kar sessions so in this

0:34

practical part of the course we will do practical things okay um so what do we

0:43

do basically will be network configuration

0:48

and we will talk about network security. We will talk about the VPN. We'll talk

0:54

about security the most common security framework and we will actually implement

0:58

it. Okay. So um uh just a question just to have my to

1:05

have my statistics. How many of you are from cyber security

1:10

because it's mandatory for cyber? Who is not from cyber security?

1:15

Okay. Uh perfect. computer science, robotics or data science.

1:24

Okay, perfect. You know, because this course

1:28

is optional to to to me. Okay. Um so, uh cyber security in the let's say

1:37

this is your first year of master. Okay. in the background. Do you have done some

1:42

um networking internet? You know that the

1:47

informatica is fundamentally internet or telecom if you are old like

1:54

me you in cyber security there is an equivalent because as of now I'm not

1:59

updated every time. So there is a course about internet or something

2:06

they say yes but see okay some of you not bad

2:13

okay um so this is the first time we met this is

2:19

my name my email I mean we have we are on moodle

2:25

we are on the Google group so I mean if you want communication questions or

2:29

something just send me an email or prefer email if you want to come to the

2:35

lab to come visit us because you have a question or you have an interest you

2:40

have an idea or something just write an email our office are in Sedol I don't

2:46

know if you ever had lectures there is the places near polio let's say and uh

2:54

yes so the goal of the course again is to

3:02

I'm reading the slide give the necessary knowledge to configure and manage uh

3:07

local network and w network in Linux like covered system okay so that is that

3:12

in the bachelor you have seen how internet networking protocols VPS

3:18

whatever they work let's say on a theoretical side okay so what it is more

3:23

or less what it does our goal today is actually to implement it okay is to have

3:30

a network not a real one unfortunately because I mean we don't have let's say

3:35

thousands of routers let's say an emulated network and on top of the

3:39

network try to deploy some I don't know networking configuration some VPNs and

3:46

um and um whatever okay so we wanted to let's say keep this

3:58

laboratory as realistic as possible. Okay? Because what we will give you,

4:04

what we will see is I know some common problems. Okay? Some rooting problems,

4:10

security problems. Okay? Uh let's say that assignments that resemble

4:16

situations that more or less are common in a real life of a system

4:20

administrator. Okay? And in my opinion are important because I mean know how

4:25

internet works. I mean it's like the brick of the 21st century okay

4:33

everything is based on the internet okay so you have to know how internet works

4:37

you have to have as of engineers our cyber security engineers some manuality

4:44

okay some practicalities okay

4:50

uh we will use a framework throughout the lab which is called kadara do you

4:54

have already done some exams with kadada What have you done that you were saying?

5:00

Yes.

5:04

>> Okay. Yeah. Because now they do they do also. So what is Kalera? Kalera is

5:11

developed by uh Roma but it works well anyway and and um

5:20

they are I mean they are close friends the the the guys who develop Kad. It

5:26

started out let's say writing this tool that they use during the lectures and

5:31

then it became widely spread across let's say academics by doing lecture but

5:36

also in also in the industry they trying to to to to

5:42

push it okay so what it does kada we will see it but basically what it does

5:48

it will emulate a network under Linux okay so Um again we will see it in a

5:57

second but basically what KA does is it says okay let's say that you want a

6:01

network with I know a PC a router and then another router connected to another

6:08

PC. So you have a network a topology a graph call it however you like. Okay

6:14

with Kata you can implement you can emulate that network and every single

6:20

node is run by a Linux container. Okay. If I talk about Linux,

6:27

we are I mean you have done exams with Linux previously or is your

6:32

>> see no see. No.

6:41

Okay. I should have a slide about why Linux. No, I don't have a side Linux.

6:48

I'll tell it by by work. So, Linux back in the days was something just nerds or

6:54

hackers or something they they they use. Okay. Now, everything is Linux except

7:00

basically for consumer products like your PC, your phone, everything else is

7:06

Linux. Okay. Every computer that runs in the cloud,

7:10

if they are saying mentally, they will use Linux. Uh I had a graph but they

7:15

have to remove it about the share in percentage about Linux usage in servers.

7:21

It's all Linux. Okay. Why Linux? Uh because that's the way uh because it's

7:27

free, because it's open source, easy to maintain when compared to a I don't know

7:34

a a Windows or whatever this is. Okay. Um

7:42

so Linux again is important. We will use Linux because it's more realistic. Okay.

7:48

Because it's more realistic. Uh every server

7:52

every server I mean if it's done correctly is yeah is use use links.

7:57

Okay. We will use a confuse some of the widely

8:02

adopted networking tools such as open SSH openVPN firewalls with B tables.

8:08

Okay. Uh but we will get to it in a second.

8:15

Okay. Um this is the program more or less of the

8:25

of the lectures. But I mean we will have to see if given the sher given uh

8:33

I mean of the practicalities. Let's see if we manage to do everything.

8:38

So again um the labs will go about this

8:43

way. I mean they are meant to be as practical as possible but before doing

8:49

practical things I have to speak to to talk about something. Okay. So I have

8:53

the slides I will speak and then I mean we will try to do uh something together.

8:59

Okay. Again the lectures are all recorded. we

9:03

uploaded this to the to the drive. But um the thing is that

9:10

here at least for the practical lessons I mean you will see it when I will give

9:15

you some practical assignment to do here in class. I mean there will be

9:21

cooperation there will be talking. So it's better to be here. Okay. In my

9:26

opinion at least for the labs. Okay. Uh remember bring your computer in every

9:33

lecture. Okay. So there was one of you I don't remember the name sorry which was

9:37

asking about if this was the room because there aren't any power outlets

9:42

or very few power outlets. Okay. Uh yes true. Uh the I mean this course has more

9:49

or less always been held here. uh

9:55

if I mean consider that the practical part will be later will be I don't know

10:00

1 hour 30 minutes so if you want to keep your PC off during the time and just

10:06

open it later when it's uh when it's time or the guys last year they also

10:11

brought some um shabata

10:17

some power outlet yes power outlet Okay.

10:29

>> Okay. Kad I have you should have received the installation guide of Kad.

10:34

Okay. I I I asked to to to do it I mean for you to do it before the lecture

10:39

because it takes a little bit of time. If you don't want to install Kadara I

10:43

have said we have created some virtual machines. Okay. Now I'm running on one

10:47

of that virtual machines. Okay. with Kalera already installed. So you don't

10:51

have to install anything. Now this year there is also a virtual

10:56

machine for for Macs for newer Macs if you are interested. It works pretty well

11:03

actually. Okay. So let's let's start to talk about Kad. Kad is a network

11:10

emulation tool. Okay. With the kad each network node is implemented by a Docker

11:16

container. Do you know about Docker? Have you ever seen about Dogger or heard

11:21

about Dogger?

11:23

>> Uh for the one of you who has never heard have never heard about Docker is

11:28

basically a um

11:33

no I don't have the definition in a word but let's say that

11:38

it's like a sort of a small virtual machine. Okay. So just remember that a

11:44

node in the kad environment is completely isolated and it is emulated

11:51

as if it is a a real independent Linux machine. Okay. So again in kada you have

11:58

your network with nodes and connections. Every node is a small little independent

12:06

Linux machine. Okay. Um

12:13

so the connections between this emulated network is emulated using a virtual

12:18

network. Each device can be configured to have any number of internet network

12:25

interfaces. Okay. And but we will see it in a second. So each node again is an

12:32

independent can be seen as an independent Linux machine. Okay. Which

12:36

you can configure it from scratch. Okay. uh so kad again is not just for

12:43

academics for uh let's say emulation and teaching uh

12:50

but I mean there are I mean a lot of things can be done with this emulated

12:56

network for example Stephano the guys that should the guys

13:00

that should be here but he's late and uh he's working he's a PhD students of us

13:06

he's working with NAMX which is an internet exchange point. Professor Cuomo

13:12

will talk about NAMX if she didn't already talk about NAMX. At the end of

13:16

the year, they will come also here. They will do a seminar. They will do a

13:21

hopefully a tour of their data center here in Rome in San Lorenzo.

13:26

If you never been in a data center, good. I mean, it's a nice opportunity

13:31

because it's nice. Stefan is working with Namx and they're

13:35

using Katara to let's say create a an emulation of their network to do the

13:41

testing area

13:44

dynamics. So this is Stephano the PhD was talking about and is uh let's say

13:50

today is here to to give um to give a hand.

13:55

Okay. So just to give you um

14:04

just to give you a sense of it. Okay. So uh I'm using again Kadara in a

14:12

virtual machine. Okay. Uh the same virtual machine that I give to you. If

14:18

you have installed on your PC, your Mac or whatever, even better. Okay. To use

14:24

it, just open a new terminal. Okay. If you see type,

14:32

if you type kada, it shows something. Okay, so at least

14:37

it's installed. Okay, it works. Um,

14:43

let's see. Oops.

14:54

The password of the VM if I ever asked is user. I mean the user is user and the

14:59

password is user. Okay. I have sorry

15:10

obser Okay. Let's start from

15:21

from this. Okay. So, let's proceed by examples.

15:30

Okay. Because it's for sure it's easier. Okay. Let's say that you want to you

15:35

have this small network. Actually, this is not a network. This is just two

15:40

computer connected by a cable. Okay. I don't know if you ever tried at home or

15:44

with a friend that you have a computer and your friend has another computer.

15:48

You say, "Ah, what happens if we plug an internet cable to uh to to my computer

15:54

and the other end to your computer?" And it happens nothing. Okay? And we will

15:59

see why actually let's try to emulate that thing. Okay? So let's try to have

16:06

two nodes. Okay? Now there is the image of a PC.

16:11

Okay. I just call it PC1 and PC2. In Canada, there is no distinction between

16:17

a PC or whatever. They're all the same. Okay? I mean, I have put the image here

16:24

just I mean for clarity to give a sense of I mean let's say to be more

16:30

realistic. Okay. But I mean imagine just two computer connected by a link an

16:35

internet cable. Okay. And um

16:40

let's try to just for the moment just let's ignore those IP addresses. Okay.

16:45

So let's just create the physical network. Okay. So PC1 connected to PC2.

16:51

Let's say that you want to emulate this network.

16:55

Well in Ka now it is already full. Let's let me

17:04

start let me start from scratch. So a katara f a katara lab starts from

17:11

an empty folder. Okay. So you have to create your folder of your katal lab.

17:15

Now I created this folder. I don't know to

17:23

empty. Okay. So you have created the folder.

17:28

Open it. Okay. And now the only thing basically

17:34

the katar needs is the description of your network. Okay, the description of

17:40

your physical network. What I mean by description of physical network.

17:45

What are the nodes and how they are connected? That's it. Okay. So the the

17:51

graph of the network. Okay. How can we do it? Well, basically it

17:57

needs a file which I don't have.

18:23

I need a text file. Okay. which is called lab.co. Okay, it's not lab.txt or

18:30

lab.com.txt. Okay,

18:34

it's just called lab.co. Okay, so we open it with if you're on Windows

18:40

also with notepad, it's completely fine. If you have Sublime or Visual Studio

18:45

Code, use that. Okay. But in this file basically

18:52

we write the physical configuration of the network. Okay. So the network was

18:57

the two nodes called PC1 and PC2. Uh

19:05

you know maybe I should upload the slice to drive. Now I will do it.

19:11

Let me write the syntax and then we will see.

19:22

Okay. What's this? Basically, I have finished.

19:30

So, here is all the contents of the lab.com. Here is the network that we

19:35

want to emulate. The syntax of the file is something like that. Name of the

19:40

node. This is arbitrary. Okay. PC1, PC2. just

19:44

be consistent but you can name it as you want. Square brackets okay and then a

19:51

number starting from zero then to one to two etc. This means that the network

19:57

interface number zero on PC1 is connected to

20:04

collision domain A bit.

20:10

Uh the node PC1 okay every node in K has multiple network interfaces. Okay.

20:17

Network interfaces as like how the kernel interfaces to the

20:22

network. Okay. For example, my PC has a network interface. The the wireless

20:28

network interface could have a network h sorry an internet network interface. A

20:34

router has I don't know tens and tens of network

20:38

interfaces. Okay. So it's just like an interface to to to to the wide area of

20:45

the local area network. Okay. They are numbered since they are many

20:51

they are numbered. Okay. In this case, we just have one network interface. In

20:55

this case, a network interface here on PC1 and there on PC2.

21:02

So the first network interface is zero. So the first network interface is

21:06

attached to the collision domain A. So Canada works by collision domains. If

21:12

you remember from internet or

21:18

an internet exam whatever collision domain I mean two nodes on the same

21:22

collision domain can hear the other packets. Okay. So in this case also PC2

21:31

the the interface is on the collision the same collision domain. Okay. This is

21:36

that I just write I A I write B or a word whatever. Okay. Since they are on

21:42

the same collision domain, the packets that are sent on the wire by

21:49

PC1 on this network interface can be heard by PC2.

21:55

Okay, it's like attaching an Ethernet cable to

21:59

the other computer. Okay, and that's everything that Kadaran

22:04

needs. At this point,

22:19

I am in the terminal in the same folder. Okay. If I do kad start.

22:32

Yes, they are a little bit small. Basically, now I will enlarge it a

22:37

little bit. What happens is that you have created

22:42

two node. Fantastic. You have here you your two terminals. Okay, this terminals

22:49

are I don't know if you read it but this is the terminal of PC1 and this is the

22:53

terminal of PC2. So again, Katara is emulating every node in your network as

22:59

a separate Linux machine. Here's PC2. Here, sorry, PC2, PC1, and

23:06

they are completely completely independent. Okay, they have a Linux

23:12

shell, okay? They are like a um a Linux computer, okay, which you can

23:18

configure it from scratch. You can install something. You can do whatever

23:23

you want basically. Okay. Um,

23:31

if you cannot read it because it's too small, there are some settings but are

23:37

not easier to find. I will change it in a second. If you

23:46

want to stop the laboratory, I mean you have your terminals, it's not

23:53

sufficient just to close the terminal. If you just close this window,

23:58

the node is running is still running. Okay, the node is still running. Even if

24:04

the terminal is closed, if you want to say ah by accident I closed the terminal

24:09

of the node. How can I reopen it? If you go to your main terminal, just type kada

24:18

connect and then the name of the node was PC1

24:25

and then your terminal because becomes sorry a terminal of PC1.

24:32

Okay. So in this way you can open many terminals.

24:36

Again, if it is your first or semi- first time that you see Linux or a

24:43

terminal, it's not like we like the 80s and we we

24:49

like using the terminal. The fact is that in networking, especially in

24:52

networking, uh you don't have graphical user

24:57

interfaces. What do I mean by graphical user interfaces? a mouse for example,

25:04

left click, right click, all the applications in the sidebar.

25:09

Okay, I don't have that. Why? Because in networking 99% of the time I will

25:14

connect to a remote machine. Okay, to a remote server. If it is remote, the

25:20

graphical user interface is a little bit tricky. Okay. Some of them may expose a

25:25

web server, but most of the time you will be

25:29

connecting via terminal. Okay. So, uh it may be a little bit strange at the

25:37

beginning, but I mean that's how it goes.

25:43

Okay. If you want to exit this terminal, I

25:47

think that it was exit. See? Okay, remember the Catal Lab is

25:54

still running. If you want to stop it to start it, it was L start.

26:03

Uh, of course, I didn't say that, but of course, everything that I'm saying is

26:07

written in the slides. Now, I will show it. But I mean, it's not that you uh

26:12

it's all written. Okay. If you type L clean, L stands for lab.

26:22

Okay, just run it. Deleting, deleting

26:26

everything. Everything is there. Perfect. Okay, so cut now. I stopped.

26:34

Okay, so this more or less was just a basic

26:40

example on on what you can do with Kar. We didn't set up IP addresses. We didn't

26:46

do anything. We just set up a small simple network. Okay.

26:52

But now we will see it in a second. Okay. So

27:08

now we start doing

27:12

um let me upload the slides on the on the

27:17

drive. But now let's start to create a little bit a little bit more complex

27:24

lab. Okay, let's try to create this network right

27:29

here. Okay, which are the same PC1 and PC2. and let's try to put a router in

27:36

the middle. Okay, again this network these nodes you see here

27:42

written a PC is a router in Kad they're all the same they're all nodes okay the

27:48

images are just for illustration purposes okay

27:53

um so we have two collisions domain okay

27:59

so What's going on? Let me upload the

28:09

slides real fast. I am uploading them in the folder that I

28:26

shared. You have this folder, right? Okay, I am also uploading

28:44

uh lab zero. Empty. What is empty?

29:09

Okay, I think I have uploaded everything in the slides also. Sorry, in the shared

29:14

folder also this one. Okay. So again um the katara configuration file

29:25

basically is just needed for the physical network. Okay, that's the the

29:32

let's say the um the power of Kadak. Okay, because it's not like an esoteric

29:38

tool that I know no one uses or it's so complicated to use that once you learn

29:43

it, you can do no nothing with it. Okay, but the thing is that K only emulates

29:50

the network and the connections. After that, I mean it's not kara after that

29:56

kad ends is just Linux. Okay, so we can we just need it to emulate the physical

30:01

network. So again in the lab config we need the note name, the network

30:11

interfaces, the links and the collision domains. Okay,

30:16

so let's start it. Let's try to implement this topology.

30:22

Now I've uploaded the slides on the internet. So I mean I closed this image

30:26

but you can keep it on your computer if you have it.

30:40

Let's start from the previous lab.com file. The one that I was writing before.

31:08

Okay, let's call it let's delete this.

31:25

Okay, let's start from the lab.com file that we have before. Okay,

31:30

so I had PC1 connected to a router and connected itself to PC2. Okay, so let me

31:39

delete this. So the start it's the same PC1 interface zero is connected to

31:45

collision domain A. Okay, and then it's connected to the router. Okay, the name

31:50

was L1. I don't remember.

31:55

Yes, R1. So I write L1

32:00

interface number zero is connected to the same collision domain of PC1.

32:11

Okay. And that's the first part of the network, the leftmost part of the

32:16

network. Okay. the right part of the network. Again another line there is

32:23

PC2. There is PC2. Okay. interface network

32:43

number zero because it's the first one connected to another collision domain.

32:49

Okay. So basically we are talking about we are emulating Ethernet. Okay. The

32:55

cable everything is internet. Okay. Now this

32:59

um a collision domain in basically a cable.

33:06

Okay. So every link that you see here is basically a collision domain. Okay.

33:13

Heavy link that you see in the net.

33:24

>> Okay. So, PC2 is connected to another

33:28

collision domain. Let's call it B. And then there is L1.

33:35

uh this timer one not the zero interface

33:41

because they start from zero but the interface number one okay so the second

33:46

interface is attached to B so if you read here I mean we have this

33:54

at zero at one

34:02

>> sorry I didn't uh

34:03

>> how much how many interfaces How many interfaces you can do with

34:09

this? You say

34:12

>> how many you want?

34:14

>> No. No. There is no You mean this example or in general with No. No.

34:20

Whatever. Whatever you want. I mean uh No. With you. No. Because with the

34:28

simulations that you were trying it was just a single. No. No. But you can do

34:33

really how many how many you want. If you want to emulate a router with 100

34:39

network interfaces, you can do it. Of course, I mean depending on your PC, but

34:45

uh you you can do it whatever number you want.

34:50

Okay. So I was telling that at zero at one these are the number of the network

34:55

interface. So Linux historically the name of the network interface starts

34:59

with AT okay stands for Ethernet. Again even if you have maybe never

35:07

attached a cable an internet cable to your computer is is everywhere. When you

35:13

go to a company and work, I mean, the first thing that you do is they give

35:18

your company PC and in order to use it, you don't attach to Wi-Fi. You attach to

35:25

the network via cable via Ethernet. So, even in data centers, they don't have,

35:32

let's say, standard Ethernet, but it's okay. So, this is the lab.com.

35:40

everything that we need in order to oops in order to run. Okay, so we save

35:49

ah about the terminals that were too small. Okay, if you don't see it,

35:54

if you go quickly to Kad settings and here it is

36:08

terminal to be used. Okay. So number five,

36:14

there is this option at least in Linux on Windows I don't remember. Uh so just

36:21

press two which is just the basic this basic terminal right here. Purple

36:26

terminal. Okay. Fantastic. Exit.

36:34

So let's try to start again. The command is L start.

36:43

And now I have three

36:48

big terminals. Okay. So, let me avenge it this way. Ah, but

36:54

maybe it's better to I see it now that I didn't roll down

37:00

this Okay. So, leave that door open. Let's go

37:35

back to to this. Okay. So here's something I have already

37:42

already said the collision domains. Okay.

37:45

Let's start to talk about networking. I mean we are here about to do networking.

37:52

Okay. we will use

37:56

the let's say the the most common Linux common suite which is called the comma

38:04

is called IP okay if you are

38:10

uh already seen something okay these are the legacy commands okay if

38:17

you are already familiar with these commands they're a little bit legacy

38:21

okay there was if if config Linux ARP, EP tunnel,

38:27

etc. They are a little bit legacy and they are replaced

38:33

by our this IP command. We will see it in a second what it does. But basically

38:40

um with these commands we will be able to

38:46

assign IP addresses routting to configure a network. Okay.

38:57

Okay. Um

39:04

so let's let's start to run some command inside the the the the

39:12

Okay. So IP link. So do you uh no let's try to do

39:23

it let's try to do it here on PC2 okay so IP link what it does is shows the

39:32

network interfaces okay IP link operates let's say on the layer two of the

39:40

network if I say layer two I mean internet I mean close to physical layer

39:46

okay you remember this layer layers of the network there is TCP IP if you don't

39:53

remember perfect because next time we will next lecture we will go about it

39:58

for the moment just believe me okay so again this first lecture is just to give

40:02

you a a sense of what we are doing okay even if

40:08

there is something that is not clear or even if everything is not clear it's

40:13

totally fine I mean this first lecture is thought to throw you not everything

40:20

but a lot of things that we will do and then we will get to it a little bit

40:25

slow. Okay. So if I run IP link show

40:34

I am in PC2 and there are let's say many many things

40:40

that it prints out but basically the interesting there are two two lines two

40:46

network interfaces I have just highlighted them okay this

40:52

one and this one this network interface is a the low loop back network interface

40:59

we don't use it even if we didn't specify in the kad network is something

41:04

related to Linux just ignore that okay this is the network interface that we

41:09

have created with kadara at zero we are on PC2 just one network interface we are

41:15

on at zero okay so this is the network interface that we did

41:20

if we go to air1 the router that had two network interfaces

41:30

uh these commands these IP commands they have have many

41:35

abbreviations okay instead of IP link show just write IP you will see me write

41:42

I don't know IPL which stands for link and it does the same exact uh same thing

41:49

okay so in this way in this case sorry we have two network interfaces at zero

41:56

and that one. Okay, I mean they don't do anything but

42:02

they exist. Okay, which is a starting point.

42:07

Okay, the network interfaces exist. Fantastic.

42:14

Let's try to assign some addresses to those interfaces. Let's try to to to to

42:22

create a network. Okay. Okay.

42:29

So the if if you have the slides, okay, the

42:35

slides later reports the various IP addresses. Okay. So I'm just

42:42

um I mean

42:46

this is the slide to to the comments and the second slide is the slide of the IP

42:50

addresses. So if I talk about if I speak about IP addresses, I mean I think that

42:56

most of you know what an IP addresses is. Okay. So um an IP address in a local

43:05

network in a wide network is a number which is assigned to a specific network

43:12

interface and the network interface can receive

43:16

the packets uh directed to the IP address. Okay. So

43:24

for katara for our purposes we will assume that every network interface will

43:30

have a single IP address. Okay. So there is a onetoone correspondence between a

43:35

network interface and an IP address. Not that this is just for clarity. I don't

43:42

know in the real world it's not like that. Okay. there could be uh

43:48

more network interfaces bonded to the same IP address for

43:53

example okay um for example your home router let's talk

44:00

about your home router okay you know your box Wi-Fi box which have some

44:06

internet cables and does the Wi-Fi okay so the router that you have in your home

44:12

is basically a small Linux box because it's Linux 100% of times

44:19

and basically it has some network interfaces wired and then the wireless

44:24

network interfaces most of the times they will have two network interfaces

44:28

one 2.4 4 GHz and the other 5 GHz. Okay, in that case all the network interfaces

44:37

are let's say have the same IP address

44:42

because the IP address of your router will be the same something like 192

44:48

168.0.1 0.1 okay so in reality there is no one to one correspondence

44:57

uh network interfaces IP addresses in our cases yes we assume one network

45:02

interface one address okay so it means that we have four network interfaces

45:10

two on the PC sorry one on the two PCs and two on the

45:15

routers we have to set up four IP addresses this. Okay,

45:22

let's start to do it. Let's start from PC1.

45:34

So, okay.

45:49

So the command again is reported in the slide. I'm just writing it down.

45:59

The syntax of the command is something like this. I am on PC1. So IP

46:06

address because we are talking about IP addresses. Okay. Add. Then you write the

46:13

IP address. In this case, I want to set up this

46:19

right here and specify it with the

46:27

net mask slash number. Okay, we will see it in depth

46:34

the next time I think. uh but basically the net mask creates

46:41

sub networks which enable routting. Okay, we will see it in the another

46:45

lecture but basically uh just for now believe me just write IP

46:51

addresses slash this number which is in this case is 24.

46:56

Yes.

46:57

>> Why did you say that we have to configure four IP addresses? You have

47:01

just three three addresses. Why do you say E3P addresses

47:11

the PC and the router?

47:15

>> Yes. But the fact is router has two network interfaces. So basically

47:23

for I mean for our purposes we assume that each network interface has its own

47:29

IP.

47:30

>> They are two different.

47:31

>> Yes. Yes. Yes. Yes. They are two different. They could be the same if you

47:35

want, but I mean for for now for now I mean later we change it but for now we

47:40

assume just one network interface one separate IP address. Okay, for the

47:46

moment okay so what's IP address add the number

47:52

of the IP address and then to which network interface

47:57

dev at zero. Okay, it's not is at zero. Okay,

48:04

just press enter. If you don't see any error, it means

48:10

that it went okay. How to check if it went okay? If you do IP

48:19

address show,

48:24

press enter. Let me

48:30

Again, if you are not used to use a terminal,

48:40

seeing just these charters on the screen, I remember the first time I was

48:44

a student and I approached to to to terminal Linux was a little bit strange.

48:52

Uh but it's just habit I think. So here you have this

48:58

your at zero and you see it has this IP address that you have assigned to it.

49:05

Okay. What can we do where with an IP address?

49:09

So in networking let's say the most basic tool that you have is ping. when I

49:17

say ping is a theory is ICMP echo request whatever basically with

49:27

ping you can check whether an IP is reachable okay so let's try from ourself

49:35

to ping ourself okay so ping ourself if I do ping

49:43

I don't know if you ever tried al also on the public uh network but I mean it

49:48

works if you do ping and then your IP address

49:53

so 10.0.0 0 and just press enter. You see that

50:04

is going on is sending a ping and receiving the

50:10

reply. How can I tell it? Because time you see this is the roundtrip time.

50:16

Okay? So it means that a packet is going somewhere and the packet is returning to

50:22

me. in this case is not going anywhere because the IP is the local IP of the

50:27

machine. Okay. Uh so you see the times are below the millisecond. Okay.

50:35

If you go to I don't know if here I'm connected to

50:40

the internet but if I run a ping

50:46

google.com ping sorry no I am on um

50:57

in If you go on your computer connected to

51:08

the internet and just type ping google.com every Mac,

51:14

every Windows has ping

51:24

>> blocking fair.

51:34

Okay, if Sabiensa network didn't block our pings, we will see that this this

51:39

works. We will see actually when we work we will talk about VPNs and SSH

51:47

how to bypass these firewalls if you have an an external um an external uh

51:54

server. Yes, these are firewall. We will see in the firewall lecture if you want

52:00

how to block a ping. I mean it's a it's efficient.

52:05

Okay. Anyway, it it works. Our ping works perfect.

52:12

Let's in case I mean if the ping will run

52:18

indefinitely. Okay. If you want to stop it, this is the general rule in links.

52:22

If you have a program which is running and you want to stop it, the magic

52:26

commands is Ctrl C. Just press Ctrl C sends a signal just interrupts the

52:32

process. Okay. Okay. Let's go on and try to set up some

52:38

other addresses. Okay. So PC1 is done. Let's do at zero over one. Okay. So the

52:44

leftmost sorry. Yeah. See the left most. Yeah.

52:50

the ruden. So PC1, let's go to if you wanna clean your terminal

53:00

the I didn't write it, but it's ctr L or clear. Yes, just type Ctrl and L.

53:09

I uh it's not clear. If you go up, basically you see that there is all of

53:14

your garbage. Okay, but I mean at least it is clean.

53:19

Okay, let's go to R1. Set up the address IP. Again, also IP

53:25

address has the command does some shortenings. Okay, instead of IP

53:31

address, I can just write IP address

53:38

or if I am in a hurry also IP AP. Okay,

53:46

it's the same thing. Okay, let's try to set up the address.

53:50

So, IP address add I don't remember the address 10.001

53:57

10.00.1/24 to the network interface

54:03

at zero. So again you have to specify what addressed to what network

54:09

interfaces. Sorry.

54:18

>> Yes. Good. Okay.

54:24

Is set up. I can try to ping the same uh the same router.

54:32

It works. It's set up correctly. Okay. Let's try to do since this left part is

54:41

done. Let's try to ping these two nodes. Okay.

54:47

So the pocket exits the node. Okay. So PC1 let's try from PC1 to ping L1.

55:01

So on PC1 I do ping 10.0.0.1. Again I'm in PC1 and I am trying to

55:10

reach this interface right here.

55:15

I ping it and you see it works. You see that now the time

55:23

has increased since a little bit. Okay.

55:28

Before we were 0.0 something milliseconds.

55:33

Now we are about one millisecond more or less. Okay.

55:40

And uh because every packet has to go inside the kernel. The kernel just

55:45

handles it passes to the other node. The kernel of the other node handles it. So

55:52

there are a lot of operations involved. These are very low times. Okay. In the

55:59

internet what I was trying to do before. Okay. I was trying to ping Google. An

56:05

average number that you can read is 20 milliseconds

56:09

more or less. Okay. So 1 milliseconds on the real internet is it's very very low.

56:18

Okay. Um

56:37

Okay. So, returning to the example of I was telling if you ever try to connect

56:43

your computer and your friend's computer with a cable.

56:47

Basically, that's how you set up the network in order to let them

56:51

communicate. Okay? So, if you have two computers, just plug an Ethernet cable

56:57

between the two. you have created the physical network and then you have to

57:01

tell them explicitly the IP address. Okay. Uh the IP address

57:09

it is I mean everything connected to the internet has

57:15

an IP address. Your phone your computer but it's not like I connect to the Wi-Fi

57:21

of Saba I set up my IP address on my phone with IP address.

57:26

you don't do it. There is an automatic protocol that does that. It's called

57:32

DHCP. We will see it uh in the next lecture. It does let's

57:38

say it assigns IP automatically. Okay. But without DHCP, without any external

57:44

tool, you have to manually tell your computer or your phone or your whatever

57:51

look the AP on your uh interface is this one. Okay.

57:58

Again, there are tools like the HCP that does it automatically.

58:02

Uh in this case is is automatic is manual.

58:09

But just remember that everything, every computer, every phone

58:16

has a at least one network interface with at least one IP address. Okay? For

58:22

example, your phone. Your phone has the Wi-Fi network interface

58:28

which is if if it is connected, it has some IP address.

58:32

Uh it has the cellular network interface 5G, 4G, whatever. And that network

58:38

interface will have a separate IP address depending on on your carrier on

58:45

your internet service provider. Okay. Bye.

58:50

All of these commands can run it inside.

58:57

>> Uh if you want to

59:00

>> if you want to set an

59:03

>> Yes. Yes. nonintellab.com in some other configuration file that there are see.

59:13

Okay. Let's try to I will get to it in a second actually. Okay. So let's try to

59:20

implement the um

59:25

rightmost part of the network. Okay. So PC2 and one. So I think you understand

59:32

how it goes. So on PC2 we do 10.0.1. So IP address add

59:44

10.0.100 0.1 100 graph

59:51

to at zero. Fantastic.

59:56

And we go to one, which is not this, which is not this

1:00:02

either. It's this one.

1:00:09

And we do IP address add. It was on L100 01.1.

1:00:29

>> Okay. If you add an IP address by mistake, you want to remove it, the

1:00:34

syntax of the command is the same, but instead of add.

1:00:40

Okay. This is to remove an IP address. That's it. Okay.

1:00:48

>> Replace it.

1:00:51

>> I know because in this um I show you

1:00:59

if I run the previous command. Okay. I'm adding an IP address to the same

1:01:05

interface. I mean we won't need it for now

1:01:10

but if we now see all the piece

1:01:21

to answer your question this is at zero this is at zero and you see that at zero

1:01:29

has two addresses okay so there is no really replace okay in this case I set

1:01:34

up a wrong IP IP IP address sorry the correct IP address but the wrong

1:01:38

interface and you see the same interface as two addresses this is completely fine

1:01:43

this happens in the real world for now in kara we say no we say one network

1:01:49

interface one address just for clarity okay but it's completely fine actually

1:01:56

if you want to remove the IP address the command is

1:02:01

IP address del address and interface

1:02:06

run it. And if we want to add the address to the

1:02:12

correct interface, which I was trying to do,

1:02:18

the command is this one. Add the address to the network interface.

1:02:25

And it works. So let's try to go to PC2

1:02:31

and try to ping the router. Okay. So let's try the connection

1:02:36

between the uh between the rightmost part of the network. Okay. So on PC2 I

1:02:44

can do ping 10

1:02:49

0.1.1 is pinging the router. Okay.

1:02:57

So why the ping is important? Again, ping

1:03:04

is just a pocket that it goes to somewhere and somewhere crafts a reply

1:03:11

and replies me back to the intended reply. But pings

1:03:17

do a lot because what they do is basically

1:03:21

I mean if you can ping a node it means that you can reach that node. It means

1:03:27

that the P addresses are set up correctly. The routing which we didn't

1:03:31

talk about is set correctly. So if you reach if you ping a node it means that

1:03:38

at least from an internet and network configuration perspective you are okay.

1:03:44

It means that is reachable. Okay. So that's why the ping is

1:03:50

important. Let's try to do to push a little bit

1:03:56

further. Now we were just pinging on the same collision domain. Okay. Let's try

1:04:01

from PC1 to ping PC2. Okay. In this way

1:04:08

in networking this is called an hop. Okay. So before the ping was with zero

1:04:16

hops. A hop is is just like a a a network node in between. Okay, it was

1:04:24

zero because they were connected directly on the same collision domain.

1:04:28

Now what should happen? PC1 sends a ping

1:04:34

cannot send a ping directly to PC2 cannot happen. The ping under say in the

1:04:41

underground is sent firstly to one. L1 receives the packet says ah this packet

1:04:48

is not for me is for is for PC2 fantastic generates the packet let's say

1:04:54

forwards the packet to PC2 and PC2 replies back passing through one again

1:05:02

networking this connection is called I mean R1 in this case is called an hop

1:05:08

okay it's one hop it means one thing in in between but in theory you would How

1:05:15

many hops you want? You have how many routters you want.

1:05:21

Okay, let's try to do it. So for PC1 we ping

1:05:26

10.0.0100. So PC2 no sorry PC1

1:05:39

if we do ping 10.0.100 0.100 this is the address of PC2

1:05:51

say network unreachable it's an error why it's an error because

1:05:58

as of now we were just local okay but since now we

1:06:04

are moving from collision domain to collision domain

1:06:11

You see there is a fundamental difference. The difference is that you

1:06:16

do not simply send the packet to your destination. No, you have to send the

1:06:23

packet to one and instruct it to send it to the final destination. Okay. So there

1:06:31

is an active role of one. Okay. So how can we do it? Uh for now I'm

1:06:40

writing this command. Just believe me the routing the the the subnetting we

1:06:46

will see it in the next lecture. But basically

1:06:50

the G is that uh to PC1 you have to tell to PC1 how to reach the collision domain

1:06:58

of B. Basically you have to PC1 look the RPC1 if you want to reach that addresses

1:07:06

you have to go through L1. Okay, how can we do it?

1:07:14

And for now, believe me, we will go into subnetting next lecture. But if you do

1:07:22

IP root another command, you see basically we

1:07:27

will use mostly IP address and IP root. And here we should write

1:07:36

the subnet of the uh collision domain B. Okay, for

1:07:42

now believe me the subnet is just a a set of IP addresses. Okay, a collection

1:07:50

of a a logical collection the IP addresses. Okay.

1:07:58

So for now, believe me that if I write this thing right here, this 10.0.1.0/24

1:08:10

is the logical set that includes all of these addresses.

1:08:17

Okay, we will see it in the uh detail the the next lecture. for now just

1:08:24

believe me there is so I want to add this route how can I reach this route

1:08:30

well you have to pass through L1 okay how can I reach one PC1 can reach one by

1:08:37

going to this IP address right here okay so via the syntax of the command is

1:08:43

literally via 10.0.0.1

1:08:47

0.1 oops

1:08:52

IP root add. This is the command. So I root add the

1:08:59

root and if I press enter this time

1:09:04

it goes. Okay.

1:09:10

Fine. Now let's try to do the ping again.

1:09:17

So in Linux if you never use a terminal there are the arrows the up and down

1:09:23

arrows which you can select the previous commands that you run. Okay. You see? So

1:09:30

I mean if I

1:09:34

was here I remember I did a ping. If I just type the up arrow

1:09:41

I see

1:09:50

>> the

1:09:52

>> no because the syntax of the comma. So the

1:09:55

question is IP routed this thing right here via 10.0.0.1.

1:10:04

So you are asking about this.

1:10:07

>> No, the other one.

1:10:08

>> The the other one. This one.

1:10:13

>> No, because in this case, so the question is why here is not written 100?

1:10:20

Because the syntax of the com because you have to tell to the computer how to

1:10:26

reach

1:10:27

>> the left the one

1:10:28

>> ah so

1:10:29

>> yeah we want to get to right

1:10:33

>> yes yes that's a good question actually and we will get to it the the the

1:10:40

>> no no the the the next lecture for now believe me uh the thing is that

1:10:47

consider it not as an this is not an IP address. This is a so-called sub

1:10:53

network. This is a sub network which is a

1:10:59

as let's say a set in c a list a collection call it as you want of a

1:11:05

addresses which includes also your 100. So for now just believe me that that's

1:11:11

the command. Next lecture we will see. Okay I have the ping. Let's try to do

1:11:16

the bing. I mean at least it's trying to do

1:11:23

something. Okay, before you remember we just typing error that's it job in this

1:11:31

case it has it's trying to do something but

1:11:35

it then it quits the story it's not quitting it's trying actively to send

1:11:40

packets okay why is that PC1 knows how to reach PC2 because it has the

1:11:49

rooting so you see that the commands at least starts

1:11:53

So it's sending the packets. What's the problem?

1:12:03

>> Exactly. So this is important because in the also

1:12:11

in order when we do some complex scenario you have to keep this in mind

1:12:17

that the ping is only successful if it reaches the final destination and

1:12:24

then it goes back. Okay. So if the ping reach p2 that's half the way. Okay.

1:12:31

because the ping has to go back from PC2 to PC1.

1:12:37

In this situation, I didn't stop it, so it's still going. In this situation,

1:12:46

PC1 is constantly trying to send packets to PC2. It's bombarding it one every

1:12:52

second with pings, okay, but it's receiving no reply. Okay, actually the

1:12:59

com all the pins are are received PC2 correctly

1:13:03

but PC2 does not know how to to send them back. Okay.

1:13:09

And um so let's try to do the same the analog

1:13:14

thing to PC2. Let's tell to PC2 look de PC2 if you want to reach these addresses

1:13:20

right here you have to go through L1. Okay.

1:13:29

So this is the ping that is going. Let me take PC

1:13:36

2. So this is PC2.

1:13:48

If I do IP root add again for now believe me 10.0.0.0/24.

1:14:02

So this is the in this set there are the IP addresses

1:14:07

of PC1 and R1 and I do via

1:14:14

the IP address of R1 which is closer to PC2

1:14:20

10.0.1 0.1.1.

1:14:24

>> Yes.

1:14:26

>> As soon as I press enter, you see that the ping start working.

1:14:34

Okay. As soon as inserted the root on PC2, PC2

1:14:40

knows how to reply to the ping and start working.

1:14:45

You see this is the ping. This is ICMP sec is

1:14:53

just a sequence number a number increasing every bucket. We just missed

1:14:57

the first 190 buckets. Okay. But at least the this

1:15:03

one we got it. Okay. And then we we receive. So the network is working.

1:15:15

Okay. So just uh

1:15:25

okay. Uh

1:15:35

I would just want to tell something before doing a break.

1:15:42

We are on PC2. Okay. We have used the ping. But actually there is also another

1:15:51

another utility that we can use in this case which is called trace root. Okay.

1:15:58

The syntax of the same is instead of ping IP address trace root IP address

1:16:04

that is instead of just sending a packet and seeing the the the return

1:16:11

trace root actually prints me gives me the root of the bucket. So in our case

1:16:21

the packet is first sent by one to1 which is then sent to PC2.

1:16:30

If we go to the output of trace root you see that actually

1:16:36

it has two let's say two two this packet has encountered two nodes okay the first

1:16:41

is one and the second one is this final

1:16:46

destination the 100 PC2 okay so this is useful in case when you

1:16:52

have tens of nodes and if I were connected to the internet

1:16:59

you can do it also So on your computer later we will try it. Uh you see how

1:17:04

your packet moves into the network. Okay.

1:17:15

We can have a little break 15 minutes. Okay.

1:17:30

Okay, it just started. Okay guys, now

1:17:49

before moving on I ah first of all before I forgot uh basically professor

1:17:56

Cuomo has reminded me to remind you that on Monday there is like a change of

1:18:02

schedule right because she had told you about this right so

1:18:08

uh how was it in the Monday you have a lecture

1:18:11

there is a different time of the lecture or different room I don't remember but I

1:18:16

mean reminded it is official uh I don't remember exactly what is the

1:18:21

new room or the new so whatever so 11

1:18:29

>> okay so 12:14 is the new time of the lecture only on this Monday Okay.

1:18:37

Okay. On this one, just remember it.

1:18:46

Okay. Let's go back to the uh to the our lab which is still

1:18:52

running. So

1:19:05

the lab is still running. Okay. So you know our lab

1:19:11

we did all the configuration the IP addresses the routing. Fantastic. Now I

1:19:17

just want to close the lab to close my computer for whatever reason.

1:19:24

And uh everything that you have done simply cease to exist. Okay? Everything

1:19:30

that you type in the terminal while your lab is running whenever you restart your

1:19:36

lab it will be gone. Okay? So it's temporary.

1:19:41

If I stop the lab which is kara l clean and restart it

1:19:49

there is a command for that is l restart.

1:19:53

Okay. So just stops the labs and restart it again.

1:19:58

Everything that I've done just vanishes away. I have router. If I do IP

1:20:03

addresses, empty IP addresses. Okay.

1:20:11

And we don't want that. Okay. How to make them let's say configure when it

1:20:16

boots up when when let's say when the lab boots up.

1:20:19

Well, it needs some files. Okay. Um,

1:20:27

here I am in the in the

1:20:32

folder of the laboratory. Um,

1:20:38

if I create a new file, a new text file, you can, I don't know,

1:20:43

copy the laptop conf.

1:20:51

Let's rename it. So, the VM is a little bit experimental

1:20:59

because sometimes it bugs me out. problem.

1:21:28

Sorry guys, that is not clicking. Anyway,

1:21:50

okay. You have to create creating this file again. This is just a text file

1:21:58

which is called PC1.st start up. Okay, so the syntax of this file is just the

1:22:03

name of the node dot start up. Okay,

1:22:16

so in this file I just write the terminal lines that I

1:22:23

wrote before. Okay. So before in the terminal I wrote a p address add

1:22:28

something here I just write the the lines that will be run at the startup.

1:22:36

So for example if I write IP address add you see one was 10.0.0.1/24

1:22:50

dev at zero. Okay, this is just a text file. I saved

1:22:56

it. If I go, if I launch again

1:23:01

the gad lab again, I'll restart. Just closing

1:23:08

previous lab and restarting. If I go to PC1, you see startup commands

1:23:21

log and each command

1:23:25

is executed. Okay. So if I go to IP address,

1:23:32

tada, there is the IP address. Okay. So this is the way to make the

1:23:41

laboratory configure by itself. Okay. again because

1:23:46

when I close it and relaunch it, everything that I type here is

1:23:51

temporary. Every configuration is temporary. So you need these files to

1:23:55

configure it a start time. Okay,

1:24:02

let me close it. Okay, now let's try

1:24:21

Let's try to do this and let's try I mean you to do this. Okay. So

1:24:30

uh this lab is called my first lab. Okay.

1:24:34

So and I'm asking you to do it now. I mean usually in the labs if you do you

1:24:41

can talk you can do whatever you want. If you have questions I'm here I usually

1:24:45

go around the desks asking if something is okay. So this is the topology of the

1:24:53

network. So again it's a little bit more complex.

1:24:56

There is a PC there is a server PC1 S1. Again a server is as

1:25:06

same as every other node just the image is different and two routers.

1:25:12

Okay. So this is the topology of the network

1:25:19

and then asking you to create that topology and ultimately to make every

1:25:25

node able to reach to ping every other nodes.

1:25:30

Okay. So you have to implement first the kat

1:25:35

lab the the the network the the topology let's say

1:25:42

then you have to assign IP addresses then you have to configure rooting and

1:25:49

then try to from everybody to ping everybody else

1:25:54

okay so the slides are uploaded

1:26:00

so this is the topology and the second slide later are

1:26:05

the steps let's say so try to to do it now try to open try to familiarize with

1:26:13

camera I will be here for questions I will be going through the the desks okay

1:26:22

so for the guys who are following the registration in the future I have to I

1:26:27

mean I stop it because for now they are Doing laboratory session.