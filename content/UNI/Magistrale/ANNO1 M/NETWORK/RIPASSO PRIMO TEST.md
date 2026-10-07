
## 1. Network functional areas

### Access Network
The **access network** is the part of the communication network that connects the subscriber to the immediate service provider.

It is the network portion closest to the end user.

It may be divided into:
- **feeder/distribution network**
- **drop/edge network**

Typical access technologies are:
- copper / DSL
- fiber
- wireless
- cellular
- satellite
- cable

The main role of the access network is therefore:
**user → service provider connection**

The slides explicitly distinguish it from the core network.

### Core Network
The **core network** is the backbone of the network.

Typical characteristics:
- usually **mesh topology**
- provides **any-to-any connectivity**
- contains switches or IP routers
- usually relies on an **optical backbone**

The Internet can be seen as an interconnection of many core networks. 

### Edge
The **edge** is located between the access part and the core.

It can implement **intelligent functions** that are not performed inside the core.

Example: in an MPLS network, an edge device can examine packets and select the path they should follow through the core.

Think:
**Access → Edge → Core**

The edge can be relatively **smart**, while the core can perform simpler high-speed switching operations. 

### QUIZ FACT
![[Pasted image 20261007155405.png]]

>[!question]- Risposta?
>**A**

---

# 2. Access technologies
You do not need to memorize huge descriptions. Remember the association.

|Technology|Medium / Key point|
|---|---|
|Wired|physical cables|
|Wireless|radio signals|
|Satellite|satellites|
|Fiber optic|light through fiber|
|DSL|existing telephone copper lines|
|Cable|coaxial cable|
|Cellular|mobile radio network|
|Powerline|electrical wiring|
|5G|high-speed, low-latency cellular access|

### Main trade-offs
**Wired**
- reliable
- stable
- high speed

**Wireless**
- mobility
- flexibility
- easier deployment

**Fiber**
- high bandwidth
- low latency
- stable transmission

**DSL**
- uses existing telephone infrastructure
- widespread
- cheaper than deploying completely new infrastructure

**Satellite**
- very wide geographical coverage
- useful in remote areas


---

# 3. Evolution of fixed access networks
Historically, access networks were mainly based on **copper pairs** used for telephone service.
Today the main evolution is: **Copper → Fiber**

The reason is that fiber offers:
- higher capacity
- higher speed
- stable transmission
- shorter or zero copper segment

### QUIZ FACT
![[Pasted image 20261007155316.png]]

>[!question]- Risposta?
>**A**

---

# 4. FTTx
**FTTx = Fiber To The x**

The letter tells you **how close fiber gets to the user**.
Important versions:

|Name|Meaning|
|---|---|
|FTTE|Fiber To The Exchange|
|FTTC|Fiber To The Curb|
|FTTB|Fiber To The Building|
|FTTH|Fiber To The Home|
|FTTP|Fiber To The Premises|
|FTTN|Fiber To The Node / Neighborhood|

The fundamental rule is:

> **The closer fiber gets to the user, the shorter the copper segment and the higher the achievable bit rate.**

The slides show, for example, that FTTE leaves roughly 1.2–1.5 km of copper, while FTTCurb reduces it to tens of metres. 

### Expected bit rate
Among:
- ADSL
- FTTE
- FTTC
- FTTB

the best expected bit rate is **FTTB**, because fiber reaches the building and very little copper remains.

### TEST FACT
![[Pasted image 20261007155231.png]]

>[!question]- Risposta?
>**A**
### Deployment cost
Same idea, reversed from a cost perspective.
More fiber deployed closer to users → generally **higher deployment cost**.

Among FTTE, FTTC and FTTB:
**FTTB has the highest deployment cost** in the provided test. 

So remember:
**more fiber → more cost to deploy → better performance**


---

# 5. Optical access: OLT, ONU, ONT, ODN

Important acronyms:
- **OLT — Optical Line Terminal** -> Located on the operator/network side.
- **ONU — Optical Network Unit** -> Terminates or converts the optical access closer to users.
- **ONT — Optical Network Termination** -> Optical termination at the user side.
- **ODN — Optical Distribution Network** -> The optical distribution infrastructure between OLT and users.

