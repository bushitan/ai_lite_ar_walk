
const COMPASS_RANGE = 3 //罗盘方向误差范围，3°
const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 

module.exports = {
    distance:distance,
    compassDirectionAngle: compassDirectionAngle,
    compassBetweenAngle:compassBetweenAngle,
    compassRangeAdjust: compassRangeAdjust,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
}


/**
 * @method 两点间距离
 * @for geo
 * @param
 *      {number} a纬度，
 *      {number} a经度，
 *      {number} b纬度，
 *      {number} b经度，
 * @return
 *      {number} s 两点距离
 */
function distance(lat_a, lng_a, lat_b, lng_b) {
    const EARTH_RADIUS = 6378137.0;
    var radLat1 = (lat_a * Math.PI / 180.0);
    var radLat2 = (lat_b * Math.PI / 180.0);
    var a = radLat1 - radLat2;
    var b = (lng_a - lng_b) * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; 
    return s;
}
/**
 * @method 两点所连直线的罗盘方向角
 * @for geo
 * @calls
 *      distance 两点间距离
 * @param
 *      {number} a纬度，
 *      {number} a经度，
 *      {number} b纬度，
 *      {number} b经度，
 * @return
 *      {number} angle 方向角
 */
function compassDirectionAngle(lat_a, lng_a, lat_b, lng_b) {
    var _d = distance(lat_a, lng_a, lat_b, lng_b)
    var _x = distance(lat_a, lng_a, lat_a, lng_b)
    var angle = 180 * Math.asin(duan / distance) / Math.PI
    //TODO 四个象限
    return angle
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
/**
 * @method 罗盘度数误差范围
 * @for geo
 * @param
 *      {number} newValue   新的罗盘度数
 *      {number} oldValue   原有罗盘度数
 * @return
 *      {number} value 校正后的度数
 */
function compassRangeAdjust(new_value, old_value){
    if (Math.abs(new_value - old_value) > COMPASS_RANGE)
        return new_value
    else
        return old_value
}

/**
 * @method 罗盘方向倒置，手机抬过z轴的0度，掉头
 * @for geo
 * @param
 *      {number} phone_compass   手机罗盘度数
 *      {number} z_acc Z轴重力参数
 * @return
 *      {number} value 校正手机罗盘度数
 */
function compassTurnAdjust(phone_compass, z_acc ) {
    if (z_acc <= 0 )
        return phone_compass
    else{
        if (phone_compass >= 180 )
            return phone_compass - 180
        else 
            return phone_compass + 180
    }
       
}
