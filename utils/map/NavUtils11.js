


var Location = require("Location.js")

var LocationUtils = require("LocationUtils.js")
var Nav = require("Nav.js")
var Routes = require("Routes.js")


var Route = require("../../utils/map/Route.js") 
var route

var routes = {}
var start = false


module.exports = {
    isStart:isStart,
    initRoutes: initRoutes,
    renderRoutes: renderRoutes,

    isNextLocation: isNextLocation,
    getNextLocation: getNextLocation,

    setMode: setMode,
    setPath: setPath,
    getInfo: getInfo,
    // getDirection: getDirection,
    getIconHeight: getIconHeight,
    // getImageList: getImageList,

    MODE_NORMAL: "normal",
    MODE_3D: "3D",
}



/**
 * @method 判断是否开始导航
 */
function isStart() {
    return start
}
/**
 * @method 判断是否开始导航
 */
function end() {
    routes = {}
    start = false
}

/**
 * @method 开始导航
 * @param
 *      {object} routes 腾讯的返回路由
 */
function initRoutes(r) {
    routes = Routes.create(r)
    start = true //开始导航

    // NavRoutes.setRoutes(routes) //把location过滤
    // stepIndex = 0
    // start = true //开始导航
    // wx.setStorageSync("routes", routes)
}



    /**
     * 1 请求导航信息，成功打开导航
     * 2 检测距离当前导航点的距离
     *      距离 < 10米 
     *          下一点导航点
     *              if 最后一个点  导航结束
     *              else  切换下一个点
     *      继续导航 
     * 3 获取当前点信息、距离
     * 4 更新中央图标
     * 5 计算自身与目标点的方向，计算角度
     * 6 更新黄色方向
     */


/**
 * @method 导航渲染
 * @param
 *      {number} direction_num 腾讯的返回路由
 */
function renderRoutes(direction_num, acc, gps_location){
    var _d = direction_num
    var _acc = acc
    var _gps = gps_location
    console.log(routes)


    var _current_step = route.getCurrentStep()
    var _step_location = _current_step.location
    var _info = {
        distance: LocationUtils.getDistanceAB(_gps, _step_location),
        instruction: _current_step.instruction,
        dialog: _current_step.dir_desc,
    }
    var _direction = LocationUtils.getDirection(_d, _gps, _step_location)
    var _icon_height = route.getDerIconHeight({ acc_z: _acc_z })
    var _circle_list = route.getImageList({ direction: _direction, acc_z: _acc_z })

    var _nav = {
        info: _info,
        currentStep: _current_step,
        iconHeight: _icon_height,
        circleList: _circle_list,
    }

    // var _info = Routes.getStepInfo(routes)
    // var _direction = Routes.getSelfToStepDirection(routes, _d, _gps)
    // var _current_step = Routes.getCurrentStep(routes)
    // var _icon_height = Nav.getIconHeight(_acc)
    // var _circle_list = Nav.getImageList(_direction, _acc)
    // var _nav = {
    //     info: _info,
    //     currentStep: _current_step,
    //     iconHeight: _icon_height,
    //     circleList:_circle_list,
    // }    
    // console.log(_nav)
    return _nav
}



/**
 * @method 判断是否到下一目标点
 * @param
 *      {location} self_location 用户的位置
 */
function isNextLocation( direction_num, self_location) {
    NavRoutes.isNextLocation(routes, stepIndex,direction_num, self_location)
}


/**
 * @method 获取下一点的信息
 * @param
 *      {location} self_location 用户的位置
 */
function getNextLocation(self_location) {
    var _step = routes.steps[stepIndex]
    _step.instruction
    return {
        distance: LocationUtils.getDistanceAB(self_location, _step.location),
        instruction: _step.instruction,
        dialog: _step.dir_desc,
    }
}


















/**
 * @method 设置导航模式
 * @param
 *      {string} mode 模式 | "11"普通导航 | "12" 百度样式导航
 */
function setMode(mode) {
    currentPath = txObject
}


var currentPath = {}
/**
 * @method 设置导航路径
 * @param
 *      {object} baiduObject 腾讯的返回对象
 */
function setPath(txObject) {
    currentPath = txObject
}

/**
 * @method 获取本次导航的信息
 * @param
 *      {object} value 手机的方向数值
 */
function getInfo() {
    //TODO 判断导航的开关

    //反馈信息

    return {
        name: "青秀山",
        distance: "197",
        rate:"50",
    }
}

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

