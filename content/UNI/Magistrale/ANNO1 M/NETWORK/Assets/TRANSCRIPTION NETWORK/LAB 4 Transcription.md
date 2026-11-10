06

Okay. So, so today in Canada we are seeing DHCP

0:18

and OPF and we will get to to to them what they

0:22

are later. So um the idea is that until now we have seen

0:30

static configurations. Okay. Um configuration of IP addresses of

0:37

routting whatever that is static. Okay. Now we move on a little forward and we

0:46

uh see how dynamic configuration works and we will see the differences in a bit

0:52

but basically we are taking a look at DHCP

0:57

which manages the AP assignment uh automatically and OPF that manages

1:03

the rooting the rooting u dynamically. Um

1:10

so before uh going to this stuff okay um

1:19

again this is something that we have said in the previous lectures but

1:23

basically uh um in kada when you relaunch let's say a laboratory okay uh

1:32

it starts from scratch okay if you need something to be run a startup please use

1:38

these files. For example, if you have a node called if you have a device called

1:43

X, if you name a file X.st startup, okay, the lines contained in that file

1:53

will be executed when it starts. The idea is that there will be a

1:59

homework. Okay, an homework which you will let's say um

2:05

uh do the request of the homework then you have to zip the homework and send it

2:11

to me by mail. Okay. And when you will send it by mail

2:16

the laboratory your homework should be oh no

2:23

the homework should configure itself. Okay. So when I press L start everything

2:28

should work because you have created all of these startup files that

2:32

automatically configure stuff. What I waste

3:24

Crystal. Okay. Um

3:44

so we have seen startup files. I'll try to speak louder. Um you can also

3:51

you can also um not only let's say run lines start up

3:59

but also let's say mount copy files a startup. Okay. Um

4:07

again we have seen the shared folder. Okay. Um

4:13

so just taking uh let me take this.

4:32

Okay. So this is just a a simple laboratory.

4:38

Okay. If you create here a shared folder say shared

4:45

a folder which is called shared. Okay we have seen that if you launch

4:52

the laboratory and here you go into

4:59

shared. Okay this folder is shared across the kad

5:05

device and your host computer. Okay. So you can put files there and you can

5:10

exchange. This is the shared folder. I think we have seen it. But actually you

5:15

can do something more. Okay. So in this lab there is a device which is called

5:20

PC1. I think yes it's just a PC1. You can

5:26

create a folder named as your device PC1.

5:33

And here you can create h any directory structure that you want.

5:40

Okay. And the files here will be copied on startup

5:45

onto the uh the device. For example, I have created a folder PC1. There is my

5:52

file one. Then there is another folder and there is another folder here. Okay.

5:58

If I go to the running device starting from the root directory. So the

6:05

the first directory. If I do ls here, you see this is my file one. Okay.

6:15

I can move on to the subfolder. Okay. So I can do

6:22

and I'm sure that here there will be this file right here. Okay. So this is a

6:33

way to mount files as startup in kara. Why is useful? Uh well because sometimes

6:41

you may need configuration files. Okay. And we will see it in a second.

6:48

Um for example this is just an example um

6:55

uh we have seen how to configure AP addresses

7:01

uh with let's say terminal commands with configuration line commands actually um

7:10

there is another way to do it it's not a better way but it's like another way

7:14

that you can use a configuration file Okay. So the two things achieve the same

7:21

result. Okay. We are assigning IP addresses but what's the differences? Uh

7:27

this is in theory in Linux whatever you type on a terminal I mean the philosophy

7:34

is that whatever configuration you type on a terminal should be temporary. Okay.

7:40

So that's why when you reboot the laboratory your

7:45

configuration gets lost. Okay, this is the philosophy. Uh when you um if you

7:52

want to let's say have a permanent study configuration, okay, then you have

7:58

to create something that lives on your not on your RAM but on your hard drive

8:05

SSD on your disk. Okay, so you need a file. So you need a configuration file.

8:12

Um so this is just an example. Okay.

8:18

Um for example, let's say that

8:31

again I have just this laboratory file with PC1. Here I have my startup file

8:38

lab.com shares folder. Um I want to add a startup configuration

8:46

file to uh how do I say to configure DCP and some basic routing for example a

8:53

gateway. Uh how can I do it? Well, basically in Linux there is a file in

9:00

this path in this ATC network interfaces

9:06

that include some network configuration. Okay.

9:12

So if you go to PC1

9:16

ATC network you see you have to respect the uh let's

9:22

say the directory structure. Okay. So again these file interfaces

9:28

will be mounted inside PC1 ATC network interfaces. So the path that

9:34

you have here in the folder will be respected in there.

9:40

So I can create

9:46

this file. Okay. But I mean uh this is just an example. Let me take here this

9:51

slide because it's bigger. So the idea is that you can here define multiple

9:57

network interfaces. It starts with the keyword auto at zero. Auto it means just

10:05

bring the interface up automatically. So just put at zero.

10:12

The idea is just you uh this is the syntax right here. EAS stands for

10:18

internet stands for interface. Okay. ADH0 is the name of the interface. Inet

10:26

stands for internet. Static.

10:30

What do I mean static? Studic means that it doesn't change and we will see it

10:34

later. Uh the dynamic version.

10:40

How do you write then? Well, you just write address the IP address net mask.

10:46

The net mask that you want to put here. you have to write in this notation. So

10:52

the net mask not with the slash something but with the uh let's say

10:58

decimal notation and then if you want a gateway where

11:03

gateway is the default gateway this is optional.

11:07

Okay. So let's see in the lab I have the

11:12

address a default gateway. Ah you see I can

11:16

write the the net mask also with the slash something. Okay. If I launch

11:26

let me interrupt the lab of before. So this is the configuration file. Okay.

11:40

Let me start. So first of all if I go into

11:48

H network

11:54

there is the same file. Okay.

12:01

Um, if I see my IP addresses, you see this is my address

12:16

16 and this is my configure gateway. Okay,

12:22

so simple. Um the idea is that with kad if you configure a node with this method

12:30

you have to add into the start up this line right here. Okay.

12:39

