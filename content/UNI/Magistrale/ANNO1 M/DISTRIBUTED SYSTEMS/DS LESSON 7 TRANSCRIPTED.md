# Distributed Systems — Lesson 7

## Failure Detectors: The Perfect Failure Detector ($\mathcal{P}$) and the Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)

### Summary of Topics Covered
1. **Recap of Lamport's Distributed Mutual Exclusion Algorithm**: Logical timestamps, total ordering with tie-breaking via process identifiers, message flows (`REQUEST`, `ACK`, `RELEASE`), and correctness proof based on happened-before ($\to$).
2. **The Crash-Stop Abstraction**: System model where processes fail exclusively by halting permanently without Byzantine behavior or recovery.
3. **Specification of the Perfect Failure Detector ($\mathcal{P}$)**: Strong Completeness (eventually every crashed process is detected by every correct process) and Strong Accuracy (no process is suspected before it crashes).
4. **Implementation: Exclude-on-Timeout**: Synchronous request-reply heartbeat pattern requiring $2N^2$ messages per period $\Delta$, where $\Delta > 2D_{max}$.
5. **Why Crashed Processes Cannot Detect Crashes**: Proof of why the specification cannot require detection "by every process".
6. **Information Staleness**: Why the absence of a process in the detected set at time $t$ does not guarantee that it is currently alive.
7. **Synchronous Round-Based Heartbeat Detector**: Reducing message complexity from $2N^2$ to $N^2$ by using the expressiveness of silence in synchronous networks.
8. **Timing Constraints for Synchronous Rounds**: Derivation of $T > 2D_{max} + \Delta$ and $D_{min} > \Delta$ to prevent heartbeat bleed-over across round boundaries due to clock skew $\Delta$.
9. **Correctness Proofs of the Round-Based Detector**: Invariant verification, Strong Completeness, and Strong Accuracy.
10. **The Generality of Synchronous Rounds**: Abstraction of synchrony into lock-step discrete rounds, and throughput/latency trade-offs.
11. **Partial Deliveries During Crash**: Why a process crashing in the middle of a broadcast `for` loop delivers to an arbitrary subset of processes.
12. **The Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)**: Operating in partially synchronous systems ($GST$ model); trading transient accuracy for feasibility.
13. **Properties of $\Diamond\mathcal{P}$**: Strong Completeness and Eventual Strong Accuracy (both are liveness properties).
14. **The Chandra-Toueg Algorithm**: Concrete pseudocode, suspect-and-restore mechanism, and dynamic timeout inflation ($\Delta \leftarrow \Delta + \Delta_{step}$).
15. **Exam Guidelines & Latency Analysis**: Analyzing code mutations, producing counterexample executions, and understanding the impossibility of predicting maximum timeout inflation before $GST$.

---

## Part 1: Mutual Exclusion Wrap-up & The Perfect Failure Detector ($\mathcal{P}$)

### 1.1 Lamport's Mutual Exclusion Algorithm Recap

And the idea of the algorithm is that once you want to access the critical section, you have to ask everyone. And this request message carries a timestamp. So you use the logical clock timestamp in order to order all the requests that are in the system. Once you receive a request to access the critical section, you always send an ACK, and you keep this request in your request set.

You enter in the critical section if you receive the ACKs from everyone. These ACKs must have a timestamp greater than your request, so that you know that they acknowledge the current request and they are not for another one. And once you have the ACK from everyone and your request is the minimum in the request set, then all you can do is to enter in the critical section.

In order to allow other people to enter in the critical section, what you have to do at some point is to ensure a release in which you release the critical section. You issue a release by sending a message to everyone, and when someone receives this message, what he will do is to remove the request of the sender from the request set. And in this way, you will allow other people to enter in the critical section.

And this is Lamport's mutual exclusion algorithm described in a few words. The correctness proof derives from the fact that if there is a happened-before relation ($\to$) between the requests, then the request with the minimum timestamp will block the other. Otherwise, if two requests are concurrent, then they will see the requests of each other, and so the one with the minimum identifier enters, and the other one will wait for the release.

### 1.2 The Crash-Stop Abstraction & Specification of $\mathcal{P}$

And then before concluding the lecture, what we did was to discuss this primitive that is the Perfect Failure Detector primitive ($\mathcal{P}$). That is a primitive that has the following abstraction: we have an event `crash(p)`, and this event crash signals to the one that has this box that the process indicated by the event crashed.

And there are two properties for the Perfect Failure Detector:
1. **Strong Completeness**: says that if a process crashes, eventually every other correct process has to suspect the crash. So this property forces our primitive to behave in this way: if there is a certain process, process $P_x$, that crashes at a certain point, and there is process $P_1$ and process $P_2$ that are correct, eventually on both of them—probably at different times—what will happen is that both will see the signal `crash(Px)`. And this has to happen for the set of all the correct processes. So all the correct processes have to see this event, and this is Strong Completeness.
2. **Strong Accuracy**: says that if on any process—it can be correct or not, but if on any process we have a signal `crash(Pz)`, for example—then it means the moment we receive the signal that process $P_z$ actually crashed. So if we have an execution in which we have process $P_z$ that is a correct process, and this guy receives the signal `crash(Pz)`, then it means that the property is violated. It means that this is not an actually perfect failure detector.

### 1.3 Implementation: Exclude-on-Timeout (Ping-Pong Heartbeat)

How do we implement the Perfect Failure Detector? With the idea of the ping that in this algorithm is called heartbeat request and reply. So we have our primitive, the Perfect Failure Detector, and we need the perfect point-to-point link to implement it.

And how does it work? Every process starts at the beginning, and in the initialization event we have the set of alive processes $\text{alive}$, and initially this set is equal to $\Pi$, that is the set of all processes. Because at the beginning, we assume that everyone is alive, no one crashed yet. Then we have the detected set $\text{detected}$ that initially is the empty set $\emptyset$. And in this detected set, we will put the ID of the people that crash. So once I detect someone, this someone crashes, I write the ID in this set. And then I have a timer of $\Delta$, and this is the timeout that I will allow for a ping to reach the target and then come back from the target to me. So this is the ping that we use in this request-reply pattern.

So we start this timer with a certain timeout $\Delta$. This timer times out on our process $P_1$, and process $P_1$ will execute this handler. So what does process $P_1$ do when it times out? For every process in the set of all processes in the system $\Pi$, I check if $p$ is not in $\text{alive}$ and $p$ is not in $\text{detected}$. And we will see that this handler triggers when we detect a crash. So when we have this situation where there is a $p$ that is not in the $\text{alive}$ set and $p$ is not in the $\text{detected}$ set, then it means that there is a new crash in the system, and we will do something.

