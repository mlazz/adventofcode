const splitLines = input => {
    let lines = input.match(/\n/g) !== null ? input.split('\n') : input;

    if (process.env.RAW) {
        return lines;
    }

    if (!Array.isArray(lines)) {
        lines = [lines];
    }

    // usually input is either integers or string - try to automagically parse integers
    return isNaN(Number(lines[0])) ? lines : lines.map(Number);
};

const parseInput = filename => {
    const year = process.env.YEAR || 2020;
    const fs = require('fs');
    const filePath = fs.existsSync(filename)
                        ? filename
                        : year + '/' + process.env.DAY + '/' + filename;

    const data = fs.readFileSync(filePath, 'utf-8');

    return splitLines(data.trim());
};

const run = solutions => {
    const isTest = process.env.TEST;
    const filename = isTest ? 'test.txt' : 'input.txt';
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
