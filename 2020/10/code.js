const { run } = require('../../utils');
const { day, year } = require('./env');
const testFileName = 'test.txt';
const useTestFile = false;
const useRawInput = false;

const outletJoltage = 0;
const builtInAdapterOverhead = 3;
const maxDiff = 3;

const part1 = input => {
    const diffs = {};
    const sorted = input.sort((a, b) => a - b);
    let current = outletJoltage;

    for (let i = 0; i < sorted.length; i++) {
        const diff = sorted[i] - current;
        diffs[diff] ? diffs[diff] += 1 : diffs[diff] = 1;
        current = sorted[i];
    }

    // device's builtin overhead is always worth a difference of builtInAdapterOverhead
    diffs[builtInAdapterOverhead] ? diffs[builtInAdapterOverhead] += 1 : diffs[builtInAdapterOverhead] = 1;

    return diffs[1] * diffs[3];
};

const part2 = input => {

};

run({ part1, part2 }, { day, year, useTestFile, testFileName, useRawInput});