For now, let's skip this `if` because at the beginning everyone is alive. So at the beginning, this `if` will be false because here when we start the first time, $\text{alive}$ is equal to all the processes. So this will be false for everyone. And what do I do? I send a heartbeat request to that process. So let's say that the processes are $P_1, P_2$, and $P_3$. At the beginning, this handler triggers, and so I will send a request to myself, a request to $P_2$, and a request to $P_3$.

Then this guy will receive the request, and when you deliver a request from a certain sender, what do you do? You send a reply to that sender. So $P_2$ triggers this handler and sends a reply. $P_3$ triggers this handler and sends a reply. You also trigger the handler and send a reply to yourself.

And then what happens? Once $P_1$ receives a reply, this handler will trigger, and what do you do? You put that process in the $\text{alive}$ set because you know that the process is alive. Notice that here $P_1$ sends the messages to everyone. Then after I send the message to everyone, I reset the $\text{alive}$ set to empty because now I sent the message, and I don't know who will be alive. I send the ping to everyone, I set $\text{alive} \leftarrow \emptyset$ so that if you do not answer, you will not be in $\text{alive}$. And then I start again the timeout here.

So once I start again the timeout here, on $P_1$ I see that after $\Delta$, this handler will trigger again and I will send again the request to everyone. So at this moment, our $\text{alive}$ set is empty because we executed this line. So I receive the reply from $P_2$. What do I do? I execute this handler, and on $P_1$, $\text{alive}$ will become containing $P_2$ at this point. At this point, $\text{alive}$ will contain $P_2$ and $P_3$ because I receive also from $P_3$. At this instant, I receive from myself, so $\text{alive}$ contains $P_1, P_2$, and $P_3$ at this point.

Now we trigger again the handler, and what happens? I enter in the timeout for all processes: does there exist a process that is not in $\text{alive}$? In this case, it's false because everyone is in $\text{alive}$, no one is dead. And so I will signal no one, and do the same stuff: I put $\text{alive} \leftarrow \emptyset$, and then I send a ping to everyone and then wait for them to answer.

So let us suppose that we are in a situation where there is a process that is not correct. Let us suppose that $P_3$ is not correct and $P_3$ crashes here. So what happens? This message will not reach $P_3$ because $P_3$ crashed. So it means that $P_3$ will not send the ping back. $P_2$ will send the ping back to $P_1$, and $P_1$ will send the ping to himself.

So at this point, at the new $\Delta$—because here we set another timeout at $\Delta$, so we have a timeout at $\Delta, 2\Delta, 3\Delta$—every $\Delta$ is a timeout again. If I set it to 5 seconds, at 5 seconds I trigger, then at 10 seconds I trigger again, then at 15, 20, 25... in this way, I'm always putting a timeout every $\Delta$ seconds.

So now when this timeout triggers, my $\text{alive}$ set at this point will actually contain $P_1$ and $P_2$, but will not contain $P_3$. And $\text{detected}$ at this point is empty because we never touched it. So what happens? I trigger the handler:
- Is $P_1$ in $\text{alive}$? Yes, this does not trigger.
- Is $P_2$ in $\text{alive}$? Yes, this does not trigger.
- Is $P_3$ in $\text{alive}$? No, because $P_3$ is not in $\text{alive}$, I didn't receive the reply back. And $P_3$ is not in $\text{detected}$ because $\text{detected}$ is empty. So I enter here.

And what do I do? I put $P_3$ in $\text{detected}$ because I see $P_3$ crashed, and then I create the event `crash(P3)`. So at this point, I raise a flag and I say $P_3$ crashed.

Notice why I use the $\text{detected}$ set: so that I signal the crash of $P_3$ only once! Because at the new timeout at $4\Delta$ that will be here, I send again the ping to everyone, and again $P_3$ will not answer because $P_3$ crashed. So again here I will find that $P_3$ is not in $\text{alive}$, but I will see that $P_3$ is in $\text{detected}$, and I do not trigger the crash again. So I use $\text{detected}$ to detect the crash only once.

I have to detect the crash only once because in our model we don't have recovery. Once you crash, you are crashed forever in our model. I don't need to say it's possible that $P_3$ will become alive in the future. No, once crashed, it is crashed forever for our model.

### 1.4 Message Complexity Analysis ($2N^2$)

As you can see, in $\Delta$, how many messages do we generate? Remember that for the failure detector, the system is synchronous because I need a delay that has to be less than $\Delta$. I need a delay of the round trip time for this algorithm to work: the round trip delay has to be less than $\Delta$, because if the delay of the round trip time is more than $\Delta$, then it's possible that I trigger the timeout before I receive the ping. So this means that the system must be synchronous for this algorithm to work, so that you know the maximum delay of the channel, and you put $\Delta = 2 D_{max} + \epsilon$, because it's always better to have a buffer.

So in $\Delta$, how many messages does this failure detector create in a system of $N$ processes? In a system of $N$ processes, how many messages do we create in this system? Please.

> **Student:** Every timeout will create $2N$ messages, because one to send for each other message from $P$, and then all the other responses from the others...
>
> **Professor:** Yes, each process—so process $P_1$ in this interval of $\Delta$ here—creates $N$ heartbeat requests, right? And then you will receive $N$ replies. But everyone will do this! So process $P_2$ will do the same: process $P_2$ has to send $N$ requests to everyone and has to receive $N$ replies. Otherwise, the only one that acts is $P_1$. $P_3$ the same: $P_3$ has to send $N$ messages to everyone and then receive the answer back, because this failure detector is local. So how many messages do we send in total in the entire system?
>
> **Student:** $2N^2$.
>
> **Professor:** $2N^2$. Yes, because we send $N^2$ messages here: we have $N$ processes, everyone sends $N$ messages, that is $N^2$. And here we create $N$ replies for $N$ processes, so $N \times N$ is $N^2$. $N^2 + N^2 = 2N^2$.
>
> Is the complexity clear, or are there doubts that this is $2N^2$? Yes, please.
>
> **Student:** Just the $2N$ part...
>
> **Professor:** Okay, let's count. Imagine that the system is synchronous. These processes will have clocks that are synchronized. So more or less at $\Delta$, everyone starts doing this trick. They can be slightly desynchronized, but at $\Delta$ plus some seconds everyone will send. And I send $N$, you send $N$, this guy sends $N$. How many $N$ do I send? $N + N + N + \dots$, and this is $N$ processes, so this is $N$ multiplied by $N$: $N^2$. Then this process receives one reply from each alive process, and the other receives one reply from each alive process, so it's the same count again: $N^2$. In total, $2N^2$.
>
> **Student:** Okay, thank you.
>
> **Professor:** You're welcome. Other doubts on this algorithm?

