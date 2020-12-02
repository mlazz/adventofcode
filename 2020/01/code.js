const { run } = require('../../utils');

const part1 = parsedInput => {
    const len = parsedInput.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (i === j) { continue; }

            if (parsedInput[i] + parsedInput[j] === 2020) {
                return parsedInput[i] * parsedInput[j];
            }
        }
    }


};

// dump way of doing this, only adding another loop... but, it works, so who cares...
const part2 = parsedInput => {
    const len = parsedInput.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            for (let k = 0; k < len; k++) {
                if (i === j || i === k || j === k) { continue; }

                if (parsedInput[i] + parsedInput[j] + parsedInput[k] === 2020) {
                    return parsedInput[i] * parsedInput[j] * parsedInput[k];
                }
            }
        }
    }


};

run({ part1, part2 });
