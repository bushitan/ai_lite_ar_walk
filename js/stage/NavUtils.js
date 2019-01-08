
var MarkUtils = require("MarkUtils.js")
var GP
/**
 * @method  开关对象对象
 */
var Utils = {
    getDerIconHeight(acc_z) {
        var tempAccZ = (Math.abs(acc_z)) * 50
        // tempAccZ = parseInt(tempAccZ / 5) * 5
        tempAccZ = tempAccZ + 20
        tempAccZ = parseInt(tempAccZ)
        if (tempAccZ > 70)
            tempAccZ = 70
        return tempAccZ
    },


    /**
     * 获取导航方向图标数组
     * 
     * @param {Object} options 接口参数,
     *      direction 
     *      acc_z
     */
    getImageList(direction, acc_z) {
        var nav_direction = direction
        var acc_z = acc_z
        if (nav_direction >= 0 && nav_direction <= 90) {
            var d = nav_direction
            return baseDirMath(d, acc_z, 1, -1)
        }
        else if (nav_direction >= -90 && nav_direction < 0) {
            var d = Math.abs(nav_direction)
            return baseDirMath(d, acc_z, -1, -1)
        }
        else if (nav_direction > 90 && nav_direction <= 180) {
            var d = 180 - Math.abs(nav_direction)
            return baseDirMath(d, acc_z, 1, 1)
        }
        else {
            var d = 180 - Math.abs(nav_direction)
            return baseDirMath(d, acc_z, -1, 1)
        }

        //导航方向数组计算
        function baseDirMath(nav_direction, acc_z, side_x, side_y) {
            var _nav_direction = nav_direction
            var _angle = Math.abs(_nav_direction) * Math.PI / 180
            var _start_x = 350
            var _start_y = 785
            var _w = 50
            var _h = (Math.abs(acc_z)) * _w + 14
            if (_h > 50)
                _h = 50
            var _space = (Math.abs(acc_z)) * _w / 2 + 5
            var BaseL = 50 + 30  // _h + _space
            var L = _space + _h
            var _dx = BaseL * Math.sin(_angle)
            var _dy = L * Math.cos(_angle)
            var _list = [], _length = 5
            for (var i = 0; i < _length; i++) {
                var temp = {
                    x: _start_x + _dx * i * side_x,
                    y: _start_y + _dy * i * side_y - _h,
                    w: _w,
                    h: _h,
                }
                _list.push(temp)
            }
            return _list
        }
    }

}
class NavUtils extends MarkUtils{
    constructor(options) {
        super(options)
        if (!options.GP) { throw Error('GP值不能为空'); }
        GP = options.GP
    }

    /**
     * 渲染mark状态
     */
    render() {
        var _direction = GP.data.direction //acc_z做为属性
        var _acc_z = GP.data.acc_z //acc_z做为属性

        //终点
        var _list = GP.data.focusList
        _list = this._move(_list) 

        //中心图标俯仰
        var _icon_height = Utils.getDerIconHeight(_acc_z)


        var _circle_list = Utils.getImageList(_direction, _acc_z)
        return {
            focusList: _list,
            iconHeight: _icon_height,
            circleList: _circle_list,
        }
    }
}
module.exports = NavUtils