Uh so what happens is that katara first it

12:45

set ups the network then it mounts the file. So the idea is that if you

12:52

configure your network or something else with a configuration file, you have to

12:57

restart the process. So you have to say to the process, look, restart because

13:02

there is a new configuration file. How can you do it? Well, this command in

13:07

Linux just restarts the whole networking stack. Okay, so it reads all the

13:13

configuration files and setups uh everything. So again just remember to

13:20

put this line into the configuration into the into the startup.

13:28

Okay. Uh this is what we have uh

13:39

what we have set. Okay.

13:43

So DHCP.

13:46

So DHCP is a protocol. Okay, a lot of you maybe

13:52

have heard this about the word DHCP. So DHCP dynamic host configuration protocol

13:58

is a simple protocol used on local area networks to automatically assign IP

14:05

addresses and some other information like a default gateway uh DNS entries

14:12

optional but you can you can do it. Uh so

14:19

DHCP follows a client server architecture. So again there is a client

14:23

the desks for configuration and a server that uh gives

14:30

the configuration to a client. So uh until now we have seen again static

14:36

configuration. What do I mean again by static you create a file you type in a

14:42

command and you configure the your IP address. In reality

14:48

it doesn't work like this. Okay. In reality, I mean reality with consumer

14:52

devices like your phone, your computer, you just turn it on, turn on the Wi-Fi,

14:58

connect to a cable, and magically your device has

15:05

an IP addresses, knows the routing. Uh, and these are all things that we did

15:13

manually. Okay. So we first let's say connected uh with a cable or created a

15:21

lab and we manually assigned IP addresses the routing whatever all of

15:27

those things can be done in um automatically

15:34

um you see because

15:40

with DHCP uh it does again automatically does all of the things that we have seen

15:48

basically so far. Okay. So how the protocol works just a

15:56

quick run up it is simple uh but the idea is that there are four

16:04

main messages. Okay. So the client is the first that starts the communication

16:10

sends a message in broadcast and say look I need configuration I need an AP

16:16

or a routing uh DNS whatever the DHCP server responds

16:22

okay telling and says to the client look I

16:27

can give you this address right here okay

16:31

before giving uh before let's say giving this address to the client client the

16:37

server checks that no other hosts reachable hosts has the same address.

16:44

Okay, how can it be sure? Well, it does some AR requests. Okay, so let's say

16:51

that the server wants to give 192 168.13 to the client. before giving that

17:00

address to the client, it performs some some AR request to see if some neighbors

17:07

already has let's say that that address. Okay, so it does some AR request.

17:14

If you see if you connect to a network the um you have to wait a bit, okay,

17:22

before your computer gets connected to the Wi-Fi. Usually you wait some

17:27

seconds. Why is that? I mean these are simple

17:31

operations. Okay, configuring IP uh an address takes some milliseconds. Why you

17:37

wait some seconds? Part of the waiting is due to this is due to the server, the

17:43

HCTP server doing some AR requests around and making sure that no other uh

17:51

client in the network has that address. So you have to wait a bit. The server

17:57

does some AR requests and waits that nobody responds. Let's say

18:03

okay. So the DHC server after all of the checks sends the offer to the client.

18:11

The client has to confirm. Why? Well, because maybe that address right here is

18:18

incompatible with the client configuration. Maybe it

18:23

has another network interface which is attached to the same network elsewhere.

18:30

Maybe there are some conflicts. Maybe it has the same IP address. I

18:35

don't know. Okay. So, the client has to confirm.

18:40

If the client confirms, it sends okay. And then the HCP the DHCP server

18:45

responds with acknowledgement and says okay.

18:50

So, you see the DHCP protocol is simple but there are some let's say uh

18:58

practicalities. So it works on UDP

19:03

uh well known port 67 uh

19:09

and uh yes

19:14

okay how can we implement it? So we will see

19:19

the configuration of

19:22

uh both the client and the server. So Linux there are different

19:28

implementations. There is there is the implementations of

19:31

the client. There is the implementation of the server and then there is also the

19:36

implementation of the relay in case you have multihop multihop

19:41

layer two networks. But but we we we don't care. We just use the client

19:46

server. Um

19:50

note that 99% of the routters, Wi-Fi routters, even Sabi Wi-Fi, the routers

19:56

that you have at home, they run this kind of um implementations of DHCP. So

20:05

your Wi-Fi box at home is just a tiny tiny Linux machine

20:11

which which does let's say which has some

20:14

uh 10 active processes. One of those processes is the DHCP server. Okay.

20:37

The DHCP sorry the DHCP server gives also the net mask. Yes, but I didn't get

20:44

the question.

20:44

>> Question is two devices inside the same subet.

20:55

Yes, it's up to the DHCP server. Yes, we will see that the

21:02

the server has some pool of addresses to give and uh may decide to give one

21:10

address to one different address to the other and um

21:18

so it's up to the server. Yes. Yes. Okay. So we will see client

21:26

configuration of DHCP and server configuration. So client configuration

21:35

that's it a single line is not that difficult. Okay. So to configure a

21:42

network node we use DHCP as a client you remember the configuration file that we

21:47

have seen at the start of the lecture. Well, instead of writing interface at

21:52

zero and at static with all the address the gateway and mask, you just use

21:58

instead of static write DHCP that's it. Okay. So

22:06

in this case you are telling the client look you don't get an IP server an IP

22:13

gateway whatever from this file you just use DHCP and you will negotiate the IP

22:20

with the DHCP server. This is how

22:27

uh smartphones computers they they they works like this. Okay, they just have

22:33

the HCTP information and they will run the product. Simple server

22:40

configuration uh is not complicated but there are a

22:45

lot of options that you can configure. Um

22:52

so this is a screenshot of some options but there are uh

22:57

that are different. Um

23:01

so first of all how can we configure a DHCP server? We configure it through a

23:09

configuration file. Okay. So the configuration file is located into the

23:14

node of in the path etc DHCP folder and the file is dhcpd.com.

23:24

So again in Linux rule of thumb uh

23:30

if there is a client and server configuration

23:34

the server configuration file is the one ended with with the D okay because the D

