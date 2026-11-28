  
recording.mp4

Gemini

0:01/2:34:40

## 

Trascrizione

0:06

Okay. Um,

0:19

if I presented the slide like so at home, you can see the

0:24

share screen with the presentation. You see I'm going

0:30

showing some slides. Yes. Yes. Yes. Yes. Perfect.

0:41

>> Okay. Okay. So for today our laboratory we see

0:53

some uh firewalls. So um we will see what a firewall is. We will see how to

1:01

configure it and we will see let's say some interesting

1:06

applications. Uh firewalls some of you may have may know already

1:12

what it is. Some of you may have already used it.

1:18

They seem to be like a simple entities. Okay. But we will see that there are

1:24

some things to consider at least to understand.

1:29

Um we are going to

1:34

uh let's say uh configure to understand these firewalls in Linux using if tables

1:43

which we will get to it in a second. Okay. So what a firewall is? So a

1:52

firewall is a software that let's say uh provides the administrator.

2:01

So provides you some way to monitor, control and filter and also modify the

2:09

packets that are going uh through the firewall itself. Okay. So

2:15

usually um if you place so um a firewall is a software a software element okay

2:24

uh there are also specialized firewall the hardware firewalls okay like

2:29

physical blocks that you can put but let's say a firewall is is a software

2:35

so this software you can put it uh be inside a connection let's say let's say

2:41

that you have a link and you want to protect that link Okay, with a firewall

2:45

uh a firewall let's say uh its basic usage is to filter in and out the

2:51

connections like accept this connection or do not accept this connection. This

2:56

is a filtering operation. So filtering is accept do not accept. Uh a firewall

3:03

provides you also to do some more um advanced things. Let's say it provides

3:10

you to with capability to monitor the connection to modify

3:16

the packets going through the connections. For example, you have the

3:20

packets going through the firewall. You do not want to limit yourself to accept

3:26

or do not accept. You may want also to modify the packets that are going

3:31

through. You want to change the IP address. You want to change the port

3:36

topic. Um,

3:42

it does all of these operation all of these operations based on

3:47

traffic rules that you that you write that you select. As an example,

3:54

um, you want that specific TCP or UDP

3:59

connections on some specific port gets blocked. So you have this intent, you

4:05

have this thing that you want to do, you can configure this rule in a firewall

4:10

and the firewall will um will apply. Um

4:18

there are also some advanced fire rules that for example include constraints on

4:24

the traffic rate for example for limiting this um denial of services. you

4:30

can put in your file for look if this connection is doing more than uh 10

4:36

gigabits per second just kill it I don't want to accept it

4:43

usually firewalls they reside into the kernel for performance reasons okay

4:49

um I mean this is just how computer works if you have your computer there is

4:55

your network interface your network interface is governed by

4:59

the kernel Okay. So when the packets arrive directly to your network

5:05

interface, the kernel itself before sending the

5:09

packet to user space already applies the firewall rules.

5:15

Okay. So um

5:21

we are going to use a um firewall software that is called EP tableables.

5:27

Okay. which is the most famous uh

5:33

sort of implementation in Linux. Um so just two distinction to let's say

5:40

to to clarify the the names uh there exists net filter

5:46

and EP tables. So net filter in Linux we are not going to use it but

5:52

this is just for completeness just to let you guys understand

5:57

is the framework that provides inside the Linux kernel the hooks and the

6:03

functions for which you can program a firewall. Okay. So net filter is the uh

6:12

lowlevel kernel thing that implements the firewall. Okay. We are not going to

6:19

touch the kernel. We are going to use EP tables which is just a user space

6:24

utility which interacts with net filter. This is just to let you guys understand

6:30

that the big thing is net filter which is on the core of Linux and then you can

6:38

interact with net filter with many many many in many many many ways. One of them

6:43

is EP tables which we are going to use. Okay.

6:48

Uh so now we are going to talk about TP tables from now on but keep in mind that

6:55

these are the facilities offered by net filter. Okay. So

7:02

um parenthesis in uh in the real world nobody uses uh I mean in production

7:08

nobody uses EP tables because EP tables is uh how do I say uh is nonforgiving

7:16

okay if you make a mistake for example you are adding some firewall

7:23

rules to drop TCP connections on some ports

7:28

if you cut out your own connections, you're out. Okay, a couple of times I

7:34

did this error and I I have cut myself out from the server to which I was

7:40

connecting to. So these things happen. So AP tables is the a low-level thing.

7:47

It's not forgiving. So in production uh nobody uses EP tables. There are many

7:54

many implementations but but the majority of them uses net filter. So it

8:01

means that the thing that we are going to um configure with the p tables are

8:08

valid for every um firewall let's say out there.

8:17

Um okay here we can already see some uh

8:24

examples. Um so what happens? EP tables enables

8:30

the user to manage net filter. Again we are going to we we are always going to

8:37

say EP tables but remember that below there is uh there is net filter. with

8:42

the pit tables we can manage uh so-called hooks so entry point in the

8:50

Linux kernel to call our firewall to do our operations.

8:56

Um the idea when you specify a firewall

9:01

rule there are two pieces of information let's say

9:06

um there is a matching rule and there is a configured action okay so you have to

9:14

specify first to which packet you are referring to

9:20

okay what do I mean to which packet you are referring to it's a matching rule so

9:25

you. There are many ways to specify packets to which you are interested. For

9:29

example, I'm interested in TCP packets on port 22. I'm interested on UDP

9:35

packets port 53. I don't know. It's a matching rule.

9:43

I'm interested in packets coming from the subnet 192 168 whatever

9:50

when you understand this matching rule. So with

9:54

all the packets that match this matching rule, they are processed by an action

10:00

this parting grid a configured action. Um

10:06

and the actions the common actions are for example accept

10:10

drop uh reject which is a kind of drop. We

10:15

will see it and and there are also some advanced actions that we will see in a

10:20

second. For example,

10:24

um here you can already see ah one thing I forgot if from home I

10:31

cannot see the zoom chat. So please you have to unmute yourself if you want to u

10:36

make any question. Um

10:40

for example uh you want accept packets of TCP port

10:46

22 coming from interface at one. So you see in red is the matching part in green

10:52

is the action that you want to take. Okay. And this is how you can write it

10:59

in EP tables. It looks a little bit convoluted and we will see what are all

11:06

of these parts but

11:10

I mean we can see all the informations let's say. So in the matching rule we

11:16

have TCP port 22. So we kind of see TCP destination port 22 interface ATT1 we

11:24

see an ATH1 and we see an accept. Okay, again we will see in a second how to

11:31

write these commands. These are just examples that just to let you guys

11:35

understand. Um

11:41

this is another example. We want to drop packets which are rooted to subnet to a

11:47

specific subnet. Okay. So we see the specific subnet. We see the drop action.

11:53

Okay. Um so we have seen accept drop. These

12:02

are the basic operations of a firewall. A firewall can also be used to modify

12:07

passing packets. Okay. For example, we are interested in redirecting packets

12:15

of TCP which are directed to the local port 80

12:19

and we want to redirect them to port 8080.

12:23

This is a common usage of a value. Okay, changing the destination port and this

12:28

can be done as well. Okay, again the syntax of the command we will see it

12:33

later. uh

12:37

but for the moment you observe that there is a TCP there is

12:43

a destination port and there is the redirect to myself port 8080. Okay.

12:56

Okay. So this is the uh idea. Um

13:05

so you see so let's start to understand how EP tables works. So let's see the

13:12

syntax of the command. It is written EP tables. I mean it starts with EP tables.

13:17

EP tables is the name of the command and then there is something. Okay. So the

13:23

idea is that the first thing you write is the matching rule and then the action

13:31

uh is let's say the last one uh the action starts with this dash j okay so

13:39

you can see that here there is this - j accept below there is this - j drop and

13:47

below here there is this - jd dn to destination which is basically a

13:51

redirect which we will see in a second. So the thing after J is the action

13:59

and before you have to write the matching rule. Okay. And so for example,

14:04

let's see the first example. We have TCP port 22 coming from interface ATH1. And

14:10

so you see TCP port 22 interface ADH1 more or less.

14:17

There is this strange thing. Okay. There is this input. Where is this input?

14:23

Okay. If you see on the second example there

14:26

is this forward and then on third example preloading

14:31

what is this uh the idea

14:38

uh for how EP tables and net filter is uh built

14:44

you have to tell EP tables where to place the firewall.

14:52

So what do I mean? Uh it means that when a packet arrives to your network

14:57

interfaces, it let's say go through a lot of

15:03

processing, a lot of different steps of processing and different steps you can

15:08

decide to apply the firewall. You may want to apply the firewall whenever the

15:13

packet is arrived to your network interface. You may want to apply your

15:18

firewall after the bugget was rooted or before the bugget was rooted.

15:24

There are many options which we will see.

15:27

So this organization in EP tables is done via tables and chains

15:38

EP tables. Okay. Um

15:43

so this is the organization that is behind um

15:48

behind EP tables. The idea is that the thing you write

15:53

so these commands that you write EP tables

15:58

etc. these are the rules. So you you have your what the thing that you write

16:04

are the rules. Okay. The rules in EP tables are contained

16:12

into chains. Okay. And the chains are contained in

16:16

two tables. Okay. So you write the rule that you

