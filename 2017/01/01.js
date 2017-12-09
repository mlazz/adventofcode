const init = input => {

    input.split('\n').forEach(captcha => {
        const len = captcha.length,
            double = captcha + captcha,
            // step = 1; // part 1
            step = len / 2; // part 2
        let sum = 0;

        for (let i = 0; i < len; i++) {
            sum += (double[i] === double[i + step]) ? +double[i] : 0;
        }
        console.log('captcha solution:', sum);
    });
};

const openFile = (filename, callback) => {
    const fs = require('fs');
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log(err.toString());
            return;
        }

        callback && callback(data);
    });
}

// const file = '2017/01/test1.txt';
// const file = '2017/01/test2.txt';
const file = '2017/01/input.txt';
openFile(file, init);