23:41

stands for demon okay which is usually the process of the server that stands

23:48

there and then accepts incoming connection so the hcp.com is the client

23:54

configuration. There is a fi a configuration file for the client but

23:58

with not many options. The httpd is the server configuration file

24:05

and uh okay so this is just a screenshot of the file with some options. Um

24:19

default list time is just the time in which a client gets an AP

24:26

and uh that DP is let's say maintained up to this amount of seconds one hour

24:33

option domain servers which is DNS if you want I don't see that I don't

24:39

think that we have time to see DNS but it's an option you can pass the DNS as

24:45

uh solvers here uh and then here is the IP

24:55

let's say IP um assignment part okay so in this example

25:05

in this example I had let's say a server which is connected to two different

25:10

subnets okay so and it runs the the DHCP server on both of the subnets. So one

25:17

subnet is 19168.1.0 with the net mask. This is a /24 net

25:23

mask and another subnet 10.0.1.0 again /24 net mask.

25:31

For the first subnet you tell to the DHTP server which is the range of

25:38

available IP addresses to assign. For example, here I tell the server look you

25:45

can assign from 50 to 100 the first and the last they are included

25:52

I think and uh so whichever um client comes ask

26:00

for an IP address it will be given an IP address inside this range. If you want

26:06

option routters, you can give the um default gateway. So with routters is the

26:14

IP address of the default gateway. Okay, if you take your phone connected to the

26:20

Wi-Fi, it configures its IP addresses, but it also configures its default

26:26

gateway. Okay, usually the default gateway

26:30

in your commercial Wi-Fi box is given is assigned the IP of the Wi-Fi box itself.

26:38

Okay, if I'm connecting to Sabiensa Wi-Fi, so the the DHCP server

26:45

um sets me a default gateway, the IP

26:49

address of the default gateway is the gateway I am connected to usually.

26:58

Okay. Then I have another subnet. I have another range,

27:03

another router. Okay. So this is the most basic configuration. Okay. You just

27:08

specify the address range. The address range.

27:16

Once you have created this file, how can you make it run at startup?

27:23

Well, you just put this line into the startup file. Okay, you go into the

27:30

command you have to run is ATC is DHCP server start. Okay, and it will

27:39

start the server in background. Okay.

27:52

Okay. So,

28:00

this is just um let's do it. Let's say

28:18

I have DCP Uh

28:25

well it's already configured. I can show you basically

28:36

again I have a router the HCP server running on an interface

28:41

the HCP server running on the other interface. Okay. So client side let's

28:48

see PC1 and let's see PC1. So if you go into PC1 ATC network and

28:56

interfaces this is the configuration of the client

29:04

again you just set up this line DHCP. Okay.

29:10

If you go into the router configuration

29:20

ATC, DHCP DHCPD.

29:24

Okay, it has this same options that I show you

29:30

before. Okay,

29:35

in the startup, let's open both of the startups. Let's

29:39

say this one and this one. So PC1 startup it just contains

29:47

networking restart. You see because we have used a network

29:53

interfaces configuration file and in kad at least we have to restart the

30:00

networking demon if we mount files. Okay,

30:06

with the router again we do the same thing and then we start the DHCP server.

30:15

Okay, we can run it.

30:36

DHCP start.

30:51

Okay. So this is a one.

30:56

Uh when a cataral terminal launches you see you can observe all of the commands

31:04

running in the startup and the relative output. Okay. So ATC networking restart

31:11

and this is the output of the command. You say ah restart is debregated blah

31:16

blah blah but it's just a warning not a problem. Then

31:22

ESCP DHCP server start. Okay. I say okay launching both IPv4 and IPv6

31:31

servers. It says okay DHCP v4.

31:37

Okay. DHCP v6 failed error because this is concerns IPv6 but we didn't configure

31:44

IPv6 so it just fails. Okay. But the DHCP for APV4 it works and it's

31:53

running. Um

31:58

okay this a client let's say the the output

32:04

of the client and you see this is all of the DHCP log.

32:11

So you see that sends discover offer request and act.

32:18

If I go into Here

32:34

I have my P addresses set up. I have my

32:44

my default gateway. Uh

32:52

that's it. Okay. And it happens automatically.

33:04

Maybe there is also the H6. Uh

33:18

there is also some ways which I don't remember now to renew your IP address.

33:23

to run the DHCP uh request again. Okay.

33:35

Um, so if you

33:55

uh if we want to try Okay. Um,

34:07

let me see. Okay. So,

34:26

um, this was DHCP You can see the screen right? Yes. So

34:35

this was DHCP and again uh an easy protocol easy to configure. Uh

34:43

it manages the automatic uh configuration of IP addresses. Okay.

34:51

We will see in the second part of the lecture the routing automatic

34:56

configuration of rooting but we will see it later for now.

35:03

Okay. Um let's try to

35:10

I mean uh to uh have uh

35:17

to to to create this lab in Kad. Okay, this is for you to I mean get a little

35:23

bit more practice let's say and uh uh let's say to simulate what a homework

35:32

will be. Okay. So in a homework you will have some router some subnets and you

35:39

will have to do some configurations. Okay. Uh now

35:46

we have done some basic stuff. So I mean you will be required to do some basic

35:52

stuff for routing and IP address assignment for the homework it will

35:57

contain everything. So uh the slides are uploaded again I

36:06

want to use this time for you to try to implement this laboratory. So this is

36:13

the topology a topology that resembles let's say a

36:18

realistic topology. So you have your PC a router a core router inside the

36:24

network and which is connected to another

36:28

network with another subnets. Okay. So these are the tasks of course create

36:35

the network soology configure the APS following these rules. Okay.

36:46

Configure the roots using the the the required say points and then

36:54

make a bucket capture. Okay. So all of the slides are uploaded on the drive. So

37:00

you should see the um the the points again. So let's try to do

37:08

it. I will as usually go around on by the desks and uh

37:15

so this is for you to understand what a typical homework of course is a very

37:21

simplified version but can be can be like.

37:26

Okay. So let me also pause the registration

37:29

for a second. Hallelujah.

38:23

