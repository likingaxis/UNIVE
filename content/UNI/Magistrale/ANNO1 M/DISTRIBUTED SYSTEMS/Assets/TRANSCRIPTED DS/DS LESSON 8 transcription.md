

--- Lezione_8_parte_1 ---

on Wednesday, was the concept of an eventual effect period detector.
So the idea is that in a system where we have a certain synchrony bound that is unknown to us,
and the system can be any period before a certain time,
that is the global stabilization time that is unknown,
and after this period the system will stabilize below the bound of signal.
So it means every delay of our nature will be below this bound.
And our purpose was to create a failure detector that before the time t,
and also after the time t actually, it can have a period that is arbitrary,
in the sense that I can also make a mistake,
I can have suspect,
of processes that are actually correct,
but there is a time t prime that can be greater than the stabilization time t,
after which our primitive will stabilize to a behavior that is the one of the perfect failure detector.
That means that every suspect after this time t prime will be correct,
you cannot suspect a process that is actually a correct process,
and every process at this correction will be detected,
without error.
So that is the strong completeness,
and the event of strong accuracy.
We thought the idea of the algorithm is to start with a certain delay,
and this delay is the delay that our algorithm uses for the cyborg ping pong.
So in our algorithm we send a ping message,
we receive a pong message,
and we use a delay of delta,
to understand if the receiver of this ping pong is false or not,
and the idea is that every time,
we make a mistake,
every time we see a process that is inalive,
and insuspected,
so we understand that our algorithm made a mistake,
the idea is that we restore the process,
but also we increase the delay.
So what happens in this algorithm is that this delta grows.
And the idea is that this delta will grow fast enough,
and large enough,
to be greater than the bound of sub a.
So this delta will be greater than our stabilization time
to the stabilization bound b in our system.
And once this happens,
after the global stabilization time,
we will not make any more mistakes,
because our algorithm will detect,
as fresh as only the process that actually crashed.
So now the eventual perfect serial detector thing here,
has two properties.
The strong completeness,
that is the same one of the perfect serial detector.
Eventually, every process that crashes
is permanently suspected by every correct process.
And this has another property,
that is the eventual stronger accuracy.
Eventually, no correct process is suspected by any correct process.
And so what remains to show,
is that this algorithm respects the two properties
that we have seen right now.
So for the strong completeness,
the proof is simple enough.
The strong completeness says that
if there is a process that fails,
let's say this is the process that fails,
this process b,
then any correct process will eventually
detect that b fails,
and will never change opinion,
will never say b is alive, b is alive, b is alive.
Well, why this happens?
If b crashes,
it will stop to answer
to ping and pong of the processes.
And so there will be a time
after which for any request
that we send to this process,
we cannot see the reply,
because the process is crashing.
And so this is the proof
of the property of strong completeness.
Since it crashes,
it's possible that
you receive, you know, messages,
even from old time,
when the process was alive,
but this number of messages is finite, right?
Because this guy crashes,
so it's possible this guy
will send a certain number of messages.
So after you receive the message
that the process generated when it was alive,
you will not receive any more reply
to the new one,
and so you will detect it as crashing,
and you will detect it as crashing forever,
because there is no one to answer back.
So the strong completeness is easy enough.
What is the idea for the strong accuracy property?
Well, for the strong accuracy,
we have to consider our system
after the stabilization.
So there is this time that is unknown to us,
and after this time,
our delay will always be below
a certain amount that in the proof
I call max delay.
So after this time,
for every ping that I send to the process,
it has to reply to myself
after a time that is at most
two times maximum delay.
It's not possible that this ping and pong
takes more than two times maximum delay.
So let us suppose that our delta
at this point is above two times maximum delay.
So let us suppose that the delta of the algorithm,
once we stabilize,
is above two times maximum delay,
then it's not possible that you make a mistake.
Because you send the message,
you wait two times maximum delay,
more than two maximum delays,
so there is enough time for the message
to reach the target and come back.
So if at this point delta is above two times maximum delay,
there is nothing to prove this.
Obviously.
Let's say that after the stabilization time,
our delta is below two times maximum delay.
This is possible.
Well, what happens if it's below?
It happens that we will start to do our measure,
and we will get the reply of the process
after delta.
Right?
But if we get the reply of the process after delta,
then it means that here,
we will get this line.
Because it means that we suspected the process
when we end our timer.
Then we receive the message after,
so the process will be alive for the next timer.
And I will find that the process is inalive
and insuspected.
And what I do?
I will increase the delay.
How many times I can increase the delay?
Well, you can increase the delay
a finite number of times,
because eventually our delay of the timer
will be above two times maximum delay.
And when our delay becomes above two times maximum delay,
you cannot make mistakes anymore,
because of the things that we said previously.
There is enough time to which the target can come back,
and you cannot make mistakes anymore.
And this shows the strong accuracy.
So for every process that is correct in the system,
any other process
can suspect it for a finite time,
but after a certain bound
will never suspect it wrongly,
because of this.
OK?
Are there questions on the algorithm
before we progress to the next one?
Questions on the algorithm,
observations on the algorithm?
OK.
I have an observation.
Let us say that we have our correct process P1,
and there is the correct process,
not the correct process,
there is process P2 that is faulted.
And P2 crashes at this time,
let's say that this is time 10,
just to put a time on the process.
OK?
Is it clear?
So we have this situation.
And we are running this algorithm.
So is it possible here that at a certain time 100,
on process P1 we see restore P2?
Is it possible that after 100,
I see on this process P1
the event restore process P2,
even if process P2 departed from the system at time 10?
Can we have this situation in this algorithm?
So can I have that process P1
sees here, for example,
suspect P2,
sus P2,
because P2 suspected in that discretion,
and then after a lot of time
I receive an event from the algorithm
that says restore process P2.
Is it possible or not?
Could P2 have sent a message?
Sorry, can you repeat?
Could P2 have sent a message,
or could it have been lost for...
Not lost.
I mean, lost for me means that...
Delayed.
Delayed, OK.
One possibility is this one.
At this time you send a message to P2.
And you ask P2, are you alive?
And he answers, because he's alive.
But this message,
the system was asynchronous at this point,
and so this message takes to P1.
So we have P1.
We have our P2.
P2 crashes at time 10.
And here at time 100,
we say restore P2.
So why it can happen that we have a restore
after the guy crashes,
and a lot of time after?
Because here you send a message to the process,
and this process replies.
But remember that it's possible
that the system is asynchronous before the bound.
So it's possible that this message takes
a delay of 110 seconds, for example.
And so it means that this message
will be received here.
Once you receive the message,
here you send a previous message,
but you receive this reply,
and you don't know that it's an old one.
So when you receive the reply,
you will say, oh, the process is alive.
But notice that this situation
cannot happen always.
Because here it's possible that you ask it three times,
and you have three messages that will
come back in the future.
But this number of messages is finite.
And so there will be a time after which
all these messages have been received.
And you cannot again say it's a restore PQ.
Okay? Is it clear?
But it's possible that for an undefined time,
after the crash of PQ,
someone will still restore it.
Because you don't have,
for this algorithm,
you don't have a way to detect old messages.
Okay? Yes?
Yes.
I mean, it depends how you imagine the synchrony.
If we imagine that, you know,
we have this kind of delay,
and here I have a delay of one hour,
the moment I send a message here,
you will receive one hour after.
So it's possible that the new messages
that are sent at this point are synchronous.
And you are receiving, you know, old stuff.
Okay.
So can someone suggest how to avoid this situation?
This is not a problem.
I mean, the algorithm still respects the property.
What is a way to avoid this situation?
So what is the problem with this message?
Is that this message was the reply of this ping.
Okay?
So how we can do, in an easy way,
to understand that this is an old reply?
Yes?
See what's wrong.
You say ping 1, ping 2, ping 3,
and this is ping 100.
If I see the reply of ping 3,
and I'm at ping 100,
I say this is an old message,
and I discard it.
Okay?
Notice that this is not a problem.
For the specification, it's not a problem
that in the future, even if it's dead,
you receive and you say, okay.
But if you want to remove this,
it's easy because you can use sequence number,
for example.
You can use sequence number on the ping.
Okay, observation question before going forward.
Yeah?
Is it better to use sequence number than timestamp?
It is just that you remove some of the mistake.
But I agree with you,
you cannot fix the problem of eventual synchrony.
Okay?
So you can fix that if the process crashes,
after a bit, all the old messages,
you will discard it.
But you cannot fix the fact that once,
if the process is alive,
you can suspect and restore a process that is alive.
Okay?
This you have to work.
And so there is one property that I want to show
because it will be useful for an algorithm that we have next.
Here we have the tower algorithm
as this suspected set,
and in this suspected set,
we put the process that we suspect.
Okay?
So what I want to show
is this lemma on the suspected set.
The lemma is really easy.
It says take two correct processes,
P1 and P2,
and let suspected 1 and suspected 2
be the suspected set of these two processes.
And it says there is a time T,
stabilization time,
after which suspected 1
is always equal to suspected 2.
Okay?
So this lemma says,
let us take two processes,
P1 and P2.
It's possible that at a certain point
they suspect different people.
So this guy suspects P3 and P2,
for example,
and this guy suspects P1 and P4.
But there is a time
after which the suspected set on this process
will be always equal to the suspected set
on this other process.
So the suspected set,
they stabilize to the same value.
Okay?
It's clear what is the statement.
So what is the proof?
Let us suppose that this is
not true by contradiction.
And so if this is not true,
then it means that
for any time in the future,
we have that suspected set of P1
is different than suspected set of P2.
They are different sets.
Okay?
If they are different sets,
then it means that there is an element
that is in one of the sets
and not the other.
Because if all the elements of S1
are inside S2
and all the elements of S2
are inside S1,
then they are equal.
Okay?
So the only way to be different
is that there is one of the two
that does one process
and the other does not have that process.
Okay?
Is it clear?
This is the definition of
difference between two sets.
Okay?
So it means that there is a process P
that belongs to S1,
but this process P does not belong to S2.
Okay?
Clear?
Now let us suppose that P
is a Crescent process.
If P is a Crescent process,
then it is impossible that P stays in S1 forever.
Because otherwise it means that
the algorithm is not strong complete.
Because an algorithm is strong complete
if every Crescent process
is permanently suspected
by every correct one.
Okay?
So if P is a Crescent process,
sorry,
it is impossible that P
does not belong to S2.
P has to enter in S2
because S1 is permanently suspected,
but also P2 has to
permanently suspect it.
So if P2,
if P is a Crescent process,
it has to belong to both sets.
Otherwise our algorithm
violates strong complete.
Okay?
Is it clear?
If P is someone that Crescent,
simply because
everyone has to suspect it forever,
it has to exist in both sets.
So it is not possible that
P is a Crescent process.
The only things that remain
is that P is a correct one.
But let us suppose that P is a correct one,
then we have a contradiction.
What is the contradiction
if P is a correct process?
If P is correct,
what is the contradiction?
Should that be in S1?
If P is a correct process,
then it is not possible that
someone suspects P forever.
So it is not possible that
P belongs to S1 forever.
P has to go away from S1.
Okay?
Is it clear?
So it is not possible that
we have a process that stays in one set
and not in the other,
because if it is Crescent,
we have a contradiction.
If the process is correct,
we have the other contradiction.
And so it means that
all the processes that stay in S1
stay also in S2.
It means that these two sets are
equal after a certain time.
Is it clear?
If you think about it intuitively,
it is true.
Because if the algorithm
does not have to make mistakes
after a certain time,
we have to have the same suspected set.
Because if we have two different
suspected sets,
one of us is making a mistake.
Okay?
Clear?
So there is another primitive
that is also used in distributed computing
and is an alternative
of the failure detector.
For now we have seen the failure detector.
Failure detector
and we have seen
two failure detector,
P,
that never make mistakes
and the eventually perfect
that makes mistakes
in finite time
and then stabilizes.
Another primitive that exists
is the so-called
leader election primitive.
Leader election.
So the leader election primitive
asks something that is,
let's say,
has a certain relationship
with the failure.
It does not ask you
to detect who fails,
but asks you
to identify one process
that is correct
and is the same process
for everyone.
So what we want to do
with the leader election primitive
is to elect someone
that is called a leader
or coordinator
and I have to know
that this someone
that I elect
is the same for everyone
in the system
and this someone is called.
Okay?
Is it clear,
intuitively,
which is the property
in a bit?
Why this primitive
is interesting?
Because if you have
leader election,
then what you can do
is that you can try
to solve a problem
with a client-server approach.
I elect a leader,
every one of us
sends its problem
to the leader,
the leader solves the problem
and then sends it back
to the other process.
Okay?
What is the problem
with the client-server approach?
It's that if the server
goes down,
I send to the server
and no one answers.
So if the leader election
tries to avoid this
by saying
I elect a certain server,
and then once this server
crashes,
everyone after a bit
will elect a second one
and will say
I have to elect a new leader
and the new leader
is process 2
because process 1 crashed.
And everyone agrees
after a certain time
that the leader
is process 2
because you have to agree
on the leader.
Otherwise,
if I trust someone
and you trust someone else,
then you know
it's a chaos,
you cannot use it
to solve the case.
Yes?
Yes.
In the case of
an event-only synchronous system,
this can happen.
Okay?
If you are in a system
that is synchronous,
it's not possible
that the leader
has unbounded delay.
Everyone has the same delay
that is the synchrony
of the system.
So if the system
and the delay
are two seconds,
everyone has two seconds.
It's not possible
that the leader
has some.
And we will see
we have the leader election
and we have
omega leader election.
And the leader election
is the
co-respective
of p.
So this
we have in synchronous system.
And the omega leader election
we have in
event-only synchronous.
It's a leader election
that can make
mistake
but then stabilizes
and everyone
does the same.
Okay?
This is the
principle
of the leader election.
So the leader election
is similar
to the failure detector.
Everyone has
a box
and this box
has a single event.
Leader
process
the identity
of the process.
That means
we are electing
this process
as a leader.
So this is
the interface.
And what are
the properties?
We have
the first property
that is
either
there is no
correct process
or some
correct process
in the system
is
event-only elected
as the leader.
So it says
if there is
someone alive
in the system
my primitive
has to elect
a leader.
It's not possible
that my primitive
block
and does not
elect anyone
if there are
people that are alive.
It has to be
one of them.
Okay?
The second
property
is the accuracy
I don't like it
but still this is
what it is
and so I show you
this property.
And it says
if a process
is leader
so it means
if a process
is elected
as a leader
then all
previously
elected
leaders
have crashed.
Okay?
So this property
to work
correctly
assumes
that you cannot
elect
two persons
at the same
instant of time.
So if you cannot
elect two persons
at the same
instant of time
what this process
this property
is telling you
is that
if I elect a leader
if I process P1
and I elect a leader
I elect P2
you cannot
elect a different
one
that is alive
because if you
elect a different
one
you elect P4
that is also alive
then there is
we are violating
this property
because I elect
P2 now
on myself
I say P1
is the leader
after one second
P4 is the leader
you also have to say
P1 is the leader
so you cannot say
a different
OK?
But this works
only if we have
an order
on the election
that is fixed
because if
for the same
time
this property
does not tell
anything
it is possible
that at the same
time
we elect
a different
one.
OK?
So this property
assumes
that the election
time
are always
different.
This is the
leader
this is the
event
election
of Px
OK?
Let us see
an execution
to make
things clear
Let us assume
that we have
a system
with P0
P1
and P2
and P0
crashes
at this point
this is a
part of the
execution
OK?
This execution
continues
in the future
and we have
our leader
election
P0 is the
leader
P0 is the
leader
P0 is the
leader
then P0 crashes
so if P0 crashes
we have a leader
that is 40
by the property
1
we have to elect
a new leader
because either
there is no
correct process
or some
correct process
is eventually
elected as a
leader
so if P0 crashes
at this point
we have a leader
that is crashed
so for the first
property
we have to
I still believe
in P0
so it doesn't
see the election
event yet
P1 says
I am the leader
and P2
still
is with P0
Is this execution
possible
for the P0?
Is this execution
possible?
Yes
OK
Why is it possible?
Because it says
after a certain
time it doesn't
say both
have to detect
it immediately
Yes
So
you don't
have to
elect the
same leader
because it is
possible that
at this moment
this elected
the new leader
and this one
still is with
the old one
but we need
that this process
sooner or later
also says
P1
OK
So this is
a property
that
an execution
that works
if this process
changes
and says
P1
and they
trust
the same
leader
OK
It's clear
that the new leader
this property
which kind of
property it is?
It's a
liveness property
OK
So it's possible
that you stay
with the old leader
for a bit
but eventually
you have to go
to the new one
OK
Clear
Clear
So
eventually
elected as a
leader
So we have
the event
for the year
so the property
is a liveness one
Is this execution
possible?
So
here
there is P1
that is elected
as a leader
and here
there is process P2
that at this point
says the leader
is myself
Is this execution
possible?
At this point
we have the election
of P1
Right?
So at this time
we elect P1
At this time
after
this other guy
is electing
a different process P2
OK
But at this point
once we elect P2
P1
is still alive
and so
there is a mistake
So this is not
a good execution
This execution
is not possible
because it
violates
the
property
accuracy
property
Because
we elect
a new leader
when the old one
is still alive
and you cannot
do
because otherwise
you have disagreement
These two
are trusting
two different leaders
and so
many things
can happen
OK
Clear
OK
Now
I have
the algorithm
in the next slide
What is an idea
to implement
this algorithm?
You are in a system
that is synchronous
and you have
the perfect
failure detector
How you can
implement
this algorithm?
You are in a system
that is synchronous
and they give you
a perfect
failure detector
and they say
implement
in the election
Yes?
So it says
at this point
this is
change ID
and say P1
No
Because the moment
is 82
This is an interval
of time
where there are
two leaders
that are put alive
and they are distant
OK
So you violate
this problem
in this interval
Even if this guy
change idea
you have a portion
of time
where you have
two alive leaders
and this is not possible
OK
Incidentally
having
one alive leader
having
half of the system
that trusts P1
and half of the system
that trusts P0
you cannot avoid
because there is
half of the system
that has seen
P1 yet
and elect a new one
and there is
another part of the system
that has not yet
detected the fault
and believes
the older leader
So you cannot create
a primitive
where in one instant
everyone switch
to the same leader
So this is impossible
But
you can create
a primitive
where this situation
cannot happen
that you have
two alive leaders
and you trust
two alive leaders
because this is
actually the problematic
stuff in many algorithms
and we will see
an application
of this algorithm
in a few minutes
one hour
OK
So
how we implement
the algorithm
Yes
None
OK
In this primitive
you have to elect someone
and that's to be the same
OK
You cannot say
I don't want this guy
OK
and I elect a new one
You can do
algorithms
that are complex
in an arbitrary way
The important thing
is that
once you decide
a leader
and you elect
someone as a leader
if the leader is alive
anyone else
after you
So you can do
voting
You can do
a lot of strategy
to elect the leader
OK
Some
are more complex
than the other
There are many ways
The important thing
is that you do not elect
two alive leaders
at the same time
No
This is not OK
OK
This is OK
if temporarily
means that
we do not elect
because in the algorithm
you need a variable
that you set the leader
and once you set
that variable leader
you elect the leader
So how we can
implement this algorithm
in a system
that is synchronous
with the perfect
failure detect
You don't need messages
You just need
the perfect failure detect
You could decide
that the leader
is the smallest process
and start in order
and whenever
you detect
the leader
is dead
that process is dead
you go to the next one
OK
So your colleague
is saying
at the beginning
we know
the acceptable process
in the system
that is
P1
P2
P3
whatever
the minimum might be
OK
Since this set
is the same for everyone
the minimum is the same
for everyone
so at the beginning
we elect
all the same processes
OK
When is that
we can have a problem
When this minimum crashes
But when the minimum crashes
if we have
the perfect failure detector
you will have
an event
that locally turns
to P0 crash
And so
what you do
you go to the second minimum
and you say
P1 is the leader
OK
It's possible
that process P1
detect P0
the crash now
it's possible
that process P2
still believe
that P0 is correct
and so stay with P0
but if the failure detector
is perfect
on P2
sooner or later
this has to happen
and so also
P2 will switch
and P2 will switch
it will switch
to P1
OK
Then if P1 crashes
everyone will switch
to P2
If P2 crashes
everyone will switch
to P3
and so on
and so forth
OK
Is it clear
So to create
this algorithm
you just need
the perfect failure detector
you do not need
to send messages
and this is the algorithm
it's really
a few lines
When we initialize
we have the suspected set
that initially
is empty
and in the suspected set
I put
you know
the processes
that are crashing
and then I have
the leader
that initially
is null
initially
no one is the leader
Remember
this is the perfect
failure detector
this is not
diamond P
this is the perfect one
the one
that does not
make mistakes
when
the event
crash
happen
Logically
I add the event
that crashes
to the suspected set
So P0 crash
I say
P0 suspected
P1 crash
I say
P1 suspected
P3 crash
I say
P3 suspected
And here we have
the handler
that elects
a leader
If the leader
viable
is different
that max rank
max rank
is the maximum ID
The maximum ID
in the set
of processes
minus the suspected
and all the processes
minus the suspected
are the ones
that are alive
for you
Then
what I do
I say
leader
is equal to
the maximum ID
of the ones
that are alive
for me
and they trigger
the event
leader election
leader
Ok
So in the previous
algorithm
what happened
We have
P0
P1
and P2
Let's say
which guy
will elect
first
P2
P2
So everyone
will say
P2
This say
P2
This is possible
that is activated
a bit later
and say
P2
This say
P2
Then P2 crashes
at this point
This one is
the first one
that detects
that P2 crashes
And what says
when the failure detector
says crash
P2
What this guy
will elect
P1
If the failure detector
is perfect
eventually
he will see
crash
P2
and what will
elect
also P1
And so we will
converge
to the same
leader
Ok
Is it clear
Is the algorithm
clear
Ok
So
Eventual detection
Eventual detection
the first
probability
is
either
is no more
process is
correct
or some
correct process
of eventual
detection
is one line
is from
the strong
completeness
of the perfect
failure detector
Ok
Since the
failure detector
is strong complete
and everyone
that crashes
will be
detected
the only way
to have
that you do not
elect someone
is that everyone
crashes
because otherwise
if there is
someone alive
it will be inside
Pi
capital Pi
minus suspect
that we cannot elect
two alive
guy
at the same time
Let us say
that process P1
elect
the process
10
and
process P2
elect
process 7
and they are
put alive
at the same time
Ok
Let us say
that we have
a situation
which this happened
there is process 1
that elect 10
and process P2
that elect 7
and they are
put alive
in the moment
they are alive
Ok
So
if process P2
does not elect
10
it means that
on process P2
the maximum
is not 10
Right?
It is the only way
because otherwise
you have to elect 10
But if the maximum
is not 10
on process P2
the only way
for which P2
does not see
the maximum
of 10
is that this guy
tells to him
10 is dead
Ok
But the moment
tell to him
to violate
the strong accuracy
of the perfect failure detector
So it means that
the perfect failure detector
is wrong
That is not possible
Ok
It is clear
So the only way
to skip someone
is that you detect
that someone is dead
But if the
failure detector
is correct
it cannot tell you
P10 is dead
when P10
is alive
So this cannot happen
And so the proof
is from
the strong accuracy
of P
and the total order
on the rank
of the ID
This is also important
What I mean
by total order
of the rank
of the ID
I mean that
process 10
is the maximum
both for me
and for you
Because if we don't
have the same order
on the ID
then I cannot use
the strategy maximum
because the maximum
for me
will be different
than the maximum
for you
But since on the
integer
there is a total order
on which everyone
agrees
the maximum
will be always
the same
on the same set
So if there is
no maximum
then the algorithm
will not agree
I will show you
This seems trivial
but it is not trivial
there are systems
where you do not agree
on the maximum
Let's say that
my algorithm
was developed by me
by me
your algorithm
was developed
by another guy
and we wanted
the algorithm
to communicate
It is possible
that I am using
a different
ordering of the ID
So it is not obvious
that you can order
the ID
but we assume
that you can always do
because if you
are the one
who is not clear
the failure detector
is not perfect
And in the
previous algorithm
if we are on a system
that is
eventually synchronous
and we have
the failure detector
that is not
the P
but is diamond P
is the failure detector
that can make
mistake
It happens
that we can
construct
something
that is similar
to leader election
but it is called
that omega
eventually
leader election
So it is a
leader election
algorithm
in which
we can make
mistake
So it is possible
that I elect
process P2
that is alive
and you elect
P3
that is alive
But there is a time
after which
we stabilize
and we will elect
every one of us
a correct process
and every one of us
will elect
the same process
Ok
It is clear
Similar to
the
eventually perfect
failure detector
So in this
leader election
infinite time
we can make
mistake
and every one
will trust
a correct leader
if it exists
And this correct leader
will be the same
for everyone
Ok
Let's see the property
Eventual accuracy
There is a time
after which
every correct process
trusts some
correct process
And
Eventual agreement
There is a time
after which
no two
correct processes
trust
different
correct processes
So the first property
allows us
to trust
a correct process
So you cannot
trust
two different
correct processes
The second property
tells you that
if we trust
two different
correct processes
we can do it
in finite time
But there is
a time
after which
we have to trust
the same
So if I trust
a correct
and you trust
a correct
we have to trust
the same
Ok
Together
put the property
means that
every one
after a certain
time
has to trust
the same
two different
corrects
for
indefinite
time
After a time
we have to trust
the same
So put property
force you
to trust
the same
correct leader
after a certain
time
In the primitive
we had this
event
that is
trust
not
elect
So is trust
a certain
identity
Now trust
elect
for me
is the same
Let us say
that we have
this execution
of our
omega failure
detector
So we do not
know the algorithm
we only know
the specification
We have to see
if this specification
respect the execution
Let us say
that we have
this specification
this execution
sorry
of the
omega
So we have
this trust
P1
this trust
P2
this trust
P3
this trust
P4
Then P2 crashes
Then P3 crashes
And they remain
like this
forever
So forever
this say
trust P3
and forever
this say
trust P3
Is this
a correct
execution
of our algorithm
Is this
execution
correct
No
And which property
we are violating
The eventual
accuracy
The eventual
accuracy
Because he said
there is a time
after which
every correct
process
trusts some
property
forever
they say
P3
P3
P3
Because P3
crashes
In finite time
Let us say
that I do not add
to this execution
the fact forever
I say
we stop the system
now
and I see
a system
that is like that
We can say
that this violates
some property
No
Why
Because
the eventual accuracy
which kind of
property it is
Lightness
property or not
No
No
Okay
They are both
lightness property
If you remember
the diamond P
The diamond P
had two properties
and they were
both lightness
properties
It is the same
If you go there is
some completeness
that is lightness
and the eventual
strong accuracy
that is also lightness
Okay
Let us look at
this second execution
So we start
everyone
trusts himself
So
kind of like
like in life
situation in which
this guy
say
I trust P4
and trust P4
forever
and this guy
says
I trust P1
and I trust P1
forever
Is this a correct
execution or not
No
No
And which property
we violate
in this case
The agreement
The agreement
We violate
the agreement property
that says
that if two process
trust two
process
after a time
they have to trust
the same
So this one
Yes
Because P4 is correct
This trust is correct
Yes
Because P1 is correct
But if they remain
like this forever
they trust two different
correct process
and this is not
acceptable
Okay
Clear
If I stop
the execution
now
and I see
this execution
this time
Can I say
that this execution
violates some
property
infinite time
No
Because it is a safety
property
It is a lightness
property
Okay
So
How we
implement
the algorithm
So let us say
that I come to you
and I say
you have to implement
this algorithm
that has to work
in eventual synchronous
and you have diamond P
What is the algorithm
for this algorithm
How we implement it
Same as before
Yes
It is
almost the same
The only difference
is that
since we have
diamond P
when we restore
someone
we have to remove
from the suspect
But this
algorithm
is the same
Okay
So it is the same
algorithm
And here is the algorithm
We have the
eventual effect
now
that the
suspected restored
So when we
suspect someone
we go to the
suspected set
When we restore
someone
we remove
from the
suspected set
And this
handler
is the same
as before
When leader
is different
from the
max rank
of capital
pi
in the event
I trust the new lead
Okay
It is the same algorithm
as before
The only novelty
are these two lines
Okay
that were not
in the previous algorithm
Is it clear
Is it clear
So now
we should show
the formal properties
We have to show
that there is
the accuracy property
and the agreement property
Okay
But
the
Let's start
with the agreement
Okay
So
the
Let's start
with the agreement
So
It must be
Well
we must
We have to
assess
the
proof
of proof
of the
proof
That is
the
the
proof
of
the
proof
of
the
proof
of
the
proof
of
the
proof
of
the
proof
of
So the eventual agreement comes from the fact that the suspected set on the two current
processes, they stabilize to the same set. And this is the dilemma that I showed before,
that I say if P is wrong, it has to be removed from both, if P is correct, it has to be in
both, and so it means that the two sets become the same. The eventual accuracy means that
you cannot trust someone that crashes forever. And why you cannot trust someone that crashes
forever? Let us suppose that you do. You trust someone that is crashed forever, it
means that that someone is not insuspected. But then it means that this guy is making
a mistake, is not strong concrete, because there is a process that crashes forever, and
this guy is not telling you that process crashes. That is impossible, because this is strong
concrete. And so for this reason, also this algorithm must have the accuracy problem.
So you have to go from a 41 to a correct leader.
Okay.
Sooner or later. Are there questions on the omega failure detector? Are there questions
on the omega failure detector? Okay. So the application of the leader election, the normal
one, we will see one now. For the omega, you have to wait until you see the consensus on
eventual asynchronous system. But it is used in the real system. Okay. There is Paxos,
for example, some implementation of Paxos that uses these omega things, this omega idea.
Okay.
Just before the break, then we will do a break of ten minutes. Let us see this drawing.
What we can do, order our system according to the failure detector that we have. So let's
say that I have a system where I have the perfect link and the perfect failure detector.
This system is called a fail-stop system. It is a system where I can detect the crashes
without making a mistake.
Let us suppose that I am in a system where I have the eventually perfect failure detector.
This is called a fail-noisy system. That means I can detect failure, but with a noise. I
can make a mistake and so on and so on. And let us suppose that I have just a perfect
link. Then I am in a fail-silent system because I cannot detect any kind of failure if I am
in fail-silent.
I will always make mistakes from this point of view. Here you make mistakes all the time.
And we have a relationship between these systems. So when I have the perfect failure detector,
I can resolve a lot of problems. When I have the eventually perfect failure detector, I
can resolve less problems. When I have this system, I can resolve less than this. Is it
clear?
So the stronger model is this one, then there is this model that is kind of weaker, and
then there is this.
The stronger model is this one, then there is this model that is kind of weak, and then
there is this one that is the weakest one. When is that we have seen also three systems
that have this relationship? There was one system in which we can solve a lot, one in
which we can solve some problem, and one in which we can solve the less.
Synchronous, eventually synchronous.
Yes. We have the synchronous, the eventually asynchronous, and the asynchronous one. There
was the same relationship.
And why there was the same relationship? Because asynchronous, you cannot create a
failure detector. Eventually synchronous, you can create a failure detector that makes
mistakes oftentimes, but oftentimes it stabilizes. And synchronous, you can create the perfect
failure detector.
So in the three systems, you can have no failure detector, failure detector with some noise
on perfect failure detector. So this is why we have this relationship. This is the inclusion
between the execution.
But there is something wrong.
There is something that I want to do, this question before the break. Let us see the
relationship between the failure stop and the synchronous system.
Synchronous is the one with the delay of the channel that are bounded. Failure stop is the
one in which you have just perfect link and the perfect failure detector.
So in this system, you don't have the time. I just give you a box that is the perfect
failure detector, and you just have access to the perfect link and this perfect failure
detector.
It's clear?
So what is the relationship between the synchronous system and the fail stop?
The relationship is A. So it means every problem I can solve here, I can also solve
here, and the other way around. Every problem I can solve here, I can solve here. The relationship
is C. I can solve more problem in this model that is synchronous, or the relationship is
B. That means I can solve more problem in synchronous that is fail stop.
Because it's possible that there are three relationships between these systems. Either
they are equivalent, A. Or the synchronous is stronger, B. Stronger means that you can
solve more. Or the fail stop is stronger, and is C. Is it clear, my question? So what
is the relationship between synchronous and fail stop? Fail stop is just the perfect link
with the failure detector. They are equivalent. Synchronous is stronger than fail stop, or
fail stop is stronger than synchronous. Okay? So we will see the answer in ten minutes.
We start again.


