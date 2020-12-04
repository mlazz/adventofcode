const fs = require('fs');

const splitLines = (input, useRawInput) => {
    let lines = input.match(/\n/g) !== null ? input.split('\n') : input;

    if (useRawInput) {
        return lines;
    }

    if (!Array.isArray(lines)) {
        lines = [lines];
    }

    // usually input is either integers or string - try to automagically parse integers
    return isNaN(Number(lines[0])) ? lines : lines.map(Number);
};

const parseInput = ({ day, year, useTestFile, useRawInput }) => {
    const filename = useTestFile ? 'test.txt' : 'input.txt';
    const filePath = fs.existsSync(filename) ? filename : `${year}/${day}/${filename}`;

    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data.trim(), useRawInput);
};

const run = (solutions, config) => {
    const parsedInput = parseInput(config);

    Object.keys(solutions).forEach(part => {
        const fn = solutions[part];
        const start = +new Date();

        const answer = typeof fn === 'function' && fn(parsedInput);
        if (answer) {
            console.log(`${part}: ${answer} (duration: ${(+new Date() - start)} ms)`);
        }
    });
};

module.exports = {
    run,
    splitLines
};
