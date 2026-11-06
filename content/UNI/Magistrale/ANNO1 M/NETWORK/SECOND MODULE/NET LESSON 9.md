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

Optical fibers transmit information using light, which is an electromagnetic wave.

- Frequency (f): the number of oscillations (cycles) the light wave completes per second, measured in Hertz (Hz).
    
- Wavelength (λ): the physical distance occupied by one complete oscillation (cycle) of the wave, measured in meters.
    
- Bit rate: the amount of digital information transmitted per second, measured in bits per second (bps).
    

Frequency and wavelength are inversely proportional: as frequency increases, wavelength decreases.

![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20330%2090%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cline%20x1%3D%2210%22%20y1%3D%2244%22%20x2%3D%22320%22%20y2%3D%2244%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.2%22%20stroke-dasharray%3D%224%204%22%2F%3E%3Cpath%20d%3D%22M12%2044%20L13%2037.52952387243698%20L14%2031.5%20L15%2026.322330470336315%20L16%2022.349364905389034%20L17%2019.851854342773294%20L18%2019%20L19%2019.851854342773294%20L20%2022.34936490538903%20L21%2026.32233047033631%20L22%2031.5%20L23%2037.529523872436975%20L24%2044%20L25%2050.47047612756302%20L26%2056.49999999999999%20L27%2061.677669529663675%20L28%2065.65063509461096%20L29%2068.1481456572267%20L30%2069%20L31%2068.1481456572267%20L32%2065.65063509461096%20L33%2061.67766952966369%20L34%2056.500000000000014%20L35%2050.47047612756304%20L36%2044.00000000000001%20L37%2037.529523872436975%20L38%2031.5%20L39%2026.322330470336315%20L40%2022.34936490538904%20L41%2019.851854342773294%20L42%2019%20L43%2019.85185434277329%20L44%2022.34936490538902%20L45%2026.322330470336322%20L46%2031.500000000000007%20L47%2037.52952387243698%20L48%2043.99999999999999%20L49%2050.470476127563%20L50%2056.49999999999998%20L51%2061.67766952966366%20L52%2065.65063509461098%20L53%2068.14814565722669%20L54%2069%20L55%2068.1481456572267%20L56%2065.65063509461098%20L57%2061.67766952966368%20L58%2056.500000000000036%20L59%2050.470476127563025%20L60%2044.000000000000014%20L61%2037.529523872437%20L62%2031.499999999999986%20L63%2026.322330470336336%20L64%2022.34936490538903%20L65%2019.851854342773294%20L66%2019%20L67%2019.851854342773297%20L68%2022.349364905389017%20L69%2026.322330470336286%20L70%2031.5%20L71%2037.529523872436975%20L72%2043.99999999999994%20L73%2050.470476127562996%20L74%2056.49999999999997%20L75%2061.67766952966369%20L76%2065.65063509461095%20L77%2068.1481456572267%20L78%2069%20L79%2068.1481456572267%20L80%2065.65063509461096%20L81%2061.67766952966372%20L82%2056.5%20L83%2050.47047612756299%20L84%2044.00000000000002%20L85%2037.52952387243705%20L86%2031.50000000000003%20L87%2026.32233047033631%20L88%2022.349364905389056%20L89%2019.851854342773294%20L90%2019%20L91%2019.851854342773287%20L92%2022.349364905389038%20L93%2026.322330470336283%20L94%2031.499999999999915%20L95%2037.52952387243701%20L96%2043.99999999999998%20L97%2050.47047612756303%20L98%2056.49999999999997%20L99%2061.677669529663625%20L100%2065.65063509461095%20L101%2068.1481456572267%20L102%2069%20L103%2068.14814565722672%20L104%2065.650635094611%20L105%2061.67766952966372%20L106%2056.50000000000001%20L107%2050.47047612756299%20L108%2044.00000000000002%20L109%2037.52952387243705%20L110%2031.500000000000036%20L111%2026.322330470336315%20L112%2022.349364905389017%20L113%2019.851854342773297%20L114%2019%20L115%2019.851854342773283%20L116%2022.349364905389034%20L117%2026.32233047033634%20L118%2031.49999999999999%20L119%2037.52952387243692%20L120%2043.99999999999997%20L121%2050.47047612756294%20L122%2056.50000000000004%20L123%2061.67766952966369%20L124%2065.65063509461093%20L125%2068.1481456572267%20L126%2069%20L127%2068.14814565722669%20L128%2065.65063509461096%20L129%2061.677669529663724%20L130%2056.500000000000014%20L131%2050.47047612756308%20L132%2044.00000000000012%20L133%2037.529523872436975%20L134%2031.500000000000043%20L135%2026.32233047033638%20L136%2022.349364905389066%20L137%2019.8518543427733%20L138%2019%20L139%2019.851854342773308%20L140%2022.34936490538899%20L141%2026.322330470336272%20L142%2031.499999999999986%20L143%2037.529523872437%20L144%2044.00000000000006%20L145%2050.47047612756294%20L146%2056.49999999999996%20L147%2061.677669529663675%20L148%2065.65063509461098%20L149%2068.14814565722672%20L150%2069%20L151%2068.14814565722672%20L152%2065.65063509461098%20L153%2061.67766952966379%20L154%2056.49999999999994%20L155%2050.47047612756309%20L156%2044.000000000000036%20L157%2037.52952387243698%20L158%2031.50000000000012%20L159%2026.32233047033626%20L160%2022.34936490538907%20L161%2019.8518543427733%20L162%2019%20L163%2019.851854342773258%20L164%2022.349364905388985%20L165%2026.32233047033627%20L166%2031.49999999999998%20L167%2037.529523872437%20L168%2043.99999999999987%20L169%2050.47047612756293%20L170%2056.49999999999995%20L171%2061.677669529663675%20L172%2065.65063509461098%20L173%2068.14814565722668%20L174%2069%20L175%2068.14814565722672%20L176%2065.65063509461106%20L177%2061.6776695296638%20L178%2056.49999999999994%20L179%2050.470476127562925%20L180%2044.00000000000004%20L181%2037.52952387243699%20L182%2031.49999999999997%20L183%2026.32233047033639%20L184%2022.34936490538907%20L185%2019.851854342773304%20L186%2019%20L187%2019.851854342773255%20L188%2022.34936490538898%20L189%2026.32233047033639%20L190%2031.49999999999997%20L191%2037.52952387243699%20L192%2044.00000000000004%20L193%2050.470476127562925%20L194%2056.49999999999994%20L195%2061.677669529663675%20L196%2065.65063509461089%20L197%2068.14814565722668%20L198%2069%20L199%2068.14814565722668%20L200%2065.65063509461098%20L201%2061.677669529663675%20L202%2056.49999999999995%20L203%2050.4704761275631%20L204%2044.00000000000005%20L205%2037.529523872437%20L206%2031.500000000000135%20L207%2026.322330470336393%20L208%2022.349364905389073%20L209%2019.85185434277335%20L210%2019%20L211%2019.8518543427733%20L212%2022.34936490538907%20L213%2026.32233047033626%20L214%2031.49999999999997%20L215%2037.52952387243698%20L216%2043.99999999999986%20L217%2050.47047612756292%20L218%2056.49999999999994%20L219%2061.67766952966355%20L220%2065.65063509461098%20L221%2068.14814565722672%20L222%2069%20L223%2068.14814565722672%20L224%2065.65063509461098%20L225%2061.677669529663675%20L226%2056.500000000000114%20L227%2050.47047612756311%20L228%2044.00000000000006%20L229%2037.52952387243717%20L230%2031.500000000000135%20L231%2026.322330470336272%20L232%2022.34936490538899%20L233%2019.851854342773308%20L234%2019%20L235%2019.8518543427733%20L236%2022.349364905388978%20L237%2026.322330470336254%20L238%2031.499999999999964%20L239%2037.529523872436805%20L240%2043.99999999999985%20L241%2050.47047612756291%20L242%2056.500000000000085%20L243%2061.67766952966366%20L244%2065.65063509461096%20L245%2068.14814565722672%20L246%2069%20L247%2068.14814565722672%20L248%2065.65063509461098%20L249%2061.67766952966381%20L250%2056.500000000000114%20L251%2050.47047612756312%20L252%2044.00000000000024%20L253%2037.529523872437004%20L254%2031.49999999999999%20L255%2026.322330470336276%20L256%2022.34936490538908%20L257%2019.851854342773308%20L258%2019%20L259%2019.851854342773297%20L260%2022.34936490538897%20L261%2026.322330470336126%20L262%2031.499999999999957%20L263%2037.52952387243714%20L264%2044.00000000000002%20L265%2050.470476127562904%20L266%2056.500000000000085%20L267%2061.67766952966366%20L268%2065.65063509461088%20L269%2068.14814565722672%20L270%2069%20L271%2068.14814565722676%20L272%2065.65063509461098%20L273%2061.67766952966382%20L274%2056.49999999999997%20L275%2050.47047612756312%20L276%2043.999999999999886%20L277%2037.52952387243701%20L278%2031.50000000000015%20L279%2026.322330470336283%20L280%2022.34936490538908%20L281%2019.851854342773358%20L282%2019%20L283%2019.85185434277325%20L284%2022.349364905389056%20L285%2026.322330470336247%20L286%2031.500000000000107%20L287%2037.52952387243696%20L288%2043.999999999999844%20L289%2050.470476127563074%20L290%2056.49999999999993%20L291%2061.67766952966353%20L292%2065.65063509461096%20L293%2068.14814565722666%20L294%2069%20L295%2068.14814565722673%20L296%2065.65063509461089%20L297%2061.67766952966369%20L298%2056.50000000000013%20L299%2050.470476127562954%20L300%2044.00000000000007%20L301%2037.52952387243719%20L302%2031.5%20L303%2026.32233047033641%20L304%2022.349364905389173%20L305%2019.85185434277331%20L306%2019%20L307%2019.851854342773294%20L308%2022.349364905388967%20L309%2026.322330470336368%20L310%2031.499999999999947%20L311%2037.52952387243678%20L312%2044.000000000000014%22%20stroke%3D%22%23398CC9%22%20stroke-width%3D%222%22%20fill%3D%22none%22%2F%3E%3Ctext%20x%3D%22165%22%20y%3D%2285%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22middle%22%3ETime%20%E2%86%92%3C%2Ftext%3E%3C%2Fsvg%3E)
![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20340%20142%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cline%20x1%3D%2212%22%20y1%3D%2279%22%20x2%3D%22328%22%20y2%3D%2279%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.25%22%20stroke-dasharray%3D%224%204%22%2F%3E%3Cpath%20d%3D%22M12%2079%20Q36%2015%2060%2079%20T108%2079%20T156%2079%20T204%2079%20T252%2079%20T300%2079%20T348%2079%22%20stroke%3D%22%23398BCC%22%20stroke-width%3D%223%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2236%22%20y1%3D%2247%22%20x2%3D%22132%22%20y2%3D%2247%22%20stroke%3D%22%23D18B43%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M43%2042L36%2047L43%2052M125%2042L132%2047L125%2052%22%20stroke%3D%22%23D18B43%22%20stroke-width%3D%222%22%20fill%3D%22none%22%2F%3E%3Cline%20x1%3D%2236%22%20y1%3D%2247%22%20x2%3D%2236%22%20y2%3D%2247%22%20stroke%3D%22%23D18B43%22%2F%3E%3Ctext%20x%3D%2284%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20fill%3D%22%23D18B43%22%20font-weight%3D%22600%22%3E%CE%BB%3C%2Ftext%3E%3Ccircle%20cx%3D%2236%22%20cy%3D%2247%22%20r%3D%224%22%20fill%3D%22%23398BCC%22%2F%3E%3Ccircle%20cx%3D%22132%22%20cy%3D%2247%22%20r%3D%224%22%20fill%3D%22%23398BCC%22%2F%3E%3Ctext%20x%3D%2284%22%20y%3D%22129%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3EOne%20complete%20cycle%3C%2Ftext%3E%3C%2Fsvg%3E)




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

