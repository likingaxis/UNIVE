# CR LESSON 9 - Transcription

## PARTE 1

So one announcement about next week. So next week we have a lecture on Tuesday as always, but we do not have any lecture next Friday. Do you have any more? Anybody? For mid Tuesday. Tuesday afterwards. But Tuesday, everything is gonna be level because the break for the computer science course is the start on Wednesday. Okay. Okay. Okay. So what did you do last time? Last time we. What did you do last time? Last time. Pro. None. Oh yeah, you did the CCI last time. Yeah. Right. So we have been in the class.

So, what I would like to do today is the first thing. Because, as I said, like we are actually in practice are actually real-world constructions of protocols. So today I would like to tell you a little bit about like what we know about theoretical design of protocols. Okay. So, so, so the third one is.

What cipher? But the name is but the name is actually misleading. But the name is misleading. Okay, so everybody calls them block ciphers, but they are not tight. They are not tight. I mean, they can be used. To encrypt, but they actually are not secure. Like a PRF, a PRF is not a cipher. By itself, now you can use it to do encryption, but it means randomness. You can also do other things with PRFs, which suggests that maybe these are not just ciphers. Some other objects that you can use to do multiple things. So anyway, anybody could have lost that. Okay, so lost I just.

So actually, the real name, actually, they are pseudo-random permutations. Okay. Okay. So examples. Like this and okay, more. Amen. Okay, but we did not name the most famous. Okay, this and yet. So the security. So so they they are used. They are used often.

As an instantiation, as an instantiation, or PDF. Okay, but they are more, but they are more, as they are invertible. Okay, so they are invertible. That's important. So they are designed to be invertible. Okay, it's not just like a function that you, right? If you have a PRF, we can compute it in the forward direction, but there is no algorithm to go back, right? And in fact, I mean, like it could be that it could be that it doesn't need to be like a bijection. It is just a function, okay? Yeah.

Anyway, for some applications it's okay, they don't need to be invertible. And in fact, for all that we have seen so far, we don't need it. But we will see some applications or some constructions that actually require the property that this function is invertible, so that they are permutation. Okay. So the important question of design, etc.

Repetition. Okay. In fact, all these block ciphers, they are inspired by the design of the building. Okay. So today we like to say a little bit about this. Okay. So the main question is, how do we make? So we already have here. Okay. So we already have that. We already. And if we have, how do we make it invertible? Okay, without designing from scratch.

Yeah. So and this is actually kind of also what the practical constructions do. Okay, they are not designed just to scratch an invertible thing, but they actually design a pseudorandom function and then use some of these ideas here to make it invertible and still pseudorandom. Okay. Also the practical constructions, but they do not necessarily prove. They they do arbitrary choices.

And then they are not too particular, but they follow anyway some of the ideas that we will discuss today. Okay, so the most famous example of this, so the most famous example, it has like lots of application. Most famous design is for sure the so-called five-cell network. Five-cell network.

Was designed by Bell Labs. They were designed by Bell at IBM. Okay, and they were the inspiration for the real world design of many block ciphers, including in particular DES. AES is different. Okay, but also cipher base. You share stuff behind this, okay? So, so what then? Okay, so then we have this function, yeah? And so we start already from something super strong. We have to the random function. It was a lot of work to to design it, and now we don't want to start from scratch. We would just like to, you know, come up with some efficient construction.

Of a random permutation from a random function, okay. And I mean, in fact, the discussion to repeat would be quite efficient. It would be very efficient, okay. And this is, as I said, is due to Feistel, okay. So this is Feistel function. You can think of it like this, yeah. So the basic idea. So this is the basic idea of the Feistel function. It's not a network, yeah. It's just a function, okay.

Think of it like this. That is psi f of x y equals y and it equals x plus f of y. Okay. Call it x prime y prime. Okay. So this is a this is a the basic idea of the Feistel design. So if you want to make so you have a function, yes, f, and this function, I mean maybe it will be a circular function, but doesn't matter now. Okay. So it's a function.

And say from n bit to n bit, okay. So but this function is not invertible, okay. So finally it's okay. Let's make a permutation from two a bit to two a bit, okay. So we double the size of the input, and we do it like this. That if the input is x y, the output is going to be y, and then x plus a four, okay. So pictorially it's something like this. So you have like x here.

Okay, X, and then you have Y. Then you have Y. Sorry, that is not properly. F, and then it is Y. Okay, that is Y. Okay, so you have Y, F of Y plus X. Yes. So this f of y plus x, it it's one output. So it's this basically, and and then y itself is the other output. Okay, and then those are kind of swapped.

Right? So this is what, and this is x plus f over. Yes? Yeah. So y is the left part of this, and x plus f over y is the right part of this. May I ask? Yes, so that's that's the basic idea. So why is this useful? Okay, because it's efficient. I can, I can invert. Why? Because to invert, I don't need to invert f. I just need to compute f and and cancel it all. Yeah, essentially what we need for encryption. So I mean, I I I can do this right.

I can observe that psi f inverse of this x prime y prime, and this is x prime, this is y prime. So what is it? It is just I just do the inverse, no? I do f x prime plus y prime. And then, right, it goes after. Why is in the right? Okay, why is in the left now? But at the end it was on the right. Okay, so the right, invert, the right part of invert is ciphertext. Left becomes right. Yeah. Make sense? And then the other part will just be f of x prime, which is f of y, plus x plus f of y, which is x.

Yes. So it's invertible. So that's the definition. Okay. So this for sure defines the permutation of the sequence one to n over bit strings of length two times n. Are we good? Okay. Okay. So that's the basic idea of why. But the question is, now say that n was a two-digit number.

Yeah. So question, is this a PRP? A PRP. I mean, is this still pseudo-random permutation now? Okay, because permutation is for sure. I mean, you're encrypting. The question is whether it's still pseudo-random. Okay, assuming F. Assuming F is the answer. Okay.

Okay, so what is is this around the rotation? Yes, sir. Simple, no. Why? Yes. Yes, clear. Is what? Clear. Yes. What? What is clear? I mean, so we're not we're not trying to hide the the the input, right? Then we're not thinking, right? But what what is the problem about the the output? The second. The first part of the output is the yes. And why is that a problem? Because an adversary can distinguish. Yes, yes, exactly. Okay. So that's exactly the point. So you see, this function, this permutation, okay, satisfies the following property. If I look at the second part of the input.

This is going to be the first part of the algorithm, correct? Okay, and this everybody can check. Okay, I mean if I if I send an input, I choose an input, I know that the output will satisfy this property independently of the input. Okay, so now I mean of course this is certainly an attacker can check, but I mean it is going to happen for a random computation.

