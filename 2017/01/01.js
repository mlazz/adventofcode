// DAY 1
var adventOfSum = function(seq) {
    var len = seq.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
        var j = (i == len - 1) ? 0 : i + 1,
            d1 = seq[i],
            d2 = seq[j];

        if (d1 === d2) {
            sum += parseInt(d1);
        }
    }

    return sum;
}

var adventOfSumHalfway = function(seq) {
    var len = seq.length,
        newSeq = seq + seq,
        sum = 0,
        step = len / 2;

    for (var i = 0; i < len; i++) {
        var d1 = newSeq[i],
            d2 = newSeq[i + step];

        if (d1 === d2) {
            sum += parseInt(d1);
        }
    }

    return sum;
}