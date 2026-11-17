# CR LESSON 10 - Transcription

No. Yes, we are actually in the middle of this counting. I forgot. Let me shuffle this counting that was left in the in the previous table. Okay. Yes, and then. Since we are approaching half of the course, I would say today we can do together a few exercises. Okay, which is a good. I think it's a good time for a checkpoint. Okay, let's finish our list and then we're going to make a few exercises together. Okay, on the things that we have studied so far.

So we were studying the counter mode. I mean, let me just let me just recapitulate where we stand. Okay. Right. So this was this mode of operation where we start counting from a random number. Okay. And you think about as a as a number, as the message mod to the end. Okay.

And then you count in R up to one, and you count the quotient mod two to the n. So then whatever did you count as long as one, and you get a new value that you input to a yes, to f of k with the same k, and then the output you solve with the next block of n.

So you can keep going. Okay, although there are only 2 to the n counters, there are only 2 to the n counters. Your message will not never exhaust the counters. Your message is finite, and the number of counters is exponential. Okay, yes. Okay, so then we we said okay, we want to prove CPA security. So we need to show that even though the adversary can make an encryption query, the encryption of any two messages of the same length, right?

Of course, the two messages must be of the same length because if the length is different, you can distinguish by just looking at the length of the ciphertext. Okay, so this is a general thing that encryption doesn't hide the length of the message. The goal of encryption to hide the length of it. But of course, now the encryption payload can be of different length, right? Which kind of models the fact that in the real world, Alice and Bob, when we encrypt the messages, are of arbitrary length, and you want that every message that you don't know.

What is inside the encryption reveals nothing about the plaintext. Okay, so which is secrecy? Yeah, so we are trying to prove secrecy, which means this game with bit zero, where we encrypt with zero star, is indistinguishable from the game where we encrypt with one star. Yeah. Okay. So how did we approach this proof? We said, okay, we have a PRF. So then the first thing that we can do, of course, is to switch K with a random function.

Yes. So now, instead of instead of computing right, instead of computing ciphertext like this, R and then fk over them one and up to R plus T minus one, right? Which which fk to R, where R is chosen randomly among all the tables from M big to N big. Okay, so then of course by by the beauty of the PRF, this would be like a simple reduction to the PRF, where you can prove that the two experiments are indistinguishable. Okay, we didn't do the reduction. I mean, but this would be like a simple exercise. You don't need like any undecidability. It's just a direct reduction because there is just one PRF with one key.

So and you can make how many how many queries as you want. So I hope this is clear. If not, I advise you to try to do the induction because it's basic. Any questions? For good. Okay. So okay. So then we are in this island now. Okay. So there is no PRF anymore. So so the group now it's kind of formation today.

Because because there are no cryptographic assumptions anymore, so we are in a situation where the new challenge is random. Okay, so now what's the point? That when we create this challenge cipher text, we create it like this. We pick a random star. We start counting from our star. We count to the point where we need, depending on what is the length of the message that the adversary has chosen, and then.

We encrypt using the random function. Okay. Okay. So now the point was that that, as we said, if there would be no encryption queries, then it would be so. This proof is kind of like very similar to the proof that we already did for, I think it was what for encrypting one block. So remember this when we studied encryption for one block. There was just one bit mode operation for one block. I think it was.

Outs feedback or cyber feedback or one of the two, okay. But it was not discovered. It was just another. It was another. Okay. But I mean, they proved there like at the top of the same challenge. The challenge is that although you use this random function to encrypt the challenge ciphertext, there are encryption ways. And encryption ways might reveal something.

Yeah, so you need to deal with encryption, but if there would be no encryption, then there would be nothing, because now we have that. So there is just a challenge. Then of course you can directly argue that the cipher text is uniform, because our star is uniform. Right? Then you you you run this random function on star, and you get uniform random value. And if you run it on star plus one, also uniform random value. So this is just a sequence of one-time pads with different key.

Yeah, and the ciphertext is there. Okay, but unfortunately there are the encryption queries. Okay, so you need just to count these encryption now to take into account the encryption queries. These encryption queries now are a problem, right? Because in principle, no, if one encryption query could repeat one of these values, right, then potentially it could reveal something about the message. Okay. Right. I mean, just to make an example, no, it could be that, for instance, and in the encryption queries we always encrypt to zero.

Okay, and then also one of your challenge messages to go get it, and the other one is I don't know whatever. Right, so if you get like the same start, say, then the encryption of the first block or the encryption value will be the same as the encryption of the first block in the challenge, and then you can see. Understand? Okay, but mind as long as these are not affected, all good.

The same argument works as before, so so long the the sequence of counter do not does not overlap with any of the other counter from encryption phase. It's the same argument as in the case there are no two counters. Okay, so. So it's all about it's all about the probability of this event. Okay, which I think we already defined it, right? So overlap is the event that the sequence overlaps with any of the other sequences. Okay, so then if the overlap does not happen, does not happen, then these experiments are actually identical. Okay, like the experiment.

