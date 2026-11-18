# CR LESSON 12 - Transcription

Secure channel. This builds so-called secure channel. Secure channel. Okay, and it's like super important in real-world applications. Whenever you establish a secure connection on HTTPS, after you have exchanged a secret key somehow, which we are going to study later, and we now just assume that it is in both ready, a secret key.

Then they establish, they establish, they use this key to communicate and create a session. Okay, exactly in the way that we are going to study today. Okay, so this is very important. It's part, for instance, of the TLS protocol. Okay, this is used widely. For instance, TLS 1.3.

Oh, VPNs. So like all these, whenever you have an application that requires secure and confidential communication, you always use these two things and combine them in in ways which are related to what we're going to do today. Okay. Okay. So the reason why you do this is because.

Is because public key encryption is expensive. Okay, so okay, so the problem with secret key encryption is that it's very expensive to share key. On the other hand, public key encryption, which we're going to study later, allows you to do whatever we did until now without sharing the key. But then the cost is much higher. The cost, the computation, much higher.

For this reason, in real life, you combine both public key cryptography and secret key cryptography. Just TLS, please TLS. You share a key using public key cryptography. After you have shared the key, you just do many great stuff. Okay, all all what you have studied in this course until today. Okay, because it's math. Okay, so you will never do like, although in principle you can. For instance, we will study public key encryption, right? And we study chosen plaintext attacks. Usually, you will never do like counter mode without a cipher.

Okay, it's just a message. You have to encrypt a long message, share a key, and then use it. Okay, because you can push all the complexity to the to only share a short piece of information, which is the key. After you've done that, you just do the good old symmetric. Okay, sounds good. So, okay. So what? So of course, the first thing that you need is a definition. So first thing.

So first, first thing we need is an enemy. Okay. So I mean, it's very easy to see that what we have covered so far doesn't quite achieve what we want. Okay. So now, I mean, like you should think about it like this. What is the secure chat? Alice sends the ciphertext to Bob, and this ciphertext supports at the same time both encryption, so it hides the message.

And authenticity, which means nobody can change. A full ball to accept another. You you want this? A fully secure chat. Nobody can touch it. Nobody can read it. Yeah. Okay. So this what we have done so far. It's very easy to see that. Unfortunately. So unfortunately.

Okay, so this finishes. The big response, the secret key encryption that hides the message, hides the message, but also ensures. Nobody, nobody can change. Okay, at the same time, yes. And what we have seen so far, it fails. So all what we studied fails.

Okay, for instance, let's make an example. Like, let's see, there is remember C equals C one C two one of these modes for encryption, right? AES-based secret key encryption, where we had, for instance, this construction, remember this? When it just one block, yes. So we wanted we wanted into a single block.

Any question? Okay. So, okay. So, consider one of the encryptions that we studied in the course. Okay. This one. This one. Okay. It's one of these modes of operation that we studied and that achieves the chosen plaintext attack security. Yeah. So, it was like so. R is used for.

And then we do E O R, and M is the message. Just one word. Yeah. Okay. So, so this is secrecy. But I mean, it doesn't quite achieve any authentication. Okay. So why? Because considering an adversary, well, first of all, because there is no notion of a ciphertext being valid or invalid. All ciphertexts are valid. If I, if the receiver gets Two things, we just decrypt by computing a P U R and XORing with the same part and done. Okay, but now think of an adversary that is actually active because choosing perfect attack security is about passive. Now the adversary is active, like in message authentication. So now this adversary for instance could look at the ciphertext that goes from Alice to Bob and just flip one bit of the second.

Flip the last bit of this second block. So what happens if I flip the bit of the second block? The new plaintext will be different to the first one. Yes. What? How different? Exactly. Like I mean, if I flip the last bit, what what happens to the plaintext? Plaintext on the.

No, no, it doesn't depend. Yeah, yeah, it doesn't depend. Just that's the last bit that you change. Yes. No. Because, like, look. So, so again, if I click the last bit of of C two, yes, then this has the same effect of as when you decrypt, you get M with one different.

An example of the last bit. Let's look. So if you use AES, modify only the last bit of the message. You modify only the last bit of the plaintext. I just modified the last bit of C two now. Okay, but let me look. So C two is equal C two till then. Let C two till then be C three. So.

Zero to the n minus one. Okay, so this means I'm flipping the last bit. I mean, assume is this function f outputs m bits, and then I'm I'm flipping the last bit. Okay. Well, well, madam, I mean, look, this is just the same as f k of r xor and xor. So this is the valid encryption. I mean, if I decrypt now, what do I get? M XOR zero. So the M minus one one, which means I get M plus one three. Yes, if I public keys, you can get M. Okay, are we together? All good. So you see, that's the problem. Okay.

