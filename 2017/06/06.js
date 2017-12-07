const fs = require('fs');
// const file = 'test.txt';
const file = 'input.txt';
fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        throw new Error(err);
    }
    init(data);
});

const init = (input) => {
    const bank = input.split('\t').map(x => parseInt(x, 10));
    const length = bank.length;
    const used = [];
    let cycles = 0;
    let loopStart = 0;

    while (true) {
        cycles++;

        let max = Math.max(...bank);
        let idx = bank.indexOf(max);

        bank[idx] = 0;

        while (max > 0) {
            idx = (++idx === length) ? 0 : idx;
            bank[idx] += 1;
            max--;
        }

        const newState = bank.join('');
        loopStart = used.indexOf(newState);
        if (loopStart === -1) {
            used.push(newState);
        }
        else {
            break;
        }
    }

    // console.log('used: ', used);
    // console.log('bank: ', bank);
    console.log('cycles: ', cycles);
    console.log('loop size: ', cycles - (loopStart + 1));
};