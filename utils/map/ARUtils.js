
var LocationUtils = require("LocationUtils.js")
var CompassUtils = require("CompassUtils.js")
var AccelerometerUtils = require("AccelerometerUtils.js")
var NavUtils = require("NavUtils.js")
var MarkUtils = require("MarkUtils.js")
var MenuUtils = require("MenuUtils.js") 

module.exports = {
    render: render,
    queryNavByBaidu: queryNavByBaidu,
    filterAccelerometerZ: filterAccelerometerZ,
    filterCompassDirection: filterCompassDirection,
}

/**
 * @method 渲染
 * @for ARUtils
 * @param
 *      {object} GP 全局对象
 *      {number} directionNum 罗盘方向
 *      {number} acc_zNum 罗盘方向
 */
function render(GP, direction_num,acc_z_num) {

    //参数配置
    var _acc_z = acc_z_num
    var _direction = direction_num
    var _mark_list = GP.data.markList //用户传入mark的列表
    var _location = GP.data.GPSLocation //用户的地理位置

    //渲染mark列表
    var _direction_name = CompassUtils.getName(_direction)
    var _mark_list = MarkUtils.getList(_location,_direction, _mark_list)
    var _navInfo = NavUtils.getInfo()
    var _nav_direction = NavUtils.getDirection(direction_num, _location)
    var _nav_icon_height = NavUtils.getIconHeight(_acc_z)
    var _navImageList = NavUtils.getImageList(_nav_direction, _acc_z, _location)
    // console.log(_navImageList)
  
    //渲染
    GP.setData({
        directionName: _direction_name, //方向名称
        markList: _mark_list, //标点位置
        navInfo: _navInfo, //导航的总体信息
        navDirection: _nav_direction,
        navIconHeight: _nav_icon_height,
        imageList: _navImageList, //导航图标

        // // compassStep: compassStep % 3,
    })
}

/**
 * @method 查询腾讯导航路径
 * @for ARUtils
 * @param
 *      {string} key 查询关键参数
 */
function queryNavByBaidu(key) {
    var obj = { "baidu": "213" }
    NavUtils.setPath(obj)
}

/**
 * @method 设置导航模式
 * @for ARUtils
 * @param
 *      {string} mode 模式 
 */
function setNavMode(mode) {
    var obj = { "baidu": "213" }
    NavUtils.setMode(obj)
}



/**
 * @method 获取导航信息
 * @for ARUtils
 * @param
 *      {object} GP 全局对象，
 * @return
 *      {number} s 两点距离
 */
function getNavInfo() {

}




/**
 * @method 过滤Z轴转动漂移
 * @for ARUtils
 * @param
 *      {object} GP 全局对象，
 * @return
 *      {number} s 两点距离
 */
function filterAccelerometerZ(valueZ) {
    return AccelerometerUtils.filterValueZ(valueZ)
}


/**
 * @method 过滤Z轴转动漂移
 * @for ARUtils
 * @param
 *      {number} direction 罗盘方向
 *      {number} acc_z Z轴姿势
 * @return
 *      {number} s 两点距离
 */
function filterCompassDirection(direction,acc_z) {
    direction = CompassUtils.filterDirection(direction)
    direction = CompassUtils.checkReverse(direction, acc_z)
    return direction
}