So this is an example of so-called malleability. So I can, this is called malleability, right? It's sometimes it's a good thing, sometimes it's a bad thing. If you want to create a secure channel, it's a bad thing. Malleability means that I look at the ciphertext, okay? I have nothing what inside, but I can modify it, I can change change it, I can tamper with it in a way that side, and I know what is the effect on the message.

That will be decrypted by Bob. Yes, in particular, by changing the cipher text, I can create an encryption of a related plaintext. This is very related because it's all equal except for the last bit. Yes. Okay. So this is an example. An example. Okay, by changing cipher text, we obtain encryption.

Okay, some message. So when changing cipher text c, we get an encryption c tilde of message m tilde related to an inner trigonometric function. So I get C, I change it into C T, there somehow, and then I get that when C T is decrypted, it contains a message M T, and this M T satisfies some non-trivial relation together with A. For instance, they are equal except the last bit. Okay.

Okay, so this is the above is an example of a malleability attack. Okay, a normal encryption on the left hand side here, a normal attack example. Thank you. Yes. So, normal encryption. Above attack example. You're just there. Okay, what I want to mean is that it should be impossible to create an encryption of a related message for any possible relation. I don't know what the adversary mind, but it should be impossible to do any modification that yields some kind of relation. Okay, different relations could matter for.

Different application. Normal availability stuff. You cannot make any relation. No. Okay. Yes. So that's called normal availability. So this is very important. This normal availability stuff. Okay. It appears in the real world. Normal availability appears in the real world in many cases.

Okay, and this actually, these real attacks were more about yes. This is possible just because the channel where the message is being committed is insecure, because an attacker can potentially intercept, see, and modify the the message. Yeah, it's possible. What is possible? Like the attack or the the attack? Yes. Yeah, the attack is possible because the channel is insecure. Yeah, the channel is obviously.

The key should create the secure channel. Yeah, yeah. Unfortunately, encryption by itself it creates a kind of a weak channel. The channel is small. So the secret encryption creates a channel which is secure in some sense because you cannot read, but it's small. Okay. And now instead we want to create a stronger channel, which is both secure, secret, and normal. Okay.

Let me see. Okay. So there are many real-world applications of this. Okay, and many many real-world applications. One, for instance, is. Like a digital object, digital object. Okay, digital object. I mean, although these applications belong mostly to the public key world, but let imagine we do digital object. Okay, so like we we buy some money, and and then we bid on the stuff that we want to buy. So I bid, you bid, look at this. Okay, but of course I don't want to lose money.

Because otherwise you know so you shouldn't know. So I when I think, yes, but I mean in this particular application, really the piece is not old and that doesn't care about. So for instance, the only thing I care about maybe is to beat higher than you beat. So then maybe if I can trim the first bit of your cipher, then I'm sure that I can beat more than more than you beat. Maybe I can double as you beat.

So, my previous attacks are relevant for this. If I can change the ciphertext and I create something which is related to your bit, for instance, I don't know your bit plus one or your bit times two. Okay, and we will see later that, I mean, now with this particular example that we just see, you can just flip the bit, but we will see later that there are encryption schemes where you can do like.

Multiplication by constants, you take an encryption of m and turn it into an encryption of n. Without, that's another malebija. I say it's like this. Both the other encryption, but most of public encryption, they are obviously insecure and all malware. Yeah, okay. So that would be like dramatic for this application. Okay. So another application is well, or another kind of occurrence or occurrence of this malebija was the famous leak and bug attack.

Breaking bucket, breaking bucket, attack against TLS. Okay, so at some point TLS was actually using an encryption that was vulnerable. It was not following the definition that we are going to discuss in a second, and he was able to mount a real world, a real world, okay, which was very related to details, technical details of TLS.

Because this is more related to say, so this attack was actually more related to the ability of what to say. See, see the lecture. So we are going to get back to this, but that's another example of another behavior. And this attack made people change the TLS stuff. Okay, so, so malleability is wrong. Okay, there are all the situations where malleability is wrong. Okay, and this is called homomorphic encryption. Okay, so that's kind of, this is a kind of the.

The good side of my opinion, okay. This is bad side. The good side, and this has more more to do with like outsourcing the computation to the cloud. It's something we're going to really be discussing about today, but we're not we're not studying this in in a deep in a deep manner. So anyway, like one of the fancy applications that people use today in crypto is like.

Right, your sources of data, Google, Amazon, right? But then, anytime you post out your data, right, and you don't want Amazon to read your data, so what do you do? You encrypt. But then, if you encrypt, nobody can compute from this. How can Amazon compute on your data if it's encrypted? Okay, so you want that your encryption is small, because you want for Amazon to compute on this ciphertext without reading. Okay, that's called homomorphic encryption. And the homomorphic encryption must be small, so that nobody can compute.