What is a random permutation? A permutation means that I feed the input, and then the output is a random thing. Okay, so now of course it should be a random permutation. Okay, so I cannot, I should sample without repeat. Okay, so mean that one time, I sample the first row of the of the permutation.

Secondly, cannot be equal to the first. So I can pull out one of the others. Okay, for the first permutation, choose randomly among all possible permutations. Yeah. Okay. So for another permutation, is it possible that the first half of the input is equal to the first half of the output? No, it's very unlikely. They need to collate. Yeah.

That's not right. We will be able to prove it true to the one side. Yes. So this means that the discussion actually is secure because now I can do an adversary that by means one way, you know, x y, then it do some the output and it checks this property. So if it is true, I'll put one. If it is not true, I'll put zero. And then I output one. The difference will be one minus.

In the real world, I always out this one. In the real world, I have two times the probability to do my send. My advantage is one minus the minus send, which is non-negligible. Okay. And clearly, all you guys are both with this. You watch. Any that? Any question? Okay, so no. Okay, because because first of output.

Equal seconds of of equals. Okay, so doesn't work. Okay, so it was a nice idea, but it didn't work. So then the idea of Friday is the idea of Friday is look. This construction is stackable. I can stack it. Okay, so like instead of doing it once. I can do it sometimes, ten times, five times, I don't know, two thousand times, yes, and then then it is encrypted. Okay, okay, so that that is the idea. So so we should do it more times. Do it more times.

Okay, for instance, I will do it two times. Okay, there will be my next attempt. There will be just do it two times, which will look like this now. Okay, so I now draw it for two rounds. Okay, there will be two rounds of cipher. Okay, so as I said, the cipher construction is very important. Many ciphers are based on this. Many standard algorithms.

It's a real construction. Real world construction. Okay, so it would be like this. Yeah. So now I should swap them, right? I should I should I should swap them. Instead of swapping them, I swap the the errors so that the picture looks more clean. Okay. So I do not swap them, but I swap the errors. Okay. So like I put that prime here, and then the errors go in the other in the other.

Like this. Okay, so I swapped the letters. It's the same. Okay, so then here I have x plus f of y, right? And. Right, because in the output of the first round on the right is x plus f of y, which then goes left because it's the second round. So x plus f of y, and then here I will I will have y plus f prime of x plus.

F of y. Okay, you can check. That's it. You can look at the picture. Okay, it's y plus f prime of x plus f. That is it. Yes. So these are two guys. Okay. Right. So I can still invert it. Right. Because I start from the end. I invert the first round. Then I invert the second round. Then Yes. Okay. No. Okay. Yes. So I can still invert. Right. How do I invert? First invert the first one time and then invert another time. Okay. I don't do it like millions of times. We still invert. Okay. So the question is, like, do it more times? Does it improve security? Before, not. And now, it may.

Okay. So the question, question again. Uh, is it via PIA? Okay. Uh. Yes. So, what? Why in the second round? There was what in the second round? Because that's right. That's right. Oh yeah. Again, from that. Again, yeah, yeah. Particularly, we assume it's going to be different. Just because I mean, I want to make the question simpler, no? Like I will assume that instead of having just one random function, I will have two. That just makes things easier, no? Okay.

Otherwise, like like if it would be just one, no, then both would share the same key. That that would be problematic. There wouldn't be independent. There wouldn't be independent. Next slide. But let let us make our life easier and assume they are two independent. Okay. So sorry, I should I should write here f f prime are independent.

Independent, you can say random. Okay, in practice they will not be random functions, right? They will be pseudorandom functions. Okay, but what does it mean independent pseudorandom functions? The f will have its own key, and f prime will have its own key. Okay. Anyway, I can just let's do this. I start from one key.

Then I do a PRG and I get two keys and then I use each key, right? And that's actually what blockchain is doing. We are more blockchainers doing this. Start from the beginning, do a PRG, get many keys and then use many AES. Between five and eleven, that is exactly what is done in AES, DES, all of it. They all do it. But for simplicity, let us make our life much easier.

It's just not the function, which is just looking the question easy. But the answer to the question is still no. That's what's happening. It's not secure. So this is a little bit more subtle actually. So when is the point? The point is this now. Then, what is the observation? So the observation. The observation is the observation. So what is the?

I'll write it here. Okay, psi of f of prime. Okay, so this means two args with two functions, f of prime of x y of x y. Oh yes, plus yes, psi of f of prime of x prime y. Okay, so imagine the adversary makes two queries. Two ways. The first query is x y. Yes. The second query is x prime y. Same y. Same y. Okay. This is allowed. Okay. I can do two ways with the same one. And I suggest this is the problem. Okay. Because if I do these two ways, then I can do the XOR. Yes. And both of them have an outcome.

What will be the first part here? What happens if I do the XOR? I look at the XOR of X and X prime. Okay, comma something. Okay, that's the point, right? Because I make this array, I do the XOR, and I check if the first alpha is an X or an X prime. If it is, I output one. If it is not, I output two.

So in the real world, I output one with probability one. But in the real world, I mean, what's the probability that this is going to happen? Very small. Okay, two to the one set again, no? Okay, so it turns out that actually this is the only problem in a way that that we can formalize. Okay, we formalize it.

Okay, so meaning, meaning. Assuming this does not happen, which of course doesn't make any sense. The adversary can make it happen. But me, for simplicity, for as a mental, as a warm-up, as a mental experiment, assume the adversary cannot do this. We cannot explain why and why not. Okay, as assume not. Then you can prove that this is secure.

Okay, unfortunately, you cannot assume that it's better. You cannot say why and why prime evil. So what do you do? You do one more round, and one more round satisfies this property. Okay, in fact, three rounds. Okay, as you can prove that three rounds work. If we are going to prove that three rounds work, two rounds does not work, one round does not work, three rounds works. Okay.

So, so in that, this is the only problem. Okay, we can fix it. By adding one more. Okay, so this was proved for the first time by two researchers, which were Luby and Rackoff. Okay, Luby and Rackoff, they proved they secure their fire networks, and they proved that we will also prove it now. They proved that three rounds of fire is actually not provable.

Okay, the intuition is two rounds are good, so not guess. Why does not repeat? And the first round makes sure the point never repeats. Yeah, so that's the the the theory of the design. Okay, sounds good. Okay, so what they improve is the fact that if you so do this construction three times, you get three independent keys. Okay, key one for that.

Key two for a prime, key three for a double prime. Okay. Real world, real world, real world. F is Euler's. Okay. One designs like a complicated looking F, which is only done by Euler. Confusion and diffusion. They think. Okay, F is a bit. Then all keys, all the keys, are derived, derived from single key, single K. Using a VJ.

