# CR LESSON 13 - Transcription

For a key to them back, right? So we were studying a non-malleable or authenticated encryption, right? So we are combining a chosen plaintext attack secure encryption scheme, secret key, right, with a message authentication code, with the goal of achieving non-malleability. Yeah. And in the last lecture, we saw two things.

So the first thing was that there are two criteria that are sufficient to imply non-malleability, right? So together, so if a cipher satisfies two requirements in isolation, at the same time, one by one, then the two requirements imply non-malleable security, okay? Authenticated encryption.

And the two requirements are CPA security and the second requirement was authenticity, right? So this property that it should be hard to forge a ciphertext even if you do not know the message that is inside without knowing the secret key and possibly observing the honest communication. Okay, okay. So there was these are the two properties. And and then we started to you know because like CPA security already we studied, right? And the second property, I mean, looks like.

Unforgeability. It's very similar to unforgeability. It is very natural, of course, to start to get these two properties together by combining an encryption and a MAC, right? CPA encryption and right. And then, what we said, we would like to do it in a smart way, okay? We do not want to kind of reinvent the wheel. We already worked kind of hard to to to achieve these two codes in isolation. We would like to kind of Combine kind of in a lazy way the two things without removing things from scratch. Okay, and then we we studied in the last lecture like a few ways how this can be done. This is also the ways that are used in the real world, as I was mentioning. The first way is actually not used because it's like it's insecure, so in general, okay, so.

Right. the The first way was to say I encrypted the message and I encrypted I targeted message. Okay, and then of course the target could reveal something about the message, which is not secure in general. It could be that there is a combination for which it is secure, but not general. Okay, but as far as as far as I know, this is not used in any real world protocol. Okay, the second one is then was like a little bit of an exception, really, in the sense that it is also not secure in general.

And the idea there was, because the target can do something about the message encrypted to the target, not secure in general, but actually secure in real world situations. Okay, the TLS 1.2 was actually using this dimension. A TLS 1.3 does not use it anymore. So we will not bother studying this too much.

Anyway, it's insecure in general. And then the approach three, which is the lazy approach, where we just encrypt the message and authenticate the ciphertext. Okay, TLS 1.3 does exactly that. So let's just analyze this. And this is the first thing that we do today. Okay, so we have this theorem now, which says that theorem.

Construction. C. Was it C? C. Yes. Gives an authenticated CCA secure. Security encryption. Assuming how did you call it? Let's say Phi one, okay? Phi one is the cipher, okay? Let's call it Enc one Dec one. Enc one Dec one is a security. And by two, which is just tag, is UCM. Okay. Okay. So now, in order to prove this here, we need to prove CC security. But we know that in order to prove CC security.

Right, it suffices to show it suffices to show that pi right our pi which is equal to that. Okay, so maybe I should slightly change this. Right, this should be equal to one and. And yeah, this is c, right? Okay, to see is now c prime. Okay, we call it c prime. So maybe we can call it phi prime. Okay, phi prime is the is the final scheme, right? The scheme that outputs.

See it now. And check prime. Okay, define check prime. Okay, the check prime is the natural thing. Okay, you get ciphertext, you first check the tag. You know, if the tag is invalid, you output bot. Maybe we should actually be precise. Okay, so this is check prime. So this would be check prime.

Of k one, k two, n, right? The key for n prime. So k prime, let's see what k one, k two. Yeah, so k prime is k one, k two, n prime of k prime, n is the c prime. Which is c top, and then tag of k prime, c prime. If tag k two of c different from tau, different from tau.

Algorithm s m is equal to the decryption with the key k one of c one of c. Okay, okay. So that's the the decryption. If the tag is prime, we are involved. Okay. Okay. Yeah. It's not that prime. That prime. Yes. Yes. This that prime. Okay. Okay. So we need to show that by prime satisfies both satisfies.

Cpa and out. Okay, then as a corollary of the previous theorem, no, we get CCA directly. Yes? Okay, so we just need to show these two properties. Okay, so let's start start with Cpa of Wagner. Okay, so how how would you think you would prove CPA of PiR? Okay, we will do it by reduction. Okay, by reduction to what? Reduction to CPA security of PiX of Pi of Pi to one. Yeah. So we have an adversary A against a prime against PiR. Okay, and we build an adversary B one.

Against pi one, okay, which plays with the challenger c one. So c one is the challenger for pi one. B one is the attacker for pi one. A prime is the attacker for for CPA security of we should call it ATP, yeah. A prime C P is the attacker that breaks C P security of P prime. Okay, so this is a simple question. So can you? This is an exercise. So let's do this derivation. What do you do?

Yes. Yes. A prime is sending message. Yes. A prime is gonna send the encryption. Let's say exactly. Let's say m. Yes. And what do you? Then everyone sends them up. Yeah. Yes. We want send them. Yes. Yes. And it gets like a c. No. Yes. And then what will he say? Taxi with whisky, with whisky. Ah, it is a random key. Okay, okay. So this b1 is going to choose k2, right? And then he will say tau is equal to tau k2. No, and then he says theta. Okay, so encryption part, not a problem.

