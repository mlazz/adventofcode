const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = false;
const useRawInput = false;

const getOutput = (input, switchCmd) => {
    let instructions = [...input]; // clone input array
    let i = 0;
    let acc = 0;
    let used = [];
    const updated = [];
    let shouldUpdate = true;
    while (i < instructions.length) {
        let [ cmd, num ] = instructions[i].split(' ');

        // should we update the cmd?
        if (switchCmd && (cmd === 'jmp' || cmd === 'nop') && updated.indexOf(i) === -1 && shouldUpdate) {
            cmd = cmd === 'jmp' ? 'nop' : 'jmp';
            instructions[i] = `${cmd} ${num}`; // actually update value in array so we don't have to update it every time inside this loop
            shouldUpdate = false; // change flag so we don't update later 'jmp' or 'nop' commands inside this loop
            updated.push(i);
        }

        num = parseInt(num, 10);
        if (used.indexOf(i) > -1) {
            if (!switchCmd) {
                return { i, acc };
            }
            else {
                if (i === instructions.length - 1) {
                    return { i, acc };
                }

                // start again from the top... and reset everything... (except updated that holds information about failed cmd updates)
                i = 0;
                acc = 0;
                instructions = [...input];
                used = [];
                shouldUpdate = true;
                continue;
            }
        }

        used.push(i);

        switch(cmd) {
            case 'jmp':
                i += num;

                continue;
            case 'acc':
                acc += num;
                break;
        }

        i++;
    }

    return { i, acc };
};

const part1 = input => getOutput(input).acc;
const part2 = input => getOutput(input, true).acc;

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