Okay guys, so again the solution I'll upload the

38:27

solution. Just let me go quickly through it. Then we'll have a little break and

38:32

then we we continue. Uh okay. So create the network topology. The first task

38:41

I mean I suppose that most of you did it

38:47

uh I will upload again the file. So second task configure the IP of all

38:53

nodes using H network interfaces files. Okay. So we have to configure the IPS.

39:00

Okay. This is just refer to the IPS not to the rooting. Okay. So give two

39:05

addresses of choice to PC1 and PC2. Um

39:11

which is the highest number of PC that the subnet can host.

39:16

So we have in this subnet it is a / 24. So

39:25

all the possible addresses are from zero. 0 to 255.

39:31

However, the first and the last as we've seen in the second lecture are not

39:36

assignable. Okay.

39:39

So, the amount of hosts is the number of IP addresses. Okay. They go from

39:48

zero to 255 minus two. Okay. Um

39:57

then for SL31 subnets the lower routter number gets the lower IP addresses.

40:06

Okay. So

40:09

here uh for only SL31 subnets

40:17

that have two internet IP addresses only the SL31

40:22

subnets can be assigned the lowest and the highest addresses okay which is the

40:28

because in this subnet for example this 1000.2 to the first address is the point

40:34

2. The second address second the last address is the.3. Okay. So one gets the

40:41

2, L2 gets the.3. Then assign to S1 the highest assignable

40:50

address and to S2 the lowest assignable address.

40:55

Queen D2 S1 the highest assignable. Which number did you put?

41:03

>> Which address of S1 did you put?

41:07

>> 95.

41:08

>> 94.

41:09

>> 94. Who sets 94 or 95?

41:23

Okay. So the correct one I have to take the

41:27

calculator because I cannot do things by hand anymore. Okay. So it

41:34

starts with 64. 27.

41:57

So the highest assignable is this minus one and 94

42:03

because the highest address in the subnet it is not assignable because it

42:10

indicates the broadcast IP address. So the highest assignable is 95 minus one

42:18

is 94. Okay,

42:24

the lowest assignable is easy. You don't have to do binary things because the

42:29

lowest address is the 64 because by definition

42:34

the identifier of the subnet this 10.0.8.64

42:39

the identifier of the subnet by definition gets all of its variable bit

42:45

part to zero. So by default this is the lowest sign the lowest address but it's

42:51

not the lowest assignable address because the lowest address again it is

42:57

used to indicate the subnet. So the lowest assignable address is the lowest

43:01

plus one. So it is 65. Okay.

43:11

Okay. Then point three, configure a default

43:15

gateway route for S1 and S2 via network interfaces files. We have seen it before

43:20

how to do it. Then configure the roots L1, L2 and L3 via the startup scripts.

43:28

So configure the roots. Here we're talking about rooting. So IP root add

43:34

something. Um

43:40

the idea is that order two the idea is to not use default roots

43:47

and use the minimum amount of entries in the rooting table.

43:52

Okay. So if I go to

44:11

a crystal I missed something

44:28

So the idea

44:35

the idea is that on air two basically uh you have to add in the routing table

44:43

regarding S1 and S2 you have two subnets. Okay. So you can add two

44:48

entries, one for the subnet of S2, one for the subnet of S1.

44:53

But since these two subnets, they share the same common route, let's say, you

44:59

can group the two subnets into a single subnet. For example,

45:05

10.0.8.0/24. Okay. So if on air two you say that you

45:13

can reach 10.0.8 8.0/24 on the right. Okay, it will forward

45:22

traffic towards 03 regardless if the traffic then will be destined to S2 or

45:28

S1. Okay,

45:34

indeed here I have a little error because I forgot

45:48

tip. If you have made a mistake, you have corrected a startup, your lab is

45:55

running and you want to relaunch the lab, either you do L clean and L start

46:02

or L restart is the same. P you no.

46:26

Uh I said lowest one.

46:47

Of course, I have to check the the the I have to check the

46:54

the the file. Okay.

47:03

And so the last point actually was just to send

47:08

uh to use netcut. Okay. As we have seen in the previous lecture uh to send a

47:15

string. Okay. So you have to open a netcut listener

47:20

on a node a um

47:27

um a netcut client which connect and send

47:32

something okay then the capture is saved into the capture file

47:38

okay as we have seen in the second lecture I think

47:44

okay uh let's have a little break then we can continue later.

47:52

In the second part of the lecture we will see dynamic routting. Okay. So

48:00

um until now again we have just seen we have just seen uh static routting.

48:08

Okay where we set up rooting statically. So with a file with a script uh you can

48:15

imagine the problems that you can have uh for example scalability

48:22

when your network scales what do I mean scale it gets bigger increases in

48:27

complexity it can be difficult to configure every single router of your

48:32

network okay so you have 100 routters it's not

48:40

possible to have 100 scripts each one uh configuring the roots for a router.

48:47

What happens if in the network something changes? Okay, so given the previous

48:54

example, okay, you remember that in R2 we for we rooted we we grouped the two

49:01

subnets on the right with a / 24. Let's say that now you had a third subnet.

49:08

Maybe you have to change the the routing over two. maybe not. So it's

49:15

static routing can be a mess when your network let's say increases in

49:18

complexity. Reliability

49:22

is another problem. What do I mean by reliability? If a link goes down, okay,

49:28

if a server crashes, a power outage, someone trips into the cable and rips it

49:35

and destroys it. With static cruing the network cannot

49:41

fail over over a a redundant link. Okay. There is no automatic mechanisms of

49:49

selecting a backup path. Okay. Um

49:57

okay. So basically the first two reason scalability when your network increases

50:01

in complexity it can be difficult to maintain. reliability. What happens is

50:07

if a link or a router or both go down, what happens to the network? The network

50:13

in case of a failure should be able to reconfigure itself.

50:20

For example, I use before the word redundant. Okay,

50:28

just imagine a situation like this where you have a LAN on the left, another LAN

50:35

on the right with a gateway. Okay, and then you have two paths. Okay, to

50:41

connect the network. Okay, you can decide to use one and

50:47

