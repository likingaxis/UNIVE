# Network Lesson 8 — Compacted Transcript

> Editorial compaction: fillers, false starts and redundant repetitions removed; adjacent utterances joined into paragraphs. The lecture's order, explanations, examples and substantive questions are preserved. Timestamps refer to the original recording. Square brackets identify unclear source wording or editorial context. Administrative announcements are retained as stated during the lecture.

## Notebook, timetable and assessment

**Professor — 00:00**

I'm working on a notebook summarizing the previous academic year's lectures with AI, specifically ChatGPT. I'm taking the transcripts of the recorded lectures, the whiteboards I drew and the slides to produce a small textbook for you to study. It is still a work in progress: I've just started chapter 4, but chapters 1–3 are available, which is enough for the first week. If you have comments or feedback, I would be pleased to consider them when updating the document.

**Professor — 01:05**

Regarding lecture times, I discussed this proposal with some of your colleagues before the lecture; apparently Professor Cuomo was doing something similar. On Monday, we will use this room, starting at 10:00 and finishing at 11:30. For Friday, I propose starting at 08:30 and finishing at 11:00, in the classroom downstairs. We will have a 15-minute break at about 10:00, then conclude with the remaining 45 minutes.

**Question — 02:24**

Don't we have Kathara labs on Friday?

**Professor — 02:27**

Not always. This is information we should share so that you can organize yourselves. This Friday, for instance, we will have a theoretical lecture together rather than a Kathara lab.

**Professor — 02:50**

Regarding assessment, there are what we call midterms, although they are really multiple-choice self-assessment quizzes to help you understand how well you know the subject. Professor Cuomo's quiz was postponed from last Friday to the next Friday. She decided to do two; for technical reasons, I prefer to do just one.

We will do it on the last day of the semester, December 18, a Friday. We will start with the test, then you will do the lab activity scheduled that day with Pietro. The test awards a maximum of one bonus point. You already know the rules: you can get the maximum by attending the January or February session. [The exact condition in this sentence is unclear in the source.] It lets you practise and become familiar with the exam, with a maximum of one bonus point.

There will be 10 questions in 15 minutes, using Moodle. You must attend in person; remote participation is not allowed.

**Professor — 04:54**

For the theoretical part of the final exam, there are two written questions. One concerns the transport-network topics we study together. It is an open question with a one-page answer limit: be concise, but cover all the relevant points. You have 20 minutes, which I find quite challenging because the time is constrained. The answer is awarded a maximum of 6 points.

Here are two example questions. The multiple-choice example asks: “In an all-optical network, which function is not available?” There are four options. Unless you have already studied the topic yourselves, it may not yet be clear.

The open-question example, for January and February, asks: “What are the main differences between first- and second-generation optical networks?” You must discuss those differences. I generally provide some support by indicating the aspects I expect you to cover, such as multiplexing, electronics, fiber type, light source and amplification. Professor Cuomo may already have introduced these details.

## Module objectives and provisional exam arrangements

**Professor — 06:56**

My objective is to give you the basics of how a transport network works: its technologies, infrastructure types, protocols and services. This is what we will do in these 20 hours.

We will cover three aspects of transport networks, using the TCP/IP stack as a reference and exploring its lowest layers, from the physical layer up to layer 3, the network layer:

- **Optical networks:** how they work, including aspects of their control and management.
- **Multiprotocol Label Switching (MPLS):** a layer-2 technology—actually, layer 2½—and services such as traffic engineering, fast restoration and the creation of virtual private transport.
- **Interdomain routing:** first formalizing the problem, then studying the Internet's de facto standard, the Border Gateway Protocol (BGP). Since this course is part of the Cybersecurity master's degree, we will also cover security threats, countermeasures, best practices and PKI, a cryptographic architecture for securing interdomain routing.

**Professor — 09:22**

It is your right to know the exam dates, but these still need confirmation from the administration and student secretariat. The proposed dates are January 14 and February 17. I hope you will all finish the exam in the winter session; the other sessions have also been scheduled.

You will not find the sessions in the university booking system yet because we still need to open them. These dates are unofficial. They are quite likely to be confirmed: finding a suitable schedule for all exams is a long process, and we have converged on these dates, but I am still waiting for administrative approval.

**Professor — 10:47**

There are two ways to take the exam. One is designed for the semester in which the course is taught. The intermediate tests award up to two bonus points. In December, while classes are still taking place, a Kathara homework assignment will be released. Pietro may already have given you the details. You will have a few days to complete it at home, independently or with colleagues, as you prefer. It awards a maximum of 16 points.

