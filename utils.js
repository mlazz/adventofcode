const openFile = (filename, part1, part2) => {
    const fs = require('fs');
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err.toString());
            return;
        }

        const answer1 = typeof part1 === 'function' && part1(data);
        const answer2 = typeof part2 === 'function' && part2(data);

        answer1 && console.log('part1:', answer1);
        answer2 && console.log('part2:', answer2);
    });
};

const splitLines = (input, toInt) => {
    const lines = input.split('\n');

    return toInt ? lines.map(i => +i) : lines;
}

module.exports = {
    openFile,
    splitLines
};
