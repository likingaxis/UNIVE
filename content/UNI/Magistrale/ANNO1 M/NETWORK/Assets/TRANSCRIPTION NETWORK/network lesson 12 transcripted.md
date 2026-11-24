Architecture. As always, do you hear me? Okay, thank you. Management and control architecture. We mentioned that optical networks generally rely on a centralized architecture, meaning that there is a central node who is in charge of running the software that and all the procedures to manage and to control the network. We mentioned that management tasks.

Typically are related to device configuration and performance monitoring, because generally users, after asking for the creation of a lightpath, they also ask for the provisioning of a certain level of quality of service. That it turns into constraints. Essentially, you can think an optimization problem with an objective function and a set of constraints. In this case, the quality of service requirement they would be constraints in terms of maximum latency, the bandwidth, the minimum availability, and so on, so forth. These are all possible specifications that a customer can ask for.

Okay, so we mentioned that the network cannot simply provide the functionalities to set up a life, but but it also has to implement some mechanisms to keep the under control. Let's say the situation. So we mentioned that from a high level perspective, the optical network is organized into a layered architecture, and we mentioned different layers.

And those layers are divided partially implemented in the electrical domain. Some others instead are fully implemented in the optical domain. And from top to down, we have introduced the optical packet unit. I didn't specify exactly what is the role of the OPU, but I remind you that this is the interface between the client layer and the provider network.

And then in the OPU, what happens is the so-called what is the word the adaptation that that one. Okay, adaptation. That means transponders, as we know. It implements other optical and electrical domain functionalities. So it means that in terms when it works in the electrical domain, it it is capable of working on a specific bitrate. Okay, so it has a bitrate that in general is specified with the letter C. That stands for capacity and measured in bits per second.

The client, as we mentioned many times, can be whatever because we want to be transparent with respect to the technology and the data rate at which the client is capable of injecting data in our infrastructure. So it means that the transponder, that it works at a constant bit rate, needs to be provided in input with the proper data rate. Okay, if the customer it works, I don't know, with ten gigabit per second, okay.

And our transponder instead is sending data at 100 gigabit per second. It means that using the transponder only for this customer would make us to waste 90 gigabit per second. Okay, so let me write those numbers because it's easier to follow. So we assume that the client, which might be an IP router.

It has a network card, network interface card, that in my example is working at 10 gigabit per second, and it is interfacing with a transponder that instead it works at 100 gigabit per second. So, here is the classical situation in which we need the adaptation because otherwise we would waste ninety gigabit per second of capacity of this transponder, which is a quite expensive device. So OPU, what it does is to allow the optical network provider.

To essentially multiplex together multiple client signal, okay, so that so that the capacity of the of the of the transponder is fully exploited. How it does? Well, there are different formats for the OPU, meaning we have different type, small. And these are called OPU one. Then there are OPU two, which are double sides. And in general, the transponder, the capacity of the transponder is is indicated as the number of OPU unit of a specific type that it can send per second. So when a client asks for for a connection, what the the OPU layer does is to select the proper sides for the OPU.

For the OPU frame, so that, for instance, if this transponder is capable of sending one one OPU of size four, this actually can accommodate up to four OPU of size one. Let's say, so the the client signal it will be encapsulated using one OPU of type one, and there are three more that are available for serving other customers. This is the concept that we introduced two lectures ago and named grooming.

Which essentially allows the provider to multiplex TDM multiplex client signal into a single wavelength. Okay. Then we mentioned that there is the ODU, so it's a upper layer of encapsulation, and we mentioned that as we move from top to down, our view on the infrastructure become becomes more aware because we start visualizing.

More devices, but at the same time we lose granularity control on the single customer flows. And for instance, if we go one step down, we found the OTU, where we mentioned there is the border between electrical and optical domain. OTU, I remind you, that is essentially a point-to-point electrical channel over a single or optical subnetwork.

If you remember, we mentioned that, and sometimes we need to rely on electronic. That's why having an entire optical network is unfeasible, and sometimes in between we need to put some electronic function that essentially breaks our network into two sub optical networks. Okay.

And what I'm saying, what we said during the previous lecture, is that essentially OTU is the point in which we end our journey into an all-optical subnetwork, and we need to jump into a new one. At this node, generally, we we process this type of header.

And it's very good. For instance, if we want to monitor the health status of the client signal, not end-to-end, but at intermediate points, so that in case of management, we can always identify if, in case, for instance, there is a problem, it is localized in subnetwork one or subnetwork two. Okay. I'm going fast because these are all things that we already discussed in the previous lecture.

