# CR LESSON 8 - Transcription

So, remember the definition of a random function. It's a function that takes two inputs, right? One is the key and one is the actual input. And the property is that over the random choice of the key, you cannot distinguish the function with that key fixed.

From a uniform random function from X to Y, m point. Okay, and then we have seen. So as I said, like the the real object that corresponds to to pseudorandom function is a block cipher. So we are going to discuss block cipher a little bit later, and then we saw an application of pseudorandom function to that, which was a The first symmetric encryption that has a short key, right, that allows to encrypt arbitrary messages. Okay. So, so one limitation that we still, so there are still two limitations of this of this scheme that we would like to overcome, but we will do it a little bit later.

So the first limitation is that of course you can only encrypt messages that are compatible with the length of your PRM, right? So you're the to to encrypt the message, right? Your message length needs to match the output of the PRM, okay? So now, I mean, of course, if you have like a much longer message, okay, if the message is shorter, you can but okay. But if the message is longer, right? You You would need a PRF that matches the length of your, whose output to let matches the length of your message, right? But this is not what what is done in practice. In practice, it's just one PRF or two, okay, or maybe five. Okay, but they are they are famous, right? Everybody knows them. We don't want to touch them. It's very hard to design.

Is a function. So what you want to do, you want to actually still use a PRF, the same PRF, which will have like some fixed input output length, and then encrypt the message, which could be like that. Okay. So this we will see later on. So how to encrypt variable length messages? This is very important.

We will do it. Another thing that we do later is about active adversary. Adversary is the person who tries to modify the cipher. That's very important also in real-world application. So we will do these two things later. But I mean, of course, now the missing piece is how do we build the PRF. So we need to understand first how to build the PRF. So This will be partially about what we cover today. Okay, so the question is how we deal with it. Is that it? Okay, so then as I said, like depends who you ask. The remaining one-way function.

Is one option. Okay, and today I will tell you a little bit about it. But actually, we will actually not have to start from any more fundamentals. We just start actually from any.

It actually not very bad. In fact, we can see other ways to construct here, more efficient, instead of the old function, by using like complex assumptions, like factorings and so on and so forth. And then you can plug the assumption there, and you get actually efficient here. Not as efficient as yet. The other option is you just Just believe this area. This, this is what practitioners. But I will tell you later a little bit about how AES is made. So what what are the designs beyond blocks? As I as I told you, AES is actually more than that because.

We don't we don't need the function to be invertible for the construction that we studied at the beginning, but for other things, will actually be useful to have a function that is invertible. And we will see that there are some, of course, there are many important theoretical ideas behind the design of blocks. So we will study these a little bit in the course. Okay. So today.

So today we we look a little bit about this. We talk a little bit about how to build a PRF from an PH. Yeah. Okay. So this is a very famous construction, famous construction, which is from Goldreich. Goldbarter, Amicali, so called GGM, okay, and it assumes it assumes, as they said, CPA, okay, so let's assume that we have CPA GGM.

From 0 1 lambda, sorry, into 0 1 2 lambda. Okay. So this is the length doubling relation. Okay. So it takes lambda bit and it doubles to lambda. 128 to 256. Okay. That's it. Okay. So we know that this, without loss of generality, we know that this exists even in one fashion. Right.

Already, okay. So we have such a g, right? Now we would like to use g to build f. Okay, we want to build, so we want to build some f, right? Such that so our f k is going to be k. Will be from 0 1 n. Okay, so will be correlated with the n to 0 1 n. So the output is gonna be like that. Okay. Yeah. And this function is gonna be even.

Just very fast. Okay, so what idea? Okay, so the idea is to, so the main idea. So we should think of G, think of G, of G of k, of G of yes, k, or any k, as being the g0 k, comma g1 k. Okay, so because this is the letter doubling PAG, right? When I run G of k, I get two lambda. Yes. So think of G zero as the first lambda and G one as the function that outputs the second lambda. Yes. So where G zero, G one are the function, the function.

Outputting the first or lambda lambda bit of g. Okay, yes. So we we have g k. So then we get two lambda bits. So g zero is the function that outputs the first lambda, g one is the function that outputs the last lambda. In total two. Okay. Okay, so then the construction can look like this. So I will first draw it. Okay, we be like kind of think about like a binary tree. Think like a binary tree, and the root of this tree is k. Okay, the secret key of the pair. Okay, so then then you can run this G of k. When you run G of k.

You're gonna have like like like two leaves, okay? Because you can either go left or you go right. Left means you run g0, right? And right means you run g1. Yes. So then you are here, okay? Yes. And then you keep doing this, okay? G zero, G one, G zero, G one. Yeah, and then you actually, and maybe let's stop here. Okay, so then how do you evaluate the input? So like like I say, you need to evaluate f k of index k zero one. Okay, so because I only made.

Two layers, right? In the three, the input will be, okay. So like the the depth of the three is the length of the input, yes. Which will be n for the noise, right? So the number of noise in the three will be actually exponential in n, right? Yes. So then how do I evaluate this f k zero one for instance? Okay. I picture, I imagine this three, right? So then.

