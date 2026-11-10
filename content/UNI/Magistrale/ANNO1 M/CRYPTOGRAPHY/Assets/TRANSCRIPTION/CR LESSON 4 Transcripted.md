Okay? So remember the left lemma says that any any right which we have already
seen an example. I said this theorem has many applications some of these
applications So it's good to go through the proof and you know we use the lemma
okay which was like a about how to bound the statistical distance between any
distribution and uniform right? We show something is an extractor right the
output of the extractor is statistically close to uniform even given the seed.
So this lemma kind of gives you the condition to bound the statistical distance
between any distribution and uniform the sufficient condition to prove that the
statistical distance which is and you need to prove is indeed okay? So we
already applied this this lemma and we used it to prove the So what was left was
to prove the So let's prove this lemma and then yeah and then we will stop
talking about It's a very I mean as I said it's a very actually well studied We
we know that these results Okay so it remains to prove the to prove the Okay so
here is the proof proof of the lemma Okay so what do we need to do? We need to
we need to bound the collision probability right? and so we have a bound on the
collision probability and so we assume that so we know that we know that the
collision probability of Y is at most times one plus four And we need to show
that the statistical distance between Y and uniform is at most So let's let's
compute the statistical distance What's the statistical distance between Y and
uniform right? U is a uniform so and then by definition right? the definition
some over Y in Y of probability of Y Okay and then you have minus the
probability that U is Y Now what's the probability that U is equal to Y? Yes
because Y U is uniform Okay so that's the application of the definition okay?
Yeah so now so we have like this this Y this difference So let us call the
difference so let us call let us call Q sub Y the difference probability of Y
minus one over Yeah so this is This is the difference which is inside the
absolute value okay? So this difference can be either positive or negative okay?
So we can define the sign function which is the value that is either plus one or
minus one depending on Q Y being positive or negative Okay Q Y is positive it's
plus one okay? and and otherwise the sign function is minus one okay? Right
because now summing all these values right over Y is like summing basically Q Y
times S Y okay? Because Q Y is positive we multiply it by one because the
absolute value is positive. If Q Y is negative we need to multiply it by minus
one because then we take the absolute value it becomes positive yes? Okay? Why
why do I do this? Because then so then we can we can envision actually this
thing right? So like the statistical distance now between Y and U right is just
sum over Y of Q Y yes? Okay? Right? Okay? So now I can I can think of I'm
summing this this this Q and Q Y and S Y over So I can I can actually think of a
vector like I can I can I can think of a vector Q right? So Q of Q vector which
is the collection of all Q Y and then and then there is also an S vector. S
vector which would be like the collection of all S Y Okay? So what is this Q Y
times S Y summation is called the inner product yes? Yes so this is the this is
the same as one half inner product of Q times S Okay? So it's just it's just an
equivalent way to write it okay? We can write it as the inner product of these
two vectors okay? And now inner product satisfies the So it is the famous that
the inner product is at most one half times the square root of of the vectors we
consider okay? Yes so this is this is called Cauchy So this is the standard Yeah
which gives S bounding the inner product inner product of two vectors is at most
the square root of the inner product with the vector right? So now we can use
this part to can finish the proof okay? So what is Q product with Q? Okay Q
product with Q with Q would be by definition right? of the sum over Y of Q Y
squared And what is the S S one yes what what is one? Each element S is yeah but
then how many elements are there? Yes S in the product S is equal to because it
would be the same expression as this with S instead of Q yes? But S squared is
one How many are you summing? Yes okay. So so we got this okay? Yes.I don't
understand whywhich You don't Yes the So because the inner product of we didn't
have yeah it would be the same expression as this yeah? It would be sum over Y I
can actually So this is going to be sum over Y of S Y S YoneIt's one S Y squared
is one. But how many are how many are you summing? Yes as many as there are in
calligraphy one Yes Okay awesome. So so let's focus now let's focus on this sum
okay? Sum over Y Okay so we'll focus on this yes? And now we will just compute
this term yeah and then we will use the collision probability to bound it so
remember we have this collision probability so we know the collision probability
of Y is at most yeah so we're gonna use it So in order to use it we will indeed
expand this step So this term of course you see this term Q Y depends on the
probability of Y So when you take it squared for instance it will be probability
of Y squared which is the Right? So let's since we are going in the right
direction okay? So if we if we do this sum over Y of Q Y squared okay? Well this
is gonna be the sum over Y of this probability of Y equal to Y minus one Yes
that's just the definition I I I got it okay? So now if I do the square just
compute the square now the square what is it gonna be the square?Probability Y
equals Y squaredYes.plus one over probability of Y squaredYes.minus the product
of the two timesYes exactly. Correct. Right? All inside is something. Right? And
just Yes I'm just bringing down this square okay? So I get the first square plus
the second square minus the product twice the cross product yeah? Okay good. So
now what's the first term? So now we can see this as three terms. What's the
first term? It's the definition of collision probability so the first term is
collision probability of Q of Y Right? The second term is one over cardinality
of Y right? Because we are summing for Right? The second term is independent of
Y so it's gonna be one over cardinality of Y And the third term?one over
cardinality of probability oneYes we sum if we sum the probability of Y for each
Y we get one Y is a probability distribution so this is gonna be minus two over
cardinality of Y Okay? Well so what this is so now now what? This is at most
yes? Our assumption no was that this is at most one plus four epsilon squared
over cardinality of Y There was our statement over cardinality of Y minus two
Well so it's just like minus minus one yeah? So one so this four epsilon uh over
cardinality of Yes? Are we good? So it's it's basically done okay? So then now
just put it back in the statistical system and what was statistical distance was
this. We we proved the statistical distance is one half square root of this
yeah? So now just plug it in it's one half square root of the sum which is four
epsilon squared over cardinality of Y times cardinality of this time And then
the result is that Okay and Yeah. Yeah.Now when we we write the condition of
YYeah yeah.Y is at most one over Y and at most one over Y Because you are
summing this is this term is inside the sum. Everything is inside the sum so
which means like three sums okay? So the sums of constants this is constant one
over cardinality of Y squared is constant How many are you summing? This
cardinality of So yes you you can call it C it's a constant yeah? And how many
times are summing is constant? How many what It's like one you sum the constant
one for each inner one. Okay? How many cardinality of So you get cardinality of
Y times one over cardinality of Y squared which is one over cardinality of Y
Make sense? And the second thing is the last term is the last term because we
sum the probability Right? The the last term is not constant it depends on But
how many you are summing now all over all Y you are summing the probability of Y
which is one because Y is a distribution okay? Okay simple enough okay not very
easy. Yeah yeah yeah. Yeah.The statistical distance of Y is at most uniform than
one halfSo we So actually so Yeah of course I mean Q we had only a bound on Q Y
squared right?Yeah.So it was just an inequality right? So but that's what we
need to do so it's at most Great. So so we have seen this so try to remember it
because it will as I said it will pop up again okay? So you can think of this
like like first application of this I mean for now only application of this
would be kind of randomness generation right where you you sample from this like
unpredictable source rather than you extract you can extract from it uh some
uniform thing okay? Although you need to do it under the assumption that there
is uniformly random seed right which can be publicly Because you can only
Seedless extraction is impossible okay? Although it's actually done in practice
using our functions as I said but this requires to model the the hash function
increasingly to be like and done in practice. Okay so we will get back to this
kind of idealized model later on in the course okay? So as I said I think it's
important that that we get a glimpse of randomness extraction because from now
on it will be randomness all over the place okay? So there will be always the
problem of how do we generate this randomness? Now at least we have an idea how
to extract this short amount of randomness right? So there is of course like a
crucial step that we didn't discuss yet but we will discuss in great detail now
actually which is also done in all real world randomness generator which was
this step two at that point Right? So any real world randomness And first
extract from from a unpredictable source mean entropy source okay which is what
we saw. And then like the most important step so like even then even if you can
extract right this is not very efficient okay? Like it will not be very
practical the number of bits that you extract is also large. Yeah at most as
large as the mean entropy of the source even with some loss right? So now this
will be kind of impractical okay? Yeah. But what makes it practical is actually
step two. Okay step two is the expand this short thing that you extract to a
super large thing okay? Yeah. Okay this is only possible with computational It's
only possible assuming the adversary's computational power okay? Yeah and this
is what you're gonna study sooner or later it's a big thing okay? This is a big
thing one of the most important components of modern cryptography so the
randomness we will study this in the upcoming lecture. As we will see seedless
randomness is a crucial component towards secure encryption secure method of
investigation everything. So there are N randomness generated okay? So we will
study step two in great great detail now. So then as I said there is also step
three which can make the model even more a little bit more complicated because
you need to refresh the seed in case the adversary replaces the computer you
don't want to lose the security forever right? So then you have you because this
randomness generated deterministically right? You want to bring in the computer
you know the seed you can know the randomness forever kind of that so this
modern P R N P they actually refresh the seed. But this makes then the modeling
likely complicated and we will not cover like a full security model for depth
round okay? Although this can be done okay? It's not so this way understood the
security of depth round for instance is very well Okay? Any borrows ideas from
all these things that we discussed okay? Randomness extraction and seedless
randomness. Okay great. So I think we have done with the information theoretic
security enough okay? So we can more move to computational security so now we
start talking about uh computational security Okay? So as we have seen until now
there are barriers to deploy to run a Turing machine and efficiency great. Okay
I think symmetric okay? So these are these are these are symmetric up till now
right? Secure Turing cryptography. So we have seen that you can do perfect
secrecy but the key is super long and you can use it only once. You can do
perfect method of statistical method of investigation but uh uh uh you can only
have a key that grows linearly with the number of methods instead of right? And
you can do randomness extraction information theoretically but you can hope to
extract as much as and then uh you would have to extract all the times if you
can Okay great. Okay? So all these barriers they can be overcome changing uh the
model okay? So we need to change Yes? So we need to change we need to change.
Okay so in particular uh we will further assume we will further assume to be
okay one that the adversary's computation is bounded okay? So the adversary is a
is a is a is an efficient machine so how you want to think about it. The
adversary is uh an efficient machine so this needs to be defined somehow. Okay?
So up till now we are like super strong super strong definitions but very this
needs to be to overcome barriers okay? But the definitions are super no
adversary the only distribution okay? Okay so maybe we are a bit too ambitious
okay? So maybe the the computational model makes a difference but that that's
what people started to think okay? Yeah yeah around the 70s as I said okay? So
the adversary should be after all is an efficient machine okay? So even though
the adversary will have uh I don't know maybe a better computer than mine uh in
the end uh it's still following the rules of classical computation okay? Or
maybe one okay? So if you want to allow one to adversary then it will be quantum
okay? But still still it should be efficient okay? Up till now the adversary can
be So the scheme is secure even against an adversary with infinite resources
okay? So maybe it's too much no? Okay? So one is this okay? Uh and two uh we
will assume that uh there are there are uh problems that seem hard. Okay so hard
okay? So I will I will of course make these two assumptions more formal in a so
I'll try to use the intuition first. There are problems that seem hard okay? Uh
meaning that uh no efficient Again machine can solve Okay? So this will be two
new assumptions okay? What makes it really different yeah? So the first
assumption is to kind of develop crypto on by targeting security definitions
okay? That so we see what we have two of the security okay? As we said one of
the most important ingredients in modern so we still want to have two of the
security okay? But we need to change things. So the first change will be the
adversary okay? So we should have a precise definition of what does it mean for
an adversary to be efficient okay? Second we will need assumptions okay? So we
will need a computational hardness so I mean how do we exploit the the the the
adversary is inefficient? Well we exploit it because we have studied the
computational hardness okay? Computational hardness is studied is a well studied
subject. If you have taken any complexity course if not I mean I would say it's
the most important thing. Uh so observation in nature the thing to be problems
Okay? Okay so I mean now of course right? We need to be like of course a little
bit careful how we use these two assumptions okay? Because I mean of course
right I will also I don't I invent a new cipher no? Yes isn't it? Okay? And then
well I just publish it to the world and then nobody manages to break it okay? So
this also so right of course then I could assume that my cipher is secure and
whatever you take any I don't know how to recover the message whatever you like
and then under the assumption that this is true this is true. So this would not
be very uh very Yeah okay. So so let's maybe uh so what would be the point okay?
The point would be that instead of these problems that are believed to be hard
that are not problems that we thought of yesterday but they were decided by uh
by the mathematicians computer scientists and and everybody else for centuries
and nobody can solve it to be of course you don't know okay? Okay so let me try
to expand a little bit on these two assumptions okay? So let's let's expand a
little bit. Okay first one okay? So one is because there is a standard model of
computation which is well understood and everybody knows it and likes it which
is the Turing machine. The adversary should be a Turing machine. Okay? I mean
this is not but I mean everything is a Turing machine okay? So if you know what
a Turing machine is good. I don't I don't need to say if you don't know it will
not be anyway like crucial to know how a Turing machine works okay? You can just
like just like take it as a fact that Turing machines are a model of computation
that can capture all efficient computations classic and in the Okay? So of
course like Turing machines they involve like formal of what a Turing machine is
right? So for us the adversary is always gonna be from now on a Turing machine
from the formal standpoint okay? If you don't know what a Turing machine is is
again it's not so important because we will not need any detail of the
definition of a Turing machine to understand whatever comes next okay?A Turing
Turing machine bounded by timeAll right see of of course of course yeah I will
not only Turing machine but a Turing machine with finite resources yes. So
Turing machine so you can think of the Turing machine as like a simple abstract
model of kind of like cutting off all the unimportant details of computation
okay? Like if it is a GPU or if it is an FPGA or if it is software or if it is
hardware doesn't make any difference because the Turing machine is more abstract
okay? But no the is that Turing machines can perform any computation that you
can do with right? GPU But not only so then a Turing machine of course but not
only that of course but also uh an efficient way again. Okay? Efficient way.
Okay how do we measure efficiency so in particular in particular limited running
time. Okay? And what is the standard definition of limited and efficient running
time? It is polynomial time. Right? So if you have taken complexity theory you
know that this is called polynomial time. Capital okay? Polynomial time. Okay so
what does it mean? Maybe just for once I will I will just write it very briefly.
So when we do theory of computation right? So now we have a theoretical model of
of this computation okay? Which is for the Turing machine open up the definition
but I mean you can think of this as a computational model that to solve the a
number of steps okay? So like the running time is the number of steps of the
machine. Okay how many steps? And so usually in order to see so to to to to to
to to to measure if a problem can be solved efficiently you you measure the
number of steps as a function of the input length okay? So right? So polynomial
time so it's always in the input length right? So so we measure number of steps
as a function of input length. Right? And and this needs to be polynomial okay?
So it's like number of steps is gonna be O N to the C for sum. Yes? Yes. Okay
polynomial just means big O of N to the C for some constant C. Yes? So you see
it's a nice way to kind of asymptotic okay? We will care only about asymptotics
okay? Just to make things simpler okay? Of course we could like track all the
computations and like count the time and assume that the time is just B whatever
it is and then but I mean usually it's easier to take a kind of an asymptotic
standpoint so we only care about the running time for large values of the input
right? So which is the big O notation so like this means it is polynomial okay?
We polynomial means that N to the power of C for some constant okay? Well times
some coefficient so this big O notation is the standard way to kind of cut off
all these kind of big details right? Like if I ignore the cost of even if
constant and then also only for large N right? This is only true for large
enough N. Yeah? Are we all good with big O notation?
Okay. So Okay. So that's the first the first kind of subtle or more formal So
whenever we say adversary okay we will implicitly mean Okay. Although again the
actual details of the model will not matter at all. We don't need to know how
many tapes Okay. So we need to have a model of computation of course Turing
machine is the standard model for polynomial time. Okay. So that's polynomial
time Now But now maybe it's too weak okay so we just said that we said we
learned how to generate randomness and we said from now on Okay. So now Fair
enough okay. unnecessarily okay. So not only it should be a polynomial time
Turing machine but this Turing machine can also toss a coin which means can be
probability can use okay. So additionally adversary can generate like arbitrary
polynomial of course amount of Okay. So this is to say the adversary is an
efficient algorithm not only the deterministic one but a randomized one. The
adversary can use randomness as part of its logic. Yeah. This is the standard
general this is already it's not something I invented okay. So there exists the
polynomial time Turing machine but there is also the probabilistic polynomial
time Turing machine. So the adversary is a PPT probabilistic polynomial time
Turing machine. Polynomial time Okay. It's a standard notion okay. So how the
probabilistic thing is actually part of the Turing machine definition it will
not matter again. Okay. Okay. So I mean after all everything will be a Turing
machine anyway so not only the adversary whenever I write there is an algorithm
and this algorithm how do you it's a Turing machine okay we we we don't care
about the actual model of computation Turing machine is enough our level of our
abstraction to to think of yeah. Okay. Everything good so now step one is very
clear now. Step one Yes the adversary is a probabilistic polynomial time Turing
machine okay. Great. Step two now okay Problems that seem to be hard but no
efficient machine can solve okay. So this is step two. So assumption two okay.
Yes. So we need to exploit somehow the part that the adversary is
computationally bounded and okay. How do we exploit this by introducing problems
that are hard to solve okay. But now our we need to be careful now when we
choose these problems okay because everyone pays the security of our schemes on
very solid assumptions because we are introducing assumptions okay. So now
assumptions can be arbitrary of course yes if the assumption is my scheme is
secure then there is not nothing interesting going on okay. So this is very
important now this is step number two okay. So in fact ideally what would be the
test that you would do in step number two okay. If you if you really need to
make an assumption right let this assumption should be as weak as possible.
Okay. So what is something in the world of computation that everybody believes
is true it is the fact that P is not equal to NP. So that would be awesome best
assumption okay. So now if you have taken complexity again you know what is P
okay P is just the class of problems that can be solved by polynomial time
Turing machine what we defined above. I don't need NP okay so this is like a big
question in computation computer science about the the fact that these two
complexity classes are equal or not P and NP. So what is NP I mean P is again
all problems all problems by probabilistic polynomial polynomial time actually
not probabilistic and polynomial time P and C. Okay. Just it's P. Okay. Again I
will not give a formal definition. But and then there is NP again. So what's NP
like P is the class of all problems that such that a solution can be verified by
the PPT Yes. Right? So there exists a verifier they give a solution decide
whether the solution is correct or not many examples of this. Again I'm not
going to define this formally if you have taken complexity everyone or not. If
not it doesn't really matter again okay. The intuition that I'm going to give
you will be more than sufficient to understand what what what what's going on. I
mean anyway we are not we will not be able to actually use this assumption
anyway so but okay so let let's go step by step. Right what what is an example
of a problem that can be solved sorry a solution can be verified polynomial time
TM. For instance like for instance factory again and equal to P times Q. Right?
So the solution would be P and Q right? And then you need in polynomial time if
I take if I give you like P and Q there is an algorithm that verifies that and
this is polynomial time because you just need to multiply So factoring is an
example of of a problem in in NP there are many more problems like three color
for instance. Okay. Like a graph G along with P the three coloring Right? So
that's another famous example of of a of a problem in P actually in NP complete
problem. So three coloring is like you have I mean I'm not going to define these
things formally yeah just give the intuition. So three coloring means like we
have a graph right and this could be made of billions of nodes and the number of
nodes is kind of the input type and then you want to know if this graph is three
colorable or not what that means that you can assign colors to the vertices in
such a way that the two neighbors right do not share the same yeah. So can you
decide if I give you a graph and you decide if it is three colorable or not
yeah. So this seems to be hard problem okay like it's a problem that we do not
know how to solve efficiently and we don't know if it's weak but we know for
sure it's in NP because if I give you the three coloring you just check that the
three coloring is correct. Okay. We just go over all the vertices and you check
that no adjacent vertices is going to share the same color. So that's an example
of the problem in NP. This is like a very special problem in NP because it's
also NPI okay which means that all problems in NP can be reduced to this
problem. Okay. Uh okay. The biggest open question for this type is whether P is
not equal to P or or or not but everybody believes not okay but nobody okay.
Could be that P is equal to P. That would be a main problem or not I will say
that okay uh but uh So if if if we need to make an assumption let's make a good
assumption that kind of philosophy. Uh so what's the best assumption that
everybody believes P not equal to P. Okay. Okay. So that would be awesome.
Unfortunately we will not be able to actually do this they will set a goal
something I mean big open problem in cryptography so uh as I will explain okay.
But I mean ideally yeah ideally why this would be good okay why this would be
good why this would be good Uh Right. Same we can prove same we can prove like
here okay if try to if P is not equal to P then five will be Okay I mean I would
write here in quotes I don't know what I didn't I I I'm not But I mean say you
come up with whatever definition you love and then uh try is your scheme that
satisfies the definition under the assumption that P is not equal to P okay.
Well this would mean that uh like only two only two options only two options.
One five secure. Two P equal to P. Okay. That would be awesome. Okay. So right
the philosophy would be if somebody breaks our scheme we have proven P equal to
P. Okay. Sounds good. So it sounds like a good assumption in this sense okay
because this is the way we have crypto from now on okay. Assume something true
then the scheme is secure. What does it mean scheme not secure then the
something is not true okay. So for instance like uh well that would be the
Right. That would be the dream conjecture the dream which can only get okay it
would be the only way. Uh because then we would have a scheme which is secure as
P not equal to P. Uh Okay. Uh unfortunately nobody did this. Okay. Okay we are
not we are not we do not know how to do kind of basically assumptions like P not
equal to P. So we need to settle for something and you Uh So unfortunately bad
news by no Okay. So what people know how to do so what do we know how to do
okay. Uh what we know for instance for instance what do we know we know how to
do something like this okay. If factoring is hard then five secure five secure
okay. So not like P not equal to P in general okay but if factoring is a hard
problem then uh P is secure so okay I mean factoring is just an example not we
know only how to do this with factoring okay you will see many examples in the
code. but this is the only thing that people are able to do okay. Okay stay
cool. Uh Well if P not secure then then factoring is easy is not hard factoring
is not hard. What does it mean? There exists a polynomial time or maybe
probabilistic polynomial time TM uh solving problem. I mean this assumption that
factoring is NP complete isn't C different from NP equivalent to factoring is
hard. Yeah but factoring is not known to be NP complete. Oh okay. Right? So
indeed we must know how to base cryptography on an NP complete problem because
if you would know then then we would we would do the dream conjecture yeah. But
nobody knows how to do factoring how to do security based on uh NP conjecture.
Yes. So Okay. So but I mean P is not better that we choose some schemes that
assume that P is equal to NP. Of course I mean so well I mean so we are saying
like whatever P is equal to P do we see a crypto Okay. Uh so well I mean this is
better of course all the information to break the crypto still exists. They are
still still exist. I mean if P is equal to P what I Okay. So what I for
universal hashing or whatever uh I mean then now the question is what if P is
equal to P what kind of crypto yeah. Okay. And my question is uh at this moment
now does exist some schemes that works even if P is equal to P. I don't know
what I They are whatever the information to break yeah. Okay. I mean there are
like plenty of information to break okay. I mean the fact that uh information to
break the crypto is too strong for encryption doesn't mean that information to
break the crypto is bad for every So there are all the stuff from which you can
do the information to break stuff and this would be like still good even though
P happens to be yeah. And I mean of course now then there are more fine grained
kind of questions even if P equal to P okay I don't know what are the The best
What if if it would be like a really a drama or not for crypto it depends also
on the cost of the Okay. But I mean of course I don't know but I mean that is
that this crypto is P is equal to P. Only that uh this kind of crypto there are
some Okay. Good. Yeah so I mean it is now I will try to kind of give you like a
more kind of fine grained picture of what kind of crypto is possible in
different different computation worlds yeah. So it seems like there are
different computation worlds I mean actually just one world that is only that we
are not smart enough to understand the world where we live we don't know okay.
But so depending on which world we live there are different kind of crypto that
we could do right. So we we get back to this point but then for now uh right. So
this would be kind of sounds like a good plan in the sense that I claim this
plan would be cool yeah. So why because again I have a scheme which I can prove
to be as secure as solving factoring yeah. So I mean right this is a very
precise thing yeah okay it means that if you have attacked my scheme then I will
have a machine that now solves the factoring problem. Mathematicians are going
to be they try so long so hard and so many people So at least we gain time you
know we right. I mean then of course uh the scheme is broken anyway so what do
we do. Well the good news is that factoring is not the only hard problem so we
can just switch problems so I will try to give you in this course kind of like a
plethora of problems that you can use and I mean these are part of the what we
use as crypto today is based on this factoring and there are many many many
Okay. So we would like to kind of base crypto on solid assumptions this should
be kind of problems as well studied as factoring okay. That would be a As we
will discover in the course not only with so the kind of assumptions that you
will find in stuff that is standardized is not always as solid as factoring. So
you will see many many So this will be kind of something that you will we'll
see. Uh okay. Okay so now if you want to take kind of like a step step back and
right I mean factoring is still like a very specific assumption you know so can
we have like what is the next best thing with respect to P not equal to P which
is also general right. I I mean I would like would be cool maybe if we can I
mean right maybe everybody believes factoring but then what is factoring So
maybe basing everything on factoring is not such a good idea so you try to kind
of like diversify your assumptions yeah. So uh so one way to diversify
assumptions is to come up with this kind of like the mother of all assumptions
yeah. Okay. So the mother of all assumptions is one of Okay so the mother of all
the mother of these assumptions. I mean now I already mean the example of
factoring but during the course you will see many kinds okay post quantum one
factoring is an example of an assumption which is not post quantum right okay.
So a quantum machine will actually break but there are also assumptions that are
post quantum secure we'll study some of them okay during the course. So what the
mother of all assumptions of of all these assumptions is one way function. Okay.
So this is like fundamental concept in cryptography uh and which is kind of in
fact as I said the minimal assumption so you can think of this uh what we
function are the minimal assumptions are the minimal assumptions. To uh to do
any crypto to do interesting crypto. Okay please. Okay so in fact I will now
state the definition of a one way function and uh you will see factoring is an
example all these problems that are on which crypto is based today are all
examples of a One way function is kind of the mother of all of them okay. It's a
general definition that captures all of them at the same time. Okay. So one way
function what's a one way function. Uh we actually need still one concept in
order to make the definition precise so uh I will now just start to write the
definition that will be like a small thing at the end of which I will I will
need to actually specify. So a function F function F from I don't know from X to
Y then X into Y is one way. And if like this for all probabilistic polynomial
time adversaries yeah so you see definition put the adversary in the the main
character okay. The adversary is in the definition yes so then uh something is
going to happen so this is denoted like this. I just write it now and then I
will explain okay. Uh and then I need to write here that you have here for now
is more. Okay so I'm just writing something general something imprecise I will
make it precise in a second. So when is that a one way function yeah. So you can
think of it as a game okay so so again there is an adversary okay. So now what's
the goal of the adversary is to break the one way function yeah. So what is this
game how do we define breaking the one way function usually by means of some
game okay. So this game now depends on the adversary on F of course also Then
there is an input lambda forget about this lambda for now okay. Uh I will say
for instance it's a parameter of scheme of the of the of the scheme. Uh I mean
in fact I would actually even okay just forget about this lambda. Uh okay so we
have a game yeah. So one there is the adversary yeah and then there is the
challenger. Okay. So what's the game that we play we play this game. The
adversary should invest in the crypto and let's see. But I mean of course now
the question is on which input yeah so I mean because I mean of course if I
always compute the function on zero you know that the the value and UI you know
that UI is the uh output of the pre-image UI is zero. What is the pre-image of
UI is zero. Yeah. Okay. So I mean of course like if I want to say the function
is one way I need to assume that the input is unpredictable not because I mean
if you know what the input is that kind of one way one I know it already you
know. Right so you should always think what is the adversary what does the
adversary know right at context you know. So so in order to make the definition
meaningful we we will do this okay. The challenger is going to pick X. Then we
compute Y which is equal to F of X. And then we need Y to the adversary. And
then the adversary outputs X prime. And now uh the game outputs one outputs one
for instance you can think of this as the winning condition uh if and only if uh
F of X prime is equal to Okay. Okay so we play a game yeah we play a game. And
the game is like this. Uh I pick a random X in the input size of uh of of the
one way function yeah. And then I compute F of where F is the deterministic
function that I want to define to be one way. I give you UI and I tell you find
any pre-image okay doesn't need to be the same okay this is a function right so
one Y would have many pre-images right because it's a permutation it's a
function uh so find any pre-image. Find any X prime such that F of X prime is
equal to Y. Okay. Okay. Uh if you can you have you have broken the one way
function. Okay so what when do we say that the one way function is not possible
to break when a function is one way. If no adversary can win this game you do
this okay. No adversary so for all adversaries the probability that the
adversary that the game outputs one which is the probability of win this is the
same as probability of win. Win is the event that X F of X outputs Okay. Yeah.Uh
if this game can win just one timeOne is one yes just one time. So I I pick a
random X I give you Y and that's it. Nothing else for now. Okay. Okay so I mean
of course now I cannot say I mean I I'm stating a definition okay so my
definition should be feasible. I cannot say for every adversary this probability
of win is zero. I cannot say why.There is at most one X at most one X at most
one XAt least yes. Right? For every Y there exists an X. At least an X. Well
okay I just like yes then so consider the adversary that tries to get X. Yeah.
Well you will have even though X the probability of getting X is small right uh
it's not going to be zero. So I cannot write zero then. Okay. That's why I wrote
small okay.Is the function F a deterministicDeterministic yes it's a
deterministic function yes. Uh I should maybe specify it's deterministic. Okay.
So as usual now right uh okay so that's the definition okay so we only need to
understand how to define small okay. How to define small. Okay that's a good
question yeah. How to define small. Uh okay it turns out again there is a
standard way to do this which is I mean asymptotic. Okay. Just to make it simple
okay asymptotic. Exactly like we we are because we are doing asymptotic okay I
mean you already said uh A is a probabilistic polynomial time Turing machine
okay what does it mean we are not counting the exact number of steps uh of the
Turing machine okay. Although this could be done okay like I mean for instance a
complete definition could be like instead of saying probabilistic polynomial
time Turing machine I will write this definition by saying for every Turing
machine that runs in time T okay that runs in T steps then the probability at
most epsilon. Okay and I would make P a parameter of the definition and epsilon
a parameter of the definition and then we will be done. And epsilon is going to
be small like one over the cardinality of the scheme. Okay. Yeah.Yes the game is
not very solved in a computational speed one can just try the game different
time in order to probability of guessing the pre-image.So try to gain different
time. Uh I mean are the times these different times correlated or
independent.Independent.So if it's independent right then of course you can do
it but then depends how small epsilon is right.But if it if it is a constant
that probability by we are doing it independently different time then the
probability to one.Yeah yes yes yes. So as in fact Yeah it's not small enough.
That depends on the security parameter exactly so that's why it works that's why
this game should depend on time exactly yeah it's correct. Uh but I mean but I
mean but I mean in general maybe it's constant would not be necessarily a
problem because if I say this Turing machine runs in time T okay and then the
probability of winning is a constant this constant is like two to the minus
eight okay. Okay then if you do it the how many times if you do it if you try a
certain number of times the probability of win is going to be at some point it
would become like large but I mean how I mean I could just count the parameters
okay the point is that the number of steps right that you would need to do what
we said and make this probability large enough it would be Okay. So Okay so this
this is kind of two kind of mindset okay like two different ways of doing
whatever one does uh like either you do it asymptotically or you do it
concretely both are okay yeah. Concretely is a little bit more cumbersome okay
because now you need to count the time you need to count epsilon all the times
yeah so then I mean and of course like this counting these steps I mean it's not
so so relevant because I mean I mean this refers to Turing machine so I mean
like what is the I mean how does the number of steps of a Turing machine
translate on a CPU I I I have no clue right. So right the running time depends a
lot a lot on the model of computation yeah. So so in order to simplify things we
are not going to count parameters concretely but we just count them
asymptotically like like we are doing already for running time. Okay. So how do
we do this. So we will make this game depend on on the so called security
parameter okay so there will be a lambda here okay lambda is the security
parameter In this case what's the lambda it's just a pre-image size yeah
pre-image size X. Okay so now I I wrote here that X is an arbitrary set but I
mean you can think of lambda now here as the cardinality of uh of F okay. Okay
so X for instance like for instance X would be for instance F would be being
from zero one lambda into zero one lambda. Okay. Yeah. It doesn't need to be
like this okay but it could be I just want to see it explicitly okay and now in
my abstract definition lambda is kind of hidden in the X yeah. But uh if the
function takes lambda bits strings then lambda is actually what you would expect
okay so the adversary is going to be polynomial time in lambda okay and then the
the probability would like to say is small as the function of lambda. Okay. This
is called negligibility. Okay so there is a standard way to define this which is
called here negligible of lambda okay. Yes. So what is negligible asymptotic
again the function a function epsilon of lambda is negligible in lambda if okay
and again this is kind of arbitrary choice I mean okay it's just the asymptotic
yes. Why do you make this choice because it behaves nicely okay like it's the
same as polynomial time why polynomial time. Polynomial time is is a conjecture
right it's it's it's it's because it's nice. Polynomial is a nice function okay
because the sum of two polynomials is a polynomial. Yeah. Same for negligibility
it would be kind of arbitrary choice but nice okay. Uh if uh we want to say
negligible means small okay so we want to say is small as lambda grows yeah.
Okay. So for instance I don't know two to the minus lambda would be very for
instance super but maybe even too much okay. So negligible you can think of it
as like a kind of milder way to say it's small. Doesn't need to be exponentially
small. Yeah. How do how do how do you say this you say that uh is it it is it is
smaller than the inverse of N polynomial. So let's say the wording. So if uh
epsilon of lambda right is at most is is is equal is equal to O of one over P of
lambda
polynomial Okay? So this this function goes to zero faster, right? If one over P
of lambda infinity goes to zero faster than the inverse of N polynomial. Okay?
So for every constant, right? It is smaller than constant times lambda of
course. But this is for every constant. And for large enough lambda, okay? Yeah?
Okay. Again, this is just notation, okay? Again, you could just say epsilon. But
then you need to count epsilon forever. Instead, let's kind of take it like a
little bit more easy and say a scheme is secure if no adversary can win except
with a negligible probability, yeah? What does it mean negligible? Small enough.
Small as a function of lambda, yeah? Okay, so for example Like You can prove
this function, okay? Just take the mathematical exercise. To prove that it's a
simple matrix I I I invite you to try, okay? But also, so why it is nice? Why
nice? Because for instance what is negligible of lambda plus negligible of
lambda? Okay? So what I mean here is if epsilon one is negligible in lambda and
epsilon two is negligible in lambda, epsilon one plus epsilon two is still
negligible in lambda. Okay? Uh not only that, poly lambda times neg lambda is
also negligible. Okay? These are all simple exercises, okay? I I invite you to
try. Okay? So if I multiply an which is kind of what you said like that. So if I
have a small function, uh if I have a small epsilon and I try many times, okay?
Uh and then how many times Right? So if I if I sum so in this case it would be
sum like if I sum this negligible term poly many times, right? uh what I would
get it would be still negligible, okay? Okay? So this will simplify things a
lot. Uh it may be like a little bit harder to picture at the beginning, okay?
because you need to think about security parameter and behavior of the system
for large inputs. But then it simplifies things greatly, okay? Because you can
just say What does it mean? No adversary can break except with negligible
probability, okay? Without counting all the epsilon and the T, otherwise it
would be full of T and epsilon. But I mean going from one thing to the other is
actually easy. I mean if you do if you look at whatever you will do, whenever
you write negligible you put epsilon, whenever you write polynomial you put T,
you can easily count and track how T is changing, how epsilon changing. Not very
We just make things like a little bit more hard to write and so on. Okay? Good.
So now we have the first example of kind of a security assumption, okay? So
which is the one of the functions again, the mother of all of the model, okay?
Because saying that it means that factoring the function Well, now of course the
the input state is like a little bit stranger because it would be like random
primes of certain dimensions but yeah, it's definitely an example of of a random
function. I mean there are many other examples of random functions. So if you
study a little bit of number theory uh for instance you may be aware of the
discrete logarithm. So examples examples of functions for instance factoring
discrete log I don't know if you if you if you have ever heard of discrete log.
If not, I mean at some point we are going to make a give you a brush up of this
thing, okay? I mean this is again one of the most important assumptions in the
real world system. If you have exchange it's based on discrete log. So you know
there are many important and I mean there are many others, okay? Lattices
code-based coding the coding code the coding coding random code If there are
many examples, okay? These are kind of old families of assumptions and they are
used in the recent NIST post-quantum standards on lattices. Okay? Where lattice
something related to lattice is related to the code. Uh kind of the old school
crypto is based on factoring and discrete logs like RSA and the Diffie-Hellman
is basically log. And so we can both factoring and discrete log So I will try in
general not to assume anything about your background, so I mean understanding
factoring discrete log structures requires a little bit of number theory. Okay?
So at some point we will have to go through, okay? So I will try to kind of
postpone this a little bit just not to make the course too theoretical. But I
mean it's the only way, okay? If you want to understand crypto, you need to
understand the math which is So you need to understand a little bit of number
theory. I mean of course we will not become number theory experts, but we just
like understand like one hour maybe of number theory and will be enough to
understand RSA, for instance. Okay? And then one hour of lattices maybe and will
be enough to understand the NIST post-quantum Okay? Okay. So just to conclude,
okay? Uh to conclude this lecture uh to conclude uh to conclude there are of
there are different uh computational words. Okay? And I mean we will study two
of them which are very very important uh which kind of also disjoint. So one
word is the so-called mini crypto. Mini crypto means there are Yeah? And then
Okay? So what does it mean computational word? It means as I said that we do not
know how how what how how how our computational word looks like, okay? Because
we don't know P is equal to P P is different from P uh do we there exists a one
way function uh and so on and so on and so on, okay? Uh so because of this there
are different words. Okay? Yes? So the and this is like standard kind of way to
call this word. Uh right? So the minimal assumption for crypto again is P not
equal to P, okay? For the kind of crypto that we are going to we will or which
is implemented in the real world, yeah? Uh so as I said, the minimal assumption
is the fact that there exists a one way function. We don't know how to base
crypto on P not equal to P. We only can base crypto on the existence of a one
way function. The existence of a one way function then you can do something with
it. Okay? What kind of crypto? You can do like secret key encryption, MAC Okay?
PRNG like all these things that we that we discuss uh later but efficient, okay?
but efficient. Like short key blah blah blah, yeah? So unfortunately one way
functions are not enough for doing everything yeah that we know in crypto. For
instance uh the famous public key encryption, right? Okay? P exchange P exchange
Okay? TLS Yes? So if you want to do TLS, if you want to do P exchange but what
does it mean P exchange? Alice and Bob do not decide on a key secretly. Okay?
They do not meet at a secret place and exchange a key. They exchange a key over
a public channel where Eve is also listening. Okay? So they want to bootstrap a
key without never meeting in person. It seems to be much harder than not. Uh So
uh the world where you can do this is called cryptomania. Okay? Cryptomania is
the world where you can do P exchange. So why it is a two step because in fact
in general these two words are kind of separated. Okay? We know that this is not
you cannot go from one way function to to to this kind of thing. Okay? So the
one way function is not sufficient as an assumption in order to do P exchange,
public encryption. You need to like to put on the table kind of stronger
assumptions. Uh Right? But this is only true like one way function when I say
that a one way function is not enough, I mean one way function is general. It's
a general one way function. Of course like if you put if you assume factoring
for instance or discrete log, you can do everything of cryptomania. But you are
assuming like a specific problem, yeah? So in particular that problem has
structure and you will use this structure in your construction of public
encryption, P exchange. But if you just assume any one way function, you will
not be able to build public key encryption and P exchange.So the assumption is
just that we can do P exchange is not a one way function like a one way function
You can actually state that an mathematical assumption which is some kind of
function this is called a trapdoor function. Uh trapdoor function. But I mean we
will discuss this later. It can be stated as a mathematical like exactly as one
way function but strong. Okay? And this will be the minimal assumption in order
to do to do uh public key encryption. Okay? Okay, so there is a nice story about
this thing this is used to computational theory which is called like in fact in
the 70s it was like I was saying okay, we don't know P equal to P, we don't know
what way function exists or not. So what kind of word are we really needing?
Okay? So like to kind of tell this word it has the story of the mathematician
Gauss which was when he was like at the elementary school like the the teacher
gave this problem of like computing the sum of the first 100 and then the the
legend says that he solved the question in like two minutes. So in kind of in
order to explain these different computational words imagines how the story
continues. And so now assuming that the teacher is kind of mad at Gauss and then
now Gauss is so mad. Okay? So the teacher wants to find a problem that Gauss
cannot solve. Okay? And then like how does the story end? It depends on which
computational word we live in. Okay? So if we live in the world where P is equal
to P, there is no way. Whatever problem we think then Gauss can solve. Okay?
Assuming Gauss is a Turing machine. Okay? So and then it continues like he
defines like many crazy words and these are the two words. The the mini crypto
word is the word where the the teacher can find a problem that Gauss cannot
solve because assuming Gauss is a is a Turing machine like the professor can say
okay, I pick a random X, I give Y to Gauss and Y and Gauss cannot cannot compute
it. Yeah? But the coolest word is actually cryptomania because in the in the
cryptomania the professor not only can do that, okay? but he can also share a
key with the entire class and share the solution with the entire class so that
the entire class knows the solution but Gauss. Okay? Okay, so with this we can
stop and uh see you on Friday.