Okay then, and then now we know how to continue. So M zero star, how do we call it? M zero star is one star. And then M zero star is one star. And then T star. And then T star, tau star. What is tau star? That's all. I want you to follow it. Yes. Okay. So there's more implication here. Ah. More implication than before. Did it have before? Okay. Then distinguishes we distinguish it. Yeah. So that's a practical question.

Okay. I mean, after all, this is a basic principle. It's new encryption, just the underlying encryption plus a function inside, which is computed with an independent key. So you see, this is important that the two keys are independent, because if the key would be the same, then you cannot make this a hash.

Okay, so in general, it's like a rule of thumb in cryptography design. One key, one thing. One key does one thing. If you want to do one key does two things, okay, then in general you cannot do it. This is called key agility. No, unless you have proven that you can do it. Then you can do it, but you need to prove it. Okay, and sometimes this is possible, but this is not something we're going to study in this course.

Yeah, why would this break if the key was the same? Yeah, it would break because then you cannot simulate attack, right? So, right, if the key would be the same, yes. I mean, like the reduction to CPA security only has encryption on them. So how do you simulate the attack? The attack is computed with the same key of the ciphertext of C. So you cannot sample an independent key because the key is the same.

And you don't know the key, so how do you do? You are in trouble. See the problem? Yeah. So in general, but this is not very surprising. One key, one prime. I mean, or of course you can always do that. There is one key, then you use a PRG and you get two keys. That's fine. This you can do because anyway this is indistinguishable from two keys. Independent. Yeah. This this you can do.

At the price of running the registers. Okay. Great. So the analysis is easy. Analysis. Okay. So next out. Okay. So now we need to prove out. So what, and then we reduce by reduction to what now? By reduction to, yes. This is the only thing that we didn't use yet. Okay, so we are gonna have A prime against out, and then we're gonna have B two now and C two.

For part two, this is the mac, you know, with the key. This is the key K two. You get sample the key K one, okay? So here the challenger has key K one. Okay, so let's see. This is action, okay? So this is action. This is it, right? So out, what does he do? Is the out guy? He asks for. So wait, so this is out, the out guy. Yeah, the out guy is an adversary against the out. This is probably decryption, okay? So he asks for messages and he wants to see the ciphertext. Ah, yeah, the ciphertext, okay.

Right, and then he needs to forge a cipher, yeah, fresh or different from the one that he has already seen, yeah, without knowing the message necessarily. Okay, remember this out? Maybe it was somewhere out there, out, out of this here. Okay, yes, and see Caesar. He wins if Caesar is fresh.

And the decryption of ciphertext is not enough, yeah. Okay, so that's it. So he can do encryption queries. Okay, so so now the intuition is okay that we need to simulate the encryption queries. Then he's gonna forge on the ciphertext, and then hopefully we can forge for the MAC. Yeah, but notice that when we forge on the MAC, we need to output both.

The message on which we forge and the time, the adversary only gives us the ciphertext. Otherwise, the ciphertext is the ciphertext plus the time. So maybe not the correct vocabulary. Yeah. You win, so if you can forge a valid ciphertext. Exactly. Fresh. Fresh. Not redacted by the encryption. Yes, exactly. Fresh ciphertext, valid. Exactly.

Okay, so Eve is gonna ask for m, okay, and then what do we do? We're gonna send to C2, encryption. The encryption of? I'm with K1. Yes, exactly, exactly. So we send which is an encryption K1 m, and we get tau. And what do we reply? How do we do that? See that. See that. Great. Okay. Awesome. So we do this, okay? And now Eveorges. Eveorges C. How do we call it? Caesar. Caesar Caesar. Eveorges Caesar.

Start. Okay. And yes. So what are we going to output? What are we going to output? Start us. Okay, good. Okay, so this is more topic. Okay, so this is more topic. It's more topic. So this, okay, which is okay. What so what the the condition of this? So a prime with with non-integer probability. Okay.

And what is the condition that makes a prime win? Is the fact that c tau is fresh. The pen is fresh. The pen. Yes. So note that a prime out wins. So long, eh? C tau tau is tau, which is the output. That's the fortune. Together is the fortune. Yeah. This is not in the set of C tau P. Sorry. Note that a out wins. Yes.

Every month, week, no, so long. So long, okay. Right? So in week, okay. When does it mean? In week, when the ciphertext is fresh. What does it mean? The ciphertext is fresh. Now the ciphertext is a pair, okay? So it means that the pair is fresh. So the pair T starts outside. Is not one of the pairs that yeah.

Right, which means though that c star could be one of the c's. That this does not exclude that c star is equal to one of the c's. Agree on this? Right. But that's a problem, of course, because on the other end, on the other end, the unforgeability guy wins when the message is fresh.