### 1.5 Correctness Proofs: Strong Completeness & Strong Accuracy

So now we have to show that this is correct, right? And this is the usual stuff: even if it is obvious that the algorithm is correct, we still have to show that this is correct.

#### Proof of Strong Completeness
Strong Completeness means that if someone crashes, every process that is correct eventually will detect the crash. So I have to show that if a process crashes in my system, every correct one will detect it.

Let us assume that the process that crashes is $P_1$. Notice that it is not important that this is $P_1$, I'm using $1$ without loss of generality; it can be any process. So this process crashes. Another correct process is $P_0$. This one will never crash because it's correct.

This process $P_0$ will send a ping to the process that crashes at most $\Delta$ time after the crash—at most. Why at most? Because it's possible that $P_1$ was quick enough to send the reply immediately at $\Delta$ and then crash. So it's possible that for this last ping, he had enough time to answer. But at $t + \Delta$, at most at $t + \Delta$, this guy $P_0$ will send another heartbeat to $P_1$. And now this $P_1$ is dead. Since $P_1$ is crashed, it cannot answer to this ping.

And so it means that once this process arrives at the end of the cycle, at the end of $\Delta$, it will find in its $\text{alive}$ set that $P_1$ is missing for sure. Because it's possible that in the cycle before you do not detect it—because immediately at $\Delta$ you send, he replies, and then he crashes. But at this cycle, you will find that the ping is missing, so that process $P_1$ is not in the $\text{alive}$ set, and you will detect it.

So once a process crashes at time $t$, by $t + 2\Delta$, every other correct process that is in the system will signal it. It's possible that someone signals it before, because it's possible that there is a process $P_3$ that started the cycle a bit before and sees it earlier. But after $t + 2\Delta$, everyone that is correct will see it. And so it means that this failure detector satisfies Strong Completeness: it's not possible that someone crashes and there is a correct process that never detects it.

#### Proof of Strong Accuracy
And now we have to show Strong Accuracy. Strong Accuracy means that if I detect someone, that someone actually crashed. And for Strong Accuracy, we need this assumption: we need the assumption that two times the maximum delay is less than $\Delta$:
$$
2 D_{max} < \Delta
$$

How do we prove Strong Accuracy? We prove it by contradiction.

Let us suppose that there is process $P_0$ that detects that $P_1$ is crashed, but $P_1$ is alive. So $P_0$ here detects and raises the flag and says $P_1$ is a crashed process. If this happens, then it means that at this instant, we do not find $P_1$ in our $\text{alive}$ set—that is the only reason.

But it also means that before, we started our cycle at time $t$, and here is time $t + \Delta$. When we start our cycle, we send a message to $P_1$. My ping to reach $P_1$ will take at most $D_{max}$, which is half of this time or less. So at most, my message can reach the guy at $t + D_{max}$. It cannot reach it later than half of this interval. Once this guy receives the message, since $P_1$ is correct, $P_1$ will answer. So it has to create a ping back to my ping, and this ping will reach me by a time that is at most $D_{max}$.

So if I do the count: my message to you takes at most $D_{max}$, and the message from you to me takes at most $D_{max}$. They have to reach me before this $\Delta$ if they exist! So the only reason why they do not reach me by $\Delta$ is because $P_1$ crashed. It cannot be in another way.

And so it means that the algorithm has Strong Accuracy: once a process raises the flag and says that process crashed, it means that it actually crashed. Notice that you need this assumption. If this assumption does not hold—and so we have that $\Delta < 2 D_{max}$—then it's possible that my ping and pong take longer. Here I don't see the message, I raise the flag, and then I receive the ping after. So for this algorithm to work, I need to know the delay of the system.

### 1.6 Specification Analysis & Why Crashed Processes Cannot Detect Crashes

So is the Perfect Failure Detector clear to everyone? If it is clear, let me ask some questions to you.

Let's say that we have a certain failure detector $\mathcal{P}$. And this failure detector $\mathcal{P}$ has this execution: process $P_3$ crashes. And then at a certain instant, we see that $P_0$ detects the crash, $P_1$ says nothing ("for me it's okay"), $P_2$ detects that $P_3$ crashed. $P_3$ is crashed so it cannot detect. And $P_5$ and $P_6$ have not detected the crash yet.

Is it possible that we have an execution like this for a failure detector?

> **Student 1:** If the execution is synchronous, then no, because everyone has to receive the message by time $t + 2 D_{max}$.
>
> **Professor:** Okay, so your colleague says no, it's not possible because by $t + 2\Delta$ everyone has to receive. But there was another student with another thought...
>
> **Student 2:** But it doesn't say there that from $t''$ to $t'''$ two maximum delays have passed! Maybe just one minute passed.
>
> **Professor:** Exactly! Your colleague is saying: I don't know how much time passed between these two instants. So if this time is less than $2\Delta$, then this situation is possible! It's possible that someone detects it, and someone has not detected it yet.
>
> But in the future, what has to happen for this primitive to be correct? Because this is a partial execution, right? What do we need in the future?
>
> **Student:** That the other three have to detect it.
>
> **Professor:** That the other three have to raise the flag! So we need that in the future, the other three raise the flag, and say $P_3$ crashed.
>
> Now, we know for the algorithm that we have seen that this time after which everyone detects is $2\Delta$. So after $2\Delta$, everyone will detect for this algorithm. But it's possible that there are other algorithms that need more time. The specification just says: *eventually every process that crashes is permanently suspected by every other correct process*. But the specification does not tell you the time you need for detection! The bound of $2\Delta$ is for our algorithm, which is an implementation of a certain specification.
>
> So it's possible that we have a correct algorithm in which only these two detect initially, and after $2\Delta$ these three have not detected yet, and they will detect it after $4\Delta$ or $5\Delta$, because the time to detection depends on the implementation, not on the specification. The latency of our algorithm depends on the implementation.

Now let's say that I want to implement a failure detector where I change the completeness property to this new property:
> *"Eventually every process that crashes is permanently detected by **every** process."*

In the original one, there is *"by every correct process"*. Here I want to change the specification and write *"by every process"*. Can I implement this specification? Can I create an algorithm that implements this specific primitive in which I remove *"by every correct"*?