Okay, this pair G is also heuristic, but it will be like this. Okay, and then how many rounds you do? Okay, you know because then it is heuristic. You don't know how many rounds you should do. Okay, because the deal is that you you can do three rounds so long as you use the pair. Now if you do not use the pair, of course. So let be you know better states. Sorry, let's do eighteen rounds.

Why I don't I don't know okay but that's all it is you know what does mean F is really means that it's not provably secure like F is is an heuristic design of a function that looks like a random function so it's not provable but it's it's designed by you know heuristic principles.

Which may appear, okay, sounds like magic. Okay, I don't know how to do it. Okay, but I mean, of course, there are things. Yeah, there are things. Okay, that people have learned in centuries of experience in the design of those. Okay, but not really. It works, so long as somebody smart breaks it. Hey. And if somebody breaks it, people will figure out. Figure out. You're good. You're good. You're good. See. Except that, I mean, if somebody breaks it, probably people will start to kind of look terrified, and then they will say, okay, let's go for the fake.

Because then, if you if you I don't know, like if it has 12 rounds and now you are probing it for 11 rounds of I don't know, a different time. But then for even for eight years, it is really like this. Okay, like it has like 14 rounds and then maybe the attack can break it up to seven rounds or something like this. Okay, three people test is the same. Okay, that's that's that's the original block cipher that's used that is.

Fight them, okay. And I mean DES is under attack, but because it was designed many years ago, the key was kind of short. It's not really long. And then at some point, it became actually possible to basically brute force. Okay, so nobody actually really breaks the design of DES, but they can do brute force it because the key is short. So how? What? How do you fix it? You make the key longer.

How do you make it longer? You encrypt more times. The intuition would say encrypt twice, but that actually doesn't work. There are some technical reasons why encrypting twice is as good as, I mean, from the point of view of what encrypting twice is as good as encrypting one. But encrypting three times still is good, and that's why it is called the triple test. You might have heard the triple test.

So that's the reason why it's called the crypto test. Still, still another crypto test. AES is the other alternative. It uses a slightly different design, not this exactly the same, but similar, okay? Similarness. And also another. Let me go on a key, another.

Yes. Yes. Back to the first model that the only one round is. Say what? Back to the first model that it did only one round. Yes. And the question was that the first half appears in the second half. Yes. I don't get how that exactly works. I know that you can apply the same before and find the exactly, but like that.

It's not that that they all do this random. That they are like chosen randomly among their whole. Yes. But I mean, for such for such a random choice on the table, it's never going to happen that the first second out of the input happens to be exactly equal to the first out of the output. Because you're picking a random one. It's like an M bit string, right? So if you fix any inputs, fix any inputs, whatever it.

Because we pick a random L row, the probability that the first half of the outputs collide with the first second half of the preimage itself, agree on this? Yeah. Super low. So never for a real for a real function random function random permutation, never, almost never. But in in the in the construction, always happens, always.

What happened is that I don't get the definition of the random function. It is like the output should appear randomly or the function should hold them. That's the same thing. If I pick a function at random, I'm on all possible functions. This is the same as picking a random identity function. It could appear also in the random choice.

Oh sure. Also, there are many factors to be considered. Yes, but it's not true. Not true. Okay. I mean, there is no reason why you should pick this card, but anyway, the probability that you pick this particular table is super small. Okay. Okay. So let's let's try to prove this here. Okay. So so I first prove this lemma. Okay, which states that two rounds are basically good.

So let me ask you, why are not this it okay? So the fact that this actually goes for every so for every unbounded attack. That means maybe. Q equal poligoeth, polilambda equals. Then the following are distinguishable. The following are indistinguishable. Okay, so.

One, I call the system S. Okay, S is psi f f prime of x prime. Assuming that the f f prime are random functions. Okay, the set of randomly from the set of functions. Let's say from n to n. Okay, so that's the idea. Let's do it on the fly. We do it on the fly.

Okay, this is indistinguishable from R, call it, which is R of course, R of x y, such that R is chosen randomly among all random factors. So this should be actually yeah yes all random patterns yes from two n. To 2n, because now the input side is 2n. Okay, so they are indistinguishable, which is that there will be the truth. But this is not true. Only you assuming so long.

So long l. Equations made by the attacker, I, let's call them y equal, okay, which means that the y are different. Y i different from Y j for every i j for for all i different from j. Okay, so the Ys are unique. It's just called Y unique. Y unique means that the first x one squared, x one y one, x two y two, x three y three, and the Ys are unique.

Okay, which is necessary because if the boys are not distant, there is an attack. Okay, but if the boys are distant, that's what I was saying, everything is good. Okay, so this lemma will be then useful to prove the security of the actual theorem, which states three rounds ideal round permutation. Okay, three rounds ideal round permutation. How do you prove the three rounds ideal round permutation? You prove that the first round makes the inputs to the next two rounds one way, except with probability.

Yeah, and then you arrive at this random function. Okay, other random ah just then it just transmutes the input, and it are now choosing randomly among the set of all random functions, permutation. But I mean, random function, random permutation are also indistinguishable. Okay, let's formalize this idea.

But there are just too small. I mean, one thing is just think that the first round makes them one. We will be proving later. Okay. Then we also need to discuss different prefunctions and permutations. Okay. There will not be a big thing. Okay. So the technical core is this level function. Okay. So that's most difficult part of the problem. Okay. A little bit more.

Okay. Okay. So how do we do? We do. So let's prove it. So we prove it by having that method. Hi is the is the experiment. Is the experiment where we apply to the first first hyper as in this s, okay, and all other. From A, okay. So we need to switch. We start with S. All the ways are fine, yes. And then we slowly start to switching from S to I. Quite difficult, okay. So in the first, in the element I, the first I.

Are five and the last q minus i are random. Okay. So then we just need to prove that. Right? I mean, of course. So now we have that h zero. H zero is just a zero value, a bit I, and H Q is actually S. Yes, and we need to show H zero computation equals H Q.

Okay. Yes. So let's look at H i. So let's look at H i. Okay. So and then we look at H i. Okay. And then we will see that by the assumption of the theorem, of the lemma, we get which the next the equality i plus one. Also to to S. Okay, H zero should be S. No, because the the first zero pairs are are S and all the others from after that. Yes. Okay. So I define it like this. I define it another way. I don't think it make any difference.

Okay. Okay. So what's the point now? Let's look at this HI. So HI is gonna be like this. Oh yeah. So it's gonna be Xj plus. I mean, I'm just copying now this output. See these are the things we left these for because it's a two-round cipher. So it would be x j plus f of y j that's the right the left part, and then the reverse would be y j plus f prime of x j plus f of y j.

Okay, so this is for the first I minus one. Okay, the first I minus one like this. Okay, and then there is the the next one which is the the I one, which is just in. Okay. Okay. Plus all the future ones. Okay. The future ones are are the ones from okay the future ones are the ones from from future ones. They are replied as in.

