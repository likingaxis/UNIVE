# Distributed Systems — Lesson 5

## Logical Time, Lamport Timestamps, Vector Clocks & Causality

### Summary of Topics Covered
1. **The Limitation of Physical Time**: Physical clock skews and network jitter prevent physical timestamps from determining exact causal dependencies.
2. **Lamport's Happened-Before Relation ($\to$)**: Defines causal order using three rules: local execution sequence, message send-receive pairing, and transitivity.
3. **Concurrency ($a \parallel b$)**: Two events are concurrent if neither causally precedes the other (i.e., $\neg(a \to b) \land \neg(b \to a)$).
4. **Lamport Logical Clocks ($L(e)$)**: Scalar integer counters satisfying the Clock Condition: $e \to e' \implies L(e) < L(e')$.
5. **Limitation of Scalar Clocks**: $L(e) < L(e') \not\implies e \to e'$; scalar timestamps cannot distinguish between true causality and concurrency.
6. **Total Ordering of Events**: Tie-breaking Lamport timestamps using process identifiers $(L(e), i) < (L(e'), j)$ to achieve total order.
7. **Vector Clocks ($V(e)$)**: Integer vectors of size $N$ that fully capture causality in both directions: $V(e) < V(e') \iff e \to e'$.
8. **Vector Clock Update Rules**: Increment local entry $V_i[i]$ on local events; attach $V_i$ on send; compute component-wise maximum $\max(V_{local}[k], V_{msg}[k])$ and increment $V_j[j]$ on receive.
9. **Vector Comparison & Concurrency**: $V \le V' \iff \forall k, V[k] \le V'[k]$; events are concurrent ($e \parallel e'$) if and only if their vectors are incomparable.
10. **Classroom Exercises & Invariants**: Step-by-step trace analysis and the invariant of silent processes (entries remaining zero).

---

## Part 1: Logical Time, Causality & Lamport Clocks

### 1.1 From Physical Clock Synchronization to Logical Time

In the last lecture, what we saw was the clock synchronization. And there are two algorithms that we saw. The first one that is an external synchronization algorithm where your purpose is to synchronize with an external source that in our case is a universal coordinated time, actually UTC, universal time coordinated. Or there are the internal synchronization algorithm and we have seen that late where the idea is to keep a network synchronized.

And so in this case we have a central server that is the leader or the master. And this central server what he does is communicating to everyone else to understand what is the distance between some everything everyone else and the master. And then applies a correction to everyone. So this algorithm moves to a sender from a certain perspective.

This one let everyone synchronize by himself to an external source. And we saw that any algorithm, any clock synchronization algorithm must have an accuracy. That means that the synchronization is not perfect. Your synchronization with respect to the actual clock will be off will be off of some quantity that depends on the network delay.

And this is especially a problem if we use timestamp for the events because if we have a system with many processes, we could have some situation where we put a timestamp on our event. but actually this timestamp is has an accuracy error so the real time can be anything in this in this goal. And then if we send this message to someone else and the synchronization between us is not really precise is it possible that we attach to this event a timestamp T to this event we attach a local timestamp T prime and we have that T prime is less than T even if this event is connected to this one. So in this case putting the timestamp to be in the order breaks a notion of causality.

Breaks the notion that this receive of this message has to happen after the sender of the message. But if the clock of this one and this one are inaccurate of few milliseconds, is it possible that the timestamp of this guy is actually less than the timestamp of this one. And so using the timestamp to try to order the event can break things. And the example that we saw one example it was this conversation.

In this conversation there was a problem because the local view of Bob is not enough to infer the context of the information. There are two messages that is missing. And what we want is to build some primitive in such a way that when the Bob will receive the message of Mike is able to understand that there were a message of Alice before that generated the message of Mike and has to wait has to wait because has to first see the message of Alice and then can make sense of the conversation. How to do it?

Well in this lecture our purpose will be to find a way to timestamp the event that follow the notion of causality. So we want that if an event has generated another event, the timestamp of the first event has to be less than the timestamp of the event that was generated because of you. Uh

### 1.2 The Happened-Before Relation ($\to$)

interesting enough this kind of timestamp that we will see we will see two kinds, the Lamport clock that are also called logical clock or they are called scalar clock. They are the same.

So these are all the same. They are three of the same object. And the second object that we will see are the vector clock that are a bit more refined. The vector clock that are a bit more refined.

And these tools that we will build they work even in a system that is asynchronous. You don't need synchronization, you don't need a clock to create this kind of timestamp that allow you to order the events in a distributed system. So the main idea is that we have to formalize this notion of causality. We have to formalize this notion that something happens because something else.

And this was formalised by our guy Leslie Lamport. So what he did was to make two observations. The first observation is observation A and says that two events are causally related in the sense that even if zero happens-before ($\to$) event T prime if these two events happen on the same process and the same process is the one that sees first if zero and then if one. And so there is an happened-before relation ($\to$) in the sense that this event happens-before ($\to$) this other event.

And this is obvious. I mean think about your life. If you first wake up in the morning and then you brush your teeth, waking up happens-before ($\to$) brushing your teeth, right? And you know because you are yourself that you are experiencing first event if zero and then event if one.

And this is the first observation. But this is this observation is just logout. It's just there must exist a single process that first see if zero and then if one. There is a second observation that Lamport made and said two events are connected by an happened-before relation ($\to$) in the sense that event if one happens-before ($\to$) event $e_2$.

If these two events are the sender of a message this is the sender of message M and this is the delivery of message M. These two events are connected by an happened-before relation ($\to$) in the sense that the sender of the event has causally generated the delivery of the event. And this is also obvious. If you receive a letter from the revenue agency, then that means that there is some guy in the revenue agency that has sent you the letter, okay?

And so receiving a message happens after the send of a message. And this is obvious because you cannot receive a message before the guy send it. I mean it can happen in a movie but not in real life, okay? And then the other observation that Lamport made is that actually you can use this two and then the transitive closure and we will discuss in a bit what the transitive closure to find a partial order of the event.

In these classes when I write if zero arrow if one and those are event or messages, this means that event if zero happens-before ($\to$) event if one. Okay? So if I write these things it means that we are either in this situation or in this situation like here for these messages. Is it clear until now?

But there is also a third way to order the event. And the third way to order the event is the transitive closure. So let us suppose that we are in this situation. We are event if zero that happen on the process.

Then there is event if one that happens on the same process. So we know that if zero happens-before ($\to$) if one. Why? Because there is someone that has seen it and so this someone says I generated if zero and then I generated if one.

I know that if zero is before if one. If one is the event sender of a message. So this message is received by process if one at this moment. And so we know for the rule of sender receipt that there is a message that was generated at this point and is received at this point the same message.

And so the receipt of the message happens after the send of the message or the send of the message happens-before ($\to$) the delivery of the message. And then on this process we can have a fourth event that is something local. Now we can apply the transitive closure in the sense that if I know that if zero happens-before ($\to$) $e'$ and if I know that if one sorry is not $e'$ is if one if one happens-before ($\to$) $e_2$ then it's obvious that I can say that if zero happens-before ($\to$) $e_2$. So I can find the transitive closure between the events.

The transitive closure means there are three events that are in happened-before relation ($\to$) in the sense that if one happens-before ($\to$) $e_2$ if zero happens-before ($\to$) if one. And so also if zero happens-before ($\to$) $e_2$. And this is the transitivity relationship that is here. Okay?

Is it clear until now? If we have an event E that happens-before ($\to$) if second and if second happens-before ($\to$) $e'$, then E happens-before ($\to$) $e'$. Is it clear? Is it clear?

And the causal order the happened-before relation ($\to$) is the relationship between all the events in the system that I can find by applying either the local rule either the sender receipt rule or the transitive relationship until the closure. Until the closure means that you apply until you cannot apply them more. Okay? Is it clear?

So if we look at this figure between event if zero and event if three, what is the relationship? Is there a relationship or not? Can I apply the rules to understand if there is a relationship between if zero and if three? If three is happened on this guy.

Is there a relationship? Yes, there is an happened-before relation ($\to$). If zero happens-before ($\to$) if one. Why?

If two happens-before ($\to$) if three. Okay? Does everyone agree that there is a single source that see first $e_2$ and then if three. So $e_2$ $e_2$ happens-before ($\to$) if three.

Then I have if one that happens-before ($\to$) $e_2$ because there is the sender receipt relationship. Okay? I can apply the transitive closure so I cancel this, I cancel this and I easily if one happens-before ($\to$) if three. Right?

Then I have if zero that happens-before ($\to$) if one. But then I can apply the transitive relationship. I cancel if one here and one here and I say that if zero happens-before ($\to$) if three. Okay?

If you think about it, it's obvious. I mean if you think about real life, this is obvious. If I have the event I wake up then at T eleven I send a letter, then you receive the letter and after you receive the letter you call someone else. Then calling someone else happens after I wake up in the morning because there is this chain of events.

Clear? There is this chain. The causal relationship, the happened-before relation ($\to$) is not a total relationship of the event. It's not a total order.

What do I mean by saying that it's not a total order? It means that there are some event in my system that I cannot order using these rules. So this rule will create an order between the events but not everyone of them. If the order will be partial, so there will be some event that I can say this happened-before this one.

But other event that I cannot order with these or these rules.

### 1.3 Concurrency & Partial Ordering

And the event that I cannot order by this rule, the event that are not in an happened-before relation ($\to$) are the concurrent event. Okay? So let us see an example of concurrent event.

We have our execution. The red arrow are the happened-before relation ($\to$). And then there is if three that happens on this process. And if four that happen on this other process.

The green arrow does not mean message, it just means these two are concurrent. Okay? In this case why these two events are concurrent? Because I cannot find an happened-before relation ($\to$) because between this one and this one there is no sending of a message.

So an happened-before relation ($\to$) means that I can find in the execution a part that the information can travel in such a way that I can say this event knows about this one because this is what the happened-before relation ($\to$) is telling. The sender receive $e_2$ knows about if one because it's the message that is creating the relationship. When you receive the message you know that the guy sent it. The moment you receive the message you also know about if zero possibly.

It depends on the algorithm but for the happened-before we are taking the worst case. In the worst case or the best case when you receive this message you know about event if zero. Okay? So the happened-before means between if zero happens-before ($\to$) $e_2$ means that $e_2$ knows about if zero.

That there is a part in the system for which $e_2$ can know about if zero. And what is the pattern? This guy generated if zero, so we know about if zero. Then he generated if one, so he knows about if zero.

He can put the information of if zero in if one. Then he send you a message and this message can contains information about if zero. Is it clear? The event if four and the if three they are concurrent because if four does not nothing about if three.

And if three does not know does not know anything about if four. So for this reason they are concurrent event. Because if you try to find a part for the information to be from if four to go to if three, you have to do something like this. Okay?

You have to go back while being time that is not possible. So when if one is generated you do not know anything about the future. You do not know about if four. Okay?

So for this reason if four and if three they are concurrent events. You cannot order them. Clear? Is it clear?

Okay. So is it if it is clear, let us say that here we have another event $e'$. Okay? So what is the relationship between $e'$ and if four?

If this is clear. So what is the relationship between this event $e'$ and this event if four? There is an happened-before or they are concurrent. Okay?

So how many of you think that are they are concurrent? For how many of you there are concurrent? Okay. For how many of you there is a relationship?

Okay, for some of you there is a relationship. Let's reason about the rule. In order to show that this event happens-before ($\to$) this one, I have to connect them with the happened-before. But here there is local that connect with $e_2$.

You agree? There is local that connect with if three. But there is no message that I can use to go here. There is no message.

There is no message that goes from this process to this process before if four. You see? So if four cannot know about if one. Imagine that this is in real life.

You are writing a letter to your friend to your fiance or whatever. You write the letter at this point and your fiance before receiving the letter does something. Do you know that she's doing something? No, because the letter is going from you to your fiance and not to the way back.

You do not know what she's doing when she receive the letter. Right? Okay? And if you think about it's it's it's it's clear.

Okay? Is it clear to everyone? So this event if four and this event $e'$ they are concurrent. Let's say that I modify the execution and I put a message here.

Okay? What is the relationship between if one and if four if I put a message there? They are concurrent or not? No, they are not concurrent anymore.

If four knows about if one because there is this part for the information to travel. You receive a letter back from your girlfriend or boyfriend or whatever. So you know about if one at this point because you received a message. So it's possible that message contains information about if one.

Is it clear? Yes. Can you repeat this why $e'$ is concurrent with if four? Okay, without this message.

So let's look at the execution without the message. I rewrite the execution without this red thing because probably they are they are they are confusing. So I rewrite the execution here. So we have an event at this point that can be anything.

We have the event I create a message and I send a message to this guy. Then here I do something else and here there is an event of the guy. So let's call it if zero if one if three and this will go $e_2$ and if four. This is $e_2$.

Okay? So at this point $e_2$ and if three they are concurrent. Why they are concurrent? Because there is no way of ordering them with the rules because I can do local rule and I say if zero is before if one.

Local rule if one is before if three. This is true. Local rule if one is before if four. But I cannot use local rule $e_2$ is before if four.

But I cannot use a rule to connect this event to this event. So they are not connected. Since they are not connected, they are concurrent. The other way to see it when this process generate the event if three does not know about the existence of $e_2$ because there is no message that is bringing information from this side to this side.

Clear? Notice that the receive of a message is a special event when you send it you know that the receipt will be after even if it's happening on something else because it's the physical act of sending something. And so for this reason this one happens-before ($\to$) this one. Okay?

If I modify the execution in this way I put a message here. Now this message happens-before ($\to$) this one because when you generate if three you know about $e_2$. Okay? So it's possible that you generate if three with information that concern that are regarding $e_2$.

Okay? For how many of you is clear this happened-before relation ($\to$)? Okay? We will see some other example.

So this is an example of a more complex execution. And in this case there are several process that are sending messages. So all the event that are connected by the red part they are in an happened-before relation ($\to$). Why they are an happened-before relation ($\to$)?

Because this part is meaning information traveling in the system. And this information at this point knows about the information at this point. Why? Because there is the red part.

Okay? What we want to do with the rule? There is local rule sender receipt local rule local rule sender receipt. Okay?

Clear? So this event and this event they are in an happened-before relation ($\to$). If with the red with the green part I'm also connecting the events that are in happened-before relation ($\to$). The event of sending this message means an happened-before if this event.

Then you receive something and so physically you know that this one happens-before ($\to$) this other event. Then you send something and physically this happens after this one. Then you send a message and the receipt of this one physically happens after this one. And so there is this happened-before relation ($\to$) between this event.

Okay? Is it clear? And so now I have some questions for you. Okay, so this one and this one.

Is there a relationship between these two events or not? No. This between this event here and this event here. Okay.

So what is the relationship between if three $e_2$? This is if three $e_2$. Why? Because it's the event three of process two.

And this is if five if one because it's the event five on process one. So is there a relationship between them or not? Yeah, no. No, they are concurrent.

When you generate this event you do not know about this guy. So they are concurrent. If the execution was like this instead what is the relationship? There is an happened-before because when you generate this message you know about this event.

So you can carry the information and this event knows about this one. Okay? Is it clear? So intuitively the events that are concurrent you cannot order them.

In an asynchronous system you cannot order them because it's possible that there is an asynchronous execution in which this event is actually happening in physical time before this one. Okay? Because they are happening more or less concurrently on two different processes and so for this reason they are concurrent. Even if you are using clock you cannot order them because if clock are imprecise it's possible that there is the switch.

So the timestamp are lying to you. The happened-before relation ($\to$) there is no lie because it's something that you can check on the execution that you can build with the messages. And we will see in a bit how to do it. Okay, let me do another pair of events just to see if everything is clear.

Between this event and this event. There is an happened-before for two reasons. Local or I can go like this if I'm fancy if I want to do a part. Okay?

Clear? Okay. Let me take up another pair. Let's say this guy and this guy.

What is the relationship Uh okay, there is the red one. Okay, this guy and this guy. What is the relationship between the blue event and the yellow event? They are concurrent.

They are concurrent because when you generate the blue you do not know about the yellow and when the yellow was generated you do not know about the blue. Okay? Clear? Is it is the happened-before clear?

So as you can see it's a partial order. It's not a total order. Lamport thanks to Lamport what he said is that he found a way to create a really simple algorithm that we can use to attach timestamp to the event in such a way that this timestamp to the event partially capture this notion of causality, this notion of happened-before. In which in which sense they capture the notion of happened-before partially?

We can build an algorithm and let's it call L such that we use L to give a timestamp to an event. So L of E is the timestamp that we give to the event.

### 1.4 Lamport Logical Clocks (Scalar Clocks) & The One-Way Implication

And the algorithm enforce this property. If an event E happens-before ($\to$) an event $e'$ then the logical clock, the Lamport clock or the scalar clock is the same.

There are three words for the same algorithm. The Lamport clock, logical clock and scalar clock of event E is not strictly less is smaller than $e'$. Okay? So thanks to the algorithm we can put timestamp to the event in such a way that if an event happens-before ($\to$) some other event the timestamp of the first event is strictly less strictly smaller than timestamp of the second event.

Okay? But this is partial in the sense that this other direction of the implication timestamp of event E less than timestamp of event $e'$ does not imply for the Lamport clock that E happens-before ($\to$) $e'$. So the relationship is only if one event happens-before ($\to$) the other, the clock of this one will be less than the clock of this one. But if the clock of one event is less than the clock of the other does not tell us what is the relationship between the events.

So it's just one part of the implication. Okay? Do not worry. I have you covered in the sense that for this part of the implication there is another things that we will see, the vector clock that totally capture causality.

If a vector clock is less than the other, we know that one event happens-before ($\to$) the other. If the vector clock are not less than we know that they are concurrent. Okay? But this is a second primitive that we will build the vector clock.

The first one, the Lamport clock this us just this direction. Okay? Clear? Yes.

So what is the algorithm of the Lamport clock? It's really easy. It's extremely easy. It's so easy that probably if you think about it one day you can reach the algorithm.

And the idea is everyone start with this clock that is zero. So I start with my local copy of the clock that is zero. You start with your local copy of the clock that is zero. And then what you do?

When you create the an event you increase your clock and you attach the clock to the event. Okay? So when we create event if zero we increase the clock and we say the clock of event if zero is one. Our clock if zero here becomes one here.

Okay, clear? When there is the event send of a message what I do? I increase the clock because I'm generating something. So the clock goes from one $e_2$.

And then I send my message and I attach to my message the clock. So I send message and timestamp message clock two. Clear what does the what you do when you send? When you receive what you do?

This is the only part that is nice. When you receive you do the maximum between your clock and the clock of the message. And you take the maximum of the two and you increase the maximum by one. So in this case I'm receiving a clock that is two.

My local clock at this point, what is the local clock of the guy at the part of time? What is the value of the clock here? It's one because we generated this event before. It's one.

So I do one maximum with two. What is the maximum between one and two? Two. And then I do plus one and this becomes my new clock, the clock of the event received that is three.

Okay? Is it clear? Is it clear what is the rule of this algorithm? It's really simple.

And this simple algorithm enforce this property. If an event if happens-before ($\to$) an event $e'$ then the logical clock of the event E is less than the logical clock of the event $e'$. If the event E happens-before ($\to$) $e'$ then there is a part in the execution. Do you agree?

It's the definition of the happened-before. If this event happens-before ($\to$) this other then there is a part in my execution. Clear? For example in this example if zero happens-before ($\to$) if four because there is this part.

Okay? Clear? Is it clear? And our Lamport clock will give some number to if zero.

Okay? Now when I walk one edge of this part, what happen to this number? If it's local, I increase by one. Right?

If it's on the same process, I'm increasing by at least one. Do you agree? Every time I go from one event to the other I increase because when I generate a new event I do plus one. So it means that I'm doing plus one here.

When there is this sender receipt of the message I increase on this Uh this edge of the part by at least one. I can increase by more than one because let's say that this number is eight. The number local is eight and this number of the message is two. I do the maximum between them and I take eight and then I do eight plus one nine.

So I increase at least on one possibly more. It depends the guy that receive it but at least I increase it by one. Right? So if I increase by unit for any edge I walk on this part, is it possible that the clock of this guy is less than the clock of this one?

No, it's not possible. This clock has to be greater. And this is the proof of the Lamport clock. Okay, clear?

Since there is a part that connect this event and for each edge of the part I increase by at least one possibly more but at least one, then this if this event must have a clock that is strictly greater than this other. Is it clear? Is it clear? Okay, the Lamport clock are enough to build a mutual exclusion algorithm in a synchronous system.

And we will see this application. I don't know if in this lecture or the next one. Okay? So already with this algorithm and some messaging we can solve mutual exclusion.

That mutual exclusion is hard. I mean we should know but is hard. Okay? And here on the slide there is the animation of the proof that I did.

The rule one you increase the timestamp locally or the rule two send receipt you increase by at least one. And so in any way you increase. Let us do an example of the vector clock on this execution. So initially everyone start with the clock that is zero.

Then this guy generate the event and what is the clock after I generate the event? One. Okay, then I send this message. This message what will be the clock of this message?

One. Is one. I increase the clock when I generate the message and I attach the clock to the message and I send it. Because the event that I've given is just an event send of a message.

If I put two is as if I'm generating two events that is false. Okay? So I send this clock with one. This guy at this point what he does?

He receive it. Yes. He does the maximum between this one and this one. What is the maximum?

One. And then you do plus one because you are receiving and you are generating an event. So your clock become two at this point. Okay?

This guy here what is the clock of this guy when he generate the message? One. So this message will have a clock of one. So here you receive a message and this message has a clock of one and your clock is one.

Here at this point what is the clock of this guy? It's one. Okay? So one maximum one plus one is two.

So the clock of this event here becomes two. Okay? Is it clear? Is it clear?

If you think about it, those are computations for elementary school maths, something like that. Just two plus one and maximum. I understand that maximum can be scary but maximum and plus one. So at this point Sorry.

Yeah. There are two elements here in the in the first process. Yes. E if zero if one is one.

If one $e_2$ is two. Yes. This event here if one if one No. No, it's not three.

Here what you do when you generate this event is you do the maximum between your clock and the clock of the message. The clock of the message is one. The maximum between these two clocks is one. And then I increase by one because I'm generating the event receipt of a message.

And so the counter goes to two. Okay, so the clock of this message is two. The clock of this event, the event receipt of a message. Okay?

Let's keep doing in the execution so that we see if someone has filled out. The clock at this point on the process two is two. Here I generate a message. For the rule what I have to do?

Two plus one is three and I have to attach three to this message to this arrow. Okay? This guy here receive a message that contains three. What was the local clock of this guy?

One. The one between maximum the maximum between one and three when it is? Three. Plus one we go to four.

So the event receipt of this message has a clock of four. Okay? So my clock will be four for all these one. Then here I create a message.

What the clock has to go? Five because four plus one is five. So this is five. And this guy receive a message.

The clock of the message is five. The local clock of this guy what it is? Is two. Maximum between two and five plus one becomes six.

So this event here has clock of six. Okay? Clear? So in the figure you see these are the clock of the send of a message if the Lamport is on the message.

Or when you receive is the clock when you receive that message. You send six at this point. You receive six and you do maximum between six and three. That is six plus one is seven.

Okay? Clear? At this point we go to nine because this was six, this event is seven, this event is I receive the maximum between eight and seven. The maximum between eight and seven is eight plus one becomes nine.

Okay? Is it clear? Now let's look at any two events that are in an happened-before relation ($\to$). For example this event and this event they are in an happened-before.

In an happened-before because there is an happened As you know this every time we walk in the path we increase by at least one the clock of one of this guy. So it's impossible that the clock of this guy is less is sorry is greater than the clock of this one. You have to be less because you are increasing on the happened-before part. Okay?

Clear? Is it clear? Okay. Notice this event and this event.

Okay? This event has a clock of seven. This event has a clock of eight. What you can observe between them?

Those are concurrent events. But the clock of this guy is less than the clock of this guy. Okay? So this means that if I just look at the clock I cannot tell you this event is less than this event.

Okay? Okay. You can have a clock that is less and the two events are concurrent. In this case this guy is concurrent with this one.

If you think about it if I just use a number this has to happen. Because if I use a number and I have many concurrent events between two concurrent events even either the number is the same or one has to be less than the other. So if I use a number to timestamp event I will be in the situation in which I have two concurrent and the number that is one less of the other. Okay, clear?

So in order to capture the entire relationship we need something more than a number. We will see it now that is the so-called vector clock. Okay, this event and this event what is their relationship? There is this part and this number is greater than this one.

So it's fine. The algorithm is working. Okay, clear? But the local the scalar clock of Lamport they are really beautiful.

We can solve mutual exclusion but they are giving us you know half of the story because in this case is the case that we don't like. We have three events that are concurrent and if I look at the number I cannot understand if they are concurrent or not. They I have to look at the execution, right? So what we want to build is something that give us also the other implication.

So if the event if happens-before ($\to$) $e'$ I want that the logical clock of the first one is less than the logical clock of the other. But I also want the other way. I want that if the logical clock of one is less than the logical clock of the other then you know the first one happens-before ($\to$) the other one. So if I can build something that has also the second property the clock of Lamport has the property in blue but they do not have the property in purple.

If I can build something that has blue and purple, then I totally capture causality. I can use this structure to totally understand when I see the new message or they are related or they are concurrent. Okay? Is it clear?

So this something luckily for us exists and they are called vector clock. Why they are called vector clock? Because they are not just a number, they are a vector. Okay, so every process create a timestamp that is a vector.

You attach this vector to the message and then you use this vector to do comparison and understand if this happens-before ($\to$) $e_2$. Okay? So how the vector clock works? I will show you the vector clock using a bit a long way in the sense that I will

---

## Part 2: Vector Clocks & Causal Histories

### 2.1 The Conceptual Data Structure: Tracking Full Causal Histories

First, show you a certain data structure that we create. And these are data structures, the blue ball, proper and the purple property. So, this data structure totally capture causality. When you compare when we compare all these data structures, we can understand if the message are related or not.

But this data structure will be not the vector clock, will be something different. And then I will show you how these data structures can be optimized to obtain the vector clock. Why I do in this way? Because once you see this data structure and you understand it, you understand immediately why the vector clock works.

Otherwise, without this data structure, you will see the vector clock and you will have doubt why they are working whatever. Instead, by doing this thing, we first generate this data structure and then from this one, we derive the vector clock. The reason why the vector clock works will become apparent, obvious, immediate. Okay?

Clear? Let's start. Remember, our goal is to create a clock such that if the clock of one is less than the clock of the other, then this implies the apparent before relationship. If we think about it, the apparent before relationship is just the knowledge when this event is created, that this event exists.

Like this is the apparent before, is the fact that when you create this event $e'$, you know about it. Okay? And what better way of seeing how this knowledge transfer that creating a timestamp that has the entire history of the system. So, when I give this timestamp, I put in the timestamp all the knowledge that I have about the system.

And when you receive this timestamp, you will update your knowledge according to the knowledge that I'm sending you. So, what is the idea? Let us take this system of two processes, P0 and P1. On each process, we will have a data structure that contains two entries.

One entry for each process. So, this data structure will contain one entry for a process P0 and one entry for process P1. The same data structure on P1 will contain one entry on process P0 and one entry on process P1. Okay?

And each entry is the history of that process that you know when you generate the event. This is the rule. What is the history? The history is the list of the events about that process that you know apparent.

Okay? Clear? So, at the beginning on P0, this data structure will be something like this. The location of P0, the history of P0 will be empty.

Why? Because there was no event on P0. So, the location of P0 will be empty. And the location of P1 at the at the beginning, P0, what does it know about P1?

Nothing. So, the location of P1 will be the empty list. That means at the beginning, I know nothing about me because I haven't do anything. I know nothing about the other guy because I didn't receive any information.

Okay? And this is the data structure on P0 at this moment. On P1, we have the same data structure. P1 we will have this data structure where the first location is the history of P0 that is at the beginning is empty and the second location is the history of himself P1 that at the beginning is also empty.

Clear? When I generate an event $e_0$, I created something in my history. So, I have to update this data structure. Update this data structure means that when this event is generated, I created something more.

Okay? So, what P0 will do? Will go in its location of the data structure and append to its location the event that was created, the event $e_0$. And this is the data structure of this event.

The data structure of this event is on P0, P0 apparent. On P1, I don't know. Empty. I don't know.

Not know. Anything for me is possible that anything happened on P1. I don't know. Okay?

Clear? P1 will start as the data structure that is empty. He generates the event $e_1$ and what P1 will do? Will go in its location of the data structure, add event $e_1$ to the its location and then mark the event $e_1$ with this data structure.

A data structure that is empty, $P_0$, $P_1$, event $e_1$. Clear? So, every time I do an event locally, I go in the location that I have in the data structure and I update my history because I generated something. Now, when I generate $e_2$, I'm also generating something.

I'm generating a message. So, what I will do? I will go in my data structure. I go in my location and my location, how it will be after the update?

How it will be the location of $P_0$ after the up this event when we update? $e_1$ EE zero $e_2$. This is $e_2$. This is a number two and this is a number one.

Okay? Maybe the number are a bit smaller. So, this is event zero, this is event two, this is event three, this is event four and this is event one. Okay?

So, $P_0$, when he create this event, he says okay, my history is $e_0$ $e_2$. And what is the history of $P_1$ from the point of view of $P_0$ at this point? Is empty because I know nothing about $P_1$. Do you agree?

And then I attach this data structure to the message. So, my message will be message plus this data structure that is my timestamp. Now, $P_1$ receive the data structure. And this is the only rule that is more complex, the one when I receive the data structure.

When I receive the data structure, what will be the data structure of $P_1$ before receiving the message? The data structure of $P_1$ before receiving the message is empty list for $P_0$. And for $P_1$ is $e_1$. Event $e_1$.

Okay? But once we receive this message and we create this event, what we know about the system? On my history will be $e_1$ $e_3$. On my history.

Why? Because I generated the event receive of a message. But on the history of $P_0$, what I know about the history of $P_0$? $e_0$ and $e_2$.

So, when I receive this message, I will look at my first at my timestamp first and I say location of $P_0$, my location is empty. The location of the message contains two events. This guy. So, I will create by the timestamp that I create.

I put this list inside the location of $P_0$ instead of my list because this list is longer because it contains more information. Okay? When I receive this message, I know about this two on $P_0$. And so I will put in the first location of $P_0$ $e_0$ and $e_1$.

And then in my location there was sorry, this is $e_2$. One two. And then in my location, what I do? There was $e_1$ already.

I generate the event receive of a message and I have to put the receive of a message event in my location. So, I will put $e_3$ here. Okay? The pop goes also in reverse.

In reverse, what do you mean? Uh by $e_3$ to $e_2$ $e_0$. UhNo only by $e_2$ to $e_3$. Yes, the information goes from $e_2$ to $e_3$.

And the data structure on $e_3$ at this point when $P_1$ update the data structure will become $e_0$ $e_2$. $e_1$ $e_3$, but the data structure here is just $e_0$ $e_2$, empty list because you do not know about $P_1$. Because there is no message that goes the message goes in this way. Ah, okay.

So, if you have doubt, then at the end of the lecture, we can discuss about it. Okay? So, essentially the data structure at this point what is telling to $P_1$ is this. Okay?

The data structure on $P_1$ at this point is giving the history that $P_1$ knows. So, it's this part of the system because you have $e_0$ $e_2$ for $P_0$ and $e_1$ $e_3$ for yourself. Okay? When we generate event $e_4$ at this point, we update our data structure and our data structure will become location of $P_0$ and what is the location of $P_0$ at this point?

What will it contain? And the location of yourself, what you will contain at this point? Okay? Yes.

Now, let's say that I send a message to back to $P_0$. What $P_0$ will do when he receive the message? I see my location and I do the maximum between my location and this location and it's the same. So, my location remain.

Then I see the location of $P_1$ and I do the maximum between the location of $P_1$ and the location of the message and what is the maximum? This one. And so the data structure of this event will become $e_0$ $e_2$ E this event. Let's say that this is $e'$, $e'$.

And the location of $P_1$ will become $e_1$ $e_3$ $e_3$ and $e_4$. Okay? Is it clear?

### 2.2 Invariants of Causal Histories and the Prefix Property

Essentially with this data structure, we are moving the entire history of the system.

So, for every process, the data structure tell you what that process knows. It's clear? Yes, I mean I don't know what you mean by traverse. It's it's the entire history in the sense that once we arrive at this event, we look at all the paths that enters inside this event.

And with the history we keep for this path. Yes? How in this case, for example, $e_1$ and $e_2$ would still be concurrent because you don't know which oneYes, they are similar. They will remain concurrent.

The events that are concurrent, they are concurrent because life, you cannot make them unconcurrent by using data structure because when this event was created, you didn't know about this one and when this one was created, you didn't know about this one. We cannot fix this with an algorithm. So, they remain concurrent. What we want is an algorithm in which we can see the timestamp and say they are concurrent.

Okay? You cannot fix concurrent because the concurrent depends on the execution. So, this data structure we use two rules. The first rule is if there is a local event, I go in my location and I append the event in my location.

If there is a send receive rule, what I do is that when I receive a message, I look at the first location of my memory, the first location in the message and I take the maximum between the two. Second location in the message and second location in my memory and I take the list that is longer. The list that is longer. And then I go to my location and I append one event.

Okay? Is it clear how it's generated? But now we don't have a rule to compare this kind of history because what I want is a rule in such a way that I can compare when this data structure is less than some other data structure. Is it clear?

And it's not obvious because they are not number. I cannot just use you know the ordering of numbers to order them. I need some other concept. So, we say that the data structure of an a certain event is greater than the data structure of a second event if for all the locations, the data structure of the first the history of the first event is contained in the history of the second and there exists at least one also more location where the history of the first event is strictly less than the history of the second.

So, let's look at this definition with two events. Let's take event $e_2$ and event $e_4$. Event $e_2$ has a data structure that is done in this way. $e_0$ $e_2$ and then empty.

Event $e_4$ has a data structure that is done in this way. $e_0$ $e_2$ and then $e_1$ $e_3$ and $e_4$. I say that this data structure is less than this one if all the list of this data structure are contained or equal to the list of this one. This list is contained or equal to the this list.

So, it's okay. This list the empty one is contained in this one because it's empty and this is And then there is one location at least one where this list is strictly less than this one. And in this case, in the second location, this list is empty. This list has a size of three.

So, this list is contained in this one. Okay? And I say that the data structure of event $e_2$ is strictly less than the data structure of event $e_4$ if there is this rule. If for the first location I'm contained or equal.

For the second location I'm contained or equal. For the third location because this data structure if I have three processes, there are three locations. If I have four processes, there are four locations. If I have N processes, there are N locations.

So, if the first location is also equal, second location less or equal, third location less or equal and there is one location that is strictly less also more, but at least one, I say that this event is as a timestamp that is less than this other event. Is it clear the rule to compare them? Is it clear the rule to compare them? Okay.

So, for this rule, event $e_2$ and event $e_4$, this event has a timestamp that is less than this event. Because back line the rule, I see that this list is less or equal, this list is less or equal and the same list is strictly less. So, this one is smaller. Okay?

Clear? Is it clear? Okay. Let us examine the data structure of the red one and the data structure of the purple one.

The data structure of the red one is this one. What is the data structure of the purple one? The location of $P_0$ is empty and the location of $P_1$ is $P_1$. So, when the iPad disconnect, it erase everything.

And so luckily this year is not really I mean is working the Wi-Fi. Usually there are some years that I let say I speak loudly because there is disconnecting continuously. So, we were doing the red one. And what is the data structure of the red one?

The first location was $e_0$ $e_2$ because this is number two. And the second location is empty. Then there was the purple one. The purple one is Empty one.

Okay? Now, let's try to apply the rule to see if this one is less than this one. So, this location is not less than this one. Do you agree?

So, it's not possible that this one is smaller than this one. Okay? So, it's not true that is not true that X is less than Y. Is not true because this location is greater than this location.

So, I cannot apply the rule. Let's try to see the contrary. This location is less or equal to this location. So, this is fine.

But this location in this location, what is the relationship? This one is So, I cannot say that Y is less than X. Okay? So, it means that between these two timestamps, I cannot find that one is less than the other.

Okay? Clear? And how are these two events? So, with this data structure that we constructed, $e_2$ events are concurrent, we will find that the timestamp we cannot compare.

We cannot say the timestamp of one is less than seven or the seven is less than one. Okay? And that is nice. That is nice.

Okay? Clear? Is it clear? Is it clear?

Okay. Now, I have to show that this data structure respect the blue property and the purple property. The blue is the same one of Lambert. If event E happens-before ($\to$) event $e'$, then the timestamp of E is less than $e'$.

This is what I have to show. Okay? So, if E happens-before ($\to$) $e'$, what happens in our system? What happens in our system if E is before $e'$?

No, if E happens-before ($\to$) $e'$, not think about the data structure, think about the apparent before. What happens for the apparent before if E happens-before ($\to$) $e'$? It's greater before $e'$. Yes, but in our system, let's say that we have a system of 100 of process and I tell you this event E happens-before ($\to$) this event $e'$.

What does it exist in the system if E happens-before ($\to$) $e'$? A path and message is betweenBetween exists a path of messages that connect this guy to this guy. Okay? This path can be complex, can be something like this.

It can be something complex, but there exists a path. Okay? Clear? Here we create a certain data structure, right?

We create the data structure of E. Every time we go in this path, what we do to this data structure? We only increase it. Either I add a message to the data structure or when I receive it, I cancel something in the data structure if from the other side was longer.

Okay? If I cancel the location two of this data structure and I put the location two of this guy, I do it because the location two of this guy has a list that is greater than the list of the location two of this one. So, the data structure can only grow when I go inside the path. And if the data structure can only go inside the path, then it means that this data structure here will be strictly contained in this one because we are only growing.

So, I will be less or equal in some location and I will be strictly less on the location that are touched by the path. Okay? Is it clear? Is it clear intuitively?

Here I did something. I when I go to this path, I'm adding some I'm I'm adding something to this something. When I here, I will be I will have something that is bigger that contains this one. And so it means that the timestamp of this event will be less than the timestamp of this one when I do the rules.

Okay? But this is boring because this we already knew how to do it with the Lambert timestamp. Okay? So, this part of the implication is nothing new.

The part of the implication that we like is this part here. If the data structure of E is less than the data structure of $e'$, then E is less than $e'$. Okay? Is it clear?

This is what we want to show. This is the interesting stuff. Is it clear to everyone? This is what we want to show.

Let's say that we have a system with many processes. And we have E here the event E with its data structure. Okay? This data structure contains E.

Do you agree? Because when I generate event E, I do I attach the event in the data structure. I append it. So, this data structure contains E.

Do you agree? Then by hypothesis, we are telling that the data structure of E is less than the data structure of $e'$. This is our guy $e'$. And this data structure of $e'$ is greater than the data structure of this one.

So, if it is greater, it means that this data structure is contained in this one. For the rule, is strictly contained. It means that every list that is here is inside the some list that is here. Is it clear?

Yes. But it means that this data structure will contain a certain event. Which event this data structure will contain if this data structure is contained in this one? EE will contain event E.

But what is the only way for this event to contain E? That there is a path from E to this guy. Because it means that you know about E, that you received E. So, in order to receive E, it means that there was a path from this event to this event that will be complex, arbitrary complex, but there is a path from this one to this one.

And this path is the one that generate also the apparent before relationship. Is it clear? If you reason about it is not complex, if this data structure contain this event, then it means that someone told me and so there must be a path that arrive to me that contain that event. Is it clear?

And here there is the animation when you studied the all the path that exists that contain the event. Okay? So, it means that my data structure contains the event. So, someone send me something that contain the event.

So, someone received something that contains the event. And if we go backward, we will arrive to here. Because to know about E, there was something from E that was coming to someone else. Is it clear?

Is it clear? Is it clear? Clear? Okay.

I assume that it is clear. And so let's say that I come to you and I ask you to use this data structure in your algorithm. Okay? You have a system, a real system.

I come to your house and I say you have to use this timestamp with this data structure because you have to see if there is apparent before relationship in your messages. Okay? And you have something in production that has 1,000 processes that generate 1,000 events every second. Okay?

What you will tell me if you are an engineer and I say oh, you have to use this data structure of your messages. What will be your complaint? The memory. I mean this data structure grows after a few minutes, you have to send a message that is 100 megabytes.

After a few days, you have to send something that is one gigabyte. Okay? So, this is ugly because we have been all the information around. So, what we want to do is to transform this data structure in something that is smaller.

Why? Because it's reasonable, because I don't want to send the entire history. I just want to send something small. Okay?

Is it clear? And there is one observation that will allow us to go from this data structure to just a back. And the observation is the one in this slide. Let's say that I have an event that is complex, a system that is arbitrary complex.

Can be 1,000 of process, we don't care. I go to event E and I find in event E this history, history $P_x$ $e_0$ $e_1$ $e_2$. Okay? Is it clear?

I have a system is very complex. I go inside one event with GDP. That distributed GDP in the packet and I look at the reason $P_x$ there is $e_0$ $e_1$ $e_2$. Okay?

Then I find a second event in my system $e_1$ in which I go in the history of $P_x$ and I find a list of events that is $e_0$ $e_1$ $e_3$. So, this list of events differ for the third event. The third event on this process is $e_2$. On this event and on this other event in the data structure, the third event on process X is $e_3$.

Is it possible that I find a situation like this if we are following this algorithm or not? No. Is it possible that I find in my system two events in which for the process $P_x$ the first event tell me the history of $P_x$ is $e_0$ one $e_2$. And the second event tell me the history of $P_x$ is $e_0$ $e_1$ $e_3$.

Yeah. Is it possible or not? Yeah. Okay.

Someone is saying no. Why? When I means that I know all the history of $P_x$. So, because we are already increasing, if we know that we are at $e_2$, we can only add other events and not turn back and then add the one that is not $e_2$.

Okay. Your colleague say I can never remove from this data structure. We never remove. So, he's saying when I if I do not remove, I cannot you know create this situation.

There is a simple explanation, a simple explanation. Who is the guy that add $e_2$ to history of $P_x$? Uh $P_x$ is the only one. $P_x$ is the only one.

Because you append to your location and then you send the message. So, the only one that append $e_2$ to its list is $P_x$. Then you send to the this list to the other people and they will switch with your list. But the only one that append is always $P_x$.

Is the only one that is allowed to write on its location. Okay? The other can just swap. So, I have a list that is smaller and I receive something that is bigger from $P_x$ and I can swap, but I cannot add to the location of $P_x$.

The only guy that has to the location of $P_x$ is $P_x$. If something like this happen, then it means that $P_x$ is crazy because it means that at for certain processes telling the third event is $e_2$ and for other processes is telling third event is $e_3$. It means that is not following the rules because the rules is you just add. So, only one of these two history is possible.

Okay? The other cannot be possible, cannot exist in the system. Is it clear? Is it clear?

So, what does it mean? It means that one the only list of three location for $P_x$ is this one in the system. Cannot exist another list that has three element inside that is different. All the list of three element are the same because are $e_0$, $e_1$ and $e_2$ are the first three event that happened on E X.

You cannot find a different list of three elements for $P_x$. Okay? Is it clear? And it also means that is this situation possible?

I have an event E and an event $e'$. I go to the location of $P_x$ and I find on the location of $P_x$ of event E a list that is $e_0$, $e_1$, $e_2$. And on $e'$, I find in the location of $P_x$ a list that is $e_0$, $e_1$, $e_3$, $e_4$. Is it possible?

Yeah. No, this is not possible because this event cannot be different. Okay? Is clear?

So, it means that actually this event here has to be $e_2$. We cannot be a different event. Okay? Clear?

So, it means that if at least is longer than this one, then they share the same prefix. This prefix is equal. The first three events are equal. Then you can have something more, but the first three are equal.

Okay? It's clear? So, on the slide there is the proof. But intuitively,

### 2.3 Compressing Histories into Vector Clocks ($V_i[k]$)

if we have this observation, it means that actually we do not know to we do not need to know the content of the list, but just the number of elements because I know that the first three elements of $P_x$, the list of size three is $e_0$, $e_1$, $e_2$ and cannot be out in that an another list.

So, I can compress my data structure to work just with the length of the list. So, I can create a vector where every element of the vector is the length of the list. When I append in your data structure in the new one, what I will do? If I just I'm using the length.

I add one because appending means that I add the length of my list by one. Okay? When I was receiving in your algorithm, I was saying this list is smaller than this one and I take this one. This is smaller and I take this one.

### 2.4 Vector Comparison Rules & Concurrency Detection

If I just use the length, which operation I will use when I have to receive a data structure and I have to do the comparison if I use the length? Less than, greater than. The maximum. The maximum of the length.

If I have a list of three and I'm receiving a list of four, the bigger one is four. So, I don't need to look at all the elements. I know that the list of four elements is bigger than me. So, it knows more than me.

So, I can remove all the location with the list and I can use number in all the location and this do these two operations. When I have to append an event, I increase. When I receive an event, I do maximum between all the locations and then I increase my location and this X are same data structure that we were using where we compress and everything to become just number and not list. Here there is the proof that is the prefix.

So, we can use the length. And this is actually the vector clock. So, in our vector clock, we will have vector of location where each process has a location. So, the component zero of the vector is the one of process zero.

The component one of the vector is the one of process one. If I have another process, the third component is of process two and so on and so forth. When you create an event in your system, you add one to your location. When you send a message, what you have to do in this vector clock?

I attach the clock, the vector to my message. So, I send a message to zero. This one will as a clock of zero one, a vector clock. Receive a message with a vector of two zero and what we were doing in the whole algorithm, the longer list.

So, here what I have to do? The maximum between two and zero that is two. Two. Then for the second location, what I have to do?

The maximum between zero and one that is one. And why we have two in this location? Because I'm addingBecause I'm adding my safety event. In the old one, we were taking empty list, my list of one event and then I add.

So, empty list is zero. The list of one event is one. Maximum is one and I add. So, I create a list of two elements that is two.

Okay? Clear? And so this vector clock two means that this process knows about the first two events of process $P_0$ and the first $P_2$ the first two events of himself. Is it clear?

Is it clear the vector clock? So, now I will not do the proof if the our vector clock is less than the other, then the events are connected because the proof we did it for the data structure. So, let's see the algorithm and let's see the algorithm in detail. Each process on a system of N processes create a vector.

This vector has N locations, one for each process. Each location initially is zero. When a certain process generate an event, it goes in this vector in its location and increase its event by one, the count. When I send a message, I create the event send of a message.

So, I increase my location in the vector clock because I generate an event and I attach this new vector clock increment to the message and I send it to the destination. When a destination receive a message that contain such a certain timestamp, what it does? For every location, I do the maximum between the location of my clock and the location on the message and I take the maximum. Then I create the event receive of a message.

This receive of a message is an event. I go to my location and I increase my location by one. Okay? Is it clear?

Now, we need the rule to compare the vector clock to say if a vector clock V is less than a vector clock V prime. In the list we were saying each location of V has to be smaller or equal plus one has to be strictly small. And will be the same here. The component of V has to be less or equal that the first component of V prime.

The second component of V has to be less or equal than the second of V prime. And I have to find a component that is strictly less. If I can find this, I say that this vector is strictly less than this other vector. Let's look at if this with number.

Let's say that I have a system. If I have a vector like this, how many process there are in the system? Three process. I have the first vector of this event that is one two zero.

The second vector of the other event that is one two. I have to understand if one is less than the other. We use the rule. The first location is less or equal.

The second location is less or equal. This location is strictly less. So, this vector lose because is smaller and this vector win. So, it means that the event E happens-before ($\to$) the event $e'$.

Okay? Let's say that we have these two vectors. One two zero, one zero two. The first location is less or equal.

The second location of this vector is bigger than the strictly bigger than the second location. So, it means that for the second location, this one is winning. For the third location, I find that zero is less than two. So, this is strictly less.

So, it means that this vector is winning for the second location. So, it means that this vector is not less than this one and this vector is not less than this one. So, it means that these two events are concurrent. So, this event E will be concurrent with these event $e'$.

We have also see the same thing in the list. You remember what is the data structure we saw two events with the list where there was one list that was bigger, the first one was bigger in the first and smaller in the second and the second list was bigger in the second and smaller in the in the first. And this is just with the number because they have the length of the list. Is it clear?

Clear? Okay. So, this is an example. If it's zero, I'm using the dash instead of the zero in this figure.

Okay? So, initially the vector clock of all the processes are zero. So, the vector clock of this guy is zero. The vector clock of this guy is zero.

This guy create the first event. So, how it will be the vector clock? Zero plus I go in my location and increase by one. So, vector clock of this event is one zero.

Clear? Then here I create send of a message. What I do? I take my previous vector clock that is one zero.

I go in my location and what is my location? One zero. $e_1$, the first one and I increase the location to two. And so here I send a vector and what is the vector of this message?

Two zero. Zero. This guy receive a message that contains two zero. Yeah.

What is your local vector clock? Zero. Zero. Okay?

You do the maximum between the first location and the first location of the message. What is the maximum? Two. You do the maximum between the second location and the second location of the message and I put zero here.

Zero. Then will become one because I increase. Then the maximum between zero and zero and zero. So, the vector is two zero.

I increase by one my location and will become two one zero. Okay? Is it clear? Clear?

Okay. Let's look at this event here and this event here. The vector clock of this event is zero one. The vector clock of this one is four three two.

Let's look if one is less than the other. Zero is strictly less than four. Zero is strictly less than three. One is strictly less than two.

So, it means that this vector is smaller than this vector. So, it means that this event happens-before ($\to$) this one. What is the path? And there is the path that shows this.

Okay? Clear? So, let's us take this event, this guy and this guy. Okay?

The first location of this guy is greater than this one. The second location of this guy is equal to this one. The third location of this guy is bigger than this one. So, it means that the vector clock are not comparable.

If the vector clock are not comparable, how they are the events? They are concurrent. And these two events they are Okay? Clear?

Yes. Okay. Let's try to do this other exercise. This is $e_1$.

This is $e_2$. This is $e_3$. So, what we have to do is to start building the vector clock. Okay?

Let's do it.

---

## Part 3: Vector Clock Exercises & Execution Tracing

### 3.1 Trace Analysis: Step-by-Step Calculation of Vector Clocks

So these vector clocks are how it will be. This vector clock of this event.1 2 0 2It will be the maximum of the first location and the first location one. The maximum of the second location and the second location of this guy that is two. The maximum of the third location of this guy and the third location of this guy that is zero.

And then the last component will be1 2twotwoBecause it's one plus one. Okay? Because it's your event to be Yes. Uh the first event in process four.

Why does it Why is it $[1, 0, 1, 0]$? Which one? The first event in process four. The first clock of process four.

This is not for process four. This is for processNo. No. The one before.

Under that. Because you are creating the event. Yeah. So $[0, 0, 0]$ 1Oh I thought it was a one that's why I was asking.

Ah no. No. This is just the fact that I was born in a I can also write in a clear room. Okay?

This is just $[0, 0, 0, 1]$. Okay? Sorry. Yes.

The second event in $P_4$ is $[1, 2, 0, 2]$?

**Professor:** $[1, 2, 0, 2]$. Ah, okay.0 2 Okay. Look at the vector clock if they are correct. At this point this guy knows about a single event of $P_1$. He knows about two events of $P_2$. And he knows about two events about himself. And he knows about zero events of $P_3$. Okay? This is what the vector clock means. And if you look at it's score. Okay? Now tell me what is the vector clock of this purple guy? Purple guy $[1, 2, 3, 5]$ 1 2In $P_2$ 1 23 for process one2 What is the vector clock of this guy?2 3 3 and then Okay. 3 The first location some percentage. The second location how it will be?3 77The third locationUhThat is not for the location1 2 3 Maybe 3 6This is not four. The third location is34 Ah it's four. 23Uh the last location is33 So this should be correct. It appears to be correct. Okay? So you do all the vector clock why it's correct? Because at this point how many events you know about process $P_1$? Three of them. How many events you know about yourself? Seven. How many events you know about $P_3$? Four. Because with this you know these four events one two three and four. And how many events you know about $P_4$? Three. So this vector clock is correct. Okay? So you build your vector clock and then you will have two answers to these implication. So $e_1$ this guy is $e_1$.

### 3.2 Concurrency Verification through Vector Comparison

And if you are this guy how they are concurrent or not? $e_1$ and $e_2$. They are concurrent or not? Yes. They are concurrent. Okay? Now if we do the vector clock of $e_2$ what we have to find? A vector clock that is not comparable with 0 0 1 0. Okay? And what is the vector clock of $e_2$? It's $[0, 0, 0]$ 1No. The vector clock of this event isAh $[1, 2, 0, 3]$ 1 2 0 30 3 2 1 2 Yeah 0 This should be the vector clock of this event. Look this event was one two zero two. Okay? I am generating something so I just have to add to my location. Okay? Zero is less than one. Zero is less than two. One is greater than zero. They are not comparable. So they are concurrent. Okay? Yes. Here Okay. Let's do another exercise. This one that is Okay. Tell me if this event $P_4$ and this event here if they are concurrent or not with the vector clock. No. No. No. So they are concurrent or not? No. Okay. Why they are not concurrent? The one at the bottom will be $[0, 0, 0]$ 1So they are not concurrent because they this part. So what will be the vector clock of this guy?$[0, 0, 0]$ 10 0 0 1 because I just generated this event. What will be the vector clock of this guy?3Third location B three3 3 6 1 Yes. 6 6 1 13 1 1Yes. 13Yes. Should be this should be the vector clock once you have done everything according to the algorithm. Okay? It's possible that we make mistakes. So if someone understands there is a mistake but I think that it's correct. Should be correct. Yeah. It should Yeah. It shouldBecause at this point you received it from $P_1$ three events. From yourself you generated one two three four five six. From this guy you received just this event. So it's one. And from this guy you received this event. So it's one. Yes. So this should be the thing. Okay? And this event happens-before ($\to$) this one. And the vector clock show it. Okay? Yes. Are the vector clock clear? Yes. Are the vector clock clear? Okay. Let's do another exercise. And then we call it a day. Let's do this one. It's always on the vector clock. Consider a synchronous message passing system that uses a vector clock to implement some consistency checks on causal consistency checks. The message passing system is composed by four processes with IDs from one to four. As usual the ID is used as displacement in the vector clock. The locations are $P_1$ $P_2$ $P_3$ $P_4$. It's telling you the $P_1$ as the first. $P_2$ as the second location. Etc. Etc. vector clock are updated increasing before the send. And this is the algorithm that you have seen. You first increase your vector clock and then you attach it to the message and you send. Because there are some algorithms that do not increase before the send. Okay? For this reason there is this. Processes communicate by point link. You start debugging process $P_1$ the process with ID one in the middle of the algorithm execution. Okay? So you have a system you start looking at $P_1$. And you see the following string of string of messages exceeding and entering the Ethernet card of $P_1$. So we have $P_1$. $P_1$ communicates with other people. We go here to the message that we send in the network. And we see some message that exit and some message that enters inside $P_1$. Okay? This message we look at them after they exit from $P_1$ and before they enter in $P_1$. Because if I go on the Ethernet card of $P_1$ is after you process them and before you receive them. Okay? It's clear. I'm looking at the things that exit from $P_1$ and enter from $P_1$. At time zero I see the event exit of a message. And this message has a vector clock one zero. At time five seconds I see the event enter message. So a message entering $P_1$. And I see a vector clock one two three one. Okay? For that message that entered inside $P_1$. Is it clear until now? At this second I see a message that exits from $P_1$ and as this vector clock at this second I see a message that enters inside $P_1$ before $P_1$ process it. This is the message that is entering in $P_1$ and the message as a vector clock one two three one. Clear? Yes. Okay. Here there is the message. This is the message that enters. This is the exit. This is exit. And this enter. And the exercise is draw an execution that justify the vector clock you are seeing is such an execution unique. So I'm asking to draw at the system with all the messages in such a way that you can see this vector clock that exits and this vector clock that enters. And then the second question that I have is such an execution unique. Or you can find another execution that is different and gives you this vector clock and this vector clock. Is it clear? Yes. Okay. Okay. Sorry. Process two. Yeah. Two events on process two. TwoTwo eventsAnd E threeThenE four $e_5$ $e_6$ on process threeE four $e_5$ $e_6$. Okay? And $e_7$ on process fourOkay. And they are connected in a new way because I connected $e_1$ to $e_2$ $e_3$ to E fourOkay. Ah $e_3$ to $e_4$. Okay? Because I cannot go back in time. Okay? So $e_3$ four thenE six two E sevenE six two $e_7$ toE six two E sevenE six two E sevenYeah. So you have to moveYes. Wait. And after that $e_7$ to E oneE seven toAnd E eight sorry. To process oneThat isYeah. Uh it's not correct. Because here you have three events. You have the event I receive a message and you increase it by one. And you have the event send a message and you increase it by two. So this location is two. Because you are using you are using the same point twice. You are changing. Okay? But your colleague I mean one reasoning that we can say about this is that he is putting a number of points that is equal to the events that are here. So I say there are two events on $P_2$. So I put two points on $P_2$. There are three events on $P_3$. So I put three points on $P_3$. There is one event on $P_4$. So I put one point on $P_4$. And this is reasonable because you know that this is the number of events. But now you have to find a way to connect them. Okay? It's possible just to help you. Is it possible that this event is a received event? No. Because if this is a received event then this one cannot speak to other people. Because the moment he speaks this location becomes two. Okay? And there was another solution of the You also raised your hand. Right? Okay. What is your solution? Process one send to process two. Okay. Process oneThen that one to process three. That one to process three. Yeah. ThenIn my solution actually $e_5$ was before. And $e_2$ was connected to $e_5$. So maybeSo your solution is like this. Yeah. Okay. Okay. So your colleague is suggesting this solution. Let's see if this solution works. This vector clock is one zero. The vector clock of this guy what it is? Of this guy?1 1 0 01 $[1, 0, 0]$. The vector clock of this guy?1 2 0 01 2 0 0. The vector clock of this guy?$[0, 0, 0]$ 1The vector clock of this guy?0 0 1 10 1 2 0 0 1 1. Yes. One because your location is this one and you increase by one. Okay? You do maximum between one and zero and this one. Maximum between zero and zero and zero. Maximum between zero and zero and zero. Zero. And then you increase yours that is one. Yes. The vector clock of this guy our guy here what it is?1 21 1 2 2 1 2 2 1 Why? Because I do maximum between one and zero and this one. Maximum between two and zero and this two. Maximum between one and zero and this one but this is my location. So I will increase it. And maximum between zero and one and this one. Then I increase my location and this becomes two. This event here that is the one who that create the message will be one two. We increase our location. Three one. Okay? So the location the solution of your colleague is correct. Is this execution unique? No. No. Because I can I was doing the other one in which I can put this arrow like this. And this arrow like this. And we have a solution that is equivalent. Actually you can also build another solution and you build another solution in whichE oneE one Okay. Yes. I can send from this guy and this guy. No. No. No. I cannot do it. Yeah. Ah yes. Yes. I can use the two events of this guy. So I can do one arrow like here. One arrow goes here. And then this one is the last one that send. So I can do something like this. There are seven execution that give you the same vector clock. Okay? Usually most of the time. Is it clear? Okay. There exists an execution in which we can create this vector clock where there is a process that does not send any message. No. Can we create an execution with this vector clock with the restriction that the process does not send messages? That there is one process that stays silent. That the vector clock exists to that process one receives it. Is the same. This thing. Can we do it? No. You cannot do it because since there is one unit for each location it means that each one of these process has at least send one message. Okay? So you cannot create an execution with one vector that is all positive all greater than zero if there was a process that say silence.

### 3.3 System Invariants: The Silent Process Rule

The process that say silence in that location you have to find zero. Because it doesn't speak. So no one can increase that location and that location has to be zero. Okay? So see you next one.

---

### Key Formulas & Concepts Reference

| Concept | Formal Definition / Rule | Meaning & Key Property |
| :--- | :--- | :--- |
| **Happened-Before ($\to$)** | $a \to_{HB} b$ | $a$ causally precedes $b$ via local order, message passing, or transitive closure. |
| **Concurrency ($\parallel$)** | $a \parallel b \iff \neg(a \to b) \land \neg(b \to a)$ | Neither event could have causally influenced or observed the other. |
| **Lamport Clock Condition** | $e \to e' \implies L(e) < L(e')$ | Causality implies strictly smaller scalar timestamp (one-way implication only). |
| **Lamport Local Update** | $L_i = L_i + 1$ | Increment local logical counter before generating a new event. |
| **Lamport Receive Update** | $L_j = \max(L_j, L_{msg}) + 1$ | Advance local clock past message timestamp to preserve causality. |
| **Total Ordering (Tie-Break)** | $(L(a), i) < (L(b), j) \iff L(a) < L(b) \lor (L(a) = L(b) \land i < j)$ | Converts partial order into deterministic total order across all processes. |
| **Vector Clock Condition** | $e \to e' \iff V(e) < V(e')$ | Two-way equivalence: vector comparison completely characterizes causality. |
| **Vector Concurrency Test** | $e \parallel e' \iff \neg(V(e) \le V(e')) \land \neg(V(e') \le V(e))$ | Neither vector dominates the other component-wise. |
| **Vector Receive Update** | $V_j[k] = \max(V_j[k], V_{msg}[k]), \quad V_j[j] = V_j[j] + 1$ | Merges causal knowledge from sender and records local receipt event. |
| **Silent Process Invariant** | $P_k \text{ silent} \implies \forall e, V(e)[k] = 0$ | If process $P_k$ never sends or produces events, its entry remains 0 system-wide. |