> **Student:** No.
>
> **Professor:** Why?
>
> **Student:** Because for a process to detect that the other crashed, it has to still be running. If you can't guarantee that the process is running at least enough to detect it, you can't guarantee to detect it.
>
> **Professor:** Exactly. And what if $\Delta$ is zero? Even with $\Delta = 0$, you cannot implement it! First, $\Delta = 0$ is not possible because of the speed of light: the maximum delay is at least bounded by the speed of light. But even if it were possible, let's say that we are in this situation where process $P_1$ crashes at time $t_1$, and process $P_2$ crashes at time $t_2$, where $t_2$ is two days later, and process $P_3$ is correct.
>
> If I want to implement this specification, then every process that crashes has to be detected by every other process. So it means that here $P_1$ has to say $P_2$ crashed! It has to say it because I said every process that crashes is detected by every other. Can you see the problem? Unless $P_1$ can see the future, it cannot detect that $P_2$ will crash in two days!
>
> So it is impossible to implement. This word *"correct"* you need it, because otherwise you cannot implement the primitive. The specification also dictates whether things are implementable or not.

This algorithm that we have seen is called **exclude on timeout**. Why? Because you remove people from the system on timeout.

### 1.7 Information Staleness and Detection Latency

Let's also do this other question:
If at time $t$ I do not have a process $P$ in my detected set, can I state that $P$ is alive at time $t$?

Consider this algorithm: we are running in the system, on process $P_1$. At a certain time $t$, I look in the memory of $P_1$, and I see that the $\text{detected}$ set of $P_1$ is empty, and I know that in the system there is also process $P_2$. If the detected set is empty on $P_1$ at time $t$, can I say that at time $t$, $P_2$ is alive?

> **Student:** No. Because $P_2$ could have crashed just after he sent the ACK from the timeout before.
>
> **Professor:** Yes! It's possible that we have a situation like this: at time $t$, $P_2$ is not in the detected set, but he just crashed. So the fact that at time $t$ I do not see $P_2$ in the detected set does not tell me that $P_2$ is alive, because there is latency in this algorithm.
>
> And if you think about it, no algorithm can say what is happening at the exact instant $t$. If I stop an algorithm at time $t$, the picture that the algorithm has of the world is old—it is old by at least the delay of the messages. What you know at time $t$ is at least as old as $t - D_{message}$. It can also be older depending on the algorithm.
>
> So you cannot build a failure detector that tells you immediately at time $t$ with 100% certainty: "at time $t$, this is alive, this is alive, this is alive." The ones that are crashed, yes, you know because they didn't answer; but the ones that appear to be alive, it's possible that they have crashed and you have not detected it yet, because you detect with a certain delay.

## Part 2: Synchronous Round-Based Heartbeat Failure Detection

### 2.1 Cutting Overhead in Half: The Expressiveness of Silence ($N^2$ Messages)

So $\mathcal{P}$ has a complexity of $2N^2$. Now the question that I have for you is: can we cut the messages that our failure detector uses by half? Can we build an algorithm in which we use $N^2$ messages, not $2N^2$?

> **Student:** We could send the pings to everyone and expect that the others do the same. So independently, everyone tells the others that they are alive around a set interval.
>
> **Professor:** Okay! So your colleague is saying: I can do an algorithm in which I divide time into intervals, because we have a system that is synchronous, so more or less we can do it.
>
> And I say: at time 0, everyone has to send a ping to everyone else that says "I'm alive". At time 5 seconds, everyone has to send a ping that says "I'm alive". At time 10, everyone has to say to everyone "I'm alive".
>
> So instead of using the pattern "I ask and I wait for the reply", I use a pattern in which the fact that I send a message means that I'm alive. At time 0, everyone sends a message. At time 5, everyone sends a message. If at time 10 I see that process $P_5$ has not sent a message, I say $P_5$ is dead, because at time 5 he should have sent the message! And so if I do not see the message after a certain delay, I know that at time 5 he did not send it because he was crashed.
>
> And why can you use this idea? You can use this idea because in a synchronous network, **silence is expressive**.
>
> If the network is synchronous, the fact that you are not seeing a message—the fact that you have silence—is sending information! Because you can agree with other people and say: "you have to send a message at that time." And so if you do not see the message, you know that he didn't send it.
>
> But this you can do **only in networks that are synchronous**. If you try to do the same technique in networks that are asynchronous, you will fail, because in asynchronous networks, it's possible that silence is just the delay of the message. So silence you can use only in synchronous systems.

### 2.2 System Model: Delay Bounds ($D_{max}, D_{min}$), Skew ($\Delta$), and Round Length ($T$)

Now the idea of your colleague is really clean, but we have to be a bit more precise. Because we can say: "okay, at time 0 everyone will send a message," but we know that in a synchronous system, time 0 is not the same for everyone, right? Because even in a synchronous system, we have clock skew! There is a small difference between the clocks that is usually small, but it exists—there is an accuracy of the clock synchronization algorithm.

So it's possible that time 0 for process $P_1$ is time 1 for process $P_0$, and so it means that process $P_0$ started sending messages a bit earlier with respect to us. Or it's possible that process $P_0$ will send messages a bit later with respect to us. Because in our system, even with clock synchronization, the clock of $P_1$ and the clock of $P_2$ will have a difference bounded by $\Delta$. I know that this skew is at most 5 milliseconds, for example, and so I have to make an algorithm that works even if there are these 5 milliseconds of difference between me and you.

So to create the algorithm that your colleague was suggesting:
1. We need to know the maximum skew of the clocks, which is $\Delta$.
2. Then we need also that our minimum delay of the channel $D_{min}$ is greater than $\Delta$:
   $$
   D_{min} > \Delta
   $$
   This is a technical condition that we need. Our channel has a maximum delay $D_{max}$, but also a minimum delay $D_{min}$. And I need that this minimum delay is greater than $\Delta$ for the algorithm to work.

There are some people that here have doubts. They say: *"What if the minimum delay is less than $\Delta$? What if my network is really fast and the skew is greater than the minimum delay?"*

This is not a problem, because the minimum delay you can always increase! How do I increase the minimum delay? When I receive the message from you, I wait a few milliseconds, and only then do I deliver it to the upper layer! So the minimum delay I can add to my algorithm for free. When I receive a message, I do not process it immediately: I wait, and now the minimum delay of any message is whatever I set. So the minimum delay we can increase if we need. It's the maximum delay that we cannot decrease!

