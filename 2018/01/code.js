const { run } = require('../../utils');
const inputFile = {
    filename: process.env.INPUT || 'input',
    ext: 'txt',
    intValues: true
};

const part1 = parsedInput => parsedInput.reduce((a, b) => a + b);

const part2 = parsedInput => {
    let firstDuplicate = false;
    const seen = [0];
    let freq = 0;
    while (firstDuplicate === false) {
        parsedInput.reduce((a, b) => {
            if (firstDuplicate !== false) {
                return;
            }

            freq = a + b;
            if (seen.includes(freq)) {
                firstDuplicate = freq;
            }
            else {
                seen.push(freq);
            }

            return freq;
        }, freq);
    }

    return firstDuplicate;
};

run(inputFile, {
    part1,
    part2
});