16:21

have to specify to which chain um in which chain you have to place your rule

16:28

and then the chain to which table it belongs. This is just a nomenclatur.

16:35

Okay. Um but the idea of this organization is

16:40

for the thing I was anticipating you before is that when a packet goes

16:46

through a firewall okay it assumes several states okay

16:51

um what do I mean several states it means that the the the kernel on the

16:58

packets it does a lot of different operations okay so it assumes different

17:03

states inside the networking stack Okay, for example, state packet

17:10

reception or before rooting takes place or packet directed to local host packet

17:16

directed elsewhere after rooting takes place. Okay, so there are many

17:22

uh states that can be verified that can

17:26

happen inside the Linux networking stack.

17:30

Okay. Uh so the idea is that in each one of these states you can put your

17:40

firewall rules. Okay. So in each one of these states EP tables calls different

17:46

tables and chains. Okay. It tries to match all the roots in

17:52

the chain in sequential order. The idea is that um

17:59

there are some firewall operations that um make sense to perform in a certain

18:07

state of your packet. Some other operations make sense to operate in

18:13

another state uh of the networking stack.

18:18

Um we will see it in a second.

18:24

So this is the not the full but it's

18:31

let's say um good summarization of the flow of a

18:38

packet inside the EP tables.

18:43

Okay. So the idea is that every I don't know if you can read it. Uh the slides

18:51

are any way on model and if you want also to connect to the stream you can

18:54

you can zoom on it. The idea is that every

18:59

um square let's say okay it has you can see it has two words inside it. So the

19:07

first in um say small letters is the table name

19:15

and the one in capital letters is the chain name. Okay.

19:22

Um and the table name you see that they are

19:25

colored the same. Okay. So you have the the filter which is green,

19:33

the nut which is violet.

19:37

Okay. Um

19:42

and so you see that this is a flowchart. Okay. So you have on top there is an

19:47

incoming packet or a locally generated packet. So it means that you start from

19:53

here from here and you see there are some options that you can go through.

19:59

For example um

20:05

let's say that you are a server and you received packet

20:11

that are destined to to you. Okay. So you are a server incoming packet. Okay.

20:17

So you start this flowchart from here and basically

20:22

you follow this route. You go through this this table and chain

20:28

this table and chain. Um

20:33

local host is the source. Yes or no? Well, if you are a server probably not.

20:38

So you're going to know it is for this host. Yes. And so you arrive at the end.

20:44

The idea is that whenever you cross this path

20:49

in each and every step a tables is calling firewall rules.

20:54

Okay. So in other words in every rectangle you can specify your own

21:00

firewall rule. Okay.

21:04

And whenever the packet assumes one of these states, one of these states inside

21:09

one of these rectangles, a firewall rule uh let's say the firewall rules inside

21:16

this table and chains are called. Okay. Um so again this rectangles this these

21:27

chains these tables and chains okay you can put

21:31

your firewall rules inside it. And whenever a packet goes through let's say

21:38

this state these chains and tables uh let's say the roots inside these chains

21:45

and tables are called okay and are tried to match to the packets flowing through

21:51

okay so in other words let's stick to this example

21:59

if you place you can see my mouse Yes, if you place your firewall rule here,

22:08

it gets called. Okay, then we have to see if the the rule

22:15

matches. Okay, if the the the the the firewall rule

22:20

matches. But anyway, it is called. So, it is try to match. If you put your

22:25

firewall rule for example here, the forward chain in this case, it won't get

22:31

called. Okay, because the packet do not assumes this state

22:36

into the the the the networking stack.

22:41

Okay, so you have to be careful where to place the your rule.

22:47

Another example, uh before you were a server, now we are

22:52

let's say a client send a packet generated by me.

22:57

So you start the flowchart this time from the right which is where it's

23:01

written locally generated packet and so your packet performs all of these

23:07

assumes all of these states and so a p tables calls all of the rules inside all

23:12

of these tables and chains blah blah blah

23:18

is the destination yes or no well no you go here a good packet

23:25

Okay. So if you put your firewall rules inside this for example filter output it

23:34

would have been called. The rules inside input are not get called.

23:45

Um another example

23:50

before we were a server then a client now we are a router. What does a router

23:56

do? Basically, it takes a packet arriving from somewhere and roots the

24:01

packet sending it to somewhere else. Okay. So, it is neither the source of

24:08

the bucket neither the final destination of the bucket. It is just an

24:13

intermediate. So, you start from the flowchart from

24:17

the left. It's an incoming packet. Is local the source? No. For this host? No.

24:23

There goes the bucket. If I am a router, say the bucket goes to another final

24:29

destination. So you going to know and finally outgoing bucket.

24:37

Okay. Um

24:46

Okay. So this is the idea. I know that it may look so a little bit convoluted

24:54

but the thing is that these things are complex and again it makes sense to

24:59

apply some firewall rules when a packet assume a certain state

25:06

and okay so

25:11

um let's start to see the syntax of the command how we and

25:19

do it. This we will see it in a second. Okay.

25:29

Tables. So there are many tables. We just are

25:36

going to use the first two I've written few slides ago. We are just going to use

25:41

filter and not and there but there exist also mangle

25:46

and row. So filter is the default table which performs operations

25:55

let's say the basics of operations of a firewall which are accept a connection

26:00

or drop a connection okay accept packets or drop packets. So filter is the

26:08

default table and built in it contains the chains

26:14

input forward and output. Again in tables you write your rules

26:23

inside the chains. The chains are contained into the tables. Okay. So

26:28

tables are logical connect uh logical collection of chains.

26:36

Okay. Um

26:40

the filter table contains the chains input forward and output.

26:46

Let us go back to the so the idea is that this chains input is

26:54

applied for packets destined to me forward is a chain used to uh

27:05

considering packets which are rooted so that arrive

27:10

from a destination and I have to redirect them towards the the final

27:15

destination of the bucket. and then output

27:21

for locally generated packets. Okay, so let's go back to this

27:27

flowchart. You see in green there is our filter table.

27:33

You see in green there is filter input,

27:38

filter forward, filter output. Okay. So the first example we were let's say

27:47

we were a destination of a packet and if we do the flowchart we see that we go

27:54

through the filter input. We go through only the filter input. We

28:00

do not go through the filter forward or filter output.

28:05

Okay. It means that if we want to apply a firewall rule on input packets,

28:14

you want to apply let's say a accept or drop

28:18

firewall rule on packets listening by me I have to apply I have to insert my

28:24

firewall rules inside the filter input. If I w my rule inside filter forward or

28:30

filter output they do not get called. Okay,

28:39

if I am a router, I see that I only pass through filter

28:45

forward. So if I want to accept or drop packets,

28:51

I need to write my inside the forward. Okay.

29:03

So filter the filter table provides you

29:09

with accept and drop operations. So accept packets. So let the packet go

29:15

through or stop the buckets. Okay. So filtering and you can apply your

29:21

filtering in these three different occasions. Okay. Whether you are the

29:27

final destination. So the the packets um are destined to you apply onto input.

29:37

If you are the source of the packets you apply onto output. If you are just

29:43

forwarding packet you apply on to forward.

29:48

So this is the first table that we are going to use. The second and only table

29:53

that we are going to use. Second and last table that we're going to use is

29:56

the uh

30:00

nut. Okay. So we are going to use we will see

30:06

the nut later but we are going to use the nut to

30:10

make some redirections of the buckets. We will use the not to modify

30:17

source and destination IP addresses, source and destination TCP or UDP ports.

30:23

So to modify this um this these fields let's say and we

30:31

can decide to act basically we are going to use pre-rooting and postrooting

30:36

chain. So we are going to act either before the rooting takes place into the

30:43

rooting table or after the rooting takes place.

30:48

Okay. Um

30:53

for example you want to do a redirection of the of a packet.

30:58

Uh so let's say that it was destined to an IP address 192 168 whatever and you

31:05

want to redirect that packet to 10.00 000.5.

31:10

Okay, you want to apply this rule onto the pre-rooting table. Pre-Rooting means

31:17

that before the rooting takes place. The idea is that you see the bucket, you

31:22

change the P address before the routing takes place and then after the routing

31:27

takes place, the bucket is directed towards the redirected destination.

31:35

uh you may also want to apply on the post routting. Okay, so after the

31:41

routing takes place for example here you can change source and

31:47

destination ports. Okay. So you have a bucket you route the bucket towards

31:55

192 168 whatever and then after the routing takes place

32:00

you can say ah okay I want to change um the uh port I want to change the source

32:09

IP address. Okay we will see examples later.

32:16

So we are going to use only filter and not this mangle and row are reported

32:21

there only for completeness just for information.

32:25

Uh remember that filter gives you capabilities to accept packets or drop

32:32

packets. So filter in and out buckets and that

32:38

provides you to do some um modifications of the IP address directions,

32:46

modifications of the ports, source and destination ports.

32:51

And in the filter you can you can operate you can write your firewall

32:55

rules either for input forward and output. So either if you are the local

33:02

if you are the destination of the packet you are the source of the packet or you

33:06

are just an intermediate and not you can apply the rules we we

33:12

are not going to use output in the not we're going to write our rules

33:17

pre-rooting and impost routting so before the root takes place or after the

33:21