Because the first bit of x is zero, I go left. Yes, and because the second bit of x is one, I go right. And this is my fk here, fk of zero. And that, okay. So then. Of course, in this case, this is just two bits, right? And I mean this this is the entire truth table, right? Right? And of course, if there are n bits, there will be two to the n flips, which is like the entire truth table. Yes, but I'm not needed to store the entire truth table, right? I just like apply this abstraction, which is of course efficient. I don't need to store the entire tree. I just like.

Start with the key, take any, and make a path which will be of normal length. I evaluate at most n times g, and that's my efficiency. My efficiency will be n evaluations. Doesn't make sense? Okay, so that's the GGM version. Any question? I don't know what does means fk zero. That's the algorithm one could do. So in fact, this would be like fk.

This will be F K one zero and this will be F K of one one. So that's the type two step. And what does G do? G is a gadget. It expands the inputs and it doubles them. Okay. So every every node here we have the lambda bit string. From lambda, lambda plus lambda, lambda, lambda, lambda. Every node. In fact, the output length of the the function, as I said, is a bit lambda.

Yes. Seven. We have g zero and g one. Yeah. Is the g one a sublet of g zero? Yeah, yeah. I said the point. G zero, g one are two functions that represent the first or the last bit, last bits of g zero. Yeah, so g two is a function that outputs lambda bit, and g one is a function that outputs lambda bit, the first order, because it's two lambda bit. Yeah, yeah, any question? Okay. So now, I mean, what the intuition? Okay, like even before like trying anything more hard, no. So like the intuition of this construction is that.

Because this is the P H C, no? Like so, like start from the K K is uniform. That's the key. Okay. So well then, I mean by security of G, right? I can I know that G of K is computationally distinguishable from a uniform random string of length n. So which means that this node is uniform and this node is uniform. It's computationally distinguishable from the first node.

Okay, but again, this is uniform. The output G is uniform. So this is uniform. This is uniform. And this is uniform. This is uniform. Okay, then keep going. So everything is uniform. Okay, so that's the end. That's a function. Now the random function, because every leaf is going to be uniform, and that's the definition of an ideal board function. Every mode, every output for every input, is uniform random.

Which is this true statement of exponential length? Beautiful. Yeah, so that's all. Okay. So, but actually proving this intuition is not going to be so easy. Although the intuition is very clear, proving turning this intuition into proof would be slightly hard.

I mean, not too bad, but not not not as simple as I just said. And you, I will explain. Okay, so let me first let me first define the function. Okay, so I can define it formally now. Length n. F k of x for any x now of length n is gonna be I mean, let's try like this. G x n g of x n minus one up to G x one of K. All the parentheses, okay? Right? That's it. Okay. So start from G x one of K, and then G x two of the delta, and G x three of the delta. Right? Where I'm I'm I'm I'm thinking of x as x one.

X n right of length. So each x i is a bit zero. Yes. Okay, so that's just the equation for the bit for any n. Okay, the theorem is here and. Assume in G the B A G, then f defined to be f k as above on 0 1 and 0 1 lambda. Here we go. F is the the family function. So this is of course the family function. There is one function for every choice of the key, which is one function for every key. So then these together. Okay. Yeah. Okay. So the intuition. Okay, as I said, the intuition. But the proof with the intuition.

Is the fact that since k is random, then g zero k plus g zero k comma g one k. That computation, I think, we should go from. U lambda, U lambda. Distinguish from uniform. Two copies of U, two lambda that are not same. And then, and then I took away all the leaves.

With uniform state, all the leaves, the the object, with uniform state. Okay, so then if all the leaves are uniform, I'm done. Okay, that's the that's the board, right? I mean, once in fact the entire tree is uniform. Okay, so the entire tree is gonna make make a uniform distribution, so which means of course now that for every leaf I get a uniform random output, so that's the definition here. Yes. Okay. So what the difficulty is now? The difficulty is the fact that unfortunately, right? I mean formalizing this would require like a high level, of course, right? Because right, the theory of G is about one vocation of G, but then we have many vocations, so we should at first like.

So we should first replace these two nodes with uniform, and then these two nodes with uniform, and these other two nodes with uniform. Okay, fine. And now, of course, in this case there are only only eight nodes, so you would do this before. But I mean, in general, now anything other than polynomial, and when we replace all these nodes with uniform, how many hybrids do we have?

Ah, to the end. Okay. Now the hybrid went break up, right? Because the hybrid went right allows you to go from one hybrid to the next hybrid, at the price of moving like a small epsilon, which would be negligible, of course. But now we are summing up to the end negligible terms, and the sum is not going to be negligible. Okay.

So that's the problem, right? You cannot prove, right? Do you make sense? Because they are exponential, yeah. We just break down the epsilon. Sum up two to the lambda f two to the n epsilon, and this is not negligible. Even if actually like tiny tiny, sum up. Even if it would be like exponential more, right?

