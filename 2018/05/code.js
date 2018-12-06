const { run } = require('../../utils');

const reactPolymer = (polymer, chars) => {
    while(true) {
        const len = polymer.length;
        chars.forEach(char => {
            polymer = polymer.replace(RegExp(`(${char}${char.toUpperCase()}|${char.toUpperCase()}${char})`, 'g'), '');
        });
        if (polymer.length === len) {
            break;
        }
    }

    return polymer.length;
};

const part1 = parsedInput => {
    const chars = Array.from(new Set(parsedInput.toLowerCase().split('')));
    return reactPolymer(parsedInput, chars);
};

const part2 = parsedInput => {
    const chars = Array.from(new Set(parsedInput.toLowerCase().split('')));
    const mapped = chars.map(char => {
        let polymer = parsedInput.replace(RegExp(`[${char}${char.toUpperCase()}]`, 'g'), '');
        return reactPolymer(polymer, chars);
    });

    return Math.min(...mapped);
};

run({ part1, part2 });
