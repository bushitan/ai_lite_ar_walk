
var LocationUtils = require("LocationUtils.js")
var CompassUtils = require("CompassUtils.js")
var AccelerometerUtils = require("AccelerometerUtils.js")
var NavUtils = require("NavUtils.js")
var MarkUtils = require("MarkUtils.js")
var MenuUtils = require("MenuUtils.js")
var SwitchUtils = require("SwitchUtils.js") 
var QQMapWX = require('../wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});

var GP
module.exports = {
    init: init,

    // 点击事件
    clickMark: clickMark,
    clickMarkInfoCancel: clickMarkInfoCancel,
    clickMarkInfoToNav: clickMarkInfoToNav,
    clickNavCancel: clickNavCancel,
    clickNavAndMap: clickNavAndMap,
    clickNavMapOff: clickNavMapOff,
    clickNavOff: clickNavOff,

    // 基础公共功能
    render: render,
    queryMark: queryMark,
    queryNav: queryNav,
    filterAccelerometerZ: filterAccelerometerZ,
    filterCompassDirection: filterCompassDirection,
}


/**
 * @method 初始化
 * @for ARUtils
 * @param
 *      {object} gp 全局对象
 */
function init(gp){
    GP = gp
    GP.setData({
        show: SwitchUtils.onLoad() 
    })
    
}

/**
 * @method 打开mark详情
 * @for ARUtils
 * @param
 *      {number} mark_id mark的ID
 */
function clickMark(mark_id) {
    GP.setData({
        show: SwitchUtils.onMarkInfo()
    })
}
/**
 * @method 关闭mark详情
 * @for ARUtils
 * @param
 *      {number} mark_id mark的ID
 */
function clickMarkInfoCancel(mark_id) {
    GP.setData({
        show: SwitchUtils.offMarkInfo()
    })
}

/**
 * @method 在mark详情中打开导航
 * @for ARUtils
 * @param
 *      {number} mark_id mark的ID
 */
function clickMarkInfoToNav(mark_id) {
    GP.setData({
        show: SwitchUtils.onNav()
    })
}

/**
 * @method 退出导航
 * @for ARUtils
 * @param
 *      {number} mark_id mark的ID
 */
function clickNavCancel(mark_id) {
    GP.setData({
        show: SwitchUtils.offNav()
    })
}



/**
 * @method 在nav中打开地图，并设置绘制导航路线
 * @for ARUtils
 */
function clickNavAndMap() {
    GP.setData({
        show: SwitchUtils.onNavMap()
    })
}
/**
 * @method 关闭导航地图
 * @for ARUtils
 */
function clickNavMapOff() {
    GP.setData({
        show: SwitchUtils.offNavMap()
    })
}
/**
 * @method 关闭导航
 * @for ARUtils
 */
function clickNavOff() {
    GP.setData({
        show: SwitchUtils.offNav()
    })
}









/**
 * @method 渲染
 * @for ARUtils
 * @param
 *      {object} GP 全局对象
 *      {number} directionNum 罗盘方向
 *      {number} acc_zNum 罗盘方向
 */
function render( direction_num,acc_z_num) {

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
 * @method 根据关键字查询标记点
 * @for ARUtils
 * @param
 *      {string} key 查询关键参数
 */
function queryMark(key,location_str) {
    //搜索
    qqmapsdk.search({
        keyword: key,
        location: location_str,
        // location: "23.1290800000, 113.2643600000",
        success: function (res) {
            console.log(res);
        },
        fail: function (res) {
            console.log(res);
        },
    })
}

/**
 * @method 查询腾讯导航路径
 * @for ARUtils
 * @param
 *      {string} from_str 开始点经纬度
 *      {string} to_str 结束点经纬度
 */
function queryNav(from_str,to_str) {

    // 步行导航
    var opt = {
        //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
        url: 'https://apis.map.qq.com/ws/direction/v1/walking/'
            +'?from=' + from_str            
            +'&to=' + to_str
            +'&key=' + KEY,
        method: 'GET',
        dataType: 'json',
        //请求成功回调
        success: function (res) {
            var ret = res.data
            if (ret.status != 0) return; //服务异常处理
            var coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
                pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }
            NavUtils.setPath(pl)
            // console.log(pl)
        }
    };
    wx.request(opt);
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




