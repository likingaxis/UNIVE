# CR LESSON 7 - Transcription

## PARTE 1

So last time we studied applications of pseudorandomness to the structure in return, right? So we discussed basic idea, which was Alice and Bob instead of sharing the secret key, right? And then encrypt with one-time pad. What they can do? The computational world, they can share the secret for a PRG.

Right, then go off, expand the seed and encrypt, do one-time pad again with the expanded the seed, but encrypting a longer message with respect to the seed, longer than seed, yeah. Right, this was not possible. Information theoretically, but of course, unfortunately, it's only one time, right? So we.

Right, we have seen that that if you could, if you encrypt twice with the same message, no, we are sorry, you encrypt twice with the same key, we are exactly the same problem as in one method. When you can learn, for instance, the source of the encryption, okay. So if you can learn the source, you learn something that you shouldn't learn. The source is just an example.

If you know one of the two messages, in fact you know the entire of the whole message. In your words. Okay, so in chosen plaintext attack, this would be such a bad. Okay, so this kind of kind of highlights that this key is not, for sure, not secure against chosen plaintext attacks. Chosen plaintext attacks means the adversary can get to see encryption of arbitrary messages.

Just and then all your messages that he doesn't know the plaintext of cryptic security. So for this key is nothing. Okay, are we good? Okay, so now we go beyond the limitation and finally achieve CPA security. Okay, CPA security shows that we have a perfect security means.

And then both share a shared key, right? And then can encrypt and and un and unbundle the number of messages. Okay. So the the the key tool to do this is this so-called pseudo random pseudo random function. Okay. So it's a new new tool. Okay. Not the PGM one.

Okay, so we have seen, we have seen that the previous secret key encryption is secure when multiple messages. Are you with it? Right. So to overcome this limitation, to overcome this, we introduce a new tool. Okay. What is this tool? Is the so-called pseudorandom functions. Okay. From previous, from previous also PRF.

So there are no like P, so there are no generators, P R Gs. Okay, there are no functions, P R Fs. Yes. Um. So what is a PRF? Okay. So what is a PRF? It's a PRF. So a PRF, we can take only the deterministic P A C. Okay. So the P A C is a deterministic function, and the P R F is.

So both functions, but if we achieve a seed, right? It doesn't a longer sequence of pseudorandom bits. Okay. If we have f instead, it's a function. Okay. So it takes as input a seed. But actually now the seed would be called key, just be called key. Okay. It takes as input the key. Okay. You can call it seed if you want, but it.

Make sure that you got the key, okay? This is crucial. Plus, after you have fixed the key, okay, you fix the key, you can input additional data to the function. Okay, so the function takes an input, the key, which usually is chosen and by Alice and Bob, and then all the data.

Many points. You can encrypt many points. Okay, not it's not really encryption, but you can compute this function of many points. Okay, so this is what we have in a security against multiple messages. Okay, yeah. Okay, so it's a function family. It's a function. It's a family of functions. Family of functions.

Which we denote like this, okay? F, the graph of f is a family of functions, indexed by this key, okay? Fk, and then I don't know, like 0 1 n into 0 1 n, for instance, okay? Doesn't need to be, doesn't need to be. The function does need to be explicit. It could be like this, okay. But but the length of the input could be much longer than the key, okay. So there will be so there will be security parameters. Lambda is security parameter, but always and the key is of length lambda, yes.

And n is another parameter which denotes the input length. Okay. Okay. So it's it's a family of functions. So you have one function. Yes. Once you fix the key, right? So you have many functions. One for each choice of the key. Once you fix a key, you have one function which goes from T one.

Okay, and that's a function, okay? So it doesn't need to be bijective, okay? Because it's a function, okay? So, okay. Of course, this function comes with a security property, which is pseudorandom, okay? So that's just the syntax. So that's the syntax. What is the security property? Security. What is the security guarantee of this function?

So basically, it's kind of a magic thing, okay. Like, well, I mean, also we are just kind of magic, but this is even more magic. So imagine that, imagine that the agent Bob, okay, go meet the other place, okay, other the other, the other one. But now, instead of sharing a short key.

Okay, they do not share a thing. They they they they share a huge thing. Okay, what is this table? Is the table the corresponding to the function? Okay, it's to the function to some function yes that maps n bit into n bit. Okay, so this function f it maps n bit into n bit yes.

However, this function is efficiently computable, and so if you want to compute the function, you don't need to store the table. You know the key, you know the input, you run the algorithm, and you get the output. Perfect. Yeah. But imagine, for example, this then that Alice and Bob do something different. Okay, so there is no such a function. Okay, it's a mental thing, it's a mental experiment. Alice and Bob share a huge table.

Okay, this table is like the way in which the every each thing in the input and bit is mapped to a state in the output and bit. Okay, how do they choose this table? They choose it uniformly at random among all possible such tables. Yes, so right, so you consider.

One input is a function, yeah. So input output input output for all things, right? This thing is exponential space, so nobody can solve. In fact, in real life, we are not going to solve, yeah. But we are understanding what is if we want the security, what is the security problem, yeah? Okay, so we beat the problem.

A function among all possible functions that map n bits into n bits. Yes? It's a huge number of functions, huge number of inputs. We just pick a random one. Why? Yeah. Now, what is the security guarantee of the PRF? That for a uniformly random choice of the key, every bit of the output.

Nobody can distinguish the output of the PRF from the output of the PRNG. Okay, so the PRF is as good as the random bit, but it's a finite computer. Okay, it's impossible to distinguish the two things. Okay, so that's the end. Okay, so for uniform trials.

Uniform choice, okay, okay. Uniform over lambda bits, yes. No efficiency attack, can tell apart same codes. From f. Okay. From samples of a uniform, let's say uniformly random function. R from 0 1 into 0 1. Okay, you can be writing like this. Okay, so now do not get confused. Okay, it's a uniform random function. Okay, uniform random function doesn't mean that the function R is a random randomizing function. The function R is still a deterministic function.

Okay, meaning if you run the function f on two inputs, you get two equal inputs, you get equal outputs. If you run the function r on two equal inputs, you also get two equal inputs. But this random function, this function, so sometimes for brevity, I will even say random function. But do not get confused. Random function is not a random function. It's a function that is chosen randomly among all possible functions.

Okay. Which is, if they go randomly among all possible, so maybe let me just add this as an option. R is this deterministic, deterministic, but picked randomly among. All possible amount, all possible, okay? All possible max. So zero, man. Yes. Can you see that it is getting apart from ninety percent or more of the time?

It's not a thing. It's not a thing because I I know you cannot tell apart the sample, sample. Okay, so this would be the sample means I can create the function on any point of my domain. Okay, so this is a function. Okay, so it's not just if I give the key, the result.

Yeah. In order to get the output, you need to compute the function on some inputs. Okay, there are two inputs. One is the key, one is the actual input. The key is fixed once and for all. But even after you fix the key, there is no output yet. Okay. The output appears when I run the function on some inputs, like zero zero zero zero zero zero zero zero one, then I get some output. Yeah.

Okay, the security property is that I cannot distinguish samples from this computation. Okay, so I cannot distinguish the world in which I get to see the output of this function, on points of my choice. I choose the point, yeah, to an hypothetical world in which I would get to see the outputs.

