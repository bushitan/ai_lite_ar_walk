


var Location = require("Location.js")
var Utils = {
    /**
     * 对腾讯地图导航坐标解压
     * 
     * @param {Object} 未解压routes参数
     */
    TXFilterLocation(routes) {
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
    },

    getDerIconHeight(acc_z) {
        var tempAccZ = (Math.abs(acc_z)) * 50
        // tempAccZ = parseInt(tempAccZ / 5) * 5
        tempAccZ = tempAccZ + 20
        tempAccZ = parseInt(tempAccZ)
        if (tempAccZ > 70)
            tempAccZ = 70
        return tempAccZ
    },


    baseDirMath(nav_direction, acc_z, side_x, side_y) {
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


class Route {

    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,route 为必选参数
     */
    constructor(options) {
        if (!options.route) {
            throw Error('route值不能为空');
        }
        var _route = Utils.TXFilterLocation(options.route)
        var _index = 0
        this.route = _route
        this.index = _index
        this.current_step = _route.steps[_index]
        this.steps_length = _route.steps.length
    }

    isEnd(){
        var _index = this.index
        var _length = this.steps_length
        if (_index >= _length) {
            console.log("到达位置，导航结束")
            return false
        }
        else
            return true
    }

    /**
     * 设置下一步导航
     * 
     * @return {Object} step信息
     */
    next() {
        var _index = this.index
        var _length = this.steps_length
        if (_index >= _length) {
            console.log("到达位置，导航结束")
            return false
        }

        var _index = _index + 1
        this.index = _index
        this.current_step = this.route.steps[_index]
    }

    /**
     * 获取当前步数的信息
     * 
     * @return {Object} step信息
     */
    getCurrentStep() {
        return this.current_step
    }


    /**
     * 获取自身方向图标的高度
     * 
     * @param {Object} options 接口参数
     *      route 为必选参数
     */
    getDerIconHeight(options){
        var _acc_z = options.acc_z
        return Utils.getDerIconHeight(_acc_z)
    }


    /**
     * 获取导航方向图标数组
     * 
     * @param {Object} options 接口参数,
     *      direction 
     *      acc_z
     */
    getImageList(options) {
        var nav_direction = options.direction
        var acc_z = options.acc_z
        if (nav_direction >= 0 && nav_direction <= 90) {
            var d = nav_direction
            return Utils.baseDirMath(d, acc_z, 1, -1)
        }
        else if (nav_direction >= -90 && nav_direction < 0) {
            var d = Math.abs(nav_direction)
            return Utils.baseDirMath(d, acc_z, -1, -1)
        }
        else if (nav_direction > 90 && nav_direction <= 180) {
            var d = 180 - Math.abs(nav_direction)
            return Utils.baseDirMath(d, acc_z, 1, 1)
        }
        else {
            var d = 180 - Math.abs(nav_direction)
            return Utils.baseDirMath(d, acc_z, -1, 1)
        }
    }


    
    getRoute(){
        return this.route
    }
}
module.exports = Route;