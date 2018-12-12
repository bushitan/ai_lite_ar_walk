var Line = require("Line.js")
var Angle = require("Angle.js")

const COMPASS_RANGE = 2 //罗盘方向误差范围，3°
const DIRECTION_LEFT = "left" //左方向
const DIRECTION_RIGHT = "right" //右方向 
const DIRECTION_FRONT = "front" //正前方
const DIRECTION_BACK = "back" //后方 
module.exports = {
    // distance: distance,
    filterDirection: filterDirection,
    includedAngle: includedAngle,
    checkReverse: checkReverse,
    getName: getName,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_FRONT: DIRECTION_FRONT,
    DIRECTION_BACK: DIRECTION_BACK,
}

/**
 * @method 过滤罗盘值
 * @for CompassUtils
 * @param
 *      {number} direction 手机本身的罗盘度数
 * @return
 *      {number} direction 过滤后的罗盘度数
 */
// function angleBetweenLine(phone_value, mark_value) {
function filterDirection(direction) {
    var abs = parseInt(direction / 4) * 4
    return parseInt(direction)
}



/**
 * @method 两个方向的夹角值
 * @for CompassUtils
 * @param
 *      {number} phone_value   手机本身的罗盘度数
 *      {number} mark_value   手机与目标的罗盘度数
 * @return
 *      {number} value 夹角度数
 *      {string} direction 目标在手机的左or右
 */
// function angleBetweenLine(phone_value, mark_value) {
function includedAngle(lineA, lineB) {
    var A = lineA
    var B = lineB
    var value, side
    if (A.direction > B.direction) { //手机 > 目标
        if (A.direction - B.direction <= 180) {//手机 - 目标 <= 180
            value = A.direction - B.direction
            side = DIRECTION_LEFT
        } else { //手机 - 目标 > 180
            value = 359 - A.direction + B.direction
            side = DIRECTION_RIGHT
        }
    }
    else {//目标 > 手机
        if (A.direction - B.direction <= 180) { // 目标 - 手机 <= 180
            value = A.direction - B.direction
            side = DIRECTION_RIGHT
        } else {// 目标 - 手机 > 180
            value = 359 - A.direction + B.direction
            side = DIRECTION_LEFT
        }
    }
    return Angle.create(value,side)
}


/**
 * @method 检测是否举得太高，罗盘方向倒置，手机抬过z轴的0度，掉头
 * @for geo
 * @param
 *      {number} phone_compass   手机罗盘度数
 *      {number} acc_z Z轴重力参数
 * @return
 *      {number} value 校正手机罗盘度数
 */
function checkReverse(line, acc_z) {
    if (acc_z <= 0)
        return line
    else {
        if (line.direction >= 180) {
            line.direction = line.direction- 180
            return line
        }
        else{
            line.direction = line.direction + 180
            return line
        }
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
function getName(value) {
    var _index = parseInt(value / 22.5)
    var _list = ["北", "东北", "东北", "东", "东", "东南", "东南", "南", "南", "西南", "西南", "西", "西", "西北", "西北", "北"]
    return _list[_index]
}