Where we print zero, okay, is identical to the experiment where we replace the challenge with uniform random sequence of one letter. And the same, of course, the H1 is also identical to the experiment where the challenge is uniform. Okay. Okay. So now we have these two experiments that are identical except if an event happens.

Okay, which intuitively means that the only way to distinguish them is to make an event. So if we can prove that the event happens with a small probability, then we're done. Because we use already many other times this part. Okay, it's a simple probability fact that we use already all the times. So the only the only thing that remains is to prove that the event happens with negligible probability. Okay, so let's analyze the event.

So, in order to analyze it, okay. So now, of course, now the probability of overlap depends by the number of queries, right? I mean, of course, we expect that more queries more likely there will be the overlap, and also the longer the query, the more likely for overlap to happen. So, just to simplify, right, just to make life work for us, let's just assume that, I mean, let's just look at all the queries that the adversary made.

And take the largest polynomial among yes sorry, regarding overlapping. Yes. Why we don't want that the two counters overlap? If we are encrypting both m zero star and m one star that are deterministic messages, what is the problem if the two counters overlap? Yes. I make this example now. For this one, for this one, the problem is that.

Say, for example, that the adversary makes an encryption query m, which is of length, okay, all the block at all the block, okay, you encrypt all the block, or just the first block in the doesn't matter, okay. Let's say the first block m1 in the, yeah, and then when you encrypt with the the the encryption query, you pick some value r.

Now, when you do the challenge, also you choose the the first block of zero star to be deal or deal. Okay, you can do it. Yeah. And now, the difference that it overlaps. So let's say that it overlaps in the following step. Then, actually, the same value. Okay. We pick twice the same couple. So see, now this is a problem because if I encrypt them zero star, I will get the same block as the girl who encrypts your query. If instead he encrypts them one, we should get something else. Like one one one one one. Then we get nothing different.

So anything, you see, it's a problem. But I mean, for this to be a problem, that means to be the case that we just pick the same one, right? I mean, this counter can overlap at any point. If it overlaps in in r plus one or r plus two, it can overlap everything. Whenever it overlaps, it's a problem. On the other end, if it never overlaps, it's obviously.

Yeah. Then okay, okay, so okay, so this is all. Okay, now we say to to count the distribution in a simple way. Okay, just to simplify the counting, let us just make the worst assumption. Without loss of generality, let us fix the parameter so that the distribution is max.

Okay. When is the probability max? We take the max among all queries and all lengths. So just take any adversary. Yeah. Of course, among all the queries, there will be some queries which are longer than others. Okay. And among all, and this number could be more or less.

With respect to the number of ciphertexts. Let us take the map. So assume that like all the words are like super long, and moreover they are the the map length is also the length of the map. Yeah, does that make sense? So just like this. So then this is just one parameter. Otherwise, then you could account different parameters. Nothing changes, okay?

I think all of them. Okay, so so let let Q of lambda be the max among number of picture queries and. Lack of lack of hardware. Okay. So and just assume that. T of lambda is also equal to T star of lambda, which is also Q of lambda. Let's just take the max over everything. Sounds good? Okay. So now we just need to compare these two things, right?

We need to compare. Yes, we need to compare this. Say r, no, and then r plus one. We need to compare these two sequences, no? R plus one, r plus two, r two, r. Plus q minus one, okay. So that this is the the sequence for every encryption for a single, okay for a single, okay. Okay, anyway we're going to use the union bound, okay. So how do we bound overlap? Okay, we bound it like this. First, confuse the probability overlap for one, one, then by the union bound, then by the union bound.

Either I overlap in the first way or in the second way or in the third way. Yes. Okay. So let's fix one way. Take one encryption way. Yeah. So and this is the sequence of counts for this way. Yeah. Pick a random one and then count. Add plus one until when you count, add plus two minus one. But two is the max of all the lengths and all the number of questions is the maximum. So it's the longest.

The thing that makes it a lot worse, yeah. So on the other hand, we we have this r star, r star plus one, right? R star plus two, r star plus q minus one. Q is the max again over f. Okay. Okay, so now we want to compute the probability that these two sequences overlap at any point. Okay, I mean it's just count. Okay, so like you just identify the set of values for which overlap happened. What are the set of values for which overlap happened? You just need to look at the stream and then count all the in the middle, all that is in between.

Yeah. Okay. So of course, what what are the extremes? Right? The extremes are like this. For instance, like as far as last day, that that's one thing. Then one extreme is that the last value that I count in an encryption query happens to be the first value then.

That I, no, that I hit there because if encryption arrives until a star minus one then I'm not going up. Okay, so the first value that makes me go up is when a star is equal to a plus q minus one. That's the first one. Okay, on the other end, this value can be equal to that. Right? So this is next thing. Okay, so then you just take all the values in the in the middle there also.