Okay, sometimes it's a bit, sometimes it's a bit tricky, but a little bit on the average. Yeah. Okay. Okay. Great. So the definition now. Okay. So now I will I will I will I will define a notion. This is called CPA security, and. And this notion correspond exactly to kind of normality, will actually imply normality. And the notion like this that it's the same as CPA security, but with a different with a different k.

Okay, so the exact same definition as in basic theory, but with a different game. So here is the game five, six, lambda, b. Okay, so this is a game. Okay, and this game is. All that CPA allows, of course, right? So there is a key here. There is a key. Okay, and right. So they make this encryption. To try to repeat it, right? Then remember in this game there was.

Challenge question, and then there was this very tricky one. Okay, so okay, so these are the tricky ones. Okay, so these are the tricky ones. Okay. Queries. This is the challenge. No, it was m zero star, m one star, c star. Remember this? Okay. So then the adversary was guessing. Okay, that was the CPA. Okay, this is exactly the CPA. So this n queries. I mean, I'm not very know. What we usually want to get from the election.

And okay, yes. So the adversary can encrypt messages, and that's chosen plaintext attack. So the adversary can make chosen plaintext attack, which is I can encrypt any message, then I can get the challenge and zero star and one star. I get C star, which is either the C star, C star encryption.

Oh M star B no yes okay and then the adversary needs to guess if it was an encryption of zero star or an encryption of one star. It was the classical the Michi to Cristal entity now okay and the scheme that we just attacked before it was vulnerable to the spies. This definition, but now we are going to make the adversary stronger. Okay, so and the adversary will also make.

These ways, here. Okay, so these ways, this should be also. This one, this one here, this one here. Yes. Okay. So what that is ways? They are decryption. Okay. So an adversary can also make decryption. So it will last for I don't know c prime, c prime.

Ciphertext, maybe ciphertext, and you will get empty. Okay, so empty there is the decryption of ciphertext. Ciphertext. Okay, so this question, that question. Okay. The only rule is the only rule is m tilde of some c tilde different from zero. Okay, so I'm just taking CPA security and I'm making it become CCA security. Why it's called CCA? Because now it's chosen ciphertext attack. Okay, chosen plaintext. The adversary can choose the plaintext. Chosen ciphertext. The adversary can choose the ciphertext. Okay, so the adversary can choose C here. Okay, so somehow this corresponds to the Maler period. Okay, because the adversary gets to see encryption.

Right, the output of the encryption query and the challenge, and then you can try to create CTR by modifying the ciphertext. And now he he gets to see the entire plaintext, okay, corresponding to CTR. And then again, you can do this after the challenge, okay? But of course, after the challenge, the adversary wants to now challenge CTR, and the adversary can decrypt CTR. The adversary decrypts CTR.

Then of course he knows the thing. Okay, there is nothing we can do in that case. Yeah. Okay. Okay. So again, this looks very strong, right? You might wonder, realize maybe the adversary cannot get a decryption oracle, right? So like this decryption oracle looks very generous, right? I mean, I give the ciphertext and I get to see the entire plaintext. Yeah. Okay.

But remember, you must be paranoid if you want to be a crypto. You don't know what what is going to happen. You are a capitalist, sir. And indeed, and indeed, like just looking back at what I wrote above, this blinking bucket attack. See this blinking bucket attack that I said. Although it was more related to RSA, but I mean it was the same kind of attack. Yes. So in this in this real world attack, is there a question? In this real world attack, the adversary actually did have a full a fully fledged decryption oracle. It was not like this. The adversary TLS.

Could choose CPT and get to see MP. It was not like this. It was weaker. Okay, the adversary could choose CPT and can inject ciphertext in the TLS session, and then he only gets to know partial information about MP, not the entire MP. And this partial information was whether the messages encoded correctly or not, if it's a valid ciphertext or not.

Only this one bit. Okay, so okay, so this motivates our definition. You don't know in application what is going to leak. Okay, not whatever leaks doesn't matter. The adversary gets to see until the input. Okay, anyway, since we we can guess this in a cheap way, just better.

It's not gonna be another key, okay? We will just get it. And making the definition weaker would not help us to get anything better. So there is no reason to make the definition weaker. The stronger the definition is, the better one. Yeah. Okay. Makes sense. Okay. So this is very strong, yeah. Yes. So exercise. We can do the exercise. No exercise.

So the previous, the above considered secret key encryption, right? I mean this one, like c one equal r, c two equal f k or plus m, right? Is not large. CC, secure. Okay, just make a simple check. Now, we started with an encryption scheme, which what we said was unbreakable, right? Now we came up with this definition, better than a check. This definition is compliant to what we expect, right? So because the scheme was secure, that scheme should not be CC.