On the output, on the same point. Does it make sense? Okay, so we want, I mean, is it better just to define it, to define it? Okay, just now we just meant to like formalize the definition more. Yes. Then it's certainly greater than. So, so, and it's certainly greater than the result of that.

I mean, in in principle, it doesn't need to be. Of course, in the actual application, the fact that n would be equal greater than lambda would allow to encrypt messages of long of large length, length longer than key length. But I mean, in principle, it doesn't need to be.

Even if that is short, it could be like here one minute. We need one function for each choice of key. Say that. We need one function for each choice of key. We need one function for each choice of key. Yes. And it should be this. This function for two different keys should have different.

I mean, from the point of view of that, I don't require any property. I mean, I pick an okay, and then after I pick K, there is a function defined. Okay, I don't require any property like the two keys are different for different. I don't care. The only thing again is that nobody can see which the algorithm from the uniform random function chosen after another from what. But n could be even one bit.

It could be, okay. We will see. Ah, n or n. N. We will use n. N. N is the end of the input. Yeah. If it is one bit, I mean, now if it is one bit, you will not encrypt a long message, but still you can encrypt many messages. Okay, two, because one is one, there are only two possible ones. Right, but I mean.

Yeah. Okay. Anyway, there will be no anyway there will be no limitation on n. And will be another example now. But the definition would make sense even if n is just one bit. Okay. So this means that zeros map to either zero or one, and one is mapped to either zero one. Doesn't need to be repeating, right? Okay.

And I mean, also this distinction actually that that the function length preserving is I just made it for simplicity. Yeah, it doesn't need to be. It could be that the input is n bits and the output is m bits, an m larger than n. Yeah, there will be no problem. Yeah, okay. Okay, like in real life, they don't work. They don't work. The T is gonna be like 256 bits and N is gonna be also 256.

And you actually can even change it. Just so you will. Okay, maybe let me say something before giving the definition. Okay, let me first give the definition because I I started already. So let me define it now. Okay, I I just like to make it like even more formal. I would say that f as a whole.

The theorem. If and then I can write in a compact way. I can write like this that I can compare two games. Okay, game F A real. Okay, and this is the computation. This is which works on the game. A idea. Okay, so we have these two games, real and ideal. Okay, it's just like this. That so the game. This is the game real.

Okay, and this is the game idea. So two players. So and the interface is the same. Okay, so there is an adversary and there is a challenger. Okay, in the real game, the the challenger picks a key, one and four. Okay, in the other game, the challenger picks r. Okay, r is the random function from n to n. Okay, so we are going to write it like this, from the set of all functions mapping n into n.

Okay, so this is okay. The set of all maps. Yes. So consider the set of all maps or tables from n bit strings into n bit strings. Yeah. Pick r a random among these tables. Yes. Does make sense? Okay. Now, what can the adversary do? The adversary can just say, okay, can say, okay, this is x in zero one n. I want to see y. In this case, y is also in zero one n. And we repeat this many times.

Okay, repeat. And what is why? Why is either a k or x, or it is other or x? Okay, that's it. And now the adversary will need to distinguish out of the prime, and then the probability that we prime is one. In the yellow game, minus the probability that you get is one. In the green game, the absolute value is almost negligible. Right? This is the definition of approximation. This is just a compact way to not write the equation of the tangent. Yes? Remember, approximation we already defined. What by approximation means? The distinguishing advantage of every PT adversary is negligible.

Yeah, I'll write the function because we already defined. Are we good? So that that's it. Okay. So like, what is the property of this function? The property of this function is that you cannot distinguish the output of the function for a uniform random key, okay, from the output the output from a random table chosen at random among all possibilities.

Okay. Okay, so that is it, yeah. Any questions? All good. Yes. Second one. Yes. Yeah, calligraphy or the aspect. Yeah, the set is fantastic. It's like the games are parameterized by the padding, right? I mean, the idea game actually never needs the padding. You only need the padding to know what is the input length and the output length to define the calligraphy art. Another point, like just that, okay, yeah.

What B prime? What puppy? Yes, B prime is the guess of the adversary, right? You guess whether he lives in the yellow world or in the green world, yeah, right? And this symbol, the the approx symbol, right, means that the probability that B prime is one in the yellow minus the probability that B prime is one in the green is small. So again.

Yeah, it's a way to say you cannot be scared, except that we make sure about it. Yes. So what? Yes, yes, it's implicit because since I said that a is a probabilistic polynomial time machine, it can for sure make a most polynomial time program. I don't need to, right? But if I want to prove security, right, then I measure everything and I would say.

The BLS is TQ epsilon secure for every adversary in the round time T and that makes Q queries. The probability that false epsilon. I could do it, but then we would be full of T and Q and epsilon. So let's simplify and do something. Yeah, polynomial time. So polynomial time for sure. Okay, you cannot explore the entire field.

Nothing that exploring the table is necessarily a problem, but in that event, yes. Are we good with the theory? But maybe let me make a mark and give you also an exercise. Remember, I mean other defining the green game, the green game, it's exponential time, right? I mean this challenger is unbalanced, okay.

See, is that wrong? Again, I mean, because in the green gate, I need to sample. I mean, I need to write down all possible tables and I need to pick one number, right? I mean, I don't know how to prevent this polynomial attack. Because the number of tables is huge, so.

Actually, doubly exponential in n. See the problem? Okay, this is like a little bit bothering. Okay, I mean the yellow game is for a normal time, and the green game is is not. It's a bit strange. I'm not sure what Kathleen and do actually about this, I forgot. But anyway, you don't need C to be unbounded.

Okay. Although I write it like this, yeah, and okay, maybe it's a little bit slow. It doesn't really matter, okay, because I would do an equivalent way, which would be also efficient. So I mean, for any, there exists a challenger that is that does the same as the real challenger, and it's also for a longer time.

Okay, and I do this. I mean, I do not need the entire input. Okay, so the idea is I do not need the entire input because anyway, his adversary is just gonna query polynomially inputs. So the idea is, okay, when he comes, I just answer with a random state. I take example one random point whenever he makes a move.

The only distinction is if he makes the same query twice, I reply with what I replied before, of course, because it's a deterministic function. It's not like he comes with X, I can understand it, and then he comes with X again, I don't understand. No, that would be wrong. Then you would distinguish. But what I can do is he comes with X, and then I reply that I don't understand, and then I I take note that the input X has output Y.

When it comes to the X two, if it is different from all the X's, I think I understand. If not, I look at this table, which is only for example, is long enough because he can make a false example in many ways. And then I, okay. So there is no need to actually do this thing in exponential time. We can actually do it in polynomial. Okay, this is like a little bit of fun, and I know I need details after that.

It's not so important. Does it make sense? Oh, I think this was too much. Not fair. This is unfair. Sir. Yes. Are we good? Present. Okay. Awesome. So our exercise. I wanted to do the exercise. You want? You want to make the figure? Yeah. Okay. Very tough. It means love.

Okay, so exercise. Sila tujuin sesat dan tujuin perpajian. Exercise. Kepi. No. F. Itu dia F. Again, about it. Okay. I mean, not very practical, maybe. Not I don't think it's a magic thing. It is here. Okay, if the adversary would be computational above that.