After the semester, in January or February, you take the remaining part: two written questions, one on access networks and the other on transport networks. There is also a new component compared with previous academic years: a multiple-choice quiz worth up to 4 points on the theoretical aspects covered during the Kathara lab lectures. Participating in the homework allows you to use this exam arrangement.

If you cannot or choose not to do the homework, there is the **full exam**, completed in one day. It has two parts. First, you do the Kathara practical task in class, in person, with one and a half hours to complete it. The difficulty is the same as the homework. The other block is the same as in the homework arrangement.

In our experience, doing the homework is more convenient because you have more time to work on the Kathara task. Completing it in one and a half hours is quite challenging.

**Student — 14:00**

How long does the written exam last? Does the 20-minute limit apply to that question?

**Professor — 14:06**

You have 40 minutes overall for the two open questions. I suggest dividing them into 20 minutes per question, but it is your choice. Sometimes one answer is left blank because a student has spent all 40 minutes on the other question.

For the new quiz, I cannot yet give a definite answer about timing. It is the first time we are proposing it. It will probably be arranged similarly to the intermediate tests, perhaps 10 questions in 15 minutes, but Pietro is working on it and should provide the details.

**Student — 15:00**

If I take the January exam and do not accept it, can I take the February exam? [The question is fragmentary in the source.]

**Professor — 15:04**

You have the right to attend all the exam sessions you need. However, the points acquired during the semester—the 16 homework points and the bonus points—can be used only once. If you fail in January, you can try again in February, but you must follow the other arrangement. [The professor refers to the full-exam arrangement on the displayed slide.]

**Professor — 15:51**

During the second part of the semester, we generally host two seminars with experts from the sector. On November 30, Nokia engineers will talk about Nokia and specific network-infrastructure use cases. On December 14, we will host NAMEX's technical staff. NAMEX is the Internet exchange point in Rome for central Italy. We will cover this topic in the final part of the semester.

## What is a transport network?

**Professor — 17:32**

We can now answer the first question: what is a transport network, the subject of the second part of the course? In the first part, you studied access networks and their main technologies.

All of us—and non-human things as well—are end users. End-user devices, such as laptops, smartphones and computers, access the Internet through access networks. There are different access networks, some wired and others wireless. The examples mentioned here are ADSL access and a 5G base station. [At 18:59, the source calls ADSL “an example of wireless”; this wording is inconsistent with the wired/wireless distinction and is retained here as an unresolved source issue.]

Users pay an access provider for connectivity to the rest of the Internet. Their goal is to communicate end to end. Imagine user A wanting to communicate with user B. They enter the Internet through their access networks, but what moves the information from one side of the world to the other? We can assume a larger infrastructure in between, which we call the **transport network**.

**Professor — 20:40**

The main goal of a transport network is to move traffic over a wide geographical area. Geographical extension is one of its main characteristics. Access networks generally cover a small area, such as a neighborhood, a block or a small town, on the order of a few kilometers. A transport network can span a country, a continent or the entire world. Satellite networks can also cover the whole Earth with a single infrastructure.

For this reason, we often refer to these infrastructures as **Wide Area Networks (WANs)**: the name reminds us of their large geographical scope.

**Professor — 22:22**

Consider the customer–provider relationship. In the access network, the end user requests a service from an access provider. The end user is the customer, the access operator is the provider, and the requested service is access to the network.

In the transport network, the situation changes. The customer becomes an entire network infrastructure: specifically, an access provider. The transport operator is the provider. The customer asks it to carry an information flow from an ingress point to an egress point—in other words, to allow traffic to transit through its infrastructure.

Because the transport operator carries an access provider's information from one point to another, it is also called a **carrier**. A carrier is a transport-network operator providing transit services to access networks.

**Professor — 25:03**

The figure shows the same concept: end users access the network through different technologies and different providers. Those access networks are interconnected by a transport network, whose goal is to move traffic from an ingress point to an egress point. [The source repeats “ingress” at 25:27; the earlier explanation at 24:03 specifies ingress to egress.]

## Examples: physical and logical network views

**Professor — 25:48**

To make this concrete, here are some examples of transport networks. The first is the TIM Sparkle topology, a worldwide optical-fiber network. The map shows submarine cables connecting different geographical areas. It illustrates how a WAN can cover the whole Earth.

Another example is GÉANT, the European research network. It also spans a large area, in this case Europe. It consists of many nodes, called points of presence, which are essentially routers.

The difference between these two diagrams is that the first is a **physical view**: each line represents a cable, an optical-fiber cable. The other shows **logical interconnections** between nodes, so it is a logical view. Both illustrate the importance of geographical extension.