As in S. Ah, sorry, as in R. Okay, random, random, random, random. But let's just look at the first I, okay? H I. So these are actually the first I, the first I. Yes, these are the first I words. Um. Okay, so now we will we will switch. We will have to switch. We will have to switch the i one to down. We switch. We can switch the i one to down. Okay. Okay. So if we switch, if we can switch.

The i output to random, right? And without, it's more distinguishing advantage. Then h i minus one is indistinguishable from h i. So I'm trying to prove that h i minus one is indistinguishable from h i. So I'm transitioning from h i to h i minus one. Output transition from h i to h i minus one.

I multiply the i element with random. Yes, if I multiply the i element with random, I obtain h i minus one. Okay, and I'm doing this for general i. Okay, so if I can do it for all i, then I can switch from r to s. Okay, so I'm doing the hybrid algorithm, and then piece by piece. Okay, okay. So why an advantage? Okay, so what the point? The point is that.

Because the y's are all distinct, since the y's are all distinct, since the yj's, y sub, this y i is different from all yj's. Right, then f of y i is random for sure, random because f is a random function, and also independent and independent of independent of f of y one.

And f of y i minus one. Okay. Okay, and everything gets us. Okay, it's independent of everything, so I can replace it with random. Okay. So, okay, what do I get? I get xi. So I get the same thing as before. Let me write. Let's write like this for j equal one and minus one. Same as before. But in the position r, I can now in position i, I can write r.

In place of the f of f of i, x i plus y i. Okay, so that's the I. In place of the I, I'm changing the distribution of the I, right? Because this f of y I is independent of everything, I can replace it with random, random one, right? Random one. Okay, it's the same. I I, right? It's random.

Different, independent from each other, so I can't please from with the random, with the random. Okay. Yes. What does it mean that the y i is different from all the y i s? Yes. Why are they different? Because we are assuming that the y are unique. As long as the y i are unique, it's a sound of the lemma. So the y i is different from all other y i s.

Okay, because this is true, right? There can never be a condition in the input of it. Okay, otherwise there would be a problem. Okay, well, one gene, exactly. From one gene, yes, yes. Why I is different from all one genes. So what we do is the goal of this demonstration. We we are doing a proof of concept. If we are assuming that yeah, why important? Yes. We are proving that assuming that the one that owns the key, then the construction is secure. And then of course, yeah, because I mean the fact that these two things are distinguishable it means that the construction is secure. That that one gets the key without implementation, okay?

But of course, this doesn't say anything at all because it's not true in real life that the world is fair. So we need one minute. I'll leave. Okay, you do this. Okay, I just do things more slowly. Okay, more, more than me. More. Then he's a better than better than the man. Okay. Okay. Okay. So.

Okay, so I think this is the drama. Okay, so now. Okay, so good. So, the assumption that I can say instead of x i plus f of what was it? Sorry, instead of f of y i, instead of f of y i, I can write. Okay. Right. So these I can do all because they are one. Right. Because if f of y one would be equal to f of y i, then I need to write r also in the first also in the first one. Yes. But because they are not distinct, f of y i another value. And then again replace all the data with other and everything still stays the same. Yeah.

Okay, so now let's look at this f prime of x i plus r. Okay, the next idea is I I want to argue that f prime of x i plus r is also a new part, a fresh part that never appears. Okay, because if I can replace now f of x i plus i with i, if I could i then I'm done because this is random already. X i plus i is random. It also this is random, and then random. Okay, so then I switch. I I I I was able to take the i element and then it become random. So I made one step of the i.

Yeah, okay. So what do I need in order to do this? I need to look at the input of this f prime, because y plus f prime of x prime, sir. And f prime is a function. Okay, the only bad thing that could happen is that this x prime side happens to be equal to one of the inputs on which we run the prime of.

In general, I can't say that this is random and independent. But let me explain to us: is random. The probability that a particular value is getting chosen is small. Okay, so that that's it. Yes. Why are you small? I wasn't asked to solve this one. No. Because please, F. Why are you? Why are you part of it? Because it chooses my address. So why are you the worst case? To be zero, zero, zero, zero, zero.

But as a why? Any depending from it, okay? Okay. So yeah. So what is the probability? The probability. That x i plus r is equal to one of the inputs of the function f i, which is which is look x j plus f o y j. So is equal to x j plus f o y j. What is this probability is negligible, right? Because I have enough, okay. Okay. So the probability is going to be negligible. So actually.

So let me see. Yes, right. Because yes. So the probability is going to be equal, right, for some j, yeah, for for any j, for any of the j, for any of the j values from one to i minus one. Yeah. So the probability equal to one of them is two to the minus n, and then it can be either equal to the first, or to the second, or to the third. Okay. So this probability is a small.

At most, I am one. That is two times ten. By the union bound, because there are I ones combined, right? And the probability of each is independently two times ten. So by the union bound, this is at most I ones one times two times ten. Yeah, for every. Okay, so now.

Assuming it does depend, it does not depend. Okay, it only happens with negligible probability. Assume it does happen. Then I get I get a place. I get a place. I can have x i plus r and y i. Plus R nine, plus R nine, for R nine random. Okay, plus whatever I had before. Okay, plus whatever was yeah, yeah. And what is the distribution is now random. Okay, so I switched from.

I be strong. I read. I do I read. I understand. Yes, because I read. I read as the answer. What is the price that I have to pay for this? The probability is 1. Yes, that is why I pay for for each step. Okay. So then, right? So then, then I draw the sum them all up. So by the Hardy argument, by the Hardy argument, we will have the statistical distance between this S and R.

Is that most basically the sum? Is the sum over i, i minus one to to the minus n, and and that's it, right? Which is that most q square, something like q square times. Two to the minus n, which is n. Okay. I just did this time. Okay, because each for each i, I use that factor in the division, which one by one. Yes, there it happens. So I need to sum all the exponent. Yeah, but the sum of there is anything in there.

Okay, at the end I get the statistical distance. This is actually the statistical distance. It almost negligible. Okay, and now, okay. So now the final thing. Now the final thing. I use this lemma to prove the first theorem. Okay. The theorem is that.

All right. If, if assuming, assuming what we're doing here, f prime, okay. Assuming f is a der. Okay, then three rounds or five them with independencies with the independence keys. Is it here? Okay, so understand what I mean. Like I do this construction here, the blue construction, for three rounds. Yeah, but now when I do it in the other order, it cannot be f is a random function, f prime is a random function. Random functions do not exist. So what will I take a pair f i and then I use key one for the first function, key two for the second function, key three for the third function. Yeah.

