    var Location = require("Location.js")
var Angle = require("Angle.js")
module.exports = {
    getDistanceAB: getDistanceAB,
    getCompassDirectionAB: getCompassDirectionAB,
    getAngleABLine: getAngleABLine,
    getDirection: getDirection,
}

/**
 * @method 两点间距离
 * @for geo
 * @param
 *      {location} A 点，
 *      {location} B 点，
 * @return
 *      {number} s 两点距离
 */
function getDistanceAB(location_a, location_b) {
    var A = location_a
    var B = location_b
    const EARTH_RADIUS = 6378137.0;
    var radLat1 = (A.latitue * Math.PI / 180.0);
    var radLat2 = (B.latitue * Math.PI / 180.0);
    var a = radLat1 - radLat2;
    var b = (A.longitude - B.longitude) * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return parseInt(s);
}


/**
 * @method 两点所连直线的罗盘方向角
 * @for geo
 * @calls
 *      distance 两点间距离
 * @param
 *      {location} A 点，
 *      {location} B 点，
 * @return
 *      {number} angle 方向角
 */
function getCompassDirectionAB(location_a, location_b) {
    var A = location_a
    var B = location_b
    var D = Location.create(A.latitue, B.longitude) //水平辅助点
    // D.longitude = locationB.longitude
    var _distance = getDistanceAB(A, B)
    var _duan = getDistanceAB(A, D)
    // var _duan = distance(lat_a, lng_a, lat_a, lng_b)
    var value = 180 * Math.asin(_duan / _distance) / Math.PI
    //TODO 四个象限
    return parseInt(value)
}




/**
 * @method 两个方向的夹角值
 * @for CompassUtils
 * @param
 *      {number} dir_phone   手机本身的罗盘度数
 *      {number} dir_nav   手机与目标的罗盘度数
 * @return
 *      {number} value 夹角度数
 *      {string} direction 目标在手机的左or右
 */
function getAngleABLine(dir_phone, dir_nav) {
    var dir_phone = dir_phone
    var dir_nav = dir_nav
    var value, side
    if (dir_phone >= dir_nav) { //手机 > 目标
        if (dir_phone - dir_nav <= 180) {//手机 - 目标 <= 180
            value = dir_nav - dir_phone
        } else { //手机 - 目标 > 180
            value = 359 - dir_phone + dir_nav
        }
    }
    else {//目标 > 手机
        if (dir_nav - dir_phone <= 180) { // 目标 - 手机 <= 180
            value = dir_nav - dir_phone
        } else {// 目标 - 手机 > 180
            value = 0 - (359 - dir_nav + dir_phone)
        }
    }
    return value
    // return Angle.create(value, side)
}



/**
 * @method 获取当前目标点方向
 * @param
 *      {string} direction 手机的方向数值
 *      {location} location 手机GPS经纬度
 * @return
 *      {number} value 手机与目标点方向加的夹角
 */
function getDirection(direction, self_location, next_location) {
    var _loc_self = self_location
    var _loc_focus = next_location//目标点的location
    var nextPointDirection = getCompassDirectionAB(_loc_self, _loc_focus)
    var value = getAngleABLine(direction, nextPointDirection)
    return value
}


// function getAngleABLine(lineA, lineB) {
//     var A = lineA
//     var B = lineB
//     var value, side
//     if (A.direction > B.direction) { //手机 > 目标
//         if (A.direction - B.direction <= 180) {//手机 - 目标 <= 180
//             value = A.direction - B.direction
//             side = DIRECTION_LEFT
//         } else { //手机 - 目标 > 180
//             value = 359 - A.direction + B.direction
//             side = DIRECTION_RIGHT
//         }
//     }
//     else {//目标 > 手机
//         if (A.direction - B.direction <= 180) { // 目标 - 手机 <= 180
//             value = A.direction - B.direction
//             side = DIRECTION_RIGHT
//         } else {// 目标 - 手机 > 180
//             value = 359 - A.direction + B.direction
//             side = DIRECTION_LEFT
//         }
//     }
//     return Angle.create(value, side)
// }
