# Distributed Systems — Lesson 4

## Time Synchronization, Monotonicity, Cristian & Berkeley Algorithms, and Logical Causality

### Summary of Topics Covered
1. **Physical Clocks & Drift Rate Bounds**: Hardware vs. software clocks, quartz oscillator frequency variation, drift bounds ($1 - \rho \le \frac{dH(t)}{dt} \le 1 + \rho$).
2. **Clock Skew & Synchronization Frequency**: Keeping clocks within maximum skew $\Delta$ requires resynchronization every $T = \frac{\Delta}{2\rho}$.
3. **Monotonicity**: Why time must never jump backward, consequences for distributed event ordering and Kerberos authentication, and POSIX `clock_gettime(CLOCK_MONOTONIC)`.
4. **External vs. Internal Synchronization**: UTC, atomic clocks, leap seconds; external synchronization with bound $D$ implies internal synchronization with bound $2D$.
5. **Cristian's Algorithm**: Client-server external synchronization using Round Trip Time ($RTT$); accuracy bound $\pm (RTT/2 - min)$.
6. **Berkeley Algorithm**: Internal synchronization using a master-slave model, active polling, outlier discarding, and relative clock slewing.
7. **Network Time Protocol (NTP)**: Strata hierarchy (Stratum 0, 1, 2) and symmetric peer synchronization.
8. **Limitations of Physical Clocks & Causality**: Why physical timestamps fail to preserve causal ordering across concurrent events (Alice, Bob, and Mike stock trade example).
9. **Exam Exercises & Property Verification**: Detailed analysis of algorithm modifications ($k = \text{next}[p]$ vs. $k \ge \text{next}[p]$), constructing execution traces, and proving violation of FIFO delivery.

---

## Part 1: Physical Clocks, Drift, Monotonicity & Cristian's Algorithm

### 1.1 Physical Clocks & Drift Rate Bounds ($1 \pm \rho$)

So, the concept of clock. Where by clock we not mean the clock of a CPU, but clock we mean a way to measure time. And we have seen that in this case we have that one hour of real time will be measured with less than one hour, for example 30 minutes. And in this case what happens that if we measure the slope of our clock we will have a quantity that is less than one.

Why is less than one? Well, because we measure one hour real time with 30 minutes. So the slope in this case is $1/2$. This is $1/2$.

This is one. And we may have also clock that are faster than real time in the sense that one hour of real time will be measured by our clock, for example with two hours of measured time. In this case we are faster. And what happen is that the slope of our clock and this is the drift rate.

So the ratio between this quantity and the real time will be greater than one in this case. Greater than one. And in the example that we are doing will be equal to two. So we measure time two times as fast as the real time.

The real clock, what they do usually is that they oscillate between these two quantities. So it's not possible that our clock will be always fast or always slow because it depends on some condition of the system. For example we saw that quartz crystal has a frequency that changes with the temperature of the crystal. And so it depends on the temperature of our system, if we are faster or slower than the crystal.

And so for this reason we cannot apply a correction one shot in which we say I take my clock and I correct the drift by applying a certain $\alpha$ because this correction will then be broken when my clock slows down or when my clock becomes faster again. The concept that we have is that a clock is correct if this drift is between two quantities. So we can have an upper bound that is $1 + \rho$ and a lower bound that is $1 - \rho$. And my clock is correct as long as it is between these two quantities.

So this is $1 + \rho$. $1 + \rho$. This is $1 - \rho$ that is less than one because $\rho$ is a positive quantity. And so as long as my clock is between these two thresholds, I say that my clock is correct.

And any physical clock that you can have has this uncertainty, this problem that it can be either a bit fast or a bit slower than real time and you cannot predict if you are in this situation or in this situation because you can be whenever. Okay? Is it clear till now? So this quantity, this $\rho$ is what we call the bound on the drift rate.

So we can have a bound of $1 + \rho$ or a bound of $1 - \rho$. What does it mean? It mean that even if we have a clock that is correct and we measure a time of real time a certain quantity that is T1 minus T0 and this is the real time. Let's say that this quantity is one hour.

My hardware clock, this is one hour, this is the same quantity. My hardware clock can measure one hour multiplied by $1 + \rho$ or one hour multiplied by $1 - \rho$. Okay? So I can be in this two situation.

Let's suppose that $\rho$ for example is 0.5. I can measure one 0.5 hours if I'm faster or 0.5 if my I'm slower and I can create any error between these two bounds when I measure one hour of time. This is what happens with a real clock. Is it clear?

Is it clear? Okay.

### 1.2 Skew Bounds & Required Synchronization Frequency ($\Delta / 2\rho$)

So the fact that we have this bound allow us to do some computation and understand what is the frequency to which we have to synchronize our clock to have a certain skew between them. So if you remember from a previous lecture the skew is the difference between two clocks at any instant. So let's say that I take the clock of professor of process 1 at a certain time. I take the clock of process 2 as a certain time.

I measure this difference. This is the skew between the clock. Okay? It's just the difference at any point time.

Let's say that I want an application in which at the skew that I can tolerate is less than a certain $\Delta$ that can be any number, that can be one hour. It depends on the application. So I want that my two clocks in the system are synchronized in the sense that at any at any time I measure them I find that the difference between them is less than delta. When delta is a quantity of the system, it can be one second, it can be 30 minutes, it depends on the precision that we want between the clocks.

Let us also suppose that we have a synchronization primitive that is perfect. For now I do not discuss how this is done. You cannot do a perfect synchronization, but let us suppose that you can. Let us suppose that you can have a special algorithm that when you run this algorithm the clock one and clock two becomes perfectly synchronized.

Perfectly synchronized means that they have the same value. Okay? So if they are perfectly synchronized at this time that is zero for us. This is the start of our experiment.

We have that their difference is zero because they are perfectly synchronized. So at this point the skew that is clock one zero minus clock two zero absolute value because I care about the difference, not the sign of the skew. At this point is zero. Okay?

And then time starts passing. So time starts passing means that this clock will do its stuff, will start you know counting time. And this clock will also start counting time. And then I want to measure again at a certain T that in our example is T equal to $\Delta / (2\rho)$.

What is the difference between these two clocks? Okay? It is it clear what I want to do? We start from a difference that is zero.

And then I say I have two clocks that are correct at a time T equal to delta over $2\rho$. What is the difference, the maximum difference between these two clocks? What is the maximum skew that I can have? And what is the worst case?

The worst case is that clock one goes as fast as possible and clock two goes as slow as possible, right? To have the maximum difference between them I need that one clock is on this line and the other clock is always on this line. And this will make the maximum difference between them, right? Because any value in the middle that I am inside the difference will be less than if clock two is the slow one and clock one is the fast one for this entire period.

Is it clear? Is it clear till now? Okay. So let's see that we go to this instant.

What clock one will measure if it's the fastest one? Well, if it's the fastest one will measure this quantity that is $1 + \rho$. So we are on the bound of the fastest that we can. You cannot be more than this otherwise you are a faulty clock and we are measure we are only considering correct clock multiplied by the difference of time that we are measuring.

But what is this difference of time? Is T minus zero, so is law sorry $\Delta / (2\rho)$. So this clock will measure $1 + \rho$ multiplied by $\Delta / (2\rho)$. And then if you do some simplification this is what we you will have.

Okay? So this is the time measured by clock one. Is it clear to everyone? Is it clear?

So for clock two what we have to do? Clock two is the slow one. The slow one means that the drift rate of this clock will be $1 - \rho$. So we will measure for this interval of time T we will measure $1 - \rho$ multiplied by the interval of time.

And so we will have a measure of $\Delta / (2\rho)$ minus $\Delta / 2$. Is it clear? If we do if we do the difference between this two quantity, so I do this one minus the one below, so I do this minus this absolute value. This and this will simplify and so difference will be delta.

Okay? Is it clear? So after this quantity of time the difference between the two clocks will be delta. Is it clear to everyone?

So let's say that I want to have the clock synchronized on one hour. What this equation is telling us? That if I want delta equal to one hour I have to synchronize again the clock after this quantity, after one hour divided two multiplied by $\rho$. Because if I go after this quantity, difference between them will be more than one hour of two milliseconds, but more than one hour.

So what is telling us that if we want to keep this clock synchronized of delta at this point what we have to do? At this point if I want a synchronization $\Delta$ between the clock, what I have to do at this instant between clock one and clock two? I have to synchronize them in some way. So I have to run again perfect synchronization.

The algorithm that we do not exist but we assume that exists. So in this way this clock becomes perfectly synchronized. So the skew becomes zero at this point. But then when I have to synchronize again to keep the difference of $\Delta$, what is the next instant of synchronization?

What is this quantity? Two times T. And then I have to synchronize again at three times T this quantity here. And then a four times T, five times T.

So I have to synchronize on a frequency that depends on this quantity. Because if I synchronize after between this one and this one is more than this quantity the difference and so the difference between them is more than delta. Okay? Is it clear?

Is it clear? And so if we examine $\Delta / 2$ multiplied by $\rho$, what this equation is telling us is that if I want a synchronization that is smaller when the delta is for example one second, I have to synchronize more, right? Because I have to synchronize more, the more this delta decreases and approach zero. If delta is fixed and I have different $\rho$, I have to synchronize more, the greater is $\rho$.

The more my clock is imprecise, the more frequent I have to synchronize to keep them between $\Delta$ difference. Okay? If I have two law where the difference of factor is two, for example I have $\rho_1$ that is equal to 0.5 and $\rho_2$ that is equal to 0.25. In this case, this is $\rho_2$, in this case I have to synchronize in this case.

Sorry, I have to synchronize two times faster of this case with two times the frequency to keep the same bound $\Delta$ between the two quantities. Okay? Is it clear? So even if we have a perfect synchronization algorithm, any clock synchronization algorithm has to be continuous.

And your skew between the yourself and the source that you use to synchronize will be dependent on the on the frequency of synchronization. So the less you synchronize the more you are different from the synchronization source because this quantity becomes greater and so the delta is greater and greater. Okay? Is it clear?