leave the other as a backup path. Okay. So if that the upper router or the links

50:54

towards the upper router they fail, okay, the network automatically should

50:59

move the traffic towards the path on the bottom. Okay,

51:05

that's how internet works in reality. Okay. Uh actually the unfortunately

51:14

there was uh uh let's say the the the big scale experiment of the automatic

51:22

rooting in the internet history was in 2001

51:27

with the attack on the twin towers. So basically one of the twin towers had in

51:32

its let's say underground facilities a sort of internet exchange point. Okay.

51:39

So a lot of routters interconnecting where a noticeable portion of the

51:45

internet traffic passed back in the days and when the network when the twin

51:50

towers went down all of the networks there of course went down and so on the

51:55

internet it was observed that all the traffic was automatically migrated

52:00

towards other parts. Okay. So in the internet

52:06

all the internet is configured with dynamic routting.

52:10

Okay. To be able to um

52:16

configure itself after fails. Okay.

52:23

Um so before going into uh uh the um

52:37

routing and how we can we can configure dynamic routing in our laboratory. Uh I

52:45

just want to take a step back to say how internet is organized. How real world

52:51

internet is organized. Okay. Um so

52:57

in let's say uh in our labs we have assigned IP addresses we have we are

53:04

let's say managing routting okay so we have behaved like an autonomous system

53:11

okay so in the internet in real world internet autonomous system is an entity

53:18

which is uniquely identified by a number okay and controls a set of IP prefixes.

53:26

What do I mean prefixes, subnets? Okay. Um,

53:33

so in the internet, okay, like there are public IP addresses who control those IP

53:40

addresses. They are called autonomous systems. An autonomous systems can

53:45

control um one or more subnets.

53:51

They do not control single IP addresses, okay? They control subnets, okay? IP

53:56

prefixes. Uh give you an example

54:04

and of course the IP addresses managed by the autonomous systems. So the

54:10

information between which autonomous system manages which IP addresses, this

54:15

information is public. You can check it with a lot of online tools.

54:22

For examples, I have this one.

54:28

Uh, for example, if I type you, you see

54:38

basically when you connect to a website, it can tell you your public IP address.

54:43

Now, I'm connecting to the Sabiensa Wi-Fi.

54:47

uh say this is my address. This is the autonomous system that

54:53

possesses this IP address. Okay, this is consortium G which is the consortium for

55:03

um let's say it's a public entity in Italy

55:08

that provides connectivity to the principal universities and research

55:14

facilities and

55:17

everything. Okay, if you go into this prefixes,

55:22

you see all of these prefixes, okay, they are controlled by G, okay,

55:31

with a short description. You see, University

55:37

Roma Roma, okay, this is Sabiensa. So, Sabensa

55:44

has a full 16 network.

55:50

So, in other words, on the internet in the world, every address that starts

55:56

with 15100 is owned by Sapiensa.

56:03

Okay. So and you see each university has its own

56:08

SL16 model 16 veron6

56:13

a slash16 is big is a 65,000 something addresses okay

56:21

I mean if university were born now they maybe will get one public IP address

56:28

they for sure won't get 65,000 addresses okay uh There is that the PB4 addresses

56:34

they have finished. Okay, there are no more available addresses. Okay,

56:42

and so you see the universities that arrive to the internet first,

56:48

you see they get they 65,000 public IP addresses. Okay.

56:59

And so there are uh there are a lot. Okay.

57:17

Okay. So we have autonomous systems. Autonomous system manages IP addresses.

57:25

Okay. They manage subnets. Okay. They manage groups of IP addresses. Again,

57:29

when we talk about rooting, we do not talk about specific IP addresses.

57:35

We don't talk about specific IP address directly because they are too many. We

57:40

talk about subnets, prefixes, groups of IP addresses. Okay?

57:48

And uh how the autonomous systems gets those IP addresses? Well, it is managed

57:55

by other higher organization. There are uh usually nonprofits

58:01

organization, one for each continent. One for Africa, one for Asia, North

58:06

America, South America, Europe, okay, that they manage the the the the

58:16

IP addresses with the autonomous systems.

58:20

Why I am telling you this? Um

58:26

let's say that you are an autonomous system. Okay. Um autonomous system they

58:33

have to manage rooting in two ways. They have to manage rooting inside

58:40

the so intraas

58:44

or outside the aormous system. so-called inter aomous system.

58:52

Okay. So again imagine that the internet is composed of bubble and these bubbles

58:58

are autonomous systems. So you have two kinds of rooting. The rooting that

59:03

happens between autonomous systems. So all of the autonomous systems when they

59:08

talk to each other they need to have some common protocol standardized. And

59:13

then there is the rooting that happens inside my autonomous system. If I am an

59:19

autonomous system, no, if I am an autonomous system, my

59:27

rooting I can manage my rooting in any way that I want. I can also do static

59:34

rooting if I really want. Okay. uh

59:40

but the idea is that these are two different kinds of rooting let's say int

59:46

and inter so inside the autonomous system or outside

59:52

the autonomous system so for now we will see the

59:57

routting that happens inside the autonomous system then in the last

1:00:01

lecture of the course if we have time we will see the rooting interis

1:00:09

So this is what I was saying rooting protocol families. Okay, rooting

1:00:16

protocol we are managing dynamic routting. So we have to define a

1:00:22

protocol that different routters can talk in order to achieve dynamic

1:00:26

routting. So rooting protocols. Okay. So rooting protocol the main let's

1:00:34

say they divide into the two families that I was telling you before

1:00:39

interior gateway protocol which is intraas so the rooting that happens

1:00:45

inside the normous system or usually is BGP which is the protocol

1:00:53

that is run uh between autonomous systems. So interas for now for this

1:00:59

lecture we are going into the intraadormous system. Okay.

1:01:06

So we are here these families of rooting protocols can

1:01:11

be divided again into two parts. Okay. Distance vector

1:01:18

or link state. Okay. Uh for this lecture we will see link. So we will see link

1:01:25

state but I mean we don't uh the the main

1:01:30

functioning is the same. Uh the idea is that this family protocol

1:01:37

they built internally a map of the whole network.