These are the main elements shown in the FTTx reference architecture.

---

# 6. AON vs PON
### AON — Active Optical Network
Also presented as: **Point-to-Point (P2P)**
Contains active equipment in the distribution network.

### PON — Passive Optical Network
Uses:
- passive optical splitters
- tree-based topology
- no powered active switching elements inside the optical distribution path

The slide definition is essentially: **passive branching of fibers through optical splitters.**

#### Main advantage of PON
Past quiz answer: **lower infrastructure cost**, because fewer active components are required. 

Do NOT think:
> PON means there is no ONU.
ONU/ONT devices are still needed.

### Multiple ONUs transmitting
A previous quiz asks what happens if several ONUs want to transmit simultaneously.

Correct idea: **The OLT schedules ONU transmissions to avoid collisions.** 

So do not think of Ethernet-style random collisions and retransmissions as the normal PON solution.

---

# 7. Wavelength Division Multiplexing — WDM
Basic idea: **Different wavelengths of light can coexist in the same optical fiber.**

Think of them as different **colors**.
If a fiber supports several wavelengths, multiple optical channels can be transmitted simultaneously over that same physical fiber.

### QUIZ SBERS
![[Pasted image 20261007155113.png]]

>[!question]- Risposta?
>**A**

---

# 8. DSL / xDSL
**DSL = Digital Subscriber Line**
It is a family of technologies that transmit digital data using the existing wires of the telephone access network. 

Important family members:
- HDSL
- SDSL
- ADSL
- ADSL2+
- VDSL
- VDSL2

The main differences are:
- bit rate
- distance
- symmetry/asymmetry
- frequency range
- equipment location

## Why ADSL became successful
This is a very likely question because it appears repeatedly in the provided quizzes.

The main reason: **ADSL reuses the existing copper telephone infrastructure.** It did NOT require replacing all copper cables with fiber.

### QUIZ FACT
![[Pasted image 20261007155012.png]]

>[!question]- Risposta?
>**A**

Important trap:
==ADSL uses the same **cable**, but NOT simply the same frequency band as telephone voice.==

## Why ADSL is asymmetric
**A = Asymmetric**
The downstream data rate is greater than the upstream data rate.

Why?
Traditional residential Internet traffic requires more data in **network → user**
rather than **user → network**

Examples:
- browsing
- video
- downloads

The slides explain that the distinguishing feature of ADSL is exactly the different amount of data flow in the two directions. 

## ADSL frequency bands
Telephone voice and ADSL data coexist on the same copper pair because they use **different frequency bands**.

### POTS
Traditional voice occupies roughly: **0–4 kHz**

### ADSL 
UPSTREAM: approximately **25.875–138 kHz**
DOWNSTREAM: Approximately **138–1104 kHz**

So:
- **low frequencies → voice**
- **higher frequencies → data**
- **upstream and downstream → separated bands**


---

# 9. Splitter
A **POTS splitter** separates:
- telephone voice
- DSL data
It uses filtering so that telephone devices receive the low-frequency voice band while the DSL modem receives the higher-frequency data band.

Its main purpose is: **prevent interference between POTS and DSL.**

The slides describe both a dedicated splitter and distributed microfilters. 


---

# 10. Cross-talk
This is one of the most important quiz topics.

Copper pairs are grouped together inside cables.
Signals travelling on one pair can electromagnetically couple into another pair.

Therefore:
**Cross-talk = undesired interference caused by coupling between signals on different circuits/pairs.**

### QUIZ FACT
![[Pasted image 20261007155530.png]]

>[!question]- Risposta?
>**A**

### Factors affecting cross-talk
It depends on:
- transmitted power spectral density
- number of twisted pairs
- overlapping frequency bands

And: **cross-talk generally becomes more important at higher frequencies.**

That is why it becomes particularly problematic for high-speed DSL technologies. 


---

# 11. NEXT vs FEXT
There are two main forms.
## NEXT — Near-End Cross-Talk
Transmitter and affected receiver are on the **same side** of the cable.
It can be particularly strong because the disturbing transmitter is physically close to the receiver.
NEXT is one reason ADSL separates upstream and downstream frequencies. 

==Shortcut: **N = Near = same side**==