###### Using multiplexing
is repeated also upper on the notes, where should i write it? use your common sense please and correct it
An optical carrier owns a physical fiber between two cities, but many customers want to use it.

We need a mechanism that allows several independent traffic flows to share the same transmission medium.

- Time Division Multiplexing (TDM)
	- TDM, connections receive recurring time slots.
- Frequency Division Multiplexing (FDM)
	- FDM, they receive different portions of the frequency spectrum.
- and Wavelength Division Multiplexing (WDM).
	- allows multiple optical channels, using different wavelengths, to share the same physical fiber
this example is for TDM, the limits are two
- if is static a slot remain to the user for example A also if is not using it
- if we have more incoming connection we can occur in a processing bootlneck,
![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20336%20126%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3E%3Ctext%20x%3D%228%22%20y%3D%2220%22%3EFrame%201%3C%2Ftext%3E%3Ctext%20x%3D%22174%22%20y%3D%2220%22%3EFrame%202%3C%2Ftext%3E%3C%2Fg%3E%3Crect%20x%3D%228%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%234A87CA%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%234A87CA%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%2233%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EA%3C%2Ftext%3E%3Crect%20x%3D%2262%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%232D9A7B%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%232D9A7B%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%2287%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EB%3C%2Ftext%3E%3Crect%20x%3D%22116%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%23CF9851%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%23CF9851%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%22141%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EC%3C%2Ftext%3E%3Crect%20x%3D%22170%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%234A87CA%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%234A87CA%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%22195%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EA%3C%2Ftext%3E%3Crect%20x%3D%22224%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%232D9A7B%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%232D9A7B%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%22249%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EB%3C%2Ftext%3E%3Crect%20x%3D%22278%22%20y%3D%2232%22%20width%3D%2250%22%20height%3D%2250%22%20rx%3D%224%22%20fill%3D%22%23CF9851%22%20fill-opacity%3D%22.2%22%20stroke%3D%22%23CF9851%22%20stroke-width%3D%221.6%22%2F%3E%3Ctext%20x%3D%22303%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22currentColor%22%3EC%3C%2Ftext%3E%3Cpath%20d%3D%22M8%2096H166M174%2096H332M8%2092V100M166%2092V100M174%2092V100M332%2092V100%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221%22%2F%3E%3Ctext%20x%3D%22170%22%20y%3D%22119%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3ETime%20%E2%86%92%3C%2Ftext%3E%3C%2Fsvg%3E)