Is it clear till this point that you have to keep to synchronize in until infinity every few second or every few $\Delta / \rho$ you have to synchronize again and again and again and again. Okay.

### 1.3 Monotonicity: Why We Cannot Set Time Backwards

And once we have to synchronize we are in this situation, right? We are in this situation we have clock one that is measuring something and clock two that is measuring something else. And the difference between them is delta. Okay?

But we want to synchronize this clock. So we want to synchronize this clock means that we want to make them equal, right? So we have this quantity one and we have this quantity two. And what we want to do is to make this quantity equal.

So there are several way in which we can do this. One way is to add something to this quantity. For example I can add $\Delta$ to this quantity. Do you agree?

And once I add $\Delta$ to this quantity I have that this two becomes equal because this becomes equal to $\Delta / 2$. Okay? And so this one will become equal to this one. So I take the clock that is past in the past and I jump it in the future.

This is one possibility. Right? Let's put number. Let's say that this is measuring 12 o'clock and this is measuring 11.

To make it synchronize it I can move this one to 12. And I synchronize them. This is possibility one. Okay?

What is the second possibility? What is the second thing I can do? Take away from this guy. I take something from this guy.

So this guy is at 12 and I put this guy at 11, for example. And this one I don't touch. This is also another possibility. I remove something from the one that is in the future.

Okay? So I apply a correction like this. I remove $\Delta$ from this guy so that the two becomes equal. Okay?

I can have the two possibilities. Either I remove this one in the future or I have to move this guy in the past. There is no other way to make them perfectly synchronized at the same moment. Okay, what do you think is the best thing to do here?

Let's say that I you are you are an engineer or a computer scientist that you are designing a system. I come to you and I say there are there is option one that is to remove things from the option one that is removing things from the guy in the future. Or there is option two that is add things to the guy in the past. Which one would you implement and why?

What do you think is the best to do? If you're talking about things in general, add things to the way in the past because that way you don't lose anything. But in this case time you're not actually past. Okay.

So your colleague is saying I don't like to remove things from people. So I add things to the guy in the past because in this way I do not remove something from someone. Okay? And in this case it's time.

In this case it's time. No one moves, right? And even if time is the most important thing, but So why option two is better than option one? Why option two is better?

Is better to move this guy passing the in the future than moving this one in the in the past. Okay? Why? Mhm.

So your colleague is saying this time can be used by algorithm, right? We are in an operating system. This time is used by the code that you write. Okay?

He's saying if my code is assuming that times goes only forward and this is the assumption that everyone of us is doing. And then I have something that puts time backward, then strange things can happen. Very strange things can happen. And it is right.

I mean putting time backward is actually terrible in a lot of situations. For example let's say that this is my time. Okay? I'm a process.

And at this point I'm doing something. For example I create a message and I put my timestamp on the message. I put the time in the message. So I say this is message 12 o'clock.

Okay? Then the second after I create a new message that is the blue one. And what I have to put? I have to put the timestamp to this blue message.

And what you expect that you I write this is message 12 12 o'clock and five minutes. Okay? This is what we expect because this message was created after this one. So I expect that the time of this message is greater than this one.

This is intuitively what we expect. Right? But let's say that in the middle here the synchronization algorithm kicks in. And the synchronization algorithm puts the timestamp.

So it puts the time at 11. So at this point the synchronization algorithm says your time is 11 because we have to synchronize. And so here I create a new message and this message will have time 11. And so if someone see the timestamp of the message will say oh but the blue message was created before the black one because the time is you know in the past.

But this is actually not true. So if you do click like that, if you put the time in the past, you cannot use time to order anymore the event even on the same process. Even on the same process you break the concept of time to order event. Okay?

Is it clear? And there are authentication algorithm that works with time, for example Kerberos. In Kerberos you will see probably Kerberos in some networking classes. Is an authentication algorithm in which you use ticket to authenticate to a server.

And this ticket have a timestamp that is the validity time. And if you put the time backward on the server that verify the timestamp, then it's possible that it accept again an old ticket. If you are on the server and you copy the ticket in your memory, then you send the ticket again and it's valid because the server went backward in time to synchronize. Okay?

So for this reason when you have to synchronize actually the best thing to do is to do option two to move thing in the future. Okay? Many algorithm what they do is that they do not move things in the future abruptly means in one instant. Is that to make this clock goes faster for a bit.

So in order to avoid the jump many synchronization algorithm what they do, they say okay I'm behind. I will make my clock faster for five minutes. So in this five minutes, you know, I arrive at 12. But no one will see a jump from 11 to 12.

That can be even ugly to see that you see a jump in of one hour in one second. Okay? Is it clear? Is it clear?

Is it clear why you cannot go back? Okay, this property of not going back is called formally monotonicity of the clock synchronization. So a clock synchronization algorithm is monotone if we have real time T prime that is after real time T. And the clock of T prime will always be greater than the clock of T.

This means that you cannot go in the back in the past. So if I have a time in real time that is after a certain time my software clock that I take at time T one cannot be less than the software clock that I can take at time T. So this is avoiding to jump back in the past. You cannot do.

He's saying if I have 12 and 11, my software clock can be 11:30 and 11, but I cannot have here a quantity that is less than 11. I cannot go backward in time. How you guarantee monotonicity in the soft in the software clock? Essentially by being careful to modify $\alpha$ and $\beta$, especially beta because if you put a negative $\beta$, you go in the past.

So we will not see the difference on how to do it. Okay? So we assume from this point that how you set the clock is something that you do accurately. So for the rest of the lecture we will not discuss about if we have to set the clock in the past or in the future.

So in the algorithm that we will see sometimes I set in the past the clock just for simplicity. In real life, in many applications, you cannot set the clock back in the past because it can create a mistake. Okay? So just to show you that the things that I say are real if you go on the documentation of the POSIX system, UNIX for example, there is the `clock_gettime()`.

To get the time you can call this C function in `libc`. And it gives you the time. And you can specify `CLOCK_MONOTONIC` when you request the time. And over this system we will give you a clock that cannot jump in the past.

Okay? Because the normal clock of UNIX, if you ask it, can jump in the past. If you use this function, it will give you a clock that cannot jump in the past. So that is different from the one that you see, you know, right in the right upright corner or lower left corner, whatever is your interface.

This clock cannot jump in the past. In Python there is the same function. There is a function that is `time.monotonic()` that give you time that cannot get in the back in the past. Okay?

Otherwise if in the application that you have built until now you were using the normal time, that time can jump in the past. So probably there is a bug in the application that you wrote until now. Okay? If you were using clock without this monotonic clock.

Is it is everything clear? Question? Question on something? Question on something?

Question on something? Okay. So and in our let's say truth experiment we have we have seen two clocks, clock one and clock two. And I say here we have a perfect synchronization.

And then there is a certain time and after the time we have to do perfect synchronization again, perfect synchronization again, perfect synchronization again. But I was not describing this algorithm. I was saying there is something for which this clock cannot perfectly synchronize.

### 1.4 External vs. Internal Clock Synchronization

So now in this part of the lecture we will see this something, how we can do actual the synchronization, how we can create an algorithm in which C one discuss with C two and they decide how to synchronize their clock. So in order to discuss about the synchronization we have to talk a bit about Coordinated Universal Time (UTC) or Coordinated Universal Time (UTC) (UTC) that is UTC. So UTC is the international standard for time. When you talk about time you are talking actually about UTC.

What is UTC? UTC is a standard to measure time that is based on several atomic clocks. The atomic clock are really precise clocks that are based in several countries. And they took the average between them and this average is the real time for human.

Okay? If I'm not if I'm not wrong there are 70 of them. There are 70 atomic clocks that are and there should be one in Canada in Italy that participate to this UTC. And this atomic clock they do the average between them and they decide what is the real time.

Okay? So when I talk about real time I'm talking about this UTC. When I say I want to synchronize with real time, I want to synchronize to this UTC. How do I synchronize with UTC?

I can buy, you know, devices that uses for example satellite to synchronize with UTC. If you really need precise time for some experiment or whatever, you can buy something that connect to a satellite and give you something that is similar to this Coordinated Universal Time (UTC) (UTC). Okay? This Coordinated Universal Time (UTC) (UTC) is really an interesting topic.

If you want you look it up on the internet you can find several pages on topic. Actually it's not really equal to the atomic time of the atomic clock because sometimes they have to add a second. They have to add a second to this UTC because this UTC is synchronized with human activities. And you know the earth when he rotate around the sun is not perfect the rotation.

So sometimes they have to add a second in order to make UTC consistent with the sun and whatever. But we don't care about this. For us UTC is perfect. And UTC for us is the is the authority, is the external entity that give us time.

If I have this authority, I have this external entity that give me time I can decide to synchronize with this authority, right? This is one standard that I can do. I can say I want that the clock, my computer, is synchronized with this external source. And this is the so-called external synchronization.

So in the external synchronization we have that the clock in our network, the clock of computer one the clock of computer two, the clock of computer three, the clock of computer 10 they are all synchronized with this external source as that for us is UTC or something connected to UTC. Okay? Is it clear? In external synchronization I want that the device on my network are synchronized with UTC.

On your cell phone you are running an external synchronization algorithm because you have a network with just one device. And this device is synchronized with the external server that is UTC. If we say that T, a quantity greater than zero is the synchronization bound that we want with UTC, we say is that the clock C one, C two, C three, C M are externally synchronized with the external source S. If for each interval of time and for each instant of time actually we have that the difference between the clock of the source and the clock of my device is less than D.

Okay? I want that the skew between my device and the UTC is less than D. And here I can decide according to what I need. It can be one second, it can be one hour, it can be whatever.

Okay? Is it clear? So we say that the clocks are accurate within a certain bound that is D. And this is external synchronization.

So we have our network. And we want to synchronize with this external entity. But there is also another kind of synchronization because it's possible that I want that my network is synchronized between them. But I don't care about the external world, right?

I can have an application in which I have a network, for example a that is that cannot communicate with the external world for some reason. But I want that the device in this network are synchronized between them. I don't care about the external world. Okay?

