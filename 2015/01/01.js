const init = input => {
    const part1 = input => {
        let floor = 0;
        for (let char of input) {
            floor = char === '(' ? floor + 1 : floor - 1;
        }
        return floor;
    };

    const part2 = input => {
        let floor = 0,
            position = false;
        for (let i in input) {
            const char = input[i];
            floor = input[i] === '(' ? floor + 1 : floor - 1;

            if (floor === -1) {
                position = +i + 1; // +1 because it is one-based, not zero-based
                break;
            }
        }

        return position;
    };

    const sanitize = input => input.trim()
        .split('\n')
        .map(s => s.trim())
        .filter(n => n);

    const data = sanitize(input);
    data.forEach(line => {
        console.log('part1:', part1(line));
        console.log('part2:', part2(line));
    });
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

// const file = '2015/01/test.txt';
const file = '2015/01/input.txt';
openFile(file, init);