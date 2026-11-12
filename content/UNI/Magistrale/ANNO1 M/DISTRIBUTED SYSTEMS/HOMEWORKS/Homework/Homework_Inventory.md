# Distributed Systems Homework Inventory

References use 1-based PDF pages. The inventory includes homework slides and standalone exercise prompts presented in the decks. It counts each PDF occurrence once and treats repeated builds or solution slides as part of their original prompt. The September 2021 worked exam appendix in the failure-detection deck is outside this homework list. Unstarred homework is eligible. The numbers in “HOMEWORKS 1” and “HOMEWORKS 2” are slide headings. Difficulty is marked with literal asterisks next to individual prompts.

## PDFs checked

| PDF | Pages | Homework occurrences |
| --- | ---: | ---: |
| `DS-1819-10-Distributed_registers 2.pdf` | 65 | 5 |
| `DS-1920-07-Broadcast.pdf` | 62 | 5 |
| `DS-1920-Consensus.pdf` | 45 | 2 |
| `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 47 | 7 |
| `DS-2425-02-Models.pdf` | 103 | 10 |
| `DS-2425Failure_detection_leader_election.pdf` | 94 | 14 |
| `DS-2425Time2.pdf` | 66 | 6 |
| `DS-2526-03-Time1.pdf` | 61 | 2 |
| `DS-2627-02-Models-reviewed (1).pdf` | 101 | 8 |
| `DS-Distributed_registers.pdf` | 101 | 5 |
| `DS-Failure_detection_leader_election (1).pdf` | 79 | 11 |

## Homework

| ID | PDF | Slide/Page | Stars | Topic | Classification | Macro-category |
| --- | --- | --- | ---: | --- | --- | --- |
| H66 | `DS-1819-10-Distributed_registers 2.pdf` | 58 | 0 | (N,N) atomic registers on message passing | Representative | 34. Implementing multiwriter atomic registers across failure models |
| H67 | `DS-1819-10-Distributed_registers 2.pdf` | 59 | 0 | Message passing using (1,1) registers | Representative | 35. Simulating message passing with atomic registers |
| H63 | `DS-1819-10-Distributed_registers 2.pdf` | 61 | 0 | Exercise 4.7 — efficient (1,1) atomic register | Representative | 32. Designing an efficient single-reader atomic register |
| H64 | `DS-1819-10-Distributed_registers 2.pdf` | 63 | 0 | Exercise 4.7 follow-up — write to the only reader | Variation | 32. Designing an efficient single-reader atomic register |
| H65 | `DS-1819-10-Distributed_registers 2.pdf` | 64 | 0 | Exercise 4.6 — request identifiers and acknowledgements | Representative | 33. Justifying request identifiers in register protocols |
| H45 | `DS-1920-07-Broadcast.pdf` | 25 | 0 | Lazy Reliable Broadcast — use ◇P instead of P | Variation | 22. Checking safety and liveness under failure-detector violations |
| H47 | `DS-1920-07-Broadcast.pdf` | 41 | 0 | Majority-Ack with \|F\| = n/2 + 1 | Representative | 24. Checking quorum thresholds in uniform reliable broadcast |
| H48 | `DS-1920-07-Broadcast.pdf` | 50–51, 56 | 0 | Variation of Exercise 3.2 — Lazy RB message cost | Representative | 25. Reducing Lazy Reliable Broadcast message cost |
| H44 | `DS-1920-07-Broadcast.pdf` | 57 | 0 | Exercise 3.5 — All-Ack Uniform Reliable Broadcast | Variation | 22. Checking safety and liveness under failure-detector violations |
| H49 | `DS-1920-07-Broadcast.pdf` | 58 | 2 | Exercise 3.7: uniform reliable broadcast with ◇P and no correct majority | Excluded (2–3 stars) | — |
| H59 | `DS-1920-Consensus.pdf` | 33 | 0 | Hierarchical Consensus — remove a rank guard | Variation | 30. Testing changes to hierarchical consensus |
| H58 | `DS-1920-Consensus.pdf` | 35 | 0 | Hierarchical Uniform Consensus — BEB in place of RB | Representative | 30. Testing changes to hierarchical consensus |
| H54 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 36 | 0 | Causal order only | Variation | 27. Enumerating or completing FIFO, causal, and total delivery histories |
| H52 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 37 | 0 | Causal enumeration and a FIFO counterexample | Variation | 27. Enumerating or completing FIFO, causal, and total delivery histories |
| H51 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 38 | 0 | Combined total, causal, and FIFO delivery orders | Representative | 27. Enumerating or completing FIFO, causal, and total delivery histories |
| H56 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 39 | 0 | Exercise 3.11 — two causal delivery definitions | Representative | 28. Comparing causal delivery specifications |
| H57 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 41 | 0 | Exercise 3.12 — causal best-effort broadcast | Representative | 29. Separating causal delivery from reliable-broadcast agreement |
| H50 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 45–46 | 0 | Reliable Broadcast with a neighbor oracle | Representative | 26. Implementing reliable broadcast on a line |
| H46 | `DS-2324Ordered_communications_1_NOSOLUTION.pdf` | 47 | 0 | Exercise 4 — mixed channels and crash restrictions | Representative | 23. Leader election with heterogeneous link guarantees |
| H01 | `DS-2425-02-Models.pdf` | 35 | 0 | Model the loss of a message | Representative | 1. Modeling message loss as an event |
| H03 | `DS-2425-02-Models.pdf` | 57 | 0 | Classify the same properties and write three examples of each | Equivalent | 2. Classifying and constructing safety and liveness properties |
| H05 | `DS-2425-02-Models.pdf` | 57 | 0 | Same recovery implication | Equivalent | 3. Implication between recovery properties |
| H07 | `DS-2425-02-Models.pdf` | 57 | 0 | Same output-set specification | Equivalent | 4. Rewriting a compound specification |
| H10 | `DS-2425-02-Models.pdf` | 75 | 0 | HOMEWORKS 1 — same strengthened SL1 | Equivalent | 6. Counterexamples for strengthened delivery guarantees |
| H14 | `DS-2425-02-Models.pdf` | 75 | 1 | HOMEWORKS 1 — same fixed-memory question | Equivalent | 7. Implementing a perfect link with bounded memory |
| H12 | `DS-2425-02-Models.pdf` | 79 | 0 | Same PL1 question as the variation at p. 78 of the reviewed deck | Equivalent | 6. Counterexamples for strengthened delivery guarantees |
| H16 | `DS-2425-02-Models.pdf` | 82 | 0 | HOMEWORKS 2 — same algorithm and questions | Equivalent | 8. Stubborn delivery without a timer or an infinite loop |
| H08 | `DS-2425-02-Models.pdf` | 89 | 0 | Fairness and failed processes | Representative | 5. Adapting fairness to crash failures |
| H18 | `DS-2425-02-Models.pdf` | 95 | 0 | Same counting server | Equivalent | 9. Diagnosing a counting server over perfect links |
| H30 | `DS-2425Failure_detection_leader_election.pdf` | 29 | 0 | Minimum round duration | Representative | 17. Choosing timing bounds for heartbeat failure detectors |
| H32 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 1 | Increase and decrease the timeout | Representative | 18. Designing adaptive timeouts for an eventually perfect detector |
| H36 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Fault-tolerant mutual exclusion — code and proofs | Representative | 20. Designing fault-tolerant mutual exclusion with leader changes |
| H42 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Main Book Exercise 2.9 — construct a liveness counterexample | Variation | 22. Checking safety and liveness under failure-detector violations |
| H68 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Main Book Exercise 2.4 (book p. 67) | Needs verification | — |
| H70 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Main Book Exercise 2.6 (book p. 67) | Needs verification | — |
| H72 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Main Book Exercise 2.7 (book p. 67) | Needs verification | — |
| H74 | `DS-2425Failure_detection_leader_election.pdf` | 77 | 0 | Main Book Exercise 2.10 (book p. 68) | Needs verification | — |
| H34 | `DS-2425Failure_detection_leader_election.pdf` | 78 | 0 | Synchronous versus fail-stop | Representative | 19. Comparing solvability across system models |
| H38 | `DS-2425Failure_detection_leader_election.pdf` | 80 | 0 | Fault-tolerant mutual exclusion in fail-silent and fail-noisy models | Representative | 21. Assessing whether fault-tolerant mutual exclusion is possible |
| H40 | `DS-2425Failure_detection_leader_election.pdf` | 81 | 0 | Exercise 2.8 — safety with a faulty detector | Representative | 22. Checking safety and liveness under failure-detector violations |
| H20 | `DS-2425Failure_detection_leader_election.pdf` | 82 | 0 | Same timed-delivery question | Equivalent | 10. Bounded delivery over fair-lossy links |
| H22 | `DS-2425Failure_detection_leader_election.pdf` | 84 | 0 | Same two Cristian request–reply diagrams | Equivalent | 11. Analyzing clock synchronization |
| H23 | `DS-2425Failure_detection_leader_election.pdf` | 85 | 0 | Fully distributed synchronisation | Representative | 12. Reviewing neighbor averaging on an arbitrary graph |
| H24 | `DS-2425Time2.pdf` | 44 | 0 | Apply vector clocks | Representative | 13. Computing vector clocks from an execution |
| H25 | `DS-2425Time2.pdf` | 45 | 0 | Same vector-clock task and visibly printed claims, with a different trace | Equivalent | 13. Computing vector clocks from an execution |
| H26 | `DS-2425Time2.pdf` | 47 | 0 | Q3.1–Q3.2 — infer an execution from two observations | Representative | 14. Reconstructing an execution from vector timestamps |
| H27 | `DS-2425Time2.pdf` | 65 | 0 | Vector clocks with initially unknown IDs | Representative | 15. Designing vector clocks with unknown membership |
| H28 | `DS-2425Time2.pdf` | 65 | 2 | Vector clock follow-up: two processes share an ID | Excluded (2–3 stars) | — |
| H29 | `DS-2425Time2.pdf` | 66 | 0 | Lamport’s algorithm without FIFO | Representative | 16. Checking Lamport mutual exclusion with non-FIFO links |
| H21 | `DS-2526-03-Time1.pdf` | 60 | 0 | Cristian’s algorithm — compare timing patterns | Representative | 11. Analyzing clock synchronization |
| H19 | `DS-2526-03-Time1.pdf` | 61 | 0 | Timed delivery for surviving messages | Representative | 10. Bounded delivery over fair-lossy links |
| H02 | `DS-2627-02-Models-reviewed (1).pdf` | 56 | 0 | Safety or liveness? | Representative | 2. Classifying and constructing safety and liveness properties |
| H04 | `DS-2627-02-Models-reviewed (1).pdf` | 56 | 0 | Recovery implication | Representative | 3. Implication between recovery properties |
| H06 | `DS-2627-02-Models-reviewed (1).pdf` | 56 | 0 | Comparable output sets | Representative | 4. Rewriting a compound specification |
| H09 | `DS-2627-02-Models-reviewed (1).pdf` | 74 | 0 | HOMEWORKS 1 — strengthened stubborn delivery | Representative | 6. Counterexamples for strengthened delivery guarantees |
| H13 | `DS-2627-02-Models-reviewed (1).pdf` | 74 | 1 | HOMEWORKS 1 — fixed memory | Representative | 7. Implementing a perfect link with bounded memory |
| H11 | `DS-2627-02-Models-reviewed (1).pdf` | 78 | 0 | PL1 with process crashes | Variation | 6. Counterexamples for strengthened delivery guarantees |
| H15 | `DS-2627-02-Models-reviewed (1).pdf` | 81 | 0 | HOMEWORKS 2 — Caio’s algorithm | Representative | 8. Stubborn delivery without a timer or an infinite loop |
| H17 | `DS-2627-02-Models-reviewed (1).pdf` | 92 | 0 | Counting server | Representative | 9. Diagnosing a counting server over perfect links |
| H61 | `DS-Distributed_registers.pdf` | 85 | 0 | Regular and atomic register reads — single writer | Variation | 31. Finding legal reads in regular and atomic registers |
| H60 | `DS-Distributed_registers.pdf` | 89 | 0 | Regular and atomic register reads — multiple writers | Representative | 31. Finding legal reads in regular and atomic registers |
| H55 | `DS-Distributed_registers.pdf` | 92 | 0 | Causal order after instant t | Variation | 27. Enumerating or completing FIFO, causal, and total delivery histories |
| H53 | `DS-Distributed_registers.pdf` | 94 | 0 | Same diagram and two tasks as the variation on p. 37 of Ordered Communications | Equivalent | 27. Enumerating or completing FIFO, causal, and total delivery histories |
| H62 | `DS-Distributed_registers.pdf` | 98 | 2 | Exercise 4.8: whether regular registers require a correct majority | Excluded (2–3 stars) | — |
| H31 | `DS-Failure_detection_leader_election (1).pdf` | 28 | 0 | Same minimum-round-duration question | Equivalent | 17. Choosing timing bounds for heartbeat failure detectors |
| H33 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 1 | Same adaptive-timeout question | Equivalent | 18. Designing adaptive timeouts for an eventually perfect detector |
| H37 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Same code-and-proofs exercise; algorithm description on pp. 73–74 | Equivalent | 20. Designing fault-tolerant mutual exclusion with leader changes |
| H43 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Same assigned Exercise 2.9; statement in the text layer on p. 79 | Equivalent | 22. Checking safety and liveness under failure-detector violations |
| H69 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Main Book Exercise 2.4 (book p. 67) | Needs verification | — |
| H71 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Main Book Exercise 2.6 (book p. 67) | Needs verification | — |
| H73 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Main Book Exercise 2.7 (book p. 67) | Needs verification | — |
| H75 | `DS-Failure_detection_leader_election (1).pdf` | 75 | 0 | Main Book Exercise 2.10 (book p. 68) | Needs verification | — |
| H35 | `DS-Failure_detection_leader_election (1).pdf` | 76 | 0 | Same comparison of solvable problems | Equivalent | 19. Comparing solvability across system models |
| H39 | `DS-Failure_detection_leader_election (1).pdf` | 78 | 0 | Same fail-silent and fail-noisy questions | Equivalent | 21. Assessing whether fault-tolerant mutual exclusion is possible |
| H41 | `DS-Failure_detection_leader_election (1).pdf` | 79 | 0 | Same Exercise 2.8 | Equivalent | 22. Checking safety and liveness under failure-detector violations |

## Totals

- PDFs analyzed: 11 (824 pages).
- PDFs containing at least one inventoried prompt: 11.
- Homework occurrences identified: 75.
- One-star occurrences: 4 (2 distinct prompts across PDF versions).
- Unstarred occurrences: 68.
- Excluded 2–3-star occurrences: 3.
- Occurrences requiring manual verification: 8 (4 textbook exercises, each assigned in two PDFs). Their statements are unavailable in the archive.
- Distinct verified macro-categories: 35.

Only the visible exercise on each slide was used to establish assignment status. Exercise 2.9 is visibly assigned by number. Its matching statement is available in the text layer on `DS-2425Failure_detection_leader_election.pdf` p. 81 and `DS-Failure_detection_leader_election (1).pdf` p. 79, underneath the rendered slide for Exercise 2.8. The vector-clock statements on Time 2 pp. 44–45 follow the visible English slides.