As you could break any key, we did this exercise together. You could also break any pair. Computationaly, our adversary could also break it. All, which very large problem. Probably we need to make many questions. Okay, okay. So try to solve them. Okay, great. So, okay, what is the application of P R F s now? Well, with P R F s we can get secret key encryption with a short key and without the random element. Okay. So, but of course, get the other question now would be the P R F s. So, really, let me actually first ask this question. Okay, now would be Yes. Okay, and this is really what I told you. Okay, that this is a symmetric key word. Theory and practice they cannot change at these under the last assumptions. Yeah, they give slightly different things. Okay, in practice, in practice.

What is it? If he had asked, it's just AES, okay? AES triple DES, and you got cipher. Okay, so if you know it's a. Blockers. These are real world blockers that are used that are used in the real world. Okay, maybe I should remove this tree now. I get that. Okay, that yes are examples of block ciphers. And I mean, you practice. People just assume that they are yes. It's just an assumption. Nobody can break this assumption. Nobody can.

Prove it. I don't know. Nobody knows. Okay. Nobody knows how to prove it. To prove AES is a theorem, please. Okay. I mean, the historical maybe is not very surprising, right? Because so AES is a standard. Okay, the standard for doing encryption actually. Okay, but I mean, AES by itself is not a cipher. So this is like very confusing all the time. And because it's called a block cipher, right? So you think it's a cipher.

But AES is not a cipher. It's insecure. It's completely insecure, as it stands. AES is a PRF. Then you can use it as a complete cipher. It's a different thing. Okay? It's not true that AES is a cipher. You would you would see it in just one lecture. Okay. So, unfortunately, nobody knows how to prove that AES is a PRF.

Maybe this is not very surprising because AES was standardized in early 2000. Okay, in early 2000, the group of security was still on its infancy. Nobody knew about security in early 2000, like only 50 people. I don't know. Not very many, many years. Okay, so this small number of people doesn't prove security. In fact, the first definition of proof of security, I mean after Shannon, it's around like 80 days. Okay, it's still quite years, but even then, okay, when the next standard died, the years of proof of security was not very many.

Problem for for them. They didn't require that they has to be provably secure. Okay. Okay. So as I told you at the beginning of the course, the things are very different now. Okay. When the minister makes a call for a new cryptography, it should be provably secure. That's like the request number one. Okay. True for the post quantum candidates, secure messaging, whatever you want, everything must be provably.

TLS SSL, but back in 2000, not yet. Okay, for this reason, AES is not provably secure, and it's also very hard to prove that it's provably secure because it was not designed to be provably secure in mind. Okay, DES kind of similar. I mean, both the design of both actually follows some theoretical ideas, but then in order to make it very efficient, they depart from these ideas and then.

So it's actually a little bit more fine-grained than this. Okay, it's not just AES. It's only heuristic. DES is only heuristic. We cannot say anything. It's not really like this. Maybe we touch a little bit about this later. Okay. The reason for this is because AES is actually more than a PRF. More in the sense that AES and DES and any block cipher.

It's not just a function, but a permutation, because you need to invert. Yeah, okay. So function, you don't know invert. Permutation, it's possible to invert. Yes. So, but in particular, AES can be also secure, secure as it is. It will always be secure.

That doesn't matter so much, okay. So as I will show you that there are some the damn principles behind the AES, DES, and so on. But we will touch upon those later because we need to take into account the fact that the function must also be invertible, which complicates things even further. So let's cut this area. But I mean, for practitioners, like what is a secure PRF? Just AES. Nobody can prove it. Nobody can disprove it. Nobody can break it.

So we just assume it's a conjecture. If tomorrow nobody breaks it, and I don't know, we just standardize new blocks. Yeah, how did I break it? I don't even know. And I mean, this is the case for like many crypto, real world crypto things, right? They follow theory up to some point, and then they depart from the theory, and then somebody breaks it.

We can't identify Shaolin, right? On these assumptions, if we want to study anything, we have to find the problem. Okay? So, if somebody breaks AES in five years, I don't know. I have no clue. Since we were 25 for now, but even with quantum machines, like even.

Do not know how to break it. But if they would, in the end, they are broken. The assumption that is standing for maybe 20 years, 30 years, I don't know, 50 years. Yes. Okay. So I would say, fairly, this is less surprising than instead in five years we have a polynomial time algorithm that we can solve in fact.

That would be much more surprising, because people are changing this word set, not just the key. But of course, I might be wrong. Okay, so, but this is the state of things. Okay, so AES, people believe is a BEF, and then they just use it, the same way that you use it to construct a encryption method, an encryption code.

So few channels, okay. All this imagine for efficiency. That's just the same. Here in practice, are just the same. The only difference is how you build it together. Okay. Once you have that, it's the same. No difference between theory and practice. Everything is proven the same. And there's something that you get. Okay. So it's very important. So the random function, that's very important. Okay. So in theory.

In theory, how can you be the PRF in theory? Of course, in theory, one function. Okay, of course, because everything we can just need from one function. That's what what I'm trying to from Vietnam. In theory, you just need any one function, like any one function is enough to be the PRF. Okay, any one function enough to be the PRF. Same thing.

Is it practical? No. Is it for you to attack? Yes. Okay. Okay. One more century, but this is probably not practical, at least for now, not practical. Or same assumptions, same assumptions as public key. Okay, like fakir, dia, disket long, disket long, la, ni, okay, I mean of course, all di dalam fakir, so of course.

Give me more functions. Yes, of course, but no. What I mean here is that assuming this, I can be efficient, okay, practical. So this would be practical, practical and efficient, okay. If I make a specific assumption, not just a one-way function, system, no, no, particular assumption, then I can construct an efficient. Yes, this will be implementable in whatever.

Computer, okay, but still less efficient than AES. Still less, sorry, let me just write this. Still less efficient than AES. Yes. Well, this is the difference between practical and the theory. Oh yeah. Well, this is just a kind of loose terminology. I mean, there is not such a big difference. I mean, efficient usually just means for normal time, usually. Can you understand that? The idea of being efficient is just for normal time, okay? But, by the way, right, some of the typical normal time are still very strange to implement and very, very heavy to implement. There will be not practical.

Okay, so impractical would be something that come on. We never implement. It would be like how slow. Of course, I mean this is very important. When I say practical, I mean I couldn't implement like today. Even libraries that are already available would be like two lines of code and it would be like super fast in software. Okay, then can it be like fast in actual and that cheap like this?

Many not so as good as AES. That's probably the only reason why AES is still so popular these days. Why not be able to prove a theorem? Because it's like so hard that you can implement super fast in a number and in a program. So everybody else, yeah. For for secret information. Hey.

Unfortunately, unfortunately, nobody knows how to do public key crypto from DRS, for example, and that's actually impossible. Okay, so you cannot prove that it's impossible to do public key cryptography from DRS. So unfortunately, we cannot prove public key cryptography yet. You need to do something more clever, and unfortunately, we cannot do that.

You need five minutes, at least. Okay, so that's more or less ten of things in in the demo then. So again, I will tell you little bits about the design of this block cipher, but later because they are slightly more complicated than what we actually need. So for now, let's just assume that we have a PRF. I would like to tell you two things today. So one thing is how we construct the PRF from number functions.

Okay, then I will just tell you like the basic idea. It's not very hard, and it's actually not so. I mean, the actual construction that we show is not so bad because it's not a start for the one-way function, but it's start for many G. Okay, you just you're any G, and from a G you can get. That's actually not so bad. I mean, you can implement it. It's okay. The problem is that that G from one-way function. That's much more. It's okay.

