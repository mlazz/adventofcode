const { run } = require('../../utils');
const { day, year } = require('./env');

// Part 1

const bag = {
    red: 12,
    green: 13,
    blue: 14
};
const solution1 = input => {
    return input.map(line => {
        const parts = line.split(': ');
        const sets = parts[1].split('; ');

        const impossibleGames = sets.some(set => {
            const cubes = set.split(', ');

            // are there any impossible games
            const imGames = cubes.some(cube => {
                const [number, color] = cube.split(' ');
                return bag[color] < Number(number);
            });

            return imGames;
        });

        // return game id
        return impossibleGames ? 0 : Number(parts[0].replace('Game ', ''));
    })
    .reduce((a, b) => a + b, 0);
};
run(solution1, 'Solution 1', {
    day,
    year,
    // testFile: 'test1.txt',
    // useRawInput: true
});

// Part 2
const solution2 = input => {
    return input.map(line => {
        const parts = line.split(': ');
        const sets = parts[1].split('; ');

        const min = {
            red: 0,
            green: 0,
            blue: 0,
        };
        sets.forEach(set => {
            const cubes = set.split(', ');
            cubes.forEach(cube => {
                const [number, color] = cube.split(' ');
                if (min[color] < Number(number)) {
                    min[color] = Number(number);
                }
            });
        });

        return min.red * min.green * min.blue;
    })
    .reduce((a, b) => a + b, 0);
};
run(solution2, 'Solution 2', {
    day,
    year,
    // testFile: 'test2.txt',
    // useRawInput: true
});