the FDM example
![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20336%20130%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M15%20103H325%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%2F%3E%3Cpath%20d%3D%22M44%20103%20Q62%20100%2066%2067%20Q80%20-1%2094%2067%20Q98%20100%20116%20103%20Z%22%20stroke%3D%22%234A87CA%22%20stroke-width%3D%222%22%20fill%3D%22%234A87CA%22%20fill-opacity%3D%22.17%22%2F%3E%3Ctext%20x%3D%2280%22%20y%3D%2221%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2211%22%3EUser%20A%3C%2Ftext%3E%3Ctext%20x%3D%2280%22%20y%3D%22119%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2210%22%3Ef%E2%82%81%3C%2Ftext%3E%3Cpath%20d%3D%22M133%20103%20Q151%20100%20155%2067%20Q169%20-1%20183%2067%20Q187%20100%20205%20103%20Z%22%20stroke%3D%22%232D9A7B%22%20stroke-width%3D%222%22%20fill%3D%22%232D9A7B%22%20fill-opacity%3D%22.17%22%2F%3E%3Ctext%20x%3D%22169%22%20y%3D%2221%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2211%22%3EUser%20B%3C%2Ftext%3E%3Ctext%20x%3D%22169%22%20y%3D%22119%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2210%22%3Ef%E2%82%82%3C%2Ftext%3E%3Cpath%20d%3D%22M222%20103%20Q240%20100%20244%2067%20Q258%20-1%20272%2067%20Q276%20100%20294%20103%20Z%22%20stroke%3D%22%23CF9851%22%20stroke-width%3D%222%22%20fill%3D%22%23CF9851%22%20fill-opacity%3D%22.17%22%2F%3E%3Ctext%20x%3D%22258%22%20y%3D%2221%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2211%22%3EUser%20C%3C%2Ftext%3E%3Ctext%20x%3D%22258%22%20y%3D%22119%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%20font-size%3D%2210%22%3Ef%E2%82%83%3C%2Ftext%3E%3Ctext%20x%3D%22328%22%20y%3D%22120%22%20text-anchor%3D%22end%22%20font-size%3D%229%22%20fill%3D%22currentColor%22%3EFrequency%20%E2%86%92%3C%2Ftext%3E%3C%2Fsvg%3E)
for the WDM Wavelength
is similar to FDM but optical channels are identified by their wavelengths
The idea is to transmit multiple independent optical signals through the same physical fiber.

