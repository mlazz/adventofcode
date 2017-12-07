const init = input => {
    console.log('part1: ');
    console.log('part2: ');
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

const file = 'test.txt';
// const file = 'input.txt';
openFile(file, init);