Remember definition around 43. So on the other end, so this means this means that c star could be equal to c from the previous equation. Again, okay. On the other end, no, on the other end. B one, B two ways, so long as C star is fresh, C star is not in the set of C. Okay, so this could be a problem. Yeah.

So, should the S C star star not belong to C tau above? C star, C star not belong to C tau. Yes. Isn't this not belong? Yes. Yes. Thanks. Yes. Between winses. So, because C star is fresh, okay. So, which means that we are wrong, okay? Because if this guy wins for the C star, then it's a new thing, then we are screwed, okay? Then that's your face. Understand?

In this case, so so the reduction is fake. So the reduction, okay. And I mean, there is no way out. So the reduction is fake. So the only way to to to fix this is to adjust the Turing machine. So I I I which means. I mean, for simplicity, I just stated that theorem right away. I started with the wrong theorem, now I'm going to fix it. So this theorem is not true. Okay, our theorem is not true. Okay. But it is easy to fix. Okay, on the theorem. So what do we put in? Okay, one way to fix it is to assume that the message authentication code is not just unforgeable, but it's actually strongly unforgeable. Remember, strongly unforgeable means I'm allowed to forge on a previous message so long as the time is fresh.

Remember? Fine. Just assume this. Done. Now the next one. Okay. Or alternative, alternative three, which is also kind of same thing, but actually stronger. Actually stronger. Yeah. So you just assume that the tag is unique. If the tag is unique, a forgery is easy and strong. A forgery is like this.

Yes. Okay. Yes. What, why, why are they the same? What I didn't say. What I didn't say. Why, why are they the same? Unpredictability and the strong unpredictability. Ah, if the tag is unique, yes, it means for every message there is just one. Okay, for a fixed key. For every message, for every message, just one tag. So which means then, I mean.

You can never break it. There is no gap between the two definitions. It's just the same. Yeah. Okay. So we can fix it. We can fix it into it. One, assume tag is strong. Is stronger. U F G M. Let's open up. Assume that x, x, x are unique. Okay. So I mean, this is the two. The difference between the two is like more kind of theoretical nuance. Okay. Because I mean, I think in principle it's possible to build a tag for which the the the tag the tags are not unique.

But the tag is still stronger for J. Okay, it's not necessary that to get stronger for J. You need to have unique tag. That's not true. You could have a tag, I'm pretty sure you can have a tag, but the tags are not unique. But they still strong stronger for J. But that will suffice. Okay. On the other end, this is more like a theoretical thing. Okay, because in practice, what we use is CBC MAC, and the tags are unique. So in practice, what Is more the approach two. Because as soon as I realize that I can only make those structures that we study, they are deterministic. It's okay. Okay. Okay. So that's it. End of the proof. Okay. Any questions?

Can you see our first part? Sure. Okay. No, for one minute it would be too much. I mean, which for instance, it's actually the case in like theoretical discussions. Like for instance, message authentication codes, they can be randomized. Although we're not going to start using this, of course. But I mean, because I mean, this is more kind of related to to provably secure construction of message authentication codes. But in practice, okay, you build message authentication codes only from AES. Okay, and then the target. If you do CPT MAC with AES, it's you, but not provably secure. Yeah. So if you want to build a MAC which is as strong as you know breaking factoring.

Breaking discrete log, breaking your favorite computational problem, yeah. Then of course you can use one-way functions. Okay, but this is like too inefficient. Okay, so then can you do better than this? Of course you can put yourself in the middle. Okay, not just assume one-way function, but assume hardness of factoring, hardness of discrete log. Then you can beat the PRF from this assumption. If you can beat the PRF, you can beat the MAC. Or you can just beat the directly MAC. And sometimes MAC is randomized, which means that for one message there are many times.

So then, from the forgery, it is not the same as weak. Yes. We could have also also the encryption break. We do not need, right? Because we have proved we proved already that CCA security, which is the decryption break, it follows from CPA alone and we just it provides life because we know already that the two properties imply CCA decryption.

It does, yes, it does, it does. But on the other end, property one does not necessarily imply the factoring. I think that's a difference. But in practice, factoring for practical construction, which is the language, which implies unfortunately, so that's important.

Okay. Fantastic. Okay. Okay. So with this, I think we are done with symmetric encryption. Okay. So we we more or less covered everything about symmetric encryption. We saw passive security, message authentication for secure channels. Okay. This is used all day. Okay. Very important.

For instance, used in TLS 1.3, after exchange a secret key, you do secure communication using the techniques that we studied in this course exactly as we did. Okay. Okay. Then we know that from the theoretical part of view, this basically is secure so long as we have a PRF.

And in practice, PRF is just a yes. Everything. In theory, we have seen that PRF is one-way function. Actually, we didn't even see this in full, right? Because we didn't see in full how to construct a PRG from one-way function. That's very hard, kind of hard. Okay. But it's been theoretical, so we are not going to do it. Later on, when we will start introducing concrete assumptions, computational assumptions, post-quantum assumptions, lattices, number theory and stuff, you will see that we get the PRF very easily.