Let's say that we have to do something, some activity, and we synchronize our clock so that we can do this activity. And we don't care what the people in the other room are doing because we want just to do our job. And this is the second kind of synchronization that is called internal synchronization. In the internal synchronization I want that if I take the clock of computer one, clock of computer two, clock of computer three, clock of computer N of our network, I want that they are synchronized between them, but I don't care about UTC.

And so in this case I always have the synchronization bound D. And I say that my clock as are internally synchronized if for every pair of device in my network, for every pair between one and N I have that the clock of the first device minus the clock of the second device, absolute value, their difference is less than D. So they are synchronized between within a bound of D. Okay?

Here we say that the clock agree within the bound of D. Actually at the exam I don't care about the terminology. Agree or are within a bound is important that you can write this stuff. Okay?

That you know what you are you are talking about. Is it clear what is the difference between internal and external? Okay. Is it clear to everyone the difference?

So what is the relationship between internal and external? So if it is clear to everyone, there is a relationship between them. What is the relationship? What is the relationship between internal and external?

The relationship I mean the logic relationship that means one if one implies the other, if they imply each other, or if they are totally disconnected. What is the relationship between internal synchronization and external synchronization? What is the relationship between this two concept? What do you mean?

Okay. Your colleague is saying external synchronization implies internal synchronization in the sense that if I have a system that is externally synchronized, this system is also internally synchronized. And you are correct. And what is the relationship between the bound?

Let's say that I have a system that is externally synchronized with a bound of D. My system is internally synchronized because the clocks are close to each other because if they are close to one external one they are close also to each other. But what is the bound in this case? What is the bound?

At most D. So your colleague is saying if I am externally synchronized with a bound of D, I'm also internally synchronized with a bound of D. This is your claim. Right?

At most D. So it means that they are less than D, right? Wrong. Okay.

Someone wants to try again? Someone wants to try again? No, it's not the opposite. So if we are externally synchronized with a bound B, we are internally synchronized.

But what is our bound? And my bound means if I take two guys what is the maximum difference between them? Two D. So your colleague is saying two D.

Let's see what is the reasoning. I have a group and this group is synchronized with distance D from this guy from the source. Do you agree? Okay.

So it means that I can have this guy that is at plus D, the purple one. I can have a guy at this plus D, right? And I can have this green guy that with respect to the source So sorry this is the source. Let's call it S.

So I have the source S and I have that the purple guy is plus D with the source. So if the source is zero, this is measuring time D. And the green guy has to be the opposite. So the green guy can be minus D.

This is also possible, right? Because the difference is always D. So this is zero and this is minus D. Okay?

Is it clear? So what is the difference between the purple guy and green guy? Two D. Okay.

Because if I need if I do D minus the sorry yes D minus D this difference is two D. Okay? Is it clear? Is it clear?

Let's put number. Let's say that this is 10, the real time. We are synchronized with one hour of UTC. The purple guy is at 11.

The green guy is at nine. Is always one hour with the source. Between them the difference is two hours. Okay?

So if you are externally synchronized with a bound D you are internally synchronized with a bound of two D. Is it clear? Yes. Clear?

Clear? Okay. Here on this line we discuss the synchronization and the fact that the bound is D and two D. Okay?

So for when you study there is the same thing on this line when you read. And now let's look at the nice thing that are the algorithm. So now we have discussed the external synchronization, internal synchronization. We will see an algorithm for external synchronization and an algorithm for internal synchronization.

Okay? Is it is it clear?

### 1.5 Cristian's Algorithm for External Synchronization

So the algorithm for external synchronization that we will see is the Cristian's algorithm that is extremely simple, but is the basis of many synchronization algorithm. For example NTP network time protocol that is used in real life uses something really similar to Cristian with a bit of differences. And then for external synchronization sorry for this is external synchronization. This is external ex For internal synchronization we will see the algorithm of Berkeley that is a different algorithm for Cristian that can do internal synchronization that synchronize a network between them.

Okay? Clear until now? So first let's see the Cristian's algorithm for external synchronization. So in the external synchronization what we want to solve?

We have our network that contains several processor, processor one, processor two. Let's say that it's just a network of two. And they want to synchronize with the external server with S. Okay?

In the Cristian's algorithm everyone will synchronize with S alone. So P one will not talk with P two. P two alone will synchronize with S and P one alone will synchronize with S. So you do not they do not interact with each other because they want to synchronize with the external source.

So they have access to the external source. And everyone of them try to synchronize with this external source. Okay? Is it clear until now?

So how do we want to synchronize with our external source? So we are here. We have a we have a certain time. Let's say that our time is 10.

And at this point I want to synchronize with S. What I have to do? What action I have to do to synchronize with S? What action you have to do if you want to synchronize with S?

Yeah, you have to send a message to S. Okay? Because if you wait you can wait. No one will know, no one will answer.

Okay? If you want something usually you have to ask, right? This is a So what we do? We send a message to S and in this message what we have to do?

We have to ask something. And what we can ask to S? What is the easiest thing to do? What I have to ask in this message to S?

What is your time? Right? If I want to synchronize with your clock, I have to ask what is your time. And so this is what is your time.

So we send this request. And let's say that time is 11 at this point. Okay? So S has time 11, 11, 10.

And S what we do? What is the easiest thing that S can do when he receive the request, what is your time? It my time is 11. Okay?

So the easiest thing is that he replies with this purple message. Let's say that this is purple. I don't know. It seems purple.

It is purple message and say this is my time and my time is 11. Okay? This is really the easiest thing that you can do. And now at this point what you do?

You set your time to 11. Okay? This can be the first tentative. The first tentative can be okay at this point I set my time to 11.

Right? But if I set my time to 11 at this moment of time what is the real time on S?11 plus $\Delta$.11 11 plus $\Delta$, right? Because when I set the time here at 11, the time on the server is not anymore 11, is 11 plus $\Delta$. So if I set at 11 at this point I'm not perfectly synchronized with the server.

There is a mistake. And what is this plus $\Delta$? On the drawing there is the plus $\Delta$. What is the plus $\Delta$ on the drawing?

Wait just toThe time for the purple message is this time right here, right? The plus $\Delta$ is this delta. Do you agree? If you know this delta, what you can do?

Here if you know the delta, let's say that you know the delta you add At this point what you do? You add $\Delta$. You add $\Delta$. I do 11 plus $\Delta$ I set at this point.

Okay? So the entire trick is to understand the length of this arc. Okay? Is it clear?

Clear? Yes. But how do I do? I mean this is a message that start at this point and then we'll go inside the internet and then we'll reach you.

So what can be an idea to measure this delta? How you can do? Yeah. Okay.

Okay. So your colleague is saying a nice observation. He says this time I can measure globally. I can say I send a message at this time, right?

I can in the code I can call the `System.currentTimeMillis()` and I get the milliseconds of this time. Then I can measure when I receive this message at this time locally and I can measure this entire quantity in yellow. This I can do. Right?

Because I can say I send a message now and then I will receive the message after two seconds and I know that those are two seconds. Okay? Notice that since the network time are usually fast I can say the time is really two seconds because the skew in actually is will be milliseconds. The skew in milliseconds, the drift rate in milliseconds will be negative.

And so your colleague what he's saying is saying I put the quantity equal to this quantity, this yellow things that is the Round Trip Time ($RTT$). And so I put my clock at this time to 11 what the server is telling me plus $RTT / 2$. The Round Trip Time ($RTT$) I can measure is the time between my send of the request and the send of the reply. I divide this time by two and I say this is the delta.

Okay? Is it clear? Is it clear? And this is the Cristian's algorithm.

So the Cristian's algorithm works in this way. We have our client. We have our server. The client send a request to the server.

Send a request at this point. The server receive the request and reply with its local time. You receive the reply. And then what you do is that you compute the Round Trip Time ($RTT$).

So you compute your local difference in time according to your clock between this instant and this instant. And this is T two minus T one is for us is RTT Round Trip Time ($RTT$). And you put the clock here to your clock is equal to server clock plus $RTT / 2$. And this is what we do.

Okay? Is it clear to everyone? Is it clear what we do? Because we say since this is the Round Trip Time ($RTT$) I have that my delta that is this purple guy.

This is more or less $RTT / 2$. Okay? This is the assumption that Cristian is doing. But this is an assumption that we are doing on something.

We are assuming that the delay of the network are symmetric. So I am assuming that the delay that the message takes to go from my self to you is more or less equal to the delay that the message from you needs to reach me. I'm assuming symmetry of the delay. If the delay are symmetric then this quantity is equal to this quantity and when I do $RTT / 2$ I do not make mistake.

I make a multiple mistake because there is a drift rate here. Okay? But this is negligible because we are talking about milliseconds. Okay?

Is it clear? Is it is it clear to everyone? But this works if the delay are symmetric. If the delay are not symmetric, what can happen is that the message that goes from my self to you is really fast.

And the message that goes to you to my self is really slow. So I have the delay only on one side of the communication. And when I do $RTT / 2$ I make a mistake. Okay?

Is it clear?

### 1.6 Accuracy Bounds and Network Delay Asymmetry in Cristian's Algorithm

So let's look at this in detail. Let's look what is the limit on the accuracy of Cristian's algorithm. So in this case we are happy. We are happy.

We make no mistake with the delay are symmetric. But there is a case in which we are not that happy. We are not that sad either because we do not make a much of mistake, but still we make a mistake. And the case in which we make a mistake is if the message from me to you is really fast.

Okay? Is really fast means that we take the minimum time of the network because every network has a minimum delay. Okay? Every network you have a minimum delay at least is the speed of light.

Can be more. So it's possible that the first message gets the minimum delay and the reply gets the maximum delay of the network. Remember since we are in clock synchronization the network is synchronized. So there is a maximum delay.

Okay? Clear? If the network is asynchronous you cannot synchronize clocks. So in this lecture we are assuming that the channel have maximum delay.

And in this case what happen? It happens that we measure our Round Trip Time ($RTT$). We do have $RTT / 2$ and we take this point here that is not the real point of the server. This is a mistake because what we want is order the purple quantity as a correction.

But when I do the correction of $RTT / 2$ I will be correct only by this quantity. This one done in yellow. Okay? So I will make a mistake because I will set my clock my clock is equal to the server clock plus $RTT / 2$.

