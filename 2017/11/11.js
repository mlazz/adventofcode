const init = input => {
    const parseDirs = dirs => {
        // common directions
        const common = {
            n: ['nw', 'ne'],
            ne: ['n', 'se'],
            se: ['ne', 's'],
            s: ['se', 'sw'],
            sw: ['nw', 's'],
            nw: ['sw', 'n'],
            negate1: ['n', 's'],
            negate2: ['ne', 'sw'],
            negate3: ['nw', 'se']
        };
        Object.keys(common).forEach(cdir => {
            const dir1 = common[cdir][0],
                dir2 = common[cdir][1],
                one = dirs[dir1] || 0,
                two = dirs[dir2] || 0;

            if (one && two) {
                const min = Math.min(one, two);

                dirs[dir1] -= min;
                dirs[dir2] -= min;

                // negate directions
                if (!cdir.includes('negate')) {
                    dirs[cdir] += min;
                }
            }
        });

        return dirs;
    };

    const part1 = input => {
        let dirs = {
            n: 0,
            ne: 0,
            se: 0,
            s: 0,
            sw: 0,
            nw: 0
        };
        input.split(',').forEach(dir => {
            dirs[dir] += 1;
        });

        dirs = parseDirs(dirs);

        return Object.values(dirs).reduce((a, b) => a + b);
    };

    const part2 = input => {
        let distance = 0,
            dirs = {
                n: 0,
                ne: 0,
                se: 0,
                s: 0,
                sw: 0,
                nw: 0
            };
        input.split(',').forEach(dir => {
            dirs[dir] += 1;
            dirs = parseDirs(dirs);

            const dist = Object.values(dirs).reduce((a, b) => a + b);
            if (dist > distance) {
                distance = dist;
            }
        });

        return distance;
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

// const file = '2017/11/test.txt';
const file = '2017/11/input.txt';
openFile(file, init);