After that, we move from electrical to optical, and we find the OCH, so optical channel. Essentially, this is a wavelength that propagates into an all-optical subnetwork. We know that a customer could be served using a specific wavelength in all-optical subnetwork one.

And the same customer could be, let's say, moved into a different wavelength or a different color while travel traveling through the all optical subnetwork too. End to end is a single lightpath for us because it's a single logical connection that we are creating for serving a customer. But from a physical point of view, is the sequence cascade of two different optical channels, okay? Using wavelength one and wavelength two. And now we know that at the O U leg, we perform also wavelength conversion. It is one of the reasons why we pass from optical to electrical and back to optical. And here you have an example.

After that, we move we move further down and we mentioned that going even more down into the stack essentially allows the network operator to have a better view of the infrastructure of the underlying physical infrastructure, which is very good for monitoring the health status of the network. But of course, from this layer to the to the last one, the optical signal then will be multiplexed. So at this point, I lose completely control and view into the single client signal.

And the two sections are the OMS, which is the optical multiplex section, and as the name suggests, now all the optical channels, all the different colors, all the different customers, they have been multiplexed into a single light ray like the one I'm looking right now, which contains all possible color contributions, essentially all the customer, all the tributary flows. Okay.

And it is clear that if a single of those customers have a problem at this level, I cannot see it because they have been multiplexed all together. On the contrary, if a specific element of the optical infrastructure is having problem, like an optical amplifier is not working anymore as it should, this is.

I mean the the further down, these are the two layers, OTS that is optical transmission session in in which we can monitor this type of situations. So the rule of thumb that we mention is, if I need to control the client signal, it's better to work on the higher layers. On the contrary, on the lower layers we have view of the infrastructure, so it's good for monitoring.

The infrastructure monitoring is the is the main topic, and we mentioned that there are different indicators for for measuring the health status of of the client and of the infrastructure. Optical power is one, and it's of course suitable when we are in the optical domain. Bit error rate, especially for clients, when we are in the electrical domain.

The optical trace, which is the unique identifier for every single element that we have in the network, from fibers to amplifiers, transponders, but also lightpaths and so on, so forth, everything has its own trace, which is a unique identifier. After that, we mention maybe I can use the slide to go faster. The problem, one of the main reason for having a network management system that is handling failures to handle to handle a failure. I remind you that essentially we have to do two things. First of all.

Detect the failure, which means detect that there is a problem and localize the failing component, and after that react, meaning, for instance, to redirect a light path to bypass a failing component. The second task is more a control plane functionality in terms of you know route computation. For what concern the first part, instead.

Sorry, its management plane, and we have described either the problem and also a possible solution. I remind you quickly the problem that is when there is a failing component, as in this example, there is a fiber cut. We the the network management system may be let's say.

May receive lots of alarms. In this example, a single fiber cut, under the assumption that there are thirty-two lightpaths end-to-end established, it would turn into one hundred and twenty-nine different alarms. So many alarms, but there is a single root cause of failure, and The main goal is to determine where the failure is, localization. Okay, and the idea is to implement a procedure that suppress the unwanted alarms, so that after this procedure has ended, there will be only a single element that is actually sending alarm to the network management system. And the procedure is based on forwarding of this defect indicator. There are some that goes downstream, so backward.

Defect indicator and some other things that that goes forward, so upstream toward the other side of the connection. And the idea is that whenever I receive the defect indicator, I immediately stop sending alarms to the network management system. The idea is that the only device that want Actually, stop sending alarm is the one that issued the defect indicators. Okay. To send defect indicator, essentially we need to define as signaling, signaling messages. A defect indicator is nothing more than a ping, for instance, just to give you the idea, a ping that when you if you receive it, it means okay the the.

I'm okay. I can receive the the message and I can interpret it. So it means that everything is going well. On the contrary, if I don't receive the message, maybe something is going wrong. Okay, but if we are in the electrical domain talking about messages, it's something that is quite understandable. So this image maybe it's not.

Appropriate. While when we are in the optical domain, talking about signal messages is less intuitive. That's why we introduced overhead also in the optical domain in in two two different forms. The first one is the pilot tone. I remind you, pilot tone is essentially a small Channel small in terms of capacity, that is essentially obtained by by modulating a a small optical channel into the guard band between between two consecutive optical channels.

So this is a specific lambda. Let's say lambda one is a an optical channel that is assigned to a client, and the power spectrum it will be centered around this lambda. Okay, and here in this area there will be a consecutive optical channel on a different color, and as you see there is this guard band in between that is generally inserted to reduce the interference between consecutive channels, and the idea of the pilot tone is by using sub modulation technique is to.