Okay, and but before doing that, maybe let me show you like application. Okay, let's just assume for for a second that we have the P R F. Okay, we believe that somebody gave it to us and just use the P R F to build the secure communication. Yes, and then in the second part of the lecture, I'll try to give you a bit about the construction. Okay, okay, sounds good. So let's.

Let's so. So we see today. Okay. Let's first. Let's first apply PRFs to build practical now secret key machine. Okay. So practical here one key short. And many messages. Okay, so beating Shannon all the way. Yes, short key, as many messages as you want. You share it only once, and you are done. Okay, okay. So of course, to to do this.

We first need to understand how to define security, right? Because we define security only for one message. Yeah. Now we need to define security for multiple messages. Okay. And then we need to show that there is a construction from an idea to a secret encryption for many messages. Okay. So we start.

By defining secrecy and future secure for many messages, okay, this is so called chosen plaintext attack secure secrecy and future, okay, this chosen plaintext attack. Module that I was telling about. Okay, this is the standard security definition for encryption. Okay, so intuitively, what does it mean that would be the same definition? Exactly the same, right? So the adversary cannot distinguish the encryption of zero from the encryption of one. Remember, there was one time. Remember this? Now he cannot do this even though he can observe arbitrary many encryptions.

Okay, that's it. So same definition as before, but the adversary now is more powerful because he can also observe other. So there are there are going to be in particular other pictures with the same key. Okay, that will be part of the definition. Okay, and then let's make it even worse or better for the adversary. The adversary can even choose the messages that we encrypt.

Okay, because we are changes with it. Okay, let me change. Anyway, if no adversary exists, that's only better for us. So long as we can prove. Okay, yes. So, okay, finish. Like we say, there's pi and that. Is CPA secure? If okay, and again, it will be two games, game uh CPA, lambda zero, and game lambda one. The URT, which is exactly the same, almost the same definition as the previous one for CPA.

Remember, we already we already we already studied this definition, but now the definition will be slightly stronger. So, what is game? Game by a lambda b, right? B the bit. CPA. Okay, what's the game? The game is exactly as we already. Started. There is an adversary. There is a challenger. The challenger has the key. Well, there is the space of the the key. And and then we can run. The main thing of this game was the adversary picks messages. And then we return C.

Maybe let's continue. So C star is let me write encryption under the key K of m star b a and the verifier. Let's see the signature and the PK of M star B. Okay. Okay, that was the previous thing. That was exactly the previous definition. Yeah, it was one attack, was only a single attack and one attack, and the attack can be distinguished. It was encryption of a single attack, encryption of another. But now, the attacker can also make the chosen plaintext attack. Okay, what does it mean? You can choose any message and observe the encryption of that message.

Okay, any message. So, say again, he chooses m and he gets to see c, which is the encryption under the key k. And again, you repeat this many times. And C is the encryption. Okay, so actually, as I wrote it, the definition is incorrect, but we will correct it in a second. But first, I would like to discuss the idea if it is good. Okay, so I would suggest the definition again that we would like to define. So the first thing is to distinguish encryption from decryption.

But on top of that, now we can also make encryption play. The chosen plaintext attack is called the chosen plaintext because they are actually choose the plaintext. Okay. So then choose the plaintext to see the ciphertext. Choose the plaintext to see the ciphertext. This can be repeated many times, and it can be done sooner before the challenge. Usually, this is called the challenge. Before the challenge and after the challenge. Okay.

Okay. Uh, good. Yes. Of course, right, right. Because remember, now, like as we, we already discussed. This will be the first the notion of one-time security, right? I mean, of course, the goal of the attacker could be to find the key, yeah. But hardness of finding the key would be a very bad definition. Remember this, because the encryption scheme that outputs the message in the clear, and this guy doesn't use it, it's very secure under this definition. The key is very hard to find. I know, don't even use it.

But they all put the message, right? So this says that this is not a good definition, the fact that the key is hard to find. However, sure, it should be hard to find the key, and this definition implies that it's hard to find the key, because if it would be easy to find the key, I could also distinguish the encryption is our zero or our one. So, yes.

But not only that, not only the keys have to find, the message is have to find, no, but not only the entire message is have to find. It have to find the first bit, or the second bit, or the third bit, or any function of the message. The encryption hides anything of the message besides what you already know. It is exactly the same issue, only that we are, you know.

Adapted to the to the real world, it's always yes. Okay, is the definition here? So actually, the definition is wrong, as I I said to you. Okay, the definition is just impossible, as I put it. So meaning that it's not true that these two games would be distinguishable.

Can you say one? Okay, so he said what if n is equal to m zero star or m one star, right? In that case, what happens in that case? Okay, so so the observation, if the definition is adequate, and as we actually always use encryption now, so until now, all the encryption keys that we studied were deterministic. Okay, so if I guess the key and I guess the message, I always get the same cipher.

Okay, okay. So now, so anchor is deterministic. Until now, it will not be. Yes, I can. But until now, it was deterministic. Yeah. Now, of course, if anchor is deterministic, well, then of course, then it says, okay, then this is broken because look, I started with the with the way m equal m zero start.

Okay, then I I get to see the encryption on zero star. Now I ask them zero star and one star. I get to see the challenge. If the challenge is the same text that I received, the previous answer, the previous previous query, I know the encryption on zero or on zero star or the white will be known. And again.

Okay. So now one way out is to say, okay, this is not possible. The adversary cannot do this. Okay, the adversary cannot query and zero style as he queried before. But this is not the good approach. Okay, because otherwise we are saying like, I mean, what if Alice encrypts the same message twice? Then I don't know. We cannot say anything about this case. Let's get better.

So it would not be a good approach to to resyncing the adversary. Resyncing the adversary is almost better. You should never do it unless you are there is no other way. Okay, so let what's the way out? Instead of resyncing the adversary, let's make encryption randomized. Brilliant idea. Okay, so imagine that the encryption is now randomized. What does it mean? If I fix the key and I encrypt twice the same message, there is a huge randomness space, and the challenger that that comes out is always different.

L'exempio invece vuol proprio capire invece che tanto capire tutti sempre ma di fillette insomma i probabili di lesbienne i probabili di, a standi ben ferme per tomorrow right okay yeah okay so let's make it a little more sorry so what has changed in this definition just one thing okay so it's not equal anymore.

But with an arrow here, arrow, okay, an arrow. Okay, now this is the correct solution. Okay, so what does he need? Let's need a marker. This, a marker. Okay, ink. Must be random. Okay. What does it mean that that we will write C and okay C. Okay. This is the same as writing.

C equal is what we think about under my computation, and is an algorithm that takes two inputs. One input is the actual input, the other input is the random code, the charge, the fixed, a fixed charge of randomness. Okay, if it's a Turing machine, it will have the random tape. Okay, tape for the random code. Okay, but this doesn't matter so much. Okay, so and.

Set R, we are going to write, where R is picked uniformly from I don't know, like whatever, like let's call it R. This is the random message space. Okay, so this is the random message space. Yes, it could be like anything. It could be points on a little curve. It could be I don't know something strange later on, or it could be just an empty string. It would be an empty string for now. In the next in the next construction is going to be just an empty string. I do an empty string at random, and then I use this.

As an additional input to the encryption. Okay, so now the encryption. If I encrypt twice, I'm going to be able to. Understand? Okay. Even if the randomness space is so large that even if you make polynomial many queries, the probability you're going to get two random things the same is negligible. For sure. That we will not.

