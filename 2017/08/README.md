# --- Day 8: I Heard You Like Registers ---

You receive a signal directly from the CPU. Because of your recent assistance with jump instructions, it would like you to compute the result of a series of unusual register instructions.

Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's value, the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction without modifying the register. The registers all start at 0. The instructions look like this:

    b inc 5 if a > 1
    a inc 1 if b < 5
    c dec -10 if a >= 1
    c inc -20 if c == 10

These instructions would be processed as follows:

- Because _a_ starts at _0_, it is not greater than _1_, and so _b_ is not modified.
- _a_ is increased by _1_ (to _1_) because _b_ is less than _5_ (it is _0_).
- _c_ is decreased by _-10_ (to _10_) because _a_ is now greater than or equal to _1_ (it is _1_).
- _c_ is increased by _-20_ (to _-10_) because _c_ is equal to _10_.

After this process, the largest value in any register is _1_.

You might also encounter _<=_ (less than or equal to) or _!=_ (not equal to). However, the CPU doesn't have the bandwidth to tell you what all the registers are named, and leaves that to you to determine.

**What is the largest value in any register** after completing the instructions in your puzzle input?

Your puzzle answer was _4448_.

# --- Part Two ---

To be safe, the CPU also needs to know **the highest value held in any register during this process** so that it can decide how much memory to allocate to these operations. For example, in the above instructions, the highest value ever held was _10_ (in register _c_ after the third instruction was evaluated).

Your puzzle answer was _6582_.

***Both parts of this puzzle are complete! They provide two gold stars: ** ***
