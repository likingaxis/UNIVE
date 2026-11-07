And the idea of the algorithm is that once you want to access the ask anyone by
sending a request message. And this request message So if you use the in order
to hold the hold the request that is in the system. Once you receive a request
to access the and you keep this request in your You enter in the section if you
received the ask from everyone must have a so that you know that they the
current request and they are not for an old one. And once you have the ask from
everyone and your request is the minimum in the request set then what you get to
do is to enter in the In order to allow other people to to enter in the what you
have to do at some point is to ensure release in which you release the and you
will show release by sending a message to everyone and when someone receives
this message what he will do is to remove the request from the And in this way
you will allow other people to enter in the And this is the the the described in
a few words. The correctness proof derived from the fact that if there is an
between the request then the request with the will block the other. Otherwise if
then they will see the request of each other for the and so the one with the and
the other one will wait to to follow follow the release And then before
concluding the lecture what we did was to discuss this primitive that is the
That is a primitive that has the the following abstract we have and if this
crash signal to the one that has this this this box that the process And there
are two properties for the perfect that are the that says that if a process
crash eventually every other correct process So this property forces our
primitive to behave in this way if there is a certain process that that crash at
a certain point and there is process one and process two that they are correct
eventually on both of them probably at different time what will happen is that
what we see the signal process and this has to happen for the set of all the
correct process. So all the correct process have to see this event and this is
the And then another property that this primitive must have is the stronger that
says that if on any process incorrect or not but if on any process we have a
signal process for example crashes then it means the moment we receive this
signal that so if we have an in which we have process that is a correct and this
guy that received the signal then it means that the is not correct. Okay? It
means that this is not an How do we implement the We get the idea of the that in
this algorithm is called So we have our primitive the perfect and we need the
perfect point-to-point so the is not required. And how does it work? Every
process starts at the beginning and the and initially the Because at the
beginning we assume that everyone is alive, no one crashed yet. Then we have the
And in this set we will put the idea of the people that crash. So when once I
detect someone this someone crashes I write the in this And then I have a and
this is the timeout that I will allow for a to reach the target and then come
back from the target So this is the that we use to So in start this This time
and timeout on our process and process So what process one does when it for
every process in set of all process in the system I check if is not in alive and
is not detected and we will see that this So when we have this situation and is
not in the then it it means that there is a new in the system and we will do
something. For now let's skip this because at the beginning everyone is alive.
So at the beginning this force because here when we start the first time alive
you see what to call the processes. So this will be false for for everyone. And
what I do I send an to that process. So let's say that the process the processes
are in and So we have At the beginning this and so I will send myself and And
this is what I do in this Then this guy will and what happens is that this When
you deliver an from a certain sender what you do you send an to that sender. So
Trigger this and send a Trigger this and send a You also and send the to
yourself. And then what happened when once This and what you do you put that
process in the alive set because you know that the process is alive. Notice that
here We send the message to everyone. Then after I send the message to everyone
I because now I send the message I don't know who alive. I send the I send to
zero so that answer you will not be in alive. And then I So once I start on one
I say that at the time After this and I will send again the to everyone and
whatever. So at this moment our is empty because we executed this line. So I
received the reply from What I do I this And on alive will become alive contains
at this point. At this point will contains and And this here At this So actually
at this point also So at this point alive is And at this point alive is P1 P1 P2
and P3 at this point. Okay? Clear? Now we trigger again the And what happened I
enter in the timeout for all processes. Does exist a process that is not in
alive and in this case is false because everyone is in alive and no one is dead.
And so I will signal no one and they do the same stuff. Here I Alive is zero and
then I send a So let us suppose that we are in a situation where there is a
process that is not correct. So let us suppose that is not correct and So what
happens? At this point we trigger let's say that we do something like this. So
this message is will not reach So it means that will not send the So back the
back to P1 will send the I will not throw the message to myself and the back to
myself. So at this point at the new because here we send So we have a uh to P3
because every Okay? Then at and I will put Then I put to 20 25 in this way I am
putting always a Okay? So now when this My at this point will be something like
not something like actually be P1 and P2 will not contain And detected at this
point is empty. Why detected is empty? Because we we never touched it. So what
happened I trigger the and I do process P1. Is P1 in alive? Yes, this does not
trigger. Process P2. Is P2 in alive? Yes, this does not trigger. Process P3. Is
P3 in alive? No, because P3 is not in alive. I didn't receive the the reply
back. And so P3 is not in alive. And P3 is not in detected because detected is
empty. So there is no P3 inside. So I will enter again. And what I do I put P3
in detected because I say P3 crashed. And then I create the event crash P3. So
at this point there is a flag and I say P3 crashed. Okay? Clear? Notice why I
use the detected set so that I signal the P3 only once because at the new delta
that will be here I send again the to everyone and again P3 will not answer
because P3 crashed. So again in here I will find that P3 is not in alive. But I
will see that P3 is in detected and I will not trigger the crash again. So I use
detected to detect the crash only once. Clear? I have to detect the crash only
once because in our model we don't have the recovery. Once you crash you crash
forever and that's it. So I don't need to say it's possible that P3 will become
alive in the future. No, once crashed this is crashed forever for for our model.
Okay? I cancelled already. Okay. Are there questions on this algorithm? Are
there questions on this algorithm? So as you can see in in delta how many
messages we generate? Remember that for the security detector the system is
synchronous because I need a delay that has to be less than delta. I need a
delay of the round trip time for this algorithm to work. The delay of the round
trip time has to be less than delta because if the delay of the round trip time
is more than delta then it's possible that you send the I here I trigger the
timeout before I receive the So this is a a means that the system must be
synchronous for this algorithm to work. That you need to know the delay of the
channel the maximum delay and you put delta in order to maximum delay plus
something plus something because you know So in delta how many messages this in
a system of N processes? In a system of N processes how many messages we create
to this system? Please.For the timeout we create two times delta messages.Yes,
each process so process P1 in this interval of delta N and P3 request. Right?
And then you will receive N replies the same. Okay? But anyone will do this. So
process P2 will do the same. Process P2 has to do the same and LS to everyone
and has to receive otherwise the only one that detects is P1. Okay? P3 the same
but P2 has to send N messages to everyone and then receive the answer back
because this Okay? So how many messages will we send in total in the entire
system?Two N squared.Two N squared. Yes, because we send N squared messages
here. We have N processes, everyone send N messages. N send N squared. And here
we create N replies for N processes. So N by N is N squared. N squared plus N
squared is two times N squared. Okay? Clear? Is it clear the complexity or there
are doubts that is N squared? Yes, please.Just the two the the two N.Okay. Let's
count to the red one. Imagine that the system is synchronous. This process will
have So more or less at delta everyone starts doing this this trick. Okay? They
can be slightly desynchronized but delta plus some And I send N, you send N,
this guy send N. How many N I send? I send N plus N plus N plus N. And this
string is N. So this is N multiplied by N. Okay? Then this one how many replies
we receive one from each alive process. This one how many replies we receive one
from each alive process. So it's the same count. Okay? And okay. All the doubts
all the doubts on this this algorithm. Okay. So now we have to to to show that
this is correct. Right? And this is the usual stuff. Even if it's obvious that
the algorithm is correct we still have to show that it is correct. Okay? So the
completeness strong completeness means that if someone crash every process that
is correct eventually will detect the crash. So I have to show that if a process
crashes in my system every correct one will detect it. Okay? Is it clear? So let
us assume that the process that crashes is P1. Notice that uh is not important
that it's P1. I'm using one without loss of generality So this process crash.
Another correct process is zero. This one will never crash because it's correct.
This process will send a ping to the process that crash at most delta time after
the crashes at most. Why at most? Because it's possible that this was quick
enough to send at delta immediately the ping this reply immediately and then
crash. Okay? So it's possible that this ping the last ping we had enough time to
answer. But at T plus delta at most at T plus delta this guy P0 will send
another if this guy sorry P0 will send another to P1. And now this P1 is zero is
so is dead. So since P1 is crashed it cannot answer to the this ping. And so it
means that once this guy arises at the end of the cycle at the end of delta
we'll find in its alive set that P1 is missing for sure because it's possible
that the cycle before you do not detect it because immediately at delta you send
it replies and you are not able to detect that it's dead. But at this time you
will find that the ping is missing so that the process P1 is not in the alive
set and you will detect it. So once a process crashes at time T by T plus two
delta every other correct process that is in the system will signal it. Okay?
It's possible that someone signal it before because it's possible that there is
a process P3 that start the cycle a bit before send the ping. The ping is a bit
late. This guy is already crashed and so you will see it immediately after that.
But after T plus two delta everyone will see it. Okay? Everyone that is correct.
And so it means that this failure detector is strong complete. It's not possible
that someone crash and there is a correct process that never detected. Is this
clear? And now we have to to show the strong accuracy. The strong accuracy means
that if I detect someone that someone actually crashed. And for the strong
accuracy we need this assumption. We need the assumption that two times maximum
delay is less than delta. Okay? So how do we prove the strong accuracy? We prove
it by Let us suppose that there is process P0 that detect that P1 is crashed but
P1 is alive. So there is a situation like this P0 and raise the flag and say P1
is a crashed process. So if this happens then it means that at this instant we
do not find P1 in our alive set. It's the only issue. But it also means that
before we started our cycle at time T here is time T plus delta. And when we
start our cycle we send a message to P1. We send it. So we send the to P1. And
my ping to reach P1 will take something that is maximum delay that is half of
this time or less. So at most my message can reach the guy here cannot reach it
later than the half of this Once this guy receives the message since P1 is
crashed P1 will answer. So it has to create a ping back to my ping. And this
ping will reach me by a time that is maximum delay at most. So if I do the count
my message to you at most take maximum delay the message from the guy to me at
most take maximum delay they have to reach me before this delta if they exist.
So the only reason why they do not reach me by delta is because P1 crash. It
cannot be in another way. And so it means that the algorithm has a strong
accuracy. So when a correct state when every process so for example that P0
crashed here. Right? This is possible. The proof does not change. So once a
process is the flag and say that process crashed it means that actually crashed.
Notice that you need this assumption. If this assumption does not hold and so we
have that delta is smaller than two times maximum delay then it's possible that
my ping and pong does something like this ping pong. Here I don't see the
message. I raise the flag and then I receive the the the ping after. Okay? So
for this algorithm to to work I need to to know the delay of the system.
Otherwise I cannot create the failure detector at least this failure detector.
So is the accuracy clear? Is the accuracy clear? Okay. So is the perfect failure
detector clear to everyone? Is it clear to everyone? Or there are people that
have doubts? Okay. And so if it is clear to everyone let us uh let me do some
questions to you. Let's say that we have a certain failure detector P Okay? And
this failure detector P has this execution. Notice that this failure detector P
can be any failure detector. But it respect to the property of strong accuracy
and strong completeness. Okay? Is it possible that we find an execution like
this there is this process that crashes P3? Okay? And then at a certain instant
we see that P0 detected the crash P1 say me not yet. For me it's okay. P3
crashed. P3 okay crashed. So because that's not exist anymore. And if I here
does not detect the crash and P6 here delta does not detect the crash. Is it
possible that we have an execution like this for a failure detector?Yes.Yes and
delta.If the failure detector is synchronous then no because everyone has to
receive the message until by the power of time P plus uh two maximum delay.Okay.
So your colleague says no it's not possible because by T plus two maximum two
delta everyone has to receive. There was the other guy the screenshot that say
that it was possible.But it But like it doesn't say there that from T prime
prime to three prime prime prime it's past two maximum delay. Maybe just past
one minute.So your colleague is saying I don't know how much time passed between
these two instant. So if this time is less than two delta then this situation is
possible. It's possible that someone detect it someone not. But in the future
what is has to happen so this primitive to be correct. So what has to happen in
the future because this is a a partial execution. Right? So in the future things
can change. To To be correct this execution what we need in the future?The The
other three have to detect the proof of the proof of theThat the other three
have to raise the flag. So we need that in the future the other three raise the
flag and this guy here say P3, this guy here say P3, this guy here say P3. Okay?
Now we know for the algorithm that we have seen that this time after everyone
detect is two delta. So after two delta everyone will detect for this algorithm.
But it's possible that there are other algorithms that need more time. Okay? The
specification just say eventually every process that crashes is permanently
suspected by every other process. Okay? But the specification does not tell you
the time you need for detection. The bound of two delta is for our algorithm
that is an implementation of a certain specification. Okay? So it's possible
that we have a correct algorithm in which only these two will detect and after
two delta this ping not detected yet and we will detect it after four delta,
five delta or whatever because the time to detection depends on the
implementation not on the specification. And so when the detection will happen
upon everyone this is something that depends on the implementation. So the
specification just say eventually the latency of our algorithm where the latency
means the maximum time so that everyone detect the crashes will depend on the
specification of the algorithm. Okay? Is this clear? So let's say that I want to
implement a failure detector where I change the completeness property in this
new property. Eventually every process that crashes is permanently detected by
every process. So in the original one that is is permanently detected by every
correct process. Here I want to change the specification and write by every
process. Can I implement this specification? So can I create an algorithm that
implement this specific uh ping in which I remove by every So you are saying
that you are not implementing it. Why?Because uh for a process to detect that
the other crashed it has to still be running. If if you can't guarantee that the
process is running running at least enough to detect it you can't guarantee it
will detect it.Okay. Uh what if delta zero? Uh even with delta zero we cannot
implement it. Delta zero is not possible because there is the speed of light and
so the maximum delay is at least the speed of light. So we don't have delta zero
in any physical system. Okay? The information cannot travel fast but cannot
travel faster than the speed of light. Okay? And so delta zero is not possible.
But even if it were possible let's say that we are in this situation where
process P1 that crashes at this time. And we have process P2 that crashes at
this time and then we have process P3 that is crashed. Okay? Is is it clear in
this execution? So if I want to implement this specification then every process
that crashes has to be detected by every other process. So it means that here P1
has to say P2 crash. Okay? It has to say it because I say every process that
crash is detected by every other. So it means that this guy has to detect that
P2 crash. Can you see the problem? So if you cannot do it I mean if you were
able to do something like this you were not following my classes. Of course
because you can see the future. So it it is impossible to implement because to
implement this primitive you need that this guy at this point in the in the past
has to tell P2 will crash in in two days that is not possible. Okay? So this
crashed here you need it because otherwise you cannot implement the ping. Is it
clear? Is it clear? So the specification also uh dictate that some if it is
implementable or not. You can also specify it that it's possible because you can
write anything. But not everything that I write makes sense. This is a which
does not make sense. Okay? Uh let's let's also do this other question the
algorithm that we have seen. This is something that I forgot. This algorithm is
called Okay? So your book sometimes gives name to algorithm. This is called
timeout while because you remove from the system people on the timeout. So you
have a timeout and if the timeout comes and the people does not answer you you
remove it. So it's called So consider the algorithm exclude on timeout. If at
time T I do not have a process P in my detected set can I state that P is alive
at time T? So this is the question. Consider this algorithm. We are running in
the system. So there is another process P1. We run the algorithm of process P1
at a certain time T. I look in the memory P1 and I see that the detected set of
P1 is empty. And I know that in the system there is also process P2. So if the
detected set is empty upon P1 at time T can I say that at time T P2 is alive?
No.Because uh the P2 could could have crashed in just after he sent the the ask
from the timeout before.Yes. It's possible that we have a situation like this.
Okay? At time T is not in the detected set and it will not be in detected set
also here because I the ping. And so the fact that at time T I do not see P2 in
the detected set does not tell me that P2 is alive because there is a latency.
Okay? There is a latency in this algorithm. Is it clear? So no I cannot state
it. And uh if you think about it no algorithm can say what is happening at an
instant time T. So if I stop an algorithm at this time T any algorithm the
picture that the algorithm has of the world is one that is old. Is old of at
least the delay of the messages. So what you know at time T is at least as old
as T minus the delay of the messages. It can also be older depending on the
algorithm. Okay? So you cannot build a failure detector that says immediately at
time T and give you the picture of the system and say at time T this is alive,
this is alive, this is alive and this is crashed, crashed, crashed. And this is
crashed. Yes, you know because it did the answer. But the one that to be alive
is possible that they are crashed and you have not detected it because you will
detect it at a certain delay. Okay? So the fact that you have a perfect failure
detector does not mean that you can say with 100% certainty the guy that is not
plugged in is alive. Okay? We don't know. Okay. And so P has a complexity of two
N squared. Now the question that I have for you is can we cut the messages that
our failure detector use by algorithm? Can we build an algorithm in which we use
N squared messages not two N?We could send the pings to everyone and expect that
the others do the same. So independently everyone tells the other that they are
alive around set interval.Okay. So your colleague is saying uh I can do an
algorithm in which I divide the time in interval because we are in a system that
is synchronous more or less we didn't do it. And I say here at time zero for the
rule of the algorithm everyone has to send a ping to everyone else that says I'm
alive. At time five seconds everyone has to send a ping to everyone else that
say I'm alive. But at time 10 everyone has to say to everyone I'm alive. Okay?
So instead of using the pattern I ask and I wait for the reply. I use a pattern
in which the fact that I send a message to someone means that he's at the time
alive. Okay? Is it clear how your colleague is suggesting to to do this
algorithm? We start at time zero. At time zero everyone send a message to
everyone else. At time five everyone send a message to everyone else. If at
time 10 I see that process P5 has not send a message I say because at time five
he should have send the messages. And so if I so not see the messages after a
certain delay I know that at five he didn't not send it because it was crashed.
Is it clear this this idea? And why you can use this idea? You can use this idea
because in a synchronous network uh silence are expressive. So if the network is
synchronous the fact that you are not sending a message, the fact that you are
you have silence is sending information. Because you can agree with other people
in saying to someone you have to send a message at that time. And so if you
don't see the messages you know that he didn't send it. But this you can do it
only in networks that are synchronous.
Because in silence is just the delay of the message. That so silence you can use
it only in synchronous system. Is it clear? Okay. Now the the the idea of your
colleague is really clean but we have to do a bit of let's say we have to to be
a bit more precise because we can say okay at time of zero everyone of us will
send the message but we know that in a synchronous system the time zero is not
the same for everyone right because even on the synchronous system we have the
the clock skew. There is a small difference of the clock that is usually small
but there is right there is an So it's possible that time zero for a process P1
is time one for a process P0 and so it means that process P0 started with a
message is a bit earlier because it's a bit earlier with respect to us. Or it's
possible that process P0 will send the message is a bit later because it's a bit
later with respect to us. Because in our system even if we have the clock
synchronization the clock of process P1 and the clock of process P2 will have a
difference of delta that we can bound. I mean we know delta from the clock
synchronization algorithm and the delay of the channel. I know that this is 5
milliseconds but this is 5 milliseconds and so I have to make an algorithm that
works even if there are these 5 milliseconds of difference between me and you
that they are. Is it clear? Is it clear to to to everyone? Okay. So to create
the algorithm that your colleague was suggesting we need to know the skew of the
clock, the maximum skew that is delta. Then we need also to say that our minimum
delay of the channel is greater than delta and this is a technical thing that we
need. So our channel will have a maximum delay but we also have a minimum delay
and then I need that this minimum delay is greater than delta for the algorithm
delta to to to work. Okay. There are some people that here they have doubts they
say but what if the minimum delay is less than delta? What if my network is
really fast and the skew is greater than the the minimum delay? This is not a
problem because the minimum delay you can always increase. How I increase the
minimum delay? I receive the message from you, I wait few milliseconds and then
I send it to the other delay. So the minimum delay I can add this to my
algorithm for free. When I receive a message and not use it immediately I wait 1
second and the minimum delay of every message is 1 second. Okay. So the minimum
delay we can increase it if we need. Is the maximum delay that we cannot we
cannot decrease and we can increase but we cannot decrease it with it. Okay. And
so this is the algorithm. The algorithm is is less aligned than the one before.
So on the synchronization event we have this C and this is the clock of our
process because we need to use time in this algorithm. We need that at time zero
we send at time two we send so we need the clock. And this is a variable that is
updated by the system. Okay. So when I check this variable this is the time of
the system. And this variable is automatically synchronized by the clock
synchronization. So this is the software clock. Then we need a certain constant
T. This T is called the round length of our algorithm and will be greater than
skew time maximum delay plus delta. And why we need that this T is greater than
this one? So that I know that I will receive the messages from the other even if
the other starts desynchronized with respect to my send and even if the messages
have delay. Then I have the second correct process and the second correct
process is all the process in the system at the beginning. Then I have round
alive and at the beginning is correct. This round alive I will put inside the
process that I know that are alive at a certain round. And then I have the round
number that initially is minus one. So what is this round I am talking about?
This round is is the structure of the algorithm. So in our algorithm we will
divide the time in slices of T and everyone of these slices is a round. So from
zero to T is the first round. From T to two T will be the second round. From two
T to three T will be the third round and so on and so forth. So when someone
tell you that an algorithm is a round based it means that it's in dividing the
time in discrete interval. So that we have round one round two round three and
so on and so forth. So our algorithm will go in this discrete interval of time.
This end length is the one that start a new round. Is the end length that makes
our algorithm and takes in the new round. And what we do when our clock this is
here I am writing when my clock is equal to K multiplied by T for some K that is
a natural number then I do something. Okay. So what I'm telling when this clock
is equal to zero because when K is equal to zero this will be verified I will do
something. When my clock is equal to T I will do something because this is equal
to K equal one. When K is equal to two this clock will trigger when the T is two
T. Then we trigger again at three T, then a four T, and then a five T and so on
and so forth. So here I'm saying and writing the mathematical notation any T
unit of my clock I do something. So I do something at zero, at T, two T, three
T, four T, five T and so on and so forth. Is it clear? So I'm saying every time
my clock is a multiple of T for any possible multiple. Clear? Okay. So let's say
that our clock is zero at the beginning. What we will do? We trigger and I start
a new round and the initial round is round zero. Why is round zero? Because
minus one plus one is zero. So at time zero our algorithm starts and we start
round zero. Remember that this will not be the same on everyone the system
because on someone will start here, someone that is a bit late with the clock
will start a bit after, someone that has a bit before in the clock can start
delta before and so on and so forth. So it's not the start of the round is not
perfectly synchronized on everyone because we have the clock synchronization
that trigger a problem. So the start is not on everyone at the same time. When
the new round starts what they do? For any process that is incorrect but is not
in round alive I will say that at the beginning round alive and correct at the
same. So this is empty. This symbol right here correct this symbol round alive
this is set minus is the difference between two set. The difference between two
set. When you set are equal the difference is the empty set and so this thing
will not trigger. Okay. So this uh this slash means set minus. Or once this is
done at a round zero I will not signal I will not signal anyone because the
algorithm just started. So correct is equal to round alive at the beginning. So
this thing does not trigger at the beginning. What I do? I set round alive equal
to myself because I I know that I'm alive. And then for all the processes that
are incorrect and at the beginning is everyone in the system I send to that
process a bit that is a ping. Let's say I'm alive. So I send the at the
beginning P0 will send the the bit to P1. Okay. Once I receive the bit from
someone what I do? I put that someone in round alive and that's it. And don't
reply because the moment that I reply I will need to have messages. So I cannot
reply at this point. Is it clear? So how the algorithm works? Let us see this
example with two process P0 and P1 and everyone is called. We have the round
that starts on P0 here and on P1 here starts a bit late. Here P0 starts and we
will say correct is equal P0 P1. So this thing this this end does not trigger
because round alive is equal to correct at the beginning. So I do not signal
everyone as crashed and I send to everyone that is incorrect the bit. Okay. Also
to myself I will send the bit. Notice that here in this algorithm actually I can
remove this line and the algorithm still works because when I send the bit to
myself I will put myself in round alive at this point. Okay. This process will
start the round a bit late but it will do the same stuff. For everyone that is
in the system I send the bit. So I will send the bit to P0. P0 received the bit
at this point and so P0 at this point will put in round alive the will be equal
to P0 because you put yourself at the beginning plus P1. Here we trigger again
at T. We trigger again at T. We enter, we want the new round that is round plus
one. If this is round zero this will be round one. We enter inside and we say
correct minus round alive that is empty because everyone is called. I do not
trigger the crash. And so what I do? I send a bit to everyone else including
myself. This guy will start the round in this case a bit late. He send the bit
to bit reduces me. And then I will update here alive set and alive set is equal
to P0 P1 and when I trigger here no one crashed and so I will not signal it.
Let's do the example in which P1 crashes. What happen? We start our round and we
send the bit to P1. P1 send the bit to us. So here in round alive there is P0
and P1. So when the end triggers again I do correct minus round alive I I
increase it so this line will trigger. Here I start the new round and this guy
crashed before the new round. So I will send the bit to P1 but P1 will not send
the bit to me. So it means that once we trigger here this end again round alive
will contain just one process. Which process round alive contains? Just P0 just
yourself. And so I will do correct and correct contains P0 and P1 minus round
alive and the the result of the difference is P1 and so I will do for P1 that is
in the difference. Correct is correct minus P1. So correct will be just P0 and
then I trigger crash of P1. Why because P1 crash. Okay. Notice that since I
remove P1 from correct at the next round I will do correct that is P0 minus
round alive that is P0 and I will not signal again P1 because I remove it from
correct. So once I remove it I cannot signal it anymore. Okay. Is it clear? Is
it clear for everyone the algorithm? Is it clear? Yes.So with this algorithm if
a process if a process crashed we don't send the bit to him anymore.Yes.So this
is a scenario where the process cannot return back from a crash.Yes. You cannot
trigger in this process you never return. Okay. So yes these algorithms you
cannot but this is the assumption that always do once you crash you crash
forever. You cannot rejoin the computation. Other question, other observation?
Other question, other observation? Okay. Yes.The R I equals R plus one Do you
have to end that to the message to the bit?No it's not necessary.So but it's not
necessary at all?So in this algorithm it's not necessary to send the round the
round number. We don't you don't need it.Yeah.Okay. So no R is just a local
variable.Yeah just to keep coming.Yes just to keep up on the round. So actually
if you look at the algorithm I can remove R and the algorithm still works. Okay.
So I'm showing you R to make explicit the concept of round. To say this is zero
and there is a period that is zero more or less for everyone. Then there is a
period that is one for everyone. Then there is a period that is for everyone
because this round stuff and we will discuss it in a bit is more generic. Okay.
So for this reason to make the concept of round explicit I'm using R. Yes.The
distance between R and R plus one and R plus two this will be different because
R can change except to the delta. So one could be longer compared to the other
one or not.Um uh actually yes it's possible that this period and this period
they are a bit shorter because clock of the clock synchronization you can have
this kind of problem. Okay. So if this time is small enough this will not count.
So the only effect that counts is the fact that the start is not the same for
everyone and also the end is not the same for everyone. Other question, other
observation? Okay. So let's see the the the proof of this algorithm and then we
do a small break and we we see the eventually And so this algorithm are the the
execution that I showed you has an assumption. And the assumption is that if I
enter in round zero I will receive the ping that another process create around
zero in round zero. The algorithm works using this uh assumption. The assumption
is that when I enter in round zero if you send a ping at round zero I will
receive it inside round zero because if we are we are not synchronized and since
you can start a bit before me or a bit after me two things can happen. One thing
is this one. You start a bit before my round. You send your ping and your ping
is really fast and reach me before I enter in the round. and this is a problem
because then in this round I will remove you from round alive. I will assume
that you are sending a message but I will not receive the message because I
received the message before the start of the round. And so if this happen the
algorithm is broken. So we have to show that this cannot happen. And there is
also another ugly situation that can happen. What is the other ugly situation?
One is that you send the bit and I receive it before the round. And the other
the other is that you start late because it's possible that you start late. You
send the bit and I receive the bit after the round. And it's also is has a
problem because I remove you from round alive. I'm assuming that I will receive
your message of round zero in round zero but I will receive it after because I
didn't account for the delay of the messages and the synchronization between
process. Okay. So this we have to show that these two situations cannot happen.
If I show that these two situations cannot happen then the the the the fact that
the algorithm is correct is is almost obviously clear. But I have to show that
it's not possible that I receive your bit of round zero before my round zero or
after my round zero. Is it clear what I want to show? Is it clear? So what we
want to show is this lemma. If I send a bit to a certain process P when my round
number shows R then the bit reaches P when its round number shows R. This is
what I want to show. Because if I can show this this thing then the the proof is
is is immediate. Clear? So let us do the proof. Let us say that we have a
process P0 then enter in a round zero at time T. So here we send at a certain
round. I'm using zero just for for putting a number in in the any round. So if I
enter at round zero at round T at which time I will exit round zero? In our
algorithm at T plus capital T. Okay. Remember this quantity is capital T. We did
in our algorithm that every capital T we enter in the round. Okay. Is it clear?
And here we have a process P1. We have to show that if P1 send a bit around zero
to P0 this bit will reach P0 in round zero. Now let us first show that we cannot
receive the bit before. Okay. I cannot receive the bit from P1 for round zero
before round zero. If P1 start round zero after my round zero or at my round
zero this situation cannot happen. I cannot receive the bit before my start of
the round. If you start your round at my time or you start the round later than
my time. I cannot receive the message here because you send the message after.
Okay. So what is the only situation in which I can receive the message from P0
before my round P0? If P P1 start the round before me. And what is the worst
situation? Is that P1 start its round as early as possible. Okay. But at which
time minimum P1 can start the round? What is the minimum time at which P1 can
start if I start at T? At T minus delta. We cannot start before T minus delta
because otherwise we are otherwise we are not synchronized by delta. If we are
synchronized with delta that is 1 second you can start 1 second before me. You
cannot start 2 seconds before me. Otherwise it means that our clock are
synchronized with a bound of 2 seconds not one. Okay. Is it clear? And the
message in order to reach me before the start has to have the minimum delay as
possible because the more delay we add to the message the more you know the
messages can reach me in the future can reach me in my arm. But this delay is
minimum delay. And we said by assumption that the minimum delay has to be
greater than delta and so it's not possible that we have an arrow down down like
that. The arrow has to be at least minimum delay and minimum delay is at least
delta by construction. And so it means that even if you send your message at T
minus delta I will receive the message at T plus something because the minimum
delay is strictly greater than delta. Okay. You are in a network in which the
delay is less than delta is not a problem because in our algorithm you reach the
message here and you add the delay to the message and then I process the
messages. So the minimum delay I can increase it. If we have a synchronization
of 1 second I do like this every message that I receive I wait 1 second and then
I process it. And the message has a minimum delay of 1 second. Okay. Clear? Is
it clear this this situation? Now the other ugly situation is that P1 send the
message for round zero and I receive the message at round one or round two
after. Okay. So what is the worst case that we have to analyze? P1 when is that
the P1 when must to start the round to make this situation likely? T plus delta.
At T plus delta. P1 has to start the round as late as possible in such a way
that we have late here, late of the message and I increase the possibility of
receiving the message after. Okay. So this is the analysis that I have to do
that this guy is starting at T plus delta because less than delta I'm mapping
myself. But the message from P1 to me how much time it can take? It can take
Okay. So this entire quantity from here to here how it will measure the quantity
that I'm doing in purple? It will be delta that is this quantity here, the delay
plus maximum delay of the channel. So I will receive the message at T plus delta
plus maximum delay of the channel. But this quantity delta plus maximum delay is
strictly less than two times delta plus maximum delay. That was this T. This T
in our algorithm we set T in our algorithm to be two times maximum delay plus
delta. So it's not possible that this message will reach me after T. It has to
reach me before T because this quantity in purple is less than T. It's actually
less than half T for the measure that we did. Okay. Is it clear? So now we know
that if a process P1 send a message to me at round zero I will receive it round
zero. If it will send a round one I will receive it round one. If it will send a
round two I will receive it round two. Okay. And now the strong completeness and
the strong accuracy they become obvious strong completeness if the process
crashes. I will not receive the bit and I will signal it. And I know that if I
do not receive the if once the process crashes at a certain round I will not
receive the bit in that round or in the future round. Because we know the proof
that if the process send the bit around five I will receive the bit around five.
So if the process crashes before six I will not receive a bit for round six or
round seven or round eight because the bit of round five I have to receive
around five. So I cannot receive it late. So this is still complete. Strong
accuracy. Let us assume that around eight I signal a process. If I signal a
process then I did not receive the bit for round eight. But the only reason for
which I do not receive the bit at round eight is that that process has not send
the bit of round eight. Because for the previous proof we have that if that
process has send the bit of round eight I have to receive it around eight. I
cannot receive it at seven or nine. So you cannot skip a bit. So if around eight
I do not receive the bit and I signal you the only reason is that you do not
send you you you you did not send the bit. And the only reason that you do not
send the bit is that you crashed. Because otherwise you have to execute the line
send the bit. Okay. Clear? So as a normal work try to find the minimum T that
make this algorithm correct because two time maximum delay plus delta is much
larger than what you need. You can decrease the time and the algorithm still
works. Okay. Just that I I decide to be of same size. Okay. Okay. So let us do
a 10 minutes break and then we will concept of round. And actually this concept
of round is is more general than just this failure detector. Because what we
have seen with the lemma if I send a message in my round you will receive the
message in the same round is that actually in a synchronous system we can create
a pattern that work in this way. There is round zero that starts in a bit
different time for everyone but it doesn't matter. Why doesn't matter? Because
you will still receive the message in that round. So even if you start a bit
earlier or a bit late with respect to the other we don't care because round zero
starts. Everyone that is correct send a message at round zero and we know that
everyone that is a receiver will receive that message by round zero. And this is
general. I mean I can use this mechanism for any algorithm. We are using it for
the failure detector but I can use it also for another algorithm. So it means
that in a system that is synchronous I can abstract the synchrony by using
round. I can say we have a system which around zero starts and everyone send a
message to someone else and everyone will receive this message before the end of
round zero. Then the round one starts, everyone send a message to everyone else
probably also as a subset. It we don't care. And everyone that has to receive
the message will receive by the end of round one and so on and so forth. And so
there is an equivalence between the synchrony and creating system that works in
this structure. Round zero for everyone, round one for everyone, round two for
everyone. And with this round we can also neglect the error of synchronization.
We don't care because we did the proof once and so we know that even if you
start a bit late if a bit earlier if we trade if we take the length of the round
long enough we don't care because it's as if we start everyone at the same time.
So logically this is equivalent to starting everyone round zero at the same time
and we send the message. Everyone receive the messages. We start round one
everyone at the same time and so on and so forth. So there is an equivalence
between synchronous system and round based. Of course what is the disadvantage
of using this round system? That in round we are slowing down messages because I
can send a message now but then the next message that I can send is when the new
round starts. I cannot send the messages in the middle because otherwise the
message in the middle can be received not in the same round. Okay. There is a
read that you can read that is called the splendor and miseries of round of
Shini that from this article you can read it. I think it's fake. There is a link
of website where describe this technique of the rounds and show you several
examples, several algorithms. And you can look at it. We will see again the
concept of round in in algorithms a bit later in the classes where there is the
idea of the delay in the time is long and we have logical slot zero, logical
slot one, logical slot two and so on and so forth. Okay. Are there question on
the round? So this round construction is powerful because I can say if around
zero P2 is alive and send a message everyone if P2 is correct and send a message
around everyone will receive this message before the end of the round if P2 is
correct. Okay. And so now let us see that we are using the failure detector the
the the round based P. Round based P is this failure detector here. Okay. You're
using this failure detector. And let's say that we have this failure detector
and we have this execution. We have round one we have round two we have round
three and P3 crashes. Unfortunately at round three we have that this one signal
say P3 crashes, this one says no, this one says P3 crashes, this one says no,
this one says no. Is it possible that we have an execution like this in our
algorithm? Is it possible that we have an execution in which P3 at the end of
round three not so the end of the beginning of round three. This is the end of
round two. At the beginning of round three someone will signal it and someone
will not. Is it possible that we have this situation?No.No.Okay. Why is not
possible?Because it crashed at at the end of round one like before round two
began.Uh-huh.And so at most one round later so throughout that round uh it
should they should have received the the heartbeat. IfBut here here there is the
start that is actually right aligned with the start of the round. Is it possible
that you have an execution in which we have this situation where that around
three someone will will detect and someone not or at round three either everyone
detect or no one detect. So is it possible that you have this situation or we
also need always need to have either this everyone detect or this no one detect.
Can we have something in the middle in which someone detect and someone does
not?No.No. Why you say no? Because you say okay P3 here start the round send the
messages and everyone has to receive. Right?Everyone has to receive it in the
round in which set.But how do you send the message when you are P3?Just before
crashing.Yes but how you send it in code in Python? I use another message to
everyone.You start with the first one.You start with the first one. So you will
write a for right?Yeah a for loop.You write a for loop where there is a P1 P2
P3. Okay. And what happen if you die in the middle of the four?Only the first
few algorithms send.Someone will detect someone not because what can happen is
something that is I have my four. And in the middle of the four I crash. Right?
And if I crash in the middle of the four what will happen? Some messages will be
sent and someone not. Okay. So is it possible that we are in a situation in
which P3 start the four is able to send a message to P1 to P5 and to P6 and then
he crashes in the middle. And this guy does not receive it and this guy does not
receive it because they were not I mean was not fast enough to send. Okay. Is it
is it clear?It's clear.Is it clear?Yes.Now someone of you can think okay but if
this situation happen I always have to see something like this because it's a
four. So I always have to see P0 P1 P2 and then I do not see. But this is not
true because in the network there are always you know our perfect point to point
link, how it works below. Our perfect point to point link below was a And the
failed can lose a message. So it's possible that in the four it has P0 P1 P2
before P0 the message is lost. P1 the message was on the failed P2 is lost and
you then goes on the Okay. So it's not always that this guy will send P0 P1 P2
and P0 P1 and P2 received because you do it in the four. But then it's possible
that the messages are lost or it's possible that you know how your works. No you
don't. You are not ensured that your will send the messages in the same order
you write it on your code. Okay. Is it clear? So is it possible that even if we
have a four we have die in the middle and someone receive it and someone not and
it's possible that the order of the process that the set of process that receive
the messages is not following the order of the four. So it's possible that P0 is
skipped for some reason, P1 will receive it, P2 will receive it, P3 is skipped
and before will receive it and everyone else will not. Okay. Clear? So in the
round based I said everyone will receive the message if the sender is correct.
So if the sender is correct the sender will do the loop. And then okay everyone
will receive it. But if the sender is not correct he can die in the middle and
it's possible that some messages are left on the network. Okay.
And we will fix this problem in the broadcast module. We will see that we can
build distributed primitives, special broadcast in which even if the sender
crashes everyone that is connected will receive the message. Okay, so this we
can fix but it's it's complex. We can do that. And it's not that complex. But we
will fix that. Okay. Is it Is everything clear now? Clear clouds. Okay. So let
us take our algorithm and screw down timeout. This is the algorithm that we've
seen is the algorithm of the ping and the pong. Of the algorithm that I was
sending ping and pong. What is the advantage if I try to decrease delta? What
changes in this algorithm when I try to decrease delta? Delta is the time
because in the algorithm we are doing ping ping pong delta t ping pong delta t
ping pong delta. If I decrease delta, what advantage I have in my algorithm?You
find out sooner if the process crashed.The The latency for detecting a crash
decreases. Right? Because the less I have my delta, the less I put my delta, the
more I'm fast. Okay? And I can try to put my delta equal to two two times
maximum delay. Do you agree? I can try to do something like this. But two time
maximum delay is a bit dangerous because if we did did not do all the
computation perfectly, what will happen? I will do ping. Uh I receive the pong a
bit later and so I detect and then I receive the pong. But I will receive the
pong. Right? So if I try to push my delta too much near the limit is of the
system, if I did not did the the the math correctly, then it's possible that I
can make some mistake. But still if the process is alive I will receive the
ping. I will receive the ping later. Right? But if the process is alive, I will
receive it. Do you agree? And this is the introduction to the second primitive
of the family of the failure detector. We just see two kind of failure detector.
There exists many. We just see the perfect and there is the second kind that is
called the eventually perfect failure detector. And this is the symbol. This is
diamond of the ping because diamond in temporal logic means eventually
eventually perfect. Okay? So this is a failure detector that can make mistake.
So it's a failure detector that can make mistake in the sense that it can signal
someone even if that someone is not crashed. So you can you look that guy
crashed and then you see it is after a bit now I have to revise my my suspicion
that guy is actually correct. And then I can say oh that guy was crashed and
then I can revise my suspicion that guy is correct. And this eventually perfect
failure detector works in our eventually synchronous system. You remember the
eventually synchronous system was the system that was done like this. Our
eventually perfect system was in this way. We have a certain bound of the
channel that we do not know and there is the delay that goes but there is a time
t after which our system stabilizes.Correct.Forever. This was the example of the
internet and in the But there is a time after which there is no problem anymore.
And this eventually perfect failure detector works in this kind of system. And
what he will do when the system is in this period of he can make mistake. He can
say oh that guy crashed but then receive the ping and say oh no no no the guy
was actually fine and then I say yeah the guy crashed but then but it was
actually fine. Whatever. But there will be a time after which does not make
anymore mistake. So there will be a time after which this failure detector when
he sees that guy crashed the guy actually crashed. Okay? So this is called
eventually perfect because in this period he can make mistake. After the
stabilization time t the eventually perfect failure detector becomes perfect.
Okay? Is it clear what is the idea of this failure detector? It's to trade off
accuracy for making something that works also in this system. Because the
perfect failure detector in this system does not work because the moment that
the delay becomes above your maximum delay you make your first mistake and you
are done. But it's possible that there are algorithms where a failure detector
like this you can use it. There are algorithms where even if you make a mistake
you can recover from the mistake. Okay? Clear? Is it clear? And so this is the
the primitive. So the abstraction has two events. An event suspect certain
process and an event restore a certain process. So there are two events. Why?
Because you can suspect someone and then you understand that that someone was
actually alive and you will restore that someone. So we can have a situation
like this. There is ping zero and there is ping one. And ping zero starts
suspecting ping one at this point. You say oh ping one crashed. So this ping
will trigger. And then you receive a ping back from ping one and say oh actually
ping one was alive. And so this ping will trigger the restore. And then again
there is a delay in the channel and so you will say ping one suspected and then
you will say restore and so on and so forth. And so we have two events. Suspect
and restore. And we have two properties, strong completeness. Eventually every
process that crashes is permanently suspected by every correct process. And this
strong completeness is equal to the previous one. So what it's telling is
telling if a process crash our system can say oh that process is alive, that
process crashed. But after a bit has to say crash, crash, crash, crash forever.
You cannot say anymore that process is alive. Okay? This is the strong
completeness. And then there is the eventually strong accuracy. Eventually no
correct process is suspected by any correct process. So you can make mistake. So
a correct process ping one can suspect a correct process ping two for a lot of
time. You can say suspect restore suspect restore suspect restore. But there is
a time after you will restore it and never suspect it anymore. Okay? You will
say ping one ping two restore and never suspect it. Clear? So in are the the
property clears. Are the property clears. Okay? So which one of these property
is uh the safety one? Which one of these properties is the safety one? This one?
So the first property safety aliveness is aliveness. Okay? Because it's possible
that this guy crashes and I say alive, alive, alive for a lot of time and then
after an eternity I will say crash. Okay? So this is uh aliveness. You cannot
violate it infinite time. The second one. Yes. Also the second one is aliveness
property. Okay? So they are both aliveness properties so there is no safety
property. This is the first primitive that we see with both aliveness. Okay? So
the first one is aliveness and the second one is also aliveness property. So
they are both aliveness properties. Clear? Okay. And so now let us say that I
come to you and we have our eventually perfect eventually synchronous system.
Sorry. That works like this. We have our bound that we do not know and after a
time t we are below the bound and below forever. And I ask you implement diamond
p. So implement diamond p on this system. How we can do it? What is your idea? I
mean you are old enough that you can try to build this before I show you. So
what it can be the idea to build this algorithm? We have to build a failure
detector. Okay? So what is the basic idea that we can use to build a failure
detector? Your colleague saying let us try with the perfect failure detector. So
I do an algorithm in which I send a ping and I and wait for the pong. Right? Is
it clear? Notice that on the old algorithm we need our delta to work. And to fix
this delta we need to know the maximum delay of the channel. Okay? The problem
is that here we do not know what will be the maximum delay. We know that our
system will stabilize and after a time every delay will be below some bound but
we do not know it. Okay? So what we can do if we do not know this delta? No, you
do not know the bound. So you do not know the bound at the beginning. You know
that your system will stabilize to some bound. You can do some experiment. No,
you cannot do some experiment because you do the experiment now then you ping
your system on another network and then your experiment is done. We can say like
if we continue to send pings at some bound we will receive them if the process
is uh not crashed. So one idea I can say I keep sending ping and then I hope
that after a time the guy will answer in by the time. Right? But if the system
stabilizes to a bound that is 10 times delta this thing will not work because I
will send a ping and we take 10 delta and then I will receive the the things
that we take. Yeah but I did we but we don't define the time like uh eventually
when it becomes synchronous it would work. And but how do you do? You have to
fix this delta in the algorithm. You have to write a value in the algorithm for
delta. How you write the value? So if I fix the value at the beginning I say
delta is 5 seconds and then the bound is 20 I'm done. Because when I stabilize
to the bound I send a message and it will take 20 seconds and we receive So I
cannot set delta at the beginning because if I set at the beginning the system
will say oh yes I will Good job. And then the delay become you know 20 and I
stabilize to 20. So I cannot fix delta at the beginning. So your colleague
saying uh as a nice idea saying every time I send a ping and I do not receive
the pong you say I increase delta. Okay? And this can be seems seems nice. You
say I send a ping. Every time I do not receive the reply back I increase the
delta. Okay? Does someone from this idea can can see another solution that is
similar but is a bit better? So you have to increase the delta when you make a
mistake. Right? Yes. Yes.So like we could use something like networking at stuff
like use the way the moving averages of the the previous delays something like
this.Okay. That is uh far more complex than what I'm thinking.When we receive uh
delayed delta uh response so like now when we send it we don't get it but like
when we send a ping if we later receive a pong to a ping we previously send we
increase it.So the idea is this one. I have my system that was delayed. Right?
And we stabilize for a certain bound that I do not know. I start with a delta
of 5 seconds and I start ping pong. If I'm wrong there will be someone that is
alive. I send the ping and I will receive the pong late. Right? But I can see
that I was wrong. When I see that I was wrong I say oh I will double delta so
delta become 10 seconds. Okay? Clear? So every time I'm wrong I double delta. I
double delta. I double delta. What will happen when I stabilize at this point? I
can be wrong with delta five. But I will receive the ping from the guy that is
alive because the guy is alive so sooner or later I will receive the ping. When
I receive the ping I double delta. And then if delta is less than delta then
bound sorry then p I will make again the mistake. Uh no ping here. I will double
delta again. I will double delta again. I will double delta again. At some point
delta will be greater than the bound. And I will not make mistake anymore. Okay?
Clear? Is it clear? Is it clear what is the idea? And so if you think about it
the idea is extremely simple. We use the perfect failure detector algorithm with
a certain delta. And when I make a mistake I increase the delta. When I make a
mistake means when there is a process that I suspected for which I received the
I received the ping I will say no that process was actually alive delta
multiplied by two. Okay? I can increase delta also in another way. Multiplied by
two is the easier one to get the bound is to one of the one that goes faster to
the bound because after a logarithmic number of increase you you get it. Okay?
Then there is a a problem actually when you look at the details that we will uh
discuss. So is the idea clear for everyone? Is the idea clear for everyone? So
we will look at the code and then uh this is the explanation. We will look at
the code and then the code we will do it at the next lecture. So this is the
code of the algorithm. So if you look at this code is more or less the code of
the perfect failure detector where the only things that change are this line
right here. Okay? So most of the algorithms that we will see in these classes
are one of the very little of the other. So if you remember one family and one
technique you can reproduce the other algorithm. I will never ask you at the
exam to write the code of an algorithm. I might should but I will not. You don't
have to write the code but I I expect that you are able to describe an algorithm
in plain English. So I I can write you the question describe the eventually
perfect failure detector and you have to describe it. Okay? When it's possible
that I give you an algorithm that is not correct I give you a derivative of this
algorithm where I change one line. But if I do that I also give you the original
algorithm so that you can compare and see what is the line that changes and then
understand if that line breaks some property or not. So what I expect is that
you know a description of every algorithm and you know in your end more or less
why they work so that you are able to solve the the exercises. Then there will
be also an exercise in which I ask you to write a new algorithm but something
something for some small problem. So we will see this kind of exercises in a few
lecture. So let us look at the code without any further further delay. So there
is the alive set that initially is all processes. There is suspected that
initially is empty. In suspected what we will do? We will put the guy that we
suspect are crashed. There is our delay that initially is delta. And during this
delta we will be able to increase it. And then there is a start time that
initially is set to delay. So this is the timeout. How the algorithm works? When
I timeout I check if there is someone in alive and in suspected. So this symbol
right here is the intersection. This is an intersection between two sets. And so
the end we do like this. And the intersection we do like this because are more
or less the same thing. The intersection is when both are and the end is also
when both are true. Okay? So and we will look at these end there in a bit but
essentially if essentially if there is a guy that is alive and in suspected I
made a mistake. So what I do? Delay equal delay plus delta. And this means I
multiply delta by delay by two. If I do yourself plus yourself is greater. For
all uh processes in actually no I'm I'm wrong. I increase by delta every time.
So this goes delta to delta to delta to delta does not double it. Okay? You can
double it. It's the same. For all the proof for the things is the same. For all
processes in our system if there is a process that is not alive and a process
that is not suspected what I do? I suspect it and I trigger suspect. These two
lines of code are equal are equal to these these two lines of code. There there
was if there is someone that is alive and not in detected. Here I do the same
thing. If there is someone that is alive and not in suspected. I will set
suspected not detected because I can be wrong. Okay? If there is someone that is
not in alive and not in suspected what I do? I suspect the process and they
trigger suspect. So Otherwise if there is someone that is in alive and someone
that is in suspected so I made a mistake. What I do? I remove the guy from
suspected and they trigger restore the guy. So I trigger this thing. In any case
for all the process in the system I send to the process the I set alive equal to
empty and I start my delay. I send this message, this message and process ping
zero. There is process ping one. I make Here alive initially is empty. And what
I do? I will send my to ping one. Ping one receive the request. I receive the
reply at this point and what I do? I put in alive the process. At this point I
put in alive ping one. Notice that I also send the message to myself. So I also
send the message to myself. I will receive the message from myself and so I will
also put to myself in alive. Okay? Now when I will figure again the delta there
will be no one in alive and suspected and there will be no one that is not in
alive and not suspected because everyone is is uh accounted for. So there is no
suspect. When is that there is a suspect let us suppose that the system is slow.
Is in the asynchrony period. We are here okay where we are above our bound. We
are in the asynchrony period it means that my messages will do something like
this. Okay? Clear? So I send the message to myself. I send the reply to myself
and they are alive. We contain ping zero. Here I trigger again delta. I go here.
Is there someone in alive and in suspected? No, because suspected is empty at
the beginning. For all processes is there there is someone that is not in alive
and not in suspected. Yes, there is ping one. Ping one is not in alive and ping
one is not in suspected because at the beginning suspected is empty. So what I
do? I put in suspected our guy ping one. I trigger to the upper layer and I say
ping one crashed. Ping one is suspected were crashed. These things does not
trigger because there is no one that is in alive and in suspected because is an
empty if. So if this is verified then just this check and do not do this further
check. And that's it for this thing. What will happen? Here I will figure again.
And when I trigger again at this point there is in alive there are two people.
What we see the two people in alive? Ping zero and ping one. And there will be
ping one because I received the ping from ping one. So I do the timeout. Is
there someone in alive and in suspected? Yes, there is ping one that is in
suspected and this is in alive. So what I do? I increase the delay. I enter in
this for and I check is there someone in alive and in suspected? Yes, ping one.
And what I do? I remove him from the suspected set. And I trigger to the upper
layer restore ping one. So ping one is alive. Let's restore it. Okay? Are there
question on the algorithm? Are there question on the algorithm? Okay, I have a
single question before we end the lecture. Let's say that I give you this
algorithm. Can you predict what will be the value of delay? Can you predict the
maximum value of delay for your execution? So I give you the algorithm and I say
the algorithm will run in your system. And the bound of your system is 10. So I
also give you the the bound. Okay? I say that your system will stabilize to 10.
Can you predict what will be the maximum value of delay?Yes. If you say it's at
most 10 after at most 10 you can just calculate how many times you could have
sent it and it assume it was wrong every single time it was late.And so your
colleague saying let say that we do delta equal to five. I can compute how many
times I have to increase delta to reach 10 or above and so I can compute the
maximum delta that we will reach. There is another guy ask.Yes.You cannot
predict it because before is you know there are these things. You again before
there is above the bound.Yes.In it is necessary that so you cannot predict the
actual value before because before the system oscillate. Right? So it's possible
that before here the delay becomes one hour for 10 days. And you will be below
one hour. Then after the delay becomes two hours for three days and you go below
three hours. Even if you stabilize to 10 you do not know in the period before
the stabilization time what is the maximum delay. And so you cannot predict
because it's possible that you are in this you know in this part and your
algorithm will increase, increase, increase, increase, increase Okay? So someone
of you will say the algorithm is inefficient because we find we you know we end
up with a delay that is much bigger than the one that we need. And actually you
can try to build the more refined algorithm which you start decreasing the
delay. You see that you are correct, correct, correct and you say I decrease, I
decrease, I decrease, I decrease the delay. So you can try that. We will not
look at it because we look at correctness because already correctness is
difficult. Okay? So we will not look at the completion. See you on Monday.
