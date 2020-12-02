const { run } = require('../../utils');

const isValidCandidate = (pass, strict) => {
    let digits = pass.toString().split('');

    let hasDouble;
    let isDecreasing;

    let streak = 1;
    let hasProperDouble;

    for (let i = 1; i < digits.length; i++) {
        const prev = digits[i - 1];
        const curr = digits[i];

        if (curr > prev) {
            if (streak === 2) {
                hasProperDouble = true;
            }
            streak = 1;
        }

        if (prev === curr) {
            hasDouble = true;
            streak++;
        }

        if (prev > curr) {
            isDecreasing = true;
            break;
        }
    }

    // check again - maybe the last pair was a proper double!!
    if (streak === 2) {
        hasProperDouble = true;
    }

    return hasDouble && !isDecreasing && (!strict || hasProperDouble);
};

const processInput = (input, strict) => {
    let output = [];
    if (process.env.TEST) {
        output = input.filter(input => isValidCandidate(input, strict));
    }
    else {
        const [ start, end ] = input.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            if (isValidCandidate(i, strict)) {
                output.push(i);
            }
        }
    }

    // console.log(output);
    return output.length;
}

const part1 = parsedInput => processInput(parsedInput);
const part2 = parsedInput => processInput(parsedInput, true);

run({ part1, part2 });