--- Lezione_8_parte_2 ---

is stronger than face-stop B, or the face-stop is stronger than synchronous C.
So what is the answer to this question?
Notice that for B to be true, it means that there must exist a problem that you can solve here, but not here.
For this one to be true, it means there is a problem that you can solve in face-stop, but you cannot solve in synchronous.
Now, for A to be true, it means that all the problems that you can solve in this set, you can also solve in this set.
It means that they are equivalent, so that there is some algorithm that has formed any algorithm for this one,
and one for this one, and the other way around.
So how many of you think that the answer is A?
How many of you vote for A, that they are equivalent?
Okay, there is one for equivalent, just one.
You are all open.
For B, how many vote for B?
How many think that synchronous, okay, there are three.
Okay, let's put it six, because I don't want to count.
Okay, how many for C?
How many think that it's C?
Okay, there is also someone for C, so for C, more or less three.
Okay, it means that we have eight people in the room.
No, not ten people.
Okay, you can speak in synchronous and face.
The difference between synchronous and face is that in synchronous, we have the delay of the channel.
So in synchronous, I have the concept of time and the delay of the channel.
In face, I just have the link and the perfect failure of the link.
Okay, clear?
Okay, let us examine first solution C.
If C is correct, then it means that there is a problem that I can solve in face.
And this problem, I can also solve it.
So there is a B that belongs here, but not here.
I cannot solve this.
But this is impossible.
Because let's say that in order to solve this problem, I need B.
I can build B in synchronous.
I can build it.
You have seen the algorithm, right?
So it means that here, I can create the box B.
If here, I can create the box B, it means that it's not possible that there is a problem that I can solve here, but not here.
Because if two solve this problem, I need...
I first create the box, and I can do it.
And then I solve the problem.
So C is impossible.
Okay, it's clear?
Because I can build it if I need it.
So now that you have seen that C is impossible, between A and B, it seems more likely.
So what is an example of a problem that I can solve here, but I cannot solve here?
Since I'm a fair person most of the time,
it means that the problem...
A problem that you can solve here, but not here, is some problem that you have seen.
Because otherwise it was not fair for me to ask, is there a problem that I can solve here, but not here?
Since I'm fair most of the time, this problem, you have seen it.
So what is a problem that to solve it, you need actually the assumption of synchronous.
You need actually the delay of the channel and everything.
You need the concept of time that you cannot solve in the perfect field detector.
Box synchronization.
Box synchronization.
To solve the clock synchronization, you need the assumption of synchrony, or whatever, because you need to, like I have to send, and whatever.
I need the concept of time. Without the concept of time, I cannot solve clock synchronization.
Here, in this system, there is no concept of time. You just have a box that tells you that guy crashed, and that's it.
So you do not know about the delay of the channel. All these things are hidden between these boxes.
And so it means that the synchronous system is more powerful than fail-stop.
They are not equivalent because there is clock synchronization.
So the relationship between the two problems is like this.
Fail-stop, you can solve less problems in synchronous, and there is at least one point that is clock synchronization.
But actually, you can find a lot of problems, many problems in which you can solve in synchronous, but not in fail-stop.
Clear?
Price link.
For us, a lot of problems that matter, consensus, state machine replication, total order broadcast, that for now are just terms without meaning, but are important problems, you can solve here.
So you just need someone that tells you that process crashed without making a mistake, and you can solve consensus, total order broadcast, finite state machine replication, and whatever, whatever, whatever.
Okay, so now in the second part, let us see some applications.
So in the second part, let us see some applications of the failure detector in the leader election to show you that they are important premiums.
But actually, you can use them to solve fairly complex problems in a fairly easy way.
And we will see it for the motor exclusion.
So the first application that we will see is how to use our effort failure detector to make the Lamport motor exclusion fault tolerant.
You remember the Lamport motor exclusion was two lectures ago.
And it was a fairly complex algorithm.
Thanks to the perfect failure detector, we can make this algorithm tolerant to crashes without much problem.
With just a bit of thinking.
So our purpose will be to see how to use the perfect failure detector to make this algorithm fault tolerant.
Remember, in the original algorithm, the number of failures you can tolerate is zero.
If someone crashes, the original algorithm does not work.
Before trying to make this algorithm fault tolerant, we have to think about the specification.
We have to think about the specification of motor exclusion.
Because the specification of motor exclusion that is the original one does not think about failure, does not work with failure.
Because already, if we remember the motor exclusion, the motor exclusion is at any time t, there are not two processes, P1 and P2, in the critical section.
This was the definition.
But this definition, if there are failures, does not make sense.
Why does not make sense?
Let's say that we have process P1.
Process P1 enters in the critical section and then crashes in the critical section.
What you can do?
Nothing.
It will remain in the critical section forever because it crashed inside.
And so it means that if we have a failure and we keep the old specification,
the first process that crashes in the motor exclusion locks the system for everyone.
But this is, in some applications, does not make sense.
Because a process that crashes, I can say, okay, exit the critical section, it doesn't count for the critical section.
Clear?
So, already we have to change the definition of the motor exclusion.
Because if we keep the old one and we try to make it fault tolerant,
we cannot make an algorithm that makes one process crash in the critical section and then another enter in the critical section.
The first that enters and crashes locks the system for everyone.
And so the new property that I suggest is at any time t,
at most one non-crashed process is inside the critical section.
So in this property we can have in the critical section at the same time P1 and P2 if P1 crashes.
We can have at the same time in the critical section P1, P2, and P3 if P1 and P2 crash.
Between the processes that are covered at that moment,
there can be two processes.
There can be only one.
Okay?
It's clear?
It's clear?
This makes sense in a lot of applications.
Things about motor exclusion that you are using for the street, right?
For taking a semaphore.
And there is a car that stops and so will not cross the semaphore.
And all the cars can go by, right?
Do not have to wait for the fresh one forever.
Liveness.
Also the liveness we have to change.
Because the liveness, if a process asks to enter in the critical section,
it will eventually enter in the critical section.
But if there are the crashes, you cannot use the same property.
Because if I ask to enter in the critical section and I crash before entering,
I cannot enter anymore.
And so we have to use this new property.
If a correct process want to enter in the critical section,
eventually enter in the critical section.
Because if you are crash and you ask to enter,
I can exclude you forever.
Because, I mean, you crash.
You don't have to enter in the critical section.
Fairness.
If a process P requests access before a process Q,
then Q cannot access the critical section before P.
And also here I didn't put it.
Now this is OK.
Because I'm saying that the one that has to enter first is the correct one.
If I was writing a property if a process has to enter before another,
and this one is a crashed one, then there is a problem.
Because the crashed one will not enter,
and the other has to wait forever for the correct one.
For the crashed one.
Here it's stated in a correct way.
If a correct process requests access before another process,
we don't care if the other is correct or not,
I have to enter before that process.
So if the other is correct, I can enter before.
If the other is crashed, it's crashed and will not enter.
Are these three properties clear?
Are these three properties clear?
So this is the first step that you have to make
when someone asks you to make this algorithm for tolerance.
The first step is that
you have to read all the properties and you have to say
in order to make sense, this property has to be modified.
In order to make sense, this property has to be modified.
Because otherwise, if you try to implement the properties as they are,
it's possible that you have something that does not have sense.
Or is not usable.
OK? It's clear?
This is the first step.
And then the second step is to look at the algorithm.
And this is the original algorithm.
And now we have to look at this algorithm,
and we have to think, this algorithm,
when there is someone that crashes,
where it breaks.
So which lines of this algorithm
create problems when we have crashes?
This is the second thing that we have to do.
And what are the lines of this algorithm
that create problems when someone crashes?
Think about the action of the algorithm
that can create problems when someone crashes,
and then you move that action to the line.
The process that crashes,
in this original algorithm,
where they can create problems.
Yes?
So your colleague is saying,
the first problem that I see
is that if someone crashes the critical section,
he cannot execute the release.
If he does not execute the release,
all the other people will have the request
in the request set of the guy that crashes.
If that one is the minimum,
it will lock everyone.
So the first problem is that a guy
that is in the critical section
and crashes cannot release,
and on the line is this handler here.
A process that crashes cannot execute this handler.
And this is problem one.
Problem one.
Someone can see some other problem?
Yes?
Just for .
Please.
I'm pretty sure that that for each p
blocks everything,
because my request will not be granted
if someone crashes before sending me an hack.
Here.
Okay.
So your colleague said this p, right?
Yes.
He says,
this p, I'm terrified of it,
because if someone crashes
before sending an hack,
I will wait forever.
Because he cannot send the hack.
Right?
The algorithm is I ask to enter to everyone.
I wait for the hack of everyone,
and then I can enter in the critical section.
So even if you don't want to enter
in the critical section,
but you crash,
in this algorithm you create a problem to everyone
because you cannot send the hack,
and so everyone will wait for you
for that guy that is not sending the hack,
and will say,
oh, I have to wait for that guy.
I have to wait for that guy.
You wait forever.
Okay?
And so this is the second problem.
This is problem two.
Okay?
Clear?
So let us first try to fix problem two.
How we can fix problem two?
Remember we have the perfect failure detector.
So we have the perfect failure detector.
And you have to fix problem two.
Yes?
So your colleague say,
instead of writing for any p in pi,
I write p except minus crash.
That means I have to create the handler crash.
When there is a crash from the lower layer,
I put a process in crash,
and then I wait for every p inside capital pi minus crash.
That means for every one that I believe is correct,
I wait.
If someone is faulty,
sooner or later will appear here.
So you may not wait for a faulty forever.
Do you agree?
People agree on this?
Yes?
Question.
Is it formally correct to do an event crash,
remove process from the initial set?
No.
So your colleague is saying,
is it formally correct to modify this pi?
So in the crash,
things are removed directly from p?
No, it's okay.
It's just that you could do this most of the time.
Okay.
And so I do the same most of the time.
But yes, it's okay.
Okay.
So problem p2 seems to be okay.
How we can fix problem p1?
How we can fix problem p1?
You could essentially say,
I wait for the alcohol in the corner.
Process problem p1.
Yes?
Your colleague is saying,
I try to check if the process inside the critical section
is refreshed.
When I detect that that process is refreshed,
I send the release to everyone.
This can be an idea.
Can you see an easier way to do it logically?
What is the release?
What is the action that we do when we receive a release?
What action you do when you receive a release message?
Physically.
Not physically.
Logically.
That's what you do.
from the request set.
When you receive the release,
you go in the request set,
and they say,
let's see if there is a request
from that guy,
and then I move it.
Okay?
If there is someone that has crashed,
does it make sense that I keep a request
in the request set?
If someone is done,
why I have to keep its request in the request set?
Does not make sense,
because if it's done,
it will not enter in the video section,
so keeping the request in the request set
can only make a problem.
So what we can do,
is that once I detect a crash,
I go in the request set,
I see all the requests from the guy that crashed,
and then I move it.
And it is equivalent that the guy has done the release.
It's the same stuff,
because when the guy does the release,
I do the same action.
Okay?
Clear?
So it means that the,
so these are the critical points,
it means that the patch for our algorithm
is this one.
So there is the old algorithm,
and now I write the patch,
it's just the difference plus the line
that we have to change.
Patch one is capital pi,
capital pi minus crash.
The second patch is once a process crashes,
I put the process in the crash set,
and I do this action because of this check.
And then for all the requests in request,
such that the process that crashes
is the sender of the request,
I remove the request from request.
Okay, clear?
Is it clear?
Is it clear for everyone?
Okay.
And so it is enough,
or there is something that we are missing?
We need to release the crashed prop.
But here you are releasing.
Well, you remove the request from the request set.
If it's the minimum,
you remove the minimum,
and then you become the new one.
Okay?
So here you are releasing,
because if the one that is crashed
is the minimum request,
once you remove it,
other guy can enter.
So is this enough for the patch,
or there is a problem?
Somewhere that is lurking behind the code,
and then when we release this in production,
someone will call us at midnight
and say, oh, my system is not working.
So is there a problem in the code?
Yes, there is a problem.
But what is the problem?
Yes?
I think it's a guard.
We are not guarding the levers.
I think it's the only place where we are not checking.
Okay, so your colleague is making
a nice observation.
He says there is this place that we are not checking,
and I'm a bit afraid because we are not checking
this delivery of the messages.
So I'm not using the information
of the crashing process of this handler.
Because he's saying all the other handlers,
you are doing something.
Here you are doing something.
Here you are doing something.
Okay, here you are not doing much.
This is more or less fine,
because if someone sends a request
only to our system,
here you remove the request.
Here he's saying we are not checking it.
And why we can have a problem here?
You could receive a request after the process,
after the process crashed and you cleared the request.
Yes.
So the problem is this one.
There is P0 that crashed at this point.
And here trick is the event P0 crashes.
When in trick is the event P0 crashes,
what I do, I go inside here and I start removing
all the requests of P0, right?
But it's possible that I haven't received yet
the request from P0.
So the request of P0 is still travelling on the network.
I go in the request set and I say
I have to remove everything from P0.
And there is nothing.
So I do not remove.
The second after I have done the removal,
the requests from P0 arrive.
What I do, I execute this handler.
I execute this handler and I put the request of P0
in the request set where I put it.
Here.
I put the request of P0 in the request set.
Now if P0 is the minimum,
that moment I lock it myself forever.
Because the request of P0 I put inside here
and that's it. It's done.
Now I cannot enter anymore in the critical set.
OK? Can you see the problem?
The problem is that this action of detecting the crash
is not connected with the old messages
that are in the network.
So you can detect the crash first
and then you start receiving the messages
from the guy.
And we have to fix also this point.
We have to fix here when we receive the message.
How we can fix this problem?
How we can fix the problem that
when I receive this message from P0
I put it in the request set.
Checking if the sender is alive.
If the sender of a message is not alive,
what I can do is discard the message.
Right? I can do it.
And intuitively in any algorithm
when I see that the sender is not alive
I can discard the message because
it's as if the guy crashed before sending the message.
It's equivalent to that situation.
So every time I receive a message
I take the sender.
I check if the sender is in the crash set.
If the sender is in the crash set
I do not process the message.
If I do not process the message
this message is as if it's lost.
It's deleted from the network
and I cannot lock myself at this point.
Clear?
Is it clear?
Let's look at the algorithm.
When I receive the request
and the sender of the request
is not in crash set
I do things.
If the sender is in crash set
I do not process the request.
So the request is discarded.
Okay?
Is this patch correct for everyone?
Are there questions on this?
Questions on this?
Questions on this?
I assume that everything is clear.
So as you can see
with the Perfect Failure Detector
we were able to make an algorithm
that is fairly complex.
Resilient to crash failure
with minimal modification.
Okay?
Clear?
And we are not expert.
I mean, you are not expert at this point
but you were able to figure out
where to change things.
So Perfect Failure Detector
are really powerful
because, you know, you can use this box
to make
any algorithm
almost any algorithm
for tolerance
tolerance to failure.
Because the idea is always more or less
the same recipe.
When I understand that someone is crashed
I remove it from the computation
and whatever, whatever.
I mean, there are
the algorithms we will see
they are complex
but more or less
the recipe that we will use is this.
So let's do this exercise together.
Now we have seen how to make
the Lamport-Moudoir Exclusion for tolerance
but the Lamport-Moudoir Exclusion
is still a really complex algorithm.
Okay?
So the exercise is
can we build an easier algorithm
for Moudoir Exclusion
using Leader Election
and Perfect Failure Detector?
So I give you the box Leader Election
I give you the box Perfect Failure Detector
and I ask you to create
a Moudoir Exclusion algorithm
that is tolerant to crash failure
and that is simple.
Simple means that you can explain it
and everyone believes that it's correct.
Clear?
This is the exercise.
So we want to build the Moudoir Exclusion
with Perfect Link
Perfect Failure Detector
Leader Election.
How do we do it?
How we can build Moudoir Exclusion
using Leader Election
and the Perfect Failure Detector.
Your colleague is saying
the idea that I have
is I use the Leader Election
to elect a leader
and the leader is the same
for everyone.
Blah blah blah.
Then when I want to enter
in the critical section
I send a request to the leader
and I can enter in the critical section
only when the leader tells me
you can enter.
So what is the idea?
We have our leader
that is like a centralized server
and everyone that wants to enter
in the critical section
so this is the leader that is P0
then there is P1 and P2
there is P1 that wants to enter
he sends the request only
to the leader
P2 wants to enter
he sends the request only
to the leader
and the leader what he does
he satisfies the request
in any order he wishes
let's say that we satisfy
it in 5 orders
the first that comes
is the first that enters
so I send to this guy
you can enter in the critical section
this guy enters in the critical section
then what we have to do
once P1 has done
with the critical section
what P1 has to do
so here I finish the critical section
and I just stay quiet.
I have to send to the leader
I'm releasing the critical section
so that the leader says
oh now there is no one in the critical section
and there was someone that was waiting
for the critical section P2
and then what the leader has to do
has to send to P2 the instruction
you can enter in the critical section
P2 enters in the critical section
then wants to release the critical section
he sends the release to the leader
if there is P10 here
that also asked to request
to enter the critical section
the leader remembers
he gives a list of the people
that are asking to enter
and says who is the next one in the list
P10
now he releases
go in the critical section
ok
is it clear?
ok
and this algorithm
if there are no failures
if the number of failures is 0
is immediate that it works
why is it immediate that it works?
it's not possible that you enter
at the same time
because otherwise the leader is traced
sending two people to connect
it's not possible that you wait forever
why?
because the leader puts you in the list in some order
once everyone before you has released the list
you will enter
it's not possible that someone enters before you
why?
because if the leader satisfies in FIFO
and you ask before someone else
you will enter before the test
on the critical section
ok
we have failure
what happens if the number of failures
is greater than 1
is greater or equal than 1?
now it's not obvious anymore
we have to start thinking
what happens with the failure
ok
so usually
when you have to make an algorithm for tolerance
you first try to do the easy case
and then the hard case
what is the easy failure
to tolerate in this algorithm?
remember we have the perfect figure today
the easy case is
if one of these other process
the client crashes
let's say that this guy crashes
at this point
what do we do in our algorithm
to tolerate the crash of P1?
but who does it?
the leader
so the leader waits
eventually the leader will see
crash P1
once I see crash P1 I check
is P1 in the critical section?
if P1 is in the critical section
the next one can enter
or is P1 waiting for the critical section?
if it's waiting for the critical section
I remove it from the list
so if one of these guys crashes
it's not really a problem
because the leader detected
thanks to the perfect failure detector
he cannot detect it broke
if he crashes he cannot wait forever
the leader will detect it
and so we release the critical section
or remove it from the waiting list
ok, clear?
so what is the not easy case
of a failure instead?
when the leader crashes
not so easy case
is if we are
in a situation and the leader crashes
for example the leader crashes at this point
now there is no leader
if the leader crashes at this point
what we have to do?
what is the first thing we have to do?
we have to elect a new leader
but this is the leader election that will do it
we don't have to do anything
we just have to wait
and then on the process
the event new leader will start
and will be the same for everyone
which one we want to elect?
let's select the minimum ID
you can elect the minimum
you can elect the maximum
you can elect whatever in any order
I like the minimum
so P1 becomes the leader
so P0 crashes
at some point P1 becomes the leader
so P1 here becomes the leader
P1 is the leader
so once P1 becomes the leader
what also we have to do?
let us say that you are in the critical section
so we are at this point
you are in the critical section
and you become the leader
if you are in the critical section
is it possible that there is someone else in the critical section?
no
so the moment you become the leader
are you compelled
to release the critical section?
I mean
is it something that you have to do quickly?
no
because I am the only one in the critical section
the other guys are blocked
and so I can keep the critical section forever
actually
the days in which I become the leader
in the critical section
are easier for some reason
because I know that I am in the critical section
but let us say that I am elected as a leader
the moment I am elected as a leader
a request from someone comes to me
P10 sends me a message
and says I want to enter in the critical section
so I am elected in the critical section now
the moment after
P10 asks me can I enter in the critical section
let us say that I
send a message to P10
and I say you can enter in the critical section
do you think that this is reasonable or not?
no
P10 is not reasonable
waiting is not really the problem
I mean it is the problem also the waiting
but the actual problem is
I am elected as a leader now
I do not know the state of the system
it is possible that there is another guy in the critical section
P10 sends me a message
because he sees that I am the new leader
and tells me I want to enter in the critical section
I say oh please enter in the critical section
but there is also P5
Q enters in the critical section
there is a problem
so once I am elected as a leader
this means answering to people immediately
because I do not know the state of the system
I do not know who is in the critical section
is this clear?
we are P5
and we get elected as a leader
in this moment
and we were just a process
that was minding its business
so we didn't send requests
we didn't see anything
we were just a process
and we even get election
and the old leader was P4
the old leader was P4
so at this point
I cannot answer to requests
because we have seen that if I answer to requests
at this point I can create a problem
so what I have to do
immediately when I become a leader
put myself in a situation
such that at some instant
I can start answering requests
I have to check the status of the system
I have to check
who is in the critical section
and I have to check
who is waiting
these are the two things that I have to check
so how I check
who is in the critical section
can I ask P4
can I send a message to P4
and say please can you send me your state
who was waiting and who was in the critical section
no because P4
is done
unfortunately for him
he will not be able to answer
so I cannot ask P4
so what I have to do
what is the only way I can do
to recover the state of the system
I have to ask P4
I have to send a protocol to everyone
and I have to ask to everyone
I go in the critical section
and I can also ask
are you waiting for the critical section
I have to send a message to everyone
saying MP5 I am the new leader
send me if you are in the critical section
or if you are waiting for the critical section
clear?
it's clear
so I have to ask to everyone
how long I have to wait
before I know
the entire status of the system
because the request will keep
will start coming
so P6 will answer
P8 will answer
P10 will answer
when is that I stop and I say I know the status of the system
I can send a request
N-1 process is answered
no
when?
no because you just have the perfect failure detector
and the leader election
you do not know the delay of the system
how do I know that I have seen everyone
here they start answering
yes
I will start sending the request
when I receive a reply
from everyone that is in P
minus crash
when I see a reply
from everyone that is in P minus crash
I have seen the reply
of everyone that was alive
so if there was someone
that was in the critical section
and was alive
I have to see it
so if at this point I see that no one is in the critical section
everyone can enter
so in the critical section
in my memory I have to say
process P7 is in the critical section
and process P10 is waiting
P8 is waiting
P9 is waiting and so on and so forth
is it clear?
yes
the moment we elect a new leader
don't we lose the FIPO order?
yes you can lose the FIPO order
but no one will beat you up for that
so no one will tell you anything
because the important thing is
that you keep a certain cadence
in the system
so you can lose the FIPO order
are there other observations?
is the algorithm clear for everyone?
yes
it depends how we do the algorithm
if we do the algorithm
that this guy asks to the other process
are you waiting?
and the process answers yes I'm waiting
then they do not have to send the request
but otherwise I can do another algorithm
which when I see the new leader
if I'm in the critical section
I send again the request to the new leader
I can do in both ways
it depends
so the first one is that
when this leader asks to everyone
it also asks are you waiting
and you say yes I'm waiting
this is your option one
the second option is that at this point
the leader just asks
are you in the critical section or not
and when you detect a new leader
if you are waiting you send to the new leader the request
you say
P5 is the new leader
I send the request to P4
in the critical section
I send the request again to P5
I say I want to attend the critical section
other questions, other observations?
yes
I wanted to ask
why the new leader has to
ask
for the status of the system
because when
the leader election event is triggered
all processes can
just send a message
I can have the algorithm
send messages to the new leader
so your colleague
is proposing a modification
of the algorithm
where I say when I detect a new leader
I send the status to the new leader
that is either I'm waiting for the critical section
or I'm inside the critical section
yes you can do
in that case
we don't have this arrow
but we still have this one
but this new leader still has to wait
from a message from everyone
that is in this section
so you can do it in that way
we still have to wait
so I do the ask and reply
because it's easier to understand
but you can do it in that way
what happens if some messages
get lost?
in this system
a message gets lost only if the sender refreshes
so we do not
assume that in the system
a message can be lost if the sender is correct
because there is a perfect point to point
perfect point to point means
if I'm correct and the receiver is correct
if I send a message eventually
the message will arrive
and if you remember the perfect point to point
is something that we create
on top of something that can lose messages
so if you have something that
can lose messages on top of it
you construct the perfect point to point
where you send the message continuously
and then you have this algorithm
so you can actually create this algorithm
only also if there are messages
that can be lost
because you can create the perfect point
so what is the complexity of this algorithm
to enter the critical section in the test case?
how many messages we need
to enter the critical section in the best case?
how many messages the critical section
for the best case?
yes, the best case is a constant number
of messages because you send
the leaders process send you the reply
and you enter in the critical section
then you release
so in the best case you enter in the critical section
with a constant number of messages
ok
clear
notice that once a crash happens
how many messages we generate?
when a crash happens
in the worst case
in the best case zero
because there is this process that crashes
and no one cares
but in the worst case how many messages
we generate for a crash?
a pie-manus crash, yes
and the number of processes in the system
ok
and if you think about it
you cannot do less than this
because you have to know the entire
state of the system
and so you have to ask everything
about the entire state
as an exercise
here there is the
things
the algorithm I wrote in plain English
and as an exercise
write the code
so you go home and you write
the pseudocode of this algorithm
sooner or later you should
start writing code
I hope for you, for your career
and so it's better if you start
actually you already started
it's better if you start
ok
so in the last hour
we will do
just exercises
an easy exercise
this one
the vector clock for the events
in the figure
what is the vector clock of this event?
one, zero, zero
one, zero, zero, zero
why there are four components?
because there are four processes
what is the vector clock
of this guy right here?
one, two, zero, two
the vector clock of this guy
one, two, zero, two
one, two
zero, two
why we have two here?
why this component is two?
because this one
what is the vector clock
of this one?
zero, one, zero, two
and what is the last one?
zero
so here you do
maximum between this one and this one
maximum between this one and this one
and this one
and this one
and this is your component
what is the vector clock
of this event?
what is the vector clock
of this event?
one
two, four, five, six
two, four, five, six
someone is saying
two, four, five, six
The first one is one.
So I didn't so suggesting it, but the guy is wrong.
Okay, so in Italian, for the ones that don't speak Italian, the guy said,
but I'm just off by one.
And I said, in a lot of situations, off by one kill people.
Okay, so off by one is not enough for us.
One, four, six.
So we use the vector talk of this guy.
One, four, six.
Three.
One.
Four.
Four, someone said four then.
Four, six.
Okay, is this correct or not?
Yes.
Yes.
Yes, I think it is correct, one.
Yeah.
Because at this point, you know about only one event from P1.
Because from P1, you know only about this event.
From this event of P1, you do not know.
So the counter at this point of P1 has to be one, not P2.
Because this event, you do not see it.
So the counter from this guy to P1 has to be one.
On the second process, four means that I know four events on the second process.
And I received this message, so I know about this event, this event,
this event, and this event.
So I know four of them.
On the third process, I know about four events.
This event I do not know.
But this event I know.
And so it means that I know also about the other one.
Okay, because of the after and before.
So I know about this one, this one, this one, and this one.
And there are four of them.
And then I myself, and I know all the events about myself.
And so three plus three is six.
That would be the correct vector clock of this event.
Lambert's clock of this event.
The clock is not a vector, it's just a number.
What was the algorithm of vector clock?
Everyone starts with zero when you create an event to increase by one.
When you send a message, you send your clock.
When someone receives a message, the maximum between each clock,
the clock of the message, plus one.
So this is the Lambert's clock of this event.
This is the Lambert's clock of this event.
You have on process three, which is where you get...
Yes.
The second one would be three.
This is one.
This would be three, you are right.
Four.
Five when you send it.
Four, five.
Yes, it's six.
I know it's right.
Why?
Because here you do the maximum between your local one and this of the message.
And this one should be this right here.
If this is three, then here is four.
Five.
And then this guy here is six.
Okay.
Let's try to do this other exercise.
So here we have an execution that is complex enough,
but I'm not asking for the vector clock.
I'm giving you the definition of cut.
This is an exercise that you can have at the exam.
It's possible that I give you a certain definition or whatever,
and you have to reason and answer.
So a cut is a set of events that for each process define a prefix of the execution of that process.
So a cut is something like this.
It's a portion of the event in which on a single process we take a prefix.
So I cannot take this one.
This is not a cut because on this process I'm not taking a prefix.
I'm taking everything one.
I'm discarding the second and taking the third.
And this is not a prefix.
So a cut is everything that's on the processes leaving a prefix.
Okay.
A cut is consistent if for each event in the cut,
and for each event f that happened before the event in the cut,
the torso f belongs to the cut.
So a cut is consistent
if it contains the closure of the event before.
It means for any event that is in the cut,
if there is an event that happens before that one,
also this event has to be in the cut.
This is the definition of consistent.
And the exercise asks you to draw an example of consistent and non-consistent cuts on the execution of both.
So you have to draw two lines on this execution.
One that is consistent in green,
and one that is not consistent in red.
Non-consistent in red.
Non-consistent means that does not respect this definition.
Okay? Clear?
So reason a bit about it.
The first one that believes that as a solution can propose a cut that is consistent,
and one that is not consistent.
Is it clear the definition of consistent?
In a cut you have to include all processes,
and the important thing is that include a prefix for each process.
Okay?
So the important thing is that in the cut you do not do something like this,
where you skip some event or something.
You skip a prefix.
But you can just draw a direct line?
Yes.
The prefix size can be different between processes?
Yes, it can be different from different processes.
If right after D6 I draw a straight line down?
Yes.
So your colleague say after D6?
Yes, a straight line.
A straight line.
Okay.
And which color is this cut, consistent or not?
Consistent.
So your colleague is saying if I do a straight line here,
this is a consistent cut.
Let us verify.
If we have an event in the cut
then every event that happens before that one is also in the cut.
And this is consistent because if I add B6
and I take everything that happened before B6,
so the cut is everything that is before this line.
And this is consistent because if I take B6,
every event that happened before B6 is also in the cut.
If I take B5,
everything that happened before B5 is also end the cut.
So this is a consistent count. Yes, this is consistent. Right here, let me do it this way. Is it consistent or not? Is it consistent or not?
We need to have to push A6. Where is A6?
A6, no. There is no FN before...
But A6 does not send messages. So A6 has a relationship with A7, but does not have a relationship...
Yeah, it's consistent.
This is consistent. It's consistent, because this event happens before B6.
But it's okay, because the events that happened before D5, I have everything.
I have everything that happens before D5, I have everything that happened before C6,
I have everything that happens before A5, I have everything that happens before D5, and whatever. It's consistent.
Even if this mess is consistent.
not in the cut, it's okay, because this message happens after B5. And so it does not have
to stay in the cut. So this cut is consistent. So can you show an example of a cut that is
not consistent? Can someone show me a cut that is not consistent?
You show this.
Yes. So your colleague is suggesting this one, right? This one?
Yes.
This is not consistent. Why is it not consistent? There is B6, but there is something that happens
before B6 that is not in the cut. So this is a not consistent cut, because B5 happens
before B6, but it's not in the cut. Okay, it's clear. So how do you solve these kind
of exercises? You reason about the definition and you try to see if it works or not. Okay?
One is that they are used in the cut, this cut is used in real life to check the point
of the distributed system. So when you want to freeze the system and create something
that is kind of a checkpoint component.
Which starts, you want something that is consistent, because if you have something that is not consistent,
then you are losing a state that is generating something else in the system. And you start
from a situation that is impossible. So for this reason, there is this definition of consistent
cut, it's used to create checkpoints. That we will not see if someone is interested in
checkpoint, but you can write on Google, checkpoint distributed system, there is all the algorithms,
this kind of stuff.
Let's do an exercise that is a bit harder. Yes?
I have one question about the cut. If we take, for example, all these, the events
of process one and two. All the events of process one and two.
This is a non-consistent cut, right? So you will say something like this.
Yes. Yes.
Yes, this is not consistent for this event, and for this event, and also for this one
is not consistent. But if you have a system in which these two were only talking about
a bit like that, then you can create a consistent that is done in this way. Okay? So actually,
if at the exam I ask you something like this for a consistent cut, you can say it's consistent.
The cut of zero event is consistent.
Also the cut of everything is consistent. Yes, I agree. Yes, also the cut of everything
is consistent. Okay? So they are three really consistent. Yes?
Okay. Your colleague is right. Here I'm making a single dot for the event of sending
and, or receiving and sending the message. You have to imagine these are two different
events to do the count correctly. Okay, so here you need three events. You need one,
you receive the message, you process the message and you increase, and then you send and you
have to increase again. I do not know because I said what is the one of these one and was
my...
phrasing was not well defined because I can mean it the first event or the second
event. If I was meaning the first one received, then it's correct. If I was meaning the send
of this message, then it's not correct because I need one, three, zero, zero because it was
one, two, zero, zero and the send of this one is one, three, zero, zero because one,
two, zero, zero is received and then I send is one, three, zero, zero. Okay? Thank you
for pointing it out.
Also in this case, it's the same. Also in this case, we have an event, I receive another
one, I send. So when you have this point, you need three events. Okay? So at the exam
I will always put two events. Okay, let's try to do another exercise, one that is a
bit difficult. Do you prefer leader election or failure of the debt? Which one you like
more for the exercise? I have both, so...
Leader election.
Leader election. So how many, what do you prefer?
Leader election.
How many votes for leader election?
How many votes for leader election?
Okay. Let's do leader election. So consider a set of n processes connected with a ring
topology. So we have a system of n processes and these processes are not connected in a
complete topology. They are connected like this. We have one process that is connected
with the other, that is connected with the other and they form a circle, a ring. This
is a ring graph.
What is the difference between this ring and the algorithm that we have seen until
now? Is that in this case, this process P can only send a message to P minus and to
P plus can only send a message to the one that is before in the ring and the one that is
after because you don't have a connection that is direct to this one. So if you want
to send a message to this guy, you have to send a message to P plus and then P plus send
a message to this one. Okay, so we have a ring. The processes, they do not communicate
with each other, everyone. Is it clear? Is it clear? So in this exercise, you have a
ring topology. The processes have unique IDs taken from an unknown set. This set is not
the set to one end. So what does it mean? That we can have a ring in which the ID of
the processes are something like that. This is one. This is ten. This is ten. This is
eighty-seven. This is ninety-four. This is three. And this is five. Okay? You have
IDs that are taken from a set, so they are unique, but they are not between one and an
end. Okay? And usually this is what you have in real life because IP addresses, they are
not consented. So the IP addresses is the one that is given to you by someone else.
You don't have consecutive IP addresses. Okay? Or MAC addresses.
Or whatever. Each process is correct and cannot crash. So here everyone is correct
and will be correct forever. We don't have crashes. Everyone is correct. Processes are
connected by perfect point-to-point links. So it means that process one can communicate
with ten and five with perfect point-to-point. Ninety-four can communicate with eighty-seven
and three with perfect point-to-point and so on. Write an algorithm that elects a leader
without knowing any.
So the problem on this topology is that we do not know how large is this link. So I wake
up in the ring and I'm one. And I only have one link left and one link right. Nothing
else. Okay? I begin, I know myself. I'm one. And I have one link left and one right. And
I have to do an algorithm that elects a leader. I do not know the entire size of the network.
So the network can be whatever. So yes, you have to do, you have to try to sending messages
on this ring.
Okay? But before trying the solution, is it correct, the solution for everyone?
It's not the solution. Is it correct that the exercise is correct?
Is it clear?
Is it clear? Yes, thank you. Is it clear the exercise for everyone? Is it clear?
Notice that you cannot say I'm one and the minimum because it's possible that we start
in a graph that is like that. I'm seven and there is no one. So we do not know the idea
of the other processes.
You know that everyone has a unique idea. You do not know the idea of the other. If
you know the idea of the other, it's more or less easy. Okay? So try to reason 10 minutes.
And the first one that is the solution to this exercise proposed the algorithm. Yes?
Ah, yes. Here is the exercise. So we are doing this. Just the first point. Okay? Write an
algorithm that elects a leader.
In question three, it says consider now that you are in the second.
No, no, no, no.
The first one.
This one is for question three. We have question one.
So in the first one, so we do like omega leader detection or?
No. You just have a perfect point, point B, but there is no crash. Here is a no process
crash. No, you cannot use a leader election algorithm to solve a leader election algorithm
because it's a...
No, but if you do something like that, can you make mistakes with the part two?
No. Okay? You have to solve leader election. So what?
When you elect a leader, that leader has to be the same for everyone. We cannot make
an algorithm where P1 elects 10 and you the 11. Yes? You can write whatever. And you
can propose whatever solution you may realize.
Yes.
.
.
.
.
.
.
.
I don't know.
I don't know.
Eh no, e poi una volta che tu faccio il set completo, la cosa è che tu semplicemente leggi quello che l'individuo ha in mente, o quanti quali quali.
E' semplicemente come diceva il ragazzo, prima la discovery phase, esatto, quindi prima semplicemente devi capire come cazzo è fatto il sistema, e dopo lo inizi, ma si dice come inerzia.
E se no è un'idea di quali.
Non so quanto sia sufficiente, probabilmente in un modificio senza dover fare la discovery phase.
Non c'è però una domanda, perché leggendo la domanda 13, c'è un sistema con un delivery time, quindi noi non ce l'abbiamo.
Quello che interessa a noi è che rimanda il messaggio, poi.
Eh, quindi non ricordo.
Non c'è però una domanda, perché leggendo la domanda 13, c'è un sistema con un delivery time, quindi noi non ce l'abbiamo.
No, non c'è però una domanda.
No, non c'è però una domanda.
No, non c'è però una domanda.
No, non c'è però una domanda.
No, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no, no
This is the mother of the two N's, the N's.
It's because you think it's the mother of the two N's.
The N's, yes.
Yes, that's right.
But...
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't know.
I don't...
You OK?
Right.
You refuse to do,
we're just old genug of that number
OK.
OK.
And then the process number that can change
oh I can notice it changed.
And then you send the message to P+.
Ok, so let's say that we are here. You create a message with your searching site, so just 7.
And you send this message to P+. Then?
Then you see if that process is bigger than this one.
Ok, so P+, here, because P has to check.
Because once I send a message to P+, P will receive the message and do some action.
So P+, check if it's bigger. In this case it is.
10 is greater than 7. And so P+, what he does?
Ok, so he replays the 7 or I add the 7?
I would not replay 7, I would just add...
I'll add myself. So I add 10.
And then I send a message 7, 10 to this guy that will put also himself 7, 10 because 87 is bigger.
So the only one that...
The only one that will not put himself is 3, with your algorithm, and 5.
And then we need that we elect a leader.
When we terminate.
So your colleagues say at this point this message circulates.
The idea is the message circulates.
And if my ID is greater than the one that I'm in the set, I add my ID to the set.
Because they say they have an ID that is less than mine, so I can be the leader.
When is that I start terminating?
When I receive a message with myself inside.
This message has done a loop of the ring.
Why? Because the only way to receive my ID, since I'm the only one that puts the ID in the set,
is that the message has done the entire loop.
So when 7 receives a message that contains 7, 10, 87, and 94,
we'll say, ok, this message has done the entire loop of the ring,
I have seen all the IDs that are greater than mine, if they exist,
and I will take the maximum of this ID, that is 94.
So at this point, I elect 94, I send the message, this checks,
it says, oh, there is 10 inside, yes, I elect 94, 94, 94, 94, 94, 94,
everyone elects 94, so it works.
It's not really efficient.
Because why do we have to send this set?
Why at this point, 10 has to say, oh, 10 is bigger than 7,
so I add myself to the set.
Is it needed?
We can just substitute.
So one idea that is a bit, let's say, more efficient,
is that I send the set with 7, and this guy receives the set,
and says, ok, I will substitute 7 with 10, because I'm greater than 7.
So 7 cannot be deleted.
And then I send and I substitute, you know, 10 with 87, because I'm greater.
And then this send and substitute 87 with 94, but it's greater.
And then this one cannot substitute, cannot substitute, cannot substitute,
and when is that we elect the leader?
Maximum.
When 94 receives back 94,
he knows that the message has done the entire loop of the ring,
and he knows that it's the maximum.
Because if it was not the maximum, that 94, there was one figure that would have changed it.
So if I'm, if when I receive the message with my IP back,
I know that I'm the maximum.
Because if there were someone bigger than me, it would have replaced my IP.
But the other does not.
The other does not.
But how much we spend to tell to the other I'm the leader?
N.
N.
N, just N.
Because 94 at this point knows that it's the leader when he receives the message back,
and I can send a special message, I'm the leader.
94.
I'm the leader 94, I'm the leader 94, I'm the leader 94, I'm the leader 94, I'm the leader 94.
Yes.
Yes.
So actually the complexity is 2N.
The complexity is cost of phase 1 plus cost of phase 2.
This is the complex.
Yeah.
Now we know that phase 2 costs N.
But phase 1 we do not know.
We, we have, best-case scenario is the first one.
So that I do a figure that is bigger.
Sorry, this is minus 2.
Because we can go so negative now.
So what is the algorithm?
Let us restate the algorithm clearly.
When I wake up, I send a message with my IP.
And this I have to do, because I do not know if I'm the bigger or the smaller in the ring.
So when I wake up, for sure I have to take my IP and send it.
So this will send 7.
This will send 10.
This will send 75.
This will send 3.
This will send minus 2.
And this will send 0.
And this is an action that you have to do at the beginning, because you do not know if you are the maximum.
Because if 75 does not do this action, then no one will send a message at the beginning, right?
At the beginning, we have to send a message.
Yes.
So everyone at the beginning has to send a message.
Because if I wait to receive a message, everyone will wait, and no one sends, and the algorithm doesn't start.
So when we start, everyone will send XID to the other.
This guy will do the replacement.
So we say, instead of 7, I put 10, and I send 10.
This guy will do the replacement.
This guy will do the replacement.
But do we need the replacement?
So when I'm 10, and I see 7, I have to replace 7 with 10 and say, oh, I can do something better.
I don't do anything.
I keep this message.
I give 7.
So I say, I was bigger.
And I send the message.
7 is smaller.
So at this point, I give the message.
The message cannot go back to 7.
But it is fine, because 7, we know that it is already lost.
Right?
And 75, what do we do with the message of 10?
We kill it.
OK?
And 3, what do we do with the message of 75?
Forward it.
Forward it.
And minus 2, with 3, we forward it.
Because minus 2, 3 is bigger.
So I cannot kill it.
Because it's possible that we are all negative.
And it's the only guy with 3.
So this will forward.
0 and minus 2, what do we do?
We kill it.
0 and minus 2.
So 0, we kill minus 2.
And 7, we receive 0, and we kill 7.
So after one round, the system is asynchronous.
But after one logical round, we have this message that is alive.
This message that is alive.
And all the other are killed.
Right?
In this case.
And then this message will keep going.
OK?
So what is the best case for this algorithm?
What is the best case for this algorithm?
What is the case in which the first phase takes as many, as less messages as possible?
The first, like, sorted in descending way.
That we have 80.
Then we have something, then we have the second maximum.
We have, for example, 70.
Then we have 60, whatever.
Is that there or there is the reverse of the idea?
So that every message at the beginning is one step.
But every message will be killed.
But this one.
This one is the only one that remains.
Because at the first stop, everyone receives a message that is...
That's good.
No.
It's the reverse.
That we have.
Then here we have 10, something greater.
Then we have something greater, something greater.
And here we have the maximum.
OK.
And here we have the maximum.
In this case, every message will do one step and get killed.
But the maximum.
The maximum is the only one that remains.
And how many steps does the maximum?
10.
10.
So how many messages we send in this case?
2n.
2n.
We send one at the beginning, the one that get killed.
And then the maximum does the n minus 1 step.
2n minus 1.
Yes.
It's n plus, it's n plus n minus 1.
Something like that.
But it's 2n.
It's 2n.
What is the worst case, though?
If they are in reverse order.
Everyone has to send it over to the?
Yes, so everyone...
Everyone forwards it.
The worst case is the one that I was doing before.
We have the maximum.
And then here we have the maximum minus 1.
And here we have maximum.
Sorry, maximum minus 1 means the second maximum.
And here we have the quê.
the third month in one whatever so we have something like uh...
i don't know if it's not going to happen i don't need them
but uh... that's what was in the company
i have five
school
one
in this case we don't want that
and he's made such people
he's made the group he's made the group he's made
he's made the group and he's the only one that
the other uh...
here so we have the message of five that he's here
five we have the message of the world is going to have the message from the
organization of the message of the world is that
and then he's going to have one
so often one step
how many messages
and as well
at the next
problem with the company's message they
seem to make everyone out of the sheet
and i don't know
they should so do you want
he's one of the ones that don't you know he's one of the single message of the
easy to get the message before he's going to get the message for five
and he's uh... no message
and i think so i don't know what we can't keep it
and i don't know what you want to keep
you can't think of it for some of the way the message from five
always that he does
for all of us
and was one of the major problem is that
and i don't know if it's wrong to you
and i was thinking about that
so we have one man such that doesn't mind what i'm saying that means and
make the decision
i don't think that it doesn't want one thing
and we're going to miss you
and then they wanted
does one
how many minutes we need
and i think that's one of them
i think that's one of the but yes we haven't met
he's the son of god
he was there one minute ago
and i don't know what happened to the people
and i think that's the best to stay back to make that is what makes it for the
first and one minute
what does that state that the message
who makes a difference when you look at some of the uh... i don't know if it is
that's great
so he's probably
it was easy for daddy
so it was a little bit of a sense that i think that he's going to say what he's
been
okay
here
okay the best you can do it
he said
he
he's
and look at
so you're going to have a such a lot of great at the school
and to meet
but he's not something that you can spend uh...
uh... what we think about it
even more
but he had been straight to the point
if the city center said we would be in the solution of the next day
so if you want