So why that? Why this scheme is not CPA? How do you? How do you show this? Maybe I can send the c one somewhere on the one and c two all the zeros. So m one is sorry, do encryption part or decryption part? Or you are choosing a challenge. I'm doing a decryption.

Okay. Okay. Okay. So I would send like a message where it's filled with like all zeros, and then I would know the value of fk or r or fk or something. Oh no, but let me. Yeah. No, it's okay. You can do this. No, but let me be aware. Be aware. Just keep the secret right. So, so definitely, if you want to attack this, you should use green quest. If you just use blue quest, you no. No, that was that was like quite. I think reading the ciphertext where the second smart one is ciphertext of zeros.

So C2 is the result from Alice, and then we get the same information about Eve. Okay. So you want to say that we just end the connection. So you want to send like C2 to Bob and C1, some random value chosen. Some random value chosen. And then we get it, but the problem is that random value is generated by the Eve. Yes. In that data, you should.

Like I mean, in general, not this interview doesn't have no because like you need to exploit the fact that it's modern, right? So you need to start from the side perspective and then, well, I mean, but like just do whatever we did before. I mean, it's not like rocket science. I mean, it's not a difficult question. It's just it's just a recast of what I already did in this game. What what did we do in the game? Sorry, not in the game. In this attack, we started.

We flipped a bit, yes. So we should also flip a bit. So, which bit? We flipped a bit in research. Which method? Ah, before we flipped a bit in the side. Yeah, which and this which eventually flips a bit in the mask. In the mask. Exactly. So now we need to exploit this in this gate.

How the next one to break this game? We are going to break it. We probably do one. So because taking the cipher text of the the system. Okay. Yes. We can take it. Yes. Flip a bit. Yes. In which we say that m zero star and m one star are different. Yes. Yes. We can take zero star. Uh, sorry, is bit with one. Yes. And.

The shooting plain text will give us information about the star. Yes, yes, this is correct. Okay, so what he says is this. He says like, look. Well, we know that given a ciphertext, if I flip a bit, whatever, this corresponds to flipping a bit of the plaintext. And now I can get this decrypted because it's a different ciphertext. If I flip a bit, it's going to be different. Okay. So now, well, okay, whatever, just to say, and zero star starts with zero, and one star starts with one.

Okay. And now I'm gonna get C star. And I don't know what's inside. I have zero star. Okay. In fact, it's a piece of code. I can, but I can do the crypto for now. Okay. So I flip a bit of the seventh part of C star. The first bit. Yes. This is a different side. The the the challenge is now the crypto. And I got. I'm gonna get the plaintext. If the plaintext starts with zero, it wasn't one. This has been one. It wasn't zero.

Okay. Okay. Make sense? Are we good? Any question? Make sense? Okay. So it's insecure. Okay. What we expect? We that's why we we came up with this definition. So this definition is consistent with our intuition that this scheme is malleable. And indeed, if you think about it, yes, this definition corresponds to non-malleability. Okay. Why? Because right? I mean, now this was an example that if we can flip a bit and whatever, no. But this encryption could have any other kind of malleability, and the adversary knows it, right?

And now, if the adversary knows it, he can always cast two plaintexts such that when he tampers with zero star, no, he gets an encryption that creates a relation that allows him to distinguish between encryption of zero star or like this. In this case, the relation was one bit equal, the first bit equal.

But it could be any bit, maybe the second bit, maybe the tenth bit, or decodable the bits, or whatever, whatever adversarial things you can do. But on the other hand, if the scheme is secure, no adversarial system can create any. Okay, yeah. Do you understand what happens when the attacker finds a query to an M, and then with decryption queries after a few attempts finds its respective C.

What happens then? In which case, like in this attack or in general? This attack, yes. You didn't get the attack. So you want you want me to repeat the attack? What what is the consequence of the attacker finding m tilde and then c tilde with the decryption query, like a? So it's actually very well. Okay, that person cast c tilde first and then obtains c tilde.

And then T deletes information about the challenge. Okay, so I mean, if you want, I can sketch it here. Like C start is like C one start, C two start, right? And then C T there is gonna be C one start and then C two start XOR zero and minus one one. And now, what's the decryption? What is an key?

And today is going to be the decryption of this CT pair. And what we said before is, if I flip the last bit of C two, I get the decryption of the message with the last bit flipped. So what I get here is m star p. Sorry, zero and one. No, which is exactly the attack that we discussed at the beginning of the lecture. So if I flip the last bit of c2 star, I get the decryption. When I get the decryption, I get the plaintext with the last bit flipped. But now I pick them zero star. I pick them one star. So I better pick them such that the last bit is different. So then, right? Looking at this, I now know if I want to see a one.