Let's say create a a signaling channel that is called pilot tone, which of course has to has to be low capacity. Why? Because to get high capacity, at least I should provide this signal with high power. But in case of high power, I would interfere with my own.

Client signal. That's why, in general, as I as my scheme show, the magnitude so the power assigned to this channel is much lower than the previous one. But of course, this way we can add over it also in the in the optical domain. And the other possibility that we have discussed is to use optical supervisory channels. Optical supervisory channel. I remind you that essentially is a wavelength lambda that is dedicated for monitoring. And the idea is very simple. Essentially, at the endpoint of a single fiber, we inject a monitoring signal and we drop it at the end. Okay, so that we can monitor the health status of the single fibers up to the single fibers of our of our infrastructure. Okay.

Starting from it, and this is the, I mean the the the last thing that we have seen in the previous lecture, we can realize different applications relying on different type of overhead. Okay, applications that we can have are those that I was mentioning up to now, like trace, so unique identifier to different network elements.

Defect indicators to suppress unneeded alarms, performance monitoring, okay performance monitoring either for network elements and for customers mainly for customers, and the type of overhead that we have optical supervisory channel, pilot tone, and in this case this is suitable in.

An all optical subnetwork, or here it is called rate preserving, but essentially is relying on headers, especially OTU and OTU headers that we have into the electrical domain. Okay, and this is called end to end because in general, as I mentioned in my previous explanation.

Electronic, not available in between of an optical subnetwork, but only at the edges of an optical subnetwork. So let let's let's see what is the mapping between these elements. So to realize the trace, unique identifier, we can rely either on optical.

Optical overhead or electrical overhead. Specifically, if we want to assign a unique identifier to a single fiber, we can use the optical supervisory channel. And the reason is simple, because you see that the optical supervisory channel is one-to-one mapped with every single fiber. But of course, if we want to assign a unique identifier to an end-to-end light path, optical supervisory channel is not suitable.

Because it doesn't follow, let's say, the client signal end to end. Okay. If we want to assign a unique identifier to an optical channel, instead, we can rely on the pilot tone. And once more, the reason is simple. Because looking at this figure, we see that the pilot tone is one-to-one mapped with a With a a wavelength, a specific wavelength, okay. And for what concern instead an end to end an end to end light, but we can rely on electronic. So inserting the trays for a client this time directly in the electrical domain and specifically in the header that we assign to every.

To every customer, defect indicator. If you remember, we mentioned that defect indicator should be let's say propagated at the different layers of of the optical network. Byopton, as you see, is not a good way to implement defect indicator propagation. Let's try to understand why.

Imagine that this is the the all optical subnetwork. Let's do like this. And here there is optical subnetwork one, and this is the all optical subnetwork. All optical subnetwork. Okay. So these are the different elements: transponders, multiplexer, an optical amplifier, or ATM, another multiplexer, another amplifier, and so on, so forth. So.

An optical channel here is something like this. Is a single wavelength that goes end to end through the optical edges of an all optical subnetwork. If there is a fiber cut. For instance, here. So this fiber got broken essentially. The entire optical channel would be lost. Okay, won't work anymore. Okay. So at this point, there's no way to for for this element, which is the node down the downstream node with respect to the.

To the failure, to send defect indicators relying on an optical channel overhead, so the pilot tone, okay? Because the optical channel is down as well as the the pilot tone, okay? On the contrary, in this situation, the only signaling at the optical in the optical domain that we can use to forward the defect indicator is the optical supervisory channel.

Okay, because this one is available on a per fiber level, so that's the the means that we can use essentially for sending the FEC indicator. Okay, that is three level. Of course, instead we can always rely on on electrical. To propagate defect indicator in other optical subnetworks. Finally, if we want to monitor the health status of a customer or an element.

Oh sorry, of a customer, we can rely this time on optical power in the in the pilot tone, and instead, as you see, we cannot use the optical supervisory channel because OCH is not associated with any specific customer. Okay, while the pilot tone is on a per lambda basis, meaning that keeping monitoring the optical power of the specific pilot tone in this case, it provides to the network operator.

An understanding of what is the quality of the service that is provisioning to a specific client, and of course we can be even more specific by measuring the bit error rate, the time relying, of course, on electrical overhead. Okay. Okay. So this ends this part on optical network. So I'm going to close the slide, but before doing it, I would ask you if everything is clear. If you have questions.

Okay, very pleased. What's up? Okay. Okay, so let's move on the second the second topic that we study together in this part. That is multi-protocol label switching, or in a nutshell, MPLS. Okay, that's the way we will refer to it. Let me say that now we are we have we are leaving essentially the the physical layer of the TCP IP stack and we are moving on the upper layer. Okay, now we will see in a second where we are, but.

