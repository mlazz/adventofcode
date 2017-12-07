
// DAY 2
var adventOfCheckSum = function(sheet) {
    var lines = sheet.split('\n');
    var sum = 0;
    
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split('\t').map(function(l) {
            return parseInt(l);
        });
        var min = Math.min.apply(this, line);
        var max = Math.max.apply(this, line);

        sum += (max - min);
    }

    return sum;
}

var adventOfEvenDivideCheckSum = function(sheet) {
    var lines = sheet.split('\n');
    var sum = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split('\t').map(function(l) {
            return parseInt(l);
        })

        line.sort(function(a,b) {
            return b - a;
        });

        while (line.length) {
            var result = false;
            var one = line.shift();
            for (var j = 0; j < line.length; j++) {
                var two = line[j];

                if ((one / two) === parseInt(one / two)) {
                    result = one / two;
                    break;
                }
            }

            if (result) {
                sum.push(result);
                break;
            }
        }
    }

    return sum.reduce(function(a, b) {
        return a + b;
    });
}