Each signal uses a different wavelength.

![482](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20340%20165%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M10%2030H98%22%20stroke%3D%22%23D27155%22%2F%3E%3Cpath%20d%3D%22M10%2072H98%22%20stroke%3D%22%23299980%22%2F%3E%3Cpath%20d%3D%22M10%20114H98%22%20stroke%3D%22%234D85D1%22%2F%3E%3C%2Fg%3E%3Crect%20x%3D%2298%22%20y%3D%2245%22%20width%3D%2273%22%20height%3D%2256%22%20rx%3D%2210%22%20fill%3D%22%23E7E2F4%22%20stroke%3D%22%239885BB%22%2F%3E%3Ctext%20x%3D%22134.5%22%20y%3D%2270%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-weight%3D%22600%22%20fill%3D%22%23493C6F%22%3EWDM%3C%2Ftext%3E%3Ctext%20x%3D%22134.5%22%20y%3D%2284%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20fill%3D%22%23493C6F%22%3EMUX%3C%2Ftext%3E%3Cg%20stroke-width%3D%222.5%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M98%2030L98%2056%22%20stroke%3D%22%23D27155%22%2F%3E%3Cpath%20d%3D%22M98%2072H92%22%20stroke%3D%22%23299980%22%2F%3E%3Cpath%20d%3D%22M98%20114V90%22%20stroke%3D%22%234D85D1%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M171%2072H328%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%2213%22%20stroke-linecap%3D%22round%22%20opacity%3D%22.35%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M171%2066Q188%2056%20205%2066T239%2066T273%2066T307%2066T328%2066%22%20stroke%3D%22%23D27155%22%2F%3E%3Cpath%20d%3D%22M171%2072H328%22%20stroke%3D%22%23299980%22%2F%3E%3Cpath%20d%3D%22M171%2078Q188%2088%20205%2078T239%2078T273%2078T307%2078T328%2078%22%20stroke%3D%22%234D85D1%22%2F%3E%3C%2Fg%3E%3Cg%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3E%3Ctext%20x%3D%2212%22%20y%3D%2220%22%3E%CE%BB%E2%82%81%3C%2Ftext%3E%3Ctext%20x%3D%2212%22%20y%3D%2262%22%3E%CE%BB%E2%82%82%3C%2Ftext%3E%3Ctext%20x%3D%2212%22%20y%3D%22104%22%3E%CE%BB%E2%82%83%3C%2Ftext%3E%3Ctext%20x%3D%22248%22%20y%3D%2241%22%20text-anchor%3D%22middle%22%3EShared%20optical%20fiber%3C%2Ftext%3E%3Ctext%20x%3D%22170%22%20y%3D%22148%22%20text-anchor%3D%22middle%22%3EThree%20simultaneous%20optical%20channels%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E)
Imagine three lasers emitting light at different wavelengths:

