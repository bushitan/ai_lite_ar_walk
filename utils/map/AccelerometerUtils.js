var Line = require("Line.js")
var Angle = require("Angle.js")

module.exports = {
    filterValueZ: filterValueZ,
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
function filterValueZ(valueZ) {
    var z = valueZ
    if (z > 1) z = 1
    if (z < -1) z = -1
    return z
}
