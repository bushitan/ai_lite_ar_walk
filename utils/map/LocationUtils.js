
var Location = require("Location.js")
module.exports = {
    distance: distance,
    angleDirection: angleDirection,
    getCurrentLocation: getCurrentLocation,
    // angleDirection: angleDirection,
    // angleBetweenLine: angleBetweenLine,
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
function distance(locationA, locationB) {
    var A = locationA
    var B = locationB
    const EARTH_RADIUS = 6378137.0;
    var radLat1 = (A.latitue * Math.PI / 180.0);
    var radLat2 = (B.latitue * Math.PI / 180.0);
    var a = radLat1 - radLat2;
    var b = (A.longitude - B.longitude) * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
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
function angleDirection(locationA, locationB) {
    var A = locationA
    var B = locationB
    var D = Location.create(A.latitue, B.longitude) //水平辅助点
    // D.longitude = locationB.longitude
    var _distance = distance(A, B)
    var _duan = distance(A,D)
    // var _duan = distance(lat_a, lng_a, lat_a, lng_b)
    var angle = 180 * Math.asin(_duan / _distance) / Math.PI
    //TODO 四个象限
    return parseInt(angle)
}


/**
 * @method 两点所连直线的罗盘方向角
 * @for geo
 * @calls
 *      distance 两点间距离
 * @param
 *      {location} A 点，
 *      {location} B 点，
 */

var step = 0
function getCurrentLocation(GlobalValue) {
    step++
    if (step % GlobalValue.selfUpdateFre == 0) {
        console.log(step)
        wx.getLocation({
            type: 'gcj02',
            success(res) {

                GlobalValue.selfLocation = Location.create(res.latitude, res.longitude)

                // GlobalValue.selfLatitude = res.latitude
                // GlobalValue.selfLongitude = res.longitude
                GlobalValue.selfAccuray = res.accuracy
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                console.log(latitude, longitude, res.accuracy)

                // SELF_LAT = latitude//自身维度
                // SELF_LON = longitude//自身经度
                //TODO 测算与所有目标点的距离、方向角
            }
        })
    }
}