Well then it was zero. Yes, if I get to zero, then it was one, right? Because it gets flipped. So I I know I now can distinguish, right? Okay, so that's the effect. Okay, or in this particular case. Okay, in general we don't know what the effect is trying to do, right? We need to prove there is no adversary. Yeah. Okay, sounds good.

So okay, so I now give a construction. The goal is now to find a construction. So we see a construction. We see a construction. The construction will again almost use one-way functions. Okay, but I mean actually this construction will not use yes. We will get an efficient construction from yes.

Based on two properties. One is just a good old secrecy. Okay. Two is this so called authenticity property. Important. Okay, so I'm gonna give you like a criteria to build such a scheme. Okay, I want to build a CCA secure scheme. I will now simplify, and I will say, okay, whatever. When I have these two properties, I'm done, and it will be easier to prove these two properties in isolation instead of proving the whole CCA secure here. Okay, so I'm giving you two two criteria. Okay, I mean, of course, one criteria is it should be a CCA secure, but then it should also be authentic. Okay, what does it mean authentic? Authentic means There are going to be ciphertext which are valid and ciphertext which are invalid, and the notion of valid and invalid will depend on the secret key. Okay, so the decryption will take a key and the ciphertext and will output a message or an error. Okay, and this authenticity property says if you do not know the secret key, okay, you cannot create a valid ciphertext.

If you cannot create a one-time pad, you cannot make any money. So this this is the intuition, right? Okay. So, okay. So, so let that go from key space times ciphertext space into message space union bot. Where bot means Decryption error. Okay, we are we will allow for some decryption error, which has nothing to do with the correctness. The correctness will never generate decryption error. When when Alice is honest and Bob is honest, no decryption error. But on the other end, it will be hard if you do not know the secret key. It's gonna be hard to make a cipher text such that the decryption does not output what. Yeah.

So all ciphertext that you create without the key are going to be equal. Yeah, that's the intuition. Yeah, so we kind of capture this with the game again. Let's go game. You can see the game. I mean, by a and out. Okay, so this is basically the information theory game.

Okay, it's going to be the same as the affordability game, but for encryption. So, like the the message m encrypts and c. Okay, k is uniform. C is the encryption of m. Okay, and then adversary outputs m star, c star. Okay, and adversary wins. Oh, sorry, adversary actually outputs only c star, just c star. And then adversary wins. He wins if c star.

Is different, does not belong to C. This is fresh, and also puts a deck of this key of key, sorry, key. C tag is different from okay. So it's just the unforgeability game, but slightly different, okay, because it's about encryption, not about message identification, so remember the unforgeability game was even though I get to see tags, I cannot create a valid tag.

Yes, but the attack for some message. Here, instead, I just need to create a valid ciphertext. I don't need to know what's the message inside. Okay, doesn't matter. I don't need to know it. Yes. So I just need to create a ciphertext which is valid. Yes, and ciphertext which is valid without knowing the key. Okay, but I can do encryption. Okay, I can see ciphertext which was honestly created by either Bob, yet I should be able to create a new ciphertext.

Okay, does make sense? So it's just basically the same as unforgeability, but and without yes, unless I know the message. Okay. Okay. Right? Because right, the verification requires both the messages. Here, instead, there is no escape because the decryption just gets inside. Okay. So this division takes. It's hard to create one. Okay. I mean, of course, like again, sanity check. I mean, I'm claiming that these two properties. In a second, I will claim that these two properties imply CC security.

Okay, so these two properties together, they imply the security. The proof is very simple. Okay, so side check. I mean, of course, this again, the broken scheme is CPA secure. Okay, so it shouldn't be bad. Well, I mean, of course, no, because we said if I give a side, I give a side, I take such a split, the last bit, and I get the right side.

Okay. In that, in cryptography, there is no notion of valid, invalid, everything is valid. Yes. Are we together? Okay. So here is a simple thing now. Simple thing. Theorem. CPA plus out implies CCA. Okay, let me try to be shorting. Okay, so this means of course, let Pi be a secret key encryption scheme. Assume that Pi satisfies CPA security and other things. Then, okay, Pi also satisfies CPA security. Okay, if I have this two property, in isolation, I also have CPA security, as a whole. Okay.

So what's the intuition for this? Okay, so the intuition for this is that because you cannot create one ciphertext, the decryption key is admissible. No, what is the decryption key if you cannot create any one ciphertext? Second, the intuition. So intuition.

Uh, intuition is like since uh, how to call it? Description-wise, I. Okay, so we can use CPA to CCA. Okay, so this is the intuition. Okay, because the decryption query is useless, CPA and CCA are the same. Okay, so let's give a sketch of this reduction. Sketch of the reduction. Okay, so the reduction is going to have. Okay, so I'm busy. I'm saying this. Like, let's prove that the cryptosystem is CPA secure by reduction to CPA security. So, assume that there exists an adversary that breaks CPA security. I'm going to beat the adversary that breaks IND-CPA.