You will end up coming up exponential number of too many, yeah. Okay, so you need to do something much smarter. Okay, you need to to do it smarter. And so what idea? So the idea that although it's true that we have this exponentially large, large, large tree, maybe we do not need to replace the whole denoting the tree with That's it. That's the hope. Why? Because anyway, the adversary is going to make polynomial number of queries. Yeah. Right. So the adversary makes polynomial number of queries. He cannot look at the entire string. He can only explore polynomial number of queries. Each query is a path, right? In this string. So I mean, we only need to replace nodes in this path.

In other words, right? But the number of basis is going on. Any basis is going on, right? So we only need to replace polynomial number, right? Which says, maybe, okay, for the data problem. Does it make sense? Okay. So but like but this required x many hyper. Okay, so the previous thing doesn't work. So we need to do as much to do like as much again. Okay, so that's why the proof is slightly more technical. Okay, so so we will rely on the lemma. We will rely.

On a simple lemma, proof theorem, and then we can kind of prove the theorem by induction. Okay, so the lemma is the it's a very simple exercise. You can do it together. So the lemma says that the lemma says like basic thing. Okay, I mean this just will make the proof slightly more compact. Okay, so because I mean.

Of course, the security of G only allows you to to replace one node in the tree, and we would like to kind of like replace all the nodes in the path. Could you do? Okay. So this lemma allows you to do this in one single step with a with a shorter proof. Otherwise, we need to do hybridization, of course, because remember, G is only.

One shot print. You pick a random seed, and then you compute g of the seed, and then we have a different number. So if you have many g, a priori, it's good to compute g again. So this lemma is like a kind of shortcut to make the proof simpler. Yeah, and it just says the following: that if I have a certain, like a polynomial number of independent t, yeah, so I have like g one is a t, g two is a t.

A three, the seed and key T is the seed, and then we run GOK one, GOK two, GOK three, GOKD, what we get? Okay, okay. So so we're going to have that. Well, actually, yeah, g of u one, or maybe just say that g of k one, g of k two. Then computation trust to g of u two and u one.

Where ki is uniform over. Okay, what I just said. Okay, so if I if I take ki and say t independent, yes. So they are to be independent. Independent, yes. This is this is explicitly independent because for every i, i pick independently ki from the uniform distribution, so they are independent.

Because I pick them, each of them follows the uniform distribution, which means that t independent copies of the uniform distribution. I have them. But this is for every i. Okay, so for every i, I pick a random seed and then I do g of the first seed, the g of the second seed, g of the third seed. Okay, now of course.

This should have high security, you know. Like all the cipher is different. That makes sense. Okay, how we prove proof of design? So how do you do? Yes. Yes. We will have to show that there is something there. Again, it's being from the from lambda. Yeah. Yeah. Yeah. Yeah. Yeah. Yeah. So we need to. Well, we need to. We need. Yeah. We need to show that if there would be a distinguisher. Yeah. From. From. But the distinguisher would be like right from the left thing to the right thing, right?

Then we can break G. So what you are saying is that intuitively, right, if the adversary can distinguish, he should break the PRG for some seed. Is this what you are saying? I guess so. Yeah. How do we formalize this? It's correct. I mean, the intuition. How do we do it? With induction. Yes. Yes. Of course. We do induction. But I mean, how do we do this induction? Because Right, I mean, if you try to do that, okay, very. So you have these adversary that can distinguish t invocations of g, which is dependent from two times lambda times t. Right. So now, right on the other end, you have the adversary. So right now, you get only one sample from g. So how do you get another sample?

Yeah. So if you can distinguish between the two, yeah, that means that you can distinguish at least one instance of the two, of course, or not. But the number of different polynomials, so it tries. Yeah, it could be a way to formalize it. Yeah. Yes, that. But I mean, to to really formalize this, right? You need to define "high." Because otherwise, it's like I mean, "high" is that the only way to actually say what you said, like the the fact that you must distinguish from some input, okay?

Right, so you need to reduce the fact that you can distinguish from the security of C, but the security of C is just one time. Okay, so you need to slowly, gradually go from the first distribution to the other distribution. Okay, so you need to use a hybrid one. Okay, so what you do is you start with you start with G of K one.

G of k t. Yes. So then you do u to lambda g of k two. G of k. And then you do u to lambda u to lambda g of k three. G of k. And then you do. Beautifully, beautifully, beautiful. No, I mean you replace by one by one, one by one. So you start with first you replace the first, then you replace the the first that you have already replaced, of course. Then you replace also the second, and then also the third, and also the fourth, and also the fifth, and then until you replace all. Yeah.

These are hybrids, no? This is the hybrid argument, no? Because like the H H zero is exactly the initial thing, right? And H whatever, what is it? H T is the is this last thing, right? Which is exactly what we want to prove. We're going to prove that G H zero is computationally distinguishable.

Wouldn't it also work if you like just use the definition of distinguishability? And since they are all independent, like the probability of the difference between two would be the product of the individual. But how do you prove that? How do you prove? I mean, the point is like I understand the question. They are all independent, and then you can prove it, but.

