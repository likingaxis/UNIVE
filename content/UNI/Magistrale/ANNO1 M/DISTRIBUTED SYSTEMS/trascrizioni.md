### Lezione 3
  
Gemini

3:28/2:04:01

0:29

oh you

3:23

okay so for a moment you can see the the the screen

3:29

the screen the presentation screen the one with the five link

3:32

okay so this is the token to confirm your

3:37

presence today for the understanding class is five three

3:41

eight zero seven six

3:44

so find five three eight zero seven six i will show also the link

3:49

in the after the break

3:52

okay so what we will see today today we will see the

3:58

topic of logical time so

4:02

last time we have seen clock synchronization

4:05

that is in physical time today we will see that in a system that they are

4:10

asynchronous you can have a certain kind of concept of time

4:15

and this concept of time is called logical time so this is what we will

4:19

learn we will see today

4:23

before going on topical time we will end up the exercise that we started with one

4:28

with the server because its solution also bring us to

4:33

explain an important primitive that is the first in first out link the fifo

4:39

link the fifo link are important because they

4:42

introduce over the fair loss the concept of

4:46

failure sorry of order of messages that we have

4:50

in our mind so essentially a link is fifo

4:54

if the order in which you send messages to someone

5:00

is equal to the order that that someone will see in receiving

5:04

the message so it means that if i send message a

5:09

and then message b on a fifo link the receiver will see a before b

5:14

you cannot see b before a so this is impossible in a

5:19

fifa link a fifo link is also a solution for the

5:24

other problem that we have seen of the perfect point-to-point link

5:28

because the perfect point-to-point link as a problem that

5:32

you use as assumption the fact that the messages

5:36

are unique and so when we have seen the the code of

5:40

the server if you try to simulate the client or fivo link and you send twice

5:44

the same message the receiver does not receive the

5:48

message twice but just once and so forth to fix this problem we said

5:54

that we need the sequence number okay and the technique of sequence number

5:59

does not only make

6:03

message unique but it also automatically

6:08

creates the possibility of ordering the message according to the order sent by

6:13

the sender and so we can create what is called the fifo

6:18

link so what are the properties of the fifo

6:22

link so we will build the fifo link as you can see in the figure

6:27

this link will be built on top of the perfect

6:32

point-to-point link so we assume to have a perfect link

6:36

with the usual event that are the send and the deliver

6:39

and on top of this perfect link we will build our fifo link

6:44

the fifo link has three property and these three properties you already know

6:48

them they are the same of the perfect link

6:52

if a chorus rose is p sent m to q then q eventually delivers m assuming the q is

6:57

correct no duplication no creation and so on so

7:00

they are the three usual property of the fifo link

7:04

the new property the new one is this one

7:09

that is called five for property because the ordering is called five or order

7:14

if a process p delivers m before m prime then m was sent before m prime

7:23

so this means that if a certain process p deliver a

7:28

message a before delivering message b

7:32

so he delivers a before b he delivers a at time 1 and b at time 2

7:38

then a was sent before b so this is what is saying formal it's

7:43

saying formally that if you deliver any pair of messages that you deliver the

7:48

order in which you deliver is the same that was used by the sender okay

7:54

so if you look about it this property is brought for

7:58

a pair of messages but automatically it extends to a

8:02

sequence of message so this property implies that if the sender sends to you

8:07

a b c and d in this order

8:11

so a b

8:13

c and d in this order then you will deliver a b c and d in the exact same

8:19

order and the implication is obvious let's say

8:23

that you deliver in a different order so you deliver a c b d

8:28

then there is this pair here that violates this property and you can

8:32

check because you are delivering c before b

8:36

while here you the the sender was sending b before c

8:41

okay so even if this property is only stated for a pair of messages

8:46

it automatically holds for the sequence so it implies that if the sender sends

8:51

10 message in a certain order you receive exactly that then message

8:56

because you have reliable delivery in that exact order of the sender okay

9:02

you have to remember that this is a link so a link is something that exists only

9:08

between two process a sender and a receiver

9:12

okay the link does not extend to a broadcast so we will see the case of the

9:16

broad because the broadcast is a bit different okay these als only for a link

9:21

between a sender and receiver so for early for us a link is always a some

9:26

abstraction of a cable of something that exists between three browsers that has a

9:30

sender a receiver we have seen already the links

9:34

and so now let's look at the code of the file

9:37

so this is the code of the file this is this block right here is implemented

9:42

with this code on your left

9:46

on your left and so we have the perfect link that is

9:50

given so the code that this block has been given to us so we do not care how

9:55

it is implemented it could be order code it could be a physical link that is

10:01

already a perfect point to point link we don't care

10:05

what we have to do is that we have the property of the of the perfect link

10:09

right here and what we have to implement is just

10:12

the property of fifo because if we send a message on the perfect

10:17

then it's trivial to see that these three properties are respected if we do

10:21

not make blunted mistake and i will show you what

10:25

a blunted mistake is sorry

10:30

okay so now let's look at the code when we

10:33

initialize the algorithm we create a pending set

10:39

this pending set is something that does the name say pending means messages that

10:43

are waiting so when a message is in the pending set is waiting to be delivered

10:48

so this is why it's called depending then there is sec that is an

10:52

abbreviation of sequence number okay this is the sequence number used by the

10:57

sender the first sequence number the second sequence number that i make

11:01

in red with the red dot is the

11:05

delivery sequence number it will be used by the delivery

11:09

to order the events that you deliver

11:13

okay so how does it work the algorithm when

11:17

you ask our algorithm to send remember this is

11:21

the reactive uh computing model so there is an event that is the event

11:26

please send a message so so send a message to process d send message m what

11:31

you do is that you call on the perfect link so you ask to the perfect link you

11:35

say please perfectly send to process pd the pair message

11:40

sequence number okay so this formula is means just that i'm sending a packet

11:45

that contains m the message and then the sequence number that at the beginning is

11:50

0 0 right here so usually i have the the

11:55

upbeat to write zero with the with the the

11:59

with this kind of things so i write zero with the things it's not a set is a

12:03

number okay and here what i do after i send i

12:07

increase the sequence number because when i send them the second message the

12:11

second message such need the sequence number that is one so first i send

12:16

message a let's do in blue i send message a

12:20

message a enters in this code on the link i send a 0

12:24

then i send message b message b enter in in this code and i send b 1

12:30

and so on notice that if the handler is not atomic

12:34

this algorithm does not work so here you can see the assumption of atomicity of

12:39

the handler because if the handler is not atomic then there could be an

12:43

interleaving and you send two messages with the same sequence number

12:47

you see my point because this line is executed then this this handler is

12:52

putted this is the scheduled away the handler is triggered the second time and

12:56

execute this line before increasing the sequence number okay so here you can see

13:01

our assumption that i told you right at the beginning

13:05

in our code the execution of an handler is atomic

13:08

so try to convince yourself see that if this handler is not atomic then you can

13:13

send two message with the same sequence number and this will create problems

13:18

i hope is clear then at this point since we have sent our message on the perfect

13:24

so we send a zero after a while you know the perfect does

13:29

its perfect thing it will be slow but it will deliver we

13:33

will see on the other side on the receiver a0

13:37

that is triggered in this handler right here so the the the receiver received

13:43

pd is the destination is the process destination so from home they are asking

13:47

what pd is is just the id of the destination okay it's the

13:52

other process is the other process

13:55

so the other process pd eventually will receive from the perfect link message a0

14:04

yes this is the destination the order

14:08

the destination we receive a 0. so at a certain point at the destination we

14:13

receive a 0 year from the source that is process s

14:18

and what you do right here you put the message in pending so in padding you put

14:22

the message the sequence number and the source

14:26

so we are adding the message to the pending set so in the pending set we

14:31

find something that is pending that contains

14:36

message eight zero i do not write to the source because i assume that there is

14:40

just one source and then after a while you also trigger

14:45

with message b and impending you have a 0

14:49

and b 1 and so on so you can have several

14:53

things in band where you increase of course we have to deliver because

14:56

otherwise this is not a proper algorithm so if the algorithm stops right here we

15:01

don't have this code then the algorithm does not work because you never

15:05

delivered at the upper layer you agree with me and this is the handler

15:09

this right here is the end left that delivers at the

15:13

upper layer so what is this formalism this formalism

15:16

this i think is the first time we see them

15:19

this kind of formalism it means when this predicate is true

15:25

this handler may trigger okay so if this handler is true sooner or later

15:31

eventually the handler triggers and so what is the predicate

15:36

it says exist a message impending such that the

15:40

sequence number of the message that we want that is impending is equal to

15:44

deliver sequence number okay at the beginning the lever sequence

15:49

number is zero and so if i have the pending with this two message which is

15:54

the message for which the predicate is true

15:58

which is the message between a and b for which this predicate is true at the

16:02

beginning there is just one of them

16:06

is a because the sequence number of a zero is equal to delivery sequence

16:11

number zero so the handler triggers and this message

16:15

here is exactly this message here so what you do you deliver the the message

16:20

a to the upper layer you remove the

16:23

message from pending see you remove it here this is just set notation in which

16:29

i say the set is equal to the set minus the message that i delivered

16:34

and then here there is a bit of a typo when i wrote the algorithm here is just

16:38

increase the sequence number okay this is just increase the sequence number i

16:42

mean i i added this that is wrong you don't need the second equal it's just

16:46

deliver sequence number equal delivers deliver sequence numbers plus one

16:51

or if you like more c code this delivers sec

16:55

plus plus okay i'm increasing the level

16:58

so what happened i increased deliver second deliver sex become

17:04

because if i add one to zero i get one the natural number the successor of zero

17:09

is one and so now this event is true for message b do you agree with me and so

17:15

what happens is that you deliver b is anyone okay with this execution

17:22

so what can happen is something like this notice that the algorithm takes it

17:26

into account we have the source process s

17:30

we have the destination process s and a zero

17:34

and then he said that we make it in green b1

17:38

and the perfect link you know does its job that is to be just a

17:42

perfect link and send b1 before a zero this is possible that you

17:47

see in this part right here

17:51

that b1 is received before a0 because it's just a perfect link and so what

17:58

happened now is that impending we have just b1 right

18:01

but we have delivery sequence number that is zero so what happen is that

18:07

b one will wait here this predicate will

18:11

not be true until the other message a0 arrives

18:16

so when the message h0 arrives at the process

18:19

we have that in the pending we also put a 0

18:23

and so when we put 8 0 then this thing will be true for eight zero you deliver

18:29

eight zero you increase the delivery sequence and then you deliver b1 and so

18:34

on okay so now i have a question for you

18:39

how much time can a message wait in the pending set

18:47

infinite how much time can we are you sure

18:51

i mean i i get what you mean you do not really

18:54

mean anything you mean unbound okay so you mean for any finite number of time i

18:59

can find infinite number plus one okay this is what you mean yes

19:04

because this is the exact example so you receive

19:09

b1 and you didn't receive a0 b1 will wait in the pending set until 8 0

19:16

arrives when a0 arrives it unlocks the delivery of b1

19:22

and with the same example i can show you that also b2

19:26

sorry c2 let's say has to wait for b1 and 80 and so on

19:34

so does everyone agree that this algorithm is a fivo it's a fifo link are

19:40

down on the algorithm some line if you have doubt

19:45

is there a reason why sequence number that you see which number are strictly

19:48

monotonic this is a really nice question you mean strictly monotonic why increase

19:53

them just by one and i i mean this this is what you mean

19:58

by strictly monotony okay so first there is the the question

20:08

of giovanni so giovanni vermont is asking why b1

20:13

arrives at this point

20:16

b480 the answer is that the perfect link does

20:20

not ensure ordering so if you look at the property of the perfect link let's

20:24

go back to the property they are just just these three are the properties of

20:29

the perfect link and so there is no property that say

20:32

that the message have to be received at this point in the same order the sender

20:36

sent them okay so this is why

20:40

b1 may arrive at the destination before h0

20:45

but at this point our algorithm enforces that that this

20:49

point that happens here the order will be respected

20:54

yes from perfectly into function okay so the reason why they are 33

20:58

monotonic is try to build the same algorithm

21:01

by not increasing the the segment's number sometime what will happen is that

21:06

you will have two messages with the same sequence number if there are two

21:09

messages with the same sequence number you cannot decide the order so for this

21:13

reason you need strict monotonicity so you need to increase you cannot have the

21:17

same sequence number for two different message

21:20

it i mean think a bit about it it's it's obvious

21:26

okay and so now what we will see is the

21:30

formal proof of the fifo why the algorithm respects five so

21:34

really carefully we will look at all the line and we will show the t respect

21:40

so the first three property i do not show why i do not show the first three

21:44

property because they are come directly from the perfect link is obvious i mean

21:48

if this link is perfect and i send a message that i only receive

21:53

from the perfect then the property must be respected

21:56

this is easy so i do not prove them if you

22:00

want to be really really really pedantic you can prove them yourself but it's

22:04

their trivial property the only property that is interesting is

22:08

the fifo property so the fever property that we have to

22:11

prove is this one if the receiver so if the process did destination

22:16

delivers message m before message m prime then m was sent before m prime

22:23

and this is the property that we will prove this is the formal proof

22:28

as always in the formal proof since i like proof by contradiction i borrow it

22:32

by contradiction so i i start negating this

22:36

and they show that if you negate this then there will be a problem

22:40

so suppose the destination deliver the message in different order

22:44

so let's call them a and b there is no difference

22:49

so suppose that the destination sorry again suppose that the destination

22:55

delivers in reverse order so it delivers b

22:58

and then a but a was sent before b

23:03

this means that the timestamp of a is less than the time sum of b why because

23:09

when the the the sender delivers here it increases right so if it send a message

23:15

before another it means that the type stem away

23:19

so it's disconnected so b

23:26

a a

23:29

b so it means that the type sum of a

23:32

has to be less than the timestamp of b because the sender

23:36

sends the message with this code right here so it cannot be different you agree

23:41

with me so let

23:44

t be the instant at which the destination

23:47

deliver b so if the destination delivers b

23:52

then we have that the delivery sequence number of the destination is exactly

23:57

equal to type 7b do you agree with me because you only deliver sorry you only

24:02

deliver when this thing is true

24:06

so you only deliver when the timestamp of the message that you deliver is

24:11

exactly equal to the timestamp that you have for the delivery receivables

24:17

this is also obvious is is just what is brought on the algorithm

24:22

and if the timestamp is equal to b since we always increase here it means

24:27

that there was a time in the past in which the timestamp was equal to one to

24:33

a sorry this is delivery sequence do you agree with me if there is a time

24:38

in which the delivery sequence is the timestamp of b

24:42

and the timestamp of b is greater than the timestamp of a then there was a time

24:47

in which this delivery sequence was equal to the timestamp away

24:51

to make it clear let's put a number let's say that db is 10 and ti ta sorry

24:59

is 5. so if delivery sequence is equal to 10 it means that there was a time in

25:04

which the delivery sequence was 5 do you agree with me

25:09

i mean it is obvious so what is the only condition that we

25:13

have to go from five to six in the algorithm

25:17

there is only one case that brings you too far from five to six this number is

25:22

when you deliver message five right because the only way is that they

25:27

trigger this handler with delivery sequence five and a message that has a

25:33

time same five but the only message with time system

25:37

five would would which is the only message with time

25:41

seven five this is a question the only message with

25:45

times five is a is the only one right because the times

25:51

then are monotonically increasing are unique

25:54

and so it means that if you go to 5 to 6 you deliver a do you agree with me

26:00

and so it means that you deliver a before b you agree with me and so it

26:04

means that we have a contradiction so this thing was impossible is impossible

26:08

that happens this is the proof

26:13

as you can see the proof is not really long

26:16

but this you we have been really careful okay for an algorithm it was obvious so

26:21

you see the algorithm you see or the algorithm works but still

26:25

we have seen the proof so that you are really convinced that it works okay

26:31

and so now what we will do we have other exercises on the link but we will do it

26:37

after uh we do the topic of time too okay

26:42

so now what we are seeing let let me do our recap

26:46

we have seen the fifo link okay so and what is the

26:51

important property of the fifo link is the order

26:55

that you receive the messages in the same order they were sent

26:59

in the perfect link there was no ordering concept

27:03

so and the fifo link is an important link why is important because this

27:08

concept of ordering will be crucial in a lot of application

27:12

and this ordering the cipher ordering is the most

27:17

simple ordering to enforce y is the most simple because you just need the

27:23

sequence number on the center okay but there are other kind of ordering

27:28

that are more useful but more complex to implement really really complex and to

27:33

make you understand what is a certain kind of ordering that we need

27:38

and i introduce you in the lecture time too but we can implement only later when

27:42

we do the broadcast we will see now time to

27:46

it is the concept of logical time that is also called casual time that is a

27:52

time fictional time is not the real physical

27:56

time but it's a time that we can construct with algorithms

28:00

and this time respect the property of happening before respect to the property

28:06

of causality for now this will not really be clear

28:10

100 we will see it now

28:14

it cannot happen so from home

28:17

mateo is doing a question he say what happens if approaches crash recover and

28:22

start sending message again with time sim zero

28:25

this cannot happen in our model because once you crash you crash forever okay

28:29

you cannot recover anymore but this is a uh an interesting question

28:34

the you can imagine how to build an algorithm with crash recovery it's

28:39

really easy you ask the receiver so when you recover you ask the receiver and you

28:43

say oh what is your last sequence number and you start from there okay you can do

28:48

some trick like that you also need a kind of timestamp to

28:51

remember what is your recovery but this is an exercise that i leave to you

28:55

because it's not in our model but it is possible

29:01

okay so let's do time to so i i share the screen

29:07

okay so for a moment you can see the new screen right

29:11

time okay so this is the token again but i

29:18

will show you token again in when there is the

29:22

the the when we do the break so that you have

29:25

time to confirm your presence and so what we will see in time to the

29:30

logical block so we have seen clock synchronization

29:39

and clock synchronization only works on synchronous system

29:43

and even on synchronous system we have seen that clock synchronization cannot

29:47

happen perfectly so even on synchronous system we have seen

29:53

that the synchronization must have some imprecision it cannot be

29:58

precise 100 so

30:02

in reality physical time for many application

30:06

is more powerful that what you need because most of the time you just need

30:10

the concept of causality that i will show you in an example right here

30:16

it it turns out so it happens

30:20

that you can implement a logical clock that also works on system that are

30:25

asynchronous so on system where there is no

30:28

clock you can build the logical clock that enforces this causality concept so

30:34

even in systems that are asynchronous there you can still build

30:38

something that is similar to a clock

30:42

it's called a logical clock or there is also another version that i call it

30:45

vector clock we will see both in this clock are special because they

30:50

are not clock-up times they are clock related to events

30:54

and if you look at these clocks sometimes not always you can tell if an

31:00

event happens before another even if you don't have a concept of physical time

31:05

so this is why we need it so to show you why we need this thing

31:10

and why we need other ordering that are different from fifo i will do an example

31:14

of an execution of a distributed chart so let's take for example that we have a

31:19

certain workplace that is mission critical mission

31:22

critical means that it has to work whatever it happens

31:25

and in this workplace you use a distributed chat application so everyone

31:29

has an application there is no central server when you send a message on the

31:33

chat it broadcasts the message to your co-worker so you send it to each

31:38

worker the message and so on why we want a distributed without

31:42

central server well because there is no there is no

31:45

central point of failure and in a mission critical environment you do not

31:49

want a central server that goes down and blocks any possible communication i

31:55

mean is trivial yes so there is a question from um i i

32:02

will not repeat the question but yes you will understand now now that we look

32:07

at the logical clock so why we assume that the model is

32:12

asynchronous well because we are in a mission critical environment it's

32:15

possible that the system loses synchrony so we want a chat

32:19

in on an environment that is a synchronous

32:23

since the environment is asynchronous we cannot synchronize scope

32:27

and we cannot have use the timestamp with the software clock you remember the

32:31

software clock the one that is connected to the arduino clock

32:34

because the same system is asynchronous so now let's say that we have this chart

32:40

and we have these three people that are chatting using your chart so the first

32:45

one alice asks to someone if the price of apple stock drops what we should do

32:52

and mike's tells well if the the the price of the stock drops we should sell

32:57

the the the apple stock and we should buy the

33:01

amazon stock okay and alice then asked who will do it so

33:05

who is the the one that has to do this thing and the the supervisor of bob the

33:10

supervisor is the chief say bob will do it okay this is something this is a

33:14

normal conversation that may happen well if we are in a distributed system

33:19

we can imagine something like this there is alice

33:23

there is mike then there is bob supervisor that is

33:27

just s and then there is bob right those are those are process because at

33:33

the end of the day there are processes that communicate with the child

33:37

so it's possible that alice sends the message so

33:40

it sends several message and something like this happen

33:46

because this is a sentence okay so the message reaches mike which is the

33:50

supervisors and so on it's possible that then mike sent the message because mike

33:54

received the first message so he sent me the message

33:57

and you see something like this and then alice sends the second message

34:04

and this happen why because there is asynchrony right asynchrony is not our

34:08

friend and then bob supervisor send a message

34:14

so if this happen what will be the local view

34:19

of bob the local view of bob is something like

34:24

this happen is this one

34:26

okay so bob just sent you messages see the

34:30

first message that say we have to sell apple and buy amazon and see the second

34:34

message let's say bob will do it what happen is that bob will sell april

34:39

stoken by amazon because bob does not know that this was just a discussion you

34:44

know with alice that say what what if for the local view of bob this is what

34:49

is really happening right then

34:52

bob will receive in the future because we have perfect link so he will receive

34:57

in the future the message of alice and it will understand okay

35:01

i've done a mistake but bob make the mistake right here

35:05

at this point before he received the message and

35:08

that's it it's done is it clear what can happen

35:13

and this can happen so what is the way to avoid this

35:19

the way to avoid this is the concept of causality

35:23

why because this message of mike

35:26

was generated before there was this message of alice do you agree with me

35:31

the reason why this message born is because there is this one

35:35

and this message has a causal relationship to this one so

35:40

if you look at if you you can see this pair of message you understand that the

35:45

meaning is totally different that if you just see this message

35:50

notice that in this case the fifo order is respected if we look

35:56

at this execution is the fifo ordering why sorry there is

36:01

no fight for ordering because i crossed it right here but i would avoid the

36:04

cross okay because it's possible that bob received

36:08

the message in the same order that the sender send it let's call this a1

36:14

and this a2 and after a while after one hour bob will receive a1 and then a2

36:21

so if we look at any sender the order in

36:24

which bob received the message is the same of the five

36:29

so fifo link do not save you in this in this case we need another concept of

36:34

ordering a concept of ordering that is able to capture this concept of

36:39

causality so we have to avoid this kind of problem

36:44

and what we need to avoid this kind of problem

36:48

we need that bob us to know

36:52

when received the message from mike that there is something that causally

36:57

generated it so we need some kind of mechanism that when i receive this

37:01

message and i'm bob i look at the message and they say look

37:05

there is something that tells me that something happened before this message

37:09

so probably i should wait and so our goal in this lecture will be

37:16

to find a way to timestamp events that follow our our intuitive notion of

37:22

causality so a way in which we can timestamp events so that we can capture

37:27

this causal relationship okay so now i will do uh

37:33

i will answer to something that from whom they said when i said we need

37:36

another kind of order from home they said we need a global

37:40

order the global order is different i mean in

37:44

distributed system we have the concept of total order but is orthogonal

37:49

to the concept of causal order the concept of total order this is an

37:53

anticipation we will see it but anyway is is good to make this thing clear

37:59

right now there is a concept of total order that

38:02

means all the message have the same order for

38:06

everyone but this concept is orthogonal in distributed computing to the concept

38:12

of causal order it could be the reverse of the causal

38:15

order i can have an evil entity that look at the causal order of message and

38:20

then on all the process deliver the reverse

38:23

but if the order is the exact the same for all the process this is

38:28

still global or total order two different

38:34

concepts globally total order is an ordering gold events but does not

38:37

automatically imply that is the council it could be the reverse of the castle

38:42

it could also be the reverse of five so the sender sent a b c everyone

38:47

receives c b a this is still total order but is the reverse

38:52

okay and so now let's formalize what is a causal relationship for us

38:59

so there are there are two kinds of observations that they were made by

39:03

lamport this is lamport leslie lamport because leslie lamport in a seminal

39:07

paper that is also linked on the web website

39:11

they find it this causality in this logical clock so on the on the website

39:14

saying there is the link to the original paper you can read it it's not a

39:18

difficult paper the first observation of lamport is if

39:22

you have two events in zero and the one

39:26

that happened on the same process p0 and the p0c that the order of the events

39:32

is zero first and e one after then of course the causal relationship

39:37

the real order is h0 before e1 and this is something obvious if i'm the one that

39:43

i'm generating events and i generate the event a

39:49

before the event b then in the real world

39:52

event b cal could be culturally connected with a but not the other way

39:57

around and so this is the first observation the

40:02

second observation that lamport made is let's say that we have a

40:07

message m and this message m was received with

40:12

event e2 and was sent with event e1 then there is a causer relationship of

40:18

course there is a causal relationship the event of sending something

40:22

is causally related with the event of receiving something or stated in an

40:27

obvious way you can receive something only if someone sent it right this is

40:33

this is an obvious causal relationship and so using these two observation we

40:39

can create an ordering of the events in a system

40:44

that is also asynchronous okay this ordering is not a total order

40:50

it's a partial order because there are events that you cannot order and we will

40:54

see it in a few slides so just for uh notation we use the arrow

41:01

with the i to means that there is a certain

41:05

ordering between the events in a certain process i so in this case i write for

41:10

example e 0 r 0

41:14

e 1 and if i write something like this sorry

41:18

e 1 let me write it more clearly it means process zero

41:22

c the event e zero before the event e one this is what i mean with this arrow

41:28

so it means that e zero causally was happening before e one this

41:33

is the first and then we use just an arrow to

41:38

indicate the opponent before relationship between any pair of events

41:42

even if they appear on different process so in this case e1 i have to write just

41:48

r e2 why because they are events that are happening on different process so

41:52

the arrow means just a relationship but i can also write it zero

41:56

just r without anything e1 and this is also true because they are happening on

42:01

this process but that is the relationship so if i write the arrow i

42:05

mean with the arrow even 0 is happening before event e1

42:12

event e1 is happening before event e2 two events e and e prime are related by

42:22

the opponent before relationship and i write e happens before e prime

42:27

for three possibilities the first possibility is the local ordering there

42:32

is a process that c e before e prime is this possibility right here that i

42:38

also reported here let's let's make it in green

42:41

so this is the first possibility for the our relationship

42:45

the second possibility in blue one is the send receive ordering so if there

42:50

are two events e and e prime and are the send and the receivable

42:55

the same message m then these two

42:59

events are connected by the opponent before relationship

43:03

and the opponent before relationship tell us that the send happens before the

43:07

receiver this is this is this is obvious at the center special

43:12

and we have the third one the third one and make it in purple is the

43:15

transitivity the transitivity say that if existing event

43:20

is second such that e happens before e second and the second happens before e

43:26

prime then transitively i can say that e happens before e prime and this is this

43:32

is it is this particle this is transitivity

43:36

why because there is the send of a message then you receive the message

43:40

send receive then the other the other guy creates another event after local

43:45

ordering and then it's easy to see that there is a casual relationship between

43:49

this and this now there is a thing that i have to

43:53

clarify and to using the transitivity you can also

43:57

prove of course sorry i don't know why it's

43:59

disconnecting using the transitivity of course you can also prove that there is

44:04

this casual relationship right here so e zero happens before e3 why because we do

44:09

this row and then by transit we use this event for transitivity and that's it

44:15

so the opponent before relationship means

44:20

that it's possible that this event e3 was created

44:25

because it zero exists it does not tell us

44:30

and nothing can tell us only if we look at the semantic of the algorithm that e3

44:35

was indeed created because it's zero exists this depends on the output on the

44:39

semantic of the algorithm but if there is

44:43

a napping it before relationship then means that e3

44:47

knows about the existence of e0 and so it's possible that e3 is created

44:53

before each zero and so if you want to respect the causal ordering you have to

44:58

show someone h0 before e3 okay this is what you mean

45:03

you can look now if you will look at the figure and another thing intuitively

45:08

you can see the opponent before relationship but

45:12

something which you can draw a line in the space tie down diagram a line

45:17

that cross the send and receive messages and that connect to all the events in a

45:23

casual order okay this line cannot go backward in time this is important we

45:28

will see an example right here so an important thing

45:33

is if we apply these rules so we apply local ordering send receive transitivity

45:39

and we keep applying transitive transitivity sensitivity

45:42

we can define a causal order of a certain sequence of events

45:49

the problem is that this sequence may not be unique

45:53

y is not unique because this is just a partial ordering is not an ordering

45:57

among all the possible events because you can have

46:03

two events that are not inappropriate before relationship

46:08

is possible and in this example are e4 and e3

46:12

so let's say that there is there is this event e3 that happens here and then

46:17

there is event e4 that happens here that is another event or so on we can see

46:21

that if we look at the rules there is no rules that connect e4 to e3

46:26

why because well i know that e1 happen before e4 because of local ordering but

46:33

then i cannot use the send of ratio one message why i'm going backward in time

46:37

does not make any sense and so what does it mean that you events

46:43

are concurrent intuitively two events are concurrent if they do not know about

46:48

each other so this event e4 is concurrent with this

46:53

event e3 if i see in the execution and say and i say oh there is no way with

46:59

this communication of messages that the event e4 knows about the existence or

47:03

even e3 so they are concurrent it means that in the appended before

47:09

relationship does not tell us an order between them

47:14

it is us in an asynchronous system are happening exactly at the same time you

47:18

can imagine somebody like this and so that happened before relationship

47:24

is called for this is this is something for the more mathematically inclined

47:28

this kind of ordering that is not total is called the

47:32

uh posit okay deposit is a partially ordered set and this is what it is okay

47:38

so now i have a question for you what is the relationship between e1 and

47:44

e if you look at this execution so event e is happening here

47:49

e sorry e one event e here is there a relationship between them or not

47:59

is there a relation no they are concurrent

48:02

they are concurrent why it's true that there is this message but this message

48:06

is just connecting these two events with this other two you cannot use this

48:10

message to connect this event with this one

48:13

you look at the intuitive notion of causality this mess the fact that i

48:17

receive a message here does not bring any information from this point to this

48:21

point so they are concatenated

48:24

you can also see this by applying blindly this rule so you apply bluntly

48:29

this rule and you will see blindly and you will see that you cannot create a

48:32

path that goes from there to that okay remember the other intuitive things you

48:37

can try to create a path but you go backward in time and this is not

48:40

possible to connect this so it means they are not related

48:44

let's see another example this is an execution that is a bit bigger

48:49

so in red this is a possible casual path this red right here that i'm drawing is

48:55

a part and for any events on this path there is a causal relationship on the

49:00

red part why because this event is generated send received local ordering

49:05

send receive local ordering send receive local ordering local order send receipt

49:12

so they are all connected and this is our first sequence of event

49:16

then there are the green one the green one send receive local ordering

49:21

local ordering center is here now you can see for example that there is a

49:25

relationship between this and this

49:29

there is a relationship because that happens on the same process there is a

49:32

relationship between this and this okay but you can also see

49:37

that e 1 3 this event right here and e 1 2

49:44

this one they are concurrent why they are concurrent because this

49:48

event right here does not know about this one you can see in this intuitive

49:51

way why because what is that eq knows what is that this event knows it knows

49:56

only these it was only about this part of the

50:00

system okay does not know about this one also this

50:03

event was only about this part of the system

50:07

these are concurrent it means that in an asynchronous system no one can tell you

50:13

the relationship between these and this no one can find the order okay

50:17

you can see that the council order the opponent before relationship

50:22

as a strict

50:24

relationship with the relation with the concept of undistinguishable ex

50:30

execution there is a strict relation between this

50:33

and the distinguished the undistinguishable execution why because

50:37

against the light of this event whatever i mean and i'm still being concurrent

50:41

with this one so you can take in an asynchronous execution you can take you

50:45

can current events you can move them a bit and no no things will change for for

50:49

the entire system they are they are they are indistinguishable

50:52

the execution that you create by just oscillating

50:56

so let me make a question event three e event e3 one

51:01

and e three two what is the relationship this is a question between these two

51:06

events they are concurrent is three you have to

51:11

see that they are concurrent why this one knows only about what he knows there

51:14

is this and the relationship but cannot help us in being in norwich okay so they

51:18

are and

51:21

this one and this one there is the red part

51:30

there is the red line okay and between sorry

51:34

can be no they are not concurrent this happens before the other and this one

51:39

and this one no they are not concurrent because they

51:46

happen on the same process the first reason and the second reason is this

51:49

part so there are two different reasons for

51:52

which they are not comparing if they happen on the same process there is

51:56

always the opponent before relationship why because there is someone that exists

52:00

there is a physical entity that see these things before this thing so it

52:04

means that it must okay but in this case there is also the path

52:09

i mean it's really easy if you do a bit of experience and you

52:13

see execution after a while you see the execution you can immediately tell by

52:17

just looking at the path and you say oh these are concurrent or not

52:21

so from home there is a question that is can we think that like a graphics the

52:24

graph is called the oligometer the tube process know every process

52:30

okay so there is unreality say events from the same process cannot be

52:34

concurrent no they cannot be concurrent if you look at the definition

52:38

the definition says that there is the local ordering there is a process that

52:42

see one that happens before the other and so these tell us that are not

52:45

compared also intuitively why on the same process

52:49

they are not concurrent well because then when i'm generating this event as a

52:53

process of course i know about this event so this event knows about this one

52:58

so they are not concurrent okay e43

53:03

and e42 where is e42 yes they are casually related they are casually

53:08

radiated because there is this part okay or yes there is this that part

53:14

right here okay that make it causally related so if you see the party means

53:19

that this event knows about these ones okay this is what

53:23

the happened before relationship means in an intuitive sense okay it means that

53:28

this knows about this one

53:31

okay so now we will do a small break

53:35

and then we will see how this thing can be

53:38

transformed in some kind of clock how we can create a kind of clock that

53:43

partially captures this kind of relationship so we will do

53:48

10 minutes break so see you at four and five minutes

53:54

sorry two inside me hey three and five

53:59

okay so see you

54:02

at 15 zero five okay

54:33

sorry bro are the lecture

54:37

record okay okay so there is a question on the

59:47

recording i will upload them i think by the end of the week i will upload the

59:52

recording of the last lecture on the same website okay

1:03:13

okay so two events are

1:03:16

if they are not connected by an opponent before

1:03:20

relationship so let's go let's go back at this example

1:03:25

and let's take this event right here and the second event this one here sorry i

1:03:31

will use the the ipod tool

1:03:41

so let's look at this event here in this event right here they are

1:03:45

concurrent because they are not connected by an opponent before

1:03:48

relationship two events are connected by an opening

1:03:52

before relationship if they can be connected by using this three rule

1:03:56

local ordering send receive or transitivity

1:03:59

if we look at these two we can see by trying to apply the rule that there is

1:04:04

no rule that connect them intuitively you can also understand that

1:04:08

they are concurrent because you see how the message are

1:04:11

and then so on and you see that there is no part from this event to this one that

1:04:16

respect time on the execution a part of that respect time is a part that does

1:04:21

not go backwards now i will draw in yellow a path that does not respect time

1:04:27

this path does not respect time y because this r goes backward in time

1:04:32

this is not possible so if there is no path respecting time

1:04:36

between the two events they are concurrent

1:04:39

intuitively concurrent means that this one does not know anything about this

1:04:44

event and the other way around so they are asking a 2 2

1:04:50

and e 5

1:04:54

was the other one e5

1:04:58

e53 again if a3

1:05:02

uh no they are not concurrent why there is this part right here

1:05:17

if two events are concurrent at a certain time they will be all they will

1:05:21

always be concurrent in the future okay

1:05:25

it's not possible that two events are concurrent and then they become not

1:05:28

concurrent why let's take this example right here the only way to make this

1:05:34

event not concurrent is that there must exist some arrow like this

1:05:38

but it's impossible because it is an arrow that you have created that you

1:05:42

have to create backward in time because this is the execution time goes right

1:05:47

there in the execution you can also you can only add the arrow

1:05:51

in this way you can only send the messages in the

1:05:54

future not in the past so if two events were concurrent at a certain point you

1:05:58

cannot have that in the future you may you send a message that was sent in the

1:06:02

past and then receive it in the past so if in an execution you find the

1:06:07

concurrent events for example this one is concurrent with

1:06:11

this one then they will always be concurrent also in the future

1:06:16

if the solution is done in a nice way because the then then you can try to

1:06:20

create something like this but this does not make sense physically sense to have

1:06:24

a message that goes backwards if i want e3 e32 yes they are concurrent

1:06:39

yes okay so

1:06:58

let us start with the logical clause so the logical clock were introduced by

1:07:11

lamport and the logical clock are just numbers

1:07:16

okay they are a logical clock is a number that exists on each process and

1:07:21

this number is updated when events are created or messages are received

1:07:26

and by using this number you can partially

1:07:30

partially means not completely capture the notion of causality so we can create

1:07:36

what we can create with a logical clock is a kind of logical type stamp that i

1:07:41

indicate with a function l i is the logical clock on process i

1:07:46

and i can use logical clock i of e to indicate the timestamp

1:07:51

i sign it by logical clock to event e that happens on process i event e

1:07:59

a with this logical clock i have this property right here

1:08:03

this property right near tells that if unevents

1:08:06

happen before another then the logical clock of the first

1:08:10

event will be strictly

1:08:12

less than the logical clock of the second d1 event

1:08:16

so this this is just i'm we are just capturing causality so

1:08:22

this property does not mean these kind of things right here

1:08:33

so does not mean that

1:08:37

if we have the logical clock of e that is less than the logical clock of v

1:08:42

prime then

1:08:45

e happens before e prime so this is the reverse of this

1:08:49

implication and is not true okay the implication works only in one way if

1:08:54

this is true then this is true not the other way

1:08:57

around to have the other way around

1:09:00

that capture i mean completely the causality so that we can see at the

1:09:04

clock and say oh if the clock are in this way

1:09:07

then the event are in this way we need the vector clock that we will also see

1:09:12

today but are a bit more complex i mean more complex that the logical code

1:09:17

so what is the this logical clock this logical clock is a counter that exists

1:09:22

on each process and we have really simple rule

1:09:26

to update the counter so to create the logical clock at the beginning

1:09:31

each process starts with the logical clock of zero

1:09:35

so the logical clock of p0 times zero is zero the logical clock of p1 at time one

1:09:41

at the beginning is zero so everyone starts with zero

1:09:45

you increase the logical clock only when you send a message

1:09:51

or when you receive a message or when you create an event

1:09:56

so in this case the process creates an event it's zero and increases the

1:10:00

logical clock so the logical clock goes to zero to one

1:10:05

and this logical clock is used to timestamp event zero so the logical

1:10:09

timestamp of event zero is one then process zero send a message the

1:10:15

events of sending a message is another event so you increase your logical hope

1:10:20

of two and you time stamp the message so on the

1:10:24

message you attach something that is logical clock equal to

1:10:28

and you send the message with the logical block

1:10:31

on the other side you have that you create an event and when you create an

1:10:35

event you increase by one and then there is the rule when you

1:10:39

receive a message this is the only important theory a bit

1:10:44

more difficult to rule when you are a process and you receive a message and

1:10:48

this message has a certain logical clock let's say in this example logical clock

1:10:53

two and the logical clock on yourself is one because the logical [ __ ] before was

1:10:57

one you do the maximum so you do the maximum between the two so

1:11:02

you do the maximum between one and two the maximum between one and two is two

1:11:07

you increase by one and you time stamp the receive event by the logical clock

1:11:13

three that is two plus one then you create another event and these

1:11:17

you increase by one and the logical clock is four and so on

1:11:22

if we do in this way and we use this time stamp to increase event then my

1:11:27

claim is this one that if an events happen

1:11:32

before another then the logical clock of the first event is strictly less than

1:11:36

the logical clock of the second one why this probability is true if we use

1:11:42

this simple rule if e

1:11:46

happens before e prime then there is a path you agree with me there is a part

1:11:50

in the execution that connect e and d prime

1:11:55

there is a part is clear is the definition

1:11:58

now i show you that on each edge that we walk on the path we increase by one the

1:12:03

logical two so if we increase at least by one on each edge then it's trivial

1:12:08

that this time stamp will be less than this one why because there is a path

1:12:14

that is longer or equal to one so you increase it to a list of one or the

1:12:17

number of edges so this clock has to be less than the other

1:12:22

so if there is a path we can have two kinds of edges on the path

1:12:26

we can have edge on the same process

1:12:29

but if we we walk an edge on the same process which rule increase the

1:12:34

timestamp this one

1:12:38

or the one in which you increase when you create an event so if two events

1:12:42

happen on the same process that they can be to send event or the other event

1:12:46

whatever you increase the clock by one by using this rule okay

1:12:51

when you have send receive you have this arrow and the message travel and reach

1:12:56

the destination you also increase by at least one

1:12:59

why because you take the maximum between the two and then you do maximum by one

1:13:04

that is an increase of at least one because it's possible for example that

1:13:08

this number is two this number is three and so here you go to four but the

1:13:13

increase on these edges is at least one in this case is still increase on the

1:13:19

edge so this is

1:13:21

trivial to see by looking at this kind of rules so rule one and rule two if we

1:13:27

use this rule we can see that for any path we create when we work the path

1:13:32

from earlier time

1:13:35

to time in the future we increase by one the logical clock from the path

1:13:39

if we increase by one the logical clock of the but means that in any event here

1:13:44

as a logical clock less than the purple one

1:13:48

strictly less at least one less and so it means that this rule holds

1:13:53

okay now do not worry we will see an example

1:13:57

on how to apply logical clock so this is an execution

1:14:02

i don't remember if it's the same execution that were before but anyway

1:14:06

each one starts with a logical block of zero you create an event send logical

1:14:12

clock one you attach one to the message this process receive one zero has to do

1:14:17

the maximum between zero and one takes one increase by one it gets two and so

1:14:22

on so using these rules we are applying the vector clock on

1:14:27

everyone now if we take two events that are

1:14:30

causally connected so in this case e one one is this one

1:14:34

and the second event is e q one e two one is this one the

1:14:40

timestamp reflects the property these events happen before the other the

1:14:45

timestamp of this one is less than the timestamp of this one

1:14:49

it's easy to see i mean

1:14:52

it's easy to verify the reason why is because there is a path that connects

1:14:56

the events for each edge we work on the but we

1:15:00

increase at least one the logical clock and uh

1:15:05

let's take two concurrent events e11 and d13 they are concurrent and in this

1:15:13

case they have the same times okay

1:15:17

but you can have concurrent events

1:15:21

that have timestamps that are different this is

1:15:25

possible the property does not tell us that

1:15:28

concurrent events need to have the same timestamp okay

1:15:33

let's take two concurrent event with different times

1:15:40

this these two you agree with me these two are concurrent

1:15:45

they are concurrent and this timestamp is less than this one okay but that is

1:15:50

fine because the properties tell us if one

1:15:55

happens before the other then logical clock of one is less than the

1:16:00

logical clock of the other not the other way around okay if we just see at the

1:16:05

logical clock nothing is ground nothing is ground okay

1:16:11

we can also have events that have so in this case this time

1:16:16

stamp is less than this one but that's not the end

1:16:21

e5 3 e42 they are saying from one if i have three worry

1:16:25

this one e four two

1:16:28

e four two this one yes they are concurrent

1:16:33

they are concurrent events because you can see that there is no casual

1:16:37

relationship between them they have the same sender so they are

1:16:41

receivable message with the same sender but this does not mean anything we do

1:16:45

not get confused sometimes human students

1:16:48

they think that if the sender is the same then there is a relationship

1:16:51

between the receiver but this is not it's not

1:16:56

and so but we would like something strong

1:17:00

because intuitively we say okay yes we have one direction we have this this

1:17:04

direction here this direction right here but what we

1:17:08

like is also the other direction right we want some primitive

1:17:12

in which we look at the timestamp and then we immediately see oh this happens

1:17:16

before the other this is what we would like

1:17:19

because it's more stronger and this one that intuitively will be more useful

1:17:25

luckily for us two people matter and fridge

1:17:28

they proposed an improved version of the logical clock

1:17:32

that we will see they are called vector clock

1:17:36

and vector clock enforce this property right here they

1:17:40

say if one is less than the other then this

1:17:44

is true and also the other way around so for the

1:17:46

logical clock we have that l e

1:17:50

less than l e prime there is the double implication e e

1:17:56

prime okay is the one we want he totally captured causality they are

1:18:01

called vector clock so why they are called vector clock

1:18:06

because they are vectors of logical clock so vector

1:18:10

and now we will see the vector clock really in details and i

1:18:15

will show you why they work so how do i show you why they work

1:18:22

i first will create an intermediate structure

1:18:28

an intermediate structure that is not a logical clock is something more verbose

1:18:33

than a logical clock because i will use the entire history of the events

1:18:38

i show you that this structure totally captures your calculator and then i show

1:18:42

you easily that this structure is equivalent

1:18:46

to a vector of clock a vector of number so that you can use

1:18:50

vector of numbers instead of this kind of data structure

1:18:54

that i will show you and so this is our goal

1:19:01

if the vector clock of one is less than the vector clock of the other then the

1:19:05

events must have in this relationship the first intuition

1:19:10

is that the log the the clock in this case

1:19:13

cannot be a single number so we cannot use a single number as in the previous

1:19:17

case in the logical clock so we have to use something more powerful

1:19:21

than a single number if you remember when i was talking about

1:19:25

casa relationship i always told you ah this means that this event knows about

1:19:30

the other so cause our relationship can be summarized by saying oh an event

1:19:37

is casually related with something else if that's something that

1:19:41

is known by the event so what we have to use

1:19:46

in this case is the entire history of events

1:19:49

so each process starts with an array this array as a component for each

1:19:56

process on in the system so this is the example just with two browsers

1:20:00

so the first component is for the first process the second

1:20:04

component is for the second process

1:20:08

so this is the data structure that i use each component

1:20:12

of the array is a list a list that i call history is the entire

1:20:17

history of the process known so what i mean by known is the entire

1:20:22

history of that process that you know when you generate the events

1:20:29

so the rules

1:20:31

that i use to create this data structure are simple so for the first when i

1:20:36

created of this first event the entire history on pit zero is just

1:20:41

hit zero because the only things you know after

1:20:45

you create event in zero it's just it's zero it's the only things that happen on

1:20:48

your site sorry

1:20:53

it's connected so

1:20:57

the history will contain just h0 when you create it zero

1:21:02

do you know something about p1 not yet you do not you know nothing and

1:21:08

so the history of p1 will be empty the empty list

1:21:12

when i create eq the timestamp that i use for it you will be the same data

1:21:17

structure in which on the history of p0 i add event two why because after you

1:21:22

create event you you know eventually look that this history

1:21:27

is exactly this one okay this thing in purple is exactly

1:21:31

this one this thing in blue is exactly this one because you know nothing about

1:21:35

p1 so it's empty p1 does the same thing so it starts with

1:21:41

the same time stamping technique you create an array of history this event

1:21:46

when you create this event you know something about pizzeria no

1:21:50

so the history of p0 is empty because you do not know

1:21:54

the history of p1 contains only e1 so do you understand when you create a

1:22:00

new event what you do is that you just appear and on your list

1:22:05

the event and that that's it

1:22:08

when you create an event locally you just append to your list to your history

1:22:13

because when you do something you increase your history

1:22:17

the interesting thing is what happened when you receive something

1:22:21

so this data structure is attached to the message so when the message you

1:22:24

receive this message you receive this data structure right here

1:22:29

what you do is that you use this updated rule

1:22:32

you check for all the history and you see if there

1:22:37

is an history on a process that is newer

1:22:42

if so you take it this is the logical equivalent of the maximum when i

1:22:47

do the maximum in the logical [ __ ] i say oh which event is newer and then i take

1:22:51

that one in this case i take the longest history so what i mean i will do the

1:22:55

example without the overlay right here this process receives something and this

1:23:01

something contains an history of p0 that is e0

1:23:06

e2 is this history right here

1:23:09

when you receive this message what is your known history of p0

1:23:15

is nothing okay so this history here is newer

1:23:20

contains more information do you agree with me contains more information

1:23:24

and so what you do when you create this event right here you replace the history

1:23:28

of p0 with the easter inside of the message

1:23:32

and so the timestamp of e3 will be the history of pit zero that you received

1:23:37

by mean of the message plus your history so

1:23:41

from a graphical perspective this is what you are creating

1:23:46

is your view is the view of the system that i represent with the events right

1:23:50

because when i use this rule that i take the new history i'm just creating this

1:23:55

thing right here in this data structure

1:23:59

then you create a new event and when you create a new event you append the event

1:24:04

in the history and so on and so here in this slide there are the

1:24:08

rules so

1:24:11

is is it clear how it works for the updates

1:24:15

question from

1:24:18

year ago question on how you operated this data structure

1:24:26

yes so this message right here contains this

1:24:30

is just a message m okay so the the message is not important what important

1:24:34

is the history the history is done in this way

1:24:38

history with 0 contains

1:24:41

event 0 event two

1:24:45

is to repeat zero history p1

1:24:48

is empty y is empty because at this point you

1:24:52

know nothing about p1 okay so this is the message the message is

1:24:56

received by process process1 at this point right here as an

1:25:01

history that is done in this way history process 0 empty

1:25:08

history process 1 contains e1 e3

1:25:14

okay what you do is do you do the merge

1:25:17

of your history and the history you receive how you do the merge you look at

1:25:21

each component and you take the component that is

1:25:24

longer so in this case i see oh the history of p0 of that guy is greater

1:25:31

than mine you know more about speed zero so what i do now i know this thing also

1:25:37

i also know this thing because because i saw them just now and so i create a new

1:25:42

history which i update and i take this component and i replace i replace this

1:25:47

one with this one and so i will create for this message and history that is p0

1:25:52

for this event right here an history that is p0 it's 0 e2

1:25:59

and then an history that is p1 that contains e1

1:26:05

and e3 because i also know about it because i'm

1:26:09

just generated okay is it clear

1:26:13

out work you're welcome every time we send the message yes every

1:26:26

time you send the message you use this data structure and you attack to touch

1:26:30

to the message no events cannot be removed from the

1:26:33

easter it cannot be removed from the history

1:26:36

because it may does not make any sense to remove an event from the eastern i'm

1:26:39

trying to capture the entire history of the system that you know about okay

1:26:43

so those are just the rules the rule are also to increase

1:26:46

okay and so if now that we are using a kind

1:26:51

of data structure but if we use this data structure we don't have the notion

1:26:55

of something is smaller than the other right because they are least list of

1:27:00

objects how do we say if something is smaller than the other we have to define

1:27:04

it i say that a certain

1:27:07

history is greater than another history

1:27:13

we there is a question from i will answer to the question shortly let me

1:27:17

doing this in this last case now i i need something to compare

1:27:22

this kind of data structure so how to compare other this kind of data

1:27:26

structure i say that the structure one is greater than data structure too

1:27:32

if and only if

1:27:34

all the history are one contained in the other

1:27:38

and there exists an history that is strictly contained

1:27:41

so now i will show you with with the example let's take the data structure of

1:27:47

this event that is this data structure right here

1:27:51

this data structure is the data structure of this event and let's take

1:27:55

the data structure of this event e4 for this definition this data structure

1:28:01

is greater than this one why because if i take this history here it's

1:28:06

contained or equal do you agree with me this history is equal to this history

1:28:11

so it's contained or equal it's equal in this case

1:28:15

this history here is strictly contained what you mean by strict what i mean by

1:28:21

strictly contained is smaller this is empty this contains three events these

1:28:26

no more okay so if there is a component on which you

1:28:30

know more you know

1:28:33

more and the other component are equal or greater then i say that this data

1:28:38

structure is greater than this okay

1:28:41

with this definition everything works so

1:28:46

if event e

1:28:49

happens before event e prime then my claim is that the first data structure

1:28:54

is smaller than the second why because if e happens before e prime then

1:29:01

there is a a path that connects e to e prime do you agree with me and on this

1:29:05

part what we are doing is that we are building the data structure and so it

1:29:09

means that that abstraction of each zero with this rule will be included in the

1:29:13

other structure of the other process because when i receive or increase

1:29:17

on the same process or i do the replacement

1:29:20

and so this is the intuition of why one direction work

1:29:25

now i also have to show why the other direction work

1:29:29

why if this data structure is less than the other then this event happens before

1:29:34

the others if this data structure is less than the

1:29:39

other then it means that this data structure is contained right here do you

1:29:43

agree with me by the definition

1:29:45

it also means that this data structure contains event e

1:29:50

because we have an history that contains e inside this data structure

1:29:54

if there is an history that contains e in this data structure this history that

1:29:59

contains e is also in this data structure

1:30:02

because they have to be contained if this history that contains e is in

1:30:06

this data structure it means that this event

1:30:09

knows about event e

1:30:12

if this event e prime knows about e then the only possibility is this one

1:30:18

this is a graphical proof suppose that you have a data structure

1:30:23

and this data structure contains event e then the only way

1:30:27

to contain its event e it means that there must be a part a causal path that

1:30:32

connects e to this event right here and so that's it the group

1:30:38

that's it's proof because if this contain e then there is this part

1:30:42

and so this is true because by the definition we are saying

1:30:45

that if the the timestamp of this event is included in the timestamp of this

1:30:51

event then there must be this causal path it's the only possibility because

1:30:55

it means that this contains e so if this contains e there is a path

1:31:01

that has connected the the the generation of e to the event e prime

1:31:08

okay now there is this is exactly this cultural pathway

1:31:13

and now there is a question from home that is really an important question

1:31:17

from from eduardo he say okay but this data structure that we are creating can

1:31:22

be problematic if we have several processes i mean if we have a system

1:31:26

with 1000 process that they generate a lot of

1:31:32

events this thing grows and grows and grows becomes really unmanageable yes

1:31:36

this is true and to

1:31:40

avoid this problem now i will show you that you can transform this data

1:31:44

structure just in a vector of number so we can create all these things that

1:31:49

we have created the history and i can collapse the entire history to just a

1:31:53

number a number that is equal to the number of

1:31:57

events in the history and this is possible if we do a simple

1:32:02

observation the solution is let's say that we have an execution that is really

1:32:06

big with a lot of process thousands of thousands of processing a system and at

1:32:11

a certain point i see two data structure is it possible that i see something like

1:32:16

this so the data structure of event one contains history px

1:32:21

and these three px contain e0 e1 e2 then i see that there is another event

1:32:27

that for history x contains e0 e1 and e3 so there is an event that is different

1:32:33

is it possible or not with our rules to create something like

1:32:37

this try to listen a bit

1:32:45

who is the only one that includes history px

1:32:50

that increase history px that add an event to the history in the system in

1:32:56

the entire system there is only a single entity that does that

1:33:00

is px is the entity px she is right is px okay

1:33:07

so if

1:33:09

is px is possible that px at certain point to the side then say oh i send a

1:33:14

bit of message in which i add a2 and then i say i send other messages in

1:33:19

which i add e3 no it's not possible it's not possible because you can add

1:33:24

just an event right and so if this is not possible

1:33:29

is something like this possible in which i have e0 e1 e3 e4 and i have e0 e1 e2

1:33:35

no also it's not possible why because this is not possible okay

1:33:40

so it means

1:33:42

that i can use the number instead of the events why because the

1:33:48

only history with the three events in the system is this one or this one it

1:33:54

can be only one with three events i cannot have two different history

1:33:59

for the same process the type three events

1:34:01

this means intuitively there is the proof on the slide but i will not go in

1:34:05

the detail but intuitively it means that you can collapse the entire history just

1:34:10

with a number because what i can tell if i say px is 33 and i mean the history of

1:34:17

length three this is just one issue so there is no need to bring

1:34:22

all the events with you there is no need to do that

1:34:27

because this is not possible and this is so because if an industry is

1:34:31

contained in the other then one is a prefix of the other and the second if

1:34:35

they are perfect then the length are one of less than the other but i don't want

1:34:40

to go in the detail of this the important is that you see the intuition

1:34:44

and so what i can do is something like this

1:34:47

in which i use the same idea but instead of the history i use the length

1:34:52

and so on the first process instead of an history with just event zero i use a

1:34:57

number one instead of the empty list i use just zero number zero that means no

1:35:03

event instead of the history with two events i

1:35:06

use number two that is the history of two event and the only history of two

1:35:12

events on p0 is this one there is no possibility because p0 is the only one i

1:35:17

mean if i have two history with two events then it means that there are two

1:35:20

futures that is not possible

1:35:27

no fire is not possible if you use that construction you can try to then reason

1:35:32

about that yourself you see it and so it means that the entire vector

1:35:37

becomes this one so i use just vector instead of that

1:35:42

data structure and these are the vector block

1:35:48

okay now it can be it can seem strange but we

1:35:52

don't have to to use the entire history of event that was just to show you what

1:35:56

is the intuition of this number that each one of this number actually is

1:36:01

an east okay so there is a simple rule in which we

1:36:05

don't have to use event in which we will use vector and we increase by one to

1:36:09

keep these numbers and the rules is you increase by one

1:36:15

your component when you create an events when you receive

1:36:18

a message you take the maximum all the component and then you increase your

1:36:23

component by one this is the rule that we will use that

1:36:26

is in the next slide so what are the vector clock the

1:36:31

definition a vector clock

1:36:34

for a set of n processes is an array of n counters so if i have ten process i

1:36:40

have an array of ten numbers or ten of ten components so i have components one

1:36:45

two three four up to nine each component is just a

1:36:50

number each process

1:36:52

maintains a clock so each process in the system of 10

1:36:57

has a clock a vector clock that is a vector with 10 component

1:37:03

when you create an events you update your logo clock and you use the vector

1:37:08

clock to timestamp the event so you use a timestamp this is the data structure

1:37:12

that you attach what is the rule

1:37:19

when you start you set all the component to zero

1:37:25

you set all the component to zero so when you start

1:37:28

we are a system with three process you set zero zero zero

1:37:33

so the first component is the component for process one the second component is

1:37:37

the component for process two the third component is the component for process

1:37:41

three when you generate an event you increase

1:37:44

your components so let's say that i'm process two i start i generate an event

1:37:50

i create this vector clock this is the vector clock of the event so i increase

1:37:54

my component by one so we start zero zero zero i increase my

1:37:58

by one my component if i want to send a message specifically

1:38:03

i increase by one my component so the the vector become

1:38:08

zero one zero and i use this vector to timestamp the message m

1:38:14

and then i send the message m that has the timestamp zero one zero okay

1:38:20

this time sent means the history of zero is unknown the history of p3 is unknown

1:38:26

my history contains all the events this is what i'm communicating

1:38:33

when you receive a message this is the interesting thing

1:38:36

when you receive a message let's say that you receive message 0 1

1:38:41

0 1 0 and your process 3 and your vector clock is 0 0 0. what you do this is

1:38:47

process 3 this is the message you receive from

1:38:50

process 2 what you do is that you create a new vector clock

1:38:55

how you create the new vector clock the maximum between zero and zero is zero

1:39:00

the maximum between one and zero is one the maximum between zero and zero is

1:39:05

zero this is an event that is happening i received so what i do i increase this

1:39:10

by one and so zero one one so there are just two rules the rules

1:39:15

when i send and rule when i receive so mate i will answer to you in a bit

1:39:21

let me finish this so intuitively

1:39:29

the component your component in the vector clock represents the

1:39:33

number of events you're producing on yourself this is the same of the list is

1:39:37

the length of the list the components to another process

1:39:42

represent the number of events generated on the order process that you know about

1:39:48

so if process 2 has a vector in which the component of

1:39:52

process 3 is five it means that you know of the five

1:39:57

events generated by process three since the lan is equal to the e so it

1:40:02

means that you know the history of process three up to even five

1:40:07

and what is this is the only rule that is important

1:40:11

is this vector clock one is less than vector clock two if all the

1:40:16

components are less or equal and there is a component that is strictly less

1:40:20

this is important this is the only rule that is really

1:40:23

important one of comparing and

1:40:26

what does it mean if we have this vector vector of event e and vector of event e

1:40:33

prime the first component is less or equal to the second component

1:40:37

the second component is lesser equal to the second component the third component

1:40:41

is strictly less what does it mean that event e was

1:40:46

generated before e prime it's also possible that we have

1:40:51

something like this we have a vector in which the first

1:40:55

component is less than the first component or the other

1:40:58

this is greater and this is less this is possible

1:41:03

when this happen it means that this vector clock

1:41:06

cannot be compared with this one it means that the event are concurrent

1:41:11

okay this is important because this capture the relationship so if a vector

1:41:16

clock is less than the vector clock

1:41:19

of the other then we have this relationship

1:41:23

otherwise if they are not comparable you cannot find that one is greater than

1:41:30

the other then it means that the events are concurrent

1:41:35

we will see an example now okay this is an example

1:41:43

so this is an execution this execution i am updating the vector clock with the

1:41:48

rules uh this dash right here just means zero

1:41:51

okay when you look at the dash it's just zero zero zero zero zero zero zero zero

1:41:58

zero zero

1:42:00

let's take two events that are concurrent in the system this event is

1:42:04

concurrent with this one you see for the definition that we have seen now the

1:42:08

vector clock will tell us that they are concurrent q is greater than zero do you

1:42:13

agree with me yes one is greater than zero you agree with

1:42:16

me yes zero is greater than two no so it means that this vector clock is

1:42:22

not comparable why because this component tell me that this vector clock

1:42:26

is winning this component tells me that this is where [ __ ] is winning this

1:42:30

component here is telling me that this is losing so you cannot compare the two

1:42:35

let's take two events that are not concurrent this one

1:42:40

and this one they are not concurrent if i look there is a part

1:42:44

sorry no so there is no path let me take those

1:42:49

two that are not trivial this one and this one

1:42:57

they are not no okay this one

1:43:09

and this one they are not concurrent okay so this vector clock is zero zero

1:43:15

one this vector clock is four three two if i compare the vector clock this first

1:43:21

component is strictly less this component is strictly less this

1:43:26

component is strictly less it means that this vector clock here is

1:43:31

less than this vector clock right here and so it means that these events happen

1:43:35

before the other and there is the path

1:43:40

let's look at other two payroll events this event and this event

1:43:52

they are concurrent and the vector clock should

1:43:56

be not comparable q

1:43:59

is less than three three is greater than zero so is they

1:44:03

are not they are not comparable you see just these two components so they are

1:44:07

comparable only when all the components are strictly are less or equal and there

1:44:12

is one that is strictly less okay if there is some intersection that you see

1:44:17

one is greater and then there is a flip then they are not comparable and means

1:44:21

that the event are concurred yes

1:44:35

the question mark is uh what is the relationship between these two

1:44:40

i mean in this case means is not comparable

1:44:43

because you can you the question mark means that i do not know because three

1:44:48

is greater than than 0 but 2 is less than 3. and so they are not comparable

1:44:53

so yes the question mark is a bit ugly i should have wrote something like this

1:44:57

that is more intuitively means concurrent okay but the question mark in

1:45:02

this case just means that you cannot compare the two because there is no

1:45:05

strict relationship so

1:45:09

when you have the vector clock to decide if the events are concurrent or not you

1:45:13

can immediately use the vector clock also the opponent before relation okay

1:45:18

so if i give you an exercise with an execution that is a strange and i say

1:45:23

please tell me what are what is the relationship between this event you can

1:45:27

write down the vector clock and then you use the vector clock okay

1:45:31

so let's see an exercise so before ending let's see if you exercise on the

1:45:35

vector clock so the exercise asks apply a vector

1:45:39

clock to each event and then identify the false statement among the following

1:45:44

and here there are statements e1 happens before

1:45:49

e2 this is e1 this is e2 and this is e3 okay

1:45:56

so this exercise asks you to use the vector clock so

1:46:00

now even without using vector clock this is true

1:46:04

you can see that this is true this last one

1:46:07

this is not false even if we don't use vector

1:46:13

y is not false yes there is this part

1:46:20

right here okay but the exercise is asking us to to use

1:46:24

the vector clock so we have to be pedantic

1:46:27

so the vector clock are a bit you know just

1:46:32

a tedious exercise you just have to increase correctly and they always

1:46:36

increase them correctly so the vector clock of this event is one zero zero

1:46:40

zero then you receive here

1:46:43

and you do the maximum so the first component is one but i do

1:46:48

the second component is zero one because i increase on myself and then zero zero

1:46:54

the vector clock of this event is 0 0 1 0

1:46:57

do you agree with me then this event right here here you are

1:47:01

doing the maximum so 1 the maximum between these two the second

1:47:05

component is 0 the dirty component is one

1:47:09

the last component is zero and then i have to increase by one so this is two

1:47:13

we agree this is two then here i have to increase the first component so it's

1:47:17

three zero one zero and as you can see

1:47:21

it gets as ugly as it can and now this one is

1:47:26

one two zero zero do you agree with me so by following the vector clock when

1:47:32

this vector clock is received here i have one the first component

1:47:36

i have two the second component i have zero the third component and the fourth

1:47:42

component is equal to two

1:47:45

because there is this one before okay this this event is zero zero zero one

1:47:50

you see two then this one becomes one two zero

1:47:56

three and you can see that the vector clock of this event

1:48:00

sorry what of this one is comparable with this one why because by following

1:48:04

the path they must be comparable you see when when you construct it you can see

1:48:08

that now the vector clock of this event right

1:48:12

here is four zero sorry

1:48:15

and i have to use this one so one two zero three

1:48:20

let's make all the the vector clock the vector

1:48:23

clock of this one is zero zero

1:48:29

one one two one

1:48:33

zero zero two one the vector block of this

1:48:36

the vector clock of this event right here is instead

1:48:41

three because the first component i have to do

1:48:45

the maximum zero and two the maximum is two

1:48:48

one and zero the maximum is one and then this was

1:48:53

this was two sorry i'm getting confused

1:48:59

this is three and this is zero

1:49:03

is is true that is three three one zero probably

1:49:08

anyway you do all the vector clock and then you compare them

1:49:12

so it's not difficult it's just that this is low

1:49:16

three three the maximum is three

1:49:19

two and zero the maximum is two but i have

1:49:22

to increase by one because it's my component one

1:49:25

and zero the maximum mean one zero yes you should be correct and then the

1:49:29

vector clock of this event becomes three four

1:49:32

one zero and the vector clock of this event right

1:49:36

here should be because you take the maximum should be

1:49:41

three four

1:49:44

three because this is yourself and one

1:49:48

so the vector clock of this one here when i send i just have to increase

1:49:53

my component so it will be three four four

1:49:57

one then i receive it here and here will be

1:50:03

three five because it's on myself

1:50:07

then the second one was four

1:50:12

and one so this is this vector clock

1:50:17

and now this vector clock was one two zero three

1:50:22

one two zero three you receive one two zero three the first component the

1:50:26

maximum is three five four so will be three five four

1:50:31

three because this is the only thing new

1:50:34

is this three right here i send this one again here and become three

1:50:41

sorry this is not five the second component should be six

1:50:44

the second component should be seven because increase it

1:50:47

four three and so the component of this one should be four that should be five

1:50:57

yes should be four that's correct seven

1:51:01

four three and so this vector clock should be

1:51:05

greater than this one and is true because 4 is greater than

1:51:08

1 7 is greater than 2 4 is greater than 0 3 is greater or equal 3 but is okay so

1:51:15

that is okay the second thing is we asked was e1 before e3 e1 before e3 is

1:51:21

also is also correct

1:51:24

e1 before e2 e1 is not correct they are they are

1:51:30

concurrent e1 and d2 because you see 0 0 zero one and one is

1:51:35

greater than zero here so they are not comparable and so these two events are

1:51:39

concave and so that is how you use vector plot

1:51:44

so you just have to carefully increase follow the thing

1:51:47

and that's it so the second exercise

1:51:54

the first one is the first one the other two are correct

1:51:57

so the second one here is is a bit more messy but he does the same thing so

1:52:02

there are three events and you should see which are concurrently which are not

1:52:08

so this is true

1:52:13

this is also true and this is false so this is the

1:52:18

answer so i'm faster just at looking at the arrow that you're

1:52:22

generating better block okay it's faster when you have experience but anyway if

1:52:26

it asks to verify the s4 block you first look at the arrow and you write true

1:52:30

false true then you write the vector clock and you verify this is a second

1:52:34

check that you can do okay and so now

1:52:38

before another exercise

1:52:42

why we have done the logical clock and the vector clock

1:52:45

to capture causality so the logical clock

1:52:49

the one with just the number the lan port block

1:52:53

we will see in the next lecture an application that is a moodle exclusion

1:52:56

algorithm so you can create a distributed module

1:53:00

expression algorithm that you use as the logical time step

1:53:04

and we will see in the next lecture the vector clock you can build the

1:53:09

causal broadcast so with the vector clock you can build a

1:53:13

distributed broadcast algorithm that

1:53:17

avoids the problem of mike and bob you can build a broadcast algorithm in which

1:53:22

you can enforce the council broadcast so when

1:53:25

bob received the message you also see the message of alice okay

1:53:29

and this causal broadcast we will see in a while so in at least one or two weeks

1:53:34

because we are first to do all the broadcast and then we will see the order

1:53:38

of the broadcast so there will be a bit of time

1:53:43

before ending in the last seven minutes

1:53:49

we will do this exercise okay this exercise is always about

1:53:56

vector clock this is an exercise from an exo so this is the kind of exercise that

1:54:00

you can find on an x this was the last exam the exam of

1:54:05

september so we say consider a single message

1:54:09

passing system that uses vector clock to implement some causal consistency checks

1:54:14

so there are vector clocks a vector clock are used to do something we do not

1:54:19

know what they are used the message passing system so message

1:54:23

busing system is just what we are seeing is a system in which you send a message

1:54:28

they are called message passing because the message passes

1:54:31

is composed by four processes we take these one to four so there is process

1:54:36

one process two process three at present four

1:54:41

as usual the id of the process is uses as displacement in the vector clock so

1:54:47

we have a vector clock where the first component is process one

1:54:50

the second component is process two the third component is process three the

1:54:55

fourth component is process four vector clock are updated increasing

1:54:59

before sending the algorithm you have seen before sending a message you

1:55:03

increase yourself you attach and you send

1:55:07

process is communicating by point-to-point link perfectly okay

1:55:12

you start debugging process one the process with id one

1:55:17

in the middle of the algorithm execution so you start debugging

1:55:21

the note in the middle in the start you see the following string of messages

1:55:26

exiting and entering the ethernet card of process p2

1:55:30

so this is process pdu this is process video we start at the

1:55:36

beginning to sniff on the ethernet card so we start looking at the message that

1:55:41

send or receive we see

1:55:44

at time zero zero so at the beginning of the execution of process one

1:55:49

that there is a message that exit and the vector clock of this message is one

1:55:55

zero zero zero okay

1:55:58

it's clear so it means that we have something like this a message exit and

1:56:02

the timestamp is one zero zero zero then at time five so after

1:56:08

we see on the other net card that a message enters and the message as a

1:56:13

vector clock one two three one sorry this is really ugly

1:56:18

let's make it more clear is one two three one this message right here that

1:56:24

enters so the first question

1:56:28

draw an execution that justify the vector clock you are seeing

1:56:34

is such an execution unique so this is the first question the first

1:56:38

question asked to draw an execution so we have four process

1:56:45

and of this process we know this we know that process one send a message and this

1:56:50

message as a vector clock one zero zero zero

1:56:53

it means that is the first message generated right because contains zero

1:56:56

for all the history of the other and one and then receive a message so a certain

1:57:01

point a message that contains one two three one enters

1:57:06

so what you have to do in this kind of exercise you have to

1:57:09

create the messages that when you write the vector clock

1:57:15

justify this vector clock right here at the end

1:57:18

so how do we do it so the second process c2 event you do

1:57:24

you agree with me ec2 event in the second process what is the most natural

1:57:29

things to do on the set own process if it sees your event

1:57:34

the second event must be ascend

1:57:38

why that must be ascend because these two has to be communicated to someone do

1:57:42

you agree with me and so i reason in this way so this

1:57:46

receive the first event this ascend the second event

1:57:50

this is what i i do this is one so

1:57:55

process the third process how many events the

1:57:59

third process to see three events okay perfect

1:58:04

how many events does the third pros the last process you see

1:58:08

just one you agree with me so just one event

1:58:12

okay so the best thing to do

1:58:15

now what we have to do is just we have to connect this arrow with one of this

1:58:20

point we have to decide if this is an incoming or outgoing arrow and we have

1:58:25

to decide which point to connect to this one okay

1:58:30

so this arrow should be outgoing or in going

1:58:35

the one that starts from this point should be out or in

1:58:41

there is only one answer one correct answer out or in it should

1:58:46

be out y should be out because if this is in

1:58:50

then it means that we must have something out and this number was still

1:58:53

not one okay this number was two so the only

1:58:57

possibility is that this number goes out and connects to one of these points so

1:59:02

this receive a mess now what is reasonable this arrow

1:59:07

where we we should connect it what is the most reasonable thing to do with

1:59:11

this arrow right here is to connect in this way

1:59:15

why because if we connect in this way the component of this process is two at

1:59:19

this point right and when we start here the component of this process is three

1:59:24

and what is the vector clock of this message is one two three one

1:59:29

and so this is the execution

1:59:33

so you you see my point so to do this kind of exercise what you

1:59:38

have to do you have to try to understand by the events

1:59:42

and doing the reason that you know the one that is out brings the number and

1:59:46

then try to see the point and connect them and this is one execution

1:59:51

the second question is such execution unique

1:59:57

no someone is answering no you can see a different execution that gives the same

2:00:01

vector clock yes i can see

2:00:06

i do something like this i just reverse these are i created this

2:00:12

event a bit for and they do something like this i will do it wait in the other

2:00:17

figure so that i do not mess up

2:00:35

okay this execution that's it

2:00:38

this creates the same vector clock how i generate this execution i see these two

2:00:42

points and they say oh i've connected the arrow in a different way okay

2:00:47

usually usually there is always more than one

2:00:50

execution is almost never unique

2:00:53

i mean i have to be really careful to create something that is unique using

2:00:57

only two messages it's almost impossible okay

2:01:02

by doing soap one shouldn't have two no okay

2:01:07

so this is a nice question from emmanuel is saying but doing this execution p1

2:01:13

should deceit you why because when you receive you do too

2:01:16

but you have to read careful i'm saying the message that enters in the ethernet

2:01:21

card so this message enters in the internet card with one then when you

2:01:26

generate the events goes to two okay

2:01:30

so this is the reason emmanuel are you in in the in the question i say the

2:01:34

message that you enter that enters in the ethernet card this message with this

2:01:39

timestamp enters in the other net card and then becomes two but 20 cent this is

2:01:44

the vector clock that we should see okay is it clear

2:01:55

uh sorry this is p1 the other card of p1 p1 so sorry there was a mistake in the

2:02:01

in the this is p1 this is process one also because i say you start debugging

2:02:06

process one okay so it's process one so emanuel i say okay but if i do this

2:02:14

execution this message that you receive when you receive the message

2:02:17

the receive of the message should be two two three one and is right

2:02:22

but you debug just before the receive because you debug in the other net card

2:02:26

not in the code that creates the vector clock okay

2:02:34

so the execution is not unique now we we answer the last question and

2:02:39

we we terminate the last question is this one the second

2:02:42

question there exists an execution that justify the vector clocks and where

2:02:47

there is at least a process that does not send any message

2:02:51

so if i see this vector clock it's possible that in the execution

2:02:56

there is a process that does not send any message

2:02:59

i create an execution that generate this vector clock where there is a process

2:03:03

that never sends is possible or not yes

2:03:09

perfect so elisa told us no is not possible

2:03:13

because otherwise we have a component that is zero

2:03:17

okay and is not pos is not possible to have a component that

2:03:22

is d because the process never send you do

2:03:25

not know about that process so that component should be zero and er no

2:03:29

component is zero so it's not possible does not exist an execution with all z

2:03:35

okay so this terminates the lecture the next lecture we will see the lan port

2:03:39

module exclusion and then we will start looking at the failure detector that is

2:03:44

something that you will use to detect when a process crash

2:03:48

so see you uh on monday

2:03:51

bye to everyone have a nice day you
#### Lezione 4
  
Gemini

0:03/1:44:10

2:20

okay so from mom can you see the the the screen and not the speaker one

2:31

okay so you see the the normal one not the speaker okay perfect thank you

2:40

okay so we wait a bit we started after 15 the monday

2:45

to give time to people that attend physically with something before

2:49

starting the lecture okay so for uh there is a question from

3:38

so for the for the rules i still have to

3:42

do the mixed course because if someone of you get ill or or

3:47

for some other reason you can ask to do the

3:50

the mixed one so if the rules do not change i will keep it in a mixed format

3:56

that means in presence plus the remote lecture

4:00

if the regulation would allow me to do in president 100

4:03

i will i will still decide okay you're welcome

4:13

so okay usually you should also write the question in in english on the chart

4:18

i mean i understand italian but there are some of your colleagues that that do

4:22

not okay so

4:24

usually i always translate also the question but try to write the question

4:28

in english just out of respect for the ones

4:31

that do not understand italian i mean it's okay if you write in italian

4:35

something really you know specific that you

4:38

you want to be really precise in the wording and then they will descend and

4:42

translate but try to speak in english also in the chart if it's possible

4:53

okay so for the one in the in here at the break i will create the prodigy

4:58

token and you will confirm your presence uh

5:55

okay so we we can start so last time the last slide was this one

6:00

about the vector clock in the last lecture we have seen

6:04

few key concepts the logical coke and the vector clock and we have seen that

6:08

the ites a more profound meaning that is the

6:12

causality and so today we will start the lecture

6:16

by by seeing uh

6:19

an application of the logical clock in the module exclusion

6:23

problem so it's an algorithm of lampards that was made to make a distributed

6:28

system share a resource in a multiple exclusive fashion we will see

6:33

what it means precisely after this we will start

6:38

the third and last topic about the time if you

6:42

go in the introductory lecture and you see the outline there was a module for

6:47

each topic so the third topic of time is the failure detector

6:51

the failure detector are something that does the name say without a lot of

6:55

fantasy they they detect if something crashes

6:58

and we will see that they have a special connection with time

7:04

because they allow us to encapsulate all the timing assumption in this primitive

7:10

but this is something we will see later so let us start by looking at the

7:17

lan port algorithm for module exclusion i want to stress

7:23

that this algorithm is not crash tolerant okay

7:26

so the entire algorithm assumes that process do not crash

7:31

we will see at the end of the failure detector

7:35

lecture i don't know if today or in the next lecture how the failure detector

7:39

will allow us to create something that is crash tolerant

7:43

but this version the original version of the algorithm assumes

7:47

that each process is correct this is an assumption

7:52

and so let us start by defining what module exclusion means because it's the

7:57

first thing we have to specify the abstraction

7:59

and so the modal exclusion for us will be

8:02

a block of this kind that expose to the external world three

8:08

different events that are grant

8:12

requests and release one of this event is

8:16

created by the module exclusion primitive and is the grant event this

8:20

event informally says to someone that is able and free to

8:26

access the

8:28

resource so which color menu

8:37

i don't understand so you are you are seeing not the speaker view you're

8:41

seeing the other view okay wait

8:48

okay now you should see the the desktop one right

8:54

yes okay you're right

8:58

so sorry about that and uh

9:02

so the grand event is something that is created by the moodle is crucial

9:06

primitive and it tells to a process you are free to use the resource you will be

9:10

the only one of course when you have to enter inside

9:14

the pre uh results in a modal exclusive fashion you

9:18

need the request event the request event is something that is created

9:22

by the upper layer and tells to the moodle is crucial

9:25

primitive please let me

9:28

access the resource when you can and then once you have done you create

9:32

the release event that release the results

9:35

and so here there is the summary so the request is from the upper layer and says

9:40

to the mutual exclusion algorithm please allow me to access the critical section

9:46

when you can then there is the grant event that says

9:49

you're free to go you will be the only one you can access the resource

9:54

and then you access the resource you do your things that can be i don't know it

9:58

depends on the resource if the resource is a printer you print something you

10:02

actually start printing then once you have done

10:06

once you have done your stuff you tell to the module as crucial primitive i

10:10

release the resource so you can let someone else enter and use it

10:16

what are the properties of this abstraction there is the mutual

10:20

exclusion property that says at any time t

10:23

only one process is inside the gs so gs means critical section is the

10:29

resource okay the resource is called critical section

10:33

historically because it's critical it means that only one can access it so

10:38

this is the reason why it's called critical section

10:40

so you can substitute the criteria session with resource and is exactly the

10:45

same and then there is the liveness property

10:48

that says if a process p request access to the critical section

10:53

then it eventually entered the critical section

10:56

this is a non-starvation property it says that if you want to enter

11:00

you ask to the module please let me enter in the critical section sooner or

11:05

later there will be the grant event that will tell you you can access the

11:10

credible section and then there is the fairness

11:15

if the request of process p happens before the request of process q then q

11:20

cannot access the critical section before p

11:24

so fairness is a bit more complex than liveness fairness tells you that if you

11:30

ask to enter in the critical section before someone else

11:35

where the before is the up and before causal relationship then you will enter

11:40

before that one so intuitively we have

11:44

a process here and at this point you ask to enter so you say please request to

11:49

the critical section then there will be someone that asked to

11:53

enter process 2 let's say after and is also asked the request

11:59

if these two events are connected by an opponent before

12:04

relationship then you have to enter before this one this is what the

12:09

fairness assumption mean intuitively is something that we as

12:13

human understand because he says that if you did something you know if you ask it

12:18

to enter before someone else then there is a cue and you will enter before that

12:22

someone else okay not all the module exclusion algorithm

12:26

uh are able to guarantees this product okay

12:29

there are algorithms do not guarantee that but the one we will see

12:34

does guarantees are fairness okay

12:38

yes so

12:46

okay good point so there is here the five

12:49

okay the fifo we i am because i had the next

12:53

slide so our primitive needs a fifo perfect point-to-point link

12:59

so we are assuming five following five what we have seen in the last

13:03

lecture it means that the required the if you send something on the link abc

13:08

in this order the other will receive abc in that order so there was one one of

13:13

your colleagues that asked is because of this property that you need fifo

13:18

actually you need five of your correctness also in this algorithm okay

13:22

not only for this property but this property i'm sure that the proof depends

13:25

on the the proof of the of the fairness depends on the five also

13:30

for this property but if i remember correctly also in the module exclusion

13:34

you need fifo at least in the proof that i wrote so i think i think you need also

13:39

for the mobile explosion okay

13:43

so before delving in the details of the algorithm we will

13:48

specify something the algorithm assume no crashes this is the second time i

13:55

stress this point because it's an important point so the number of failure

13:59

is zero so even if you have a single failure the

14:02

algorithm does not work anymore so what happens essentially is that the

14:06

algorithm gets stuck and does not progress anymore if someone fails

14:11

so how does it work when a process want to enter the critical section it will

14:17

send in the algorithm this is an eye level overview it will send to the other

14:22

requests it will say please let me enter in the critical section

14:27

okay so this is this this kind of algorithm are called permission basis

14:32

because you ask permission to the other there is another family of algorithm in

14:37

your explosion that are called the token based we will not see them

14:41

they were used in the past also in some system today

14:46

so what you have is that you use the the scalar clock those are the logical clock

14:50

the clock that are done with just the counter remember the first one you see

14:55

and you use the scalar clock to time stamp any message in the output and we

15:00

will see that this time stamp ensure the modular exploration product

15:04

the second assumption and this is really important because otherwise the

15:08

algorithm does not work is that the link are fifo

15:12

so the link of the entire system we have a system that is a complete graph

15:18

everyone is connected with anyone else and on this complete graph every link is

15:24

five okay and uh of course

15:29

we follow the protocol of the lanport clock that says that whenever we send a

15:34

message we increase the logical clock before sending when we receive the

15:38

message we increase the logical clock when we receive it but in the algorithm

15:42

we do it explicitly so there will be a counter that we will increase when we

15:46

receive a message and this is the algorithm so the

15:50

algorithm is fairly complex this is the first

15:55

complex there are more complex algorithms that

15:58

you will see but this is the first non-trivial algorithm

16:01

because all the other algorithms were more or less intuitive and they were

16:06

working just between a source and a destination there were just for two

16:10

people okay source and destination it was always an instance between source

16:13

and distinction this is the first algorithm that involves all the

16:18

processes in the system so it's the first algorithm that we see where

16:21

everyone will run the algorithm there are no two points and this everyone is

16:26

this set here so if you return back at the introductory lecture i used pi

16:33

capital pi to indicate the set of all processes and

16:36

so this is the set of work process so when we start the algorithm create a

16:42

set request and a set of apps and they are empty at the beginning okay those

16:47

are set that we will use to store the request

16:51

and store the ax as the name say

16:55

then we have a scalar clock this is the logical clock that we use remember this

16:58

is not a vector clock based algorithm the vector clock are different are more

17:03

powerful here we just need a number that is called scalar clock so scalar clock

17:08

logical clock software clock lamp clock they are all the same thing

17:12

that count and then there is

17:16

a variable that i use to just store my request when i have a pending request to

17:20

enter individual section this symbol right here i do not know if

17:25

we already discussed it i think not this is the first time this is just a formal

17:31

way to write null nil

17:34

in python whatever okay this means that this variable initializer to now

17:39

is this is bottom symbol is called bottom

17:43

and this the formula is also the books used so when you see bottom is just null

17:47

for for someone that or zero and she wouldn't

17:51

okay so the the we have four handlers apart from the initialization we have

17:56

angular one and vertical and r3 at angler4

18:01

okay so this here is just a comment so when you see the

18:05

triangle and something this is a comment for the line or a global comment for for

18:10

the handler okay so the first standard this one

18:16

is the ender that is triggered when the upper layer asks you

18:20

to do a request to enter in the radial section

18:25

this is triggered here

18:27

is this angular here okay this is the first one

18:31

then there is the release angle that is the purple one and is triggered when you

18:35

release the critical section okay then for the grant we don't have

18:41

an event because the the android because the grant is generated the grant is

18:46

generated right here so at this point we are here this is the

18:50

grant of the request he says you can enter

18:54

and then we have a special handler and this ender will

19:00

examine the set of requests and we'll examine the set of acts and we'll decide

19:05

if you're going to enter or not we will see in the details how he does that and

19:09

then we have a global handler that is used for the message that are delivered

19:15

so this global handler let me make it in blue is triggered whenever

19:22

an event here is created whenever you deliver some message from the upper

19:26

layer this angler is triggered and is you know a battery of switch case if

19:30

else if you have done a bit of coding you use this pattern a lot of times when

19:35

you have to multiplex to something we will see

19:39

so let's start from the request that is the first thing so when you have to

19:43

request a critical section what you do is that you increase the scalar clock

19:47

because you are going to create a new message so you have to update the

19:51

timestamp of the message so sometimes i will say timestamp of a

19:56

message for timestamp i just

20:00

indicating the scalar clock and your id let me be really careful on that this is

20:06

the cro the code for process p i you can see i right here okay

20:11

and here when i create a message for the request i will create a request message

20:16

that is done in this way there is the either of the requests that is just

20:21

wreck let's say this is a request it's just the either of the message requests

20:26

and then the payload is a timestamp message this ts and this timestamp

20:31

contains your id and the scalar clock so is a pain

20:35

is a pair id of the process scalar clock of the process

20:40

let me clear the drawing then what you do after you create the

20:45

request message you send this request to anyone

20:49

so this is a four for all the processing the system what you do you send using

20:53

the file for perfect link to the process pj you send the message

20:59

request let's go back what i'm doing here is

21:03

that i'm triggering the send event i'm thinking and send on the link i say

21:07

to the link please send send and i send the message

21:12

so here i'm asking intuitively to all the other people please let me enter in

21:18

the critical section so this request travels from the link it

21:22

does the job and then it's delivered right here on the destination the

21:26

destination receive a message so when the destination receive a

21:30

message you will receive the message our request what it does it it increases the

21:35

scalar clock and how does it increase it using the rule of the algorithm we take

21:40

the maximum between the clock on the message

21:43

okay it's a scalar clock plus one if you look at the rules of the logical

21:48

clock this is what we have seen when we do oh we take the maximum plus one is

21:53

the the usual stuff so here i'm just updating the scalar clock according to

21:58

the rules of the scatter code and then here i have a battery of if

22:03

else that i could have implemented more cleanly probably which is which case

22:08

what i'm doing i see what kind of message it is

22:12

so if the message is kind of request i will execute this thing if the message

22:16

is kind of locked i will execute this thing if the message is a release i will

22:20

execute this thing yes mateo we are sending to ourselves

22:25

but it's not a problem so there was a question from whom they

22:29

say oh if i run this for i also send it to myself yes you also ask the

22:34

permission to yourself and it's not shocking that you will say to

22:38

yourself yes you can enter okay we will see

22:41

but it's a nice question yes in all the algorithms almost all the

22:45

algorithm even the broadcast one when we do a broadcast we send it also to

22:49

ourself why we do that

22:52

because there is a rules that says that premature optimization is the root of

22:58

all evil so we do an algorithm that is symmetric okay where we do one things we

23:02

do not do a special case for ourselves then if we are an engineer we optimize

23:07

if we are computer science we just use that okay so this is the difference

23:11

between optimization and correctness and so

23:17

in this algorithm we have only three kind of messages

23:22

ack and release so when we receive a message we see that

23:27

is a request what we do we add the message to the

23:30

request set we increase the scalar clock by one and

23:34

y we increased by one because we send a knock okay so i'm creating a new message

23:39

that is the arc and before sending the account i

23:42

increase my scalar clock and then i send it yeah

23:45

i send the app to u i send the app to the sender of the

23:49

message so if p i asked to pj

23:54

please let me enter in the critical section what pj does

23:59

is to take the sources say oh spi so i put to

24:02

the source right here and the answer with anak with the scalar clock that is

24:06

increased by one okay so you're just answering

24:12

so as you can notice you send anak immediately so if it asks

24:17

i don't check if i want to enter in the critical section if i'm in the critical

24:21

section or not i immediately send the knock and we will see that this is not a

24:25

problem because the there is a point in any

24:29

moodle exclusion algorithm where someone has to wait deceased and say okay i have

24:33

to wait i cannot enter in the critical section okay this point will be

24:38

examined right here so do not worry you send an act immediately but this is not

24:42

a problem okay will not be a problem

24:46

so if the message is on what you do is you just add the message

24:50

to the accent and that's it if is a release what you do is that you

24:55

remove the request from the the request set okay because here you add the

25:00

request set then when someone will release it you will send a message say

25:04

oh please release i release the critical section you look in the set and you say

25:08

okay i have to remove the request for which there existed the release

25:13

so we will see the leaders of the academies

25:16

and you ask two people so you start with time stamp zero let's say you are the

25:21

process with i did zero and times zero at the beginning you start you are lucky

25:26

you have the id 0 and we will see why having i i did 0 means that you are

25:31

lucky and at least in this algorithm and then you start asking to everyone please

25:35

please i want to it was the critical section everyone executed

25:40

this code because the the link are perfect you do not die so sooner or

25:44

later everyone will receive the request they act to you you receive the act you

25:48

start populating this set you put the app

25:52

once you receive the act from everyone this handler right here will be

25:56

activated it means it can be triggered so when the scheduler activated

26:01

activates you after a time you execute this handler

26:05

this handler says does not exist our request

26:11

in the set of requests such that the timestamp of the request

26:15

is less than the timestamp of my request because when you send a request you put

26:19

my request right here okay and for any other process in the system

26:25

there exists a knock from that process the resistance message enact such that

26:30

the timestamp of the arc is greater than the timestamp of my

26:33

request and the sender is p so this

26:37

mathematical bubbling right here is just saying you receive a dynamic from

26:42

everyone in the system including yourself and the typestamp of the ack is

26:47

greater than the timestamp of your request okay and this means we will see

26:52

in the proof when this is true it means that they have seen your request that

26:56

they are not all hack why

27:00

because in this algorithm we never remove something from the accent okay so

27:05

you need the mechanism if you ask the critical section twice three times

27:09

forever because in the critical section algorithm you

27:12

can do request access to critical section use release

27:16

then after one hour you want to use the video section again so request again and

27:21

we need some mechanism so that you do not

27:23

go using the old axe because otherwise you know nothing work if you use the old

27:28

act then that's it and so this is the mechanism

27:31

to not using old apps and this is the mechanism to make

27:38

someone wait because let's say that there are two

27:41

processes that they want to enter in the critical

27:44

sections and they start exactly at the same time 0 and p1

27:49

we will see in the proof but intuitively what happens

27:53

is that they all start with timestamp 0 because there are zero event in every

27:57

one but also i have the id look i use the id in the request so p0 as i did 0

28:05

p1 as id 1 this comparison right here in the comment i'm writing how it works

28:12

this comparison right here works in this way it checks if the logical clock are

28:16

equal if they are not equal once wins on the other so if this is greater this win

28:22

okay and then it also check

28:25

the ids so in this case what we will do you will check and you will say oh the

28:30

timestamp is let me get in black the timestamp is zero for everyone let's

28:35

compare the id oh my id is zero i'm less than the other

28:40

one because my id is smaller okay and what will happen we will see it

28:45

happens that if two browsers ask to enter in the critical section at

28:49

the same time and they receive all the acts then we will see in

28:54

the proof this means that each one has seen the request of the other

28:58

when this happens so if this process has all the app all arc

29:04

and also this process as all the act all ack then it means that in the request

29:09

set of both process there are both requests okay so that means that this

29:13

guy has seen this request and this guy has seen this request when this happened

29:19

and so one of the two waits why wait because of this year

29:24

he waits before because this request is less than this one

29:29

so p0 is free to go why p0 is three to one because it does

29:34

not exist a request that is smaller and does not exist because zero zero is the

29:40

smallest of all the requests p1 will wait why because there will

29:45

exist in the request set of p1 the the request zero zero

29:50

so it will see zero zero and say oh it exists something this means does not

29:54

exist so this is the symbol that means does not

29:57

resist so say oh there is something that is smaller than mine i have to wait

30:03

and one is that this guy will enter in the critical section p0 sooner or later

30:08

will trigger a release and this is an assumption that i'm doing that you do in

30:14

any critical section moodle exclusion algorithm that's if someone enters

30:18

sooner or later release the critical section because if it enters individual

30:23

section and does not release the critical section anymore no one will

30:25

enter because otherwise you're violating those questions

30:29

so p0 eventually will release and what happened when p0 release execute this

30:33

handler right here what this handler does he removed its

30:38

request so p0 removed the request

30:42

he increases the scar clock by one and send a release to everyone so he sends

30:47

look there is a release from me when the people receive the release they check in

30:54

the request set and say oh let me see if i have a request from that sender if so

30:59

i remove from the request so what happens is that when p0 release

31:04

it executes this and this message reaches p1

31:08

reaches p1 because he reaches it p1 execute this line right here and say

31:14

okay i remove the request of p0 from the set because p0 has done its thing and

31:19

when it removes from the set now this this angular right here triggers for p1

31:25

why because this request has been removed does not exist anymore these

31:29

requests and so p1 is free to go why because it's the smallest request in the

31:35

request set okay so where is that logical clock are

31:39

used right here to order the request and ensure fairness we will see the logical

31:44

copy of true favors so this is the overview of the algorithm do

31:49

not worry now we will see an execution okay to make things clear

31:54

so there is a question from if my day is low is lower

32:04

it's the lower one because you are blocked if there exists someone that is

32:08

lower than you okay so it's the reverse so if your id is zero you enter

32:15

you enter after you receive the app the x from the others at the beginning if

32:19

your id is zero your timestamp is zero okay if your id is two and your

32:24

timestamp is zero you enter if zero does not ask at the same moment if it asks us

32:29

the same moment that means concurrent then zero will enter before you

32:34

so here i say you can enter if it does not exist a request with a timestamp

32:39

that is lower timestamp that is lower is defined right here means logical clock

32:44

that is one lower than the other or if the logical clock are equal

32:48

id that is one lower than the other okay so there was a question from they

32:52

say if my d is eigen i trigger granted the event noise if he's lower if it's

32:58

the lowest id in the request set with the same timestamps

33:03

is it clear no okay now this is this is an a

33:08

question granted is a local event okay granted is not a distributed event it's

33:13

the local event that

33:16

the moodle exclusion algorithm is creating granted means locally you can

33:21

go is not a distributed event this doesn't

33:24

the other process do not care this is local code okay so it's the is the is

33:29

this is the local event on the process that can enter the moodle exclusion okay

33:33

so granted is local okay there is something that they want to to clarify

33:38

because because uh

33:40

okay there is something i want to to clarify

33:43

all the variables are all local

33:46

okay we are in a distributed system course everything is local okay this is

33:51

a question that also in the old edition of the good summer me

33:54

thank you for making it again so i can clarify immediately so all these sets

33:58

are local we always have local variable they are only your variable

34:04

there are the messages that are used to exchange information there are no global

34:09

shared variables okay there will be global shared variable when we will see

34:14

the shared memory and usually what we do is to implement shared variable with

34:19

messages but the only things that pass from one process to other are message

34:24

this set is local when i put request in the set i put requests in my set

34:29

your set can be different can be empty can be full whatever it depends on the

34:34

message okay this is just local code that is executed

34:38

so please okay granted granted is an event that

34:50

triggered locally and this is this event right here what does it mean there is

34:54

there is probably an angler but the handler is from the upper layer okay

34:58

so there is the upper layer here that has an angler that will will end or

35:03

grant a request okay if the upper layer is a new one and you see the green light

35:07

of the semaphore you do your things okay this is this is the grant request is the

35:11

red light if you are a machine and you see the grant

35:15

request then probably you do something but it's not an handler in our code

35:19

right here it's an enter of the upper layer okay

35:22

okay so the grant is triggered locally right here okay so remember we said in

35:27

the in the previous lecture we use a layering

35:30

approach okay we have first layer seven layer and so so this grant is to the

35:34

upper layer that can be whatever also a new one in our

35:38

in our in our formalization so let's now see an execution of the

35:43

algorithm so here there is the algorithm of wrote in plain english okay so here

35:48

there is the algorithm brought how i like the algorithm here in plain english

35:53

so you can read it when you study okay is the the explanation that they did

35:57

here so this is the same so let's see the

36:01

execution so this message this blue message is a

36:06

message that is not for the modular explosion

36:08

algorithm because this module explosion algorithm may work together with other

36:12

algorithms okay so in blue one i should change the

36:16

execution because this is only confusing people this is not a message of the

36:20

module execution it's just a program message

36:23

of something that is above the moodle exclusion or on the same level we don't

36:26

care what he's doing is just updating the logical clock okay so the logical

36:30

clock of this guy is one and the logical clock of this guy is two okay

36:36

so here this red one is the first message of the

36:40

critical section algorithm the moodle exclusion algorithm and is the request

36:44

event so pc p3

36:47

p3 p2 p1 p3 start right here and say oh i want to access the critical section so

36:53

p3 triggers this handler you say oh i want to enter in the critical section

36:59

so what p3 does increases its vector is logical clock from two to three

37:04

increases the logical clock and then he sends the request to all the process in

37:08

the system the request is composed in usual way the timestamp the logical

37:13

clock and the id so it's a pay this is

37:17

this part right here okay

37:21

id clock and asks to everyone including himself usually himself i do like this

37:27

now i i omitted the the arrow but there is also the arrow to yourself okay

37:34

and then what happens the other people receive the message this is the arrow to

37:38

yourself is the just that send the message to yourself so this message with

37:42

logical clock 3 travels in the network he travels it travels he travels and

37:47

reaches process 1 when he reaches process one process one

37:51

execute this end layer right here so execute this line update the scalar

37:56

clock and then i see oh the message is a request he put

38:01

in the request set increase the scalar clock and send the arc

38:05

send the app and this is you receive the message you

38:09

put in the set the setting not drawing the set but they have the set of

38:13

requests increases the logical clock when

38:15

received the message three maximum between three and one is three three

38:20

plus one is four then i have to send the ack i have to increase before sending

38:24

the ack four plus one is five five i send the ack back to p3

38:30

and p3 at this point received the ack when it received the axe

38:35

executed this handler again because you are receiving a knock message you

38:39

increase the scalar clock and you put the yuck in the set

38:43

then the message traverse travels travels it reaches the other process

38:47

that is p2 p2 does the same stuff maximum between three and zero is three

38:52

three plus one is four and so your logical clock becomes four and then you

38:56

do the act four plus one is five and you send the knock with five and

39:00

this arc is received right here and what he does you will increase the

39:05

logical clock to seven yes maximum between five and six

39:09

plus one and so on at this point you can see

39:14

that at this point this process will receive

39:18

all the acts you agree with me because the act from yourself is immediate you

39:22

immediately act yourself and not drawing the act to yourself but you can imagine

39:27

i them you do it at this point right here you receive the

39:30

x from anyone else but now let's suppose that this guy wake

39:35

ups because this is a distributed algorithm p3

39:39

p2 p1 so at this point p1 wake ups and he

39:43

wants to enter in the critical section because

39:46

he wants to enter and so what he does is send the request also p1 so p1 send the

39:51

request how you do when you send the request increase logical clock plus one

39:56

five plus one is six and you send a request with type stem six id one and

40:00

you send it to everyone else notice that here we can see the

40:05

assumption of fifo so you receive the ack

40:10

from this process before you receive the request

40:13

because the channel is fifo you cannot cross

40:16

so if in the execution was like this i i draw the i i was doing something like

40:21

this in the execution and you write in the x and this is fifo

40:25

and i see something like this i get upset because you are crossing message

40:29

you cannot they have to be received in the same order five

40:33

so the same order means that r from the same source cannot cross

40:37

so these are us to be received before this

40:41

so this one ask and then you receive the up and so on so here at this point

40:47

how many requests are on p3 in the set of p3 at this point right here in purple

40:53

how many requests we have in the request that is a question

40:57

how many requests two two requests we have and what are

41:02

the id we have three three id 3 times m3 this one

41:09

your request and you have the request of the other guy six one

41:13

now at this point this point right here the blue one

41:17

p3 as all the acts will wait or not

41:21

is a question at this point p3 has all the act and

41:26

this is this request in its request set we'll wait or not or

41:30

we'll enter the critical section will not wait right we'll enter in the

41:38

legal section why because his request is the lower one in the system

41:43

because uh sorry yes

41:47

i did that sorry this is the the time stamp this is the id

41:51

let let me do it correctly otherwise it gets

41:55

confusing so the time stamp is uh yes i was correct so

42:01

so six one this is times then this is id

42:05

and this is three three

42:08

so you first yes you first compare the time stand my

42:12

timestamp is lower then i win and i do not compare the id if they had

42:16

the same id the same time stamp then i compared the ad okay not in this case

42:21

and so at this point this one can enter in the critical

42:26

section at this point right here the yellow one

42:29

also p1 receive all the arc you see my point at this point is involved yak

42:35

because p1 received the up from p2 and received the arc from p3 so at this

42:40

point p1 has all the x

42:43

what will be in the request set of p1 at this point how is done the request set

42:48

of p1 how many requests it contains two requests it contains the request of

42:54

p3 so let's call request p3 and contains its request request p1

43:01

okay p1 will wait or not

43:05

we wait we wait why because its request is greater than this request this

43:11

request was lower so this request has to enter so it will be locked

43:15

so at this point process p1 will say oh i'm not the the one with the lowest id

43:22

with the lowest request because of this point right here in the other so at this

43:27

point it will wait and you will wait until

43:31

the request of p3 will be removed from the set

43:37

and when is removed the request so here the answer in the video section p3 then

43:42

p3 is really a well-mannered process and so when

43:47

it ends you send the release okay the release is in yellow i'm doing the

43:52

release just to this one but we will receive will be received by everyone

43:55

because you broadcast your release okay the blog has still released

43:59

and then the release at this point reaches

44:03

this guy right here and when the release reaches process p

44:08

one process p1 execute let's go

44:12

execute this part right here this part right here what he does is he released

44:17

from process three he say oh process three is releasing what i have to do i

44:21

have to check in the request set and kill every request from p3 so at this

44:26

point he kills the request from p3 he removed from the setter request from p3

44:30

and how many requests has in its request set after the kill

44:35

how many requests does process one just its request right

44:40

and its requests will satisfy this handler

44:44

let's go back to the angler will satisfy this handler here why

44:50

because it's the lowest one and there is no one else

44:53

and then you receive it that yuck from everyone else and this is also you

44:56

received the awkward from ios and the time stamp of the act from

45:01

everyone else are greater than your requests why they are greater because

45:04

they increase they receive your requests they increase by one and they send so

45:08

time stamp of the act so here you understand that yak are not old and you

45:13

you enter in the critical section now i have a question for you is

45:18

possible that someone

45:22

see the release before

45:24

the release for a certain request before the request or not

45:29

so did you see my point is possible that there is a process in the system

45:33

let's call it let's say that this system are as 100 process and there is process

45:37

99 and process 99 see the release from p1

45:42

before the request of p1 is possible or not and if it's not

45:48

possible why is not no yes it's not possible because the

45:54

channel is five okay it's not possible if you receive this release then before

45:59

you receive the request so you handle the request you send the

46:02

yuck and then you resend the release okay so this this will be small pieces

46:07

that we use in the proof but it's good that you see just now because the first

46:10

thing you have to do when you want to to to understand if

46:15

it's an algorithm is correct that they start they have to start fuzzing it in

46:18

your mind and functing a distributed algorithm means start saying if the

46:22

message can be received out of order and whatever and see if this these things

46:27

breaks something okay this is especially useful because i have

46:31

the tradition of putting in the exam an algorithm that is equal to the algorithm

46:36

of your book but a random line that i decide to flip something else and

46:40

usually breaks everything and you have to say oh this breaks everything because

46:44

of this instead the green line with number eight

46:49

can be received out of there out of order with with which one so there is a

46:54

question from they say one of this line because there are two number eight which

46:58

one it can be received that order in the

47:01

sense that you can have something like this

47:04

this acts and these arc they cross

47:09

but it can never be i mean it can never be received

47:15

if i have another line right here i cannot have the cross between these two

47:18

okay so yes

47:20

of course the fifo holds for a single source you can have a message from

47:25

different sources that are interleaved because you know

47:28

it's not in specification of pi okay and so so now let's see the proof

47:35

so the only way to understand a fairly complex algorithm is to look at the roof

47:41

i mean there is no other thing you can start doing execution

47:45

but if you if like me you are you are a

47:48

human being you can just see 100 200 execution then you get tired so the only

47:53

things to really understand complex algorithm is to look at the proof and

47:57

then see in the proof how all the execution

48:00

are accounted for and so let us look at the proof

48:04

the first proof that i want to do is the modular execution so we look at the

48:07

moodle exclusion and then we do a small break

48:10

so assume by contradiction that the two process entering the critical section at

48:14

the same time this is the first thing we have to avoid in the vertical section

48:18

algorithm the module exclusion is which kind of property it is

48:22

modular exclusion it's a question which kind of property

48:26

is movable exclusion it's a safety property so if

48:32

it's violated once you are done forever so it's the first thing to look is that

48:36

your algorithm is safe then you can stop process forever

48:39

you will still get fired but at least you will not arm anyone okay

48:44

so you cannot enter in the regular section if you have not received the act

48:48

from everyone and this is clear because we have one angle we have a line in the

48:52

algorithm and the line in the algorithm

48:56

let's look at the line in the algorithm the line in the algorithm is this part

49:02

right here so you have to receive the act from everyone if you enter in the

49:05

radial section this is the first the first statement

49:08

and it's obviously correct in the book and such as happened after your request

49:15

when you create a new request its timestamp is greater than the typestamp

49:19

of all the old acts this is also obvious if you have old

49:23

hack in your memory then you increase it the logical clock you remember so when

49:27

you create a new request the timestamp of your request will be greater than all

49:32

the old act that you have in your memory because of how the algorithm is done and

49:36

so it means that immediately all the other are killed so you have it in your

49:41

set you can also feed them if you want to be you know to optimize you can free

49:45

the up you can remove them from the set but even if you do not remove them they

49:50

will not be good because they are old so both the process have received yak

49:56

from any other process so we have p i v

50:01

so they both received the act from any other

50:05

and of course if they both enter in the critical section then it means that the

50:11

requests of each one is the smallest one in the queue because you enter only if

50:15

when your request is the smallest one in the queue

50:18

so this is a proof by contradiction so now we have to show the contradiction so

50:23

it means that the process one received the diac from the other process

50:28

because they received the act from everyone

50:32

and notice that when p2 sends the act to p to p1

50:38

it means that p2 asked the request of p1 in its memory

50:42

because you send the app when you see the request

50:46

also p2 received the act from p1 do you agree with me because they all received

50:50

the up and so it means that also p2 inside is memory sorry also p1 inside

50:57

this memory as the request of p2 so it means that when both they have all

51:02

the acts they see the request of each other

51:04

so at this point in the proof it means that you see the request of each other

51:13

so here this this thing is just to see that they

51:16

see the request of each other but if they see the request of each other and

51:19

each one is minimal we have a contradiction why because it's there are

51:23

only two possibilities the timestamp are different

51:27

but if the timestamp are different one is less than the other

51:30

and so it's not possible that they're both mean or the timestamp are evil

51:35

but if the time is temporary equal you compare the ad

51:38

and if you compare the id it's not possible that they are equal because the

51:42

id are unique and are between one and n or zero and n minus one and so it's

51:48

impossible that they both enter so one of the requests has to block the other

51:52

guy that's the only thing

51:55

now there is a question from whom that they are

51:58

asking i will answer the question and we will do the small break

52:01

and the question is but this means that the process know the

52:06

id of each other they have to know each other but this is so because there is

52:10

this line in the initialization so here i'm using capital pi that is the entire

52:16

set of process okay so giovanni we always assume that you know the entire

52:21

set of processing the system and you know the id of everyone else

52:24

because they are the idea the the the the ip addresses that you

52:29

use to send a message to people and you need to know them okay there is a branch

52:33

of distributed computing that computes when you do not know but we

52:37

will never see it okay

52:40

so we always assume that we know everyone but when i say in an exercise

52:45

you know just one or two and then you have two reasons how to solve it

52:49

okay so if there are no question we will do

52:53

a small break you can also ask questions during the break so we do 10 minutes

52:56

break and then we start again at 2

53:01

and we see the other proof we will see the fairness and the

53:05

liveness the

53:07

justification of the lines okay so let's do our break and in ten means

53:13

we will see again each other to start again so if there are questions you're

53:17

free to ask what also from a moment

1:01:16

okay so we can start this is the the token to confirm your

1:01:20

presence i will give you a bit of time to write it you have to go

1:01:24

inside per digit and use the token to say yes i was present

1:01:29

during the the lecture okay so this is the token is eight five two

1:01:36

seven zero four eight five two seven zero four you have to use this token on

1:01:41

the digits to confirm that you were here

1:01:45

okay so i leave the token in the background

1:01:48

while i explain what i meant can we go to the message can we cut the

1:01:53

message by half because it was not really clear

1:01:57

so how many message does the perfect failure detector

1:02:02

excluding the amount generate for every cycle so when we have a cycle

1:02:08

of delta each one

1:02:11

start a broadcast right and how many messages there are if you have n

1:02:16

processes and each and process is sent and peak

1:02:22

and processes each one send ten and a square and a square because i have

1:02:28

n ear and ear and ear and ear and ear and there are n of them so n plus n plus

1:02:36

n if we do it n times it's uh n squared

1:02:42

uh so

1:02:44

it's the square so if it's it's the square okay if you sum and

1:02:48

n times it's n squared and so we have n n square messages that

1:02:54

are generated and then you have also the replies and

1:02:59

how many replies you generate also you generate and square replies

1:03:04

because you have a reply back for every message you send if you send them square

1:03:08

messages there are n squared messages so is n squared plus n squared is 2

1:03:13

times n squared this is the the the complexity of the

1:03:16

algorithm the number of messages we send in each cycle okay

1:03:21

so the question can we could cut the message by alpha it means can we do

1:03:24

something in which the number of messages n

1:03:28

sorry m the number of messages that is 2m squared is equal to m over 2. so cut

1:03:34

by alpha means you know remove alpha of the messages

1:03:39

removable so is there someone that has an idea or

1:03:44

now we can remove half of the message from the exclude on timeout

1:03:49

half of the message means that we have to remove you know alf

1:03:55

so the best way to remove half of the message in this case we use a pattern

1:04:00

that is a request reply and this is the pattern okay to use in

1:04:05

the algorithm the button is request reply

1:04:08

the only way to remove alpha of the messages is to avoid to use this pattern

1:04:13

and yes i can avoid to use this pattern because as one of you observed why i

1:04:19

need the request i mean i am in a system that is

1:04:23

synchronous what i can do is that every minute i tell to the other people i'm

1:04:27

alive after one minute said tell again i'm

1:04:31

alive and after i'm alive if if if i

1:04:35

unfortunately die what happens is that i cannot say i'm

1:04:39

alive anymore so if for five minutes you do not see

1:04:43

that i'm telling i'm alive i'm alive my life then it means that i'm dead right

1:04:47

we can you what we are using here is not the fact that you do not reply to our

1:04:52

requests is the fact that you are silent

1:04:56

so i wait enough time i see that you are silent and they say

1:05:00

oh if this guy is silent something bad happened

1:05:05

and this there is a sentence of nicola santoro in its book that says it's

1:05:10

really i mean it's not an interesting question

1:05:12

but i like it also people say no nicola so in

1:05:15

synchronous network silence are expressive okay

1:05:20

he say that if you have a system that is synchronous then the fact that you do

1:05:24

not hear from someone as a mean

1:05:27

why because if a system is synchronous i don't have to ask you

1:05:32

please reply to this request i can have the time and i can say okay my notion

1:05:38

the time or is more or less your notion of time and if i tell us what at 1 pm

1:05:43

everyone has to tell i'm alive we can have a bit of difference because

1:05:48

remember there is clock synchronization there is a skew of delta so it's

1:05:52

possible that 1 pm for me is not exactly 1 pm for you because there is this delta

1:05:58

but this delta is bounded we have seen in the lecture of clock synchronization

1:06:01

we have seen that we can have an algorithm that synchronize a software

1:06:05

clock with a difference of at most delta that depends on the delay whatever but

1:06:09

they can be synchronized and so it means that in a synchronous

1:06:13

system i can do an algorithm that tells to everyone at 1 pm you have to say i'm

1:06:19

alive and at 1 pm everyone tells i'm alive

1:06:23

then i'd say at 2 p.m you have to tell us i'm alive and everyone will tell i'm

1:06:27

live if by 4 p.m i see that for 4 hours

1:06:32

i did not hear from process three then i can safely say process three is dead why

1:06:38

it me said the check at one pm he me said the check

1:06:42

at 2pm emi said the check at 3 pm he missed the check at 4pm as to be that is

1:06:47

the only way if the system is synchronous

1:06:50

and this is the idea that we're using this algorithm that is called a

1:06:53

round-based p so do not be

1:06:58

intimidated by this death right here this is just something that they need

1:07:02

because the synchronization is not perfect but it's really easy to manage

1:07:07

it's really easy to manage your skill of delta

1:07:11

it's called round based this basis is important why

1:07:16

because we have that in systems that are synchronous

1:07:19

you can have something that is called a ground-based computation

1:07:23

so it's it's equivalent to synchronous

1:07:27

systems it's assumed that the computation can be made around the basis

1:07:31

what it means around the base it means that you divided the algorithm in

1:07:35

logical round and there is a logic around zero then

1:07:39

there is logic around one this is the time logic around the two roger round

1:07:44

three and at the time at the range around zero

1:07:48

this if since the system is synchronous we have that if someone send a message

1:07:51

at the beginning of round zero you receive the message before the end of

1:07:55

round zero because the system is signals so it can take rounds that are long long

1:08:00

enough this round-based computation as you said

1:08:03

in many many many real-world algorithms in synchronous system

1:08:07

because it's easier than managing time i mean i decided that one round has to be

1:08:12

i don't know two minutes and few minutes are enough to receive

1:08:15

message from everyone so i can do inference because they say i start

1:08:18

around zero and they tell at the beginning of the round everyone has to

1:08:21

say i'm alive if at the end of round 1

1:08:25

i do not hear from p3 since i selected the length of the round large enough

1:08:30

that if p3 sent the message i would have received it then i can

1:08:35

infer that p3 is dead and so with round-based computation you

1:08:39

can do this kind of stuff so if you read an algorithm

1:08:43

in your life and you see that is round based

1:08:46

almost always is for a synchronous system okay

1:08:50

so there is an equivalence between synchronous system round base so this

1:08:54

algorithm here is round based and we will see that it can work because the

1:08:58

system is synchronous so how does it work

1:09:02

there is our clock so this is the comment this comment right here tells us

1:09:07

this is the clock the software clock and it's synchronized

1:09:11

without the people and this d

1:09:14

right here is the length of the round is how long is around okay

1:09:20

and here in the comments i specify that for the algorithm to be correct the

1:09:24

round has to be greater than two times maximum delay plus delta

1:09:29

so the skew of the clock enters inside the round why because if we are we have

1:09:34

a q on the clock for one second then i have to take you know into account that

1:09:38

you know 1 pm for me 1 pm for you could be 9 1 p.m and 1 7

1:09:44

because we are the synchronized so it means that us to play a role in the

1:09:48

length of the round the delay of the channel also play a

1:09:51

role in the length of the round why because i want a round that is large

1:09:55

enough so that if you send something at the beginning i receive it before it

1:09:59

ends and the only reason why i do not receive it is that you were dead you did

1:10:03

not send it okay this is why we we need this quantity

1:10:08

then there is the set of all correct process that is at the beginning is the

1:10:12

entire set the set of correct process and then i have a second set round alive

1:10:17

that i beginning able to correct that is all the processing the system

1:10:22

then i start with the fixture this is the round number these are the beginning

1:10:26

i start with minus one on every one it's a fictional round then there will be

1:10:30

rounded zero round one round three is just a very

1:10:34

here i have something that is really fancy but what i'm telling here is look

1:10:39

when the clock is a multiple of the time t let's just

1:10:45

say that the time is five seconds i am saying when the clock is zero when the

1:10:49

clock is five when the clock is 10 when the clock is

1:10:53

15 when the clock is 20 and so on so here

1:10:57

i'm just saying when the clock is a multiple of the time

1:11:00

so i say is equal to the time multiplied to a natural number this is something i

1:11:05

hope you have seen this is a fancy way to say clock zero five block ten fifteen

1:11:10

twenty and so on it's a multiple okay it means that every five second if t is

1:11:16

equal to five i execute this handler right here

1:11:21

so what i do in the handler i increase the round number

1:11:25

then for all the process that are correct

1:11:28

sorry this will we'll see i increased the

1:11:31

round number i put only myself in the round alive set and then i send the bit

1:11:37

to everyone so what i'm doing right here when i start i send a beat and i say to

1:11:42

everyone i'm alive at this point i do not only

1:11:47

send the beat i also reset the round alive set and they will put just myself

1:11:53

why i'm doing this because here i will check around the

1:11:58

live and i will see who is alive okay how do i check it well the other process

1:12:02

does the same thing so it will send me a bit

1:12:06

when i receive a bit right here i put the id of the other processing round

1:12:10

alive and so right here

1:12:14

so it means that when i trigger again i trigger this thing and they see oh all

1:12:19

the correct that are not around the line that will be empty

1:12:23

why because all the correct process in a system of two processes p0p1

1:12:29

the one around the live are p0p1 and this and this part of the code will

1:12:35

not be you know triggered when is that this part is triggered if

1:12:40

someone dies why

1:12:42

because let's say that we have this example and this guy dies

1:12:46

okay what happened is that at this point i have corrected with 0p1 at this point

1:12:51

i would just speed 0 around alive i send my beat but the bit of this guy

1:12:56

does not count why the bit of this guy does not come

1:13:00

because at this round he was this was dead

1:13:03

so if it is that we cannot send the message so when i arrive at this point i

1:13:08

run this line of the algorithm and i find p0p1 incorrect

1:13:14

0p1 incorrect minus round alive around the line is bit

1:13:18

zero and it remains p1 that is crash y is crashed because it's not in round

1:13:24

alive because he didn't send the ping so i'm

1:13:27

not triggering this handler with sender p1

1:13:31

so it means that is dead so i remove p1 from the correct

1:13:37

why i remove p1 from the correct because it's dead

1:13:40

and then i trigger crash p1 and i say oh p1 crash

1:13:44

so this is the pattern of the algorithm this algorithm is a formalization of the

1:13:48

idea that

1:13:51

every at

1:13:53

interval of times everyone says i'm alive okay what is the only difficulty

1:13:59

of this algorithm what is the only difficulty is to

1:14:03

pick sorry you know it's not the delta stick

1:14:06

is to pick the right time t

1:14:11

this is the complexity of the algorithm why

1:14:14

because if i pick a time that is too small what happens is that i create a

1:14:18

new round in this point it means that you answer

1:14:23

and i receive the answer at the next round but if i receive the answer at the

1:14:27

next round i'm violating the concept of round

1:14:30

because i say a round has to be large enough so that if you send something at

1:14:34

the beginning of round zero and the beginning of round zero can be

1:14:38

slightly desynchronized by the accuracy of the clock

1:14:43

so if you send something at the beginning of round zero i have to

1:14:46

receive it before round zero end if i take a t

1:14:51

that is too small then this does not hold so i have to take a t that is long

1:14:56

enough and this long enough is okay

1:15:00

this long enough is okay of course you can imagine that in the

1:15:04

long enough we need

1:15:06

the synchronization the synchronization accuracy that plays

1:15:10

a role why because if we are desynchronized at

1:15:14

one hour so 1 p.m for me is 2 p.m for you i have to take an

1:15:19

account this because when i i start at 1 pm you can start round at 2 p.m round

1:15:24

zero so it means that the length of the round has to be at least delta so that

1:15:29

you also start the round right 1pm i start i know that you are one hour late

1:15:34

so i stay for one hour in the round then you

1:15:37

enter in the round of course if i enter in around the 1 pm

1:15:41

and we can be desynchronized by an hour by 2 p.m at

1:15:46

most you also enter in the round because it's one hour of difference

1:15:50

right so by 1 pm by 2 pm sorry you execute this angle right here

1:15:56

and this is the first part of t but then i also need a bit of other part

1:16:02

what other part i need that if you send a message i need the time to receive it

1:16:05

right and this is this max delay right here

1:16:09

so now you can ask well why you put two there

1:16:13

okay this is this is a nice question i put two there because i'm always afraid

1:16:19

of make algorithms that are not correct and so what i do when i have a bound i

1:16:24

do it larger than what is strictly necessary i say okay

1:16:28

it's better to have two to twice the time and having an algorithm that works

1:16:33

that having a perfect you know round length and then the algorithm that

1:16:38

failed to work if something happened or if i did a mistake in the computation

1:16:43

so for this reason i put those

1:16:53

so there is a a question from flavio that says

1:16:58

why at the beginning you put round alive equal to correct

1:17:04

i mean uh because if i don't put round alive equal

1:17:08

to correct when it triggers at the beginning it will flag everyone as

1:17:11

questions for the way i

1:17:14

wrote the album so let's put let's put around the live

1:17:18

empty if i do this then correct minus around the live is equal to correct and

1:17:23

here i wrongly flag everyone right at the beginning

1:17:27

because i i wrote the algorithmic way so i cannot put around the live difference

1:17:31

that correct because there is the first round

1:17:34

this is for the initialization the the kick start has to be done in this way

1:17:38

okay sorry i miss and then there is another

1:17:41

question that i say i missed why you start with minus one

1:17:44

i start with minus one so that the first round the first three around is zero for

1:17:49

everyone why because you start and you do minus one plus one is equal to zero

1:17:54

this is just because i like to start from zero okay but i mean you can put

1:17:59

one is the same it means that the first round in the system is round two

1:18:03

but it's not a problem okay so

1:18:07

do you agree because i wanted that once one everyone send the message error is

1:18:12

equal to zero because i i like it in that way

1:18:16

but does not change anything for the correctness of the algorithm okay any

1:18:20

numbers will do but zero you know is the start

1:18:24

at least for for

1:18:27

for uh the western pound okay so

1:18:32

what is the proof of the the algorithm the algorithm is

1:18:35

really easy to prove if you show this property

1:18:39

and this property is the property of the round that i was telling you and the

1:18:43

property say if i send a bit to a process p when my

1:18:48

round number shows r then the bit reaches p when its round

1:18:53

number shows r so it means that the round are synchronized

1:18:57

so if i prove the property that the rounds are synchronized

1:19:00

then proving the correctness of the algorithm is easy

1:19:04

so this is called a lemma so i don't know if you know the

1:19:10

difference between lamb and theorem the lamb

1:19:13

is a small thing that we prove and that we need to prove a theorem okay

1:19:18

i mean you can have theorem that are really

1:19:21

short and the lemon that are really long do not make something that is a lame

1:19:25

material or the other way around a lemma is something that you use to prove a

1:19:30

theorem okay so for this reason it's called level and this is a lemma because

1:19:33

we will use this property to prove then the correctness of the perfect failure

1:19:39

detector so by the algorithm i send my bit as

1:19:44

soon as my round is r do you agree with me because in the

1:19:48

algorithm you send the bit at this line right here

1:19:52

local computation takes zero time in the course we are saying local computation

1:19:56

instantaneous when you are scheduler the android is executed immediately so when

1:20:01

the round is zero immediate for me the time process one i immediately send the

1:20:06

bit and now this is the the first

1:20:11

part of the the length the second part of dilemma say by the bounded skew of

1:20:16

clock synchronization if time t is the first time at which my round number is r

1:20:23

is zero let's say that disconnected

1:20:29

so if time t is the first time at which my round number is zero then for any

1:20:34

other process p it will have around the number of zero

1:20:39

at a time that is at least at least t minus delta at most t plus delta

1:20:45

this is also easy let's do it with the number we are the synchronized of five

1:20:49

seconds because the accuracy of the clock

1:20:52

synchronization in five seconds my round is zero at one pm

1:20:56

my 1 pm my local clock it's possible that for a process 2 the

1:21:01

round is 0 at 1 pm minus 5 seconds why because it's faster

1:21:06

than me or it's possible that the round becomes 0 in the other process at 1 pm

1:21:13

plus five seconds because this is lower than me but it's not possible more

1:21:18

because we are synchronized there is the clock synchronization

1:21:22

by the round length so what is the the the process stays the other process p2

1:21:28

stays in round zero at least until t minus delta plus t

1:21:33

so t minus delta is the worst case is the case in which you started the round

1:21:37

really early it starts at 1 pm minus 5 7. this is the worst case but then it

1:21:43

stays for a period that is t t for the algorithm is q time maximum

1:21:49

delta plus delta so we substitute q time plus delta max

1:21:53

delta and it is t plus delta plus maximum delay

1:21:58

do you agree with me so it means that process 2

1:22:01

will stay in the round from 1 pm minus 5 seconds

1:22:08

until 1 pm

1:22:11

minus 5 second plus t and t is exactly this quantity so this

1:22:17

quantity right here when we do the computation it means that this stay up

1:22:22

to this time this is my local time by the delay of the link my bit reaches

1:22:29

p in the interval t plus delta and t maximum delay

1:22:33

so it means that it will reach the process p 2 before the end of the

1:22:39

round why because i took a t that is long

1:22:43

enough to account for the synchronization

1:22:46

if it starts the round early and for the delay of the message maximum delay okay

1:23:03

okay so what we have seen we have this lemma

1:23:06

now if i send a bit to p when my rounded number shows zero

1:23:12

then the beat will just be within round number shows zero and i can do with one

1:23:16

with two is for every round number this proof

1:23:20

so the stronger completeness if p dies

1:23:24

i will not receive the beat and i will signal it and this is trivial

1:23:28

completeness if someone dies does not send a beat

1:23:31

and eventually i i start a new round i wait the bit for that new round i cannot

1:23:37

receive ping from the old round why because of this lamp

1:23:41

i cannot receive a ping from an old ground because i had to receive it

1:23:44

before so if i start round one and he died in round zero i cannot

1:23:49

receive the old ping because of this the strong accuracy if at round one i

1:23:55

start round one and i do not receive the bit from p

1:23:59

this i do not have to make mistake then the only possible reason is that p

1:24:04

did not send it why because we have this lamb

1:24:07

so if at the beginning of round one p was alive and sent a message then i have

1:24:13

to receive it before the end of round one is the only possibility by this

1:24:17

lemma so if i end round one and i do not receive the ping from process p

1:24:22

then the only possibility is that p is dead because of the length

1:24:27

so as you can see this lemma is enough to prove the problem so once we have

1:24:31

dilemma the properties become trivial so this is lemma one

1:24:35

this is theorem one and this is theorem two because they prove two different

1:24:39

properties okay now one thing that you can try to

1:24:43

do is that i told you that a t greater than two times delta plus

1:24:49

maximum delay was more than enough

1:24:52

i mean i put it two here but is more than enough you can do better you can

1:24:57

have a round number that is a bit better and so an exercise that you can do is to

1:25:03

try to find the mind minimum t for which this algorithm work

1:25:09

so you can degrees a bit you can have something a bit better than this okay so

1:25:13

try to reason and see what is the minimum the minimum means i try to

1:25:18

decrease this quantity and i have to see if i long enough to receive the messages

1:25:24

before the end of the round okay it should be

1:25:28

okay well i will not tell you the solution but he is not different okay

1:25:33

it should be maximum delay plus delta plus epsilon just an x

1:25:39

okay so as i told you before this round-based failure detector is

1:25:45

important because you show you the concept of brown

1:25:49

so the concept of round is an alternative way to see a synchronous

1:25:52

system in this alternative way we imagine that

1:25:56

the rounds start exactly at the same moment on all the process so exactly at

1:26:01

the same moment at round zero

1:26:03

every one starts around with zero and exactly at the same moment everyone send

1:26:08

a message this we can do because even if we have a

1:26:12

small delta of five seconds i've shown you that it's not a problem even if

1:26:16

there is five seconds of delay i can take a round long enough so that if we

1:26:20

are the synchronized that is fine still i will receive by the end so logically i

1:26:25

can imagine that exactly at the same time t everyone started the round even

1:26:30

if it is not true in real life because i can

1:26:33

i can create something that make this happen in logical in a logical algorithm

1:26:40

so in the round-based system the synchrony

1:26:44

assumption is abstracted assuming that processes start around exactly at the

1:26:49

same time so exactly at the same time everyone goes in round zero exactly the

1:26:54

same time everyone goes in round one exactly the same time every game every

1:26:58

time everyone's goes in round two and so on

1:27:02

when you start a round you do the computation instantaneously everyone

1:27:06

does the computation everyone generate a message for the round send the message

1:27:11

to a set of process and if you are correct

1:27:15

if you are correct then in a round-based system we have that if you send a

1:27:19

message at the beginning of round zero every one

1:27:23

of the target set the one you want to reach

1:27:26

will receive the message before the end of round zero and this is

1:27:31

an alternative way to see synchronous system so you can

1:27:36

imagine that you have this structure and you can build an algorithm with this

1:27:41

structure in a synchronous system so we can imagine that

1:27:44

everyone starts at round zero send the message do computation round one

1:27:49

everyone send the message do computation round two and so on

1:27:53

this if reflect about it is really powerful i mean you can use this

1:27:56

structure to solve a lot of problems this structural grounds

1:28:02

okay so there is an article that you can read is an optional reading you can

1:28:07

you can find it on the website that is linked in the the the course diary and

1:28:13

say this the worst log sorry and say the splendor is a misery of ground is of

1:28:17

adam shemian was 2019. so it was quite recently is a

1:28:22

divulgative article that explains what are around and whatever so you can read

1:28:26

it but you just have to remember that in a

1:28:29

synchronous system you can assume that you have this structure of ground so

1:28:33

around zero everyone start create the message send the message is received

1:28:38

before round one round one exa happens exactly at the same time on everyone

1:28:43

receive the message they compute and they do

1:28:46

their things okay

1:28:49

and now let's say that i have a round based

1:28:53

failure detector p so my favorite detector

1:28:57

the one that i showed you is possible that i have this execution

1:29:02

so i have that the process this process here dies

1:29:06

when round two starts at the end of round two the beginning of

1:29:11

round three with zero detected but you detect it and the other three process

1:29:16

this one do not detect him and then around four everyone detected

1:29:20

now i'm not talking about the specification but the implementation

1:29:25

so it's possible that in the implementation of the round-based i have

1:29:29

this kind of detection okay now why not

1:29:44

because but when you add it when you receive the message

1:29:48

i mean when not okay

1:29:54

so and when this process sends the message

1:29:57

right here at the beginning okay they send the message they send the the beat

1:30:01

this process so you say if this is sending the

1:30:04

message since it is around the base this message has to be received also by this

1:30:09

guy and this guy right this is true

1:30:15

only if this dies before the start of the round

1:30:19

if this process dies when the round star is starting is not

1:30:23

true it's possible that this guy does not receive the message

1:30:28

this guy does not receive the message and this they receive the beat

1:30:32

why how do you send the b to other people in

1:30:35

the algorithm we send the bit at this point sorry at

1:30:44

this point in the algorithm okay this is the the the the point in which

1:30:50

we send the bit we agree with me is the point in the algorithm which we send the

1:30:54

b which kind of things i'm using to send

1:30:58

to the beta for right what happens if you happen if you die in

1:31:03

the middle of the floor that is possible

1:31:08

it happens that someone uh received the message and someone does not receive it

1:31:12

right so even if he's around based you can

1:31:15

think okay it's round-based and everyone will receive the message if you look at

1:31:19

the property i say if i call it so i say if a correct start a round and

1:31:26

then all the correct will receive it but if a process that crashes start around

1:31:32

and dies in the middle of the round is possible that dies when is executing

1:31:37

these four okay if he dies when he's executing the

1:31:41

floor we have something like this you are you're excited before you die but

1:31:45

there are some messages that were fast enough to leave you

1:31:49

at your destiny before you die so you are able to send some message

1:31:54

and this is possible okay and so it's when you are a process that

1:31:59

is not correct and you have a four in your algorithm

1:32:03

you always have to imagine that it's possible that that four is partially

1:32:06

executed and is possible that is partially

1:32:09

executed and is the worst case i mean the best

1:32:12

case is if you execute the entire four or not

1:32:16

that would make things really easy unfortunately it's not the case okay so

1:32:21

even in a round-based failure detector we can have that this guy received the

1:32:25

message so he does not detect because he find it in a live round

1:32:29

this find it in a live round this find it alive round this does not find it why

1:32:34

because he died ex figured in the four this does not find it because he died

1:32:39

this guy executing the force so does not send the message

1:32:45

but what happened at this round four right here

1:32:50

is it possible that we have the same situation also at round four no

1:32:55

why because this died before the round starts so if this dies before the round

1:33:00

start at this point cannot send anything cannot execute the four right because

1:33:04

it's dead and so here is impossible that someone received the message why because

1:33:09

it's impossible to have something like this in a round basis

1:33:13

it's not possible in a synchronous system why because you take the time

1:33:17

long enough to receive the message so if you have something like this that the

1:33:21

ping is late then you are violating its incoming assumption of the system okay

1:33:25

so it's not possible and now i will do a bit of introduction

1:33:31

to the next lecture so

1:33:35

in all the our failure detector algorithm we have a time delta

1:33:39

delta next root of time out in the one of the rounds we have the period of the

1:33:44

t and so they influence the algorithm not

1:33:48

in the correctness part but in the performance part

1:33:53

why they influence the performance part because the delay

1:33:57

that you need before detecting a crash is function of delta or function of the

1:34:02

round time t so even if in the correctness of the algorithm we were not

1:34:07

discussing this delta this delta plays a role

1:34:10

in the latency of the failure detector so the time you need to detect that

1:34:14

someone failed so you can be tempted and you say yo let

1:34:20

us make this time the smallest possible because you know you try to optimize and

1:34:24

you say oh i make the time smallest possible

1:34:27

and the smallest possible time allow me to detect if someone dies really fast

1:34:33

the problem of trying to decrease delta to pushing delta too much

1:34:37

is that you can be you can create problem why because if i put up this

1:34:41

delta too much and then i have a message that is you know a bit more than the

1:34:45

round trip time is round trip time plus episode

1:34:49

what would happen is this algorithm is that you see and you say oh p1 it

1:34:53

crashed but p1 was just late of x2

1:34:57

but you detected it crashed why because you remember how is the excluded tamit

1:35:02

cycle we started the cycle and the cycle is exactly round trip time i send the

1:35:07

message the message reaches p1 p1 for some reason is an epsilon late that is

1:35:13

you know really an epsilon and you receive it here

1:35:17

and at this point you flag p1 and you say your p0 and you flag a p1 and you

1:35:21

say p1 crash so if you want to be too too fast

1:35:27

then you can create problem because it it

1:35:31

it is enough that the system goes an epsilon

1:35:34

over the bound and does not work anymore but what happens after you can see it is

1:35:41

that you can understand that p1 is alive and you made a mistake right

1:35:45

why you understand that you make a mistake because you start to recycle and

1:35:49

you see that p1 answer to the pin right but it was too late

1:35:53

for the perfect failure detector we violated safe okay

1:35:57

but you can see that maybe you can have a failure detector in which you can try

1:36:01

to have a safety property or a property that is not safety and is

1:36:05

more you know more general and can have some mistake

1:36:10

in which you can say okay p1 pressured and then you understand that you say

1:36:14

okay not p1 you do not really crash and this is also useful if you have

1:36:19

event or asynchronous system in which this kind of situation cannot come

1:36:23

and so in the next lecture we will see the

1:36:27

eventually perfect failure detector that is called diamond peak

1:36:32

where diamond in logic means eventually so diamond pivot

1:36:37

because it's eventually perfect we will see it in the next lecture is a failure

1:36:41

detector that can make mistake and is based on the fact that we do not

1:36:46

know delta so we have to guess the delta and guessing the delta will create

1:36:51

possibility of a finite number of mistakes we will see in the next lecture

1:36:57

so see you on wednesday and we have still 10 means i've been a

1:37:02

bit fast okay we have 10 minutes so if there are any questions

1:37:08

any question on the lecture even from all

1:37:10

any question yes

1:37:22

you want to see this algorithm implemented in some programming language

1:37:30

okay the only simulator i know about but

1:37:37

because i'm not uh i mean i'm not a system guy in the sense

1:37:42

that i do algorithm in real life i do not do system i mean i also do system

1:37:46

but other kind of system the only algorithm i know of of distributed

1:37:49

computing computation was done by arnold castell and is in java

1:37:55

so you have to write code in java if you want to use that algorithm may call it

1:37:59

i don't remember the name jpsim something like that i have to find i

1:38:03

will put on the website so there is a simulator

1:38:06

for distributed system that is done in java and if you use that simulator then

1:38:09

you have to write your coding java okay i think that if you want to implement a

1:38:15

simulator of a distributed system in python

1:38:19

it will be i don't know one week of work at most because you just have to

1:38:23

simulate the channel so you create a scheduler you simulate the chart and

1:38:27

then you can write in python okay so there are questions for mom

1:38:32

there is a question of david that is really interesting and say but the send

1:38:36

of message is not an atomic operation so the handler are executed atomically

1:38:44

it means that on a process you take the lock

1:38:48

you execute the ender and then you receive the lock right

1:38:52

but there is no real life system that ensure you that

1:38:56

the process does not die in the middle so let's say also that the send of a

1:39:01

single message is atomic and they can agree with you that the sender with the

1:39:05

single message is atomic because either the message reaches ethernet or does not

1:39:10

reach it and if it is it in the middle the error correcting code will detect it

1:39:14

and it will kill the message but here you have a form you are sending several

1:39:19

message okay and so it's not possible that you have some some hardware that

1:39:24

keeps you alive for the time these four need and then you say then you can crash

1:39:29

okay okay so there is a question from from

1:39:38

whom they say oh so this is similar to what we we think when we do byzantine

1:39:42

algorithm because it seems that you always consider the worst case even with

1:39:46

crash failure and asynchrony we always have to consider the worst case okay

1:39:50

it's the only way to have a correct algorithm so you have to assume that

1:39:53

there is an evil entity the scheduler that decides that the pressure whatever

1:39:57

in the worst possible case and also possible cases to let people fail in the

1:40:02

middle of four or something like that but in byzantine it's different it's

1:40:05

much more complex because at least here what can happen is that either a process

1:40:10

sends all the messages or part of the message it's not possible that the

1:40:14

process send messages that are temporary okay

1:40:17

and that is another kind of failure and is really

1:40:21

really much much more difficult there it was a question they will detect

1:40:27

at the same time same round sorry this i do not understand i think

1:40:31

this this question i answered before and i didn't read it on time so they

1:40:36

are not ensured to detect at the same round they can detect one hour one round

1:40:40

late since they can fail in the middle of the floor

1:40:45

okay other questions okay if there are no other question in

1:40:53

the next lecture we will see the event or field detector that works in an event

1:40:57

or eventually perfect that was works in an eventually synchronous

1:41:01

system and then we terminated the time module

1:41:04

so we will see the inventory perfect failure detector we will see the leader

1:41:07

election module that are the dual of a failure detector

1:41:11

and then that's it for time

1:41:14

so see you at the next lecture that is on

1:41:18

wednesday so if there are any questions you can you can ask on the chat i will

1:41:22

wait for the five minutes until five until 3 p.m

1:41:27

so if there are questions from home or here

1:41:33

see you everyone okay yes i can repeat the t

1:41:41

so i have to take a t that is long enough

1:41:45

so that i can account for the fact that they start the round at a slightly

1:41:49

different time and they can also receive a message okay

1:41:53

so for this reason i have to when i take t i have to need the maximum delay here

1:41:59

because someone can start the round a bit

1:42:02

late but that is fine if you start around

1:42:05

late because what happened is that you can

1:42:08

sorry yes that is fine if you start no okay so

1:42:12

we can start around a bit early so we can start around right here

1:42:17

minus delta and this is the worst case if i start a

1:42:21

minus delta because if we start a minus is the best case if it's start to mass

1:42:25

delta y is the best case because the delay of the message

1:42:29

will make the message from the process reach you in the middle of the round and

1:42:33

this is fine the worst case is when it starts late

1:42:37

why start waiting because you will receive the message

1:42:41

with a delay that is the delay of the channel

1:42:44

delay channel

1:42:47

plus delta

1:42:49

that is the delay at which it started around

1:42:52

okay so you have to to

1:42:56

the the the answer to have the minimum t should be max delay should be the

1:43:00

minimum plus delta plus an epsilon where this epsilon is a a number that is

1:43:05

really low that we do not compute and just means you need something more to

1:43:10

not be really strict okay

1:43:14

so giovanni you can go if you if you wish

1:43:27

no max delay cannot change it's a constant of the system okay it's the

1:43:30

bound on the synchronous channel so if the synchronous channel has a

1:43:34

delay of five minutes of the channel you cannot have five more something okay

1:43:39

because this is of the system okay you're welcome yes

1:43:53

so if there are no other question i terminated right here so see you on

1:43:57

wednesday okay if you have questions you can even brighten it bye see you

1:44:10

you
#### Lezione 5
  
Gemini

0:03/1:44:10

2:20

okay so from mom can you see the the the screen and not the speaker one

2:31

okay so you see the the normal one not the speaker okay perfect thank you

2:40

okay so we wait a bit we started after 15 the monday

2:45

to give time to people that attend physically with something before

2:49

starting the lecture okay so for uh there is a question from

3:38

so for the for the rules i still have to

3:42

do the mixed course because if someone of you get ill or or

3:47

for some other reason you can ask to do the

3:50

the mixed one so if the rules do not change i will keep it in a mixed format

3:56

that means in presence plus the remote lecture

4:00

if the regulation would allow me to do in president 100

4:03

i will i will still decide okay you're welcome

4:13

so okay usually you should also write the question in in english on the chart

4:18

i mean i understand italian but there are some of your colleagues that that do

4:22

not okay so

4:24

usually i always translate also the question but try to write the question

4:28

in english just out of respect for the ones

4:31

that do not understand italian i mean it's okay if you write in italian

4:35

something really you know specific that you

4:38

you want to be really precise in the wording and then they will descend and

4:42

translate but try to speak in english also in the chart if it's possible

4:53

okay so for the one in the in here at the break i will create the prodigy

4:58

token and you will confirm your presence uh

5:55

okay so we we can start so last time the last slide was this one

6:00

about the vector clock in the last lecture we have seen

6:04

few key concepts the logical coke and the vector clock and we have seen that

6:08

the ites a more profound meaning that is the

6:12

causality and so today we will start the lecture

6:16

by by seeing uh

6:19

an application of the logical clock in the module exclusion

6:23

problem so it's an algorithm of lampards that was made to make a distributed

6:28

system share a resource in a multiple exclusive fashion we will see

6:33

what it means precisely after this we will start

6:38

the third and last topic about the time if you

6:42

go in the introductory lecture and you see the outline there was a module for

6:47

each topic so the third topic of time is the failure detector

6:51

the failure detector are something that does the name say without a lot of

6:55

fantasy they they detect if something crashes

6:58

and we will see that they have a special connection with time

7:04

because they allow us to encapsulate all the timing assumption in this primitive

7:10

but this is something we will see later so let us start by looking at the

7:17

lan port algorithm for module exclusion i want to stress

7:23

that this algorithm is not crash tolerant okay

7:26

so the entire algorithm assumes that process do not crash

7:31

we will see at the end of the failure detector

7:35

lecture i don't know if today or in the next lecture how the failure detector

7:39

will allow us to create something that is crash tolerant

7:43

but this version the original version of the algorithm assumes

7:47

that each process is correct this is an assumption

7:52

and so let us start by defining what module exclusion means because it's the

7:57

first thing we have to specify the abstraction

7:59

and so the modal exclusion for us will be

8:02

a block of this kind that expose to the external world three

8:08

different events that are grant

8:12

requests and release one of this event is

8:16

created by the module exclusion primitive and is the grant event this

8:20

event informally says to someone that is able and free to

8:26

access the

8:28

resource so which color menu

8:37

i don't understand so you are you are seeing not the speaker view you're

8:41

seeing the other view okay wait

8:48

okay now you should see the the desktop one right

8:54

yes okay you're right

8:58

so sorry about that and uh

9:02

so the grand event is something that is created by the moodle is crucial

9:06

primitive and it tells to a process you are free to use the resource you will be

9:10

the only one of course when you have to enter inside

9:14

the pre uh results in a modal exclusive fashion you

9:18

need the request event the request event is something that is created

9:22

by the upper layer and tells to the moodle is crucial

9:25

primitive please let me

9:28

access the resource when you can and then once you have done you create

9:32

the release event that release the results

9:35

and so here there is the summary so the request is from the upper layer and says

9:40

to the mutual exclusion algorithm please allow me to access the critical section

9:46

when you can then there is the grant event that says

9:49

you're free to go you will be the only one you can access the resource

9:54

and then you access the resource you do your things that can be i don't know it

9:58

depends on the resource if the resource is a printer you print something you

10:02

actually start printing then once you have done

10:06

once you have done your stuff you tell to the module as crucial primitive i

10:10

release the resource so you can let someone else enter and use it

10:16

what are the properties of this abstraction there is the mutual

10:20

exclusion property that says at any time t

10:23

only one process is inside the gs so gs means critical section is the

10:29

resource okay the resource is called critical section

10:33

historically because it's critical it means that only one can access it so

10:38

this is the reason why it's called critical section

10:40

so you can substitute the criteria session with resource and is exactly the

10:45

same and then there is the liveness property

10:48

that says if a process p request access to the critical section

10:53

then it eventually entered the critical section

10:56

this is a non-starvation property it says that if you want to enter

11:00

you ask to the module please let me enter in the critical section sooner or

11:05

later there will be the grant event that will tell you you can access the

11:10

credible section and then there is the fairness

11:15

if the request of process p happens before the request of process q then q

11:20

cannot access the critical section before p

11:24

so fairness is a bit more complex than liveness fairness tells you that if you

11:30

ask to enter in the critical section before someone else

11:35

where the before is the up and before causal relationship then you will enter

11:40

before that one so intuitively we have

11:44

a process here and at this point you ask to enter so you say please request to

11:49

the critical section then there will be someone that asked to

11:53

enter process 2 let's say after and is also asked the request

11:59

if these two events are connected by an opponent before

12:04

relationship then you have to enter before this one this is what the

12:09

fairness assumption mean intuitively is something that we as

12:13

human understand because he says that if you did something you know if you ask it

12:18

to enter before someone else then there is a cue and you will enter before that

12:22

someone else okay not all the module exclusion algorithm

12:26

uh are able to guarantees this product okay

12:29

there are algorithms do not guarantee that but the one we will see

12:34

does guarantees are fairness okay

12:38

yes so

12:46

okay good point so there is here the five

12:49

okay the fifo we i am because i had the next

12:53

slide so our primitive needs a fifo perfect point-to-point link

12:59

so we are assuming five following five what we have seen in the last

13:03

lecture it means that the required the if you send something on the link abc

13:08

in this order the other will receive abc in that order so there was one one of

13:13

your colleagues that asked is because of this property that you need fifo

13:18

actually you need five of your correctness also in this algorithm okay

13:22

not only for this property but this property i'm sure that the proof depends

13:25

on the the proof of the of the fairness depends on the five also

13:30

for this property but if i remember correctly also in the module exclusion

13:34

you need fifo at least in the proof that i wrote so i think i think you need also

13:39

for the mobile explosion okay

13:43

so before delving in the details of the algorithm we will

13:48

specify something the algorithm assume no crashes this is the second time i

13:55

stress this point because it's an important point so the number of failure

13:59

is zero so even if you have a single failure the

14:02

algorithm does not work anymore so what happens essentially is that the

14:06

algorithm gets stuck and does not progress anymore if someone fails

14:11

so how does it work when a process want to enter the critical section it will

14:17

send in the algorithm this is an eye level overview it will send to the other

14:22

requests it will say please let me enter in the critical section

14:27

okay so this is this this kind of algorithm are called permission basis

14:32

because you ask permission to the other there is another family of algorithm in

14:37

your explosion that are called the token based we will not see them

14:41

they were used in the past also in some system today

14:46

so what you have is that you use the the scalar clock those are the logical clock

14:50

the clock that are done with just the counter remember the first one you see

14:55

and you use the scalar clock to time stamp any message in the output and we

15:00

will see that this time stamp ensure the modular exploration product

15:04

the second assumption and this is really important because otherwise the

15:08

algorithm does not work is that the link are fifo

15:12

so the link of the entire system we have a system that is a complete graph

15:18

everyone is connected with anyone else and on this complete graph every link is

15:24

five okay and uh of course

15:29

we follow the protocol of the lanport clock that says that whenever we send a

15:34

message we increase the logical clock before sending when we receive the

15:38

message we increase the logical clock when we receive it but in the algorithm

15:42

we do it explicitly so there will be a counter that we will increase when we

15:46

receive a message and this is the algorithm so the

15:50

algorithm is fairly complex this is the first

15:55

complex there are more complex algorithms that

15:58

you will see but this is the first non-trivial algorithm

16:01

because all the other algorithms were more or less intuitive and they were

16:06

working just between a source and a destination there were just for two

16:10

people okay source and destination it was always an instance between source

16:13

and distinction this is the first algorithm that involves all the

16:18

processes in the system so it's the first algorithm that we see where

16:21

everyone will run the algorithm there are no two points and this everyone is

16:26

this set here so if you return back at the introductory lecture i used pi

16:33

capital pi to indicate the set of all processes and

16:36

so this is the set of work process so when we start the algorithm create a

16:42

set request and a set of apps and they are empty at the beginning okay those

16:47

are set that we will use to store the request

16:51

and store the ax as the name say

16:55

then we have a scalar clock this is the logical clock that we use remember this

16:58

is not a vector clock based algorithm the vector clock are different are more

17:03

powerful here we just need a number that is called scalar clock so scalar clock

17:08

logical clock software clock lamp clock they are all the same thing

17:12

that count and then there is

17:16

a variable that i use to just store my request when i have a pending request to

17:20

enter individual section this symbol right here i do not know if

17:25

we already discussed it i think not this is the first time this is just a formal

17:31

way to write null nil

17:34

in python whatever okay this means that this variable initializer to now

17:39

is this is bottom symbol is called bottom

17:43

and this the formula is also the books used so when you see bottom is just null

17:47

for for someone that or zero and she wouldn't

17:51

okay so the the we have four handlers apart from the initialization we have

17:56

angular one and vertical and r3 at angler4

18:01

okay so this here is just a comment so when you see the

18:05

triangle and something this is a comment for the line or a global comment for for

18:10

the handler okay so the first standard this one

18:16

is the ender that is triggered when the upper layer asks you

18:20

to do a request to enter in the radial section

18:25

this is triggered here

18:27

is this angular here okay this is the first one

18:31

then there is the release angle that is the purple one and is triggered when you

18:35

release the critical section okay then for the grant we don't have

18:41

an event because the the android because the grant is generated the grant is

18:46

generated right here so at this point we are here this is the

18:50

grant of the request he says you can enter

18:54

and then we have a special handler and this ender will

19:00

examine the set of requests and we'll examine the set of acts and we'll decide

19:05

if you're going to enter or not we will see in the details how he does that and

19:09

then we have a global handler that is used for the message that are delivered

19:15

so this global handler let me make it in blue is triggered whenever

19:22

an event here is created whenever you deliver some message from the upper

19:26

layer this angler is triggered and is you know a battery of switch case if

19:30

else if you have done a bit of coding you use this pattern a lot of times when

19:35

you have to multiplex to something we will see

19:39

so let's start from the request that is the first thing so when you have to

19:43

request a critical section what you do is that you increase the scalar clock

19:47

because you are going to create a new message so you have to update the

19:51

timestamp of the message so sometimes i will say timestamp of a

19:56

message for timestamp i just

20:00

indicating the scalar clock and your id let me be really careful on that this is

20:06

the cro the code for process p i you can see i right here okay

20:11

and here when i create a message for the request i will create a request message

20:16

that is done in this way there is the either of the requests that is just

20:21

wreck let's say this is a request it's just the either of the message requests

20:26

and then the payload is a timestamp message this ts and this timestamp

20:31

contains your id and the scalar clock so is a pain

20:35

is a pair id of the process scalar clock of the process

20:40

let me clear the drawing then what you do after you create the

20:45

request message you send this request to anyone

20:49

so this is a four for all the processing the system what you do you send using

20:53

the file for perfect link to the process pj you send the message

20:59

request let's go back what i'm doing here is

21:03

that i'm triggering the send event i'm thinking and send on the link i say

21:07

to the link please send send and i send the message

21:12

so here i'm asking intuitively to all the other people please let me enter in

21:18

the critical section so this request travels from the link it

21:22

does the job and then it's delivered right here on the destination the

21:26

destination receive a message so when the destination receive a

21:30

message you will receive the message our request what it does it it increases the

21:35

scalar clock and how does it increase it using the rule of the algorithm we take

21:40

the maximum between the clock on the message

21:43

okay it's a scalar clock plus one if you look at the rules of the logical

21:48

clock this is what we have seen when we do oh we take the maximum plus one is

21:53

the the usual stuff so here i'm just updating the scalar clock according to

21:58

the rules of the scatter code and then here i have a battery of if

22:03

else that i could have implemented more cleanly probably which is which case

22:08

what i'm doing i see what kind of message it is

22:12

so if the message is kind of request i will execute this thing if the message

22:16

is kind of locked i will execute this thing if the message is a release i will

22:20

execute this thing yes mateo we are sending to ourselves

22:25

but it's not a problem so there was a question from whom they

22:29

say oh if i run this for i also send it to myself yes you also ask the

22:34

permission to yourself and it's not shocking that you will say to

22:38

yourself yes you can enter okay we will see

22:41

but it's a nice question yes in all the algorithms almost all the

22:45

algorithm even the broadcast one when we do a broadcast we send it also to

22:49

ourself why we do that

22:52

because there is a rules that says that premature optimization is the root of

22:58

all evil so we do an algorithm that is symmetric okay where we do one things we

23:02

do not do a special case for ourselves then if we are an engineer we optimize

23:07

if we are computer science we just use that okay so this is the difference

23:11

between optimization and correctness and so

23:17

in this algorithm we have only three kind of messages

23:22

ack and release so when we receive a message we see that

23:27

is a request what we do we add the message to the

23:30

request set we increase the scalar clock by one and

23:34

y we increased by one because we send a knock okay so i'm creating a new message

23:39

that is the arc and before sending the account i

23:42

increase my scalar clock and then i send it yeah

23:45

i send the app to u i send the app to the sender of the

23:49

message so if p i asked to pj

23:54

please let me enter in the critical section what pj does

23:59

is to take the sources say oh spi so i put to

24:02

the source right here and the answer with anak with the scalar clock that is

24:06

increased by one okay so you're just answering

24:12

so as you can notice you send anak immediately so if it asks

24:17

i don't check if i want to enter in the critical section if i'm in the critical

24:21

section or not i immediately send the knock and we will see that this is not a

24:25

problem because the there is a point in any

24:29

moodle exclusion algorithm where someone has to wait deceased and say okay i have

24:33

to wait i cannot enter in the critical section okay this point will be

24:38

examined right here so do not worry you send an act immediately but this is not

24:42

a problem okay will not be a problem

24:46

so if the message is on what you do is you just add the message

24:50

to the accent and that's it if is a release what you do is that you

24:55

remove the request from the the request set okay because here you add the

25:00

request set then when someone will release it you will send a message say

25:04

oh please release i release the critical section you look in the set and you say

25:08

okay i have to remove the request for which there existed the release

25:13

so we will see the leaders of the academies

25:16

and you ask two people so you start with time stamp zero let's say you are the

25:21

process with i did zero and times zero at the beginning you start you are lucky

25:26

you have the id 0 and we will see why having i i did 0 means that you are

25:31

lucky and at least in this algorithm and then you start asking to everyone please

25:35

please i want to it was the critical section everyone executed

25:40

this code because the the link are perfect you do not die so sooner or

25:44

later everyone will receive the request they act to you you receive the act you

25:48

start populating this set you put the app

25:52

once you receive the act from everyone this handler right here will be

25:56

activated it means it can be triggered so when the scheduler activated

26:01

activates you after a time you execute this handler

26:05

this handler says does not exist our request

26:11

in the set of requests such that the timestamp of the request

26:15

is less than the timestamp of my request because when you send a request you put

26:19

my request right here okay and for any other process in the system

26:25

there exists a knock from that process the resistance message enact such that

26:30

the timestamp of the arc is greater than the timestamp of my

26:33

request and the sender is p so this

26:37

mathematical bubbling right here is just saying you receive a dynamic from

26:42

everyone in the system including yourself and the typestamp of the ack is

26:47

greater than the timestamp of your request okay and this means we will see

26:52

in the proof when this is true it means that they have seen your request that

26:56

they are not all hack why

27:00

because in this algorithm we never remove something from the accent okay so

27:05

you need the mechanism if you ask the critical section twice three times

27:09

forever because in the critical section algorithm you

27:12

can do request access to critical section use release

27:16

then after one hour you want to use the video section again so request again and

27:21

we need some mechanism so that you do not

27:23

go using the old axe because otherwise you know nothing work if you use the old

27:28

act then that's it and so this is the mechanism

27:31

to not using old apps and this is the mechanism to make

27:38

someone wait because let's say that there are two

27:41

processes that they want to enter in the critical

27:44

sections and they start exactly at the same time 0 and p1

27:49

we will see in the proof but intuitively what happens

27:53

is that they all start with timestamp 0 because there are zero event in every

27:57

one but also i have the id look i use the id in the request so p0 as i did 0

28:05

p1 as id 1 this comparison right here in the comment i'm writing how it works

28:12

this comparison right here works in this way it checks if the logical clock are

28:16

equal if they are not equal once wins on the other so if this is greater this win

28:22

okay and then it also check

28:25

the ids so in this case what we will do you will check and you will say oh the

28:30

timestamp is let me get in black the timestamp is zero for everyone let's

28:35

compare the id oh my id is zero i'm less than the other

28:40

one because my id is smaller okay and what will happen we will see it

28:45

happens that if two browsers ask to enter in the critical section at

28:49

the same time and they receive all the acts then we will see in

28:54

the proof this means that each one has seen the request of the other

28:58

when this happens so if this process has all the app all arc

29:04

and also this process as all the act all ack then it means that in the request

29:09

set of both process there are both requests okay so that means that this

29:13

guy has seen this request and this guy has seen this request when this happened

29:19

and so one of the two waits why wait because of this year

29:24

he waits before because this request is less than this one

29:29

so p0 is free to go why p0 is three to one because it does

29:34

not exist a request that is smaller and does not exist because zero zero is the

29:40

smallest of all the requests p1 will wait why because there will

29:45

exist in the request set of p1 the the request zero zero

29:50

so it will see zero zero and say oh it exists something this means does not

29:54

exist so this is the symbol that means does not

29:57

resist so say oh there is something that is smaller than mine i have to wait

30:03

and one is that this guy will enter in the critical section p0 sooner or later

30:08

will trigger a release and this is an assumption that i'm doing that you do in

30:14

any critical section moodle exclusion algorithm that's if someone enters

30:18

sooner or later release the critical section because if it enters individual

30:23

section and does not release the critical section anymore no one will

30:25

enter because otherwise you're violating those questions

30:29

so p0 eventually will release and what happened when p0 release execute this

30:33

handler right here what this handler does he removed its

30:38

request so p0 removed the request

30:42

he increases the scar clock by one and send a release to everyone so he sends

30:47

look there is a release from me when the people receive the release they check in

30:54

the request set and say oh let me see if i have a request from that sender if so

30:59

i remove from the request so what happens is that when p0 release

31:04

it executes this and this message reaches p1

31:08

reaches p1 because he reaches it p1 execute this line right here and say

31:14

okay i remove the request of p0 from the set because p0 has done its thing and

31:19

when it removes from the set now this this angular right here triggers for p1

31:25

why because this request has been removed does not exist anymore these

31:29

requests and so p1 is free to go why because it's the smallest request in the

31:35

request set okay so where is that logical clock are

31:39

used right here to order the request and ensure fairness we will see the logical

31:44

copy of true favors so this is the overview of the algorithm do

31:49

not worry now we will see an execution okay to make things clear

31:54

so there is a question from if my day is low is lower

32:04

it's the lower one because you are blocked if there exists someone that is

32:08

lower than you okay so it's the reverse so if your id is zero you enter

32:15

you enter after you receive the app the x from the others at the beginning if

32:19

your id is zero your timestamp is zero okay if your id is two and your

32:24

timestamp is zero you enter if zero does not ask at the same moment if it asks us

32:29

the same moment that means concurrent then zero will enter before you

32:34

so here i say you can enter if it does not exist a request with a timestamp

32:39

that is lower timestamp that is lower is defined right here means logical clock

32:44

that is one lower than the other or if the logical clock are equal

32:48

id that is one lower than the other okay so there was a question from they

32:52

say if my d is eigen i trigger granted the event noise if he's lower if it's

32:58

the lowest id in the request set with the same timestamps

33:03

is it clear no okay now this is this is an a

33:08

question granted is a local event okay granted is not a distributed event it's

33:13

the local event that

33:16

the moodle exclusion algorithm is creating granted means locally you can

33:21

go is not a distributed event this doesn't

33:24

the other process do not care this is local code okay so it's the is the is

33:29

this is the local event on the process that can enter the moodle exclusion okay

33:33

so granted is local okay there is something that they want to to clarify

33:38

because because uh

33:40

okay there is something i want to to clarify

33:43

all the variables are all local

33:46

okay we are in a distributed system course everything is local okay this is

33:51

a question that also in the old edition of the good summer me

33:54

thank you for making it again so i can clarify immediately so all these sets

33:58

are local we always have local variable they are only your variable

34:04

there are the messages that are used to exchange information there are no global

34:09

shared variables okay there will be global shared variable when we will see

34:14

the shared memory and usually what we do is to implement shared variable with

34:19

messages but the only things that pass from one process to other are message

34:24

this set is local when i put request in the set i put requests in my set

34:29

your set can be different can be empty can be full whatever it depends on the

34:34

message okay this is just local code that is executed

34:38

so please okay granted granted is an event that

34:50

triggered locally and this is this event right here what does it mean there is

34:54

there is probably an angler but the handler is from the upper layer okay

34:58

so there is the upper layer here that has an angler that will will end or

35:03

grant a request okay if the upper layer is a new one and you see the green light

35:07

of the semaphore you do your things okay this is this is the grant request is the

35:11

red light if you are a machine and you see the grant

35:15

request then probably you do something but it's not an handler in our code

35:19

right here it's an enter of the upper layer okay

35:22

okay so the grant is triggered locally right here okay so remember we said in

35:27

the in the previous lecture we use a layering

35:30

approach okay we have first layer seven layer and so so this grant is to the

35:34

upper layer that can be whatever also a new one in our

35:38

in our in our formalization so let's now see an execution of the

35:43

algorithm so here there is the algorithm of wrote in plain english okay so here

35:48

there is the algorithm brought how i like the algorithm here in plain english

35:53

so you can read it when you study okay is the the explanation that they did

35:57

here so this is the same so let's see the

36:01

execution so this message this blue message is a

36:06

message that is not for the modular explosion

36:08

algorithm because this module explosion algorithm may work together with other

36:12

algorithms okay so in blue one i should change the

36:16

execution because this is only confusing people this is not a message of the

36:20

module execution it's just a program message

36:23

of something that is above the moodle exclusion or on the same level we don't

36:26

care what he's doing is just updating the logical clock okay so the logical

36:30

clock of this guy is one and the logical clock of this guy is two okay

36:36

so here this red one is the first message of the

36:40

critical section algorithm the moodle exclusion algorithm and is the request

36:44

event so pc p3

36:47

p3 p2 p1 p3 start right here and say oh i want to access the critical section so

36:53

p3 triggers this handler you say oh i want to enter in the critical section

36:59

so what p3 does increases its vector is logical clock from two to three

37:04

increases the logical clock and then he sends the request to all the process in

37:08

the system the request is composed in usual way the timestamp the logical

37:13

clock and the id so it's a pay this is

37:17

this part right here okay

37:21

id clock and asks to everyone including himself usually himself i do like this

37:27

now i i omitted the the arrow but there is also the arrow to yourself okay

37:34

and then what happens the other people receive the message this is the arrow to

37:38

yourself is the just that send the message to yourself so this message with

37:42

logical clock 3 travels in the network he travels it travels he travels and

37:47

reaches process 1 when he reaches process one process one

37:51

execute this end layer right here so execute this line update the scalar

37:56

clock and then i see oh the message is a request he put

38:01

in the request set increase the scalar clock and send the arc

38:05

send the app and this is you receive the message you

38:09

put in the set the setting not drawing the set but they have the set of

38:13

requests increases the logical clock when

38:15

received the message three maximum between three and one is three three

38:20

plus one is four then i have to send the ack i have to increase before sending

38:24

the ack four plus one is five five i send the ack back to p3

38:30

and p3 at this point received the ack when it received the axe

38:35

executed this handler again because you are receiving a knock message you

38:39

increase the scalar clock and you put the yuck in the set

38:43

then the message traverse travels travels it reaches the other process

38:47

that is p2 p2 does the same stuff maximum between three and zero is three

38:52

three plus one is four and so your logical clock becomes four and then you

38:56

do the act four plus one is five and you send the knock with five and

39:00

this arc is received right here and what he does you will increase the

39:05

logical clock to seven yes maximum between five and six

39:09

plus one and so on at this point you can see

39:14

that at this point this process will receive

39:18

all the acts you agree with me because the act from yourself is immediate you

39:22

immediately act yourself and not drawing the act to yourself but you can imagine

39:27

i them you do it at this point right here you receive the

39:30

x from anyone else but now let's suppose that this guy wake

39:35

ups because this is a distributed algorithm p3

39:39

p2 p1 so at this point p1 wake ups and he

39:43

wants to enter in the critical section because

39:46

he wants to enter and so what he does is send the request also p1 so p1 send the

39:51

request how you do when you send the request increase logical clock plus one

39:56

five plus one is six and you send a request with type stem six id one and

40:00

you send it to everyone else notice that here we can see the

40:05

assumption of fifo so you receive the ack

40:10

from this process before you receive the request

40:13

because the channel is fifo you cannot cross

40:16

so if in the execution was like this i i draw the i i was doing something like

40:21

this in the execution and you write in the x and this is fifo

40:25

and i see something like this i get upset because you are crossing message

40:29

you cannot they have to be received in the same order five

40:33

so the same order means that r from the same source cannot cross

40:37

so these are us to be received before this

40:41

so this one ask and then you receive the up and so on so here at this point

40:47

how many requests are on p3 in the set of p3 at this point right here in purple

40:53

how many requests we have in the request that is a question

40:57

how many requests two two requests we have and what are

41:02

the id we have three three id 3 times m3 this one

41:09

your request and you have the request of the other guy six one

41:13

now at this point this point right here the blue one

41:17

p3 as all the acts will wait or not

41:21

is a question at this point p3 has all the act and

41:26

this is this request in its request set we'll wait or not or

41:30

we'll enter the critical section will not wait right we'll enter in the

41:38

legal section why because his request is the lower one in the system

41:43

because uh sorry yes

41:47

i did that sorry this is the the time stamp this is the id

41:51

let let me do it correctly otherwise it gets

41:55

confusing so the time stamp is uh yes i was correct so

42:01

so six one this is times then this is id

42:05

and this is three three

42:08

so you first yes you first compare the time stand my

42:12

timestamp is lower then i win and i do not compare the id if they had

42:16

the same id the same time stamp then i compared the ad okay not in this case

42:21

and so at this point this one can enter in the critical

42:26

section at this point right here the yellow one

42:29

also p1 receive all the arc you see my point at this point is involved yak

42:35

because p1 received the up from p2 and received the arc from p3 so at this

42:40

point p1 has all the x

42:43

what will be in the request set of p1 at this point how is done the request set

42:48

of p1 how many requests it contains two requests it contains the request of

42:54

p3 so let's call request p3 and contains its request request p1

43:01

okay p1 will wait or not

43:05

we wait we wait why because its request is greater than this request this

43:11

request was lower so this request has to enter so it will be locked

43:15

so at this point process p1 will say oh i'm not the the one with the lowest id

43:22

with the lowest request because of this point right here in the other so at this

43:27

point it will wait and you will wait until

43:31

the request of p3 will be removed from the set

43:37

and when is removed the request so here the answer in the video section p3 then

43:42

p3 is really a well-mannered process and so when

43:47

it ends you send the release okay the release is in yellow i'm doing the

43:52

release just to this one but we will receive will be received by everyone

43:55

because you broadcast your release okay the blog has still released

43:59

and then the release at this point reaches

44:03

this guy right here and when the release reaches process p

44:08

one process p1 execute let's go

44:12

execute this part right here this part right here what he does is he released

44:17

from process three he say oh process three is releasing what i have to do i

44:21

have to check in the request set and kill every request from p3 so at this

44:26

point he kills the request from p3 he removed from the setter request from p3

44:30

and how many requests has in its request set after the kill

44:35

how many requests does process one just its request right

44:40

and its requests will satisfy this handler

44:44

let's go back to the angler will satisfy this handler here why

44:50

because it's the lowest one and there is no one else

44:53

and then you receive it that yuck from everyone else and this is also you

44:56

received the awkward from ios and the time stamp of the act from

45:01

everyone else are greater than your requests why they are greater because

45:04

they increase they receive your requests they increase by one and they send so

45:08

time stamp of the act so here you understand that yak are not old and you

45:13

you enter in the critical section now i have a question for you is

45:18

possible that someone

45:22

see the release before

45:24

the release for a certain request before the request or not

45:29

so did you see my point is possible that there is a process in the system

45:33

let's call it let's say that this system are as 100 process and there is process

45:37

99 and process 99 see the release from p1

45:42

before the request of p1 is possible or not and if it's not

45:48

possible why is not no yes it's not possible because the

45:54

channel is five okay it's not possible if you receive this release then before

45:59

you receive the request so you handle the request you send the

46:02

yuck and then you resend the release okay so this this will be small pieces

46:07

that we use in the proof but it's good that you see just now because the first

46:10

thing you have to do when you want to to to understand if

46:15

it's an algorithm is correct that they start they have to start fuzzing it in

46:18

your mind and functing a distributed algorithm means start saying if the

46:22

message can be received out of order and whatever and see if this these things

46:27

breaks something okay this is especially useful because i have

46:31

the tradition of putting in the exam an algorithm that is equal to the algorithm

46:36

of your book but a random line that i decide to flip something else and

46:40

usually breaks everything and you have to say oh this breaks everything because

46:44

of this instead the green line with number eight

46:49

can be received out of there out of order with with which one so there is a

46:54

question from they say one of this line because there are two number eight which

46:58

one it can be received that order in the

47:01

sense that you can have something like this

47:04

this acts and these arc they cross

47:09

but it can never be i mean it can never be received

47:15

if i have another line right here i cannot have the cross between these two

47:18

okay so yes

47:20

of course the fifo holds for a single source you can have a message from

47:25

different sources that are interleaved because you know

47:28

it's not in specification of pi okay and so so now let's see the proof

47:35

so the only way to understand a fairly complex algorithm is to look at the roof

47:41

i mean there is no other thing you can start doing execution

47:45

but if you if like me you are you are a

47:48

human being you can just see 100 200 execution then you get tired so the only

47:53

things to really understand complex algorithm is to look at the proof and

47:57

then see in the proof how all the execution

48:00

are accounted for and so let us look at the proof

48:04

the first proof that i want to do is the modular execution so we look at the

48:07

moodle exclusion and then we do a small break

48:10

so assume by contradiction that the two process entering the critical section at

48:14

the same time this is the first thing we have to avoid in the vertical section

48:18

algorithm the module exclusion is which kind of property it is

48:22

modular exclusion it's a question which kind of property

48:26

is movable exclusion it's a safety property so if

48:32

it's violated once you are done forever so it's the first thing to look is that

48:36

your algorithm is safe then you can stop process forever

48:39

you will still get fired but at least you will not arm anyone okay

48:44

so you cannot enter in the regular section if you have not received the act

48:48

from everyone and this is clear because we have one angle we have a line in the

48:52

algorithm and the line in the algorithm

48:56

let's look at the line in the algorithm the line in the algorithm is this part

49:02

right here so you have to receive the act from everyone if you enter in the

49:05

radial section this is the first the first statement

49:08

and it's obviously correct in the book and such as happened after your request

49:15

when you create a new request its timestamp is greater than the typestamp

49:19

of all the old acts this is also obvious if you have old

49:23

hack in your memory then you increase it the logical clock you remember so when

49:27

you create a new request the timestamp of your request will be greater than all

49:32

the old act that you have in your memory because of how the algorithm is done and

49:36

so it means that immediately all the other are killed so you have it in your

49:41

set you can also feed them if you want to be you know to optimize you can free

49:45

the up you can remove them from the set but even if you do not remove them they

49:50

will not be good because they are old so both the process have received yak

49:56

from any other process so we have p i v

50:01

so they both received the act from any other

50:05

and of course if they both enter in the critical section then it means that the

50:11

requests of each one is the smallest one in the queue because you enter only if

50:15

when your request is the smallest one in the queue

50:18

so this is a proof by contradiction so now we have to show the contradiction so

50:23

it means that the process one received the diac from the other process

50:28

because they received the act from everyone

50:32

and notice that when p2 sends the act to p to p1

50:38

it means that p2 asked the request of p1 in its memory

50:42

because you send the app when you see the request

50:46

also p2 received the act from p1 do you agree with me because they all received

50:50

the up and so it means that also p2 inside is memory sorry also p1 inside

50:57

this memory as the request of p2 so it means that when both they have all

51:02

the acts they see the request of each other

51:04

so at this point in the proof it means that you see the request of each other

51:13

so here this this thing is just to see that they

51:16

see the request of each other but if they see the request of each other and

51:19

each one is minimal we have a contradiction why because it's there are

51:23

only two possibilities the timestamp are different

51:27

but if the timestamp are different one is less than the other

51:30

and so it's not possible that they're both mean or the timestamp are evil

51:35

but if the time is temporary equal you compare the ad

51:38

and if you compare the id it's not possible that they are equal because the

51:42

id are unique and are between one and n or zero and n minus one and so it's

51:48

impossible that they both enter so one of the requests has to block the other

51:52

guy that's the only thing

51:55

now there is a question from whom that they are

51:58

asking i will answer the question and we will do the small break

52:01

and the question is but this means that the process know the

52:06

id of each other they have to know each other but this is so because there is

52:10

this line in the initialization so here i'm using capital pi that is the entire

52:16

set of process okay so giovanni we always assume that you know the entire

52:21

set of processing the system and you know the id of everyone else

52:24

because they are the idea the the the the ip addresses that you

52:29

use to send a message to people and you need to know them okay there is a branch

52:33

of distributed computing that computes when you do not know but we

52:37

will never see it okay

52:40

so we always assume that we know everyone but when i say in an exercise

52:45

you know just one or two and then you have two reasons how to solve it

52:49

okay so if there are no question we will do

52:53

a small break you can also ask questions during the break so we do 10 minutes

52:56

break and then we start again at 2

53:01

and we see the other proof we will see the fairness and the

53:05

liveness the

53:07

justification of the lines okay so let's do our break and in ten means

53:13

we will see again each other to start again so if there are questions you're

53:17

free to ask what also from a moment

1:01:16

okay so we can start this is the the token to confirm your

1:01:20

presence i will give you a bit of time to write it you have to go

1:01:24

inside per digit and use the token to say yes i was present

1:01:29

during the the lecture okay so this is the token is eight five two

1:01:36

seven zero four eight five two seven zero four you have to use this token on

1:01:41

the digits to confirm that you were here

1:01:45

okay so i leave the token in the background

1:01:48

while i explain what i meant can we go to the message can we cut the

1:01:53

message by half because it was not really clear

1:01:57

so how many message does the perfect failure detector

1:02:02

excluding the amount generate for every cycle so when we have a cycle

1:02:08

of delta each one

1:02:11

start a broadcast right and how many messages there are if you have n

1:02:16

processes and each and process is sent and peak

1:02:22

and processes each one send ten and a square and a square because i have

1:02:28

n ear and ear and ear and ear and ear and there are n of them so n plus n plus

1:02:36

n if we do it n times it's uh n squared

1:02:42

uh so

1:02:44

it's the square so if it's it's the square okay if you sum and

1:02:48

n times it's n squared and so we have n n square messages that

1:02:54

are generated and then you have also the replies and

1:02:59

how many replies you generate also you generate and square replies

1:03:04

because you have a reply back for every message you send if you send them square

1:03:08

messages there are n squared messages so is n squared plus n squared is 2

1:03:13

times n squared this is the the the complexity of the

1:03:16

algorithm the number of messages we send in each cycle okay

1:03:21

so the question can we could cut the message by alpha it means can we do

1:03:24

something in which the number of messages n

1:03:28

sorry m the number of messages that is 2m squared is equal to m over 2. so cut

1:03:34

by alpha means you know remove alpha of the messages

1:03:39

removable so is there someone that has an idea or

1:03:44

now we can remove half of the message from the exclude on timeout

1:03:49

half of the message means that we have to remove you know alf

1:03:55

so the best way to remove half of the message in this case we use a pattern

1:04:00

that is a request reply and this is the pattern okay to use in

1:04:05

the algorithm the button is request reply

1:04:08

the only way to remove alpha of the messages is to avoid to use this pattern

1:04:13

and yes i can avoid to use this pattern because as one of you observed why i

1:04:19

need the request i mean i am in a system that is

1:04:23

synchronous what i can do is that every minute i tell to the other people i'm

1:04:27

alive after one minute said tell again i'm

1:04:31

alive and after i'm alive if if if i

1:04:35

unfortunately die what happens is that i cannot say i'm

1:04:39

alive anymore so if for five minutes you do not see

1:04:43

that i'm telling i'm alive i'm alive my life then it means that i'm dead right

1:04:47

we can you what we are using here is not the fact that you do not reply to our

1:04:52

requests is the fact that you are silent

1:04:56

so i wait enough time i see that you are silent and they say

1:05:00

oh if this guy is silent something bad happened

1:05:05

and this there is a sentence of nicola santoro in its book that says it's

1:05:10

really i mean it's not an interesting question

1:05:12

but i like it also people say no nicola so in

1:05:15

synchronous network silence are expressive okay

1:05:20

he say that if you have a system that is synchronous then the fact that you do

1:05:24

not hear from someone as a mean

1:05:27

why because if a system is synchronous i don't have to ask you

1:05:32

please reply to this request i can have the time and i can say okay my notion

1:05:38

the time or is more or less your notion of time and if i tell us what at 1 pm

1:05:43

everyone has to tell i'm alive we can have a bit of difference because

1:05:48

remember there is clock synchronization there is a skew of delta so it's

1:05:52

possible that 1 pm for me is not exactly 1 pm for you because there is this delta

1:05:58

but this delta is bounded we have seen in the lecture of clock synchronization

1:06:01

we have seen that we can have an algorithm that synchronize a software

1:06:05

clock with a difference of at most delta that depends on the delay whatever but

1:06:09

they can be synchronized and so it means that in a synchronous

1:06:13

system i can do an algorithm that tells to everyone at 1 pm you have to say i'm

1:06:19

alive and at 1 pm everyone tells i'm alive

1:06:23

then i'd say at 2 p.m you have to tell us i'm alive and everyone will tell i'm

1:06:27

live if by 4 p.m i see that for 4 hours

1:06:32

i did not hear from process three then i can safely say process three is dead why

1:06:38

it me said the check at one pm he me said the check

1:06:42

at 2pm emi said the check at 3 pm he missed the check at 4pm as to be that is

1:06:47

the only way if the system is synchronous

1:06:50

and this is the idea that we're using this algorithm that is called a

1:06:53

round-based p so do not be

1:06:58

intimidated by this death right here this is just something that they need

1:07:02

because the synchronization is not perfect but it's really easy to manage

1:07:07

it's really easy to manage your skill of delta

1:07:11

it's called round based this basis is important why

1:07:16

because we have that in systems that are synchronous

1:07:19

you can have something that is called a ground-based computation

1:07:23

so it's it's equivalent to synchronous

1:07:27

systems it's assumed that the computation can be made around the basis

1:07:31

what it means around the base it means that you divided the algorithm in

1:07:35

logical round and there is a logic around zero then

1:07:39

there is logic around one this is the time logic around the two roger round

1:07:44

three and at the time at the range around zero

1:07:48

this if since the system is synchronous we have that if someone send a message

1:07:51

at the beginning of round zero you receive the message before the end of

1:07:55

round zero because the system is signals so it can take rounds that are long long

1:08:00

enough this round-based computation as you said

1:08:03

in many many many real-world algorithms in synchronous system

1:08:07

because it's easier than managing time i mean i decided that one round has to be

1:08:12

i don't know two minutes and few minutes are enough to receive

1:08:15

message from everyone so i can do inference because they say i start

1:08:18

around zero and they tell at the beginning of the round everyone has to

1:08:21

say i'm alive if at the end of round 1

1:08:25

i do not hear from p3 since i selected the length of the round large enough

1:08:30

that if p3 sent the message i would have received it then i can

1:08:35

infer that p3 is dead and so with round-based computation you

1:08:39

can do this kind of stuff so if you read an algorithm

1:08:43

in your life and you see that is round based

1:08:46

almost always is for a synchronous system okay

1:08:50

so there is an equivalence between synchronous system round base so this

1:08:54

algorithm here is round based and we will see that it can work because the

1:08:58

system is synchronous so how does it work

1:09:02

there is our clock so this is the comment this comment right here tells us

1:09:07

this is the clock the software clock and it's synchronized

1:09:11

without the people and this d

1:09:14

right here is the length of the round is how long is around okay

1:09:20

and here in the comments i specify that for the algorithm to be correct the

1:09:24

round has to be greater than two times maximum delay plus delta

1:09:29

so the skew of the clock enters inside the round why because if we are we have

1:09:34

a q on the clock for one second then i have to take you know into account that

1:09:38

you know 1 pm for me 1 pm for you could be 9 1 p.m and 1 7

1:09:44

because we are the synchronized so it means that us to play a role in the

1:09:48

length of the round the delay of the channel also play a

1:09:51

role in the length of the round why because i want a round that is large

1:09:55

enough so that if you send something at the beginning i receive it before it

1:09:59

ends and the only reason why i do not receive it is that you were dead you did

1:10:03

not send it okay this is why we we need this quantity

1:10:08

then there is the set of all correct process that is at the beginning is the

1:10:12

entire set the set of correct process and then i have a second set round alive

1:10:17

that i beginning able to correct that is all the processing the system

1:10:22

then i start with the fixture this is the round number these are the beginning

1:10:26

i start with minus one on every one it's a fictional round then there will be

1:10:30

rounded zero round one round three is just a very

1:10:34

here i have something that is really fancy but what i'm telling here is look

1:10:39

when the clock is a multiple of the time t let's just

1:10:45

say that the time is five seconds i am saying when the clock is zero when the

1:10:49

clock is five when the clock is 10 when the clock is

1:10:53

15 when the clock is 20 and so on so here

1:10:57

i'm just saying when the clock is a multiple of the time

1:11:00

so i say is equal to the time multiplied to a natural number this is something i

1:11:05

hope you have seen this is a fancy way to say clock zero five block ten fifteen

1:11:10

twenty and so on it's a multiple okay it means that every five second if t is

1:11:16

equal to five i execute this handler right here

1:11:21

so what i do in the handler i increase the round number

1:11:25

then for all the process that are correct

1:11:28

sorry this will we'll see i increased the

1:11:31

round number i put only myself in the round alive set and then i send the bit

1:11:37

to everyone so what i'm doing right here when i start i send a beat and i say to

1:11:42

everyone i'm alive at this point i do not only

1:11:47

send the beat i also reset the round alive set and they will put just myself

1:11:53

why i'm doing this because here i will check around the

1:11:58

live and i will see who is alive okay how do i check it well the other process

1:12:02

does the same thing so it will send me a bit

1:12:06

when i receive a bit right here i put the id of the other processing round

1:12:10

alive and so right here

1:12:14

so it means that when i trigger again i trigger this thing and they see oh all

1:12:19

the correct that are not around the line that will be empty

1:12:23

why because all the correct process in a system of two processes p0p1

1:12:29

the one around the live are p0p1 and this and this part of the code will

1:12:35

not be you know triggered when is that this part is triggered if

1:12:40

someone dies why

1:12:42

because let's say that we have this example and this guy dies

1:12:46

okay what happened is that at this point i have corrected with 0p1 at this point

1:12:51

i would just speed 0 around alive i send my beat but the bit of this guy

1:12:56

does not count why the bit of this guy does not come

1:13:00

because at this round he was this was dead

1:13:03

so if it is that we cannot send the message so when i arrive at this point i

1:13:08

run this line of the algorithm and i find p0p1 incorrect

1:13:14

0p1 incorrect minus round alive around the line is bit

1:13:18

zero and it remains p1 that is crash y is crashed because it's not in round

1:13:24

alive because he didn't send the ping so i'm

1:13:27

not triggering this handler with sender p1

1:13:31

so it means that is dead so i remove p1 from the correct

1:13:37

why i remove p1 from the correct because it's dead

1:13:40

and then i trigger crash p1 and i say oh p1 crash

1:13:44

so this is the pattern of the algorithm this algorithm is a formalization of the

1:13:48

idea that

1:13:51

every at

1:13:53

interval of times everyone says i'm alive okay what is the only difficulty

1:13:59

of this algorithm what is the only difficulty is to

1:14:03

pick sorry you know it's not the delta stick

1:14:06

is to pick the right time t

1:14:11

this is the complexity of the algorithm why

1:14:14

because if i pick a time that is too small what happens is that i create a

1:14:18

new round in this point it means that you answer

1:14:23

and i receive the answer at the next round but if i receive the answer at the

1:14:27

next round i'm violating the concept of round

1:14:30

because i say a round has to be large enough so that if you send something at

1:14:34

the beginning of round zero and the beginning of round zero can be

1:14:38

slightly desynchronized by the accuracy of the clock

1:14:43

so if you send something at the beginning of round zero i have to

1:14:46

receive it before round zero end if i take a t

1:14:51

that is too small then this does not hold so i have to take a t that is long

1:14:56

enough and this long enough is okay

1:15:00

this long enough is okay of course you can imagine that in the

1:15:04

long enough we need

1:15:06

the synchronization the synchronization accuracy that plays

1:15:10

a role why because if we are desynchronized at

1:15:14

one hour so 1 p.m for me is 2 p.m for you i have to take an

1:15:19

account this because when i i start at 1 pm you can start round at 2 p.m round

1:15:24

zero so it means that the length of the round has to be at least delta so that

1:15:29

you also start the round right 1pm i start i know that you are one hour late

1:15:34

so i stay for one hour in the round then you

1:15:37

enter in the round of course if i enter in around the 1 pm

1:15:41

and we can be desynchronized by an hour by 2 p.m at

1:15:46

most you also enter in the round because it's one hour of difference

1:15:50

right so by 1 pm by 2 pm sorry you execute this angle right here

1:15:56

and this is the first part of t but then i also need a bit of other part

1:16:02

what other part i need that if you send a message i need the time to receive it

1:16:05

right and this is this max delay right here

1:16:09

so now you can ask well why you put two there

1:16:13

okay this is this is a nice question i put two there because i'm always afraid

1:16:19

of make algorithms that are not correct and so what i do when i have a bound i

1:16:24

do it larger than what is strictly necessary i say okay

1:16:28

it's better to have two to twice the time and having an algorithm that works

1:16:33

that having a perfect you know round length and then the algorithm that

1:16:38

failed to work if something happened or if i did a mistake in the computation

1:16:43

so for this reason i put those

1:16:53

so there is a a question from flavio that says

1:16:58

why at the beginning you put round alive equal to correct

1:17:04

i mean uh because if i don't put round alive equal

1:17:08

to correct when it triggers at the beginning it will flag everyone as

1:17:11

questions for the way i

1:17:14

wrote the album so let's put let's put around the live

1:17:18

empty if i do this then correct minus around the live is equal to correct and

1:17:23

here i wrongly flag everyone right at the beginning

1:17:27

because i i wrote the algorithmic way so i cannot put around the live difference

1:17:31

that correct because there is the first round

1:17:34

this is for the initialization the the kick start has to be done in this way

1:17:38

okay sorry i miss and then there is another

1:17:41

question that i say i missed why you start with minus one

1:17:44

i start with minus one so that the first round the first three around is zero for

1:17:49

everyone why because you start and you do minus one plus one is equal to zero

1:17:54

this is just because i like to start from zero okay but i mean you can put

1:17:59

one is the same it means that the first round in the system is round two

1:18:03

but it's not a problem okay so

1:18:07

do you agree because i wanted that once one everyone send the message error is

1:18:12

equal to zero because i i like it in that way

1:18:16

but does not change anything for the correctness of the algorithm okay any

1:18:20

numbers will do but zero you know is the start

1:18:24

at least for for

1:18:27

for uh the western pound okay so

1:18:32

what is the proof of the the algorithm the algorithm is

1:18:35

really easy to prove if you show this property

1:18:39

and this property is the property of the round that i was telling you and the

1:18:43

property say if i send a bit to a process p when my

1:18:48

round number shows r then the bit reaches p when its round

1:18:53

number shows r so it means that the round are synchronized

1:18:57

so if i prove the property that the rounds are synchronized

1:19:00

then proving the correctness of the algorithm is easy

1:19:04

so this is called a lemma so i don't know if you know the

1:19:10

difference between lamb and theorem the lamb

1:19:13

is a small thing that we prove and that we need to prove a theorem okay

1:19:18

i mean you can have theorem that are really

1:19:21

short and the lemon that are really long do not make something that is a lame

1:19:25

material or the other way around a lemma is something that you use to prove a

1:19:30

theorem okay so for this reason it's called level and this is a lemma because

1:19:33

we will use this property to prove then the correctness of the perfect failure

1:19:39

detector so by the algorithm i send my bit as

1:19:44

soon as my round is r do you agree with me because in the

1:19:48

algorithm you send the bit at this line right here

1:19:52

local computation takes zero time in the course we are saying local computation

1:19:56

instantaneous when you are scheduler the android is executed immediately so when

1:20:01

the round is zero immediate for me the time process one i immediately send the

1:20:06

bit and now this is the the first

1:20:11

part of the the length the second part of dilemma say by the bounded skew of

1:20:16

clock synchronization if time t is the first time at which my round number is r

1:20:23

is zero let's say that disconnected

1:20:29

so if time t is the first time at which my round number is zero then for any

1:20:34

other process p it will have around the number of zero

1:20:39

at a time that is at least at least t minus delta at most t plus delta

1:20:45

this is also easy let's do it with the number we are the synchronized of five

1:20:49

seconds because the accuracy of the clock

1:20:52

synchronization in five seconds my round is zero at one pm

1:20:56

my 1 pm my local clock it's possible that for a process 2 the

1:21:01

round is 0 at 1 pm minus 5 seconds why because it's faster

1:21:06

than me or it's possible that the round becomes 0 in the other process at 1 pm

1:21:13

plus five seconds because this is lower than me but it's not possible more

1:21:18

because we are synchronized there is the clock synchronization

1:21:22

by the round length so what is the the the process stays the other process p2

1:21:28

stays in round zero at least until t minus delta plus t

1:21:33

so t minus delta is the worst case is the case in which you started the round

1:21:37

really early it starts at 1 pm minus 5 7. this is the worst case but then it

1:21:43

stays for a period that is t t for the algorithm is q time maximum

1:21:49

delta plus delta so we substitute q time plus delta max

1:21:53

delta and it is t plus delta plus maximum delay

1:21:58

do you agree with me so it means that process 2

1:22:01

will stay in the round from 1 pm minus 5 seconds

1:22:08

until 1 pm

1:22:11

minus 5 second plus t and t is exactly this quantity so this

1:22:17

quantity right here when we do the computation it means that this stay up

1:22:22

to this time this is my local time by the delay of the link my bit reaches

1:22:29

p in the interval t plus delta and t maximum delay

1:22:33

so it means that it will reach the process p 2 before the end of the

1:22:39

round why because i took a t that is long

1:22:43

enough to account for the synchronization

1:22:46

if it starts the round early and for the delay of the message maximum delay okay

1:23:03

okay so what we have seen we have this lemma

1:23:06

now if i send a bit to p when my rounded number shows zero

1:23:12

then the beat will just be within round number shows zero and i can do with one

1:23:16

with two is for every round number this proof

1:23:20

so the stronger completeness if p dies

1:23:24

i will not receive the beat and i will signal it and this is trivial

1:23:28

completeness if someone dies does not send a beat

1:23:31

and eventually i i start a new round i wait the bit for that new round i cannot

1:23:37

receive ping from the old round why because of this lamp

1:23:41

i cannot receive a ping from an old ground because i had to receive it

1:23:44

before so if i start round one and he died in round zero i cannot

1:23:49

receive the old ping because of this the strong accuracy if at round one i

1:23:55

start round one and i do not receive the bit from p

1:23:59

this i do not have to make mistake then the only possible reason is that p

1:24:04

did not send it why because we have this lamb

1:24:07

so if at the beginning of round one p was alive and sent a message then i have

1:24:13

to receive it before the end of round one is the only possibility by this

1:24:17

lemma so if i end round one and i do not receive the ping from process p

1:24:22

then the only possibility is that p is dead because of the length

1:24:27

so as you can see this lemma is enough to prove the problem so once we have

1:24:31

dilemma the properties become trivial so this is lemma one

1:24:35

this is theorem one and this is theorem two because they prove two different

1:24:39

properties okay now one thing that you can try to

1:24:43

do is that i told you that a t greater than two times delta plus

1:24:49

maximum delay was more than enough

1:24:52

i mean i put it two here but is more than enough you can do better you can

1:24:57

have a round number that is a bit better and so an exercise that you can do is to

1:25:03

try to find the mind minimum t for which this algorithm work

1:25:09

so you can degrees a bit you can have something a bit better than this okay so

1:25:13

try to reason and see what is the minimum the minimum means i try to

1:25:18

decrease this quantity and i have to see if i long enough to receive the messages

1:25:24

before the end of the round okay it should be

1:25:28

okay well i will not tell you the solution but he is not different okay

1:25:33

it should be maximum delay plus delta plus epsilon just an x

1:25:39

okay so as i told you before this round-based failure detector is

1:25:45

important because you show you the concept of brown

1:25:49

so the concept of round is an alternative way to see a synchronous

1:25:52

system in this alternative way we imagine that

1:25:56

the rounds start exactly at the same moment on all the process so exactly at

1:26:01

the same moment at round zero

1:26:03

every one starts around with zero and exactly at the same moment everyone send

1:26:08

a message this we can do because even if we have a

1:26:12

small delta of five seconds i've shown you that it's not a problem even if

1:26:16

there is five seconds of delay i can take a round long enough so that if we

1:26:20

are the synchronized that is fine still i will receive by the end so logically i

1:26:25

can imagine that exactly at the same time t everyone started the round even

1:26:30

if it is not true in real life because i can

1:26:33

i can create something that make this happen in logical in a logical algorithm

1:26:40

so in the round-based system the synchrony

1:26:44

assumption is abstracted assuming that processes start around exactly at the

1:26:49

same time so exactly at the same time everyone goes in round zero exactly the

1:26:54

same time everyone goes in round one exactly the same time every game every

1:26:58

time everyone's goes in round two and so on

1:27:02

when you start a round you do the computation instantaneously everyone

1:27:06

does the computation everyone generate a message for the round send the message

1:27:11

to a set of process and if you are correct

1:27:15

if you are correct then in a round-based system we have that if you send a

1:27:19

message at the beginning of round zero every one

1:27:23

of the target set the one you want to reach

1:27:26

will receive the message before the end of round zero and this is

1:27:31

an alternative way to see synchronous system so you can

1:27:36

imagine that you have this structure and you can build an algorithm with this

1:27:41

structure in a synchronous system so we can imagine that

1:27:44

everyone starts at round zero send the message do computation round one

1:27:49

everyone send the message do computation round two and so on

1:27:53

this if reflect about it is really powerful i mean you can use this

1:27:56

structure to solve a lot of problems this structural grounds

1:28:02

okay so there is an article that you can read is an optional reading you can

1:28:07

you can find it on the website that is linked in the the the course diary and

1:28:13

say this the worst log sorry and say the splendor is a misery of ground is of

1:28:17

adam shemian was 2019. so it was quite recently is a

1:28:22

divulgative article that explains what are around and whatever so you can read

1:28:26

it but you just have to remember that in a

1:28:29

synchronous system you can assume that you have this structure of ground so

1:28:33

around zero everyone start create the message send the message is received

1:28:38

before round one round one exa happens exactly at the same time on everyone

1:28:43

receive the message they compute and they do

1:28:46

their things okay

1:28:49

and now let's say that i have a round based

1:28:53

failure detector p so my favorite detector

1:28:57

the one that i showed you is possible that i have this execution

1:29:02

so i have that the process this process here dies

1:29:06

when round two starts at the end of round two the beginning of

1:29:11

round three with zero detected but you detect it and the other three process

1:29:16

this one do not detect him and then around four everyone detected

1:29:20

now i'm not talking about the specification but the implementation

1:29:25

so it's possible that in the implementation of the round-based i have

1:29:29

this kind of detection okay now why not

1:29:44

because but when you add it when you receive the message

1:29:48

i mean when not okay

1:29:54

so and when this process sends the message

1:29:57

right here at the beginning okay they send the message they send the the beat

1:30:01

this process so you say if this is sending the

1:30:04

message since it is around the base this message has to be received also by this

1:30:09

guy and this guy right this is true

1:30:15

only if this dies before the start of the round

1:30:19

if this process dies when the round star is starting is not

1:30:23

true it's possible that this guy does not receive the message

1:30:28

this guy does not receive the message and this they receive the beat

1:30:32

why how do you send the b to other people in

1:30:35

the algorithm we send the bit at this point sorry at

1:30:44

this point in the algorithm okay this is the the the the point in which

1:30:50

we send the bit we agree with me is the point in the algorithm which we send the

1:30:54

b which kind of things i'm using to send

1:30:58

to the beta for right what happens if you happen if you die in

1:31:03

the middle of the floor that is possible

1:31:08

it happens that someone uh received the message and someone does not receive it

1:31:12

right so even if he's around based you can

1:31:15

think okay it's round-based and everyone will receive the message if you look at

1:31:19

the property i say if i call it so i say if a correct start a round and

1:31:26

then all the correct will receive it but if a process that crashes start around

1:31:32

and dies in the middle of the round is possible that dies when is executing

1:31:37

these four okay if he dies when he's executing the

1:31:41

floor we have something like this you are you're excited before you die but

1:31:45

there are some messages that were fast enough to leave you

1:31:49

at your destiny before you die so you are able to send some message

1:31:54

and this is possible okay and so it's when you are a process that

1:31:59

is not correct and you have a four in your algorithm

1:32:03

you always have to imagine that it's possible that that four is partially

1:32:06

executed and is possible that is partially

1:32:09

executed and is the worst case i mean the best

1:32:12

case is if you execute the entire four or not

1:32:16

that would make things really easy unfortunately it's not the case okay so

1:32:21

even in a round-based failure detector we can have that this guy received the

1:32:25

message so he does not detect because he find it in a live round

1:32:29

this find it in a live round this find it alive round this does not find it why

1:32:34

because he died ex figured in the four this does not find it because he died

1:32:39

this guy executing the force so does not send the message

1:32:45

but what happened at this round four right here

1:32:50

is it possible that we have the same situation also at round four no

1:32:55

why because this died before the round starts so if this dies before the round

1:33:00

start at this point cannot send anything cannot execute the four right because

1:33:04

it's dead and so here is impossible that someone received the message why because

1:33:09

it's impossible to have something like this in a round basis

1:33:13

it's not possible in a synchronous system why because you take the time

1:33:17

long enough to receive the message so if you have something like this that the

1:33:21

ping is late then you are violating its incoming assumption of the system okay

1:33:25

so it's not possible and now i will do a bit of introduction

1:33:31

to the next lecture so

1:33:35

in all the our failure detector algorithm we have a time delta

1:33:39

delta next root of time out in the one of the rounds we have the period of the

1:33:44

t and so they influence the algorithm not

1:33:48

in the correctness part but in the performance part

1:33:53

why they influence the performance part because the delay

1:33:57

that you need before detecting a crash is function of delta or function of the

1:34:02

round time t so even if in the correctness of the algorithm we were not

1:34:07

discussing this delta this delta plays a role

1:34:10

in the latency of the failure detector so the time you need to detect that

1:34:14

someone failed so you can be tempted and you say yo let

1:34:20

us make this time the smallest possible because you know you try to optimize and

1:34:24

you say oh i make the time smallest possible

1:34:27

and the smallest possible time allow me to detect if someone dies really fast

1:34:33

the problem of trying to decrease delta to pushing delta too much

1:34:37

is that you can be you can create problem why because if i put up this

1:34:41

delta too much and then i have a message that is you know a bit more than the

1:34:45

round trip time is round trip time plus episode

1:34:49

what would happen is this algorithm is that you see and you say oh p1 it

1:34:53

crashed but p1 was just late of x2

1:34:57

but you detected it crashed why because you remember how is the excluded tamit

1:35:02

cycle we started the cycle and the cycle is exactly round trip time i send the

1:35:07

message the message reaches p1 p1 for some reason is an epsilon late that is

1:35:13

you know really an epsilon and you receive it here

1:35:17

and at this point you flag p1 and you say your p0 and you flag a p1 and you

1:35:21

say p1 crash so if you want to be too too fast

1:35:27

then you can create problem because it it

1:35:31

it is enough that the system goes an epsilon

1:35:34

over the bound and does not work anymore but what happens after you can see it is

1:35:41

that you can understand that p1 is alive and you made a mistake right

1:35:45

why you understand that you make a mistake because you start to recycle and

1:35:49

you see that p1 answer to the pin right but it was too late

1:35:53

for the perfect failure detector we violated safe okay

1:35:57

but you can see that maybe you can have a failure detector in which you can try

1:36:01

to have a safety property or a property that is not safety and is

1:36:05

more you know more general and can have some mistake

1:36:10

in which you can say okay p1 pressured and then you understand that you say

1:36:14

okay not p1 you do not really crash and this is also useful if you have

1:36:19

event or asynchronous system in which this kind of situation cannot come

1:36:23

and so in the next lecture we will see the

1:36:27

eventually perfect failure detector that is called diamond peak

1:36:32

where diamond in logic means eventually so diamond pivot

1:36:37

because it's eventually perfect we will see it in the next lecture is a failure

1:36:41

detector that can make mistake and is based on the fact that we do not

1:36:46

know delta so we have to guess the delta and guessing the delta will create

1:36:51

possibility of a finite number of mistakes we will see in the next lecture

1:36:57

so see you on wednesday and we have still 10 means i've been a

1:37:02

bit fast okay we have 10 minutes so if there are any questions

1:37:08

any question on the lecture even from all

1:37:10

any question yes

1:37:22

you want to see this algorithm implemented in some programming language

1:37:30

okay the only simulator i know about but

1:37:37

because i'm not uh i mean i'm not a system guy in the sense

1:37:42

that i do algorithm in real life i do not do system i mean i also do system

1:37:46

but other kind of system the only algorithm i know of of distributed

1:37:49

computing computation was done by arnold castell and is in java

1:37:55

so you have to write code in java if you want to use that algorithm may call it

1:37:59

i don't remember the name jpsim something like that i have to find i

1:38:03

will put on the website so there is a simulator

1:38:06

for distributed system that is done in java and if you use that simulator then

1:38:09

you have to write your coding java okay i think that if you want to implement a

1:38:15

simulator of a distributed system in python

1:38:19

it will be i don't know one week of work at most because you just have to

1:38:23

simulate the channel so you create a scheduler you simulate the chart and

1:38:27

then you can write in python okay so there are questions for mom

1:38:32

there is a question of david that is really interesting and say but the send

1:38:36

of message is not an atomic operation so the handler are executed atomically

1:38:44

it means that on a process you take the lock

1:38:48

you execute the ender and then you receive the lock right

1:38:52

but there is no real life system that ensure you that

1:38:56

the process does not die in the middle so let's say also that the send of a

1:39:01

single message is atomic and they can agree with you that the sender with the

1:39:05

single message is atomic because either the message reaches ethernet or does not

1:39:10

reach it and if it is it in the middle the error correcting code will detect it

1:39:14

and it will kill the message but here you have a form you are sending several

1:39:19

message okay and so it's not possible that you have some some hardware that

1:39:24

keeps you alive for the time these four need and then you say then you can crash

1:39:29

okay okay so there is a question from from

1:39:38

whom they say oh so this is similar to what we we think when we do byzantine

1:39:42

algorithm because it seems that you always consider the worst case even with

1:39:46

crash failure and asynchrony we always have to consider the worst case okay

1:39:50

it's the only way to have a correct algorithm so you have to assume that

1:39:53

there is an evil entity the scheduler that decides that the pressure whatever

1:39:57

in the worst possible case and also possible cases to let people fail in the

1:40:02

middle of four or something like that but in byzantine it's different it's

1:40:05

much more complex because at least here what can happen is that either a process

1:40:10

sends all the messages or part of the message it's not possible that the

1:40:14

process send messages that are temporary okay

1:40:17

and that is another kind of failure and is really

1:40:21

really much much more difficult there it was a question they will detect

1:40:27

at the same time same round sorry this i do not understand i think

1:40:31

this this question i answered before and i didn't read it on time so they

1:40:36

are not ensured to detect at the same round they can detect one hour one round

1:40:40

late since they can fail in the middle of the floor

1:40:45

okay other questions okay if there are no other question in

1:40:53

the next lecture we will see the event or field detector that works in an event

1:40:57

or eventually perfect that was works in an eventually synchronous

1:41:01

system and then we terminated the time module

1:41:04

so we will see the inventory perfect failure detector we will see the leader

1:41:07

election module that are the dual of a failure detector

1:41:11

and then that's it for time

1:41:14

so see you at the next lecture that is on

1:41:18

wednesday so if there are any questions you can you can ask on the chat i will

1:41:22

wait for the five minutes until five until 3 p.m

1:41:27

so if there are questions from home or here

1:41:33

see you everyone okay yes i can repeat the t

1:41:41

so i have to take a t that is long enough

1:41:45

so that i can account for the fact that they start the round at a slightly

1:41:49

different time and they can also receive a message okay

1:41:53

so for this reason i have to when i take t i have to need the maximum delay here

1:41:59

because someone can start the round a bit

1:42:02

late but that is fine if you start around

1:42:05

late because what happened is that you can

1:42:08

sorry yes that is fine if you start no okay so

1:42:12

we can start around a bit early so we can start around right here

1:42:17

minus delta and this is the worst case if i start a

1:42:21

minus delta because if we start a minus is the best case if it's start to mass

1:42:25

delta y is the best case because the delay of the message

1:42:29

will make the message from the process reach you in the middle of the round and

1:42:33

this is fine the worst case is when it starts late

1:42:37

why start waiting because you will receive the message

1:42:41

with a delay that is the delay of the channel

1:42:44

delay channel

1:42:47

plus delta

1:42:49

that is the delay at which it started around

1:42:52

okay so you have to to

1:42:56

the the the answer to have the minimum t should be max delay should be the

1:43:00

minimum plus delta plus an epsilon where this epsilon is a a number that is

1:43:05

really low that we do not compute and just means you need something more to

1:43:10

not be really strict okay

1:43:14

so giovanni you can go if you if you wish

1:43:27

no max delay cannot change it's a constant of the system okay it's the

1:43:30

bound on the synchronous channel so if the synchronous channel has a

1:43:34

delay of five minutes of the channel you cannot have five more something okay

1:43:39

because this is of the system okay you're welcome yes

1:43:53

so if there are no other question i terminated right here so see you on

1:43:57

wednesday okay if you have questions you can even brighten it bye see you

1:44:10

you
#### Lezione 7
  
Gemini

3:09/2:44:26

0:06

so thank you

1:16

uh yes

3:10

okay yes

3:52

so yes

4:33

uh okay

4:59

um me

6:35

okay so we can start the lecture for today

6:39

this is the token to confirm your presence with prodigy please write it

6:44

down so that you can confirm your presence is eight nine

6:48

zero nine nine six okay so what we will see today uh in the

6:53

last lecture we have seen the failure detector

6:56

and the leader election and those are two modules that

7:01

are able to to solve important function in our distributed

7:05

system that are namely the first one is able to

7:09

to understand if something crashes the perfect one

7:14

that never makes mistake and eventually perfect that eventually becomes a

7:19

perfect failure detector and the leader elector that is able to

7:23

elect a single leader the also in this case the normal leader election

7:28

it ensures that you can never trust two different correct leader at the same

7:32

time in the system there are no two processes that trust two different

7:36

correct and the event or leader election

7:39

is the same thing but with a stabilization property so eventually

7:43

everyone will trust the same correct process but in the meanwhile there could

7:48

be problems and so what we will see today

7:52

are some application of the failure detector in leader election so we will

7:56

see how this module the failure detector and the leader

7:59

electro are really used in algorithm to solve problem

8:04

and essentially you use the failure detector to make an algorithm

8:09

fault tolerant because it allows you to detect failure

8:13

and you usually use a leader electrical model to make an algorithm simple

8:18

because it allows you to elect a leader and electing a leader makes things

8:22

really simple and so today we will see first

8:26

how to use just the failure detector to make a fairly complex algorithm for

8:32

tolerance with with few lines and then we will see how the failure the

8:36

leader election and philip detector together can create a trivial algorithm

8:41

not really trivial but conceptually trivial algorithm for mutual exclusion

8:47

and so today we will see how to enrich

8:52

our the lamport algorithm for modular exclusion to make it fault tolerant

8:57

using the perfect failure detector so we assume that we have the our lamppot

9:02

algorithm that we've seen in the lecture on logical time

9:06

so the lampard great for moodle exclusion for the people that do not

9:10

remember it it's fairly simple to describe but fairly

9:14

complex to understand when you have to enter in the module exclusion you send

9:20

a request to everyone and then you wait for the axe and then you use the logical

9:25

timestamp on the axe to understand if you have to enter and not on the

9:29

request and we will see how to make this

9:33

algorithm that is fairly complex fault tolerant so how it's possible to make

9:38

the algorithm tolerate crash failure if we remember when i described the

9:44

lamport module exclusion i was really careful

9:47

and i told you look the model that we are seeing for this algorithm do not

9:52

assume failure so we assume that everyone is correct

9:56

and so the first thing to do if we assume you know that people can fail is

10:01

to change a bit the definition of the modular exclusion why because the

10:06

classical module exclusion that we have seen the three properties

10:09

were created in a system that was fault free

10:14

without failure and so if we add the failure what does

10:20

not change of course are the events of the mobile exclusion algorithm so we

10:24

always have the request event that you trigger to ask to enter the module

10:29

explosion we have the grant event that the moodle

10:32

execution algorithm gives you and tells you you are free to enter in the moodle

10:37

screw in the radial section and we have the release that you trigger you know

10:41

when you release and now let's see how the properties of

10:45

the module exclusion algorithm changes when we consider failure

10:51

so the first probability the change and is the one that radically changed the

10:55

other two is just makeup we will see we have to add correct but is not really

11:00

important the first one radically changed because

11:03

we say that at any time t at most one an uncrashed process is

11:09

inside the critical section and so if we remember the definition of

11:14

module exclusion when there were no crash

11:17

was at any time t at most a single process is inside the critical section

11:23

and so why we change the definition in this way well because what can happen

11:27

let's say that we are process one and make it in blue

11:31

and we ask to enter in the video section and we enter in the critical section at

11:35

one pm at one pm we enter in theoretical

11:40

section we start doing our operation in the critical section

11:44

and then since life is hard we die at 2pm

11:48

so what happened at this point is that still there is a process in the critical

11:52

section there is process p1 even if it's dead

11:55

but of course do you agree with me that if he's dead at this time is not

11:59

executing any more critical operations so for example he was

12:03

writing on a memory or using a printer and from this moment on is not doing it

12:09

anymore because it's that and so to allow other process to enter

12:13

we change the definition in this way and we say that okay now pity you can enter

12:17

in the critical section because it's true that at this moment in

12:21

time there are conceptually through process to process in the middle section

12:25

because p1 never release i mean he dies before releasing he cannot release the

12:29

visual section so it's true that there are two process

12:33

but only one is alive the other is dead and now if this process crashes also

12:39

we can allow p3 to enter in the critical section and at this point conceptually

12:43

there are three processes in the critical section but just one is alive

12:48

so you can share the critical section with the other process as long as the

12:52

other are dead and this is something you know

12:55

fairly fairly easy to understand and then also the liveness property

13:02

changes the livest property was if a process requests access to the critical

13:07

section then it eventually enters in the critical section

13:11

how do we change the property when there are failures we write

13:14

if a correct process p requests access to the critical section

13:20

then it eventually enters the critical section so we specify

13:24

that the process has to be correct why because let's say the time of 40

13:29

process p1 i request to enter in the critical

13:32

section now and then i die immediately then of

13:36

course i cannot enter in the legal section why because my request for

13:40

example has not left my ethernet card so i trigger the request

13:46

of the mutual exclusion at this point the requested travel in my system has to

13:50

reach the ethernet card to you know go to the other people and i die at this

13:54

point i cannot enter individual section because i'm dead and so for this reason

13:59

we have to specify if according okay if i remove correct ear in a crash and i am

14:05

in a system with crash i cannot implement an algorithm

14:09

that satisfy this property because it has to be satisfied for 40 process but

14:14

this is impossible because a 40 can die you know immediately after the request

14:19

and so it's not possible to satisfy the same reason is because we are

14:24

entered we have to for the same reason we have to put correct ear so i have to

14:30

say if a correct process p request access before a process q then q cannot

14:35

access the critical section before p and also in this case i have to add correct

14:40

for the same piece and so the important change was just

14:45

here in this property this change here is just make up you know to make just

14:49

the property correct but this they are not changes

14:54

and so the properties are clear for everyone do we have doubts on the module

14:59

explosion no okay and so let us now

15:03

what we want to do is to make the lan port algorithm for tolerance so the

15:08

first thing that we have to do when we want to modify an algorithm is

15:12

to look at the original algorithm and this is the code of the original

15:15

algorithm that i put here for convenience so that you don't have to go

15:19

back in this line and so what are the points

15:26

of the original algorithm that are dangerous when there are fails

15:31

so the first thing that we have to to think about when we want to modify an

15:36

algorithm to make it for tolerance is to think what are the the parts of this

15:43

algorithm that are dangerous where when i can be locked forever if there are

15:47

failures and there are

15:50

two main points that can lock people forever if there are failures

15:56

can you see them so what is the first thing that we assume when i send a

16:01

request in a system without failure what i'm

16:06

assuming in the lan port module exclusion algorithm when i send a

16:09

request if there are no failure what is the assumption

16:14

when i send a request i wait for no when i send the request before

16:20

entering the video section i wait for all the acts

16:26

right because i send the request and i wait for all the ads if i send a request

16:30

to process 1 process 2 and process 3

16:35

and process three dies how long i will wait for the arc of

16:39

process three forever forever right forever and so

16:44

this is the first dangerous point that is this one

16:49

so in our fault tolerant algorithm we have to patch

16:53

this point right here why because in this point i wait for a knock

16:58

for the process so this is the first thing that we have to patch

17:02

there is a second dangerous point so once once you enter in the critical

17:07

section what was the assumption that we were

17:11

doing in the lan port module exclusionary so you enter in the

17:14

critical section then you know you are

17:18

and what you do after you have done you send the release and if you die

17:24

inside the critical section you will not send the release anymore right

17:28

if you cannot send the release anymore then it means that your release will be

17:33

in the request set of all the other process forever right

17:38

because you put the the request inside the request to set and then the request

17:43

of someone that has a time stamp less than your request block is you forever

17:47

okay and where is so what is the dangerous

17:51

point the dangerous point is this other one right here

17:56

exists our request that is less than you so if the guy that sent the request that

18:01

has a timestamp less than you dies in the critical section that

18:06

request will be there forever because who dies cannot execute

18:11

this two line rate here that are the line in which the release is sent in the

18:16

system is it clear for for everyone what are

18:20

the dangerous points okay and so now we have to patch them so

18:24

those are the dangerous points and we can

18:29

summarize this point with two sentence if you crash you cannot release

18:35

if you crash you cannot act so this is the first thing

18:39

so let's us first fix the fact that you cannot act

18:45

so the fact that you cannot act means that someone here if he waits for the

18:49

arc of all the correct wait forever okay how we can patch this so we assume that

18:55

we have the perfect failure detector how we patch this

19:01

weight okay yeah i'm touching the axe okay the fact

19:15

that i extended the up to everyone and then i waited i wait forever for for the

19:19

acts of the dead people okay how i can patch this

19:23

i wait forever maybe we can say that

19:28

if one crash wanna descend the fact that he crashed

19:33

and if i have

19:37

not received the arc from this crashed the process i can remove

19:43

that okay

19:45

so uh i didn't get entirely the the things

19:50

so you said you you see if someone is crashed and then what you do

19:58

okay and then if someone cross if someone crash

20:01

and we do the perfect failure detector we

20:05

detect it if the processor which detect it

20:11

has not there have not yak and he requested

20:16

yes he can remove

20:19

or maybe you can um not to wait anymore yeah

20:24

yes so the idea of your colleagues is fine

20:28

you say okay i send the app to all the pro i send my request to all the

20:32

browsers so i send the request to process one two and three

20:35

and then i see that the three is dead because the failure detector tells me

20:40

three is dead there is no point in waiting for the

20:43

hack of three right i mean i know that three is dead do i ever i have to wait

20:47

for it so the sensible thing to do where sensible in english means the good thing

20:52

is to wait for only for the act of the correct

20:55

process right so i have the perfect failure detector if someone dies

20:59

perfectly the director tells me that guy is dead

21:02

and so what i did if i know that three is dead i say okay i will not wait

21:06

anymore for the output process 3. so how do we implement this with a

21:12

perfect failure detector where we have our perfect failure detector p that send

21:17

us crash events so say crash process one crash process forever so we take this

21:22

event and we put them in a crashed set something like this that is the set of

21:26

dead people and then in the patch right here i do

21:30

not wait for the entire set of correct pro for the entire set of process b but

21:36

i only wait for the arc of the one that are correct

21:39

that is p set minus pressure

21:43

and so this is the first patch in this weight in this way sorry i will not wait

21:49

forever for the hack of the day and this we fixed the second point

21:54

now the first point so the first point is that someone

21:59

is inside of the critical section and dies and so he cannot release

22:05

and in this way it it locks the other people forever why

22:09

because everyone will see it the request of the the guy inside the

22:14

request set okay

22:17

so what is the problem let's let's make it clear we have process one

22:21

process zero that send a request with id zero time person zero these two requests

22:28

reach all the other process so process one

22:31

will have a request set that contains zero zero

22:36

zero zero and this request said that this zero

22:40

zero in the request set blocks process one forever so process one cannot enter

22:44

in the critical section in the lan port algorithm process zero

22:48

eventually release and say when sends the release message it reaches this

22:52

process and remove the requests but if this process dies you cannot send the

22:56

release right so it means that this request blocks process one forever

23:02

okay so from home they answered how you can patch this

23:06

from here so how do we fix this problem so if p0 is dead

23:13

what happens on p1 for the perfect failure detector

23:19

it's a received crash and so you see that you have a request from p0 and you

23:23

see that big zero is dead what you can do

23:30

you delete it yes you just remove the request right because it's dead so why

23:34

we sure care is that so even if we have a request to enter the video section

23:41

from someone that is dead you know we can remove the request immediately and

23:44

so it means that when we will see the crash

23:49

we remove it and so this is the patch

23:53

so the first patch right here we do not wait for the arc so for the

23:57

patch i'm just writing the the change okay so you have to apply the patch like

24:02

get your top like the patch to the previous these are just the changes in

24:06

the others okay so the first one is that we do not wait for the ack

24:11

the second change is that when we detect a crash this is the crash of the failure

24:15

detector so when we detect the crash we look at all our requests

24:20

and we remove all the requests from the deadline

24:24

okay so this is a patch

24:29

yes okay yes that is that is a point so this

24:33

patch is not entirely correct okay so if you apply this patch to the algorithm

24:38

there is still a case that can lock a process forever

24:43

there is seal up here so this patch is not entirely correct

24:47

and the the case that locks you forever is

24:50

similar to the case that was making you detect someone as alive in the

24:56

eventually perfect failure detective the problem is this one i am process one

25:03

and there is the request of process zero that can lock me

25:09

if it reaches me okay because it is lower id lower timestamp

25:14

so if the pattern is like this the request reaches me

25:19

and then i detect that process 0 dies here so if the pattern is this one i

25:24

first receive and then i detect i remove the request

25:28

so you agree with me i remove the request

25:31

but of course you know the system is asynchronous

25:34

we have just the perfect failure detector but i was not telling anything

25:38

on the bound of the link so what can happen is this pattern that

25:42

i'm drawing below

25:45

so you detect the crash of p0 at this point and then the request reach

25:52

if the request reaches you you put the request inside the request set right

25:56

because you execute this line is this one the line no sorry

26:01

you execute this line right here so you put the request in the request set

26:06

and since you know you detect the crash just once you will never execute this

26:11

again and you will never remove the request okay

26:14

so how do we patch this case how do we patch this case

26:21

so here from zero

26:26

so what i do at this point what is the sensible thing to do

26:32

the sensible thing to do there is only one sensible thing to do

26:39

at this point do you know that zero is dead right

26:42

and you receive a message from someone that is dead

26:48

yes every time you receive a message not only a request my claim is this one

26:53

every time you receive a message you look if the sender is dead

26:56

if the sender is dead you just discard the message

27:00

and this cannot break the algorithm never because it is logically equivalent

27:05

to the fact that the process die and that's not enough time to send you the

27:09

message you see is logically is the same if i discard the message from a dead one

27:14

and so that is the the second point of the patch so here in this slide right

27:19

here say is enough what happens and here this there is the example so there are

27:23

three slides that i already explained so i skipped them

27:26

and this is the the correct patch so the correct patch i have to add also this

27:30

point i say if m is a request and the sender of m is not crushed then you know

27:37

i execute whatever i do the things

27:42

so in this patch makes the

27:46

algorithm fall taller why because if you ask for if you are alive and you request

27:52

then you will not wait forever for the app and so that is the first thing that

27:56

we fix the second if you have a request from a dead guy eventually this request

28:00

from the dead guy will be purged from the entire system puja that means

28:05

we we throw it away okay and so it means that you know the dead people will not

28:09

influence the system with that process and so he can progress

28:13

the usual module explosion out okay so if you are not convinced that this is a

28:18

patch you can try to try to use the patch and prove that the algorithm is

28:23

still correct and prove not really formally but convince yourself that it

28:28

works okay and so you can see that thanks to

28:31

the perfect failure detector p we have taken a fairly complex algorithm

28:37

and the lan part algorithm is complex and

28:40

the mechanism is not trivial it seems trivial but it's not trivial at all and

28:44

we made it full tolerant by adding one two three four

28:50

five six line

28:52

six line output no more than six line and this

28:55

four line are there they're releasing

28:59

and so this is why we make the perfect failure detector p

29:04

we make the perfect failure detector because he's able

29:07

thanks to this perfect failure detector we can take a complex algorithm making

29:12

them for taller and we will see that the peripheral

29:15

failure detector will help us in solving a lot of problem okay

29:20

also notice that when we were using the perfect failure detector in this

29:24

algorithm we never discussed about time never

29:28

so the concept of time is encapsulated in inside the failure detector

29:33

there is the assumption you know that you have the timeout to detect the

29:37

failure whatever we were not carrying at the upper layer is inside here we don't

29:42

have to manipulate time outside the failure detector so we were patching the

29:47

algorithm without discussing up if there is this time out this happened whatever

29:51

this is the layering that is helping us

29:56

okay so now the objective that we have we

29:59

have seen how to make the algorithm for tolerance

30:03

now i will show you i mean we will do together that we can create an algorithm

30:08

that is simpler to solve mutual exclusion using leader

30:12

election and the failure detector p so what we want to do is this we have

30:18

our moodle exclusion algorithm that we want to build

30:21

and what we have is the perfect point-to-point link that is the minimum

30:25

link the crash uh the failure detector p and

30:30

the leader election algorithm the perfect leader election the one that

30:34

does not make mistake so what is your idea to create a fault

30:41

tolerant movable explosion algorithm we have a leader elector model so what we

30:46

will do what is the easiest part

30:50

to create a failure detector if we have a leader

30:59

yes yes

31:02

so we have this module here that gives us a leader it tells us p1 is the leader

31:08

okay and no one can trust a different process

31:12

that is correct at the same time so if someone trusts a leader it has p1

31:18

so it means that i have a point in the system in which i can

31:22

send the request so i can say oh if

31:26

the leader election module tells me that p1 is the leader

31:29

one idea could be we elect the leader and then everyone speaks with the leader

31:34

and ask the leader can i enter in the critical section sir and the leader

31:39

answer yes you can enter or you have to wait because there is someone else and

31:43

then waits for the someone else that release and then he will settle to the

31:47

other earth you can enter okay this pattern works

31:53

what are the things that we have to be careful about

31:57

because we are in a system where people can die so if no one dies the algorithm

32:02

is trivial if no one dies leader election will tell only on a process

32:06

will tell the leader is zero when you know that the leader is zero

32:10

you communicate only with zero and you say can i enter individual sections

32:14

if now no one dies this is the algorithm we wait for the election event

32:19

the election elected the leader everyone just talks with the leader the

32:24

leader is a single process is a serialization point why because the

32:28

leader serializes thing he said you enter first you enter second

32:33

but there are crashes let's do it

32:44

step by step there are now we have the algorithm without crash the algorithm

32:48

without cash is triggered now we have to make it for taller

32:52

there are two categories of people that can die the

32:56

client the one that are not leader okay the one that are not leader let's

33:01

make it clear we have this that is the leader the leader is green

33:06

we have this that is not the leader the this that is not the leader this enters

33:11

in the critical section at this point and dies right here

33:16

so first assume only the client can die only the people that are not the leader

33:21

okay so this guy asked the leader may i enter in the critical section the leader

33:26

tells him yes you can enter and then this guy dies it means he will never

33:30

tell to the leader to release okay but this is easy to fix if you have the

33:35

perfect failure detector right what we have to do

33:39

so how do we fix this lock if we have the perfect feeling with the deck

33:50

so yes if we have the perfect failure detector simply the leader at some point

33:55

leader let's call it zero one and two if we have a perfect failure

34:00

detector eventually on the leader the leader will see this

34:03

crash one okay

34:06

at this point when the leader see crash one let's say that also you wanted to

34:09

enter the leader will say okay one release at the critical section

34:14

because it's dead is equal to if p1 released it and so what the leader

34:19

will tell at this point is to to please enter individual section

34:23

and then q enters in the critical section we can be lucky so 2 is not a 41

34:29

and 2 releases or is possible that you dies but at the same point we will see

34:33

the crash of two and so it releases okay so if the client dies the algorithm is

34:39

still simple okay so what is the terrible case

34:43

because you know the leader is the leader

34:48

as in real life also between process you know that is egalitarian so also the

34:53

leader can die right and so what happens is for the leader

34:56

that dies yes

35:03

if the leader dies we have the leader election that triggers and will elect a

35:07

new leader and so process you is the leader

35:10

and so everyone will start communicating with process still whatever okay

35:15

but there is a problem what is the problem the problem is this

35:18

one we have the leader sorry

35:21

we have the leader that initially is zero then

35:25

we have the second leader that will be one

35:28

and becomes leader at this point and then we have two clients client two

35:34

and client three and we have something like this

35:43

yes it does not send the response you can

36:00

enter in the radical section yes now we will see okay so the first

36:05

case is this one so two wants to enter in the critical section ask the leader

36:10

zero zeros enough time to send you can enter individual section and then dies

36:15

okay at this point this process

36:18

is in the critical section do you agree with me

36:21

is in the critical section so if three ask the new leader the new

36:26

leader if we are not careful the leader can do something like this

36:31

and we are done there are two in the critical section

36:34

right okay so how we fix this problem we cannot we don't

36:55

the the solution is this one at this point

36:59

when this guy enters in the critical section

37:03

q knows that he's in the critical section why because he's in the critical

37:07

section okay when you get elected what you have to do you have to know if there

37:12

is someone in the critical section when you are the new leader okay so the only

37:16

way to know if there is someone in the critical section you have to ask

37:20

everyone in the system are you in the critical section are you in the critical

37:24

section are you in the critical section when you have asked everyone in the

37:29

system and you know the state then you start

37:32

serving the request for to enter in the critical section

37:47

no you cannot do that because it's possible

37:51

that this process this is this is i mean if the leader dies it's not the fault of

37:56

process you you agree with me process still

37:59

has no has no responsibility on the failure of the leader and it's possible

38:04

that in the critical section it does one operation that lasts two hours

38:08

because i mean

38:10

i mean it's it's possible us to do stuff now we elect a new leader and reader

38:15

cannot force the the release of this guy because you know you are doing operation

38:19

so you're writing in you see my point so you cannot force this guy and say okay

38:23

elect a new leader i send a broadcast and i say exit from the vehicle section

38:27

it's not reasonable because i forced this guy to exit okay so then i have to

38:32

do a new specification of the moodle exclusion if i want to force it

38:46

okay so from here they say okay but it's also possible

38:50

to have this other case that i will draw here we have the leader zero

38:55

we have one that will be the new leader at this point and we have process two

38:59

that asks the leader and then this leader dies before sending

39:04

the request something like this before sending the the enter in the legal

39:08

section this is the good case is the good case because in this case

39:13

this one will wait does not enter individual sections do you agree with me

39:17

this does not enter individual section this guy eventually also see the new

39:21

leader because of the leader election this you will see

39:25

at some point we'll see new leader leadership okay when i see that the new

39:29

leader is leader two i stop trusting leader one and i say if i receive a

39:34

message from one it means it has a message from the dead so even if it is

39:38

the release i discard it i do not and then what i do i have a pending

39:42

credible section and they do like sorry i do the only thing that i can do i ask

39:46

the new leader i want to enter in the video search

39:51

yes a critical section yes the worst case is

39:59

when the leader dies and someone is inside the critical search okay

40:03

so now i told you that when you are elected as a leader so let's say that

40:08

i'm process one and they receive the event oh i'm a

40:12

leader then i have to start asking people

40:15

to see who is in the critical section and not

40:18

so how do i do this asking i do a broadcast i tell everyone please are you

40:24

in the critical section and i wait for the reply okay

40:27

how much time i have to wait and for the reply of who

40:33

because there are people that can die so i cannot wait for everyone because

40:38

it's possible that i wait for someone that is dead

40:42

so i have to wait just for the ones that are not dead

40:48

so when the new leader is elected they send a broadcast to everyone and say

40:52

tell me if you're in the critical section but then i just wait to

40:56

p set minus crashes

40:59

and this is a pattern that we have often so when you are in a system that does

41:04

crash you can only wait for p minus crash

41:08

because you can only wait for the people that are alive that will be p minus okay

41:13

so this is a pattern that we always have in algorithm that use the perfect phase

41:18

detector when you ask you can only wait for this amount of process because the

41:22

other you do not know if they were able to answer to you or you are waiting

41:27

forever for a message that does not exist

41:32

and so now this algorithm that we have discussed

41:37

yes so from home they say okay but if i'm

41:40

the leader then i have a special pair a special ability i can enter without

41:46

asking yes because you have to ask yourself

41:49

and okay whatever so you can avoid to us to yourself okay

41:54

as you can see electing a leader does not only make the algorithm simple

41:58

because we made an algorithm that is correct just by discussion

42:03

it also make an algorithm that is efficient because how many messages do

42:07

you send to enter in the critical section if the leader does not die one

42:11

message okay

42:14

and if you have if you want to enter in the critical

42:17

section and there can be a failure how many messages do you say

42:25

f plus one so if you want to enter into legal

42:29

section but you can have f people that can die in the worst case you are send f

42:34

plus one messages because you ask the first leader and the first leader dies

42:38

you ask the second the second dies how many they can die f then there is the

42:43

correct one and that will answer okay so f plus one

42:54

plus one because let's say that three people can die

42:58

so you start the algorithm you ask the first leader may i enter in the critical

43:02

section the first leader dies so you have to ask the second one so

43:06

remains two failure in the system you ask the second leader the second leader

43:10

dies it remains one failure in the system you ask the third leader the

43:13

third reader guy dies now the remains zero failure in the system so the first

43:17

leader will answer okay uh if you have i i'm saying you have a

43:30

failure i'm not specify how many processes there are in the system

43:34

greater than f plus one i'm assuming later only one but they can be you know

43:39

one 100 but greater than f plus one

43:49

yes every one under so from home they are asking but even if

43:54

even in this algorithm everyone understand

43:57

who pressured the and who is in the critical section who pressured you

44:00

understand because you have the perfect failure detector who are in the critical

44:04

section you understand because you ask can you wait and then you can know okay

44:09

and so the algorithm i just wrote it

44:13

here so the algorithm there is just the

44:16

description of the algorithm that we discussed

44:19

so an exercise that i leave you at are almost to write the code

44:23

so now you have the discussion you have the rules of the algorithm because we we

44:27

we discussed what are the rules and so now an exercise that you can do is to

44:32

make this set of rule formal by writing the algorithm so you write this

44:36

algorithm right here that is is long is not really really a

44:40

short algorithm but is easy enough to write it's not really different

44:46

okay so we can do a bit of break 10 minutes and then we

44:52

can discuss the new

44:56

we can yes start discussing the new argument and then we will do also some

45:00

exercise at the end okay yes

45:07

well you can prove it is not really difficult you can try to prove it okay

45:12

so of course i i do not pretend that you

45:16

are able to write formal proof as in the book

45:19

as me because you know but you can write an

45:22

argument so you can say i think this algorithm is correct because there

45:26

exists a single leader whatever whatever i do not expect that you say oh because

45:30

there is this case one question history and then case

45:34

one a case one b and whatever okay but you should be able to explain

45:40

in a human language to another human why your algorithm is correct okay so that

45:45

is that you should be able to otherwise if you are not able then your algorithm

45:50

is wrong one hundred percent i mean if you are able also my choice the case is

45:54

wrong okay because there is a corner case but if you are not able then 100 of

45:59

the cases bro so let's do 10 minutes break and at uh

46:06

yes 105 we resume and we start doing a new topic okay really exciting the

46:13

broadcasters okay so

46:16

if you have questions you can ask okay so

57:50

so now we will start

57:55

a new topic that will keep us company for for a

58:00

while and is the topic of broadcast

58:04

so before before starting the the broadcast

58:08

let us see what we have seen until now

58:14

so we've seen the introduction and then we have seen the time and distributed

58:19

system and those are the topics that we have touched

58:22

so these uh i already explained it we have the

58:26

experience the ac increments eventually synchronous synchronous model and for

58:30

each one of them we have shown some results

58:33

so in the event of ac increments we've shown the inventory perfect failure

58:37

detector the eventual leader election in the synchronous we have shown the

58:40

perfectly detector the leader election and we have shown the three modules that

58:45

the three models sorry that are fair stop

58:48

fail nausea fails silence that you can construct when the uh perfect failure

58:54

detector you can construct a fair stop when you have an eventually perfect

58:58

field so you can construct a field noisy and when you don't have anything you're

59:02

just in asynchronous then the system is failed silent because you cannot detect

59:07

crashes and so this concludes the time so the

59:12

module time the with the perfect failure with the

59:16

failure detectors and the leader election is concluded

59:19

and now we move to the new module that is the the broadcast one

59:25

and so until now

59:29

the majority of the discussion we have done were mainly on the interaction

59:34

between two processes so we have seen the links that were about to process

59:38

we have seen the video detector that was also a pattern between two browsers you

59:42

ping someone you see the reply from someone and then you decide if it's dead

59:46

or not so what we will do now

59:50

is to look at the broadcast problem so the broadcast problem its

59:56

specification is quite easy and natural you have a message

1:00:01

and you have to send this message to everyone so you have to make a broadcast

1:00:07

while when you send a message to only a single destination it's called the

1:00:10

unicast usually because there is a single you

1:00:13

know destination and so if we don't have failures the

1:00:18

concept of broadcast is quite easy we have our source

1:00:22

the source sends the message to everyone everyone eventually receives the message

1:00:28

everyone eventually delivers it so without failure the broadcast is a

1:00:36

four right you have a four in your memory you have for all processing the

1:00:40

system send message m and this is a process

1:00:43

it works perfectly so why we have to discuss about

1:00:47

broadcast we have to discuss about broadband because when there are

1:00:51

failures the broadcast unfortunately is more than a four

1:00:55

because what is the problem the problem is that the source crashes

1:01:00

he sends the message and then you have someone that will receive the message

1:01:06

and someone that will not receive the message because the message is lost

1:01:10

because you know when you executed the form

1:01:12

to send the message to everyone you die before sending the message to this guy

1:01:17

to this guy right here okay

1:01:20

and so what we will see in this lecture and probably also in the next one is how

1:01:26

to create broadcasts when there are people that fail specifically

1:01:31

when the source of the broadcast fails

1:01:35

so what are the things that we can create

1:01:39

and you will be amazed by the amounts of broadcast of different

1:01:43

broadcasts that we can specify so let us start

1:01:48

with the most simple broadcast that is called best effort broadcast

1:01:54

this is just the broadcast that we have in mind is the one that we create when

1:01:58

we use a for loop what is the specification of this best

1:02:04

effort broadcast we have two event we have the request event in which i tell

1:02:09

to the module please broadcast a message and the indication event that happens on

1:02:15

the receiver side and say okay deliver a message from from the source

1:02:20

and so this is quite the standard the stuff is quite easy process one

1:02:25

send message m i have that process to if process one is correct eventually see

1:02:30

the message m from process one and these this rd string event

1:02:36

let's see the property so we have a validity property that says

1:02:41

if a correct process broadcasts a message m

1:02:45

then every correct process eventually deliver message m

1:02:49

this is exactly the specular property

1:02:54

of the one in the perfect point-to-point link in the perfect point-point link we

1:02:59

had if a correct process send a message to processp processp receive the message

1:03:04

here is the same thing if a correct process broadcasts a message then every

1:03:09

correct process eventually delivered the message okay notice here that the sender

1:03:15

must be correct and notice here that the properties

1:03:18

specify only that every correct in the system has to receive it okay

1:03:23

so if the other process is fault is possible that does not receive it why

1:03:27

because it dies before the message is generated okay

1:03:31

then we have the node obligation no message is delivered more than once

1:03:35

exactly equal to the perfect point-to-point link we have the no

1:03:39

creation also this is exactly equal to the perfect point point link if a

1:03:44

process deliver a message m with sender s then m was previously broadcast by

1:03:50

process s so messages are not created okay if you receive something then

1:03:55

someone sent that something okay

1:04:00

and this is the most trivial broadcast that we can create that is called the

1:04:05

best effort why because ensure

1:04:08

validity so ensure that someone receive a message

1:04:12

only if the sender is correct okay if the sender is faulty it's possible that

1:04:17

you do not receive the message let's see the code

1:04:21

the code is trivial this is the code when you want to broadcast message m you

1:04:27

do a four on all the process and you send the message

1:04:31

when you receive a message from the perfect point-to-point link you send it

1:04:35

above okay this is the code it's quite trivial

1:04:38

and so by looking at the code we can understand

1:04:42

why when the sender is 40 the validity does not tell anything

1:04:47

because if the sender is 40 it's possible that let's say we are process

1:04:50

p1 we execute this handler and we are 40 so

1:04:55

we will crash and the set of total process is two

1:04:59

three four

1:05:01

one six

1:05:03

it's possible that we are able to send a message to to send a message to three

1:05:07

then we die and we are not able to send it to the

1:05:11

other people and they will never receive it

1:05:13

but this is fine because the best effort cell tells us if a correct process

1:05:18

broadcast a message then every correct deliver it so if the sender is fault

1:05:24

it's possible that someone receive it two and three and someone will never see

1:05:28

it four one and six okay and so this is what we have in mind

1:05:33

probably when i was talking about broadcast

1:05:37

so the proof the proof is trivial i mean the validity comes directly from the

1:05:43

reliable delivery of the perfect link plus the fact that the sender send the

1:05:47

message to every process in the system why because if i'm correct and i use the

1:05:51

perfect link then the perfect link tells that the message will be received and so

1:05:55

all the correct will receive it no duplication also directly follow from

1:05:59

the perfect link why if we deliver to message duplicated then means that this

1:06:04

is duplicating things but this cannot duplicate the things because it's a

1:06:08

perfect link no creation if we deliver a message m

1:06:12

and was not sent by a certain process so we create a message here

1:06:18

sorry ear then it means that the message was created by the perfect link that is

1:06:22

also not possible and so the proof is trivial and this

1:06:26

shows the principle of layering so we created this perfect point point link

1:06:32

with the self-time property we can prove the probability of the best effort in a

1:06:36

trivial way because we just say look at the link

1:06:39

the link is perfect so there is nothing to

1:06:41

to state and so this observation we have to make

1:06:48

so if the sender is correct and send message m1 we see that everyone

1:06:54

we receive message m1 will receive the message and then

1:07:00

deliver it so here you have to be careful

1:07:04

so first of all look at this arrow

1:07:09

okay this is an arrow from myself to myself okay

1:07:13

because in all the broadcasts that we will see when you broadcast you also

1:07:17

send the message to yourself okay to make the algorithm symmetric we do

1:07:21

not do the special case in which since is myself i do not send on the channel

1:07:25

okay so this is just the first thing so you

1:07:27

always send it to yourself even in the other algorithm that we will see

1:07:33

the second point is that there is a difference between the

1:07:37

moment in which the r reach a process and the moment in which this arrow right

1:07:42

here is generated okay so

1:07:46

when the arrow reaches you this point here i just mean that the message

1:07:51

physically reached the process okay when this arrow is generated i mean that

1:07:57

this process is delivering the message so it's creating this event right here

1:08:03

the lever at the upper layer okay this is different

1:08:07

we will see that is really different because there first of all

1:08:11

in this middle there can be computation on the local process then we will see

1:08:15

that there are the broadcast algorithm which i receive a message and then

1:08:19

before delivering it i start asking people

1:08:23

because i want to enforce some agreement we will see so there are different

1:08:27

events of course if the

1:08:33

sender is not correct and we are executing this algorithm right here

1:08:37

something like this can happen so the sender sends the message to everyone in

1:08:42

the system then dies and one message is lost the

1:08:46

message to this guy right here and this one will never receive it so this you

1:08:50

agree this we have already seen it in the when we were talking about the

1:08:55

failure detector with the round when you execute a four you can die in the middle

1:09:00

of the four and so why is bad the perfect failure

1:09:05

that the sorry the best effort broadcast it is bad because the correct process in

1:09:10

the system all the process in the system they do

1:09:13

not have a common view so it's possible that i have process one

1:09:17

that will see message one message two and message three and it's possible that

1:09:22

i have processed you that see message two and message three

1:09:26

and this is a problem y is a problem because there is message

1:09:30

one that these guys hit and probably this guy does something because he

1:09:34

received message one this guy does not see message one and will not do

1:09:38

something and this can be a problem so think about a set of replica replica

1:09:43

means you have a service that is replicated on five machine

1:09:47

and i'm the sender and i want to issue an operation on the replica and i use

1:09:51

just a fool the best effort broadcast and i die in the middle of the broadcast

1:09:56

i will leave i can live half of the replica in a state that is not

1:10:00

consistent because they didn't not receive the message you agree

1:10:04

so sometimes what we really want when i do a broadcast

1:10:08

is that either everyone receive the message

1:10:12

right or no one receive it this is better why if i have four

1:10:17

replicas w1 2 3 and 4 and i'm a client and i send my operation i know that if

1:10:24

the operation is executed by one and everyone see it also the other will do

1:10:31

it is worse if only one see the message right is worse because then only one

1:10:36

will execute the operation two three and four they will not execute it because

1:10:40

they do not know that the operation exists

1:10:44

and so sometimes what we would like to have

1:10:48

is a certain agreement on the set of processes that see the

1:10:52

message okay so the best thing we can do is to have some semantic that is called

1:10:59

all correct or nodding so either all the correcting system see your message and

1:11:04

that is fine or no correct see your message and that is better than leaving

1:11:09

you know off of the correct see your message the other half do not see

1:11:14

and so what we will do in the following

1:11:18

is to try to create something that has this

1:11:21

agreement property so we will see two kind of agreement we will start from

1:11:27

the more easy one and we create a broadcast with the

1:11:31

non-uniform agreement and then we will see a more complex agreement a more

1:11:35

strict one so it is clear what i want to do so what

1:11:40

is the problem with the best effort and what i want to fix

1:11:44

okay so if it is clear

1:11:48

let us see the regular reliable broadcast specification

1:11:52

okay so the regular reliable broadcast is a

1:11:56

block and this block exposed to event you can

1:12:01

broadcast a message you can tell to the block please send this message to

1:12:06

everyone and the other process the receiver will

1:12:09

receive the message so it will receive the message that someone has sent

1:12:13

the first three properties are exactly the same properties of the

1:12:17

best effort broadcast so they are not interesting they are they are exactly

1:12:21

the same we have validity no duplication no creation the important

1:12:26

properties the last one is a property more

1:12:29

that is agreement if a message m

1:12:33

is delivered by some correct process then m is eventually delivered by every

1:12:39

correct process so this property is saying that if there

1:12:42

is a process p1 in the system and this process p1 is correct

1:12:48

and see message x then all the other correct in the system eventually f2c

1:12:54

message x have to deliver message x so this is implementing the semantic i

1:13:01

was talking about because if a correct see the message then we will create a

1:13:05

broadcast that ensure that also all the other correct in the

1:13:09

system have to see the same message so is this property

1:13:16

a safety one or a liveness one question

1:13:21

is liveness is liveness property because i cannot

1:13:27

violate it infinite time because it's always possible that the instant after

1:13:31

you know the process delivers the message so it's not a safety one

1:13:36

which one of these properties are safety which one of these four

1:13:41

so the question also from which one of these four properties

1:13:46

three safety yes i agree and then and you yes two is also saved one is not

1:13:52

safety is lines okay so he went back

1:13:57

and so before looking at the algorithm to implement

1:14:01

the regular reliable broadcasts let's look at

1:14:05

a run and let's try to understand if a certain run is just best effort

1:14:10

broadcast or reliable broadcast okay so when you read the web it means best

1:14:14

effort broadcast okay when you read rb also in the xml is a reliable broadcast

1:14:19

okay so let us see the first run now i will

1:14:22

explain what is that this kind of drawing when i do this arrow

1:14:27

this double arrow i mean that this process is creating a broadcast event so

1:14:31

it's broadcasting at this point okay and this broadcasting the green message so i

1:14:36

use the color to indicate the message orange orange message

1:14:40

this this is blue something blue message whatever okay

1:14:47

and this is part this is this is part four

1:14:51

when i do an arrow like this i mean that the process delivers the message so in

1:14:55

this case is delivering the green message he's delivering the orange

1:14:59

message the blue message and the polish message okay

1:15:04

so let us see the first run is this execution of best effort

1:15:09

broadcast or a reliable broadcast assume that

1:15:14

from this point in the future they do not deliver any more okay so at infinity

1:15:19

is like this just why is best

1:15:25

yes perfect it's best effort why because i

1:15:29

have process two that delivers the green message right here and i have process

1:15:33

three that never delivers the green message so it's best effort because

1:15:37

there is a correct process they deliver a message green that is not delivered by

1:15:41

another correct process and this is not possible in the reliable okay

1:15:47

so let us see the second run the second run is best effort or

1:15:52

reliable yes

1:16:02

is reliable and also best f okay why is reliable also best effort

1:16:08

reliable broadcast implies best effort

1:16:13

so if something is a reliable run is also best effort run why

1:16:17

well is one probability mode so if is one property more it means that we have

1:16:22

this three property and so we are best effort plus something else okay so every

1:16:27

run that is reliable is also best effort but of course this is false

1:16:36

this is not true if something is the best effort does not

1:16:40

imply reliable okay and so yes this satisfy

1:16:46

best effort but not reliable violates the agreement

1:16:50

and then the animation and is satisfied reliable okay

1:16:55

let's say that i have an execution like this

1:17:03

this is best for too reliable best effort

1:17:08

are you sure is not even best effort

1:17:14

why is not even the best effort because there is the correct here that broadcast

1:17:19

the orange message and there is a correct that never

1:17:22

delivered the original message so we violate

1:17:26

the validity the validity say that if a correct

1:17:29

broadcaster message every garage brought us a message you see process you

1:17:33

broadcast the orange one and process 2 does not deliver the orange one so it's

1:17:38

not even a best effort yes in the future i agree but i'm saying

1:17:44

this execution is like this forever okay forever so if it's like this forever yes

1:17:49

otherwise yes the answer is we do not know because it's possible that in the

1:17:53

future we have orange okay but if it's like this forever then

1:17:57

we violate okay

1:18:10

and so now let us can i ask a question about the

1:18:15

slide before yes this one please yes the second run

1:18:20

we said it is a reliable broadcast yes because the

1:18:26

because p1 crashes yes p1 cache okay

1:18:30

yes so if this is this is reliable because since

1:18:33

this crash the green one can be not delivered by this one if this

1:18:38

was correct then the owner have to deliver the green

1:18:41

otherwise it's not even a best effort okay

1:18:45

okay thank you okay

1:18:50

so they are saying can you please repeat why the second run is reliable broadcast

1:18:54

because the there is agreement on the messages delivered by the correct

1:18:58

process and the other three properties validity no duplication no creation are

1:19:03

respected so it's reliant okay because the correct process they see the

1:19:07

same set of messages so it's reliable this is not reliable because this

1:19:13

correct does not see the green okay and so now that we have the species

1:19:33

okay yes i i see your point you say reliable implied best effort so this is

1:19:37

also best effort yes i agree with you this is also the best effort if i ask at

1:19:42

the exam which kind of run it is you have to take the stronger specification

1:19:46

okay you have to answer reliable why because reliable is stronger than the

1:19:50

step okay

1:19:53

so yes i see your point exactly this is also the step of course

1:19:57

but you have to answer with the stronger specification

1:20:03

so so now let us see how to implement this reliable broadcast

1:20:10

okay so this is the algorithm the algorithm

1:20:13

is not difficult but you have to pay attention so this is an implementation

1:20:18

of the the algorithm in the fail stop system fail stop means that we have the

1:20:23

perfect failure detector okay so we have we will build our algorithm using the

1:20:29

best effort broadcast so we use the best effort broadcast and the perfect failure

1:20:34

detector to implement the algorithm

1:20:38

this is called the lazy reliable broadcast is the name of the algorithm

1:20:43

it's called the lazy we will see because there is another version that is called

1:20:46

eager this is lazy because it creates a new broadcast event only when is

1:20:51

necessary and you will understand this now that i explained the algorithm

1:20:57

so let us start with the initialization handler the

1:21:01

first one we have the set of correct that

1:21:04

initially is p all the processing the system because initially everyone is

1:21:09

correct we hope and then we have this notation here that

1:21:13

i think is the first time time we see it okay

1:21:17

so what i mean this is just a dictionary in python or an ash map

1:21:23

is an array in which in each location of

1:21:26

this array i i put a set and each location of the array is the id

1:21:33

of some process so this if i have a system of three browsers p1

1:21:38

p2 and p3 this will be a dictionary that maps p1

1:21:43

to the empty set at the beginning p2 to the empty set and p3 to the empty set

1:21:48

okay is a dictionary in which i put from

1:21:53

process 3 and this gives me an empty set and then

1:21:58

of course i can put something in the empty set that does not become empty

1:22:01

whatever dictionary in python if if you could in python if you would in java

1:22:06

this is an ashma with something that is mapping you know a process to i'll show

1:22:09

certain structure that is an empty set okay i write n here because there are n

1:22:15

processing the system so these these are rays of n so it's an array index by

1:22:19

process did you get what i mean okay

1:22:24

then we have the the second handler the second and there is the broadcast ender

1:22:28

this is if a broadcast event happened here so i want to reliable broadcast

1:22:33

message m then what i do i create a new message

1:22:37

that contains data self

1:22:40

self and message m and they send this message

1:22:44

on the best efforts broadcast right here okay

1:22:48

so now the only things interesting that happened in this

1:22:52

handler is abrupting on the message the message is encapsulated so

1:22:57

we have message m at this point and what i send in the best effort broadcast is

1:23:02

something that contains data self self is my id okay surf is my id

1:23:09

and m message n okay so if i'm process one

1:23:14

i will send a packet that contains data process one

1:23:19

message okay is nothing yes

1:23:24

yes this is this is a really nice question so what is data data is just a

1:23:29

neither fixed to the fix it to data okay so is

1:23:36

i don't know why the book uses data because you see you never use it

1:23:40

in in the algorithm it's just i think to distinguish this kind of message from

1:23:44

the message iit okay but it's just a fixed constant it's like i don't know

1:23:49

it's like uh it's a flag a flag in the pocket the

1:23:53

data flag okay it's like the uh tcp packet with the scene flag so it's

1:23:58

syn tcp steam and this is data it's just data

1:24:04

thank you thank you for the quest and so this

1:24:07

best effort broadcast data a self message to everyone in the system

1:24:12

and then the other process you know start deliver it start deliver this

1:24:16

message when someone delivers it from the best

1:24:20

effort broadcast we have this handler right here that triggers

1:24:24

this android year triggers when you deliver

1:24:27

so what you do so you receive let's say that process one

1:24:34

does the broadcast of data process one

1:24:39

and message x and we have processed two in the system

1:24:43

that receive it process q trigger this ender and we'll see data

1:24:49

process one because s is mapped to process one is the source of the message

1:24:54

this is the source of the message and message x

1:24:58

and what it does does this first check here you check okay

1:25:02

did they receive the message x from p1 this is what i'm doing i'm taking

1:25:07

message x and i'm checking if x is not inside from p1

1:25:13

okay so i'm checking if the message is new

1:25:16

okay if the message is new i do my stuff if the message is not new i discarded it

1:25:22

this is usual no duplication we use a set to not

1:25:25

duplicate the mess this also you have to be careful because

1:25:31

in this algorithm you can have two kind of of broadcast you can have the

1:25:37

broadcast from the source so if mp1 and i'm sending message m i'm

1:25:42

called the source because i'm the first one that send a message

1:25:46

and you can have the broadcast from the relay so there will be certain processes

1:25:50

in the system we will see that we'll start doing a relay job so we start

1:25:55

broadcasting a message generated by another source

1:25:59

because the source is dead you have to help the source we will see when it

1:26:02

happens so process you receive the message from

1:26:06

p1 start executing this handler the first thing you do you trigger the

1:26:10

deliver so you take the deliver on message x

1:26:15

then you update the from so you write from

1:26:19

process one and from proper this one becomes x set x

1:26:24

and then you check if process one is called

1:26:27

okay you check you say okay the original source process one is correct or not

1:26:32

if it's correct you do nothing if the original source is dead you start doing

1:26:37

the relay look at this point what is the relay i'm processed you

1:26:41

i receive a message from process one i see that process one is dead

1:26:46

what i do right here i say oh i received this message and i deliver it it's

1:26:52

possible that the other correct will not receive the message why because process

1:26:56

one is dead and so what i started to do at this point this line right here i

1:27:02

start to do a relay of the message so i also broadcast message m to the other

1:27:08

people why because in this way i helped p1

1:27:12

because p1 is that they received the message i want to do the reliable

1:27:15

broadcast that means if i'm correct and i deliver the message

1:27:20

the other correct have to deliver it so at this point if i see that the source

1:27:24

is is is 40 it's possible that there is a correct

1:27:28

that does not receive it so what i have to do i have to help and start doing the

1:27:33

broadcast and notice here an important point i will erase everything

1:27:38

is this as ear

1:27:41

is still p1 okay when i do the relay in the message

1:27:46

i keep the original source p1 why because if someone received the relay

1:27:52

when asked to send the message to the upper layer it has to tell that the

1:27:57

message come from the source not from the relay so i see the relay from p2 of

1:28:01

a message from p1 when i talk with the upper layer i have to say look this

1:28:06

message comes from p1 not from the relay that is p2

1:28:11

and so this is the first relay point of our algorithm if we receive a message

1:28:16

from someone that is dead yes

1:28:22

really like this

1:28:26

okay this is the spelling you're welcome

1:28:30

so that is the relay and there is also a second relay point that is at this point

1:28:36

right here so because it's possible that i receive

1:28:39

a message from p1 i deliver the message and then i realized after that p1 is

1:28:45

dead because the you know the cash event can receive can can happen after and if

1:28:49

i understand after that i delivered a message from someone that is 40 the only

1:28:55

things that i have to do i have to try to fix the team because i'm a correct

1:28:58

process here i deliver the message from p1

1:29:03

and then i understand oh p1 is 40. at this point i say oh the source is 40

1:29:07

this is dangerous because it's possible that i'm the only one that delivered the

1:29:11

message right because it's best effort so if the source is 40 it's possible

1:29:16

that someone see and someone does not and so what i do to try to fix the thing

1:29:20

when i say that someone is dead i take all the message received from that

1:29:25

someone and for each one of that message i start to do the relay

1:29:30

why because i have to ensure that if i'm correct and i deliver a

1:29:35

message all the other correct in the system have to see the message and so i

1:29:40

start doing the relay so that reach the other

1:29:43

do not worry i have the execution of the output

1:29:47

so this is the first execution let's see how the algorithm works

1:29:51

we p0 p1 p2 p3 p5 p6 p3 starts and wants to do the broadcast

1:29:58

of m but is unlucky dies and its message only reaches process q

1:30:03

but process q here process p3 die at this point the

1:30:08

failure detector tests who process p3 sorry to process q that process p3 is

1:30:13

dead so at this point in the algorithm what

1:30:17

happened on process 2 is that process 2 removes

1:30:20

p3 from the current okay

1:30:24

then you receive the message from p3 at this point and you execute this handler

1:30:29

right here so you execute the handler you see that the message is new you

1:30:34

execute this line then you execute this line then you execute this line then you

1:30:37

see and you say oh p3 does not belong to correct

1:30:41

and so what i have to do i have to start doing the relay of the message and so

1:30:46

you send it again the message to everyone in the system you do a best

1:30:50

effort okay

1:30:52

now if pdu is correct then all the other correct in the system

1:30:58

will have to receive the message why because you are using the best effort

1:31:02

broadcast for the validity property of the best effort broadcast if pto is a

1:31:07

correct process then all the other correct processes in the system have to

1:31:12

receive the message event and so they will deliver it

1:31:22

there is a question from home if the source dies then everyone

1:31:26

can see this yes this is done we will discuss this in a bit okay

1:31:32

yes yes it's possible i understood yes now

1:31:38

the the next slide yes the second case

1:31:43

is this one p3 dies

1:31:47

but now the message reaches process 5 process 5 deliver it and then detect the

1:31:52

crash after this is what you were saying then you detect the crash after what

1:31:56

happened when you received the message from p3

1:31:59

you execute this algorithm right here and what you

1:32:03

do here you write from process 3

1:32:08

and you put message m we are this process here p5 then you

1:32:13

detect the crash after what happens when you detect the crash you execute this

1:32:18

handler because you say oh i delivered something from from from from p3 but p3

1:32:24

is dead i mean if we are like this i'm violating

1:32:27

agreement right because it's possible that i'm the only one

1:32:31

and so what you do at this point you execute this line right here so you take

1:32:35

all the messages from p3

1:32:38

and in particular message m and you start doing the broadcast

1:32:43

and these will reach everyone eventually of course it's possible that this

1:32:47

message reaches process two that detected the process of fiji this also

1:32:51

starts doing a broadcast okay

1:32:59

notice that here

1:33:06

what you check is that the source is correct or not okay you are not checking

1:33:11

the relay so this is the id of the relay

1:33:16

because this is the idea of the people that is physically sending the message

1:33:20

and this is the idea of the original source at this point you check the

1:33:24

correctness of the original source you do not care about the correctness of the

1:33:28

relay okay when you send the message why is that because it's possible that

1:33:32

happens something like this so we have process three that is the

1:33:36

source source evo3

1:33:38

he sends the message the message is received by process five

1:33:43

process five detects the crash becomes the relay this is process p that does

1:33:47

the relay reaches this guy these guys does not

1:33:51

check the correctness of the relay no

1:33:54

you check the correctness of the original source if the original source

1:33:58

is dead you start doing the broadcast why i do not trust the relay it's

1:34:02

possible that the relay dies okay it's possible that the relay crashes here and

1:34:07

if i do not do this broadcast then i'm in trouble i'm in trouble why because

1:34:12

i'm the only one that see it because the relay you know that is that

1:34:17

the other people is not ensured that they will receive the message because

1:34:21

it's the best effort and then this run is also a correct run

1:34:27

so there are two people that are faulty they send the message to each other they

1:34:32

are the only ones that see the message then they both crash this is fine

1:34:36

why because if a fort is a message then we do not have to ensure you know that

1:34:40

the other process we will see it so this is also something

1:34:44

that is possible so is it clear the execution of the the

1:34:49

algorithm do we have question doubt about the

1:34:55

algorithm question here

1:35:00

at home okay so let us see

1:35:04

the correctness proof and then i will i will

1:35:08

do some question on the output so validity and no creation are ensured

1:35:13

by the best effort broadcast why because the best effort broadcast does not

1:35:17

create a message because if you are correct and you send the best effort

1:35:21

broadcast every correct receipt no duplication derives immediately

1:35:28

from this check right here so if you receive a message several times you

1:35:32

deliver it just once because you do this check okay so you cannot duplicate

1:35:37

messages and finally the agreement so to prove

1:35:41

the agreement the proof is always the same

1:35:43

suppose by contradiction that process p is correct and deliver message m

1:35:49

with original sender q while another correct process p prime

1:35:54

does not deliver message n so if q does not crash then by best

1:35:59

effort broadcast also p prime delivers n this is trivial if uq does not crash

1:36:04

then the the source is correct but best efforts broadcast if the source

1:36:09

is correct every correct in the system has to receive the message so

1:36:14

p and p prime they both have to deliver it

1:36:17

so the only possibility left if if q crashes

1:36:21

if q crashes then can p detect the crash before receiving m then we execute

1:36:30

this relay here if the source crash and you detect the failure before receiving

1:36:35

the message and so since process p is correct

1:36:40

since process p is correct p starts doing the relay of the message

1:36:45

that is the best effort broadcast if we have some

1:36:49

a source of a best effort broadcast that is correct

1:36:52

then all the correct will receive it so p1 will receive from the relay and p1

1:36:57

delivers n and the second case is if q crash and p

1:37:02

detect the crash after delivering the message but this is the case that is

1:37:06

covered by this line right here so also in this case the process speed

1:37:12

that is the correct one start doing the relay if a correct start to doing the

1:37:17

relay by the best effort all the correct will see it so p1 will eventually

1:37:22

receive the message and deliver the message

1:37:25

so this this is the proof

1:37:29

so now i have several questions on the algorithm

1:37:33

so the first question that i have is

1:37:37

to send a reliable broadcast in the best case how many messages you

1:37:44

create with this algorithm in the best case

1:37:50

how many messages you create in the best case unicast message how many unicast

1:37:56

messages you get from home the answer is correct

1:38:01

yes because in the best case you do not

1:38:03

crash you are a correct source so you execute

1:38:06

this broadcast and you are the only one because no one will detect you as 40 so

1:38:12

no one will start doing the relay and so in the best case

1:38:16

the source just as to send any messages as to what four one call to the best

1:38:20

effort broadcast and everyone receive it in the worst case how many messages you

1:38:26

create no in the worst case means

1:38:32

how many messages you get i mean the worst case the number of messages

1:38:37

yes so uh from from all

1:38:40

here at home they are the year here the answer how many messages in the worst

1:38:45

case can you create what is b

1:38:54

yes n square so in the worst case is n square y is n

1:39:00

square we have the source the source dies and the source create and messages

1:39:06

everyone that received the message everyone detected that this was

1:39:10

pressured at this point so at this point they detect

1:39:13

everyone received the message at this point after the detection

1:39:17

everyone start executing this why because everyone start executing this

1:39:22

everyone creates n messages and multiplied by n is equal to

1:39:28

so n square messages in the worst case the worst case happen when there is a

1:39:32

failure so if the source fails

1:39:35

you have a worst case everyone starts doing abroad because er does the

1:39:39

broadcast at this point or does the broadcast at this point so when the

1:39:43

source failed you always create n square messages in the worst case you create at

1:39:48

least n minus one multiplied by n if the the resource resource fails okay

1:39:55

and so this is for the number of messages

1:40:04

so this is for the number of messages this is the execution

1:40:08

the source creates a message crashes everyone detects the crash everyone

1:40:12

starts doing a best effort is n square and now let's talk about another measure

1:40:18

of complexity the other measure of complexity is the

1:40:23

message delay or communication steps this measure of complexity we already

1:40:28

seen it in the lan port module exclusion i told you in

1:40:32

the best case the ramport motor extrusion is a

1:40:36

two times pro two two times algorithm because you do a request

1:40:41

and then you have to wait for the apps and so when we do the message delay or

1:40:46

communication step we measure the time and what we do to measure the time

1:40:51

is that we pretend to be in an environment where each message takes one

1:40:56

unit of time to be delivered so we pretend that we are in a in a system

1:41:00

where if i do a broadcast the broadcast take one unit of time and then i have to

1:41:05

compute all the unit of time that you need to reach all the process okay

1:41:10

all the process so in the best case how many message

1:41:16

delay the algorithm takes to make every

1:41:20

correct deliver a message in the best case

1:41:24

one yes

1:41:26

one why because in the best case the source is correct and so the source

1:41:30

create a broadcast this is one unit of time in one unit of time it reaches

1:41:35

everyone and then they deliver this is the best case

1:41:38

in the worst case what can happen in the worst case

1:41:48

let's say that we have a system of four processes

1:41:56

one two

1:42:00

three and four

1:42:04

so we say let's say that p1 is the source p1 is the source

1:42:10

so if the source is correct we are in the best case right

1:42:14

so to have the worst case we need that the source fails okay so the source

1:42:19

generates the broadcast it starts sending the messages

1:42:24

and then it fails if the message does not reach anyone

1:42:30

we are done okay so

1:42:33

in the worst case this message reaches process p2 now process pd what he does

1:42:37

in the algorithm the relay okay so it starts doing the

1:42:44

relay now if

1:42:46

p2 does not die how many units of time we need another one right so we have one

1:42:52

unit here and one unit here

1:42:57

sorry yes

1:43:00

so it has to happen in the worst case is if this one dies right because it's

1:43:05

possible that also these relay die and the message you know reaches this

1:43:09

process right here and so this process what he does

1:43:14

it starts doing the broadcast right now if this process does not die we have

1:43:18

three units of time but in the worst case it's also possible

1:43:22

that this process die and the message reaches only before process and so if we

1:43:26

have process five we can do the same pattern whatever so what we are doing is

1:43:30

we are creating a chain a chain of messages

1:43:35

and the length of this chain is equal to the number of process minus one

1:43:40

and is one unit of time for each message on the chain

1:43:44

so do not worry there is the figure so in the worst case you have a delay

1:43:49

that is order of n y is this counter example right here the original source

1:43:54

send only one see the message start the relay die only once in the message from

1:43:59

the relay start to delay die only once in a message from the relay and so on

1:44:04

and so we have one n unit of time message time to reach everyone

1:44:21

yes minus one because the last reaches

1:44:23

itself yes and so

1:44:28

okay so now let's do a bit of break and then we will

1:44:33

we will continue so

1:44:37

at 2 10

1:44:39

we start talking so if there are questions on the

1:44:45

algorithm you can you can ask

1:45:10

okay this

1:59:37

okay so let us

1:59:39

continue so we have seen the

1:59:43

the lazy reliable broadcast and to implement this algorithm we need

1:59:48

the best effort but also the perfect failure detector so we need a perfect

1:59:52

failure and we need a perfect failure detector

1:59:56

right here because at this point we detect if

2:00:00

someone crashed if someone pressured we update our correct set and we also do

2:00:05

some operation now the question that i have for you

2:00:11

do you think that let's say that i use a perfect failure

2:00:17

detect a filler detector that is not perfect but it's just eventually perfect

2:00:21

for your detector what can happen let us say that in

2:00:25

process one and i'm running the algorithm is

2:00:28

possible that i detected the glacial process too but process two actually is

2:00:32

alive right this is possible because the eventually perfect field detector

2:00:37

infinite time can make mistake do you think this breaks the algorithm

2:00:42

or not so it's a question so let's say the time process one and they wrongly

2:00:46

detect process 2 as 40. do you think that this breaks the

2:00:50

algorithm so the algorithms stop working or not

2:00:54

no what happens the only things that happen

2:00:57

if i detect that p2 is 40 is that i start doing the relay

2:01:02

but actually p2 is correct so there are there is the original source p2

2:01:07

and then i say oh p2 is incorrect and they start doing the relay of p2 you

2:01:12

agree with me but nothing bad happen what happened in the system is that we

2:01:16

have process one process two process u does is by the best effort

2:01:22

broadcast right here when the message reaches process one also process one you

2:01:26

know starts doing the broadcast and process two is alive and well and we

2:01:31

have two sources that do the broadcast okay

2:01:35

so do you think that if i take this line in the algorithm and they put this line

2:01:40

here so i execute the line unconditionally i

2:01:45

break the algorithm or not i take this line this line is

2:01:51

conditionally executed so you have to execute this and then this if and then

2:01:55

you can do the relay right you're going to exit this line so if i take this

2:01:59

relay line and i put it before the if do i break the algorithm or not so the

2:02:04

correctness no

2:02:06

what happens is that i immediately see a message and i start doing a relay do you

2:02:10

agree with me now what happened if i receive message m

2:02:16

i am correct and i start doing the relay the other correct we receive m or not

2:02:23

so i do it again more slowly i'm a correct process i receive a message m i

2:02:30

execute the broadcast at this point the other correct will receive the message

2:02:34

or not yes because it's the best effort right

2:02:38

if a correct does the broadcast everybody does the broadcast

2:02:42

and now we have several insights okay we have several insights

2:02:46

now if i ask you

2:02:48

can you implement a regular reliable broadcast without the failure detector

2:02:54

what will be your answer is it possible or not so i say okay

2:03:03

yes it's possible and why is possible well you have seen

2:03:07

that if i execute this line unconditionally

2:03:10

i'm actually implementing a reliable reliable broadcast why if i'm correct

2:03:16

and i receive a message i immediately start doing the relay of the message

2:03:22

by definition if i'm a correct and i also deliver the message and i do the

2:03:26

relay all the other correct will receive the message because it's best effort i

2:03:30

do the four i do not die in the four all the correct receive it all the correct

2:03:35

deliveries right and so yes it is possible

2:03:39

to implement the regular reliable broadcasts without the

2:03:43

failure detector with this idea right here

2:03:47

and this idea right here that took us five minutes to

2:03:52

to understand once we had the good insight

2:03:55

is called eager

2:03:59

reliable broadcast and is a way to implement a reliable

2:04:04

broadcast using only a best effort broadcast

2:04:08

so eager in english means someone that you know

2:04:12

it's really it's eager of doing something you do something immediately

2:04:16

okay so in this algorithm every every process

2:04:20

is an eager beaver and when you receive a message immediately start doing the

2:04:24

broadcast okay so from from home they are saying

2:04:32

but doing this kind of stuff is increasing the complexity of the

2:04:36

algorithm yes it is increasing the complexity of

2:04:40

the algorithm we will see the message complex okay

2:04:44

it does not increase the complexity in the point of view of the

2:04:47

number of lines whatever because it is simpler to write it okay yes but

2:04:51

increases the complexity we will see and so how the algorithm work the

2:04:55

algorithm is really trivial we have the delivered set

2:04:58

that is equal to the empty set when you broad custom message when you

2:05:04

want to reliable broadcast a message you trigger a best effort broadcast of the

2:05:10

things when you receive a message immediately

2:05:13

you just see if the message was received before if was to receive it before you

2:05:18

do nothing because you have no obligation if the message was not the

2:05:22

receiver you remember that you have seen the message you deliver it at the upper

2:05:26

layer and then you start doing a reliable

2:05:30

broadcast sorry best effort broadcast of the message

2:05:33

y is correct the correctness of the algorithm is trivial if there exists a

2:05:38

correct process and this correct process receive a

2:05:41

message and deliver the message then execute

2:05:45

this line but if it executes this line it also executes this line right here so

2:05:51

it means that startup broadcast of the message

2:05:54

all the correct will receive the message so all the correct interns will have to

2:05:58

execute this android because we have one arrow that from here

2:06:02

we reach every chord and we'll make this trigger

2:06:08

and so as someone of you notice what is the

2:06:13

message complexity yes

2:06:18

yes so from home they are observing oh so it

2:06:21

means that i can implement the reliable broadcast even in asynchronous right

2:06:26

because i don't need the failure detector so i don't have to build a

2:06:28

failure detector yes you can okay

2:06:31

so the reliable broadcast that is a primitive that seems powerful you can

2:06:36

implement also in asynchronous okay because the only thing that you have to

2:06:39

do is just to broadcast whatever you see

2:06:43

and that's it okay

2:06:47

so another observation from home that is

2:06:50

similar to an observation here is don't we just send a lot more message than

2:06:55

needed yes you do send a lot more messages so how

2:07:00

many messages do you send in the best case

2:07:03

for a broadcast how many unicast messages you send in the best case

2:07:10

yes and a square you send n square also in the best case

2:07:14

when there is no no failure why because the original source sends the

2:07:18

message everyone received the message send order and messages like crazy

2:07:23

everyone received a message you start sending messages whatever okay

2:07:27

so n square is really bad in distributed compute

2:07:31

so if you are in a real network and you have an n square algorithm then you are

2:07:35

in for an earth time because if the network is is large

2:07:39

enough and you have for example 100 process

2:07:42

and try to do 100 to the

2:07:45

try to do the square of 100 it's a lot okay so here i say okay this is the the

2:08:00

i this is this is the the the message complex you know but not

2:08:05

special complexity if you say special complexity uh what i

2:08:09

mean i understand is the the space you need inside the process

2:08:13

okay this is that is the the usual description

2:08:16

so they are saying here they say oh but this this impacts only the message

2:08:21

complexity of the algorithm not the message delay

2:08:25

yes the message delay is always order of n there is the same chain right the

2:08:29

chain is equal the chain you have seen you have the source

2:08:32

the source dies the message from the source reaches only process one

2:08:36

process one starts the relay dies the message reaches only process two and so

2:08:41

on so you still need the same chain okay so the the the time complexity does not

2:08:45

change it's the message complexity that changes

2:08:49

in the best case so the best case become equal to the worst case

2:08:54

in the previous algorithm they were different so even if the source does not

2:08:57

fail you have

2:09:00

uh you have that you generate and square

2:09:05

messages the message delay in the best case if the source is correct everyone

2:09:10

receive it after one delay then they start through the broadcast but this

2:09:13

does not count because the problem is solved at this point okay they do the

2:09:17

broadcast whatever but they are not solving any more of the problem

2:09:20

in the worst case you need order of n steps messages because you create the

2:09:25

same chain okay

2:09:29

and so now i have a question for you and you have

2:09:33

to really look at this algorithm and the algorithm before

2:09:37

to answer this question so here i'm using

2:09:48

just a set delivery you agree with me this is a single set

2:09:52

in the previous algorithm let's go into circuit

2:10:01

in the previous algorithm for the node obligation i was using from the source

2:10:05

okay you see here i'm using from the source

2:10:10

for node obligation in the other algorithm my data set and i put

2:10:13

everything inside the same set without caring about the shoes okay

2:10:19

these actually create a difference in the algorithm

2:10:22

if you really think about it can you try to think what is the

2:10:28

difference of using a single set or a set from each source

2:10:41

yes yes

2:10:43

so yes there is a difference if i'm using this set right here and i'm

2:10:48

process one and i send message x

2:10:51

you deliver x if i'm process two and i also send the

2:10:55

message x you deliver x a second time because x from process 2 is different of

2:11:01

from the x of process 1. in the in the other algorithm since i'm

2:11:06

using a single set right here a single set right here

2:11:12

if process one send message x and also browser still saying we want to send

2:11:16

message x the second copy will not be received because it's filtered at this

2:11:21

point okay this is not a problem because always in

2:11:24

the broadcast as in the perfect point-to-point link we assume that the

2:11:28

messages right here are unique so are unique

2:11:32

it's easy to implement a unique message because i just have to send a message

2:11:36

sequence number my id and then every time i want to send a new

2:11:41

message i increase the sequence number and that becomes unique and whatever

2:11:46

so it's trivial to create a module here that takes any message and make it

2:11:51

unique but you have to use it okay so if you want to send non-unique messages

2:11:57

also on different process in this case only one copy is delivered because there

2:12:02

is a single set there is a single set

2:12:08

okay is it clear the eager reliable broadcast there are doubts on the

2:12:12

algorithm the algorithm is it's quite simple doubt here at all on this other

2:12:17

okay so now i will just introduce the

2:12:20

specification of the uniform then we will do exercise and we will see the

2:12:24

uniform reliable broadcast the algorithm in the

2:12:28

next lecture but the specification we will see today

2:12:32

what is the problem of the regular reliable broadcast

2:12:37

is that okay all the correct process see the same messages so if i am process one

2:12:43

and i'm correct i see message one two and three

2:12:47

then it's possible that you see three two and one because the order can be

2:12:52

different the order of the delivery make the same order is equivalent to

2:12:56

consensus we will see really later so you will see three two and one if you

2:13:01

are correct but we see at least the same set of messages

2:13:06

let's say that there is another process p3 that was unlucky because it's a 40

2:13:10

process it's possible that p3 c4 3 q

2:13:16

and that's it that is possible okay so specifically it's possible that this

2:13:20

40 process p3 for the regular reliable broadcast c message 4

2:13:26

that is never seen by the correct process

2:13:30

this is possible because let's say also let's make a run we have a run like this

2:13:35

in our algorithm we have process 0 that generate message 4

2:13:41

message 4 reaches only process 3 process three delivers starts doing the

2:13:45

broadcast and then dies and this also dies the only one that has seen message

2:13:50

four is process three okay

2:13:54

and this can create a problem you can imagine it let's say that you have your

2:13:58

bank account and your bank account is replicated on

2:14:02

five computers and then you are a client but your fault

2:14:06

i mean your your connection drops when you are you are updating your bank

2:14:09

account this is possible and you have 240 replicas that are 40

2:14:14

and they execute for example something that is i don't know do a withdraw from

2:14:18

your bank account so they remove 100 euros from your bank account and then

2:14:23

these three replicas that are correct they do not see that you remove 100

2:14:26

euros okay in this case you are lucky because

2:14:29

you know you are 100 euros more but you can

2:14:33

imagine that there are a scenario in which this can be really problematic

2:14:37

right because it's possible that this replica do some action in the real world

2:14:41

and they have to be consistent and there is someone that is doing the action and

2:14:44

someone that is not and this is a parent that can create the

2:14:49

problem so what we would like the the stronger thing we want is some

2:14:55

kind of agreement that also involves the process that are 40 right

2:14:59

because what how we fix this well we have to modify the agreement property

2:15:04

and we have to say an agreement property in which we say okay if someone is 40

2:15:08

and receive a message then this message has to be seen also by others

2:15:14

this is what we want do you think that is possible if they

2:15:17

say okay process 1 is 40 receive message 4 and they say okay okay i want that

2:15:23

also pdu that is 40 us to see message 4

2:15:28

do you think that is this is something we can implement

2:15:31

so i say process 1 is 40 and deliver message 4 and i want to create a

2:15:36

primitive in which even if there is another faulty process pdu also has to

2:15:40

deliver message for do you think that this is possible or not

2:15:45

intuitively is it clear the question

2:15:50

okay so i have process 1 deliver message 4 is

2:15:55

40. so it will crash i have process 2 that also is 40 and i also want to force

2:16:00

process you to deliver message for is it possible to implement something like

2:16:04

this or not no

2:16:08

no it's not possible because i can have an execution like this i have process

2:16:12

one and process one deliver message four

2:16:17

at 2 pm this is possible and then i have process

2:16:21

2 that is 40 and process 2 crashed at 11 and this message was generated by

2:16:29

process 0 at 1 pm so was generated after the crash

2:16:34

of this process so it's impossible that this process delivers it because it died

2:16:38

before the message was created so it's really impossible

2:16:42

and so the only thing that we can do the only specification that we create is

2:16:46

something like this i have a 40 process and these 40 process deliver message m4

2:16:53

which process can also see m4 a correct one

2:16:58

so i can say okay if a 40 deliver a message m4 then i want that all the

2:17:03

process that are correct all the replicas that are correct will

2:17:08

also see m4 in the fusion so what i'm saying is that the correct

2:17:14

will see all the messages in the system the 41 can only see a subset of them a

2:17:21

subset of them and this fixed the problem of the replica we were

2:17:24

discussing and this property is called the uniform

2:17:29

agreement and when we have something that has the first three property

2:17:33

validity no duplication no creation and the uniform agreement is called

2:17:39

uniform reliable broadcast the specification of the uniform

2:17:43

reliable broadcasts is this one if a message m

2:17:47

is delivered by some process correct or faulty so we do not care someone

2:17:52

delivers the message then eventually this message will be

2:17:56

delivered by every correct process and so this implies if you think about

2:18:02

it is not hard to see that the correct process the green one

2:18:07

will see everything and the red one can only see a subset of

2:18:11

the messages that are seen by the green one okay

2:18:15

and so this is the uniform reliable broadcast and we will

2:18:20

see the algorithm in the next lecture and we will do now exercises

2:18:26

so there is one thing that i want to specify before starting with some

2:18:30

exercise is the word uniform here so uniform we will see this word used a

2:18:38

lot so there are several algorithms in which

2:18:42

we have the non-uniform variant that is regular reliable and then the uniform of

2:18:47

variance okay uniform means that the agreement

2:18:50

property also works on the process that are false

2:18:54

okay so when you see an algorithm as the word uniform inside

2:18:58

you have to think oh it means that the agreement property is also specifying

2:19:03

the behavior that the faulty process have to fall

2:19:07

in the regular reliable broadcast if you go back and you see the agreement is

2:19:11

non-uniform there is no uniform here and is written just if a message m is

2:19:16

delivered by a chord and so only enforce a behavior on the

2:19:20

corner there is also another meaning that

2:19:25

uniform us in distributed computing is different from these sometimes

2:19:30

uniform is used to indicate algorithm that do not need to know the sides of

2:19:34

the system they are called uniform because they work for system of any size

2:19:38

okay in our entire course uniform always

2:19:42

means that the agreement or some other property involves the force

2:19:48

so this okay so now now let's let us do some

2:19:54

exercise okay i will shut the screen

2:20:08

okay from home can you see the screen can you see the screen for more

2:20:15

the screen hack okay

2:20:20

so uh let us do some exercises on the old

2:20:24

topic so we are sure that we we are all on the same page the first

2:20:28

exercise is this one is on clock synchronization

2:20:34

so the exercise says you have to review to peer review peer review means that

2:20:39

you have to read the algorithm and decide if it's correct or not it's

2:20:42

something that you do with algorithm with algorithm we don't trust people

2:20:45

when someone creates an algorithm no one trusts it this algorithm is sent to

2:20:49

several experts they review the algorithm and then they tell okay

2:20:52

probably it's fine for me and then it gets published then people continues to

2:20:57

check the algorithm it happened that there was a famous consensus algorithm

2:21:00

that was published in 2011

2:21:04

and then they discovered that it was wrong in 2020 something like that okay

2:21:09

so 10 years after it happens it happens unfortunately

2:21:13

so you have to preview a synchronization algorithm for arbitrary graphs

2:21:17

the main myth so the the the concept of the algorithm is this one you take the

2:21:22

clock of all your neighbors so you ask to everyone what is your clock what is

2:21:26

your clock what is your clock you ask then you compute the average of the

2:21:30

clock and you set your clock to this value

2:21:35

so now the question is is there something wrong with this strategy so

2:21:39

you have same clock synchronization do you think that this strategy is okay or

2:21:43

not so do you understood the strategy we are

2:21:48

a node in the graph we want to synchronize our clock with other people

2:21:54

so what we do we ask to everyone what is your clock what is your clock what is

2:21:58

your clock we do the average the average means this one

2:22:04

and then we set our value to this clock is it a correct synchronization

2:22:09

algorithm or not or there is something wrong

2:22:20

yes that is so yes there is something wrong with

2:22:23

this strategy do you remember clock synchronization i said you can always

2:22:27

jump your clock in the future you can never jump your clock in the

2:22:31

past i mean it's okay if you are at 12 and then you want to set your clock at 1

2:22:36

pm this is fine but if you are 12 and you want to set your clock as 11 this

2:22:40

gate a problem because we have seen security issue whatever

2:22:44

if i do the average of the neighbor this can create a problem because my clock is

2:22:48

1pm this is a 10

2:22:51

10 a.m this is 10 a.m this is 10 a.m this is 10 a.m when i do the average the

2:22:57

average you know of 10 is 10

2:23:00

and then i i should have set my clock in the past of two hours so not 12 not 11

2:23:05

but 10 and this is really wrong okay yes the slider will put the slide on the

2:23:10

website so wait i have to first do okay

2:23:19

and so this is the explanation so it's a terrible idea let's say that

2:23:24

my clock is three and the clock of my neighbors are two two one and three the

2:23:29

average is two so they set me my clock from three to two that is wrong okay

2:23:34

so it's wrong and now this is an exercise of vector

2:23:39

clock so here you show you you have an execution you have to apply the vector

2:23:44

clock to each event and you have to identify the false statement

2:23:48

this we know how to do it this we start with zero zero zero

2:23:52

zero zero zero and we compute all the vector clock so the solution i will

2:23:57

upload on the website you first compute all the vector clocks those are the

2:24:01

vector clock when you compute the vector clock you check the events so let's

2:24:06

check with the e1 and the e2 the clock e1 is 2 0 0 0 the clock of e2

2:24:14

is one one zero zero they are not comparable why q is greater than one

2:24:20

zero is less than one and so it means that i cannot find which

2:24:24

one is greater they are not comparable so it means that e1 is concurrent with

2:24:29

e2 so the first statement is false let's look at the second statement e1

2:24:36

happen before e3 the clock of e1 is 2 0 0 0 the clock will of e3 if it is

2:24:42

everything correctly should be four four four three

2:24:46

q is less than four zero is less than four zero is less than four

2:24:51

zero is less than three and so yes it's true this happens before

2:24:57

let's look at the last one e2 before e3 the clock of e2 is one one zero zero the

2:25:03

clock of v3 if i did correctly four four four three one is less than four one is

2:25:09

less than four zero is less than four zero is less than three yes this happens

2:25:14

before the other okay this this this exercise are just mechanical this you

2:25:19

just have to write the clock and whatever

2:25:30

maybe okay so so they are asking there will be

2:25:34

an exercise like this at the exam maybe okay

2:25:44

excuse me so nothing i will write

2:25:50

so let us let us uh see this other exercise

2:25:55

this is a bit difficult so you say in the vector clock

2:25:59

we are assuming that each process knows the number and the id of the other

2:26:04

process so when you do the vector clock you assume that you know the sides of

2:26:09

the system so you know n and you create a vector of n component

2:26:13

and one component for each process that is the output right and then you

2:26:17

increase the event when you create you merge the clock and whatever

2:26:22

assuming that you do not know how many process there are in the system

2:26:27

and initially you do not know the idea of all the others so initially you are

2:26:32

in this in a system and you know do not know how many

2:26:35

processes there are so you do not know n and you do not know

2:26:39

the idea of the process because if you know the idea of all the process then

2:26:42

you also know n because it is obvious can you implement

2:26:49

something that is similar to a vector clock

2:26:52

could you write the code what is the big reality of the special vector clock

2:26:56

associated with two events that are compared

2:26:58

so let us start with the first one let's say that you are in a system

2:27:05

so you are a process you wake up in a system

2:27:08

and you do not know about the system so you don't know how many process there

2:27:12

are you do not know the idea of the other do you think that you can

2:27:15

implement something similar to the vector flow

2:27:18

and how do you do it yeah

2:27:24

no you cannot do a broadcast because to do abroad because you have to know

2:27:27

everyone before okay but what are the vector clock the letter

2:27:32

clock are an array and in each location of the array

2:27:37

each location corresponds to an id and in each location i have a number of

2:27:42

events right that that it's a vector probe

2:27:46

so again yes no

2:27:50

no no so if we have a vector so we cannot

2:27:54

use a vector because for using a vector i have to i

2:27:57

need a fixed size okay and so if i cannot use a vector i have

2:28:03

to use another data structure right especially i have to use a data

2:28:07

structure in which if i see that id3 exists

2:28:10

i must be able you know to write something on the location for id3

2:28:17

not really a list there is something addiction

2:28:21

so i can use a dictionary an ashma whatever so i started with an empty

2:28:25

ashmore if i receive a message from process one i know that process one

2:28:30

exists and i write in the arsenal of process one you know the the the

2:28:35

vector clock of the the time stamp of process one

2:28:38

when i have to send messages to other people i send the ash

2:28:43

and how does it work if there is even ashma from someone i check oh this

2:28:47

someone knows someone that i do not know so if in the ash map of the guy that i

2:28:52

receive let's say that there is even ash map and this ash map contains process 5

2:28:57

i do not know about process 5 but process 5 must exist because it's inside

2:29:02

this hash map what i do i put 5 inside my hash map and i copy this value right

2:29:06

here is the same thing of the vector clock in the vector clock when you

2:29:10

receive a component that is zero when you have a component that is zero

2:29:14

and you receive a vector clock that has the same component that is eight you

2:29:17

copy eight right it's the same thing if i receive an ash

2:29:20

map in my ash there is no such component because i do not know that exists

2:29:25

that is equivalent to say my component is zero i receive an ash map that

2:29:30

contains eight in that component i just copy

2:29:33

and that's it and then the rule you can imagine the

2:29:38

rule is the same when i have to do something locally on myself i just

2:29:42

increase my location in the ashmole right

2:29:45

three my ashma i see an event i just do increase three in the arsenal and then i

2:29:50

send this hashmap around and so that's it

2:29:55

this specifically implements something that is equal to the vector clock even

2:29:59

in a system in which you do not know the sides

2:30:10

the list i do not understand the list how you do it

2:30:14

so in if in the list you put pairs i understand space i mean id number of

2:30:19

events otherwise i do not understand because

2:30:22

the this will change sides so if the size for me is different from

2:30:26

the sides of you two different index on the list can be two different people you

2:30:30

see my point okay so if in the list you put bass id

2:30:35

and then we simulate an ash map yes you can but you are just simple okay you see

2:30:40

my point okay you're well

2:30:43

and so so this is this is the the first

2:30:48

question the second question asks you what happens if you have two vector two

2:30:52

of this kind of vector clock for two events that are concurrent

2:30:58

what happens is the same thing that happened with the vector clock so we

2:31:01

will see that we have a nash map for the first event

2:31:05

and we have an ash map for the second event what happened is that for each

2:31:09

component we have that there will be you know no comparison so

2:31:13

there will be a component here that is greater than a component here or what

2:31:17

can happen is possible that there is a component that exists here one and dr

2:31:22

does not exist in this case we imagine that the value here is zero because it

2:31:26

does not exist so it means that you do not know about this process so it means

2:31:31

that is as if in the vector clock you have zero right there

2:31:36

and so this is the question and this is the the solution

2:31:41

this is the solution another question on the vector clock

2:31:46

so in the vector clock we increase before sending the vector clock so when

2:31:50

we generate a message i increase my location and then i send the vector this

2:31:55

is the algorithm the standard output is increased before

2:31:59

so the question asks you this one what happens

2:32:03

if you modify the rule of the vector clock as follow

2:32:07

when pi send message m create an even send n type stamp with the vector clock

2:32:13

and then increase the vector clock so you increase the vector clock after the

2:32:17

set so like this i started 0 0 0

2:32:20

when i send my first message i attached 0 0 0 and then i increase immediately

2:32:26

after so increase 1 0 so increase after i send the vector okay

2:32:35

you crash i mean you crash we are assuming that the system does not

2:32:39

capture no questions so vector clock no catch so you increase

2:32:43

after you send the vector clock when you receive the vector clock

2:32:48

you use the usual algorithm of the vector

2:32:51

block so you take the mass momentum so the only difference is that you when you

2:32:55

send your event your event will update the vector clock

2:32:59

later so you do not send one zero zero zero okay

2:33:02

my first vector clock will be zero zero zero so i do not increase

2:33:07

so do you think that these algorithms still preserve the probability of the

2:33:10

vector clock or it breaks the vector probe

2:33:15

is it clear what is happening what is happening is

2:33:20

when we send a certain vector clock we increase it

2:33:24

after so we send the vector clock without the increase

2:33:32

yes you increase after so if you send the second message you will send yes it

2:33:37

will be different because you increase it but you increase after not before

2:33:41

not before sending okay so it means that someone can see a vector block that is

2:33:45

zero zero zero that takes it from you while in the other things was impossible

2:33:50

because the first vector talk that you sent you know as a component equal to

2:33:53

one i do not understand it may happens that

2:34:02

another process send another clock yes so it can happen that two

2:34:07

q process send a message concurrently and this new message will have the same

2:34:12

vector clock with zero zero this can happen okay

2:34:15

this is what you were asking sorry yeah that's it yeah

2:34:20

yeah so this can happen so it means that if we compare this vector clock there

2:34:24

will be a concurrent event right because no one's wins on the other

2:34:28

but what was happening if i was increasing

2:34:31

if i was increasing what's happening something like this right because there

2:34:34

are two different process the events are still concurrent right

2:34:39

so this case is okay so do you think is a problem or not

2:34:44

after you have seen this this case that was the

2:34:48

bad case well it's not a problem this was the

2:35:06

only possible problematic case why because the only thing that i'm doing

2:35:10

with this rule is to sending a sequence of vector clock that is one less

2:35:16

that the original sequence so if the original sequence of vector clock that

2:35:20

takes it from me is 0 1 0 and then q 2 3 and then i don't know 2 4

2:35:27

5 then it means that with the new

2:35:29

algorithm i sent 0 0 0 i send 2 1 3 and i send 2 3 5

2:35:36

but also all the other one in the system do the same thing

2:35:41

yes there is only a shift of one in my component but this shift of one in my

2:35:45

component will be a shift of one in the component of any other process right

2:35:49

so if they were comparable before they will be comparable also after because

2:35:54

they are all shipped and so

2:35:57

no it's not bad okay prof can ask something

2:36:02

yes can it happen that you receive two

2:36:05

completely different clocks i mean like one that's greater let's say

2:36:09

by two instead of one because maybe those two processes have never

2:36:14

communicated with one another sorry could you could you tell me the

2:36:19

director plot specifically let's say

2:36:24

let's say you see something that's uh so you were explaining that they only

2:36:29

shift by one in the previous case but can it happen that maybe

2:36:34

two processes i've never like found each other before

2:36:39

so that like one is shifted let's say about two uh executions you know one

2:36:46

no okay

2:36:49

maybe i understood what to say is it possible there is an execution in which

2:36:53

this is shifted by two in the past instead of one no because the only thing

2:36:57

is that happen with respect to the previous algorithm is that every time

2:37:01

you send in the previous algorithm you were increasing by one immediately here

2:37:05

you increase by one after but does not change everything

2:37:08

anything so it is it still should work okay

2:37:12

okay thank you you are welcome

2:37:16

and so now let's see

2:37:23

this is a bit difficult let me see if i have a little more simple okay

2:37:28

let's do this one the other one is a bit too difficult for now that we are tired

2:37:32

so consider consider a synchronous perfect point-to-point link so it's the

2:37:37

perfect point-to-point link that we were using for the failure detector if you

2:37:41

send and you are correct everyone receive the message by delta

2:37:46

and consider a channel that can also lose at most k messages so his

2:37:50

synchronous is perfect but he can lose k messages so if you send k messages you

2:37:55

can lose them if you send k plus one messages one for password can you build

2:38:01

a failure detector on it do you you say yes so here from from

2:38:08

here they are saying yes vermont so do you get the question you have a

2:38:11

synchronous perfect point for green that can lose at most k messages can you

2:38:15

build a perfect video detector yes

2:38:21

yes you can why you immediately send k plus one messages k bus one ping and one

2:38:26

pin goes okay so yes and what if the number of messages that

2:38:31

can be lost are unbounded no you cannot anymore

2:38:41

why because if the number of messages that you can lost are unbounded then you

2:38:45

can never reply because you you know you lose

2:38:49

a lot of messages and whatever delay it is

2:38:53

we break the delay so it becomes a because it's possible that i want to

2:38:58

send a message here but i cannot ensure that the message will be received by

2:39:01

time delta because this message is lost and so i lose an epsilon to send a new

2:39:06

message this message is lost so i lose an epsilon to send a new message and

2:39:10

this message is lost whatever that i can use an amount of message

2:39:15

x such that x multiplied by epsilon is greater than that and so the timeout

2:39:19

breaks so the links become asynchronous so i cannot

2:39:23

in the first case i can because i can bound epsion and they say okay i imply

2:39:28

employ one minute to send a message and so if the delay of the channel is delta

2:39:33

i say okay delta that is 10 minutes delta plus k plus 1 means let's say that

2:39:39

k is 5 delta becomes 16 minutes but still i can

2:39:44

okay because i just have to send the message

2:39:46

again and again and now the last

2:39:51

five minutes there is this one that seems art but it's really easy

2:39:58

it seems hard but it's really easy it's an algorithm as the immediate delivery

2:40:03

property if it immediately deliver the message received to the upper layer so

2:40:09

i have a link algorithm i receive a message from the lower layer i

2:40:14

immediately send it to the upper layer okay this means immediate delivery that

2:40:18

a message does not weigh wait in a queue when arrives i do some computation and i

2:40:24

can immediately send it at the upper left

2:40:27

the perfect point to point fifo link that you have seen reported in the next

2:40:32

slide does not have this property the fifo

2:40:35

y does not have the property because if i receive message three

2:40:39

and they have not seen message two i have to wait right because i send the

2:40:43

three only after i receive two as a matter of fact it's possible that a

2:40:50

message stays in the pending set for an unpredictable amount of time before

2:40:55

being delivered and this is also true because i have three in the delivery set

2:40:59

sorry in the pending set i want to deliver it but i have to wait for you

2:41:05

can you implement on top of a perfect channel a version of fifa that does the

2:41:09

immediate delivery property so what do you think

2:41:15

no i i agree but think really carefully

2:41:21

about it so what happened is that we have the

2:41:24

sender right and you say the sender send one

2:41:27

send the two and send three and then this guy receive the first

2:41:31

three and then we receive two and then receive

2:41:35

one okay and now your argument will be at this point okay if i receive three

2:41:38

now i have to wait for two and one this is the argument okay and you say no

2:41:44

it's impossible because i have to wait for two and one

2:41:50

and why you have to expression because you do not know about q and one

2:41:54

right okay but when process s is sending three

2:41:59

process s knows about one and two right because this is the source

2:42:04

and so if process s sends to you something like this

2:42:11

so he sent a list of all the messages sent in the past

2:42:16

so he sent a list that contains message three

2:42:19

message two and message one you receive the list you have to wait

2:42:24

no you don't have to wait because you look at the list you say oh i was

2:42:28

waiting for one and two so i deliver one then i deliver two and then i deliver

2:42:33

three it is art

2:42:36

no okay

2:42:38

so it seems hard but it's really easy so what is the and now i say discuss

2:42:44

what are the advantage and disadvantage of the normal fifo

2:42:49

what is the disadvantage of this strategy

2:42:54

yes yes

2:42:58

the disadvantage is that i need an infinite amount of memory also on the

2:43:02

channel because every time i send a message i send all my entire history

2:43:07

so this is really you know something uh wasteful wasteful but here we assume

2:43:12

that there is no bound on the on the

2:43:17

bound on the bandwidth of the channel okay that you can send infinite messages

2:43:22

and so you can you can okay

2:43:25

and so yes flower you send a list you send the

2:43:28

list of your entire messages to send when you receive the list you can

2:43:31

immediately send whatever the upper layer because you have the missing

2:43:35

pieces okay so now if there are questions i

2:43:38

will take some questions otherwise we will see each other

2:43:41

uh on wednesday

2:43:46

right is wednesday on wednesday from from

2:43:49

three sorry no it's for two two to four

2:43:54

right yes two to four so see on wednesday two to

2:44:03

four have a nice day bye have a nice day

2:44:26

a



#### Lezione 6
  
Gemini

0:07/1:58:27

0:27

[ __ ] solve it

1:54

you okay

3:08

energy okay so let us start for the lecture

3:52

today so last time

3:56

we have seen the perfect failure detected

4:00

and the perfect failure detector is a module that we can construct in a

4:04

synchronous system and allow us to detect failure in a

4:10

complete that means to detect everyone that fails

4:15

and precise that means to not detect as failed

4:20

someone that is not way

4:26

however the system in which we have to work is not always synchronous we have

4:31

already seen that in the asynchronous system

4:35

creating a fellow a failure detector it is impossible

4:39

and so now the question that remains open is what we

4:44

can do in a system that is partially

4:46

synchronous let us remember partially synchronous

4:50

is equivalent to event racing it turns out that in this kind of system

5:02

we are able to build something that behaves

5:07

as a perfect failure detector when the system stabilizes

5:13

so when the system stabilizes i mean when the eventually perfect synchronous

5:19

inventory synchronous system sorry reaches the synchrony point let us

5:24

recall the definition of eventually synchronous system is a same system in

5:29

which we have certain delay and the delay can be unbounded so there

5:34

can be as increment bound and then there is a time after which

5:38

the system becomes synchronous and the delays are always below a

5:45

certain bound b so what is the problem

5:50

one of the problem is that of course before time t

5:55

since the system could be asynchronous

5:59

we have no way of creating a failure detector so

6:03

whatever will build in this time period

6:07

will behave in a wrong way and that is something we have to accept

6:11

we cannot change however even when we are in the

6:16

synchronous part of our system

6:20

there is a problem the problem is that this bound b here

6:25

is unknown y is unknown well because

6:33

the definition of eventually synchronous system is that there exists a time after

6:37

which the system becomes synchronous but does not specify a bound on the

6:43

delay of the channel and so this is something we can we can

6:47

solve we will see that we can solve we can still build something

6:51

that after a certain time t that is not to the same t

6:56

of the system will be

6:59

as a perfect failure detector and what we will build

7:04

is called eventually perfect failure detector

7:08

so the diamond ear this is the symbol is diamond p this is

7:12

a diamond this is a kind of square

7:17

diamond in temporal logic means eventually okay so it's diamond p

7:21

because it's eventually perfect and so what we do to build this kind of

7:28

failure detector is to trade off the notion of perfect detection of a

7:35

crash and with the perfect failure detector we

7:38

have the perfect detection of a crash when someone crashed

7:43

and the perfect failure detector says detected we know that is that

7:49

in an eventually synchronous system we need

7:52

the concept of suspicion that is we suspect

7:56

that someone is crashed and this suspect will change i mean you

8:02

can i can suspect process p1 and say that process p1 crashes because

8:07

the system is asynchronous and the delay you know

8:11

are unbounded and then after a while the system

8:14

synchronized i start receiving the packet from p1 and they say oh no p1 is

8:19

actually that and what i have to do is to restore p1 to say oh p1 is not

8:24

actually that is alive and so let us see the formal

8:28

specification of the inventory perfect failure

8:32

detector diamond p so we have our usual box

8:37

and this box provides us two events a suspect event of a certain process pi

8:43

and a restore event of a certain process pi

8:47

remember here this pi is just the id of a process

8:53

so in this case both event are indications so they mean they come from

8:57

the lower layer to the upper layer so the failure detector never receive

9:02

anything it always give information but does not

9:05

take information from the upper layer so what is the semantic of the suspect

9:13

event the semantic is notify that process p

9:18

is suspected to have crash suspected it it means we do not know

9:24

for sure that if it's pressured or not because if we are in the asynchrony

9:29

period of the eventually

9:33

synchronous system we cannot know and there is also another kind of event

9:38

that is restored and this event notifies that process p

9:42

is not suspected anymore so it notifies that probably you've made a mistake

9:48

and the process is indeed alive now just to clarify something that i

9:54

told you when we have seen the two classes of

9:57

failures that we examine in this course that are

10:00

crash and bytes on time i told you that we do not assume that

10:06

process recovered never okay this suspect in this restore means just that

10:11

you were wrong does not mean that the process crash and then come alive again

10:16

okay in our model when someone crashes crashes forever universal

10:22

on the book there is an entire section on crash recovery system that we do not

10:27

see so let's look at the two properties now

10:31

this eventually perfect failure detective the first property is the

10:34

strong completeness and says eventually every process that

10:39

crashes is permanently suspected by every correct process

10:44

this is exactly the same property of the perfect failure detector so the

10:48

completeness is the same is exactly the same

10:52

and tell us that if someone dies sooner or later you will permanently

10:59

suspect it this is the only difference permanently suspected it means that if

11:04

p2 dies and p1 is correct

11:09

if you dies let me get like also disconnected

11:13

so if p2 dies let's make it in in red

11:18

and p1 is correct let's make it in green there will be a time after which p1 say

11:23

oh i suspect pto and never change idea so permanently suspect

11:29

and now this property is different is radically different

11:35

from the accuracy of the perfect failure

11:38

detector it's eventually strong event was strong

11:42

accuracy and say eventually no correct process is suspected by any

11:47

correct process so let us say that in our system we have

11:51

also p3 we may have that in a finite time p3 suspect p1

11:57

even if p1 is alive

12:01

however this property tell us that eventually if p1 is correct

12:06

p3 has to change idea and as to say no i restore p1 p1 is correct

12:12

and it has never to suspect p1 again okay so now the question that i have for

12:18

you which one of these properties is a is the safety one

12:28

are you sure yes they're both liveness so

12:32

i posted the question to make people you know mistake i said which is the safety

12:38

no one is they are both liveness property why because you cannot violate

12:43

them in front of time so to violate this thing you should

12:48

suspect someone forever suspect are correct forever that means

12:53

forever so you cannot violate in a finance time

12:56

sorry you should not suspect a crash forever that is

13:00

not possible in finance time to be outlawed this one you should

13:04

suspect a correct forever that is also not possible in finance time okay so

13:08

they are both liveness property now a process can be suspected

13:13

uh an infinite a finite number of times

13:19

i mean you can suspect restore suspect rest or suspectorists too

13:23

okay so you can suspect someone several times there was a question for

13:28

me now there is something that i want to

13:33

to stress if you look at these two properties

13:37

together they imply

13:40

that the set of suspect the set of suspect means here you

13:45

suspect someone and you receive an even suspect one and we start creating a set

13:50

suspect one we put one then we suspected you we put two

13:54

then let's say we restored you it means we removed you from the set then we

13:58

suspected you again this is possible we put two in the set and so on so this a

14:03

suspect set on a process changes is oscillating and growing and shrinking

14:07

whatever however if you take these two properties

14:11

together and we will prove it this property implies that on the set of

14:16

correct process the suspected set stabilized to the same

14:21

set so eventually after some time if p1 is

14:25

correct let's make it in green p1 is correct

14:29

and this is the suspected set of t1 and it contains one two and three sorry it

14:34

contains two three and four and we have that p5 is also correct and

14:40

this is the suspected set of five

14:43

then we have that eventually these two setup to become equal so they have to

14:47

contain two three and four and they can never change

14:51

why because

14:53

any if there exists a correct process then eventually has to disappear in the

14:57

set this is the property that tells us that the correct process eventually

15:02

disappears from the set of every quarter and these tell us the tool the crashed

15:07

process eventually appear forever and they are never restored in the set of

15:11

all the correct process and so if you take these two things

15:15

together it's easy to see that the set of suspected of the correct processor to

15:21

stabilize so i'm using the the the word stabilize

15:27

by stabilizing in this kind of algorithm i mean that you can change idea

15:31

affinity number of times but after a while you fix on a value that means you

15:36

become you fix on a certain suspected set and you stay there and from that

15:41

point on the algorithm stabilize it okay this is a different stabilization time

15:47

than the one of the eventually synchronous system is entirely possible

15:51

because we have two different times we have the time at which the system

15:55

will work on stabilizers so the delay of the system stops you know being abounded

16:01

and then we have the time at which the algorithm networks on top of the system

16:04

stabilize of course they are different of course they are different

16:09

i mean there could be cases in which are the same but in general they are

16:12

different and so this

16:16

is what i was telling you about the stabilization of the set of suspects

16:22

and now what is the strategy of this eventually perfect failure detector

16:28

well this is still a failure detector and what is the strategy that we use in

16:34

a failure detector ping and phone so this is still the strategy that we

16:38

have to use ping pong there is no no way around it you cannot do more

16:44

but we are in a system and it is eventually synchronous so this event

16:48

very versatile works in an inventory synchronous

16:52

so what he means let me about slide with a bit of space this one

16:56

what what it means is that the system does

16:59

like that i already did it but let's do it again there is a bound here that we

17:04

do not know and the delay of the channel does like

17:08

that and then after time stabilize under the bound forever

17:14

and we want to build something that becomes perfect here

17:18

so what is the strategy the only strategy is ping pong right

17:23

so i have to ping someone then i have to wait

17:27

a delta and then i if i receive the response by delta i i

17:31

say okay it's alive if i do not receive it let's do it here

17:35

then i say here i do not receive it i say oh suspect probably is that

17:42

the problem is that i do not know the bound here right because i do not know

17:46

the bounds so even when i reach this period

17:49

how do i do i do i pick this delta so what is your idea because what is the

17:54

problem if i take a delta that is below you know

17:58

the real bound then i suspect people so what is your idea if i ever if by

18:04

lucky i think i take a delta that is above i'm fine

18:09

i mean i will be slow but i'm fine the problem is if i pick up delta below

18:14

so what is your idea if i pick a delta below and it's possible that i pick up

18:18

the delta below because at the beginning if i do not know what is the thing that

18:24

you we as human have to do we have to guess right if you don't know something

18:29

an answer you guess and you say okay if i'm lagging i'm lucky i'm definitely not

18:33

so i have to guess the desk at the beginning let's say i guess five seconds

18:37

and the delay of the system is 10 seconds so what will be the strategy

18:43

how do i recognize that my delay is too low

18:54

perfect so here the answer they say you get a phone after the timeout expires

19:00

and that is the perfect answer and what you do when you get a point after the

19:04

amount expires with the delta you know that the delta is too low so what is the

19:08

only thing you have to increase it right

19:11

and how many times you can be wrong a finite number of times right because i

19:16

increased by one so by five i go to six then i'm low again i time out i say oh i

19:23

see the the request after the timeout and i increase again seven right even if

19:29

i do not know 10 you know after a bit of increase i reach 10

19:33

and i'm okay i will stop it forever even if i do not know see i do not know the

19:38

real threshold but i stabilized to the real thresh

19:42

of course in this example i was just increasing by one

19:45

if you're increasing if you increase by two you stabilize above the threshold

19:49

but that is still fine i mean we do not have optimal

19:53

performance who has where we are correct okay we do

19:57

correctness not performance

20:01

so from home they say you calculate the difference you cannot because we do not

20:04

know b and so this is the

20:10

strategy so use timeout to suspect process that

20:14

do not send expected message if a suspect is wrong then you say okay

20:20

i suspected someone but is alive and then you restore it and you increase

20:24

your timeout because you say okay i did a mistake

20:28

and eventually you know you do not change anymore because you

20:32

reach the bound of the system and if someone is really dead

20:37

then you know it will never answer to the thing and so eventually you suspect

20:41

it forever so this is the strategy and this is the algorithm so the

20:46

algorithm is really similar to the perfect failure detector so

20:51

one complaint that i hear from a student was oh there are a lot of algorithms

20:56

there could be a lot of algorithms but there are one the variant of the other

21:00

okay so if you know the perfect serial detector you just have to add three

21:04

lines and you get the event or reverse exterior detector so the important thing

21:08

to remember the algorithms i don't remember this algorithm by

21:12

you know by line by line i just remember the strategy and then if i reflect the

21:16

ten minutes i'm right to i'm able to write the algorithm okay this is the the

21:20

trick so you have to remember an algorithm then you remember the strategy

21:24

to create you know difference and it's fairly easy

21:29

okay maybe not so easy but is manageable okay

21:35

so let us see the algorithm in details so when you start

21:40

we have the alive set that is capital pi the set all the process

21:45

then we have suspected that his empty notice that in the perfect detector was

21:51

detected now is suspected because it's possible that someone is suspected and

21:56

then he's actually alive and you have to remove it so this is a bit of a change

22:01

the name of the set then we have delay and initially it's

22:05

delta where delta is a random value that you pick you can be 10 again b5 it

22:10

depends we just put delta and we don't care it's a number

22:14

then you start a timeout of delay this is exactly the same initialization of

22:19

the perfect the only things that change is the name of this set

22:24

what happened when you timeout so for for now i skipped this when you time out

22:29

you go on all the sets of processes and you send a pin

22:33

and you stand up so you go on the entire set and you send a pic

22:37

you set alive to empty because why you have to see the reply and you populate

22:42

alive equal to the perfect field and you start the payment

22:47

someone receive your request it applies when you see a reply you put to the

22:52

processing alive so now let's make a run let's say that

22:57

we have process one here and we have process two here and

23:02

process u is alive and you know a correct process we send a ping

23:09

so we send a ping at this point right here we remove p2 from alive

23:13

and the the power delta is this one and requests delta and the request of

23:19

ptu you know is three the response of pto is really late

23:23

we are in the asynchrony period or our data was was less than than b

23:28

so what happened in the execution i remove p1 from alive at this point i

23:32

send the request it replies i do not receive the request i will trigger again

23:37

timeout at this point i trigger again timeout

23:41

this handler here i am seeing if there is a process that is alive and

23:46

unsuspected this means is just a fancy way to say

23:50

there exists someone that is alive and was also suspected

23:54

if so we will see in the algorithm you have to

23:57

increase the delay why because there was someone that you suspected as dead then

24:01

you received the point and you say oh i made a mistake can you increase the

24:05

delay okay then we go here if there is

24:11

no one if there is a process that is nothing alive and not suspected and is

24:15

this case right here because at this point there is ptu

24:20

that is nothing alive and nothing suspected so i put p2 in suspected and

24:24

they trigger suspect this part right here is equal to the

24:28

perfect failure detector just the name of the set are changing this part is new

24:33

because now it starts the new delta and i send again a pin

24:38

and i can receive look i can receive two ping in this that

24:42

why because i received the old one and the new one i don't care this is just a

24:45

set i put it just once okay at this point they trigger where is the

24:50

point so at this point they trigger the delta

24:53

and they see now that there is someone in alive q

24:56

y because at this point they put string alive and there is someone in suspected

25:00

and who is the one in suspected you also so what i do when i do the timeout

25:05

agreeing i increase the delay by delta delta the unit of time is one

25:10

second let's imagine so the delay now become two sales

25:14

and then i trigger this f here when i examine these things for p2y

25:20

because p2 is in alive but he's also unsuspected what does it mean it means

25:25

that p2 is alive but at least was alive so and i probably made a mistake

25:31

so i remove video from suspected and i send to the upper layer look you have to

25:36

restore with you my friend because probably i made a mistake okay at this

25:41

point i made a mistake i flagged ptu and petey was probably alive okay

25:47

does everyone ask question on the algorithm do we have questions on the

25:52

other here so okay

26:01

so you don't have question on the other sorry

26:09

so the algor this algorithm starts working after the system stabilize

26:14

is is true after the system stabilizes why before the stabilization time t

26:20

whatever delta increase you know the adversary can create a delay that is

26:24

greater but after a while is fixed against okay

26:27

so the first question that i have for you

26:31

is it possible that i see this algorithm you tell me that initially delta is one

26:36

i see the algorithm and they tell you oh the delta cannot grow above 100 seconds

26:43

do you trust me or not why

26:52

before t yes that is the quest that is the reason

26:56

because before t the delay is unbounded of the system

27:00

so the question is can i bound the delay that the algorithm will reach no i

27:04

cannot because before t when the system is

27:07

event or synchronous the system it can be a synchronous right so it's possible

27:12

that whatever delay i decide the adversary you know make me increase by

27:16

one and then there is another period in which i make a mistake and then increase

27:19

by one again again again i can trespass any thresh

27:23

however these things is bounded so the delay cannot grow at up

27:29

to infinity why because there is a time of time after which the systems

27:33

synchronized and this is the first things so the performance of this

27:37

algorithm are not really good why because it's possible that your timeout

27:41

becomes really one hour or so okay but we do not care about performance then if

27:46

you are a bit you know smart you can understand that after a while you can

27:51

start decreasing the delay and then you can do a a game like that there is an

27:55

exercise that you can do if you like this kind of musician

28:00

the second question that i have is this one

28:04

uh let's first see the proof let's first see the proof and then i i i will do the

28:09

question so the strong completeness so let's

28:12

let's go back at the stronger completeness prove it

28:16

on competence property eventually every process that crashes is permanently

28:20

suspected by every correct process we have to show that this algorithm

28:25

implements strong completeness the proof is really trivial it's tree line

28:29

if a process crashes it will stop to send the messages

28:33

this everyone agree therefore the process will be suspected

28:38

by any correct process and no process we reside will revise its judgment why

28:43

if you're 40 you send a finite number of messages your process still if you send

28:48

off a time of messages this thing can be triggered for a finite time on another

28:52

process process one so it means that after a while process one will suspect

28:57

you for that strong completeness

29:01

the strong accuracy the strong accuracy also is easy for this algorithm

29:05

and the strong accuracy we prove it after the time t why before the time t

29:10

we don't have guarantees the system is asynchronous after time t the system

29:15

becomes synchronous that is after the time a message sent by

29:19

a correct process p to another one q will be delivered with it within a

29:24

bounded time that is a time maxi delay unknown to us do not know max delay but

29:29

we know that there exists if p was wrongly suspected by q then q

29:34

will revise his suspicions why because you receive the pin you start receiving

29:39

the moreover q increases its delay if the

29:43

new delay is less than max delay eventually q suspect against p why

29:47

because you have a timeout that is less than the delay of the channel you

29:51

timeout you do not receive the pin you execute this thing right here eventually

29:56

if you execute this thing you increase you correct again your delay you

30:01

increase it so after a finite number of errors the

30:04

delay of q will be greater than two or two times max delay that is a round trip

30:09

okay when is greater than the two uh two

30:13

times uh that two times the the time the

30:17

the delay so a round trip time you will never suspect the correct

30:22

process again why because there is enough time to reach it and to receive

30:26

the pin back and so now that we have seen the proof

30:30

let's go back at the algorithm let's say that we have process we have

30:34

this execution we have process one and we have process two

30:42

and process two he had the short side in life so he

30:49

crashes at this point okay and then this time the system becomes

30:53

also synchronous at this time t okay

30:56

so is it possible for this algorithm

31:00

that p

31:03

at some point here says restore process 2

31:07

if it's possible how many times you can do it so is it clear the question

31:12

we have process 1 we have process 2 that dies at this point right here so dies at

31:17

time t one so disconnected let's do it again

31:25

so we have process one we have process two let us make it in red because it's

31:29

full process two crashes at this point

31:32

pressure time t t1 then we have

31:36

a time t of the system and t is greater than t one

31:42

and at this point my my question is is it possible that at some point erp one

31:47

say oh pt restore restore video

31:51

is it possible or not yes why

31:59

yes there could be a message it's possible that this diet right here said

32:03

oh okay something like this how many times

32:06

it can happen just once

32:10

because you say okay this thing again and then says okay uh suspect beat you

32:17

and that's it okay no

32:19

it can happen uh bounded but unknown number of times why you can have a

32:24

message here and then you can have another message

32:28

here but and then you can have another message

32:31

here that you see

32:33

and why this happen because the ping do not have sequence number

32:39

okay when you ping someone when you bring someone you do not attach a

32:43

sequence number so the old ping this is an old pin it's a ping from the dead

32:48

right it's there

32:50

so the ping from the dead

32:53

are just good as a ping from a live one okay

32:57

so the system is asynchronous so you can receive things that were you know one

33:01

years old so it can happen a finite but bounded

33:06

number of times why bounded well because in a finite

33:10

time you cannot send an infinite number of phones so after a while all these

33:15

points you know and if you look in the proof

33:19

i say it will stop sending messages when i was saying the proof i tell i told you

33:24

there is a finite number of message that can trigger this thing right but he did

33:28

not specify if you trigger this thing before or after the bomb okay this in

33:33

the proof i i told you i accounted for this thing

33:37

so this is the the operation that i wanted to make

33:42

let me think about another question on the algorithm

33:56

i have no other question we will see in the slide probably above them

34:00

so now i want to to prove this property i want to group this property on the

34:04

suspected set that was the probability of the stabilization that i told you

34:08

after a finite time the set stabilizes i want to prove this property in this

34:14

lemma because we will use it much later in the lecture when we will see the

34:17

leader election because this lemma will make is really

34:21

easy to prove to do a proof of the video of the leader

34:25

election model that we will see so take two correct process p1 and p2

34:32

and let suspected one and suspected you be the respective suspected set so the

34:37

suspected set of process one and the suspected set of process two

34:41

my claim is that there is a time t stabilization time after which suspected

34:46

one begins equal to suspected two and it will be

34:50

like that forever but this is not important

34:55

so by contradiction suppose exist a p in suspected one but not in suspected two

35:00

why because the only way in which they can be different is that there is a one

35:04

set that has an element more so they're wise you know they are equal

35:08

so suppose that there exists the id one that belongs only to suspect one and the

35:14

id one does not belong

35:17

to suspected then we can have

35:21

two possibilities the first one is that process one is correct

35:25

but then this means that we are violating

35:30

the eventually strong accuracy why because after a time

35:35

process still has to stop to suspect p1 otherwise we violate strong accuracy you

35:40

suspect that correct forever and this is not possible

35:43

the second possibility is that process one is dead and so in this case is

35:48

process two that is right but if someone is dead by the strong

35:52

completeness there is a time after which you suspect him forever and so there is

35:56

a time after which process one has to do like that as to say you know i remove

36:00

process one coming suspect and so do you agree with me that for any

36:04

pay or correct process after a time the suspected set

36:09

this set right here but also the set that i construct with this restore and

36:15

suspect and restore the upper layer will stabilize to the same set on the correct

36:19

process yes

36:36

no no

36:39

why i i mean from here they're saying you can remove

36:43

if i do something like this p minus a life right sorry minus suspected

36:49

okay this creates two i mean

36:55

does not solve the problem i do not know if it can break the album

37:00

does not solve the problem why because the ping from the dead are still in the

37:04

system and the pings from the dead were generated you know before

37:19

you know a counter example it's more more variable that that's 1000

37:23

words okay so there is this one that created three things in the past

37:27

when it was you it was alive and well so you you you send it

37:32

are you all right you're right because it's only reply you

37:36

can only do it just once you're right okay so this is this is true you are

37:41

right the problem is if you can break the

37:44

algorithm let me think no you can't

37:57

you can't break the algorithm because if you suspect some correct

38:01

then it means that you send the poem so it means the thing of the correct must

38:04

be in the system even if you receive it after a while you restore it so yes

38:08

i think it's correct uh

38:11

at least i tried to do the proof in my mind and works i try to do it uh

38:16

you know on your paper but yes nice nice nice nice thing

38:23

beautiful it's also better than the than the sequence number on the beam yes

38:27

thank you okay and so now that's it for the

38:35

eventually perfect failure detectors so there are three questions for mom

38:52

let me read them it will remove it from no if a process

38:58

crash you will never be removed again from suspect so the first question

39:02

the second question of the concept of pong delay

39:05

this is the transition between the synchronous and the singular task and

39:08

what was the question that fleet to it so the second question i do not

39:13

understand that try to make it again in the break the lamborghini they send it

39:17

to work or it processes in the system and there is a time t after which all

39:20

the products the lamb is for all the correct process

39:23

in the system so if i write the lamb and they say take

39:26

two correct process p1 and p2 then it means that all the correct process in

39:30

the system because it means any pair of correct must have the same set so it

39:34

means this must have the same set of these but also this one and so it

39:39

generalized so even if i write for for any pair then

39:43

it means all the correct because because there is a pattern that connects

39:46

everyone and so on this part able to be one

39:50

so it's yes history okay so there was a problem in the a

40:00

problem that i told you with this algorithm not a problem but there was a

40:04

possibility in this algorithm that the system synchronized you receive there is

40:08

someone that is dead right here and you still can keep it to do

40:13

something like that restore this process to you that dies this is process one and

40:17

you can do restore two then arrest or two and then research you

40:22

a finite number of times why because those are all being from you know the

40:26

past and so your colleague suggested the fix

40:32

of the algorithm that avoid this behavior i mean this behavior is not

40:36

wrong the specification cover this behavior i

40:39

mean it is still a perfect failure an event or a perfect why because this

40:42

thing happened happens a finite number of times after a while you suspect p2

40:47

forever and so your colleague said oh if i send

40:51

the the the the after bit request only to the one that are alive

40:56

uh that are not suspected then i fix this thing why because i can send i can

41:00

do something like this and then if i do not receive this in time i cannot harm

41:04

again and send a request so this cannot be created why because the only way in

41:09

which this is created is if there was an yellow arrow so with the fixer your

41:14

colleague you created the first yellow arrow if i do not receive the

41:18

purple arrow i cannot see it or yellow r or v and so on this is this is the fix

41:23

okay and so

41:25

the fix does not break the algorithm why because let's say that this is correct

41:30

what was my my my fear when i i saw this thing because you know

41:35

i'm anxious i have algorithm anxiety and so

41:39

my first fear was this one this is correct i have something like

41:43

this and i'm not sending yellow arrow again okay but if this is correct for

41:48

the perfect point to point eventually i received this thing and so i must to

41:51

send another yellow arrow okay because my fear was that you would suspect are

41:56

correct forever but it's not possible suspected here

42:10

for all peace at minus suspected and you do not send the request okay

42:14

but anyway i'm not 100 i mean

42:18

my mind tell me that that should work but you should do the proof okay because

42:22

this is a non-trivial modification of the original app but it should work

42:26

i mean i i bet it works so

42:34

uh so now we have done with the failure

42:38

detector so we have seen two kinds of failure detector the first

42:42

one is the perfect field detector and the second one is the eventually perfect

42:46

failure detector that becomes eventually perfect

42:51

but there is an alternative so sometimes you do not need to you know understand

42:57

who failed it's enough that you know someone that

43:00

is correct sometimes you what you need

43:05

is the dual from a logical perspective of the

43:09

failure detector in which you consider someone and you say oh i trust

43:14

that that someone is correct at least i trust that that someone that do not

43:19

crash it and everyone trusts the same this is

43:22

called the leader election and in the leader election algorithm

43:27

what they do is that they elect a leader so as the name say the leader is unique

43:34

and is the same for all process so this is some alternative primitive

43:39

that we will build and they are really easy

43:42

from an algorithmic perspective so the algorithm for leader election are

43:48

are created trivially from the algorithm of perfect

43:52

of perfect failure detector and eventually perfect silver detector

43:57

so in the leader election primitive we have several process p2 p3

44:02

p4 p5 in the system let's say that they are

44:05

all correct and what they have to do is that

44:08

eventually they have to trust the same leader every one of them

44:14

has to trust the same leader that has to be correct

44:18

why the leader election primitive is

44:21

important because if everyone trusts the same then you can create in a

44:26

distributed algorithm a pattern that is similar to the client server pattern why

44:32

because this one becomes the leader usually and is the coordinator of the of

44:37

something and everyone trusts the same coordinator so everyone sends its

44:42

request to the coordinator and then the coordinator you know

44:46

does its job so which kind of problem we have seen

44:50

that can be solved really easy if you have a correct coordinator

44:55

which kind of problem can be solved really easy with a correct

45:01

coordinator synchronization problems no

45:08

uh no the one we have seen the one we have seen the mutual

45:12

exclusion why modular exclusion because i asked

45:16

the coordinator is the resource free and the coordinator see in its memory and

45:21

say oh it's free you're too good to go you're gonna enter okay

45:24

and then this release to the coordinator and the coordinator to tell to another

45:28

one you can enter you can enter or whatever

45:31

and we will see an application of the election that solves mutual exclusion

45:36

so before the break let us

45:39

see what is the specification of the leader election

45:44

this is the not eventual leader election is the one

45:48

that you can build only on a synchronous system and we will see why

45:53

so the leader election works really easy as only an event

45:58

that is the election event in the election event we

46:03

have an event leader that

46:07

has an id for example two and tells to everyone the leader is processed to you

46:11

i mean tells you locally the leader is processed you and then we'll talk to the

46:15

other people also the leader is persistent

46:20

what are the properties of the leader election specification

46:25

the first one is the eventual detection and say either there is no correct

46:30

process in the system so either everyone crashes

46:36

or some correct process is eventually elected as the leader

46:40

so it means that eventually your leader cannot be a dead one

46:45

eventually you have to to point to a process that is correct

46:49

if a correct decision and this is the first one eventual

46:53

detection then there is the accuracy property

46:59

and the accuracy property i don't like how do your book wrote it but anyway

47:04

let's read it is if a process is leader then all previously elected leader

47:12

have crashed so what does it mean by elected

47:17

let us assume that there exists a process p2

47:21

this process p2 as its leader election block

47:25

and it sees an event leader three this is the election of

47:30

leader three okay so the election is when there exists a process in the

47:34

system that see that the leader election tells

47:37

him this is distributed okay tells him the leader is process three

47:42

when this moment happens the leader three is elected

47:47

so the property say if a process is selected as a leader so if on process

47:52

two it happens three is the leader and in the past also one was the leader

47:58

then it means that this point one must be crashed okay

48:04

so what is the problem with this problem

48:08

so now i told you what what the probability means what is the problem

48:11

with this property so what the book is trying to say

48:15

is that if you process that two different process

48:19

cannot trust as a leader two different coordinates so what the book is trying

48:24

to rule out with this property is this one

48:27

process one is correct and is trusted as a leader by process

48:32

three 2 is also correct and is trusted as a

48:37

leader by process 5. so this is what the book wants to avoid so if the leader is

48:42

correct then it has must be a unique leader you cannot have to

48:46

correct leader on two different process so what is the problem with this problem

48:52

why this property is brought in a wrong way

49:01

if a process is the leader no no no no no it's not that one there is

49:05

another problem what happens if two leaders are elected

49:10

exactly at the same time on two different process

49:15

then there is no concept of previously right previously means that this event

49:19

must be you know not not up enough exactly at the same

49:23

time so if exactly at the same time at 1pm

49:27

i have process one that trusts process three and process two that trust process

49:31

five and they are both correct then it's fine for the problem okay so the

49:35

property is assuming that two leaders two diff that each

49:40

election appends at a different event and then it works okay so this was just

49:45

a leader so let's assume when we see the algorithm that the election on different

49:50

process never happened exactly at the same time

49:53

yes the first leader yeah

50:13

yes i mean i see your point but it's respect

50:16

because this set is empty so is i say then all previously elected

50:21

leader that is an empty site that's crashed if the set is empty then

50:25

everyone in the set creation because you know

50:28

so but but i saw your point i mean is is also

50:32

written for that way okay so anyway this is what the leader

50:36

election primitive wants to do you eventually every process has to trust a

50:40

correct process and it's not possible that there exists a time in which two

50:45

process trusts two different process three and five and they are both alive

50:51

okay if there are two different process three and five that trust two different

50:55

if there are two different processes sorry seven and eight that trusts you

50:59

different process three and five then one of them must be dead

51:04

it's possible that also three die in the future we do not know

51:08

but at the time in which they are you know both trusted by someone one of them

51:13

must be dead okay you know cannot trust two process that are

51:17

active on two different process this is the leader election the leader has to be

51:21

unique and so we will see the algorithm after

51:26

the break so let's let us do 10 minutes break at

51:31

3 pm we we start again so the reason why is by delivery

52:07

is because if i have on let's say that i have this execution i have processed

52:13

you i have process one and then in the

52:19

system i have also process four across five

52:25

so this property tells us that if this guy elect at this point process four

52:31

and this guy elected this point process five the moment you elect process five

52:36

it means that process four must crash

52:41

and this is the problem okay so this is crash

52:46

because this was previously elected for i elect a new one on a different process

52:51

this die but what happens if i do something like

52:54

this so exactly at the same moment

52:59

exactly in the same instant of time this elect process 2 and this elect process

53:04

5. this is

53:06

possible okay this is possible

53:09

and they trust you different process so trust me in reality the book does not

53:16

want that this happened okay the leader if someone is pointing to a correct

53:20

process then no one else to accord if someone is pointing to a not crashed

53:26

process then no one else can point at a different crescent process

53:31

so this is the the spirit of the leader election but for

53:34

if it is brought in this way this can happen okay

53:38

and it's not a problem so to avoid this problem we assume that is

53:43

never possible that exactly at the same time you have two elections on different

53:47

process we assume that they are a bit different of at least epsilon okay

53:53

that is not really a uh a bad assumption i mean it's fine and in

53:58

this case this property works as expected okay

54:08

in the same time the election opens on two different

54:12

your way um

1:02:37

okay and so now

1:02:42

the algorithm that we will see will use as building block the perfect

1:02:48

failure detector p that has only the crash event crash

1:02:55

pj okay so we will see an algorithm that

1:02:58

does not need any

1:03:02

other primitive not even the links so that can elect a leader without links

1:03:08

just with the perfect failure detective so the purpose is that everyone has to

1:03:13

trust the same correct process eventually and

1:03:16

in a finite time is not possible there are there are two process

1:03:21

that trusts two different process if one of them is still alive

1:03:26

if sorry both of them are still alive it can happen that they trust you

1:03:31

different process but one of them must be dead

1:03:34

so what is the idea of the algorithm it's

1:03:38

simple enough this is the output so the initialization handler we just

1:03:45

have a suspected set that initially is empty

1:03:48

we have a leader that initially is null bottom so initially you don't have a

1:03:53

leader when someone

1:03:56

crash you add it to the suspected set

1:04:00

remember this is the perfect failure detector when someone crash you crash

1:04:04

forever i mean it's really crazy and what you do

1:04:08

where you elect a leader here so when the leader

1:04:15

is different that max rank of p minus suspected

1:04:20

so what you mean with max rank what they mean

1:04:23

is take the id the maximum id okay

1:04:27

so this is take the maximum id in the argument

1:04:31

so if the leader is different from the maximum id inside of p minus suspected

1:04:38

then set the leader to the maximum id in p

1:04:42

minus suspected and triggered the event new leader is elected

1:04:47

so at the beginning what happens at the beginning let's say that we are

1:04:50

in a system with process one two three four five and let us be on the view of

1:04:57

process one and let us be also on the view of

1:05:00

process two and make it here so in the memory of process one the

1:05:04

memory of process two in the memory of process one at the beginning we have

1:05:08

suspected empty and the leader no one

1:05:13

so what happened is that this set right here would be equal to one two three

1:05:18

four and five so it means that you will he will elect

1:05:22

as a leader five why because you see that null

1:05:26

bottom is different than five then it triggers so we set leader to

1:05:30

five and send five to the upper lay so what happens in the memory of process

1:05:35

2 well the same thing so also process file 2 eventually if nothing change will

1:05:41

erect 5. what happens in the memory of process 3 the same thing if nothing

1:05:46

change the maximum of this set will be the same

1:05:51

so the idea is that you apply a deterministic function

1:05:55

max min whatever to a sect that become the same on all the process and you

1:06:00

elect a leader so even if we substitute this with minimum

1:06:06

it still works they just selected the minimum id so they erect one at the

1:06:10

beginning so let's say that now five crashes

1:06:14

because five is dead it's possible that there is someone that

1:06:19

would be the first the first one that see that five dies

1:06:24

why because eventually since the perfect failure detector is perfect for

1:06:28

completeness if q is correct eventually to us to see

1:06:31

that five is dead so when you see that five is dead will

1:06:36

trigger this handler because the failure detector tells him look process two five

1:06:40

is dead and then process you create a suspected

1:06:43

set that contains five so what happened is that in this set we remove 5 and now

1:06:48

the maximum id becomes 4. so process 2 will see oh 5 is different

1:06:53

than 4 that is the maximum process alive the leader has to be 5 and will trigger

1:06:59

on process 2 leader 4 is it possible that process 1 still

1:07:04

trusts 5 why because there is no bound on the

1:07:08

perfect failure detector it's possible that process 1

1:07:12

will detect that five is dead really later than process two this is not a

1:07:17

problem why so now that we've seen the

1:07:22

algorithms so is the algorithm clear are there

1:07:27

doubts on the algorithm is it clear or it work you elect as a leader the

1:07:31

maximum might be of the ones you think that are aligned yes

1:07:37

yes yes

1:07:45

yes okay

1:07:46

so there was a question from here that is

1:07:50

an interesting question he said oh the perfect cereal detector works on a

1:07:54

synchronous system we have seen that there is a bound of two delta right

1:07:57

something like that on the lattice no

1:08:03

you are mixing the implementation with the specification

1:08:07

okay you were discussing about implementation

1:08:11

and the year you have just the specification of the perfect failure

1:08:14

detector let's go back at the specification of the perfect feeling

1:08:20

so it's a lot to slide ago

1:08:22

let's go back the specification of the stronger or the

1:08:28

perfect director say eventually every process that crashes is

1:08:32

permanently detected by every correct process he says just event

1:08:36

does not say to death okay so when you see an algorithm

1:08:40

and you have a specification

1:08:44

you just have to use the specification that means you can only use the

1:08:48

properties of the specification you do not know if inside the bound is to

1:08:52

that's the three delta or there is some other things okay so no

1:08:56

there is a question why is it a problem if one detects five as a leader even if

1:09:02

it crashes okay so from whom they are saying okay

1:09:06

we have one that still trusts process five as a

1:09:09

leader and we have two that detect that five is dead

1:09:14

and the trust process four and now from from home are saying why this is not a

1:09:18

problem let's go back at the specification

1:09:22

he say if a process is a leader is elected as a leader then all previously

1:09:26

elected leader have crashed so the moment in which qlx process five

1:09:32

and this one is trusting an old leader is fine because this is crash

1:09:37

okay so we are not violating this specification

1:09:41

you agree with me because you are electing a new one four

1:09:44

and this new one now this time is alive the old one 5

1:09:49

crashed so it's okay to elect a new one we are

1:09:52

not violating accuracy we are not violating eventual detection

1:09:57

why because i told you that after a finite time

1:10:01

abounded time sorry an unbounded but finite time there will be the detection

1:10:05

of the crash on p1 and so also p1 will trust four

1:10:10

okay so we are not violating the specification of the of the problem

1:10:19

and so this was the question if this situation was possible so we have

1:10:23

process zero that crashes at this time we have process one that first trust

1:10:28

process zero then start trusting p1 itself we have processed you that first

1:10:34

uh you know the speed zero and then at this point still trust speed zero this

1:10:38

is possible for the leader election okay this is a correct if these are the

1:10:43

election events election event

1:10:47

this is an execution that is possible why it's possible that this time

1:10:52

two process trust two different process if one of them is dead and this is that

1:10:56

okay is it possible if we stay like this

1:11:00

forever is it a correct leader election

1:11:04

algorithm so i show you this execution these are the election event

1:11:08

and they forever stay in these ways possible or not which probability are we

1:11:13

violating the first one the

1:11:19

eventual detection because eventually process 2 has to change idea and thus to

1:11:25

point to a curve and it's possible that process still

1:11:29

change idea and points to process 2 is it possible that process 2 change

1:11:36

idea and point to process 2 no it's not possible because if it

1:11:41

points to process 2 then we are violating the accuracy why because we

1:11:46

elect process 2 but process 1 was previously elected and is still correct

1:11:50

so the only process that he can elect is one so we can only point to process one

1:12:01

so matteo this question i will not answer because it's really different

1:12:04

from what we are seeing okay we will talk about the module explosion with the

1:12:08

coordinator when we will uh

1:12:11

talk about model exclusion with coordinator serial direction

1:12:18

and so the previous the previous execution is possible because it says is

1:12:22

eventually elected as a leader so p1 can happens in the future

1:12:31

okay so you say ypu cannot elect p2 as a

1:12:37

leader this okay

1:12:43

this i was saying this is a leader election algorithm which we see the

1:12:46

events okay so you are seeing the implementation of

1:12:49

the previous album okay

1:12:52

so this is just i am was not saying this is the previous algorithm was just the

1:12:56

specification okay yes your point is taken

1:13:00

so from omar saying why this does not elect p2 because p2 is the maximum range

1:13:05

okay so if you run this algorithm what is the algorithm so

1:13:09

if you run this algorithm so if you run this algorithm yes you are

1:13:16

right you have to elect p2 okay but this i was just saying we are a specification

1:13:20

of leader election it would be different okay

1:13:23

notice that this algorithm works also if you take minimum it's the same okay you

1:13:28

can take minimum or maximum does not change

1:13:31

still works so yes the question thank you for your

1:13:35

question what's the problem first so this is not possible we have said

1:13:40

because here we elect a two different times to leader and they are both alive

1:13:45

so this is also impossible no because p1 is alive

1:13:51

so the correctness of the of the algorithm because we have to prove the

1:13:55

eventual detection and the accuracy the elemental detection of the algorithm

1:14:00

it's immediate from the completeness of the failure detector why because if you

1:14:05

trust someone that is crashed

1:14:08

eventually the failure detector suspected eventually you remove from

1:14:12

here eventually you change the beam and so the proof is just one line from the

1:14:17

strong completeness of b the event of the direction

1:14:20

the accuracy the accuracy we have to show that

1:14:25

you cannot elect someone that two different process sorry p1

1:14:30

and p2 cannot elect two different leaders that are both alive at the time

1:14:35

of the election so they cannot elect x and y

1:14:38

if i elect y then x must be that so how do we prove it from the strong

1:14:44

accuracy of the perfect failure detector as long as x is

1:14:48

alive x will be will not be suspected by you

1:14:53

because if x is alive then process u cannot you know detect x as crash

1:15:01

so it means that x cannot be here

1:15:06

so if x cannot be here it means that in p minus suspected of process 2 must

1:15:13

contain x and so if process 2 elected the maximum

1:15:17

and x was the maximum on process 1 then has to be the maximum process 2 and so

1:15:22

it means that here you cannot have y you have to have x

1:15:26

and this is the proof of the accuracy notice that in the accuracy i'm using

1:15:31

this wording and the total order on the rank's idea of process

1:15:36

total order on the ranks so ideal process means that the maximum from me

1:15:40

for me is also the maximum for you which means we have the same order of the ids

1:15:45

okay this is something that is trivial if the

1:15:48

ids are numbers three one two three four five

1:15:54

why because there is a an order of numbers that everyone knows

1:15:58

and this is the the total order on the edit

1:16:02

there are systems that we will not see in which there is no total order on the

1:16:06

id okay there are system in which there are no

1:16:09

id they are called anonymous system

1:16:13

so in systems that are anonymous electing a leader even if no one crashes

1:16:18

is not trivial it's not trivial too to give you just an

1:16:22

example this is not something i will ask but it's just to make things complete

1:16:27

let's say that we are in a system that is anonymous

1:16:30

and is done like this this is our system we have a ring so it means that everyone

1:16:35

is connected with other pupils two browsers this is collected with left and

1:16:39

right this is you know is also connected with

1:16:42

the left right and so on so everyone has just your neighbors these are ring this

1:16:45

is called a ring graph if no one's as id and the

1:16:50

algorithm is deterministic then everyone starts from the same state do you agree

1:16:55

with me because if you don't have id and you run a deterministic algorithm and

1:17:00

they start with a certain memory you start with exactly the same memory and

1:17:04

also these guys start with exact same memory and also these guys start with

1:17:08

the exact same memory do you think that we can elect a leader

1:17:11

in a system like that so no one's there there are no id you

1:17:16

have a ring sorry you have a ring something like that

1:17:21

everyone starts exactly the same as the other the algorithm is deterministic

1:17:25

okay the domestic algorithm you cannot probe random

1:17:29

do you think that we you can elect a leader and you can tell what process so

1:17:33

you are the only leader in the system or not

1:17:41

so everyone starts with the exactly the same state exactly the same memory this

1:17:45

is memory m m

1:17:47

m and m you can exchange message right you can

1:17:51

try to exchange a message so this guy will send i don't know message x and

1:17:55

this guy will send message x why because if i have memory m i send message x do

1:18:01

you agree with me in an algorithm you do like this you see your memory and your

1:18:05

memory decide the message this guy which kind of message you'll

1:18:08

send x and x right

1:18:12

this guy which kind of message will send x and x

1:18:15

and this guy which kind of memory would send x and x

1:18:19

when you receive x and x something change no everyone has the same memory

1:18:23

right you have the same memory and you have xx this is xx this has xx this as

1:18:29

xx if this one decide oh i am the leader

1:18:34

this is what will decide i am the lead this is what will decide i

1:18:38

am the lead this is what will decide i am the leader so it's impossible in this

1:18:42

network to elect a leader whatever algorithm you run the resistance

1:18:48

so in anonymous network you can elect a leader only if the graph is special okay

1:18:52

the graph as an asymmetry a graph in which you can actually you can elect a

1:18:58

leader is something like this why because this is the only oh sorry

1:19:07

this is the only process with degree four it's the only process that has four

1:19:11

links so they will communicate with each other and this will say oh i have four

1:19:16

link this i have two link i have two link i have two link have it link and

1:19:19

this understand it is different and say oh i can be elected

1:19:25

uh yes i was i was assuming no crashes okay

1:19:28

no questions yes it would have been possible if they

1:19:33

had different memories but if they had different memory then they have ideas

1:19:37

okay it's not an anonymous system and so there is an entire branch of

1:19:44

mathematics that study this kind of graph it's called vibrations there is

1:19:48

vibrational graphs there is a book that study how you can elect a leader in

1:19:54

graph okay they analyze all the graph and they say on this graph you can elect

1:19:58

on this graph you cannot so now we have seen the leader election

1:20:05

and we assume that we can have a perfect leader election

1:20:09

if we have a perfect failure detector so if we have a perfect failure detector

1:20:14

then we can solve leader election fine without exchanging any

1:20:18

message so what if the final detector is not

1:20:23

perfect because we have seen that we also have the eventually perfect failure

1:20:27

detector that is able you know to suspect and

1:20:30

restore so in case we have an inventory perfect

1:20:34

failure detector it's not shocking for you that we can

1:20:38

create something that is called eventually perfect leader election and

1:20:43

the symbol is omega this is this is the symbol of the

1:20:47

eventual eventual leader election

1:20:50

and the eventually the election is as the eventual leader election the

1:20:54

relationship between the eventual leader election and leader election

1:20:58

is exactly the same relationship that there is between the eventually perfect

1:21:02

failure detector and the perfect field of detector okay

1:21:06

it means that this leader election algorithm there will be a time after

1:21:10

which becomes as the leader election so perfect before that times it can makes

1:21:15

any any kind of mistake and so now let us look at the

1:21:22

specification of the eventual leader election

1:21:26

so the event or leader election as just an indication trust

1:21:30

is not any more leader and indicate that process p is trusted to be the leader so

1:21:35

is there is an event as in the leader election primitive and this event is

1:21:40

trust so we're gonna thrust three we can have thrust four trust five it means the

1:21:45

first that we trust three then we do that we trust four then with that we

1:21:48

trust five the event will accuracy say that there

1:21:55

is a time after which every correct process trusts some correct process

1:22:01

so the eventual accuracy say that if you're a correct process p1

1:22:05

eventually you have to trust some correct process it's not possible that

1:22:09

you forever trust p3 that is dead

1:22:12

eventually if there is someone that is correct let's say pu eventually you have

1:22:17

to trust with you this is the first problem

1:22:21

and then there is eventual agreement eventual agreements say that there is a

1:22:25

time after which not your correct process trusts two different correct

1:22:29

process this probability tells us that if we

1:22:33

have two correct processes in the system p1 and p2

1:22:36

is possible that at finite time they trust two different process for example

1:22:41

four and three but eventually they will trust the same

1:22:45

process three so these agreements say that eventually

1:22:49

you have to agree with all the correct on the leader eventually you cannot

1:22:53

change so you have to agree sorry so if i if there are two correct the

1:22:59

trust different process is fine but after a finite time they have to trust

1:23:03

the same process and the first property tell us

1:23:08

that eventually you have to trust some correct process so if process one

1:23:14

sorry if process four let's say is trusting process five that is 40. you

1:23:20

cannot do it forever eventually has to trust a correct one it is for example

1:23:24

one okay okay and so those are the two

1:23:29

property of the

1:23:33

of the eventual leader leader leader election

1:23:37

now let us focus on the eventual agreement okay

1:23:41

the eventual agreement tell us there is a time first of all which kind of

1:23:45

property they are liveness boats okay they are both

1:23:50

liveness proverbs don't use it mean we can trust you

1:23:56

leader yes you can trust your leader three leader at finite time but at uh

1:24:00

after a while everyone has to does the same okay

1:24:04

yes yes there is a time

1:24:18

no it's liveness because i say there is a

1:24:21

time after which not your process through the different correct process

1:24:25

okay to be safety we have to show an execution which you violate in a finite

1:24:30

time so your execution will be something like this

1:24:34

this is the finite time of your execution

1:24:37

and in this final time you show me oh this process is trusting four

1:24:41

and this process is trusting five okay and this can be your counter example

1:24:44

because that's to be fine at times but i can tell you okay at this point this

1:24:48

change eliot was full you see

1:24:52

so you cannot create a country percent okay

1:24:58

and so yes they're both liveness now the question that i have for you

1:25:04

do you think that correct er is necessary or not

1:25:09

so what the the the the specification want to say is that

1:25:14

eventually all the correct process have to trust the same correct process and

1:25:18

has to be equal to everyone and that's to be correct okay this is what

1:25:22

this is the spirit so every correct process in the system eventually as to

1:25:27

trust exactly the same correct the same process and this process has to be

1:25:31

correct so do you think that we need to specify

1:25:34

correct ear or not why

1:25:49

and why you eventually you trust the correct one

1:25:51

what is the specification that she tells you that eventually you thrust are

1:25:55

correct yes

1:25:58

so here is not necessary to have correct why because eventually we have to trust

1:26:03

the same but it's not possible that the same is 40 because if the same is 40

1:26:08

then there is this process 50 that is violated okay

1:26:11

so in this case correct you can remove it is

1:26:14

is uh as i said you know it's something more

1:26:18

but there is this property that ensure that the final leader must be correct

1:26:23

so you do not have to write correct here it's not necessary but i mean it's not

1:26:28

wrong to write it okay so the specification is clear

1:26:36

we have that eventually all the correct process have to trust the same process

1:26:40

and this process has to be correct this is the eventual leader election what is

1:26:44

the difference with the previous primitive is that at finite time

1:26:48

you can have two correct that trust you different correct and you do not violate

1:26:52

anything so in the previous algorithm we cannot

1:26:55

have that p2 and p3 they trust four and five and they are both correct at this

1:27:00

time in this case is possible because he says

1:27:04

only that eventually this has to change idea

1:27:07

sorry this has to change idea and that's to go to four okay does not tell us that

1:27:12

you cannot trust two different correct in at a certain

1:27:16

time is possible for this specification so if you read these properties since

1:27:23

they are both aliveness property it means that that finite time the

1:27:27

algorithm can make any kind of mistake so at that time there is no guarantees

1:27:30

after sometimes it stabilizes but before there are no guarantees

1:27:35

so let's look at this execution let's imagine that if i write sorry if i write

1:27:40

it as p3 i mean stress p3 forever so it's always like that i never change id

1:27:44

okay so let's see the first run

1:27:48

we have four process in our system we have process one process two process

1:27:52

three and process four this is four at the beginning everyone trusts a

1:27:56

different one then they these two stand believes on p3 and then they stabilize

1:28:00

on p3 forever so if we look at the first run and we

1:28:04

look at the property the eventual accuracy is not verified for the first

1:28:08

run why the eventual accuracy is not verified

1:28:11

for the first run then to accuse y is not verified

1:28:22

because p3 is dead okay so they cannot trust forever the same process if the

1:28:27

same process is faulty they have to change idea why

1:28:32

because we say there is a time t after which every correct process trusts some

1:28:37

correct process so it's not possible that they forever

1:28:40

trust p3 if they forever trust p3 violate the first problem

1:28:47

the eventual agreement in the first run is verified

1:28:52

no it actually is not verified because the eventual agreement here he says

1:29:02

that's different no it's verified

1:29:08

also the eventual agreement because they agree

1:29:11

on the process so they are not trusting two different chords they are trusting

1:29:15

the same process even if it's you know 40.

1:29:18

let's look at round two grantee we have p1 p2 p3 p4

1:29:24

three and four at the beginning and then this thrust four

1:29:27

and trust for forever then three distrust one and trust one forever

1:29:32

in this case in run two grant you this this year we have that the eventual

1:29:37

accuracy is verified why because everyone trusts the correct and they

1:29:41

trust are correct forever and the eventually accuracy says that every that

1:29:46

eventually you have to trust a court the eventual agreement is not verified

1:29:51

why because they trust two different correct process and this is not possible

1:29:55

so in the future it's not possible that this configuration is kept forever one

1:30:00

of the two has to change idea so for example this one was to trust p1

1:30:05

and they have to just p1 forever and so this is the algorithm

1:30:15

the algorithm is exactly the same algorithm of the leader election the

1:30:19

only thing they change is that now we have an eventually perfect field detect

1:30:24

so we have a suspect and restore and is exactly the same algorithm as before we

1:30:29

start with the initialization we have the suspected set

1:30:32

initially is empty we have the leader initially is null

1:30:36

we have two indication event suspect and restore if you suspect someone you add

1:30:41

it to the suspected set if you restore someone you remove from

1:30:44

the suspected set and you elect as a leader the maximum

1:30:49

one in the set of the ones you think are alive the set of p minus suspected

1:30:57

you take the maximum rank and then you trigger

1:31:00

the leader election of the maximum brain okay so why this algorithm respect the

1:31:08

property remember

1:31:10

there was something on the suspected set what happened on the susp

1:31:14

what happened on the suspected set of two different correct process

1:31:19

with the eventually perfect failure detective

1:31:22

there was a property that we have shown what happens

1:31:25

on the suspected set of the correct process

1:31:29

there was a limb that shows that the suspect

1:31:34

the stabilizer so it becomes evil so there will be a time t in the system

1:31:39

we already know because we proved this lemma for the eventually perfect failure

1:31:43

detector so there is a time t in the system after which for any pair of

1:31:47

correct process p1 p2 p3 so for any pair of them that

1:31:52

means for all of them the suspected set become the same

1:31:58

and this suspected set cannot contain processes that are faulty why otherwise

1:32:02

this is not a eventually perfect detector right because the suspected set

1:32:07

you cannot suspect for the event or strong accuracy you

1:32:11

cannot suspect a correct process forever so when the set becomes the same

1:32:17

sorry when the set become the same after a

1:32:21

time t on all the correct what happen is that all the correlate call this

1:32:26

procedure with the exactly same set why because suspected is the same for

1:32:31

everyone p is the same for everyone if for from

1:32:34

something that is the same you remove something that is the same you get

1:32:38

something that is the same and so you call every correct process called this

1:32:42

procedure with a set that is ego so if the set is equal and this function

1:32:47

is deterministic we elect the same leader

1:32:50

and since there is no fault in this set why because the suspected has to contain

1:32:54

all the 40 process for the strong completeness

1:32:58

the strong completeness of the perfect failure detector we have that they will

1:33:02

elect the correct process okay

1:33:05

and so this is the proof of the algorithm so the proof i leave it as an

1:33:09

exercise so you can look at the proof of property one and

1:33:13

property two but the proof they come trivially from the fact that the

1:33:17

suspected set stabilizes the call are there questions on the algorithm

1:33:33

no question here from mom there are questions on the algorithm

1:33:37

is it clear how it works okay i assume it's clear

1:33:42

and so now we have three new models

1:33:47

this is important we have our models that we can call fail

1:33:52

stop and this is a model in which we have the

1:33:55

perfect link and the perfect failure detect

1:33:58

then we have a model that we can call fail noisy and is the model in which we

1:34:02

have the perfect link and the event only perfect for your detector

1:34:06

and then we have the failed silent in which we have just the perfect link

1:34:10

so what i'm doing is that i'm creating three models using as

1:34:15

difference between the models the ability to detect failure okay in this

1:34:20

model we can detect failure in a perfect way because we have the perfect field

1:34:25

detector in this model we can detect

1:34:28

failure in a noisy way why because we can make mistake at finite time

1:34:34

but eventually the failure detector becomes perfect so for this reason it's

1:34:38

called failed noisy because it can contain noise

1:34:41

this is failed silent why we don't have a failure detector

1:34:44

and so if we don't have a failure detector and we have just perfect link

1:34:49

then the system is asynchronous right and if the system is asynchronous you

1:34:53

cannot detect fail and so here you cannot detect fail

1:34:59

so the stronger of the model is this one why well because you can detect failure

1:35:05

perfectly right that the beginning of the execution

1:35:09

this one is the middle model y is weaker than this one why because we can detect

1:35:13

failure perfectly but only after a time that we do not know

1:35:19

and this is the weakest mode the weakest one that is the asynchronous system

1:35:27

so why i'm showing these three models because in this model

1:35:31

in no one of this model i'm talking about time

1:35:35

so here i'm just saying you have a perfect field detector here i'm just

1:35:39

saying you have an inventory perfect field detector i'm not talking about the

1:35:43

time in the system okay one is that you have seen something like

1:35:49

this so three models that are connected in this relationship we have the

1:35:52

stronger where we can solve all the problem well this where we can solve a

1:35:57

subset of this one and we have this where we can solve a subset of this

1:36:00

other one there were other three models that had

1:36:03

the same relationship which model were which models were

1:36:10

yes so there were the synchronous model

1:36:14

the eventually synchronous model and the asynchronous model it was

1:36:18

exactly the same relationship okay and you can imagine that there must be a

1:36:23

relationship like that why because p you can only build p in the synchronous

1:36:28

system you can build diamond p in an eventually

1:36:31

synchronous system and when the system is asynchronous you can also detect

1:36:34

failure and so you cannot have a failure data

1:36:41

and so this is the inclusion between models why because a failed stop model

1:36:45

is also very noisy a fail noise is also felt silent this is the same

1:36:49

relationship between sync eventually sync

1:36:53

and async this is the inclusion between the models

1:36:58

and this is the inclusion between the solvable problem in fail stop you can

1:37:02

solve more problem than in failed noisy why because in fail stop you can detect

1:37:07

the crash accurately right at the beginning

1:37:10

in failed noisy you can detect crash accurately but after an unknown time and

1:37:14

so the set of problem we can solve is less why because we know less

1:37:19

and then the phase island we can solve you know really few problems because

1:37:23

this is exactly equivalent to an asynchronous system

1:37:28

okay so now if the relationship between three

1:37:32

three model is clear i have a question so

1:37:37

let's just take the synchronous system and let us take the failstop system

1:37:43

okay so they are different system at least for the

1:37:47

definition because in this system we have a bound on the channel in this

1:37:50

system we have a perfect failure detector okay

1:37:54

what is the relationship between the synchronous system and the fail stop

1:37:58

is it relationship a a means whatever you can solve in the

1:38:03

synchronous system you can also solve in the fail stop so

1:38:06

it means they are computationally equivalent

1:38:09

computationally equivalent

1:38:13

it is the relationship c so fail stop is stronger than synchronous what does it

1:38:19

mean stronger it means there is a problem that you can only solve in field

1:38:22

stop and you cannot solve in the synchronous

1:38:25

one or is b

1:38:27

there is a problem that you can solve in the synchronous system and that you

1:38:31

cannot solve in the field stop one so synchronous is more powerful

1:38:35

so what do you think is the answer a b or c the relationship between

1:38:41

c so see

1:38:46

so from from to did also at home you get to the question

1:38:50

so what is the relationship between three models

1:38:53

here they are saying the relationship is c someone is saying

1:38:57

c means failstop is more powerful than synchronous okay

1:39:02

so it is saying there is as there is a problem that you

1:39:06

can solve here let's call it problem p but you cannot

1:39:10

solve here this is what what you what you are

1:39:13

claiming if you if you say c okay

1:39:16

so let us reflect a bit about it what you need to build b

1:39:22

asynchronous right so it means that i can also build p here

1:39:28

you agree with me so it cannot be right because once i

1:39:32

will i built p here i can solve the problem so this is really impossible why

1:39:36

because this is just something that i can build also

1:39:39

here so from home they are answering and they

1:39:44

are answering correctly now the only possibility between a

1:39:48

and b what is the concept that there is inside

1:39:52

this system and we don't have in this system what is the concept

1:39:56

the time right here i have a bound on the delay here i

1:40:01

do not have a bound on the delay i have just a perfect field detector okay

1:40:05

which problem i can solve with the bound on the delay that we have seen

1:40:10

there was a problem that we have seen that you can solve with the boundary in

1:40:13

the delay and we were using the bound on the delay the problem cannot be the

1:40:17

failure detection otherwise there was a different problem that you

1:40:22

can solve with the delay that is different from the detection of failure

1:40:26

in a system that is synchronous what was the other problem that you can

1:40:30

solve in a system of this sequence not to removal exclusion the model

1:40:35

exclusion is asynchronous not to the consensus we have not seen it

1:40:40

the synchrony of the clocks to synchronize clock you need you know

1:40:44

the the bound on the channel because we use the round trip time or whatever okay

1:40:49

so the clock synchronization you can solve in the synchronous system clock

1:40:52

synchronization but of course you cannot solve in this system here why you don't

1:40:56

have a concept of the delay of the channel so you cannot solve clock

1:40:59

synchronization because you know you have just perfect link the delay of

1:41:04

the perfect link around bound okay the layer the perfect link

1:41:10

and so this is this is the relationship with b

1:41:14

and what is the problem the problem is the clock synchronization to solve clock

1:41:17

synchronization you need explicitly the concept of delay of the

1:41:22

channels however why i show you the fail stop

1:41:28

because actually detecting crash

1:41:33

is really powerful so having the perfect detector is really powerful

1:41:38

is so powerful that you can solve

1:41:42

almost all the meaningful problem also in failster

1:41:45

so you can solve consensus in field stock for example you can solve total

1:41:49

order broadcasting in failed stock you can solve in failed

1:41:54

stop you can build the distributed turing machine

1:41:56

also in failsafe computationally you can solve almost everything okay the only

1:42:01

problems you can you cannot solve are the one that explicitly mentioned time

1:42:06

that you can solve only in the sequence mode

1:42:12

and so now i want to show you an application of the

1:42:19

failure detector and leader election but i don't know

1:42:23

maybe the is a bit too much let us see

1:42:27

an exercise let us see an exercise in the last 20 minutes

1:42:44

okay so from home can you see the the slide on the exercise

1:42:49

the new slide from home okay let us see this exercise in the

1:42:56

last 15 minutes and then we break i mean we part away

1:43:01

and the exercise is an exercise from the exam of september 2021 okay

1:43:07

so it was an exercise about doing a design of an algorithm so we will do

1:43:12

just the first part you have a system composed by two

1:43:16

processes sender and receiver so in the system we have just the sender and the

1:43:20

receiver two browsers okay both process are correct

1:43:24

so there is no failure no faulty process the processes are connected with a

1:43:30

bounded loss perfect point-to-point link that exposes the usual event of send and

1:43:37

generates the event of delivery so we have our sender

1:43:42

let's make it the sender here we have our receiver and they have this bounded

1:43:48

perfect point-to-point link and there are the usual events send event you send

1:43:52

a message deliver you deliver the message and this is by direction so this

1:43:57

is consent and this also can be and what are the formal properties of

1:44:02

the link if a process p send a message m then m

1:44:06

is received at most once no duplicate uh

1:44:11

this is no duplication property no creation property if a process q deliver

1:44:16

a message m with center p then m was sent by p and those are also probability

1:44:21

of the perfect link and now there is the bounded k loss that

1:44:25

say if a process p send t greater than k messages on the

1:44:31

link to process q then cause process q deliver at least t

1:44:35

minus k messages okay now assume you know k so k is known

1:44:42

what is telling this property so what i'm telling you with this property how

1:44:46

many message can the channel lose how many message can the channel use

1:44:54

so from home they are answering correctly

1:44:57

how many message can the channel lose so the

1:45:01

fair lossy infinite message okay

1:45:08

delivers the delivers at least t minus k it means

1:45:12

that if i send 10 message and k is equal three the other endpoint deliver at

1:45:17

least seven or more so how many messages i lose if you

1:45:21

deliver at most seven or more okay i lose at most three message

1:45:26

because if i send ten and you deliver seven then three are lost on the channel

1:45:32

okay this is this is the problem does everyone agree on this problem this is

1:45:36

what i'm telling you notice that this property is total so i

1:45:40

say if in the execution i send 100 message

1:45:44

in case three you receive 97 messages okay is is for the entire execution

1:45:50

there is no concept in which i send a bars to 10 messages

1:45:54

then i send the bars to 10 i lose the order three no three is for the total

1:45:59

because there is no concept of burst okay

1:46:02

a transmission algorithm as a message over red o if the sender is able to make

1:46:07

the deliver delivers x message by sending at most x plus all messages on

1:46:13

the link so let us read it again a transmission

1:46:17

algorithm has a message overrate oh this o is a constant okay some number if the

1:46:22

sender is able to make the receiver deliver x messages by sending at most x

1:46:27

plus all messages on the link as an example the stubborn algorithm

1:46:32

transmits forever seen during the course as an infinite overhead of y as an

1:46:38

infinite overhead off because how many times you send a message on the subword

1:46:42

the same message the starboard link

1:46:46

infinite because you send once you time out you send the message again you time

1:46:50

out so the overhead the number of duplication that you're saying how much

1:46:55

it is infinite okay so the overhead is finite if to send

1:46:59

five message on the other side you need

1:47:03

three replications so i send five plus three replicated message then you

1:47:07

override these three and the total message that i send on the

1:47:11

channel are five plus three six seven eight okay is it

1:47:16

is it clear what i mean with overhead or the message more so if i have to send

1:47:21

you five different if for sending you message m1

1:47:25

m2 and then three i need to send the three

1:47:29

copy of each message then the overhead is six

1:47:32

sorry it's not six is six minus three because these three i have to send it at

1:47:37

least once otherwise you cannot receive it

1:47:40

is it clear the the the the specification okay

1:47:44

first the question the algorithm implement a perfect point-to-point link

1:47:49

using the bounded loss perfect point-to-point link your

1:47:53

algorithm must have a finite overhead goal

1:47:57

so i ask you to create on this link an algorithm that simulates the perfect

1:48:01

point-to-point link using a finite override

1:48:05

and that's it so

1:48:08

let's go here what i mean we have our bounded loss

1:48:12

bounded loss that loss you have to build on top the

1:48:17

perfect point to void what is the limitation why you cannot

1:48:21

use the algorithm on your book in which you first create the stubborn and then

1:48:24

the perfect that you cannot send an infinite

1:48:28

amount of replicated messages you have to to send a finite amount okay is it

1:48:35

clear so send receive

1:48:40

send let's hit

1:48:42

so what is the idea of the algorithm so we have the bounded loss k is known what

1:48:47

is the idea of the algorithm is it clear what you have

1:48:56

to do you have to create the perfect the perfect that

1:48:58

means i send a message and here the other side has to deliver message

1:49:03

and this has to be done and i can send a finite number of replicated message so i

1:49:08

can send once time message camp then i can send

1:49:12

other messages to make sure that this delivers them but these other messages

1:49:16

have to be finite so how do you do it

1:49:25

yes and that was the answer okay the answer

1:49:28

is you have to send the same message m k plus 1 star

1:49:33

so the answer is this

1:49:36

is this algorithm right here there is this 4

1:49:40

in which every time i send a message i have a four from zero to k and this is k

1:49:44

minus one times and i send the message k minus one okay i'm sorry plus one times

1:49:49

if i send the message k plus one times the channel how many messages you can

1:49:54

kill k copies of it so one copy goes on the other side and then you know it's

1:49:59

trivial we need the delivered set to ensure that there is the

1:50:04

no duplication because you send three copies you have to understand that there

1:50:08

are copies so you need the set and whatever

1:50:11

so that was the solution what is the overhead of this algorithm so what is

1:50:16

the overhead that i need to send three different message

1:50:19

i need i if i have three different messages i send each one of them k plus

1:50:24

one time so to send x messages i send on the

1:50:28

channel k plus one time each one of them so

1:50:32

k x plus x i have to remove x y because x

1:50:36

i need to send so it's not over that and the overhead of this algorithm is kx

1:50:42

okay is still finite as long as x is finite

1:50:47

but in a finite execution we're going to send infinite messages

1:50:52

this was the the the first place the first exercise now is is anyone okay

1:50:58

with the solution to the solution

1:51:02

so i don't know why really few people solved it the accent so i made it i said

1:51:06

oh everyone will solve it because you just have to send you know

1:51:10

four times a message and then just really few people solved

1:51:14

it correctly and i was shocked and they say

1:51:18

this is strange because you know it's it's trivial the solution at least for

1:51:22

ministry then the second question the second

1:51:25

question this seems trivial but it's not this discuss what is the minimal

1:51:30

overhead o that any algorithm has to use to send a single message

1:51:37

so what is the overhead that you need to send a single message on the other side

1:51:42

that any algorithm needs what is the minimum already that any

1:51:46

algorithm needs to send a single message so we have a channel

1:51:51

that can lose k message to send a single message on the other side what is the

1:51:56

overhead is k

1:52:02

yes and that is the correct answer so in case you have to send a single message

1:52:07

you have to send k plus one copies y if you send less than cables one copies

1:52:11

they can be all killed the non-trivial part is this one does

1:52:17

this overhead change if you want to transmit x plus one messages

1:52:22

so let's say that now i want to transmit ten messages on the other side so there

1:52:26

is ten x equal to ten i want to transmit on the other side m1 m2 m3

1:52:33

m4 m5 up to m

1:52:36

m10 and now what is the minimal overhead if

1:52:40

i want to transmit 10 of them 10k

1:52:45

10k is the trivial answer why 10k plus one you mean

1:52:49

why because i send every one of them k plus one times okay you can do better

1:52:55

you can do much better okay so what is the idea if i send this 10

1:53:06

and k is equal to 3 how many of them going on the other side

1:53:14

seven okay the only problem is to know what are the seven because it's possible

1:53:19

that you have something like this okay that this is killed

1:53:25

so you do not know right how do you know which one goes on the other side which

1:53:31

mechanism can you use another

1:53:34

how many times you have to send yak on the other side

1:53:37

table as one because if you send the arguments but the overhead

1:53:42

is only for the sender so we are just counting if you read here the message

1:53:46

from the sender so the act are not counted in the overhead okay

1:53:51

and so now if the other process asks you and you say you see oh one is go two go

1:53:56

this knot this i do not know because the arc i'm waiting

1:54:00

this i know and you receive seven ups and you will receive seven x because

1:54:05

seven goes on the other side what you have to do now

1:54:11

the message i don't think yeah so how many messages of them can be at most

1:54:15

okay how many times i send them

1:54:19

three okay times okay k times so i'm sending this number of messages

1:54:25

on the link right x

1:54:28

plus k square that is much less than

1:54:32

x k if you know x is 100 or so and k is 3

1:54:36

also so this is the minimal overhead why is

1:54:39

the minimum overhead we have an algorithm so it must i mean

1:54:43

it's not the minimal but for sure is better than this one so this cannot be

1:54:46

meaning your your solution it's k okay

1:54:53

so is it clear what is the the answer to this question why is this one

1:55:17

the first one okay here i just say implement an algorithm

1:55:21

with a finite overlap okay so what you are telling is i can use a

1:55:26

knocking mechanism to make this algorithm work better

1:55:30

okay if i ask you to have something correct

1:55:34

do not optimize never never ever okay

1:55:37

do not optimize never ever why because there is a sub dirty in this

1:55:42

case you know that you have to send 10 messages okay and so with 10 messages

1:55:46

you can do this trick since this is an online algorithm it's possible that the

1:55:50

upper layer asks you to send less than 10 messages

1:55:54

because of the execution and in this case you have to use this strategy you

1:55:57

cannot use the other one okay so see i just ask you does your

1:56:03

algorithm have minimal overhead then you write no that's not f i'm not asking you

1:56:07

to you know create an algorithm that's the name already in all cases

1:56:11

okay so this solution i mean a solution in

1:56:14

which you show me this and then you show me this that is the thing i i just said

1:56:19

to you it's perfect for me i don't pretend that you go back and you modify

1:56:23

your algorithm okay it's perfectly solution

1:56:29

no you don't need timestamp if you use x you don't need that stamp if you use act

1:56:33

because when you send the knock you just hack a message n so you send up with

1:56:38

message one and i understand it is for message one i mean if you want you can

1:56:42

use the sequence number but here i was just discussing okay in this kind in

1:56:47

this question you do not have to show an algorithm you have to show a strategy

1:56:50

and then if the strategy is clear i understand you're ready you don't have

1:56:54

to build an algorithm okay and so anyway this is the algorithm for

1:56:59

sending its message with minimum overhead so you have the pseudocode if

1:57:02

you want to check it okay so this last question you can see

1:57:07

the solution by yourself was the last question of the exercise

1:57:13

and uh for now we ended the lecture so in the next lecture

1:57:18

we will see some application of the failure detector

1:57:22

and the leader election to the mutual exclusion problem so we will see how

1:57:25

modular execution can be solved with crash failure

1:57:29

okay so see you in the next lecture that is on monday so if there are questions

1:57:33

from omar i will stay over five minutes to answer your question otherwise

1:57:38

see you on monday see you

1:58:01

youtube you