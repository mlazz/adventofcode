const init = input => {
    const part1 = input => {
        var lines = input.split('\n');
        let count = 0;

        input.split('\n').forEach(line => {
            const words = line.split(' '),
                len = words.length,
                used = [];

            while (words.length) {
                const part = words.shift();
                if (!used.includes(part)) {
                    used.push(part);
                }
            }

            if (used.length === len) {
                count++;
            }
        });

        return count;
    };

    const part2 = input => {
        const getHash = word => {
            const hash = { total: 0 };
            for (let char of word.split('')) {
                if (!hash[char]) {
                    hash[char] = 0;
                }

                hash.total++;
                hash[char]++;
            }

            return hash;
        };

        const isAnagram = (a, b) => {
            const ha = getHash(a),
                hb = getHash(b);

            if (ha.total !== hb.total) {
                return false;
            }

            for (let char in ha) {
                if (ha[char] !== hb[char]) {
                    return false;
                }
            }

            return true;
        };

        const lines = input.split('\n');
        let count = lines.length;

        for (let line of lines) {
            const words = line.split(' ');
            let anagram = false;

            while (words.length) {
                if (anagram) {
                    break;
                }

                const word = words.shift();
                for (let next of words) {
                    if (isAnagram(word, next)) {
                        anagram = true;
                        break;
                    }
                }
            }

            if (anagram) {
                count--;
            }
        }

        return count;
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

// const file = '2017/04/test1.txt';
// const file = '2017/04/test2.txt';
const file = '2017/04/input.txt';
openFile(file, init);