But in practice, nobody really uses it because everybody likes AES until some problem. Okay, okay, this is the summary. The summary. Any questions? Okay, so the next thing that that we need to study, which is very important, also related to some of the stuff that we already covered, but it's actually important as a separate preliminary, and it's a little bit at the border between actually mini-encryption. Okay, so next we will move towards cryptomania.

Although this is also like a little bit imprecise, actually, but anyway. So the next primitive, which is also kind of still one of the primitives for which you will see there is a gap between theoretical ideas and practical construction, which is more kind of related to symmetric to symmetric ideas. Although it's not symmetric primitive.

That's why I said it's at the border, okay? It's collision resistant function, okay? Collision resistant hash, okay? It's very important cryptographic primitive, okay? And it has many applications. Many many applications. So an important, we will see some of these applications. Okay, some of the theoretical ideas behind the design of real world algorithms. Okay, so really important thing.

So this is basically, this is basically a compressing function, like a function, a deterministic function, h. That goes from strings of arbitrary length zero one start into zero one I don't know n zero one let's say zero one okay so it takes strings of arbitrary length it could be like I could dash.

Five megabytes, five hundred megabytes, five thousand megabytes, so whatever. Okay, like terabytes of data, and I get always the same amount of bits, like two hundred fifty six bits. Okay, so typical example, typical parameters, typical typical, n equal to one hundred twenty eight, two hundred fifty six, two hundred twelve. Okay, something like this. Okay.

And the input size is arbitrary. Okay, in fact, we would like our function to work for variable input lengths. Okay, in the sense that it's not just a compression function. Okay, so like not the inputs have variable length. Okay, which we already studied for other questions, so.

For encryption, for message authentication, for variable length. Otherwise, we get a so-called compression function. Compression function. Which is something also that will be useful in the sequel. So compression function is a function that compresses from from I don't know capital N into N, okay, for N much larger than n. But fix it, but fix it, okay. The compression function is a is a function that can only compress states of Some length into smaller things. Okay, I don't know. Capital length would be, for instance, two times length. Compresses. I mean, of course, also the hash function compresses, but the hash function compresses inputs of variable length. So this distinction is not just cosmetic. Okay, in fact, we will see that compression functions are very important in the design of real-world algorithms. It's an important distinction.

Okay. Okay. So and if you think about it, we have already encountered an object which is very similar to collision-resistant functions. Okay. When we studied domain extension for message authentication codes, we already designed a hash function that takes as input the big string and outputs a small string. Remember, to kind of extend the domain of the using universal functions. Yeah. So the difference is that in that case we have a secret key.

Okay, which means the hash function can only be evaluated if you know the secret key. Instead, now we are going to study public key. Okay, so that's why this privilege is a little bit is beyond the main group. Okay, it's not just really a main group privilege.

Okay. Okay. So, so the security. Okay, what security? First of all. Okay. So the main thing is the conditions, as we as we already studied in the secret key setting. Okay. So the main. Issue are the collisions. Okay, and the collisions exist. Okay, there is nothing we can do about it by design. Okay, because now we have huge domain here. Okay, and we are like a small domain, not so small, but much smaller. So there are going to be two guys at the same hash.

Okay, so that collision. Okay, so this is x, this is x prime, then we have that the hash of x is equal to the hash of x prime. That collision. The collision that exists, and the cryptographic security of hash function. Is that the collision should be hard? Okay. So in fact, breaking a hash function means exactly finding a collision. Okay. So collisions exist. Collisions exist, but should.

We have to find. Okay. Many real-world examples. Many real-world examples like MD5, SHA, one, two, and three. Okay, these are the main, the main hash functions in the world. MD5, SHA1, okay, MD5, SHA1, actually, okay. What does it mean that they broke it? It means that somebody found a way to find collisions, okay.

How did they do this? Well, okay, it's very complicated. But I mean, the not very surprising reason is because our actual design follow theoretical ideas, but then in practice, for efficiency, we depart from these ideas. So, so the attacks are different actually. Break the cryptographic design. It's not that.

So the very first idea, but then they would still be, which could also be a threat, because it's not provably secure, although based on provably secure idea, okay? So it doesn't come from nowhere, okay? It's still based on provably secure ideas, but then if you depart from these ideas, of course, then it can be broken.

And the five are one, two, they're a very strong set. In the sense that you don't cast collisions for like chosen messages, so it's like very strong. And hash functions are used a lot in the real world. For instance, they're used in the so-called public key infrastructure. If you studied a little bit of public key, that's very bad. You can find collisions in hash functions. You can do very nasty things.

Very practical attack. Okay. Okay, great. So we want to learn now. Okay, we do two things. Okay, first we want to define security, the security of hash functions. Okay, and then we want to consider other functions. Okay, so so the security definition.