But I should have set my clock to this quantity right here. This is the real time. The real time is my clock is equal to server clock plus this quantity in red. Okay?

Is it clear? What is this quantity of red? What is the measure of this quantity? How long is the red part?

Round Trip Time ($RTT$) minus mean. Right? This quantity in red is equal to the Round Trip Time ($RTT$) minus mean. Do we agree?

Okay. Is it clear to everyone? So what is the mistake that I'm making? The mistake the that I'm making the accuracy is this one minus this one and this is yellow because this is the real time and this is the time I set my clock.

So what is the accuracy? It's the difference between my time and the real time on the server. And so if we do the difference between these two quantity we will see that the absolute value of this one S and S they simplify, right? And so the absolute value of this quantity will be equal to $RTT / 2$ minus mean.

Okay? This will be the difference in accuracy. Is it clear? Notice that I can have the I can have the opposite situation in which I make the same mistake with the different sign.

And what is the opposite situation? The one in which also make this same mistake as a absolute value but with a different sign. When it gets to time to get to the server and back it's faster. Yes.

The contrary is this one in which there is minimum here the server reply minimum to me and the delay is only in the request. Okay, these two situation are symmetric if you do the count. One you get minus RTT minus mean. The other you get RTT over two minus mean are the same.

The only difference is that in one you make an error a positive error and the other one you will make a negative error on your clock. One you set your time too much in the future with respect to the server and one you set your time too much in the past with respect to the server. Okay? So on this line there is the Cristian's algorithm and on this line there is the accuracy with all the counting for the accuracy for when you study.

Okay? So notice that a lot of people think that the Cristian's algorithm you need a small delay on the network. Actually this is not the case. The important thing is that the network is symmetric.

So if the network is symmetric we don't care about how long is Round Trip Time ($RTT$). If the network is symmetric we still make no mistake. The problem is that when the network is not is not symmetric which mistake we make? Well, it depends between the difference between Round Trip Time ($RTT$) and the minimum.

The greater is this difference the less is the accuracy of our Cristian's algorithm. Okay? Clear? Is it clear to everyone?

Okay. Of course there is a problem of the Cristian's algorithm. There is a problem if there are failures. And who can tell me what is the problem of Cristian's algorithm in case of failures?

There is a big problem. When the message doesn't reach the server. I mean crash of the process. If there are crash stop failure if the process can crash Cristian has a big problem.

Cristian has a big problem if someone crash. If a client crash is a problem No. If the server crashes, if this guy crashes then all the processes are done because they cannot synchronize. They try to synchronize with someone but they cannot.

Okay? So in real life what you do? You use several server. There are several servers and you try to synchronize with the first one, the second one, the third one, whatever.

And you take more or less the first one that answer or you can take the average of them. There are several strategy that you can do. But usually to avoid a single point of failure this is called in a system a single point of failure when we have you have a single machine that if goes down breaks the entire system you usually you add redundancy to the server. Okay?

And this redundancy can help you even in if the server does not crash but has some problem. Let's say that a clock that has a problem or is my issues whatever. If you use several server and you try to do the average between them you get more or less avoid certain kind of failure. You can you can mask them.

Okay, let's let us do 10 minutes break and then we will see the internal synchronization algorithm ---

---

## Part 2: Berkeley Algorithm, NTP & The Need for Logical Time

### 2.1 The Berkeley Algorithm (Master-Slave Internal Synchronization)

In the previous part we discussed how a system is synchronized with an external source. In an internally synchronized network between them, there is no concept of UTC. What is the idea of the Berkeley algorithm? In this case we have our network and the only things that we want to do is to synchronize the device of this network between them.

So Berkeley uses a structure that in some book is called master slave where there is one of the server that has the role of the master and what it does is to the client to ask them the time and then we send to all these client and themselves the correction. So when you have this structure when you have someone that make the other to something is a they call it master slave infrastructure or is called it the leader replica infrastructure where you have a leader that decide the action and then push this action on replica. So what the master does is to in the is to ask the time to everyone. So periodically at every interval he sends a broadcast and he asks to computer one to processor one giving me your time, give me your time, give me your time, give me your time and so on and so forth.

And then he received the time from everyone, he computes a correction and then he send to everyone the correction and say you have to go to this time, you have to go to this time, you have to go to this time. What is the idea of with respect to Cristian? That the correction that you compute is more or less the center of all the clock. So you can you can correct the clock in several way.

You can decide that one of the clock is the correct one and then you say to everyone you go to that clock. Or another way to correct the clock is that we compute more or less what is the center between all the clock. So if your time is 12 and my time is 11 we compute to the same the center between them that is 11:30 and then we set everyone to 11:30. This is the idea of Why this idea of the center makes sense?

Because if you correct to the center then you minimize the quantity the sum of the quantity that everyone has to move to go to the center. Yes? And then you have the one to a good clockYes. Okay.

Yeah, as I said we don't care about going back. There are application which you can go back. Okay? Usually what happen when you have to go back?

It happens that you slow down your clock. Okay? In real algorithm for example in NTP instead of going back you slow down your clock. Okay?

You slow down your clock until the other catch up with you. Since slow slowing down the clock in the example make the example extremely long I put the time backward for simplicity. But usually what you do is that you slow down the clock. But also this is a parameter of the algorithm.

For example in NTP there is a parameter that is called the slew, something like that. And it tells to your local client how much you can slow down. And after a certain quantity you stop slowing down and you go backward in time even with NTP. Okay?

This is a configuration that you can do locally as a as a as a design and in your client you can specify how much you can slow down or if you have to go backward because you have to go backward. Okay? Is it clear until now? How does it work practically?

So the server will ask to every process the time. So let's say that I'm time 10 you are at time 12 this guy is at time 11 this guy is also at time 11 and let's say that this other guy is at time nine. So the server compute the difference, ask to everyone the time. Give me time, give me time, give me time.

They will send the time and we compute the difference between himself and everyone. So in this case I compute the difference between myself and process one and this difference is two hours. Then I compute the difference between myself and process two and this difference is one hour. Then I compute the difference between myself and process three and this difference is also one hour.

And then I compute the difference between myself and process four and this difference is of minus one hour because process four is in the past with respect to the to the master. Okay? So you compute all these difference and then what you do is that you compute the average of this. So I do two plus one is three plus one is four plus one is minus one actually.

So is three. So the medium distance is three hour divided by the number of peers in this case that is four. So I'm computing the average of all these difference. Okay?

The average is three over four because two plus one plus one minus one is three hours over four. Okay? And this is the average let's say correction that you have to do. This is the average point.

And three divided by four would be a certain quantity that is a bit I should have done better. That's the better. Let's say that this is 12. So if this is 12 this four hour and the average becomes one hour.

So it's a it's it's a bit better. Okay? Because I have a an integer, I don't have to have float something with a comma. Okay?

And so what I do? I compute for everyone the correction to this average. So for myself my correction will be to go plus one because I have to go one hour in the future to reach this average. For this guy the correction will be minus one because this guy is two time two hours in the future.

The correction is one hour so I have to do one minus two and the correction will be minus one for this guy. So this guy has to be go one hour in the past. The correction for this guy will be minus one because this guy has to go one hour or in the past. I have to give a difference between this quantity and the average that I compute.

For this guy what will be the correction for this guy? It's zero because this guy is already up at 11. Okay? And the because I do one minus one and is zero and the correction of this guy will be one minus one that is two hours and so this guy would has to go two hours in the future.

So this is plus two and this is plus zero. And everyone then update to their clock. So they update to the clock and once they update to the clock they will be everyone will be at the 11. Okay?

We will see another example. So the idea is that the server asks to everyone the hours. They receive the hours to everyone and do the difference between the hour that receive and the its hour and this is the correction. Then he does the average of all these correction and computes an average correction and then for everyone computes how much he does to add to reach the average correction that is the quantity minus the average that we computed.

Let's look at this with another example. Okay? Let's look at this example right here. We have the server that is at three times and five minutes.

We have this other server that is at two hours and 55. This is at three hours and this is at three hours and 25 minutes. So what we have to do? We have to ask the hour to everyone and the server will get all the hours.

Then the server will compute the delta the difference between every clock and the master. The difference between the clock of the master and the master what is the difference between the clock of the master and the master? Zero. Because the difference between three hours and five minutes and three hours and five minutes is zero.

### 2.2 Outlier Rejection, Averaging & Slew Adjustments

Then we have to compute the difference between the clock of the master and the processor one. What is the difference between the clock of the master and the processor one? 10. Is plus 10 or minus 10?

Minus 10. Minus 10 because is in the past with respect to the master. So this is minus 10 minutes. The difference between the second one and the master and what is this difference?

Is minus five minutes because is five minutes in the past. And then I have to compute the difference between this one and the master. And this difference is plus 20. It is plus 20 because three and 25 minus three and five is 20.

Okay? Now if you look at this difference is much larger than the other. Okay? So usually in the Berkeley algorithm you have a threshold and if the difference of someone is above this threshold you say that this guy is not correct and you remove it from the computation of the average.

But because what is the idea? If this guy is too much difference from the other he will move it. He will move the average of the entire group. Okay?

So you have a threshold and you say if you are above that threshold I will remove you from the average. So I compute the average of the correction for everyone and I will send also to this guy you have to move to this correction. But I do not use the guy to compute the correction. Because what is the idea?

Assume that this one is faulty. Is faulty in the sense that he gives you wrong information. It's possible that he tries to make everyone jump in the future by saying okay I'm one hour in the future. And you compute the correction and you make everyone jump.

Then you do the second the synchronization and this guy will tell you to everyone I'm one hour in the future. And he makes everyone jump and jump. So at every correction you correct the clock of everyone of a large quantity just because this guy is claiming to be much in the future. So you use this mechanism of the threshold that depends on the system to remove the one that are too far in the future or too far in the past from the computation of the average that we use to correct.

Okay? Is it is it clear? And now we have to compute the average of the correction. So this guy we remove.

We have to compute the average of zero, 10 and 15. And this is minus 15 divided by three because there are three entities and this is minus five. Okay? So what does it mean?

