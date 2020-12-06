const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = false;
const useRawInput = false;

const getGroups = lines => {
    const groups = [];

    let i = 0;
    lines.forEach(line => {
        if (line === '') {
            i++;
            return;
        }

        if (!groups[i]) {
            groups[i] = {
                members: 1,
                answers: {}
            };
        }
        else {
            groups[i].members++;
        }

        line.split('').forEach(answer => {
            if (!groups[i].answers[answer]) {
                groups[i].answers[answer] = 1;
            }
            else {
                groups[i].answers[answer]++;
            }
        });
    });

    return groups;

}

const part1 = input => {
    const groups = getGroups(input);
    return groups.map(group => Object.keys(group.answers).length).reduce((a, b) => a + b);
};

const part2 = input => {
    const groups = getGroups(input);
    return groups.map(group => Object.keys(group.answers).filter(answer => group.answers[answer] === group.members).length).reduce((a, b) => a + b);
};

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
