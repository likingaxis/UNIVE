

--- Lezione_9 ---

So, good evening, and in the lecture of today, we will start the topic of the broadcast.
So, in the last lecture, what we saw is the primitive of leader election, and the eventually
perfect leader election, but mainly leader election.
And today, we move to the first, let's say, basic primitive, that is the one of sending
a message that has to be received by all the other processes in the system, according,
of course, to some limitations that are unavoidable, and are due to the fact that the source of
our broadcast may fail when the broadcast is running.
So, if there are no failures, the communication of the broadcast is easy enough.
There is a source that will send a message with a phone, and this message will reach
every process in the system.
Because the source does not fail, so it will be able to send a message to process one,
process two, process three, and so on, and so forth.
But to me, so, during the lecture on the failure detector, when we were discussing the round
base failure detector, that there is a problem when there is a crash failure.
Specifically, if the source of the broadcast crashes, then it's not, let's say, ensured
that the message that is sent by me.
So, the process two is received by everyone, because you are starting to execute the four,
you are able to send a message to process one, send a message to process two, you send
a message to process three, but it's lost by the channel, so you send to process four
and it goes, and you send to a subset of the process in the system.
And this is something that we don't like.
Imagine that you have your bank account that is replicated on three machines, and from
your cell phone application, you do a bank transfer, or better, you receive.
Let's say, you have a bank account that is replicated on three machines, and from your cell phone application, you do a bank transfer.
That's why you receive some transfer of money, because you have no transfer of money.
Let's say, that you receive some transfer of money, but this transfer update is just
part of the replica, because the guy that is doing the transfer crashes in the middle.
So, what happens?
What is the quantity of your bank account?
It's undefined, right?
There is one replica that says 110, and there are three replicas that say 100, so, what
is your money?
It's a matter of how, and we shouldn't want to solve this problem
with computer science.
And so, the first and the easiest broadcasting
broadcast primitive. It's the one that gives you no guarantee. It's just the four and this
four is called in the distributed computing community as a best effort broadcast. Why
best effort? Best effort means you try to do things in a best effort way without, you
know, giving any guarantees. And in this case, this primitive, the property that it has,
it has an input that is the message that you want to send. And on all the other processes
in the system, you will start receiving messages from the delivery event. And the property
that the primitive gives you is the validity property. If a correct process broadcasts
a message, then every correct process will eventually deliver the message. And this is
just saying if you are correct and you execute the four, then you will be able to send the
message to any other correct process.
And this is obvious. Why? Because every channel is a perfect point-to-point, so if you are
incorrect, then you send to a correct destination the message will reach this destination. Then
we have no duplication. No message is delivered more than once, but also this is trivial,
because if you use perfect point-to-point link and we send a message of a perfect point-to-point
link, the message is not duplicated. And then there is the non-creation that is also kind
of trivial. If a process delivers a message to a perfect point-to-point link, then the
message was actually sent by the process S. And it is also trivial if you use the perfect
point-to-point, the perfect point-to-point has no creation, so if you use a form that
calls a channel with no creation, the non-creation is ensured.
And as a matter of fact, the algorithm to implement this basic broadcast that is best
effort is quite easy. When you want to broadcast a message, you have to have the following
message. What you do, you take this message and you send it to any other process in the
system. So it's the previous thing. It's the thing that everyone who is asking knows how
to do. You do a for for all the IP addresses in your system and you send a message to that
IP address. When the receiver receives a message from the perfect point-to-point link at this
point, what he does, he will say, best effort, deliver, message from the sender, so create
the best effort event for the broadcast. So remember, the only thing that I want to
stress is that remember that we use an approaching layer. So we have the perfect point-to-point
below that is given to us by the system, is implemented. We don't care how it is implemented.
We know the three properties and this algorithm implemented the properties. Then how it is
done internally is not our business.
And we don't care how it is implemented. We know the three properties and this algorithm
we will build on top of it our best effort broadcast that is the layer on top that creates
this broadcast primitive. I send the message and this message will be received by any other
process. And I don't have, when I send the broadcast, to indicate a target because everyone
is the target. So when I send the message, every process that is in the system is the
destination for my broadcast. And this primitive works in asynchronous system with perfect
link and even with crash failures. Why it works in this way?
Why it works even with crash failures? Because if the source is not correct, this property
does not hold. Because this property says if the source is correct, then every correct
has to receive the message. But if the source is a pressured process, does not specify who
has to be the destination. So it's possible that any subset of your process receives the
message. It can be also zero if you are not able to send to who.
No one. You die before sending. It's zero. Or it can be one, two, it can be anything.
Anything that is a subset of the processes. So is this basic broadcast clear? Or there
are doubts. So the basic broadcast is just the four. But we don't like it. We would like
to have something more, right? And what is it that we want more? Well, what we want here
is the proof that the algorithm is correct, that this is clear, that the algorithm is
correct because of the perfect thing, whatever, whatever. And so what do we want more? We
want more that if this sender fails while sending our best effort broadcast, the set
of processes that receive the message does not disagree from a certain point of view.
Because in this execution, what happened? This process is sending message to who. And
the set of processes that receive message to who is just P1 and P2 and P3, even if it
is correct.
We'll never see it. What we want is to reach a kind of agreement on the set of processes
that receive the message. This is what we want to do intuitively. I would like to have
this process send a message. If P2 receives the message, then also the other one in the
system will receive it. So also this guy will receive the message. Process P3 will receive
the message. And P2 from process, from process 4.
So from a 9-11 perspective.
From a 9-11 perspective, the strongest probability that we can guarantee, at least from a first
glance, from a first point, is this all correct or nothing semantic. I want that when I send
the message, either everyone that is correct in the system receives it, or no one that
is correct receives it. And this is better than if a subset of the component receives
it. Take in your mind, if you have your bank account, you are doing the operation,
it's better if you have the operation, no one sees it, that half of the system sees
the operation and the other half does not see the operation.
So what we want to reach is a semantic that at least for the set of correct processes
has this probability. Either all the correct in the system will receive your messages,
or no one of them receives it. If no one receives it, the system is as if you failed
before sending the message. Is it clear why we want this semantic? This semantic is clear
for a lot of applications, also a chat application. Imagine that you are sending a message in
a group chat. It's better if no one sees it. That half sees the message, half does not,
because then there can be, you know, any kind of problem. At least in some applications.
And so the primitive that we will see, the first one that we will build, we will see
two kinds of broadcasts. It's the so-called regular reliable broadcast.
Just in time. Just in time before day. So it's the so-called regular reliable broadcast.
So these broadcasts that we will see that have an agreement on the set of processes
that receive the message are called reliable broadcasts. Why reliable? Because broadcasts
give you some reliability guarantee, even in the case of failure of the sender.
Reliability means assistance.
And it is able to tolerate failure. So this is called reliable broadcast because it tolerates,
in a certain way, the failure of the sender. And what is the interface of this broadcast?
It's reliable broadcast message. So when I want to send a message, I call in this box
reliable broadcast message. And the other process that we receive the message, we start
to receive the message from this handler that is reliable delivery of the message. The property,
the first three properties.
Are appropriate. These are exactly the same as the best effort broadcast. The best effort
is called at the end, usually. Why? Because best effort broadcast. The reliable broadcast
is called LP, reliable broadcast. Validity, if a current process broadcasts a message,
then eventually delivers the message. Not obligation, no message is delivered more than
once. Not obligation, if a process delivers a message with a certain sender, then the,
the message was actually sent by that sender. And the new property is the agreement. If a
message M is delivered by some correct process, then M is eventually delivered by every correct
process. And so this property is giving us the all or nothing property on the set of
correct. If one correct will deliver it, then all the other correct, eventually.
So it's working.
Okay.
What I will say, the agreement. Either the message is delivered by, if the message is
delivered by some correct process, then all the other correct process in the system will
deliver the message. Notice that the validity, if we look at this validity, this is different
than the best effort. It's different because here it says, if a correct process B broadcasts
a message M, then B, the sender of the message, everything is valid.
The sender of the message eventually delivers the message. So the validity is just telling
you if you are correct and you send the message, you deliver the message to yourself. If we
go back to the best effort, the validity of the best effort was different. If a correct
process broadcasts a message, then every correct will deliver it. So if P1 is correct and P2
is correct and P1 sends the message, P1 and P2 will deliver the message for the validity.
In the reliable broadcast, the validity property says, if P1 and P2 are correct,
and P1 sends the message, P1 itself will deliver the message.
So the question that I have for you is why this validity property in this entire specification
becomes equivalent to the best effort? So why it becomes equivalent? Why this property
becomes equivalent to the best effort?
Because we have the agreement.
Because we have the agreement. If you see these two properties together, they give you
the same validity of the best effort broadcast. Why? If I'm correct and I send the message,
for the first property I have to deliver the message. But for the agreement property, if
I'm one correct and I deliver a message, every other correct will deliver it. So when I do
the union of this property and this property, I have the same property of the validity of
the best effort. Because for the first one, I'm correct and I have to deliver it, and
the second one will make every other correct deliver the message.
We have a question on the primitive. This kind of agreement property, which kind of
property is? Which kind of property is?
It's a likeness property. It's a likeness property.
So if it is clear, let us look at some execution. Let us look at this execution in this figure.
So there is this process that is broadcasting the green message. So when you see this symbol,
you see the arrow upward and downward, it means broadcast. Here I'm doing a broadcast
event. This is the green message, and here is the delivery of the green message, and
the delivery of the blue message. Then there is this guy that sends the orange one, and
this is the blue one, this is this one, and this is sending this, let's call it, this
purple message, the process. So if we look at this execution, this execution is a best
effort broadcast or a reliable broadcast? Let us say that this is the execution and
it remains always like this forever. So this is what happened in the system. Is it best
effort or reliable? What's for best effort?
Okay, so how many votes for reliable? Green message here. Okay. The green message is
delivered by process P2. And P2 is a correct process, right? So if P2 is a correct process
and P2 delivers the green one, and the execution remains like this forever, what we can say,
we are violating one property of the reliable. Which property of the reliable we are violating?
If the execution stays like that forever, we violate the agreement. We violate the agreement
and there is a correct process that delivers the green message, and there is another correct
process, P3, that never delivers the green message. So if the execution stays like this
way forever, we violate the agreement property of the reliable. If we violate the agreement
property of the reliable, then we must be best effort. Okay? Let's check if we are
best effort. If the same day is correct, everyone receives the message. Yes. Orange
is correct, everyone receives. Purple is correct, everyone receives. Everyone that is correct
receives. This is important. This is correct and everyone that is correct receives. Actually
everyone receives. So this execution here is best effort. What about this execution
here? The execution here on the down right, yes, down right, is the same as the execution
on the right, is best effort or reliable. This is best effort or reliable. Okay. Because
this is an animation, I should remove that. So this execution satisfies the reliable property.
Why satisfies the reliable property? I am correct and I deliver the orange, and every
correct delivers the orange. So there is agreement on the orange. I am correct and I deliver
the blue, and everyone delivers the blue. So there is agreement on the blue. This is
fine. This guy is the only one that delivered the green message, but it's okay because the
property of agreement is only between the correct. He says if a correct delivers the
message, every correct delivers the message. This process is not correct. So he can deliver
the message, and this message, and no one that is correct sees it. This is fine for
the specification. The specification enforces you that if a correct sees the message, then
any other correct in your system will see the message. But the specification does not
forbid a 41 to be correct.
This is the only one that sees a message. Okay. Clear? Notice that actually this execution,
it is also best effort. Why? Because the reliable property is the best effort plus one property.
So if I am reliable, I also satisfy all the properties of the best effort. Okay? But when
I ask you which kind of execution it is in an exercise, you have to say the strongest
one. Okay? Clear?
Any execution that is reliable is also best effort because the reliable has more
property. And so it means that you satisfy the subset of best effort plus something more,
so you have to be included. Let us see the implementation, and then we see an execution
of this algorithm. So the reliable broadcast that we will show uses the best effort broadcast
and the perfect review detector. This is called a lazy reliable broadcast. Why is it called
a lazy? Because it does some action only when it is required. So this is usually called
a lazy, when you do something only when you need it. The initialization, we have the set
of correct process, and this set of correct process initially is the set of all processes
in the system. And then I have this other variable. This variable from P, and we write
0 to the power of n. This means I am creating a dictionary that has one location for each
process, has one location for process 1, one location for process 2, one location for process
3, and every one of these locations is empty. It is null at the beginning. Okay? Here I
am just creating an hash table that maps processes to set. So if I go at the beginning from process
1, it is empty set.
From process 2, it is empty set. From process 3, it is empty set. So at the beginning we
are initializing this thing that has one field for every process. Clear? This is an hash
table, an hash map, it depends on the language that you use, a dictionary, Python, whatever.
When I want to send a reliable broadcast of a message, what I do is to trigger best effort
broadcast. I trigger best effort broadcast and I send a reliable broadcast of a message.
A message that has three fields. The first field is data, the second is my ID, the ID
of the sender of the message, and then the message itself. And I broadcast this message
to everyone in the system with the best effort. Okay? Since I am using the best effort, if
I crash here, someone will receive it, someone will not. When the message is received by
someone, when some process delivers a message, so when I deliver a message, I send a message
from a certain process B, and this message has data S, that is the original source of
the message, because in this protocol we have the original source and the relay. What I
do, I execute this handler. This handler right here is called this point in our structure,
in our architecture. When the best effort trigger from the lower layer, we execute this
code in our output.
What I do, I check if I have already seen this message from that process. So I check
if message is in from S. Okay? From the source. If I have not seen the message, if this is
the first time I see the message, I deliver, I trigger reliable broadcast deliver, message
source. So I'm executing this part, I trigger the deliver of the message.
And then I do from source is equal to from source plus the message that I received. So
in this data structure, I keep track of all the messages that I received from a certain
source. So when process one sends the message, this message, this is process seven, process
seven will enter this handler and will say, this is the first time I see the message M
from process one. Yes, I executed the handler. Otherwise, I do not execute it.
And then I do a second check at this point. If the original source of the message is not
correct, I broadcast the message again. So here what I'm doing is trigger best effort
broadcast, broadcast the message. So I send, I send again the message if I realize that
the original source of that message is crashing. The second, and this is, this is right here,
this is the relay behavior at this line. At this line, I become a relay of the message
if the original source crashed. I become a relay of the message also in another case.
If I detect a crash of a process, when I detect a crash of a process, I remove the process
from correct. But then I go in my memory. I look at all the messages that I received
from that process. So I'm looking for all messages that I received from the process
crash. And I start broadcasting them again. I send again trigger best effort broadcast
data source of the message, P message. So also in this case, I'm doing a relay behavior.
Okay? Now the algorithm is probably not clear. We will see an execution now. Okay, let's
see the execution. Let's say that I'm process P3. And I broadcast the message. So when I
broadcast the message, I send the message at this point with this antenna. Okay? Since
I'm a process that will crash, it's possible that my message will only reach process P2.
Okay? And no one else will receive the message because all the other messages are lost. In
the meanwhile, while my message is traveling on the network, process P2 detects the crash
of process P3. If it detects the crash of process P3, what will happen in P2? P2 will
execute this handler. So it will remove P3 from the correct process. And we'll check
if there are messages received from P2. In this execution, we are at the beginning, so
there is no message received from P2. The messages received from P2 are empty. So I
do nothing. I just sign in my memory that P3 crashed. When I receive the message from
P3 at this point, I will trigger the handler here, look from P3, and then I will send the
message that P3 is the first time that I see this message. Look from P3, I'm receiving
a message with original source p3 message m. And what I do? Is this the first time I see
this message? Yes. I deliver the message to the upper layer. I deliver the message to
the upper layer, it's the arrow right here. This arrow means I'm triggering. I'm triggering
this. And then I add the message to the message received from that process. So in the set
So in the set from process 2, I add the message. I check, sorry, from process 3, I add the
message, because the source is process 3 and then process 2. So I go in my memory, I check
from process 3, did they deliver something? No. Then I will add this message on the one
received from process 3, and I check process 3 is correct. No, it's not correct in this
case. What I do? I broadcast it again. Why I broadcast it again? Because if I'm correct
and I broadcast it again, this broadcast will reach everyone else in the system. Okay? So
when I receive a message, to be sure that any correct receive it, if the source of the
message failed, I have to help the source. And now I can help it. The only way is to
send again the broadcast to everyone else. Okay? And I have to send a message in which
I say, look,
this is a message from process 3. So when I broadcast again the message in S here, there
must be the identity of process 3, because otherwise you receive a message from me, process
2, but I'm just a relay, and you cannot understand it. You think that process 2 was the original
sender of the message, but the original sender is process 3. So this is the reason why we
need a data structure that is data source, original source of the message, message. Okay?
Okay?
Is it clear? Is this execution clear? Now, since this process is correct, what will happen
is that the message will reach this process, will reach this process, will reach also in
yourself, will reach this process, and will reach this process. What happens when the
message reaches again in yourself at this point? Will it deliver it twice or not? Will
it deliver it twice or not? And if not, which check will make sure that we do not deliver
the message twice when we receive the message again from ourself? Because when we broadcast,
we send it to everyone, including ourself. What is the check that avoid to send it up
to deliver the double message? Yes. The second time, I will receive the message here, I will
receive a message from process P3, because inside here, S will be P3. Even if B is process
P2, the identity of the relay, S will be the identity of the original sender. So here,
I check message. How will we go to this message? Message M. Message M. Is it the first time
that I see this message from process P3? Yes, I do the things. No, it's not the first time,
because it's already inside the things, so I will not process it. Okay? So if the message
is inside from, I will not deliver it twice. Yes? Nice question.
And there is no reason for it. Okay, so your book uses data here. But, I mean, he uses
it, but he actually never uses it, because you never check that something is data. Okay?
I think he's just doing it to say this is a message that is a prompt of some other message.
Okay? But it's not used, because if you see, you never check that some message is of kind
data, because the only kind of message is this one. Okay? So usually, in messages, you
in a protocol, you use a field to say this is a message of a certain kind, because you
use two kinds of messages. For example, in Lamport, we have request, hack, release. And
so there is the first field that is request, hack, or release. Here, there is this data
message, so this field is not needed. If you remove the field, the algorithm still works.
Okay? If you remove S from here, the algorithm does not work anymore, because you do not
know anymore with the original source. You only know the data. This is the original source.
At this point, you only say, oh, this message is P2 is sending the message, but P2 actually
is the relay. It's not the original source, the one that sent it, that is P3. Okay?
Let's look at another execution. Let us look at this execution that is a bit more complicated.
Here, there is process P3. Process P3 sends the message. We send it to everyone, but it
crashes, and so only P5 receives the message. P5 receives the message, and then it leads
to the upper layer.
But you detect the crash after you receive the message. Okay? So what happens at this
point? When we deliver the message, we execute this line. It's the first time we see the
message. Yes, I send it to the upper layer. Then I say, I received the message M from
P3 by putting the data structure, and at this point, I check, is P3 not correct? But P3
is correct for you, because you will detect the crash later. You will detect the crash
at this point.
At this point, this if is false, and you do not broadcast again the message. But this
is dangerous. Why is it dangerous? Because you are the only one that has seen it. So
if we don't have an additional check when you detect the crash, this message is no one
else will see.
And so what is the additional check? When you detect the crash of process P3, this handler
here triggers. So what you do is that you remove P3 from the correct process. Then you
go in your memory, and you check, oh, it's P3. It's P3. It's P3. It's P3. It's P3. It's
P3. And you go back in your memory, and you check all the messages that you received
from P3. Then you broadcast again each one of them. Why? Because you are undecided. You
do not know if you're the only one that has seen that message or not. And if you are the
only one, it's extremely dangerous to not send it to the other people.
And so here you send a broadcast message that you will send to everyone in the system. So
here I will send the message to myself. I will send the message to this guy. I will
I will send a message to P0, I will send a message to P1, and so on and so forth.
Okay, clear?
Now the response is P2.
P2 detects the regression of P3 at this point, and then receives the message.
So what P2 will do at this point when it receives the message from P5,
so it receives a message from a relay, what it does in the algorithm?
At this point, what you do?
You will send it again.
You will send it again, you will check, you will say,
oh, the original source of the message here, P3, has crashed.
So remember, you always check the original source.
You are not checking the relay here.
I am not checking that P5 is alive.
I am checking that the original source, P3, of the message, if it is alive or not.
And what I will do, since it crashed, I will send the message to everyone.
I will broadcast it again.
And why you have to broadcast it again?
Because it's possible that there is this situation.
It's possible that the relay crashes,
we do not know.
So you are the only one that will see the message from the relay.
And so what you have to do in this case,
you have to broadcast it again to everyone else in the system.
Notice that here, just for drawing,
I am not making the algorithm reach everyone.
But if you are correct, and you send a broadcast,
then every correct one will receive the message.
Okay?
Clear?
So the idea of the algorithm, if you think about it,
is actually easy.
When I receive a message,
and I know that the source has crashed,
I send this message again to everyone else.
So that if I am correct,
every other correct will receive it.
But then it is possible to have an execution like this in the algorithm.
We have processed P3,
we have processed P3,
we have processed P5,
P3 broadcasts the message,
message N,
P5 broadcasts message N+.
P5 receives the message from P3,
P3 receives the message from P5,
and then the input crashes,
and no one else will receive the messages,
so all these other messages will be lost.
Okay?
And so in this case, what happens?
These two processes will deliver these two messages,
but no one else in the system will see them.
But this is okay for the specification.
Why is it okay for the specification?
Because the agreement has to be on the correct process.
So since no correct process sees these two messages,
the correct process can discard them.
Okay?
Clear?
Cannot see.
If for some reason one arrow will reach one of these processes at this point,
the algorithm will work.
Why?
Because I will check that the source,
I see that the source failed,
I will broadcast again to everyone,
and every correct in the system will receive it.
But in the reliable broadcast it is possible that we have an execution like this
where a faulty message
is only received by a subset of the processes,
and this subset is the faulty one.
Okay?
Let's look at the proof so that we make it 100% clear.
Validity and obviation.
Validity and obviation are ensured by the best effort broadcast.
Why?
If I'm correct and I call a best effort broadcast,
then for the progress of the best effort broadcast,
any correct will receive it. Valid.
No creation.
Since every time that we deliver a message,
so at this point,
I deliver only a message that I received from the best effort,
since the best effort does not create the messages,
I cannot create messages at this point.
So no creation is also clear.
No duplication.
No duplication is a bit more difficult
because we have also to check not only this line but this if.
But it's easy enough.
Let's say that you trigger this line twice for the same messages.
The first time I trigger this line for a certain message,
I put the message in from.
So it means that the second time I trigger the if,
I find the message in from,
and I cannot trigger this line twice.
This is the same property of no duplication
that we had also on the perfect link.
And now the only property that is interesting is the agreement.
So how do we do this?
We show the agreement by contradiction.
Suppose by contradiction that a certain correct process,
correct b,
is a correct process and deliver message m with original sender queue.
And there is another correct process b'
that does not deliver the message m.
So this is the contradiction that we have to show that it does not exist,
that there are two correct processes.
One sees the message,
and the other does not see it, does not deliver it.
Okay?
So if the original source of the message does not crash,
then by best-effort broadcast,
also p1 that is correct has to deliver the message.
And so we reach a contradiction.
So it means that the source must not be correct,
because if the source is correct,
the algorithm works for best-effort.
If the source crashes,
and p, the process that delivers the message,
detects the crash before receiving the message,
then p relays the message.
Since it's correct, by best-effort broadcast,
also p1 will deliver the message.
And this part of the proof
is the relay behavior at this point.
If I detect the crash
before receiving the message from the source,
then once I receive the message from the source,
I start doing the relay.
If I'm correct, every other correct will see the message.
And so we have a contradiction.
Also this case is impossible.
If the source crashes,
and p detects the crash after delivering m,
then also in this case p relays the message.
Why?
Because we relay the message at this line right here.
And so also this case is covered,
the case in which I detect the crash
after I receive the message.
And since by assumption we have that p is correct,
when I send a message by best-effort broadcast,
every other correct, including p prime,
has to deliver it.
Okay? Clear?
Is it clear?
So is the algorithm clear?
Okay.
So if the algorithm is clear,
I have a few questions for you.
The first one is,
in the best case,
how many messages
we send for a single broadcast?
For a single broadcast I mean
for everyone that is in the system to deliver it.
How many messages we send in the best case?
Ten.
Ten.
Big Ten, what is the best case?
You send the message to everyone,
you're correct, everyone is correct.
The best case is when the source is correct.
When the source is correct,
the source is the only one that triggers the best effort.
And so the sources create n messages here at this point,
and no one else created their messages for that broadcast.
Okay?
Okay? Clear?
Okay.
What is the worst case?
How many messages we create in the worst case?
How many messages we create in the worst case?
Three?
N squared.
N squared.
Why n squared?
Process can crash just up.
You don't need this complex expression.
Okay.
It's enough to have an easier one,
to have n squared.
Yes?
Yes.
Yes.
The next one?
Yes.
The next one.
Okay.
Here.
Yeah.
Like the P2 sends to everyone.
Yes.
And then everyone will see that P2 has crashed.
Yes.
Then they will send to everyone again.
So at this point, P2 will still send to everyone.
Because you see the original source crashed,
I send to everyone.
When P1 receives the message,
P1, after a bit,
will detect the crash of P3.
Because you have to detect it
for the perfect failure detector.
Once P1 detects the crash,
it will send the message to everyone.
Once P0 detects the crash,
it will send the message to everyone.
Once P6 detects the crash,
it sends the message to everyone.
Yeah.
So in this algorithm,
when the original source crashes,
the message becomes something that
once you receive it,
you immediately try to send to everyone
because you don't know.
And so you will create
N2 messages because we have
these guys and N messages,
these guys and N messages,
these guys and N messages,
these guys and N messages,
these guys and N,
these guys and N,
these guys and N,
N multiplied by N is N2.
OK?
Is it clear?
So the complexity in terms of messages
is N2 messages in the word is,
and this is the execution.
OK?
In any execution in which the source crashed,
you have this behavior.
This is one of the execution which we added.
OK?
Is it clear?
Drawing clear,
you receive the message,
detect the crash,
you send to everyone,
this guy detect the crash,
send to everyone,
this guy detect the crash,
send to everyone,
this guy detect the crash,
send to everyone,
send to everyone.
So it's N2 messages.
OK?
Clear?
Yeah.
So now this is the second way
to measure the performance of the algorithm.
If you remember,
the algorithm in this particular computing,
we measured it with the number,
OK?
of messages.
And with the message delay,
the communication step,
that was the time.
We have seen this in the Lamport-Muller excursion.
In the Lamport-Muller excursion,
I said in the best way
how many steps we need to enter
in the critical section.
One second,
and then I'll come to your question.
So how do we measure the time complexity?
We pretend to be in an environment
where each message takes one unit of time to deliver.
This is an assumption that we just used
to compute the performance.
OK?
So we assume that every broadcast goes in parallel
and takes one unit of time.
And we have to count how many units of time
we need for a broadcast to complete.
A broadcast to complete means that every destination
that has to deliver the message delivers.
OK?
So in this algorithm,
in the best case,
how many units of time do we need?
One.
OK?
In the best case?
When the sender is correct.
OK?
This is the best case.
In the best case,
we need one unit of time
because you sent the message,
you are correct.
This message in parallel goes to everyone.
We have one unit.
OK?
But what is the worst case?
Is?
N.
Why is that?
You fail, but you send it to one.
Then that one sends it.
It fails, but sends it to one.
OK.
Then the link,
everyone sends it just to one.
OK.
So you are good at XC in worst cases,
and,
because I imagine this situation,
we have this.
OK.
So in the best case,
we say,
let's keep the XC issue.
OK.
P6 is the source of the messages.
P6 sends the message.
It's sending broadcasts to everyone,
but it crashes.
And this message can reach only P5.
This is one unit of time that we spent.
P5 detects the crash of P6
and starts sending a message to everyone,
but it fails,
and this message only reaches P3.
OK?
P3 detects the crash of P6,
sends this message to everyone,
but it fails,
and this message only reaches P2,
and this is another unit of time.
So if we do the count of the units of time,
we have n-1 units of time,
because we have one unit
for each pair of processes in the system.
OK.
OK?
Is it clear?
Yeah.
So there is a bug in the picture.
What is the bug in the picture?
There is a bug in the picture.
It's working.
Yes.
There is a bug in the picture.
OK.
Everyone is expecting it.
Everyone is expected to crash.
Yes.
Crash P6 is OK
because you detected the crash of the source.
When the source crashes,
you send the message.
So crash P6 is not the bug.
It is another feature.
You detect the crash of the source.
Can you broadcast it again?
There is no before.
OK?
There is P3.
There is what?
P2.
P3.
Ah, before.
OK.
to put people inside okay so the number is wrong yes
okay
so if the algorithm here if the algorithm here so everyone is the whole place here there was a
question
no okay if you have to process that crashes let's say that this process crash and also
this process here pressure let's say that at this point if i crash
if we count
so n messages here and messages here and messages here and here and here
even if you process crash you only send n messages
no is is n to the power of two
so the the the thing that probably is not clear
is that we are counting the number of a message for a single broadcast
so we are counting
the number of messages that we generate for the broadcast of them
at this point t5 is still participating is still helping the broadcast of them
it's not sending a new message okay so if we count the number of messages for m
is n squared if you count it because our n for this one and for this one and for this one
only for the for a single message okay in the broadcast we count for a single message
how many messages of the lower layer you generate okay because the number of messages that you can
generate into them depends on how many messages you sent from the upper layer but since you don't
know you count the overhead for a single broadcast other questions other observation
so and now another question that i have for you is what happened in the original algorithm
we don't have the perfect failure detector but we have diamond p so what happens if in these
In this algorithm, this failure detector P is not the perfect one, but it's the eventually
perfect one. So what happens to this algorithm? If the failure detector is eventually perfect,
what happens? Yes? So your colleague says, even if it's eventually perfect, eventually
I detect the failure and I send it again. But do we violate some property? Do we violate
some property if we have this eventually perfect failure detector? No, there's no
sense. You might send the message that for a process that didn't die by... Yes, it is
possible that I'm wasteful in the sense that the source is correct. I detect the source
aspiration by mistake and I start to do it again in the broadcast. But it's not a big
deal. I mean, someone will receive the message twice, either just once. It's okay because
this error will be fixed. Okay?
So if you think about it, let's say that I modify the algorithm and I remove this if.
I remove the if at this point, and I do an algorithm that works like that. Once I receive
the message, I deliver it to the upper layer, and irrespectively of if the source is correct
or not, I send the message again. So let us say that I remove this if, and I create an
algorithm that is the same without the if. So the line below, the finger, is always executed
at the broadcast. Okay?
Okay.
So for this algorithm that does not have the if, does it work or not? Is it a correct
algorithm or not?
Yes.
What happens if I remove the if?
Whenever it's...
Every time I receive the message. I receive a message, I broadcast it again, right?
Yes.
I broadcast it again.
Yeah, you send it to either is correct...
Yes. I send the message either if the source is correct or not. I don't care. I send the
message again. Okay?
Can we break the algorithm in some point?
No, we cannot break it, because here we are checking for the not-obligation. So this thing
is clear.
Okay.
If I can remove this if, then it means that to have a correct algorithm, which primitive
I can remove from the algorithm, and still have a correct one. If I can remove this if,
is there some primitive that I am using in this algorithm that I can remove, and obtaining
the algorithm that still works, and still is reliable without that primitive?
The failure detector.
I can remove this failure detector. Why I can remove this failure detector? I am not
using it anymore. Every time I receive a message, I send it. Then, if you detect the crash after
you receive the message, what happens? You send it again, but you don't need it. You
actually just need to send it to us. Okay. So, I can implement a reliable broadcast method.
In a system even without the failure detector, with a simple strategy, that is, every time
I receive a message, I send it again. And why I send it again? Because if I am correct,
I will help the source to reach all the other correct in the system. If I crash, I crash,
and we don't care. Okay? Is it clear? So the second point, and this is the second algorithm,
that is actually just the first one, where we remove the failure detector, is an initial
implementation of the failure detector in fail silent. Sorry, of the failure detector.
An implementation of the reliable broadcast in fail silent. And this implementation just
uses the best effort broadcast. And what is the idea? It's really easy. I have a delivered
set that initially is empty. And what do you think we use the delivered for? What is the
purpose of this delivered set? Same. No duplication. This is no duplication. Every time the reliable
broadcast asks me to send a message, I send this message in best effort broadcast to everyone.
Every time I receive a message, I check, is it the first time? Yes, so I have to deliver
and I send it to the upper layer. And then I trigger the best effort broadcast and I
send this message to everyone. This algorithm is called eager reliable broadcast. Eager
in English means that you are eager to do something. And so you do the relay of the
message immediately. Once you see the message, eagerly you relay it. You relay it and you
relay it. Okay? Is it clear? So what is the disadvantage of this algorithm? Because this
algorithm is a reliable broadcast as the previous one, but it's working in a system that is
weaker. Because here we don't need the failure detector. This works in a purely asynchronous
system. You can implement this primitive in a purely asynchronous system because you don't
have to do anything. You don't have to do anything. You don't have to do anything. You
don't have to use time. So what is the disadvantage of this algorithm with respect to the previous
one? Because I'm removing the peak. I have more messages and in which case I have more
messages? Also in the best case when everyone is correct, this algorithm, how many messages
generate? N squared. Because in this case, the worst case of the algorithm, you see what's
the best case? Every time I receive a message, I will send it again. So process with zero
will send it again. So I have more messages. So I have more messages. So I have more messages.
So I have more messages. So I have more messages. So I have more messages. So I have more messages.
Process P1 will send N messages. P2N messages. P3N messages. P N minus one will send N messages
and so there are N squared messages. OK? Is it clear? If you count the communication
step, what is the communication delay of this algorithm, in the best case and in the
worst case? Best one. In best case, it's always one because the source is correct and reaches
everyone.
That's okay.
That's okay.
That's okay.
Thank you very much.
Thank you very much.
And in the worst case, in the worst case, how many domain do we need?
N is the same, N minus 1.
It's actually the same execution on this one.
I send a message, I crash, this one is the only one that receives.
Even if it does not detect the crash, it will send to everyone.
You create a chain where this information goes to one new project at each step.
And so you need N steps for the information to reach everyone in the system,
to reach the last process here.
Okay, clear?
Is it clear?
So there is also another measure of complexity,
of not complexity, of performance of an algorithm.
That is the fourth tolerance of the algorithm, the reliability.
That is how many failures the algorithm tolerates.
Okay?
So the first algorithm, this algorithm here,
how many failures can tolerate as a number of processes in the system?
How many failures can tolerate?
N minus 1.
N minus 1 or N, it depends how you count them.
N minus 1 if you want just that one is alive,
N if you observe that once everyone dies, there is nothing to enforce anymore, okay?
And this algorithm right here, the eager reversion,
how many failures tolerates?
The same.
You can tolerate 10 failures.
Even if everyone fails, the algorithm still works,
and still enforces.
Of course, the reliable broadcast.
Is it clear?
Is the algorithm clear to everyone?
So what is it that we don't like about the reliable broadcast?
So if I ask you which property of the reliable broadcast you don't like,
that would you like to improve, to increase,
which property can we increase of this primitive?
Can we try to make it better?
Yes?
I understand that only the message that I think
and other people's kind of processes give not the same.
Okay.
But this is for the, this is something that we,
there is an exercise at the end of the slide.
This is just something to improve the efficiency of our primitive, okay?
But this is complexity.
It's not about the specification, okay?
Yes, for complexity you can improve.
As an exercise, try to improve the complexity
by using, ah, there is an exercise in the slide.
So if you look at this slide at the end, there is an exercise.
I don't know if you have time today,
probably you have time the next lecture,
where there is an exercise where I ask to improve the complexity of the algorithm, okay?
But here we have a specification, a specification giving us some property, okay?
There is one of the properties of this specification that we can make stronger.
Stronger means that I can take the property
and create a property that improves that property.
But it's stronger in the sense that it gives me better guarantees in the system.
So the agreement says if a current process delivers the message,
then all the current processes will deliver the message.
But in this primitive we can have a situation like this, right?
I can have that P3 is 40, and P3 is the only one that's C and private.
But this is a situation that in some,
in some cases,
in some setting we don't like, okay?
Let's think that these are, I don't know,
robots that are doing something in real life.
You send a command to your robot and you crash, okay?
One of the robots receives the message and starts doing the action,
and the action is, I don't know, start planting something.
But this robot crashes,
and the other robots that are also correct will not do the action in real world.
And this can create a problem, okay?
It can create a problem that only one of the 40 electricals
see the message,
and the other one that are correct do not see it, okay?
Is it clear?
I would like to have something better in the sense that if a process,
if a process see a message,
whether it is correct or not,
then all the other correct in the system will see the same message, okay?
Think about your bank account.
You do the execution, send money on my bank account,
this reaches the electrical one on the bank.
That fails.
And then the replica that are correct do not see your operation.
I would like something better.
The replica that fails see the operation on the bank account.
The one that are correct also are forced to see it
in such a way that my bank account will remain in a consistent state, okay?
Is it clear?
So when I talk about stronger specification, I mean this property,
the complexity, the failure tolerance, the message delay,
are of the implementation of the specification.
The specification is just the box that tells me the property.
The message complexity, the hand complexity,
everything is for the implementation of that specification, okay?
It's like a car.
A car, you have the steering wheel, you can steer left or right,
and then the performance and the engine,
but not the specification of the car.
The specification is left or right.
Then if you are poor like me, you have 150 horsepower.
If you are rich, whatever, you have 500 and something.
But that is the implementation of your car, okay?
It's not the specification that goes left and right, okay?
So let's go to the other primitive that we will see for the broadcast.
And this is the Uniform Reliable Broadcast Primitive, okay?
The Uniform Reliable Broadcast Primitive, we have the action of sending a message.
The action of receiving the message.
This is evil for all the broadcasts.
You send a message.
You receive it.
Then we have the first three properties
that are the same of the reliable broadcast.
So there is validity, no creation, no duplication.
And we have uniform agreement.
If a message M is delivered by some process,
whether correct or faulty,
then M is eventually delivered by every correct process.
So this specification is telling me this.
If there is someone
that sees the message,
then all the corrects have to see that message.
Okay?
Is it clear?
If there is someone that sees the message in the system,
then, eventually, all the corrects that remain in the system
have to see the message that is in the trailer.
Okay.
Let us look at the execution and our usual game.
So if we look at this execution,
this is the best effort.
Reliable broadcast.
Uniform reliable broadcast.
Uniform reliable broadcast.
Let us pretend that it is not the root of the text.
So this execution here,
which kind of execution is it?
Which kind of execution is this one?
Because everyone sees everyone.
So there is the orange message that is delivered by this process
and all the corrects see it.
This one, blue message,
is delivered by this process and all the corrects see it.
See, purple message is delivered by this process and all the other see it.
So this is you.
This is specification right here.
This is which kind of specification it is.
So do not cheat reading all the text.
Reliable maybe resource,
if you eventually...
Okay, so your colleague says,
if you eventually see the yellow message,
this is reliable.
Let us assume for now that the execution is like this
and stay like this forever.
Okay?
So which kind of execution it is
if it is like this forever?
This?
The first one.
The first.
Best effort.
It is best effort because there is this guy
who didn't see the yellow message and it is correct.
And there is pigeon that is correct
and never see the yellow message.
Okay?
But in order to be best effort,
we need a restriction on the sender of the yellow message.
In order for this execution to be best effort,
we need a restriction on the guy that send the yellow message.
So this is best effort only if someone
precisely in the execution send the yellow.
If this is the sender of the yellow,
this execution here is not best effort.
Why if this is the sender of the yellow,
the execution is not best effort?
Ah, that's quicker.
Because P3 is correct.
Because P3 is correct.
So you are correct sender
and P2 is correct
and does not see your message.
So this is not a best effort.
If this is the guy that send the yellow message.
To be a best effort broadcast,
the guy that send the yellow message must be
process P1.
Because it's the only way.
If you are correct
and you do the broadcast of the message,
every correct in the system has to see it.
So the only way to have this disagreement
is that the sender of the yellow
has to be in the faulty process.
Because if the sender was P3,
then this guy has to see the yellow.
Is it clear?
And now there was someone that said
if this guy deliver the yellow message,
then this execution is reliable.
If this guy deliver the yellow message,
which kind of execution we have?
Is uniform.
Why is uniform?
This one see the yellow
and everyone see,
every correct see.
This see the orange
and every correct see.
Okay?
Is it clear?
To be reliable,
we should have
something like this.
This is uniform.
We need something like this.
This one is the only one that see the green
and no correct see the green.
And this is a reliable but not uniform.
Why?
Because there is a process
that see a message
and the correct do not see it.
Okay?
So to have reliable but not uniform,
you need that a faulty process
see a message
and the correct do not see that message.
Okay?
Question on the execution,
question on the specification
and the execution
that satisfies the specification.
Oh, there is one
but there are other ones.
So which kind of execution is this one?
Which kind of execution this one is?
This is?
This one, L3.
Which kind of execution is?
You have to always say the strongest one.
That's right.
It's not the yellow,
it's the green one.
This is the green one.
Okay.
What is the agreement
property of the uniform?
No, the agreement property,
if a process see a message,
then every correct deliver that message.
Okay?
So this process P1
see the orange message.
Is it true that every correct
deliver the message?
Yes.
This process P1
see the blue message.
Is it true that every correct
deliver the message?
Yes.
This see the purple.
Is it true that every correct
deliver the purple?
Yes.
This see the yellow.
Is it true that every correct
deliver the yellow?
Yes.
Yes.
So this execution here is uniform. This is uniform reliable broadcast.
To make it easier on your mind, an execution is uniform reliable if the set of messages that the correct deliver is a superset,
it means that it is bigger than the messages that the faulty deliver.
This execution right here, which kind of execution it is? This is reliable. Why is it a reliable execution?
If a correct process deliver purple, every correct deliver purple. Yes.
If a correct process deliver orange, every correct process deliver orange. If a correct process deliver blue, every correct process deliver blue.
Here there is this one that deliver yellow, but no correct delivery, but it's fine, because this is not a correct process.
Is it clear?
Here we have a restriction, if a process see it, every correct has to see.
Here we have a restriction, if a correct see it, every correct has to see.
So in this case, the faulty process is the yellow message, but the correct are not forced to deliver it.
Is it clear?
In the algorithm that we are seeing, this is the case in which you can only send the message to yourself, and you fail, and the message does not reach anyone else.
And we have this execution.
This is a reliable broadcast.
If the yellow is sent by P1, because if the yellow is sent by P2 or P3, then every correct has to see it.
Okay, how we can implement this algorithm?
Assume that you have a failure detector P.
So you have a perfect failure detector P, more clearly.
We have our perfect failure detector P, and I want to implement this uniform broadcast algorithm.
So we do this discussion, and then we determine.
How we can implement it?
So let's try two issues.
Our processes, this is process P1, P2, and process P3.
So in order to implement the uniform broadcast, let us say that P wants to send the green message to everyone in the system, P1.
What do you have to do in any broadcast algorithm?
We want to implement a broadcast algorithm.
This is P1. P1 wants to send the green message.
So from the upper layer, you receive the command, send the green message.
So here, there is a guy that says, send the green message.
So in our algorithm, we start here.
And this guy receives from the upper layer the command, send the green message.
So what do we have to do in our algorithm?
If the upper layer is asking, send the green message.
We can try to take care of the reliable broadcast, but more easily, which action we have to do for sure.
We have to send to everyone.
This is an action that we have to do for sure, right?
Any broadcast algorithm has to do it.
So send to everyone means that we send the message to ourselves, we send the message to this guy, and we send the message to this guy.
And if the source is correct, it's fine.
I mean, if everyone is correct, this algorithm is uniform.
What is the problem?
The problem is that it's possible that this source is fresh.
Now there is a moment, this moment here, in which you receive the message from yourself.
Let us say that I do an algorithm in which when I receive the message from myself at this moment, I create the event sent to the upper layer.
So I tell to the upper layer, uniform reliable broadcast message.
So my algorithm is like this.
I send the message to everyone.
Once I receive the message to myself, I trigger to the upper layer.
And I say the message has been uniform broadcasted into everyone.
I send the message to the upper layer.
Is this algorithm correct?
Is this idea correct?
Well, it's not much correct, because what happens if I fail immediately after?
If I fail immediately after, it's possible that this message is lost.
This message is lost.
I'm the only one that has seen the green message.
No one else has seen it in the system.
I delivered the green message, and the correct will never deliver the green message.
So I cannot do an algorithm in which I send the green message to everyone, then once I receive the message from myself, I send to the upper layer and I say, deliver green.
Because I have this situation that is dangerous, the situation in which I deliver an aggression immediately.
No one will see the green message, and no one can deliver it.
Right?
Is it clear?
Is it clear?
And so the problem that we have to decide in our algorithm
is at which point I create the arrow to the upper layer in which I say to the upper layer, this is the green message.
Why?
Because the moment I create this arrow locally on this process, the moment on this process I send to the upper layer green, I have to be sure that all the correct in the system after will deliver green even if I fail.
Okay?
Right?
This is what I have to be sure in my algorithm.
That once I deliver the green message, even if I fail the second after in the future, it has not already happened in the future, all the correct will deliver this message.
Okay?
Is it clear?
Is it clear what we have to do?
And it is also clear that, let's say that this is the instant in which I send the message, I cannot do an algorithm in which I send the message at this point, then nothing happens on myself,
and after 10 minutes I say, oh I want to broadcast, I want to send to the upper layer.
Because if I do an algorithm like that, it is possible that I crash, and these messages are lost.
Okay?
Is it clear?
So it means that from the moment in which I send the message, to the moment I deliver the message in my algorithm, something has to happen,
such that at this point I make the decision and I say this message is safe to send to the upper layer,
because I know that the system is in a state such that even if I crash at this moment, my message will be delivered by the conference.
Clear?
Is it clear?
Is it clear this reasoning?
I am doing the reasoning, trying to build the algorithm.
Okay?
Clear?
So what has to happen between this point and this point?
What things this process has to see to say, oh the system is in such a state that I can deliver the message,
because I know that even if I crash, at least the correct process will deliver it.
So what has to happen between these two states of time?
Confirmation from the correct processes is repeated.
I have to start to receive messages.
I have to receive messages from the other processes, in such a way that I know at this point,
that once I have received that amount of messages, I know that I can deliver and I can crash,
because it is safe to the system, and the user will deliver.
Okay?
So what is the easiest thing I can do to be sure at this point that I can deliver,
because everyone that matters has seen the message?
I have to wait for an act.
I have to wait for an act.
This is the easiest thing that I can do.
So when I send a message to someone, this guy receives the message and then I send an act to myself and say,
I received your message.
This guy receives the message and then sends an act to yourself and say,
I received the message.
And then at some point here, once I receive enough acts, I have to deliver to the upper layer,
because I say, okay, they have seen my message.
So even if I crash, my message is safe.
Clear?
How many acts do we have to see?
Because now we have to build the algorithm.
So I have to do, if this amount of acts, then I can deliver.
For all the attached processes.
So can I do something?
When the number of acts, when the number of acts is equal n,
because I also send the act to myself,
when the number of acts is equal n, I deliver.
I can do an algorithm like this.
You would have to tell them to correct the act.
So your colleague says, if I just count the act and I say, when I receive n acts, I deliver,
there is a problem because if someone crashes, he will not send the act.
And which property we break?
Which property of the uniform reliable protocols we break?
If I do an algorithm, when I receive n acts, I deliver.
You crash, I will receive n minus one acts, because you crashed.
So I will never deliver.
And which property I am breaking of the uniform reliable protocols?
The validity property.
We are breaking the property here that is the validity.
That if we go back, it's the same as the...
It's this one.
If a correct process broadcasts the message, let's correct us to deliver it.
If you do an algorithm in which you wait for n acts, let's say the time is zero, I'm correct,
I send the green message, you are P7, you crash, I will never deliver the green message,
even if I'm correct.
This is plain stupid, because I'm correct, I should deliver the message at least for myself.
I lock the entire system for just a crash.
Okay?
Is it clear?
So the strategy, when the number of acts is equal to n, is not a good strategy, because
we can lock the system with a single failure.
Okay?
So, which strategy we have to use if this, the number of acts is equal to n, we cannot
use?
Which strategy?
So how do we write a priori correct process?
Yes.
So I have to receive an act from capital pi.
The set of all processes set minus crash.
Once I receive an act for every process that is in capital pi minus crash, I know that
my messages have been received by everyone that is alive, and they can crash, because
I know that everyone has seen the mess.
Is it clear?
To improve this algorithm, by observing that here we don't need acts, I can do an action
that is an implicit act.
And the action that is an implicit act is this one.
I will clear the drawing.
So we have our P0, I have our P1, P2, P3.
So P1 sends the green message, we send the green message to everyone.
And this guy, instead of sending the act, we do the relay of the green message.
So I send the green message again.
I send the green message again.
And I say I'm on process P1.
I'm relaying the messages of P0.
And so I send the message again.
And this is an implicit act, because what I will check is I receive the green message
from P0.
This is the act of P0.
P0 sends the green message.
When I receive the green message from P1, this is an act from P1.
P1 sends the green message.
When I receive a green message from P2, this is an act from P2.
P2 sends the green message.
Why is it better to use this technique of the relay?
So when I receive the message, I do not do the act.
I relay the message, and this relay is an act.
Why is it better to do it this way?
If I do the relay, when is it that I need the relay?
For delivering where?
Why I need to do the relay?
I cannot just use the act.
Because if the sender, the original sender crashes, you have to do the relay.
In the reliable broadcast, when the original sender crashes, we do the relay.
So this algorithm uses the same structure of the eager reliable broadcast.
When I see a message, I relay it again, but I attach to the relay the meaning of act, because
it is also an act.
If you relay the messages from P0, then you have seen the message from P0.
We are not optimizing the complexity.
I agree with you.
Complexity is always something that you have to optimize after correctness.
Complexity after correctness.
There is a citation of Nat.
I don't know if you know Donald Nat.
It's someone that is really famous.
And one sentence is,
Primature optimization is the root of all evil.
That means if you are a developer and you try to optimize before you know having done everything correctly,
then you are getting bugs and bugs and bugs and bugs.
So in these classes, we always first do the algorithm that is the easier one, the simpler one,
and then we try to optimize if there is room.
Clear?
Also because the optimizations are easier once you have understood the algorithm,
you can start to optimize whatever, but it's better to understand the basis.
You first work and then run.
Is it clear, this fact of the relay, that the relay is an act?
So this guy does the relay, this guy does the relay, this guy does everything.
Now, before seeing the code, what is the complexity of this algorithm?
What is the message complexity of this algorithm?
Yes, this strategy, I relay and the relay is an act.
And the square because we have the same pattern over the eager.
When I see the message, I relay it again.
When I see the message, I relate it again.
Are there questions on the algorithm?
Questions on the algorithm?
Yes, please.
Are we using the feature PD?
Yes, perfect point one.
Then at that point, do we really need an act?
Like if we send it, we can just suppose it arrives and be lost.
No, because if you are 40, you do not know.
If you are the sender and you are 40, you do not know that your message will not be lost.
So if you send with the perfect point to point and then you deliver,
you are done because the perfect point to point after starts to receive the message.
The perfect point to point, what it does, the only thing it does is the loop, right?
It loops and message again, again, again.
It will not send a message again, again, again.
It is impossible.
All the messages that you sent before are removed from the system and so the other will
not receive it.
Okay?
So the perfect point to point does not remove the need of relaying.
This is an old issue.
It is a strange bug.
Also because I did not erase it.
Okay, question on the idea.
On the idea of the algorithm.
So we will look at the code and then we will see the proof in the next lecture.
So let's look just quickly at the code.
We have a delivered set that initially is empty and this delivered set we use to avoid
the null obligation.
We have a pending set that initially is empty and this pending set we put the messages that
we do not know if they are saved to deliver or not.
Are the messages that are waiting.
In this case is the green message.
When I see the green message the first time, I put in pending and I will deliver it only
when I'm sure.
So I need a set to put the messages in the meantime.
Correct set that initially is all the processes and then here what we are creating is a data
structure of ACK.
So for all the possible messages in the system, I create an ACK set for that messages.
This is a bit strange.
A lot of students get confused about it.
So what we are saying in this line of the algorithm.
I'm saying I'm creating a dictionary.
That is empty.
And every time I go with a new message in the dictionary for the first time, I will
find the empty set.
So I say for any possible message that my algorithm create, I create an ACK set that
contains that message empty set.
How do you do it?
You check if the message is in the ACK map.
If it's in the ACK map, you read out the set.
If the message is not in the ACK map, you have the message in the ACK map with the empty
set associated.
Okay.
So I assume you know what is an ACK map.
If you do not know, ask and I will tell you.
It's something that you can use an object to enter inside and give you another object.
But in this case, the default is the empty set.
When I broadcast a message uniformly reliable, what I do, I put message and original source
in the pending set.
And I broadcast this message to everyone in the system.
When I receive the broadcast message from someone.
So, I receive a broadcast of the message from P, even if the original source is S.
Here I do ACK for that message is equal ACK plus P.
Because I see that P has seen the message.
Okay.
So let us say that I receive from P2 the original message sent from P1.
At this point, I will say the original message from P1, I have the ACK from P2, process P2
has seen the message.
Is this message in pending?
We take the PayerSource message.
If the message is not in pending, this is the first time I see the message.
So what I do, I set the message in pending and I broadcast it again.
I do the relief.
Okay.
Is it clear?
If someone crash, I remove from the correct.
And this is the ender, this that I do in parkour, is the ender that does the delivery.
When is that I deliver a message?
If there exists a message in pending, such that can-deliver of the message is true, this
function that we will see, can-deliver is this function, this Boolean function, and the
message has not been delivered.
Then what I do, I put the message in delivered and I trigger Uniform Reliable Broadcast Deliver,
so on the upper layers and the message.
So this delivered right here, why I'm using it?
Why we use this delivered?
To avoid the notification.
So the first time I trigger this ender, I put the message in delivered and I cannot
trigger the ender again.
Okay?
Clear?
There is only this can-deliver that seems strange and is this function.
Can-deliver is true when the set of correct is a subset of hack for that message.
So what I'm saying is I deliver a message when the set of the correct process is inside,
is contained in the set of the hack for that message.
Okay?
In the next lecture we will see the proof of this algorithm.
Okay?
Clear?
So see you on...

