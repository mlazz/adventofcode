const init = input => {
    const getAsciiList = input => {
        const suffix = [17, 31, 73, 47, 23],
            ascii = [];

        for (let pos in input) {
            ascii.push(input.charCodeAt(pos));
        }
        ascii.push(...suffix)

        return ascii;
    };

    const getSparseHash = (lengths, rounds) => {
        let sparseHash = [...Array(256).keys()],
            current = 0,
            skip = 0;

        for (let i = 0; i < rounds; i++) {
            lengths.forEach(len => {
                if (len > 1) {
                    const tmp = [].concat(sparseHash, sparseHash);
                    let sub = tmp.splice(current, len);
                    tmp.splice(current, 0, ...sub.reverse());

                    let overflow = current + len > sparseHash.length ? (current + len - sparseHash.length) : 0;
                    if (overflow) {
                        const wrap = tmp.splice(sparseHash.length, overflow);
                        tmp.splice(0, overflow, ...wrap);
                    }

                    sparseHash = tmp.splice(0, sparseHash.length);
                }

                current += len + skip++;
                while (current > sparseHash.length) {
                    current -= sparseHash.length;
                }
            });
        }

        return sparseHash;
    };

    const getDenseHash = hash => {
        const denseHash = [];
        while (hash.length) {
            denseHash.push(hash.splice(0, 16).reduce((a, b) => a ^ b));
        }

        return denseHash;
    };

    const getHex = hash => {
        const knotHash = [];
        for (let block of hash) {
            let hex = block.toString(16);
            if (block < 16) {
                hex = '0' + hex;
            }

            knotHash.push(hex);
        }

        return knotHash.join('');
    };

    const part1 = input => {
        let list = [...Array(256).keys()],
            current = 0,
            skip = 0;
        const lengths = input.split(',').map(l => +l),
            sparseHash = getSparseHash(lengths, 1);

        return +sparseHash[0] * +sparseHash[1];
    };

    const part2 = input => {
        const ascii = getAsciiList(input),
            sparseHash = getSparseHash(ascii, 64),
            denseHash = getDenseHash(sparseHash),
            hex = getHex(denseHash);

        return hex;
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

// const file = '2017/10/test.txt';
const file = '2017/10/input.txt';
openFile(file, init);