So definition. So in this video, the definition for technical reasons, we will not just consider a hash function like I wrote, okay, like this H, but we will actually consider a family of hash functions, okay, similarly to what we did for secret key hash functions, okay, and there is a very good reason why we need to do this, okay. I will comment on this in a second after the definition. Okay, so let H S let's say 0 1 dot 0 1 n for S in some space I don't know 0 1 lambda for instance B F M. Oh watch out.

Okay, so this family we will call it H. So H is called the generator system. Eve. If an adversary wins the following game, we have a challenger. The challenger sends us a seed and gives it to the adversary. Okay, f from 0, 1, lambda. Okay, so there is a seed, but the seed is public. Okay, because this is a public hash function. And now the adversary must output x, x prime, and he wins if.

X different from x prime and h s of x is equal to h s of. Okay, if no big adversary, can we see this? Okay. Except negligible probability, of course. Okay, no adversary can win this game except with some negligible probability. Okay. Like I mean, of course, hash function is called collision resistant hash function.

Are an inherent computational security primitive. Okay, in exponential time, I can always find it. I just know what. I know the public key, so I can I can find. The question is whether I can find it efficiently. Okay. Okay, any flashback can disclose collision resistant. If not, by taking a fingerprint. Okay, so that's it. So why this? Okay, why this? This is mostly for technical reasons. Okay, like I said.

So why is it? In practice, there is no seat. Okay, so I mean chateau or chateau is not a family ashram, it's a public ashram. Okay, everybody can go away, and it's just one. Not a thing, yeah. But why the seed? Okay, because without the seed, the definition would just be impossible. Yeah. So because right, if there is no seed, okay, what does it mean? There is no seed. There, there is the hash function, yeah, and then the hash function of course is public, no security by studying. And now we want to say no adversary can find collision.

So the existence of adversary that finds a collision, but the collision exists and it unavoidable. So what about the adversary that already knows the collision? It's like hardwired into the adversary. No, that another. This adversary exists. Okay, how can you rule it out?

Right. In practice, we do not know how to to design this adversary, you know. But we cannot say we want to rule out all adversaries, because what about that adversary that can wire the collusion and just output? Sorry, what is the probability on about? Like, what is the probability space of this probability taken on about? So the probability of the game, or yeah, the probability space of the game, as usual, is the adversary randomness, right, and the challenger and the and the seed, all the seed sampling of the seed.

That's the probability. Randomness of the adversary, randomness of the adversary. Okay, so, amen. Okay, but without the seed, we can't rule out. The efficient attacker A of x x prime that is a collision hardwired in its description. Okay, so this is like a completely strange thing. Okay, it's just a theoretical idea. In the sense that you want to say like there is a public key function and then you want to say there is no adversary that finds a collision. So it means no adversary exists. Okay, I give you an adversary. Yes, it's an adversary and it has already arrived into the description collision. How did he find it? I don't know. But it arrived into the description and this adversary exists because the collision exists. So now this adversary just outputs nothing.

So it's an efficient adversary. Yeah. So this adversary says he can just find two sorts of the possible collision. No, no, it doesn't need. It doesn't need two sorts. I mean, of course the two sorts that you can do, okay? But this could require exponential time. Yeah. The difference is that I don't know where this collision come from. Come from. I don't know. I don't know. I didn't find it. But it's hard to find in its description.

Okay, so in particular, because the collisions exist, okay, fix the hash function, yeah. So then there are the collisions, yes. There are collisions for sure. Take one of these collisions and hardwire it into the code of a Turing machine, yes. And now the Turing machine doesn't find it; it just outputs it. Yeah. The country which has all the collisions taken together.

Yes, you can see it exactly, exactly. But the point is that is that the seed no is the adversary is like is what we quantifies no like the adversary is fixed before we sample the seed no. So it's true what you said like even if there is a seed, even if there is a seed, there are still the conditions. And then for a fixed seed, I can have wild polynomial many conditions. Yes, but now we can we change it. First I fix the adversary, then I sample the seed. Yes.

The deal is that there are more than a polynomial collision. Yes. And then you have a piece A which has all the collisions. And then C S gets sampled, and then A just looks at what C we we have and it draws. I mean, first of all, they are exponential in n C, right? So I mean, even if like there would be just like a small number of collisions, it would be in any way like an exponential number of C's, right? So, yeah.

See the point? Okay. Okay. I mean it's kind of stuff. Okay, we practice. We do not really care for this, but if you want to deal with proof of secure hash functions, you need to somehow take this into account. Okay. Let's see if we fix this problem. Okay.

Okay. Okay. Okay. Okay. So we now study a little bit of construction tests, construction for hash functions. I mean, we did not study so many, but for sure we're not discuss the main ones. So. So now, next is questions. We will cover one of the main design, which is Merkel.

Dagger. Okay, Merkel-Dagger is a is a technique to design hash functions. Okay, and it's due to Merkel and Dagger. To be short, that discovered that this thing independent. Okay, they didn't do it together. They published the same paper at the same conference with the same thing.

