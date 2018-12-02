const splitLines = (input, toInt) => {
    const lines = input.split('\n');

    return toInt ? lines.map(i => +i) : lines;
};

const parseInput = (inputFile) => {
    const fs = require('fs');
    const file = inputFile.filename + '.' + inputFile.ext;
    const filePath = fs.existsSync(file) ? file : process.env.YEAR + '/' + process.env.DAY + '/' + file;
    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data, inputFile.intValues);
};

const run = (inputFile, solutions) => {
    const parsedInput = parseInput(inputFile);

    Object.keys(solutions).forEach(part => {
        const fn = solutions[part];
        const answer = typeof fn === 'function' && fn(parsedInput);
        answer && console.log(`${part}:`, answer);
    });
};

module.exports = {
    run,
    splitLines
};