Okay, so that's an important thing. Okay, so considering function, sorry, considering the encryption chosen plaintext attack, encryption must be randomized. Okay, so if the encryption is not randomized, it's not random. Okay, so this is the example. AES is not an encryption scheme.

DES is not a big problem because AES is the remedy. DES is the remedy, so it cannot cannot be. Yeah. Ah. Ah. Okay, great great question. The question is, if it is randomized, how can you decrypt? It would be possible. We know the secret key, and then we have auxiliary information in the ciphertext that allows us to decrypt, even though.

Yeah, even though, or sometimes actually this would be the case for the first example. The randomness can be bad. Yeah, nobody said that the randomness is good. The randomness could be bad. It is most important that the randomness is hidden from the adversary. This is something general.

Okay, but for the construction that we show, the randomness is meant to be public. So at least we laugh in the description. But in general, it doesn't need to be like this. That in many other cases, it would be like this that the randomness is not public or the secret key is not public.

In other cases, you don't even need to evoke it, but somehow the definition will match. We'll see many examples. So, in fact, in fact, in fact, for randomized encryption scheme, usually the encryption can be deterministic. So the encryption deterministic usually.

Usually that still remains a problem. Okay, the correctness definition though will change a little bit because this is this is a little to your question like how can it be correct, right? So how will we define correctness? And we said like for every choice of thinking.

For every message, if I encrypt the message and decrypt, decipher it, I get the message. Yes. But now, you know, encrypt the message is not before everything was fixed, right? But now, when I encrypt the message, I can put it around the tape, no? So I cannot speak of the probability of this event happening, you know, because now this is an event that depends on the randomness.

Of course, I would I would require that for every randomness that that would be fine. I would also say for every for every message and for every choice of randomness, doesn't matter how, then the application degree of randomness that's fine. I would design it. But sometimes this is not this is not a one. You can you can, for instance, admit that the degree of phase with a small probability.

Where his probability is not better than the suspect's objective. Okay, I think we will always see one example of this. This is one of the post-quantum encryption schemes that were sometimes a little bit clearer. But I think almost until the end of the course, everything will be perfectly good. Okay, we will not have such an issue. Okay.

Okay, so okay, great. So I would say I will not describe this encryption scheme using the PNF. We tell about words and then we take a break and after the break we will analyze the security of this scheme. Okay, so let's let's build let's build let's build.

From anywhere, okay, and this is what everybody does, okay, theoreticians and practitioners. There is only one only way. Well, there are actually many ways, but all these ways are same for practitioners and practitioners. Just doing practice. Okay. After the end. Okay. So let's read it from here. Okay. So what the idea now? Okay. So the idea, okay. The similar to what we did before, okay. Before, and then Bob meet at the secret place and exchange the seed for the key. Then they go home. Then they expand the seed and do whatever.

Yes. Okay. Now they do kind of similar. All of them. They meet and they decide to share the key of the pair. Okay. Remember, sharing the key of the pair is easy, but sharing this exponentially large table is something that they have to do. Yes. It's just it. Okay. But it's interesting. Okay. Then they go home and now they eat things.

How do they meet? Can't do again one time pad. Okay, only data, only data needs to be deterministic, randomatic. It cannot be deterministic, okay? So all the the meetings are random. They pick random points. Okay, they pick random inputs for the data. Okay, they pick random ah, which is Encrypt of AES, encrypt of the data, and then what do they do? Add, and that's the pad. So now if and then one like pad with the method, if we encrypt twice the same method, we cannot repeat because we cannot repeat. So now I have many pad, and eventually all these pads start to meet again.

Okay, see that here. So it will be like this. It will be like that. The encryption of K M is made of two parts, C1 and C2, where C2 is F K. Of r plus n. Okay, what I said, I pick an r is uniform, uniform over what did we say? Un, right? Was n n p. That's it. Okay, so that's it. That's what I said. Okay, I pick a random r and I create the pair.

Fk over, and I solve, I do one like that. Okay, fine. Except yes, exactly. Because I assume it be string for for for for the moment. Okay, but I mean in general, if the output of f do not be a bit string, I will do addition, whatever. But I mean in practice, f is a yes, so the output is going to be bits.

Okay, so that's two. Okay, so now of course, if I just pretend that two Bob came up with it, okay, because how that Bob? So then I go to sentence one, twenty-four. What is one? It's your art. Okay, so I. Then I know this topic. Okay, what is it? Then, ah, stop. Doesn't need to be seen in this discussion. Okay, what is the definition? Why doesn't need to be seen? Why? Because anyway, the input of the PRF, okay? The first thing we know is the input of the PRF. The definition of PRF, the first thing is true. So, okay, then stop being seen. Why don't need to be seen? Okay. So that's it. How about it means now?

How many bits? C1 to. K of C1, so C2, excellent, excellent. Which is always equal to n, always. It's probably equal, or at least always, ah, always. Right? Because the K of C1 is the K of R, C2 is the K of R, plus n, and the K of R, plus the K of R is n.

Okay. So that will be demonstration. So notice that to apply this construction, to use this construction, I never need to invert after. Never. I do not. Which tells that AES is a good key. Okay. I don't need the full power of AES. I just need the function and the independent.

For this, I prefer way of doing it. There are other ways of doing it, but I actually need to convert also. Then I need to do power way. Okay, but AES is the only one. Okay, let's take a break and then proceed.

## PARTE 2

Then the above single encryption by Eve and the attacker is CPA secure. Okay. Okay. So assuming I understand that, uh, after is the RSA family. Okay. So for now, I don't know how to do with the RSA family, but assuming that we have it. Okay. Then the above encryption scheme is a CPA encryption. Short key, multiple messages, so practical application.

Okay, so that's the thing that we want to do. Okay, are we good with the thing? So, okay, so now, so what is the intuition? Okay, so the proof will not be very complicated. Okay, so the intuition is f e f f. Yes, okay. So what is it? Okay, so the intuition is that in the real world, Alice and Bob go in the secret place and exchange the key of the pair, and then they do encryptions. Okay, we can move to a mental experiment, to where Alice and Bob in an exponential large table.

Chosen randomly from all possible labels because one of the property of the Venn, if you do not know the key, you cannot distinguish f or k from r. Okay, so using f or k is the same as using r, even though r is actually R is actually impossible to even share, right? Because Alice and Bob do not share R because R is exponentially large. Okay, but if R is as good as said, is the key the choice of which within all the options? Yes, yes, exactly. Instead of right. So now Alice and Bob in this world are computationally unbounded, right?

They actually share this very long, this very long key or thing. Okay, this will not matter because after this part, now the security will be actually information. Okay, so if they move to this, then the security will be perfect, almost perfect. Okay, so of course the information cannot be leaked. Okay, they cannot. Uh, but again, I mean, technicalities doesn't really matter. Okay, so I mean, okay, so I will now just very simply say that there is some experiment where they pick a random function. Okay, we actually said that picking a random function is like it requires exponential time.

They could do the easy sampling that we did before. You don't need to pick the entire function. You can just define the outputs that are needed. We are easy to sample. You can do it, but it is not that much. Okay, so so we move from the real experiment to an experiment where the users are. Okay, the users are from Archon's laboratory.

