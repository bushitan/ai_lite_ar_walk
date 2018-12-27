
var Location = require("Location.js")
var LocationUtils = require("LocationUtils.js")


const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 
const DIRECTION_FRONT = "front" //正前方
const DIRECTION_BACK = "back" //后方 


class MarkUtils {

    /**
     * @method 构造函数
     * 
     */
    constructor(options){
        if (options.hasOwnProperty("list") == false) { throw Error('list值不能为空'); }
        this.list = options.list
    }

    /**
     * @method 构造函数
     * @return 
     *      {Array} 过滤后的mark列表
     */
    filter(){
        var _org_list = this.list
        var _list = []
        for (var i = 0; i < _org_list.length; i++) {
            var _m = _org_list[i]
            _m.location = Location.create(_m.latitude, _m.longitude)
            _list.push(_m)
        }
        return _list
    }


    /**
     * @method 获取渲染的mark数组
     * @for MarkUtils
     * @param
     *      {object} value 手机的方向数值
     */
    render(self_location, compass_direction_num) {
        var _location = self_location
        var _direction = compass_direction_num
        var _list = this.list 
        // console.log(mark_list)
        for (var i = 0; i < _list.length; i++) {
            var _m = _list[i]
            var _self_mark_distance = LocationUtils.getDistanceAB(_location, _m.location)
            var _self_mark_compass_value = LocationUtils.getCompassDirectionAB(_location, _m.location)
            var _x = Utils.locationToScreen(_direction, _self_mark_compass_value)
            _list[i].x = _x
            _list[i].y = 800
            // console.log(_x)
        }
        return _list

    }
}

module.exports = MarkUtils

var Utils = {
    locationToScreen(phone_value, mark_value) {
        var _x
        var baseAngle = 60
        var screenWidth = 750
        var halfWidth = screenWidth / 2
        // var baseStep = halfWidth / baseAngle
        var baseStep = parseInt(screenWidth / baseAngle)


        // var halfAngle = baseAngle / 2
        // var stepPixle = 750 / baseAngle

        var obj = Utils.compassBetweenAngle(phone_value, mark_value)
        // console.log(phone_value, mark_value,obj.value)
        var _value = obj.value
        if (_value > baseAngle)
            _x = 1000
        else {
            if (obj.direction == DIRECTION_LEFT) {

                _x = halfWidth - baseStep * parseInt(_value)
            } else {
                _x = halfWidth + baseStep * parseInt(_value)
            }
        }
        return _x
    },

    /**
     * @method 两个方向的夹角值
     * @for geo
     * @param
     *      {number} phone_value   手机本身的罗盘度数
     *      {number} mark_value   手机与目标的罗盘度数
     * @return
     *      {number} value 夹角度数
     *      {string} direction 目标在手机的左or右
     */
    compassBetweenAngle(phone_value, mark_value) {
        var value, direction
        if (phone_value > mark_value) { //手机 > 目标
            if (phone_value - mark_value <= 180) {//手机 - 目标 <= 180
                value = phone_value - mark_value
                direction = DIRECTION_LEFT
            } else { //手机 - 目标 > 180
                value = 359 - phone_value + mark_value
                direction = DIRECTION_RIGHT
            }
        }
        else {//目标 > 手机
            if (mark_value - phone_value <= 180) { // 目标 - 手机 <= 180
                value = mark_value - phone_value
                direction = DIRECTION_RIGHT
            } else {// 目标 - 手机 > 180
                value = 359 - mark_value + phone_value
                direction = DIRECTION_LEFT
            }
        }
        return { value: value, direction: direction }
    }
}