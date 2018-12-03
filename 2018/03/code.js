const { run } = require('../../utils');

const part1 = parsedInput => {
    const used = {};
    parsedInput.forEach(claim => {
        const matches = claim.match(/#(\d+)\ @\ (\d+),(\d+):\ (\d+)x(\d+)?/);
        if (!matches) {
            return;
        }

        const [ full, id, left, top, width, height ] = matches.map(Number);

        for (let t = top + 1; t <= (top + height); t++) {
            for (let l = left + 1; l <= (left + width); l++) {
                if (!used[`${l}-${t}`]) {
                    used[`${l}-${t}`] = [];
                }
                used[`${l}-${t}`].push({ full, id, left, top, width, height });
            }
        }
    });

    const overlapped = Object.values(used).filter(u => u.length > 1);
    return overlapped.length;
};

const part2 = parsedInput => {
    const used = {};
    const overlapped = [];

    // build array of claim ids and check for overlapping in the process...
    const claims = parsedInput.map(claim => {
        const matches = claim.match(/#(\d+)\ @\ (\d+),(\d+):\ (\d+)x(\d+)?/);
        if (!matches) {
            return;
        }

        const [ full, id, left, top, width, height ] = matches.map(Number);

        for (let t = top + 1; t <= (top + height); t++) {
            for (let l = left + 1; l <= (left + width); l++) {
                const loc = `${l}-${t}`;
                if (!used[loc]) { used[loc] = []; }

                used[loc].push({ full, id, left, top, width, height });

                if (used[loc].length > 1) {
                    used[loc].forEach(u => {
                        if (!overlapped.includes(u.id)) {
                            overlapped.push(u.id);
                        }
                    });
                }
            }
        }

        return id;
    });

    return claims.filter(claim => !overlapped.includes(claim));
};

run({ part1, part2 });
