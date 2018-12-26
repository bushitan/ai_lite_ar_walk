

var Route = require("../../utils/map/Route.js")
var route 

var Utils = {
    
}


class NavUtils {

    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,route 为必选参数
     */
    constructor(options) {

    }

    setRoute(options) {
        if (!options.route) {
            throw Error('route值不能为空');
        }
        var _route = options.route

        route = new Route({
            route: wx.getStorageSync("routes")
        })
    }
}

module.exports = NavUtils;