Of course, in general, this is possible. Like it was, it's not every scheme that is secure. It was just secure. So in this in this reduction, the authenticity property plays a role. Fundamental. Without authenticity, we will not make this reduction. Yeah. Okay. So what the sketch of the reduction? So the sketch of the reduction. So we have ACCA here.

And we have B CPA and we have C CPA. Okay, so yes, can anybody sketch today? Like, what's the main idea? So how what how does this election look like? From CPE to CC, secret key. Step by step. If the packets sends ah for the super text, they are probably one to one. What is the which one?

The A. A. So A is the CCA adversary. Okay. So he plays this game. Okay. Is it? Yeah. A can send queries, but which way? Just one by one. Okay. Just one. Just one. Okay. So which way first? A. Yeah. Okay. So what about the input? So okay, see what they're saying. No. Like okay, this B will run A, and now A can send queries. Okay. What kind of queries? First query is an input query. So why did you send an input query? B can just send it back. Yes. We can also B can also do an input query. Okay. So B can do the same query. No problem.

Yes, C X M C C E easy till now is okay. But now, hey, what do you do? Okay, now here we need to be careful. Okay, so now this adversary can do also this C T equation, right? And we need to reply. Is it adequate? But the answer is a bit clear, right? So see what I say. In general, okay, the CPA cannot do anything proper. Except that now we have authenticity, okay? So maybe we should reply to any decryption query with both. But what could be the problem?

Valid, valid, yes. But I mean, valid how? Why? Can you make an example of valid syntax? Example of yes. If that person is the first time I get see, if it's unseen, he should get that. So right? So we cannot just reply both. That would be fair. So you know. So if we all without one.

Okay, so the intuition is that we can output one, yes, right? Because why? Because intuitively, the adversary cannot make, cannot make such a query that the answer is not one. If he would make a query that where the answer is not one, he would have broken our system. Yeah, I mean somehow this should be part of our proof, this argument, okay? But.

But yes, so let's discuss this later. Our strategy will be to answer what because we know. But of course, we shouldn't just output what, whatever, no, because these are words they didn't ask. The only rule is that C T is not the challenge. So now C T will be like one of the prime squares. No, nobody proves that these words they can say and C and then C T the equality. Okay, I mean of course this is just stupid, but but our answer should.

Should be consistent with it. Okay. So we apply what or and if city n equal to an order. And we know it in that case. We know it, right? Because, first the square is there. Then we divide two. So we know it. So we can divide. There is no problem. The square is no problem. Yes? Okay. So I mean now we just keep going. Yeah. So then I mean we will challenge and zero star and one star. See star.

And then we just do the same, and here we start. Start, see start. Okay, so okay, all the other points are the same. Okay, so that's basically the main thing. Okay, so now I mean, when you analyze this, you need to be like a little bit careful now because of course you cannot say just now this simulation is not like it's not.

Is not that we are done? Why? Because because there could be the event that that person creates a C still which is fresh and valid. Then we are screwed. Then we are broken. We said what, and then the guy said should not support, and then we are lucky and broke. Yeah.

Okay, so one way to deal with this is to say, okay, well, then I there are two we define an event, right? The event that for any of these queries, no, this adversary creates a ciphertext which is fresh and bad. Okay, that's the first event. So then we can split the probability that the adversary wins in two cases. Either he wins and he provokes a decision, or he wins and he does not.

If it has no strong key then our simulation is perfect. So the second term will be almost the advantage of the CPA game. The first query, the first case, we will bound this probability with the advantage of the adversary. Because such an adversary will break the key. See the intuition. Yes. There is only one.

Let's say the output is filled. The expression is one, but we get we give Bob. Then after and zero star and then also he can send other information. Right. Then and what I would say he sends m and he gets the. But first we send was Bob. So I mean in that case we are not going to use. I mean it's like just different. I mean in that case there will be a problem. So I mean in general. Okay. So if we reply.

To one of these queries, in a wrong way, we have no guarantee that this adversary can distinguish anymore m zero to the m zero star from m one. So we, if if we are wrong, yeah, we cannot use the advantage of this adversary in order to break secrecy. So the answer to your question is that we don't have, because we are not going to do it. We just prove that this event is never going to happen. Then we will be wrong. Okay.

Because if it would happen, okay, if it would happen, then there would be an adversary that breaks our system. See the point, okay? So one way to do it is this, okay, okay. So let let B be the event that there exists, there exists some query c, let's call it c i, c t i.

Such that, to keep the eye fresh, and by right, okay. So then of course the probability that A wins is at most the probability that A wins and per. Last the probability of wins and nothing. Yes. So then this we can bound with with this is at most like this is at most epsilon CPA. Do you know?