They also make overlap happen, so then you can compute the probability overlap. Okay, so what? So the probability, probability of overlap, is going to be at most the same. For one q of probability of overlap i, okay, overlap i is equal to i in q. Okay, q is the number of queries, no? Yes, for one query the situation is this, and we just need to compute the probability of overlap i.

Okay, and then when that overlap I happens, yeah, overlap I, overlap I, if and only if the following true that alpha minus q plus one is that more is is so R star I or R, R is that more the. This and at least this, r star plus q minus one. Okay, I think these are the three. Because in fact, if r okay, say r f times b, r star plus q minus one. Okay, so then until what you count, you count until.

After yeah, I mean if r f s to be after plus q minus one overlaps with them, yes. And if r f s to be after minus q plus one, yeah. Then you start away far away, but then you come, come, come, come, and at the last value you eat after. Because how many values you can up until length of the message minus one, so it's up to plus two minus one minus two plus one. Is that? Make sense? Okay. So okay, so the probability over the pi now is like all these values, these interval divided over possible values, number possible cases divided over cases, so probability over the pi.

It's at most, so the number of values is just the difference, the interval plus one, right? Right. So, right among between five and seven, there are three ones. So it's the difference between n plus one, which is two q minus one. If you do the math, so this is going to be two q minus one over two to the n, two to the n. Okay, which is negative. Okay, so this. Okay, two q minus one comes from the difference. Okay, you can do at start. You can do the left, the right bound minus the left bound plus one.

Is that all the values in the interval, which are exactly two q minus? Yeah. So let's see that q is equal to ten. Yeah. R star is equal to r plus r plus three. Then we have only seven intervals in that range. So that's what you say. R star is equal to ten. Yeah.

Yes, and I'm sorry. Let's say that q is equal to 10. Okay, and then r star interlaps with overlaps with r plus 3. Then we have seven overlaps in that ring. Yes, yes, yes. And counting them all in the interval. And that's the problem. Yes, and counting them all. So then the probability, right? So in other words, for for for this for this for this event to happen, okay, I need to pick n, which is in the interval.

What is the probability that lies in the in the interval? If the number of bytes in the interval, which is two q minus one, yeah, divided by all possible bytes, which is two to the q, yeah. Are we good? Question. Question? If there is any question, I I can say more. No? Good. Absolutely. Exactly. Okay.

Okay, great. So now we know how to encrypt messages of arbitrary length. Yes. Okay. So now we reached quite a good standing for encryption. Now we know how to use symmetric encryption with a short key for an unbounded number of messages and for messages of arbitrary length. Okay, it's almost all of it.

Almost because, as we will see later, there are situations in which you do not only want to protect the secrecy of the message, but also the authenticity of the message. So you want to actually build a secure channel. Okay, so you want an encryption scheme that hides the message, okay, but also does not allow the adversary to modify it. Okay, again, encode it like I, I.

Incredibly, my verification number is sent into Amazon. I need to change. I need to decrypt it. That's exactly what HTTPS uses. In fact, one part of HTTPS is computable, but it's not all because we still need other knowledge. How do you get authenticity? Message authentication, which we already studied in the information gathering setting, but we didn't study it.

In the computer, okay. So this is what the missing. Once we have that, we will we will combine the two and we will have a secure channel, and then we will have very efficient and practical symmetric. Okay. Okay. Okay. But let's do this in the next lecture. We can start it for the next lecture.

And instead, I wanted to do today some exercises. Okay, let's do some exercises on whatever we. Okay. Um. So I try to do like one for each of the things that we. Valid. So let's maybe start with perfectivity. So this is simple exercise on perfectivity. The exercise is proof or a proof. The secret key encryption pi is perfectly secret.

If and only if for every distribution M over Caligraph M, and for every c zero, c one in the ciphertext space. Then the probability that c is equal to zero is the same as the probability of c equal to zero. Okay, so this is a question about primitivity. So I say, consider now the definition of primitivity and the definition they like it. That take any distribution over the message space, any distribution.

And they get in better side attack. Okay, so then I mean, of course, c is always equal to m of k m, where k is uniform and imperfective. Yeah. Okay, so c is either a variable which depends only on k and m. k is uniform, m is whatever distribution. To the definition for every distribution. So then take any two ciphertexts. Then the probability of any two ciphertexts, which is to say, like for every distribution of the message, every ciphertext is equal. Okay. Which basically is the same as saying the ciphertexts we want to do the two ciphertexts.

Accepting it. No. No. I mean, yeah. Teacher, problem. You're a problem. Uh, it means that the ciphertext is insecure, so this is not perfectly secret. So over here, I understand. What I say, like, are you being a counterexample? Okay, so you say you're being a counterexample. Yeah. Okay. And and what your counterexample? If I take M as uniform over M, and I don't change anything in encryption, I take insert here. This is not perfectly secret, but it affects that the ciphertext is uniform.

