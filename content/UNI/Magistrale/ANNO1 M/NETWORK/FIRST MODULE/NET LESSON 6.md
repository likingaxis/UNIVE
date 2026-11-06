BS
- power
- frequency
	- the higher is the frequency the shorter is the distance

- wireless hosts
	- they are called UE only for mobile?
- base station
	- we have on a side the protocol for the wireless access and in the other side we have cabled access
- the base station should be able to transmit at a distance, this distance should be covered also by the terminal (or wireless hosts)

infrastracture mode
is the path from the device to the ... (21:58)
the intelligence is the infrastracture itself (sbers)
this switchover of base stations is called handover or handoff
- the handover is not hard anymore, the intelligence track you and anticipate you

ad hoc mode
once we have this wireless link why not having

mobile ad hoc networks
- Vanet
its complicated
- in this configuration mobile nodes are part of the network and they can behave in malicious way
###### Exam question
there are 3 important factor that determines characteristics of wired link(wireless)
- decreased signal strength
- interference from other sources
	- interference happens when we have an overlapping frequency band between devices
	- they have to be in the same time
- multipath propagation
	- we have direct signal transmission but also good signal in other direction anche it reflects
	- this is called multipath
	- so the terminal recevies the same signal more than one time and at different time
	- self destructive interference
	- to solve this we use estimation and use something like stefania bartoletti lessons sbebbers

###### SNR
- SNR Signal-To-Noise-Ratio
	- differet SNR gives to us different bitrate
	- BER vs SNR
	- Channel quality indicator

##### Problems with terminal
- hidden terminal problem
- signal attenuation

skip da slide con le figure fino a quella con le stesse figure

to solve this we use CSMA/CD
- before transmitting we wait time DIFS
	- i in this time i verify there arent other transmission
	- im not sure because of the hidden terminal
	- ack has a priority SIFS

the other way is with RTS-CTS
- instead of sending my data i send small packet to probe collision(RTS)
- The ack is a CTS also a short packet
1:23 ncio capito ncazzo porc
- i didnt understand, why C should receive something if i want to send something to B
- we have an advantage in term of less collision, the other devices dont waste time trying to transmit because someone else says no transmit please, this reduce energy consumption
- disadvantage is that we have overhead cause of the RTS and CTS message