And now it's known as the Merkle number, but they didn't do it together. Okay, Merkle and Damgård. Okay, what's the basic idea of this Merkle number? Okay, so the basic idea is Merkle number is kind of to give the recipe for constructing the hash functions for public key length. Okay, and many many hash function.

Many hash function they follow the method number one pattern. SHA two follows method. Also MD five, also SHA one, but they are broken. Okay, but not because method number one is broken, but because they are euristic broken. Yeah. Okay, SHA two also method number one, but not broken. Okay. Although it's based on similar ideas, so they are euristic behind. SHA two is similar to the euristic between SHA one to MD five. Okay. For this reason.

They need the kind of panicking that as functions all as functions are going to be broken soon. So for this reason, they standardize the SHA. That's the reason why standard SHA exists, okay? Because SHA1 was broken, SHA1 was broken, SHA2 still unbroken. It was unbroken then and still unbroken now. And it's used mainly in what products? SHA2 is used, like Bitcoin uses SHA2, okay?

So, so they were kind of panicking that they will be broken soon, and so they said, okay, let's start to play a new one, which is not based on Merkle-Damgård. Okay, Shetty is not based on Merkle-Damgård. It's based on another paradigm. I don't think we will have time to to dive into this paradigm, but but it's a different one. Okay.

It's a different one and it's also like a little bit more difficult to analyze theoretically. Although in the in the call for new aspaction standardization, Primo Posteguilly again was one of the requirements because this is like a recent standard. It's not so it's not so new anymore, but also not very old. Okay, I forgot the date. Maybe one from 2010. Okay.

Okay, so SHA is provably secure, okay, but but the security proof is a bit more involved than what we are gonna do instead. So we cover more the designer behind SHA. Okay, McEliece. So what the idea of McEliece? Okay, so it's based on two steps. Two steps.

One is design first, the compression part. Okay, two make it. Equal to resistance. Okay, so we will break the problem into steps. Problem number one, first just construct a compression function, okay, which means you compress all 512 into 512. You cannot do more.

Then domain extension. It's similarly to what we did for PRFs and MACs and so on. After you have done that, now make it variable length. Yeah. Okay. So yeah. So the design of the compression function is the only step, the shadow functions. Okay. So the design of the compression function is the step that is the only step.

Indecostruction. Of course, theoretically you can instantiate this step from provable assumption at the cost of number theory, so not that bad. Step two is that it's not theoretical, and the same that is used in the real world construction. So the real world construction.

They do exactly step two, but they only take a step one. Okay, so real world design in the real world. Okay, shot one, two, and five. Okay, step one, everything. Step two, Alice. Okay, so I will tell you a little bit about step one layer. Okay, although I will not go much into the details, okay, because it's mostly theoretical. Okay, I will tell you some of the ideas that are behind this compression function design. I mean, the ones behind SHA are like very, very theoretical.

But there are other designs that are still unbroken and are based on more cryptographic ideas, like for example how to exploit AES to be the compression function. This is still standing and considered to be secure. Okay, but it's not what is implemented in SHA. Okay, and he says step two we are not do fully because it is just as is in the real world. Okay, so step two. Okay, so the step two.

Is the famous method, the transformation. Okay, the method, the transformation is this. So, start with step one. Okay, so here it is. So actually, there are two ways to do step two. I mean. But I mean, in the real-world construction of hash functions, step two is just the the first way, the one on the left. The one on the right is not part of the design of SHA of the SHA family, but it's using many real-world applications. Okay, so I will mention it, and for example, it's used a lot in Bitcoin. Okay, so here it is, this the Merkel diagram. Okay, so the Merkel diagram was like this.

So you start with this. So you start with the message, okay, and so first of all, assume that we have a compression function, compression from zero one to n into zero one n. Okay, so we can somehow we can build the compression function. There is conditions here.

It must be corrected. Okay, but only for compressing 512 bits into 256 bits. Okay, how do we do this? This step one. Do this later. Okay. Now I have this. Yes. So in my construction, I'm gonna I'm gonna do like do it like this. Now I have x1, I have x2, I have xd.

Okay, which means I take the message and split it into blocks. Okay, so this is kind of a mode of operation for our function. So I take the message and split into many blocks of size n. Yes, so then I start to compress like this. I compress, right? So because this is n bits, I need other n bits. Yes, so and this is the initial vector.

Which is all zeros, okay? So and now I keep going, okay? So until I reach the latter, and this is my what? So this is y one, this is y two, so this is y d, which is also the hash. So x one, x two are of size of n. Yes, yes, yes. Okay, so that's the idea. Okay, so how do I, how do I? Actually, this is not the full security structure. Okay, so this construction is not yet the final thing. We'll see later why, but almost, almost, it's almost the final thing.

