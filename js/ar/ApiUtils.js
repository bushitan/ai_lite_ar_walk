
var QQMapWX = require('wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});


/**
 * @method  AR的工具类
 */
class ApiUtils {
    constructor(options) {
        // if (!options.GP) { throw Error('GP值不能为空'); }
    }



    /**
     * @method 查询腾讯导航路径
     * @for ApiUtils
     * @param
     *      {string} from_str 开始点经纬度
     *      {string} to_str 结束点经纬度
     */
    getMarkList(key, location_str, callback) {
        // callback()
        // return 

        qqmapsdk.search({
            keyword: key,
            location: location_str,
            // location: "23.1290800000, 113.2643600000",
            success: function (res) {
                // console.log(res);
                callback(res)
            },
            fail: function (res) {
                console.log(res);
            },
        })
    }

    /**
     * @method 查询腾讯导航路径
     * @for ApiUtils
     * @param
     *      {String} fromStr 开始点经纬度
     *      {String} toStr 结束点经纬度
     *      {Function} callback 回调时间
     */        
    getRoute(options) {
        var from_str = options.fromStr
        var to_str = options.toStr
        var callback = options.callback
        // 步行导航
        var opt = {
            //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
            url: 'https://apis.map.qq.com/ws/direction/v1/walking/'
                + '?from=' + from_str
                + '&to=' + to_str
                + '&key=' + KEY,
            method: 'GET',
            dataType: 'json',
            //请求成功回调
            success: function (res) {
                console.log(res)
                var _route = res.data.result.routes[0]

                wx.setStorageSync("nav_list", _route)
                callback(_route)
            }
        };
        wx.request(opt);
    }
}

module.exports = ApiUtils