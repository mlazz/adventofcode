const init = input => {
    const zc = {};
    const progs = {};
    const canGetToZero = (prog, debug) => {
        prog = +prog;
        debugger;
        console.log(JSON.stringify(zc));
        if (prog === 0 || progs[prog].includes(0) || !!zc[prog]) {
            zc[prog] = true;
            return true;
        }

        while (progs[prog].length) {
            const p = progs[prog].shift();
            if (!!zc[p]) {
                return true;
            }
            zc[p] = p === prog ? false : canGetToZero(p, true);
            return !!zc[p];
        }

        return !!zc.length;
    };

    const part1 = input => {
        sanitize(input).forEach(line => {
            const split = line.split(' <-> ');
            if (!progs[split[0]]) {
                progs[+split[0]] = split[1].split(', ').map(p => +p);
            }
        });

        Object.keys(progs).forEach(p => {
            console.log(p, canGetToZero(p));
        });

        // console.log(zeroConnected);
    };

    const part2 = input => {

    };

    const sanitize = input => input.trim()
        .split('\n')
        .map(s => s.trim())
        .filter(n => n);

    console.log('part1:', part1(input));
    // console.log('part2:', part2(input));
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

const file = '2017/12/test.txt';
// const file = '2017/12/input.txt';
openFile(file, init);