And so this is the algorithm:
- At the synchronization event, we have this $C$, and this is the software clock of our process, because we need to use time in this algorithm. This variable is automatically synchronized by clock synchronization.
- Then we need a certain constant $T$. This $T$ is called the **round length** of our algorithm, and will be:
  $$
  T > 2 D_{max} + \Delta
  $$
  Why do we need that $T$ is greater than this? So that I know that I will receive the messages from the others even if the others start desynchronized with respect to myself, and even if the messages have delay.
- Then I have the set of correct processes $\text{correct}$, which initially is all the processes in the system $\Pi$.
- Then I have $\text{round\_alive}$, and at the beginning it is equal to $\text{correct}$. In this $\text{round\_alive}$, I will put the processes that I know are alive at a certain round.
- And then I have the round number $r$, that initially is $-1$.

### 2.3 Round-Based Failure Detector Algorithm

So what is this round I'm talking about? This round is the structure of the algorithm. In our algorithm, we will divide time into slices of $T$, and every one of these slices is a round:
- From $0$ to $T$ is the first round (round 0).
- From $T$ to $2T$ will be the second round (round 1).
- From $2T$ to $3T$ will be the third round (round 2), and so on and so forth.

So when someone tells you that an algorithm is round-based, it means that it is dividing time into discrete intervals. So our algorithm will advance in these discrete intervals of time.

This handler is the one that starts a new round:
```python
# Upon local clock C reaching a multiple of T:
upon C == k * T for k in {0, 1, 2, ...}:
    r = r + 1
    for p in (correct \ round_alive):
        correct = correct \ {p}
        trigger crash(p)
    
    round_alive = {self}
    for p in correct:
        send [HEARTBEAT, r] to p

upon receive [HEARTBEAT, r] from p:
    round_alive = round_alive ∪ {p}
```

What do we do when our clock satisfies $C = k \times T$ for some $k \in \mathbb{N}$? When $k = 0$, $C = 0$, I do something. When $k = 1$, $C = T$, I do something. Then at $2T, 3T, 4T, 5T$, and so on. So every $T$ units of my clock, I do something.

Let's say that our clock is 0 at the beginning. What do we do? We trigger, and I start a new round: the initial round is round 0 (because $-1 + 1 = 0$). Remember that this will not be at the exact same physical time on everyone in the system, because someone whose clock is a bit late will start a bit after, and someone whose clock is a bit ahead will start up to $\Delta$ before.

When the new round starts, what do I do? For any process that is in $\text{correct}$ but is not in $\text{round\_alive}$, I will say that it crashed. The symbol `correct \ round_alive` is set difference. At the beginning, $\text{round\_alive}$ and $\text{correct}$ are the same, so this difference is empty, and this `for` loop does not trigger.

Then what do I do? I set $\text{round\_alive} = \{\text{self}\}$ because I know that I am alive. And then for all processes that are in $\text{correct}$, I send to that process a heartbeat that says "I'm alive". At the beginning, $P_0$ sends the heartbeat to $P_1$. Once I receive the heartbeat from someone, what do I do? I put that someone in $\text{round\_alive}$, and that's it! I do not reply, because the moment I reply, I create $2N^2$ messages.

Let us trace this with two processes, $P_0$ and $P_1$:
1. $P_0$ starts round 0, and $P_1$ starts a bit late. $P_0$ sets $\text{round\_alive} = \{P_0\}$ and sends a heartbeat to $P_1$. $P_1$ starts its round a bit late and sends a heartbeat to $P_0$.
2. $P_0$ receives the heartbeat from $P_1$, and adds $P_1$ to $\text{round\_alive}$ (so $\text{round\_alive} = \{P_0, P_1\}$).
3. At time $T$, $P_0$ triggers the handler again. It enters round 1 ($r = 1$). It checks $\text{correct} \setminus \text{round\_alive}$: since both are in $\text{round\_alive}$, the difference is empty, so no crash is triggered. $P_0$ sends the heartbeat for round 1.
4. Now suppose $P_1$ crashes before round 1. $P_0$ sends the heartbeat to $P_1$, but $P_1$ is dead, so $P_1$ will not send anything to $P_0$.
5. When $P_0$ reaches the end of round 1 (at time $2T$), $\text{round\_alive}$ contains only $\{P_0\}$.
6. $P_0$ computes $\text{correct} \setminus \text{round\_alive} = \{P_0, P_1\} \setminus \{P_0\} = \{P_1\}$.
7. $P_0$ removes $P_1$ from $\text{correct}$ (so $\text{correct}$ becomes $\{P_0\}$) and triggers `crash(P1)`.
8. Notice that since I removed $P_1$ from $\text{correct}$, at the next round I will compute $\text{correct} \setminus \text{round\_alive} = \{P_0\} \setminus \{P_0\} = \emptyset$, and I will not signal $P_1$ again!

### 2.4 Classroom Discussion on Round Mechanics

> **Student:** So with this algorithm, if a process crashed, we don't send the heartbeat to him anymore?
>
> **Professor:** Yes!
>
> **Student:** So this is a scenario where the process cannot return back from a crash?
>
> **Professor:** Yes. In these classes, this is the assumption that we always do: once you crashed, you crashed forever. You cannot rejoin the computation.
>
> Other questions, other observations?
>
> **Student:** Do you have to send the round number in the message?
>
> **Professor:** No, it's not necessary.
>
> **Student:** So where is it necessary at all?
>
> **Professor:** In this algorithm, it's not necessary to send the round number over the wire. We don't need it. $r$ is just a local variable.
>
> **Student:** Yeah, just to keep counting.
>
> **Professor:** Yes, just to keep count of the rounds. If you look at the algorithm, I can remove $r$ and the algorithm still works! I'm showing you $r$ to make explicit the concept of rounds—to say: "this is round 0, and there is a period that is 0 for everyone; then there is a period that is 1 for everyone," because this round concept is more generic.
>
> **Student:** The distance between $r$ and $r+1$ and $r+2$, will this be different because of clock skew $\Delta$? Could one round be slightly longer or shorter with respect to the other?
>
> **Professor:** Actually yes, it's possible that this period is slightly shorter or longer because of clock synchronization adjustments. But if the skew $\Delta$ is small enough, this will not affect correctness. The only effect that counts is that the start is not the same for everyone, and the end is not the same for everyone.

### 2.5 Timing Invariant & Deriving $T > 2D_{max} + \Delta$

This algorithm works under an assumption. The assumption is that if I enter in round 0, I will receive the ping that another process creates at round 0 inside round 0!

