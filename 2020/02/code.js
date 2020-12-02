const { run } = require('../../utils');

const part1 = parsedInput => {
    return parsedInput.filter(line => {
        const [ policy, pass ] = line.split(': ');
        const [ _, min, max, char ] = policy.match(/(\d+)-(\d+) (\D)/);
        const count = pass.split('').filter(p => p === char).length;

        return (count >= +min && count <= +max);
    }).length;
};

const part2 = parsedInput => {
    return parsedInput.filter(line => {
        const [ policy, pass ] = line.split(': ');
        const [ _, pos1, pos2, char ] = policy.match(/(\d+)-(\d+) (\D)/);
        return (pass[pos1 - 1] === char || pass[pos2 - 1] === char) && pass[pos1 - 1] !== pass[pos2 - 1];
    }).length;
};

run({ part1, part2 });