It means that in the average the time that we have to go is minus five from the master. Okay? Now how we compute the correction? The correction of the master will be the delta of the master minus the average.

And in this case sorry it will be the quantity. It will be yes. The average minus time the difference of the master. And so in this case the master has to correct of minus five.

Okay? So there is a bug in the figure. So the correction of the of guy one will be will be the average minus five minus 10 because this is minus 10. So this becomes plus 10 and will be plus five.

So this guy has to go plus five in the future. If you I go minus five in the past I go to three. Right? If this guy goes five minutes in the future to which time he goes?

Is at 2:55. To which time you go? If you go five minutes in the future 3:00. So they are synchronized.

Okay? So here there are minus 10 minus five plus 20. Those are mistake in the sense that those are this quantity here. So there is a bug because is the same figure.

This is not the correction that you are sending to people. Okay? This is just different. This minus 10 minus five plus 20.

Clear? Okay. Now let's compute the correction for the second guy. The correction for process two.

What is the correction for process two? Try to compute the correction yourself so we see if we What is the correction for process two? Is the average minus the delta of process two. What is the average minus the delta of process two?

Is zero because is minus five minus five that is plus five and is zero. And this guy is at three. So it does not have to move because is in the middle of the group. So is the one that is okay.

What is the correction of the third guy? The correction of the third guy is always the average minus the delta of the first guy. So what is the correction of this guy? Average minus $\Delta P_3$, which is: > **Student:** Is minus 25..

So there is minus five minus 20 is minus 25 and this was a 3:25. If you remove 25 it goes at three. So after this step everyone is at three. Okay?

So what is the idea? I compute the difference between the server the entity and the master. And this would give me a certain set of quantities. I remove the one that are above certain threshold.

Then I do the average of everyone that is remaining and this give me the average correction that everyone has to do. And then I compute how much you have to move to go to the average correction. And is possible that someone does not have to move because is already at the correct time in this example with this guy. Okay?

Is it clear? Notice that in this case if someone is faulty is not a problem. If someone is faulty is not a problem because if he claims to the master to have at times that is too much difference from real time the master will discard it. If he does not answer to the master the master after a bit will say okay I compute the correction without you and then I will send you the correction.

But also in this system there is a single point of failure. So what is the single point of failure in the Berkeley algorithm? The master. If the master crashes or if the master is not correct he will create problem.

Okay? He will create problem because is possible that does not send the correction or send the wrong correction to people or if he crashes stop working. Fixing this case ah okay here I have the figure that has things because I have the animation. Sorry.

So on the slide there is also the figure with the actual correction because there was the animation next slide. So the problem with the Berkeley algorithm is that if the master crashes you can more or less try to do something. You understand that the master is dead and you elect a new master and this you can do we will see in the future lecture that there is a primitive that is called the leader election primitive. And this leader election primitive allows you to find someone that is the leader.

So if the master crashes this leader election primitive can trigger and can say the new master is this guy. If the master is by sometime then is not easy at all because he can send wrong correction whatever is not so easy to understand that he's sending wrong correction. So to tolerate a byzantine master you need fairly complex algorithm where you have multiple master and whatever that we will not see. Okay?

It's not something that we will we will we will touch. Okay? Question on Berkeley? Question on Berkeley?

Question on Berkeley? Question on Berkeley? Okay. Yes.

Please. Can the master be externally synchronized? Yes. Okay.

In case the master is externally synchronized Berkeley becomes an external synchronization output. Okay? In case someone in your network is externally synchronized anyone and you use Berkeley you becomes an external synchronization because you use that someone to synchronize. Okay?

Is it is it clear? Even if Even if Yes because you use it to compute the correction. The moment you use it to compute the correction you are getting close to that one. It will be difficult.

I don't know if is extremely because I never told about it. It will be difficult to understand what is the bound of external synchrony. But if you use that guy you will get closer to the external time. Okay?

There is only a situation that I see in which if there is a guy that is externally synchronized is possible that Berkeley does not synchronize with that guy. Can someone see also let me what is the situation? Uh I explain again. There is a situation that I can see where you we have I do we have our Berkeley that is running in this network.

And there is one of the guy that is not the master. This is the master. There is this guy that is externally synchronized. There is a situation an execution in which Berkeley does not become externally synchronized.

Yes? Why does the all the other are far than them? Yes. Assume that this is the only one that is externally synchronized and the time of this guy is 8:00 p.m.

Okay? Assume that the time of everyone else is nine and this is possible nine in the morning. When the master compute the difference with this guy he will say to him you are too much in the future. I removing you from the synchronization.

And in this case everyone will synchronize to nine. Okay? So in this situation Berkeley does not become externally synchronized because this guy is too far away from the other. Okay?

In case this guy was one of these and everyone is on nine and this is nine and five then you become externally synchronized because you start using also this guy to compute the center where you go. Okay? Is it is it clear to everyone? Is it more or less clear?

Is it clear? Clear? Okay. If it's not clear you just raise your hand or at the end of the lecture you come and say it's not clear or whatever.

And we will try to clarify.

### 2.3 Network Time Protocol (NTP) and Stratum Hierarchy

So in real life how does it work most of the time? In real life you have network time protocol. Network time protocol is the thing that is on your devices. And what it does is that it synchronizes with But how does it work the synchronization?

Is similar to Cristian. The difference is that it adds something more to Cristian. So in UTC we have level of server and these server they form kind of a tree. So we have the server at stratum zero.

They are called stratum UTC in sorry in and this stratum zero are server that are directly synchronized with UTC. Okay? Then there are stratum one server and this stratum one server stratum one are connected with server with stratum zero. So they synchronize with stratum zero the stratum one.

The stratum two synchronized with stratum one. The stratum three synchronized with stratum two with stratum two and so on and so forth. If I remember correctly you can have I don't remember is 15 stratum something like that is the maximum depth of this thing can be up to 15. But is not something I care.

I mean at the exam is don't have to know 15. Just stupid to know constant. You have to know the idea. Why is done in this way?

Because you have several client. Everyone is synchronized with NTP in this room. Your smartphone is synchronized with NTP. Your computer is synchronized with NTP.

So they use this strategy and for example if you have a Windows PC you will synchronize with an NTP server of Microsoft that is something like I don't remember if Microsoft time or Windows time something and everyone synchronize with this one and then this one synchronize with level two that synchronize with level one and whatever. And we use this hierarchy for scalability because if everyone want to synchronize to this poor guy this poor guy has to you know handle the entire internet himself and is kind of impossible. Okay? Because he will receive the request from everyone.

So we use this architecture of stratum. In real life this stratum is not a tree. Is done like that. We have several server at stratum zero.

And then we have the server at stratum one and one at stratum one they communicate with many at stratum zero. You do not communicate with only one. Why? Because if you communicate with only one and this guy crashes is done.

Okay? So you communicate with several of them. And how do you synchronize with everyone of these? You use something that is extremely similar to Cristian.

So you have to imagine that NTP you do Cristian with stratum zero. If you are stratum one Cristian with stratum zero again. Cristian with stratum zero again. Then I take the average of all these and I decide my time.

Okay? So between them they synchronize with something that is really similar to Cristian. Is it is it clear? And then we will have the second stratum and this guy communicate with many people at stratum above and so on and so forth.

So that if we have a failure for several of them still we can keep the synchronization going. Okay? Is it clear? Is it clear?

And for example Windows the stratum of the Windows server the one that is NTP sometimes is two sometimes is three. Depends on the server you connect. Okay? But the stratum is more or less that one.

So is between stratum two and stratum three. Apple I don't know. I never I never checked. I should have.

Okay? Question on NTP? Question on NTP? Yes.

Uh how accurate is it? It depends. Like in real life like how far that for example could my stratum be from the computer? Uh this is a good question.

I actually don't know to know how accurate it is. Probably if you look it up on Google you can find some experiment that I've done on NTP. The accuracy of course depends on the server that you connect to the stratum and on your connection to the stratum because if you have you know a connection with a lot of delays then you will your precision will be imperfect. Okay?

But on average I don't know. This is a really good question. I will add the average to the future year in this slide. I will put on average how would you add.

Other question on NTP? Other question on NTP? Notice that NTP can synchronize backward and sometimes does. Okay?

So if you need something that is resilient to not going backward either you synchronize your NTP client by saying do not go backward slow down the clock. Or you use monotonic time of Python but then you are not synchronized because monotonic of Python monotonic on the operating system is not synchronized with UTC. Is just locally synchronized. Okay?

And we have seen that the synchronization algorithm every synchronization algorithm make mistake. I mean even Cristian in a local area network if you are not symmetric of the relay you will make a small mistake. Okay? So we have a limit from the accuracy that the synchronization algorithm asks.

And this limit on the accuracy depends on the symmetry of the relay and on the maximum rounding time. If the rounding time is really large you can do a much mistake. If the network is also asymmetric you can do mistake. Okay?

If you remember the accuracy of Cristian's algorithm is a function of rounding time and minimum difference between the minimum and the rounding time. What does it mean in real life?

### 2.4 Fundamental Limitations of Physical Clocks for Event Ordering

In real life means that let's say that we have a system of three processes P zero, P one and P two and we want to use the time to order the event in our system. Because we want to do an ordering. I need the ordering to do a lot of stuff. Okay?

I want to do the ordering. So the idea that everyone of you asks and throw on the client if you did some application is I take this event, I put the time stamp and that's it. And then I use the time stamp to order the event. Okay?

Is it clear? This is what you do. But the problem is that this time stamp even if you're using a synchronization algorithm is not accurate. Is not the real time.

Is the real time plus some defect that is the accuracy defect of the synchronization algorithm. Does everyone agree on this? So it means that in real life even if I put to this one the time stamp and I say this event was generated at 10 and I have a clock that is synchronized I have a network that is synchronous is perfectly synchronized perfectly synchronized up to something that we can do in a real system. This time 10 is not actually 10.

Is possible that I made a mistake and my event was actually generated a real time that is nine 15 minutes and sorry 59 minutes and 59 point second. Or is possible that my event was generated at a real time that is 10 zero and one. Okay? Is it possible because my real time is not really accurate.

