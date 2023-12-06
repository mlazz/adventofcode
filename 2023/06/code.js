const { run } = require('../../utils');
const { day, year } = require('./env');


const labels = ['Time:', 'Distance:'];

const removeLabelAndGetValues = (string, label) => string.replace(label, '').match(/\d+/g).map(Number);


const willBreakRecord = (time, currentRecord) => {
    let count = 0;

    for (let buttonHoldDuration = 0; buttonHoldDuration <= time; buttonHoldDuration++) {
        const speed = buttonHoldDuration;
        const distance = (time - buttonHoldDuration) * speed;

        if (distance > currentRecord) {
            count++;
        };
    }

    return count;
}

// Part 1
const solution1 = input => {
    const [times, distances] = input.map((line, idx) => removeLabelAndGetValues(line, labels[idx]));

    return times.map((time, idx) => willBreakRecord(time, distances[idx])).reduce((a, b) => a * b);
};
run(solution1, 'Solution 1', {
    day,
    year,
    testFile: 'test1.txt',
    // useRawInput: true
});

const removeLabelAndGetSingleValue = (string, label) => Number(string.replace(label, '').replace(/\s+/g, ''));

// Part 2
const solution2 = input => {
    const [time, distance] = input.map((line, idx) => removeLabelAndGetSingleValue(line, labels[idx]));

    return willBreakRecord(time, distance);
};
run(solution2, 'Solution 2', {
    day,
    year,
    // testFile: 'test2.txt',
    // useRawInput: true
});
