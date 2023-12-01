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

const parseInput = ({ day, year, testFile, useRawInput }) => {
    const filename = testFile || 'input.txt';
    const filePath = fs.existsSync(filename) ? filename : `${year}/${day}/${filename}`;

    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data.trim(), useRawInput);
};

const run = (fn, name, config) => {
    const parsedInput = parseInput(config);
    const start = +new Date();

    const answer = typeof fn === 'function' && fn(parsedInput);
    if (answer) {
        console.log(`${name}: ${answer} (duration: ${(+new Date() - start)} ms)`);
    }
};

module.exports = {
    run,
    splitLines
};