Okay? Is it is it clear to everyone? Since my synchronization has defect when I put the time stamp to the event actually is possible that I put the time stamp at 10 but the event was generated in any a real time inside this threshold between nine and five 59 second and 59 9 9 9 9 and 10 and in this interval any time is possible. Okay?

Is it clear? So it means that for every event that we have in the system for the accuracy of my clock synchronization algorithm even if I'm in a system that is synchronous I can have that the relay are symmetric. And so it means that actually I put the time stamp to every event but this time stamp is not correct because in real time I can be here or here. Okay?

This time stamp is not correct because in real time I can be here or here. This is not correct because I can be here. Do you agree? So when you put the time stamp actually you have also a bubble around the time stamp because you can be you know the real time can be a bit low or a bit high and everything in the middle.

Is it clear? And this is what this drawing is telling us. Now if we have a situation like this can we order the event? Can I order this event?

Yes. And why I can order them? The happening different time and ways because if I do like this and this is the real time. Okay?

This is the real time. Clear? Still this event is happening before this one. This event is happening before this one and this before this one even if I can be in the middle of everything in the internet.

Okay? Does anyone agree? Notice that the more your algorithm is has error in synchronization the more these ball are growing and growing. They are you know larger and larger.

And when is that we have a problem? If we are in this situation that is a different situation from one before then I start doing and this is real time. And this event in real time can happens between this one and this one. And this event in real time can happen between this one and this one.

And this event in real time can happen between this one and this one. But I cannot use anymore the time stamp to decide the order. I cannot use anymore the time stamp because even if this time stamp is before this time stamp is possible that for the accuracy mistake this the event in purple happen here. And the event in green happen here.

Okay? In real time. So it's possible that even if the time stamp they are telling me look this purple happens before this green for the inaccuracy of the clock synchronization I have that this one is before the other one. Is it clear?

Is it clear to everyone? So notice that the more the more your system is faster the worse this becomes. Because the more event I generate in the system the more I have a probability the probability that this ball intersect. And so I have two events that I cannot distinguish actually with the time stamp.

I cannot understand who is before the other. Okay? If I have a system that generates event with a slow cadence for example one event every second. And your synchronization is pico second.

Then this is almost can never happen. Okay? If you have a system that generates event millions of event to a second and you have milli second of synchronization then this thing can and will happen. Okay?

Is it clear? Is it clear? And notice that if this thing happen then you can be in a lot of trouble because if you use the time to order the event is possible that you show to user something that is not respecting the physical time. And this can be any kind of mistake also things that are let's say ugly.

And we will see what is ugly in a few minutes. Okay? Is it clear to everyone? Is it clear what is the problem?

So clock synchronization helps. With clock you can synchronize and most of the time with the synchronized clock you are fine. If you are building distributed application we cannot trust clock 100% because you can have this problem where clocks tell you this event happen before this one physical time but actually is the contrary. And is possible that in your application the fact that is the contrary create a safety bug.

Okay? It depends on the application. There are application where you don't care. There are application where you care and if you order using the time you can create let's say extremely ugly situation.

Okay? Here there is the solution of the exercise that I left but I want to see the solution uh after. So we first start the next lecture the introduction of the next lecture where we see why we can have this problem. The problem that I told you things becomes ugly.

And then we will come back to this line to see the solution of the exercise that I left in the previous lecture. So this is the second module of time. We will do the introduction today and we will arrive until the point where there is the problem and we will see what can be the solution. And then we will go back to the exercise.

So uh in the second part on time what we will discuss is that actually we need something that is called the logical time. We need another object that is not this physical time of the clock because this physical time of the clock has problem. One of the problem is that you cannot create this physical time of the clock if the system is asynchronous. So if you have delay on the channel that are unbounded the Cristian will make mistake that are bigger and bigger.

Another problem is that even if you can synchronize there is this inaccuracy that can bite you back if your system is really fast generate a lot of events. So how we fix it? We fix it using a concept that is called the logical time. And this logical time is connected to the so called happen at before relationship and it can be measured in several way.

We will see the scalar clock and logical clock they are the same. This are the same term. I mean they are two different terms for the same object. Also is the same and we will see then the uh the vector clock.

Okay.

### 2.5 The Need for Logical Time & Causality (The Trading Example)

Why we need this logical time? Let us say that we have this conversation. Okay? This conversation is simply to understand we have Alice.

And Alice says if the price of Apple stock drops what we have to do? So this is a conversation that can happen in a stock where they buy and Mike says if the price drop we have to sell Apple and buy Amazon stock. And then Alice ask who will do it? And Bob's supervisor says Bob will do it.

Okay? Is simple conversation. So we have Alice. Then we have our guy Mike.

This is Mike. Then we have Bob's supervisor. And we call it Bob's supervisor. And then we have Bob.

And we put copy. Okay. Let's say that this conversation happens on with a distributed application. So Alice has a you know a terminal and write if the price of Apple drops what we have to do?

And if we have a distributed application Alice how uh what has to do to communicate with other people? What we have to do if you are Alice here and you want to say to everyone if the if the price of Apple drops what we do? So Alice want to send the message one. What Alice has to do?

Has to send to everyone. And Alice send the message to everyone. He send the message to Mike. He send the message to Bob's supervisor and he's also send the message to Bob.

Okay? Clear? This can happen. Okay, it's possible that this message is delayed.

We assume that the network is asynchronous. And this message gets a bit of delay. Is it clear? Then Mike will answer and Mike what we will do here when he answer the message?

What Mike does to answer? He does to send a message to everyone. You cannot do anything else. Okay, this is Mike.

And then there is Alice that will reply to Mike and what he do? He does she does send a message to everyone. Yes, okay. And then there is Bob's supervisor that replies to the message of Alice and Bob's supervisor what we do?

We send a message to Alice. Okay, clear? What is the view of Bob? What is the local view of Bob?

The local view of Bob would be this message and this message says we have to sell Apple and buy Amazon. And then what other message Bob will receive? A message from his supervisor that tell Bob will do it. Okay?

Clear? So if you are Bob at this point what you do? Yes. Is you sell Apple and buy Amazon.

Right? This is what Bob will do because what Bob will see will see the yellow message and will see the green message. So the local view of Bob will be this one. Does anyone agree?

Okay? So you sell Apple, you buy Amazon and then you lose your job. The minute after someone will come to you and say what you have done. And then try to explain no but I just saw you know two messages whatever but still your job is on the line.

Okay? Is it clear? Is it clear? And so why we have this problem?

We have this problem because what matters in this message is the is the so called causal order. So the important thing of this of this communication is that the message from Mike was generated because there was the message from Alice. Between this message and this message there is there is a relationship of causality. So this message was created because this message exists.

Okay? Is it clear? This message was created because this message exists because this message exists and this message exists. So there is an ordering between these messages and the ordering given by the relationship of one generate the other is the message one of Alice generate the message two of Mike that generate the message two of Alice that generate the message one of Bob's supervisor.

And there is an order between these messages that is given by the fact that you received a message and then you generated a message after having received something. Okay? The problem in this situation is that Bob is receiving the messages with an order that is not this one. Is receiving the messages in an order that is one that is different from the one of causal order because is receiving first this message then this message then this one and then this one.

Okay? Is it clear? Is it clear to everyone? Clear what is the problem?

Okay. Notice that the FIFO channel because we have seen FIFO for the ordering. We saw FIFO we say oh FIFO is good channel because we received the message in the same order the sender send it. In this case Bob is receiving the messages in FIFO order because there are two messages that are generated by Alice M one and M three.

And Bob is receiving first M one and then M three. So their channel are FIFO. Bob is receiving from the sender the messages in the same order that the sender send it. This order this causal order is created by the all the entity of the system is not a single entity.

Is the interaction between them that is creating this ordering of the messages. Okay? Is it clear to everyone? Notice that if you are really fast in this system and those are not you know the messages of people talking but those are processes that are doing something.

Those are programs. You can have time stamp will not save you. Because is possible that you have between this event and this event two time stamp that are one after the other because for the synchronization this PC is a as a time that is in the past with respect to this one. So we will put to this one a time in the future and to this message a time in the past.

And so the time stamp will not save you for causal ordering. Because I can have this situation. Imagine that those are not people talking because people are slow. Imagine that is I don't know some kind of algorithm that is fairly complex.

We have Alice that generate the message here and send to Bob and here we have our bubble. And here we have our bubble and is possible that these two intersect. And the time stamp of this message will be greater than the time stamp of this one. And this is possible.

So using the time stamp will not save you in this situation. If your system is fast enough. Okay? And I hope that you will design a system that are far fast enough because you know the amount of money you get depends on the that the system that you can decide.

Okay? Is it clear to everyone? Is it clear this problem of causal ordering? And so what we will see in the lecture on logical time we will see how to avoid this situation.

We will see that luckily for us even in a system that is asynchronous even in a system that is asynchronous we can build on top of the messages something that behaves like time stamp but they are not time stamp that respect this ordering. So that if you see that object you can say okay this message I have to wait. I don't have to deliver it because there was some message before. So we will able even in a system that is asynchronous to build primitive that are able to respect this causal ordering to deliver the message according to this ordering that is the one that we want to do.

Okay? Because essentially Bob has to know when he received the message from Mike that there is something that generated it that has not seen and has to say has to say I have to wait. I cannot deliver the message now because there was something before that has created this message and I have not seen that something. So I have to wait because otherwise there can be problem.

Okay? So our goal will be to find a way to time stamp the events that follow this notion of causality. And this will be we will use the causal relationship of but this is something that we will see in the next lecture. So we will do a bit of break and then we will do exercise for the last hour.

Okay? We will see the solution of the FIFO and other exercises on the link. So we start again ---

---

## Part 3: Exam Exercises — Property Verification & Counterexamples

### 3.1 Exercise Context: Modifying Algorithm Conditions ($k = \text{next}$ vs $k \ge \text{next}$)

Ragazzi, fate silenzio. What I asked was to see which kinds of properties were respected or not with this modification of the algorithm, okay? This is an example of exercise that I put in almost all the exam because if you can understand if when and how a modified algorithm breaks, then it means that you understood the original algorithm. Okay?

