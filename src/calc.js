var calc = {
    getNumArray: function (res) {
        var array
        if (res.indexOf('//') < 0) {
            array = res.replace('\n', ',').split(',')
        } else {
            var expression = res.substring(2).split('\n')
            array = expression[1].split(expression[0])
        }
        return array
    },
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