## FEXT — Far-End Cross-Talk
Transmitter and affected receiver are on **opposite sides**.
The interfering signal travels through the cable before affecting the receiver. 

==Shortcut: **F = Far = opposite sides**==

### Very useful memory rule
- **NEXT → TX and RX same end**
- **FEXT → TX and RX opposite ends**


---

# 12. DMT — Discrete Multi-Tone
DMT is the main ADSL modulation concept you need to know.

Instead of using one large frequency channel, DMT divides the available bandwidth into many small **subchannels**.
Each subchannel has a carrier called a: **tone**
Data are transmitted independently on these tones using QAM.

The slides describe ADSL DMT as approximately:
- **256 sub-bands**
- about **4.3125 kHz each**

### Main advantage
Each subchannel can be adapted independently according to channel quality.
If one frequency range suffers from:
- noise
- interference
- strong attenuation
that tone can receive fewer bits or be completely unused.

- Good channel: **higher-order QAM → more bits**
- Poor channel: **lower-order modulation / fewer bits**
- Very poor channel: **do not use the tone**

![[Pasted image 20261007154352.png]]

>[!question]- Risposta?
>**A**


---

# 13. Water Filling
Water filling determines how transmission power should be allocated among the different DMT subcarriers.

The intuition: **allocate more useful resources where the channel is better and less where the channel is bad.**
It is particularly useful when channel quality is **not flat across frequencies**.

### QUIZ FACT
![[Pasted image 20261007154215.png]]

>[!question]- Risposta?
>**D**
>
If all frequencies behaved identically, there would be much less reason to perform adaptive allocation.

---

# 14. ADSL architecture

Important components:

### ATU-R
**ADSL Transmission Unit — Remote**
User side.
Essentially the user's DSL modem/termination.

### ATU-C
**ADSL Transmission Unit — Central Office**
Operator side.

### DSLAM
**DSL Access Multiplexer**
Located in the operator network.

Main roles:
- contains many ATU-C interfaces
- multiplexes users' traffic
- demultiplexes traffic
- negotiates line speed
- provides management functions

The slide reference model explicitly connects the ATU-R, copper line, splitter, ATU-C and DSLAM. 

---

# 15. Distance vs DSL bit rate
This relation is fundamental:
**longer copper line → more attenuation → lower achievable bit rate**

Therefore:
**shorter copper → higher speed**

This explains many topics at once:
- why fiber is brought closer to the user
- why FTTC is better than FTTE
- why FTTB is better than FTTC
- why VDSL requires short copper loops

For VDSL, the slides explicitly say:
> the key to the fastest bit rate is the shortest possible copper length.

---

# 16. VDSL
**VDSL = Very-high-speed Digital Subscriber Line**
It uses a much larger frequency range than ADSL and can provide much higher bit rates.

But there is a cost: **higher frequencies suffer more attenuation and cross-talk.**
Therefore VDSL works best when copper is short.

Typical architecture: **fiber → cabinet/ONU/DSLAM → short copper → user**
rather than: Central Office → long copper → user

---

# 17. ADSL vs ADSL2+ vs VDSL vs VDSL2
The slide gives these approximate values:

|Technology|Frequency|Maximum rates|
|---|---|---|
|ADSL|up to ~1.1 MHz|~8 Mbps down|
|ADSL2+|up to ~2.2 MHz|~24 Mbps down|
|VDSL|up to ~12 MHz|~55 Mbps down|
|VDSL2|up to ~30 MHz|~100 Mbps down/up|

The conceptual relation is much more important than the exact number:
**ADSL < ADSL2+ < VDSL < VDSL2**

means generally: **larger bandwidth → potentially higher bit rate**

but also: **higher frequencies → shorter useful copper distance / greater cross-talk problems.**


---

# 18. VDSL vectoring
Another very likely topic.

VDSL uses high frequencies, so **cross-talk becomes a major limiting factor**.
**Vectoring** attempts to cancel cross-talk. 
It works by generating an appropriate **anti-signal** for each cross-talk-impaired line.

Requirements include:
- synchronization
- knowledge of the different lines
- estimation of cross-talk coefficients
- calculation of cancellation signals

The slides explicitly describe vectoring as cross-talk cancellation through an anti-signal. 