Okay, so but the basic idea is, I take the message, I split it into blocks of size n. Okay, if it is not enough to fill the last block, I just pad it, whatever. And then, and then, do the following: compress block by block, starting with the with audio, and then the output goes to the next block and is compressed with the next, to the next invocation of compression function, together with the next block and so on and so forth. Okay, go go go go go. At the end, you get just one block.

Whatever is the method. Okay, so that's one thing. Okay, another thing, this is called the method. This is method number. Okay, there is also the method three. Okay, let's maybe you read about it. Method three is used in many. Protocols, for instance, is using Bitcoin. So in Bitcoin, when you store in in a block, you store all the transactions. Typically, for efficiency, is that you actually do not just list the transaction, but you also kind of hash them. And you hash them, and there are many transactions, and you want to just have one fingerprint, which is acceptable. You have a long message, also hash.

So what they do there is called the method. Was also done by Mertes, I think the same people. So and this goes more like this. So you have like that. Well, okay, I'm not gonna. Maybe I just. So and you do it three, okay. Okay, so that's kind of what you can.

I mean, again, now of course, like this doesn't need to be really full tree, right? It depends a little bit, like how many blocks you have. Doesn't need to be a power of two, right? Okay, not a big deal. So, so that's basically yeah. So what you do, like when you do Bitcoin, you take all the transactions, you put it at the leaves of the tree, and then you hash, hash, hash until you get the root. That's called the Merkle root in Bitcoin, yeah.

And then the hash. Okay. So the second approach could be parallel. Parallel, I go. Parallel, I suppose. Yes, to some extent. Yes, yes, yes. Okay. So why the second approach is used? There in when when is the second approach used? It's more used in applications where.

You kind of want to do different things. Like for instance, you can do this. Like in Bitcoin, in Bitcoin, sometimes it's useful that for instance, okay, so you have a block. This block has many transactions, yeah. And now you hash them all, and you have this merkle root. So, so if I want to say that like 5,000 blocks ago, I had a transaction which is in that block.

Yeah, I need to prove that this transaction is like hashed in the in the root, and there is a very efficient way to do it. In particular, we do not need to recompute the entire the entire hash. So like, if I need to check, say, say I want to check that, I'm not gonna formalize this, okay, because we are not gonna start this kind of discourse. But if I want to prove that, say, x1 is in the in the tree, okay, is committed. They say it is committed in the master tree.

If I want to prove that transaction one is part of, I don't know, five thousand blocks ago, okay? In order to convince you that this is true, I do not need you to like take all the transactions, hash them all, and show that the the root is this, because I will just give you kind of the nodes that are in the path from the leaf to the to the root, right? So so if the the tree is very large, then the number of nodes I need to show you is only logarithmic, right? Which is the depth of the tree. You do not need to hash them. See the point?

It's very convenient for for this to use language. So sometimes, in hash functions, the hash functions are the best way. Instead, you can just so you you just did that. Yeah. Okay. Yeah. From two n to n. Yes. But then the exercise going into the the first one are n of time n. Yes. The first one n and n, but n plus n, right? N comes from here and n comes from zero. Aye. N plus n, two n. N and that is n. And n plus n, two n. Again. And so on and so forth. Always two n. Yeah. Yeah. That's the point. Like here, n plus n, two n.

Okay. Okay, these are the main two designs. Okay, so we are not going to the security of the packet tree, but actually the proof is actually the same. It's not very different from what we have proved now. Okay. So the proof. So let's prove that the Merkle-Damgård paradigm gives you a hash function. So unfortunately, as I said, this Merkle-Damgård paradigm is not the full solution yet. Okay. So in fact.

As I draw it, as I draw it, this message digest construction it's only it's only a secure compression function again, but for very long messages. But still a compression function in the sense that you cannot change the length. Okay, so indeed this is not done. It's just a step towards the final thing. Okay, so what we want is variable length.

Yes, but this construction is not secure for variable input length, and indeed this is not SHA, yet. Okay. However, this construction would be secure if the length of input is fixed. Okay, which means we we start with the compression function. We can only compress from 2n into n, and now we have a compression function field.

But from a much bigger domain n times d into n, but d is fixed. Okay, it's not that you can do five blocks, ten blocks, various. No, this you can do with this construction. Okay, but it's slight modification. This construction will instead give you variable length. Okay, so let's go step by step. Yeah, see my point? Understand? So I mean, I will make this precise in the theory stage later.

So in the theorem statement, I will not prove that this is just a collision resistant hash function, but I will prove that assuming, assuming, assuming compression, okay, this compression function from 0 1 n. Okay, so to be precise, of course, this compression function also has to be, because otherwise we have the same problem that we had, of course, for hash functions. So assuming this compression function.

Goes from 2n into n, and is collision resistant. Okay, then the hash function h. Maybe I should say maybe the Merkel doublet. As function a s which goes from 0 1 n d into 0 1 n, okay, is also collision resistant for every fixed choice for every fixed choice, okay.