I mean, like the only way that you have to prove is induction, right? So I'm given an adversary, yeah. I have no clue, right? Which adversary distinguishes what, to which one, in which one? Like distinguishing between the two different models. Yeah, yeah, just distinguishing which one is wrong. Well, you don't need, right? Because if it's a fight, then you just break one of them.

Right. Yeah, it would be kind of that we need to play by. No, sure, of course. But the the question is how to improve them because like I mean, try to do the reduction. Like if you try to do the reduction, yeah. Okay, so if what you say is true, right? Then if there exists a distinguisher from these two things, right? Then you must be the distinguisher for G. Yes.

So now the distinguisher for G only gets one time. What do you put it? I mean you need to simulate all these things. The problem is that the distinguisher would actually distinguish each of them from the yeah P okay exactly yeah P of them yeah but you have only one so how do you generate that? But you have only one time.

You are only WhatsApp. Oh yes. And you need to use this guy that either distinguishes t samples from g, from t samples which are unique. But you don't know which sample is g or unique. Okay. What do you give to this guy? See the problem? Yeah, yeah, yeah. Do you guys see the problem? So this this is just this idea. It's just a way to make this problem go away.

Yeah, because I mean, right. So now I can prove for this that H zero computation equals to H one, and now I can do the deduction. H zero computation equals to H one. How we do the deduction? Like, assume that there exists an adversary. Assume that there exists an adversary. So and then I mean, so like H t minus one computation equals to H t, right? Then it implies.

This implies that h zero is computationally close to h one. Okay, so how do we do this reduction? Now I can prove each of these steps. Okay, so why? Because look, what's the difference between h zero and h one? It's only in the first entry, only one step. All the rest.

I know, it's GOK. What's the difference between H1 and H2? Is only the second entry, only. The first entry is uniform in both. One time, then I can do the hash. What's the difference between H2 and H3? Only the third one. See? Right. So for instance, if I want to prove H zero computation close to H one, how do I do this reduction? Ah, so I have A, I have B, and I have C. How do I do it? B gets either you allow to use the number? Yes. Log.

Of k one exactly exactly z we get some z right let's call it z one okay we got to get it up put it in in the position one so this is of length two lambda right and we know that z one is either of g or k one or uniform right so exactly that and now what do I do give to you guy a a is the distinguisher between h zero and h one so what we get.

G one concatenate. I know that. No, G one yes yes. G one concatenate with yes. I need to keep feeding. Uniform H one. What? H D or H one? The first element to the first of H one. The first element of No G K two, G K three, G K four. Yes yes of course no. G K two, G K three, G K four. And who gives me K two, K three, K four?

Yeah, I sample, right? Okay, so I can I sample k two, k three, k four, k whatever, right? Uniformly, and then I just give g of k two, g of k three. Yes, I mean now I'm done, no? Because whatever this guy outputs, I will output, yeah. So now, so now what? If Z one was G or K one, if if Z one was G or K one, what did I give to A? G or K one, G or K, G or K, which is H D, yeah. If Z one was uniform, what did I give to A? Uniform G or K two, G or K two, G or K two, yeah. And what is this? H one.

So I made a perfect simulation of either H zero or H one, and what does A do? He distinguishes H zero and H one. So then I distinguish Z one from Z four, or from Z two. So then I can do the same proof for H two and H one, and H three and H two, and H four and H three, and so on. And then I prove that they are all distinguishable.

Yes. I mean, in fact, I can do just one reduction. Yes. I see why you need the independence, but where is the fact of the independence in this group? Well, the fact is we can sample k two k three independently, right? Because if you don't know if k two k three can follow, it depends on k one. We don't know how to sample them. But they are independent because each of them is individually uniform.

Right, which means that the trust distribution is also useful. That makes sense. So that's where we use independence because we can sample. Otherwise, we don't. Are we good? Yes. So that's just what. I'm just a simple observation. I mean, not very. I mean, very trivial.

I have a P G, and then if I run it with independent seed, then I'm going to get independent output. So it's just like the way to formalize it. They are enough. They are enough. You cannot do that. Okay. In general, it's always going to be like this. Okay. Like if you have an experiment where you need to use the security of a primitive many times, this suggests you should do higher than.

Otherwise, how do you do? I mean, it's kind of a rule of thumb. Okay, we pretend so, but you should always remember that there is this thing. Okay, do you think? Yeah. Okay. So now, okay. So now we can begin. Okay. So let's put now the theorem. Okay. So we prove by induction.

In particular, to prove the inductive action, we are gonna induction on n, n of lambda equal to four one. And so let basically a prime be the function when the input is of length n minus one, right? And and then define kind of inductively f k to be f k of x x okay so so f k is the function from zero one n into zero one lambda okay so I kind of define it inductively okay so I recursively define it to be f k how do I define recursively let f prime be the function.

For the first m minus one input, right, which basically means, right, and here in this bit, that would be m zero. In this bit, I mean now n is equal to two, m minus one would be one. It did not, yeah. So then, how do I find the output for another bit?