**Professor — 27:52**

This is Google's inter-data-center network. [The network name is rendered “before” in the source.] Each square is a Google data center, and the links represent interconnections between data centers around the world. The figure is old, from around 2015 if I remember correctly; there are probably more data centers now. These examples all emphasize the geographical reach of transport networks.

## Traffic aggregation and capacity

**Professor — 28:54**

Let us examine the main differences between transport and access networks. The first is traffic. Consider an access network with users who have subscribed to an access provider. The node in the drawing is a **PoP**, a point of presence: the interconnection point between the customer and the provider. Here, the customer is the access network and the provider is the transport operator.

Each user generates and receives traffic. Call their flows F1, F2, …, Fk, for the k users. The access network injects an aggregated amount of traffic into the transport network, equal to the sum of those flows.

A transport provider usually serves more than one access provider. It may have another PoP connecting a different access provider, another customer injecting traffic. Consequently, the transport provider has to serve a very large amount of traffic.

**Professor — 31:53**

Consider a numerical example. Suppose the access networks in the drawing use fiber access, with a sold access rate of 1 Gbit/s. [The access acronym is transcribed as “FTTA”; the intended acronym is unclear in the transcript.] If an operator has 1,000 customers, each able to inject up to 1 Gbit/s, their aggregate is approximately 1 Tbit/s. If a carrier serves many access networks, it can easily have to manage tens of terabits per second.

The story is not exactly this simple, because 1 Gbit/s is the maximum capacity offered to a user. Most of the time, users do not generate a constant bit rate equal to that maximum. Nevertheless, transport traffic remains very high: orders of magnitude greater than what access providers generally handle. This adds complexity to the infrastructure.

**Professor — 34:08**

Some definitions: the traffic flow generated by an end user is also called a **tributary flow**. Their aggregate is an **aggregated traffic demand**.

Why call it an aggregated traffic demand? Look beyond the PoP at the transport-network topology, which has different points of presence. From the transport provider's perspective, each PoP behaves as though it injects a single traffic demand: the aggregate.

Looking at the individual users, many tributary flows enter the transit network. From the transit provider's perspective, it is as though a single large flow travels through it. Its goal is to provide a service to each customer, which is an access network, rather than to each individual end user. Its visibility and granularity of control are therefore at the level of aggregated traffic flows.

**Professor — 37:07**

As demand grows, capacity has to grow as well. In access networks, users may be satisfied with capacities of 1 or 2.5 Gbit/s. Transport links have capacities orders of magnitude higher, carrying terabits per second, compared with an individual access fiber from a home toward the central office carrying about 1 Gbit/s. [The specific transport-capacity figures at 37:38 are transcribed as “400, 801 terabit per second”; the values and units are unclear and have not been reconstructed.]

**Professor — 38:22**

Here is another view, one of the diagrams I drew with AI assistance for the notebook. Many end users generate small tributary flows. The green one might be a phone or video call, another web browsing, and another listening to music on Spotify.

These are low-bit-rate application flows. Because they use the same access infrastructure, they are aggregated into a single high-data-rate flow. This is the effect of **multiplexing** many small tributary flows into one large aggregated traffic demand. The transport provider sees that high-data-rate aggregate, which must be carried from one side of its infrastructure to the other.

## Topologies, failures and congestion

**Professor — 39:55**

Another important difference is network topology. So far, we have discussed traffic demand, capacity and customer–provider relationships. Now consider the topologies generally used in access networks.