rooting takes place I know that it's a lot of things to

33:28

explain But uh when we are going to do the practical part, I hope it's

33:34

going to be clearer. Um

33:46

again we are going not going to use mango. Let me do this.

33:55

Okay. So this is just a recap of the um previous slides.

34:04

Okay. So either this is the QE type it means the table name filter or not the

34:12

function packet filtering not stands for network address

34:17

translation filter uh applies can be applied into

34:23

these three chains. forward filter packets uh to servers accessible by

34:30

another nick on the firewall. It means that you either neither the source nor

34:35

the destination of the packets input filter packets destined to me output

34:41

filters packet uh generated by me and then there is not applying on pre uh

34:49

pre-rooting and postrooting chains. So address translation that occurs

34:55

before rooting or address translation that occurs after rooting.

35:03

Okay. So let me go back to our examples.

35:11

Okay. So the table and chains are the first part of the commands of a repeat

35:20

table command. Okay. So you see input and forward.

35:28

So you specify a um a chain like this. Um

35:37

you uh this inputed forward. Okay. These are

35:42

the chains um for the filter table. Okay. the fe

35:49

the the table you specify the table with this option dash t if you do not specify

35:54

the option dash t by default it uses the filter table so this command eps

36:02

input will be the same if you write tables dasht filter

36:08

input okay if you do not see a dash t it means that by default it will use it is

36:15

using the filter 30 and then the chain you see this here is

36:21

the input and here is the forward. Okay. So here you are tell the first

36:28

part of the vanity table command is telling where to place your firewall

36:34

rule. For example in this third example you are specifying the table not chain

36:42

ruging. Right.

36:47

Um there is this option also dash A.

36:54

We will see it in a second. Dash A it means append. We will see that rules

36:59

have an order and they are applied in order. We will see it in a second. So if

37:05

you run this command right here, you are specifying the input chain of

37:10

the filter rule. So this first rule will be put into the input chain

37:19

will be put there.

37:23

Okay. The second in the second uh example

37:32

would be put in the forward. Okay. and then the cert.

37:40

Um okay. So this consider just this uh these

37:50

first three examples.

37:57

These are commands to append, delete or insert rules. Okay. So P tables D table

38:06

again this is optional if you do not specify it it will be DD filter

38:11

and then you have your A to append

38:19

append means add to the bottom. So this chains are lists of rule. So this list

38:25

you can either append your rule on below with append this dash a you can put your

38:31

rule on the top of your list which is dash i insert or delete it.

38:41

Okay. So you have these options A B I

38:47

chain name this will be your input forward reing throughing whatever

38:56

and then the the rule that we will see. Okay. So all of these explanations that

39:07

just to understand where to place your firewall

39:14

rule. Okay, we have not not talked about the matching

39:20

rule and the decided action. We just this was just to understand where to

39:26

place our rule. Let's talk about the matching rule

39:35

and again these are not that difficult. These are

39:41

just some examples of let's say how you can write a matching rule. Okay. So you

39:50

can you have different options. You can

39:55

specify, you can match packets by protocol, by source address, by

40:01

destination address, by interface in, by interface out.

40:09

Okay. So you are interested in uh TCP packets port 22 coming from interface

40:17

number zero or you are interested in UDP ports UDP packets

40:24

coming from 192 168 on some specific port on some specific interface.

40:30

So it depend on your use case. You do not have to specify all of them but you

40:36

can but by combining all of these specifications

40:42

okay you construct your mesh rule um

40:50

and basically the the rule will be the logical end of all of these rules. So if

40:56

you write TCP as protoable and port 22, it will match only packets that that

41:03

have both TCP and and port 22. Okay,

41:11

the syntax of the com and this is the the matching rule part.

41:16

So this the AP table command starts with EP

41:21

tables the chain and table specification and

41:25

this is the meshing rule. So these are options that you can add to the command.

41:32

So protocol is -p. So this is the short version equal to

41:39

dash protocol and then protocol name. I mean we're

41:44

going to use just TCP or UDP but there is there are a lot of protocol

41:51

that you can decide. There is ICMP uh SPH which are IP sec

41:59

is the ping. So you may want to restrict the pings for whatever reason. Okay.

42:07

So dp proto um

42:12

you see that in every um option there is a question not

42:19

question sorry there is an exclamation mark.

42:23

This is the negation. Okay. So you want to

42:30

match all the packets except from TCP. You write negation protool TCP.

42:41

You want to match all of the bugs except for the one

42:46

coming from 192 168 whatever negation.

42:52

Okay. If you there are some use cases that

42:58

I mean if it's useful to mesh everything but something.

43:05

Okay, this was the protocol source. Okay, this is the source. It can either

43:11

be an address, so a specific address 192 168.13

43:18

for example, or it can be a um

43:24

network with the net mask. Okay. So you can specify

43:30

the a specific address or a subnet. Okay. And this is the source. So you are

43:38

taking the IP you are taking the packet you are seeing the source IP address and

43:43

you can match that source IP address either with a specific

43:48

address or with a subnet. Okay.

43:56

Same thing applies with this dd destination address. So you take the

44:01

packet and you see the destination uh IP address.

44:09

Um and then you you can also want if you

44:18

want you can specify also the ports the interface names. Okay. And you can

44:25

specify either the interface name input or the interface name in output.

44:32

What do I mean? It means that um uh

44:38

if you are receiving a packet you have to specify the in interface. It means

44:44

where the packet was received. Okay. Out interface it means where the packet will

44:50

be sent. Of course in interface and out interface

44:57

will not be available every time

45:03

if you are a router. So if you are in the forward chain yes in the forward

45:08

chain you have your input and out interface. You're a router so your

45:14

packet comes into an interface and goes out to another interface. So you have

45:19

either input and output. If you are if you have the final

45:25

destination of the bucket, you have just an input interface

45:31

because you just receive a bucket and that's the final destination. It's not

45:35

rooted and send on the interface. Okay. Same thing applies in the input.

45:42

Sorry. Same thing applies to the uh output. If you locally generate a

45:48

packet, you do not have an in interface. You only have an out interface.

45:56

Okay. So these are some basic matching rules. There are also some other we will

46:01

see it later. But this is the the idea.

46:10

Um these are instead some basic

46:20

uh targets. So some basic actions that you can do on packet that were matched

46:27

by the matching rules. By the way, uh these are the this is the the the

46:33

components of a matching rule. EP tables applies. So tries to match the packet

46:40

tries to match let's say this rule on every packet every single packet. Okay.

46:47

So just imagine a router that switches 100 gigabits per second. Every packet

46:54

that goes through is tried to mention on the fire. Okay. So this is the fire the

47:02

firewall rules are called packet per packet.

47:06

Okay. Okay. So, targets are the actions that

47:13

the firewall performs on the matching packets. Okay. And these are some basic

47:19

basic targets. Okay. So, targets are specified with the option dash J.

47:26

Okay. These are some basic some basic um actions that you can do.

47:36

most famous one are accept. Accept it means just okay let the bucket go

47:42

through the chain. So if we go back to the

47:48

our project if there is an accepted means just let

47:53

the packet go through the processing stack because I accept it. Okay. So let

48:01

the pocket continue his journey inside my my ger

48:10

opposite thing. It means just take the bucket and discard it. Trash it.

48:17

Okay. Um

48:23

this is let's say when you a firewall do not doesn't want some specific packets

48:29

he usually does drop it means just take the packet delete it

48:35

without sending any error or um communications

48:42

to the source. So without any ICMP errors or whatever

48:49

or notification it means just take the packet and drop it. Reject it means it's

48:54

the same as drop. So it cancels the is let's say stops the

49:00

bucket but at least reply to the sender with

49:06

an error. Okay.

49:12

Do you remember when we did the SSH lab and we tried to connect to

49:19

a server using the Sabiensa Wi-Fi, our connection was blocked.

49:25

What was happening is that you see that if you remember uh we tried to connect

49:32

and we had to wait a little bit before

49:38

our computer said ah no connection is possible. What was happening? The

49:43

firewall was dropping silently our packets. It means that all of the

49:48

packets that we will we were sending were taken by the firewall and just

49:55

discarded silently. So no notification was get was let's say

50:02

was arriving was sent to my computer. So my computer after a while that it didn't

50:08

receive any communication say ah no it's not visible.

50:13

It would have been different if the firewall used reject because in reject

50:19

we as we send a packet we immediately receive a packet back from the firewall

50:25

says no connection closed whatever and so we didn't have to wait my computer

50:31

would would have been immediately notified that the connection was wrong.

50:37

Okay. Um

50:43

nothing. Okay. So

50:59

number let's see this some examples and then we

51:04

do a a break.

51:08

So uh lab tables. So I have uploaded this lab

51:14

on the Google drive. I mean we are going to go through

51:20

together. I will write we will see how how we can uh implement some EP table EP

51:29

tables rules. I think that the one uploaded is already

51:40

It is not lab tableables X is lab tables. It is already configured with

51:46

all the the the configuration already in place.

52:22

So again when we will we will do the

52:26

homework. Um

52:29

so remember that EP tables is a command that you have to write on the terminal

52:35

as for every other thing in kadara that you write on the terminal is not

52:39

persistent across saves. So it means that all of these rules you have to

52:44

