const { run } = require('../../utils');
const inputFile = {
    filename: process.env.INPUT || 'input',
    ext: 'txt'
};

const part1 = parsedInput => {
    const mapped = parsedInput.map(l => {
        const letters = {};
        let doubles = false;
        let triples = false;

        l.split('').forEach(letter => {
            if (!letters[letter]) {
                letters[letter] = 1;
            }
            else {
                letters[letter] += 1;
            }
        });

        Object.keys(letters).forEach(l => {
            const count = letters[l];
            if (count === 2) { doubles = true; }
            if (count === 3) { triples = true; }
        });

        return { doubles, triples };
    });

    const checksum = mapped.reduce((a, b) => {
        let sumDoubles = (a.doubles || 0) + (b.doubles || 0);
        let sumTriples = (a.triples || 0) + (b.triples || 0);

        return { doubles: sumDoubles, triples: sumTriples };
    }, { doubles: 0, tribles: 0 });

    return checksum.doubles * checksum.triples;
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
