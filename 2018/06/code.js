const { run } = require('../../utils');

const findEdge = input => {
    const reduced = input.reduce((a, b) => {
        a.x.push(b.x);
        a.y.push(b.y);
        return a;
    }, { x: [], y: [] });

    return {
        x: {
            min: Math.min(...reduced.x),
            max: Math.max(...reduced.x)
        },
        y: {
            min: Math.min(...reduced.y),
            max: Math.max(...reduced.y)
        }
    };
};

const getCoords = input => {
    return input.map(line => {
        const [ x, y ] = line.split(', ').map(Number);
        return { x, y };
    });
};
const getMatrix = input => {
    const mtx = {};
    input.forEach(coord => {

    })
}

const removeInfinite = (coords, edge) => {
    return coords.filter(c => {
        
    })
};

const part1 = parsedInput => {
    const coords = getCoords(parsedInput);
    const edge = findEdge(coords);

    const inner = removeInfinite(coords, furthest);
};

const part2 = parsedInput => {

};

run({ part1, part2 });
