
var Location = require("Location.js")

/**
 * @method  地理位置工具类
 */
class LocationUtils {
    constructor(options) {
        // if (!options.hasOwnProperty("latitue")) { throw Error('latitue值不能为空'); }
        // if (!options.hasOwnProperty("longitude")) { throw Error('longitude值不能为空'); }
        // latitue, longitude, name, style
    }

    /**
     * @method 计算两点间距离
     * @param
     *      {Location} A 点，
     *      {Location} B 点，
     * @return
     *      {Number} s 两点距离
     */
    getDistanceAB(options) {
        if (!options.hasOwnProperty("locationA")) { throw Error('A值不能为空'); }
        if (!options.hasOwnProperty("locationB")) { throw Error('B值不能为空'); }
        var A = options.locationA
        var B = options.locationB
        const EARTH_RADIUS = 6378137.0;
        var radLat1 = (A.latitue * Math.PI / 180.0);
        var radLat2 = (B.latitue * Math.PI / 180.0);
        var a = radLat1 - radLat2;
        var b = (A.longitude - B.longitude) * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return parseInt(s);
    }


    /**
     * @method 两点所连直线的罗盘方向角
     * @param
     *      {Location} A 点，
     *      {Location} B 点，
     * @return
     *      {Number} angle 方向角
     */
    getCompassDirectionSelfToFocus(options) {
        if (!options.hasOwnProperty("locationSelf")) { throw Error('locationSelf值不能为空'); }
        if (!options.hasOwnProperty("locationFocus")) { throw Error('locationFocus值不能为空'); }
        var A = options.locationSelf
        var B = options.locationFocus
        var D = new Location({ latitue: A.latitue, longitude:B.longitude})
        // var D = Location.create(A.latitue, B.longitude) //水平辅助点
        var _distance = this.getDistanceAB({ locationA: A,locationB: B})
        var _duan = this.getDistanceAB({ locationA: A, locationB: D })
        var value = 180 * Math.asin(_duan / _distance) / Math.PI
        //TODO 四个象限
        return parseInt(value)
    }

    /**
     * @method 两个方向的夹角值
     * @for CompassUtils
     * @param
     *      {Number} angleA   手机本身的罗盘度数
     *      {Number} angleB   手机与目标的罗盘度数
     * @return
     *      {Number} value 夹角度数
     */
    getAngleAB(options) {
        if (!options.hasOwnProperty("angleA")) { throw Error('angleA值不能为空'); }
        if (!options.hasOwnProperty("angleB")) { throw Error('angleB值不能为空'); }
        var dir_phone = options.angleA
        var dir_nav = options.angleB
        var value, side
        if (dir_phone >= dir_nav) { //手机 > 目标
            if (dir_phone - dir_nav <= 180) {//手机 - 目标 <= 180
                value = dir_nav - dir_phone
            } else { //手机 - 目标 > 180
                value = 359 - dir_phone + dir_nav
            }
        }
        else {//目标 > 手机
            if (dir_nav - dir_phone <= 180) { // 目标 - 手机 <= 180
                value = dir_nav - dir_phone
            } else {// 目标 - 手机 > 180
                value = 0 - (359 - dir_nav + dir_phone)
            }
        }
        return value
        // return Angle.create(value, side)
    }


    /**
     * @method 获取手机与目标点的夹角
     * @param
     *      {String} direction 手机的方向数值
     *      {Location} locationSelf 手机GPS经纬度
     *      {Location} locationFocus 目标点经纬度
     * @return
     *      {Number} value 手机与目标点方向加的夹角
     */
    getAngleSelfToFocus(options) {
        if (!options.hasOwnProperty("direction")) { throw Error('direction值不能为空'); }
        if (!options.hasOwnProperty("locationSelf")) { throw Error('locationSelf值不能为空'); }
        if (!options.hasOwnProperty("locationFocus")) { throw Error('locationFocus值不能为空'); }

        var _direction = options.direction
        var _loc_self = options.locationSelf
        var _loc_focus = options.locationFocus//目标点的location
        var _agnle_focus = this.getCompassDirectionSelfToFocus({
            locationSelf: _loc_self,
            locationFocus: _loc_focus
        })
        var value = this.getAngleAB({
            angleA: _direction,
            angleB: _agnle_focus,
        })
        return value
    }

    /**
     * @methon 把request获取的mark格式化
     * 
     */
    formatSearch(options) {
        if (!options.hasOwnProperty("list")) { throw Error('list值不能为空'); }
        if (!options.hasOwnProperty("location")) { throw Error('location值不能为空'); }

        var _r = []
        var _list = options.list
        var _gps_location = options.location

        for(var i=0;i<_list.length ; i++){
            var _node = _list[i]

            //将mark点变为location格式
            var _mark_location = new Location({
                latitue: _node.location.lat,
                longitude: _node.location.lng,
            })

            //计算手机与目标点的距离
            var _distance = this.getDistanceAB({
                locationA: _gps_location,
                locationB: _mark_location,
            })
            //计算手机与目标点连线的罗盘角度
            var _compass_direction = this.getCompassDirectionSelfToFocus({
                locationSelf: _gps_location,
                locationFocus: _mark_location,
            })

            //生成实际的数组
            var _temp = new Location({
                id: _node.id,
                title: _node.title,
                address: _node.address,
                category: _node.category,
                latitue: _node.location.lat,
                longitude: _node.location.lng,
                distance: _distance,
                compass_direction: _compass_direction,
            })
            _r.push(_temp)
        }
        return _r
    }

    formatRoute(options){
        if (!options.hasOwnProperty("route")) { throw Error('location值不能为空'); }
        var _route = options.route
        _route = Utils.filterLocation(_route)
        return _route
    }
}



var Utils = {
    /**
     * 对腾讯地图导航坐标解压
     * 
     * @param {Object} 未解压routes参数
     */
    filterLocation(routes) {
        var coors = routes.polyline, pl = [];
        var steps = routes.steps
        console.log(steps)

        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }

        for (var i = 0; i < steps.length; i++) {
            var location = new Location({
                latitue:coors[steps[i].polyline_idx[0]],
                longitude:coors[steps[i].polyline_idx[1]]
            })
            steps[i].location = location
        }
        routes.steps = steps
        return routes
    },

}

module.exports = LocationUtils