### QUIZ SBURS
![[Pasted image 20261007160236.png]]

>[!question]- Risposta?
>**A**
>
>RICORDA
> 1. **Vectoring on copper lines**
> 2. **DSLAM/fiber termination closer to the end user**
> 


---

# 19. Wireless access — concepts likely to be tested
From the provided past tests, the professor prefers conceptual questions rather than formulas here.

## Interference
When several users share a wireless system, the critical issue is often:
**interference between users if multiple access is not properly controlled.**

This is the answer given in the past quiz. 

Do not confuse:
- **path loss** = signal gets weaker with distance
- **multipath** = multiple delayed copies of the same signal
- **interference** = unwanted signals from other transmissions

## Multipath
A wireless signal may reach the receiver through several propagation paths because of:
- reflection
- diffraction
- scattering

Different paths have different:
- attenuation
- delay

From the supplied quiz, if asked what must be modelled to use multipath constructively:
**attenuation and delay of the different paths.**

---

# 20. Latency
**Latency** measures how long the network takes to react/deliver information.

It is different from throughput.

### Throughput
How much data can be transferred per unit of time.

### Latency
How quickly communication can happen.
Future applications increasingly require very fast interaction with the network.
Therefore latency is important because many applications require **high responsiveness.**

Very common trap:
> high throughput

does NOT mean:
> low latency

They are different performance metrics.

---

# 21. LEO vs GEO satellites
This is in the current slide set, so I would know the basic differences.

## LEO — Low Earth Orbit
Altitude: **~500–2000 km**
Latency: **~20–40 ms**

Advantages:
- low latency
- high bandwidth potential
- global coverage possible

Problems:
- many satellites required
- shorter lifespan
- deployment/maintenance cost
- space debris

## GEO — Geostationary Earth Orbit
Altitude: **~35,786 km**
Latency: **~500+ ms**

Advantages:
- huge coverage
- one satellite can cover about one third of Earth
- longer lifetime

### Mental shortcut
**LEO = Low altitude = Low latency**
**GEO = far away = high latency**

---

# 22. PPP — lower priority, but know the basics
The last part of `02` is labelled as an appendix, so I would study this **after the main topics**.

**PPP = Point-to-Point Protocol**
Used to transport packets between two peers.
In ADSL it can support functions such as:
- authentication
- authorization
- network configuration

Two common forms mentioned:
- **PPPoA**
	- PPP over ATM
- **PPPoE**
	- PPP over Ethernet

### LCP
**Link Control Protocol**

Handles:
- establishment
- configuration
- control
- termination of the PPP link

### NCP
**Network Control Protocol**
Configures network-layer protocols.

### PAP vs CHAP
**PAP**
- username/password style
- less secure

**CHAP**
- challenge-response
- hashing
- more secure than PAP

---

# 23. QAM — minimum you need
**QAM = Quadrature Amplitude Modulation**
More constellation points → more bits per symbol.

Example from the slide: **16-QAM → 16 symbols → 4 bits/symbol**

because: $\log_2(16)=4$

In DMT:
- good subchannel → larger QAM constellation
- poor subchannel → smaller constellation

---

# High-yield quiz traps
These are the distinctions I would have very clear before Friday:

|If the question says...|Think...|
|---|---|
|ADSL success|reuse existing **copper cable**|
|Cross-talk|coupling between different pairs|
|NEXT|TX/RX on **same side**|
|FEXT|TX/RX on **opposite sides**|
|DMT|many independent tones/subchannels|
|Bad DMT frequency|reduce/disable that tone|
|Water filling|useful with **non-flat SNR**|
|VDSL high speed|**short copper**|
|VDSL vectoring|cross-talk cancellation|
|FTTx higher bit rate|fiber closer to user|
|FTTx higher deployment cost|fiber closer to user|
|PON|passive splitters|
|PON multiple ONUs|OLT scheduling|
|WDM|several wavelengths/colors in one fiber|
|EDGE|intelligent part between access and core|
|Latency|responsiveness|
|Wireless multiple users|interference|
|LEO|low altitude, low latency|
|GEO|high altitude, high latency|
|DSLAM|aggregates/multiplexes DSL lines|
|Splitter|separates voice and DSL frequencies|

