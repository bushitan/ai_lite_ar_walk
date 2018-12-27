


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
     * 获取当前step
     * @return 
     *      {Object} current_step 当前步骤
     */
    getCurrentStep(){
        return this.current_step
    }


    getRoute(){
        return this.route
    }
}
module.exports = Route;