And this is most absent out. Okay. Yes. So, right. So what does it mean? I mean, what is that? In order to actually prove this, you need to make two reductions, of course. Okay. So in general, this is as I said, like already many other times. So this was a sketch of the reduction. But if I would have to prove this thing very formally, I would not do this. I would not do this reduction directly because it's a general thing. Yeah, you want to prove a statement which requires two properties, you better go and make two reductions. So I made one reduction. This sounds kind of strange. Yes. So a clean way would be consider any adversary right that you tries to win the CCA game.

Nice to distinguish. Then his advantage can be split in the case where he wins and the event happens, or he wins and the event does not happen. Because either the event happens or it doesn't happen. Yeah. And then we just bound these two things individually. Right? We are going to prove that the first is negligible and the second is negligible. Okay. So now, when we assume that the first is not negligible, we are going to make a reduction to the hardness of this problem.

Yes, when we when we assume that the second event is non-negligible, we're going to make a reduction to the CPA property. And this reduction is exactly this reduction. And and now we will just answer a thought. And because now we are conditioning on this event not happening, right? We don't care about this thing. Bottom up. Okay, that's one way to do it. This is one way to do it.

So this is like a work out something in the group, okay? Another way to do it would be to find to do like game hopping instead, like instead of saying like we split just versus two and so on. We could also do game game hops like like we do always in this course. So what do we do? We start with the CCM game, yes? Then create another game.

What is this? It's a game where we answer bot to every decryption query, okay? By the phone, okay? The adversary makes a decryption query, we answer bot, unless this query is an old query, then we answer the message. Yes, okay. So it's a new game. Yes. So now, if there exists an adversary in this new game, there exists an adversary in the PCP game.

That's the reduction we just showed. So now the only thing that we need to show is that it's impossible to distinguish the original game from the new game. Reduction problem. It's just a different way to do the proof. If there would be an adversary that can distinguish the original game from the modified game that I just said, the only way to distinguish is to make it equal to the fresh and not valid and valid. But if such an adversary makes such a play, I cannot prove that it's valid.

I can make a reduction from this. Is it clear? Okay. So I invite you to kind of fill the dots. Okay. I mean, I of course there are some details here to be filled, but I mean it's mostly things that we have done already. So I invite you to take your pen, your sketching, and try to just write it down once.

It's a it's a good example. I mean, it's nothing new. We just went all the things that we did in this course. So be quiet, some some care, some some care, okay. So I will I will stop the sketch here and I will let you fill the answer. So if you find any trouble, just let me know.

Okay, so basically this got it, okay, which was maybe like a bit subtle, no? With all this, I mean, how to do the proof right? You need to be like a little bit careful, but I mean, it kind of responds very intuitionally that I mean, it's authentic. This description quite intuitive, so it was a very intuitive. So, so all is left is to show that there exists a scheme that satisfies this properties.

Yes, that would be easier than just that. Actually, from CCA, exactly. Sorry, I mean that's also most like CCA implied. That's a good question. I think not. I think they are not exactly the same. I think these two properties are strong, and you can prove it. But on the other hand, the access key we have to satisfy these both properties, which just makes it worse. That's a good question. Okay, sounds good. So let me give you this. This so then so how to get.

One plus two, okay. And the answer is simple, which is combine secret key encryption with message authentication. Okay, it's kind of natural, no? I mean, one is secret key, two is authentication, which we said, okay, is replacing your Mac. So let's combine encryption. There are many ways to do this. Okay, so here is the question A. You can do this like you do C, which is an encryption of.

We should put k1 and and tau, which is a tau of k2 and and c prime is equal to c tau. Okay, so this is called encrypt and authenticate. Okay, so here is an approach. Here, here is an attempt. I take the message and I encrypt it. I take the message and I decrypt and I output the message and the ciphertext and the tag. Okay, the question for you is, is is is is it secure or not?

So the message is tagged, right? So if you change the message, then you need to also change the tags. On what? That's the thing. What? If someone alters the ciphertext, yeah, the the new plaintext will be different from the original. Yes. And when the receiver will compute a tag of the new plaintext, it will be different from the tag that he received.

Yes, so we suggest that this scheme is okay. Okay, what? What? You're you're correct. Okay, so the intuition for this is that exactly what he said. Okay, if I modify the ciphertext, it will change the plaintext. Unless I can modify it without changing the plaintext. So I know it's not be possible, but.

Then, well, what if I can modify it without changing the plaintext? Well, if I can re-randomize it, for instance, that sounds better. If I can re-randomize it, what you said is not actually too wrong because then the target will match. See the point? The point? Oh, that's one reason maybe.

