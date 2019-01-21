
var CIRCLE_RADIUS = 50

var nav = {
    //计算宽度
    getWidth: function () {
        return CIRCLE_RADIUS
    },
    //计算高度
    getHeight: function (z) {
        var h = (Math.abs(z)) * CIRCLE_RADIUS + 14
        if (h > CIRCLE_RADIUS)
            h = CIRCLE_RADIUS
        return h
    },
    //计算屏幕X坐标
    getScreenX: function (angle) {
        return  50
    },
    //计算屏幕Y坐标
    getScreenY: function (z) {
        return 50
    },
    //计算空格高度
    getSpace:function(z){
        return (Math.abs(z)) * CIRCLE_RADIUS / 2 + 5
    }

}
module.exports = nav
