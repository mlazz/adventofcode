const init = input => {
    const programs = input.split('\n');
    const names = [];
    const subs = [];
    let parents = programs.filter(p => p.split(' -> ').length > 1);

    parents.forEach(p => {
        const split = p.split(/ \(\d+\) -> /);
        names.push(split[0]);
        subs.push(...split[1].split(', '));
    });

    let first = false;
    names.forEach(n => {
        if (subs.indexOf(n) === -1) {
            first = n;
            return;
        }
    });

    console.log('part1: ', first);

    // recursively check weight

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

const file = 'test1.txt';
// const file = 'input.txt';
openFile(file, init);