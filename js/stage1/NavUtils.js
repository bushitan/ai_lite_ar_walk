
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
            var _start_y = OFFSET_Y + ICON_RADIUS_HALF + CIRCLE_RADIUS_HALF
            _start_y =_start_y + SPACE_3D - SPACE_3D * acc_z //根据acc_z往下分离
            console.log(_start_y)
            var _w = CIRCLE_RADIUS
            var _h = (Math.abs(acc_z)) * _w + 14
            if (_h > CIRCLE_RADIUS)
                _h = CIRCLE_RADIUS
            var _space = (Math.abs(acc_z)) * _w / 2 + 5
            var BaseL = CIRCLE_RADIUS + SPACE_RADIUS  // _h + _space
            var L = _space + _h
            var _dx = BaseL * Math.sin(_angle)
            var _dy = L * Math.cos(_angle)
            var _list = [], _length = CIRCLE_LENGTH
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
    },


    getNavIcon(acc_z) {
        var tempAccZ = (Math.abs(acc_z)) * ICON_RANGE
        tempAccZ = tempAccZ + ICON_BASE
        tempAccZ = parseInt(tempAccZ)
        if (tempAccZ > ICON_RADIUS)
            tempAccZ = ICON_RADIUS
        return {
            y: OFFSET_Y,
            width: ICON_RADIUS,
            height: tempAccZ,
        }
    },
}

var OFFSET_Y = 840   //基础高度
var ICON_RADIUS = 140 
var ICON_RADIUS_HALF = ICON_RADIUS / 2
var ICON_BASE = 40
var ICON_RANGE = 100

var CIRCLE_LENGTH = 5
var CIRCLE_RADIUS = 50
var CIRCLE_RADIUS_HALF = CIRCLE_RADIUS / 2
var CIRCLE_BASE = 40
var CIRCLE_RANGE = 100

var SPACE_RADIUS =  30
var SPACE_3D = 16   //图标与方向3D效果的分离

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
        OFFSET_Y = GP.data.navOffsetY 

        //终点
        var _list = GP.data.focusList
        _list = this._move(_list) 

        //中心图标俯仰
        var _icon_height = Utils.getDerIconHeight(_acc_z)

        var _nav_icon = Utils.getNavIcon(_acc_z)
        var _circle_list = Utils.getImageList(_direction, _acc_z)
        
        return {
            focusList: _list,
            iconHeight: _icon_height,
            navIcon: _nav_icon,
            navCircleList: _circle_list,
        }
    }
}
module.exports = NavUtils