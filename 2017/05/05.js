const fs = require('fs');
// const file = 'test.txt';
const file = 'input.txt';
fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        throw new Error(err);
    }
    init(data);
});

const init = (input) => {
    const maze = input.split('\n').map(x => parseInt(x, 10));
    const limit = maze.length;
    let next = 0;
    let steps = 0;

    while (next < limit) {
        let value = maze[next];
        if (value >= 3) {
            maze[next]--;    
        }
        else {
            maze[next]++;
        }
        
        next += value;

        steps++;
    }

    console.log(maze.join(' '));
    console.log(steps + ' steps');
};