Because I'm saying that. No. Let d be equal to m. B equal to. No. Let d be equal to m over m. And let. This. Not yet. Okay. M. Equal m. Yeah. Is what I'm saying. So, and we should also see. Oh, no, practically, I think it's false. So the probability that yeah, okay, I think it's correct. Sorry, not everything. Okay, so how do you prove it's not true? Okay, so in general, no. Say proof or refute. Okay, so proof means that you would have to prove that it's always true.

Refute means there exists some encryption that satisfies the definition, but is not perfectly secret. So, of course, now the identity function is not perfectly secret, right? But it still satisfies the definition because for the uniform distribution, the mutual information is zero. Yeah. But you have to have that in tune for every element.

Like we we pick them, but in the definition that you did here, for every adversary. Another table point. Another point. Even a valid point, but it actually doesn't work. Yeah, because this definition should hold for every m, and it does not. It's not working. Great point. So, so this does not work, right? Yes. Thanks. That's a great point. That does not work.

Because the definition says for every n over n, right? Okay, so you need to give. Well, I mean the intuition was going in the right direction. So like you need to give an encryption scheme that satisfies this property for every distribution, not just the uniform distribution.

So actually, the other way around. So what? So you were trying to be a scheme that satisfies this definition, but is not perfectly secure. But actually, the other way around, you actually need to find a key which is perfectly secret, but does not satisfy the definition. This definition is actually wrong. So now, as I think about it, yeah. So sorry. I mean, so we we are like overdoing things. So like this definition basically says that the cipher text is uniform for every permutation of the message space, which is very strong.

It's like super strong definition. Of course, I think actually it implies perfectly perfect secrecy. But the point is that the other way around is not true. So encryption scheme doesn't doesn't need to be uniform in order to be perfectly secret. That the opponent is adversary. You can be perfectly secret, but not uniformly random in the universe of the ciphertext space.

Is the intuition clear? So how do you get a key which is perfectly secret but not uniform? So we need to find a key. We need. Good part. And that perfect secret, perfect secret, but for which, but such that c is not zero. Okay, so that should be enough. What you do, you just take any perfectly secret information, and then you just append an extra bit, which is always zero. For example, yeah, for example, take c equal k xor.

And this is one method, okay. And now, and now, let c prime be zero concatenated with concatenated with k XOR n. Okay, and the decryption simply discard the first the first bit. Yeah, so so this is like stopped now because the ciphertext page now it depends now how you define the ciphertext bit because.

Yes, right. So how? So this is the ciphertext. So I mean, let's say that say that m is equal to zero one n, okay, which is also equal to k, okay, and which is also equal to c, okay. But c prime will be zero one. N plus one. Okay, so meaning that the decryption just ignores the third bit, okay, even if it's one. Yeah. So which then contradicts this definition now, right? Because the definition is for every zero and one. Okay, so it could be that zero starts with zero and one starts with one, and then the probability would not be the same because honest encryption never starts with one.

Yeah, in fact, one to prove it will be zero. You need to be like careful now, because of course, if I would define the ciphertext space to be all stuff with zero, then it would still be true. Yeah, I think. Okay, but on the other hand, I mean this key clearly is still better than zero. See the point? Let me make that.

Yes. Yes. How we finish? Oh, it's finished because okay. Well, I mean then then if you take if you take what is it? Take zero to be any ciphertext. And string starting with zero and t one and exactly one, okay? Then probability of c equal to zero is not equal to probability of c equal to one.

And on the other end, on the other end, the secret the secret encryption is still perfectly. Okay, I mean this is clear, not magic. Yeah, yeah. It's possible to find a counterexample that doesn't cost quite too expensive with. I don't know, I didn't get the point.

I'm sure. Yeah. If we know that zero start with zero, the one start with one, we know that the probability is the same. No, the encryption, the encryption never produces a ciphertext that starts with one. The probability that the encryption starts with one is zero.

Let's look at our definition. C prime always starts with D, so no C prime is going to start with M. Okay. Okay. So let's so let's do something about something about computational security. Let's do something about PK. Be one without. Let G let G from 0 1 n into 0 1 2 n be a PK. Show.

That G is also a one-way function. Okay, so any pair G is also one-way function, and this G now expands from n to two n. Understand? Okay, how would you do? To show that maybe G is a one-way function. Yeah, we can assume that G is not a boy function, and that there is an attacker that can easily compute the input from the output of such such function. Yeah, yeah, yeah, yeah. And then, so you say like a first step is to say assume not.

Right. So there exists some PPT adversary A such that, in fact, the probability that the probability that okay, we just collect it, the probability that. G, oh, yes, G of A of Y equals Y, assuming that the. Y comes from G of U N, right? So say that this adversary gets an Y, Y, where Y comes from G of, we will inform you, I don't see it. Then this guy gives you, you give Y to A, right? And A of Y out of something such that the G of that something is equal to.

