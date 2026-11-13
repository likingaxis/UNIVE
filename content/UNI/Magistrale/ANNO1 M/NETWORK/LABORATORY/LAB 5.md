##### VPN
###### Private Network



###### VPN Modes
VPN clients on the gateways GW to GW basis
VPN clients on the clients End-To-End Basis
You can also have a mixure of the two
###### OPENVPN
VPN implementation on linux based on TLS framework
###### TLS
Works with PKI certificates
>[!info]- how works PKI
>adsdasadad

TLS certificates works with a chain of trust
how do i trust a CA? because we have a chain of trust
inside every certificate we have an url of the previous certificate until we reach the root
if it is the same as your local copy of the certificate is trusted
###### X 5.09 certificate format
###### openvpn architecture

encapsulation
traffic is encapsulated inside TCP or UDP
default we have UDP because if we use two TCP we will encounter more delays due to for example doubled acks