From all side, okay. Then we prove that the real experiment and this mental experiment are indistinguishable, okay? Because if they will not be indistinguishable, I will break the experiment. I think that's the solution, okay? If there would be an adversary, then distinguish the real world from this crazy world where they share a super large table.

Then I could also be the adversary that breaks the other, impossible. The other is simply very easy in the sum, assuming everything. Okay. After we are in this world where we use an interpreter, the security will be statistical. As involved we'll get statistical security, all the better.

Actually, it's not really that. Okay, okay. But maybe let's discuss this when we get there. So first, let g lambda g. We just read of the game. CPA by lambda. Okay, understand? That's right. Let's just go G lambda again. No, it's our game. It's our game. We need to put it in the show. Put it in the show. Four G lambda four G lambda four.

Yes. Okay. Yes, I mean. So we consider. Actually, we consider H. Lambda p, which is the same as p, except since we use r instead instead of. Okay, so all of these things, basically things like this, G and H. Okay, that is. So we have adversary, challenge. The challenger picks the key, U lambda. The honest challenger and the green challenger picks the r. From this r. Okay. This. So now, whenever, whenever.

The adversary makes a query on m. When he replies with c. Okay, so then the adversary asks for this zero star, one star, and we will reply with this star. And then the adversary will ask for m c. And we need to try to see, right? And the adversary also needs to try, okay? The interface, okay? Interface is the same in the two cases. The only difference is that we compute the C and so on and so forth. Well, so yeah. So in the green board, in the yellow board, C.

Is just well, if c one, c two, I maybe that that is right here. C equals c one, c two. C one is is equal to a, and also uniform over n, right? And C two is F K of R so M yes so this is C C one yes okay C is always in the yellow word C is always like this one C one and C R like in the yellow word yeah like in the yellow yellow word.

I mean, of course, like there are only L R M C, but I mean there are actually many, no? I mean I don't enumerate all the ways, right? And one cipher text one, and two cipher text two, and three cipher text three. They don't need to be over the same n, of course. General n for every n, I will do that, okay? But n is going to be different over that, of course, no?

So then t one star, I mean this will be also t one star t star, and t one star is just uniform, is equal to alpha, uniform, and then t star is equal to fk alpha. So, n divided by k. That's the definition. I I apply the definition again. That's all yellow. Okay, in the green board that is the same, but the replay is different. So in the green board, c1 is equal to r. Also uniform.

C2 is equal to R of R sub n. After C1 star is equal to A star uniform and C2 star is equal to R of R sub n sub d. It's most like that. Because same same. Yeah, the word I use n. In the word I use R. When I is chosen randomly from all tables. Okay. Okay. Okay. Great. So now there are two things. Okay. So the first thing is the first thing is the first thing is that the lemma.

That g lambda 0 computation plus to h lambda p computation plus to h lambda p for every j. Okay. Yes. Yes. Yes. Then the other thing might be that the H D or the computation or the statistics or anything, or the difficulty. Okay. Again, H will also be distinguishable, so that G is indistinguishable from H, right? And then, okay, what about that? Okay, so G is indistinguishable from H, okay.

So how we do this now? We do this by security. Okay, this is by proof by reduction to PRF security. Okay, so now let's make this reduction. Yeah, so you you do the reduction. So. There is, I'm not gonna write now all the text, okay? I just say water and you tell me the answer, okay? So there is A, there is B, and there is C, and you tell me who is A, who is B, and who is C. So anybody was A, B, C, and the answer. What does it mean? Algorithm. Yes. So this is the attack on the attack.

And G is the challenge, and A, yeah, the one, yes, and A is the distinguisher between G and A. Okay, so before doing this, what we are required is assume by contradiction that exists a PTA such that can distinguish. G from H for a fixed choice of P with probability one the point. Then we construct P P that breaks the algorithm with probability one. The distinguisher, the adversary, the efficient adversary, with also probability one. Make sense? Again, no problem with this. Okay, the same, always the same. Same from trying it.

But if you are a fighter, I can't be. Good. So the the logic is always the same. Assume not. So there exists a. So now, now what is a good at? What is a good at? Distinguishing. Distinguishing what? G N H. G N H. Okay, and stop. That's the only thing a can do. So we should then exploit this fact. That the E can distinguish. What does it mean? It's English. G from English. It means this English machine yellow from green. Yes, E can distinguish yellow from green. We probably one word. Okay, one word. Because we don't need to go probably. No, we probably one.

Probably one of them. It's important, no? Because we might end up distinguishing. But same probability. We need to keep track of what are the probabilities. We need to count, no? Often that we don't need. Okay. Yes. So, and now we can choose also a fixed choice of b, right? B is fixed, okay? Because We need to prove this for every b, okay. And the proof is the same. The proof for any b, okay. Or if you prefer, first you prove it with b equals zero, then you prove it with b one one, then you prove it. Okay, you just choose any. Okay, I kind of like the generic b. I'm not like the zero and then say one. You say it doesn't matter so much. So, okay, A is the machine.

The same should be for A to for B, I mean, okay, any trust. So now what we yeah, they should start by sending some messages. So we we actually B will start the guy, no, start it. And now the guy, the first thing he does is to send some messages, exactly. And now we simplify this way.

We need to evaluate some c, and c is going to be c1 c2, very right. Because if c doesn't look like c1 c2, it explodes. Okay. So it's very in a good way, no? So now the question, how do we beat c1 c2? So So, so we have B and the challenger and the challenger. Okay, look. So he said B. Okay, we just do it like below. He said, okay, I send an M to the challenger. Anyway, the guy before we either ask or talk.

In what? Side. Yeah. But this maybe is not the thing to do now, right? Because what you said is right. Because you said if I would take him to the challenge, the challenge depends now because the right words. Word one, okay. Word two. Ah, but if I send M, I would receive F K M. But let's look at the structure. Here, do we need to compute F K M? Do we have to compute F K M? Do we need to print it? No, it suggests that maybe I'm doing the wrong thing, right? Because because what we pass to the guy is either yellow or green.

So if we pass the FKO, if not, yeah, if not, B, yes, good. Okay. So we cannot pass the FKO. So what we should use? We should take an random. We should take an random. Yes. Right. We should take an random and send it C. See. Right. And C, we either rely FKO or we are. Okay. So we send actually not M. We send.

We will be given r in U n, right? And we will receive z. Let's call it yeah. Let's call it okay. So and then what is this z? No, z we know. We know that z is I f f k of r. Or R over. Okay. Okay. And actually, as we define it, try not to get confused. Okay. Like as as we define it, or I define it. I define it like this. That is the duty of the verifier. Please. Either I get always F K over, or like always R over.

Okay, and I cannot. So it's really two words, real word and another word. Okay, you could also define it like I read a bit and then with probability one out of is one. There is just one word, but then I read a bit and I decide which word it is. Okay, then you need to guess the bit. Okay, but do not get confused with this. Okay, I anyway I never do, and I prefer the two word.

Perspective, absolutely. Actually, okay. You can also decide for another perspective until until correct is fine. You can choose whatever. Yeah. So, whatever is two errors, okay? It means be the teacher team and he doesn't know how it looks like. He must distinguish, okay? Either it comes from the real world, all with F K one, or it comes from the agent world, all with R or R.