1:01:45

Okay. So each node has a complete vision of all the network and then decides the

1:01:50

optimal path. And here there are many protocols. The one that we will use is

1:01:55

OPF. Okay.

1:02:01

Okay. So how it works? So again we are seeing OPF in this lecture

1:02:09

because this is an example of a rooting protocol and this is

1:02:14

easy to configure. Okay. But this is just an example. Um there are many other

1:02:20

routing protocols but for this for for our goats we will see just OPF.

1:02:28

So every router that is running SPF uh the main workings is that it

1:02:36

advertises its presence to the uh neighbors.

1:02:43

Okay, to the neighbor routers. Okay, so I am a router. I'm running OPF. The

1:02:48

first thing that I do is that I advertise my presence to all of my

1:02:52

neighbors. Okay, how can I do it? Well, I flood the network with packets. So I

1:02:59

send in broadcast all of the packets across all of my links

1:03:04

and I send this link state packet. Okay, containing information about the link.

1:03:10

Okay, so I am a router. I'm I have 10 network interfaces

1:03:16

with an Ethernet cable connected. Across all of the interfaces, I send this

1:03:22

packet. Okay, link state packets hoping that on the other side of the

1:03:28

link there will be another OPF router. Every router that listens for this LSP

1:03:36

for this link state packets takes this packet stores them into a

1:03:41

database and constructs

1:03:45

um a an internal network topology. Okay. So

1:03:54

again the idea is that the network is flooded across is flooded with this link

1:04:00

state packets. Okay. All of these packets will be collected

1:04:05

by every router. Okay. A router then has the vision has a global vision of the

1:04:12

network. So we will create on its inside a representation of the network. Okay.

1:04:22

Erh when it has there a full representation of the network it can run

1:04:26

the dystra algorithm I don't know if you have seen the dystra algorithm in the

1:04:32

second year see uh so this is where it used where it

1:04:39

is used okay well because the network can be represented as a weighted graph

1:04:44

okay where the weights have are a mixture of I don't know latency on the

1:04:49

link throughput on the link So there are some matrix okay that you can define. So

1:04:55

it can be represented as a weighted graph. If you have a weighted graph then

1:05:00

you can run dextra algorithm on it to find the optimal path the shortest path

1:05:07

between any two points that the output will be will be inserted

1:05:13

into the routters routing table. So

1:05:21

to recap, OPF works first making all routters have the same information in

1:05:26

the database by floating the network with link state packets.

1:05:31

When uh let's say a node gets its full

1:05:36

coverage of the network, it runs dextra algorithm. Okay. And then when the

1:05:44

dextra algorithm has finished it populates the run the the rooting table

1:05:48

with the result of the algorithm. Okay. And this process is done continuously.

1:05:55

There is a continuous floating of LSP packets and dyra algorithm and routing

1:06:01

table population. Why is done continuously? Well to listen for any

1:06:06

network change to check if a destination is reachable. So it is done

1:06:11

continuously. Okay.

1:06:19

So, OSPF in Linux. So, how we can implement it?

1:06:25

So, uh OPF there are different implementations. The one that we are

1:06:31

going to use is included in a software suite which is called Guag.

1:06:38

They use the animal names. The demo which implements OPF is called the

1:06:42

zebra. Okay. So uh

1:06:48

the idea is that we have to create two files. The first file is the one that I

1:06:53

am showing here. Okay. And this is located into ATC quaga demons. Okay. And

1:07:01

here you see there is a list of all possible demons and softwares that we

1:07:06

can run. Um for the moment we just say yes to zebra

1:07:16

and OSP OSPFD. Okay. So this

1:07:22

tells just that we are going to use OPF. Okay.

1:07:29

How to configure OPF? Well, we need a second file.

1:07:35

Okay. In this in this case the second file is

1:07:39

it is equal zebra.com. So in the zebra.com

1:07:45

the configuration is quite easy. Okay. Because we just

1:07:53

list the interface the interfaces we list the IP addresses of the

1:08:00

interface and we say link link detect. It means that we will be sending a link

1:08:07

state packets over that interface. Okay, we are in other words we are

1:08:14

instructing SPF to take the network interface and to

1:08:20

just link detector so to send a link state

1:08:24

packets across that link. Okay, so in this case we have four

1:08:29

network interfaces. we are sending a link state packets across all of them.

1:08:35

Maybe okay maybe sometimes you want to uh

1:08:41

send the link state on some interface and don't send it on other interfaces

1:08:46

okay maybe because some interfaces are connected to a LAN and you do not want

1:08:50

to send OPF packets onto the LAN you may want to send OPF packets only on the

1:08:56

core part of your network. Okay. Ah um third

1:09:12

a third OPF file that we need to configure. Okay. It is OPFD.com.

1:09:19

And here we conf we can configure OPF specific parameters. Okay. for example,

1:09:27

the status packets interval in seconds. Okay.

1:09:34

Uh and the area of the subets which we will see it later. But anyway, the idea

1:09:39

is that here you can specify many options. For example, uh the interval in

1:09:45

seconds in which you send the packets. Okay, here is two seconds. So a packet

1:09:49

every two seconds. Erh it ends with rud SPF

1:09:57

and here there is a declaration of network and area

1:10:02

and this declaration we will see it later for the moment just

1:10:08

these are just the networks of the uh network interfaces

1:10:14

area again we will see it later okay let's make an example

1:10:24

uh I have created configured this lab with

1:10:30

a PC another PC some routters and this is already configured with OPF

1:10:38

I think it's already uploaded in the drive but you don't need to download it

1:10:42

this is just to to show you um

1:10:47

you see that the network has a red has a two links okay so From air one to four,

1:10:53

you can go either up towards two or down towards her three.

1:11:00

Let's launch the lab. So the laboratory in the drive in case

1:11:14

you want to run it is called labf small. So, OPF is a protocol

1:11:25

is a protocol that needs the network to be flooded with link state packets. This

1:11:30

process takes time. Okay, this a takes a little bit of time because every router

1:11:35

should be able to listen to all the packets and compute the the resulting

1:11:41

