#### Access network
The access network domain plays an important role in a network by connecting communications carriers and service providers with the individuals and companies they serve
![[Pasted image 20260926133155.png|453]]

- **Backbone / Core Network** — red area
  - uses relatively similar technologies
  - is therefore quite **homogeneous**

- **Access Network** — blue area
  - connects users/subscribers to their service provider
  - uses many different access technologies
  - is therefore quite **heterogeneous**

##### Type of access
- **Wired Access**
  - Fiber-optic
  - DSL
  - Cable Access
  - Powerline Access
    - uses existing electrical wiring for network connectivity

- **Wireless Access**
  - Cellular Access
  - 5G Access

- **Satellite Access**
  - uses communication satellites
  - useful for wide coverage and remote areas

- The backbone requires **high-speed / high-capacity links**

### FTT-X
**FTT-X** means **Fiber To The X**, where **X identifies where the fiber terminates / how close it gets to the user**
- **FTTH** = Fiber To The Home
- **FTTC** = Fiber To The Curb
- **FTTB** = Fiber To The Building
- etc

##### FTT-X architecture
the generic FTT-X architecture is composed of:
![[Pasted image 20260926134637.png|455]]

- **OLT (Optical Line Terminal)**
  - It is the starting point of the fiber access network on the operator side.
  - It connects the operator network to the optical distribution network.

- **ODN (Optical Distribution Network)**
  - It is not a single device.
  - It is the optical infrastructure that connects the OLT to the ONU/ONT.
  - It includes optical fibers and passive optical components such as splitters.

- **Splitter**
  - A splitter takes one optical path and divides the signal into multiple branches.
  - It is a passive optical component, so it does not require electrical power.

- **ONU (Optical Network Unit)**
  - The ONU is the point where the optical part of the connection terminates.
  - From the ONU, the connection can continue toward the final user using another technology.

In the example shown in the slide, the ONU contains an **xDSL interface**.

After the ONU, the final section is no longer optical: the connection continues over a copper-based xDSL link until it reaches the **NT (Network Termination)**.

- **ONU** → a generic optical network unit, which can be located before the customer's premises.
- **ONT (Optical Network Termination)** → the optical termination located at the customer premises.

##### FTT-X reference architectures 
can be divided into two main types:
- **AON — Active Optical Network**
  - uses active network equipment in the optical distribution network
  - this equipment requires electrical power
- **PON — Passive Optical Network**
  - uses passive optical components, such as optical splitters
  - these components do not require electrical power

![[Pasted image 20260926133414.png|471]]

The pictures distinguish AON from PON:
- (a) AON / Point-to-Point (P2P):
  each user has a dedicated fiber path from the local exchange

- (b) AON with active node:
  a shared fiber reaches an active node, which distributes the connection to users.
  The active node requires power and installation space

- (c) PON:
  a passive optical splitter/combiner distributes the optical signal.
  No active node and no power are required in the distribution point