Okay, which means a or y finds a preimage of g. Yeah, some preimage doesn't need to be the same. Yes. Okay, because there is action, which is at least one over four. Okay, so the probability that g of a or y equals y. It means that A finds a preimage of y. Assuming that y comes from the page. Yes, does it make sense? Okay. So yes. So then, what I will do? Then.

Yes, that we are going to build, we build, we build, we build, we protect, build against the attack. Yes, okay. So we need to find this b. Okay, so we have a, we have b, we have c, and c is the challenger for this P H G, I think. C is the P H G challenger. Okay, so Alice, look now, what the input of b.

Huh? What type of thing? What? Yes, I mean from or output of the hash, right? So, what's the length of this thing? Two n, exactly. So it will take some two n thing, right? So we know that y either comes from G of U n. No, or from U to N. Okay, so there are two worlds. One world where Y is distributed like G of U1, and another world where Y is distributed uniform. And we need to distinguish which case it is. Yes, yes. Someone of you want to send Y to.

A. Yes. And if A equals X. Yes. Yes. I check. Yes. I do not know G. G of course. Okay. So you know. Of course, I know G. No security by a clue. Everybody. So I compute G of X and. Yes. Equal Y. One. Yes. F. F is equal to zero. Done. Is it clear? Yeah. Okay. So like he said, I have this random, I have this value. I don't know if it is for the PRC or not. So what do I do? I try to see if A is able to invert.

Okay, and then, and then you will output some x. Okay, now we check if this x is the preimage of y. Indeed, if it did, I would say it was actually a PRG. If it is not, I would say. The most okay. So now what? Now now we need to compute the advantage of this adversary. So what is the probability that the crime is equal to one, assuming say Y is distributed like G of.

U N. Okay. Right. So in this case. Yes. Yeah. In this case, I mean, output one if and only if A is successful. Okay. So, and in the other case, we are actually always outputting. Okay. So only case where we output one is in case A is successful. So this probability, the probability of G of a y equals what? Yeah, when y is from G of u, right? Exactly. So, uh.

Y, what G U N? Okay. Sorry, the choice of which Y we the challenger uses it's random or it's it's fixed. So I'm saying, assuming Y can't compute G U N, the probability that the output one is exactly the probability that A invert Y assuming Y can't compute. Yeah.

So I'm I'm fixing it because it's in the condition. Okay, so so this is that. On the other end, what is the probability that the prime is one, assuming y is uniform? Okay, and now the point is that the point is that that the probability that now it depends on this one. Okay, so like it's gonna be like so there is the there is there is zero one n.

And then there is zero, one, two, n. So and then it's like this, okay? This P R G is deterministic, right? And so on and so forth. So, but now there are here points that do not correspond to any break. Yes. So of course, whenever we land, when we pick around the wire, we land in one of these points that do not have any image. We never open one. On the other end, on the other end, if we if we land, if we land on on a point which has a image, yes, we might open one.

Yes, so of course now our probability of outputting one is at most the probability that we land and touch a point in the iteration. No, because in the other case we never. Yeah, so so this is at most the probability that we land in a point which which has a range. What probability? Exactly, like two to the n.

Divided by two to the n, two to the two n, which is two to the minus n. Yes, because the number of points, the number of images are two to the n. Yes, and the number of points in two to the zero one to the two n are two to the n. So the advantage, the advantage.

Yes. Okay. This is a. At least. Yes. Yes. Yes. Is it finished? The B has the advantage one over. So I think we proved that there exists a B which breaks the caching. The advantage of B is one over. No, let's go. You understand it, huh? The stage. I mean, this advantage is like the probability of p prime equal one when y is distributed like g of u n, right? Minus the probability of p prime equal one when y is uniform.

Now to the white. Yes. Good. Okay. Okay, so uh, okay, so like, difficult exercise, okay. I leave it for you at home, okay. The idea is that difficult exercise. Difficult, true. Same as Bob, but now g goes from g o one n into g o one n plus one, okay? Not to n. It stretches just one bit, not stretches from n. Okay, so why is it difficult?

Okay, it's not so difficult, but I mean it's a bit tougher because, like you see, in this case, in this case, I mean if we take the same proof that we just did, it breaks because because in this case using that two to the n, you have two to the n plus one, and two to the n over two to the n plus one is one half.

And x here minus one up is not true at least one of the two. Yeah, x could be one up and then the difference is negative. See the point? See the point? Okay, so which means that our proof is like too too. We are like kind of losing something in the proof, okay?

I mean, in particular, maybe just I give you like a hint towards this, and then I leave you to to fill the dots. But of course, you may think about that. So maybe one problem with this proof is that whenever the adversary fails, you just give up and out the deal. Maybe this is too generous. Okay, maybe when he fails.