- Laser A transmits using \(\lambda_1\).
    
- Laser B transmits using \(\lambda_2\).
    
- Laser C transmits using \(\lambda_3\).
    

An optical multiplexer combines their signals into a single physical fiber.

All three optical signals propagate simultaneously.

At the destination, a demultiplexer separates them again.
Yes, in the sense that the fiber carries electromagnetic signals at different wavelengths.

However, the professor's red, green and blue analogy is a simplification.

The wavelengths commonly used in long-distance optical networks, especially around 1550 nm, are infrared and invisible to the human eye.

So it's better to think of different optical carrier wavelengths rather than literally visible colored light.
WDM increases the aggregate capacity of an optical fiber by allowing multiple independent optical signals, each using a different wavelength, to be transmitted simultaneously.

Optical channels and channel spacing

The separation between the center frequencies of adjacent carriers is called channel spacing.

For example, the slide illustrates channels separated by 100 GHz.
(picture on slide 9)

### Optical network first and second generation (exam question)
##### Electrical domain vs Optical domain
before explaining the move from the first to the second we need to distinguish this two elements
Imagine a conventional IP router receiving an Ethernet frame containing an IP packet.

The router can perform several operations:

1. Receive the signal and recover digital data.
    
2. Store the packet in an electronic buffer.
    
3. Read the destination IP address.
    
4. Perform a lookup in its forwarding table.
    
5. Select the output interface.
    
6. Forward the packet.
    

All these operations are possible because the packet is represented as digital information that electronic circuits can process.

Now imagine receiving an optical signal directly from a fiber.

Instead of processing a packet represented as bits in electronic memory, we're dealing with an electromagnetic wave: light.

As the professor explains, we cannot simply manipulate light as if it were a binary string stored in RAM.

