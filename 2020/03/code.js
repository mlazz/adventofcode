const { run } = require('../../utils');

const traverse = (input, right, down) => {
    const width = input[0].length;
    const height = input.length;

    let x = 0;
    let trees = 0;
    for (let y = down; y < height;) {
        x = (x + right >= width) ? x + right - width : x + right;
        if (input[y][x] === '#') { trees++; }
        y += down;
    }

    return trees;
};

const part1 = parsedInput => traverse(parsedInput, 3, 1);

const part2 = parsedInput => {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    return slopes.map(([right, down]) => traverse(parsedInput, right, down)).reduce((a, b) => a * b);
};

run({ part1, part2 });