So the best way to see if you understood the algorithm, the original one, is to give you a small modification so that you reason you say this small modification what is touching about the original algorithm. And in this case the modification was that when we have a message pending we deliver the message even if k is greater than next. In the original algorithm we deliver only when k is equal to the next sender. Okay?

In this algorithm I can deliver also message that are far from the next. Is it clear? So how do you solve this kind of exercise as well? There are the properties of our algorithm.

There is the FIFO property and then there are the reliable delivery and no duplication and no creation. And for each one of them you start and you see if the property holds or not.

### 3.2 Property Verification: FIFO Delivery (Counterexample Analysis)

So let us start with the FIFO property. The FIFO property is if a process p delivers m before m prime, then m was sent before m prime. Okay? So the FIFO property tell us that if a process p send to a process q message m and then message m one, then q has to deliver first m sorry, if q deliver first m and then m prime, then it means that the sources first send message m and then message m prime.

This is what the FIFO property tell us. You have to look at the property in details because the property say if a process deliver m before m prime, then m was sent before m prime. So the property is on this. I say if I deliver m before m prime, then m was sent before m prime.

Okay? A violation means that we deliver m before m prime and on the sender what happened was not this situation but this situation here. The sender was first sending m prime and then m. Okay?

Clear? So what we have to do to show if this property is correct or not? We have to reason and see if we can find a counter example. So if this property is not correct, then there will be an execution.

There will be a drawing of messages with saying this line is executed, this line is executed, this line is executed that violate the property. If the property is correct instead, you cannot find a counter example but you can write a few lines in which you say this property is correct because we don't touch this and this and this. So this mechanism remain intact, remain untouched. It's clear until now?

So how many of you had prior to solve this one? Okay? This property holds or not? So for how many of you this property is respected in the modified algorithm?

For how many of you the property is respected? Okay? For how many of you the property is violated? Okay?

So there is a grade zone that relevant. Okay? So actually this property is violated. Okay?

So this property is violated. So it means there is an execution where we can violate the property. So let us reason on how this execution has to be done. In order to create an execution that violate the property, we need a sender that send messages and we need that the receiver deliver this message in different order.

Okay? Clear? So this send this sender let's say this sender message m what was the first number that we give to a message? The first number is one because we start with a sequence number of zero.

We increase it and then we attach to the message. So it means the first message that we send as a sender as a sequence number of one because we start with a sequence number of zero. Okay? Notice that in a system of two processes this vector you can neglect it because this on this side means the ID of the other guy and on this side means the ID of the sender.

So this one will send message m one and then we send message m q. If I want to create the counter example with these two messages, I need a situation in which I have that m q is delivered and then m one is delivered. This is the only way I can create the counter example. Right?

This is the only way I can do it. So what happens when I deliver m q in the code? When I deliver m q in the code, it happens that we increase next. Okay?

We increase next by one. Is it correct? Does everyone agree? When we deliver m q at this point we have in the pending of this process a message that is process one this is process two.

Process one ascend a message with timestamp q and message m q. To trigger with this message this sender so it means that we increase next by one and then we deliver the message. The moment I increase next by one here, my value of next what will be? q So here the next p one will be equal to q at this point because initially next p one is one.

Okay? When I increase next p one to q next p one becomes q. If next p one is q, is it possible in the future that I deliver message m one? It's not possible anymore.

Why it's not possible anymore? Because message m one has a timestamp of one and the timestamp of one will be always less than the timestamp of q. Okay? So if you try to create this counter example with two messages that one are one after the other that are successive one q or q three or three four, you will not be able to do it because the moment you deliver this message this one becomes forbidden.

You cannot deliver it anymore. So you cannot create a counter example like this. You can never put this arrow in the algorithm. Is it clear?

Why I'm doing this reasoning? To show you that you cannot create the counter example with m one and m two. If the counter example exists, you need three message on the sender one to create the counter example because with two message on the sender you cannot create it. Okay?

Clear? Clear? Is it clear? Let's see if we can create the counter example with three messages.

So we want to see if we can create the delete and then put three message. Let's see if we can create the counter example with three messages. p one p q we have m one we have m two we have m three and we want to create our counter example. Is it possible for the discussion that we have seen that we can do a counter example like this?

Can I do a counter example like this? No. Okay? No, actually I can.

I can do a counter example like this. Yes, I cannot do a counter example like this m three m one. A counter example like this I cannot do because the moment I deliver m three I increase next and m one disappears. m one is killed.

You cannot deliver m one m anymore because you increase next. Okay? But you can still deliver m q because next goes to value q. Okay?

So for the counter example, for the execution you have to just draw something like this. This is message q and you write the timestamp with each message. This is message three with timestamp three. This is message two with timestamp two.

And this is a counter example. Okay? So if at the exam you write something like this and then here you write an explanation you say when I deliver this message I execute this line. So the next on process p q here goes to value q.

So next p one on this process goes to value q. At this point when I receive this message I have on this process that this end that can trigger because I have timestamp two equal to next p one. And so I can deliver this other message and I can create this arrow here, the one upward. Let's do it smaller so that this arrow here that is the delivery to the upper layer of m q.

And this is the counter example. Clear? So this figure if you write next is almost enough. You just have to write two lines where you say and this you can deliver because this next is equal to this timestamp and you deliver it.

Okay? And this is a counter example. This is an execution that show that the property is violated because the receiver deliver m three before m two but the sender are send m two before m three. And so there is a problem.

This thing is false. This is false. Okay? Clear?

Is it clear? Okay, how I found find usually this counter I can do it. I remember that in the algorithm this mechanism is used to deliver one message after the other. And then I thought oh but if I send a really big message with a timestamp that is really large I increase next just by one.

So it means that the next message can go because I increase next just by one. And this is the reasoning that I do usually to find this counter example. Is it clear? Is it clear?

Is it clear? Okay. Let's go to the other property. Let's go to the no creation property for example.

Now the no creation property we have to reason if the no creation property is respected or not by the new algorithm. The new algorithm is this one. Okay? How do we do?

We remember we say in the original algorithm why the no creation property was respected? Well, the no creation property was respected because I could deliver a message only if it was sent by someone. Here I never create the messages. I never put in pending something that does not come from the sender.

And so also in this algorithm the no creation is respected because to violate no creation I need pending something that was not sent on a link. But this is impossible because pending I put only things that are received on a link. This perfect link that respect no creation so even in the new algorithm must respect no creation. And so no creation we say that is verified in the new algorithm.

No duplication. A message is delivered at most once. So what do you think that no duplication is respected or not by this new algorithm? Is it respected or not by the new algorithm no duplication?

Yes. And why is respected by the new algorithm? Yes, we didn't change the part in which we remove from pending. This is first.

And then the second reason is that once we no this reason does not take more than anymore. In the original algorithm we had when we increase next that message you cannot deliver anymore. You remember? So in the original algorithm I said if I remove pending the no duplication is still respected because once you deliver it's done.

In this algorithm the fact that respect the no duplication is the fact that you remove from pending. So since I remove from pending I cannot deliver the message again. And why I cannot deliver the message again? Because it's it's impossible that is meant the message is two times in pending.

And why it's impossible that the message is two times in pending? Because it was on top of a perfect link that does not duplicate. Notice that if this guy here duplicates you can deliver a message two times. You deliver it once, you remove from pending, this guy send you the message a second time.

You increase the timestamp by just once. If you receive the message with timestamp 100 the first time you go at timestamp two, the second time you receive the same message with timestamp 100 if this link is not correct and you deliver it again. So the reason why the no duplication holds is that I remove from pending and this link put it in pending just once. So once I have removed it you cannot find it in pending anymore.

Clear? Is it clear?

### 3.3 Verification of Reliable Delivery, Integrity, and Safety vs. Liveness

And now there is the third property, the reliable delivery. If a correct process p send message m to q, then q eventually deliver the message. Is this property respected or not by the new algorithm? Uh sorry, yes or no?

No. Why? Okay. So your colleague is doing a elementary but a nice observation is saying in this execution if I add this things right here if I add this link because this one will receive the message this message will be delivered or not?

No. Will be never delivered because this is pending. Okay? But as a timestamp of one the moment we deliver this message it goes to a timestamp of three because we go from next to two to three.

So here our timestamp goes to three and means that from this moment on this message is as if it is lost. So it will wait pending forever even if the sender is correct and the receiver is correct. So the reliable delivery is not respected. Is it clear?

Is it clear that reliable delivery is not respected? If someone has doubts speak. So the it's important that you do the property one by one because it's possible that there is a property that you say oh but this property is not connected with this mechanism of the timestamp. I mean the mechanism of the timestamp is used for the FIFO order.

Why this property that it does not have anything to do with FIFO is violated but it's possible. It's possible that you modify something that was used to create one property and you destroy something else. So this is something that can happen. Yes?

Yeah. Because here the question homework does it hold if we change k to n? As long as one property does it hold the algorithm doesn't hold. So with this is proving just one enough or do we have to go through all of them?

No. No. Usually at the exam I ask you show me if property one has a counter example, if property two has a counter example, if property Yes, I ask you which property works and which does not. And you have to show the counter example.

Okay? Let us say that I modify the algorithm and I modify the algorithm in this way. I give this modification. So this I keep and I modify this line and I modify this line in this way next as equal k plus one.

Okay? So what I do? I say if I deliver the message with timestamp 10 the next message that I wait for is 11. Is it Is it clear the modification that I'm doing?

Is it clear the modification? I'm not anymore increasing just by one. I say if I deliver 10 then the next one that I wait is 11. Okay?

In this case this FIFO property so this FIFO property here is respected or not? So your colleague there he say that yes. Okay, quite quickly. So try to think a bit about it.

So the FIFO property as is wrote in this things is respected or not I write it here. If p delivers m before m prime, then the source q send m before m prime. Okay, this is the problem. If the source deliver if the sorry, destination deliver m before this, then the source send this before this.

Is this property respected or not? Try to think about it. So the one that has the a solution let's say yes is respected or not is not respected. So if you have a counter example is easy.

