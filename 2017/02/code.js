const init = input => {
    const part1 = input => {
        let sum = 0;
        input.split('\n').forEach(line => {
            line = line.split('\t').map(l => +l);
            sum += Math.max(...line) - Math.min(...line);
        });

        return sum;
    }

    const part2 = input => {
        const sum = [];
        input.split('\n').forEach(line => {
            line = line.split('\t').map(l => +l);

            line.sort((a, b) => b - a);

            while (line.length) {
                let result = false;
                const one = line.shift();

                for (let two of line) {
                    if (one / two === parseInt(one / two, 10)) {
                        result = one / two;
                        break;
                    }
                }

                if (result) {
                    sum.push(result);
                    break;
                }
            }
        });

        return sum.reduce((a, b) => a + b);
    }

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

// const file = '2017/02/test1.txt';
// const file = '2017/02/test2.txt';
const file = '2017/02/input.txt';
openFile(file, init);
