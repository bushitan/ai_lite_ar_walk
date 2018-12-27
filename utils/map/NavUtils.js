

var Route = require("../../utils/map/Route.js")
var LocationUtils = require("../../utils/map/LocationUtils.js")
var route 

var STATUS = {
    PREPARE : 0,
    START : 1,
    END : 2,
    ARRIVE:3,
}
class NavUtils {
    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,route 为必选参数
     */
    constructor(options) {
        this.status = STATUS.PREPARE
    }

    /**
     * 设置导航路由
     * 
     * @param 
     *   必填  {Object} route 百度获取的导航路由  
     */
    setRoute(options) {
        if (options.hasOwnProperty("route") == false) {
            throw Error('route值不能为空');
        }
        var _r = options.route
        console.log(_r)

        this.route = new Route({
            route: wx.getStorageSync("routes")
        })
    }


    /**
     * 导航是否开始
     */
    isStart(){
        if (this.status == STATUS.START)
            return true
        else
            return false
    }

    /**
     * 导航开始
     */
    start(){
        this.status = STATUS.START
    }

    /**
     * 导航结束
     */
    close() {
        this.status = STATUS.END
    }


    /**
     * 到达目的地
     */
    arrive() {
        this.status = STATUS.ARRIVE

    }


    /**
     * 是否到达目的地
     */
    isArrive() {
        if(this.status == STATUS.ARRIVE)
            return true
        else
            return false
    }
    

    /**
     * 设置导航路由
     *
     * @param
     *      必填 {Number} direction 罗盘方向
     *      必填 {Number} acc_z 手机姿势
     *      必填 {Location} gps_location 手机GPS坐标
     *
     * @return
     *      {Object} 导航展示信息
     */
    render(options) {

        
        
        
        if (options.hasOwnProperty("direction") == false) { throw Error('direction值不能为空'); }
        if (options.hasOwnProperty("acc_z") == false) { throw Error('acc_z值不能为空'); }
        if (options.hasOwnProperty("gps_location") == false) { throw Error('gps_location值不能为空'); }

        var _d = options.direction
        var _acc_z = options.acc_z
        var _gps = options.gps_location

        var _r = this.route
        var _current_step = _r.getCurrentStep()        

        //渲染显示信息
        var _info = Utils.getRouteInfo(_current_step, _gps)
        var _direction = Utils.getDirectionSelfToStep(_current_step, _gps, _d)
        var _icon_height = Utils.getDerIconHeight(  _acc_z )
        var _circle_list = Utils.getImageList(  _direction,  _acc_z  )

        //到达下一点，next
        if (Utils.checkNextStep(_current_step, _gps))
        {
            //最后一点
            if (_r.next() == false) {
                this.arrive()
            }

        }

        return {
            info: _info,
            currentStep: _current_step,
            iconHeight: _icon_height,
            circleList: _circle_list,
        }
        
    }

}





var Utils = {

    /**
     * 获取路由的导航信息
     * @return
     *      {Boolean} 是否走下一步
     * 
     */
    checkNextStep(current_step, gps) {

        var distance = LocationUtils.getDistanceAB(gps, current_step.location)
        if(distance<30)
            return true
        else
            return false

        // return {
        //     distance: LocationUtils.getDistanceAB(gps, current_step.location),
        //     instruction: current_step.instruction,
        //     dialog: current_step.dir_desc,
        // }
    },

    /**
     * 获取路由的导航信息
     */
    getRouteInfo(current_step, gps) {
        return {
            distance: LocationUtils.getDistanceAB(gps, current_step.location),
            instruction: current_step.instruction,
            dialog: current_step.dir_desc,
        }
    },

    /**
     * 获取自身与下一目标点的方向
     */
    getDirectionSelfToStep(current_step, gps, direction) {
        return LocationUtils.getDirection(direction, gps, current_step.location)
    },

    /**
     * 中央图标高度计算
     */
    getDerIconHeight(acc_z) {
        var tempAccZ = (Math.abs(acc_z)) * 50
        // tempAccZ = parseInt(tempAccZ / 5) * 5
        tempAccZ = tempAccZ + 20
        tempAccZ = parseInt(tempAccZ)
        if (tempAccZ > 70)
            tempAccZ = 70
        return tempAccZ
    },

    /**
     * 获取导航方向图标数组
     * 
     * @param {Object} options 接口参数,
     *      direction 
     *      acc_z
     */
    getImageList(direction, acc_z) {
        var nav_direction = direction
        var acc_z = acc_z
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

        //导航方向数组计算
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
    }
    

}

module.exports = NavUtils;