You just tell me do this drawing and then probably I will understand if I have to say is respected you have to do a bit more reasoning and you have to say no is respected because In this case I think it is respected because the moment in which you receive a even if it is greater it's not correct. Say message three. The moment you receive message three you set next as timestamp four. So you can't so even if you later receive message two or one you it won't be greater than timestamp four.

So you can no longer deliver them. So your colleague is saying in order to violate the execution, in order to violate the property I have to show you an execution in which there is a message x here. Okay? And then here there is a message x minus something because as to be a message before x means the timestamp.

So x minus something in the past. Okay? Clear? So this is what I have to show.

And here we have message x and here we have message x minus something. Okay? Is it clear to everyone? This is what I have to show that this arrow can exist.

But your colleague is saying the moment I deliver this arrow here what become the timestamp, the local timestamp that I wait, what is next? Next becomes x plus one. Next from the source whatever it is this guy is x plus one. Okay?

x plus one is greater than x minus delta for any delta that is different than zero. Okay? Even for even for any positive delta for every non negative delta this thing holds. Right?

And so is it possible that I create this arrow? No, it's not possible because to create this arrow I have to pass the check x minus delta greater or equal than next. Is the only way to create this arrow you have to pass this check. Do you agree?

There is not the truth. You have to pass this check. But this check you cannot pass it anymore because the timestamp is greater than this one. So this arrow you can never create with this algorithm.

Okay? Clear? So it means that this property you cannot violate it because the moment you deliver this one even if you have the arrow that goes here this message is lost. Because if you read carefully the FIFO property is telling you if the receiver deliver m and m prime then was sent.

But in order to violate the property you have to first show that this is true. And then you have to show that this is true when this is false and you violate the implication. If you are not able to make this true, then you cannot violate this implication. And in this case I cannot make this true because I can never make that this guy delivers two messages that are reverted.

Okay? Clear? Is it clear? Is it clear?

Okay. And the reliable delivery in this case is respected or not? The reliable delivery is respected by this algorithm or not? No.

And what is the counter example? This drawing. This is the counter example. There was a message that was sent before by a correct source.

You receive this message and wait pending forever. So the reliable delivery also for this algorithm is not respected. Clear? Okay.

Let's do another variation of this algorithm. Let's say that I remove this line. Okay? So I have this algorithm with and I remove the pending.

Okay? Clear? Is it clear? So the FIFO property is respected or not?

The FIFO property is respected or not if I remove pending? The FIFO property is respected or not? No. We have the counter example before and the same counter example you still have and read because in that counter example you do when you are not caring about pending.

So the FIFO is not respected. The no duplication property. A message is delivered at most once. The no duplication property in this algorithm is respected or not?

And are we considering the one just greater than change or also... **Professor:** Greater or equal.. This is the algorithm. It's greater and I'm removing this line.

No duplication holds or not? No. Who say yes? Okay, why?

> **Student:** Because the message remains pending but the timestamp doesn\'t change.. And the timestamp increase by one. Not the one of the message and the message is timestamp three is not sent later becauseI don't really You have to reason essentially what you want to show is that once I do this operation that message is lost. This is what you want to show.

Right? Yeah, it remains pending but it's never sent because k is less than next. But is it true?? So your colleague wants to argue.

We want to say if I deliver that k I want to show that this next become greater than k and you cannot deliver it anymore even if it's in next. No, you don't know if you're you've sent the message because still is in the pending. So even though you increment the time but you're still seeing the message in the pending q. And so?

So you cannot tell for sure that it's it's been already sent once. So if you violate no duplication then it's easy enough because you have to show a counter example. You have to show a counter example where the guy deliver the message twice. Okay?

So we have that we send m one, we send m two, we send m three. And we have to show that this guy deliver some message twice. We deliver m three twice. Okay?

Is it clear? Is it possible that I can create the counter example by doing something like this? What do you think? > **Student:** Not like that, because $M_1$ and $M_2$ are violating the order..

This we cannot create why? Because m one arrive. Next goes to two. So even if m one remains in pending you cannot deliver anymore because next is two.

Here m q arrive. Next goes to three. So m q and m one you cannot deliver it anymore. So if you can create the counter example you cannot create it by doing like that.

So we have to make the arrow different because if you do the arrow in this way the algorithm works the algorithm does not duplicate. Okay? So if we don't have to do the arrow in this way, how we have to make the arrow? We can try to do something like this.

Okay? I'm doing up because I don't like crosses. So why we uh are and don't like things crossing? No, I just a joke because otherwise it's too difficult to read it.

Okay? So what happen in this case? m three receives the message. And what happens to next at this point?

What happen to next at this point? What is the value of next at this point? Next year what is the value? Okay, next p one.

This is p one. Next p one is one. Here we deliver the message and we increase next by one. So next p one becomes q.

Do you agree? Does everyone agree? Mhm. But at this point what is inside pending?

This is pending. What is inside pending at this point? m three. So there is p one.

The timestamp of m three and what is the timestamp of m three? Three. And then there is m three. Okay?

Do you agree? So at this point this condition for this message is verified or not? Yes. So this condition is verified here and we deliver and increase.

But even after we increase the condition is still verified because there exist a message in pending that has a timestamp three that is greater than two. And so what happens if we trigger this sender again? The next $P_1$ is... **Professor:** Yes, we deliver it again..

So we deliver m three at this point and we deliver m three at this point and here next become equal to three. And what we can do? We can deliver it again because k three is equal to three. So we deliver m three also here.

So we deliver m three times. And then we cannot deliver it anymore because the timestamp becomes four. Okay? Is it clear?

So in this case the no duplication becomes violated. So if I do this modification, this modification I violate FIFO. FIFO violate no duplication and I violate also the reliable delivery, the first one, because you can still lose messages. When this guy will be delivered m two you will not send it.

When m one will be delivered you will not send it. Clear? Is it clear? Clear to everyone?

Okay. Okay, this is the last one and I do one that is easy. Let's say that uh for some error you put something like this next q equal to four. Okay?

Is it clear? And this is the original algorithm. This is k equal to next. So we have the original algorithm k equal to next.

So this is the original algorithm and I put this next sequence equal to four. Okay? So FIFO is respected or not? FIFO is respected or not?

Someone is saying yes. Why? Because the mechanism that is making FIFO work is still in place. You increase by one.

To violate FIFO I have to deliver one message and then I can deliver the one before. But I cannot do because the once I deliver the first message that I deliver the timestamp will be greater and will kill the one before. So FIFO is respected. No duplication is respected.

Yes because in the original algorithm no duplication was respected. It's respected also here. No creation is respected. Yes because to violate no creation I have to touch pending.

And the only way in which I can violate no creation is if I modify the code here and I put in pending something that was not sent. The reliable delivery is respected or not? No. And what is the counter example?

Any of the first three messages will not be delivered. Your colleague is saying because we have m one, m two, m three and m four. And what we do? We deliver m one at this point but what we say one is less than four.

We do not deliver it. We deliver this guy and we say q is less than four because next start from four. We do not deliver it. m three we arrive here.

Three is less than four. We do not deliver it. m four we receive m four and what we do? We deliver m four and we put the timestamp to five.

Okay? So if you do a an error like this all the messages before the timestamp you cannot deliver them because are less than what you expect and so they will wait the pending set forever. Okay? Clear?

Yeah. Okay. What happen if I put this one equal to three? So we are in the original algorithm.

This is equal. And I put the first timestamp equal to three. The first timestamp equal to three. How many message I can deliver if the first timestamp is three in this algorithm?

Zero. Because the first message has timestamp three but I'm expecting one. So what I say? I say I cannot deliver three because I'm waiting one.

The second message has a timestamp four but I'm expecting one. So I say I cannot deliver it to q because I'm expecting one. And you will not deliver anything. Okay?

Every message will wait forever because we don't deliver. Okay, so you violate. In that case which property do you violate among here? Only the reliable delivery.

So the no duplication is respected. The no creation is respected. The FIFO is also respected because you cannot violate FIFO. Okay?

And essentially this is uh is a the reason is that if you do an algorithm that do not do action then you can only violate liveness property. And the only property that we are violating is the liveness one that is reliable delivery because all the other are safety property. If I do no action there will be no action in my algorithm and violate the property because I do nothing. Okay?

Okay, so I see that you are tired enough. See you at the next lecture. ---

---

### Key Formulas & Concepts Reference

| Concept | Definition / Formula | Explanation |
| :--- | :--- | :--- |
| **Drift Rate Bound ($\rho$)** | $1 - \rho \le \frac{dH(t)}{dt} \le 1 + \rho$ | Maximum allowable deviation of clock progression rate from real time. |
| **Resynchronization Period ($T$)** | $T = \frac{\Delta}{2\rho}$ | Time elapsed before the worst-case skew between two correct clocks reaches $\Delta$. |
| **External Synchronization** | $|C_i(t) - S(t)| < D$ | Clock of each process agrees with external UTC source $S$ within bound $D$. |
| **Internal Synchronization** | $|C_i(t) - C_j(t)| < D$ | Clocks of all pairs of processes agree with each other within bound $D$. |
| **External $\implies$ Internal Bound** | $D_{internal} = 2 \cdot D_{external}$ | If all nodes are within $D$ of a central source, the maximum skew between any two is $2D$. |
| **Cristian's Clock Update** | $C_{new} = T_{server} + \frac{RTT}{2}$ | Client sets its clock to the server time plus estimated one-way delay. |
| **Cristian's Accuracy** | $\pm \left( \frac{RTT}{2} - min \right)$ | Error bound given minimum network delay $min$. |
| **Berkeley Algorithm** | $\Delta C_i = \text{Average}(\Delta) - \Delta_i$ | Master computes relative adjustments after discarding outlier clocks. |
| **Monotonicity Guarantee** | $t_1 < t_2 \implies C(t_1) \le C(t_2)$ | Clock must never decrease; implemented via gradual slowing down (slewing). |
| **FIFO Delivery Violation** | $k \ge \text{next}[p]$ allows out-of-order delivery | A message with higher sequence number can be delivered while a lower one is still in transit. |