I do not know, but I need to use the hash function, is it? Okay, okay. So I will see now. What we do? Use the encryption function on the m. Yeah. So what we said? So what is h1 and what is h2? H1 is. H1 is. What's it? Ah, yes. What's it? The eight, seven, seven, three, two, zero, and ten. Yes. Okay. So now.

I just keep doing the same thing, no? Okay, so like if if we ask M zero star, I mean this is repeated many times. If we ask M zero star and one star, I know what to say, no? What do we do? We pick an one star and we get. Start and then I will send the same as before. C1 start equal start C2 equal Z. Last E start B because I I fix a B. Okay, then keep going. So right under that one point is same as before.

I am not even lying. Okay, so then be brave, be brave. Okay, that's it. It's a perfect analogy. There is not much to discuss. So it's clear that if B leaves the network, if Assuming that B is in the yellow word, what is the probability that B outputs one? Well, it's going to be the probability that A outputs one in the yellow word. Right? Because when Z is a key, what do I send to to to A? I send R as key. You are closer.

And I send. After F K, after last and study. Look, the other word, what is it? Look, after F K, after last and study. See, see this thing. Yes. If instead B plays in the other word. One is g, the R of whatever. Okay, it's just then what is the probability that B of this one? Is the probability that A of this one? Which one? In the blue one, yes. Because the distinguisher for A is one, of course. My distinguisher for B is also one. Perfectly that. Okay.

Do you agree? Where is the right move? I guess not. It's okay. Yeah, you're right. The challenge here, like, is to choose the. He doesn't know if he had chosen the K or R. Who? What was the challenge? It's me. See, yeah, see. If they that either, if either came from the day or not, is he doesn't know. No, no, the challenge is not said. No, no. But so, other define, other define. There are two challenges because there are two modes. Okay, I'm not throwing both, right? I mean, like, like because there are two ways.

Game analogy. The challenger uses only a game, and game idea. The challenger always uses R, and I need to distinguish between the two. So they are two different games. You can't distinguish. You can't distinguish. The challenger is always R, but if the challenger is the challenger of R, the simulation, what A is is R.

And the challenge is the challenge of idea what is this game? That's the point. Okay, and then you can distinguish the other two games. Alternatively, again, if you like it more, I I don't know, maybe you like it more. There is just one challenge and there is just one game. But then I sample a coin and with probability one out this coin is going to be zero, and probability one out is going to be one.

And if it's zero, I do F K. And if it's one, I do R. And now it's the same. If the coin is zero, if when the coin is zero, if the coin is one, when the coin is clean, because you can distinguish, I can guess which coin you you sampled. Okay, it's just a different way of doing, but it's the same. One question. Can you put on? No, no, no.

Okay, better than that. I'm not going to write the equation to prove this, but I I got it's it's clear. In that respect, it's the best simulation of the view of A. I agree on it, and A can distinguish B with probability one over two. Okay. Okay, so this is now not super fully formal, but if I would have to do it fully formal, I would just say maybe ten lines. I don't know. Right? Equation ten lines. It's just an observation. Okay, the unit of self, then the probability that y is one is the same as the probability that y is one and the u is simulated perfectly. Okay, so then the gap is one point.

We did your red in this in the proof of the reaction of stuff. Okay, because it's the same here and not red in this. Just look back and you will see exactly this. I'm good. Okay, so now, okay, so now we are in this in this yellow in this green area. Okay, so now we are in the green one.

Okay, so now with this lemma, we transition from yellow to green. Now, what is it for? We we integrate. Okay, so we don't care anymore about PRFs, CDH, AES, nothing. And the green word is okay. Okay, in the green world, there is the answer of truly. Okay, and now we like what? That in this green world, the encryption scheme is secure, even if the adversary in fact is computationally unbounded.

Yes. However, this remark should not be true that that the key will be secure against computation on paper. It will be true, assuming that it can still make not many words, not many recoveries. Okay, this would be important. However, that method could can be computationally unbalanced. Okay, and ultimately we don't care because we just need to prove that the green mode would be, but here the computational resources to the to the green mode would be equal. Computation. We need to prove for any efficient method. Okay, but actually, because there is no crypto, okay, we do not we need any assumption. We just assume that that method is unbalanced.

But the number of ways is going to be large. But anyway, it's okay. In the end, there are a number of ways. Okay, is it clear? Okay, so like lemma, other lemma, second lemma is that the age lambda zero will be studied right now, not computation, close to age.

Lambda one, but as long as, as long as the attack, the unbounded attacker, unbounded attacker, makes almost cube of lambda equal to lambda. Okay, I mean this implies, of course, that age lambda zero, the computation grows to age lambda one. It's a stronger statement, right? Because the computation bound has to be at most polynomial in age.

For sure. And then, even if it would be about the computational thing, but it needs to make polynomials, otherwise there would be problems in the root of this lemma. Is it clear the logic? Okay. So I will just for the proof I don't need anything to assumptions, so the inverse is not the amount. But the number of queries in player, in player is provable. Okay. In fact.

Distinguishing advantage, which became, which became very large, if I may mention. Okay, so what intuition? Yeah, okay, so what intuition in the real world? Okay, so the intuition in the real world is that, is that. Yeah, is that? Whatever question you make, whatever the message under this, okay? Whatever question you make, okay? We sample enough. Enough, right? Whatever question you make, the challenger is gonna sample r. Okay, this is important for the teacher question and also for the challenge.

Yes, so whenever we think right, there is another example. So in particular, there is RSA. RSA is the one example. Another one. Yes. So now what condition? Okay. So if if. If Alice, okay, that example at the shot, never appeared before. Now, say, say that this is the case, okay. If Alice, that example, never appeared before, right? Then, then.

What can see? Get it? What you can see about the output of all the last step? Then will be you, right? But what's the property of it? The property of it is that for every input, there is a no seed. So so long as I didn't, I didn't. I didn't get to see anything about R before the output of f of R with respect to R is the weak. That makes sense. Okay, so put it differently. Okay, say that I make so just to visualize what the problem is. Okay.

So say that I I cannot make any prediction, so just one time security. I can just choose a zero star. I'm not sure if that's the correct attack. Okay. So then, for sure, now because our star is chosen, yeah, and then the output of R is equal, but our star is an arbitrary input, yeah, and then the output of R is a random seed.

Okay, so that's what happened. Yes, in this case, just one. So for sure, the two experiments are right. Yes, are we? Same thing. But now I can make a request, right? But this could be wrong because I'm foolish. Assume that I make the first request and the message is zero.

I should do this, okay? I I understand. So then, what is the output? All right, and R, okay? R is R one XOR zero. So R one, I get R one. If R happens to be R zero, I get the B. I get remove the P. Two times the same key, one time bed, one, right? One time bed, one. If I get to see the same key, I'm lost. That would be lost. Yes? Let me know. Would you repeat? Yeah. Okay. So let's go to this proof. The proof.

Okay, so what intuition? So the intuition is the intuition is that assume first, okay, assume first, no encryption place, just for intuition, yeah, encryption place. Okay, so then, then. Upon no n star m star the challenge is r star and then r the r star plus n star b yes with the.

As that uniform. Okay, because a is a random table, is a random table. Is it the same? Is it the same? S is the same as z star equal r star and then z star plus m star p, where r star is equal and also z star. As I say, right? Because until now I didn't, I cannot make any point, okay?

