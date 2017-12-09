const init = input => {
    const state = {};
    let highest = 0;

    input.split('\n').forEach(line => {
        const l = line.split(' '),
            r1 = l[0],
            dir = l[1],
            change = parseInt(l[2], 10),
            r2 = l[4],
            operand = l[5],
            cond = parseInt(l[6], 10);

        if (!state[r1]) {
            state[r1] = 0;
        }
        if (!state[r2]) {
            state[r2] = 0;
        }

        const modify = ((operand === '==' && state[r2] == cond) ||
            (operand === '!=' && state[r2] !== cond) ||
            (operand === '>' && state[r2] > cond) ||
            (operand === '>=' && state[r2] >= cond) ||
            (operand === '<' && state[r2] < cond) ||
            (operand === '<=' && state[r2] <= cond));

        if (modify) {
            state[r1] += (change * (dir === 'inc' ? 1 : -1));
        }
        if (state[r1] > highest) {
            highest = state[r1];
        }
    });

    // get largest value
    console.log('part1: ', Math.max(...Object.values(state)));
    console.log('part2: ', highest);
};

const openFile = (filename, callback) => {
    const fs = require('fs');
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err.toString());
            return;
        }

        callback && callback(data);
    });
}

// const file = 'test.txt';
const file = 'input.txt';
openFile(file, init);