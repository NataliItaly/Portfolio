module.exports = function toReadable(number) {
    let num = number.toString();
    let length = num.length;

    switch (length) {
        case 1:
            return first(num, true);
        case 2:
            return second(num);
        case 3:
            let space = (num[1] === '0' && num[2] === '0') ? '' : ' ';
            return (first(num[0], false) + ' hundred' + space + second(num.slice(1)));
    }

    function first(item, isZero) {
        let zero = (isZero) ? 'zero' : '';
        switch (item) {
            case '0':
                return zero;
            case '1':
                return 'one';
            case '2':
                return 'two';
            case '3':
                return 'three';
            case '4':
                return 'four';
            case '5':
                return 'five';
            case '6':
                return 'six';
            case '7':
                return 'seven';
            case '8':
                return 'eight';
            case '9':
                return 'nine';
        }
    }

    function second(item) {
        let space = (item[1] === '0') ? '' : ' ';
        switch (item[0]) {
            case '0':
                return first(item[1]);
            case '1':
                return tenth(item);
            default:
                return (even(item[0]) + space + first(item[1], false));
        }
    }

    function tenth(item) {
        switch (item) {
            case '10':
                return 'ten';
            case '11':
                return 'eleven';
            case '12':
                return 'twelve';
            case '13':
                return 'thirteen';
            case '14':
                return 'fourteen';
            case '15':
                return 'fifteen';
            case '16':
                return 'sixteen';
            case '17':
                return 'seventeen';
            case '18':
                return 'eighteen';
            case '19':
                return 'nineteen';
        }
    }

    function even(item) {
        switch (item) {
            case '2':
                return 'twenty';
            case '3':
                return 'thirty';
            case '4':
                return 'forty';
            case '5':
                return 'fifty';
            case '6':
                return 'sixty';
            case '7':
                return 'seventy';
            case '8':
                return 'eighty';
            case '9':
                return 'ninety';
        }
    }
}