write them inside a startup file. Easy enough. Okay. And so inside the lab

52:52

here there are all of the startups and in the startups there are all of the

52:58

fireboard rules. Okay. So let's see the network.

53:07

So we have we have a firewall

53:15

that sits in between a let's say a a a network

53:23

which for me is the public internet. So let's imagine that this thing on the

53:29

right is the public internet. The firewall shields the public internet

53:35

towards a LAN and towards another LAN which is called

53:41

the MC uh which is used in um

53:47

um cyber security in and network

53:53

management. Okay. But the thing is that I have sorry I have this piece this

53:59

firewall which sits in between all of these three entities. So this LAN DMZ

54:07

and the public internet and you see here I have uh it is

54:13

connected on the LAN v0 on the DMZ vth and on the public internet via ATH2. So

54:22

we have three network interfaces. On the LAN I have

54:26

some PCs. On the DMZ I have a web server and another PC. And then on the public

54:33

internet I could have millions of PC. We just have put a single representative

54:41

PC. Okay.

54:47

So let's start to configure a firewall. Let's think about some operations that

54:54

are could be realistic.

54:59

Um again all of these comments are already

55:05

written in the in the in the laboratory but we will go through together.

55:12

First of all, um

55:17

let's go through the filtering commands. Okay. Um

55:26

this is just if you want to clean any existing rule on the filter table. This

55:31

just deletes all the the the table, but we don't care. Okay.

55:38

First operation that you want to do, we want that

55:43

um the packets that are originated by our

55:48

LAN are forwarded everywhere. Okay.

55:56

So I want that all the packets that are on the on the LAN can connect to the

56:04

public internet can connect to the DMG. Okay, this thing is not birectional. I'm

56:09

not saying that the LA can connect to the public internet and the public

56:13

internet can connect to the L. I'm not saying this. I just want the LAN

56:19

to be connected to the to all of the all of the network.

56:27

Okay. So, let me launch

56:40

I will launch it with no terminals because we have so many we would have so

56:45

many terminals connect.

56:55

Okay. to see the IP table rules. AP tables L which means list.

57:06

You see it's already there are already all of the um

57:14

it's already some rules. Okay, let us just delete them with

57:19

EP tables that F

57:27

means flash we are empty.

57:36

Okay. Um

57:39

again this is you see this is our filter table.

57:44

Filter table that contains input forward and output chain. Okay. Because this is

57:50

the default. I wrote it like this. It is the same thing.

58:00

Okay. There is also the N chain that we will use later.

58:06

Okay. And so here I am seeing the

58:12

all of the firewall rules inside the N chain. Again for the moment we are not

58:17

seeing it. And you know we are going to just flash it.

58:24

Okay. So our lab now is empty. So first thing accept for wording from

58:33

LAN to everywhere. It means just send the allow packets that were originated

58:38

from the LAN to go everywhere. How can I do it? Okay, we are doing filtering. So

58:46

we are going to use the filter table. We do not specify filter table because it

58:51

is the default one. So we can omit it chain forward

58:57

because we are a router. Okay, we are a router that is taking

59:04

pockets originating from somewhere and is sending packaging to somewhere else.

59:09

Okay, so we are going to use the forward chain. The forward chain is the only

59:13

chain in the filter table that will be called

59:17

in these cases. So from the LAN it is from the LAN. So I

59:23

have two options. I can either match the port the interf sorry the interface um

59:30

number or I can match the source IP address.

59:35

I have gone with the source IP address. So the line has 192.168.1.0/24

59:42

and this is my source and I accept this packet.

59:50

So EP tables forward

59:56

uh we have said the source 192 168 1.0

1:00:04

1.024-J 0/24-J numb.

1:00:19

Okay. So, it gives no error. If it gives no

1:00:23

error, it means that it was good. So, I can show it here. You see in the

1:00:31

shade forward accept all. So sorry accept all accept with this

1:00:39

source. If you want more uh if you want uh more verbose output

1:00:46

you can add the dash v option. Okay.

1:00:54

Accept pockets. Uh let's say in and out are the interfaces. So in an interface

1:01:02

out an interface source the source that you are matching destination whatever

1:01:08

destination. Okay.

1:01:13

Um let's implement also this second and

1:01:20

third rule. So accept for wording from the internet

1:01:25

to the DMZ. So I want that um

1:01:32

the internet can connect to the DMZ. Okay.

1:01:39

Um so I'm matching as in let's say as in interface AT2

1:01:47

which is the network interface of the public internet

1:01:51

and as destination the subnet

1:01:56

of the DMZ. Okay.

1:02:03

So let me write also this tables dash A4

1:02:12

DH2 destination D00 0

1:02:18

Yes. Okay. No error. It means that it was

1:02:29

okay. Uh let me also write this third one. Accept forwarding from PC1 to LAN.

1:02:42

Okay. I want that PC1 connects to the L. Okay. Only PC1, not

1:02:52

all the thing inside the DMZ. Only PC1. Okay. So in this case if I want to

1:02:57

specify a specific cost I cannot match via the port

1:03:03

because in the port we arrive packets sent by BC1 but also from this web

1:03:09

server webs. So I need the specific IP address.

1:03:14

So a P forward that the source is PC1 and destination is the LAN. So you see

1:03:22

that on source we specify a specific IP address and a destination subnet

1:03:29

tables for

1:03:33

word source.

1:03:38

Yes. Then we have written these rules.

1:03:58

We have you see that we have only written accept rules because we are what

1:04:03

what we are going to do now we are going to drop all of the other packets.

1:04:10

You see we are uh configuring a firewall in a

1:04:17

blacklist way. I cannot say blacklist anymore but the

1:04:23

concept is is that one we are no uh not blacklist white list actually.

1:04:31

Sorry, I cannot say that either. But the idea is that um we are

1:04:38

writing explicitly the thing that we accept and

1:04:43

we do not allow the the the rest. So we

1:04:48

accept forwarding from LAN to everywhere. We accept forwarding from

1:04:52

the internet to DMZ. We accept forwarding from PC1 to LAN and we drop

1:04:58

everything else. It means that web server will not be able to communicate

1:05:03

to learn. Um it means that internet is not directly

1:05:11

forward to our L. Okay. How we can write this in EP tables

1:05:19

default policy. Okay. We put EP tables dashp.

1:05:25

So dashp it means

1:05:29

you are in the chain forward. So you see that we have always worked on the

1:05:35

forward chain. We are on the forward chain. You have tried to match all of

1:05:41

the rule on all the rules on a packet. No rules matched. You use the default

1:05:48

use the default policy. In this case default policy is drop. And so we write

1:05:53

EP tables dashp uh forward

1:05:59

the row. Okay.

1:06:04

Let's go a table-b and we see all of our three accept

1:06:13

rules. And then here chain forward policy drop.

1:06:18

Okay. It means that we

1:06:24

uh so every packet that goes through this

1:06:28

chain is try to match to all of the rules in

1:06:33

order. So it is first try to match on this rule doesn't match it matches to

1:06:39

the second rule doesn't match it matches to the third rule it doesn't match then

1:06:45

the food policy drop. Okay,

1:06:54

we see that here are all of the roots that we have written. There is second

1:06:59

rule match in a2 destination this. So

1:07:10

let's try for example to make a ping uh

1:07:20

no back. We will make a ping in a in a

1:07:29

not a let's go to the public internet PC

1:07:41

p external and let's try to ping something in the

1:07:50

LAN 1 168.4 160

1:07:58

our B network is a reachable let's put it

1:08:23

So we are trying to ping. So we are external internet. We're

1:08:28

trying to ping the L and we see the ping just because the firewall is dropping

1:08:34

silently the packets. So it's just taking the packets

1:08:39

and drop it without sending any notification.

1:08:44

Uh if we interrupt the ping

1:08:51

you see 29 packets transmitted. Let us reconnect to firewall.

1:09:01

I know the counters are are not working well. Now I'm in the virtual machine. So

1:09:06

uh this doesn't work. uh

1:09:12

body ps also shows you the counters useful for the bucket.

1:09:19

You see zero packets, zero bytes. These are counter

1:09:24

uh which this rule was applied. So this rule for applied on zero packet, 20

1:09:32

packets, 1 million packets. Okay, so these are counters. Okay, now I'm in the

1:09:37

VH and this kernel facility is not working. It's disabled,

1:09:43

but uh maybe it depends on the system. You can also try yourself.

1:09:49

And these are also counters for every rule. So you can observe whether your

1:09:54

rule was being applied or not. Okay.

1:10:09

Okay. So, let's go on. Uh, rule order matters. Fantastic.

1:10:22

Let's say that we want to our goal is to drop

1:10:30

input packets directed to the firewall um

1:10:38

uh let's say coming from the DMZ except for from ex except for PC1.

1:10:46

So we are here on the firewall

1:10:52

and we want to accept input packets. So we want to accept packets for example

1:10:58

because we want that a PC connects directly to me to configure the variable

1:11:04

for some reason. I want to block all of the input connections except for PC1

1:11:11

because PC1 is a management computer for whatever reason. I want to allow PC1.

1:11:19

How can I do it? Well, one can think, okay, I write IP tables. I block all of

1:11:25

the DMZ subnet and then EP tables I accept

1:11:32

PC1. Logically, yes.

1:11:37

