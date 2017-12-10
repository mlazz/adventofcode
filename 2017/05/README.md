# --- Day 5: A Maze of Twisty Trampolines, All Alike ---

An urgent interrupt arrives from the CPU: it's trapped in a maze of jump instructions, and it would like assistance from any programs with spare cycles to help find the exit.

The message includes a list of the offsets for each jump. Jumps are relative: _-1_ moves to the previous instruction, and _2_ skips the next one. Start at the first instruction in the list. The goal is to follow the jumps until one leads **outside** the list.

In addition, these instructions are a little strange; after each jump, the offset of that instruction increases by _1_. So, if you come across an offset of _3_, you would move three instructions forward, but change it to a _4_ for the next time it is encountered.

For example, consider the following list of jump offsets:
    0
    3
    0
    1
    -3

Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example, these offset values will be written all on one line, with the current instruction marked in parentheses. The following steps would be taken before an exit is found:
- _(0) 3  0  1  -3_  - **before** we have taken any steps.
- _(1) 3  0  1  -3_  - jump with offset _0_ (that is, don't jump at all). Fortunately, the instruction is then incremented to _1_.
- _ 2 (3) 0  1  -3_  - step forward because of the instruction we just modified. The first instruction is incremented again, now to _2_.
- _ 2  4  0  1 (-3)_ - jump all the way to the end; leave a _4_ behind.
- _ 2 (4) 0  1  -2_  - go back to where we just were; increment _-3_ to _-2_.
- _ 2  5  0  1  -2_  - jump _4_ steps forward, escaping the maze.
In this example, the exit is reached in _5_ steps.

**How many steps** does it take to reach the exit?

Your puzzle answer was _339351_.

# --- Part Two ---

Now, the jumps are even stranger: after each jump, if the offset was +*three or more**, instead **decrease** it by _1. Otherwise, increase it by _1_ as before.

Using this rule with the above example, the process now takes _10_ steps, and the offset values after finding the exit are left as _2 3 2 3 -1_.

**How many steps** does it now take to reach the exit?

Your puzzle answer was _24315397_.

***Both parts of this puzzle are complete! They provide two gold stars: ** ***
