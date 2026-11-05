## Intermidiate test questions

### Latency

In the future generation wireless systems, the latency will become a key performance metric. Why it is becoming important?

- ✅ Many applications will require high responsiveness in the interaction with the network
- Many applications will require high throughputs at the end users
- 1) The end users may have high mobility during their connection
- Many applications will use high data processing and computation

### Multi-path

What is important to be modeled in the multipath happening in a wireless communication, to use it constructively?

- ✅ The attenuations and the delays of the different paths
- The attenuation of the line of sight path
- The delay of the line of sight path
- Only the attenuation and delay of the line of sight path

### PON

Which are the benefits of the Passive Optical Networks compared to the active ones?

- ✅ The cost of the infrastructure is lower
- It is possible to reach longer distances only with fibers
- The traffic management is easier
- We can avoid to use Optical Network Units at the user side

### VDSL

Which are the two improvements enabling the VDSL?

- ✅ The vectoring of the signals in the copper cables and the placement of the DSLAM close to the end user
- The vectoring of the signals in the fiber cables that arrive till the end users
- The use of high frequencies in the copper cable band and the full cancellation of the cross-talk noise
- The use of high frequencies in the fiber optic cables and the vectoring of these signals


### ADSL success

One of the key element of the ADSL success is related to:
- ✅ The use of the same copper cable of the old telephone network
- The use of the same frequency band of the old telephone network
- The use of new fiber cables in place of the old telephone ones
- The fact that no new network elements are needed at the Central Office side

### PON trasmission

How the problem arising in a PON when a number of Optical Network Units (ONU) tray to trasmit contemporarly is solved?

- The problem cannot be solved, but the ONUs are able to retransmit after a collision of their packets
- The power emitted by all the ONUs is regulated in order to have the same value
- ✅ The OLT controls the trasmissions of the ONUs by giving the right scheduling to avoid collisions
- The ONUs buffer their data until they find the fiber free for their transmission

### Cross_talk

What is the cross-talk noise on ADSL?

- ✅ The coupling of signals from a circuit to another giving rise to undesired interference
- A noise that is generated at a generic receiver within a fiber cable
- A noise that is generated at a generic receiver within a copper cable
- The interference of a signal in a frequency band to signals in other band of the ADSL

### EDGE

What is the EDGE of a network and which is its role?

- ✅ That part of the network in the between of the access and the core with some intelligent functions
- The very peripheral part of the network where all the applications are
- The very peripheral part of the network where only simple functions are implemented
- The very core part of a network where powerful network functions are implemented

### Evolution current access network

The evolution of the current access network aims at:

- ✅ Employing fiber cables instead of copper ones
- Using only wireless access given its flexibility and low cost
- Using in a more capillary way the already existing infrastructure based on copper cables
- Providing an ADSL access to all the users

### FTTX

Which one of these configurations is the best in terms of expected bit rate?

- ✅ FTTB - to the building
- FTTE - to the exchange
- FTTC - to the curb
- ADSL

### Topology

Which are the most used topologies for networks in the access part?

- ✅ Stars and rings
- Rings
- Bus
- Mesh and bus

### WDM

How the Wavelength Division Multiplexing (WDM) is a fiber-optic transmission for a PON is used?

- ✅ If we have 10 different wavelengths we can have 10 different colors contemporarly in the same fiber
- The same Optical Network Unit can trasmit different pakets on different wavelengths
- One wavelenght is used for the downstream and one for the upstream
- If we have 10 different wavelengths we can have 10 different fibers contemporarly in the same cable

### Packet auth

In order to authenticate the entire IP packet, IPSec peers must use: 

- ✅ AH in tunnel mode
- AH in transport mode
- ESP with authentication in transport mode
- it is not possible to authenticate all the header fields since some of them change value while transiting in the network

### Outbound IPSec

With reference to the outbound processing performed by an IPSec peer:

- ✅ The first database that is checked in the SPD in order to determine if the current packet requires security service
- The first database that is checked is the SAD in order to determine the set of security algorithms to use to handle the current packets
- The SPI is used to select the proper SA to use to process the incoming packet
- The SPD and SAD are inspected only if the incoming packet requires IPSec processing

### ssh port forwarding

What is the command to create a local port forwarding of local port 8080:
- ssh -NL local_p:host_ip_addr:remote_p user@tunnel_ip -p 8080
- ssh -NL remote_p:host_ip_addr:8080 user@tunnel_ip
- ✅ ssh -NL 8080:host_ip_addr:remote_p user@tunnel_ip
- ssh -NL 8080:host_ip_addr:8080 user@tunnel_ip

### SA negotiation

Let us consider a TCP connection steered over an IPSec tunnel, then:

- ✅ SAs might be re-negotiated while flow is alive
- before negotiating new SAs, the security gateways need to wait for the TCP connection tear down
- SAs are re-negotiated only in case the IPSec sequence numbers overcome the maximum value
- SAs do not need to be negotiated if these have been statically configured

### SLAAC With reference to the SLAAC procedure

With reference to the SLAAC procedure

- ✅ It is used by hosts to autoconfigure a global unicast address
- Is the way hosts generate automatically a link-local unicast address
- It cannot be used in cacse in the subnetwork there is at least one DHCP server
- Once the host has generated the address it can immediately start using it

### Water filling

Which is the goal of the water filling algorithm used in the ADSL?

- it fills the three spectrum portions (telephone, upstream and downstream) with the bits dedicated to the three different services
- it splits the ADSL bandwidth in two subbands, one for the downstream and the other for the upstream
- ✅ it transmit bits on the different tones by adapting the modulation based on the  channels seen by the modems within a network
- it allows to separate the signal sent on the telephone bandwidth for the one used for the data

### ADSL

Suppose to have a classical ADSL setting (with no overlapping of the downstream and upstream bandwidths) with two transmitters in two separate sites a two receivers in the same site (e.g. in the Central Office). The two lines are in the same binder group in the initial part of the setting, then they have different paths.

Which kind of cross talk may arise in this setting?

**I DON'T HAVE THE ORIGINAL IMAGE THAT'S PART OF THE QUESTION. BE WARNED THAT THE CORRECT RESPONSE MAY CHANGE BASED ON THE IMAGE**

- The Near End Cross Talk
- Both the two kind of cross talks may arise
- ✅ The Far End Cross Talk
- None of the cross talks may arise in this settings