But it doesn't work. It doesn't work because the rules are applied in a

1:11:41

specific order. So if you write like this,

1:11:46

you drop packets coming from 10.0024 and then you accept packets

1:11:54

uh coming from 10.0020. So the first rule that gets applied is

1:12:00

the first one. So your packet gets to the first rule. So your packet with

1:12:05

source IP address 10.0.0.20 gets to the first rule. Does it match?

1:12:11

Yes, it matches because this is the subject dropped. So your packet just

1:12:17

dies. Okay. So rule order is important. So you have to swap the root.

1:12:26

Okay. Uh so basically either you write you

1:12:31

invert the order of the commands that you give

1:12:35

or instead of dash a in the second case you write dash i e

1:12:43

i dash i. It means insert on top. So let's see.

1:13:05

H no d00

1:13:21

zero zero zero. Ah, okay. You made a mistake.

1:13:30

Instead of a, you take your exact rule that you wrote. Instead of A, you just

1:13:36

write D stands for delete. So you delete you what you have just

1:13:42

wrote in the table. AP tables

1:13:48

input dest 0/24

1:13:56

we drop and then we accept

1:14:07

the 20. Okay. So if we write like so again it

1:14:16

won't work because the of the rule order. We just press I insert

1:14:24

and we see the rules. You see now we are populating the input.

1:14:34

We we were operating before on the forward chain. Now we are on the input

1:14:37

chain. And so we have before the accept

1:14:44

then drop. Okay.

1:14:57

So again remember that whenever a packet goes to your firewall

1:15:05

it traverses several chains and tables for every chain that the packet

1:15:10

traverses the firewall tries to match every rule in order inside the chains

1:15:16

tries to match the rule may match or not match but it tries to match all of the

1:15:21

rules inside the chain in this specific order.

1:15:25

First this one, then this one, then this one. Okay.

1:15:37

Okay. Um,

1:15:41

protocol matching. Okay. So we have seen some basic

1:15:46

matching uh with

1:15:51

interface name um

1:15:56

source address destination address. Okay.

1:16:00

uh we can teleos to match also the protocol.

1:16:07

Okay. Um

1:16:12

for example, let us accept

1:16:17

DNS packets from um

1:16:24

LAN. Okay. And the DNS is a protocol that runs on UDP by

1:16:32

default on port 53. Okay.

1:16:36

So the syntax of the command is like this.

1:16:42

So you are working on the input the source is the LAN subnet protocol UDP.

1:16:56

when you wrote when you write the protocol so UDP TCP whatever after that

1:17:05

you can write protocol specific matching rule

1:17:10

so for example you write TCP or UDP you unlock the possibility of writing the

1:17:18

port destination port or sport source port Okay. So again after the protocol

1:17:27

specification you unlock the possibility of writing protocol specific

1:17:34

uh matching things depending on the protocol you have here

1:17:39

different things. Okay.

1:17:45

uh for example if you match TCP protocol match you can write also d- sin to match

1:17:52

packets with the scene flag set you cannot do it in UDP because it's

1:17:57

there is no such option so again after you write the protocol

1:18:05

you can write protocol specific things in this case now we're going to use just

1:18:13

the port destination port and source port.

1:18:17

Uh so here we just write UDP on destination port

1:18:23

uh 53. Then we're going to match accept input HTTP packets

1:18:33

from the LAN. HTTP runs on port TC on TCP port 80. And so you write protocol

1:18:40

TCP destination port 80. And then why not you want to also accept

1:18:47

ICMP? You want also to accept pings to reply to pings. Why not? And so you

1:18:53

write protocol MP accept. For example, if you write protocol MP,

1:19:00

you cannot write destination port or source port

1:19:05

because ICMP does not have any port.

1:19:10

It does not work on TCP or UDP. Only TCPA UDP have ports. ICMP doesn't have

1:19:16

any port. Okay. So let's try also to put this

1:19:27

uh this were in the

1:19:38

maybe I can copy paste from here. Yes, I can copy base from here.

1:19:45

These are the three rules that we have seen.

1:19:48

Huh?

1:19:54

>> Okay, I just copy pasted them and you see

1:20:06

here this this accept SCP protocol. This accept UDP and TCP on specific ports.

1:20:15

The specific ports are the last thing on the right and you see UDP

1:20:22

DPD DPT destination port. You see that it already translates the

1:20:28

port number to the usage domain is DNS HTTPS 80. If you

1:20:38

want the numerical port because we don't want this translation, you add this N

1:20:48

uh option and you can see on the left here

1:20:56

destination port 50 53 destination port 80.

1:21:02

Okay. Um

1:21:21

Last thing I want to say then we do a quick break.

1:21:25

Um so

1:21:32

we have we

1:21:38

have accepted for example we have said one of the first rules that

1:21:47

Delan uh was able to communicate to the public

1:21:53

internet. Okay, we allow the land packets to go to the public internet.

1:21:59

Okay, how we did it with this?

1:22:08

So, packets s by warranty 1.0/24 accept.

1:22:16

Okay, but this solves this actually does do

1:22:20

not solve the problem. So in this case we are just allowing packets originated

1:22:27

from the LAN to go outside. We are not allowing packets

1:22:32

from the outside to get back to the Lana. Okay.

1:22:37

If you if you I mean in this case actually we also are interested in

1:22:44

blocking packets that were from the outside to come to the LAN. Okay. We are

1:22:51

just interested in let's say if we generate a packet okay from the land to

1:22:57

the outside we want that the packets related to this connection

1:23:04

will be accepted on the way back. Okay. So we want to open the firewall

1:23:10

not only for the bucket generated by let's say me

1:23:15

and sent uh to the public internet but we want

1:23:20

also the bucket related to the same colle connection that from the public

1:23:25

internet they go back to me and we have to do it. Okay,

1:23:33

we will see in a uh second. Let's start with this example.

1:23:42

Um so again in the firewall we are

1:23:51

configuring one way remember that we have to configure also the other way of

1:23:56

the packets. For example, here we want to allow

1:24:02

forwarding of SSH traffic from the DMZ to internet.

1:24:09

Okay. And so we match

1:24:14

how can we how can we do it? We match the source.

1:24:22

We match the destination with the network interface

1:24:27

and we say TCP destination port 22. Okay. So this rules allows the

1:24:35

forwarding from the packet generated from the DMZ to the internet.

1:24:41

But then some packets have to come back. How can we make those packets come back?

1:24:47

Well, we are allowing SSH. So the destination

1:24:51

port is 22. We know that the packets that will come back we will have at

1:24:58

source port 22. Okay, this is how TCP works.

1:25:15

a show. Um but the idea is that

1:25:23

um you are a client, you connect to SSH

1:25:28

server. Okay? And so you have your TCP packet. A TCP packet has two port

1:25:33

fields, a source port and a destination port. You're a client. You connect to

1:25:38

SSH to a server. The destination port will be 22.

1:25:44

The source port will be usually it's a local port

1:25:49

assigned by the client. It's usually in the high range like 30,000 40,000 will

1:25:55

be anyway there is another port number and so your packet will travel from you

1:26:01

to the server having destination port 22 and a source port

1:26:07

30,000 something. Okay. The packet goes to the server. When the server replies

1:26:14

back the packet that will be going back, we have as destination port the source

1:26:23

port of the client. So that those two ports are inverted.

1:26:27

Okay. So the source port the destination port

1:26:32

becames the source port of the client. I the source port and destination port

1:26:40

are inverted. So on the way back the source port

1:26:45

will be 22. Okay. So in order to allow this SSH

1:26:53

communic SSH is just an example but it could be any connection on any port.

1:26:59

uh you allow with the first rule packets from one way to the other using the

1:27:04

destination port and the packets that are coming back you can match them with

1:27:11

sport source port. Okay.

1:27:18

So we need two repeatables rules for each connection that we want to um

1:27:25

allow. Um

1:27:32

similar way of doing this maybe simpler is

1:27:39

to allow just one just this is so we have seen we that we

1:27:47

need two two rules to to allow this birectional connection. Uh we can also

1:27:53

do this in another way. we can allow packet on just one way. So the

1:28:01

first rule in the second method is the same as the first rule of the of the

1:28:05

first method. And so we are matching source and we are matching destination

1:28:10

port 22. Okay. And then we write this magic

1:28:16

thing. So forward dashm state dash state related established accept.

1:28:27

This is a rule that takes a bucket and if it is related to an already existing

1:28:36

connection then accept it. Okay. there is this initables

1:28:48

um this let's say extension models this dash and state load the contract

1:28:57

something whatever so these are sorts of a tables

1:29:03

extensions gives you the possibility of defining the state of the connection

1:29:10

related established it means that it matches the packets

1:29:16

that are related to a connection to an existing connection. So I am the client

1:29:24

connects to the server. So the firewall sees some packets that are sent by me

1:29:31

and go somewhere else. The packets that will come back are

1:29:38

related to the same connection. Yes. Because this model tracks the

1:29:42

connection. So it tracks the source port and destination port, source IP address,

1:29:47

destination IP address. If it is related to an existing connection, accept the

1:29:52

buckets. This is simpler. Okay?

1:29:57

Because you see that here you want to forward

1:30:02

SSH, but now you want also to forward HTTP, HTTPS, DNS. And so for every

