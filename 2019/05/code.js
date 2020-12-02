const { run } = require('../../utils');

const ops = {
    sum: (a, b) => a + b,
    multiply: (a, b) => a * b
};

const positionExists = (arr, pos) => pos <= arr.length;
const getValueAtPosition = (arr, pos) => !positionExists(arr, pos) ? false : arr[arr[pos]];

const writeToPosition = (arr, pos, val) => positionExists(arr, pos) && (arr[arr[pos]] = val);
const getOpcode = instruction => instruction % 100;

const runProgram = (memory, input) => {
    const validOpCodes = {
        1: 4,
        2: 4,
        3: 2,
        4: 2,
        99: 0
    };

    // ip = instruction pointer
    // const output = [];
    for (let ip = 0; ip < memory.length; ip) {
        const instruction = memory[ip];
        const opcode = getOpcode(instruction);

        if (!Object.keys(validOpCodes).includes(opcode.toString())) {
            console.log(`invalid opcode: ${opcode}, loop: ${ip}`);
            break;
        }

        if (opcode === 99) {
            break;
        }

        const params = [...parseInt(instruction / 100).toString()].reverse();
        const increase = validOpCodes[opcode];

        const values = {};
        for (let i = 1; i < increase - 1; i++) {
            const mode = params[i - 1] || "0";
            values[i] = mode === "0" ? getValueAtPosition(memory, ip + i) : memory[ip + i];
        }

        if (opcode === 1 || opcode === 2) {
            const operation = opcode === 1 ? ops.sum : ops.multiply;
            const result = operation(...Object.values(values));
            const pos = ip + increase - 1;
            writeToPosition(memory, pos, result);

            // const param1 = getValueAtPosition(memory, ip + 1);
            // const param2 = getValueAtPosition(memory, ip + 2);
            // const param3 = positionExists(memory, ip + 3) && memory[ip + 3];

            // if (param1 === false || param2 === false || param3 === false) {
            //     console.log(`invalid location of arguments: ${ip} (+1,+2,+3). memory length: ${memory.length}`);
            //     return;
            // }
        }
        else if (opcode === 3) {
            // memory[ip + increase] = values[increase];
            // memory[memory[ip + increase]] = input;
            const pos = ip + increase - 1;
            writeToPosition(memory, pos, input)
        }
        else if (opcode === 4) {
            const pos = ip + increase - 1;
            var output = params[0] === "0" ? getValueAtPosition(memory, pos) : memory[pos];

            if (output !== 0) {
                // const nextInstruction = getValueAtPosition(memory, ip + increase);
                const nextInstruction = memory[ip + increase];
                if (getOpcode(nextInstruction) === 99) {
                    break;
                }
            }
            // output.push(values[increase]);
        }

        // increase pointer based on parameter count
        ip = ip + increase;
    }

    // console.log(output, memory);
    return output;

    // // test.txt
    // if (process.env.INPUT === 'test.txt') {
    //     return memory.join(',');
    // }

    // // input.txt
    // return memory[0];
}

const part1 = parsedInput => {
    const memory = parsedInput.split(',').map(Number);
    const systemID = 1;
    return runProgram(memory, systemID);
};

const part2 = parsedInput => {

};

run({ part1, part2 });
