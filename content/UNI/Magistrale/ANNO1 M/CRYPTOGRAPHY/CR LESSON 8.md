### How can we construct a secure PRF?

There are three main approaches:

1. **From any OWF:** A PRF can theoretically be constructed starting from any one-way function.
    
2. **From any PRG:** We can construct a secure PRF using a secure pseudorandom generator. This is the approach studied in Lecture 8.
    
3. **Using AES:** In practice, AES is a block cipher designed to behave pseudorandomly. Its security relies on cryptanalytic evidence rather than a proof from OWFs or PRGs.
    

**Why can't we directly use a PRG as a PRF?**

- A **PRG** expands a short random seed into a longer pseudorandom string.
    
- A **PRF** uses a fixed secret key to produce pseudorandom-looking outputs for different inputs, remaining secure even under multiple chosen-input queries.
    
- Simply defining `F(x) = G(x)` is insecure because the adversary knows the public algorithm `G` and can independently calculate its output.
    

**Goal of this lecture:** Understand the **GGM construction (Goldreich–Goldwasser–Micali)**, which transforms a secure PRG into a secure PRF by using a secret key and a binary-tree construction.
