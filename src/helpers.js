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
     * Check if two arrays are equal
     * @param  {[array]} arr1 [First array]
     * @param  {[array]} arr2 [Second array]
     * @return {[boolean]}    [Boolean indicating if the arrays are equal]
     */
    equalArrays: function (arr1, arr2) {
        if (!arr2) {
            return false;
        }

        if (arr1.length !== arr2.length) {
            return false;
        }

        for (var i = 0, l = arr1.length; i < l; i++) {
            // Check for nested arrays
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!arr1[i].equals(arr2[i])) {
                    return false;       
                }
            }           
            else if (arr1[i] != arr2[i]) { 
                return false;   
            }           
        }

        return true;
    }
}

module.exports = Helpers;