Because we are not perfectly synchronized—since you can start a bit before me or a bit after me—two angry situations could happen:
1. **Early arrival**: You start a bit before my round, you send your heartbeat, and your message is really fast and reaches me *before* I enter round 0! This is a problem, because then in round 0 I will reset $\text{round\_alive}$, and I will not receive your message because I already received it before the start of the round!
2. **Late arrival**: You start late, you send the heartbeat, and I receive the heartbeat *after* my round 0 has already ended! This also is a problem, because I will have already checked $\text{round\_alive}$ and declared you dead!

We have to show that these two situations cannot happen. What we want to show is this lemma:
> **Lemma:** If a correct process sends a heartbeat in its round $r$, that heartbeat reaches process $P$ when $P$'s round number is also $r$.

#### Analysis of Case 1: Preventing Early Delivery
Let us first show that we cannot receive the heartbeat before round $r$. Suppose $P_0$ enters round 0 at physical time $t$. If $P_1$ starts round 0 at time $t$ or later, the message cannot arrive before $t$ because it is sent after $t$.

What is the worst situation? That $P_1$ starts round 0 as early as possible. What is the minimum time at which $P_1$ can start if $P_0$ starts at $t$?
At $t - \Delta$. It cannot start before $t - \Delta$, because otherwise our clocks would not be synchronized within $\Delta$.

Now, in order for the message to reach me before $t$, it must travel with the minimum possible delay $D_{min}$. So the arrival time would be $(t - \Delta) + D_{min}$. But we said by assumption that:
$$
D_{min} > \Delta
$$
Therefore:
$$
t_{\text{arrival}} = t - \Delta + D_{min} > t
$$
Even if you send your message at $t - \Delta$, I will receive it at $t + \text{something}$, because the minimum delay is strictly greater than $\Delta$! So early arrival cannot happen.

#### Analysis of Case 2: Preventing Late Delivery
Now what is the other angry situation? That $P_1$ sends the message for round 0, and $P_0$ receives it during round 1 or later.

> **Professor:** When does $P_1$ have to start the round to make this angry case likely?
>
> **Student:** At $t + \Delta$.
>
> **Professor:** At $t + \Delta$! $P_1$ has to start the round as late as possible: $t + \Delta$.
>
> And how much time can the message take to travel from $P_1$ to $P_0$? It can take at most $D_{max}$.
>
> So at what physical time will the message arrive at $P_0$?
> $$
> t_{\text{arrival}} = t + \Delta + D_{max}
> $$
> But in our algorithm, $P_0$ exits round 0 at time $t + T$. And we set:
> $$
> T > 2 D_{max} + \Delta
> $$
> Since $\Delta + D_{max} < 2 D_{max} + \Delta < T$, the message is guaranteed to arrive strictly before $P_0$ reaches $t + T$!

So now we know that if process $P_1$ sends a message at round 0, I will receive it in round 0. If it sends at round 1, I receive it in round 1.

And now Strong Completeness and Strong Accuracy become obvious:
- **Strong Completeness**: If a process crashes before round $r$, it will not send the heartbeat in round $r$. By our lemma, no heartbeat from another round can arrive. So $P_1 \notin \text{round\_alive}$, and I will signal it.
- **Strong Accuracy**: If I do not receive the heartbeat at round $r$, the only reason is that the process did not send it. And the only reason it did not send it is that it crashed, because if it were correct, it would have sent it and I would have received it.

*(As homework, try to find the absolute minimum $T$ that makes this work, because $2 D_{max} + \Delta$ is larger than strictly needed—I decided to be on the safe side).*

### 2.6 The Generality of Synchronous Rounds

This concept of rounds is more general than just this failure detector. Because what we have seen with the lemma—if I send a message in my round, you will receive it in the same round—is that in a synchronous system, we can create an abstraction that works in this way:
- Round 0 starts for everyone. Everyone that is correct sends a message, and everyone receives that message before the end of round 0.
- Then round 1 starts, everyone sends messages, and everyone receives before the end of round 1.

Logically, this is equivalent to starting everyone at the exact same time, sending messages, and receiving messages in lock-step. We can completely abstract away network delay and clock skew!

Of course, what is the disadvantage of using this round system?
In rounds, you are **slowing down messages**. Because I can send a message now, but then the next message that I can send is when the new round starts! I cannot send messages in the middle, because otherwise the message in the middle might not be received in the same round.

*(There is a paper you can read called "The Splendours and Miseries of the Round-by-Round Approaching Model" by Nicola Santoro et al., which describes this technique and shows several examples).*

### 2.7 Partial Deliveries: Crashes Inside a Broadcast `for` Loop

Now let's say that we are using this round-based failure detector. And let's say that we have this execution: we have round 1, round 2, round 3. And $P_3$ crashes.

At round 3, we have that $P_0$ signals that $P_3$ crashed, $P_1$ says no, $P_2$ signals that $P_3$ crashed, and $P_4$ says no.

Is it possible that we have an execution like this in our algorithm, where at the beginning of round 3 someone detects the crash and someone does not? Can we have something in the middle in which someone detects and someone does not?

> **Student:** No.
>
> **Professor:** Why do you say no?
>
> **Student:** Because you say $P_3$ here starts the round, sends the messages, and everyone has to receive what was sent.
>
> **Professor:** But how do you send the message when you are $P_3$ in Python code?
>
> **Student:** When you start with the first one... you write a `for` loop.
>
> **Professor:** You write a `for` loop! A `for` loop where there is $P_0, P_1, P_2, \dots$. And what happens if you die in the middle of the `for` loop?
>
> **Student:** Only the first few will get sent!
>
> **Professor:** Exactly! Someone will be sent, someone not! Because what can happen is that I have my `for` loop, and in the middle of the `for` loop I crash.
>
> So is it possible that $P_3$ starts the `for`, is able to send a message to $P_1, P_5$, and $P_6$, and then crashes in the middle? Yes! And the other guys do not receive it because $P_3$ was not fast enough to send to them before crashing.
>
> Now, some of you might think: *"Okay, but if this happens, I always have to see $P_0, P_1, P_2$ receive in order, and then the rest do not."* But this is also not true! Because below our perfect link abstraction, there are physical links that can lose packets, and your network interface card does not guarantee that it transmits packets onto the wire in the exact order you wrote them in your code.
>
> So it is possible that when a process dies in the middle of a broadcast loop, an arbitrary subset receives the message and the others do not. In the round-based model, everyone receives the message **if the sender is correct**. But if the sender is not correct, it can die in the middle. We will fix this in the broadcast module, where we will build distributed broadcast primitives where either everyone correct receives or no one does.

## Part 3: The Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)

