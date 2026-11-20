Firewall definition

we will use iptables, iptables refers to netfilter has a framework, iptables gives the frontend part

###### Examples of iptables
when using iptables you have matching rule (which packet to specify for example tcp packet on port 22 ecc...) and then we also have the processed by a configured action

```Example
Accept packets of TCP port 22 coming from interface eth1
iptables -A INPUT -p tcp --dport 22 -i eth1 -j ACCEPT
(add examples from slide 5)
```

the thing before j is the action and before we have the matching rule
###### Tables and Chains
we can write tools in iptables, the rules make a chain, the chain belongs to a table (this is what i understood)
###### Packet flow inside iptables
(picture on the slides)
we can put a rule inside chains and tables with the packet passing thru
we have two different inputs from the other network and locally generated packet

###### Precisation on Tables
they are logical connection of chain
we will use only filter and nat
filter to receive input packet, forward to redirect packet not yours and other stuff i didnt have time to write also for the nat i think that it can modify port address ecc...
and we can give rules to input forward output for the filter and for nat postrouting prerouting output
is useful the slide 13 table i think we can explain better starting from it

We have the table name the function 

##### iptables syntax
in every match for basic packet filtering you can see also the `[!]` they are for the negation
