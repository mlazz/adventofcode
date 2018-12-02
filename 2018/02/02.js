const init = input => {
    const part1 = input => {
        const lines = input.split('\n');
        const mapped = lines.map(l => {
            const letters = {};
            let doubles = false;
            let triples = false;

            l.split('').forEach(letter => {
                if (!letters[letter]) {
                    letters[letter] = 1;
                }
                else {
                    letters[letter] += 1;
                }
            });

            Object.keys(letters).forEach(l => {
                const count = letters[l];
                if (count === 2) { doubles = true; }
                if (count === 3) { triples = true; }
            });

            return { doubles, triples };
        });

        const checksum = mapped.reduce((a, b) => {
            let sumDoubles = (a.doubles || 0) + (b.doubles || 0);
            let sumTriples = (a.triples || 0) + (b.triples || 0);

            return { doubles: sumDoubles, triples: sumTriples };
        }, { doubles: 0, tribles: 0 });

        return checksum.doubles * checksum.triples;
    };

    const part2 = input => {
        const lines = input.split('\n');
        let result;
        lines.forEach(line => {
            if (result) {
                return;
            }

            // const lines2 = [...lines];
            [...lines].forEach(line2 => {
                if (line === line2) { return; }

                let diff = 0;
                let diffIdx = -1;
                for (let i = 0; i < line.length; i++) {
                    if (diff > 1) {
                        diffIdx = -1;
                        return;
                    }

                    if (line[i] !== line2[i]) {
                        diff++;
                        diffIdx = i;
                    }
                }

                if (diff === 1) {
                    const arr = line.split('');
                    arr.splice(diffIdx, 1);
                    result = arr;
                }
            });
        });

        return result.join('');
    };

    // console.log('part1:', part1(input));
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

// const file = '2018/02/test2.txt';
const file = '2018/02/input.txt';
openFile(file, init);