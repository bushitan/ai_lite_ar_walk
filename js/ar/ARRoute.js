
var ARFilter = require("ARFilter.js")
var RouteUtils = require("RouteUtils.js")
var routeUtils = new RouteUtils({ start: false })
var GP
var MODE_MARK = "mark"
var MODE_NAV = "nav"
/**
 * @method  AR的基础类
 */
class ARRoute extends ARFilter {
    constructor(options) {
        super(options)
        if (!options.GP) { throw Error('GP值不能为空'); }

        GP = options.GP
    }

    /**
     * @method  开始导航
     */
    startRoute(options){
        var _route = options.route
        routeUtils = new RouteUtils({
            start: true,
            route: _route
        })
        GP.setData({
            polyline:routeUtils.polyline,
        })
    }


    /**
     * @method  每次获取新的GPS都要渲染一次
     */
    renderRoute() {
        if (routeUtils.isStart()) {
            if (GP.data.mode == MODE_MARK)
                this._setMode(MODE_NAV)
            var _gps = GP.data.GPSLocation
            var _step = routeUtils.getStep()
            var _step_location = _step.location
            var _distance = this.locationUtils.getDistanceAB({
                locationA: _gps,
                locationB: _step_location,
            })
            if(_distance < 20){
                var _next = routeUtils.next()
                if (_next){
                    GP.setData({ step: _next})
                } else{
                    this._setMode(MODE_MARK)
                }
            }
        }
    }

    _setMode(mode){
        GP.setData({
            mode: mode 
        })
    }

    /**
     * @method  关闭导航
     */
    closeRoute(){
        this._setMode(MODE_MARK)
        routeUtils.close()
    }

}

module.exports = ARRoute