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
    }
}

module.exports = Helpers;