So that's what the DM said. No, no, we don't understand. Okay, I cannot make no sense. When I say it's a PFP, it means for arbitrary request. I cannot assume that the wife. That's the point, right? Otherwise, I would be right there. But of course, in the end, we have to make the wife happy.

Now, the rest, they are not before, they will be useful because all we need to do now is to prove that one round implies one weakness. If the first round implies one weakness, we are because now we are one weakness by design. So one round gives you one gives you one weakness, and the next round gives you the other.

Okay. Okay. So the proof. Okay. The proof. I mean, the main part of the proof is basically is this thing. The one round gives you one. Let's make it. It's not going to be very complicated. That's the only thing that requires some carefulness, but otherwise it's okay. So it's.

Kind of follows from everything we have said. So, so consider the following. Systems. I don't mean systems. Okay, like systems. I mean just what the adversary can play. Which box the adversary can play, right? So, I call the first one. I call T. T is three-round function. Okay, it's like psi of fk.

Of psi of fk two, of psi of fk one, of x comma y. Yes, look at this equation. Three alphais are three different keys. K one, k two, k three are different. Are different. In other words, in other words. Then what will be next? Of course, I replace, I replace f of k1, f of k2, f of kt with random function, random function, random function. So this is going to be psi of f. What we call it here? Ah, or I call it like this because it's used for two things, called like this.

F double prime is the first round, okay? I do first one round of fighting. We have double prime, and then two more rounds, which means I do three rounds, okay? Yes, yes. Then we will prove that later. We will prove that this is this integral from R. R is just R of x1 for R a random function from 2n into 2n. Okay. Okay. How am I going to prove that that's an adversary indistinguishable? Because one R means x1. Yeah.

Yes, it's F double prime in second round. F double prime is the first round because it's the innermost invocation. So the first thing I do is F double prime, and then I do two more rounds, which I call F F prime. Yes, that would be the same as prime inside of F inside of prime of.

Okay, I'm almost done. The last step. I use a permutation. It's not that hard, yeah. This was the thing that I said before. P of x y. Well, P is a random permutation now. Okay, so this means random permutation. Okay. Okay. You see the differences between the last two? We need to prove it there, Anna Perbitesko. But I'm ashamed that they have found it. Because these are capitals. If you don't know function, you will never distinguish between you will never know Perbitesko.

Because if another function is indistinguishable from another function, and another function is indistinguishable from another permutation, why? What's the only way to distinguish a random function from a random permutation? You will need to query all the possible values, but you cannot. Okay, this is for polynomial time, of course. Yeah.

So, but he is right. He said that if I can find the point of anything, it is correct. Yes, but you cannot. Yes. So, so, but I mean, you cannot have put on a number of points to see because what does it happen? Yes. A collision. A collision. Yes. Yes. If you find them, no. If you find them, the two sets are the same.

That's a function, not a permutation. Yeah. But these are not random, right? So this is a random function, and this is a random permutation. Most probably that you are gonna that you are gonna find such a thing. You are gonna be lucky, okay? So, a pseudo-random function is a very indistinguishable from a random permutation. The problem is that.

It's not invertible in the algorithm. Okay. Unfortunately. Okay. Okay. Another function is already as good as the random permutation. They are distinguishable. But unfortunately, the random function cannot be efficiently inverted given the key. That's why we use the random permutation. Right? Because they can be efficiently measured given zero. Okay. Okay.

So okay, many things which already said. So we need to just prove like one by one. So we need to prove that T is indistinguishable from S. Okay, one by one. Why? Why this? By security of. Why is T indistinguishable from S? No. DNS. DNS. By DNS. By DNS. Yes. By the fact that S is a DNS.

How do you just just to make sure? How do you actually do it? To make a reduction, if we can distinguish the SSL, then we can also yes. How do you make the reduction? Because they are tricky, no? They are tricky, and the relation analogy. One. So what do you do? Highlight. Okay. So what you actually need to do is to do a highlight. Okay. First, I replace f of key one with the random function, then f of key two, and then f of key three. Okay. Okay. Great. Two. Now this f. So this is the the hardest. Okay. This is the only hard part. Okay.

So these are actually distinguishable statistically for polynomial. Okay. So again, it will be true for computational distinguishers. And actually, even if the distinguisher is as bounded, there's going to be distinguishable. But the question is the polynomial. Okay. There was no answer before, like because.

His advantage was, I mean, when we write the difficult things, only because Q is going on. If Q is not coming up, then you will not do it. Okay. So, but the number of pairs always going on. It's okay. Okay. So, so what the idea here? The idea is that the so what the idea? The idea is one round gives you why weakness.

Okay, and then you're done. Okay, you just compute the probability that you do not get one instance, and then this probability is going to be negligible. So then the only way to distinguish is to make sure that you do not get one instance because you already proved that if you get at one instance, then it is computable. Right? That's the previous lemma.

Yeah. So, so there must be easy. Yes. So why we get one? Okay. So psi of f double prime of f equal to x i y i. Okay. So. Satisfied. Satisfied. One. So let's prove it. Okay. So take any. This is simple. So take any. Xi Yi Xi Sorry Yi and Xj Yj Okay, these are the inputs. Uh, and they must be different. Okay, so they can be two two ways.

Okay, different. The two must be different. Okay, okay. So now we want to compute the probability that the output does not satisfy one instance. Okay, so there are two cases. Okay, so two cases. Case one, which is y i equal to y j, okay? That would be saying that y i is equal to y j, okay? And then other case would be y i different from y j. But actually, we don't speak the case y i different from y j because because if y i is equal to y j.

Then xi must be different from xj. And means now that if you compute yi double prime, that will be the output, which is xi plus f double prime of yi. Yeah, that's the definition of the y output. That the y output is one round faster. The y output is one round faster is x plus f of y.

F double prime, yeah. So what is it now? This is equal to xi, xi plus f double prime of yj, of course because y i and yj are equal. Okay, but this is now different, different than xj plus f double prime yj. Which is equal to yj. Okay, so it's going to be y. Yes, you remember that thing? If they are different, take any i pair i and j. If the y are equal, the outputs y are going to be different, always. We're probably equal, always. You don't understand.

Yeah. Yes, x j plus f double prime of y j because x i is different from x j, right? X i is different from x j, and y i is equal to y j. It is in this equation only the x change, so the other parts is the same. But that's the start of the definition of the y j double prime.

The output for x i x j y. Okay, so let y i equal different from y j. Right. So then you will make the. You will need what? We will need that. Xi, okay, Xi plus f double prime y i should be equal to x j and plus f double prime y j. Okay, double prime parameters. Yes.

Which means, or xi plus xj equal f double prime yj plus f double prime which. Okay, so now yj is different from xj. Then random y so random y. What we get? Random y. Now fix any i, fix any constant exchange, whatever it is. Different, it will not be. Probability that it is bad is very, yes. So never happens. So and this happens with probability at most the cube of n times n.

