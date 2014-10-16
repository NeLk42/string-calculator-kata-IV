var calc = {
    getDelimsArray: function (delims) {
        return delims.substring(0, delims.length - 1).substring(1).split('][');
    },
    getNumArray: function (res) {
        var array
        if (res.indexOf('//') < 0) {
            array = res.replace('\n', ',').split(',')
        } else {
            var expression = res.substring(2).split('\n'),
                delims = expression[0]

            //If delims is //[;][+]\n1;2;3+4+5 (handle two custom operators)
            if (delims.indexOf('[') == 0) {         //  [   ;][+   ]
                var delimsArray = this.getDelimsArray(delims)     //  ;][+
                for (var i = 0; i < delimsArray.length; i++) {                      // go through ;,+ replace with ][
                    while (expression[1].indexOf(delimsArray[i]) > 0) {
                        expression[1] = expression[1].replace(delimsArray[i], '][')
                    }
                }
                delims = ']['
            }
            array = expression[1].split(delims)

        }
        return array
    }, //                                                       //[;][+]\n1;2;3+4+5
    add: function (text) {
        var res = text ? text : 0
        if (res != 0) {
            var array = this.getNumArray(res),
                err = 'Negatives not allowed:'
            res = 0
            for (var i = 0; i < array.length; i++) {
                if (array[i] < 0) {
                    err += ' ' + array[i]
                } else if (array[i] <= 1000) {
                    res += parseInt(array[i])
                }
            }
            if (err.indexOf(': -') > 0) {
                throw new Error(err)
            }
        }
        return res
    }
}

module.exports = calc