What's another problem? Yes. Maybe the tag could reveal. Yes. Yeah. You answer right. I mean, who says that the tag hides the plaintext? Who says it? The tag should can then hide the message. Okay. So, so this is not. This is not. Maybe should write not always secure. Let me explain what I mean by not always secure. But for the example, for instance, consider consider the output.

And zero is generated with the ElGamal. ElGamal is relevant. Okay. So I consider it such a time, no, where. I mean, like such a stupid tag where you you append the first bit of m, but you also append the first bit of m. Okay, whatever. No, that doesn't matter. I mean, this tag is still unforgeable. Again, so unforgeability the message is plaintext, right? It's a plaintext. So, okay. So, of course, now I mean this scheme is like pretty stupid, right? And you might ask like, okay, but maybe for instead use like CBC MAC. This is not a problem. It's all supported. Yeah. Of course, it's a reasonable question. On the other end, I kind of like take. I think I suggest we should take like a lazy approach.

Like what do I mean by this approach? That you know it was painful to construct CPA encryption. Like painful to construct math. Okay, I don't want, I do not want to reinvent the wheel now. I have a secure math. I have a secure encryption. I try to look for kind of like a lazy way to combine them without looking at what they do inside, and I do the proof from the beginning. And I would like to be always secure. Okay, no matter what. Like I don't know what this kind of target is.

I know it's UAF CMA. I don't know what the secret key encryption is, but I know it's CPA, and I will just lazily combine them and and and get the job done. Okay. Okay. This does not satisfy my criteria. Okay. Maybe you can fix it for some construction, but this would require like some work.

Nobody is interested in doing this. Okay, makes sense. Okay, so let's do like the other two options, and then we're gonna stop and prove the the new one in the next lecture. So this option B, option B is this. Okay, like the intuition for option B is, okay, we have seen an approach that fails because the tag can reveal some information about the message. So let's encrypt the tag.

Okay, so that that's the philosophy. So C is gonna be an encryption under key one of M concatenated tau, where tau is the tag of. Okay. Okay, so I tag the message, and now I cannot send any tag in the clear, right? But then I'm gonna encrypt together with sacrificing some message space. Okay. So then the question is like, secure enough?

And the answer is no. Okay. Despite this was used in TLS one point two. Okay. That's the approach taken in TLS one point two. So and. For the particular combination that they used there, it was actually not a problem. They actually proved this in a complicated way. TLS 1.3 doesn't do this anymore. TLS 1.3 has option C, which we're going to see next. But TLS 1.2 was doing exactly that, which is not secure in general. Okay, not secure in general again doesn't mean it's always insecure. It just means that it could be insecure. So better watch out that when you actually use it, you're going to prove explicitly that the combination that you're using is secure.

And this was the case for TLS 1.2. We, if you want to, but okay. But in general, so what's the intuition why this is not true? So exercise. I leave it as an exercise. Three. Okay. So the intuition here, it's kind of more subtle again. Not because, like, look. So the tag is encrypted, right? So in that there will be nothing what matters.

On the other end, it seems that even if the ciphertext is malleable, right? If I would change the message, right, then it's also going to change the tag. Yes, that's it. But I don't know what about encryption where I can actually mount it without changing the message. So if I can re-randomize encryption such that I get a different ciphertext, no, which contains the same message.

They don't need to forge anything. Yes, they will be in my lecture. Okay. Yes. What's the point of changing the ciphertext if you don't change the message and the receiver can also decrypt the ciphertext? The point is that I'm an attacker. I'm going to change the ciphertext. I want to break your session key TLS. Okay. I take your ciphertext and I build another ciphertext.

Which contains the same key. I create now another session, TLS, and now I get to know the key inside that session. I can break also your session. You see, like if I create another session with the same key, it makes, but it makes if one session leaks also the other session. That's not a good secure protocol, huh? Okay.

But if you change the cipher text, so since encryption is a NPC, not encryption, okay, NPC is the good way. Right, the encryption is NPC, so it's random. Okay, so last but not least, let me use a secure construction. We're gonna analyze this in the next in the next lecture. So here is the secure solution. Here is the solution. It's the good way to do it. It's the correct way.

So what I do is like first they encrypt the message, and then I tap the cipher. Okay, so I first encrypt the message, and then I tap with the cipher, so that it's hard to produce a valid cipher. In theory, this is CPA. Yeah, and I mean the fact that the target reveals information about what I target, I do not care because anyway, targeting the ciphertext, so I am not targeting the plaintext. Yeah, and moreover, it is going to be hard to produce a valid ciphertext without knowing the secret key before the attack. Yes. Okay, so that's the intuition. I mean, the proof is very simple, but we are going to see in the next lecture, which is going to be next week. Okay.

Kini tu, satu tahun. Cao. Nod.
