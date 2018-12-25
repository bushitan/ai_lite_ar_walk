
var Location = require("Location.js")
var LocationUtils = require("LocationUtils.js")


const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 
const DIRECTION_FRONT = "front" //正前方
const DIRECTION_BACK = "back" //后方 
module.exports = {
    // create: create,
    filterCustomList: filterCustomList,
    getList: renderList,
}


/**
 * @method 把用户自定义的数据，转变为marklist
 * @for MarkUtils
 * @param
 *      {array} org_list 用户传入原始数据
 */
function filterCustomList(org_list){
    var _org_list = org_list
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
function renderList(self_location,compass_direction_num, mark_list){
    var _location = self_location
    var _direction = compass_direction_num
    var _list = mark_list
    // console.log(mark_list)
    for (var i = 0; i < _list.length; i++) {
        var _m = _list[i]
        var _self_mark_distance = LocationUtils.getDistanceAB(_location, _m.location)
        var _self_mark_compass_value = LocationUtils.getCompassDirectionAB(_location, _m.location)
        var _x = locationToScreen(_direction, _self_mark_compass_value)
        _list[i].x = _x
        _list[i].y = 400
        // console.log(_x)
    }
    // for (var i = 0; i < _list.length; i++) {
    //     var _m = _list[i]
    //     //手机与mark的距离
    //     var _distance = GEO.distance(SELF_LAT, SELF_LON, _m.latitude, _m.longitude)
    //     _list[i].distance = _distance
    //     //水平校正
    //     _list[i].y = GEO.horizontalAdjust(BASE_Y, ACC_Z, _distance)
    //     //手机与mark的方向
    //     var _angle_value = GEO.compassDirectionAngle(SELF_LAT, SELF_LON, _m.latitude, _m.longitude)
    //     //方向抖动校正
    //     _angle_value = GEO.compassRangeAdjust(_angle_value, _list[i].compass_value)
    //     _list[i].compass_value = _angle_value
    //     //mark在屏幕上的位置
    //     //   _list[i].x = GEO.markValueToScreenXY(value, _angle_value)
    //     _list[i].x = GEO.markValueToScreenXY(value, _angle_value)

    // }
    return _list
}


function locationToScreen(phone_value, mark_value) {
    var _x
    var baseAngle = 60
    var screenWidth = 750
    var halfWidth = screenWidth / 2
    // var baseStep = halfWidth / baseAngle
    var baseStep = parseInt(screenWidth / baseAngle)


    // var halfAngle = baseAngle / 2
    // var stepPixle = 750 / baseAngle

    var obj = compassBetweenAngle(phone_value, mark_value)
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
function compassBetweenAngle(phone_value, mark_value) {
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