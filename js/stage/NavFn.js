
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
    //nextDir 下一点方向
    //z 俯仰角
    //i 第i个点
    getScreenX: function (nextDir, z, i) {
        nextDir = nextDir == 180 ? 179 : nextDir //避免180时，sin计算溢出
        const BaseX = 350
        const BaseSpace = 80
        var _angle = Math.abs(nextDir) * Math.PI / 180     /**倾斜角度 */
        var _dx = BaseSpace * Math.abs(Math.sin(_angle)) // x坐标数值

        if (nextDir < 180) 
            return BaseX + _dx * i
        if (nextDir > 180)
            return BaseX - _dx * i
    },

    //计算屏幕Y坐标
    //nextDir 下一点方向
    //z 俯仰角
    //i 第i个点
    getScreenY: function (nextDir,z,i) {
        const BaseY = 840 + 70 +25
        const BaseSpace = 80
        const CIRCLE_RADIUS = 50 //圆圈大小

        var _angle = Math.abs(nextDir) * Math.PI / 180  /**倾斜角度 */
        var _dh = (Math.abs(z)) * CIRCLE_RADIUS + 14   //圆圈高度变化
        if (_dh > CIRCLE_RADIUS)
            _dh = CIRCLE_RADIUS
        var _dspace = (Math.abs(z)) * CIRCLE_RADIUS / 2 + 5   /**圈圈空隙变化*/
        var _dy = (_dh + _dspace) * Math.abs(Math.cos(_angle)) // y坐标数值
        if (nextDir >= 0 && nextDir <= 90) //第一象限
            return BaseY - _dy * i
        if (nextDir >= 270 && nextDir <= 360)//第二象限
            return BaseY - _dy * i
        return BaseY + _dy * i  //第三、四象限
    },
    //计算空格高度
    getSpace:function(z){
        return (Math.abs(z)) * CIRCLE_RADIUS / 2 + 5
    }

}
module.exports = nav
