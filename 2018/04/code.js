const { run } = require('../../utils');

const part1 = parsedInput => {
    const ordered = parsedInput.sort((a, b) => {
        if (a > b) { return -1; }
        if (a < b) { return 1; }
        return 0;
    });

    const sleep = {};

    let end = [],
        start = [],
        date,
        id;
    for (let i = 0; i < ordered.length; i++) {
        let [ ts, activity] = ordered[i].split('] ');

        if (activity === 'wakes up') {
            end.push(Number(ts.split(':')[1]));
        }
        else if (activity === 'falls asleep') {
            start.push(Number(ts.split(':')[1]));
        }
        else if (activity.match(/begins shift/) !== null) {
            id = activity.replace(/Guard #| begins shift/g, '');
            date = ts.split(' ')[0].replace('[1518-', '');
            if (!sleep[id]) {
                sleep[id] = {};
            }

            for (let j = 0; j < start.length; j++) {
                for (let k = start[j]; k < end[j]; k++) {
                    if (!sleep[id][k]) {
                        sleep[id][k] = [];
                    }
                    sleep[id][k].push(date);
                }
            }
            end = [];
            start = [];
            date = null;
            id = null;
        }
    }

    // find guard with most sleep minutes
    const minutes = Object.keys(sleep).map(id => {
        const val = sleep[id];
        if (!Object.values(val).length) { return { id: Number(id), mins: 0 }; }
        const mins = Object.values(val)
                        .map(min => min.length)
                        .reduce((a, b) => a + b);
        return { id: Number(id), mins };
    });

    const theSleepyOne = minutes.reduce((a, b) => {
        if (a.mins > b.mins) { return a; }
        return b;
    });

    // find "the minute"
    let theMinute = -1;
    const guardLog = sleep[theSleepyOne.id];
    Object.keys(guardLog).forEach(minute => {
        if (theMinute === -1 || guardLog[minute].length > guardLog[theMinute].length) {
            theMinute = minute;
        }
    });

    return theSleepyOne.id * Number(theMinute);
};

const part2 = parsedInput => {
    const ordered = parsedInput.sort((a, b) => {
        if (a > b) { return -1; }
        if (a < b) { return 1; }
        return 0;
    });

    const sleep = {};

    let end = [],
        start = [],
        date,
        id;
    for (let i = 0; i < ordered.length; i++) {
        let [ ts, activity] = ordered[i].split('] ');

        if (activity === 'wakes up') {
            end.push(Number(ts.split(':')[1]));
        }
        else if (activity === 'falls asleep') {
            start.push(Number(ts.split(':')[1]));
        }
        else if (activity.match(/begins shift/) !== null) {
            id = activity.replace(/Guard #| begins shift/g, '');
            date = ts.split(' ')[0].replace('[1518-', '');
            if (!sleep[id]) {
                sleep[id] = { shifts: 1, mins: {} };
            }
            else {
                sleep[id].shifts++;
            }

            for (let j = 0; j < start.length; j++) {
                for (let k = start[j]; k < end[j]; k++) {
                    if (!sleep[id].mins[k]) {
                        sleep[id].mins[k] = [];
                    }
                    sleep[id].mins[k].push(date);
                }
            }
            end = [];
            start = [];
            date = null;
            id = null;
        }
    }

    // find guard with "the sweet minute"
    const filtered = Object.keys(sleep).map(id => {
        const val = sleep[id];
        if (!Object.values(val.mins).length) { return false; }

        const minutes = Object.keys(val.mins);
        minutes.forEach(minute => {
            val.mins[minute] = val.mins[minute].length
        });

        let popularMinute = -1;
        let popularCount = 0;
        minutes.forEach(minute => {
            if (popularMinute === -1 || val.mins[minute] > val.mins[popularMinute]) {
                popularMinute = Number(minute);
                popularCount = val.mins[minute];
            }
        });

        const popular = { minute: popularMinute, count: popularCount };

        sleep[id] = { id, ...val, popular };
        return sleep[id];
    });

    let theOne;
    filtered.forEach(candidate => {
        if (!candidate) { return; }
        if (!theOne || candidate.popular.count > sleep[theOne].popular.count) {
            theOne = candidate.id;
        }
    });

    return Number(theOne) * Number(sleep[theOne].popular.minute);
};

run({ part1, part2 });