### 3.1 Pushing $\Delta$ to the Limit & Inevitability of False Suspicions

Let us return to our exclude-on-timeout algorithm. What is the advantage if I try to decrease $\Delta$? What changes in this algorithm when I try to decrease $\Delta$?

> **Student:** You find out sooner if the process crashes.
>
> **Professor:** The latency for detecting a crash decreases! The smaller I put my $\Delta$, the faster I detect crashes.
>
> And I can try to put my $\Delta$ very close to $2 D_{max}$. But setting $\Delta$ close to $2 D_{max}$ is dangerous. Because if we did not calculate the bound perfectly, what will happen? I send the ping, I receive the pong a bit late... and so I detect a crash, and then I receive the pong!
>
> But still, if the process is alive, I will receive the ping later, right? And this introduces the second primitive in the family of failure detectors: the **Eventually Perfect Failure Detector**, denoted by:
> $$
> \Diamond\mathcal{P}
> $$
> We write $\Diamond$ (diamond) because in temporal logic, diamond means *"eventually"*. So this is an *eventually perfect* failure detector.
>
> This is a failure detector that can make mistakes! It can signal someone even if that someone is not crashed: it can tell you "look, that guy crashed," and then after a bit, revise its suspicion: "actually, that guy is alive."

### 3.2 The Partially Synchronous Model ($GST$)

And this Eventually Perfect Failure Detector works in our **eventually synchronous system** (also called partially synchronous).

You remember the eventually synchronous system: we have a bound on the channel that we do not know, and initially the delays fluctuate unpredictably. But there is a time $GST$ (Global Stabilization Time) after which our system stabilizes forever. This was the example of the Internet: during periods of congestion, delays can spike. But eventually, the network stabilizes.

During the period of asynchrony, the failure detector can make mistakes: it can suspect someone, then receive the ping and say "no, no, he was fine." But after the stabilization time $GST$, the Eventually Perfect Failure Detector becomes perfect: there will be a time after which, when it says that guy crashed, the guy actually crashed!

Why do we define this? To trade off accuracy for feasibility, so that we have a failure detector that can work in systems like the Internet where delays are unpredictable.

### 3.3 Specification of $\Diamond\mathcal{P}$: Suspect, Restore, and Liveness Properties

Since this failure detector can make mistakes, its abstraction provides two output events:
- `suspect(p)`: suspects that process $p$ has crashed.
- `restore(p)`: revokes the suspicion, signaling that process $p$ is actually alive.

So we can have a situation where $P_0$ suspects $P_1$, then receives a delayed reply from $P_1$ and triggers `restore(P1)`. Then another delay spike happens, and it triggers `suspect(P1)` again, and then `restore(P1)` again.

The specification of $\Diamond\mathcal{P}$ consists of two properties:
1. **Strong Completeness**: Eventually every process that crashes is permanently suspected by every correct process:
   $$
   \forall p \in \text{Crashed}, \forall q \in \text{Correct}, \quad \lozenge \square (p \in \text{suspected}_q)
   $$
   If a process crashes, our system can oscillate between alive and suspected for a while, but eventually it has to say suspected, and stay suspected forever. It cannot restore a crashed process forever.
2. **Eventual Strong Accuracy**: Eventually no correct process is suspected by any correct process:
   $$
   \forall p, q \in \text{Correct}, \quad \lozenge \square (p \notin \text{suspected}_q)
   $$
   You can make mistakes for a while—suspect, restore, suspect, restore—but there is a time after which you restore it and never suspect it again.

### 3.4 Classification of Properties: Why Both Are Liveness

Which one of these properties is a safety property, and which is liveness?

> **Professor:** What about the first property, Strong Completeness: is it safety or liveness?
>
> **Student:** It is liveness.
>
> **Professor:** It is liveness! Because you cannot violate it in finite time: a process can remain undetected for any finite duration, and the property can still be satisfied in the future.
>
> What about the second one, Eventual Strong Accuracy?
>
> **Student:** It feels like liveness as well.
>
> **Professor:** Yes, also the second one is a liveness property! Both properties are liveness properties—there is no safety property here. This is the first primitive that we see with only liveness properties!

### 3.5 Designing Dynamic Timeout Adaptation

Now, how can we implement $\Diamond\mathcal{P}$ in an eventually synchronous system?
We know that our system will stabilize after some time $GST$, and after $GST$, every delay will be below some bound $B$—but we do not know what $B$ is! What can we do if we do not know this bound?

> **Student 1:** Can we say that $\Delta$ is the bound?
>
> **Professor:** No, you do not know the bound at the beginning.
>
> **Student 2:** We can do some experiments!
>
> **Professor:** You cannot do experiments, because you do the experiment now, and then tomorrow network conditions change.
>
> **Student 3:** Can we fix $\Delta$ every time that we didn't receive a pong?
>
> **Professor:** If you increase $\Delta$ every time you don't receive a pong, then if a process actually crashes, you will never receive a pong, and your $\Delta$ will grow to infinity!
>
> Does someone see a better solution? When should you increase $\Delta$?
>
> **Student 4:** When we receive a delayed response! When we send a ping, if we later receive a pong for a ping that we already timed out on, we increase it!
>
> **Professor:** Exactly! The idea is this:
> - I start with an initial $\Delta = 5$ seconds, and I start doing ping-pong.
> - If I'm wrong, there is someone that is alive, but I timed out and suspected him.
> - Then I receive the delayed pong from him!
> - When I see that I was wrong, I say: *"Oh, I made a mistake! My $\Delta$ was too small."*
> - So I increase $\Delta$: $\text{delay} \leftarrow \text{delay} + \Delta$.
> - What will happen when the system stabilizes after $GST$?
> - I might make a few more mistakes, but every time I make a mistake, I increase $\Delta$.
> - Eventually, $\text{delay}$ will become greater than the network bound $B$!
> - And once $\text{delay} > B$, I will never make a mistake again!

### 3.6 Chandra-Toueg Algorithm Walkthrough

This is the Chandra-Toueg algorithm for $\Diamond\mathcal{P}$:
```python
# Initialization:
alive = Π
suspected = ∅
delay = Δ
start_timer(delay)

upon timeout():
    # If someone was suspected but answered late, a mistake occurred:
    if (alive ∩ suspected) != ∅:
        delay = delay + Δ

    for p in Π:
        # Detect new crashes:
        if (p ∉ alive) and (p ∉ suspected):
            suspected = suspected ∪ {p}
            trigger suspect(p)
        # Correct false suspicions:
        elif (p ∈ alive) and (p ∈ suspected):
            suspected = suspected \ {p}
            trigger restore(p)

    for p in Π:
        send [HEARTBEAT_REQUEST] to p
    alive = ∅
    start_timer(delay)

upon receive [HEARTBEAT_REQUEST] from p:
    send [HEARTBEAT_REPLY] to p

upon receive [HEARTBEAT_REPLY] from p:
    alive = alive ∪ {p}
```

