const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = false;
const useRawInput = false;

const rowsChars = 7;
const multiplier = 8;

const parseSeatData = str => {
    const row = parseInt(str.slice(0, rowsChars).split('').map(char => char === 'F' ? '0' : '1').join(''), 2);
    const col = parseInt(str.slice(rowsChars).split('').map(char => char === 'L' ? '0' : '1').join(''), 2);

    return { row, col, id: row * multiplier + col };
};

const part1 = input => {
    let highest = 0;
    input.forEach(line => {
        const { row, col, id } = parseSeatData(line);
        if (useTestFile) {
            console.log(`line: ${line}, row: ${row}, col: ${col}, id: ${id}`);
        }

        if (id > highest) {
            highest = id;
        }
    });

    return highest;
};

const part2 = input => {
    const sortedIds = input.map(line => parseSeatData(line).id).sort((a, b) => a - b);
    const empty = sortedIds.filter((seatId, idx) => idx !== sortedIds.length - 1 && sortedIds[idx + 1] !== seatId + 1);

    if (empty.length !== 1) {
        return 'something went wrong...'
    }

    return empty[0] + 1;
};

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