The story that we are trying to talk about is as follow. We mention that there are different access networks, and the goal and the goal of Of a carrier, of a transport network provider, is to provide long-range connectivity to those to those networks, okay, to access networks.

This transport network will be connected to the rest of the internet, to allow those access providers to reach every global destination. Okay. Now. This transport network, in general, it is implemented. It uses the IP protocol. It's an IP network. IP network, and if you remember the very first lecture that we did together, we mentioned.

Is a IP network as a specific topology that generalizes a meshed topology composed of routers like this one that it is also named point of presence because it's the point in which customers connect to the provider, okay. And those routers are located all around the country, for instance, the case of Italy, one in Rome, the other one in Milan, and the other one in the relevant cities, and they are connected through logical IP links. That now we know that are realized actually on top of an optical network substrate in the form of lightpaths.

So the first question that could arise, I mean, if I would be in your place, I would ask myself, but why here I'm? We are relying on an IP network. If up to now we have studied optical networks that are good infrastructure to provide and to have connectivity over a wide geographical area, so that's the point.

So why we do not simply interconnect access networks directly with an optical network? That's the the point. I don't know if the question is clear. Okay. So what could be the answer for for this question? There are different reasons. There are routing, what routing? It's a part of the problem. Routing in general, complex functions is a big part of of the problem. The first, the the first problem is scalability. Scalability, what means? It means the number of customers that I can accommodate on my infrastructure.

Okay, we mentioned that an optical network it works according to WDM, so wavelength division multiplexing. And nowadays the number of optical channels that we can create over a single fiber is limited to ninety six, which is the DWDM spectrum, where the D means dense WDM, which means that we have.

Really, let's say that we have created lots of optical channels over a single fiber, but it's limited to 96. Okay, while the number of access provider it can be much higher than 96. Okay, so the idea is we use an electrical technology, for instance. IP Internet Protocol IP Network to multiplex statistical multiplex not static multiplex as in the case of an optical network different access providers and when we have created a big aggregated traffic demand remember this word that I use in the very first lecture.

Once we have created an aggregated traffic demand, at this point we can use lightpath to move this big single demand. So those access provider they essentially multiplex single customers into a single flow. Okay, and the role of the P network is to create a big aggregated traffic demand that now has you know the the magnitude to.

Exploit the the potential the bandwidth that a single wavelength allows, okay, and it drastically reduces the number of customers that a single optical network has to has to serve, okay. So this is the main reason for not For having, let's say, an intermediate player that we call internet service provider that is the general use IP technology, instead of directly interfacing access network with an optical network. Okay, I hope that this concept is clear. And after that, of course, as your colleague mentioned.

Since IP is working purely in the electrical domain, if I had to realize complex functions and complex services, this is the right place for doing it. Indeed, those customers, so the access networks, generally, they of course ask for end-to-end connectivity. But the let's say set of potential services that they might be interested of, it's much bigger than simply end-to-end connectivity. And that's why IP is not enough, and why MPLS technology was put in place, specifically.

Some things, some word about IP networks. I'm pretty sure you are already familiar with some keywords about IP IP network. Is connectionless. I'm pretty sure that all of you have heard, in their life, that IP networks are connectionless, which essentially means.

That an IP source doesn't need to communicate to to to tell to the network that is about to send a data packet. If I'm a source and I need to send a packet, I simply send it, okay, without doing typical things of a connection-oriented network, which means ask the permission to the network and ask for the creation of an end-to-end tunnel.

Okay, so IP is like this. If I need to send something, I simply send it. Okay. For this reason, we say that IP networks use statistical multiplexing. What does it mean statistical multiplexing? Compared to what we have seen in the optical network, in which every single resource link was divided into channels, wavelength, or time slots in case of TDM, and those resources were assigned to a single user, in this case, and that allowed us to separate the different communication flows. In this case, instead, we allow the users to send data without reserving any resource. It's a little bit like if you go for having lunch with your friends at a restaurant, and if you call the restaurant before going, you are actually reserving the table, so you are sure that when you arrive, you will be served immediately.

Okay, but the point is that maybe you call the the restaurant and the restaurant is full, so you don't eat. It's a blocking event. On statistical multiplexing, instead, it relies on a different concept that is I'm not gonna book, not gonna call the restaurant. Simply go in there, and eventually, if a table is free, I'm gonna get lunch immediately.

Otherwise, I will wait. That's why in IP networks we have buffers into the routers to store packets that needs to be served and wait for being served. So, in one hand, this improves efficiency in the usage of the resources. On the other hand, instead, it creates side effects.

