
module.exports = {
    // TXFilterLocation: TXFilterLocation,
    // getStepInfo:getStepInfo,


    getIconHeight: getIconHeight,
    getImageList: getImageList,
}

var LocationUtils = require("LocationUtils.js")
// var routes = wx.getStorageSync("routes")


/**
 * @method 获取导航图标的高度
 * @param
 *      {number} acc_z z轴重力加速度
 */
function getIconHeight(acc_z) {
    var tempAccZ = (Math.abs(acc_z)) * 50
    // tempAccZ = parseInt(tempAccZ / 5) * 5
    tempAccZ = tempAccZ + 20
    tempAccZ = parseInt(tempAccZ)
    if (tempAccZ > 70)
        tempAccZ = 70
    return tempAccZ
}



/**
 * @method 获取渲染的mark数组
 * @param
 *      {number} nav_direction 手机的方向数值
 *      {number} acc_z z轴重力加速度
 */
function getImageList(nav_direction, acc_z) {
    //TODO 判断导航的开关
    // return []
    if (nav_direction >= 0 && nav_direction <= 90) {
        var d = nav_direction
        return baseDirMath(d, acc_z, 1, -1)
    }
    else if (nav_direction >= -90 && nav_direction < 0) {
        var d = Math.abs(nav_direction)
        return baseDirMath(d, acc_z, -1, -1)
    }
    else if (nav_direction > 90 && nav_direction <= 180) {
        var d = 180 - Math.abs(nav_direction)
        return baseDirMath(d, acc_z, 1, 1)
    }
    else {
        var d = 180 - Math.abs(nav_direction)
        return baseDirMath(d, acc_z, -1, 1)
    }
}

function baseDirMath(nav_direction, acc_z, side_x, side_y) {
    var _nav_direction = nav_direction
    var _angle = Math.abs(_nav_direction) * Math.PI / 180
    var _start_x = 350
    var _start_y = 785
    var _w = 50
    var _h = (Math.abs(acc_z)) * _w + 14
    if (_h > 50)
        _h = 50
    var _space = (Math.abs(acc_z)) * _w / 2 + 5
    var BaseL = 50 + 30  // _h + _space
    var L = _space + _h
    var _dx = BaseL * Math.sin(_angle)
    var _dy = L * Math.cos(_angle)
    var _list = [], _length = 5
    for (var i = 0; i < _length; i++) {
        var temp = {
            x: _start_x + _dx * i * side_x,
            y: _start_y + _dy * i * side_y - _h,
            w: _w,
            h: _h,
        }
        _list.push(temp)
    }
    return _list
}


//TODO 距离在30米以内的，永远显示在正前方





/**
 * @method 判断是否到下一目标点
 * @param
 *      {location} self_location 用户的位置
 */
function isNextLocation(routes,stepIndex,direction_num, self_location) {

    if (routes.hasOwnProperty("steps") == false)
        return "导航未开始"
    var _step_length = routes.steps.length
    if (stepIndex >= _step_length - 1) {
        return "导航结束"
    }

    var _step = routes.steps[stepIndex]
    console.log(_step)
    var _next_location = _step.location
    var _nav_direction = LocationUtils.getDirection(direction_num, self_location, _next_location)
    return _nav_direction
    // currentPath = txObject
}

