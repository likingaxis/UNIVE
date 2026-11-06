# Lesson 8 — Introduction to Transport Networks

## Using transport networks

Why do we need transport networks? Imagine two people: Alice lives in Rome and Bob lives in Milan. Their local access networks alone do not provide the infrastructure needed to connect these distant locations. This is the role of a transport network.

A **transport network** is an infrastructure designed to carry aggregated traffic between geographically separated network regions.

### Access and transport networks

First, we need to distinguish access networks from transport networks. An **access network** connects end users to a network operator, while a **transport network** interconnects distant networks.

Access networks usually cover a limited geographical area; transport networks can span cities, countries or continents. Access networks collect individual users' traffic, while transport networks carry aggregated traffic from multiple networks. In access networks, the customer is typically an individual or an organization. In transport networks, the customer is often another network operator.

![[net-l08-access-transport.svg|900]]

I have often heard the term **WAN**, or **Wide Area Network**. Here, it describes the large geographical scope of a transport network.

The access operator discussed in the previous lectures can now become a customer of a transport operator, also called a **carrier**. The carrier provides a service that carries traffic between ingress and egress points in its infrastructure.

## Traffic aggregation

We can understand traffic aggregation as a consequence of this infrastructure. Many end devices send data through an access network. Each generates a **tributary flow**:

$$
F_1, F_2, \ldots, F_k.
$$

The access network collects these flows. At its boundary with the transport network, a **PoP (point of presence)** provides an interconnection point; the PoP is not the access network itself. From the transport provider's perspective, the tributary flows form an aggregated traffic demand.

![[net-l08-slide-09-aggregation.png|900]]

*Source: introduction slides, slide 9 (PDF page 10).*

The total traffic demand is:

$$
\boxed{F_{\mathrm{agg}} = \sum_{i=1}^{k} F_i}
$$

Here, $F_i$ represents user $i$'s traffic rate, while $F_{\mathrm{agg}}$ represents the aggregate traffic rate.

### Subscribed capacity and actual demand

Consider 1,000 users with 1 Gbit/s fiber-access subscriptions. The sum of their subscribed peak rates is:

$$
1{,}000 \times 1\ \mathrm{Gbit/s} = 1\ \mathrm{Tbit/s}.
$$

The actual aggregate demand can be much lower. For example, if each user generates an average of 50 Mbit/s during a busy period, the aggregate is 50 Gbit/s.

Instead of provisioning capacity equal to the sum of every customer's maximum access rate, the operator can exploit the fact that not all users transmit at maximum speed simultaneously. However, it must still consider busy periods and traffic bursts when planning capacity.

It is important to distinguish **subscribed capacity** from **actual traffic demand**.

## Network topologies and routing

A **network topology** describes how nodes and links are interconnected. Let us compare the structures discussed during the lecture.

![[net-l08-topologies.svg|900]]

In a **point-to-point topology**, a single link connects the two endpoints. That link is a **single point of failure (SPOF)**: if it fails, connectivity between the endpoints is lost.

A **tree topology** is used in access networks such as PONs. There is exactly one path between any pair of nodes. If a link fails, every user whose path depends on that link loses connectivity.

A **ring topology** improves resilience by offering two directions around the ring. If a link on the clockwise path fails, traffic can use the counterclockwise alternative.

Transport networks generally use **mesh topologies**. Nodes have multiple interconnections, which may create several end-to-end paths. This provides two major benefits: resilience to failures and the possibility of distributing traffic to reduce congestion.

> [!example]- Original topology screenshot
> ![[Pasted image 20261106171743.png|422]]

> [!example]- Figures from slides 13 and 14
> ![[net-l08-slide-13-access-topologies.png|900]]
>
> ![[net-l08-slide-14-mesh.png|900]]
>
> Source: introduction slides, slides 13–14 (PDF pages 14–15).

### Congestion in a tree

Imagine several users sending traffic toward the central office in a tree network. Their flows initially travel over different links, but progressively converge onto the same upstream link. That link can become a bottleneck.

**Congestion** occurs when incoming traffic demand exceeds the capacity available to serve it. A tree offers only one path between each pair of nodes, so it cannot divert a flow onto an alternative path within that topology.

## Routing problem for mesh topology

Having multiple paths is useful, but we need a function that decides which path traffic should follow. This is the role of **routing**: determining an end-to-end path through the network graph.

![[net-l08-routing-alternatives.svg|900]]

*The first diagram shows the primary path. The second shows an alternative path that avoids the failed link.*

## Logical vs physical transport infrastructure

We can start with an example using `traceroute`. If we want to send a packet from Rome to Milan, we can investigate the layer-3 path between the source and destination:

```
traceroute milan.example.net
```

![[Pasted image 20261106173058.png|441]]

The question is: do the logical links in this view correspond directly to individual physical links? We need to distinguish two perspectives. From the IP network's perspective, two remote routers may appear directly connected, even though the physical infrastructure between them is more complex.

- **Logical topology:** describes the connectivity seen at a particular network layer.
- **Physical topology:** describes the actual infrastructure used to implement that connectivity.

Signals deteriorate as they propagate through a transmission medium. Over long distances, the physical path may therefore contain several fiber spans and intermediate amplifiers. For example, the Rome–Bologna connection below appears as one logical link, while its physical realization contains several spans.

![[net-l08-logical-physical.svg|800]]

`traceroute` reveals information about the IP-layer path. Optical amplifiers are not IP routers forwarding packets hop by hop: they operate at a lower layer along the physical transmission path.

### Propagation delay

Another consequence of long-distance transport is **propagation delay**, the time required for a signal to travel through the transmission medium.

In a local network, distances are usually short. Across a transport network, signals may travel hundreds or thousands of kilometers. Propagation delay can therefore become a major component of end-to-end latency, even when the routers and links are working correctly.

This is a physical limitation: a network can be uncongested and still have significant latency because of geographical distance.

### Sharing physical infrastructure

Different operators can share physical infrastructure. Imagine a company such as TIM deploying hundreds of kilometers of optical fiber and maintaining that infrastructure. Another company wants to connect Rome and Milan. Building an entirely separate physical network would be expensive and would also require space, so it can purchase connectivity from a provider instead.

The clients see their own logical connections, while the provider realizes them over shared physical infrastructure:

- The **client layer** requests connectivity and sees logical links.
- The **provider layer** realizes those connections using its physical resources.

![[net-l08-shared-infrastructure.svg|680]]

![[net-l08-slide-20-shared-provider.png|900]]

*Source: introduction slides, slide 20 (PDF page 21).*

> [!note] Terminology to review after editing
> Three phrases in the draft needed clarification against the lesson sources: **transport network**, rather than the TCP/UDP transport layer; a **PoP** as an interconnection point, rather than an entire access network; and **shared physical infrastructure** supporting separate logical connections.

## Sources

- [Introduction slides](<../Assets/SLIDES/SECOND MODULE/NI01 - intro to transport networks.pdf>): aggregation on slide 9, topology on slides 13–14, logical/physical connectivity on slides 17–18, and the shared provider on slide 20. Printed slide numbers are one less than PDF page numbers.
- [Professor's study notebook](<../Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>), chapter 1: *Transport Networks: Role and Architectural Principles*.
- [In-class sketches, 2 November 2026](<../Assets/SLIDES/SECOND MODULE/NI_L1-2026-11-02.pdf>).
- [Lesson 8 transcript](<../Assets/TRANSCRIPTION NETWORK/network lesson 8 transcripted.md>).
