const { run } = require('../../utils');

const getManhattanDistance = (x, y) => Math.abs(x) + Math.abs(y);

const increaseCount = (grid, id, wire, steps = 0) => {
    if (id === '0x0' || steps === 0) {
        return;
    }

    if (!grid[id]) {
        grid[id] = { wires: [], steps: {} };
    }
    if (!grid[id].wires.includes(wire)) {
        grid[id].wires.push(wire);
    }
    if (!grid[id].steps[wire]) {
        grid[id].steps[wire] = steps;
    }
}

let grid, intersections;

const getGridAndIntersections = input => {
    if (grid && intersections) {
        return { grid, intersections };
    }

    grid = {};
    const paths = input.map(line => line.split(','));
    paths.forEach((moves, wire) => {
        let x = 0;
        let y = 0;
        let steps = 0;

        moves.forEach(move => {
            const dir = move.substr(0, 1);
            const dist = +move.substr(1, move.length - 1);

            if (dir === 'R') {
                for (let i = x; i < x + dist; i++) {
                    increaseCount(grid, `${i}:${y}`, wire, steps);
                    steps++;
                }
                x += dist;
            }
            else if (dir === 'U') {
                for (let i = y; i < y + dist; i++) {
                    increaseCount(grid, `${x}:${i}`, wire, steps);
                    steps++;
                }
                y += dist;
            }
            else if (dir === 'L') {
                for (let i = x; i > x - dist; i--) {
                    increaseCount(grid, `${i}:${y}`, wire, steps);
                    steps++;
                }
                x -= dist;
            }
            else if (dir === 'D') {
                for (let i = y; i > y - dist; i--) {
                    increaseCount(grid, `${x}:${i}`, wire, steps);
                    steps++;
                }
                y -= dist;
            }
        });
    });

    intersections = Object.keys(grid).filter(id => grid[id].wires.length === 2);

    return { grid, intersections };
}

const part1 = parsedInput => {
    const { intersections } = getGridAndIntersections(parsedInput);

    const distances = intersections.map(loc => {
        const [ x, y ] = loc.split(':');
        return getManhattanDistance(x, y);
    }).sort((a, b) => a - b);

    return (distances[0] === 0) ? distances[1] : distances[0];
};

const part2 = parsedInput => {
    const { grid, intersections } = getGridAndIntersections(parsedInput);

    const distances = intersections
                        .map(id => Object.values(grid[id].steps).reduce((a, b) => a + b, 0))
                        .sort((a, b) => a - b);

    return (distances[0] === 0) ? distances[1] : distances[0];
};

run({ part1, part2 });