One is a **point-to-point link**, where an end user connects directly to the central office. Another is a **tree**: starting at the central office, we go through aggregation points and then reach the users. PON uses this kind of topology, as does another access technology mentioned here. [That technology's name is unclear at 42:18: “for the answer.TSL”.]

The third is a **ring**, which is used in access networks because it is simple and provides resilience to failures. The point-to-point and tree examples are not resilient to link failures. If a point-to-point link fails, the service is disrupted. In a tree, if a shared link fails, all users whose traffic was carried by it lose connectivity. A failure farther down a branch may affect only one user, which is less severe overall but still disruptive for that user.

In a ring, if one link fails, we can still reach the other nodes through an alternative route.

**Professor — 44:06**

Transport networks use **mesh topologies**. What are their advantages? First, resilience: if the link in this example fails, we can still deliver service to all the customers by finding an alternative path that bypasses the failed component.

Now assume that link is working and consider users sending traffic toward the central office in a tree. Flows initially travel over different links, then converge onto one link, increasing the amount of traffic on it. If the traffic grows too much, we experience **congestion**.

Congestion occurs when incoming traffic demand exceeds the server's capacity—in this case, the capacity of the link. If congestion persists, we first experience higher queuing delay, then traffic loss. It is an event we want to avoid.

**Professor — 46:48**

In a tree, however, our options are limited: by definition, there is exactly one path between any pair of nodes. We cannot reduce congestion by balancing traffic over alternative links, because a flow has only one possible path.

In a well-designed mesh network, alternative end-to-end paths allow us to distribute demand over the network's resources. In this example, assume the link has not failed, but its traffic demand—its utilization—is very high, approaching 100%.

The red flow is using that link, which is about to become congested. From the service perspective, we will see increasing end-to-end delay and then packet loss. We can move the flow onto the alternative end-to-end path shown in the drawing. This can improve the service quality for that flow and alleviate congestion on the original link. Having a mesh topology makes this possible; it is one reason transport networks generally use meshes rather than the topologies common in access networks.

## Why routing becomes central

**Professor — 50:13**

We also need another function, which is essential in transport and not needed in the access examples we have considered: **routing**. Routing determines an end-to-end path over a graph, from one point to another. It becomes a key service for a transport provider.

First, it enables **service delivery**. A mesh offers many paths, so we need a way to select at least one. In the access topologies discussed earlier, the alternatives are limited. A point-to-point link is straightforward; in a tree there is only one path between each pair of nodes. In a ring there are two paths between A and B. The rule of thumb described here is to use a clockwise direction for the primary path and the opposite direction for backup. In a complex mesh graph, however, we must explicitly determine the route that traffic should follow.

**Professor — 52:33**

Second, routing enables **service restoration**. If a link is cut, traffic passing over it is lost and service is disrupted. Thanks to path diversity, we can restore service by rerouting traffic onto an alternative path that avoids the failed components. This again requires routing.

Third, routing enables **load balancing**, distributing traffic over network resources. Service delivery, service restoration and load balancing make routing a crucial element of transport networks.

The following examples repeat the points we have already discussed. We now have an idea of what a transport network is and how its characteristics and challenges compare with those of an access network.

## Traceroute and the end-to-end path

**Professor — 54:41**

Let us now understand how a transport network can be physically implemented and what additional challenges arise. I will start with a familiar example: the `traceroute` tool. It is an application based on ICMP messages that allows us to discover the end-to-end route followed by packets.

Imagine a host in Rome running `traceroute` toward a host in Milan. The output shown here is an illustrative example, not the output of an actual run. You can try it yourselves, although nodes often do not respond, so you may get many asterisks.

The result lists the devices traversed by the packets, usually by hostname or IP address. The test is repeated three times, giving measurements of the delay from your computer to each node. In this example, the packet makes eight hops after leaving the computer: it encounters the first router, then the second, and so on.

**Professor — 56:53**

Looking at this logically, the first nodes are on the access side. We encounter our gateway, used to access the network, and at least one router on the access-provider side, perhaps at the central office. The PoP router interconnects access and transport.

There are several hops in between, then devices belonging to the destination user's access side, including that user's gateway. Between the two access portions is the transport network. We do not yet know how it is built; there may actually be more than one transport network along the path.

**Professor — 58:21**

What can we learn from this example? First, consider latency. In transport networks, propagation delay becomes a very significant part of the end-to-end delay. The rule of thumb is that propagation is its largest component because the signal must cover much greater distances than in a LAN, where computers may be in the same building or room.

Second, consider the infrastructure itself. At home, it is easy to imagine the connection from a laptop to its gateway: an Ethernet cable one or two meters long, or Wi-Fi within the room. But how do we connect a node in Rome to another in Bologna, hundreds of kilometers away? I do not remember the exact distance—perhaps 250 or 300 kilometers—but the relevant scale is hundreds of kilometers.

## One logical link, multiple physical spans

**Professor — 1:00:20**

Do you believe there is a single cable from a router in Rome to a router in Bologna? Why not? Can you explain your answer? I have just shown cables crossing the Atlantic, connecting North America to Europe under the sea. Why should it be unbelievable that Rome and Bologna are connected directly by a very long cable?

**Student — 1:01:27**

You need optical repeaters.

**Professor — 1:01:29**

That is a good point, although you are several steps ahead. What your answer identifies is that signals undergo impairments while propagating through channels and cables. What we send is degraded by effects such as attenuation, interference and distortion. These effects on an electromagnetic wave make the distance too large for a single uninterrupted transmission span.

As your colleague suggested, the physical realization of the point-to-point link can involve many fiber spans interconnected through regenerators and amplifiers. The transmitted signal propagates and degrades until we restore or reamplify it. It then propagates again; when its quality has degraded too much, we intervene again, repeating this process until the signal reaches the receiver.

**Professor — 1:03:21**

This example shows that the single link we draw is not a physical description. It is how we interpret the situation: a **logical view**, logical topology or logical network. The physical view shows how that connection is realized, through many cable or fiber spans interconnected by amplifiers and regenerators. For now, think of these devices as improving the quality of what they receive; we will study them in detail later.

This also clarifies the earlier network examples. The physical diagram shows the actual cables. The other two diagrams show logical interconnections between nodes without explaining how those connections are physically realized.

## Sharing physical infrastructure among clients

**Professor — 1:05:15**

Take this step by step. A node in Rome and a node in Milan can be logically connected while physically linked through the infrastructure in the drawing. The triangle is my symbol for what the slide calls an amplifier.

Think about how this infrastructure is built. For months, someone digs under the highway to lay a long cable and installs amplifiers at certain points. Once the physical connection between the Rome and Milan routers is complete, the routers can exchange traffic.

Now another company appears, with one branch in Rome and another in Milan, and needs its own point-to-point connection. The first example might be TIM, with routers in Rome and Milan that are logically interconnected. The next day, Wind decides to build its own national IP backbone and also wants to connect routers in the two cities.

Should it dig under the highway again, lay another cable and install another set of amplifiers? Besides leaving us with very bad roads, as we unfortunately have in Rome, this would be economically unfeasible. Only very large players could afford nationwide infrastructures, because deploying the physical network is so expensive.

**Professor — 1:08:33**

The idea is to share a physical network among many operators. **Resource sharing is a fundamental requirement of a transport network.** Imagine a nationwide optical-fiber infrastructure interconnecting major Italian cities. Different providers can build their own connectivity on top of it.

For example, routers Rome 1 and Milan 1 belong to one company, while Rome 2 and Milan 2 belong to another. I have used telecom operators such as TIM, Wind and Vodafone as examples, but the same applies to other organizations, such as banks. [The specific bank name at 1:10:08 is unclear in the source.]

From the logical-topology perspective, each pair is connected point to point. In reality, the companies receive transport services from a carrier: their logical connections are realized through physical infrastructure shared among different clients.

## Horizontal and vertical customer–provider relationships

**Professor — 1:11:08**

This introduces another dimension of the customer–provider relationship. So far, we have discussed **horizontal relationships**: end users with access providers, access providers with transport providers, and later transport providers with other transport providers.

There are also **vertical relationships**. A layer-3 provider can be a client asking for interconnection. More generally, an upper layer requests logical connectivity, and the transport provider realizes it physically.

**Professor — 1:12:13**

Here is a clearer view. The client layer, which for us will be an IP network, wants point-to-point connectivity from its logical perspective. It requests a transport service from a lower layer, which will be an optical network. The layer-1 provider creates an end-to-end path over its shared physical infrastructure.

Our `traceroute`, which appeared to jump directly from Rome to Florence in this example, actually crossed an optical transport network before reaching the other side.

## Next steps: a bottom-up view of the module

**Professor — 1:13:36**

I will skip the summary because today we have covered basic definitions. This was an overview; from Friday onward, the material will become more technical.

The program follows the TCP/IP stack from the lowest layers—layers 0 and 1—up to layer 3, using a bottom-up approach. First, we will understand the shared physical infrastructure, generally an optical network using **WDM**, Wavelength Division Multiplexing, and **OTN**, Optical Transport Network.

We will distinguish the **data plane** and **control plane**. We will study how communication takes place and the devices involved, including optical add/drop multiplexers, optical cross-connects and OLTs, as well as how lightpaths are established.

From the control-plane perspective, we will examine the procedures for setting up a lightpath, an optical connection. We will also see how to manage services by monitoring key performance indicators, ensuring that the service-level agreements established with customers are met, and providing resilience to failures. In particular, we will spend time on failure recovery.

**Professor — 1:16:00**

Then we will move up to MPLS, introducing label switching and the services it provides. From the control-plane perspective, we will see how label-switched paths are created.

There is a mistake here that I did not notice, introduced by the AI. [At 1:16:28–1:16:33, the professor corrects wording on the displayed material. The correction is transcribed as “is in the domain, specifically”; the exact wording is unclear without the displayed material.]

We will briefly review how the current Internet control plane works, specifically OSPF, before moving to interdomain routing: autonomous systems, end-to-end reachability and BGP, with particular attention to security.

**Professor — 1:17:20**

That is all for today. Are there any questions? See you on Friday, starting at 08:30.
