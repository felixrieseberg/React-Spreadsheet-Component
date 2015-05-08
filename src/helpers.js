var Helpers = {
    /**
     * Find the first element in an array matching a boolean
     * @param  {[array]} arr     [Array to test]
     * @param  {[function]} test [Test Function]
     * @param  {[type]} context  [Context]
     * @return {[object]}        [Found element]
     */
    firstInArray: function (arr, test, context) {
        var result = null;

        arr.some(function(el, i) {
            return test.call(context, el, i, arr) ? ((result = el), true) : false;
        });

        return result;
    },

    /**
     * Find the first TD in a path array
     * @param  {[array]} arr  [Path array containing elements]
     * @return {[object]}     [Found element]
     */
    firstTDinArray: function (arr) {
        var cell = Helpers.firstInArray(arr, function (element) {
            if (element.nodeName && element.nodeName === 'TD') {
                return true;
            } else {
                return false;
            }
        });

        return cell;
    },

    /**
     * Check if two cell objects reference the same cell
     * @param  {[array]} cell1 [First cell]
     * @param  {[array]} cell2 [Second cell]
     * @return {[boolean]}    [Boolean indicating if the cells are equal]
     */
    equalCells: function (cell1, cell2) {
        if (!cell1 || !cell2 || cell1.length !== cell2.length) {
            return false;
        }

        if (cell1[0] === cell2[0] && cell1[1] === cell2[1]) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Helpers;