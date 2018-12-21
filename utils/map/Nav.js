
module.exports = {
    TXFilterLocation: TXFilterLocation,
    isNextLocation: isNextLocation,
}

var LocationUtils = require("LocationUtils.js")


/**
 * @method 腾讯导航数组
 * @param
 *      {objuect} routes 路由路线
 */
function TXFilterLocation(routes) {
    // routes

    var coors = routes.polyline, pl = [];
    var steps = routes.steps
    console.log(steps)


    //坐标解压（返回的点串坐标，通过前向差分进行压缩）
    var kr = 1000000;
    for (var i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    }

    for (var i = 0; i < steps.length; i++) {
        // console.log(steps[i].polyline_idx)

        var location = Location.create(
            coors[steps[i].polyline_idx[0]],
            coors[steps[i].polyline_idx[1]]
        )
        steps[i].location = location
        // var location = coors[steps[i].polyline_idx[0]]
    }
    routes.steps = steps
    return routes
}



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