For example, we cannot use a conventional CPU to directly inspect the IP destination address inside an optical waveform.

do an svg version of this and compact the text upper
![[Pasted image 20261106225552.png]]

the professor for explain this do a sketch like that, with a node of the network that has an electical and an optical part do me a better svg version thanks and delete this one
![[Pasted image 20261106225729.png]]

###### First generation
In the first generation, optical fibers were primarily used as a high-capacity transmission medium.
The more complex operations, including switching and multiplexing, were largely performed electronically.
At an intermediate electronic switching node, the signal undergoes:

O → E → O, meaning:

- Optical to Electrical (O/E): convert the received optical signal into an electrical representation.
    
- Electronic processing: perform the necessary multiplexing or switching operations.
    
- Electrical to Optical (E/O): convert the signal back into light for transmission over the next fiber.

this is a limitation because if we aggregate multiple signals we have a limit by the electronic processing this is a bottleneck
![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20338%20118%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%2211%22%20y%3D%2235%22%20width%3D%2270%22%20height%3D%2247%22%20rx%3D%228%22%20fill%3D%22%23E4EFF8%22%20stroke%3D%22%237DA6C9%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%2223%22%20width%3D%2299%22%20height%3D%2270%22%20rx%3D%229%22%20fill%3D%22%23F5E7D7%22%20stroke%3D%22%23C79B65%22%2F%3E%3Crect%20x%3D%22257%22%20y%3D%2235%22%20width%3D%2270%22%20height%3D%2247%22%20rx%3D%228%22%20fill%3D%22%23E4EFF8%22%20stroke%3D%22%237DA6C9%22%2F%3E%3Cg%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22%23304D65%22%20font-weight%3D%22600%22%3E%3Ctext%20x%3D%2246%22%20y%3D%2255%22%3ESource%3C%2Ftext%3E%3Ctext%20x%3D%2246%22%20y%3D%2269%22%3ERome%3C%2Ftext%3E%3Ctext%20x%3D%22292%22%20y%3D%2255%22%3EDestination%3C%2Ftext%3E%3Ctext%20x%3D%22292%22%20y%3D%2269%22%3EMilan%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22%2372502F%22%3E%3Ctext%20x%3D%22169.5%22%20y%3D%2245%22%3EO%20%E2%86%92%20E%20%E2%86%92%20O%3C%2Ftext%3E%3Ctext%20x%3D%22169.5%22%20y%3D%2261%22%3EElectronic%3C%2Ftext%3E%3Ctext%20x%3D%22169.5%22%20y%3D%2275%22%3Eswitching%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20d%3D%22M81%2058H120M219%2058H257%22%20stroke%3D%22%234A86C4%22%20stroke-width%3D%223%22%2F%3E%3Ctext%20x%3D%22101%22%20y%3D%2249%22%20font-size%3D%2210%22%20fill%3D%22currentColor%22%20text-anchor%3D%22middle%22%3EFiber%3C%2Ftext%3E%3Ctext%20x%3D%22238%22%20y%3D%2249%22%20font-size%3D%2210%22%20fill%3D%22currentColor%22%20text-anchor%3D%22middle%22%3EFiber%3C%2Ftext%3E%3Ctext%20x%3D%22169%22%20y%3D%22110%22%20font-size%3D%2210%22%20fill%3D%22currentColor%22%20text-anchor%3D%22middle%22%3EIntermediate%20node%20converts%20the%20signal%20for%20processing%3C%2Ftext%3E%3C%2Fsvg%3E)
###### Second generation
The second generation introduces a fundamental architectural change.

Instead of using optics exclusively for transmission, we also perform certain network functions directly in the optical domain.

These are often called wavelength-routed optical networks.

