we have different planes i dont know where
- data plane
	- functionalities for processing data
- control plane
	- we have for example routing
	- can be devided in two categories
		- decentralized, each router perform as a part of the process to determine the end to end routing
		- centralized, relies on a centralized controller where in general it remotely send messages on how to commit traffic
in the image on slide 30 we have a centralized example
- management plane permit for example with a CLI
	- monitoring
	- configuration
the picture is divided in two (physical or logical?) parts
mangamenet and control plane and optical data plane

network management
- can keep track on how is configured the optical data plane, with everything
- all the connections
- we can send a request through the nms(network mangament system), this request is like a tuple with end points,Qos
	- Qos is a parameter that ensure some qualities
		- BER
		- Reliability
		- Percentage of time the connection is up
		- Max delay
	- the nms has to solve this request has a routing problem to optimize

an nms doesnt only configure the network it also monitor it

##### How an optical network is organized in therms of layers
an architecture of a network is for example organized with a TCP/IP layer
Appl, transport, network, link, physical layer
a packet pass through this layers with something called encapsulation

decapsulation insted is performed when it reach the effective node interested to receive the packet
the intermediate one doesnt do a complete decapsulation
in the example with R1 Sw R2 the professor says that the destination layer is the mac address of the interface of router 2, so R1 needs to know what is the mac of router 2 interface?
the router is the layer two destination or source but usually they are not the IP ones
- the routers works only with level 2? or also level 3?

###### OTN Encapsulation

then after this we have a notebook sketch with OTU electrical optical client ODU ecc... i dont know what is saying


##### Performance and fault management
we can monitor BER if ber is negligible then the infrastructure is working


Optical Trace
to know which fiber is we have to put an identifier that uniq a single element of the optical network

###### Alarm management



professor example on slide number 39 

overhead why we need it?
extra content to add defect indicators right?
OSC what is it?
we can add overhead also with a pilot tone
image by the professor notes sketch with guard band
we can use it to add a small signal that is the pilot tone
