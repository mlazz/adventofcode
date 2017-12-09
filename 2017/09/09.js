const init = input => {
    const part1 = input => {
        const groups = input.replace(/!.{1}/g, '').replace(/<([^>]*)>/g, '');

        let level = 0,
            sum = 0;

        for (let char of groups) {
            if (char === '{') {
                level++;
                sum += level;
            }
            else if (char === '}') {
                level--;
            }
        }

        return sum;
    };

    const part2 = input => {
        let removed = 0;
        const replacer = (matches, m1) => {
            if (m1) {
                removed += m1.length;
            }

            return '';
        };
        const groups = input.replace(/!.{1}/g, '').replace(/<([^>]*)>/g, replacer);

        return removed;
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

// const file = '2017/09/test1.txt';
// const file = '2017/09/test2.txt';
// const file = '2017/09/test3.txt';
const file = '2017/09/input.txt';
openFile(file, init);