The key idea is to establish optical connections called lightpaths and switch them through intermediate optical devices.
![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20338%20113%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%228%22%20y%3D%2231%22%20width%3D%2273%22%20height%3D%2248%22%20rx%3D%228%22%20fill%3D%22%23E4EFF8%22%20stroke%3D%22%237DA6C9%22%2F%3E%3Crect%20x%3D%22121%22%20y%3D%2231%22%20width%3D%2295%22%20height%3D%2248%22%20rx%3D%229%22%20fill%3D%22%23E1EFE8%22%20stroke%3D%22%2379B39B%22%2F%3E%3Crect%20x%3D%22257%22%20y%3D%2231%22%20width%3D%2273%22%20height%3D%2248%22%20rx%3D%228%22%20fill%3D%22%23E4EFF8%22%20stroke%3D%22%237DA6C9%22%2F%3E%3Cg%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-weight%3D%22600%22%3E%3Ctext%20x%3D%2244%22%20y%3D%2259%22%20fill%3D%22%23304D65%22%3ERome%3C%2Ftext%3E%3Ctext%20x%3D%22169%22%20y%3D%2251%22%20fill%3D%22%2327674F%22%3EOptical%3C%2Ftext%3E%3Ctext%20x%3D%22169%22%20y%3D%2265%22%20fill%3D%22%2327674F%22%3Eswitching%3C%2Ftext%3E%3Ctext%20x%3D%22293%22%20y%3D%2259%22%20fill%3D%22%23304D65%22%3EMilan%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20d%3D%22M81%2043H121M216%2043H257%22%20stroke%3D%22%23D87B55%22%20stroke-width%3D%222.5%22%2F%3E%3Cpath%20d%3D%22M81%2054H121M216%2054H257%22%20stroke%3D%22%232F987A%22%20stroke-width%3D%222.5%22%2F%3E%3Cpath%20d%3D%22M81%2065H121M216%2065H257%22%20stroke%3D%22%234B86C8%22%20stroke-width%3D%222.5%22%2F%3E%3Ctext%20x%3D%22169%22%20y%3D%22101%22%20text-anchor%3D%22middle%22%20font-size%3D%2210%22%20fill%3D%22currentColor%22%3EWavelength%20channels%20forwarded%20optically%3C%2Ftext%3E%3C%2Fsvg%3E)


>[!example]- example
> 
> Suppose three wavelengths arrive at an optical switching node:
> 
> \(\lambda_1,\lambda_2,\lambda_3\)
> 
> The node may be configured to forward:
> 
> - \(\lambda_1\) toward Milan;
>     
> - \(\lambda_2\) toward Bologna;
>     
> - \(\lambda_3\) toward Naples.
>     
> 
> These signals can be redirected using optical switching components.
> 
> The intermediate device does not need to inspect each individual IP packet to determine its destination.
> 
> Instead, it follows a previously configured optical connection.
> (compact this example thanks)

Which devices make second-generation networks possible?

- OLT — Optical Line Terminal
	- used at the endpoint of optical transport link. has different function like multiplexing demultiplaxing and signal adaptation
- OXC — Optical Cross-Connect
	- an optical switching device used to connect incoming optical channels to outgoing links
- OADM — Optical Add/Drop Multiplexer
	- add selected wavelength channels to a fiber or remove selected channels while allowing others to pass through

picture from slide 13

![484](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20sans-serif%22%20font-weight%3D%22430%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20330%20140%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%22119%22%20y%3D%2244%22%20width%3D%2292%22%20height%3D%2261%22%20rx%3D%2212%22%20fill%3D%22%23DDEBF7%22%20stroke%3D%22%23568CC3%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20x%3D%22165%22%20y%3D%2268%22%20text-anchor%3D%22middle%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20fill%3D%22%23284D70%22%3EOXC%3C%2Ftext%3E%3Ctext%20x%3D%22165%22%20y%3D%2283%22%20text-anchor%3D%22middle%22%20font-size%3D%2210%22%20fill%3D%22%23284D70%22%3EOptical%20switch%3C%2Ftext%3E%3Cpath%20d%3D%22M12%2074H119%22%20stroke%3D%22%233989BD%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M109%2068L119%2074L109%2080%22%20fill%3D%22none%22%20stroke%3D%22%233989BD%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M211%2074H316%22%20stroke%3D%22%2325977D%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M306%2068L316%2074L306%2080%22%20fill%3D%22none%22%20stroke%3D%22%2325977D%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2251%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3EIncoming%20link%3C%2Ftext%3E%3Ctext%20x%3D%22267%22%20y%3D%2251%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3EOutgoing%20link%3C%2Ftext%3E%3Ctext%20x%3D%2264%22%20y%3D%22115%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3EFrom%20Rome%3C%2Ftext%3E%3Ctext%20x%3D%22267%22%20y%3D%22115%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3EToward%20Milan%3C%2Ftext%3E%3C%2Fsvg%3E)

Incoming link: a link through which a signal enters a network node.

Outgoing link: a link through which a signal leaves a network node.