1:30:08

protocol that you want to accept forwarding, you have to write two rules.

1:30:13

Using the second method, you allow the forwarding of only one way

1:30:20

and then you just write only once the related established connection accept

1:30:27

the simple. Okay.

1:30:35

And so let me write it also. Also

1:31:00

established. Okay.

1:31:05

And by connection tracking this is what happens. Okay. So you have

1:31:12

three nodes client, firewall and server. So client is one that starts the

1:31:17

connection. Server is the destination. So the on TCP the client sends a scene

1:31:23

packet to open the connection. the firewall on the first syn packet for

1:31:30

the firewall that connection is new because there is a new connection. Let's

1:31:35

see if the firewall sees a reply from the server

1:31:41

then the connection becomes established. Okay. And so from this point on

1:31:51

if you write the related established connection it will match all of the

1:31:56

packets of this connection. Similar thing applies to UDP.

1:32:04

I just put it in quotes because UDP is not a connection opening. It's just

1:32:09

pocket going one way packet going the other way.

1:32:13

So the client send a UDP packet to the server and from the firewall perspective

1:32:18

that connection is new. When the the firewall will see a reply

1:32:25

coming when the firewall will see a reply coming back from the server that

1:32:31

connection becomes established. Okay. any other packets of the same

1:32:37

connection where let's say whatever was what they were they sent by the client

1:32:44

or by the server are marked as established and can be matched by the

1:32:50

fire rules with the with this method here. Okay.

1:32:57

So this rule matching is matching all the packets

1:33:04

that are belonging to an established connection.

1:33:09

So you see here also the word related this is uh

1:33:15

antique because sometimes there were there were some protocols that not do

1:33:21

not use just a single connection but they use multiple connections. one for

1:33:26

data, one for control. First version of FTP

1:33:32

both I don't know I don't remember uh the thing is that usually you do not

1:33:38

write only established but to uh let's say uh not cause any harm you

1:33:46

also write the word related. So this line right here matches every

1:33:53

packet belonging to an established connection. So a connection that was

1:33:59

originated from uh something and the destination

1:34:08

replied to the source. Okay, I think we can have a

1:34:18

>> Oh, see volunteer. This is it. So, let's have a quick break and uh

1:34:25

and let me pause the registration. We'll back in 15 minutes.

1:44:51

Okay, we have restart. You might have thought it.

1:45:45

Okay, the recording has started. Let me Okay, screen is sharing.

1:46:21

Okay. There go.

1:46:44

>> Okay. Okay.

1:47:18

Okay. All right. So, let's start back from where

1:47:35

we left. So, connection tracking gives a way to track

1:47:42

connections and to match packets belonging to a tracked connection.

1:47:48

Uh I did not show this slide but basically

1:47:52

the syntax of the command is like this um dash m in imp tables there are many

1:47:58

modules that you can load state if it's one of the models.

1:48:04

Okay and after you specify state you have the option to do d- state and then

1:48:11

the state of the convention uh of course with the exclamation mark

1:48:16

as always as the negation. So you may want to uh match all of the pockets

1:48:22

except for that is the negation um

1:48:28

options established is what we have seen then

1:48:32

there is also new. Okay. If a client sends a packet to a server, the first

1:48:38

packets, the packets that the firewall sees before the server replies, all of

1:48:44

these packets are tracked as new, belonging to a new connection.

1:48:49

Invalid. Okay.

1:48:58

For example, there is an error somewhere.

1:49:05

uh MP errors packets that go back they do not belong

1:49:10

to any connection so they are invalid related again is

1:49:18

let's say is uh how do I say with with the older

1:49:23

protocols that require more than one connection

1:49:27

so you open one connection and the packets on the other related connection

1:49:33

are marked does. Okay.

1:49:41

Okay. We have seen filtering operations. Until now we have seen fethering

1:49:48

operations. So either accept, reject, we have seen matching rules. We have seen

1:49:55

how to act, where to act if we are a router, a server, a client. Okay,

1:50:02

that was the filter table. We now move onto the not table.

1:50:09

So we move on to not. So not stands for

1:50:15

network address translation. Okay. Um this is not a concept of EP tables is a

1:50:25

larger networking concept. Okay. So the is that throughout the

1:50:30

course we have talked about private addresses. Okay. So for our perspective

1:50:37

for our goals a private address is an address belonging to a local network

1:50:42

belonging to Alana which was not directly rootable and addressable

1:50:48

outside. So this is true. There are uh there is a

1:50:56

specified set of private addresses that are not rootable on the outside. I don't

1:51:02

know if I told you that but the private there is also there is a standard that

1:51:06

specify the exact addresses that are not rootable

1:51:12

private addresses which I don't remember.

1:51:17

So RFC's I mean now there is the AI whenever you

1:51:24

see RFC in the networking community RFC

1:51:29

basically are the standards. Okay. So these are

1:51:37

pretty short RFC but basically you can find here that

1:51:44

these blocks it states that these blocks are private.

1:51:50

So these blocks if you see are uh blocks that we use

1:51:58

a lot. For example there is this 9 1921 168.0.0 0

1:52:04

/16. Okay. All of these addresses is private.

1:52:10

172612 is private.

1:52:16

Okay. This is usually used in Wii home Wi-Fi routers.

1:52:22

172 116. I don't know. I'm only aware by default

1:52:27

that Dogger uses it uses it. Uh and then there is the largest block

1:52:33

largest private block 10.0000 so is a slash8 a full slash8 which is

1:52:40

private. Okay.

1:52:44

So these are the private addresses. Okay. So I have this block of addresses.

1:52:54

Is the zoom working? Right. So the sharing is sharing the cloud is going

1:53:01

okay. Perfect. Uh these addresses are not routable and

1:53:06

addressable from the outside. For example, you are connected to your

1:53:10

Wi-Fi router. You have 1916.1.15. This address is private. You cannot exit

1:53:16

the internet with that. What happens? Um they invented this method that when

1:53:24

you have to connect to the internet so your packet gets to your router. Your

1:53:28

router does this operation takes your packet as source IP the source IP of

1:53:37

your packet will be 192.168.1.15. Your router replaces the source IP with

1:53:45

the public EP of your router because your router would have a a

1:53:51

public IP address. Okay. So this packet will have a source IP a public rootable

1:53:59

non-private IP. It goes to the server and then the server can reply back

1:54:05

because it sees the source IP address of the bucket.

1:54:11

And so the buckets coming back will have a destination IP the the source IP of

1:54:16

the first bucket. It goes back to the router. The router is smart enough to

1:54:23

track your connection. So if it sees

1:54:28

uh for example you send a packet the router performs this substitution

1:54:34

when some packets come come back belonging to the same uh connection the

1:54:40

router is smart enough to do to perform the reverse operation. So as destination

1:54:46

address instead of having its own uh public address it puts back your private

1:54:54

IP address and that's okay because then the packet

1:54:59

is rooted to the LAN and in the LAN it can find its way to

1:55:04

to you. Okay. So again your router does these two

1:55:10

operations. one it substitutes the destin the source IP address on the

1:55:18

let's say on the way out and then it tracks and so that on the way in packets

1:55:25

belonging to the same connection performs the reverse operation

1:55:29

so as destination IP address it it puts the uh earlier IP address this

1:55:38

process is known as network address translation

1:55:41

us. Not the

1:56:05

Um but this was just an example then we

1:56:09

applied into the our lab that was still working.

1:56:15

Um the idea again visually is that you have your home router. So you have your

1:56:22

desktop, your smart TV, your printer all connected to a single

1:56:28

access point. And all of these

1:56:35

they have all private address 1916.1 whatever and whenever they go to the

1:56:41

public internet they when they travel on the public internet they gets assigned a

1:56:46

public IP address of your own router. Um

1:56:53

so the idea is that in this moment in the world there are many local networks

1:56:59

using the same 192 168. So there are many but the idea is that

1:57:05

when you exit to the public network you have to use a public IP address. Um,

1:57:14

I forgot to mention something. Okay.

1:57:29

Um so how it works under the hood is

1:57:38

basically always connection tracking. So uh TCP UDP connection is defined by four

1:57:47

elements source destination port source

1:57:50

destination IP address. Okay you can identify a connection with

1:57:56

these four elements. If either one of these element changes, it's another

1:58:00

connection. Okay.

1:58:05

So if you see packets which are which have the same for they belong to the

1:58:11

same connection. If you see packets

1:58:18

that have let's say on the way back that have inverted source and destination

1:58:23

address, source and destination port. They belong to the same connection. they

1:58:27

just are going into the reverse direction.

1:58:33

Okay. So that's how it does uh connection tracking.

1:58:43

So ah so what I forgot to mention is that

1:58:47

not can be nested. So in this example you you have your

1:58:54

desktop, your smart TV, your printer all connected to a home router and say okay

1:58:59

my home router has a public IP address. Some internet service provider do not

1:59:06

give a public IP address to every router.

1:59:10

But what do we do is that your home router has itself again a private

1:59:17

address a private address inside the internet service provider network. And

1:59:22

so there will be a another with a public IP address and you can

1:59:29

nest nest italiano. You can uh

1:59:39

>> ground you. Yeah, you can nest. You can anid

1:59:45

your network address translation your not process how many times you want you

1:59:51

