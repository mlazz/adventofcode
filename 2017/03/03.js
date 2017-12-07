// DAY 3
var adventOfSpiral = function(input) {
    var getMoves = function(limit) {

        var moves = {};
        var spirals = {};
        var size = 1;

        for (var i = 1; i < limit; i++) {

            if (Math.pow((size + 2), 2) === i) {
                moves = {};
                size += 2;
            }

            if (!moves.total) { moves.total = 0; }
            moves.total++;

            if (!moves.first) {
                moves.first = 1;
            }
            else if (!moves.up || moves.up < size) {
                if (!moves.up) { moves.up = 0; }
                moves.up++;
            }
            else if (!moves.left || moves.left < (size + 1)) {
                if (!moves.left) { moves.left = 0; }
                moves.left++;
            }
            else if (!moves.down || moves.down < (size + 1)) {
                if (!moves.down) { moves.down = 0; }
                moves.down++;
            }
            else if (!moves.right || moves.right < (size + 1)) {
                if (!moves.right) { moves.right = 0; }
                moves.right++;
            }

            spirals[size] = moves;
        }

        return spirals;
    };

    var nextMove = function() {
        var pos = {
            x: this.x,
            y: this.y
        };

        if (!this.moves[this.size]) {
            return false;
        }

        if (this.moves[this.size].first) {
            this.moves[this.size].first--;
            pos.x++;
        }
        else if (this.moves[this.size].up) {
            this.moves[this.size].up--;
            pos.y--;
        }
        else if (this.moves[this.size].left) {
            this.moves[this.size].left--;
            pos.x--;
        }
        else if (this.moves[this.size].down) {
            this.moves[this.size].down--;
            pos.y++;
        }
        else if (this.moves[this.size].right) {
            this.moves[this.size].right--;
            pos.x++;
        }
        else {
            return false;
        }

        this.moves[this.size].total--;
        if (this.moves[this.size].total === 0) {
            this.size += 2;
        }

        this.x = pos.x;
        this.y = pos.y;

        return pos;
    };

    var getNeighbourSum = function(pos) {
        var x = pos.x;
        var y = pos.y;

        var sum = [];
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                var value = this.hash[i + ',' + j];
                sum.push(value || 0);
            }
        }

        return sum.reduce(function(a, b) {
            return a + b;
        });
    };

    var count = 1;
    var step = 1;

    this.hash = {};
    this.hash['0,0'] = count;

    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.moves = getMoves(input);

    while (pos = nextMove()) {
        // count += step;

        count = getNeighbourSum(pos);

        this.hash[(pos.x + ',' + pos.y)] = count;

        if (count > input) {
            return count;
            break;
        }
    }

    return hash;
};