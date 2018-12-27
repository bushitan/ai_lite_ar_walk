
var LocationUtils = require("LocationUtils.js")
var MarkUtils = require("MarkUtils.js")
var MenuUtils = require("MenuUtils.js")
var SwitchUtils = require("SwitchUtils.js")
var ApiUtils = require("../../utils/map/ApiUtils.js")
var QQMapWX = require('../wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});

var GP
var ARClick = require("ARClick.js")
/**
 * @extends ARClick
 */
class AR extends ARClick  {
    // #B=2
    /**
     * @method 构造函数
     * 
     * @param {Object} options 接口参数 
     *      {Object} GP 全局对象
     */
    constructor(options){
        super(options)
        if (options.hasOwnProperty("GP") == false)  { throw Error('GP值不能为空');}
        GP = options.GP 

        this.mark_utils = new MarkUtils({ list: GP.data.markList }) 
    }


    /**
     * @method 渲染
     * 
     * @param
     *      {Number} direction罗盘方向
     *      {Number} acc_z 罗盘方向
     */
    render(options) {
        if (options.hasOwnProperty("direction") == false) { throw Error('direction值不能为空'); }
        if (options.hasOwnProperty("acc_z") == false) { throw Error('acc_z值不能为空'); }

        var _d = options.direction
        var _acc_z = options.acc_z 
        //到达地点
        if (this.nav_utils.isArrive()) {
            // clickNavOff()
        }

        if (this.nav_utils.isStart() == false)
            Utils.renderMark(_d, _acc_z, this.mark_utils) //普通渲染mark
        else
            Utils.renderNav(_d, _acc_z, this.nav_utils) //导航渲染
    }
}

var Utils = {

    /**
     * @method 普通渲染
     * 
     * @param
     *      {Number} direction罗盘方向
     *      {Number} acc_z 罗盘方向
     */
    renderMark(direction_num, acc_z_num, mark_utils) {
        var _acc_z = acc_z_num
        var _direction = direction_num
        // var _mark_list = GP.data.markList //用户传入mark的列表
        var _location = GP.data.GPSLocation //用户的地理位置
        //渲染mark列表
        // var _mark_list = MarkUtils.render(_location, _direction, _mark_list)
        var _mark_list = mark_utils.render(_location, _direction)
        GP.setData({
            markList: _mark_list, //标点位置
        })
    },

    /**
     * @method 导航渲染
     * @for ARUtils
     * @param
     *      {number} directionNum 罗盘方向
     *      {number} acc_zNum 罗盘方向
     */
    renderNav(direction_num, acc_z_num, nav_utils) {
        var _acc_z = acc_z_num
        var _direction = direction_num
        var _mark_list = GP.data.markList //用户传入mark的列表
        var _location = GP.data.GPSLocation //用户的地理位置
        var _nav = nav_utils.render({
                direction: _direction,
                acc_z: _acc_z,
                gps_location: _location,
            })

        GP.setData({
            nav: _nav
        })
    }

}

module.exports = AR
