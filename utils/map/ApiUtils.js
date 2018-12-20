//菜单工具类

var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"

module.exports = {
    getNavWalk: getNavWalk,
    getMarkListByTXMap: getMarkListByTXMap,
}

/**
 * @method 查询腾讯导航路径
 * @for ApiUtils
 * @param
 *      {string} from_str 开始点经纬度
 *      {string} to_str 结束点经纬度
 */
function getNavWalk(from_str, to_str,callback) {

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
            var ret = res.data
            if (ret.status != 0) return; //服务异常处理


            callback(ret.result.routes[0])
            console.log(ret.result.routes[0])
            return 

            var coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
                pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }


            
            // NavUtils.setPath(pl)
            // console.log(pl)

            // callback(pl)
        }
    };
    wx.request(opt);
}



/**
 * @method 查询腾讯导航路径
 * @for ApiUtils
 * @param
 *      {string} from_str 开始点经纬度
 *      {string} to_str 结束点经纬度
 */
function getMarkListByTXMap(key, location_str, callback) {
    qqmapsdk.search({
        keyword: key,
        location: location_str,
        // location: "23.1290800000, 113.2643600000",
        success: function (res) {
            console.log(res);
        },
        fail: function (res) {
            console.log(res);
        },
    })
}