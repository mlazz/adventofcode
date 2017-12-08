var init = input => {
    // Part 1
    const map = {},
        parents = [],
        allChildren = [];

    input.split('\n').forEach(p => {
        const matches = p.match(/([\D+]+) \((\d+)\)(?: -> )?([A-Za-z, ]+)?/);
        if (!matches) {
            return;
        }

        const name = matches[1],
            children = matches[3] && matches[3].split(', ');

        map[name] = {
            weight: parseInt(matches[2], 10),
            children: children
        };

        children && parents.push(name);
        children && allChildren.push(...children);
    });

    let first = false;
    parents.forEach(n => {
        if (!n.children) {
            false;
        }

        if (!allChildren.includes(n)) {
            first = n;
            return;
        }
    });

    console.log('part1:', first);

    // Part 2
    const getDiff = () => {
        let found = false;

        const getWeightRecursive = (name) => {
            const weight = [];
            const result = {};
            if (map[name].children) {
                map[name].children.forEach(c => {
                    const w = getWeightRecursive(c);
                    result.diff = w.diff;
                    result.unbalanced = w.unbalanced;

                    weight.push(w.total);
                });

                const max = Math.max(...weight),
                    min = Math.min(...weight);
                let diff = Math.max(...weight) - Math.min(...weight);

                if (diff !== 0 && !found) {
                    result.unbalanced = map[name].children[weight.indexOf(max)];
                    result.diff = diff;

                    found = {
                        program: result.unbalanced,
                        weight: map[result.unbalanced].weight,
                        diff: diff,
                        corrected: map[result.unbalanced].weight - diff
                    };
                }
            }
            
            weight.push(map[name].weight);
            result.total = weight.length === 1 ? weight[0] : weight.reduce((a, b) => a + b);

            return result;
        };

        getWeightRecursive(first);
        return found;
    }

    const diff = getDiff();
    console.log('part2:', diff.corrected);
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