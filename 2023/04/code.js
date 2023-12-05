const { run } = require('../../utils');
const { day, year } = require('./env');

// Part 1
const parseNumbers = list => list.trim().split(' ').map(num => num.trim()).filter(num => num !== '');

const solution1 = input => {
    return input.map(line => {
        const numbers = line.split(': ')[1];
        let [winning, mine] = numbers.split(' | ');

        winning = parseNumbers(winning);
        mine = parseNumbers(mine);

        const matching = mine.filter(num => winning.includes(num));
        const numMatching = matching.length;

        return numMatching && Math.pow(2, numMatching - 1) || 0;
    })
    .reduce((a, b) => a + b, 0);
};
run(solution1, 'Solution 1', {
    day,
    year,
    // testFile: 'test1.txt',
    // useRawInput: true
});

// Part 2
const solution2 = input => {

    const cards = {};

    input.forEach(line => {
        const [card, numbers] = line.split(': ');
        const cardNumber = Number(card.replace('Card ', ''));

        if (!cards[cardNumber]) {
            cards[cardNumber] = 1;
        }
        else {
            cards[cardNumber] += 1;
        }

        let [winning, mine] = numbers.split(' | ');

        winning = parseNumbers(winning);
        mine = parseNumbers(mine);

        const matching = mine.filter(num => winning.includes(num));
        const numMatching = matching.length;

        for (let i = 1; i <= numMatching; i++) {
            const nextCard = cardNumber + i;
            if (!cards[nextCard]) {
                cards[nextCard] = cards[cardNumber];
            }
            else {
                cards[nextCard] += cards[cardNumber];
            }
        }
    });

    return Object.values(cards).reduce((a, b) => a + b, 0);
};
run(solution2, 'Solution 2', {
    day,
    year,
    // testFile: 'test2.txt',
    // useRawInput: true
});
