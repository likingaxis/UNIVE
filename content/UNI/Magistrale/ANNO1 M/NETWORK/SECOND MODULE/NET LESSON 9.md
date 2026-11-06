connectionless networks and connection oriented networks
in a connectionless network a sender can transmit data without first estabilishing a dedicated connection through the network
When your laptop sends an IP packet, it doesn't need to negotiate a new end-to-end network path before transmitting every packet.

connection oriented instead needs an estabilish before information exchange begins
TCP establishes a connection using the three-way handshake before exchanging application data.
## Why are optical networks connection-oriented?

This is an important piece of the professor's reasoning.

He asks us to consider how long a connection lasts compared with the time required to establish it.

Imagine an IP backbone that needs a logical link between Rome and Milan.

That link might remain active for months or even years.

Even if establishing the underlying optical connection takes some time, this initial setup cost becomes insignificant compared with the long lifetime of the service.

Consider the following illustrative example:![[Pasted image 20261106181232.png]]
## How is an optical connection established?

The professor describes a process that can be divided into four phases, (put here image of slide 10)

## 1

Connection request

The client asks the optical provider to establish connectivity between two endpoints, for example R1 in Rome and R2 in Milan.

## 2

Connection setup

The provider selects a route, assigns an available optical channel on each traversed link, and configures the intermediate devices.

## 3

Traffic exchange

Once the connection is established, the client can transmit information using the allocated optical resources.

## 4

Connection teardown

When the connection is no longer needed, its allocated resources can be released for other clients.

this end-to-end optical connection a specific name:
Lightpath: an optical connection established through the transport network between two endpoints.

##### Multiplexing
If an optical carrier has an expensive physical link between two cities, it doesn't want that link to support only one customer.

Instead, multiple connections should share the same link.

To achieve this, the provider needs multiplexing.

Remember that multiplexing means combining multiple signals or traffic streams so that they can share a common transmission resource.
connection-oriented networks commonly use static multiplexing
In static multiplexing, a particular resource is allocated to a connection and remains reserved until the allocation is released.

For example, a connection might receive a particular time slot or a particular frequency channel.
This differs from the statistical multiplexing discussed in Lesson 8, where traffic streams share capacity dynamically according to their transmission activity.

##### Three techniques
- Time Division Multiplexing (TDM)
	- TDM, connections receive recurring time slots.
- Frequency Division Multiplexing (FDM)
	- FDM, they receive different portions of the frequency spectrum.
- and Wavelength Division Multiplexing (WDM).
	- allows multiple optical channels, using different wavelengths, to share the same physical fiber


##### Explaining WDM better
we need to understand two properties of light
Light is an electromagnetic wave, and we can describe it using either its frequency or its wavelength.
![459](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20340%20172%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.13%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M14%2050H326M14%20125H326%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M14%2050%20Q33%2012%2052%2050%20T90%2050%20T128%2050%20T166%2050%20T204%2050%20T242%2050%20T280%2050%20T318%2050%22%20fill%3D%22none%22%20stroke%3D%22%234788C8%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M14%20125%20Q53%2087%2092%20125%20T170%20125%20T248%20125%20T326%20125%22%20fill%3D%22none%22%20stroke%3D%22%232A987F%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%3Cg%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2212%22%3EHigher%20frequency%2C%20shorter%20wavelength%3C%2Ftext%3E%3Ctext%20x%3D%2215%22%20y%3D%2291%22%3ELower%20frequency%2C%20longer%20wavelength%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20d%3D%22M33%2065H109M33%2061V69M109%2061V69%22%20stroke%3D%22%234788C8%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%2271%22%20y%3D%2280%22%20font-size%3D%2211%22%20fill%3D%22%234788C8%22%20text-anchor%3D%22middle%22%3E%CE%BB%3C%2Ftext%3E%3Cpath%20d%3D%22M53%20143H209M53%20139V147M209%20139V147%22%20stroke%3D%22%232A987F%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%22131%22%20y%3D%22159%22%20font-size%3D%2211%22%20fill%3D%22%232A987F%22%20text-anchor%3D%22middle%22%3E%CE%BB%3C%2Ftext%3E%3C%2Fsvg%3E)
Conceptual illustration: frequency and wavelength are inversely related when the wave propagation speed is fixed.

The relationship in vacuum is:

\[ c=\lambda f \]

where:

- \(c\) is the speed of light in vacuum, approximately \(3\times10^8\) m/s;
    
- \(\lambda\) (lambda) is the wavelength, measured in meters;
    
- \(f\) is the frequency, measured in hertz.
    

Rearranging:

\[ \boxed{\lambda=\frac{c}{f}} \]

Therefore, higher frequency means shorter wavelength, and lower frequency means longer wavelength.
The important relationship is that frequency and wavelength are two ways of describing an optical carrier.

A clarification: in a physical fiber, propagation speed is lower than \(c\). The formula above uses the vacuum wavelength, which is the conventional way optical carrier wavelengths are specified.
Not every wavelength propagates equally well through optical fiber.

As light travels through a fiber, its power decreases. This effect is called attenuation.

The amount of attenuation depends on the wavelength.
(picture on slide 6)
