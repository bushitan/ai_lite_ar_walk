var Line = require("Line.js")

const COMPASS_RANGE = 2 //罗盘方向误差范围，3°
// const DIRECTION_LEFT = "left" //左方向
// const DIRECTION_RIGHT = "right" //右方向 
// const DIRECTION_FRONT = "front" //正前方
// const DIRECTION_BACK = "back" //后方 
module.exports = {
    // distance: distance,
    filterDirection: filterDirection,
    checkReverse: checkReverse,
    getName: getName,
    // DIRECTION_LEFT: DIRECTION_LEFT,
    // DIRECTION_RIGHT: DIRECTION_RIGHT,
    // DIRECTION_FRONT: DIRECTION_FRONT,
    // DIRECTION_BACK: DIRECTION_BACK,
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
    return parseInt(abs)
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
function checkReverse(direction, acc_z) {
    if (acc_z <= 0)
        return parseInt(direction)
    else {
        if (direction >= 180) {
            direction = direction- 180
            return parseInt(direction)
        }
        else{
            direction = direction + 180
            return parseInt(direction)
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