Okay, for any polynomially separable any number of blocks, but fixed. Okay, so I'm just building a big domain hash function from a small domain hash function, but for a fixed domain for now. Sorry, for for every fixed choice of t. Polynomial in the security parameter. Okay, good. Okay, so the proof is actually very simple. And I mean, the the strengthened version, the the very polynomial version, sometimes is called the strengthened strengthened method number. It's also very simple. Okay, it's not very complicated. You just basically need to add one block here, so you just need to do one more step. Okay, and that's all.

And why you need to do this one more step is for a reason that I will explain after the proof of this. Okay. So what they do? Okay, so I mean there is this. Okay, so I mean so now say that say that there is a collision. Okay, take any collision. For method number, okay, encryption. What does it mean? A collision. It means a sequence of blocks, right? That a sequence of blocks of the same length, same number, yeah, which are different somewhere. At least in one block, they must be different. Can't be the same number. For which the final output is the same.

Yeah, so this is a collision. I claim if there is such a collision, if okay, I forget about now who computes it. Okay, say that if we have such a collision, then for sure in this chain of computation there must be a collision in the output of the compression function because at some point the two outputs they need to collide, right? Okay, but how is possible? The compression function is collision resistant. Yeah, any function I claim give any condition for for the hash function for my pen number, I can't find the point where there is a collision for the compression function.

Because I can just do the computation, and the computation is public, right? So I can just like I do the chain, and I will see at some point they will collide. Yeah, for instance, let's do an example. The final output is the same. Okay, then I just one step back. Okay, and I ask myself, the last block of it is equal to the last block of X prime.

Right, if it is not, why? That's already collision. Yes, I already found the collision in the compression function. Yes, if not, I go one step further, and one step further, and one. At some point, I will find one. Yes, so which means, given collision for Merkle Damgård, I can efficiently find the collision.

For compression, so if there exists an adversary that finds such a collision, I can build an adversary that breaks the compression function. That's it. Okay. So consider any collision x, x1, x2. And x prime, x one prime, x d prime, such that x different from x prime, but H S of x is equal to H S of x prime. Okay. So then, what I said is just this: running Backwards, there must be a larger index j such that basically x j comma y.

J minus one, it differs from x j prime, y j prime minus one, but. Yeah, no, but not. There must be such a j, right? For sure, not because otherwise the two chains would be the same. Yeah, right. So, since this is the largest, since j is the largest such index, then we also know that.

The compression of the ciphertext of x j y j minus one must be equal to the compression of x j prime y prime j minus one. Okay, so running backwards, I just find the largest j for which this happens, and then it's the collision. Yeah, yes. So again, you can think of it like this: like x1, x2, x3 for instance, like and then x1 prime, x2 prime, x3 prime. Compression, compression, compression.

Compression, right? So zero, three, and like this. Yes, and this is y. Okay, so this is y one prime, y two prime. Yes. And this is why, right? Okay. And again here, okay. So compression, compression, compression. Okay, one, two, and three. This is why one, this is why two, and this is why. Yes. And the two are equal. Okay. So what the proof say?

Running backwards, there must be a largest j yes for which they are different. But because this is the largest j, after that point they must be equal. Yeah, because at the end they, yes. So that's the condition. Yes, the point where we find the condition. Yeah. Okay. When we are comparing the values of x and y, the student supplies that.

They only find two different y's, then for sure, no. Not necessarily, right? Because I mean, a value collection could have like same x but different y. I mean, you can't assume that y is different or. I mean, in general, you don't know, right? Like, I mean, of course it could be. I'm not sure about the question. I mean, like y, there would be like a y problem. I mean, like the input of the compression function is made of two parts, x and y, so you need to specify both.

I mean the final y are equal. The final y are equal. Yes, but they want me to change. You go back until you find a y that is different. You go back until you find a y that is different. And then we know that at the next step there is a collision. Yes. Yes. But you know that to output the collision, you need to find both x and y.

Because you are right, you want to say if there is a collision for a Merkel number, then there is a collision for the compression function. Yes, the collision for the compression function is made of both x and y, so it doesn't suffice to find just x. You need to find both x and y that are collision for the compression function. Okay, what I'm giving you is the algorithm to do that. You just run backwards until the largest chain for which they are different. The inputs are different.

After this point, they are equivalent, which means that point exactly is the collision, and you need to find and you found both X and Y. Yeah. So if there exists a machine that finds a collision for Merkle-Damgård, there exists a machine that outputs a collision for the compression function. What the collision? Impossible. Yes. Okay. So the end of the proof, and then we can stop. Right. So given.

Machine breaking collision resistance of H, we get machine breaking collision resistance of comps. Contradiction. Okay. Okay, unfortunately, this only works for fixed input length of size n d, and then in the next lecture, I will show you that it actually breaks in general if the length is not fixed. So if I can change the input length, then this is broken in general. For this reason, the Merkle-Damgard paradigm adds one more block at the end of the chain, which makes it provably secure.

Even from everybody who like that, which I'm gonna prove in the next lecture. Okay, okay, guys, have a good one.
