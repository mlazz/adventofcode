const splitLines = input => {
    const lines = input.split('\n');

    if (process.env.RAW) {
        return lines;
    }

    // usually input is either integers or string - try to automagically parse integers
    return isNaN(Number(lines[0])) ? lines : lines.map(Number);
};

const parseInput = (filename) => {
    const fs = require('fs');
    const filePath = fs.existsSync(filename)
                        ? filename
                        : process.env.YEAR + '/' + process.env.DAY + '/' + filename;

    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data);
};

const run = solutions => {
    const filename = process.env.INPUT || 'input.txt';
    const parsedInput = parseInput(filename);

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
