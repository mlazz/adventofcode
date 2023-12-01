const { run } = require('../../utils');
const { day, year } = require('./env');

// Part 1
const part1 = input => {
    const numeric = input.map(line => {
        const numbers = line.replace(/\D/gi, '');
        return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`, 10);
    });
    // console.log(numeric);
    return numeric.reduce((a, b) => a + b, 0);
};
run(part1, 'Solution 1', {
    day,
    year,
    // testFile: 'test1.txt',
    // useRawInput: true
});

// Part 2
const nums = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
const regex = new RegExp(`(${Object.keys(nums).join(')|(')})`);

// this approach won't work because there can be '9eightwonkt' in input -> first 'digit' from the right is 'two'
// part2_wrong goes from left to first replace all spelled values (matching 'eight' and ignoring 'wo') before finding first and last digit
const part2_wrong = input => {
    const numeric = input.map(l => {
        let line = l;
        while (line.match(regex)?.length) {
            line = line.replace(regex, (match) => nums[match]);
        }
        const numbers = line.replace(/\D/gi, '');
        return Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
    });

    return numeric.reduce((a, b) => a + b, 0);
};


// Reddit to the rescue...
const findFirstDigit = str => {
    if (!isNaN(str[0])) { return str[0]; }
    if (str.startsWith('one')) { return 1; }
    if (str.startsWith('two')) { return 2; }
    if (str.startsWith('three')) { return 3; }
    if (str.startsWith('four')) { return 4; }
    if (str.startsWith('five')) { return 5; }
    if (str.startsWith('six')) { return 6; }
    if (str.startsWith('seven')) { return 7; }
    if (str.startsWith('eight')) { return 8; }
    if (str.startsWith('nine')) { return 9; }

    return findFirstDigit(str.slice(1));
}

const findLastDigit = str => {
    if (!isNaN(str.at(-1))) { return str.at(-1); }
    if (str.endsWith('one')) { return 1; }
    if (str.endsWith('two')) { return 2; }
    if (str.endsWith('three')) { return 3; }
    if (str.endsWith('four')) { return 4; }
    if (str.endsWith('five')) { return 5; }
    if (str.endsWith('six')) { return 6; }
    if (str.endsWith('seven')) { return 7; }
    if (str.endsWith('eight')) { return 8; }
    if (str.endsWith('nine')) { return 9; }

    return findLastDigit(str.slice(0, -1));
}

const part2 = input => {
    const numbers = input.map(line => Number(`${findFirstDigit(line)}${findLastDigit(line)}`));
    return numbers.reduce((a, b) => a + b, 0);
}


run(part2, 'Solution 2', {
    day,
    year,
    // testFile: 'test2.txt',
    // useRawInput: true
});