Well, just do either this or this. So, so which would be G of the next bit, right? Which G? The next bit, that be G zero or G one, apply to this node, which is f prime. Yeah. So, so this would be like f k. So I can write f k of x y is f prime. Sorry, G.

What we write here, g x, yes, g x of f prime k y, okay. When when I'm thinking of the input as being, I mean x is a single bit now, and y is all there. Yes, so I have an m bit input. Yes, I'm defining out of the best kind of recursive. Okay, I take the third bit. Yes, that's the last g, g x, g sub x of what of the function applied to the remaining part of the input. Yes, I did a recursive definition of the sample. Okay, this now.

Helps with the induction, because now in the induction I will say, okay, first I will I will show that this is of course gonna be a PRF for a single bit, for n equal one, n equal two, for n. When the input is just one bit, okay, then we'll be two. Okay, if the input is just one bit, then we'll be two.

Because I can, I can identify, and then I will assume, assuming that a prime is a BRF, I will show that so the the GGN construction is secure for inputs of length m minus one, then it's secure for inputs of length m, and then the theorem follows by induction. Yeah, yeah. So okay, by induction, no.

By induction. So, GGM is secure for inputs of length and equal. Okay, why so? Because Fk of zero is g zero of k, and fk of one is g one of k. Yeah, so this means that the right hand g zero k, g one k, is computationally close to uniform. Uniform, which means that I have a table. This is zero, one, and then uniform. So, right? There is a table.

Yeah, they I can look at the entire thing because the thing was so small in Android. So the real thing is it, but the security of G, this is the issue from this, and that's the ideal word definition of yeah. What is GGM? GGM is the name of the attack.

The three is the three, is f definition. Okay, so it's clearly secure for the evil of black one. Okay, yeah. So then, I mean, any questions? So far so good. Okay, so then I mean now we now assume and now this is the more tricky part. Assume that K prime is a PRF for minus one input and minus one input length.

Then we'll show f k is also there. Okay. Okay. So and then I mean this proof will be using two things. Okay. This proof of I mean perhaps not surprising here. Right. Look at the definition of f k. Right. Now I I did this inductive definition. So f k is g x of f k prime, and now I will use the two assumptions. f k prime is g r and g is the pi. But actually, instead of just using the assumption that g is the pi g, I will use this lemma, this this nice lemma, which already speaks about many invocations of k. This pi is.

Okay, because again we will have an adversary that can observe parts of the tree, right? And this is like many outputs. Okay, and then I don't even need to make the hybrid argument again, because I already proved the lemma. There will be much easier, because now I can make induction where I get to see feeding all the all together. Did that? Did we have?

See the point? Okay. So, okay. So, so how do we prove this thing? Okay, the last thing. Okay. Well, we just consider different words. Okay. So we have these. I mean, you can you can think of it like this then. Start with the real words, which defines f k as the real word.

In the real world, when the you can think of I mean this adversary, no. So really, you can think of the real world as that person can make an input, no, to the function, and he needs to distinguish if the output is from f or if it's a uniform random tape, no. Okay. So the first thing is the real world. So when the adversary queries x y, I'm using the same notation as in the definition of f.

So x is a single bit. F F K of x y is G K of f prime. Yeah, by definition. So we get F K of x y, which is equal to G X of f prime K of. Yes, just a little bit. Okay. So then, what we are doing now? Because I am assuming by induction that this prime is a PRF, I can replace that prime with a uniform random truth table from m minus one bit into lambda bit.

But n minus one, because f prime is the PRF over d of length n minus one. So I can use this assumption to deduce to go from this to this. Change color. A is going to be like x y, and then we get an output. And this is the f. Sorry, this would be. What in here? It will be let's call it H. H, what H of x y? It is just G x of r prime y, where r prime is chosen randomly among all functions, all functions from n minus one into lambda.

Yes. Yes. What is the difficulty of f prime? You cannot distinguish queries to f prime to queries from alpha. What alpha? It's a uniformly random table chosen randomly among all possible tables from m minus one to n, which we denote like this, the upper.

Lecture, yes. Okay, finally, I would like to argue that hopefully, I mean, well, this would be actually the case. There would be a third experiment then. Yeah, A, and then X, Y, and then again output, and this will just be the real world of the attack.

Where R is chosen randomly from all functions mapping n into n. So this is the. Say what? This is the. Ah, the. What is what? The green. This green word. Ah, the green word is the last word that I find, and it's actually the word that defines the other security domain. The word when you make a query, you reply with R of x y, which means uniform random table of inputs of length n.

Okay, in the hybrid before there is input of length n minus one. In the last there is input of length n. Okay, okay. I'm not saying that any of these steps are real. It's just like I'm telling what the steps are. So we first prove that blue is indistinguishable from yellow, and then the yellow is indistinguishable from green, and then another. Yes.

Okay, let's listen again. Okay, so first thing is that the first lemma would be that the green, the one like I don't know. Let's make it game zero, okay? Game one, game one, and let's call this game two, okay? Okay, take it. And I need to, I need to show that game zero is computationally close from game one. However, this is actually difficult. I'll assume that game zero is distinguishable from game one. What is it?

