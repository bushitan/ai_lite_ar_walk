
var ARRoute = require("ARRoute.js")

var ApiUtils = require("ApiUtils.js")
var LocationUtils = require("LocationUtils.js")
// var locationUtils = new LocationUtils()
var Location = require("Location.js")
var apiUtils = new ApiUtils()

var GP 
var that
/**
 * @method  AR的工具类
 */
class ARUtils extends ARRoute  {

    constructor(options = {}) {
        super(options)
        if (!options.GP) { throw Error('GP值不能为空'); }

        GP = options.GP
        that = this
        this.locationUtils = new LocationUtils()
    }

    search(options = {}) {
        var _keyword = options.keyword || "车站"
        var _gps_location = options.GPSLocation || { latitue: 23.1290800000, longitude: 113.2643600000 }
        
        var _location = new Location(_gps_location)
        apiUtils.getMarkList(_keyword, _location.getString(), this._searchCallback)
    }
    _searchCallback(res){
        var _list = that.locationUtils.formatSearch({
            list: res.data,
            location: GP.data.GPSLocation,
        })
        GP.setData({
            pointList: _list
        })
    }

    /**
 * @method  获取导航路径
 */
    setNavRoute(options) {
        // apiUtils.getRoute()
        var _mark_id = options.markID
        var _list = GP.data.pointList
        var _mark = Utils.getMark(_list, _mark_id)
        var _gps = GP.data.GPSLocation
        console.log("setNavRoute",_mark, _gps)
        apiUtils.getRoute({
            fromStr: _gps.latitue + "," + _gps.longitude,
            toStr: _mark.latitue + "," + _mark.longitude,
            callback: this._navRouteCallback,
        })

        //设置终点
        GP.setData({
            focus: [ _mark ]
        })
    }

    /**
    * @method  获取导航路径回调
    */
    _navRouteCallback(route) {
        var _route = route
        _route = that.locationUtils.formatRoute({
            route: _route
        })
        console.log("this", _route)
        that.startRoute({ route: _route})
    }
}

var Utils = {
    getMark(list, mark_id) {
        var _list = list
        var _mark_id = mark_id
        for (var i = 0; i < _list.length; i++) {
            if (_list[i].id == _mark_id) {
                return _list[i]
            }
        }
    },
}
module.exports = ARUtils