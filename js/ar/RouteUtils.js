

class RouteUtils{
    constructor(options = {}) {
        this.start = options.start
        if (options.hasOwnProperty("route")) { //当传入导航信息才开始
            this.route = options.route //导航路由
            var _index = 0
            this.index = _index //导航索引
            this.polyline = options.route.polyline  //导航路径
            this.step = options.route.steps[_index] //当前导航点
            this.steps_length = options.route.steps.length  //导航点长度
        }
    }

    /**
     * @method 导航是否开始
     * 
     * @return {Object} step信息
     */
    isStart(){
        return this.start
    }

    /**
     * @method 关闭导航
     * 
     * @return {Object} step信息
     */
    close(){
        this.start = false
    }

    /**
     * @method 设置下一步导航
     * 
     * @return {Object} step信息
     */
    next() {
        //导航结束
        if (this._isEnd) {
            this.start = false
            return false
        }
        else {
            //下一点
            var _index = this.index + 1
            this.index = _index
            this.step = this.route.steps[_index]
            return this.step
        }
    }


    /**
     * @method 检测是否到达目的地
     * 
     */
    _isEnd(){
        var _index = this.index
        var _length = this.steps_length
        if (_index >= _length) {
            return false
        }
        else
            return true
    }

    /**
     * @method 获取当前step
     * @return 
     *      {Object} current_step 当前步骤
     */
    getStep() {
        return this.step
    }

    /**
     * 获取当前step
     * @return 
     *      {Object} current_step 当前步骤
     */
    getPolyline() {
        return this.polyline
    }
}

module.exports = RouteUtils