const init = input => {
    const part1 = input => {

    };

    const part2 = input => {

    };

    console.log('part1:', part1(input));
    console.log('part2:', part2(input));
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

const file = '2017/__day__/test.txt';
// const file = '2017/__day__/input.txt';
openFile(file, init);