We should still have some chance of winning. So for instance, what if, what if instead of doing this, here we do this. Okay, so that even when you fail, you still have some probability of success. This may be hard to analyze. Okay, so I I suggest you redo the analysis. Try to be careful now and not look first, right? And try to you already do split the analysis, right? And compute that the probability of winning also taking into account.

The case where a succeeds and where a fails, right? A either succeeds or fails. So you need to kind of split the probability into a more careful computation, and then you compute the actual. Okay, so I basically give you the actual. Just finalize. Okay. So this was like this is like a little bit.

Okay, at exams, little bit easy, then we cannot be so difficult. But the the one that we did is like like same degree with yes, we might expect at exams. The one that we did together, the second one is a bit tougher. Okay, see, try to do it. So let me say, let's do some, let's do some exercise on P R S.

Yes. Yes. Let's make a size of the. Okay. Consider the following. For each of it. For each of the following. Yes. Say. If we define this, okay. Okay, one. F K of X is equal to G prime of K. G prime. G of K. Ah, okay, G prime of K, yes. Plus x, where g prime g is p h g from lambda into lambda plus l, and g prime.

So that we see that all the and okay, and let the x be the one lambda and prime of k is equal to g of k truncated to lambda, eh? Okay, so I I have an input x which is already in the ciphertext and then I do this. I wanted to do f k of x. I do g of k, g of k. Okay, g prime of k. Sorry, g prime of k plus x. Yeah. So I do g plus k, which is just g of k concatenated to the length of x.

Yeah, and then I do. That's all right. Okay. So that is my question. I mean, doesn't need to be x of like lambda could be also lambda plus one, lambda plus two up to lambda plus n. Okay. Let us start with this. Okay. Is it good? To f k of x, oops, f k of x is equal to f x of k. And three. Let's see here.

Yes, f k of x. Ah, f k prime of x. Yes, is equal to f k of zero concatenated x concatenated to f k of x concatenated one. Okay, so this is like so. We're x now, is in 0, 1, n or lambda or whatever, n minus 1. You ready? And fk goes from 0, 1, n to 0, 1, n. That's it. Okay, so I kind of like I have a PRF from n to n, and I define a PRF from n minus 1 to n by using fk of dx or rather fk of x 1.

In my initial case, is actually f k prime of x equal to f k of zero x and f k of one x. So it's basically one. Okay, four by four, four PLS. One, two, three, four. Okay, so let's take one by one. So let's start with this. F K of x is equal to G prime of K plus x. What is it? Yeah or not?

Is it guarantees that the first lambda bits of G are not the input? It goes from zero one lambda to zero one lambda plus L. So the guarantee that the first lambda bits are not simply the input. Why you don't know? We cannot make any assumption. The only thing is the G must be secure.

But the second part, G prime, we're eliminating. Yes. So you're saying like what G prime? Yes. You're saying what G? No, no, but what? But if they would scale, not actually. No, in G, we're saying goes from zero one lambda, zero one lambda plus alpha. Yes, and then you cut. And G prime, we're cutting that. Yeah, yeah, yeah. Goes from zero one lambda to zero one lambda.

Yes, yes, yes. Take a branch, okay, yes. No, that. All right, where are we missing? What do you think? What do you want to say? No, we just happen. Okay. Yeah, that's correct. Yeah, you just like take a branch, okay, and then you take out the last one first, and then you just take the first one.

So you don't care, you don't. The adjoint, the reference. Yes. So we want to do or disprove the the projection, the projection of the. So if you compose g with the projection of the first lambda components, is or not a PRG because no no no. Well then, well.

Because if it is a PRG, that is a PRG. I think so. So if you take any PRG and you encrypt the output, it is not a PRG. That's for sure. So I think that this is a. Okay. Why? How do you do it? Then I encrypt it. Because. So in observation here, first of all, observe that G prime is a PRG. I mean, if I take any PRG, okay, and then I encrypt.

Okay, and when I get a P and G, this is important because if the P and G after tapping is the thing which we were proving for, and it happens, not the other, because it's the thing. Are we good with it? So then he says, okay, G prime is a P and G. So what? No. G prime is the derivative function. Yeah. Also, that K always comes from out.

Yes. So in the game, as the adversary could send the M zero, yes, as a first message, yes, and then as a challenge message, it sends again the M zero, of course, can distinguish. No, distinguish what? Because the adversary doesn't know much. If you repeat the same query in the game of F, no.

It's not an encryption. It's not that we need that. Most functions are deterministic. F is always deterministic. It can't be a problem. So the XOR just is a permutation. So if one is uniform, it looks uniform. If the output of g prime k looks uniform, then XORing it is just a permutation, and it still looks uniform. So the intuition makes always clear enough. So like I mean, the intuition makes that kind of sense. But like if it's like yo, I mean g prime k is a bijective. So then I take k.

