const { run } = require('../../utils');
const { day, year } = require('./env');
const useTestFile = false;
const useRawInput = false;

const rules = {
    year: /^(\d){4}$/,
    height: /^(\d{2,3})([a-z]{2})$/,
    hair: /^#([0-9a-f]{6})$/,
    eyes: /^amb|blu|brn|gry|grn|hzl|oth$/,
    pid: /^(\d){9}$/
};

const fields = {
    byr: {
        type: 'year',
        required: true,
        limit: '1920-2002'
    },
    iyr: {
        type: 'year',
        required: true,
        limit: '2010-2020'
    },
    eyr: {
        type: 'year',
        required: true,
        limit: '2020-2030'
    },
    hgt: {
        type: 'height',
        required: true,
        limit: {
            cm: '150-193',
            in: '59-76'
        }
    },
    hcl: {
        type: 'hair',
        required: true
    },
    ecl: {
        type: 'eyes',
        required: true
    },
    pid: {
        type: 'pid',
        required: true
    },
    cid: {
        required: false
    }
}
const validFields = Object.keys(fields);
const requiredFields = validFields.filter(f => fields[f].required);

const parsePassportsData = input => {
    const passports = [];

    let i = 0;
    input.forEach(line => {
        if (line === '') {
            i++;
            return;
        }

        if (!passports[i]) {
            passports[i] = {};
        }

        line.split(' ').forEach(field => {
            const [ key, value ] = field.split(':');
            if (validFields.includes(key)) {
                passports[i][key] = value;
            }
        });
    });

    return passports;
}

const part1 = input => {
    const passports = parsePassportsData(input);
    const valid = passports.filter(pass => Object.keys(pass).filter(f => requiredFields.includes(f)).length >= requiredFields.length);
    return valid.length;
};

const part2 = input => {
    const passports = parsePassportsData(input);
    const valid = passports.filter(pass => {
        const filtered = Object.keys(pass).filter(f => {
            if (!requiredFields.includes(f)) { return false; }

            const { type, limit } = fields[f];

            const matches =  pass[f].match(rules[type]);
            if (matches === null) {
                return false;
            }

            if (type === 'year') {
                const [ min, max ] = limit.split('-');
                return (+matches[0] >= +min && +matches[0] <= +max);
            }
            else if (type === 'height') {
                const unit = matches[2];
                if (!limit[unit]) { return false; }
                const [ min, max ] = limit[unit].split('-');
                return (+matches[1] >= +min && +matches[1] <= +max);
            }
            else {
                return true;
            }
        });

        return filtered.length >= requiredFields.length;
    });

    return valid.length || '0';
};

run({ part1, part2 }, { day, year, useTestFile, useRawInput});
