
var LocationUtils = require("LocationUtils.js")

function create(request ) {

    return {
        info: request,
    }
}
module.exports = {
    create: create,
    getList: getList,
}


/**
 * @method 获取渲染的mark数组
 * @for MarkUtils
 * @param
 *      {object} value 手机的方向数值
 */
function getList(self_location,compass_direction_num, mark_list){
    var _location = self_location
    var _direction = compass_direction_num
    var _list = mark_list
    console.log(mark_list)
    for (var i = 0; i < _list.length; i++) {
        var _m = _list[i]
        var _self_mark_distance = LocationUtils.getDistanceAB(_location, _m.location)
        var _self_mark_compass_value = LocationUtils.getCompassDirectionAB(_location, _m.location)
        console.log(_self_mark_compass_value)

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