Let's trace how the state updates work:
1. Initially, $\text{alive} = \Pi$, $\text{suspected} = \emptyset$, and $\text{delay} = \Delta$.
2. In the timeout handler, we check `if (alive ∩ suspected) != ∅`:
   - If there is someone that is in $\text{alive}$ and also in $\text{suspected}$, it means we previously suspected him, but he answered! So we made a mistake, and we do `delay = delay + Δ`.
3. Then for all processes:
   - If $p \notin \text{alive}$ and $p \notin \text{suspected}$, we suspect him: we add $p$ to $\text{suspected}$ and trigger `suspect(p)`.
   - If $p \in \text{alive}$ and $p \in \text{suspected}$, we remove him from $\text{suspected}$ and trigger `restore(p)`.
4. Then we send heartbeat requests to everyone, clear $\text{alive} \leftarrow \emptyset$, and start the timer with the new `delay`.

Now suppose the system is in the asynchrony period:
- $P_0$ sends a request to $P_1$, but the network is slow.
- The timer expires before the reply arrives: $P_1 \notin \text{alive}$ and $P_1 \notin \text{suspected}$.
- $P_0$ adds $P_1$ to $\text{suspected}$ and triggers `suspect(P1)`.
- At the next round, $P_1$'s delayed reply arrives! So $P_1$ is added to $\text{alive}$.
- When the timeout triggers, $P_1 \in \text{alive}$ and $P_1 \in \text{suspected}$.
- Since $\text{alive} \cap \text{suspected} \neq \emptyset$, $P_0$ increases `delay = delay + Δ`.
- Then in the loop, $P_0$ removes $P_1$ from $\text{suspected}$ and triggers `restore(P1)`.

## Part 4: Exam Guidelines & Latency Analysis

### 4.1 Exam Strategy: Code Mutations and Counterexamples

Most of the algorithms that we will see in these classes are variations of each other. If you remember one family and one technique, you can understand the other algorithms.

I will never ask you at the exam to write the code of an algorithm from scratch. What I expect is that you are able to describe an algorithm in plain English. I can ask you: *"Describe the Eventually Perfect Failure Detector,"* and you have to describe it.

Or I can give you an algorithm that is a derivative of this algorithm where I change one line. But if I do that, I will also give you the original algorithm so that you can compare and see what is the line that changes, and then understand if that line breaks some property or not:
- Does it break Strong Completeness?
- Does it break Eventual Strong Accuracy?

And if it breaks a property, you must be able to provide a **counterexample execution** showing why it fails.

### 4.2 Latency Bounds and Oscillation Before $GST$

Before we conclude, I have a single question for you.
Suppose I give you this algorithm, and I tell you that your system will stabilize to a bound of 10. Can you predict what will be the maximum value that `delay` will reach in your execution?

> **Student 1:** Yes. If you say it's at most 10, after at most 10 you can calculate how many times you could have sent it, assuming it was wrong every single time...
>
> **Professor:** Your colleague says: let's say $\Delta = 5$, I can compute how many times I have to increase $\Delta$ to reach 10 or above... But there is another hand. Yes?
>
> **Student 2:** Before! Because before stabilization, it is asynchronous!
>
> **Professor:** Exactly! You cannot predict it, because **before stabilization, the system oscillates!**
>
> In the period before $GST$, the delay could become 1 hour for 10 days, then 2 hours for 3 days. Even if the system will eventually stabilize to 10, in the period before stabilization you do not know what the maximum delay is! And so your algorithm might increase the timeout to hours before stabilization happens.
>
> So the maximum delay reached is fundamentally unpredictable. You could try to optimize by decreasing the delay when no mistakes happen, but verifying correctness when decreasing delay is much more difficult. In this course, we focus on correctness.
>
> See you on Monday!

---

### Key Formulas & Concepts Reference

| Concept / Parameter | Formula / Condition | Meaning |
| :--- | :--- | :--- |
| **Crash-Stop Model** | Permanent halt | Processes fail exclusively by crashing; no Byzantine faults, no recovery. |
| **Perfect Failure Detector ($\mathcal{P}$)** | Strong Completeness + Strong Accuracy | Never makes mistakes; requires a synchronous system. |
| **Strong Completeness** | $\forall p \in \text{Crashed}, \forall q \in \text{Correct}, \lozenge \square (p \in \text{detected}_q)$ | Every crashed process is eventually detected by every correct process (Liveness). |
| **Strong Accuracy** | $\forall p, q \in \Pi, (p \in \text{detected}_q) \implies p \in \text{Crashed}$ | No correct process is ever detected as crashed (Safety). |
| **Exclude-on-Timeout Timeout** | $\Delta > 2 D_{max}$ | Timeout must exceed round-trip network delay. |
| **Ping-Pong Message Overhead** | $2N^2 \text{ messages per } \Delta$ | $N^2$ requests $+ N^2$ replies across $N$ processes. |
| **Silence in Synchronous Systems** | Expressive silence | Absence of heartbeat implies failure, cutting messages to $N^2$. |
| **Minimum Delay Condition** | $D_{min} > \Delta$ | Prevents early delivery of round $r$ heartbeat before round $r$ starts. |
| **Round Length Condition** | $T > 2 D_{max} + \Delta$ | Prevents late delivery of round $r$ heartbeat after round $r$ ends. |
| **Eventually Perfect ($\Diamond\mathcal{P}$)** | Strong Completeness + Eventual Strong Accuracy | Trades transient accuracy for feasibility in partially synchronous systems ($GST$). |
| **Eventual Strong Accuracy** | $\forall p, q \in \text{Correct}, \lozenge \square (p \notin \text{suspected}_q)$ | After $GST$, no correct process is ever suspected (Liveness). |
| **Dynamic Timeout Inflation** | $\text{delay} \leftarrow \text{delay} + \Delta$ | Triggered upon $(\text{alive} \cap \text{suspected}) \neq \emptyset$ to exceed post-$GST$ bound $B$. |
| **Pre-$GST$ Timeout Unpredictability** | $\max(\text{delay}) \text{ unbounded}$ | Arbitrary latency spikes before $GST$ prevent bounding peak timeout inflation. |