want. Okay, it's not there is no limitations on uh

1:59:57

uh how much it say that every nut step depends only on the local information.

2:00:04

Okay, so you can nest this procedure how many times you want. You can have nut

2:00:08

inside nuts inside nuts. Okay, completely transparent to the

2:00:14

client. So from the client perspective, it doesn't know whether a knot is going

2:00:18

on, whether multiple knots are going on. There are ways to know it, but

2:00:26

it's completely transparent to the client.

2:00:31

Okay. So, historically, just a side note,

2:00:38

network address translations were invert were invented to overcome the shortage

2:00:43

of APV4. We have already done this um discussion,

2:00:48

but basically APV4 are just composed of 32 bits. It means 4

2:00:56

billion something addresses which is not a lot considering all of the

2:01:03

um network devices from this 4 billion you have to remove

2:01:10

all of the unassignable addresses all of the private addresses

2:01:16

and some other addresses. Okay. Um you don't have a lot of a PV4. So

2:01:24

they invented the not to have under the same umbrella.

2:01:29

So under a single public IP address multiple private public address private

2:01:35

addresses. So if you are in a company of uh having 2,00 computers

2:01:42

if you do network address translation all of the 2000 computer can exit using

2:01:47

a single public IP address. um in EPv6

2:01:54

there is not to worry about this quantity of addresses because there are

2:02:00

they are already a lot. So network address isolation nowadays sometimes are

2:02:05

used as a mechanism of defense primary line of defense.

2:02:12

Uh why? Because they avoid exposing a host to the public internet.

2:02:19

If a host does not have a public IP address but

2:02:24

only a private address, any attacker in the world cannot connect to it

2:02:30

because it's not rooable by definition. If it has only a private address, it

2:02:33

cannot be contacted by the outside world.

2:02:38

Erh so effectively they block new connections starting from outside the

2:02:44

LAN. Okay observation

2:02:48

fantastic. However, if the attack is performed from

2:02:53

inside the LAN, so if the attack starts from within

2:02:58

the LNA, then network address translation doesn't provide any

2:03:04

protection. For example, reverse shell cyber

2:03:08

security, you know better than me, uh an attacker install a malicious program on

2:03:14

your computer. If this program connects to a remote server,

2:03:21

so a connection is created then on that connection the attacker can exchange

2:03:28

data either from up to down but also from down to up. Okay.

2:03:38

So the nuts only protect on the creation of the connection because they do not

2:03:45

allow the creation of a connection from the outside of the LAN to the inside.

2:03:50

But once the connection is created in this case that starts from the inside

2:03:55

the LAN and goes to the outside then there is a connection TCP or UDP

2:04:01

connections are birectionals. Okay. And so there can be data exchange

2:04:08

from the server to the client but also the client from the server. Okay. So

2:04:12

they can communicate and not simply transparently

2:04:17

translating addresses. Okay.

2:04:25

But B how we can implement it in EP tables?

2:04:31

Uh it's quite easy actually. Um the syntax of the command is something like

2:04:36

this. So AP tables dt not

2:04:44

because we are working on the not table. Uh yes

2:04:49

poster rooting chain. Okay. So this operation of not to be

2:04:56

precise is known as source kn. So your home router before sending the

2:05:05

packet um translates the source IP address with

2:05:11

its own public IP address. Hence source not

2:05:16

okay there is also the destination not that

2:05:20

we will see later. So the source not can be done with this

2:05:27

post routting. So this chain is called after the

2:05:33

routing takes place. Okay. So suppose that you are your home

2:05:38

router. Okay. Uh it sees a packet from one and two. It sees a packet from your

2:05:44

PC having a private address directly to a server. Before doing anything, it

2:05:52

roots the packet. So it decides where to send it. It sends it on this network

2:05:57

interface. after the routing procedure. So just

2:06:02

before sending the packet on the interface, the router decides okay let's

2:06:08

uh translate the network address and I will put my um source IP address.

2:06:15

Okay so it is applied on the post routing chain then

2:06:21

which network interface you want to apply. So it means that this rule will

2:06:28

be applied on all the packets exiting this network interface

2:06:34

dash j masquerade. Okay, this target

2:06:41

implements the whole network address translation, the source network address

2:06:45

translation. So it manages the translation of the

2:06:51

addresses of packets going one way and also on the way back. You do not need to

2:06:57

do the reverse. This single rule is enough for the birectional

2:07:03

communication. Okay. Sorry. Must get rid of everything.

2:07:11

And so this is the description of the government considers the not table.

2:07:15

Consider the packets after the rooting decision. Postring consider all packets

2:07:20

exiting from a TH2 network interface applies the target masquerade which

2:07:24

implements the process of source and SAP address substitution.

2:07:31

Okay. If we want, we can also apply the

2:07:36

following rule uh to block any new connection from the

2:07:42

outside of the internet to our new network address translated clients.

2:07:48

Okay. So in reality what happens in reality

2:07:55

if you want to protect your LAN okay an attacker from the public

2:08:02

internet cannot connect to clients in your LAN

2:08:06

because by default they have a private IP addresses they are not rootable okay

2:08:16

but if we have if you have some attacker which is close to you and maybe tries to

2:08:23

sneak in packets uh with a private IP address and the routers are not

2:08:28

configured correctly so that the the the the private IP addresses are rooted. You

2:08:35

may want also to apply this rule optional that blocks any new connection

2:08:40

from the outside of the internet to our new not.

2:08:45

Okay, which is just a forward filter rule

2:08:50

matching new connections coming from the outside and just

2:08:55

dropped. Okay, let's try to put it on our um

2:09:06

running lab. Let me just copy this.

2:09:22

So, IP tables. This time we want to show the not table.

2:09:30

So not table lvl this

2:09:36

and you see there is output. This is the chain of dog shar

2:09:42

pruding empty posting masquerade. So it is masquerading everything that

2:09:51

goes out from interface ATH2. Let's try to do

2:10:08

this. So let's try to

2:10:16

connect from uh let's say to open a listener here on PG external and try to

2:10:24

connect to it from PC in the okay so PC external

2:10:32

head. And let's try to

2:11:13

Let me just close it. Sorry. So

2:11:18

I want to let's say that now I'm PC external and I

2:11:23

accept connections. So from the point of view of PC external

2:11:30

how I see packets incoming from PC4 or PC3 packets belonging to the L of course

2:11:38

I again capture the pockets I can expect pockets for the moment I just want to I

2:11:43

just opened the net cut listener on PC external and I'm connecting to it with

2:11:49

netcut from PC4 from PC2.

2:11:54

So here is the listener on PC2. I'm connect

2:12:02

and just close the connection. You see

2:12:09

um there was a connection of course it was

2:12:17

PC2 connecting with this source IP address.

2:12:24

Sorry. Connect to uh from

2:12:30

quest from this source IP address. Okay. This source IP address 2000.1

2:12:39

is the IP address of the firewall at2. Okay.

2:12:46

So from the point of view of PC external, it just sees the

2:12:53

noted IP address. It doesn't see the other addresses.

2:13:05

Okay, this was the source not easy.

2:13:11

Um we can also do the destination not

2:13:18

destination not. Uh so what we have seen is was source not also abbreviated as

2:13:24

snut. Now we see destination not also abbreviated as dat.

2:13:29

Um with source not we change the source IP address.

2:13:36

we did not we change the destination IP address or destination port uh or or of

2:13:43

a bugget. Okay, basically we are doing a a

2:13:51

redirection of the bucket because we are changing the destination we are

2:13:55

redirecting the bucket some way. Um,

2:14:00

example, this actually a pretty common use case. Expose port 80 of the firewall

2:14:07

and redirect packets to web server port 8080.

2:14:13

And so this is the command um

2:14:17

parenthesis. What we are doing here, we are exposing

2:14:25

port 80 of the firewall. So we whatever packet with destination port 80 arrives

2:14:31

to the firewall the firewall redirects it to the

2:14:36

destination. So it changes the destination IP address.

2:14:42

So it redirects the bucket. It also changes the port instead of 80 port

2:14:47

becomes 8080. Okay. Um on a side note on a cyber

2:14:54

security side note this is a very well um

2:14:59

common use case um what happens if you have your web

2:15:05

service your web services HTTP HTTPS by default they run on port 80 port 443

2:15:14

they are so-called privileged ports okay so all of the ports below 1,000 24 are

2:15:22

privileged. What does it mean privileged? It means that you you need

2:15:26

to have root or administrator powers to run a listening applic.

2:15:37

What does it mean? It means that if you launch a web service listening on port

2:15:43

80 and you launch it with administrator so with root

2:15:48

if some attacker can break into your running program

2:15:53

and do some remote code execution whatever then the attacker

2:15:58

will have administrator control over your computer.

2:16:03

Not good. It happened and is continue to happening. non uh

2:16:09

there is no good. How can we avoid this? One example can be to run your web

2:16:17

service on port on a port which is not privileged for example a higher port

2:16:23

port for example 8080. Okay. And then expose a firewall

2:16:30

port 80. And the firewall redirects port 80 to

2:16:34

port 8080. Okay. So here you are minimizing your exposure. You are just

2:16:40

exposing a firewall port 80 which just takes the bucket. It doesn't read the

2:16:46