Like, for instance, longer waiting time, which are also stochastic, meaning probabilistic. So we are not sure how long it will take for us to be served, and that's main problem. And the second problem is that if I arrive and the waiting room, let's say, is full, I will be lost. So packet drop is the second big problem of statistical multiplexing networks. Okay.

For this reason, a third word that generally is associated with IP is best effort. Best effort means this is the type of service that IP networks generally provide, and best effort means no guarantee, no guarantee about the performance you will get as a customer. For instance.

If you are a multimedia, sorry, a real time application, you have no guarantee that you will receive a minimum amount of bandwidth that most of the time is required to run those applications, as well as it's not guaranteed that your packet will be delivered within a maximum time. Okay, maximum end delay is another important quality of service parameter for certain type of applications, specifically the real time ones. Imagine yourself doing a phone call on the internet, and your voice arrives with two, two, three seconds.

Of delay would make the application unusable at all. Okay, so it's the classical case in which instead the application would like to have some guarantees, but the IP network is best for it. Okay, some other keywords. Is shortest path. It uses the shortest path. Okay, what it means? Let me use the slides. Okay. Imagine that this is the network topology, and we need to find the path, so the sequence of hops that packets have to pass through.

To go from ingress to egress, okay. Over this graph, we compute the route generally according to a least cost policy, which means minimize the in general the amount of hops, the number of hops that we do, okay. Shortest path means this, okay. And what is the side effect of a shortest path policy? Let's see it concretely with an example. So let's assume that the shortest path that is selected to send traffic from this node A to this node B is this one.

Okay, and this traffic demand, now, it's getting bigger and bigger, and the reason is simple. Node A is a point of presence that provides connectivity to access networks in which the users are very intensive, very active. Okay, so they produce a lot of traffic.

So this traffic demand, aggregated traffic demand, grows very much. Okay, if this happen, those links here, they might undergo congestion events. Congestion, you know, is the situation in which the amount of traffic that is provided, the demand, exceed the capacity of the single link.

The dot point causes a drop in performance because if a link becomes congested, the end sorry the the queuing delay which you can roughly model this way. So average queuing delay over the. Who the demand say demand? So this figure shows the traffic demand computed as the ratio between the offered demand and the capacity. While here there is the average queueing delay, and we know that.

the the behavior is like this, at the beginning if the demand is low, the the queueing delay is negligible or limited, but as as soon as the the demand grows too much over a threshold, at this point the waiting time in the queue gets to infinite, or even worse, there is packet loss. Okay.

So how do we connect this this reasoning on on the shortest path? Because if there is this traffic flow that is overloading that this part of the network, we might want to redirect the traffic flow below. Okay, so that you see that here there was a part of the network that was unused, so the capacity was not used. But if we to do this, we need to make this new path to be the shortest path. Okay, so it was not flexible. And.

Is destination based? Okay. What does it mean, destination based? Well, it means that nodes, routers, essentially, to select the output interface. They relay on the destination address, IP destination address, longest prefix matching. I guess is a rule that you have heard. Okay, it means that if this node for instance receives an incoming packet, what it does is to inspect the destination address and based on the destination address, it selects the output port.

In our example, the for a packet that is destined to the North B, the output port would be this one if we want to steer the traffic over the shortest path. Okay. Now, the union of these two things. Shortest path and destination-based forwarding is, in one hand, one of the reasons for the success of the IP for the IP networks. On the other, is a very limited, limited thing in terms of flexibility. Why?

Because a shortest path tend to let's say tend to overlap somehow. I try to give you the idea. This is still the the network graph of the previous example, and here in blue there are reported different shortest paths. Okay, from this node to this, from this node to this, and so on so forth. Okay, this node here is the destination or the route for the so-called reverse path tree, which is a specific structure, graph structure.

Having as root the destination node, and having links arcs belonging to a shortest path from any node of the graph and the root. Okay, so by construction is simply the union of all the shortest paths between all the possible network nodes. To word the root node, okay, is clear. This now you see that the property of this reverse path tree is that it's a tree. This is the main property. But as a consequence, what we have is that if two shortest paths meet in a middle node, from now on, from the meeting point on.

They will go together. Okay, there's no way to make the the two paths to diverge, for two reasons. First, because for subpath optimality, if the shortest path from this node to the destination passes through this node, it means that the shortest path from this node to this is entirely contained on the longer path.

So just to give you the example, if people living in Rome to go to Milan, they pass through Bologna, okay, and from Bologna they they go directly to Milan. It's because from Bologna to Milan the shortest way is the direct way. And the second point is that if we arrive at a digital node, there's no way to distinguish between the two incoming flows because we only look at the destination.