You make the challenge value. I return the message. What is the output of the function R on our state? It depends on our state, right? So it's the same, right? Whatever here, whatever up there, it's the same. Okay, because the digital block entropy is also uniform, right? If I take any message and I XOR it, the random string uniform. The distribution does not depend on me.

Then this is for b equal zero. B over what is any distribution? I don't understand. I don't understand. So h zero is identical to h one. Of course, that's just one thing. Perfect secrecy is one thing for sure. That's okay. Are we good with this? Okay. But now, however, another h negative h negative.

Encryption takes place. Right. So I mean, now after you encryption takes place, you get some information. So we should understand what what that means. We cannot say city is uniform and that because there are different cities. In particular, because we are using the same one time pad, if it's done with the same value, if we do twice the same, it's done. We are there. Okay, and indeed, no, indeed. This is the problem. This is the problem. This is the problem. This is the problematic.

Because say, because what if a equals m equals zero, n okay and c is, I mean. As same as in the chart. Say these events. That's it. Okay. I mean, of course, they're not going to say what the probability of that is. I mean, say the chart for for a second. So if these events, these events, I mean, you're not going to be wrong because Because so then C would be R star again, comma R over star, sort the again, no? Right? R over star was the star, no? Right?

So it is. I'm dead. No, no. I know. I don't know. I am sorry to see to start and then guess that he. So I'm dead. I can guess him to be the one. See the problem? Yeah, the problem. It could be. Okay, we need to say that. Okay. So the proof is not over because we need to take into account that this probability is negligible. Okay. Okay. I don't even know.

Okay, the adversary knows after, okay, and after it could be the same of the challenge, yeah. If after is the same of the challenge, for sure it's broken, because what? Maybe two times the same thing. In fact, I am confused. I am confused. Okay, so it's.

So somehow we need to take into account the fact that I don't know there is some kind of event that should happen. We need to scan each ciphertext. And pardon me, look. Assuming instead as that is fresh, assume the last that is fresh. And never appeared was never sampled before. Okay, I'm saying that's true. Yes, that is good. Because if I saw never appeared before, this stuff is uniform. Never appeared before. After that was never computed. My definition, ah, can't say uniform is not a thing. But if I sample and choose one random one row.

They are not. I give an example. I use this raw anymore, right? So it's like I use one-time pad with the one key and one tag. Yes, the key, the one-time pad key, I use just one time. That's fine, right? So there is the answer. On the other hand, right? On the other hand, if after happens to collide with any of the other.

They come out of encryption place, it's a problem, because I could always encrypt zero zero zero zero zero, I could always decrypt zero zero zero zero zero, and then I know there are these stuff. It's a problem. But if it doesn't happen, it's good. So there are two ways, two exceptions, okay.

And there is an event, right, which is defined in this two experiment, the probability space of this two experiment. Such that if the event doesn't happen, the two experiment have the same one output. Okay. On the other hand, if the event happens. Good. Okay, but so long as it's right, never or almost never, it's okay, right? Because what's the proof of me that if I I do twice the same master, I start to feel more nervous. This one is super boring. Except if I do many ways.

Okay, there. Okay, that's life. Okay, this is what you got there. Okay, so let's formalize this intuition. Okay, so let so so let okay, Madam, so to finish the intuition. But is it that? But this. Even, odd, even. We need to link it all. Prove it. Okay, in the in the example, just one way, one encryption. Okay, we need to we need to deal with the more general case of that message in two ways, not one. Okay, okay. So in general, in general, let Beta, okay. B is beta. Delta, uh, asar collides with any of the R's in encryption.

Yes. Okay. Okay. That's it. That's the point. After yes. Before and after. Yes. Human thought. Doesn't matter. Anyway, is that this event is independent of when we make the way because the challenger just accepted on the match. Doesn't matter if it's before or after. Okay. Okay, that's the way we find the event. Okay, we have to find the event. That's the event that starts or dies. Okay. On the other hand, when bad does not happen. Okay. So condition condition on bad.

Not a thing. So better than that. What does it mean? It means that our star is fresh. If our star is fresh, the outputs of R upon input star is uniform random, and the distribution is the same. That the two experiments have the same distribution because the distribution of this ciphertext is independent of what was the key before we got the ciphertext.

Okay. Condition on that, not we have that h lambda zero is actually identical to h lambda one. Okay. Because, because. We can place ah over that we uniform zeta independent of n. Okay, so I can ignore n, but he makes the challenge for it. I will get around zeta and do what I did.

But if I do one thing well, the challenge design will exist before. It depends on me. So the distinguisher found the legit. They are against it. So you can expect. Say this. Okay. So now on the other end. On the other end. On the other end. What is the probability of that? Like, what is the probability of that? Okay, I mean, this is utmost actually. I mean, I would actually have a point like this. So like the probability.

Let's probability that exists. I almost probability that exists. I n j such that i is not equal to j for all the pairs. Let's let's count all the pairs. All the times that we sample. Yeah. Including the Charlie, even Mr. Papadimitriou, they are going to do all these things. Okay, if we make polynomial in words, they are going to do all. Not only nobody collided with that side, nobody collided with that side. The movie nobody is the number one. The number one is the connection. Okay.

So, again, so that's the property that they are all distinct. It's particular; they will be also different from other. Yeah. So, but what is the property that it exists the i and j such that a i is equal to a j? I mean, the property is only the choice of i and j, no? Uniform, okay? So, this is a post.

This is the uniform. The probability that s i is equal to s j for every i j. Right? I mean, of course. I believe something. Okay, right? Because I just look at all possible pairs. I gain the probability of this second pair. It has most the probability. The first pair collides or the second pair collides or the third pair collides. All sorts. Okay, so it has most the sum of these probabilities, which is just called the union bound.

Okay, this is just a union bound. And now what the probability that Rj to Aj? Yeah. So well, this is just by definition again. Okay, this is the sum of the Rj of the conditional probability of U n because the uniform Rj before that the conditional probability was exactly this. The probability that if, for example, twice I got.

And I need to sum over all pets, yeah. And this collision probability will be two to the minus n, because that is uniform, yeah. So this is at most you choose two. These are all pets times two to the minus n. Yes. So and this is what poly. That is negligible. Okay, I'm assuming here that q is a prime. What is that? Which is also negligible. There's some relation between n and lambda. Yeah, n generally, of course. N generally, like n of lambda, also polynomial. The better because what you do, the more simple the negligible.

Yeah. Okay. So, so we have proven two things. Okay. Thing number one, condition of better not happening. Or on the other hand, is better could be better, but better. In statistics, it implies that the statistical distance is almost the probability of that. It is something that you can actually prove or formal. Okay, I mean, one can show, one can show that the above two facts imply.

That the statistical distance between h lambda zero and h lambda one is at most the probability of it, which is equal to negligible. Okay. This is the okay. So I mean, this is not very hard to implement. I mean, basically what you need to do is just you take the probability space and you divide it in the case that bad happens and the case that bad does not happen. That's a complete event. Either bad happens or it does not happen. Then you split the distinguisher boundary into a yellow and a blue.

And then you upper bound by using the conditional probability. Okay, now we can't say this is pretend. I'm not gonna do this proof, but I mean, it's I think it's intuitive enough. So we have two experiments, and then these experiments are the same unless something weird happens, which means that you're able to distinguish.

Is to make event happen, but event happen solely because of the probability, so they are indistinguishable. Yeah, it's very beautiful. Okay, that's also the end of the proof, and I think we can stop.