Okay. Okay. So which means? Which means that the probability of not of the event not unique is that possible? Well, I need to take a new object. So it's supposed Q to the two times two to the minus n. Which is a negligible. Yes. So we accept, right? I need to take union bound because the computational major is for one pair. But you can for the first pair, for the second pair, how many times you just union bound. Yes. So the so accept the probability negligible. At the end of the first round, we have one.

By the Birkhoff lemma, conditioning on every witness, the distance is negligible. Negligible, or at least negligible. So then, then, then S computes statistically close to R by the lemma. Okay. So, yeah. Now, okay. Point four is just that R is statistically close to P. Okay, that's what I said. Like a random function is already statistically distinguishable.

From the definition, from the definition, assuming q equal to lambda plus, right? Because the probability that That the probability that I will get the same output twice, right? Fix any pair of bits. The probability that I get the same output twice is two to the minus n. How many collisions can happen with the first? Any probability of colliding with any other collision? Sorry, you know about. And I will get q squared times two to the minus n negative.

At the end of the road. We also say that since the finance also hold the the the banking part, we can have control over the end to the power of n making it more so there. Yes yes yes exactly. This is the third or the fourth point. Ah, for the meaning that.

I need to calculate something. One, two, three. Get it? Yes. Thank you. Okay. So let's take a break.

## PARTE 2

We we have seen that under minimal computational assumptions, the existence of our function, or if one security measure, then we can build the URF. Okay, and we have explained a little bit how this thing looks like, and how the key looks like, how the hash looks like, and all that.

Yes, and we know already that with the TLS we can just we can already do encryption, right? Okay, and we can do efficiently. But one question remains. Okay, but one question. So one question remains. 所以，我们，我们，这个假设，being being sham， assuming a p r or n。 All over that. But then, if you look at the construction, the construction was like this. It was for example, R is key of R plus message. This was the ciphertext. R is random. This was our message.

And we we have proved that if if the function is a bijection then this function this this is a secure cipher. So it in fact a chosen plaintext attack secure cipher. So one problem maybe with this with this construction is you know what about long messages, very long messages, very long m.

Of the kind like m1 up to m t, where each mi is a message being digested. Okay, so we we have said the message is empty, right? And the function also has to output empty. Okay, in concrete terms, the output value has to be 56 bytes. Okay, the input is also 256 bits. Okay, so R is going to be 256 bits and F K of R does then going to be 256 bits. Wow, fantastic. What is E is not the 256 bits, but it's 200 squared, 124, 248. Okay, multiple of 500 of 256.

If it's not a multiple, okay, whatever. You can just, you know, but other garbage and make it, no? Yes. Okay, so this is a very practical problem. Okay, so like when you have, when you establish a new channel, you might want to use it to help meet the law methods. Yeah, that's typically what, whatever. Like making like that, you share a key, right?

For instance, using WhatsApp, then there is a key that is shared by the two by the two the two sessions, two WhatsApp session, not only encrypt all the communication, so they cannot speak to each other. So they need to encrypt a lot of messages with this key. Yeah. The question is, how do we do it? Okay. So every time someone sends a message or WhatsApp, I will use this encryption key.

But in order to do it, well, of course, I need. So if the message is very long, if the message is longer, it is like any length, whatever is the length of the message. If I have a function f which has the same output length as my message, I'm done. Whenever I have the function f.

Which is the same output length of the message, and then I can do testing. Okay, okay. Unfortunately, the world the world doesn't work like this. Okay, there is just one F, one, and everybody can see. Or maybe there are five, whatever, no. Okay, so there is just AES or DES or whatever, and these are fixed-length cipher. And they cannot limit to under 56 bits.

Okay, and we cannot change it. Yes, it's sold all all over the world as a piece of hardware, and everybody uses it. The entire market. The same interpretation, and the key is of this length, and the message is of that length. You cannot change the length of it. Okay, is it clear? So.

Okay, well, of course we want to we do not want to break back the wheel. Okay, so f exists. We have f, right? If we have f, we have p, and we want to encrypt the long message using it. Okay, so this is called. So we need. The so-called mode of operation, but it is mode of operation, okay? And mode of operation is how we use AES to encrypt messages that are of length, that are of length terabytes, gigabytes, or whatever. Okay, this is called, but in a certain way, yes.

Okay, so it is like the well, of course, the generalization of this question. Okay, this question is the message is one block, and it can, but could be of the same length of the output areas. What if you have two blocks, three blocks, five blocks? How do you encrypt them? Okay, to be a practical problem. How do you encrypt them? Security.

Sometimes also called, sometimes also domain extension is another name. Okay, domain extension of cipher, domain extension of PDF, domain extension of yeah. So I will extend the domain. Okay. Okay. So in that case, we have many ways to do it. They are all standard stuff. They are standard guys by standard box. Okay. So perhaps the simplest idea is just to.

Well, the same procedure. We know we know already it doesn't work. It would be to do like M one on your keys, so we call it like M one, and then F K, and then M two, and F K. Right, I mean, a priori one would say, I have S, and then if I want to encrypt many messages, then I just do a yes or the first block, a yes or the second block. But this is a good one. I think.

Okay, of course we've already known, okay. But of course, never use, but never, never do this. Okay, this is sometimes called the ECB, which stands for the electronic codebook. Okay, this is an encryption mode that you should never use. Okay, but it existed because again, these things developed before proof of security, before even CPA security existed. Okay. Okay. Anyway, nobody used it. Okay. So then there are many other motivation. I will draw a few pictures now, and then we will try to analyze one, which is also the most important. Okay.

So for instance, here is another idea. I can do this. M one L K, and then I get some outputs. Oops. So actually, actually not. So I actually do this. M one XOR R. Okay, then this I go goes into into F K, and then they XOR, and then they run in XOR, and then again F K. Okay, it was going to decide this XOR, the output of the previous thing, like this.

Yes, so I do this, okay? I take the message and I XOR it with a I XOR it with the random part, the algorithm. Like we know we need randomness, right? Yeah, so I I take the message, I XOR with the random part. And then I I do this. And then what do I output? I output c zero, c one, and then c two, and all up to c e.

Okay, so that's it. That's called the C B C cipher block chain. Yes. So C zero is that? C zero is that. Exactly. Because otherwise Bob doesn't know how to decrypt. Right? I need to send R to Bob, so how do you decrypt that? Actually, that's the question. So how do you decrypt?

So that yes, so like one block. Say that you have one block. So then what you do? You decrypt C one, and then you start with M C two. Yes, what do you mean when you claim to C one? You you use the. To to make it but what does it mean decrypting? Because what's f? F is a function. It's a function. What kind of function? So you need to do like that. You mean yeah? No no no. You think the correct thing. Okay, so he says the correct thing. Okay, he says that you think of these as like only one block. Yes. So the message is one block. Yes. So then this ciphertext is going to be R C one.