Yes. Yes. Yes. Yes. But then. Yes. Well, no. This is we're not going to use, right? Right. As you said, we are going to use the assumption that f prime is aperiodic. Exactly. So, but how we use? To make big. Yes, but I mean, yes, right. But I mean, in general, right? It's not like this, not that. I mean, in general, it's not like this. That I mean, you could be yes, of course, like because there is a prime and a prime is prime. Because there is a prime.

With Alice, yet, but only of course. Now this is part of a game where the adversary gets to see more stuff. So it is not really true. Not the two games then would be obviously distinguishable, because otherwise, like in this game, I could take the output of a prime and override it with zero, zero, zero, zero, zero, zero. But they are not distinguishable.

So you need to prove it. How do you prove? Well, we assume that someone can break this and see. I'm sure they can break it. Yeah, exactly. You prove it by reduction, right? So, like this is an exercise for the minute. It's just a simple reduction, and we can just sketch it. A.

B C. So what would be this reduction? Can you tell me? The reduction, how it goes? So B needs to play Efraim, exactly. So this would be the challenge for Efraim. And A is the guy that distinguishes blue from yeah, yeah. So what what A can make valid of the form?

Look at the query. Just look at the picture. X one, yes. You will make X one, right? And then we need to reply with either blue or yellow. So what are we going to? We're going to send the Y. Yes, yes. Do I challenge? Yes. And then we will get one. Let's call it yeah. Let's call it G. Okay. Then we get let's call it W. And then we apply G on W. Yeah. G and which G? Just G. Jump it. G of X. Yes. X. X. G X.

Okay, that's all. Let this guy repeat. We repeat. It distinguishes. We distinguish. It's three. Okay, perfect. Okay, that's because if W comes from f prime of Y, what do we get to the guy? G X of f prime. Blue. If f prime is R prime, what do we get? Gx of R prime, yellow. Perfectly. He can distinguish blue from yellow, but we distinguish f prime from R prime. That's it. It was this was the easy step. So now the next step is a bit more. Okay, lemma and the fact that game one.

Is indistinguishable from G. Okay, this is more involved because because because intuitively here we want to use the security of G, right? Of course, here we want to use the security of G, right? But I mean, we need to argue that G X of our prime is indistinguishable from.

From a random function. So we need to make deductions and be careful to do things correctly. I mean, of course, now, right now, I mean, now what? So the point is that the point is that in this experiment, in the Yale experiment, for every x one. Whatever X point, we are going to run G on different y's, because we run G on our primes of what? Because the adversary may choose y, our prime of y will change, so we are running G on many t's, no? Of course, in in this yellow experiment, it's not we run just G on one t.

Depends on what the adversary does. If the adversary always changes y, also the situation. That's why we have another lemma, that that we like. Then otherwise we would have to do hybrid inside the proof. But because we already have two lemmas, now the proof will be much easier. We will not need any hybrid. We just do the proof there. Yeah.

Did he? No, not not out of the blue, just intuition. Intuition one means that nothing. Yeah, no, I mean I'm just saying I'm just saying like something something maybe stupid, but so I'm just saying that it is yellow or white. And to prove that the yellow is meaningful from real, we need to use the security option. Okay, so normally the security option is one step.

If I have to make a reduction, my reduction, we get one time from either G or uniform, and now I need to simulate this guy that can make many ways. And now you see I'm in trouble again because this guy can can run this thing on many ways, many ways if we need many t. So how how do I simulate that? I don't know. Okay, I maybe I can do it, but then I need to do a hypergraph test.

Okay, for this, because we have already done the argument, we have been proved the lemma here, k independence. So the idea is that we reduce to the lemma, yeah, instead, not to the security of chi. We are reduced to the lemma for some t, for some t, yeah. But now, for what is t? I repeat again, t is the number of t.

Yeah, but I mean, look, I mean, this guy. How many seats are gonna be here? Like, worst case, as many as the number of squares in the rectangle. Yeah. Right. Because the seats is decided by what. Okay. If they actually makes square, yeah, then there gonna be exactly equal number.

Okay, choose it. Put it on. But yeah, we are going. Okay, the only difficulty is that whatever is either G zero or G one, the result is an X. So we need to be careful to be consistent in the reduction. Okay. Okay, so let's just do the reduction. So by reduction, by reduction, to the lemma above. So the lemma for the theorem. Okay, so we will have a, b, and c as zero. Okay.

And now our p here is going to be, in fact, I will use this lemma for q equal p. Actually, is the number of points there. So I will choose, I'm going to get z, z one, z two, and z t. Just z q over q. Okay. So let, so let, I think it will be enough in this paper. Let the T of lambda equal Q of lambda, which is number of queries made by a. Okay, so under a n makes Q of.

Yes. Now, in general, as I said before, two ways means what does it mean? Two ways. Two ways means x y. Two ways, right? Okay, let's just go in general. X and y. You want to call it X one, okay? You just call it X one, yeah. Yeah. Of course, it's quite a heavy thing. So we need to simulate this guy, yes. We need to simulate this algorithm. But I mean, for sure, if the adversary makes few queries, there are at most Q one, and at most Q one means at most Q two.

