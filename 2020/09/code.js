const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = false;
const useRawInput = false;

const preambleLength = useTestFile ? 5 : 25;

const getAllAvailableSums = arr => {
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i === j) {
                continue;
            }

            const sum = arr[i] + arr[j];
            if (!sums.includes(sum)) {
                sums.push(sum);
            }
        }
    }
    return sums;
};

const evaluateCypher = (input, preambleLength) => {
    let i = preambleLength;
    while (i < input.length) {
        const preamble = [...input].splice(i - preambleLength, preambleLength);
        const sums = getAllAvailableSums(preamble);
        if (!sums.includes(input[i])) {
            return input[i];
        }

        i++;
    }

    return false;
};

const part1 = input => evaluateCypher(input, preambleLength) || 'Everything is fine...';

const part2 = input => {
    const fail = part1(input);
    let end = input.indexOf(fail);

    for (let i = 0; i < end; i++) {
        for (let j = end; j > i; j--) {
            const set = input.slice(i, j);
            const sum = set.reduce((a, b) => a + b);
            if (sum > fail) {
                continue;
            }
            if (sum < fail) {
                break;
            }
            if (sum === fail) {
                return Math.min(...set) + Math.max(...set);
            }
        }
    }
};

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