Sure, and then I prime okay, and I get something uniform, and then I XOR it with something whatever, and I get something uniform. That is true. But look, what is it? What is that? That is a PRM. So it doesn't need to be the only the for for for any x, this is uniform in isolation, right? There are the queries. No, I mean this should be true. We can make a query. We can make a query where x is from zeros, and we find out the output of G and K. Yeah. And then for the next query, we just know the output of G and K. We XOR it with.

So this looks problematic. No, what he said, no. He said like, what if I put x to be zero? Okay, then I get the actual output. Okay, now this never changes. I can predict all possible future output. That's a good correct. Yeah. So you see, like this question was like a kind of was like a trap, not like because he said like, yeah, g prime is a PNC, then it looks like the output of these actions uniform, but.

So, why no? Because I mean, we also did that any query. X one and gets g of prime of k plus x one, okay, and then you get x two, and just like slightly changing what you said, when it's the same, okay, and then I don't know, call this y one, call this y two.

And then what's my one plus one? Equal to x one plus x two. That's all. Right. So then I would just do this. Then I would play x one. I would play x two. Then I would do the XOR. If it happens to be. X one plus X two, I output one, otherwise I output zero. The probability that I output one is one minus the exponent. Okay. Or what? What he said is also correct. Like, I take X one to be zero, right? And then and then I get G prime of K, and then on the second query, I will output one if.

Y two plus square root of K is equal to. Okay. That's me. You see how to finish. So you guys see how to finish or should should I? Right. I will watch me for a moment. Okay. So then I mean then I mean then I will treat the an adversary. That breaks is or I call it a no, a that I make x one, it gets y one, it makes x two, it gets y two, and then b prime for one, if and only if, I said y one slash y two is equal to x one slash x two.

And then I got the number. In the real world, I only solve one. In the real world, I only solve one. This equation two, this happens only if we go back to the minus lambda. And what's the opposite of that? Yes. Okay. So you you see right. I now compute the advantage and then the advantage is one minus negligible. Okay. Good. All good. What do you think about two? F k x is f k. See that k and x are the same. K and x are the same.

The key and the input are the same length, and then F K of x is that x of K. Be able to note. So what's the intuition? Yeah. The key and x are the same length. Yeah, assuming they are the same. Otherwise, it doesn't match. I mean, of course, the exam, the exercises will be written more more explicitly. And if it appears by chance, if it appears, let f be a function such that the ciphertext is the key and then what is your intuition here? If prime was not a PRF, we could also make queries to f and break f for composing the.

Right and five, and so you are suggesting induction. Yeah, but I mean, what's the induction? Before, like we, so I'm letting you kind of like what did I mean? Before, like going to any reduction or attack or whatever, like you should first like do induction. Okay, so okay, so for instance, like okay, sure. If you want to make an induction, so the induction should use which problem?

The fact that f is a bijective, but for using the property, the fact is bijective, the key should be actually be secret. Secret? No, uniform. But it is the construction if the key will be. If the key is f x, okay. If the x uniform. Who who picks it? Who picks it? The attacker. This I'm super bad, right? I mean, before even thinking about the reduction, or maybe this is a way to think also. Like I would say, okay, let's say for example that I want to prove this to be secure. Then I would need to make a reduction, but in this reduction I need to use the security of F. And what do I need in order to use the security of F? A uniform random key. How is the key in this construction? The key sets. And who picks sets? The attacker. And then the attack that we do, It's gonna be impossible. Yeah, doesn't make sense. Okay, so it's this suggests that the construction should not be secure. But of course, the fact that you cannot do the reduction doesn't mean that it's secure. Maybe it does matter that. So I mean, now, but this suggests that, come on, this like looks like impossible to overcome this obstacle. So it should be not secure. Yeah. So now it's only matter about how to prove there is not secure. How to prove there is not secure.

Now this depends on national. So, like any whenever we need to prove that something is not secure, and this is based on an arbitrary belief, okay? Like in this case, it's so far sufficient that there exists an F for which this is not secure. Secure, secure for which the contract is not secure.

Yeah, that's fine. Because in general, I mean, maybe. I mean, in fact, like if F would be super strong, then if F is a PRF for every choice of the key, then this construction is secure. But I mean, maybe there is a. But this is a super strong. I mean, like we are so. What does this suggest?

My question is that do you consider invertibility? Yes, but invertibility. I mean, every thing needs to be a direct one. So yes, invertibility, but for which key? That's the point. So we need to find. We need to find an f. Calling f f f, okay, such that f prime of k x, which is equal to f f of x k, okay, not a PRF, but f f is still a PRF. We need to find a PRF f f.