So that's why we can set the T equal. Let's say at this area, passage time, does he make each time queue queue of length two here or overall? Oh yes, queue is fixed. For any birthday, fix any number of birthday he makes, and they will all look like X one. Yeah, overall.

Okay, so now we need to reply to this to each other. But we have two outputs. But look, look. So each of the outputs, how long is each of them? How long? Just look at it. Let's be objective. Each time is long enough, too long. So I get pretty bored. The first time, the second time. So I will end like I will. G one zero, G one one.

And then g q zero, g q one. Okay. So we denote by g i zero, g i one equal g i the two values. Of each gi, right? To lambda. Right. Each of gi is to lambda, and we get pretty little part. Okay. So, I mean, what's now the the the the the What's now the difference? Okay, the only thing you need to be careful about is the fact that the only thing you need, you need to keep is the fact that for a given y, for for a given y, the adversary could input x equal zero and x equal one, right? In that case, you need to be careful not to change t.

Because no, right. So, is the point. So let's look at the first way. Yeah. So the adversary makes the first way. First way. So now first way. Let x. I mean, maybe let's go into x one while nothing. Be the first way. The first way. Okay. So what do I need to reply? What do I need to reply? What will I reply then? For x one, one.

Right, and again, look at the definition of the game. Yes, the yellow game is G x of R, G x of R, okay. And the green game is just R, okay. And after I go, I just R, right? Sorry. Take one one. Yeah, R prime of Y of one is a uniformly random thing, and then, and then, right, I get G one, which is made of two halves, the first half and the second half. So then, I mean, I would just so which which half?

I have two x. I have like we have x, so we can use zero x. Yeah, we what? Like yeah, that which corresponds to two x. Exactly. Okay, so like given like I mean when I'm suggesting it, because this is the first square. Yeah. Okay, y is the first to see. Y one is the first to see. Yeah. And now.

I have a g of y one. Okay, so basically what I'm saying is that I'm I'm thinking of the c as r prime of y. r prime of y would be see in the yellow one. And now I have g d of of the c or g one of the c, which means I have the first out lambda be g one, but the So depending on what, in fact, if zero, I will give d one zero, and in fact this one, I will give d one one, d yes d one one. Okay, so given the assuming so if well okay in general, then again think of.

Y1 as fixing the seed, fixing the seed, right? And reply with G1 X. Effect is zero. G1 zero. Effect is one. Zero. Okay, so for one way, for one way, this would be a perfect simulation because if the thing is random, right? I mean, if my g one is uniform, then what did I give this guy a uniform random string? Yes. If instead it's not uniform, but it's the output of G of k one, right? I give I give the second or the first alpha of the alpha of the pi, which is exactly the yellow word. The yellow word is G X of uniform. Okay, so I'm good. Okay, I'm good. Yeah. Are we? Are we making the adversary believe that both G1 and We cannot G1 and G2, but G2 we didn't use yet. You mean G1, G and G11? No, we cannot right because these are first. Here expects to receive lambda bit. You cannot give too long. If you give too long. No, no, here we need to give lambda bit for every query lambda bit, otherwise it explodes. He only he expects to receive lambda bit. If you give something else, it goes away.

I thought that when we when the challenger sends the C1, it's giving both the. Yeah, the challenger he must both give them both. It's B that then. It's B that then needs to choose what to give to A, right? But he can only give Lambda, he cannot give both. He doesn't understand both. He only understands Lambda. So now I change. Okay, because this is the first query. Yeah, why is going to be the first B? Well, why is going to be the first B?

Yeah, and now I will get a key. The first alpha of G or the second alpha. Now, now, yes, any question? So then the adversary sends x and y. Yes, he sends both of which is the challenge generator. No, no, you can think of things like I don't need any interaction. So I will receive my challenge all at the same time. I will receive z1, z2, z2. I know all of them. I'm done. I will not talk to the challenger anymore.

I cannot talk to the challenger anymore because look, this lemma says this lemma here. It says that this is indistinguishable from that. What does it mean? You get all together. You cannot talk to the guy. You cannot say give me first this and then that. You cannot stop. You just keep going. One, two, three, four, five, six, seven, eight. Now we need to use it to.

No. Yeah. Yeah. Exactly. Or uniform, uniform, uniform, uniform. Yes. Yes. So I mean, of course, now if everything is uniform, I will just lead to the idea of uniform. Okay. So until now we have to do it. And you got? Do you? Okay. So, but now the end point. Okay. Sorry. That that that way. Do you? I mean. And now, what about x two y two? Okay. So assume first. Assume.

That y two is different from y one. Okay, but it could also be equal, right? Okay, so now I'm worried about if y two is different from y one. I just do what I did before. It is. Okay, I will just but I will peek at the next out because it's an independent thing, you know. If y one is not equal to y two, right? Y two is equal y.