compute the result. What I'm saying is that when you start the laboratory,

1:11:47

you will have to wait a bit for OPF to converge. Okay? Because now you see the

1:11:53

laboratory is launched. But if I go to IP root show,

1:12:04

nothing is happening. Okay. My routing table is not being changed. I

1:12:11

mean has not been already changed because OPF is running and it needs some

1:12:16

time to converge because to to change all of the buggets.

1:12:20

Let's run the command again. Still no

1:12:25

because it takes some time. So in this time the routters are

1:12:32

exchanging these packets. Okay. Ah, we have one route that showed up.

1:12:41

Okay, this is new, you see, and I see zebra.

1:12:47

The the routing table is keeping track of

1:12:51

the origin of the entry. So, it's telling me that this entry came from

1:12:56

zebra. Let's run the command again.

1:13:01

You see this is my routing table.

1:13:08

and it's being populated by this

1:13:15

specifically. Let's see this entry. This 1010.0.2

1:13:22

let's go back to the to the this. So the 1010

1:13:28

however what.2.0 is this network right here on the right.

1:13:36

We are one. How can we reach the subnet on the right, the subnet of PC2? Well,

1:13:42

we can see that there are two path either by going towards R2 or going

1:13:46

towards R3. Okay. And so if we go to the rooting

1:13:51

table, we see that um 10.10.2.0/24 can be reached either by next stop via

1:14:02

10.0.1.1 0.1.1 or by 10.0.2.1

1:14:08

and these are the addresses of air 2 and3.

1:14:15

Okay, make sense coy.

1:14:24

So we are in one and the destination subnet is 10.10.2.0

1:14:31

zero and we can reach it either by going VR1 sorry VR2 or VR3.

1:14:39

So either we have that 1010.2.0 is reachable via 10.0.1

1:14:48

or via 10.0.2.1 either two or three.

1:14:54

Okay. So uh

1:15:01

by default only one entry will be used. Okay.

1:15:09

Um actually one thing that I didn't show

1:15:12

you if you type in this command

1:15:20

you can access the OPF console. Of course, you have to be on a router that

1:15:25

runs OPF tetd.

1:15:35

If it requires a password, it's written in the files of the lab.

1:15:49

Enable password z. So zebra is the password.

1:15:56

Okay. I am in the console that manages the OPF process. Okay. Here I can

1:16:06

see different things. For example, these comments are reported in the

1:16:16

second slide. OSPF root.

1:16:29

You see these are the entries that WPF is aware of. So first of all

1:16:37

you see I am in one. Okay. So I see that there are two networks to which sorry

1:16:45

three networks to which I am directly attached. Okay. I have three network

1:16:50

interfaces. I'm attached to the three different networks. The number that you

1:16:54

see right here is the cost of reaching the network. By default, SPF assigns a

1:17:00

cost of 10 to each hop. Okay? So, I'm directly attached. So, the cost is 10.

1:17:09

This network right here, it takes one intermediate hop to reach it. Okay? So,

1:17:14

the cost is 20. This thing right here which is the

1:17:19

network of PC2. So the rightmost network inter the rightmost subnet

1:17:25

has a cost of 30 because from one I have to go either

1:17:31

towards two or three then to four. Okay. So it's two hops.

1:17:40

Okay. Okay. Um

1:17:50

so this cost has no let's say um uh physical meaning.

1:17:59

Okay. The cost is just a number which is greater than zero.

1:18:04

The idea is that a path with a lower cost is preferred over a path with a

1:18:08

higher cost. I mean the 10 is not related to anything

1:18:15

actually. Uh it was originally for the link speed. Okay. When we had connection

1:18:22

of 1 kilobit one megabit and so you have cost of 10 one 100 but now let's say all

1:18:29

of the costs are by default set to 10. Um,

1:18:35

if we want, we can set up a manual cost for a link. For example, here the link

1:18:44

between R34. So, this link right here, this 10.0.4.0/31,

1:18:53

we can set up it to have a cost of 100. Why is that?

1:19:00

So if we have here a cost of 100, we are telling to the SPF to not use this path

1:19:08

but to use the upper part. But if the upper part fails because link

1:19:16

will is broken a network is broken then it will be used the second part. So in

1:19:23

other words what we are doing is that we are creating a backup path. So we'll be

1:19:28

always using the upper path if it works. If it doesn't work because of crashes,

1:19:35

whatever it will use the path below. Okay,

1:19:41

let me close this and also this lab is on the uh drive. It

1:19:57

is the same as before but on earth three air4 there is a cost of 100 and it is in

1:20:04

ospd.com. So if I go to

1:20:14

uh the

1:20:25

okay in the options of WPFD I say ah look the link on this interface

1:20:32

set it a cost manual cost of 100 that's the only modification that there is

1:20:38

between the previous lab and this. If I start the lab

1:20:51

again, we have to wait a little bit for all of the things to converge.

1:21:12

Okay. So, we have to wait a little bit.

1:21:21

Usually some seconds. So, now I'm just running this command

1:21:29

every second. So, it will eventually change.

1:21:37

Okay, you see that I have

1:21:43

it has been converged. Let me see 10.2.0. Yes.

1:21:50

So if it has converged from PC1, I can ping PC2 10 to 100.

1:22:00

ping 10 10 100. So from PC1 and ping in PC2 it works.

1:22:07

Let's go to R1. You see that now R1 has just one entry

1:22:17

into the routing table as one entry in the routing table for

1:22:23

the rightmost interface. Okay, it is not no longer a choice. Okay, because we

1:22:30

have set up a manual cost. It means that in the ring table there will be just the

1:22:35

entry with the lower cost. We can check it in the OPF console if we want.

1:22:56

Yes.

1:23:00

>> Oops. Show IP uh

1:23:14

P root O SPF. Uh I don't remember never remember the

1:23:19

commands by memory. PSPF root So

1:23:31

you see I have this entry 1010.2.0. Okay.

1:23:43

And then I have a cost of 110 for this entry right here.

1:23:51

Okay. So

1:23:54

the ping is still going. Let's try to simulate a fail.

1:24:01

