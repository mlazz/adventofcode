const init = input => {
    const part1 = input => {
        const changes = input.split('\n').map(l => +l);
        const freq = changes.reduce((a, b) => a + b);

        return freq;
    };

    const part2 = input => {
        const changes = input.split('\n').map(l => +l);
        let firstDuplicate = false;
        const seen = [0];
        let freq = 0;
        while (firstDuplicate === false) {
            changes.reduce((a, b) => {
                if (firstDuplicate !== false) {
                    return;
                }

                freq = a + b;
                if (seen.includes(freq)) {
                    firstDuplicate = freq;
                }
                else {
                    seen.push(freq);
                }

                return freq;
            }, freq);
        }

        return firstDuplicate;
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

// const file = '2018/01/test.txt';
const file = '2018/01/input.txt';
openFile(file, init);