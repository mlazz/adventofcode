const { run } = require('../../utils');
const inputFile = {
    filename: process.env.INPUT || 'input',
    ext: 'txt'
};

const part1 = parsedInput => {
    let doubles = 0;
    let triples = 0;

    parsedInput.forEach(l => {
        const letters = {};

        l.split('').forEach(letter => {
            letters[letter] = letters[letter] ? letters[letter] + 1 : 1;
        });

        let hasDoubles = false,
            hasTriples = false;
        Object.keys(letters).forEach(l => {
            const count = letters[l];
            if (count === 2) { hasDoubles = true; }
            if (count === 3) { hasTriples = true; }
        });

        if (hasDoubles) { doubles++; }
        if (hasTriples) { triples++; }
    });

    return doubles * triples;
};

const part2 = parsedInput => {
    let result;
    parsedInput.forEach(line => {
        if (result) {
            return;
        }

        [...parsedInput].forEach(line2 => {
            if (line === line2) { return; }

            let diff = 0;
            let diffIdx = -1;
            for (let i = 0; i < line.length; i++) {
                if (diff > 1) {
                    diffIdx = -1;
                    return;
                }

                if (line[i] !== line2[i]) {
                    diff++;
                    diffIdx = i;
                }
            }

            if (diff === 1) {
                const arr = line.split('');
                arr.splice(diffIdx, 1);
                result = arr;
            }
        });
    });

    return result.join('');
};

run(inputFile, {
    part1,
    part2
});
