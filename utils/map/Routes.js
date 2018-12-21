

var Location = require("Location.js")
var LocationUtils = require("LocationUtils.js")


module.exports = {
    create:create,
    getStepInfo:getStepInfo,
    getSelfToStepDirection: getSelfToStepDirection,
    getCurrentStep: getCurrentStep,
}

/**
 * @method 腾讯导航数组
 * @param
 *      {objuect} routes 路由路线
 * @trturn
 *      {objuect} routes point转location
 */
function create(routes) {
    return {
        "routes": TXFilterLocation(routes),
        "index":0,
        "step_length": routes.steps.length,
    }
}

/**
 * @method 腾讯导航数组
 * @param
 *      {objuect} routes 路由路线
 * @trturn
 *      {objuect} routes point转location
 */
function TXFilterLocation(routes) {
    var coors = routes.polyline, pl = [];
    var steps = routes.steps
    console.log(steps)

    //坐标解压（返回的点串坐标，通过前向差分进行压缩）
    var kr = 1000000;
    for (var i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    }

    for (var i = 0; i < steps.length; i++) {
        var location = Location.create(
            coors[steps[i].polyline_idx[0]],
            coors[steps[i].polyline_idx[1]]
        )
        steps[i].location = location
    }
    routes.steps = steps
    return routes
}


/**
 * @method 获取路由信息
 * @param
 *      {objuect} routes 路由路线
 * @trturn
 *      {objuect} routes point转location
 */
function getStepInfo(routes) {
    var _r = routes
    var _index = _r.index
    return _r.routes.steps[_index] || {}
}


/**
 * @method 获取自己与下一点的方向
 * @param
 *      {objuect} routes 路由路线
 * @trturn
 *      {objuect} routes point转location
 */
function getSelfToStepDirection(routes, direction, gps_location) {
    var _r = routes
    var _d = direction
    var _gps = gps_location
    var _index = _r.index
    var _step = _r.routes.steps[_index]
    
    // console.log(_step)
    var _next_location = _step.location
    return LocationUtils.getDirection(_d, _gps, _next_location)
}




/**
 * @method 获取自己与下一点的方向
 * @param
 *      {objuect} routes 路由路线
 * @trturn
 *      {objuect} routes point转location
 */
function getCurrentStep(routes) {
    var _r = routes
    var _index = _r.index
    var _step = _r.routes.steps[_index]

    var _obj = [
        {
        id: 1, x: 10, y: 50, name: "tesname", distance: 500,
        latitude: _step.location.latitude,
        longitude: _step.location.longitude, 
        compass_value: 0
        }
    ]
    return _obj
}