Okay, so what does it mean? In the yellow world, what do I mean in the yellow world? I cry or what do? Never did before. So I try to go to this uniform industry. This is gonna be okay. Yes. Okay. So then, right? Okay. Then I do as before. Okay, meaning that we reply z to x. Okay, right? Okay, but what if instead y two is equal to y one?

That's okay. Convinced. This guy could ask for the same y. Yes. Oh yes, yes, yes. Next one. Then we do it. And there will be again perfect simulation, okay? Because y two never happened before, okay? Y two never happened before. New city, to London. Which one? Y two. Because London is any one. X. X two is any one.

If x is zero, then lambda. If x is one, then five. And the English, but of course this guy would ask, why two divided by one? There is no rules that avoid this problem. Okay. I mean, now of course, I mean, without the assumption that x is different from one. Okay, because if x is two, but why two divided by one? Then the sequence is different from the other. So, in fact, I mean, without the assumption that x is different from one.

Because what's the point of repeating it? It will repeat the same way the same amount. Of course, I'm not simulating. So, assume that this never happens. If it would happen, I would just surprise you. Again, again, just to make the proof more streamlined. Assume that this doesn't happen. So, x two is going to be different from x one. Yeah. Okay. So now, what do I need to reply for?

Now I need to be careful. I cannot use the term "adversary." I cannot use the term "adversary" because if I would use the term "adversary," I will not simulate the yellow one. No, because I mean, look at the yellow one. Yellow. What happens in the yellow water? If you were x one y one and x two y one.

What? The density of G is. Is the same. You see, so look at the yellow one. If the pattern makes x one y one, what's the density? I prime of y one. If we make it. X two, y one. My value is equal to y one. What's the seed? I tried over y one. It's the same as before. You can see that before. But now if I change the seed, something's going up. I cannot change the seed. Then I took another seed. Then I'm not winning yet. So which then what went to? So you understand why here at the same.

What? I just don't understand why you say we need to go for next one, one. What? What are you saying? I'm just like assuming. I mean, I'm just like you know, doing the proof, right? And I'm looking at all possible cases, yeah. So there was x one by one, and then we know how to simulate, okay? Now it comes x two y two, right? Second way, x two y two.

And assume that y two is equal to y one. Assume it could be right. The adversary decides. I need to simulate every adversary. And then the adversary has to do y two is equal to y one. He has the freedom to do it. No, I need to simulate now whatever. Right? Okay. So now this adversary makes these two points, x one, y one, and then x two, y one.

Yes. So again, observe that if it does so, the seed that we use to apply is the same, and then we give identical result for the second. So we should better do the same. We cannot change it, but what the problem? There is no problem, right? Because when we just look back.

Right, that we look back at the prime square, said, Ah, look, I already asked for one one, right? And I used the the first half of the alphabet. Now we use the second one. There are anyway two answers, so in this case we know that anymore. But what's the problem with having the same seed? No, it's not a problem having the same seed. The seed is the thing.

But when we do the reduction here, and we need to reply to this query, we better use the z the z one that we used before. We shouldn't use z three, right? I mean, the point is like how do we reply to this query? Okay, so like you need to reply to the query x two y two. Okay, so how do we reply? I mean, you need to use one of the z one, z two, z three.

So which one do you? Very. How can you see three? Why is the same? Wrong. T would be wrong. Why is it wrong? Because if you use T, yeah, you are using a part of the output of an invocation of a PRG with another T. So the T, T one came from seed one and T three comes from seed three. But in the other word, it's not like this. T one comes from seed one and T two also comes from seed one. So you see that, no?

Still fine. Okay, so you just need to ensure consistency. Okay, okay. Same y, same z. If the y repeat, I mean if y never repeat, okay, no problem. You just like use the first z, the second z, the third z, but if the y repeat, then there are only two possible ways. X equal zero and x equal one. Okay. If at the first way you use the first z, now use the second z, and better.

Now, now you need to be careful. Okay, okay. So without the general x2 different vector. So now I need to reply, reply with g1 x2 because. Because in the yellow world, in the yellow experiment, experiment, we would run G of a prime of y, also okay. In both for both way, for both ways, x one, y one, g x two of R. For both, well, we will analyze.

I mean that the seed is and the seed and the seed is the same for both ways. The seed r prime y one is the same for both ways. Okay, now just I mean now we talk talk. Okay, and keep going. Okay, then cast the second way. Is it why is it why special because of previous question? In this case, it can be special. We already use both all and so. So if I understood correctly, the problem is that B doesn't send the y to C. He just gets all the bits at the beginning here. He has to send y to C again. Say what? So B doesn't send the y to C.

No. Okay, so he gets only the z at the beginning and he has to use that marks to Yes, of course. Yes, yes, yes. Now it's better. Okay. Yes, of course. We need to reply to every question. So now we we we have seen how to do it. Okay. Again, the y that are distinct just give whatever alpha of the i.

See, but if the wire repeats, better be consistent with the signals before. See, before before you interrupt, no mistake. And after, by the way, it's a big task. So you need to be careful. Okay, we get stopped.