Such that f k prime of x, which is defined to be f x, okay, in the construction is not there. Yes, did I break correctly? Yeah. You can call f prime the new piare, yeah, which is the other piare with the switch between the key and the inputs. Try to find any of that which is still a PRF, but for which the construction is insecure. Is it correct? Okay. So, I mean, this is not so hard. I mean, the point is this. Okay, what's the point? That in the definition of PRF, the key is secret. Okay. But for this construction, the key is chosen by the attacker. So what about the PRF that?

Is always good, but for some key that never happens, becomes insecure. So I mean, what I take is like what about the what about for this time? F of k x, sorry, F. Of k x, and defining f based of k again, it's equal to zero to the n if k is equal to zero to the n, and otherwise it is equal to f k of x for PRF f. What is it? Okay, so I'm defining a new function now based on any function.

Which is a secure PRF. Okay, take any f, secure PRF, and just define a bad to be this, then it's just f, except that if the key happens to be zero, this one outputs what is it? You did again. I left the key zero. Always there. So the only bad thing that can happen is that Eve here, or whatever, Eve here, two to the one time. Okay. So this is the PRF. So F then, this is the PRF has k equal zero, k equal zero, happen with probability at most two to the one time.

Yes. But what do you think? What about f of kx of f of xk, f bed or xk? But f bed or xk, what do you think? Not enough. Why? Because I can choose x to be d, and then when I get, we get to see it d, yeah. As A can choose x, can choose x equal zero, and output b prime equal one if and only if y is equal to zero. Right? So then I output one.

The advantage is one minus negative one, one minus two to the minus n, which is the probability that we have a table element square zero. Good. Okay, so let's do briefly another example. Let's do three and four. Okay, four I will give you. I said homework. Three we can do together. So what do you think? This three is also like a little bit. So is this secure or not? So this is actually a little bit tough. If you are not really careful, it's tough because.

Because it's principle, okay. You have no clue, and you start to say, okay, maybe it's secure. I'm gonna make a reduction. And then, I mean, it seems that you can make a reduction because I mean, we never do an adversary. So we think of it like I'm happy that this is secure, okay. So assume not, right? Then I can make a reduction for F.

So then, whatever the adversary makes a query x, it is I can simulate the view of the adversary because what do I do? I just do zero concatenated x and I go into the challenge. Then I do x concatenated one and I go into the challenge. Then I concatenate two and I go again. It looks funny, except that I mean the reduction. Right? So I mean the fact that you can make the reduction doesn't mean that the reduction is correct, right? The fact that you can complete in the previous case, right? It was a clear advice that you cannot make the reduction.

How the key is used from the beginning. In this case, it seems that somehow you can make it, but then still you need to prove that the the view that you simulate is perfectly simulated, you know. So this was a bit this is maybe not easy to see also, but the observation is again I I don't hear.

So take take x one is equal to zero and minus one, and x two to be zero and minus two concatenated with one. Okay, so take these two inputs, zero m minus one and zero m minus one concatenated then minus two concatenated with one. And now I will look at the f k prime of x one of x one. What is f k prime of x one? Remember, it is f k when you first append the zero, no? You first append the zero, so if you append the zero.

To zero to minus one, what do you get? Zero, exactly. And then you append one at the end. So what do you get if you append one at the end? Zero n minus one will come into one. Yes. But look at the other one. It's fk fk of. We drop the zero at the beginning, and what do we get if we append zero at the beginning?

Zero n minus one. Ah, okay. Oh, so good. Okay, so what is it now? Zero n minus two, concatenated one square. So the two, the two are equal now. It's a problem. Like I mean, these two are equal now. I can make two points, okay? And now I will take, okay, make the x one. And if the second down from x one is equal to the second down from the alpha from x two, I have two points. One down from zero. Yeah. So this is not possible because I have points here at the beginning and one at the end. Of this version, I will do.

Zero at the end, one at the beginning. The third one, you can say zero at the beginning, one at the beginning. Because then, because I mean, I mean the point is this, okay? The point is that if I append zero at the beginning, one at the beginning, I'm I'm making like a domain separation, I'm like splitting it into parts. If instead I append zero at the beginning, one at the end, I'm not. There is a need for this important.

See the point? So of course, if you make like a good domain separation, the attacks are not working. But if you if your domain separation overlaps, which in this case like there is an accident, make a point which is you can get in both, then you have to. Okay, so four is secure.

Yeah, go in there. Okay. I give you just one for home. Okay, I do homework. There will be an exercise on secret key encryption. Prove that no secret key encryption and that. Can be CPA secure against unbounded attacks. Okay, so we have already proven that no PRG can be computation unbounded secure, no PRF can be computation unbounded secure. I think also no secret encryption, which might be randomized, randomized secret encryption.

Can be secure against some problems. Okay, that's a simple example. Only the whole. Okay, guys. So we have a break now. Yes. I'm on the taxi bus. Calling number. Where is there? Ah. Ah. So we have a break. There is no lecture on Friday, and there is no lecture on. Am I connected? Yeah, yeah. Okay. So we meet the next lecture. Shall I give a call?
