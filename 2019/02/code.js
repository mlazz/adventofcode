const { run } = require('../../utils');

const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;

const positionExists = (arr, pos) => pos <= arr.length;
const getValueAtPosition = (arr, pos) => !positionExists(arr, pos) ? false : arr[arr[pos]];

const runProgram = memory => {
    const validOpCodes = [1, 2, 99];
    let increase = 4;

    // ip = instruction pointer
    for (let ip = 0; ip < memory.length; ip = ip + increase) {
        const opcode = memory[ip];
        if (!validOpCodes.includes(opcode)) {
            console.log(`invalid opcode: ${opcode}, loop: ${ip}`);
            break;
        }

        if (opcode === 99) {
            break;
        }

        const param1 = getValueAtPosition(memory, ip + 1);
        const param2 = getValueAtPosition(memory, ip + 2);
        const param3 = positionExists(memory, ip + 3) && memory[ip + 3];

        if (param1 === false || param2 === false || param3 === false) {
            console.log(`invalid location of arguments: ${ip} (+1,+2,+3). memory length: ${memory.length}`);
            return;
        }

        const operation = opcode === 1 ? sum : multiply;
        memory[param3] = operation(param1, param2);
    }

    // test.txt
    if (process.env.INPUT === 'test.txt') {
        return memory.join(',');
    }

    // input.txt
    return memory[0];
}

const part1 = parsedInput => {
    const memory = parsedInput.split(',').map(Number);

    // update values at address 1 and 2
    memory[1] = 12;
    memory[2] = 2;

    return runProgram(memory);
};

const part2 = parsedInput => {
    let memory;
    const desiredOutput = 19690720;

    let noun;
    let verb;
    let result;
    for (noun = 0; noun <= 99; noun++) {
        for (verb = 0; verb <= 99; verb++) {
            memory = parsedInput.split(',').map(Number);

            memory[1] = noun;
            memory[2] = verb;

            if (runProgram(memory) === desiredOutput) {
                result = (100 * noun) + verb;
                console.log(`noun: ${noun}, verb: ${verb}, result: ${result}`);
                break;
            }
        }
    }

    return result;
};

run({ part1, part2 });
