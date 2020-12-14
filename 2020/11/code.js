const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = true;
const useRawInput = false;

class Seat {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;

        this.empty = true;
        this.willChange = false;
    }

    willChangeState = () => {
        this.willChange = true;
    }

    changeState = newState => {
        if (!this.willChange) { return; }

        this.empty = newState || !this.empty;
        this.willChange = false;
    }

    isEmpty = () => this.empty;

    getPosition = () => ({ x: this.x, y: this.y });
}

const getBoundaries = input => ({ width: input[0].length, height: input.length });

const getGrid = input => {
    const { width, height } = getBoundaries(input);

    const grid = {};
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            grid[`${i}-${j}`] = input[i][j] === '.' ? false : new Seat({ x: i, y: j });
        }
    }

    return grid;
}

const getAdjacentPositions = ({ x, y }, { width, height }) => {
    const startX = x - 1 >= 0 ? x - 1 : 0;
    const endX = x + 1 <= height ? x + 1 : height;
    const startY = y - 1 >= 0 ? y - 1 : 0;
    const endY = y + 1 <= width ? y + 1 : width;

    const adjacent = [];
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (i === x && j === y) {
                continue;
            }

            adjacent.push({ x: i, y: j });
        }
    }

    return adjacent;
};

const getFirstVisible = (pos, config, grid) => {
    const { x, y } = pos;
    const { walkX, walkY, limitX, limitY } = config;

    // something that works...
};

const getVisiblePositions = (pos, { width, height }, grid) => {
    const dirs = {
        'nw': getFirstVisible(pos, { walkX: -1, walkY: -1, limitX: 0, limitY: 0 }, grid),
        'n': getFirstVisible(pos, { walkX: 0, walkY: -1, limitX: 0, limitY: 0 }, grid),
        'ne': getFirstVisible(pos, { walkX: 1, walkY: -1, limitX: height, limitY: 0 }, grid),
        'e': getFirstVisible(pos, { walkX: 1, walkY: 0, limitX: height, limitY: 0 }, grid),
        'se': getFirstVisible(pos, { walkX: 1, walkY: 1, limitX: height, limitY: width }, grid),
        's': getFirstVisible(pos, { walkX: 0, walkY: 1, limitX: 0, limitY: width }, grid),
        'sw': getFirstVisible(pos, { walkX: -1, walkY: 1, limitX: 0, limitY: width }, grid),
        'w': getFirstVisible(pos, { walkX: -1, walkY: 0, limitX: 0, limitY: width }, grid),
    }

    return Object.values(dirs).filter(dir => dir);
};

const countOccupiedSeats = (input, considerOnlyAdjacent, minOccupied) => {
    const grid = getGrid(input);
    const seats = Object.values(grid).filter(position => !!position);

    let changed = seats.length;
    let rounds = 0;
    while (changed > 0) {
        changed = 0;
        seats.forEach(seat => {
            const isEmpty = seat.isEmpty();

            const consideredSeats = considerOnlyAdjacent
                                        ? getAdjacentPositions(seat.getPosition(), getBoundaries(input))
                                        : getVisiblePositions(seat.getPosition(), getBoundaries(input), grid);
            const actualSeats = consideredSeats.filter(adj => adj && !!grid[`${adj.x}-${adj.y}`]).map(pos => grid[`${pos.x}-${pos.y}`]);
            const occupied = actualSeats.filter(adj => !adj.isEmpty());

            if ((isEmpty && occupied.length === 0) || (!isEmpty && occupied.length >= minOccupied)) {
                seat.willChangeState();
                changed++;
            }
        });
        seats.forEach(seat => seat.changeState());
        rounds++;
    }

    return seats.filter(seat => !seat.isEmpty()).length;
}

const part1 = input => countOccupiedSeats(input, true, 4);

const part2 = input => countOccupiedSeats(input, false, 5);

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