Okay. Other example to to clarify this aspect. So imagine that here we have H3, and this is our H1 and H2. So the shortest path are as follows. There is a blue flow that follows this path, and a red flow that follows this path. Okay. But what we have said, if blue and red meet in this node.

Okay, after that they are forced to follow the same path. Okay, and once more, let's assume that one of these two flows it gets bigger inside the blue, for instance. Now, let me do a step back. First of all, let's better understand why those node those two flows cannot be separated anymore, because in this node.

This router here, there will be a forwarding table that essentially is built like this. Destination and next hop. Okay. This is the forwarding table. It works according to a match and action paradigm, where the destination is the matching key. And the action specifies forward toward a specific neighbor. Okay. Now the point is that either for the blue and for the red, the key, the searching key is the same. That is the destination host H3. So the action cannot be different. Imagine that this is router R3.

The action it will be for both of them, okay. So that's why I'm saying if two if two paths meet in an intermediate node, there's no way to let them follow different routes to go to the destination because we would like instead to redirect, let's say this flow here.

Maybe an alternative path, that is this one. But to do this, we should manipulate the link weights in such a way that other path it will be more convenient. Okay, which is a complex problem. So IP has all these problems: best effort, connectionless, destination based, and shortest path. Okay, it doesn't allow modern network to be to be flexible in providing different services. What services? Well, first of all, to ensure quality of service treatment on different traffic flows.

We mentioned that there are different applications and some of them might have requirements specifically on delay or on minimum bandwidth. Okay. But in in the case of IP, all the flows get the same type of service, which is best effort, no guarantee. Okay. Furthermore, we would like also to have the possibility to provide more complex services. Among the different services, we will study three. The first one is the creation of virtual private networks.

The second one is so-called traffic engineering. So how we can manipulate the routing so to better exploit the capacity, and finally to provide fast restoration mechanisms, which means to fastly react to network failure. These three different services.

Let's say it's not unfeasible, but it's extremely hard and not efficient to be provided through a classical IP network. That's why here instead we introduce this MPLS technology. That from a from a stack point of view, it can be seen as implemented in between the layer three and the layer two.

Over an over network. That's why we generally refer to MPLS as a layer two point five technology because it's in between layer two and layer three. And the main one of the main reason for introducing MPLS is to turn the IP network that is generally a connectionless environment into a connection oriented. Okay.

Because once more, the rule of thumb is that if you want to provide quality of service to users, you need to let the user reserve the the resources ahead of time. Once more, if you want to organize a lunch with your friends and you want that as as soon as you join the restaurant you get served immediately, the only way you have is to call and reserve.

Book a table. If you don't do it, you cannot expect to be the first to eat. In our example, at the same time here, if the requirement is I want to differentiate, provide different services with some guarantees to my users, I must ask the users to reserve resources beforehand. Okay.

This slide shows the let's say transition from a simple IP network. So this is the used to be actually the typical stack of an IP network, essentially based on first generation optical network with time division multiplexing, the physical layer, the point to point protocol layers two, and finally IP layers three.

Moving to new generation. Actually, we are beyond this stack with the advent of segment routing. By the way, all optical network at the level zero, if you want, with WDM. On top of it, we have internet, classic internet, MPLS. So to provide this fine grain control over the single client flows, and finally IP layer for best effort traffic. Okay, why going toward a connection oriented? Why going toward a connection oriented?

I mentioned because we want users to communicate to the network that they are about to send traffic in such a way I can organize myself to provide and to ensure quality of service. A connection oriented network. We we just we have just seen an example in case of the optical network.

End-to-end, via structured by a point-to-point logical link. So the idea is that this router is not believes to be directly connected to this other one. Okay. So this is the abstraction that we create. This is just an abstraction because as for the as we did previously, we know.

That in the underlay there is an interior infrastructure that physically forwards the packet from the ingress to the egress. But from a high level point of view, we can think that the network has a mesh of end-to-end tunnels. So what I'm saying is that in this example.

We can create, and this is a tunnel. We can create this abstraction that is a tunnel. Now we don't know exactly how it is mapped with the underlying topology. But what we know is simply from the from this node perspective is that if we inject some traffic into this tunnel, whatever is the path it will follow, the exit point it will be this one. Okay, so this is the abstraction that we create, and this tunnel needs to be set up.

How can we create the the how does it work the forwarding in the in the tunnel? Okay, it is based on this concept here that is a label. Here is termed virtual circuit identifier. Okay, and each node that is a switch. Has a switching table that is done this way. The switching table, switching table, is still a matching table, but this time is divided into two logical parts.

