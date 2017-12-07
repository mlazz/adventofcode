// DAY 4
var adventOfPassphrase = function(input) {
    var lines = input.split('\n');
    var count = 0;
    
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var words = line.split(' ');
        var len = words.length;
        var used = [];

        while (words.length) {
            var part = words.shift();
            if (used.indexOf(part) == -1) {
                used.push(part);
            }
        }

        if (used.length === len) {
            count++;
        }
    }

    return count;
};

var adventOfAnagramPassphrase = function(input) {
    var lines = input.split('\n');
    var count = lines.length;
    
    var getHash = function(word) {
        var hash = { total: 0 };
        for (char of word.split('')) {
            if (!hash[char]) {
                hash[char] = 0;
            }

            hash.total++;
            hash[char]++;
        }

        return hash;
    }

    var isAnagram = function(a, b) {
        var ha = this.getHash(a),
            hb = this.getHash(b);

        if (ha.total !== hb.total) {
            return false;
        }

        for (char in ha) {
            if (ha[char] !== hb[char]) {
                return false;
            }
        }

        return true;
    };
 
    for (var line of lines) {
        var words = line.split(' ');

        var isAnagram = false;
        while (words.length) {
            if (isAnagram) {
                break;
            }

            var word = words.shift();
            for (next of words) {
                if (this.isAnagram(word, next)) {
                    isAnagram = true;
                    break;
                }
            }
        }

        if (isAnagram) {
            count--;
        }
    }


    return count;
};