Okay, how can we decrypt? In order to decrypt, we need the value that we XORed with, so the value that we entered inside. We need to recover the value that was encrypted. If we cannot recover, we don't get XOR. If we can, we get them one. Yes. So what does it mean that the function f must be AES? Okay, we need AES. We need the full power of AES.

Yeah. So f needs to be there. Okay. Okay. So so the order is not the correct order because f is not an encryption, right? It's just another function, but it's still a permutation. But with the knowledge of the key, you can invert the permutation. Yeah. Okay. So that's one. Okay.

So there are many other options. So, for instance, one that is actually similar to what we did in our previous construction, which was this. So, which was this? So we take f k, f k num. We take r. And then we do F K of R XOR M one, and this was C one. Yes, so this was our construction. This was our original construction. Yes.

Remember this? So was the one that I showed. Showed that one. R comma fk equals plus m one. Yes. So now what about m two? Okay. So well, I can do this now. Fk. So what we put inside fk, I can put two things. One is this. I can put it from here. Okay, that's one option. I can also do. Okay.

So one is called CFB. It is CFB, cipher feedback, because the ciphertext is fed back into F. The other one is output feedback, because the output of F is fed back to the input of F. Another way. Yes. Say. Otherwise, it cannot be. How do we know? No, no, no. I mean, what does it add as security? No, it's not possible. I'm saying because every, every yes, every. If you run the punch up, you run the machine.

Right, it's really an easy part, exactly as we did for the case when the message was just one block. We said, okay, the message is one block. I can encrypt to be there. As the adversary, I can do many ways. But now, and not just one block, it's many blocks, and I and I only have F, which is of fixed length, yeah. So the block cipher is of fixed length, but I want to encrypt the input of variable input length.

Okay. Yes. So these are two ways to do it. One is this. One is this. So do I need to invert the function here? Well, for CPA I do not, right? For CPA I do not, because I take R, I do have k, U R, I XOR with C one, I get M one. No, right? For all p is the same. So f does not need to be invertible. Any other of course. Okay? I don't need to invert f. In the CBC, I need it to invert. Okay.

No, I said that how do I decrypt? Okay, if I have just one block to decrypt, what I need to do is to do C one sort F K over. So I don't need to invert. I just compute it in the forward direction again to decrypt. Yeah, well, which was true also already in our abstract, in our original abstract, in fact, we didn't need to invert.

Right. In the CBC mode, you need to know. Hey. Okay. One likely annoying thing of this construction is that is that they are kind of sequential. So like like Luca did know. So to encrypt M one, to encrypt M two, I need to first encrypt M one. Yeah, and to encrypt MT and to wait to encrypt MT, it's sequential. It's not parallel. Yeah, this also no. Like, I mean, okay. Here I can do in one case. In this OSB, I can do some pre-computation. Like I can take R and compute all this R K R, and then the next one, and the next one, and then I XOR all at the end. Right? I can do pre-computation, and then I can do parallel.

In the in the in the yellow one, I cannot. I need to work right, so I can just. But also in the green one, I cannot parallelize the part. I first need to precompute, and then again. So it's not fully parallelized. Is it secure? Nothing. No, I mean I'm just saying that in terms of this construction, to.

The encryption is sequential, okay? So like this for sure, right? Because in order to encrypt them two, I need C one, so I need to wait. If I have a lot message which is terabyte, I need like sequentially block by block. Yeah. In the case of here it's the same because I need to see. I also need the size in order to encrypt the next. In the green one is not really like this because I first compute all the path.

Because I start with R and I compute this key R, then the output. So this I can do even before I get the message. Then I can I can save these values and then when the message comes, I I can parallelize. But the computation of the R is sequential. Okay, okay. So the next mode is fully parallelized. Okay, so I will just I will just like I will just.

Speak about this. This is fully parallelized. It's called counter. Okay, the counter mode goes like this. That so this goes like this. This r r plus one and then until. R plus T minus one. So R is three four. Okay. So R is eleven over say zero one. Okay, n equals to 256. Okay, I take a random input for for AES. Okay, and now I start counting. Okay, what does it mean counting though? Because it's a bit string. Well, a bit string I can represent as an integer. No, and bit string is an integer between 0 to to the n minus 1. Yes. So I count. I count mod 2 to the n. Right.

So I add, add this one, add this one. Okay, but I need mod two to the end. So addition here is addition mod two to the end. Okay, okay. And now we will, I do this. Okay, and this, so and one, so and two. So all is independent now. This is fully parallel.

Yes, and then my output is of course c1, c2, c3, and also c0. I got all of it. Okay, sorry. Okay, so I pick a random number and I send it to you, and then I start counting. I plus one, I plus I plus three. How many dots do I need to do? Whatever, I just count. Okay, notice that there will be a problem if I would count too long. In theory, okay. I mean, it is very important for the security books that the counter never repeats. But this counter is used to the end. You will never increase it to the end plus. Yes. Never end.

Okay. Okay. So the here means that this is secure. Here, CTR is C is secure assuming. F together. Okay, and the C C P security now needs for what we say really variable, variable input length. Okay, what do I mean? Well, what do I mean is that you see now, of course, these constructions, right? These constructions, I guarantee the message is of arbitrary length. Okay, so my security definition should also capture this. How? Well, what CCA is doing? CCA basically is that the adversary can make encryption queries, and now we get to the length. So the adversary can say.

Encrypt to this block, and then encrypt to five blocks, and then encrypt to two other blocks, and then the challenge is two messages that have the same number of blocks, but the number of blocks can change. It is called variable length. Okay, so just to see the security, first the adversary can choose the length of the message to be encrypted, of course, because every party can choose. Okay, so suppose.

Any question? Yeah. This only applied counter. So the previous three are not. Ah, they are all secure. Yeah. So also this CBC is secure and then CFB secure and OFB secure. Yeah, they are all secure. You can put the same. Yes. They are all secure. But CTR is nothing.

Proof for the others will be kind of very similar, isn't it? So this proof will be kind of very similar to the proof that we did already for one. But then it will be slightly more challenging because now we have these many blocks. So, but the proof idea is not very hard, the technical proof. So the idea is similar. So this will be similar to our linear proof.

Or seeing or block, okay. But we require the unfair, okay. So what do we do, okay? You should do well. We just do the expected thing. We start with the chaos start, okay. So so what do we need to do first? Okay, we need to group them. No adversarial distinguish. We come in from zero, come in from one.