There is ingress and egress information. Okay. In the ingress part, okay, let me use this. We look at what at the incoming interface and on the ID of the connection. Okay. And based on the incoming interface and on the ID of the connection, we we have an output interface and potentially different ID. Okay, let's see the example. So.

We want to create this abstraction, end-to-end tunnel. And actually, this abstraction is mapped on top of a network in which switches are equipped with a match-action table, like the one I have just described. Ingress and egress. In ingress, we have a pair of information, which is ingress interface and identifier of the connection. On the output, instead, we have the out interface, which will be the interface from which packets are sent out.

And yet unidentified for the connection. Okay. So on every single switch of the path, we have to insert an entry that enforces the steering of the traffic over the selected path. In our example, this packet enters this node through interface one. Having a 26 as label, so here it is. I have an entry that matches against this packet. Ingress interface one, label 26, and the action is send the packet out through interface four.

You see, having a label twelve, okay. Now the packets arrive because it's still a hop by hop network, so this packet arrives on this next node, which instead has a table like this. It gets received from interface two, having a label twelve. So this rule.

Two, and the action is send the packet out through port four, having a label five. Okay. Now, this is the underlying mechanism for the data plane, meaning that packets are processed according to this match and action table. The very first thing that we should notice is that we are no longer looking at the destination address.

Okay, meaning that we move, we shift the paradigm from destination based to flow based, meaning that a switching architecture like this is capable of selecting a specific action for a specific path for every single flow. If I have two flows exchange between the same pair of machines, give you an example.

My network is capable of steering these two traffic flows over completely different paths. Example: Host one and host two. There is a network in between, and there are two different applications, client-server applications, that are executing between these machines.

This is the first application, and this is the second one. So let's assume that the blue application, for instance, has latency requirements, is sensitive to latency, while the second one, instead, it needs high bandwidth. Okay. In IP, red and blue packets would leave this machine having the same source IP address because the host machine is this one. As well as the destination address, it will be the same because the server processes they are running in the same host machine.

Okay, so no way to let blue and green, blue and red packets to follow different paths. In case of IP, here instead in a connection oriented packet network, what we can do is to create two different end tunnels, one that is. Crafted, let's say, to accommodate the red flow, which has certain requirements in terms of bandwidth. On the contrary, I can create another tunnel with different pattern, different properties, that instead tries to meet the requirement of the blue application that is latency.

You can think the backbone network that is eaten by the cloud there, having maybe a longer path passing through high capacity links, and that would be suitable for the red application that asks for bandwidth, but it's not good for the blue because I mentioned it's a longer path. On the contrary, there might be a let's say shorter path in terms of geographical distance, meaning.

Delay that passes through low capacity links. In this case, the blue path would be suitable for the blue application, but not for the red. IP it would choose one of the two and provide best effort to the two applications, meaning that one of the two will be unsatisfied or maybe both. Okay. Here instead, since our infrastructure is capable of.

Provisioning a service at the flow level. At this point, we can serve both. While, I mean, not guaranteeing because we are not talking about guarantees, but trying to meet the expectation of the application. Okay. And you see, in one hand, this is possible.

Because of the fact that we are moving from destination based to flow based switching, having non-trivial paths, and the second thing is that we are no longer interested in shortest path. Because once more, I let you notice that the starting point and the end point they are exactly the same. So if I compute the shortest path between these two machines for the blue and for the red, I would end up having the same path. Okay, that's why this is another let's say rule of IP that we don't like and we want to put aside.

When we talk about quality of service, okay. Here there is, if you want a better representation of the same concept, let's have a look again. So the abstraction with the two tunnels, Ethernet tunnels. That passes through the same physical domain from the same pair of ingress and egress. Okay, my example was even more stressed because also the host and the source and the destination were the same machine. Okay, but the concept is the same. The idea is that the two tunnels follow different path and they simply will have a different identifier so that from a network perspective they are completely different paths.

Okay. Well, we are talking about tunneling and why do we need to insert MPLS? So tunneling, as the name suggests, not as the name suggests. My mind is like this, maybe not for you, but in general, when I want to perform tunneling, what I have to do, and you did with Pietro actually, so also in your mind, you have to perform encapsulate.

Right, so you have to take whatever the red host generated and encapsulate it in something else that allows you to implement the tunnel. Okay, now I'm telling you that the outer header it will be an MPLS one. Indeed, if I go back on the stack, what we are saying is that if we want to turn an IP network, transparent, into a connection-oriented environment, what we have to do is to Tunnel IP packet with MPLS, meaning encapsulate an IP packet into an MPLS header, so that we create this end-to-end abstraction. That's why it's in between. I mentioned earlier, but actually, let's say this is the state of the art. Most of the today's transport network they operate according to this network stack with MPLS and IP.

