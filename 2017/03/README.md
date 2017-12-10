# --- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

    17  16  15  14  13
    18   5   4   3  12
    19   6   1   2  11
    20   7   8   9  10
    21  22  23---> ...

While this is very space-efficient (no squares are skipped), requested data must be carried back to square _1_ (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square _1_.

For example:š
- Data from square _1_ is carried _0_ steps, since it's at the access port.
- Data from square _12_ is carried _3_ steps, such as: down, left, left.
- Data from square _23_ is carried only _2_ steps: up twice.
- Data from square _1024_ must be carried _31_ steps.

**How many steps** are required to carry the data from the square identified in your puzzle input all the way to the access port?

Your puzzle answer was _326_.

# --- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value _1_ in square _1_. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:
- Square _1_ starts with the value _1_.
- Square _2_ has only one adjacent filled square (with value _1_), so it also stores _1_.
- Square _3_ has both of the above squares as neighbors and stores the sum of their values, _2_.
- Square _4_ has all three of the aforementioned squares as neighbors and stores the sum of their values, _4_.
- Square _5_ only has the first and fourth squares as neighbors, so it gets the value _5_.

Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

    147  142  133  122   59
    304    5    4    2   57
    330   10    1    1   54
    351   11   23   25   26
    362  747  806--->   ...

What is the **first value written** that is **larger** than your puzzle input?

Your puzzle answer was _363010_.

***Both parts of this puzzle are complete! They provide two gold stars: ** ***