M zero and one are messages of arbitrary length. T block and the adversary can also do a few points of arbitrary length. Yes. So maybe I can actually I can try to draw it. So right, there is the adversary, there is the challenger, and then the adversary can make this query.

Right, you can make like all the codes. You can make M, which is like M one up to M p, c dots, and then you receive c zero, c one, c p. Yes, that's the nature, and you can do this for how many queries as you want, okay? And in this way, the t can also change, okay? As I said, five t. The first query one block, the second query five blocks. Let's forget the t. I just write t, okay? I don't want you to use another index t, but of course t can be different in every query again. The message, the blocks can be different, the t can be different, so that the adversary is gonna ask for this to Messages right, so say m 0 star, which is equal to I don't know m 0 1 star, and then m 0 star t, right, and then also m 1 star, which is m 1 1.

And star one T, no. Maybe actually T star. Okay, could be any anything. Okay, yeah. So then again, oh sorry, you will receive C zero star, C one star, up to C T star, and then you can make more of the first query, right? Repeat it. Is n c zero one t and equal to one t again just repeat it and then you will finish multiplication. So that that's the the the situation is the interface. Okay, so this is the interface of variable input length CPA secure. Yeah, so that's yeah.

What do you mean by how many queries does he want? Can you like to explain some of the points? But it can be polynomial number of queries, but the length of this query can be different. First query length is t one, second query t two, t three, t four, up to t q and t q and q is a point. At most q minus two point zero and another.

Also, key the polynomial. Okay, okay. Yeah. Okay. Yeah Every time we know the number of messages blocks, so we can reach the number. Yes, yes, yes. This is important. In fact, the number of blocks is for you now. Maybe very much. Okay, okay, I was good. So that's the game. So what we need to do? We need to do that. The game. No, and the other can distinguish. They click from zero start, but they click from master in this game. Yeah. And the other game, like right. So, so let let.

Zero, be the above game, with b equal zero, and using CTR, right? Same for one, right? We need to show. We need to show difficult computation. So we need to prove that the yellow word, which is challenge, is encrypted in different ways, in different solutions. So the yellow word, which is challenge, or is encrypted in one step. Okay, that's just a definition basically. Nothing new. Okay, the other new thing is the fact that the length of the messages can change from one to another. The other new thing.

Okay, if they get the word, how do we compute the c zero, c one, like this? Okay, right. So when Albert represents m, right, I will pick r. So I mean, if you want, I can also write it. So this means. A adalah t minus one plus n t yes. Iko saya tarakan di kerjilah, zero dan one tu, eh, lima contoh.

Okay. So the challenge will be r star and then fk r star plus one star. Is it clear? Yes. Are we good? Okay. So now what we are doing is proof. Of course, we take the function fk and we break it around the star. Because by security of P, right? So by security of P, by security of N, we can replace f k with r, chosen randomly from N into N. Yes. So we become.

Is that doing this? Okay, you are. You do. Are of are. Are of are of one. Are of are of the machine one. Okay, that's all. Okay, so let us call this this h zero, h one. Okay, so. We have G zero operation goes to H zero and G one operation goes to H and then H part. So this is H part. Okay.

Okay, so now it comes the the non trivial part. Okay, so up to now, up to now we still need to prove that H one is distinguishable from H zero. Okay, so how we do it? We need to use another experiment. So we finally introduce, finally introduce, introduce H two. Okay.

Such that now c zero star, c one star and c t star is just uniform, is uniform random. Okay, this is what I would like to to do. Okay. So then, then okay. So then we need to prove now that we show we show that h zero is computatio sorry h yeah h zero is statistically close to h one and h one close to h two.

And h1 is also statistically close to h2, as we need number of bits is equal. Okay, is it clear the logic of it? So like, it's like the same proof that we did for one block. Only that there are many there are many blocks. Okay. So what am I do? I first use the security of the PRNG to change everything with the random function.

Yeah. So everything is using random function. Finally, I would like to say, you know what, the challenge, the challenge target, the C star, is just uniform. Okay. If I can, and then I stop. If I can prove now, this I will be happy. Okay. So why the challenge target is uniform? Okay. So that's the question that we have. Okay. So look.

Are the challenge. The challenge. The challenge is c zero star which is equal to r star. Yes, uniform. And then will be c one star which is equal to r of r star plus. Plus m star b one, yes. And then after c star of c star c star of c star r of r star plus c star.

Minus one plus m star b t star. What's the star? This information. Is it correct? Okay, so I just wrote how the challenge looks like in this hybrid h zero and h one. This is just it's just the original thing, but instead of having a k I have r. Yes, and I have what's that?

Okay, so now I would like to argue that this ciphertext is going to be uniform. Okay, given all, given all the encryptions. Okay, so I'm not sure. If there are no encryption queries, this is actually the same thing that we do to the other proof. So if there are no encryption queries, this is still a uniform because our star is uniform. Our star is uniform.

Are we satisfied? Yes, and independent because they are all distinct values. Yes, the input r is all distinct values. Yes, so they are working in order, and then by what I said is like a uniform random variable. Yes, okay. Except that there are the encryption queries. Of course, no. If there would be no encryption queries, that.

This was the same thing that we encountered in the other case, in the case of one block, but now it's just more complicated. Okay, still we will argue that we will argue that the following is correct. Assume, assume that how do we do this challenge type attack? We pick a target.

And we start counting, yes. So we count after after plus one, after plus two, up to after plus this start. I'm sorry. Fine. Assume, assume that the span that we count, the number of values, this this this exact values that we count, yeah. Never ever overlap with any of the encryption way.

Okay, like I mean, you know, like the encryption when it comes, when the first encryption when it comes, I pick a random number and then I count, after one, after two, after three, yes. Then I do another encryption, I pick another number and then I count, ah, after one, after two, yes. Assume that they never overlap, okay? So these values are start, are start, after one, they are all fresh, fresh and different from what the sequence that we count at the end.

Yeah. Okay. There, there. Yes. So we are going to compute the probability that we open up, but this is not the case. Okay. So that's the idea. Okay. Easy kid. Um. Okay. So. So. We can be like this. Let so we just adjust prime the last thing and then we stop. Let over let be the event that after after plus one this sequence after.

Plus e minus one overlaps with any of r plus one, r plus e minus one. Yeah, if overlaps. Does not happen. Then h zero is statistically is identical, is identical to h one, which is identical to to h one, which is identical to h two. Okay, they are all identical. Okay, because this sequence is fresh, then it's random. They are all identical then.

Dependent of the message, yeah. So we only need to show we only need to show probability of error. Yeah, that's the only thing that we need. To show. Okay. Let's. So that these four is by simple counting actually. I mean it's not very very hard. It's not very hard to show. It's like a simple counting. Any questions? Okay.

So I think I will be starting next next year. Let's get on fire now.
