const splitLines = (input, toInt) => {
    const lines = input.split('\n');

    return toInt ? lines.map(Number) : lines;
};

const parseInput = (filename) => {
    const fs = require('fs');
    const filePath = fs.existsSync(filename)
                        ? filename
                        : process.env.YEAR + '/' + process.env.DAY + '/' + filename;

    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data, process.env.INTVAL);
};

const run = solutions => {
    const filename = process.env.INPUT || 'input.txt';
    const parsedInput = parseInput(filename);

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