Okay. So what do I mean? Now the the ping packets are going from PC1 to1 and

1:24:07

then they are choosing the path above towards two. Let's try to kill a link.

1:24:13

So let's try to I don't know go on F4 and delete this

1:24:20

link right here. Okay, how we we can do it? Well, with IP link in the first

1:24:26

lecture, I think we have seen it. We can turn off a uh a network interface to

1:24:33

simulate a fail. Okay. So, wind and let's go to F4.

1:24:43

We leave the ping go the bing going. I think we have to crash at0

1:24:59

because the address is 10.03.1. Yes. So we crash at0

1:25:09

which is IP link set at set dev at0 down.

1:25:19

We press enter. We press enter. And from the point of

1:25:27

view of the um the bing, it didn't change anything. Okay.

1:25:36

Let's go to one and you see it has changed. Now the

1:25:44

network here has a cost of 120 and now the packets are doing the path

1:25:54

below. Okay. So you see that we had a fail and

1:25:59

immediately the network changes. Okay, the immediate network adapts.

1:26:07

We can see it also without with without the ping but with a trace route.

1:26:16

So from PC1 this is one then we go down

1:26:26

to three. Yes, this is the address over three4

1:26:31

MP and PC2. If we

1:26:36

put it up again and we wait a little bit,

1:26:44

you see the third op has changed. Before we have 10.0.4.1

1:26:52

and now we have 10.0.3.1 0.3.1 because we have we have chosen the different

1:26:57

path. Okay.

1:27:01

And if you Yes.

1:27:08

>> So both of them.

1:27:11

>> No. Okay. But he keep the same weight on Junique or

1:27:17

try to uh

1:27:29

we have to crash also at one. So in this case nothing works because we

1:27:36

have crashing both of the interfaces. Oh, we are crashing also our backup

1:27:42

link. Yes, it kept the last one I think active

1:27:48

but okay.

1:28:01

Okay. So, last thing uh so this is more or less how SPF works. Oh, OPF is a

1:28:11

uh easy to configure. The defect is that

1:28:22

the um the network is floated

1:28:30

with link state buckets. Okay. So if you have a big network, you

1:28:36

will have a lot of link state packets that will run around your network. Okay,

1:28:42

the positive thing is fast convergence. Okay, if there is a change, every node

1:28:49

already knows the full topology of the network. It runs the Dyster algorithm in

1:28:55

some milliseconds and uh you see that immediately can

1:29:01

adapt to the new network condition. Okay. But with OPF you can manage pretty

1:29:13

complex networks. Okay. uh with OPF if you have a very complex

1:29:22

network you can even use the concept of area on SPF area and

1:29:30

the areas are used to logically divide ring domains. Okay. So the idea is that

1:29:40

uh if I have a complex network, I may want that a router doesn't know

1:29:48

necessarily all of the rooting happening in another section of the network. I

1:29:53

want that the router knows that the full gateway is it neighbors and then the

1:29:58

neighbor will manage the rest. Okay. Uh so the idea is that again the routers

1:30:05

belong different areas. They may not know the entire network topology

1:30:11

again because if there is a big network there will be link state packets that

1:30:15

will go around and around. Uh they just use the area border router as

1:30:22

gateway. The area border router is the router that sits across two different

1:30:27

areas. Okay. areas in OPF are identified with OEX

1:30:34

okay like IP addresses but they are not IP address the notation is the same but

1:30:39

they are not IP addresses the default area

1:30:44

is the 0.0.0 zero which is called the backbone area. Okay.

1:30:52

So let's consider this lab. Okay.

1:30:58

Uh where I have a P the four areas the one area one let's say area two three

1:31:05

and zero. And I have some routters with some PCs and a backbone area where there

1:31:12

are a lot of routters interconnected with each other.

1:31:16

This resembles the architecture of modern internet. Let's say you have

1:31:22

different networks with this the routters and then a core area with all

1:31:28

of the rooting all of the routters connected.

1:31:36

Okay, let's try to launch it. Let me close this.

1:31:59

So now the networks are becoming to are starting to become complex because

1:32:06

now we have 12 devices. So we have 12 terminals, 12 windows. Okay,

1:32:16

it's a lot of windows. So,

1:32:20

starting to become complex. Again, if you do not want all of the windows, if

1:32:26

you type L start with these options, no terminals, it will run the laboratory,

1:32:32

it will do not pop up all of the terminals.

1:32:36

Okay, so it's cleaner.

1:32:41

Let me go just to air two so I can show you.

1:33:12

And so you see the configuration is again all in ospd.com.

1:33:18

R2 is a border router because it sits between the backbone area the 0000 and

1:33:27

the area two let's say. Okay. And you see that it has some network

1:33:33

advertised in the backbone area and then a network

1:33:40

advertised in the area 2.2.2. Okay.

1:33:46

Um if we go to

1:34:03

We take also R six. Okay. So,

1:34:19

router number two is in the core in the backbone. So it has basically it sees

1:34:27

basically everything. So this is the routing table of all the entries

1:34:33

populated by USPF. You see for each entry it has multiple

1:34:38

next stops. Okay. So it has complete vision of

1:34:43

everything on six. Okay. R6

1:34:51

10. 1.0. 0.107 no 16 Okay

1:35:04

7. Okay. So router six. Okay. That sits in

1:35:19

the area to this is router six. it doesn't know anything about all of the

1:35:24

rooting above because it is informed by the routter two that basically all of

1:35:31

the roots can be accessed by him. So if we go to the rooting table of six

1:35:41

this is our six and you see that this is the P address of R2 so that this address

1:35:47

can be reached by R2. This address can be reached by R2. This address can be

1:35:51

reached by air2. Okay.

1:35:55

And these are all set up automatically by the braso by OPF.

1:36:05

Okay. So I think we have finished.

1:36:12

Uh next Friday you will receive confirmation on Monday but next Friday

1:36:18

there will be professor Marco Bulverini also but on Monday he will tell

1:36:25

confirmation and so we will see each other not on the

1:36:30

next Friday but on the next next Friday when we will do some start to do some

1:36:35

VPN configurations.

1:36:39

Bye guys.