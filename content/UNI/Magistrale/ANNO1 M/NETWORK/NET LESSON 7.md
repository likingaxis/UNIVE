#### Manage multiple access 
we have three types the teacher said that we have to do in modo superficiale
- TDMA
	- splitting the time periods
- FDMA
	- splitting the frequency in subchannels
- CDMA
	- used in the past cellular technologies in the US
	- instead of use the others we can transmit in the same time and same frequency, but we dont have a collision doing this?
	- no, because we use a cheap code, a sequence specific for the user that transmit and the receiver
		- if we apply this code on our signal we receive only the message we need, this is an ortogonal sharing
	- formula of the receiver and of the sender
	- also an image from the slide is useful

how can we handle different bitrates?
- give more slots of time, frequency
- give a much longer cheap code

or we can use slots that are combination of time and frequency
![[Pasted image 20261026102716.png|405]]

- the actual infrastractures usually use a combination of tdma and fdma


she skipped a lot of slides, try to understand which

##### Elements of 4G LTE architecture

the managing of the data is based fully on IP protocol
- voice and data

serving gateway and packet gateway are like router that route packets
with tunneling concept slide 52
- tunneling is a procedure where we send informations fully ip based the professor said something about mapping but i didnt understand it
- suppose we have an ip packet with header and payload, tunneling is an ip packet where we have Hip and Pip we route this packet as a classical ip packet into this ip packet we have another ip packet or another type of packet, we have tunneling cause of that

the teacher returns to slide 48 
handover
HSS
- a database where our mobile operatore is, and continuosly accessed by control services

LTE data plane
is fully manage in wireless but the rest works in a classical IP

Association with the base station
a base station broadcast continuesly over the air informations
- our terminal have to scan the air and find out this synchronization signal 
- who wins is the strongest signal
after this exchange and estabilish this connection then i can transmit my data
in the data plane

we have two type of sleep mode to preserve battery drain due to scanning
- light sleep
- deep sleep

Global cellular network useful slide 55 to do the point of the situation

in the 5G they changed quite a lot the architecture in slide 51
of slide 56 remember only millimiter wave frequencies
- skip till slide 62

Home network and visited network

direct routing, what happens when the user moves from another visited network?
slide 71
dont enter to the detail follow the transcription

the teacher before ending the lesson goes back to slide 28 adding a new concept
802.11: passive/active scanning