It's an IP over MPLS network. That's the way it is referred. But we are moving toward a new generation of transport network that instead removes MPLS and it changes it with segment routing. Okay, that is a new technology having even a let's say a smaller stack.

Once more advertisement. If you are interested in segment routing, maybe just by the name, program of all networks second semester, and we see all the different properties and full services that you can realize over an over a segment routing. Okay. So far questions? Need for clarification.

What's up? Tokyo. Okay. This is a scheme that represents the logical internal of an MPLS node. An MPLS node, as always, as all the network devices, it can be from a logical point of view divided into two main parts. In one hand there is the control component, and in the other hand instead there is the forwarding component. This is something you are already familiar with. IP routers they have control plane routing protocols OSPF, for instance. You did it in the lab, and forwarding element instead.

Routing table with the destination address longest prefix matching and select the output. This is essentially the the two ingredient of a router. For an MPLS network node instead the classification still holds, meaning that we have a control and a forwarding component. But what concerns the control component.

Apart from the classical routing protocols, we also find a relevant protocol that is called RSVP. There is indicated the reservation protocol. We will see it later on in detail. That is the protocol that allows for the setup of an MPLS tunnel. Okay. Always remember that what we see, what we have seen.

In the optical network is still holds also in case of MPLS. If whenever I have to establish that connection and to create that tunnel, I need a signal in protocol to create the tunnel. Once more, what you expect to find there? There will be a request message and something that reserve resources over the.

Elements of the selected path, so that's why this protocol is called reservation, because while setting up the tunnel, we also reserve resources for the flow that will be served through that through that tunnel. And the switching, as we have seen, no longer relying on a destination address, but instead we will look at this new concept that is the label.

So we are not any more assigning a unique identifier to every destination as we used to do in IP networks with IP addresses, but we assign these unique identifiers then instead are called labels. Okay, and of course at this point the table, as we have seen, it will rely on the label to select the action.

Okay, let's have a look at the MPLS header and it is composed. Is this one okay? Also named as shim header, MPLS. It's just thirty-two bit, so quite short, four byte. The per twenty-first bit. Most significant one, they are used to encode the label. Now the label, what it is? Well, it's just a number, nothing more than that. Whatever combination of those twenty bits can be converted into a decimal number. This is the label, okay.

TC okay we don't use it I mean in this course but traffic class it's in case we want to create a tunnel for a specific traffic class as the name suggests related to value or service the no low load density traffic or other requirements that traffic might have can be encoded with this three bit.

This S is is a flag that is called bottom of stack, because as we will see, we can create nested tunnels. Like this. Okay, so this is these are nested tunnels. Now, can we create nested tunnels? This is a tunnel that transports another tunnel. Well, performing multiple layer of encapsulation. So it means that in MPLS is allowed to have the same packet carrying.

Many of these MPLS headers. So to help the node to understand what is the next protocol, there is this bottommost stack as flag that will be zero for all the for the outermost and for the outer MPLS header, and will be one instead for the inner one. Which means that if you see This flag be equal one, the next protocol it will be IP. Okay. Okay, so header, the name is multi protocol label switching. For what concern the two last two.

Words, label switching. We understand clearly the the meaning because essentially we perform switching according to a label. So that that's why it's called this way. But what about MP that stands for multi protocol? These two words try to remind us that this protocol is very is very transparent. Why? Well, because it can be used with whatever type of layer two.

And layer three technology, it can be can be put in between of any possible two protocols. Here is an example of the very first generation of net, not transport network. This one, which I I told you that essentially these are called POS, Packet over SONET.

Is this part is two layers is what we call first generation of optical network using optical network only for transmission and doing all the intelligent things in electrical domain using time division multiplexing. So essentially, point to point protocol at layer two and over this old generation of network we can put here MPLS in between IP and point to point protocol or.

We can use MPLS also in the context of a more recent implementation of the network, having Ethernet at layer two and IP at layer three. So there is, you know, possibility to use multiple protocols at layer two, but let me say the same holds also at layer three. We can change IP v4 or IP v6. Doesn't imply that MPLS won't work. It will work in any case.

Okay. Okay. So we are running out of time. There are four minutes left, but I would stop here, not introducing other topics. Asking you first if you have needs of clarification. Okay. Good. The bad news for you is that on Friday we will have theoretical classes again. Okay. No more practical lectures up to the end of the semester.

Okay, so from now on, all the Fridays we will have theoretical classes. Okay, okay, bye bye.
