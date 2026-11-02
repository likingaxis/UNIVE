
lesson start at 18:00
- short version of the previous 7 lesson
all of us are end users, laptop smartphone ecc... that access the internet through the access network
users that want to communicate together
- to do that in the world we can assume that we have a transport network
access network works in a few km but a transport network cover an entire county ecc...
we can talk about this using the name of WAN(Wide Area Network)
an end user called customer asks for a service given by a provider
a carrier is a transport network operator a provider for all the access network that admit this transit service
(picture in slide 3)
Geographical extension is very relevant

main differences between a transport network and an access network
- is the trafffic
we have a carrier with end user and a PoP point of presence
with tributary flow of traffic f1, f2, fk => fag an aggregated traffic demand
called like that because if we see all in the pov of the traffic network provider we have more PoP that sends aggregated traffic demand a single big traffic flow
traffic aggregation picture in slide 9

- traffic demand
- capacity
- customer-provider
- topology

single link
tree with end users and central office
the other one is the ring topology
in the first two if a link fail we have a failure
in a ring if a single link fail we can use a different route to communicate
in a mesh topology



conjestion in different topology:
- if more end user sends data on a single flow we can encounter congestion example with this topology
- every pair of nodes has a single path of the tree
on the contrary on a mesh network ideally
- i loose concentration we are on minute (49)
- i think that we can use different path to reduce the congestion

Routing
function that find an end to end path from one point to another (in base of different needs? i think)
clockwise direction ... bho

physical transport infrastucture
 starting with traceroute tool
- a short explaination of traceroute is... referring to slide 17
(57:00)
the hardest part is propagation
so we dont have a single logical link we have a physical tramsission path with amplifier
in a logical view we can say that it is a single link
an higher layer do the request but the transport layer realizes it
example slide 20
