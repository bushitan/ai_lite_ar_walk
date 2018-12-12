
var LocationUtils = require("LocationUtils.js")
var CompassUtils = require("CompassUtils.js")
var NavUtils = require("NavUtils.js")
var MarkUtils = require("MarkUtils.js")
var MenuUtils = require("MenuUtils.js") 

module.exports = {
    render: render,
    queryNavByBaidu: queryNavByBaidu,

}

/**
 * @method 渲染
 * @for geo
 * @param
 *      {object} GP 全局对象，
 *      {object} GlobalValue 全局变量，
 */
function render(GP, GlobalValue) {
     //更新当前经纬度
    LocationUtils.getCurrentLocation(GlobalValue)

    //参数配置
    var _acc_z = GlobalValue.accelerometerZ
    var _compass_direction = GlobalValue.compassDirection
    var _mark_list = GP.data.markList //用户传入mark的列表
    var _self_location = GlobalValue.selfLocation //用户的地理位置

    //渲染mark列表
    var _direction_name = CompassUtils.getName(_compass_direction)
    var _mark_list = MarkUtils.getList(_compass_direction, _mark_list)
    var _navInfo = NavUtils.getInfo()
    var _navImageList = NavUtils.getImageList(_compass_direction, _acc_z, _self_location)
    
    //渲染
    GP.setData({
        directionName: _direction_name, //方向名称
        markList: _mark_list, //标点位置
        navInfo: _navInfo, //导航的总体信息
        imageList: _navImageList, //导航图标
        // // compassStep: compassStep % 3,
    })
}

/**
 * @method 查询腾讯导航路径
 * @param
 *      {string} key 查询关键参数
 */
function queryNavByBaidu(key) {
    var obj = { "baidu": "213" }
    NavUtils.setPath(obj)
}

/**
 * @method 设置导航模式
 * @param
 *      {string} mode 模式 
 */
function setNavMode(mode) {
    var obj = { "baidu": "213" }
    NavUtils.setMode(obj)
}



/**
 * @method 获取导航信息
 * @for geo
 * @param
 *      {object} GP 全局对象，
 * @return
 *      {number} s 两点距离
 */
function getNavInfo(){

}


