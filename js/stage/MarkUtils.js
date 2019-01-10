
var Sprite = require("Sprite.js")
var GP

const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 
const DIRECTION_FRONT = "front" //正前方
const DIRECTION_BACK = "back" //后方 

var leftNum = 0
var rightNum = 0

var OFFSET_Y = 800   //基础高度
var OFFSET_ACC = 300   //基础高度
var OFFSET_DIST = 500   //基础高度
/**
 * @method  开关对象对象
 */
class MarkUtils {
    constructor(options) {
        if (!options.GP) { throw Error('GP值不能为空'); }
        GP = options.GP
    }

    /**
     * 渲染mark状态
     */
    render() {
        var _direction = GP.data.direction //acc_z做为属性
        var _acc_z = GP.data.acc_z //acc_z做为属性
        leftNum = 0
        rightNum = 0
        //  var _mark_list = SpriteMark.render({
        //     markList: GP.data.markList,
        //     acc_z: this.acc_z
        // })
        var _mark_list = GP.data.markList
        // console.log(_mark_list)
        _mark_list = this._move(_mark_list, _direction, _acc_z)
        
        return _mark_list
    }

    getNum(){
        return {
            leftNum: leftNum,
            rightNum: rightNum,
        }
    }

    /**移动 */
    _move(mark_list, direction, acc_z){
        var _list = mark_list
        var _d = direction
        var _acc_z = acc_z
        // console.log(_mark_list, _acc_z)
        for (var i = 0; i < _list.length; i++) {
            var _m = _list[i]
            var _x = this._locationToScreen(direction, _list[i].compass_direction)
            _list[i].x = _x
            var _offset_dist = _list[i].distance * (0 - OFFSET_DIST / 500) + OFFSET_DIST
            
            _list[i].y = OFFSET_Y - OFFSET_ACC * Math.abs(acc_z) - Math.abs(acc_z) - _offset_dist
        }
        return _list
    }

    _locationToScreen(phone_value, mark_value) {
        var _x
        var baseAngle = 60
        var screenWidth = 750
        var halfWidth = screenWidth / 2
        // var baseStep = halfWidth / baseAngle
        var baseStep = parseInt(screenWidth / baseAngle)
        // var halfAngle = baseAngle / 2
        // var stepPixle = 750 / baseAngle

        var obj = this._compassBetweenAngle(phone_value, mark_value)
        Utils.countNum(obj.value, obj.direction)
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
    }
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
    _compassBetweenAngle(phone_value, mark_value) {
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

var Utils = {
    countNum(value, direction) {
        // console.log(obj)
        var _value = value
        var _direction = direction
        if (_value > 30)
            if (_direction == DIRECTION_LEFT)
                leftNum++
            else
                rightNum++
    },
}
module.exports = MarkUtils