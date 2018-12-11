
const COMPASS_RANGE = 2 //罗盘方向误差范围，3°
const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 
const DIRECTION_FRONT = "front" //正前方
const DIRECTION_BACK = "back" //后方 

module.exports = {
    distance:distance,
    markValueToScreenXY: markValueToScreenXY,
    compassDirectionAngle: compassDirectionAngle,
    compassBetweenAngle:compassBetweenAngle,
    compassTurnAdjust: compassTurnAdjust,
    compassRangeAdjust: compassRangeAdjust,
    compassToDirectionName: compassToDirectionName,
    horizontalAdjust: horizontalAdjust,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_FRONT: DIRECTION_FRONT,
    DIRECTION_BACK: DIRECTION_BACK,
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
    var _distance = distance(lat_a, lng_a, lat_b, lng_b)
    var _duan = distance(lat_a, lng_a, lat_a, lng_b)
    var angle = 180 * Math.asin(_duan / _distance) / Math.PI
    //TODO 四个象限
    return parseInt(angle)
}


/**
 * @method 手机与mark的方向转屏幕坐标
 * @for geo
 * @param
 *      {number} phone_value   手机本身的罗盘度数
 *      {number} mark_value   手机与目标的罗盘度数
 * @return
 *      {number} x y坐标
 *      {number} y x坐标
 */
function markValueToScreenXY(phone_value, mark_value){
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
  else{
    if (obj.direction == DIRECTION_LEFT){
        
        _x = halfWidth - baseStep * parseInt(_value) 
    }else{
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
    // return new_value
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
 *      {number} acc_z Z轴重力参数
 * @return
 *      {number} value 校正手机罗盘度数
 */
function compassTurnAdjust(phone_compass, acc_z ) {
    if (acc_z <= 0 )
        return phone_compass
    else{
        if (phone_compass >= 180 )
            return phone_compass - 180
        else 
            return phone_compass + 180
    }
}


/**
 * @method 罗盘数值转换为方向
 * @for geo
 * @param
 *      {number} value   手机罗盘度数
 * @return
 *      {string} direction_name 方向名称
 */
function compassToDirectionName(value){
    var _index = parseInt(value / 22.5)
    var _list = ["北", "东北", "东北", "东", "东", "东南", "东南", "南", "南", "西南", "西南", "西", "西", "西北", "西北", "北"]
    return _list[_index]
}


/**
 * @method 水平距离校正
 * @for geo
 * @param
 *      {number} base 基础水平线
 *      {number} acc_z Z轴重力参数
 *      {number} distance 手机与mark的距离
 * @return
 *      {string} offset_y Y轴偏移距离
 */
function horizontalAdjust(base, acc_z, distance){
    return 500

  var distance_y = 0
  if (distance < 500)
    distance_y = -100
  return base + parseInt(350 + acc_z * 300) + distance_y 
}