the contents of the bucket. Just takes the bucket,

2:16:50

deletes 80, replaces it with AD80 and then sends it to your web service. Your

2:16:56

web service which at this time it is not required for you to run it as root. So

2:17:01

even if an attacker can get through at least it doesn't have root access which

2:17:07

is good. Okay. So this was a cyber security

2:17:12

parenthesis but this is a common use case where destination not is used.

2:17:19

Okay. How can we do it in in tables? Well, IP tables d not again

2:17:26

not table preing we are working before the rooting takes

2:17:34

place. Again we are redirecting a packet. So we perform the modification

2:17:41

of a packet before the routing takes place and then we apply rooting with the

2:17:47

new destinations. So we apply it on preloading

2:17:53

dash iT. So the input interfaces are ATH2.

2:18:00

Um we want to match TCP on destination port

2:18:06

80. So this is the matching rule. We are matching HTTP.

2:18:12

Okay. um

2:18:17

action - jestination not and we can write two destination

2:18:24

so the new address and the port okay so this is a full

2:18:39

redirection so you can specify the IP address and the port you can also

2:18:45

specify only the IP address leaving the port unchanged.

2:18:50

Okay, you can specify only the port.

2:19:00

Okay, but this is how you redirect the packet.

2:19:04

Um so here is the description of the com

2:19:09

and this the discussion we had before on security is written all here.

2:19:16

Okay. So let's try to

2:19:20

do it. Let me just copy paste the command on

2:19:27

the slides. Okay. And let us show IP tablet.

2:19:43

And so you see Did I run the masquerade? No, I didn't

2:20:00

run the masquerade and the masquerade.

2:20:09

I didn't run the masquerade. Let me open. Yes,

2:20:24

okay. So we see the not table our posting and preloading chain.

2:20:32

So you see something Dogger Dogger is just uh Dogger manages its own P tables

2:20:39

its own networking just ignore it. It doesn't interfere with other packets.

2:20:44

You see post routing there is our mask that we see before our uh source not and

2:20:50

then in preing you see destination not

2:20:57

okay destination not that does matches as destination port HTTP

2:21:05

running on TCP it redirects it to this address right

2:21:12

here and to this Okay. Um,

2:21:24

for example, another use case. Um

2:21:30

I don't know if you ever have been have you ever go to your routters

2:21:35

home router settings there is

2:21:40

something that is called port forwarding open ports

2:21:45

uh is different from the port forwarding of SSH okay it's just uh the same name

2:21:54

that port forwarding It is simply a destination not. So in

2:22:00

your home router you can say okay uh I'm opening on my router port 80

2:22:09

and whatever packet arrives to my home router on port 80 redirect it to this

2:22:17

host in the LAN on the same port. For example

2:22:23

you are opening a port. It means that if you have

2:22:30

a Rome router and we say that you are opening the port

2:22:35

10,000 okay whatever packet whatever new connection from the outside arrives to

2:22:42

you on port 1000 then your router you you decide where

2:22:48

where to to to send it. Okay. So you are doing your in this case your

2:22:56

router is doing a destination not okay

2:23:02

it is doing a destination not uh for example uh when you connected to

2:23:09

my SSH server my SSH server didn't have a public IP

2:23:15

address but you connected to it anyway because

2:23:20

what you have is the FP address of my router

2:23:28

or my router. I configure my router and I say look dear rooter all the only the

2:23:34

SSH packets only the SSH connections that are right to you please take them

2:23:39

and redirected redirect them to my desktop.

2:23:46

Okay. So it's a destination not because I'm taking the the

2:23:54

your packets and just redirect them to the destination.

2:24:03

Okay. Um

2:24:15

okay. So your um so basically

2:24:20

with all the concepts that we have seen until now your Wi-Fi router

2:24:26

at home is basically a small Linux box very small Linux box basically running

2:24:34

a DHCP server. It has a routing table and some

2:24:39

addresses with some network interfaces. and it runs EP tables and it does

2:24:49

forwarding and uh it does this firewall uh

2:24:56

applications for sure it will have a rule to to the

2:25:00

not to apply the network address translation and if you conf to to do

2:25:05

sorry the source network address translation and if you configure it it

2:25:10

can be configured also to apply this destination at

2:25:16

destination network address translation. Um

2:25:25

okay basic epitable troubleshooting we have seen it even if on my system on my

2:25:31

VM it doesn't work maybe on your system it works uh maybe if you have it native

2:25:38

on your computer it works to me it doesn't work but anyway you can try if

2:25:43

you um put dashv it shows you the counters

2:25:51

uh now for this works that word. Okay. Sometimes it works, sometimes it

2:26:03

doesn't work on my apparently uh on the N table. Apparently it works.

2:26:09

For example, chain posting where we wrote our

2:26:15

masquerade rule. there is

2:26:22

this okay counter of packets that match the

2:26:27

in this case that match the policy okay but the answer here are always zero

2:26:35

okay so you see my is a little bit buggy try out try it on your system but the

2:26:41

idea is that this counters show you how many packets have matched that rule okay

2:26:48

so you can See if your rule is working. You written

2:26:53

well your rule if it is working. Okay.

2:27:04

Now we do not have time to do all of this.

2:27:13

Uh I just discuss it here and I leave it. I

2:27:18

mean even if because we are just 20 here and a lot of guys are from home. So I

2:27:25

just leave it here discuss it and if you want you can try to do it. So this is a

2:27:31

exercise with EP tables. This is a network.

2:27:36

This network is a semi accurate representation of the network topology

2:27:42

when we did the SSH laboratory. If you have not been when we did the SSH

2:27:48

laboratory, I let you connect to my

2:27:55

to let's say to a personal uh I created some accounts on my personal server and

2:28:01

you connected it to it. Okay. And so this is a topology of the network

2:28:11

that it was when we did the lab. Um so the goal that I have are to basically

2:28:24

first of course made it work. So enable you to connect with SSH from Sapiensa

2:28:31

network. So you see there is there is lamp here lampier public internet and on

2:28:37

the right Sava network. So where we are um enable you to connect with SSH from

2:28:44

Sava network to this machine here and once inside once you are inside here

2:28:53

so you are a user you have a terminal you can do whatever you want here I

2:28:58

didn't want any of you to connecting to my other stuff so I do not want you to

2:29:05

connect to my desktop to my printer I don't want you to connect any other

2:29:10

external internet services represented by that server right here. Okay.

2:29:20

So I had these two goals. So first of all enable you connecting SSH then

2:29:27

preventing you that once you are in to do whatever you want.

2:29:32

Okay. So, um

2:29:39

the product is that

2:29:49

there are a lot of nuts here. There is the

2:30:04

So there are a lot of network address translations here. On the right there is

2:30:08

the Zensa network. You are connected to the Zava Saba nuts your addresses

2:30:14

translates your addresses and this is the first not. Another nut there is from

2:30:19

the public internet and my home network. So my home network translates the

2:30:24

addresses before going to the public internet. And here I have my home,

2:30:30

another PC, I have my printer, I have some other things.

2:30:35

Okay. And these addresses are noted to my home is connected also a Raspberry

2:30:41

Pi which is the server to which I connected to you.

2:30:46

You were not connecting directly to my Raspberry but you were connected to a

2:30:50

Docker thing inside my Raspberry. Okay, this is the topology of the

2:30:56

network that I did. And so you see there is a nut here and there is also a nut

2:31:02

here. So there is this SSH service is behind two walls of

2:31:09

network address translation. Okay.

2:31:20

And Okay. So this is the topology that I had

2:31:28

to work with. And if you want to try it at home, the topology I uploaded on the

2:31:37

drive is all configured. Uh the requests.

2:31:45

Okay, that you have to act only on the router

2:31:54

on Milan and on Raspberry to add firewall rules to enabling this the

2:32:00

connections. So these two tasks are for the two goals that I in mind. So the

2:32:06

first task is for enable SSH connection from Savena to the um

2:32:15

SSH server and then so here you will have to do a EP tables

2:32:23

destination not

2:32:27

and then acting only on Raspberry where I can place all my firewall roots with

2:32:33

DP tables. with feed the filter table. I want to

2:32:39

block all the connections originated from SSH server directed to the

2:32:45

raspberry itself. to think like like you were me

2:32:54

this is my server I have some you are connected here I don't want that you

2:33:00

connected to my server directly I don't want you to do this okay so first thing

2:33:06

block this connection from SSH server directed to my server

2:33:13

then block all the connections directed to any my any nodes in my own network. I

2:33:20

don't want you to connect to my printer and then block any connections created

2:33:25

from SSH server directed to any of the nodes to the public inter. So

2:33:31

connections originated from here directed to here for example.

2:33:39

Okay. If uh all was done correctly then a user

2:33:47

student should be able to do SSH this thing and work.

2:33:53

If you want try to do it this is the the network that I

2:33:57

was working with I think we have finished time.

2:34:11

There are any questions something I hope that from whom

2:34:19

it was followable. Uh if there is anything if there isn't

2:34:25

anything we can terminate here and see you guys.

2:34:30

Okay.

![Genera immagine capitoli](https://ssl.gstatic.com/docs/common/viewer/video/chapter_failure.svg)

[](https://support.google.com/a/users?p=gw_gemini_responses)

Visualizzazione di recording.mp4.