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
            var array = this.getNumArray(res);
            res = 0
            for (var i = 0; i < array.length; i++) {
                res += parseInt(array[i])
            }
        }
        return res
    }
}

module.exports = calc